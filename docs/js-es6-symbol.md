---
title: Symbole
category: Web, JavaScript, ES6
---

## Qu'est-ce qu'un symbole

Le symbole est un nouveau type primitif dans ES6.  
Les symboles permettent de créer des propriétés et méthodes privées, dans la mesure où il est nécessaire d'avoir accès au symbole qui déclare la propriété.

Par convention, pour distinguer les symboles des chaînes de caractères dans les docs, on indique un symbole avec le préfixe @@`.

## Créer un symbole

``` js
var firstName = Symbol('firstName');
console.log(firstName); // 'Symbol(firstName)'
```

## Utiliser un symbole pour nom de méthode

``` js
const PRIVATE_VALUE = Symbol('privateValue');
const PRIVATE_METHOD = Symbol('privateMethod');

class Foo {

  constructor () {
    this.publicValue = 'bar';
    this[PRIVATE_VALUE] = 'baz';
  }

  [PRIVATE_METHOD] () {
    // Can't see or call me without jumping through hoops
  }
}
```

