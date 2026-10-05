import { mkdir, readFile, writeFile, readdir, copyFile, rm } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, "server"), { recursive: true });
await mkdir(path.join(dist, ".openai"), { recursive: true });
const assets = {};
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".jpg": "image/jpeg" };
const paths = ["index.html", "script.js", "styles.css", ...(await readdir(path.join(root, "assets/maps"))).filter((name) => name.endsWith(".jpg")).map((name) => `assets/maps/${name}`)];
for (const file of paths) assets[`/${file}`] = { body: (await readFile(path.join(root, file))).toString("base64"), type: types[path.extname(file)] };
await writeFile(path.join(dist, "server/assets.mjs"), `export default ${JSON.stringify(assets)};\n`);
await copyFile(path.join(root, "worker/index.mjs"), path.join(dist, "server/index.js"));
await copyFile(path.join(root, "app/api/fetch/route.js"), path.join(dist, "server/api.mjs"));
await copyFile(path.join(root, ".openai/hosting.json"), path.join(dist, ".openai/hosting.json"));
console.log(`Sites build complete: ${paths.length} assets and server-side fetch cache`);
