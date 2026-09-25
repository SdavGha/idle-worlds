// Offline support for the installed app.
// The page and its code (this world's theme.js plus the shared engine) are fetched fresh whenever there is
// internet, so updates show up on the next open, and fall back to the saved copy when offline.
// Icons, fonts and the manifest come from the saved copy first.
const CACHE = 'rainforest-v9';
const FILES = ['./', 'index.html', 'theme.js', 'cel.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png',
  '../shared/helpers.js', '../shared/cel.js', '../shared/engine.js', '../shared/engine.css', '../shared/fonts/fredoka.woff2', '../shared/fonts/nunito.woff2'];

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
  const isPage = e.request.mode === 'navigate' || /\.(html|js|css)$/.test(new URL(e.request.url).pathname);
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
