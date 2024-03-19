// on service worker install, cache the home and pins pages
self.addEventListener('install', function(event) {
    event.waitUntil(async function() {
        const cache = await caches.open('v1');
        await cache.addAll([
            '/',
            '/pins'
        ]);
    }());
});

// on every fetch request, try to fetch from cache first, otherwise fetch from network
self.addEventListener('fetch', function(event) {
    if (event.request.url.includes(self.location.origin)) {
        event.respondWith(async function() {
            // try to fetch from v1 cache
            const cache = await caches.open('v1');
            const cachedResponse = await cache.match(event.request);

            // if it is cached, return it
            if (cachedResponse) {
                return cachedResponse;
            }

            // if it is not cached, fetch from the network
            const networkResponse = await fetch(event.request);

            // if the network request is successful, cache it
            if (networkResponse.ok) {
                cache.put(event.request, networkResponse.clone());
            }

            // return the network response
            return networkResponse;
        }());
    }
});