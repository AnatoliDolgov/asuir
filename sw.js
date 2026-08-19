const CACHE_NAME = 'asuir-gemini-v1';
const ASSETS_TO_CACHE = [
    './',
    './index_ru.html',
    './index_en.html',
    './ASUIRGemeniCalculatOptimizer_ru.html',
    './ASUIRGemeniCalculatOptimizer_en.html',
    './Help_en.html'
];

// Установка Service Worker и сохранение файлов в память
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ASUIR Cache] Файлы закешированы');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Отдача страниц из кеша при отсутствии интернета (Offline)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});