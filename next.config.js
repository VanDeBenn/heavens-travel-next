/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: ["imgs.search.brave.com", "localhost", "192.168.195.16"],
  },
};
