// Zeer simpele Service Worker voor CBS GO.
// Geen agressieve caching, dus minimaal risico op bugs.

self.addEventListener('install', (event) => {
  console.log('[CBS GO] Service worker installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[CBS GO] Service worker activated');
  return self.clients.claim();
});

// Later kunnen we hier caching toevoegen (fetch-event).
// Voor nu doen we niks met netwerkverkeer -> alles blijft zoals normaal.
