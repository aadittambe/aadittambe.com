import { rm } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const foldersToClean = ["out", ".next", "build"];

await Promise.all(
  foldersToClean.map((folder) => {
    const folderPath = path.join(root, folder);
    console.log(`[prebuild] removing ${folder}/`);
    return rm(folderPath, { recursive: true, force: true });
  }),
);
