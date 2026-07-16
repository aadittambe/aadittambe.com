/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  experimental: {
    // Restore scroll position on back/forward between pages
    scrollRestoration: true,
  },
  reactStrictMode: true,
  images: {
    // AVIF first (smaller), WebP fallback for browsers without it.
    formats: ["image/avif", "image/webp"],
    // Project thumbnails may be full URLs; only these hosts are allowed
    // through the image optimizer.
    remotePatterns: [
      "arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com",
      "cnsmaryland.org",
      "img.washingtonpost.com",
      "media-cldnry.s-nbcnews.com",
      "www.washingtonpost.com",
    ].map((hostname) => ({ protocol: "https", hostname })),
  },
  env: {
    NEXT_PUBLIC_MODIFIED_DATE: new Date().toLocaleDateString("en-US", {
      timeZone: "America/New_York",
    }),
  },
};

module.exports = nextConfig;
