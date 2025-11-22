if (!self.define) {
  let e,
    s = {};
  const a = (a, c) => (
    (a = new URL(a + ".js", c).href),
    s[a] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, i) => {
    const n =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[n]) return;
    let t = {};
    const d = (e) => a(e, n),
      r = { module: { uri: n }, exports: t, require: d };
    s[n] = Promise.all(c.map((e) => r[e] || d(e))).then((e) => (i(...e), t));
  };
}
define(["./workbox-4754cb34"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "/404.svg", revision: "552058d009b83fadeb08cd5e43a40528" },
        {
          url: "/_next/static/N60vfVTQozvOGTqOKw7yc/_buildManifest.js",
          revision: "e827326a2fd12d0276156a165d0444d9",
        },
        {
          url: "/_next/static/N60vfVTQozvOGTqOKw7yc/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/117b9d7f-c4d9596167e450d2.js",
          revision: "c4d9596167e450d2",
        },
        {
          url: "/_next/static/chunks/1388-94c3b2b7aa232c5e.js",
          revision: "94c3b2b7aa232c5e",
        },
        {
          url: "/_next/static/chunks/1664-939297b106bd6802.js",
          revision: "939297b106bd6802",
        },
        {
          url: "/_next/static/chunks/1766.b9ae83fce1cec76d.js",
          revision: "b9ae83fce1cec76d",
        },
        {
          url: "/_next/static/chunks/257e8032-c805c985b5a6ffba.js",
          revision: "c805c985b5a6ffba",
        },
        {
          url: "/_next/static/chunks/2e3a845b-6d4a7de629b106a2.js",
          revision: "6d4a7de629b106a2",
        },
        {
          url: "/_next/static/chunks/3381-841196a77db775a0.js",
          revision: "841196a77db775a0",
        },
        {
          url: "/_next/static/chunks/3475-9f2554d3a272e8f5.js",
          revision: "9f2554d3a272e8f5",
        },
        {
          url: "/_next/static/chunks/4009-05b7de1863f21825.js",
          revision: "05b7de1863f21825",
        },
        {
          url: "/_next/static/chunks/41155975-2f9ffb437c788828.js",
          revision: "2f9ffb437c788828",
        },
        {
          url: "/_next/static/chunks/4548-756bfded1953689c.js",
          revision: "756bfded1953689c",
        },
        {
          url: "/_next/static/chunks/4577d2ec-d23e606683ad69a6.js",
          revision: "d23e606683ad69a6",
        },
        {
          url: "/_next/static/chunks/4792-83209ec0e78c49d2.js",
          revision: "83209ec0e78c49d2",
        },
        {
          url: "/_next/static/chunks/5d416436-544de50b96aff1cb.js",
          revision: "544de50b96aff1cb",
        },
        {
          url: "/_next/static/chunks/646e0218-12e76c56a25e8c1e.js",
          revision: "12e76c56a25e8c1e",
        },
        {
          url: "/_next/static/chunks/6806-a37570e4947e7945.js",
          revision: "a37570e4947e7945",
        },
        {
          url: "/_next/static/chunks/68c0a17d-add0ca9268cf6503.js",
          revision: "add0ca9268cf6503",
        },
        {
          url: "/_next/static/chunks/6931-007ffcc86442b2c4.js",
          revision: "007ffcc86442b2c4",
        },
        {
          url: "/_next/static/chunks/69d2ed9c-5f04f6764c59b611.js",
          revision: "5f04f6764c59b611",
        },
        {
          url: "/_next/static/chunks/6eb5140f-ce61d2bd13c0a403.js",
          revision: "ce61d2bd13c0a403",
        },
        {
          url: "/_next/static/chunks/7501-c16042fab8271ef3.js",
          revision: "c16042fab8271ef3",
        },
        {
          url: "/_next/static/chunks/9802-4e1772b2b561309f.js",
          revision: "4e1772b2b561309f",
        },
        {
          url: "/_next/static/chunks/b55cbb4c-c7130c489630f102.js",
          revision: "c7130c489630f102",
        },
        {
          url: "/_next/static/chunks/cb355538-e643b579ed99c15f.js",
          revision: "e643b579ed99c15f",
        },
        {
          url: "/_next/static/chunks/d9067523-6703bb45c236a300.js",
          revision: "6703bb45c236a300",
        },
        {
          url: "/_next/static/chunks/e21e5bbe-b0ff56c5e55935a8.js",
          revision: "b0ff56c5e55935a8",
        },
        {
          url: "/_next/static/chunks/ebc70433-e5a5190e8dc6910d.js",
          revision: "e5a5190e8dc6910d",
        },
        {
          url: "/_next/static/chunks/framework-0995a3e8436ddc4f.js",
          revision: "0995a3e8436ddc4f",
        },
        {
          url: "/_next/static/chunks/main-d0149719754102f9.js",
          revision: "d0149719754102f9",
        },
        {
          url: "/_next/static/chunks/pages/404-d12177aee623baa3.js",
          revision: "d12177aee623baa3",
        },
        {
          url: "/_next/static/chunks/pages/_app-abdbe3741a56667b.js",
          revision: "abdbe3741a56667b",
        },
        {
          url: "/_next/static/chunks/pages/_error-a1dfd1adb240a82a.js",
          revision: "a1dfd1adb240a82a",
        },
        {
          url: "/_next/static/chunks/pages/about-c7e39f72c9e284b1.js",
          revision: "c7e39f72c9e284b1",
        },
        {
          url: "/_next/static/chunks/pages/auth/error-46cc77b4e2df7609.js",
          revision: "46cc77b4e2df7609",
        },
        {
          url: "/_next/static/chunks/pages/auth/request-otp-20a769bd4f5b0231.js",
          revision: "20a769bd4f5b0231",
        },
        {
          url: "/_next/static/chunks/pages/auth/reset-password-7f656bba00440245.js",
          revision: "7f656bba00440245",
        },
        {
          url: "/_next/static/chunks/pages/auth/signin-b827ab52ce812838.js",
          revision: "b827ab52ce812838",
        },
        {
          url: "/_next/static/chunks/pages/auth/signup-77b66c971f340651.js",
          revision: "77b66c971f340651",
        },
        {
          url: "/_next/static/chunks/pages/auth/verify-otp-c323da46ed3fff0e.js",
          revision: "c323da46ed3fff0e",
        },
        {
          url: "/_next/static/chunks/pages/dashboard-511e60be09d73fdb.js",
          revision: "511e60be09d73fdb",
        },
        {
          url: "/_next/static/chunks/pages/dashboard/airtime-ebf7726e05835102.js",
          revision: "ebf7726e05835102",
        },
        {
          url: "/_next/static/chunks/pages/dashboard/bonus-7e74fe7246b67c35.js",
          revision: "7e74fe7246b67c35",
        },
        {
          url: "/_next/static/chunks/pages/dashboard/cable-e8c89e0a0f26ae45.js",
          revision: "e8c89e0a0f26ae45",
        },
        {
          url: "/_next/static/chunks/pages/dashboard/data-450cf968902b8615.js",
          revision: "450cf968902b8615",
        },
        {
          url: "/_next/static/chunks/pages/dashboard/game-c19b79f35d78946c.js",
          revision: "c19b79f35d78946c",
        },
        {
          url: "/_next/static/chunks/pages/dashboard/haven-d77cd8539ac7dd42.js",
          revision: "d77cd8539ac7dd42",
        },
        {
          url: "/_next/static/chunks/pages/dashboard/help-6f0050e10273639c.js",
          revision: "6f0050e10273639c",
        },
        {
          url: "/_next/static/chunks/pages/dashboard/loan-b738b1d707e5ace2.js",
          revision: "b738b1d707e5ace2",
        },
        {
          url: "/_next/static/chunks/pages/dashboard/my-wallet-f0bbd193a5cebaeb.js",
          revision: "f0bbd193a5cebaeb",
        },
        {
          url: "/_next/static/chunks/pages/dashboard/netflix-05845a2dd5540025.js",
          revision: "05845a2dd5540025",
        },
        {
          url: "/_next/static/chunks/pages/dashboard/notification-8048570830c60df4.js",
          revision: "8048570830c60df4",
        },
        {
          url: "/_next/static/chunks/pages/dashboard/power-b0f8dfead1697f31.js",
          revision: "b0f8dfead1697f31",
        },
        {
          url: "/_next/static/chunks/pages/dashboard/profile-0ffe570fe22ecbb5.js",
          revision: "0ffe570fe22ecbb5",
        },
        {
          url: "/_next/static/chunks/pages/dashboard/profit-24a10c0730a93adc.js",
          revision: "24a10c0730a93adc",
        },
        {
          url: "/_next/static/chunks/pages/dashboard/savings-d35ccbdb1246ee3c.js",
          revision: "d35ccbdb1246ee3c",
        },
        {
          url: "/_next/static/chunks/pages/dashboard/transaction-3bcd96a861993ce7.js",
          revision: "3bcd96a861993ce7",
        },
        {
          url: "/_next/static/chunks/pages/dashboard/transactions-a5f6208b4f4ed2a7.js",
          revision: "a5f6208b4f4ed2a7",
        },
        {
          url: "/_next/static/chunks/pages/dashboard/transfer-93f908ae55a2fa81.js",
          revision: "93f908ae55a2fa81",
        },
        {
          url: "/_next/static/chunks/pages/error-45e605baf7a50e69.js",
          revision: "45e605baf7a50e69",
        },
        {
          url: "/_next/static/chunks/pages/index-94910a5fb7f98856.js",
          revision: "94910a5fb7f98856",
        },
        {
          url: "/_next/static/chunks/pages/offline-e1220c1bad9034b7.js",
          revision: "e1220c1bad9034b7",
        },
        {
          url: "/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",
          revision: "79330112775102f91e1010318bae2bd3",
        },
        {
          url: "/_next/static/chunks/webpack-afa229556068d602.js",
          revision: "afa229556068d602",
        },
        {
          url: "/_next/static/css/670ad82becda5f61.css",
          revision: "670ad82becda5f61",
        },
        {
          url: "/_next/static/media/122c360d7fe6d395-s.p.woff2",
          revision: "9b2795fb691d8f8a83312a4436f5a453",
        },
        {
          url: "/_next/static/media/26a46d62cd723877-s.woff2",
          revision: "befd9c0fdfa3d8a645d5f95717ed6420",
        },
        {
          url: "/_next/static/media/55c55f0601d81cf3-s.woff2",
          revision: "43828e14271c77b87e3ed582dbff9f74",
        },
        {
          url: "/_next/static/media/581909926a08bbc8-s.woff2",
          revision: "f0b86e7c24f455280b8df606b89af891",
        },
        {
          url: "/_next/static/media/6d93bde91c0c2823-s.woff2",
          revision: "621a07228c8ccbfd647918f1021b4868",
        },
        {
          url: "/_next/static/media/97e0cb1ae144a2a9-s.woff2",
          revision: "e360c61c5bd8d90639fd4503c829c2dc",
        },
        {
          url: "/_next/static/media/9bbb7f84f3601865-s.woff2",
          revision: "d8134b7ae9ca2232a397ef9afa6c8d30",
        },
        {
          url: "/_next/static/media/9f05b6a2725a7318-s.woff2",
          revision: "afbfd524bdefea1003f0ee71b617e50e",
        },
        {
          url: "/_next/static/media/a34f9d1faa5f3315-s.p.woff2",
          revision: "d4fe31e6a2aebc06b8d6e558c9141119",
        },
        {
          url: "/_next/static/media/a8eac78432f0a60b-s.woff2",
          revision: "be605f007472cc947fe6b6bb493228a5",
        },
        {
          url: "/_next/static/media/c740c1d45290834f-s.woff2",
          revision: "bff99a4bbc4740c49b75b52f290be90e",
        },
        {
          url: "/_next/static/media/d0697bdd3fb49a78-s.woff2",
          revision: "50b29fea20cba8e522c34a1413592253",
        },
        {
          url: "/_next/static/media/d14523e549eb010c-s.woff2",
          revision: "85964479247c3a9915ddd4d7e797cf70",
        },
        {
          url: "/_next/static/media/df0a9ae256c0569c-s.woff2",
          revision: "d54db44de5ccb18886ece2fda72bdfe0",
        },
        {
          url: "/_next/static/media/e9b60341794c6df7-s.p.woff2",
          revision: "b2529f613a5fd75a4e38f090cfa1ecbc",
        },
        {
          url: "/_next/static/media/e9c77e354c009cc8-s.woff2",
          revision: "16bb99df46face2f2538ed0220478ac6",
        },
        { url: "/ai.jpg", revision: "06a5d8433fb192185bf0a1e8f8a36499" },
        { url: "/bi.jpg", revision: "021daa151d5ace76752c6dcdbcb6ac77" },
        {
          url: "/coming-soon.svg",
          revision: "cfe503df8cfe4139eb775928139cf891",
        },
        { url: "/favicon.ico", revision: "156a994421d8b0b6434d043a8e34c543" },
        {
          url: "/icon512_maskable.png",
          revision: "db3ad8fc4c757ac254f80fad12ed1d5e",
        },
        {
          url: "/icon512_rounded.png",
          revision: "402bdee24b6d3699ca7088a3bbb3a9d2",
        },
        {
          url: "/icons/icon-144x144.png",
          revision: "ba344645e30da57ee4e0a88e0e95a15d",
        },
        {
          url: "/icons/icon-192x192.png",
          revision: "0fc0f7a072d07f0f5217f318528235af",
        },
        {
          url: "/icons/icon-36x36.png",
          revision: "38b02bb060c17cbb1678041a5f0a314b",
        },
        {
          url: "/icons/icon-48x48.png",
          revision: "343a83273497e053432a550fcc5f69bc",
        },
        {
          url: "/icons/icon-512x512.png",
          revision: "e1f75cf9dd65997241ff7d5ecd9cf4f4",
        },
        {
          url: "/icons/icon-72x72.png",
          revision: "8dfc2a55de580f58abd44ec5dee35c62",
        },
        {
          url: "/icons/icon-96x96.png",
          revision: "2e8ea7f7527d0eb441db316689d410ae",
        },
        {
          url: "/icons/maskable.png",
          revision: "0fc0f7a072d07f0f5217f318528235af",
        },
        { url: "/ld.jpg", revision: "ad6936a4c13472eac4efc854c264d07d" },
        { url: "/manifest.json", revision: "0d1f57834d99c9ee3ea1383ca67cf9af" },
        {
          url: "/no_connection.svg",
          revision: "5c343247442605ff9751df08d4eef9d8",
        },
        { url: "/not-found.svg", revision: "bf2389d264b497225b7efdb8740e6ef5" },
        {
          url: "/sounds/fail.mp3",
          revision: "3bb7b5e9986e2b7042ac876441a2cd6a",
        },
        {
          url: "/sounds/reset.mp3",
          revision: "ca4a8f8f737559b67ec3f532a5609b1a",
        },
        {
          url: "/sounds/success.mp3",
          revision: "b26c3a0954d848d773b804d0802f406d",
        },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: c,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
