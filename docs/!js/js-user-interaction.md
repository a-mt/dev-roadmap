---
title: Interractions utilisateur
category: Web, JavaScript, API
---

## Matériel

On peut utiliser les événements pour détecter quand l'utilisateur interragit avec la page en utilisant son clavier, sa souris, son doigt (dans le cas d'un écran tactile), voire sa manette.

### Clavier

| Événement  | Description
|---         |---
| `keydown`  | L'utilisateur presse une touche. C'est à ce moment là que vous pouvez détecter si l'utilisateur tappe Entrée, tabulation, une flèche, etc.
| `keypress` | L'utilisateur tape un caractère, avant que celui-ci ne soit écrit. `keypress` n'est pas déclenché pour les caractères de contrôle, les flèches, et tout autre caractère qui n'est pas visible.
| `keyup`    | L'utilisateur relache la touche, l'action a été déclenché. C'est à ce moment là que vous pouvez détecter si l'utilisateur a écrit quelque chose
| `change`   | Le contenu du champ est modifié. Cette technique a l'avantage de fonctionner si l'utilisateur fait un copier/coller.

``` js
element.addEventListener('keydown', function(e){
    var code = e.keyCode || e.which || 0;

    if(code == 13) {
        console.log('Entrée');
    }
});
```

``` js
element.addEventListener('change', function(){
    console.log(this.value);
});
```

### Souris

| Événement     | Description
|---            |---
| `clic`        | Clic
| `dblclick`    | Double-clic
| `contextmenu` | Clic droit
| `scroll`      | L'utilisateur fait défiler le contenu de l'élément
| `wheel`       | La molette de la souris est scrollée. `scroll` n'est pas nécessairement déclenché (dans le cas où l'élément n'a pas d'overflow)
| `mousedown`   | Le bouton de la souris est pressé
| `mouseup`     | Le bouton de la souris est relaché
| `mousemove`   | La souris est déplacée
| `mouseenter`  | La souris entre à l'intérieur de l'élément
| `mouseleave`  | La souris sort de l'élément
| `mouseover`   | La souris entre à l'intérieur de l'élément ou à l'intérieur d'un de ses enfants. [Exemple mouseenter vs mouseover](http://api.jquery.com/mouseover/#example-0)
| `mouseout`    | La souris sort de l'élément ou de l'un de ses enfants

Vous pouvez également implémenter le clic long en utilisant un timeout:

``` js
var timerClickDuration,
    clicLong = false;

element.addEventListener("mousedown", function(){
    timerClickDuration = setTimeout(function(){
        clicLong = true;
    }, 150);
});
element.addEventListener("mouseup", function(){
   clearTimeout(timerClickDuration);

   console.log(clicLong ? "clic long" : "clic court");
   clicLong = false;
});
```

### Toucher du doigt

Il existe des événements indépendants des événements de la souris pour les écrans tactiles:

| Événement     | Description
|---            |---
| `touchstart`  | L'utilisateur touche l'écran
| `touchmove`   | L'utilisateur déplace son doigt sur l'écran
| `touchend`    | L'utilisateur enlève son doigt de l'écran
| `touchcancel` | L'événement touch est annulé, par exemple si l'utilisateur met 5 cinq doigts sur l'écran

### Pointeur

Les événements de pointeur (point de contact) aident à gérer plus facilement l'interraction utilisateur, en normalisant le traitement de multiples formes d'entrée comme la souris, le toucher du doigt et la saisie au stylet.

Les événements génériques pour gérer la saisie du pointeur (tout contact avec l'écran, avec la souris ou le toucher) ressemblent beaucoup à ceux pour la souris:

| Événement            | Description
|---                   |---
| `pointerdown`        | Un point de contact est établit
| `pointerup`          | Le point de contact est levé
| `pointermove`        | Le point de contact est déplacé
| `pointerenter`       | Le point de contact entre à l'intérieur d'un élément
| `pointerover`        | Le point de contact est à l'intérieur d'un élément
| `pointerleave`       | Le point de contact sort d'un élément
| `pointerout`         | Le point de contact n'est plus assigné à l'élément (leave, cancel)
| `pointercancel`      | Le point de contact ne peut plus générer d'événements (ex: l'utilisateur met 5 cinq sur l'écran)

Les événements de pointeur ne sont pas encore beaucoup pris en charge par les navigateurs, mais vous pouvez utiliser le [polyfill pointer.js](https://github.com/mozilla/pointer.js).

### Manette

| Événement             | Description
|---                    |---
| `gamepadconnected`    | Une manette est connectée
| `gamepaddisconnected` | La manette est déconnectée

---

## Actions

On peut utiliser les événements pour détecter quand l'utilisateur effectue une action particulière, comme l'impression ou le redimensionnement de la page; contrôler les actions effectuées, par exemple permettre de zoomer un élément en pinçant (sur smartphone); ou même utiliser des API déclencher des actions, comme la copie vers le presse papier.

### touch-action

La propriété CSS `touch-action` permet de spécifier si le navigateur doit appliquer son comportement par défaut aux interractions tactiles, comme zoomer ou scroller.

Valeurs possibles
* `none`: désactive tous les comportements par défaut
* `pan-x`: active le scroll horizontal
* `pan-y`: active le scroll vertical
* `pinch-zoom`: active le zoom
* `auto`: active tous les comportements par défaut

``` css
touch-action: pan-y pinch-zoom;
```

### Zoom

Pour détecter si l'utilisateur essaie de zoomer/dézoomer en pinçant/étirant l'écran, il est nécessaire d'utiliser les gestionnaires d'événement de pointeur et de vérifier le nombre de pointeurs utilisé et le type de mouvement effectué.
[Codepen pincer/étirer](https://codepen.io/a-mt/pen/yEwNGW).

Il est également possible d'utiliser des librairies, comme Hammer.js pour détecter les événements complexes - zoom, swipe, rotate... [Swipe.js](http://lyfeyaj.github.io/swipe/) permet de détecter le swipe.

---

### Contenu éditable

Tout élément DOM peut être rendu éditable en utilisant l'attribut `contenteditable`.

``` html
<div contenteditable="true"> 
    Ce texte peut être édité par l'utilisateur.
</div>
```

On peut utiliser cette fonctionnalité pour créer un éditeur rich-text par exemple.
[Article MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content)

---

### Plein écran

Si vous avez besoin de présenter un élément en plein écran (comme une vidéo par exemple), vous pouvez appeler `requestFullscreen()` sur cet élément.
Le plein écran peut être quitté par l'utilisateur en pressant <kbd>Echap</kbd> ou avec JavaScript en appelant `document.exitFullscreen()`.

``` js
function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}
```

* La propriété `document.fullscreenEnabled` indique si le plein écran est activé
* `document.fullscreenElement` contient l'élément actuellement en plein écran
* L'événement `fullscreenchange` est déclenché sur le document quand le plein écran est activé ou desactivé.
* Si le navigateur ne peut pas passer en plein écran, l'événement `fullscreenerror` est déclenché

``` js
document.addEventListener("fullscreenchange", function(event) {
  if(document.fullscreenEnabled) {
    console.log(document.fullscreenElement);
  }
});
document.addEventListener("fullscreenerror", function(event) {
  console.error("Fullscreen error");
});
```

Vous pouvez utiliser [Fscreen](https://github.com/rafrex/fscreen) pour normaliser les préfixes fournisseur (webkit, mos, ms).

---

### Redimensionner

La fenêtre peut être redimensionnée en JavaScript avec 

* `window.resizeTo(width, height)` (valeur absolue)

  ``` js
  window.resizeTo(
    window.screen.availWidth / 2,
    window.screen.availHeight / 2
  );
  ```

* ou `window.resizeBy(xDelta, yDelta)` (relatif à la taille actuelle)

  ``` js
  // shrink the window 
  window.resizeBy(-200, -200);
  ```

L’événement `resize` est déclenché après le redimensionnement de la fenêtre, initié par l'utilisateur ou par JavaScript.   
Le même événement existe sur les éléments redimensionnables (comme textarera).

``` js
window.onresize = function(){
  console.log(window.innerWidth, window.innerHeight);
};
```

---

### Scroller la page

Il est possible de scroller la page en JavaScript avec

* `window.scrollTo(x,y)` (valeur absolue)  
  La méthode `window.scroll` et un alias de `window.scrollTo`

  ``` js
  window.scrollTo(
    0,
    document.body.clientHeight / 2
  );
  ```

  Cette méthode accepte également un objet en entrée. Si la propriété `top` ou `left` n'est pas précisée, alors la page conserve la position actuelle du scroll vertical ou horizontal correspondant. On peut également préciser le comportement du scroll: `smooth`, `instant` ou `auto`.

  ``` js
  window.scrollTo({
    top: 1000,
    behavior: "smooth"
  });
  ```

* `window.scrollBy(x,y)` (valeur relative)

  ``` js
  // 100px vers le bas
  window.scrollBy(0, 100);
  ```

L'événement `scroll` est déclenché quand la fenêtre est scrollée. Comme la fréquence de cet événement peut être élevée, le gestionnaire d'événement lié ne devrait pas effectuer d'opération couteuse. À la place, temporiser l'événement avec `requestAnimationFrame` ou `setTimeout`.

Les propriétés `pageXOffset` et `pageYOffset` sont des propriétés en lecture seule, retournant le nombre de pixels actuellement scrollés. `scrollX` et `scrollY` sont des alias de ces propriétés.

``` js
window.addEventListener('scroll', function(e) {
  console.log(window.scrollX, window.scrollY);
});
```

---

### Positionner un élément

#### offset

Les propriétés `offsetWidth` et `offsetHeight` renvoient la largeur et hauteur visible de l'élément, comprenant les bordures, le padding, et la scrollbar. 

Les propriétés `offsetLeft` et `offsetTop` renvoient la position du coin supérieur gauche de l'élément par rapport à `offsetParent`. C'est utile si vous voulez positionner une popup en absolu à côté de l'élément par exemple.

`offsetParent` est l'ancêtre le plus proche de l'élément qui a une position autre que statique. Ainsi, pour connaître la position de l'élément dans la page, il est nécessaire d'utiliser une boucle.

``` js
function getElementPosition(element) {
  var x = 0,
      y = 0;

  while(element) {
    x += element.offsetLeft;
    y += element.offsetTop,

    element = element.offsetParent;
  }
  return {x: x, y: y};
}
```

#### getBoundingClientRect

La méthode `getBoundingClientRect()` renvoie la taille et la position de l'élément par rapport au viewport, elle prend donc en compte le scroll alors que les propriétés `offset` non. [Codepen getBoundingClientRect().top vs offsetTop](https://codepen.io/MehulJoshi/pen/QvovPq). 

#### client

`clientWidth` et `clientHeight` sont comme `offsetwidth` et `offsetHeight` mais n'incluent pas la taille de la bordure, uniquement le contenu et padding.

Les propriétés `clientLeft` et `clientTop` ne sont pas très utiles: elles retournent la distance entre le bord extérieur du padding et le bord extérieur de la bordure. Si l'élément a des scrollbars et qu'elles sont placés en haut ou à gauche (ce qui est inhabituel), ces valeurs incluent également la taille de la scrollbar.

#### scroll

`scrolWidth` et `scrollHeight` renvoient la largeur du contenu, du padding et du contenu en overflow. Quand l'élément n'a pas d'overflow, ces valeurs sont également à `clientWidth` et `clientHeight`.

Les propriétés `scrollLeft` et `scrollTop` donnent les positions des scrollbars de l'élément. Ces propriétés sont en lecture/écriture, il est donc possible de scroller un élément en mettant à jour ces valeurs.

``` js
element.scrollLeft += 10;
```

Lorsque l'élément est scrollé, l'événément `scroll` est déclenché.

``` js
element.addEventListener('scroll', function(e) {
  console.log(element.scrollTop);
});
```

#### scrollIntoView

La méthode `scrollIntoView` fait défiler la page de manière à rendre l'élément visible. Il est possible de passer des options (optionnel):

``` js
element.scrollIntoView({
  behavior: "instant",
  block: "end",
  inline: "nearest"
});
```

---

### Impression

L'événement `beforeprint` est déclenché juste avant que la page ne soit imprimée ou que l'aperçu d'impression ne soit affiché. `afterprint` quand l'impression a commencé ou que l'aperçu d'écran est fermé.

---

### Sélection

#### Sélectionner un input

L'évènement `select` est déclenché quand du texte est sélectionné à l'intérieur d'un élément `input` ou `textarea`.  
Le raccourcis <kbd>Ctrl</kbd> + <kbd>a</kbd> ne déclenche pas cet événement.

``` js
var input = document.getElementById('input');

input.addEventListener('select', function() {
  alert('La sélection a changé !');
}, false);
```

La méthode `select()` quant à elle permet de sélectionner tout le contenu d'un élément input ou textarea.

``` js
input.select();
```

#### Sélectionner un div

L'API Selection est plus intéressante, elle permet de récupérer et manipuler la sélection.  
Pour ce faire, on récupère un objet `Selection` avec la méthode `window.getSelection()`.

``` js
var selection = window.getSelection();

if(!selection) { // Opera!
  selection = document.selection.createRange();
}
```

Cet objet nous permet de

* sélectionner un élement

  ``` js
  selection.selectAllChildren(div);
  ```

* tout déselectionner

  ``` js
  selection.removeAllRanges();
  ```

* ou encore choisir les élements et l'ensemble de caractères à sélectionner en utilisant un objet `Range`

  ``` js
  // Sélectionne les 10 premiers caractères
  var range = document.createRange();
  range.setStart(text.firstChild, 0);
  range.setEnd(text.lastChild, 10);
  ```

  Si le noeud donné à `setStart`/`setEnd` est de type Text, Comment, ou CDATASection, la valeur donnée est l'index des caractères à sélectionner. Pour les autres types, il s'agit de l'index des enfants à sélectionner.  
  Une erreur est levée si vous essayez de sélectionner plus de caractères/enfants qu'il n'en existe.

#### Manipuler la sélection

Lorsque des élements sont sélectionnés, on peut alors

* récupérer le contenu de sélection

  ``` js
  console.log(selection.toString());
  ```

* copier la sélection en cours dans le presse papier

  ``` js
  document.execCommand('copy');
  ```

* mettre la sélection dans un noeud

  ``` js
  var newNode = document.createElement("strong");
  range.surroundContents(newNode);
  ```

[JSFiddle Selection API](https://jsfiddle.net/amt01/yxkrpc34/)  
Consulter la doc pour la liste complète des fonctionnalités de l'[API Selection](https://developer.mozilla.org/en-US/docs/Web/API/Selection).

#### Événements

L'événement `selectstart` est déclenché quand l'utilisateur commence à sélectionner du texte et `selectChange` lorsque l'utilisateur relache la souris.

``` js
var selection;

document.onselectionchange = function() {
  console.log('New selection made');
  selection = window.getSelection();
};
```

#### Désactiver la sélection

La sélection peut être désactivée via CSS

``` css
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
```

Ou via JavaScript

``` js
element.onselectionchange = function() { return false; }
```

---

### Copier/coller

* L'événement `copy` est déclenché quand l'utilisateur copie la sélection

  ``` js
  document.addEventListener('copy', function(e) {
    e.preventDefault();
    console.log('Copy Event triggered');
  });
  ```

  Il est possible de modifier le texte copié en modifiant la sélection avant la copie. [JsFiddle copy change text](https://jsfiddle.net/amt01/pce2h9r7/)

* L'événement `cut` est déclenché quand l'utilisateur coupe la sélection

  ``` js
  document.addEventListener('cut', function(e) {
    e.preventDefault();
    console.log('Cut Event triggered');
  });
  ```

* L'événement `paste` est déclenché quand l'utilisateur colle du contenu

  ``` js
  document.addEventListener('paste', function (e) {
    e.preventDefault();
    console.log('Paste Event triggered');

    var data;
    if (window.clipboardData) {  // IE
      data = window.clipboardData.getData('Text');
    } else {  // Standard-compliant browsers
      data = e.clipboardData.getData('text');
    }
    console.log('paste', data);
  });
  ```

---

### Drag & Drop

Le Drag & Drop, ou glisser-déposer en français, s'effectue en trois temps

1. cliquer sur un élement
2. tout en gardant le clic enfoncé, glisser l'élément à un autre endroit
3. relacher le bouton de la souris pour déposer l'élément à cet endroit

* Pour pouvoir effectuer un drag & drop l'élément déplacé doit avoir l'attribut `draggable` et implémenter le gestionnaire d'événement `dragstart`. Il doit associer des données au glissement pour identifier ce qui est en train de glisser en appelant la méthode `setData()` de la propriété `dataTransfer` de l'événement.

  ``` html
  <p id="p1" draggable="true">This element is draggable.</p>
  ```

  ``` js
  function dragstart_handler(ev) {
     console.log("dragStart");

     ev.dataTransfer.setData("text/plain", ev.target.id);
  }
  p1.addEventListener("dragstart", dragstart_handler);
  ```

  On définit généralement le type de données en précisant son type MIME mais vous pouvez utiliser vos propres types.  
  En outre, vous pouvez fournir une donnée dans de multiples formats, dans l'ordre du format le plus spécifique au moins spécifique.
  Si aucune donnée à glisser n'est ajoutée, alors l'opération de glissement ne s'effectue pas.

  ``` js
  var dt = event.dataTransfer;
  dt.setData("application/x-bookmark", bookmarkString);
  dt.setData("text/uri-list", "http://www.mozilla.org");
  dt.setData("text/plain", "http://www.mozilla.org");
  ```

* L'image affichée lors du déplacement peut être personnalisée. Par défaut, il s'agit de l'élément à l'origine du glissement.

  ``` js
  ev.dataTransfer.setDragImage(canvas, 25, 25);
  ```

  Le premier argument est un objet `Image` ou `Canvas`.
  Les arguments 2 et 3 sont l'emplacement de l'image par rapport au pointeur de la souris. Dans notre exemple, comme le canvas fait 50x50, nous utilisons son centre (25x25) pour que l'image soit centrée sur le pointeur de la souris.

* L'événement `drag` est déclenché sur l'élément à peu près toutes les 100 millisecondes lors du glissement.

* Au cours du glissement, l'événement `dragover` va être déclenché sur les éléments sur lesquels la souris passe. Pour qu'un élément autorise le dépot, il doit implémenter le gestionnaire d'événement `dragover` et prévenir le comportement par défaut.

  ``` html
  <div ondragover="event.preventDefault()">
  ```

  La propriété `dataTransfer` peut être utilisée pour vérifier les données reçues et autoriser ou non le dépot en conséquence.

  ``` js
  function doDragOver(ev) {
    if(ev.dataTransfer.types.contains("text/uri-list")) {
      ev.preventDefault();
    }
  }
  ```

  La propriété `effectAllowed` de `dataTransfer` définit si l'élément peut être copié, lié ou/et déplacé sur la cible.  
  Si ce n'est pas précisé, alors toutes les opérations sont permises.

  ``` js
  ev.dataTransfer.effectAllowed = "copyMove";
  ```

  La propriété `dropEffect` définit l'opération qui sera effectuée par défaut.  
  Les valeurs valides sont `none`, `copy`, `move` ou `link`. Le curseur de la souris changera pour l'indiquer.

  ``` js
  event.dataTransfer.dropEffect = "copy";
  ```

  L'utilisateur peut modifier l'effet désiré en utilisant les raccourcis clavier. Ceux-ci varient selon la plateforme, mais il s'agit généralement d'une combinaison de <kbd>Maj</kbd> et <kbd>Ctrl</kbd>.  
  [Codepen effectAllowed & dropEffect](https://codepen.io/SitePoint/pen/epQPNP).

* Les gestionnaires d'événement `dragenter` et `dragleave` peuvent être utilisés pour appliquer un style sur les éléments où la souris passe.

* Si la souris est relachée sur un élément qui autorise le dépot (en implémentant `dragover`), alors l'événement `drop` est declenché sur cet élément. Pour empêcher que le navigateur se charge lui-même du drop, vous devez empêcher l'action par défaut. Vous pouvez vérifier la propriété `dropEffect` pour déterminer l'opération a effectuer.

  ``` js
  function onDrop(ev) {
    var data = ev.dataTransfer.getData("text/plain");
    ev.target.textContent = data;
    ev.preventDefault();
  }
  ```

* Une fois que le drag & drop est finit, l'événement `dragend` est déclenché sur l'élément d'origine (celui qui a reçu l'événement `dragstart`).
  `dropEffect` peut être utilisé pour déterminer quelle action a été effectuée et supprimer l'élément si l'action effectuée est un déplacemet. Elle vaut `none` si le drag & drop a été annulé.

Récapitulatif des événements:

| Événement   | Description
|---          |---
| `dragstart` | Déclenché sur l'élément quand l'utilisateur comme à le déplacer (obligatoire pour autoriser le drag)
| `drag`      | Déclénché sur l'élément toutes à peu près les 100ms lors du glissement
| `dragend`   | Déclenché sur l'élément quand l'utilisateur le lache
||
| `dragenter` | Déclenché sur l'élément survolé lorsque l'utilisateur en survole un
| `dragover`  | Déclenché sur l'élément survolé à peu près toutes les 100ms (obligatoire pour autoriser le drop)
| `dragleave` | Déclenché sur l'élément qui était survolé lorsque l'utilisateur quitte la zone de l'élément
| `drop`      | Déclenché sur l'élément cible s'il autorise le dépot

Note: Les événements `dragstart` et `dragend` ne sont pas déclenchés lorsque l'utilisateur drag & drop un fichier à partir de son système d'exploitation.

---

### Orientation de l'appareil

Certains appareils peuvent avoir une orientation, par rapport au sol. C'est notamment le cas des smartphones.  
Il existe deux types d'événements JavaScript pour gérer l'orientation:

* `deviceorientation` ou `deviceorientationabsolute` est déclenché quand l'accéléromètre détecte un changement d'orientation ou d'élévation de l'appareil. [Codepen deviceorientation](https://codepen.io/a-mt/pen/YvgWjj).

  L'événement d'orientation contient quatre propriétés:

  * `absolute`: booléen indiquant si les données d'orientation fournies sont absolues (par rapport aux coordonnées de la terre) ou relatives au périphérique. Les données absolues sont utiles pour la VR notamment, et les données relatives pour les jeux sur smartphone par exemple.

    ![](https://i.imgur.com/WGlOe7Nt.png)

  * `alpha`: représente le mouvement de l'appareil autour de l'axe z, c'est à dire la rotation.  
    L'angle alpha est compris entre 0° et 360°. Il vaut 0° quand le haut de l'appareil pointe vers le pôle nord, et augmente lorsque l'appareil est tourné vers la gauche.

    ![](https://i.imgur.com/DLko8Stt.png)


  * `beta`:  représente le mouvement de l'appareil autour de l'axe x, c'est à dire le mouvement d'avant en arrière.  
    L'angle beta est compris entre -180° et 180°. Il vaut 0° lorsque le haut et le bas de l'appareil sont à la même hauteur, il augmente vers 180° lorsque l'appareil est incliné vers l'avant et diminue vers -180° pour l'arrière.

    ![](https://i.imgur.com/RSKezPQt.png)

  * `gamma`: représente le mouvement de l'appareil autour de l'axe y, c'est à dire le mouvement de gauche à droite.  
    L'angle gamma est compris entre -90° et 90°. Il vaut 0° lorsque les côtés gauche et droit de l'appareil sont à la même hauteur, il augmente vers 90° lorsque l'appareil est incliné vers la droite, et vers -90° pour la gauche.

    ![](https://i.imgur.com/3zLoVVAt.png)

  ``` js
  window.addEventListener("deviceorientation", handleOrientation, true);

  function handleOrientation(event) {
    var absolute = event.absolute;
    var alpha    = event.alpha;
    var beta     = event.beta;
    var gamma    = event.gamma;

    // Faites quelque chose avec les données acquises. ;)
  }
  ```

  Le polyfill [gyronorm.js](https://github.com/dorukeker/gyronorm.js) permet de normaliser les données de l'accéléromètre et du gyroscope et de surmonter les différences dans les différents appareils.

* `devicemotion` est déclenché quand un changement de vitesse du mouvement est détecté.  
  Cela permet par exemple d'utiliser le geste de secouer pour actualiser les données, de faire sauter un personnage dans un jeux ou encore d'implémenter une application de fitness. [Codepen détection des secousses](https://codepen.io/a-mt/pen/XYGRbo)

  L'événement de mouvement contient quatre propriétés:

  * `acceleration`: retourne l'accélération enregistrée par l'appareil (en m/s²) pour chaque axe - x, y et z.
  * `accelerationIncludingGravity`: contient la somme de l'accélération de l'appareil induite par l'utilisateur et de celle provoquée par la gravité. Cette valeur n'est pas aussi utile que `acceleration` mais c'est la seule disponible pour les appareils sans gyroscope.
  * `rotationRate`: contient le ratio de rotation de alpha, beta et gamma, exprimé en degré par seconde (deg/s).
  * `interval`: intervalle de temps (en ms) pour les données générées par l'appareil

  ``` js
  window.addEventListener('devicemotion', function(event) {
    console.log(event.acceleration.x + ' m/s2');
  });
  ```

---

### Orientation de l'écran

L'orientation de l'écran peut être en portrait (hauteur > largeur) ou en paysage (largeur > portrait). Si un appareil n'a pas forcemment la capacité de détecter sa propre orientation, un écran lui en possède toujours une.

Il y a deux manières de gérer l'orientation de l'écran:

* En CSS, avec la media query `orientation`, pour ajuster la mise en forme.

  ``` css
  @media screen and (orientation: portrait) {
    #toolbar {
      width: 100%;
    }
  }
  @media screen and (orientation: landscape) {
    #toolbar {
      position: fixed;
      width: 2.65em;
      height: 100%;
    }
  }
  ```

* En JavaScript, pour récupérer l'orientation en cours de l'écran et éventuellement de verrouiller.

  La propriété `screen.orientation` contient l'orientation de l'écran.  
  L'événement `screen.orientationchange` est déclenché chaque fois que l'appareil change.

  ``` js
  screen.addEventListener("orientationchange", function () {
    console.log(screen.orientation);
  });
  ```

  Une application peut verrouiller l'écran dans une orientation donnée avec `screen.lockOrientation()` et la déverrouiller avec `screen.unlockOrientation()`

  ``` js
  screen.lockOrientation('landscape');
  ```

---

### Capturer la souris

La capture de souris permet de désigner un élément spécifique comme étant la cible des événements de pointeur jusqu'à ce que le bouton de la souris soit relâché ou que la capture soit explicitement libérée. Lorsqu'un élément capture les événement, cela a pour effet de supprimer les événements de pointeur sur tous les autres éléments.
[JsFiddle setCapture](https://jsfiddle.net/amt01/6bfwtepc/)

La méthode `setCapture` permet de capturer les événements et `releasePointerCapture` de libérer la capture.

``` js
div.onpointerdown = function(e) {
   div.setPointerCapture(e.pointerId);
};
div.onpointercancel = function(e) {
  div.releasePointerCapture(e.pointerId);
};
```

Lorsqu'un élément reçoit ou perd la capture, les événements `gotpointercapture` ou `lostpointercapture` sont déclenchés sur l'élément (respectivement).

---

### Verrouiller le pointeur

Il est possible de verrouiller le pointeur à un élément donné et de cacher le curseur de la souris. C'est utile par exemple pour les jeux qui ont besoin d'écouter la souris pour contrôler les mouvements. Les joueurs peuvent cliquer sur les boutons et déplacer le curseur de la souris sans se soucier de quitter la zone de jeu, les événements continuent d'être déclenchés sur l'élément verrouillé. [Pointer lock demo](https://mdn.github.io/dom-examples/pointer-lock/) ([code source](https://github.com/mdn/dom-examples/tree/master/pointer-lock)).

Le verrouillage de pointeur (API Pointer Lock) partage des similitudes avec la capture de souris mais diffère sur les points suivants:

1. La capture de souris offre un flot ininterrompu d'évènements sur un élément cible quand la souris bouge mais s'arrête quand le bouton de la souris est relaché. Pointer lock ne libère pas la capture tant qu'un appel explicite à l'API n'a pas été effectué - il continue de déclencher des évènements peu importe l'état des boutons de la souris.
2. Ne se limite pas aux bordures du navigateur ou de l'écran.
3. Cache le curseur.

Pour verrouiller le pointeur, on utilise la méthode `requestPointerLock()`. Par exemple:

``` js
canvas.requestPointerLock = canvas.requestPointerLock
    || canvas.mozRequestPointerLock
    || canvas.webkitPointerLockElement;
canvas.requestPointerLock()
```

`document.pointerLockElement` contient l'élément actuellement verrouillé.

``` js
document.pointerLockElement = document.pointerLockElement
    || document.mozPointerLockElement
    || document.webkitPointerLockElement;
console.log(document.pointerLockElement);
```

La méthode `document.exitPointerLock()` permet de libérer le pointeur.

``` js
document.exitPointerLock = document.exitPointerLock
    || document.mozExitPointerLock
    || document.webkitExitPointerLock;
document.exitPointerLock();
```

Quand l'état de verrouillage du pointeur change, l'événement `pointerlockchange` est envoyé au document.

``` js
document.addEventListener('pointerlockchange', pointerLockChange, false);
document.addEventListener('mozpointerlockchange', pointerLockChange, false);
document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
```

Le verrouilage du pointeur ne peut concerner qu'une seule iframe à la fois. Quand vous verrouillez une iframe, vous ne pouvez pas essayer de verrouiller une autre iframe et y transférer la cible; une erreur sera levée. Pour éviter cette limitation, déverrouillez d'abord la première iframe, puis verrouillez la seconde. Si l'appel à `requestPointerLock()` déclenche une erreur, l'événement `pointerlockerror` est envoyé au document. 

``` js
document.addEventListener('pointerlockerror', lockError, false);
document.addEventListener('mozpointerlockerror', lockError, false);
document.addEventListener('webkitpointerlockerror', pointerLockChange, false);
```
