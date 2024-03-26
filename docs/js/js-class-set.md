---
title: Set
category: Web, JavaScript
---

La classe `Set` permet de créer un objet itérable, un peu sur le même principe que les tableaux, à la différence près que les valeurs d'un set sont uniques [ES6].

## Déclarer un Set

``` js
var set = new Set([
    "str",
    42,
    "str",
    1,
    "1",
    42]);

console.log(set); // [ "str", 42, 1, "1" ]
```

### add

Permet d'ajouter une valeur à la liste.  
Retourne l'objet, on peut donc chaîner plusieurs `set` à la suite.

``` js
set.add(2);
```

## has

Permet de vérifier si une valeur donnée existe.

``` js
console.log(set.has("str")); // true
```

## delete

Permet de supprimer une valeur de la liste:

``` js
console.log(set.delete(2)); // true
```

## size

Permet de récupérer le nombre d'éléments de l'objet

``` js
console.log(set.size); // 4
```

## values

On peut boucler sur les valeurs du set avec la méthode `values`

``` js
for(var value of set.values()) {
  console.log(value);
}
```

C'est le comportement par défaut, obtenu si on essaie de boucler sur l'objet directement:

``` js
for(var value of set) {
  console.log(value);
}
```

``` js
set.forEach((value) => {
  console.log(value);
});
```

## clear

Permet de supprimer toutes les entrées de l'objet

``` js
set.clear();
```

---

## WeakSet

Un objet `WeakSet` fonctionne à peu près de la même manière qu'un objet `Set`.  
Weakmap ne supporte pas les itérations, `clear()` et `size`.  
Si on supprime une variable contenue dans un objet Map, la variable existera toujours dans cet objet.  
Avec un WeakSet, la variable ne serait plus accessible et les données seraient libérées par le garbage collector.
