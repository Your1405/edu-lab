const staticCacheName = 'site-static';
const staticCacheItems = [
    '/',
    '/index.html',
    '/scripts/app.js',
    '/scripts/ui.js',
    '/assets/icons/arrow-back.svg',
    '/assets/icons/biology.svg',
    '/assets/icons/complete-check.svg',
    '/assets/icons/economics.svg',
    '/assets/icons/geography.svg',
    '/assets/icons/manual.svg',
    '/assets/icons/math.svg',
    '/assets/icons/physics.svg',
    '/assets/icons/play-button.svg',
    '/assets/icons/profile.svg',
    '/assets/icons/progress%20icon.svg',
    '/assets/icons/science.svg',
    '/assets/icons/search.svg',
    '/assets/icons/settings.svg',
    '/css/styles.css',
    'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap'
];

self.addEventListener('install', (event) => {
    //console.log('Service worker has been installed');
    event.waitUntil(caches.open(staticCacheName).then((cache) => {
        cache.addAll(staticCacheItems);
        })
    );
    
});

self.addEventListener('activate', (event) => {
    //console.log('Service worker has been activated');
});

self.addEventListener('fetch', (event) => {
    //console.log("Fetched: ", event);
    event.respondWith(
        caches.match(event.request).then((cacheRes) => {
            return cacheRes || fetch(event.request);
        })
    );
})