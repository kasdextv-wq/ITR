import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";

const root = resolve(import.meta.dirname, "..");
const portArg = process.argv.indexOf("--port");
const port = portArg >= 0 ? Number(process.argv[portArg + 1]) : 3000;
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(
      new URL(request.url, "http://server").pathname,
    );
    const relative = pathname === "/" ? "index.html" : pathname.slice(1);
    if (!relative.startsWith("assets/") && !/^[a-z-]+\.html$/.test(relative)) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    const file = resolve(root, relative);
    if (
      !file.startsWith(root + sep) ||
      (relative.startsWith("assets/") &&
        !file.startsWith(resolve(root, "assets") + sep)) ||
      !(await stat(file)).isFile()
    ) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    response.setHeader(
      "Content-Type",
      types[extname(file)] || "application/octet-stream",
    );
    response.setHeader("Cache-Control", "no-cache");
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.end(await readFile(file));
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}).listen(port, "0.0.0.0", () => console.log(`ИТР: http://0.0.0.0:${port}`));
