const staticBunker = "dev-coffee-site-v1"
const assets = [
    "/",
    "/index.html",
    "/css/global.css",
    "/js/render.js",
    "/js/index.js",
    "/media/wallpaper1080.png",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticBunker).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})