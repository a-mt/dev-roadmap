---
title: Map, Set, WeakMap, WeakSet
category: Web, JavaScript, ES6
---

## Map

Une `Map` est une collection de clés/valeurs, un peu sur le même principe que les objets, à la différence près que les clés peuvent être de n'importe quel type (et non seulement des chaînes de caractère).

### Déclarer une Map

``` js
var map = new Map([
  [1, '1'],
  ["1", '"1"'],
  [true, 'vrai'],
  ["true", '"true"']
]);
```

### Récupérer une valeur

``` js
console.log(map.get(1));      // 1
console.log(map.get("1"));    // "1"
console.log(map.get(true));   // vrai
console.log(map.get("true")); // "true"
```

### Boucler sur les entrées

``` js
for(var entry of map) {
  console.log(entry); // [key,value]
}
```

``` js
for(var entry of map.entries()) {
  console.log(entry); // [key,value]
}
```

``` js
for(let key of map.keys()) {
  console.log(key);   // key
}
```

``` js
for(let value of map.values()) {
  console.log(value); // value
}
```

``` js
map.forEach((value, key) => {
  console.log(key, value);
});
```


### Récupérer la taille

``` js
map.size
```

### Ajouter/modifier une valeur

``` js
map.set("key", "value");
```

`set` retourne l'objet, il est donc possible de les chainer

### Vérifier si une entrée existe

``` js
map.has("key");
```

### Supprimer une entrée

``` js
map.delete("key");
```

### Supprimer toutes les entrées

```js
map.clear();
```

---

## Set

Un `Set` est un objet itérable, un peu sur le même principe que les tableaux, à la différence près que les valeurs sont uniques.

### Déclarer un Set

``` js
var set = new Set(['a', 1, 'a', 2, '1', 1]);

console.log(set); // [ "a", 1, 2, "1" ]
```

### Boucler sur les entrées

``` js
for(var value of set) {
  console.log(value);
}

for(var value of set.values()) {
  console.log(value);
}

set.forEach((value) => {
  console.log(value);
});
```

### Récupérer la taille

``` js
set.size;
```

### Ajouter une valeur

``` js
set.add(2);
```

### Vérifier si une entrée existe

``` js
set.has(1);
```

### Supprimer une entrée

``` js
set.delete(1);
```

### Supprimer toutes les entrées

``` js
set.clear()
```

---

## WeakMap, WeakSet

Une `WeakMap` et un `WeakSet` fonctionnent de la même manière qu'une `Map` et un `Set` respectivement, à la différence près qu'ils n'empêchent pas les objets qu'ils contiennent d'être libérés de la mémoire.

Le *garbage collector* efface les données qui ne sont plus accessibles nul part. Une `Map` et un `Set` empêchent la garbage collector de libérer la mémoire pour les objets qu'ils contiennent. Ce n'est pas le cas de `WeakMap` et `WeakSet`.

``` js
let john = { name: "John" }
    map  = new Map();

map.set(john, "...");
john = null;

for(let key of map.keys()) {
  console.log(key); // { name: "John" }
}
```

WeakMap et WeakSet ne supportent pas les itérations, la méthode `clear()` et la propriété `size`.
