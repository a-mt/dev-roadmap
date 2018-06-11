---
title: Méthodes ECMAScript 6
category: Web, JavaScript, ES6
---

## Tableau

### Array.from()

``` js
var arrayLike = document.querySelectorAll('*'),
    realArray = Array.from(arrayLike);
```

### Array.of()

Similaire à `new Array()` mais sans le comportement de créer un tableau de N entrées si un seul argument numérique est passé.

``` js
var arr = Array.of(1, 2, 3);
```

### keys()

Retourne un itérateur sur les indices du tableau

``` js
let myArray = [1, 2, 3, 4];
for (let i of myArray.keys()) {
  console.log(i, ":", myArray[i]); //0:1 1:2 2:3 3:4
}
```

### values()

Retourne un itérateur sur les valeurs du tableau

``` js
let myArray = [1, 2, 3, 4];
for (let val of myArray.values()) {
  console.log(val); //1 2 3 4
}
```

### entries()

Retourne un itérateurs sur les indicdes et valeurs du tableau

``` js
let myArray = [1, 2, 3, 4];
for (let [i, val] of myArray.entries()) {
  console.log(i, ":", val); //0:1 1:2 2:3 3:4
}
```

### copyWithin()

Recopie une partie du tableau à un autre endroit du tableau sans en modifier la taille.

``` js
// Placer à la position 1 les éléments à partir de la position 3
[1, 2, 3, 4, 5].copyWithin(1, 3)  // [ 1, 4, 5, 4, 5 ]

// Placer à la position 3 les éléments à partir de la position 0
[1, 2, 3, 4, 5].copyWithin(3, 0) // [1, 2, 3, 1, 2]

// Placer à la position 2, 2 éléments à partir de la position 0
[1, 2, 3, 4, 5].copyWithin(3, 0, 2) // [1, 2, 1, 2, 5]
```

### fill()

Remplit les éléments d'un tableau avec une valeur statique.

``` js
[0,0,0,0,0].fill(1)     // [1,1,1,1,1]

[0,0,0,0,0].fill(1,2)   // [0,0,1,1,1]

[0,0,0,0,0].fill(1,2,4) // [0,0,1,1,0]
```

### find()

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

### findIndex()

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

## Objet

### Object.assign()

Copie les propriétés et les méthodes des objets les plus à droite dans l'objet le plus à gauche et renvoie le résultat.

```  js
var o1 = {foo: 'foo'};
var o2 = {bar: 'bar'};
var o3 = {baz: 'baz', foo: 'qux'};

Object.assign(o1, o2, o3); // {foo: 'qux', bar: 'bar', baz: 'baz'}
console.log(o1); // {foo: 'qux', bar: 'bar', baz: 'baz'}
```

Cette méthode peut être utilisée pour copier un objet (et non une référence). Attention cependant, la copie n'est pas récursive: la valeur des sous-objets est une référence aux sous-objets d'origine.

``` js
var person  = {name: "Alice"};
    person2 = Object.assign({}, person);

person2.name = "Bob";
console.log(person);  // {name: Alice}
console.log(person2); // {name: Bob}
```

``` js
var person  = { id: 1, name: {firstName: "Alice"} },
    person2 = Object.assign({}, person);

person2.id = 2;
person2.name.firstName = "Bob";

console.log(person);  // {id: 1, name: {firstName: "Bob"}}
console.log(person2); // {id: 2, name: {firstName: "Bob"}}
```

### Object.is()

`Object.is()` permet de comparer deux objets strictement.  Cette méthode se comporte de la même façon que `===` sauf pour `NaN` et `+0/-0`.

``` js
console.log(+0 === -0);                         // true
console.log(Object.is(+0, -0));                 // false

console.log(NaN === NaN);                       // false
console.log(Object.is(NaN, NaN));               // true

console.log(Number.NaN === Number.NaN);         // false
console.log(Object.is(Number.NaN, Number.NaN)); // true

console.log(NaN === Number.NaN);                // false
console.log(Object.is(NaN, Number.NaN));        // true
```

## Object.getOwnPropertySymbols()

Permet de récupérer les propriétés d'un objet qui sont un symbole.  
Ne retourne que les symboles définis sur l'objet et non sur le prototype (!= classe).

``` js
const PRIVATE_VALUE = Symbol('privateValue');

var obj = {
  [PRIVATE_VALUE]: "foo",
  publicValue: "bar"
};

console.log(Object.getOwnPropertyNames(obj));   // [ "publicValue" ]
console.log(Object.getOwnPropertySymbols(obj)); // Array [ Symbol(privateValue) ]
```

---

## Chaîne de caractères

### repeat()

Permet de répéter une chaîne de caractère plusieurs fois

``` js
console.log("foo".repeat(3)) // foofoofoo
```

### includes()

`includes()` permet de vérifier si une chaîne de caractères contient un morceau de texte donné ou non. Cette méthode vient remplacer `indexOf() != -1`.

``` js
"hello".indexOf("ello") != -1    // true
"hello".indexOf("ello", 2) != -1 // false
```

``` js
"hello".includes("ello")         // true
"hello".includes("ello", 2)      // false
```

### startsWith(), endsWith()

Permet de vérifier si une chaîne de caractères commence ou fini par un morceau de texte donné ou non.

``` js
"hello".startsWith("hel")        // true
"hello".startsWith("el", 1)      // true
```

``` js
"hello".endsWith("lo")           // true
"hello".endsWith("ll", 4)        // true
```

### String.codePointAt()

Pour rappel, `charCodeAt()` permet de récupérer le code d'un caractère à un index donné.

``` js
console.log("μ".charCodeAt()); // 181
console.log('Hello World'.charCodeAt(4)); // 111
```

En JavaScript, les chaînes de caractères sont enregsitrées en UTF-16.  
Mais le codage Unicode permet de coder des caractères de longueur variable, de 1 à 4 octets.  
Or certains symboles Unicode nécessitent plus de 2 octets (c'est le cas des caractères dont le code est supérieur à 2^16 - 1 (65535).). Dans ce cas, `charCodeAt()` renvoie une valeur erronée.

`codePointAt()` permet de récupérer le Nième caractère - et non le caractère présent au Nème emplacement.

``` js
console.log("😀".codePointAt()); // 128512 (0x1F600)
console.log("😀".charCodeAt());  // 55357
```

### String.fromCodePoint()

Même principe, `fromCharCode()` permet de récupérer le caractère d'un code UTF-16

``` js
console.log(String.fromCharCode(181)); // µ
```

`fromCodePoint()` fonctionne pour les caractères de plus de 16 bits.

```
console.log(String.fromCodePoint(128512)); // 😀
console.log(String.fromCharCode(128512));  // 
```
