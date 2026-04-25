/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.adidas.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dynamic.zacdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static-id.zacdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "down-id.img.susercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};
module.exports = nextConfig;