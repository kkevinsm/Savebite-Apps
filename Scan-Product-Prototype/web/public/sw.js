// Savebite Service Worker v1.0
// Handles offline caching, background sync, and PWA install

const CACHE_NAME = "savebite-v1";
const STATIC_ASSETS = [
  "/",
  "/login",
  "/my-kitchen",
  "/receipt",
  "/profile",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
];

// ── Install Event: Pre-cache static assets ──────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[SW] Pre-caching static assets");
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// ── Activate Event: Clean old caches ────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => {
              console.log("[SW] Deleting old cache:", name);
              return caches.delete(name);
            })
        )
      )
      .then(() => self.clients.claim())
  );
});

// ── Fetch Event: Network-first with cache fallback ──────────────────
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and browser-extensions
  if (request.method !== "GET" || !url.protocol.startsWith("http")) return;

  // Skip API routes (always fetch fresh)
  if (url.pathname.startsWith("/api/")) return;

  // Cache-first for static assets (images, fonts, icons)
  if (
    request.destination === "image" ||
    url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|avif|ico|woff2?|ttf)$/i)
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (!response.ok) return response;
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        });
      })
    );
    return;
  }

  // Network-first for pages and everything else
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (!response.ok) return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return response;
      })
      .catch(() => {
        // Offline fallback: serve from cache
        return caches.match(request).then((cached) => {
          if (cached) return cached;
          // Ultimate fallback to home
          return caches.match("/") || new Response("Offline – Savebite", { status: 503 });
        });
      })
  );
});

// ── Push Notification Handler ────────────────────────────────────────
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "Savebite";
  const options = {
    body: data.body || "Ada bahan yang hampir kedaluwarsa!",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    tag: data.tag || "savebite-notif",
    data: { url: data.url || "/" },
    actions: [
      { action: "open", title: "Buka App" },
      { action: "dismiss", title: "Tutup" },
    ],
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// ── Notification Click Handler ───────────────────────────────────────
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "dismiss") return;
  const url = event.notification.data?.url || "/";
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clients) => {
        const existing = clients.find((c) => c.url.includes(self.location.origin));
        if (existing) return existing.focus();
        return self.clients.openWindow(url);
      })
  );
});
