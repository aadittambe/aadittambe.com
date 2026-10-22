// Resize via Netlify Image CDN (not a function); original file in local dev.
export default function netlifyImageLoader({ src, width, quality }) {
  if (process.env.NODE_ENV === "development") return src;
  const params = new URLSearchParams({ url: src, w: String(width) });
  if (quality) params.set("q", String(quality));
  return `/.netlify/images?${params}`;
}
