---
title: Déstructuration
category: Web, JavaScript, ES6
---

## Destructuration d'objet

### Affectation de variables

L'affectation de déstructuration est une syntaxe qui permet d'assigner les propriétés d'un objet dans des variables.  
L'ordre des variables n'a pas d'importance.

``` js
var coords       = {x: 3, y: 4, z: 5 },
    {x: a, y: b} = coords; // assigner la propriété x à a, y à b

console.log("a:", a); // a: 3
console.log("b:", b); // b: 4
```

``` js
var coords  = {
    from: {x: 3, y: 4 },
    to  : {x: 5, y: 6}
},{from: {x: a, y: b}} = coords; // assigner la propriété from.x à a, from.y à b

console.log("a:", a); // a: 3
console.log("b:", b); // b: 4
```

Si la variable créée a le même nom que la propriété, alors on peut utiliser une version abbrégée:

``` js
var coords  = {x: 3, y: 4, z: 5 },
    {z,y,x} = coords;  // assigner la propriété z à z, y à y et x à x

console.log("x:", x); // x: 3
console.log("y:", y); // y: 4
console.log("z:", z); // z: 5
```

### Paramètres

Les fonctions peuvent se servir de la déstructuration pour convertir un objet en une liste de paramètres:

``` js
var stats = {
  max: 56.78,
  min: -0.75
};
var avg = ({min, max}) => ((max + min) / 2.0);

console.log(avg(stats)); // 28.015
```

### Rest

ES9 ajoute la possibilité d'utiliser l'opérateur rest avec la destructuration:

``` js
const values = {a: 1, b: 2, c: 3, d: 4};
const {a, ...n} = values;
console.log(a);   // 1
console.log(n);   // {b: 2, c: 3, d: 4}
```

---

## Destructuration de tableau

### Affectation de variables

Même principe que la destructuration mais avec des tableaux - en utilisant `[]`.

``` js
var coords = [3, 4, 5],
    [a, b] = coords;

console.log("a:", a); // a: 3
console.log("b:", b); // b: 4
```

``` js
var coords = [[3, 4], 5],
    [[a, b], c] = coords;

console.log("a:", a); // a: 3
console.log("b:", b); // b: 4
console.log("c:", c); // c: 5
```

On peut ainsi permuter la valeur de deux variables (ou plus) très facilement:

``` js
[a, b] = [b, a];
```

### Ignorer un index

Pour ignorer un index, on peut laisser un espace vide

``` js
var coords = [3, 4, 5],
    [a, , b] = coords;

console.log("a:", a); // a: 3
console.log("b:", 5); // b: 5
```

### Paramètres

On peut se servir de la déstructuration pour convertir un tableau en une liste de paramètres:

``` js
function area([length, height]) {
  return (length * height) / 2;
}
const triangle = [3, 4];
area(triangle); // 12/2 = 6
```

### Rest

On peut se servir de la déstructuration de tableau en combinaison avec l'opérateur rest:

``` js
var coords          = [3, 4, 5, 6, 7],
    [a, b, ...rest] = coords;

console.log("a: ", a); // 3
console.log("b: ", b); // 4
console.log("rest: ", rest); // [5,6,7]
```

---

## Objet itérable

La destructuration de tableau marche sur tout objet itérable

``` js
var set = new Set().add('a').add('b').add('c');
var [x,y,z] = set;
```

``` js
let map = new Map();
map.set('a',1);
map.set('b',2);

for (let [k,v] of map) {
  console.log(`key = ${k}, value = ${v}`);
}
```
