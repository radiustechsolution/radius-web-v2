/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

// for pwa

// /** @type {import('next').NextConfig} */
// const withPWA = require("next-pwa")({
//   dest: "public",
//   disable: process.env.NODE_ENV === "development",
// });

// module.exports = withPWA({
//   reactStrictMode: true,
//   pwa: {
//     dest: "public",
//     register: true,
//     skipWaiting: true,
//   },
//   // output: "export",
// });
