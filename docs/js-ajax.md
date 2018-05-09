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

<ins>Exemple</ins>:
Envoyer une requête AJAX et afficher la réponse (JSON) dans la console:

``` js
var request;
if(window.XMLHttpRequest) {
    request = new XMLHttpRequest();
} else {
    request = new ActiveXObject('Microsoft.XMLHHTP');
}
request.open('GET', 'data.json');
request.onreadstatechange = function() {
    if(request.status == 200 && request.readyState == 4) {

        // Callback
        var info = JSON.parse(request.responseText);
        console.log(info);
    }
}
request.send();
```

Pour les navigateurs plus récents, il est possible d'utiliser l'API fetch:

``` js
fetch('data.json')
.then(response => response.json())
.then(info => {
    console.log(info);
});
```

Si le support des anciens navigateurs est souhaité, compte tenu des différences d'implémentation entre différents navigateurs, il peut être interéssant d'utiliser une librairie.
JQuery est la plus connue.

[Requête XMLHttpRequest pas à pas](https://developer.mozilla.org/fr/docs/Web/Guide/AJAX/Premiers_pas)
