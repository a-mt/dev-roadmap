---
title: "Méthodes: Tableaux"
category: Web, JavaScript, Méthodes
---

## Array.isArray()

Retourne vrai si la variable passée en paramètre est un tableau, faux sinon.

``` js
console.log(Array.isArray([])); // true
console.log(Array.isArray(0));  // false
```

## reduce(), reduceRight()

Permet de convertir les valeurs du tableau en une valeur unique. Par exemple pour calculer la somme des valeurs.

``` js
[1, 2, 3, 4].reduce(function(a, b) {
  return a + b;
}); // 10
```

La valeur initiale est passée en second argument (0 par défaut).  
On peut utiliser un tableau ou un objet comme valeur initiale pour en populer le contenu avec les valeurs du tableau.

``` js
var arr = [1, 2, 1, 5, 9, 5];
arr.reduce((prev, number) => {
  if(prev.indexOf(number) === -1) {
    prev.push(number);
  }
  return prev;
}, []);
// [1, 2, 5, 9]
```

``` js
var columns = ["Date", "Number", "Size", "Location", "Age"],
    rows    = ["2001", "5", "Big", "Sydney", "25"],

    result  = rows.reduce(function(result, field, index) {
      result[columns[index]] = field;
      return result;
}, {});

/*
{
  Date: "2001",
  Number: "5",
  Size: "Big",
  Location: "Sydney",
  Age: "25"
}
*/
```

`reduce()` parcours les éléments de gauche à droite.  
`reduceRight()` de droite à gauche.

## join()

Joint tous les éléments du tableau en une chaîne de caractère avec le délimiteur spécifié, ou "," si omis.

``` js
var arr = [1,2,3,4,5,6];

console.log(arr.join());      // 1,2,3,4,5,6
console.log(arr.join(" - ")); // 1 - 2 - 3 - 4 - 5 - 6
```

## indexOf(), lastIndexOf()

Permet de récupérer l'index d'une valeur en particulier. -1 si elle n'est pas présente.

`indexOf()` retourne l'index de la première occurence. `lastIndexOf()` de la dernière.

``` js
var arr = [1,1,2,2,3,3];

arr.indexOf(5);     // -1
arr.indexOf(1);     // 0
arr.lastIndexOf(1); // 1
```

## concat()

Permet de concaténer d'un tableau à la fin d'un autre tableau.
Peut prendre des valeurs simples ou des tableaux en paramètres.

``` js
[1,2,3,4].concat([5,6,7]); // [ 1, 2, 3, 4, 5, 6, 7 ]
```

``` js
array1.concat(array2, array3, array4);
```

``` js
array1.concat("c", "d", array2);
```

## slice()

Retourne une copie du tableau à partir de l'indice donné et jusqu'au 2ème indice (ou la fin du tableau si omis).


``` js
var arr = [1,2,3,4,5,6];

console.log(arr.slice(0,3)); // [ 1, 2, 3 ]
console.log(arr.slice(2,3)); // [ 3 ]
console.log(arr.slice(2));   // [ 3, 4, 5, 6 ]
```

---

## some()

`some` permet de tester si un élément du tableau passe un test en particulier.
Retourne vrai si au moins un élément retourne vrai.

``` js
var onlyDigit = [2, 4, 7, 10].some(function(value, index) {
  return value >= 10;
});
console.log(onlyDigit); // true
```

## every()

`every` permet de tester si tous les éléments du tableau passent un test en particulier.
Retourne vrai si toutes les valeurs retournent vrai.

``` js
var onlyOdd = [2, 4, 7, 9].every(function(value, index) {
  return value % 2 === 0;
});
console.log(onlyOdd); // false
```

## filter()

Permet de filtrer un tableau, pour ne garder que les éléments qui passent un test en particulier

``` js
[1,2,3,4].filter(function(n) {
  return n % 2 !== 0;
});
// 1 3
```

## map()

Permet d'appliquer des transformations à toutes les valeurs du tableau, par exemple pour formatter les données ou appliquer un cast. Retourne un nouveau tableau.

``` js
['one', 'two', 'three', 'four'].map(function(value, index) {
  return value.length;
});
// [3, 3, 5, 4]
```

## forEach()

Permet de boucler sur les valeurs d'un tableau. Contrairement à un `for`, il n'est pas possible d'interrompre un `forEach` avec un `break`

``` js
[1, 2, 3, 4].forEach(function(value, index, arr) {
  console.log(index, ":", value); // 0:1 1:2 2:3 3:4
});
```

---

## sort()

Permet de trier le tableau.
Par défaut, trie par ordre Unicode

``` js
console.log(['s', 't', 'a', 34, 'K', 'o', 'v', 'E', 'r', '2', '4', 'o', 'W', -1, '-4'].sort());

// [-1, '-4', '2', 34, '4', 'E', 'K', 'W', 'a', 'l', 'o', 'o', 'r', 's', 't', 'v']
```

Pour un tri personnalisé, un callback peut être utilisé. Par exemple

* tri alphabétique

  ``` js
  ['s', 't', 'a', 'c', 'K', 'o', 'v', 'E', 'r', 'f', 'l', 'W', '2', '1'].sort((a, b) => {
    return a.localeCompare(b);
  });

  // ['1', '2', 'a', 'c', 'E', 'f', 'K', 'l', 'o', 'r', 's', 't', 'v', 'W']
  ```

* tri numérique ou avec des date

  ``` js
  [100, 1000, 10, 10000, 1].sort(function(a, b) {
    return a - b;
  });

  // [1, 10, 100, 1000, 10000]
  ```

## reverse()

Permet d'inverser l'ordre des valeurs

``` js
[1, 2, 3, 4].reverse(); // 4 3 2 1
```

Pour une inversion récursive:

``` js
function deepReverse(arr) {
  arr.reverse().forEach(elem => {
    if(Array.isArray(elem)) {
      deepReverse(elem);
    }
  });
  return arr;
}
var arr = [1, 2, 3, [1, 2, 3, ['a', 'b', 'c']]];
// [[['c','b','a'], 3, 2, 1], 3, 2, 1]
```

---

## shift()

Supprime le premier élément du tableau et le retourne.

``` js
var myArray = [1,2,3,4];
console.log(myArray.shift()); // 1
console.log(myArray); // [2,3,4]
```

## pop()

Supprime le dernier élément du tableau et le retourne.

``` js
var myArray = [1,2,3,4];
console.log(myArray.pop()); // 4
console.log(myArray); // [1,2,3]
```

## push()

Ajoute un ou des élément(s) à la fin du tableau.

``` js
var myArray = [1,2,3,4];
console.log(myArray.push(5,6)); // 6
console.log(myArray); // [1,2,3,4,5,6]
```

## unshift()

Ajoute un ou des élément(s) au début du tableau.

``` js
var myArray = [1,2,3,4];
console.log(myArray.unshift(5,6)); // 6
console.log(myArray); // [5,61,2,3,4]
```

## splice()

Permet de supprimer les éléments à partir d'un index de début et d'un nombre d'élément à supprimer (optionnel)

``` js
var myArray = [1,2,3,4,5];
console.log(myArray.splice(3));   // Array [ 4, 5 ]
console.log(myArray);             // Array [ 1, 2, 3 ]

console.log(myArray.splice(1,1)); // Array [ 2 ]
console.log(myArray);             // Array [ 1, 3 ]
```

Pour supprimer une valeur donnée d'un tableau:

``` js
var value = 3;

while(index = array.indexOf(value) !== -1) {
  array.splice(index, 1);
}
```

---

## Array.from()

[ES6]

``` js
var arrayLike = document.querySelectorAll('*'),
    realArray = Array.from(arrayLike);
```

## Array.of()

[ES6]

Similaire à `new Array()` mais sans le comportement de créer un tableau de N entrées si un seul argument numérique est passé.

``` js
var arr = Array.of(1, 2, 3);
```

## keys()

[ES6]

Retourne un itérateur sur les indices du tableau

``` js
let myArray = [1, 2, 3, 4];
for (let i of myArray.keys()) {
  console.log(i, ":", myArray[i]); //0:1 1:2 2:3 3:4
}
```

## values()

[ES6]

Retourne un itérateur sur les valeurs du tableau

``` js
let myArray = [1, 2, 3, 4];
for (let val of myArray.values()) {
  console.log(val); //1 2 3 4
}
```

## entries()

[ES6]

Retourne un itérateurs sur les indicdes et valeurs du tableau

``` js
let myArray = [1, 2, 3, 4];
for (let [i, val] of myArray.entries()) {
  console.log(i, ":", val); //0:1 1:2 2:3 3:4
}
```

## copyWithin()

[ES6]

Recopie une partie du tableau à un autre endroit du tableau sans en modifier la taille.

``` js
// Placer à la position 1 les éléments à partir de la position 3
[1, 2, 3, 4, 5].copyWithin(1, 3)  // [ 1, 4, 5, 4, 5 ]

// Placer à la position 3 les éléments à partir de la position 0
[1, 2, 3, 4, 5].copyWithin(3, 0) // [1, 2, 3, 1, 2]

// Placer à la position 2, 2 éléments à partir de la position 0
[1, 2, 3, 4, 5].copyWithin(3, 0, 2) // [1, 2, 1, 2, 5]
```

## fill()

[ES6]

Remplit les éléments d'un tableau avec une valeur statique.

``` js
[0,0,0,0,0].fill(1)     // [1,1,1,1,1]

[0,0,0,0,0].fill(1,2)   // [0,0,1,1,1]

[0,0,0,0,0].fill(1,2,4) // [0,0,1,1,0]
```

## find()

[ES6]

Permet de récupérer la première valeur du tableau qui correspond à un critère donné

``` js
let people = [
  { name: "bob" },
  { name: "john" }
];

let bob = people.find(function(person) {
  return person.name === "bob";
});
// { name: "bob" }
```

## findIndex()

[ES6]

Permet de récupérer l'index de la première valeur du tableau qui correspond à un critère donné

``` js
var array = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 }
];

array.findIndex(item => item.value === 3); // 2
```

---

## includes()

[ES7]

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