// Offline support for the installed app.
// The game page itself is fetched fresh whenever there is internet (so updates show up on the next open),
// and falls back to the saved copy when offline. Icons and the manifest come from the saved copy first.
const CACHE = 'rainforest-v2';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'fonts/fredoka.woff2', 'fonts/nunito.woff2'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const isPage = e.request.mode === 'navigate' || e.request.url.endsWith('.html');
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(e.request, { ignoreSearch: true });
    const fresh = fetch(e.request, isPage ? { cache: 'no-cache' } : undefined)
      .then(r => { if (r.ok) c.put(e.request, r.clone()); return r; });
    if (isPage) {
      // Give the network 4 seconds, then use the saved copy so a weak signal never shows a blank screen.
      const timeout = new Promise(res => setTimeout(() => res(hit), 4000));
      return Promise.race([fresh.catch(() => hit), timeout]).then(r => r || hit || fresh);
    }
    return hit || fresh.catch(() => hit);
  }));
});
