import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import { redirectPlugin } from "vuepress-plugin-redirect";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  locales: {
    "/": {
      lang: "en-US",
      title: "abapGit Docs",
      description: "A git client for ABAP developed in ABAP"
    }
    // "/de/": {
    //   lang: "de-DE",
    //   title: "abapGit Doks",
    //   description: "Ein Git client für ABAP entwickelt mit ABAP",
    // },
  },
  theme,
  plugins: [
    searchProPlugin({
      indexContent: true,
      // add supports for category and tags
      customFields: [
        {
          getter: page => (page.frontmatter as any).category,
          formatter: "Category: $content"
        },
        {
          getter: page => page.frontmatter.tag,
          formatter: "Tag: $content"
        }
      ]
    }),
    redirectPlugin({
      // redirect old pages to new site
      config: {
        "/guide-authentication.html": "/user-guide/projects/online/authentication.html",
        "/guide-contributing.html": "/user-guide/projects/online/contributing.html",
        "/guide-export-zip.html": "/user-guide/projects/offline/export-zip.html",
        "/guide-first-project.html": "/user-guide/projects/online/first-project.html",
        "/guide-import-rfc.html": "/user-guide/projects/offline/import-rfc.html",
        "/guide-import-zip.html": "/user-guide/projects/offline/import-zip.html",
        "/guide-install.html": "/user-guide/getting-started/install.html",
        "/guide-moving-package.html": "/user-guide/projects/online/moving-package.html",
        "/guide-offline-install.html": "/user-guide/projects/offline/install.html",
        "/guide-online-install.html": "/user-guide/projects/online/install.html",
        "/guide-online-uninstall.html": "/user-guide/projects/remove/uninstall.html",
        "/guide-online-update.html": "/user-guide/projects/online/update.html",
        "/guide-regular-backup.html": "/user-guide/other/regular-backup.html",
        "/guide-sapgui.html": "/user-guide/setup/sapgui.html",
        "/guide-saplink.html": "/user-guide/other/saplink.html",
        "/guide-settings-global.html": "/user-guide/setup/settings-global.html",
        "/guide-settings-personal.html": "/user-guide/setup/settings-personal.html",
        "/guide-ssl-setup.html": "/user-guide/setup/ssl-setup.html",
        "/guide-ssl-test.html": "/user-guide/setup/ssl-test.html",
        "/guide-stage-commit.html": "/user-guide/projects/online/",
        "/guide-ui-layout.html": "/user-guide/getting-started/ui-layout.html",
        "/guide-ui.html": "/user-guide/getting-started/ui.html",
        "/guide-uninstall.html": "/user-guide/getting-started/uninstall.html",
        "/guide-upgrade.html": "/user-guide/getting-started/upgrade.html",
        "/other-articles-and-presentations.html": "/user-guide/other/articles-and-presentations.html",
        "/other-logos.html": "/user-guide/other/logos.html",
        "/other-where-used.html": "/user-guide/other/where-used.html",
        "/other-xml-mismatch.html": "/user-guide/other/xml-mismatch.htm",
        "/ref-apack.html": "/user-guide/reference/apack.html",
        "/ref-authorizations.html": "/user-guide/reference/authorizations.html",
        "/ref-database-util.html": "/user-guide/reference/database-util.html",
        "/ref-exits.html": "/user-guide/reference/exits.html",
        "/ref-folders-filenames.html": "/user-guide/reference/folders-filenames.html",
        "/ref-hotkeys.html": "/user-guide/reference/hotkeys.html",
        "/ref-icons.html": "/user-guide/reference/icons.html",
        "/ref-namespaces.html": "/user-guide/reference/namespaces.html",
        "/ref-packages.html": "/user-guide/reference/packages.html",
        "/ref-supported.html": "/user-guide/reference/supported.html",
        "/ref-translations.html": "/user-guide/reference/translations.html",
        "/settings-background-mode.html": "/user-guide/repo-settings/background-mode.html",
        "/settings-dot-abapgit.html": "/user-guide/repo-settings/dot-abapgit.html",
        "/settings-local.html": "/user-guide/repo-settings/local.html",
        "/settings-remote.html": "/user-guide/repo-settings/remote.html",
        "/settings-stats.html": "/user-guide/repo-settings/stats.html",
        "/development/adding-icons.html": "/development-guide/user-interface/adding-icons.html",
        "/development/api.html": "/development-guide/api/api.html",
        "/development/ci.html": "/development-guide/testing/ci.html",
        "/development/contributing.html": "/development-guide/read-first/contributing.html",
        "/development/debugging.html": "/development-guide/testing/debugging.html",
        "/development/developing-ui-css.html": "/development-guide/user-interface/developing-ui-css.html",
        "/development/developing-ui-forms.html": "/development-guide/user-interface/developing-ui-forms.html",
        "/development/developing-ui-js.html": "/development-guide/user-interface/developing-ui-js.html",
        "/development/developing-ui.html": "/development-guide/user-interface/developing-ui.html",
        "/development/docs.html": "/development-guide/technical-details/docs.html",
        "/development/file-formats.html": "/development-guide/serializers/file-formats.html",
        "/development/guide-changelog.html": "/development-guide/read-first/changelog.html",
        "/development/guidelines.html": "/development-guide/read-first/guidelines.html",
        "/development/index.html": "/development-guide/",
        "/development/serializers.html": "/development-guide/serializers/serializers.html",
        "/development/technical-links.html": "/development-guide/technical-details/technical-links.html",
        "/development/tests.html": "/development-guide/testing/tests.html",
        "/development/versioning.html": "/development-guide/read-first/versioning.html",
        "/user-guide/projects/online/uninstall.html": "/user-guide/projects/remove/uninstall.html"
      }
    })    
  ]
});
