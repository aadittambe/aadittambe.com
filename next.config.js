/** @type {import('next').NextConfig} */
const nextConfig = {
  // Plain HTML/JS/CSS in out/ — no Netlify server function.
  output: "export",
  trailingSlash: true,
  experimental: {
    // Restore scroll position on back/forward between pages
    scrollRestoration: true,
  },
  reactStrictMode: true,
  images: {
    // Netlify Image CDN does the resizing; allowed remote hosts are in netlify.toml.
    loader: "custom",
    loaderFile: "./lib/netlifyImageLoader.js",
  },
  env: {
    NEXT_PUBLIC_MODIFIED_DATE: new Date().toLocaleDateString("en-US", {
      timeZone: "America/New_York",
    }),
  },
};

module.exports = nextConfig;
