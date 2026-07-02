// OBS: bumpa CACHE-namnet (v2, v3, ...) varje gång index.html/manifest.json ändras.
// Utan det upptäcker webbläsaren aldrig att sw.js "ändrats" (byte-för-byte-koll),
// installerar aldrig om, och fetch-hanteraren nedan fortsätter servera den gamla,
// cachade index.html för evigt — även efter en lyckad ny deploy på Vercel.
const CACHE = 'budget-pro-v8';
const FILES = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // Städa bort gamla cache-versioner så inget gammalt innehåll kan bli kvar och serveras.
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
