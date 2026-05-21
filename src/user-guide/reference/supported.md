---
title: Supported Object Types
category: reference
order: 10
---

| Type   | Description                                                  | Supported                                                                                | ABAP Language Version |
| :----- | :----------------------------------------------------------- | :--------------------------------------------------------------------------------------- | :-------------------- |
| `ACID` | Checkpoint Group                                             | **Yes**                                                                                  | No                    |
| `AIFC` | Objects from AIF content                                     | **Yes**                                                                                  | **Yes**               |
| `AMSD` | Logical Database Schema                                      | **Yes**                                                                                  | No                    |
| `AOBJ` | Archiving Object                                             | [#804](https://github.com/abapGit/abapGit/issues/804)                                    | No                    |
| `APIS` | API Release State                                            | **Yes**                                                                                  | No                    |
| `APLO` | Application Log Objects                                      | **Yes**, [AFF](https://github.com/SAP/abap-file-formats/tree/main/file-formats/aplo)     | **Yes**               |
| `AQBG` | ABAP Query: User group                                       | **Yes**                                                                                  | No                    |
| `AQQU` | ABAP Query: Query                                            | **Yes**                                                                                  | No                    |
| `AQSG` | ABAP Query: Functional area                                  | **Yes**                                                                                  | No                    |
| `AREA` | BW: InfoArea                                                 | **Yes**                                                                                  | No                    |
| `ASFC` | Field Catalog                                                | **Yes**                                                                                  | No                    |
| `ASIS` | Archiving Information Structure                              | [#1579](https://github.com/abapGit/abapGit/issues/1579)                                  | No                    |
| `AUTH` | Authorization Check Fields                                   | **Yes**                                                                                  | No                    |
| `AVAR` | Activation Variants for Assertions and Breakpoints           | **Yes**                                                                                  | No                    |
| `AVAS` | Classification                                               | **Yes**                                                                                  | No                    |
| `BDEF` | Behaviour Definition                                         | **Yes**                                                                                  | **Yes**               |
| `BGQC` | Background Processing Context                                | **Yes**, [AFF](https://github.com/SAP/abap-file-formats/tree/main/file-formats/bgqc)     | **Yes**               |
| `BMFR` | Application Component                                        | [#2108](https://github.com/abapGit/abapGit/issues/2108)                                  | No                    |
| `BOBF` | BOPF: Business Object Model                                  | [#165](https://github.com/abapGit/abapGit/issues/165)                                    | No                    |
| `CDBO` | Custom Data Browser Object                                   | **Yes**, [AFF](https://github.com/SAP/abap-file-formats/tree/main/file-formats/cdbo)     | **Yes**               |
| `CHAR` | Object characteristic                                        | **Yes**                                                                                  | No                    |
| `CHDO` | Change Document Object                                       | **Yes**                                                                                  | **Yes**               |
| `CHKC` | ATC Check Category                                           | **Yes**, [AFF](https://github.com/SAP/abap-file-formats/tree/main/file-formats/chkc)     | **Yes**               |
| `CHKO` | ATC Check                                                    | **Yes**, [AFF](https://github.com/SAP/abap-file-formats/tree/main/file-formats/chko)     | **Yes**               |
| `CHKV` | ATC Check Variant                                            | **Yes**, [AFF](https://github.com/SAP/abap-file-formats/tree/main/file-formats/chkv)     | **Yes**               |
| `CLAS` | Class (ABAP Objects)                                         | **Yes**                                                                                  | **Yes**               |
| `CMOD` | Customer enhancement projects                                | **Yes**                                                                                  | No                    |
| `CMPT` | Code Composer Template                                       | **Yes**                                                                                  | No                    |
| `COTA` | Communication Target                                         | **Yes**, [AFF](https://github.com/SAP/abap-file-formats/tree/main/file-formats/cota)     | **Yes**               |
| `CUS0` | Customizing IMG Activity                                     | **Yes**                                                                                  | No                    |
| `CUS1` | Customizing Transactions                                     | **Yes**                                                                                  | No                    |
| `CUS2` | Customizing Attributes                                       | **Yes**                                                                                  | No                    |
| `DCLS` | ABAP Data Control Language Sources                           | **Yes**                                                                                  | **Yes**               |
| `DDLS` | Data Definition Language Source                              | **Yes**                                                                                  | **Yes**               |
| `DDLX` | CDS metadata extension                                       | **Yes**                                                                                  | **Yes**               |
| `DESD` | Dictionary External Schema Definition                        | **Yes**, [AFF](https://github.com/SAP/abap-file-formats/tree/main/file-formats/desd)     | **Yes**               |
| `DEVC` | Package                                                      | **Yes**                                                                                  | **Yes**               |
| `DIAL` | Dialog Module                                                | **Yes**                                                                                  | No                    |
| `DOCT` | General Text                                                 | **Yes**                                                                                  | No                    |
| `DOCV` | Documentation (Independent)                                  | **Yes**                                                                                  | No                    |
| `DOMA` | Domain                                                       | **Yes**                                                                                  | **Yes**               |
| `DRAS` | CDS Aspect                                                   | **Yes**, [AFF](https://github.com/SAP/abap-file-formats/tree/main/file-formats/dras)     | **Yes**               |
| `DRTY` | CDS Type                                                     | **Yes**, [AFF](https://github.com/SAP/abap-file-formats/tree/main/file-formats/drty)     | **Yes**               |
| `DRUL` | Dependency Rule                                              | **Yes**                                                                                  | No                    |
| `DSFD` | CDS Scalar Function Definition                               | **Yes**, [AFF](https://github.com/SAP/abap-file-formats/tree/main/file-formats/dsfd)     | **Yes**               |
| `DSFI` | CDS Scalar Function Implementation                           | **Yes**, [AFF](https://github.com/SAP/abap-file-formats/tree/main/file-formats/dsfi)     | **Yes**               |
| `DSYS` | Chapter of a Book Structure                                  | **Yes**                                                                                  | No                    |
| `DTDC` | Dynamic Cache                                                | **Yes**                                                                                  | **Yes**               |
| `DTEB` | CDS Entity Buffer                                            | **Yes**, [AFF](https://github.com/SAP/abap-file-formats/tree/main/file-formats/dteb)     | **Yes**               |
| `DTEL` | Data Element                                                 | **Yes**                                                                                  | **Yes**               |
| `DTIX` | Dictionary Entity Index                                      | **Yes**, [AFF](https://github.com/SAP/abap-file-formats/tree/main/file-formats/dtix)     | **Yes**               |
| `DTSC` | Dictionary Static Cache                                      | **Yes**, [AFF](https://github.com/SAP/abap-file-formats/tree/main/file-formats/dtsc)     | **Yes**               |
| `ECAT` | eCATT Test Script                                            | **Yes**                                                                                  | No                    |
| `ECSD` | eCATT System Data Container                                  | **Yes**                                                                                  | No                    |
| `ECSP` | eCATT Start Profile                                          | **Yes**                                                                                  | No                    |
| `ECTC` | eCATT Test Configuration                                     | **Yes**                                                                                  | No                    |
| `ECTD` | eCATT Test Data Container                                    | **Yes**                                                                                  | No                    |
| `ECVO` | eCATT Validation Object                                      | **Yes**                                                                                  | No                    |
| `EEEC` | Event Consumption Model                                      | **Yes**, [AFF](https://github.com/SAP/abap-file-formats/tree/main/file-formats/eeec)     | **Yes**               |
| `ENHC` | Composite Enhancement Implementation                         | **Yes**                                                                                  | No                    |
| `ENHO` | Enhancement Implementation                                   | **Yes**                                                                                  | **Yes**               |
| `ENHS` | Enhancement Spot                                             | **Yes**                                                                                  | **Yes**               |
| `ENQU` | Lock Object                                                  | **Yes**                                                                                  | **Yes**               |
| `ENSC` | Composite Enhancement Spot                                   | **Yes**                                                                                  | No                    |
| `EVTB` | Event Binding                                                | **Yes**, [AFF](https://github.com/SAP/abap-file-formats/tree/main/file-formats/evtb)     | **Yes**               |
| `FDT0` | FDT/BRFplus: System Application                              | **Yes**                                                                                  | No                    |
| `FDT1` | FDT/BRFplus: Customizing Application                         | [#33](https://github.com/abapGit/abapGit/issues/33)                                      | No                    |
| `FORM` | SAPscript form                                               | **Yes**                                                                                  | No                    |
| `FTGL` | Feature Toggle                                               | **Yes**                                                                                  | No                    |
| `FUGR` | Function Group                                               | **Yes**                                                                                  | **Yes**               |
| `FUGS` | Function Group with Customer Include: SAP Part               | **Yes**                                                                                  | **Yes**               |
| `FUGX` | Function Group with Customer Include: Customer Part          | [#2851](https://github.com/abapGit/abapGit/issues/2851)                                  | Unknown               |
| `G4BA` | SAP Gateway OData V4 Backend Service Group & Assignments     | **Yes**                                                                                  | **Yes**               |
| `G4BS` | SAP Gateway OData V4 Backend Service                         | **Yes**                                                                                  | **Yes**               |
| `GSMP` | Generic Simple Metric Provider                               | **Yes**, [AFF](https://github.com/SAP/abap-file-formats/tree/main/file-formats/gsmp)     | **Yes**               |
| `HTTP` | HTTP Destination                                             | **Yes**                                                                                  | No                    |
| `IAMU` | Language-Independent IAC Binary Data                         | **Yes**                                                                                  | No                    |
| `IARP` | Parameters of IAC Language Resource                          | **Yes**                                                                                  | No                    |
| `IASP` | Parameters of an IAC service                                 | **Yes**                                                                                  | No                    |
| `IATU` | Language-Independent IAC Templates                           | **Yes**                                                                                  | No                    |
| `IAXU` | ITS: XML Templates for HTML Templates                        | **Yes**                                                                                  | No                    |
| `IDOC` | IDoc Type                                                    | **Yes**                                                                                  | No                    |
| `IEXT` | Enhancement                                                  | **Yes**                                                                                  | No                    |
| `INTF` | Interface (ABAP objects)                                     | **Yes**                                                                                  | **Yes**               |
| `IOBJ` | BW: InfoObject                                               | **Yes**                                                                                  | No                    |
| `IWMO` | Gateway Business Suite Enablement - Model                    | **Yes**                                                                                  | **Yes**               |
| `IWOM` | Gateway: Model Metadata                                      | **Yes**                                                                                  | **Yes**               |
| `IWPR` | Gateway Business Suite Enablement - Service Builder Project  | **Yes**                                                                                  | **Yes**               |
| `IWSG` | Gateway: Service Groups Metadata                             | **Yes**                                                                                  | **Yes**               |
| `IWSV` | Gateway Business Suite Enablement - Service                  | **Yes**                                                                                  | **Yes**               |
| `IWVB` | SAP Gateway Business Suite Enablement -Vocabulary Annotation | **Yes**                                                                                  | **Yes**               |
| `JOBD` | Technical Job Definition                                     | **Yes**                                                                                  | No                    |
| `LPDC` | Launchpad short texts                                        | [#107](https://github.com/abapGit/abapGit/issues/107)                                    | No                    |
| `MSAG` | Message Class                                                | **Yes**                                                                                  | No                    |
| `NONT` | SAP Object Type Node                                         | **Yes**, [AFF](https://github.com/SAP/abap-file-formats/tree/main/file-formats/nont)     | **Yes**               |
| `NROB` | Number Range Objects                                         | **Yes**                                                                                  | **Yes**               |
| `NSPC` | Namespace in R/3 Repository                                  | **Yes**                                                                                  | No                    |
| `OA2P` | OAuth2 Profile                                               | **Yes**                                                                                  | No                    |
| `ODSO` | BW: DataStore Object                                         | **Yes**                                                                                  | No                    |
| `OTGR` | Object type group                                            | **Yes**                                                                                  | No                    |
| `PARA` | SPA/GPA Parameters                                           | **Yes**                                                                                  | No                    |
| `PDAC` | Standard Rule                                                | [#3914](https://github.com/abapGit/abapGit/issues/3914)                                  | No                    |
| `PDTG` | Task Group                                                   | [#3915](https://github.com/abapGit/abapGit/issues/3915)                                  | No                    |
| `PDTS` | Standard Task                                                | partial - [#4164](https://github.com/abapGit/abapGit/issues/4164)                        | No                    |
| `PDWS` | Workflow templates                                           | [#154](https://github.com/abapGit/abapGit/issues/154)                                    | No                    |
| `PERS` | Personalization object                                       | **Yes**                                                                                  | No                    |
| `PINF` | Package interface                                            | **Yes**                                                                                  | No                    |
| `PRAG` | Pragma in ABAP Source Code                                   | **Yes**                                                                                  | No                    |
| `PROG` | Program                                                      | **Yes**                                                                                  | **Yes**               |
| `RONT` | SAP Object Type                                              | **Yes**, [AFF](https://github.com/SAP/abap-file-formats/tree/main/file-formats/ront)     | **Yes**               |
| `SAJC` | Application Job Catalog Entry                                | **Yes**, [AFF](https://github.com/SAP/abap-file-formats/tree/main/file-formats/sajc)     | **Yes**               |
| `SAJT` | Application Job Templates                                    | **Yes**, [AFF](https://github.com/SAP/abap-file-formats/tree/main/file-formats/sajt)     | **Yes**               |
| `SAMC` | ABAP Messaging Channels                                      | **Yes**                                                                                  | No                    |
| `SAPC` | ABAP Push Channels                                           | **Yes**                                                                                  | No                    |
| `SCP1` | BC Set or Customizing Profile                                | **Yes**                                                                                  | No                    |
| `SCVI` | Screen Variants                                              | **Yes**                                                                                  | No                    |
| `SFBF` | Business Function + Assignment                               | **Yes**                                                                                  | No                    |
| `SFBS` | Business Function Set + Assignment                           | **Yes**                                                                                  | No                    |
| `SFPF` | Form Object: Form                                            | **Yes**                                                                                  | No                    |
| `SFPI` | Form Object: Interface                                       | **Yes**                                                                                  | No                    |
| `SFSW` | Switch + Assignment of Objects to the Switch                 | **Yes**                                                                                  | No                    |
| `SHI3` | General structure storage: Definition of a structure         | **Yes**                                                                                  | No                    |
| `SHI5` | Gen. hierarchy storage extension name                        | **Yes**                                                                                  | No                    |
| `SHI8` | SFW Switch Assignment in Hierarchy Tool                      | **Yes**                                                                                  | No                    |
| `SHLP` | Search Help                                                  | **Yes**                                                                                  | No                    |
| `SHMA` | Shared Objects: Defined Area Attributes                      | **Yes**                                                                                  | No                    |
| `SICF` | ICF Service                                                  | **Yes**                                                                                  | No                    |
| `SKTD` | Knowledge Transfer Document                                  | **Yes**                                                                                  | **Yes**               |
| `SMBC` | Business Configuration Maintenance Objects                   | **Yes**, [AFF](https://github.com/SAP/abap-file-formats/tree/main/file-formats/smbc)     | **Yes**               |
| `SMIM` | Info Object from the MIME Repository                         | **Yes**                                                                                  | **Yes**               |
| `SMTG` | OM: Email Template                                           | **Yes**                                                                                  | No                    |
| `SOBJ` | Business Object Type                                         | **Yes**                                                                                  | No                    |
| `SOD1` | API Package                                                  | **Yes**                                                                                  | No                    |
| `SOD2` | API Package Assignment                                       | **Yes**                                                                                  | No                    |
| `SOTS` | All Concepts (OTR) of a Package - Long Texts                 | **Yes**                                                                                  | No                    |
| `SPLO` | Format Types                                                 | **Yes**                                                                                  | No                    |
| `SPPF` | Page Format                                                  | **Yes**                                                                                  | No                    |
| `SPRX` | Proxy Object                                                 | **Yes**                                                                                  | No                    |
| `SQSC` | Database Procedure Proxy                                     | **Yes**                                                                                  | No                    |
| `SRFC` | RFC Service                                                  | **Yes**                                                                                  | No                    |
| `SRVB` | Service Binding                                              | **Yes**                                                                                  | **Yes**               |
| `SRVD` | Service Definition                                           | **Yes**                                                                                  | **Yes**               |
| `SSFO` | SAP Smart Form                                               | **Yes**                                                                                  | No                    |
| `SSST` | SAP Smart Style                                              | **Yes**                                                                                  | No                    |
| `STVI` | Transaction Variants                                         | **Yes**                                                                                  | No                    |
| `STYL` | SAPscript style                                              | **Yes**                                                                                  | No                    |
| `SUCU` | Authorization Groups (TBRG_AUTH)                             | **Yes**                                                                                  | No                    |
| `SUSC` | Authorization object class                                   | **Yes**                                                                                  | No                    |
| `SUSH` | Assignment: Service --> Authorization Objects                | **Yes**                                                                                  | **Yes**               |
| `SUSO` | Authorization object                                         | **Yes**                                                                                  | **Yes**               |
| `SWCR` | Software Component Relations                                 | **Yes**, [AFF](https://github.com/SAP/abap-file-formats/tree/main/file-formats/swcr)     | **Yes**               |
| `SXCI` | Business Add-Ins - Implementations                           | **Yes**                                                                                  | No                    |
| `SXSD` | BADI Definition                                              | **Yes**                                                                                  | No                    |
| `TABL` | Table                                                        | **Yes**                                                                                  | **Yes**               |
| `TABU` | Table Data                                                   | **Yes**, [Data Config](data-config.md)                                                   | No                    |
| `TOBJ` | Definition of a Maintenance and Transport Object             | **Yes**                                                                                  | **Yes**               |
| `TRAN` | Transaction                                                  | **Yes**                                                                                  | No                    |
| `TTYP` | Table Type                                                   | **Yes**                                                                                  | **Yes**               |
| `TYPE` | Type Group                                                   | **Yes**                                                                                  | No                    |
| `UCSA` | Unified Connectivity Service Assembly                        | **Yes**                                                                                  | No                    |
| `UDMO` | Data model                                                   | **Yes**                                                                                  | No                    |
| `UENO` | Entity type                                                  | **Yes**                                                                                  | No                    |
| `UIAD` | Launchpad App Descriptor Item                                | **Yes**, [AFF](https://github.com/SAP/abap-file-formats/tree/main/file-formats/uiad)     | **Yes**               |
| `UIPG` | Fiori Launchpad Page Template                                | **Yes**, [AFF](https://github.com/SAP/abap-file-formats/tree/main/file-formats/uipg)     | **Yes**               |
| `UIST` | Fiori Launchpad Space Template                               | **Yes**, [AFF](https://github.com/SAP/abap-file-formats/tree/main/file-formats/uist)     | **Yes**               |
| `VCLS` | View cluster                                                 | **Yes**                                                                                  | No                    |
| `VIEW` | View                                                         | **Yes**                                                                                  | No                    |
| `W3HT` | Web Reporting/Internet Transaction Server HTML Templates     | **Yes**                                                                                  | No                    |
| `W3MI` | Web Reporting/Internet Transaction Server MIME Types(binary  | **Yes**                                                                                  | No                    |
| `WAPA` | BSP (Business Server Pages) Application                      | **Yes**                                                                                  | **Yes**               |
| `WDCA` | Web Dynpro Application Configuration                         | **Yes**                                                                                  | No                    |
| `WDCC` | Web Dynpro Component Configuration                           | **Yes**                                                                                  | No                    |
| `WDYA` | Web Dynpro Application                                       | **Yes**                                                                                  | No                    |
| `WDYN` | Web Dynpro Component                                         | **Yes**                                                                                  | No                    |
| `WEBI` | Virtual End Point                                            | **Yes**                                                                                  | No                    |
| `XINX` | Extension Index                                              | **Yes**                                                                                  | **Yes**               |
| `XSLT` | Transformation                                               | **Yes**                                                                                  | **Yes**               |
| `ZN**` | Neptune Artifact                                             | [Via Extension](https://github.com/neptune-software/dxp-sap-edition-abapgit-extension)   | N/A                   |

If additional object types are required please add a comment to [issue](https://github.com/abapGit/abapGit/issues/5912)

Customizing can be moved via `SCP1` Business Sets configuration, or alternatively, the [data feature](data-config.md) which can move table contents to and from git.

:::info
abapGit in SAP Business Technology Platform, ABAP Environment [supports other object types](https://help.sap.com/docs/btp/sap-business-technology-platform/released-abap-object-types).
:::
