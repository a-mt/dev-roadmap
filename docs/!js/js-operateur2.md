---
title: Opérateurs
category: Web, JavaScript
---

## Rest

L'opérateur `...` permet de transformer une liste des paramètres en tableau [ES6]  
Dans ce contexte, on l'appelle l'opération de reste (*rest operator*).

``` js
function sum(...nums) {
    return nums.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4)); // 10
```

---

## Spread

L'opétateur `...` peut également transformer un tableau en une liste d'arguments [ES6]  
Dans ce contexte, on l'appelle l'opération de décomposition (*spread operator*)

``` js
var arr = [6, 89, 3, 45],
    max = Math.max(...arr); // Math.max.apply(null, arr)

console.log(max); // Affiche 89
```

* On peut l'utiliser pour facilement cloner un tableau:

  ``` js
  var arr2 = [...arr]; // arr2 = arr.slice();
  ```

* Ou un objet:

  ``` js
  var obj2 = {...data}; // bj2 = Object.assign({}, obj)
  ```

* Ou encore construire un objet conditionnellement:

  ``` js
  {
    ...(title && {title: subtitle ? `${title} ${subtitle}` : title}),
    ...(home_page_url && {home_page_url}),
    ...(home_page_url && {feed_url: `${home_page_url}/feed`})
  }
  ```

---

## Destructuration d'objet

### Simple

Depuis ES6, on peut utiliser les accolades non seulement pour créer des objets mais pour les destructurer: récupérer les propriétés d'un objet dans des variables.

``` js
var obj = {
  name: "Bob",
  address: {
    street: "1 Rue Aupif",
    city: "Paris",
    zip: 75000
  }
};

// Récupère les propriétés age et name dans des variables
var {address, name} = obj;
console.log(name);     // Bob
console.log(address);  // { street: "1 Rue Aupif", city: "Paris", zip: 75000 }
```

C'est particulièrement pour les fonctions: lorsqu'une fonction prend beaucoup de paramètres en entrée, on peut ainsi lui donner un objet que la fonction va destructurer en variables.

``` js
function avg({min, max}){
  return (max + min) / 2.0;
}

var m = avg({
  max: 56.78,
  min: -0.75
});
console.log(m); // 28.015
```

### Nommée

Pour récupérer les propriétés d'un objet sous un nom autre que celui de la propriété, on utilise deux-points.

``` js
var {name: username} = obj;

console.log(username); // Bob
```

### Imbriquée

Pour récupérer une sous-propriété, on peut imbriquer les destructurations:

``` js
var {address: {street}} = obj;

console.log(street);  // 1 Rue Aupif
console.log(address); // undefined
```

### Rest

Depuis ES9, on peut combiner l'opérateur rest avec la destructuration:

``` js
const values = {a: 1, b: 2, c: 3, d: 4};
const {a, ...n} = values;
console.log(a);   // 1
console.log(n);   // {b: 2, c: 3, d: 4}
```

---

## Destructuration de tableau

### Simple

Même principe que pour la destructuration d'objet, ES6 permet désormais de destructurer des tableaux on utilisant les crochets:

``` js
var date = [2010, 12, 31];

var [year, month, day] = date;
console.log(year);
console.log(month);
console.log(day);
```

La destructuration fonctionne sur tout objet itérable:

``` js
var list = new Set();
list.add('a');
list.add('b');
list.add('c');

var [x,y,z] = list;
console.log(x, y, z);
```

Cela permet par exemple

* De facilement permuter deux variables:

  ``` js
  [a, b] = [b, a];
  ```

* De destructurer un tableau en paramètre:

  ``` js
  function avg([a, b]){
    return (a + b) / 2.0;
  }

  var m = avg([56.78, -0.75]);
  console.log(m); // 28.015
  ```

* De boucler sur une liste de listes comme si c'était un tableau associatif

  ``` js
  var list = [
    ['a', 1],
    ['a', 2],
    ['b', 3]
  ];

  for (var [k,v] of list) {
    console.log(`${k} = ${v}`);
  }
  ```


### Imbriquée

Pour récupérer une sous-liste, on peut imbriquer les destructurations:

``` js
var coords = [[1, 2], 3],
    [[a, b]] = coords;

console.log(a); // 1
console.log(b); // 2
```

### Ignorer des index

Pour ignorer un index, on peut laisser un espace vide:

``` js
var [year, , day] = date;
```

### Rest

Depuis ES9, on peut combiner l'opérateur rest avec la destructuration:

``` js
var values = [1, 2, 3, 4];
const [a, ...n] = values;
console.log(a);   // 1
console.log(n);   // [2, 3, 4]
```
