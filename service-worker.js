// Choose a cache name
const cacheName = 'cache-v1';
// List the files to precache
//const precacheResources = ['/','/index.html', '/static/js/bundle.js','/manifest.json','/favicon.ico','/logo192.png','/service-worker.js'];
const precacheResources = ['/', 'index.html', 'static/js/main.js', 'static/js/main.js.LICENSE.txt', 'static/js/main.js.map','manifest.json','asset-manifest.json','favicon.ico','logo192.png','logo512.png','service-worker.js'];

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', (event) => {
  console.log('Service worker install event!');
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activate event!');
});


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
        const networkFetch = fetch(event.request).then(response => {
          // update the cache with a clone of the network response
          const responseClone = response.clone()
          caches.open(url.searchParams.get('name')).then(cache => {
            cache.put(event.request, responseClone)
          })
          return response
        }).catch(function (reason) {
          console.error('ServiceWorker fetch failed: ', reason)
        })
        // prioritize cached response over network
        return cachedResponse || networkFetch
      }
    )
  )
})



/**
 * 
// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
  //console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // console.log(cachedResponse);
        return cachedResponse;
      }
      return fetch(event.request);
    }),
    );
  });
  
  
  */

