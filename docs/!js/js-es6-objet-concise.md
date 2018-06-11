---
title: Syntaxe concise pour les objets
category: Web, JavaScript, ES6
---

## Méthodes

En ES5, le mot-clé `function` doit être utilisé pour déclarer une fonction

``` js
const person = {
  name: "Taylor",
  sayHello: function() {
    return `Hello! My name is ${this.name}.`;
  }
};
```

En ES6, une version abbrégée a été introduite:

``` js
const person = {
  name: "Taylor",
  sayHello() {
    return `Hello! My name is ${this.name}.`;
  }
};
```

## Propriétés

Lorsque des propriétés sont ajoutées à partir de variables et qu'elles ont le même nom que la variable, alors il existe une version abbrégée.

<ins>ES5</ins>:

``` js
obj = {a: a, b: b};
```

<ins>ES6</ins>:

``` js
obj = {a, b};
```

Exemple complet:

``` js
var a   = 'foo',
    b   = 'bar',
    obj = {a, b};

console.log(obj); // {a: 'foo', b: 'bar'}
```

## Nom dynamique

Des noms de propriétés dynamiques peuvent être utilisées lors de la création d'objets.

``` js
const point = {
  color,
  [ 'prop_' + 42 ]: 42
}
console.log(point.color);
console.log(point.prop_42);
```
