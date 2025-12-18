// public/sw.js
const CACHE_NAME = "video-cache-v1";
const VIDEOS_TO_CACHE = [
  "/videos/3045163-sd_640_360_30fps.mp4",
  "/videos/3571415-sd_640_360_25fps.mp4",
  "/videos/5081831-sd_640_360_30fps.mp4",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(VIDEOS_TO_CACHE))
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/videos/")) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse; // Serve from cache
        }
        return fetch(event.request); // Fallback to network
      })
    );
  }
});
