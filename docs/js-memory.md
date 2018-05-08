---
title: Gestion de la mémoire
category: Web, JavaScript
---

## Garbage collector

En JavaScript, la mémoire est allouée automatiquement lors de la création d'objet puis libérée lorsque ceux-ci ne sont plus accessibles. Cette libération est faite par le *garbage collector* ou ramasse-miettes.

Le garbage collector n'a aucun moyen de savoir si un objet va être utilisé dans le futur ou non, à moins que l'objet ne soit plus accessible dans aucun contexte. Les variables locales à une fonction sont ainsi libérées une fois que la fonction a retourné son résultat. Il est donc nécessaire que le développeur garde en tête la libération de la mémoire au moment du développement afin d'éviter des fuites de mémoire qui, cumulées, peuvent fortemment ralentir la page.

Quelques points de vigilance qui peuvent empêcher la mémoire d'être libérée:
* les cycles

  ``` js
  function f() {
    var o  = {};
    var o2 = {};
    o.a = o2; // o référence o2
    o2.a = o; // o2 référence o

    return "azerty";
  }
  ```

* les closures

  ``` js
  function addListener(arr) {

    var b = document.body.querySelector("#foo" + (count++));
    b.addEventListener("click", function(e) {
      // this functions reference keeps the closure current while the event is active
    });
  }

  var arr = ["big data"];
  var i = 100;

  while (i-- > 0) {
    addListener(arr); // the array is passed to the function

    arr = []; // only removes the reference, the original array remains
    array.push("some large data"); // more memory allocated
  }
  // there are now 100 arrays closed over, each referencing a different array
  // no a single item has been deleted
  ```

Pour vider un tableau, et non seulement supprimer la référence, utiliser `arr.length = 0;`.

---

## Debounce

Lorsqu'on écoute un événement, comme par exemple le scroll ou le fait de tapper du texte, les fonctions de callback sont appelées de multiples fois et il souvent inutile de les executer à chaque fois que l'événement est déclenché.

Par exemple pour un autocomplete, plutôt que de requêter le serveur à chaque fois que l'utilisateur tape quelque chose, ne requêter que lorsque l'utilisateur cesse de taper. C'est ce que la technique du `debounce` permet de faire: cette technique a pour but de n'appeler qu'une seule fois une méthode, au début ou à la fin d'une succession de déclenchements d'un événement.

``` js
/**
 * Retourne une fonction qui, tant qu'elle continue à être invoquée,
 * ne sera pas exécutée. La fonction ne sera exécutée que lorsque
 * l'on cessera de l'appeler pendant plus de N millisecondes.
 *
 * @param Function func               - La fonction sur laquelle appliquer debounce
 * @param integer wait                - Nombre de millisecondes à attendre avant d'appeler func
 * @param Object[optionnal] context   - [this]  Contexte dans lequel appeler func
 * @return Function
 */
function debounce(func, wait, context) {
    var timeout = null;

    return function() {
        var ctx  = context || this,
            args = arguments;

        // Tant que la fonction est appelée, on reset le timeout.
        clearTimeout(timeout);
        timeout = setTimeout(function(){
          func.apply(ctx, args);
        }, wait);
    };
}

element.addEventListener("keydown", debounce(traiterEvenement, 300));
```

[JSFiddle Debounce](https://jsfiddle.net/amt01/yL6fdh48/)

## Throttle

`throttle` est une autre technique qui consiste à un éxécuter une fonction de callback toutes les N millisecondes tant qu'un événement se produit. Cette technique permet de s'assurer que la méthode s'execute de manière périodique (si l'utilisateur tape très vite sans s'arrêter par exemple), tout en limitant le nombre d'appels effectués.

``` js
/**
 * Retourne une fonction qui, tant qu'elle est appelée,
 * n'est exécutée qu'une fois toutes les N millisecondes.
 *
 * @param Function func               - La fonction sur laquelle appliquer throttle
 * @param integer wait                - Nombre de millisecondes à attendre avant d'executer func
 * @pram Object[optionnal] context    - [this] Contexte dans lequel appeler func
 */
function throttle(callback, delay, context) {
    var last, timer;

    return function () {
        var ctx  = context || this,
            now  = +new Date(),
            args = arguments;

        // Le délai n'est pas écoulé on reset le timer
        if (last && now < last + delay) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                callback.apply(ctx, args);
            }, delay);

        // On appelle la fonction
        } else {
            last = now;
            callback.apply(ctx, args);
        }
    };
}


input.addEventListener("keydown", throttle(traiterEvenement, 500));
```

[JSFiddle Throttle](https://jsfiddle.net/amt01/v1gkxng4/)
