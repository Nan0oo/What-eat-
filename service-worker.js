/* What-eat? — service worker
   Strategija:
   - App shell (HTML, manifest, ikone) se precachira pri instalaciji.
   - Slike jela (img/*.png) se spremaju u cache pri prvom online učitavanju,
     pa nakon toga rade offline.
   - cache-first: prvo cache, pa mreža; offline navigacija servira index.html.

   Pri svakoj promjeni datoteka povećaj broj verzije ispod da se cache osvježi. */
const CACHE = "what-eat-v1";

/* Relativne putanje — rade i na GitHub Pages projektnim stranicama
   (npr. korisnik.github.io/what-eat/). */
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png"
];

/* Instalacija: precache shell. allSettled => jedna datoteka koja fali
   ne ruši cijelu instalaciju. */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      Promise.allSettled(APP_SHELL.map((url) => cache.add(url)))
    ).then(() => self.skipWaiting())
  );
});

/* Aktivacija: obriši stare verzije cachea. */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* Dohvat: cache-first uz spremanje novih same-origin odgovora. */
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          const sameOrigin = new URL(req.url).origin === self.location.origin;
          if (res && res.ok && sameOrigin) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => {
          // Offline: za navigaciju servira app shell.
          if (req.mode === "navigate") return caches.match("./index.html");
        });
    })
  );
});
