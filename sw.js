const CACHE_NAME = 'life-rpg-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/base.css',
    '/css/layout.css',
    '/css/components.css',
    '/css/animations.css',
    '/js/config/constants.js',
    '/js/config/missions.js',
    '/js/config/shop.js',
    '/js/config/challenges.js',
    '/js/config/classes.js',
    '/js/core/points.js',
    '/js/core/state.js',
    '/js/core/timer.js',
    '/js/core/notifications.js',
    '/js/ui/toast.js',
    '/js/ui/sidebar.js',
    '/js/ui/header.js',
    '/js/ui/missions.js',
    '/js/ui/shop.js',
    '/js/ui/challenges.js',
    '/js/ui/character.js',
    '/js/ui/analytics.js',
    '/js/ui/config.js',
    '/js/app.js',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
            );
        })
    );
});