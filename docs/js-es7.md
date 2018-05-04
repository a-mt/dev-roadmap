---
title: ECMAScript 7
category: Web, JavaScript
---

ECMAScript 7 ou ECMAScript 2016 a été publié fin Juin 2016 par le TC39.

## Tableau

### includes()

`includes` permet de vérifier si une valeur est à l'intérieur d'un tableau, un peu à la manière de `indexOf` (sauf pour la gestion de NaN).

``` js
console.log('1:1',            [1].includes(1) );            // true
console.log('+0:-1',          [+0].includes(-0) );          // true
console.log('NaN:NaN',        [NaN].includes(NaN) );        // true
console.log('true:"true"',    [true].includes("true") );    // false
console.log('false:0',        [false].includes(0) );        // false
console.log('1:"1"',          [1].includes("1") );          // false
console.log('null:undefined', [null].includes(undefined) ); // false
console.log('[]:[]',          [[]].includes([]) );          // false
```

``` js
console.log('1:1',            [1].indexOf(1) );            // 0
console.log('+0:-1',          [+0].indexOf(-0) );          // 0
console.log('NaN:NaN',        [NaN].indexOf(NaN) );        // -1
console.log('true:"true"',    [true].indexOf("true") );    // -1
console.log('false:0',        [false].indexOf(0) );        // -1
console.log('1:"1"',          [1].indexOf("1") );          // -1
console.log('null:undefined', [null].indexOf(undefined) ); // -1
console.log('[]:[]',          [[]].indexOf([]) );          // -1
```

---

## Opérateurs

### Arithmétique

L'opérateur `**` permet d'effectuer une exponentiation - là où on devait utiliser `Math.pow()` avant ES7.

``` js
console.log(2 ** 8); // 256
```
