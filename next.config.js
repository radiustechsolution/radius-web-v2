/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  // runtimeCaching: [
  //   {
  //     urlPattern: ({ request }) => request.mode === "navigate",
  //     handler: "NetworkFirst",
  //     options: {
  //       cacheName: "pages-cache",
  //       networkTimeoutSeconds: 10,
  //       fallback: "/offline",
  //     },
  //   },
  // ],
});

// const nextConfig = {
//   reactStrictMode: true,
//   pwa: {
//     dest: "public",
//     register: true,
//     skipWaiting: true,
//   },
// };

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = nextConfig;
