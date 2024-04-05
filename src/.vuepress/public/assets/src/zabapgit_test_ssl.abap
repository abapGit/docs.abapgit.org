REPORT zabapgit_test_ssl.

* See https://docs.abapgit.org

********************************************************************************
* The MIT License (MIT)
*
* Copyright (c) 2014 abapGit Contributors
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
********************************************************************************

SELECTION-SCREEN BEGIN OF BLOCK sc_header WITH FRAME TITLE sc_titl1.
  SELECTION-SCREEN SKIP.
  SELECTION-SCREEN COMMENT 1(77) sc_txt1.
  SELECTION-SCREEN SKIP.
  SELECTION-SCREEN COMMENT /1(77) sc_txt2.
  SELECTION-SCREEN COMMENT /1(77) sc_txt3.
  SELECTION-SCREEN COMMENT /1(77) sc_txt4.
SELECTION-SCREEN END OF BLOCK sc_header.

SELECTION-SCREEN SKIP.

SELECTION-SCREEN BEGIN OF BLOCK sc_serv WITH FRAME TITLE sc_titl2.
  PARAMETERS:
    p_url1 TYPE string LOWER CASE DEFAULT 'https://github.com' OBLIGATORY,
* api.github.com is used when pushing code back to github
    p_url2 TYPE string LOWER CASE DEFAULT 'https://api.github.com',
    p_id   TYPE strustssl-applic DEFAULT 'ANONYM' OBLIGATORY,
    p_http TYPE i DEFAULT if_http_request=>co_protocol_version_1_1 OBLIGATORY AS LISTBOX VISIBLE LENGTH 30.
SELECTION-SCREEN END OF BLOCK sc_serv.

SELECTION-SCREEN SKIP.

SELECTION-SCREEN BEGIN OF BLOCK sc_proxy WITH FRAME TITLE sc_titl3.
* proxy settings, fill if your system is behind a proxy
  PARAMETERS:
    p_proxy TYPE string LOWER CASE,
    p_pport TYPE string LOWER CASE,
    p_puser TYPE string LOWER CASE,
    p_ppwd  TYPE string LOWER CASE.
SELECTION-SCREEN END OF BLOCK sc_proxy.

CLASS lcl_report DEFINITION.

  PUBLIC SECTION.

    METHODS run
      IMPORTING
        iv_url TYPE string.

    METHODS display_response.

    METHODS f4_url
      RETURNING
        VALUE(rv_url) TYPE string.


    METHODS http_protocol_list_box.

  PRIVATE SECTION.

    TYPES:
      BEGIN OF ty_server,
        server TYPE w3server,
        url    TYPE w3url,
      END OF ty_server,
      ty_servers TYPE STANDARD TABLE OF ty_server WITH KEY server.

    TYPES:
      BEGIN OF ty_link,
        line     TYPE i,
        response TYPE string,
      END OF ty_link,
      ty_links TYPE STANDARD TABLE OF ty_link WITH NON-UNIQUE KEY line.

    DATA mt_links TYPE ty_links.

    METHODS display_error
      IMPORTING
        iv_text TYPE string.

    METHODS display_messages
      IMPORTING
        iv_response TYPE string.

    METHODS add_response_link
      IMPORTING
        iv_response TYPE string.

    METHODS get_servers
      RETURNING
        VALUE(rt_servers) TYPE ty_servers.

ENDCLASS.

CLASS lcl_report IMPLEMENTATION.

  METHOD run.

    DATA:
      lv_code        TYPE i,
      li_http_client TYPE REF TO if_http_client,
      lv_reason      TYPE string,
      lv_response    TYPE string.

    IF iv_url IS INITIAL.
      RETURN.
    ENDIF.

    cl_http_client=>create_by_url(
      EXPORTING
        url                 = iv_url
        ssl_id              = p_id
        proxy_host          = p_proxy
        proxy_service       = p_pport
      IMPORTING
        client              = li_http_client
      EXCEPTIONS
        argument_not_found  = 1
        plugin_not_active   = 2
        internal_error      = 3
        OTHERS              = 4 ).

    IF sy-subrc <> 0.
      display_error( 'HTTP Client Create' ).
      RETURN.
    ENDIF.

    IF p_puser IS NOT INITIAL.
      li_http_client->authenticate(
        proxy_authentication = abap_true
        username             = p_puser
        password             = p_ppwd ).
    ENDIF.

    li_http_client->request->set_version( p_http ).

    li_http_client->send( ).

    li_http_client->receive(
      EXCEPTIONS
        http_communication_failure = 1
        http_invalid_state         = 2
        http_processing_failed     = 3
        OTHERS                     = 4 ).

    IF sy-subrc <> 0.
      display_error( 'HTTP Client Receive' ).

      li_http_client->get_last_error(
        IMPORTING
          message = lv_response ).

      display_messages( lv_response ).

      WRITE / 'Also check transaction SMICM -> Goto -> Trace File -> Display End'.
      RETURN.
    ENDIF.

* if SSL Handshake fails, make sure to also check https://launchpad.support.sap.com/#/notes/510007

    li_http_client->response->get_status(
      IMPORTING
        code   = lv_code
        reason = lv_reason ).
    IF lv_code = 200.
      WRITE: / iv_url, ': ok'.
    ELSE.
      WRITE: / iv_url, ': Error', lv_code, space, lv_reason.

      lv_response = li_http_client->response->get_cdata( ).

      IF lv_response IS NOT INITIAL.
        add_response_link( lv_response ).
      ENDIF.

      REPLACE ALL OCCURRENCES OF cl_abap_char_utilities=>cr_lf(1) IN lv_response WITH ``.

      display_messages( lv_response ).
    ENDIF.

  ENDMETHOD.

  METHOD display_error.

    WRITE: / iv_text, '- Error Number:', sy-subrc, /.

    MESSAGE ID sy-msgid TYPE sy-msgty NUMBER sy-msgno
      DISPLAY LIKE 'I'
      WITH sy-msgv1 sy-msgv2 sy-msgv3 sy-msgv4.

  ENDMETHOD.

  METHOD display_messages.

    DATA:
      lt_lines TYPE TABLE OF string,
      lv_line  TYPE string.

    SPLIT iv_response AT cl_abap_char_utilities=>newline INTO TABLE lt_lines.

    LOOP AT lt_lines INTO lv_line.
      WRITE / lv_line.
    ENDLOOP.
    SKIP.

  ENDMETHOD.

  METHOD add_response_link.

    DATA lv_link TYPE ty_link.

    WRITE / 'Display Error Response as HTML' COLOR = 6 HOTSPOT.

    lv_link-line     = sy-linno.
    lv_link-response = iv_response.
    APPEND lv_link TO mt_links.

  ENDMETHOD.

  METHOD display_response.

    DATA lv_link TYPE ty_link.

    READ TABLE mt_links INTO lv_link WITH TABLE KEY line = sy-curow.
    IF sy-subrc = 0.
      cl_abap_browser=>show_html(
        html_string = lv_link-response
        check_html  = abap_false ).
    ENDIF.

  ENDMETHOD.

  METHOD get_servers.

    DATA ls_server TYPE ty_server.

    ls_server-server = 'GitHub (Read Access)'.
    ls_server-url    = 'https://github.com'.
    INSERT ls_server INTO TABLE rt_servers.
    ls_server-server = 'GitHub (Write Access)'.
    ls_server-url    = 'https://api.github.com'.
    INSERT ls_server INTO TABLE rt_servers.
    ls_server-server = 'GitLab'.
    ls_server-url    = 'https://gitlab.com/test'.
    INSERT ls_server INTO TABLE rt_servers.
    ls_server-server = 'Azure DevOps'.
    ls_server-url    = 'https://dev.azure.com/<org>'.
    INSERT ls_server INTO TABLE rt_servers.
    ls_server-server = 'Bitbucket'.
    ls_server-url    = 'https://bitbucket.org'.
    INSERT ls_server INTO TABLE rt_servers.
    ls_server-server = 'Assembla'.
    ls_server-url    = 'https://git.assembla.com/<org>'.
    INSERT ls_server INTO TABLE rt_servers.

    SORT rt_servers.

  ENDMETHOD.

  METHOD f4_url.

    DATA:
      ls_server  TYPE ty_server,
      lt_servers TYPE TABLE OF ty_server,
      ls_return  TYPE ddshretval,
      lt_return  TYPE TABLE OF ddshretval.

    lt_servers = get_servers( ).

    CALL FUNCTION 'F4IF_INT_TABLE_VALUE_REQUEST'
      EXPORTING
        retfield        = 'SERVER'
        window_title    = 'Git Server Selection'
        value_org       = 'S'
      TABLES
        value_tab       = lt_servers
        return_tab      = lt_return
      EXCEPTIONS
        parameter_error = 1
        no_values_found = 2
        OTHERS          = 3.
    IF sy-subrc <> 0.
      display_error( 'Server Value Help' ).
      RETURN.
    ENDIF.

    READ TABLE lt_return INTO ls_return INDEX 1.
    IF sy-subrc = 0.
      READ TABLE lt_servers INTO ls_server WITH KEY server = ls_return-fieldval.
      IF sy-subrc = 0.
        rv_url = ls_server-url.
      ENDIF.
    ENDIF.

  ENDMETHOD.


  METHOD http_protocol_list_box.

    DATA:
      lt_values TYPE vrm_values,
      ls_value  LIKE LINE OF lt_values.

    ls_value-key = if_http_request=>co_protocol_version_1_0.
    ls_value-text = 'HTTP/1.0'.
    APPEND ls_value TO lt_values.

    ls_value-key = if_http_request=>co_protocol_version_1_1.
    ls_value-text = 'HTTP/1.1'.
    APPEND ls_value TO lt_values.

    CALL FUNCTION 'VRM_SET_VALUES'
      EXPORTING
        id              = 'P_HTTP'
        values          = lt_values
      EXCEPTIONS
        id_illegavrm_id = 1
        OTHERS          = 2.
    ASSERT sy-subrc = 0.

  ENDMETHOD.

ENDCLASS.

DATA go_report TYPE REF TO lcl_report.

INITIALIZATION.
  sc_titl1               = 'Description'.
  sc_txt1                = 'This report tests the connection from this system to a Git server'.
  sc_txt2                = 'Select or enter the URL of the Git server and run the report. You can'.
  sc_txt3                = 'test two URLs at the same time, for example, if read and write'.
  sc_txt4                = 'access require different servers.'.
  sc_titl2               = 'Git Server'.
  %_p_url1_%_app_%-text  = 'URL (Read Access)'.
  %_p_url2_%_app_%-text  = 'URL (Write Access)'.
  %_p_id_%_app_%-text    = 'SSL Client Identity'.
  %_p_http_%_app_%-text  = 'HTTP protocol'.
  sc_titl3               = 'Proxy Settings (Optional)'.
  %_p_proxy_%_app_%-text = 'Hostname/IP'.
  %_p_pport_%_app_%-text = 'Port'.
  %_p_puser_%_app_%-text = 'Username'.
  %_p_ppwd_%_app_%-text  = 'Password'.

  CREATE OBJECT go_report.

AT SELECTION-SCREEN.
  p_proxy = replace(
    val   = p_proxy
    regex = 'http(s?)://'
    with  = ''
    occ   = 1 ).

AT SELECTION-SCREEN OUTPUT.
  LOOP AT SCREEN.
    IF screen-name = 'P_PPWD'.
      screen-invisible = 1.
      MODIFY SCREEN.
    ENDIF.
  ENDLOOP.

  go_report->http_protocol_list_box( ).

AT SELECTION-SCREEN ON VALUE-REQUEST FOR p_url1.
  p_url1 = go_report->f4_url( ).

AT SELECTION-SCREEN ON VALUE-REQUEST FOR p_url2.
  p_url2 = go_report->f4_url( ).

START-OF-SELECTION.
  go_report->run( p_url1 ).
  WRITE: /, '----', /.
  go_report->run( p_url2 ).

AT LINE-SELECTION.
  go_report->display_response( ).
