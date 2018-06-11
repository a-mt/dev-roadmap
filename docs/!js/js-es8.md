---
title: ECMAScript 8
category: Web, JavaScript
---

ECMAScript 8 ou ECMAScript 2017 a été publié fin Juin 2017 par le TC39.

## Objet

### Object.values()

Retourne un tableau contenant toutes les valeurs du tableau

``` js
const countries = {
    BR: 'Brazil',
    DE: 'Germany',
    RO: 'Romania',
    US: 'United States of America'
};

Object.values(countries); // ['Brazil', 'Germany', 'Romania', 'United States of America']
```

### Object.entries()

Retourne un tableau contenant toutes les paires clés/valeurs du tableau

``` js
const countries = {
    BR: 'Brazil',
    DE: 'Germany',
    RO: 'Romania',
    US: 'United States of America'
};

Object.entries(countries); 

// [['BR', 'Brazil'], ['DE', 'Germany'], ['RO', 'Romania'], ['US','United States of America']]
```

### Object.getOwnPropertyDescriptors()

Retourne toutes les propriétés de l'objet et leur attributs. Les attributs possibles sont: `value`, `writable`, `get`, `set`, `configurable` et `enumerable`.

``` js
const obj = {
    name: 'Pablo',
    get foo() { return 42; }
};

Object.getOwnPropertyDescriptors(obj);
/*
  foo:
      configurable: true
      enumerable: true
      get: function get foo()
      set: undefined
  name:
      configurable: true
      enumerable: true
      value: "Pablo"
      writable: true
*/
```

Cela permet notamment de recopier intégralement un objet, avec getter et setter, et non plus uniquement les propriétés.

``` js
const objSource = {
    set greet(who) { console.log('Hello ' + who); }
};

const objTarget = {};
Object.defineProperties(objTarget, Object.getOwnPropertyDescriptors(objSource));

objTarget.greet = 'World'; // Hello World
```

---

## Chaîne de caractères

### padStart(), padEnd()

Permet d'ajouter un padding au début ou à la fin

``` js
'23.10'.padStart(12);        // '      23.10'
```

``` js
'loading'.padEnd(10, '.');   // 'loading...'
```

---

## Fonctions

### Virgules en fin de liste

Il est désormais possible d'avoir une virgule après le dernier paramètre d'une fonction (ce qui générait une erreur `SyntaxError` auparavent).

``` js
function es8(var1, var2, var3,) {
  // ...
}
```

``` js
es8(10, 20, 30,);
```

---

## Promesses

### Promise.all()

`Promise.all` permet d'executer plusieurs promesses en parallèle (de manière concurrente) et de n'executer le callback qu'une fois toutes les promesses réalisées.

``` js
async function getAB(a, b) {
    [a, b] = await Promise.all([getA(a), getB(b)]);
    return a + b;
}
```
