const CACHE_NAME = 'telecom-reserva-cache-v6'; // Incremented version
const urlsToCache = [
  '/',
  '/index.html',
  '/bundle.js',
  'https://i.postimg.cc/bvr9syk6/Personal-logonuevo-1.png',
  'https://i.postimg.cc/3NMv9VMS/oficina-moderna-paredes-verdes-pisos-madera-asientos-comodos-191095-99743.avif',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://i.postimg.cc/Hss2rxB2/IMAGEN-SITE.png'
];

// Install: Cache all essential assets
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // Force the waiting service worker to become the active service worker.
        return self.skipWaiting();
      })
  );
});

// Activate: Clean up old caches and take control
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Tell the active service worker to take control of the page immediately.
      return self.clients.claim();
    })
  );
});


// Fetch: Serve from cache first, then network
self.addEventListener('fetch', event => {
  // We only want to cache GET requests.
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        // Return the cached response if found.
        if (response) {
          return response;
        }

        // If not in cache, fetch from the network.
        return fetch(event.request).then(networkResponse => {
          // OPTIONAL: You could add non-essential assets to the cache here if needed.
          // For example: cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});