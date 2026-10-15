/* Shell cache only. Documents, RSC payloads, API, and anything that looks
   authenticated always go to the network and are never stored. */
const SHELL_CACHE = "inbox-triage-shell-v1";

const PRECACHE_URLS = [
  "/apple-touch-icon.png",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/manifest.webmanifest",
];

function isImmutableShell(url) {
  return url.pathname.startsWith("/_next/static/");
}

function isShellAsset(url) {
  return (
    isImmutableShell(url) ||
    url.pathname === "/apple-touch-icon.png" ||
    url.pathname === "/manifest.webmanifest" ||
    url.pathname.startsWith("/icons/")
  );
}

function isPrivateRequest(request, url) {
  if (request.mode === "navigate" || request.destination === "document") {
    return true;
  }
  if (request.headers.has("authorization")) return true;
  if (request.headers.get("rsc")) return true;
  if (request.headers.has("next-router-prefetch")) return true;
  if (request.headers.has("next-router-state-tree")) return true;
  if (request.headers.has("next-url")) return true;

  const accept = request.headers.get("accept") || "";
  if (accept.includes("text/x-component")) return true;

  if (
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/auth") ||
    url.searchParams.has("_rsc")
  ) {
    return true;
  }

  return false;
}

function canStore(response) {
  if (!response || !response.ok || response.type !== "basic" || response.redirected) {
    return false;
  }
  if (response.headers.has("set-cookie")) return false;

  const cacheControl = response.headers.get("cache-control") || "";
  if (/no-store|private/i.test(cacheControl)) return false;

  const vary = response.headers.get("vary") || "";
  if (/cookie|authorization/i.test(vary)) return false;

  return true;
}

async function networkFirst(request) {
  const cache = await caches.open(SHELL_CACHE);
  try {
    const response = await fetch(request);
    if (canStore(response)) {
      await cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    throw error;
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(SHELL_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (canStore(response)) {
    await cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      await Promise.all(
        PRECACHE_URLS.map(async (path) => {
          try {
            const response = await fetch(path, { cache: "reload" });
            if (canStore(response)) await cache.put(path, response);
          } catch {
            // The app shell still loads from the network if a precache misses.
          }
        }),
      );
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((key) => key !== SHELL_CACHE).map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  let url;
  try {
    url = new URL(request.url);
  } catch {
    return;
  }

  if (url.origin !== self.location.origin) return;
  if (isPrivateRequest(request, url)) return;
  if (!isShellAsset(url)) return;

  event.respondWith(
    isImmutableShell(url) ? cacheFirst(request) : networkFirst(request),
  );
});
