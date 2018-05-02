---
title: BOM
category: Web, JavaScript
---

## Qu'est ce que le BOM

Le BOM (Browser Object Model) permet à JavaScript d'interagir avec le navigateur. Il n'existe pas de normes officielles pour le BOM mais les navigateurs récents ont implémentés (presque) tous les mêmes mécanismes.

L'objet `window` est un objet global qui représente la fenêtre du navigateur.  
Pour les navigateurs récents, on peut récupérer la taille de la fenêtre du navigateur (or barre de tâche) avec

``` js
var h = window.innerHeight, // hauteur de la fenêtre (en pixels)
    w = window.innerWidth;  // largeur
```

Ou pour prendre en charge Internet Explorer 8, 7, 6, 5:

``` js
var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
```

Tous les objets, fonctions et variables JavaScript globaux deviennent automatiquement membres de l'objet `window` (propriété ou méthode de l'objet `window`).
Parmis les objets globaux on trouve:

* `screen`
* `location`
* `history`
* `navigator`
* `cookies`
* `document`

On trouve également des fonctions comme:
* `alert`
* `setInterval`

Et évènements:
* `onload`
* `onscroll`
* `onresize`

[Description détaillée de window](https://developer.mozilla.org/fr/docs/Web/API/Window)

---

## Dialogs

Le BOM dispose de fonctions pour afficher une fenêtre de dialogue:

* `alert` permet d'afficher un message, la seule réponse possible est "Ok".

  ``` js
  alert("You clicked the link");
  ```

  ![](https://i.imgur.com/ehTMPsnm.png)

* `confirm` permet d'afficher un message, la réponse possible est "Ok" ou "Annuler".

  ``` js
  if(confirm("Do you want to leavet his page and go to Google now ?")) {
    window.location.href = "https://google.com";
  }
  ```

  ![](https://i.imgur.com/qNrfDSDm.png)

* `prompt` permet d'afficher un champ à remplir

  ``` js
  var answer = prompt("Type your name", "");
  console.log(answer);
  ```

  ![](https://i.imgur.com/Xg3BSg1m.png)

---

## Timers

JavaScript permet d'utiliser des *timers*, des fonctions qui s'executent "au bout de" ou "tous les" x temps.

* `setTimeout` permet d'executer du code au bout d'un certain nombre de millisecondes

  ``` js
  setTimeout(function(){
    alert("Hello World");
  }, 1000);
  // Attend 1 seconde avant d'afficher une alerte
  ```

* `clearTimeout` permet d'arrêter un timeout. Le callback ne sera pas executé.  
  Fréquemment utilisé pour différer un évènement tant qu'une interaction a lieu

  ``` js
  var myCallback = function() {
    // Faire qqch quand l'utilisateur arrête d'écrire
  };
  var timer = setTimeout(myCallback, 300);

  myInput.addEventListener("keydown", function(){
    clearTimeout(timer);
    timer = setTimeout(myCallback, 300)
  });
  ```

* `setInterval` permet d'appeler une fonction de manière répétée avec un certain délai entre chaque appel.

  ``` js
  var c = 0;
  setInterval(function(){
    console.log(c++);
  }, 1000);
  // Affiche un counter incrémenté toutes les secondes
  ```

* `clearInterval` permet d'arrêter un intervalle

  ``` js
  /*
   * Fait apparaître le block obj
   * et clignoter (background-image) nbtimes toutes les t millisecondes
   *
   * @param DOMElement obj
   * @param integer t
   * @param integer nbtimes
   */
  function blink(obj, t, nbtimes) {
    var c = 1;

    // Apparition du bloc
    $(obj).fadeTo(700, 0).delay(300).fadeTo(800, 1, function() {

      // Clignotement du background-image nbtimes fois
      var interval = setInterval(function() {
        if(++c == nbtimes) {
          clearInterval(interval);
        }

        $(obj).css('background-image', 'none')
          .delay(t)
          .queue(function() {
              $(this).css('background-image', '');
              $(this).dequeue();
        });

      }, (t*2));
    });
  }
  ```

L'argument passé pour le délai à `setTimeout` et `setInterval` ne correspond pas au temps exact mais au délai minimum.
