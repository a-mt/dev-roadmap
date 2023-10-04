---
title: JavaScript
category: Web
---

JavaScript ou JS en abrégé est un des 3 langages de base des pages Web
* HTML, langage de balisage pour le contenu et la structure
* CSS, langage de feuille de style pour la présentation
* JS, langage de programmation pour le comportement et l'interraction

JavaScript permet d'effectuer des actions: ouvrir une popup lorsqu'on appuie sur un bouton, faire défiler des images dans un diaporama, etc. De manière générale, il permet d'ajouter de l'action et de rendre la page interractive avec l'utillisateur.

Bien que leur nom se ressemble, JavaScript est un langage totalement différent de Java.

---

## Client-serveur

JavaScript un langage executé côté client, par le navigateur. Cela signifie que le code JavaScript est envoyé au client, et que c'est lui qui l'execute et non le serveur. Mais l'utilisateur peut le désactiver dans son navigateur: le JavaScript doit donc être utilisé pour améliorer l'expérience utilisateur - le site doit pouvoir fonctionner sans.

JavaScript est intentionnellement limité, il n'a pas accès au système de fichiers de l'ordinateur sur lequel il s'execute, ce qui constituerai un risque de sécurité majeur.

JavaScript a été conçu pour fonctionner comme un langage de script executé par le navigateur, mais parce qu'il est devenu très populaire, il est apparu comme un langage de script dans d'autres applicatons commme Adobe Acrobat et Photoshop, et même dans des produits côté serveur, comme NodeJS et Google Apps Script.

---

## Appliquer du JavaScript

Pour executer du JavaScript côté client, il doit être inclut dans une page HTML. On peut le mettre

* directement sur un élément HTML (inline style)

  ``` html
  <button onclick="alert('Hello World')">Click me</button>
  ```

* dans une balise `<script>` à l'intérieur de la pag (embedded style)

  ``` html
  <script>
    document.getElementById("mybtn").addEventListener("click", function(){
      alert("Hello World");
    });
  </script>
  ```

* ou dans un fichier externe inclut dans le page (external style)

  ``` html
  <script src="script.js"></script>
  ```

  ``` js
  alert("Hello World")
  ```

Plusieurs scripts peuvent être ajoutés sur une meme page.

Par défaut, JavaScript sera interprété et exécuté dès que le navigateur le verra (donc la position du JavaScript dans la page est importante). L'interprétation du JavaScript peut retarder le chargement de la page, il est donc d'usage d'inclure le JavaScript en bas de la balise `<body>` - tandis que les feuilles de style sont conservées dans la balise `<head>`.

---

## Structure

Comme dans la plupart des langages de programmation, le code est groupé en instructions. Ces instructions indiquent au navigateur ce qu'il doit faire: changer la couleur du texte, calculer l'âge de quelqu'un, déplacer une image à gauche, faire disparaître ou afficher un menu, afficher un message d'alerte, etc. Les instructions sont executées l'une après l'autre, de gauche à droite, de haut en bas.

De la même manière qu'on termine une phrase par point, on termine une instructions JavaScript par un point-virgule `;`.  
JavaScript est un langage qui "pardonne", le navigateur essaie de deviner ce qu'il doit faire, si bien que dans la plupart des cas, une instruction JavaScript fonctionnera même si le point-virgule est omis. C'est une bonne pratique d'écrire du code valide et non juste du code "qui marche", et donc toujours les mettre.

JavaScript est sensible à la casse mais insensible aux espaces et retours chariots.  
Pour rendre la lecture plus facile, on met généralement une seule instruction par ligne.

``` js
alert("Hello World");
alert("Another message");
```

La plupart du temps, dans un navigateur, le code JavaScript ne doit s'executer qu'en réponse à un événément: lorsque l'utilisateur clique quelque part, lorsqu'il soumet un formulaire ou même lorsque la page a fini de charger par exemple. On regroupe ainsi le JavaScript dans des fonctions qui ne sont appelées que lorsqu'un événement se produit.

``` js
windows.onload = function() {
  alert("La page a fini de charger");
};
```

``` js
document.getElementById("mybtn").addEventListener("click", function(){
  alert("Clic sur #mybtn");
});
```

---

## Commentaires

Deux types de commentaires sont possible en JavaScript:

* le commentaire jusqu'à la fin de la ligne

  ``` js
  // Le commentaire
  ```

* le commentaire délimité (peut être multiligne)

  ``` js
  /* Le commentaire */
  ```

---

## Mode strict

JavaScript peut être utilisé en mode strict en ajoutant la directive `'use strict';` en haut du code. Le mode strict renforce les règles d'analyse et de traitement des erreurs sur le code, ce qui facilite le debuggage: les erreurs de code qui auraient été ignorées en tant normal lèvent une erreur en mode strict, comme le fait de réassigner une constante,  d'assigner une variable non déclarée ou de supprimer une variables qui n'existe pas.

Il permet également de sécuriser le code: les variables et fonctions déclarées à l'intérieur d'une instruction `eval()` ne sont pas crées dans la portée environnante.

[MDN Mode strict](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Strict_mode)

---

## Debugger

Pour debugger du code JavaScript, la plupart des navigateurs proposent une console et un ensemble d'outils destinés aux développeurs, dits *DevTools*. Une console est destinée aux développeurs et non aux utilisateurs, elle est donc fermée par défaut. Pour l'ouvrir sous Firefox: <kbd>Ctrl</kbd> + <kbd>Maj</kbd> + <kbd>k</kbd>.

`console` est un objet JavaScript crée par les navigateurs qui en ont une pour écrire dans la console.

* Afficher un message dans la console:

  ``` js
  console.log("Mon message")
  ```

* Afficher la valeur d'une variable dans la console

  ``` js
  console.log(myvar)
  ```

* Afficher plusieurs valeurs/messages (affichées séparées par des espaces)

  ``` js
  console.log(var1, var2)
  ```

* Utiliser des placeholders

  ``` js
  var greet = "Hello", who = "World";
  console.log("%s %s!", greet, who); // Hello World !
  ```

---

## Historique

* Développé en 1995 par Brendan Eich à Netscape, il est d'abord intégré dans le navigateur Netscape 2 en 1996. Netscape était alors le navigateur le plus populaire, détenant alors presque 80% du marché.

* Devenu populaire dans Netscape, Microsoft crée sa propre version pour Internet Explorer. Ne pouvant pas l'appeler JavaScript, ils le nommèrent JScript. Il y avait des différence entre Netscape et Microsoft, si bien qu'il fallait deux développements différents pour supporter les deux navigateurs.

* Netscape soumis le langage à l'ECMA (European Computer Manufacturers Assocation), organisation de standardisation dans le domaine de l'informatique, en 1997, pour créer une édition indépendante de tout navigateur et officiellement standardisée. Ce langage s'appelle ECMAScript (abrégé ES) - mais tout le monde continue de l'appeler JavaScript.

* Le comité qui supervise l'évolution de la norme ECMA-262 (norme officielle d'ECMAScript) est le TC39, qui représente le comité technique 39 d'ECMA.

* Plusieurs versions d'ES ont vu le jour, ES3 a été publié en 1999. ES4 a été abandonnée. ES5 a été publié fin 2009 et ajoute quelques fonctionnalités supplémentaires. Vous pouvez supposer un support complet dans tous les principaux navigateurs d'ECMAScript 5.

* ES6 est sorti en 2015. Son support natif par les navigateurs évolue progressivement mais il est possible d'utiliser un transcompilateur, le plus connu étant [Babel.js](https://babeljs.io/), pour convertir un code ES6 en ES5.

[The History of JavaScript: ECMAScript, TC39, and beyond](https://medium.freecodecamp.org/ecmascript-tc39-and-the-history-of-javascript-26067498feb9)  
[ECMAScript Editions](https://www.w3schools.com/js/js_versions.asp)  
[Tester ES6 en ligne](https://es6console.com/)

---

## Les 5 étapes des évolutions ECMAScript

Le processus de proposition de nouvelles fonctionnalités à ECMAScript se déroule en 5 étapes:

* Étape 0: document de travail (strawman)  
  Le point de départ de toute proposition. Il n'y a pas de critères d'acceptation et n'importe qui peut faire une nouvelle proposition pour cette étape. Elle n'a pas à être implémentée et la spécification n'est pas tenue de suivre quelconque norme. Cette étape est destinée à lancer une discussion sur la fonctionnalité, celle-ci peut changer signicativement avant de passer de passer à l'étape suivante ou même être abandonnée.

* Étape 1: proposition  
  À cette étape, on a une proposition formelle réelle. Cette proposition nécessite un "champion", c'est à dire un membre du comité TC39 qui s'occupe du travail de conception pour la proposition. À ce stade, un polyfill* est développé et des démos sont présentées. Des changements majeurs peuvent encore se produire après cette étape.

  *Un polyfill est un code qui implémente une fonctionnalité sur les navigateurs web qui ne la supportent pas.  
  html5shiv par exemple est un polyfill.

* Étape 2: brouillon  
  La syntaxe est décrite avec précision en utilisant le langage formal TC39. Des modifications rédactionnelles mineures peuvent se produire mais la spécification ne nécessite pas de révision majeure. Lorsqu'une proposition est au stade de brouillon, il y a toutes les chances pour qu'elle soit finalement inclue au langage.

* Étape 3: candidate  
  Une proposition candidate est une proposition approuvée et d'autres changement ne seront effectués qu'à la demande des auteurs de la mise en oeuvre. À partir d'ici, on peut s'attendre à ce que la fonctionnalité soit implémentée dans les moteurs JavaScript des navigateurs. C'est une fonctionnalité que l'on peut utiliser sans souci.

* Étape 4: terminé  
  Indique que la proposition a été acceptée et que la spécification a été fusionnée avec la spécification JavaScript principale. Aucun autre changement n'est attendu. Les moteurs JavaScript sont censés les avoir implémentées.

[Interesting ECMAScript 2017 proposals that weren’t adopted](https://blog.logrocket.com/interesting-ecmascript-2017-proposals-163b787cf27c)

---

## Librairie, Plugin, Framework & API

### Librairie

Une *librairie* est un ensemble de fonctions que l'on peut appeler.  
Une librairie est généralement organisée en module / classe.

<ins>Exemples</ins>: JQuery, underscore.js, React

### Plugin

Un *plugin* est un utilitaire que l'on peut ajouter à une librairie pour ajouter des nouvelles fonctions, qui se base sur cette librairie pour fonctionner.

<ins>Exemples</ins>: JQuery UI, React Router

### Framework

Un *framework* est un "squelette" d'application, avec une architecture pré-établie, qui contient un ensemble de librairies déjà inclues, et par dessus lequel on ajoute nos propres sous-classes et plugins.

<ins>Exemples</ins>: Ember.js, Angular.js, Backbone

La principale différente entre une librairie et un framework est l'inversion du contrôle. Dans le cas d'une librairie, on en appele les méthodes, on a le contrôle. Avec un framework, le contrôle est inversé: c'est le framework qui appelle nos méthodes.
La plupart du temps, une librairie prend peu de temps à apprendre tandis qu'un framework prend plus de temps.

### API

Une *API* (Application Programming Interface) est une interface (un ensemble de propriétés et méthodes) qui permet d'interagir avec une application. Dit simplement, une API est la partie exposée (publique) d'une application, que l'on peut appeler. On accède à une librarie ou à un service web via son API.

Le navigateur fournit une API Web, du JavaScript qui ne fait pas partie des spécifications ECMAScript, pour interagir avec
* le navigateur (ex: geolocalisation, web-storage)
* la page (ex: historique, cookies)
* son contenu (ex: video, canvas)

### Vanilla JavaScript

Lorsqu'aucune librairie ni framework n'est utilisé, que l'on n'utilise que les méthodes JavaScript natives (méthodes supportées par le navigateur sans avoir à inclure des ressources externes), alors on parle de *Vanilla JavaScript*.
