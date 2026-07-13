import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");

await fs.mkdir(path.join(publicDir, "assets", "maps"), { recursive: true });
await fs.copyFile(path.join(root, "script.js"), path.join(publicDir, "script.js"));

const mapsDir = path.join(root, "assets", "maps");
const mapFiles = await fs.readdir(mapsDir);
await Promise.all(mapFiles
  .filter((file) => file.endsWith(".jpg"))
  .map((file) => fs.copyFile(path.join(mapsDir, file), path.join(publicDir, "assets", "maps", file))));
