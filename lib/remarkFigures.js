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

// Same spinner the project tiles render (CustomSpinner in pages/projects.js),
// as a plain SVG string since this markup is injected, not React. The
// rotation is CSS (see the spinner rules in _projects.scss), not SMIL.
const SPINNER_SVG =
  `<svg width="36" height="36" viewBox="0 0 50 50" role="status" aria-label="loading">` +
  `<circle cx="25" cy="25" r="20" fill="none" stroke="var(--site-text)" ` +
  `stroke-width="4" stroke-linecap="round" stroke-dasharray="31.4 31.4">` +
  `</circle></svg>`;

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

      // next/image isn't available here (the body is injected as an HTML
      // string, not React), so hand-build what it would have rendered.
      const attrs = [
        ...optimizedSrc(url, size),
        `alt="${escapeHtml(alt)}"`,
        ...(size ? [`width="${size.width}"`, `height="${size.height}"`] : []),
        `loading="lazy"`,
        `decoding="async"`,
      ].join(" ");

      const caption = title
        ? `<figcaption>${escapeHtml(title)}</figcaption>`
        : "";

      // Unmeasurable images (remote URLs) can't reserve a box, so they get no
      // spinner treatment — there'd be nothing to overlay until they arrive.
      if (!size) {
        return {
          type: "html",
          value: `<figure><img ${attrs}>${caption}</figure>`,
        };
      }

      // A sized wrapper stands in for the image before it loads, doing two
      // jobs. It reserves the box (the stylesheet's `width: auto` — which
      // keeps portrait screenshots from stretching — discards the width="…"
      // hint, so without this the text below would jump): natural width,
      // capped by the column and by the 60vh height limit from
      // _projects.scss, with height following the aspect ratio. And it hosts
      // the same spinner overlay the project tiles show, faded out by the
      // inline handler once the image arrives — the injected-HTML stand-in
      // for the tiles' React onLoad (styles in _projects.scss).
      const ratio = (size.width / size.height).toFixed(4);
      const wrapperStyle =
        `width: min(100%, ${size.width}px, calc(60vh * ${ratio})); ` +
        `aspect-ratio: ${size.width} / ${size.height}`;
      const markLoaded = `this.closest('figure').classList.add('figure-loaded')`;

      return {
        type: "html",
        value:
          `<figure>` +
          `<span class="figure-media" style="${wrapperStyle}">` +
          `<span class="figure-spinner">${SPINNER_SVG}</span>` +
          `<img ${attrs} onload="${markLoaded}" onerror="${markLoaded}">` +
          `</span>` +
          `${caption}</figure>`,
      };
    });
  };
}
