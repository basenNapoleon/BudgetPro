// OBS: bumpa CACHE-namnet (v2, v3, ...) varje gång index.html/manifest.json ändras.
// Utan det upptäcker webbläsaren aldrig att sw.js "ändrats" (byte-för-byte-koll),
// installerar aldrig om, och fetch-hanteraren nedan fortsätter servera den gamla,
// cachade index.html för evigt — även efter en lyckad ny deploy på Vercel.
const CACHE = 'budget-pro-v37';
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

// NETWORK-FIRST (viktig ändring): hämta alltid färsk version från nätet när man är online,
// och uppdatera cachen i bakgrunden. Falla tillbaka till cache BARA när nätet inte svarar
// (offline). Tidigare var detta cache-first, vilket gjorde att en gammal index.html kunde
// serveras för evigt tills sw.js byttes byte-för-byte — så en missad sw.js-uppladdning
// låste appen på en gammal version. Nu självläker varje ny deploy automatiskt.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  e.respondWith(
    fetch(req)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then(c => c || caches.match('/index.html')))
  );
});
