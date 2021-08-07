if (!self.define) {
  const e = (e) => {
      "require" !== e && (e += ".js");
      let s = Promise.resolve();
      return (
        i[e] ||
          (s = new Promise(async (s) => {
            if ("document" in self) {
              const i = document.createElement("script");
              (i.src = e), document.head.appendChild(i), (i.onload = s);
            } else importScripts(e), s();
          })),
        s.then(() => {
          if (!i[e]) throw new Error(`Module ${e} didn’t register its module`);
          return i[e];
        })
      );
    },
    s = (s, i) => {
      Promise.all(s.map(e)).then((e) => i(1 === e.length ? e[0] : e));
    },
    i = { require: Promise.resolve(s) };
  self.define = (s, a, p) => {
    i[s] ||
      (i[s] = Promise.resolve().then(() => {
        let i = {};
        const c = { uri: location.origin + s.slice(1) };
        return Promise.all(
          a.map((s) => {
            switch (s) {
              case "exports":
                return i;
              case "module":
                return c;
              default:
                return e(s);
            }
          })
        ).then((e) => {
          const s = p(...e);
          return i.default || (i.default = s), i;
        });
      }));
  };
}
define("./sw.js", ["./workbox-31b9de65"], function (e) {
  "use strict";
  self.addEventListener("message", (e) => {
    e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        {
          url: "a053ea43c6258772ae21.css",
          revision: "03be72b71af3124cbab54b36d94f425d",
        },
        {
          url: "d75049c3f83705934590bd4f0e983438.mp3",
          revision: "342c532d381f22ed18d983ae1b3b8c96",
        },
        {
          url: "icons/apple-icon-180.png",
          revision: "2b275c5e38554f80f1f327691b149e47",
        },
        {
          url: "icons/apple-splash-1125-2436.jpg",
          revision: "c92ed3031824879fb0f119da0f89f0e7",
        },
        {
          url: "icons/apple-splash-1136-640.jpg",
          revision: "5c4467fb10cabf488da41fd212e1621c",
        },
        {
          url: "icons/apple-splash-1170-2532.jpg",
          revision: "06c549e42e850f32038776a9509e5676",
        },
        {
          url: "icons/apple-splash-1242-2208.jpg",
          revision: "004f06546f4539b43217732b8aa31309",
        },
        {
          url: "icons/apple-splash-1242-2688.jpg",
          revision: "c93d7846ea2c205fae93396b8be5ef4b",
        },
        {
          url: "icons/apple-splash-1284-2778.jpg",
          revision: "be3781afc1d8abfe37dc74bd0d35ae77",
        },
        {
          url: "icons/apple-splash-1334-750.jpg",
          revision: "aed9efa0a6e7bf78df875d7ae5b9aa33",
        },
        {
          url: "icons/apple-splash-1536-2048.jpg",
          revision: "1f370d82b827712ee29f80afb33f1d76",
        },
        {
          url: "icons/apple-splash-1620-2160.jpg",
          revision: "f4cf3351cb99efe262573f09e25735d6",
        },
        {
          url: "icons/apple-splash-1668-2224.jpg",
          revision: "fe1baf9505d06e4e49317ce6be8c4c58",
        },
        {
          url: "icons/apple-splash-1668-2388.jpg",
          revision: "b8da1e7beffe7b504ea694dac05070cd",
        },
        {
          url: "icons/apple-splash-1792-828.jpg",
          revision: "3b8c63682308b4aba939ff0c56b91d5f",
        },
        {
          url: "icons/apple-splash-2048-1536.jpg",
          revision: "95a8b62f01609b2d36d3dc5315ce6e67",
        },
        {
          url: "icons/apple-splash-2048-2732.jpg",
          revision: "7383d1666835fea734725ac11ef84d53",
        },
        {
          url: "icons/apple-splash-2160-1620.jpg",
          revision: "c68e6ba5faa58d876ef2b6160b2098a1",
        },
        {
          url: "icons/apple-splash-2208-1242.jpg",
          revision: "8f7a3b1b2764945d334ada89d6327c39",
        },
        {
          url: "icons/apple-splash-2224-1668.jpg",
          revision: "353a2bd8bd2e89f4598d79aec55bfe58",
        },
        {
          url: "icons/apple-splash-2388-1668.jpg",
          revision: "8351e47de342b1e756ca65a52d8890ff",
        },
        {
          url: "icons/apple-splash-2436-1125.jpg",
          revision: "f8ba842ce22dc20f74926381128aeceb",
        },
        {
          url: "icons/apple-splash-2532-1170.jpg",
          revision: "18f731c9772baf5c86bd5d6093f9fb91",
        },
        {
          url: "icons/apple-splash-2688-1242.jpg",
          revision: "5d571671404d2d3f5e20ca721fe0c320",
        },
        {
          url: "icons/apple-splash-2732-2048.jpg",
          revision: "8284962b461b6664a7ae0dfd9b770279",
        },
        {
          url: "icons/apple-splash-2778-1284.jpg",
          revision: "419de04a641b84f1a76d9a02379ff34e",
        },
        {
          url: "icons/apple-splash-640-1136.jpg",
          revision: "fa48a2d1261e009011fb9f9986252b1d",
        },
        {
          url: "icons/apple-splash-750-1334.jpg",
          revision: "4babf752f869ab576cfec54dc1221c10",
        },
        {
          url: "icons/apple-splash-828-1792.jpg",
          revision: "64d37711e647d03cfb7c3acb8ccaf787",
        },
        {
          url: "icons/manifest-icon-192.png",
          revision: "4d4ddfa1297c3d5dc99233fb1391e919",
        },
        {
          url: "icons/manifest-icon-512.png",
          revision: "891d6d87853dd870c6e572bebbb6514b",
        },
        { url: "index.html", revision: "994e91c7f63e4191a5dc6d9d82c22a5c" },
        { url: "main.bundle.js", revision: "04b0f2af4fa05685fb80d85358d70bac" },
        {
          url: "main.bundle.js.LICENSE.txt",
          revision: "9258915fb284dc094a465ccc13f36d9e",
        },
        { url: "manifest.json", revision: "325243592f06e76ea31f55fd0870c70f" },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    );
});
