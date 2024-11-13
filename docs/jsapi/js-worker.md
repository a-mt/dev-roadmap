---
title: Workers
category: Web, JavaScript, API
---

## Multi-thread

Un processus est un programme en cours d'execution. Un processus peut contenir un ou plusieurs thread s'executant simultanément sur plusieurs processeurs. À la différence des processus, les threads partagent le même espace mémoire et les mêmes ressources.

Habituellement, JavaScript est executé sur un seul thread, chaque instruction est exécutée l'une après l'autre et si une instruction prend beaucoup de temps, alors toutes celles qui suivent sont en attente. Pour éviter qu'un traitement bloque la page, il est nécessaire d'utiliser plusieurs thread.

## Worker

Un worker est un script qui s'exécute dans un thread en arrière-plan, distinct du thread principal du navigateur. 
Les instructions executées par un worker doivent être contenues dans un fichier séparé, et sont executées indépendemment de la page.

Cela implique deux choses:
1. il est possible d'executer du code sans bloquer la page en utilisant un worker
2. un worker n'a pas accès à l'interface utilisateur et n'a pas accès au DOM  
   [Fonctions et classes disponibles dans les Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Functions_and_classes_available_to_workers)

Il existe différents types de workers:
* les web workers, worker de base
* les service workers, worker servant de proxy pour créer une application hors ligne
* les workers partagés, worker pouvant accédé par plusieurs fenêtres, iframes ou workers différents.

---

## Web Workers

Un web worker (`Worker`) permet d'executer des traitements en dehors du thread principal.

<ins>Points de vigilance</ins>:

Lorsqu'on appelle `fetch`, ces requêtes ne contiennent pas les informations de l'utilisateur, tel que les cookies. Pour les avoir, il faut l'expliciter:

``` js
fetch(url, {
  credentials: 'include'
})
```

### 1. Créer un worker

Pour créer un worker, donner le nom du script en argument. Si le fichier spécifié existe, le worker crée un nouveau thread, télécharge puis exécute le script. Sinon, il échoue silencieusement.

``` js
let worker = new Worker('worker.js');
```

Tous les scripts doivent être appartenir au même nom de domaine.

### 2. Communiquer entre parent et worker

#### Côté parent

Le thread parent peut recevoir des messages de la part du worker en écoutant l'événement `message`.  
Deux syntaxes possibles:

``` js
worker.onmessage = (e) => { /* block statements */ }
```

``` js
worker.addEventListener('message', (e) => { /* block statements */ })
```

Ou il peut envoyer des messages au worker:

``` js
worker.postMessage('Hello World');
```

#### Côté web worker

Et inversement, un worker peut également recevoir des messages de la part du thread parent.  
Deux syntaxes possibles:

``` js
onmessage = (e) => { /* blocks of statements */ }
```

``` js
self.addEventListener('message',  e => { /* blocks of statements */ })
```

Ou envoyer des messages au parent:

``` js
self.postMessage('Hello World');
```

### 3. Gérer les erreurs

Les erreurs qui se produisent à l'intérieur d'un worker peuvent être récupérées et gérées côté parent.

``` js
worker.addEventListener('error', (e) => { /* block of statements */ })
```

### 4. Stopper un worker

Le worker peut être stoppé côté parent:

``` js
worker.terminate();
```

Ou côté worker:

``` js
close();
```

### Exemple

``` js
// app.js
var fetchWorker = new Worker('fetch.js');

fetchWorker.onmessage = (e) => {
    console.log(e);
}
fetchWorker.postMessage('data.php');
```

``` js
// fetch.js
self.addEventListener('message',  e => {
    let url = e.data;

    fetch(url).then(res => {
        if (res.ok) {
            self.postMessage(res);
        } else {
            throw new Error('error with server');
        }
    }).catch(err => {
        self.postMessage(err.message);
    });
})
```

### Exemple 2

``` js

// URL.createObjectURL
window.URL = window.URL || window.webkitURL;

// Create Worker from string
var script = `
self.onmessage = function(e){
  postMessage('Worker received: ' + e.data);
}
`;
var blob;
try {
    blob = new Blob([script], {type: 'application/javascript'});
} catch (e) { // Backwards-compatibility
    window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
    blob = new BlobBuilder();
    blob.append(script);
    blob = blob.getBlob();
}
var worker = new Worker(URL.createObjectURL(blob));

// Test Worker
worker.addEventListener('message', (e) => {
  console.log('Worker said: ', e.data);
});
worker.addEventListener('error', (e) => {
  console.log('Worker error: ', e);
});
worker.postMessage('Test');
```

---

## Service Worker

Un service worker (`serviceWorker`) fonctionne de la même manière qu'un web worker, à travers des événements `postMessage`, etc... à la différence près que le service worker offre des fonctionnalités supplémentaires:

Le service worker agit comme proxy qui intercepte les événements réseau de la page. Cela permet notamment de mettre en cache les ressources, ou d'envoyer des sauvegardes vers le serveur lorsque l'utilisateur a du réseau. Ainsi un service worker permet l'utilisation d'une application web hors ligne ou avec un débit internet lent.

Avec Firefox, la liste des service workers est accessible via `about:serviceworkers`.

<ins>Points de vigilance</ins>:

Le service worker s'arrête lorsqu'il n'est pas utilisé et redémarre lorsque nécessaire. Il consomme donc moins de ressource mais n'a pas d'état persistent: pour conserver des données, il est nécessaire d'utiliser le local storage.

Les service workers fonctionnent uniquement sur HTTPS, pour des raisons de sécurité.

### 1. Côté parent: Enregistrer le service

``` js
if ('serviceWorker' in navigator) { // Check browser support first
  navigator.serviceWorker.register('/serviceworker.js');
}
```

Le service worker est téléchargé lorsqu'un utilisateur accède pour la première fois à une page ou à un site contrôlé par un service worker. Après cela, il est téléchargé toutes les 24 heures environ.

### 2. Côté service worker: Installer le service

Lorsque le fichier téléchargé est nouveau ou différent de l'ancien, l'événement `install` est délenché. C'est à ce moment qu'on peut créer le cache qui sera utilisé par le worker, et  placer les ressources nécessaire pour faire fonctionner l'application.

``` js
self.addEventListener('install', function(event) {
  console.log("SW installed");
});
```

### 3. Activer le service

Si l'installation s'est déroulé avec succès, l'événement `activate` est délenché. C'est le moment auquel on peut nettoyer les vieux caches du service worker précédent.

``` js
self.addEventListener('activate', function(event) {
  console.log("SW activated");
});
```

### 4. Intercepter les requêtes réseau

Lorsqu'une requête est envoyée, l'événement `fetch` est déclenché. La réponse à la requête peut être forgée avec `fetchEvent.respondWith`.

``` js
self.addEventListener('fetch', function(event) {
  console.log("SW fetch");
  event.respondWith(new Response("Hello world!"));
});
```

### Exemple 1

``` js
// app.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceworker.js');
}
```

``` js
// serviceWorker.js
// Listen for install event
this.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open('v1') // Open a cache called 'v2'
      .then(cache => cache.addAll(['/styles.css', '/default.png'])) // Cache files for later retrieval
  );
});

// Listen for activation event
this.addEventListener('activate', function(event) {
  var cacheWhitelist = ['v2'];

  event.waitUntil(
    caches.keys().then(function(keyList) {

      // Delete from cache keys that aren't whitelisted
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// Listen for network requests
this.addEventListener('fetch', event => {
  event.respondWith(

    // Get the cached content
    caches.match(event.request).catch(function() {

        // If not cached: retrieve it
        return fetch(event.request).then(function(response) {

            // Cache it
            caches.open('v2').then(function(cache) {
              cache.put(event.request, response);
            });

            // Return the ressource
            return response.clone();
        });

    // The network failed: return a default ressource
    }).catch(function() {
      return caches.match('/default.png');
    });

  );
});
```

### Exemple 2

``` js
// app.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function(reg) {

    if(reg.installing) {
      console.log('Service worker installing');
    } else if(reg.waiting) {
      console.log('Service worker installed');
    } else if(reg.active) {
      console.log('Service worker active');
    }

  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}
```

``` js
// sw.js
const CACHEVERSION = 'v9.16';
const CACHEDSTATICASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/js/jquery-1.11.3.min.js',
  '/js/jquery.smooth-scrolling.js',
  '/js/jquery.nicescroll.min.js',
  '/img/digital-world-opt.jpg',
  '/img/digital-world-opt-med.jpg',
  '/img/digital-world-opt-sml.jpg',
  '/img/pe-website-opt.jpg',
  '/img/business-systems.png',
  '/img/netbeans-coding.png',
  '/img/ariba_badge_245x100.jpg',
  '/css/google-fonts.css',
  '/fonts/russo-one-a.woff2',
  '/fonts/russo-one-b.woff2',
  '/fonts/russo-one-c.woff2',
  '/img/approvedbusiness.gif',
  '/img/ukwda_registered_rgb_web_blue_bg.png',
  '/thanks.html',
  '/error.html'
];

this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHEVERSION).then(function(cache) {
            cache.addAll(CACHEDSTATICASSETS)
        }).then(this.skipWaiting())
    );
});

this.addEventListener('activate', function(event) {
    const currentCaches = [CACHEDSTATICASSETS];
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return cacheNames.filter(function(cacheName) {
              !currentCaches.includes(cacheName)
            });
        }).then(function(cachesToDelete) {
            return Promise.all(cachesToDelete.map(
                function(cacheToDelete) {
                    return caches.delete(cacheToDelete);
                }
            ));
        }).then(function() {
            this.clients.claim()
        })
    );
});

this.addEventListener('fetch', function(event) {
    if(event.request.url.startsWith("https://MYDOMAIN") && (event.request.method != "POST")) {
        event.respondWith( caches.match(event.request).catch( function() {
            return fetch(event.request);
        }).then(function(response) {
            //console.log(response, response instanceof Response);
            if(response instanceof Response) {
                caches.open(CACHEVERSION).then(function(cache) {
                    cache.put(event.request, response);
                });
                return response.clone();
            }
        }));
    }
});
```

[Service Workers Cookbook](https://serviceworke.rs/)

---

## Shared Worker

Un worker partagé (`SharedWorker`) est un worker qui peut être accédé à partir de plusieurs sources différentes: une page différente, un iframe, un worker.

### 1. Créer un worker

``` js
var myWorker = new SharedWorker("worker.js", "myWorker");
```

### 2. Se connecter au worker

Une fois le worker créé, on démarre un port via

``` js
myWorker.port.start();
```

### 3. Envoyer un message au worker

``` js
myWorker.port.postMessage("Hello World");
```

### 4. Recevoir des messages du worker

``` js
myWorker.port.onmessage = function(e) {
    console.log(e.data);
}
```

ou

``` js
myWorker.port.addEventListener('message', function(e) {
    console.log(e.data);
});
```

Il n'est pas nécessaire d'utiliser `port.start()` lorsqu'on utilise `port.onmessage`: puisqu'il s'agit du seul endroit où est réceptionné le message, le démarrage est réalisé de manière implicite.

### 5. Côté worker: écouter les connexions


### Exemple

``` js
// app.js
if(!!window.SharedWorker){

    // Se connecter au worker
    var myWorker = new SharedWorker('sharedWorker.js');

    // Écouter les messages du worker
    myWorker.port.addEventListener('message', function(e) {
        console.log(e.data);
    });
    myWorker.port.start();

    // Envoyer un message
    myWorker.port.postMessage("Hello World");
}
```

``` js
// sharedWorker.js
var num = 0;

// Ecouter les connexions
onconnect = function(e) {
  var port = e.ports[0];
  port.postMessage("Nouvelle connexion (" + (num++) + ")");

  // Reception des messages
  port.onmessage = function(e) {
    port.postMessage(e.data); //  renvoyer le message qu'on a reçu
  }
}
```
