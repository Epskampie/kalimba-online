const CACHE_NAME = 'kalimba-game-cache-v1';
// Loading timeout in milliseconds
const CACHE_TIMEOUT = 400;
// List of URLs to cache
const urlsToCache = [
    './css/kalimba.css',
    './css/pico-color-picker.css',
    './css/pico-theme-switcher.css',
    './img/144.png',
    './img/152.png',
    './img/192.png',
    './img/512.png',
    // './img/screen1.png',
    // './img/screen2.png',
    // './img/screen3.png',
    './js/fullscreen.js',
    './js/kalimba.js',
    './js/lang.js',
    './js/pico-color-picker.js',
    './js/pico-theme-switcher.js',
    './lang/ar.json',
    './lang/de.json',
    './lang/en.json',
    './lang/es.json',
    './lang/fr.json',
    './lang/id.json',
    './lang/ja.json',
    './lang/pt.json',
    './lang/ru.json',
    './lang/zh-CN.json',
    './soundfonts/keylimba/kalimba.mp3.js',
    './favicon.ico',
    './index.html',
    // './manifest.json',
    // './service-worker.js',
    'https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js',
    'https://cdn.jsdelivr.net/npm/soundfont-player@0.12.0/dist/soundfont-player.min.js',
    'https://cdn.jsdelivr.net/npm/@picocss/pico@1.5.13/css/pico.min.css',
    'https://gleitz.github.io/midi-js-soundfonts/FatBoy/kalimba-mp3.js',
    'https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/kalimba-mp3.js',
];

// Initialize cache on service worker install
const initCache = () => {
    return caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(urlsToCache);
    }, (error) => {
        console.log(error)
    });
};

// Attempt to fetch data from the network with a timeout
const tryNetwork = (req, timeout) => {
    // console.log(req)
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(reject, timeout);
        fetch(req).then((res) => {
            clearTimeout(timeoutId);
            const responseClone = res.clone();
            caches.open(CACHE_NAME).then((cache) => {
                cache.put(req, responseClone)
            })
            resolve(res);
            // Reject the promise if the network request fails.
        }, reject);
    });
};

// Retrieve data from cache when offline
const getFromCache = (req) => {
    console.log('[Service-worker] Failed to load data from the network, retrieving from cache...');
    console.log(req.url);
    return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(req).then((result) => {
            return result || Promise.reject("no-match");
        });
    });
};

// Service worker install event
self.addEventListener("install", (e) => {
    console.log("[Service-worker] Installed");
    e.waitUntil(initCache());
});

// Service worker activate event
self.addEventListener('activate', (e) => {
    console.log("[Service-worker] Activated");
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

// Fetch event handler
self.addEventListener("fetch", (e) => {
    // console.log("[Service-worker] Attempting to fetch from network or cache: " + e.request.url);
    // Try to fetch from the network, and if that fails, return the cached copy.
    e.respondWith(tryNetwork(e.request, CACHE_TIMEOUT).catch(() => getFromCache(e.request)));
});
