// Service Worker pour le cache
const CACHE_NAME = 'cv-dolo-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/cv.html',
    '/index.css',
    '/cv.css',
    '/index.js',
    '/script.js',
    '/image/profile-user.png',
    '/image/nn.jpg'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache ouvert');
                return cache.addAll(urlsToCache.map(url => new Request(url, {cache: 'reload'})));
            })
            .catch((error) => {
                console.log('Erreur lors du cache:', error);
            })
    );
    self.skipWaiting();
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Suppression de l\'ancien cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Retourner la réponse du cache ou faire une requête réseau
                if (response) {
                    return response;
                }
                
                return fetch(event.request).then((response) => {
                    // Vérifier si la réponse est valide
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // Cloner la réponse pour la mettre en cache
                    const responseToCache = response.clone();
                    
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                    
                    return response;
                });
            })
            .catch(() => {
                // En cas d'erreur, retourner une réponse par défaut
                if (event.request.destination === 'document') {
                    return caches.match('/index.html');
                }
            })
    );
});

