---
title: AJAX
category: Web, JavaScript
---

AJAX est l'accronyme de Asynchronous Javascript And Xml (JavaScript et XML asynchrones).
Ce n'est pas une technologie en soi, mais une approche utilisant JavaScript pour envoyer des requêtes
et recevoir des réponses du serveur sans avoir à recharger la page.

Cela permet par exemple de charger une partie de la page après son chargement, ou de charger du contenu
après une interraction utilisateur (afficher la page suivante, changer d'onglet, etc). Compte tenu que la page
n'est pas entièrement rechargée a chaque fois, le chargement est plus rapide et l'utilisation est plus fluide pour l'utilisateur.

Deux APIs Web permettent d'effectuer des requêtes AJAX, XMLHttpRequest (plus ancienne) et Fetch (utilise des promesses).

---

## XMLHttpRequest

XMLHttpRequest (parfois abrégé XHR) est un constructeur permettant de créer des requêtes AJAX.  
Internet Explorer d'utilise `ActiveXObject` et non `XMLHttpRequest`.

* Créer un objet XMLHttpRequest

  ``` js
  if (window.XMLHttpRequest) {
      httpRequest = new XMLHttpRequest();
  }
  else if (window.ActiveXObject) {
      httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
  }
  ```

* Définir l'url à requêter et la méthode à utiliser.

  ``` js
  request.open('POST', '/create.php');
  ```

* Définir les entêtes de la requête si vous le souhaitez:

  ``` js
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  ```

* Définir le type de réponse attendue. Si non spécifié, la valeur par défaut est `text`.

  ``` js
  request.responseType = 'text';
  ```

* Définir un callback appelé lorsque le statut de la requête AJAX change.  
  Il existe 5 statuts possibles. Cette valeur est stockée dans la propriété `readyState`.

  * 0 `UNSENT`: L'objet a été crée, la requête n'a pas été envoyée
  * 1 `OPENED`: `open()` a été appelé
  * 2 `HEADERS_RECEIVED`: `send()` a été appelé et les entêtes de la réponse ont été reçues.
  * 3 `LOADING`: La réponse est en train d'être reçue
  * 4 `DONE`: L'opération est terminée

  Le code HTTP de la réponse du serveur est stocké dans la propriété `status`. Par exemple, le code `200` est renvoyé quand tout c'est bien passé, `404` quand la requête n'est pas reconnue par le serveur.

  Le corps de la réponse est stocké dans la propriété `responseText`.

  ``` js
  request.onreadystatechange = function() {
      if(request.status == 200 && request.readyState == 4) {

          // Callback
          var info = JSON.parse(request.responseText);
          console.log(info);
      }
  }
  ```

* Envoyer la requête au serveur. Vous pouvez envoyer des paramètres si vous le souhaitez (paramètre optionnel).

  ``` js
  var params = 'name=Bob&age=30';
  request.send(params);
  ```

Pour récupérer des données XML:

``` js
var xhr = new XMLHttpRequest();
xhr.open('GET', '/server');

xhr.responseType = 'document';
xhr.overrideMimeType('text/xml');

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.response);
        console.log(xhr.responseXML);
    }
};
xhr.send();
```

Si le support des anciens navigateurs est souhaité, compte tenu des différences d'implémentation entre différents navigateurs, il peut être interéssant d'utiliser une librairie.
JQuery est la plus connue.

---

## Fetch

Pour les navigateurs plus récents, il est possible d'utiliser l'API Fetch, une solution moderne qui vient remplacer XHR. Celle-ci est basée sur les promesses.

* La fonction `fetch()` passe une requête à l'url spécifiée.  
  Il est possible de passer des options, pour définir la méthode à utiliser (`GET` par défaut), les paramètres à envoyer et/ou les entêtes.

  ``` js
  fetch('/create.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'name=Bob&age=30'
  });
  ```

  On peut également construire la requête avec les constructeurs `Request` et `Headers`:

  ``` js
  var headers = new Headers({});
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  var request = new Request('/create.php', {
    method: 'POST',
    headers: headers,
    body: 'name=Bob&age=30'
  });

  fetch(request);
  ```

* La méthode `then()` chaînée à `fetch()` prend un callback en paramètre, qui sera exécuté dès que la réponse aura été reçue. À l'intérieur de cette fonction, on peut utiliser diverses méthodes pour récupérer le contenu de la réponse: `text()`, `json()`, `blob()`... Ces méthodes retournent une promesse, on chaîne donc un nouveau `then()` pour pouvoir récupérer le résultat.

  ``` js
  fetch(...)
  .then(response => response.json())
  .then(info => {
        console.log(info);
  });
  ```

* En cas d'erreur réseau, une erreur est levée, qui peut être gérée avec `catch()`.  
  Notez que si le serveur répond avec un code d'erreur, comme 404, c'est tout de même la méthode `then()` qui sera appelée. Le code HTTP de la réponse est stocké dans la variable `status` de la réponse.

  ``` js
  fetch(...)
  .then(response => {
    if (response.status != 200) {
      throw new TypeError(response.statusText);
    }
    return response.json();
  })
  .then(info => {
      console.log(info);
  })
  .catch((error) => {
    console.log(error);
  });
  ```

Pour récupérer des données XML:

``` js
fetch('/server')
.then(response => response.text())
.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
.then(data => {
    console.log(data)
});
```
