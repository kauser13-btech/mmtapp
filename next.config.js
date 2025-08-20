/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  trailingSlash: true,
  // images: {
  //   unoptimized: false,
  // },
  // experimental: {
  //   serverActions: true,
  // },
  images: {
    domains: ['api.matchmytees.com','localhost','65.0.176.131'],
    unoptimized: true
},
reactStrictMode: false,
};

module.exports = nextConfig;
