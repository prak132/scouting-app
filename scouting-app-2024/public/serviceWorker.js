// Establish a cache name
const cacheName = 'Ilovescouting_v1';

// Assets to precache
const precachedAssets = [
  '/assets/blue_minimap.svg',
  '/assets/check.svg',
  '/assets/errorx.svg',
  '/assets/exclamation.svg',
  '/assets/red_minimap.svg',
  '/assets/monkeylogo.svg',
  '/components/auto/assets/blue_auto.svg',
  '/components/auto/assets/red_auto.svg',
  '/components/auto/assets/check.svg'
];

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open(cacheName)
      .then((cache) => {
        console.log('Opened cache.');
        return Promise.all(
          precachedAssets.map(url => {
            console.log('Caching:', url);
            return fetch(url).then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return cache.put(url, response);
            }).catch(error => {
              console.error(`Failed to fetch and cache: ${url}`, error);
            });
          })
        );
      })
      .catch((error) => console.log('Failed to open cache:', error))
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
  console.log('Fetch event for:', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        console.log('Network request for ', event.request.url);
        return fetch(event.request).then((response) => {
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          var responseToCache = response.clone();
          caches.open(cacheName)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          return response;
        });
      })
  );
});