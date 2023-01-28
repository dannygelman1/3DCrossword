/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "akamai",
    path: "",
  },
  basePath: "/3DCrossword",
  assetPrefix: "/3DCrossword",
};

module.exports = nextConfig;
