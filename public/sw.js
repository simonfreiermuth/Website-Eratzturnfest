/**
 * Service worker — network-first strategy for same-origin assets.
 *
 * Always tries the network so visitors get fresh content; falls back to the
 * cache only when the network is unavailable (offline at the venue, etc.).
 *
 * Bump CACHE_NAME whenever you want to evict old cached responses entirely.
 */
const CACHE_NAME = 'turnfest-2026-v2';

// Resources fetched eagerly on first install so the site works offline.
const PRECACHE_URLS = ['/', '/manifest.webmanifest', '/favicon.svg'];

// ── Install ──────────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)),
  );
  // Activate immediately without waiting for old tabs to close.
  self.skipWaiting();
});

// ── Activate ─────────────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// ── Fetch — network-first, cache fallback ─────────────────────────────────────
self.addEventListener('fetch', (event) => {
  // Only handle GET requests to the same origin.
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful, non-opaque responses so they're available offline.
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() =>
        // Network failed (offline) — serve whatever we have cached.
        caches.match(event.request),
      ),
  );
});
