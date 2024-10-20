// service-worker.js
self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  // Добавьте кэширование ресурсов, если нужно
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
