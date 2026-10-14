const CACHE = '__CACHE__'
const PRECACHE = __PRECACHE__

self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(PRECACHE)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', event => {
    event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()))
})

self.addEventListener('fetch', event => {
    const { request } = event
    if (request.method !== 'GET' || request.headers.has('range')) return
    if (request.mode === 'navigate') {
        event.respondWith(fetch(request.url, { cache: 'no-cache' }).catch(() => caches.match('/index.html')))
        return
    }
    event.respondWith(caches.match(request).then(cached => {
        const network = fetch(request).then(response => {
            if (response.status === 200 || response.type === 'opaque') {
                const copy = response.clone()
                caches.open(CACHE).then(cache => cache.put(request, copy))
            }
            return response
        })
        if (!cached) return network
        network.catch(() => {})
        return cached
    }))
})
