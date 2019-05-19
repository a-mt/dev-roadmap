---
title: Web Sockets
category: Web, JavaScript, API
---

## Qu'est-ce qu'un WebSocket

Un WebSocket crée une connexion persistante entre un client et un serveur, permettant une communication bi-directionnelle sur une seule connexion. Cette technologie est idéale pour les chats, jeux en ligne ou tout autre application nécessitant une mise à jour initiée par le serveur, par exemple pour du livereload.

Avec AJAX, la page web doit initier une requête vers le serveur pour vérifier les mises à jour. Avec une webSocket, la page reçoit automatiquement les mises à jour du serveur. Cela permet de réduire massivement les requêtes HTTP entre le client et le serveur.

## Côté client

Côté client, il faut
1. Initier la connexion WebSocket vers le serveur  
   avec le protocole `ws://` (WebSocket) ou `wss://` (WebSocket over SSL).

   ``` js
   socket = new WebSocket("ws://localhost");
   ```

2. Attendre la confirmation du serveur

   ``` js
   socket.onopen = function(e) {}
   ```

3. Une fois la connexion établie, on peut recevoir des événements du serveur avec `onmessage` ou en envoyer avec `send`

   ``` js
   this.onmessage = function(e) {
     console.log(e.data);
   }
   ```

   ``` js
   this.send("Hello world!");
   ```

### Exemple

``` js
var socket = null;
try {
    // Connexion vers un serveur HTTP prennant en charge le protocole WebSocket ("ws://").
    socket = new WebSocket("ws://localhost");

    // ----- OU -----

    // Connexion vers un serveur HTTPS prennant en charge le protocole WebSocket over SSL ("wss://").
    socket = new WebSocket("wss://localhost");
} catch (exception) {
    console.error(exception);
}

// La connexion ne s'établie pas
socket.onerror = function(error) {
    console.error(error);
};

// Lorsque la connexion est établie
socket.onopen = function(event) {
    console.log("Connexion établie.");

    // Lorsque la connexion se termine.
    this.onclose = function(event) {
        console.log("Connexion terminé.");
    };

    // Lorsque le serveur envoi un message
    this.onmessage = function(event) {
        console.log("Message:", event.data);
    };

    // Envoi d'un message vers le serveur
    this.send("Hello world!");
};
```

Pour un support complet, y compris sous Internet Explorer, utiliser la librairie [Socket.io](https://socket.io/).

## Côté serveur

Le serveur doit de son côté accepter et gérer les connexions WebSockets.

[Exemple Node.js](https://gist.github.com/zlatkov/f80b07e00a28f3428b11aac5f5977872#file-websocket_server-js)  
[Exemple PHP](https://gist.github.com/a-mt/a555d06a408c262256f2f74501f97719#file-server-index-php)

[WebSocket vs HTTP/2](https://blog.sessionstack.com/how-javascript-works-deep-dive-into-websockets-and-http-2-with-sse-how-to-pick-the-right-path-584e6b8e3bf7)
