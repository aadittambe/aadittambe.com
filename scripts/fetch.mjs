import { writeFile } from "fs/promises";
import archieml from "archieml";

const CWD = process.cwd();

const DOCS = [
  {
    id: "1lnWLWaUz2b-ho5QxBcjh5jdxF4Gf_K2gumFWfyma4xc",
    filepath: "data/content.json",
  },
];

async function fetchDoc({ id, filepath = "data/content.json" }) {
  const url = `https://docs.google.com/document/d/${id}/export?format=txt`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch doc ${id} (${response.status})`);
  }

  const text = await response.text();
  const parsed = archieml.load(text);

  const outputPath = `${CWD}/${filepath}`;
  await writeFile(outputPath, JSON.stringify(parsed, null, 2));

  console.log(`✓ Wrote ${outputPath}`);
}

async function main() {
  for (const doc of DOCS) {
    if (!doc.id) continue;
    await fetchDoc(doc);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
