---
title: Variables
category: Web, JavaScript
---

Les variables permettent de stocker des valeurs: adresse email, date de naissance, score dans un jeu, etc. On déclare une variable, on lui affecte une valeur, on peut éventuellement modifier la valeur (effectuer des calculs par exemple), puis utiliser la valeur de cette variable (l'afficher par exemple).

## Déclaration / affectation

En JS, on déclare une variable avec le mot-clé `var` et on affecte avec le signe égal `=`.  
On peut déclarer et assigner une variable en même temps - ou séparemment.

``` js
var mavariable;
mavariable = "mavariable";
```

``` js
var mavariable = "mavariable";
```

Plusieurs variables peuvent être déclarées en même temps avec `,`

``` js
var year, month;
```

``` js
var year = 2011, month = 12;
```

Les variables peuvent contenir tout type de données,
des scalaires, données "plates" (chaînes de caractère, nombres, booléens),
tout comme des données complexes (tableaux, objets, fonctions).

Techniquement, le mot-clé `var` n'est pas requis (à moins d'être en mode strict). En écrivant `mavariable = "mavaleur"`, JavaScript ira chercher si une variable nommée `mavariable` existe et si elle n'existe pas, la crée. Cependant, dans certaines situations, omettre `var` peut conduire à un comportement inattendu, donc mieux veut toujours l'utiliser.

## Nommage

Le nom de la variable doit être écrit en un seul mot (aucun espace n'est autorisé), composé de lettres, chiffres, underscore et/ou du signe dollar. Le nom d'une variable ne peut pas commencer par un chiffre: `99problems` n'est pas un nom de variable valide, `problems99` oui.

---

## Type

### typeof

Le mot-clé `typeof` permet de vérifier le type de donnée d'une variable.

``` js
var age = 18;
console.log(typeof age); // number
```

### cast

On appelle *caster* le fait de changer le type de données d'une variable de manière explicite.  
Il existe différentes fonctions et différentes méthodes de caster des valeurs. Par exemple:

``` js
console.log(parseInt("6"));    // 6   - conversion en nombre entier
console.log(parseFloat("6.5"); // 6.5 - conversion en nombre à virgule

console.log(toStr(6));         // "6" - conversion en chaîne de caractère
console.log(""+6);             // "6" - conversion en chaîne de caractère

console.log(!!0);              // false - conversion en booléen
console.log("1" == true);      // true - conversion en booléen
```

### coercion

On applle une *coercion* le fait de changer le type de données d'une variable de manière implicite, c'est notamment le cas lorsqu'on utilise une opération mathématique sur des chaînes de caractères:

``` js
console.log("42" - "9"); // 33
console.log("2" - "3");  // 6

console.log("" + 1 + 0); // "10"
console.log("" - 1 + 0); // -1
```

---

## Let

Le mot-clé `let` permet de déclarer une variable, tout comme `var`, mais avec quelques fonctionnalités en plus [ES6]

1. Empêche de redéclarer une variable précédemment déclarée

   ``` js
   var user = "Alice";
   var user = "Bob";
   console.log(user); // Bob
   ```

   ``` js
   let user = "Alice";
   let user = "Bob";
   console.log(user); // lève "SyntaxError: redeclaration of let user"
   ```

2. Pas de hoisting sur la déclaration des variables

   ``` js
   var msg = it + " is my favorite fruit",
         it = "banana";
   console.log(msg);  // undefined is my favorite fruit
   ```

   ``` js
   let msg = it + " is my favorite fruit",
        it = "banana";
   console.log(msg);  // lève "ReferenceError: can't access lexical declaration `it' before initialization"
   ```

3. Quand on déclare une variable dans un bloc cette variable n'existe que dans ce bloc

   ``` js
   for (var i=0; i < 3; i++) {
     continue;
   }
   console.log(i); // 3
   ```

   ``` js
   for (let j=0; j < 3; j++) {
     continue;
   }
   console.log(j); // lève "ReferenceError: j is not defined"
   ```

4. La variable n'existe que le temps de l'execution du bloc

   ``` js
   for(var i=0; i<3; i++) {
     setTimeout(function(){
        console.log(i);
     }, 1);
   }
   // Affiche 333
   ```

   ``` js
   for(let i=0; i<3; i++) {
     setTimeout(function(){
        console.log(i);
     }, 1);
   }
   // Affiche 012
   ```

---

## Const

Le mot-clé `const` permet également de déclarer des variables et a les mêmes fonctionnalités que `let` avec une en plus: la variable n'est accessible qu'en lecture [ES6]  
Essayer de réaffecter la valeur de la variable lève une erreur.

Il est d'usage courant de nommer les constantes en majuscules afin de facilement les distinguer.

``` js
const USER = "Alice";
USER = "Bob"; // lève "TypeError: invalid assignment to const `USER'"
```

Il n'est pas possible de réassigner la variable, en revanche la valeur est toujours *mutable*, c'est à dire qu'il est toujours possible d'appeler des méthodes sur la valeur. Sur un objet ou sur un tableau, cela veut dire que l'on peut toujours modifier le contenu.

``` js
const arr = ["a", "b", "c"];

arr.push("d");
console.log(arr); // [ "a", "b", "c", "d" ]

arr[4] = "e";
console.log(arr); // [ "a", "b", "c", "d", "e" ]

arr = ["a", "b"]; // lève "TypeError: invalid assignment to const `arr'"
```

Pour rendre un objet non mutable, on peut utiliser `Object.freeze` (ES5). Attention cependant, cette méthode n'est pas récursive.

``` js
const l = ["a", "b", "c"];
Object.freeze(l);

l.push("d"); // "TypeError: can't define array index property past the end of an array with non-writable length"
```