REPORT zabapgit_test_ssl.
* See https://github.com/larshp/abapGit/

CLASS lcl_report DEFINITION.
  PUBLIC SECTION.
    METHODS: run IMPORTING i_url TYPE swc_value,
      display_response.
  PRIVATE SECTION.
    TYPES: BEGIN OF ty_link,
             line     TYPE i,
             response TYPE string,
           END OF ty_link,
           ty_links TYPE STANDARD TABLE OF ty_link WITH NON-UNIQUE KEY line.
    DATA links TYPE ty_links.
    METHODS add_response_link IMPORTING response TYPE string.
ENDCLASS.

PARAMETERS: p_url1 TYPE swc_value DEFAULT 'https://github.com',
            p_url2 TYPE swc_value DEFAULT 'https://api.github.com',
            p_id   TYPE ssfapplssl DEFAULT 'ANONYM'.
* api.github.com is used when pushing code back to github

SELECTION-SCREEN BEGIN OF BLOCK proxy WITH FRAME TITLE proxtitl.
* proxy settings, fill if your system is behind a proxy
PARAMETERS: p_proxy  TYPE string,
            p_pxport TYPE string,
            p_puser  TYPE string,
            p_ppwd   TYPE string.
SELECTION-SCREEN END OF BLOCK proxy.

DATA report TYPE REF TO lcl_report.

INITIALIZATION.
  proxtitl = 'Proxy Settings'.
  %_p_url1_%_app_%-text = 'URL 1'.
  %_p_url2_%_app_%-text = 'URL 2'.
  %_p_id_%_app_%-text = 'SSL Client Identity'.
  %_p_proxy_%_app_%-text = 'Hostname/IP'.
  %_p_pxport_%_app_%-text = 'Port'.
  %_p_puser_%_app_%-text = 'Username'.
  %_p_ppwd_%_app_%-text = 'Password'.

START-OF-SELECTION.
  CREATE OBJECT report.
  report->run( p_url1 ).
  WRITE: /, '----', /.
  report->run( p_url2 ).


CLASS lcl_report IMPLEMENTATION.

  METHOD run.
    DATA: code          TYPE i,
          url           TYPE string,
          http_client   TYPE REF TO if_http_client,
          error_lines   TYPE TABLE OF string,
          error_message TYPE string,
          reason        TYPE string,
          response      TYPE string.

    IF i_url IS INITIAL.
      RETURN.
    ENDIF.

    url = i_url.
    cl_http_client=>create_by_url(
      EXPORTING
        url           = url
        ssl_id        = p_id
        proxy_host    = p_proxy
        proxy_service = p_pxport
      IMPORTING
        client        = http_client ).

    IF p_puser IS NOT INITIAL.
      http_client->authenticate(
        proxy_authentication = abap_true
        username             = p_puser
        password             = p_ppwd ).
    ENDIF.

    http_client->send( ).
    http_client->receive(
      EXCEPTIONS
        http_communication_failure = 1
        http_invalid_state         = 2
        http_processing_failed     = 3
        OTHERS                     = 4 ).
    IF sy-subrc <> 0.
      WRITE: / 'Error Number', sy-subrc, /.
      MESSAGE ID sy-msgid TYPE sy-msgty NUMBER sy-msgno WITH sy-msgv1 sy-msgv2 sy-msgv3 sy-msgv4.
      http_client->get_last_error( IMPORTING message = error_message ).
      SPLIT error_message AT cl_abap_char_utilities=>newline INTO TABLE error_lines.
      LOOP AT error_lines INTO error_message.
        WRITE / error_message.
      ENDLOOP.
      WRITE / 'Also check transaction SMICM -> Goto -> Trace File -> Display End'.
      RETURN.
    ENDIF.

* if SSL Handshake fails, make sure to also check https://launchpad.support.sap.com/#/notes/510007

    http_client->response->get_status(
      IMPORTING
        code   = code
        reason = reason ).
    IF code = 200.
      WRITE: / url, ': ok'.
    ELSE.
      WRITE: / url, ': Error', code, space, reason.
      response = http_client->response->get_cdata( ).
      IF response IS NOT INITIAL.
        add_response_link( response ).
      ENDIF.
      REPLACE ALL OCCURRENCES OF cl_abap_char_utilities=>cr_lf(1) IN response WITH ``.
      SPLIT response AT cl_abap_char_utilities=>newline INTO TABLE error_lines.
      LOOP AT error_lines INTO error_message.
        WRITE / error_message.
      ENDLOOP.

    ENDIF.
  ENDMETHOD.

  METHOD add_response_link.
    DATA link TYPE ty_link.
    WRITE / 'Display Error Response as HTML' COLOR = 6 HOTSPOT.
    link-line = sy-linno.
    link-response = response.
    APPEND link TO links.
  ENDMETHOD.

  METHOD display_response.
    DATA link TYPE ty_link.
    READ TABLE links INTO link WITH TABLE KEY line = sy-curow.
    IF sy-subrc = 0.
      cl_abap_browser=>show_html( html_string = link-response
                                  check_html  = abap_false ).
    ENDIF.
  ENDMETHOD.

ENDCLASS.

AT LINE-SELECTION.
  report->display_response( ).