import fs from "fs";
import path from "path";
import { imageSize } from "image-size";

// Turns a paragraph that holds nothing but an image into a <figure>, using
// markdown's native image title as the caption:
//
//   ![alt text](/images/projects/foo.jpg "This becomes the caption")
//
// An image with no title still becomes a <figure> (so spacing is consistent),
// just without a <figcaption>. Images sitting inline within a sentence are
// left alone.

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const isLoneImage = (node) =>
  node.type === "paragraph" &&
  node.children.length === 1 &&
  node.children[0].type === "image";

// Intrinsic size lets the browser reserve the right box before the file loads,
// so nothing below the image jumps. Only local files can be measured; a remote
// URL is served without dimensions.
const measure = (url) => {
  if (!url.startsWith("/")) return null;
  try {
    const { width, height } = imageSize(
      fs.readFileSync(path.join(process.cwd(), "public", url)),
    );
    return width && height ? { width, height } : null;
  } catch {
    return null;
  }
};

export default function remarkFigures() {
  return (tree) => {
    tree.children = tree.children.map((node) => {
      if (!isLoneImage(node)) return node;

      const { url, alt, title } = node.children[0];
      const size = measure(url);

      // next/image isn't available here (the body is injected as an HTML string,
      // not React) and wouldn't optimise anything anyway — `output: "export"`
      // forces images.unoptimized — so add the attributes it would have set.
      const attrs = [
        `src="${escapeHtml(url)}"`,
        `alt="${escapeHtml(alt)}"`,
        ...(size ? [`width="${size.width}"`, `height="${size.height}"`] : []),
        `loading="lazy"`,
        `decoding="async"`,
      ].join(" ");

      const caption = title
        ? `<figcaption>${escapeHtml(title)}</figcaption>`
        : "";

      return {
        type: "html",
        value: `<figure><img ${attrs}>${caption}</figure>`,
      };
    });
  };
}
