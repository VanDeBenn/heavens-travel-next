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
    domains: ["ik.imagekit.io", "www.traveltomtom.net"],
  },
};
