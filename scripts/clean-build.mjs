import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const foldersToClean = ["out", ".next", "build"];

for (const folder of foldersToClean) {
  const folderPath = path.join(root, folder);

  if (!fs.existsSync(folderPath)) continue;

  const stat = fs.statSync(folderPath);
  if (!stat.isDirectory()) continue;

  console.log(`[prebuild] removing ${folder}/`);
  fs.rmSync(folderPath, { recursive: true, force: true });
}
