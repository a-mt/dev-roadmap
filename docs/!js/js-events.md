---
title: Événements
category: Web, JavaScript
---

## Gestionnaire d'événement

Le navigateur déclenche des événements que l'on peut écouter lorsqu'une action se produit dans la page ou sur un élément spécifique: un clic, le passage de la souris sur l'élément, du texte écrit, un élément qui se charge, etc.

Ces événements peuvent être écoutés et gérés grâce à des gestionnaires d'événement ajoutés via la méthode `addEventListener`. Les versions inférieures à IE9 utilisent la méthode `attachEvent`.

Par exemple, pour écouter l'événement `clic`, déclenché lorsque l'utilisateur clique sur un élément:

``` js
element.addEventListener('click', function(){
  alert("Clic sur l'élément !");
});
```

## Attributs on...

On peut obtenir le même résultat que `addEventListener()` en définissant l'attribut `on + (nom de l'événement)` sur l'élément. 
Cette manière de faire n'est pas conseillé et ne devrait être utilisée que sur les éléments inaccessibles au DOM, notamment `window`.  
En HTML:

``` html
<p onclick="alert('Clic')">Mon contenu</p>
```

Ou en JavaScript:

``` js
element.onclick = function(){
   alert("Clic");
}
```

## Diffusion des événements

Lorsqu'un événement se déclenche il se propage dans l'arborescence. Par exemple, un clic sur une image déclenchera également un clic sur le div qui l'englobe. L'ordre dans lequel l'événement est déclenché peut être choisit en passant un booléen en 3ème argument de `addEventListener`:

* Mode Bubbling: le gestionnaire d'événement de l'élément enfant (element2) est déclenché avant celui de l'élément parent (element1). C'est le mode par défaut.

                     / \
      ---------------| |-----------------
      | element1     | |                |
      |   -----------| |-----------     |
      |   |element2  | |          |     |
      |   -------------------------     |
      |        Event BUBBLING           |
      -----------------------------------

  ``` js
  element.addEventListener('click', handleClick, false);
  ```

* Mode Capturing: le gestionnaire d'événement de l'élément parent (element1) est déclenché avant celui de l'élément enfant (element2)

                     | |
      ---------------| |-----------------
      | element1     | |                |
      |   -----------| |-----------     |
      |   |element2  \ /          |     |
      |   -------------------------     |
      |        Event CAPTURING          |
      -----------------------------------

  ``` js
  element.addEventListener('click', handleClick, true);
  ```

Certains événements, lorsqu'ils sont spécifiques à un seul élément, ne se propagent pas. Par exemple, l'événement `load` des éléments image.

## Informations sur l'événement

À l'intérieur du gestionnaire d'événement, on reçoit un objet qui hérite de `Event` en paramètre, contenant des informations sur l'événement. Le contenu de cet objet diffère selon le type d'événement en cours. Par exemple, pour le clic:

``` js
document.addEventListener('click', function(e){
  console.log(e);
});
```

``` txt
altKey: false
bubbles: true
button: 0
buttons: 0
cancelBubble: false
cancelable: true
clientX: 693
clientY: 460
composed: true
ctrlKey: false
currentTarget: null
defaultPrevented: false
detail: 1
eventPhase: 0
explicitOriginalTarget: <div>
isTrusted: true
layerX: 693
layerY: 6901
metaKey: false
movementX: 0
movementY: 0
mozInputSource: 1
mozPressure: 0
offsetX: 0
offsetY: 0
originalTarget: <div>
pageX: 693
pageY: 6901
rangeOffset: 0
rangeParent: null
region: ""
relatedTarget: null
screenX: 695
screenY: 580
shiftKey: false
target: <div>
timeStamp: 131834
type: "click"
view: Window https://localhost
which: 1
x: 693
y: 460
```

Deux valeurs sont particulièrement utiles:
* `target` retourne l'élément qui a déclenché l'événement.
* `currentTarget` retourne la cible actuelle de l'événement. Cette valeur change au fur et à mesure de la diffusion des évènements.

À moins d'avoir définit la valeur de `this` avec `bind()`, elle est égale à `currentTarget`.  
[Plus d'infos sur les cibles des événements](https://developer.mozilla.org/fr/docs/Web/API/Event/Comparaison_des_cibles_d_%C3%A9v%C3%A8nements)

## Stopper la propagation

### Verticale

Pour empêcher que l'événement se propage, de l'enfant aux parents ou du parent aux enfants selon le mode choisit (canceling ou bubbling), on utilise la méthode `stopPropagation()` de l'objet `Event` reçu en paramètre.

``` html
<div class="element1">
  <div class="element2 elem">Mon contenu</div>
</div>
```

``` js
document.querySelector(".element1").addEventListener('click', function(e){
  console.log("element1");
});

document.querySelector(".element2").addEventListener('click', function(e){
  e.stopPropagation();
  console.log("element2");
});

document.querySelector(".elem").addEventListener('click', function(e){
  console.log("elem");
});

// Affiche element2 elem
```

Pour IE<9, il faut définir la propriété `cancelBubble` à vrai et non appeler la propriété `stopPropagation()`.

### Horizontale

Pour empêcher que l'événement ne déclenche d'autres gestionnaires d'événement, pour les parents/enfants mais aussi pour l'élément en cours, on utilise la méthode `stopImmediatePropagation()`.

``` html
<div class="element1">
  <div class="element2 elem">Mon contenu</div>
</div>
```

``` js
document.querySelector(".element1").addEventListener('click', function(e){
  console.log("element1");
});

document.querySelector(".element2").addEventListener('click', function(e){
  e.stopImmediatePropagation();
  console.log("element2");
});

document.querySelector(".elem").addEventListener('click', function(e){
  console.log("elem");
});

// Affiche element2
```

Si plusieurs gestionnaires d'événements sont définis sur un même élément, il sont appelés dans l'ordre dans lequel ils ont été ajoutés.

## Bloquer l'action par défaut

La méthode `preventDefault()` de l'objet `Event` permet de bloquer l'action exécutée par défaut.

Par exemple, à l'intérieur d'un gestionnaire d'événement `submit` (déclenché lorsqu'un formulaire est soumis), la méthode `preventDefault()` empêche la soumission du formulaire vers le serveur - ce qui peut permettre par exemple d'envoyer le formulaire par AJAX au lieu de rafraichir la page.

``` js
form.addEventListener("submit", function(e){
    e.preventDefault();

    console.log(this.values);
});
```

## Déclencher un événement

Il est possible de déclencher manuellement certains événements. Par exemple, pour déclencher un clic:

``` js
element.click()
```

On peut autrement créer un événement de toute pièce et le propager:

``` js
var event = new Event('submit');
element.dispatchEvent(event);
```

Pour un événement non valide (qui n'est pas reconnu par le navigateur), on doit créer un événement personnalisé:

``` js
var event = new CustomEvent('myevent');
element.dispatchEvent(event);
```
