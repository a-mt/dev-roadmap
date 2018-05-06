---
title: ECMAScript 6
category: Web, JavaScript
---

ECMAScript 6, publiée en 2015, est une nouvelle version du langage qui ajoute de nouvelles fonctionnalités à JavaScript.

La plupart des navigateurs modernes supportent cette la syntaxe mais pour un support complet sur tous les navigateurs, on peut utiliser [Babel.js](https://babeljs.io/) - qui convertit du code ES6 en ES5.
Certains navigateurs exigent d'ajouter `'use strict';` en haut du code avant de pouvoir utiliser les nouvelles fonctionnalités de ES6.

[Tester ES6 en ligne](https://es6console.com/)

---

## Boucles

### for... of

Autre variante du for le `for... of` boucles sur les valeurs d'un objet itérable (un tableau notamment) - contrairement au `for... in` qui boucle sur les clés.

``` js
var arr = [3, 4, 5];
for(var val of arr) {
  console.log(val);  // 3 4 5
}
```

---

## Opérateurs

* [Rest & spread](js-es6-rest-spread.md)
* [Destructuration](js-es6-destructuration.md)
* [Template litterals](js-es6-template-literals.md)

---

## Objets

* [Syntaxe concise pour les objets](js-es6-objet-concis.md)
* [Classe](js-es6-class.md)

---

## Variables

* [let, const](js-es6-let-const.md)
* [Symbole](js-es6-symbol.md)

---

## Fonctions

* [Fonction flèche, paramètres par défaut](js-es6-function-syntax.md)
* [Promesse](js-es6-promise.md)
* [Générateur, itérateur](js-es6-generator.md)
* [Proxy](js-es6-proxy.md)

---

## Tableaux

* [Map, Set, WeakMap, WeakSet](js-es6-map-set.md)
* [Tableaux typés](js-es6-typedarray.md)

---

## Autres

* [Nouvelles méthodes](js-es6-methods.md)
* [Module](js-es6-module.md)
