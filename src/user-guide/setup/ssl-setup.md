---
title: SSL Setup
category: setup
order: 20
---

## Overview

In general, Git servers require secure connections. Therefore, abapGit is using secure connections based on HTTPS to access Git servers.

Note: Using unsecure HTTP connections is possible but strongly discouraged since the content of your repository would become visible on the network.

To support HTTPS, your SAP system must be configured accordingly:

- Enabled HTTP/HTTPS service connection in SAP system profile
- Import Git server certificates into SAP trust manager
- If necessary, define an HTTP Proxy Server in abapGit settings

Note: Alternatively, connection details can be defined via [user exit](/user-guide/reference/exits.md#exits).

We use GitHub.com as an example for configuring secure connections. This is also required if you want to clone and contribute to abapGit itself. The setup for other Git servers is quite similar and will require different certificates.

### SAP Crypto Library

Secure connections require installation of the SAP Crypto Library (CommonCryptoLib 8). Since SAP NetWeaver 7.4 this library is installed with the system. However, if your system is older or not up-to-date, you might have to update the library to a more recent version.

:::note
It's highly recommended to run a recent version of the Crypto Library to avoid known security issues. As of December 2022, the latest version is `8.5.47`.
:::

[Crypto Library in SAP Download Center](https://me.sap.com/softwarecenter/template/products/%20_APP=00200682500000001943&_EVENT=DISPHIER&HEADER=Y&FUNCTIONBAR=N&EVENT=TREE&NE=NAVIGATE&ENR=01200615320100002625&V=MAINT&TA=ACTUAL&PAGE=SEARCH/SAPCRYPTOLIB)

You can find the installed version number in transaction `STRUST` > Environment > Display SSF Version:

![ssl_setup_cryptolib](/img/ssl_setup_cryptolib.png)

### SAP System Profile

See [SAP Note 510007](https://me.sap.com/notes/510007), section 7, for detailed information on how to configure your SAP system to support SSL.

The currently recommended settings for TLS v1.2 interoperability are (requiring at least CommonCryptoLib 8.4.38, recommending at least 8.5.4):

```
ssl/ciphersuites             = 135:PFS:HIGH::EC_X25519:EC_P256:EC_HIGH
ssl/client_ciphersuites      = 150:PFS:HIGH::EC_X25519:EC_P256:EC_HIGH
icm/HTTPS/client_sni_enabled = TRUE
ssl/client_sni_enabled       = TRUE

SETENV_26 = SECUDIR=$(DIR_INSTANCE)$(DIR_SEP)sec
SETENV_27 = SAPSSL_CLIENT_CIPHERSUITES=150:PFS:HIGH::EC_X25519:EC_P256:EC_HIGH
SETENV_28 = SAPSSL_CLIENT_SNI_ENABLED=TRUE 
```

To add profile parameters, use transaction `RZ10` or update the contents of file `DEFAULT.PFL` directly. A system restart might be required.

For [preview, evaluation, and developer versions of SAP NetWeaver](https://go.support.sap.com/minisap/#/minisap) refer to following locations, depending on your system name:

- "A4H - SAP NetWeaver AS ABAP 7.4 and above (Linux / SAP HANA)" - `/usr/sap/A4H/sys/profile/DEFAULT.PFL`
- "NPL - SAP NetWeaver 7.x" - `/sapmnt/NPL/profile/DEFAULT.PFL`

If configured correctly, transaction `SMICM` > Goto > Services (`Shift + F1`) will show a green checkmark next to the HTTPS service.

![ssl_setup_services](/img/ssl_setup_services.png)

### SAP Trust Manager

As a default, abapGit uses an anonymous client connection (`ANONYM - SSL Client (Anonymous)`). A secure connection requires that the Git server certificate is available in the certificate list. The certificate must also be valid!

First, download the server certificates to you local machine. Then import and add these certificates to your SAP system.

[Trust Manager in SAP Documentation](https://help.sap.com/docs/SAP_NETWEAVER_750/280f016edb8049e998237fcbd80558e7/4c5bdb17f85640f1e10000000a42189c.html)

If done correctly, transaction `STRUST` will show the Git server certificates in the certificate list.

![ssl_setup_trust](/img/ssl_setup_trust.png)

#### Download the Certificate Files

##### Option A - Chrome

1. Using Google Chrome to go to [https://github.com](https://github.com)
2. Click on the lock icon near the address bar, then click on "Connection is secure"
3. On the Security tab, click on "Certificate is valid"
4. Go to the "Details" tab and select "Export..." to download the certificate to a file
5. In the "Certification hierarchy" box, select the parent node of the GitHub certificate and export it as well. Repeat the same with the root node.

![ssl_setup_chrome](/img/ssl_setup_chrome.gif)

##### Option B - Firefox

1. Use Firefox to go to [https://github.com](https://github.com)
2. Click on the lock icon and then "More Information ..." and there "View Certificate"
3. Switch to the Details Tab and choose the first certificate of the hierarchy and click Export
4. Do the same for the next certificate in the hierarchy

##### Option C - Safari

1. Use Safari to go to [https://github.com](https://github.com)
2. Click on the lock icon and then "View Certificate"
3. In the certificate hierarchy, select the root certificate
4. Holding down the Option key (⌥), drag the large certificate icon into a text editor
5. Save the document as a `.PEM` file

##### Option D - Manual

1. Goto GitHub, find the certificate that it is using
2. Download certificate from [https://www.digicert.com/digicert-root-certificates.htm](https://www.digicert.com/digicert-root-certificates.htm)

#### Install the Certificate Files

1. Install the certificates in transaction `STRUST`:
2. Click on the Change button
3. Open "SSL client Client SSL Client (Anonymous)" folder
4. In the third box called "Certificate", click on the bottom-left button "Import certificate" to bring the certificate into the system
5. Select "Add to certificate list"
6. Repeat the process for all downloaded certificates
7. Save

### abapGit Settings

If your SAP system is behind a firewall, it might require an HTTP proxy to access the Git server. If this is the case, maintain the proxy host, port, and authentication (user/password) in your global abapGit settings.

![ssl_setup_proxy](/img/ssl_setup_proxy.png)

### Testing the Connection

Report [ZABAPGIT_TEST_SSL](/user-guide/setup/ssl-test.md) can be used to verify that the connection works.

### Troubleshooting

Connection issues typically lead to "Access to resource forbidden" (HTTP 403) or "Misdirected Request" (HTTP 421) errors.

1. Go to transaction `SMICM`
2. Check that ICM is in status "running" (green light)
3. Select Goto > Services and check that the HTTPS service is active (green checkmark)
4. Select Goto > Trace Files > Display All to view the ICM trace (`dev_icm`)

- Check for any errors
- Find the section called "SSL Initialization" and check if it ends with "Success - SapCryptoLib SSL ready!"
- Compare the listed SSL settings to the recommended settings of SAP Note 51007 (and mentioned above)

5. Go to transaction `STRUST`
6. Select "SSL client SSL Client (Anonymous)"
7. Verify that the required Git server certificates are included in the certificate list
8. Check that all required certificates are valid

The following blog posts on the SAP Community Network might be helpful:

- [Calling WebServices from ABAP via HTTPS/SSL with pfx certificates](http://scn.sap.com/people/jens.gleichmann/blog/2008/10/31/calling-webservices-from-abap-via-httpsssl-with-pfx-certificates)
- [BSP a Developer’s Journal Part XIV – Consuming WebServices with ABAP](http://scn.sap.com/people/thomas.jung/blog/2004/11/17/bsp-a-developers-journal-part-xiv--consuming-webservices-with-abap)

### Notes

#### Actions Requiring Authentication

To perform operations that require authentication, like e.g. cloning a private repository or pushing to any GitHub repository, you need to install not only the certificates for github.com but also for [https://**api**.github.com](https://api.github.com). Repeat the download and STRUST import steps as described in the sections above accordingly. (See also [#1491](https://github.com/abapGit/abapGit/issues/1491))

#### Accessing GitHub

On [2018-02-22](https://githubengineering.com/crypto-removal-notice/), GitHub deprecated weak TLS connections.  See [SAP Note 510007](https://me.sap.com/notes/510007) for details on required profile parameter changes.
