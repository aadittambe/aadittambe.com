/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_MODIFIED_DATE: new Date().toLocaleDateString("en-US"),
  },
};

module.exports = nextConfig;
