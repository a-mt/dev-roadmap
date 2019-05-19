---
title: Map
category: Web, JavaScript
---

La classe `Map` permet de construire un objet ayant des clé et valeurs, sur le même principe qu'un objet normal, à la différence près que les clés des propriétés peuvent être de n'importe quel type — et non seulement des chaînes de caractère ou symboles [ES6].

## Déclarer un Map

``` js
var map = new Map([
  [1, "1 number"],
  ["1", "1 string"],
  [true, "true boolean"],
  ["true", "true string"]
]);

console.log(map); // { 1: "1 number", 1: "1 string", true: "true boolean", true: "true string" }

```

## get

Permet de récupérer la valeur d'une clé donnée:

``` js
console.log(map.get(1));      // 1 number
console.log(map.get("1"));    // 1 string
console.log(map.get(true));   // true boolean
console.log(map.get("true")); // true string
```

## set

Permet d'ajouter des valeurs à l'objet.  
Elle retourne l'objet, il est donc possible de chainer plusieurs `set` à la suite.

``` js
map.set("key", "value");
```

## has

Permet de vérifier si une clé donnée existe:

``` js
console.log(map.has("key")); // true
```

## delete

Permet de supprimer une clé:

``` js
console.log(map.delete("key")); // true
```

## size

La propriété `size` retourne le nombre d'élément de l'objet

``` js
console.log(map.size); // 4
```

## entries, keys, values

Il y a différentes manières de boucler sur un objet `Map`

* Boucler sur les clés/valeurs avec `entries`

  ``` js
  for(var [key, value] of map.entries()) {
    console.log(key, value);
  }
  ```

  C'est le comportement par défaut, obtenu si on essaie de boucler sur l'objet directement:

  ``` js
  for(var [key, value] of map) {
    console.log(key, value);
  }
  ```

  ``` js
  map.forEach((value, key) => {
    console.log(key, value);
  });
  ```
* Boucler sur les clés avec `keys`

  ``` js
  for(let key of map.keys()) {
    console.log(key);   // key
  }
  ```

* Boucler sur les valeurs avec `values`

  ``` js
  for(let value of map.values()) {
    console.log(value); // value
  }
  ```

## clear

Permet de supprimer toutes les entrées de l'objet

```js
map.clear();
```

---

## Weakmap

Un objet `WeakMap` fonctionne à peu près de la même manière qu'un objet `Map`.  
Les clés d'un objet WeakMap sont nécessairement des objets — les valeurs peuvent être de tout type.

Weakmap ne supporte pas les itérations, `clear()` et `size`.  
Si on supprime une variable contenue dans un objet Map, la variable existera toujours dans cet objet.  
Avec un Weakmap, la variable ne serait plus accessible et les données seraient libérées par le garbage collector.

``` js
var user = { name: "Bob" },
    map  = new Map([ [user, "1"] ]);

user = null;

for(var [key, value] of map) {
  console.log(key, value); // { name: "Bob" } 1
}
// Avec un objet map: la variable supprimée existe toujours dans l'objet
// Avec un objet weakmap: la variable ne serait plus accessible et libérée de la mémoire
```