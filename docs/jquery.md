---
title: JQuery
category: Web, JavaScript, Library
---

JQuery est une librairie qui permet de manipuler le DOM, d'ajouter des animations dans la page,
d'effectuer des requêtes AJAX, etc, tout en s'occupant de la compatibilité des navigateurs.
JQuery offre ainsi une manière simplifié d'utiliser les fonctionnalités du navigateur sans
avoir à s'occuper de quel est le navigateur en cours et quelle est la syntaxe à utiliser.
C'est notamment utile lorsqu'on veut que son code soit compatible avec les anciens navigateurs,
les navigateurs les plus récents suivant généralement les spécifications ECMAScript.

<ins>Exemple</ins>:

Vanilla JavaScript, Requête AJAX supportant les anciens navigateurs:

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

Vanilla JavaScript, Requête AJAX pour les navigateurs modernes:

``` js
fetch('data.json')
.then(response => response.json())
.then(info => { 
  console.log(info);
});
```

JQuery, Requête AJAX supportant les anciens navigateurs:

``` js
$.ajax({
  url: 'data.json',
  dataType: 'json',
  success: function(info){
    console.log(info);
  }
});
```

[Is jQuery still relevant?](https://remysharp.com/2017/12/15/is-jquery-still-relevant)