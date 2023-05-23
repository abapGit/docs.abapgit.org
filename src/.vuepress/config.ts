import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";
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
    })
  ]
});
