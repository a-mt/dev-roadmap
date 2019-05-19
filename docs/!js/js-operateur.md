---
title: Opérateurs
category: Web, JavaScript
---

## Égalité / inégalité

    >               plus grand que
    >=              plus grand ou égal à
    <               inférieur à
    <=              inférieur ou égal à

    ==              égal
    ===             strictement égal
    !=              non égal
    !==             strictement non égal

### Strict vs non strict

Un test non strict vérifie si les valeurs sont équivalentes, indépendemment de leur type: `5` (nombre) est équivalent à `"5"` (caractère). Un test strict vérifie qu'il s'agit exactement de la même valeur — le même type, la même valeur: `"5"` et `5` ne sont pas strictement égaux

`a = b`  : assigne la valeur de `b` à `a`  
`a == b` : vérifie si `a` est égal à `b`  
`a === b`: vérifie si `a` est strictement égal à `b`

[Utiliser les différents tests d'égalité](https://developer.mozilla.org/fr/docs/Web/JavaScript/Les_diff%C3%A9rents_tests_d_%C3%A9galit%C3%A9#Un_mod%C3%A8le_pour_mieux_comprendre)

### Équivalent à faux

En JavaScript, les valeurs équivalentes à faux sont:
* `false`
* `0`
* `""` (chaîne vide)
* `NaN`
* `undefined`
* `null`

Un tableau vide `[]` est considéré vrai, `[].length` (= 0) est considéré faux.

### NaN

Pour tester si une valeur vaut NaN, on ne peut pas utiliser le égal: utiliser `isNaN()`

``` js
console.log(parseInt("d") == NaN); // false
console.log(isNaN(parseInt("d"))); // true
```

---

## Logique

Une opération logique permet de combiner plusieurs expressions ou inverser une opération.

    !               non
    &&              et
    ||              ou

### Exemples

``` js
var c = a && b;
// c est vrai si a et b sont vrais
```

``` js
var c = !(a && b);
// c est vrai si ni a ni b n'est vrai
```

``` js
var show = (age >= 18) || (!controleParental);
// show est vrai si une des deux expressions est vraie (ou les deux)
```

---

## Arithmétique

    +               addition
    -               soustraction
    *               multiplication
    /               division
    %               modulus (résultat d'une division entière: 31 % 2 = 1)
    **              exponentiation [ES7]

### Exemples

``` js
// ES5
console.log(Math.pow(2,8)); // 256

// ES7
console.log(2 ** 8); // 256
```


### Priorités

Comme en mathématiques, les opérateurs ont une priorité: par exemple, la multiplication est prioritaire sur l'addition.  
On peut changer les priorités avec des parenthèses.

``` js
mavariable  = 5 + 5 * 10;    // 5 + 50 = 55
mavariable  = (5 + 5) * 10;  // 10 * 10 = 100
```

### Float

Un float n'est pas précis  l'ordinateur est obligé d'arrondir la valeur pour avoir une représentation binaire.
Des problèmes d'arrondis peuvent apparaître après une opération mathématique sur des nombres non entiers. Pour éviter ça, on peut soit utiliser des entiers, soit arrondir le résultat obtenu.

``` js
var x = 0.1;
var y = 0.2;

console.log(x + y);                  // 0.30000000000000004
console.log((x * 10 + y * 10) / 10); // 0.3
console.log((x + y).toPrecision(1)); // "0.3"
```

---

## Sur les bits

    &               et
    |               ou
    ^               ou exclusif (xor)
    ~               non
    <<              décalage à gauche
    >>              décalage à droite

### Exemples

[Cf opérations sur les bits](../bitwise-operations.md)

---

## Assignation

    =               assignation
    +=              opération couplée à une assignation
                    Possible avec tous les opérateurs arithmétiques et sur les bits (-=, &=, ...)

### Exemples

``` js
mavariable  = 2;    // Affecte la valeur 2 à la variable
mavariable += 2;    // Ajoute 2 à la valeur de la variable
```

### Incrémenter / décrémenter

Incrémenter consiste à ajouter 1 à la valeur de la variable.  
Décrémenter consiste à soustraire 1 à la valeur de la variable.  
L'incrémentation et la décrémentation étant régulièrement utilisées, il existe des raccourcis pour le faire:

    mavariable++    retourne la valeur de mavariable puis l’incrémente
    ++mavariable    incrémente mavariable puis retourne sa valeur

    mavariable--    retourne la valeur de mavariable puis la décrémente
    --mavariable    décrémente mavariable puis retourne sa valeur

---

## Concaténation

JavaScript traite différement les chaînes de caractères des nombres, et les nombres différement des booléens.  
Si on utilise l'opérateur `+` sur des chaînes de caractère, on concatène ces valeurs (on les met bout à bout).  
Si on utilise l'opérateur `+` entre un nombre et une chaîne de caractère, l'opération effectuée sera une concaténation.

    +               concaténation

### Exemples

``` js
var a = "Hello",
    b = "World",
    test = a + " " + b;

console.log(test); // Hello World
```

``` js
foo = 5;
bar = 5;
console.log(foo + bar); // 10

foo = "5";
bar = 5;
console.log(foo + bar); // 55

foo = 5;
bar = "5";
console.log(foo + bar); // 55
```
