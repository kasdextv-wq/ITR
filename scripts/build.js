import { mkdir, writeFile, readFile, cp, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { build } from "esbuild";
import { format } from "prettier";
import { pages, renderPage } from "../src/pages.js";

const root = resolve(import.meta.dirname, "..");
const assets = resolve(root, "assets");
await rm(assets, { recursive: true, force: true });
await mkdir(resolve(assets, "css"), { recursive: true });
await mkdir(resolve(assets, "js"), { recursive: true });
await cp(resolve(root, "public/images"), resolve(assets, "images"), {
  recursive: true,
});
await cp(resolve(root, "public/fonts"), resolve(assets, "fonts"), {
  recursive: true,
});
await cp(resolve(root, "public/favicon.svg"), resolve(assets, "favicon.svg"));
await cp(resolve(root, "src/styles.css"), resolve(assets, "css/styles.css"));
await cp(resolve(root, "src/pages.css"), resolve(assets, "css/pages.css"));
await cp(resolve(root, "src/theme.js"), resolve(assets, "js/theme.js"));
const bundle = await build({
  entryPoints: [resolve(root, "src/main.js")],
  bundle: true,
  format: "iife",
  target: "es2020",
  write: false,
  minify: false,
  legalComments: "none",
  charset: "utf8",
});
const javascript = bundle.outputFiles[0].text
  .replace(/^\s*\/\/[^\n]*\n/gm, "")
  .replace(/\/\* @__PURE__ \*\//g, "");
await writeFile(
  resolve(assets, "js/main.js"),
  await format(javascript, { parser: "babel" }),
);
for (const page of pages) {
  const html = await format(renderPage(page), {
    parser: "html",
    printWidth: 100,
  });
  await writeFile(resolve(root, `${page.id}.html`), html);
}
console.log(
  `Built ${pages.length} pages with separate CSS, JavaScript, fonts and images.`,
);
