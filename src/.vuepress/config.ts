import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "en-US",
      title: "abapGit Docs",
      description: "A git client for ABAP developed in ABAP"
    }
  },

  bundler: viteBundler(),

  theme
});
