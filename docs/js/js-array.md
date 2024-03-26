---
title: Les tableaux
category: Web, JavaScript
---

Un tableau, ou liste, est un objet qui contient une liste ordonnée de valeurs: la première valeur est à l'index 0, la deuxième à l'index 1, etc.  Ces valeurs peuvent être de types différents au sein du même tableau.  
La taille d'un tableau peut être modifiée à la volée, on peut ajouter de nouvelles valeurs à la liste sans étape supplémentaire.  
Les tableaux peuvent être aussi gros que nécessaire et peuvent être modifiés très facilement.

## Définir un tableau

Pour créer un tableau, on utilise des crochets `[]`.  
Créer un tableau vide:

``` js
var arr = [];
```

Créer un tableau avec des valeurs:

``` js
var arr = ["Valeur1", "Valeur2"];
```

### Objet

On peut également utiliser un objet `Array`

``` js
console.log(["Valeur1", "Valeur2"]);               // [ "Valeur1", "Valeur2" ]
console.log(new Array("Valeur1", "Valeur2"));      // [ "Valeur1", "Valeur2" ]
```

Si un argument numérique est passé à `Array`, un tableau de N valeurs est créé.

``` js
var arr = new Array(4);
console.log(arr); // [undefined, undefined, undefined, undefined]
```

---

## Lire une valeur

Récupérer la valeur à un index donné:

``` js
console.log(arr[0]); // Valeur1
```

## Modifier une valeur

Assigner une valeur à un index donné:

``` js
arr[2] = "Valeur3";
```

## Ajouter une valeur

Ajouter une valeur en fin de tableau:

``` js
arr.push("Valeur4");
```

## Lister les valeurs

Afficher la liste des valeurs d'un tableau:

``` js
for(var i=0; i<arr.length; i++) {
    console.log(arr[i]);
}
```

---

## Array-like

Certaines fonctions JavaScript, notamment celles qui accèdent au DOM, retournent des objets qui représentent des tableaux (*Array-like* en anglais) et non de véritables tableaux (objets HTMLCollection ou NodeList par exemple). C'est le cas par exemple de `document.getElementsByTagName` et `document.querySelectorAll`.

``` js
var realArray = ['a', 'b', 'c'];
var arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};
```

### Boucler sur un arraylike

Il est possible de boucler sur un objet Array-like comme un tableau classique (avec un `for`).  
Les méthodes des tableaux, comme `push()` ou `slice()` par exemple, ne sont par contre pas disponibles.

``` js
for(var i=0; js<arrayLike.length; i++) {
    console.log(arrayLike[i]);
}
```

### Arraylike to array

Pour traduire un objet Array-like en tableau: 

``` js
realArray = [].slice.call(arrayLike)
```

---

## Valeur vs reference

Les valeurs composées (objets, tableaux et fonctions) sont toujours passées par *référence*, leur contenu n'est pas dupliqué en mémoire: si on affecte un tableau à une deuxième variable, les deux variables utilisent le même emplacement mémoire. En modifiant une référence, on modifie également l'originale.

<ins>Exemple</ins>:

``` js
var arr  = [1,2,3],
    arr2 = arr;

arr2.push(4);
console.log("arr:", arr);   // [1,2,3,4]
console.log("arr2:", arr2); // [1,2,3,4]
```

<ins>Pour éviter ça</ins>:  
Pour créer deux valeurs indépendantes, il est nécessaire de créer explicitement une copie de la variable.

``` js
var arr  = [1,2,3],
    arr2 = arr.slice();

arr2.push(4);
console.log("arr:", arr);   // [1,2,3]
console.log("arr2:", arr2); // [1,2,3,4]
```