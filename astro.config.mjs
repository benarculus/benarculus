import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";

const preview = process.env.SITE_MODE === "preview";

function rejectRawHtml() {
  return (tree, file) => {
    const visit = (node) => {
      if (node.type === "html") {
        file.fail("Raw HTML is not allowed in blog Markdown.", node);
      }
      if (node.children) {
        node.children.forEach(visit);
      }
    };
    visit(tree);
  };
}

export default defineConfig({
  output: "static",
  site: preview ? "https://benarculus.github.io" : "https://www.benarculus.com",
  base: preview ? "/benarculus" : "/",
  trailingSlash: "never",
  markdown: {
    processor: unified({
      remarkPlugins: [rejectRawHtml],
    }),
    shikiConfig: {
      theme: "github-dark",
    },
  },
});
