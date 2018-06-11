---
title: Rest & Spread
category: Web, JavaScript, ES6
---

### Rest

L'opérateur `...` permet de créer des fonctions qui prennent un nombre indéfinis d'arguments, récupérés sous la forme de tableau. Dans ce contexte, on l'appelle l'opération de reste (*rest operator*).

``` js
function sum(...nums) {
    return nums.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4)); // 10
```

### Spread

À l'inverse, il peut également transformer un tableau en une liste d'arguments. On l'appelle l'opération de décomposition (*spread operator*)
NB En ES5, on utiliserait `Math.max.apply(null, arr)`.

``` js
var arr = [6, 89, 3, 45],
    max = Math.max(...arr);

console.log(max); // 89
```

Cet opérateur peut être utilisé pour facilement recopier un tableau dans un autre.  
NB En ES5, on utiliserait `arr.slice()` suivit de `arr2.push(4)`

``` js
var arr  = [1,2,3],
    arr2 = [...arr,4];

console.log(arr);
console.log(arr2); // [1,2,3,4]
```

Ou avec un objet:

``` js
const data = { x:1, y:2 };
const result = {
    name: "results",
    ...data
};
```
