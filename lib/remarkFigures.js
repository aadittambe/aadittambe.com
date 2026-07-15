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

// Widths requested from the image optimizer. Must be values Next.js accepts —
// its default deviceSizes/imageSizes list — or /_next/image responds 400.
// 640/1080 bracket the ~672px content column at 1x/1.5x; 1920 covers retina.
const OPTIMIZER_WIDTHS = [640, 1080, 1920];

const optimizerUrl = (url, width) =>
  `/_next/image?url=${encodeURIComponent(url)}&w=${width}&q=75`;

// SVG is blocked by the optimizer and GIF would lose animation; serve both
// untouched. Remote URLs are skipped too — they'd 400 unless their host is in
// next.config.js remotePatterns.
const isOptimizable = (url) =>
  url.startsWith("/") && !/\.(svg|gif)$/i.test(url);

// src/srcset pointing at the image optimizer, so body images are served
// resized and recompressed (WebP/AVIF) like next/image thumbnails are.
// srcset widths larger than the source are pointless (the optimizer never
// upscales), so stop at the first width that covers the intrinsic size.
const optimizedSrc = (url, size) => {
  if (!isOptimizable(url)) return [`src="${escapeHtml(url)}"`];

  let widths = OPTIMIZER_WIDTHS;
  if (size) {
    const cover = OPTIMIZER_WIDTHS.findIndex((w) => w >= size.width);
    if (cover !== -1) widths = OPTIMIZER_WIDTHS.slice(0, cover + 1);
  }

  const srcset = widths.map((w) => `${optimizerUrl(url, w)} ${w}w`).join(", ");
  return [
    `src="${escapeHtml(optimizerUrl(url, widths[widths.length - 1]))}"`,
    `srcset="${escapeHtml(srcset)}"`,
    `sizes="(max-width: 708px) 100vw, 672px"`,
  ];
};

export default function remarkFigures() {
  return (tree) => {
    tree.children = tree.children.map((node) => {
      if (!isLoneImage(node)) return node;

      const { url, alt, title } = node.children[0];
      const size = measure(url);

      // The stylesheet's `width: auto` (which keeps portrait screenshots from
      // stretching) also discards the width="…" hint, so the browser reserves
      // no space before the file loads and the text below jumps. Spell the
      // displayed width out inline instead — natural size, capped by the
      // column and by the 60vh height limit from _projects.scss — which the
      // browser can resolve up front; height then follows the aspect ratio.
      const style = (s) =>
        `style="width: min(100%, ${s.width}px, calc(60vh * ${(s.width / s.height).toFixed(4)}))"`;

      // next/image isn't available here (the body is injected as an HTML
      // string, not React), so hand-build what it would have rendered.
      const attrs = [
        ...optimizedSrc(url, size),
        `alt="${escapeHtml(alt)}"`,
        ...(size
          ? [`width="${size.width}"`, `height="${size.height}"`, style(size)]
          : []),
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
