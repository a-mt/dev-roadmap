---
title: JSON, JSONP
category: Web, JavaScript
---

## JSON

JSON (JavaScript Object Notation) est un format de représentation de données,
très proche de la syntaxe des objets JavaScript.
[Voir article JSON](json.md)

``` json
{
  "database": {
    "username": "admin",
    "socket": "/var/tmp/database.sock", 
    "options": {
      "use_utf8": true
    }
  },
  "memcached": {
    "host": "10.0.0.99"
  },
  "workers": [
    {
      "host": "10.0.0.101", 
      "port": 2301
    }, 
    {
      "host": "10.0.0.102", 
      "port": 2302
    }
  ]
}
```

Le JSON est une chaîne de caractère, qui une fois parsée, est convertie en objet JavaScript.  
Le module JSON est fournit par le navigateur et permet d'effectuer les convertions JSON.

``` js
var json = '{"name": "Bob", "age": 20}',
    obj  = JSON.parse(json);

console.log(json); // "{\"name\": \"Bob\", \"age\": 20}"
console.log(obj);  // { name: "Bob", age: 20 }
```

Et inversemment, un objet peut être convertit en JSON.

``` js
var obj  = {name: "Bob", age: 20},
    json = JSON.stringify(obj);
```

JSON est utile lorsqu'on lit/envoie les données à partir d'une autre source,
par exemple en chargeant des données avec une requête AJAX ou les stockant dans le navigateur (localStorage).

## JSONP

Lorsqu'on essaie de charger des données JSON situé sur un serveur différent que la page en cours
(avec un nom de domaine différent), la requête est bloqué par le navigateur.
En effet, il n'est possible de charger en AJAX que les données situées sur le site en cours - sauf autorisation.

Pour y remédier, il existe deux possibilités:
* que le serveur qui contient le fichier de données définisse les entêtes HTTP [CORS](https://developer.mozilla.org/fr/docs/Web/HTTP/CORS) (`Access-Control-Allow-Origin: *`)

      https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json

* ou qu'il retourne les données dans un callback, pour pouvoir utiliser la technique du JSONP.

      https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=moncallback

* En dernier remède, on peut utiliser une API en Proxy, qui se charge de requêter l'URL
  et retourne le résultat avec les entêtes CORS

      https://cors-anywhere.herokuapp.com/

Le "P" de JSONP signifie Padding.  
Plutôt que de requêter un fichier de données (.json, .txt, ou autre), on inclut un fichier script (.js).
Ce fichier script appelle une fonction de callback à laquelle il passe les données qu'il contient lorsqu'il est chargé.

<ins>Exemple</ins>: Requêter une URL en JSONP et afficher le résultat dans la console

``` js
var url = "http://monsite?getData=1&jsonp=moncallback";

// Creer l'élément script
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = url;

// Creer le callback
window.moncallback = function(data) {
  console.log(data);
}

// Ajouter le script à la page (= requêter l'URL et executer le JavaScript qu'elle retourne)
document.getElementsByTagName('head')[0].appendChild(script);
```
