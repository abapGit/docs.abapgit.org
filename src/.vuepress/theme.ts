import { hopeTheme } from "vuepress-theme-hope";
import { enNavbar, deNavbar } from "./navbar/index.js";
import { enSidebar, deSidebar } from "./sidebar/index.js";

export default hopeTheme({
  hostname: "https://docs.abapgit.org",
  author: {
    name: "abapGit",
    url: "https://github.com/abapGit"
  },
  repo: "https://github.com/abapGit/docs.abapgit.org",
  docsDir: "src",
  iconAssets: "fontawesome-with-brands",
  editLink: true,
  logo: "/logo.svg",
  logoDark: "/logo-dark.svg",
  favicon: "/favicon.svg",

  locales: {
    "/": {
      // navbar
      navbar: enNavbar,

      // sidebar
      sidebar: enSidebar,
      footer: "",
      copyright: "Copyright © 2017-present abapGit",
      displayFooter: true
    }

    /**
     * German locale config
     */
    // "/de/": {
    //   // navbar
    //   navbar: deNavbar,

    //   // sidebar
    //   sidebar: deSidebar,

    //   footer: "Default footer",

    //   displayFooter: true,

    //   // page meta
    //   metaLocales: {
    //     editLink: "Diese Seite auf GitHub bearbeiten",
    //   },
    // },
  },

  plugins: {
    autoCatalog: false,
    // comment: {
    //   // @ts-expect-error: You should generate and use your own comment service
    //   provider: "Waline",
    // },

    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      presentation: ["highlight", "math", "search", "notes", "zoom"],
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended"
              };
          }
        }
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true
    }
  }
});
