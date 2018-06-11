---
title: Let & Const
category: Web, JavaScript, ES6
---

## Let

Le mot-clé `let` introduit dans ES6 permet de déclarer une variable, tout comme `var`, mais avec quelques fonctionnalités en plus.

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

2. Pas de hoisitng sur la déclaration des variables

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

Le mot-clé `const` permet également de déclarer des variables et a les mêmes fonctionnalités que `let` avec une en plus: la variable n'est accessible qu'en lecture. Essayer de réaffecter la valeur de la variable lève une erreur.

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

Pour rendre un objet non mutable, on peut utiliser `Object.freeze` (ES5). Attention cette méthode n'est pas récursive.

``` js
const l = ["a", "b", "c"];
Object.freeze(l);

l.push("d"); // "TypeError: can't define array index property past the end of an array with non-writable length"
```
