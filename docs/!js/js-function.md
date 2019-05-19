---
title: Les fonctions
category: Web, JavaScript
---

Les fonctions sont des objets `Function`.  
Une fonction contient un bloc de code qui n'est executé que lorsqu'on en demande explicitement l'execution.

## Définir une fonction

``` js
var myFunction = function() {
  console.log("Hello World");
}
```

ou

``` js
function myFunction() {
  console.log("Hello World");
}
```

---

## Appeler la fonction

On appelle une méthode grâce aux parenthèses: `()`.

``` js
myFunction(); // Hello World
```

``` js
var maVar = myFunction;
maVar();      // Hello World
```

---

## Entrée/sortie

Il est possible de passer des valeurs en entrée à une fonction, des *paramètres*.  
Une fonction peut retourner une valeur en sortie, un *résultat*.

``` js
function myFunction(x, y) {
  return x * y;
}

var result = myFunction(123, 456);
console.log(result); // 56088
```

### Omettre des paramètres

On peut appeler une fonction sans tous ses paramètres.  
Les paramètres non définis seront de type `undefined`.

``` js
function myFunction(x, y) {
    console.log("x:", typeof x); // x: number
    console.log("y:", typeof y); // y: undefined
}
console.log(myFunction(1));
```

### Paramètres par défaut

ES6 introduit les paramètres par défaut.  
Lorsqu'un paramètre est omis, la valeur par défaut est utilisée.

``` js
function myFunction(name = "Anonymous") {
    return "Hello " + name;
}
console.log(myFunction());       // Hello Anonymous
console.log(myFunction("John")); // Hello John
console.log(myFunction(null));   // Hello null
```

La valeur par défaut peut être le résultat d'un appel de fonction

``` js
function getCallback () {
  return () => {};
}

function myFunction(callback = getCallback()) {
  console.log(callback);
}
```

### Ajouter des paramètres

On peut également appeler une fonction avec des paramètres en plus.  
La fonction peut accéder à la liste complètes des paramètres via `arguments`.

``` js
function myFunction(x, y) {
    console.log(arguments); // { 0: 1, 1: 2, 2: 3 }
};
myFunction(1,2,3);
```

### Valeur vs reference

Lorsqu'on récupère une valeur composée (objet, tableau ou fonction) en paramètre, on récupère une référence. Cela veut dire qu'en modifiant une référence, on modifie également l'originale.

``` js
var arr = [1,2,3];

function doSomething(arr) {
  arr.push(4);
}
doSomething(arr);
console.log(arr); // [1,2,3,4]
```

Pour créer deux valeurs indépendantes, il est nécessaire de créer explicitement une copie de la variable.

### Trailing comma

Depuis ES8, on peut laisser une virgule après le dernier paramètre d'une fonction.  
Cela qui générait une erreur `SyntaxError` auparavent.

``` js
function es8(var1, var2, var3,) {
  // ...
}
```

``` js
es8(10, 20, 30,);
```

---

## Portée d'une variable

### Portée locale

La portée d'une variable signifie tout simplement "l'endroit où cette variable est accessible". Les variables crées dans une fonction sont des variables locales, elles n'existent pas en dehors de la fonction. Ce n'est pas le cas des autres blocs de code comme les boucles et les conditions.

``` js
function myFunction() {
  var myVar = "Hello world";
  console.log(myVar);    // Hello World
}
myFunction();
console.log(myVar);      // undefined
```

### Portée globale

Si le mot-clé `var` n'est pas utilisé, alors la variable est déclarée dans le contexte global et peut être accédée de n'importe où (en lecture et écriture), de même qu'une variable crée en dehors de toute fonction.

``` js
function myFunction() {
    myVar = "Hello world";
    console.log(myVar);  // Hello World
}
myFunction();
console.log(myVar);      // Hello world
```

``` js
var myVar = "Hello people";

function myFunction() {
  myVar = "Hello world";
  console.log(myVar);    // Hello world
}

myFunction();
console.log(myVar);      // Hello world
```

### Portée locale vs globale

En utilisant `var`, la fonction va déclarer une variable locale totalement indépendante du contexte global.

``` js
var myVar = "Hello people";

function myFunction() {
  var myVar = "Hello world";
  console.log(myVar);    // Hello world
}

myFunction();
console.log(myVar);      // Hello people
```

---

## Callback

Les fonctions peuvent être passées en paramètre ou retournées en résultat comme n'importe quelle valeur.  
On appelle *callback* une fonction passée en paramètre à une autre fonction pour être appelée:

``` js
function fonction1(callback) {
  console.log("fonction1");
  callback();
}
function fonction2(){
  console.log("fonction2");
}
fonction1(fonction2);
// Affiche fonction1 fonction2
```

---

## Fonctions anonymes

JavaScript permet de créer des fonctions anonymes, c'est à dire des fonctions qui ne sont pas nommées.  
Elles sont souvent utilisées pour des IIFE ou des callbacks.

### Immediately Invoked Function Expression (IIFE)

Une méthode courante en JavaScript consiste à utiliser une fonction anonyme que l'on invoque dès qu'elle est déclarée:

``` js
(function () {
  console.log("IIFE");
})();
// Affiche IIFE immédiatement
```

Cela permet de regrouper des fonctionnalités connexes dans un seul bloc et de rendre les variables inaccesibles à l'extérieur — notamment pour éviter des conflits entre deux scripts qui pourraient utiliser des variables de même nom.

### Lambda

On appelle *lambda* une fonction anonyme passée en paramètre ou retournée en résultat.

``` js
function fonction1(callback) {
  console.log("fonction1");
  callback();
}
fonction1(function(){
  console.log("fonction2");
});
// Affiche fonction1 fonction2
```

Les lambdas sont souvent utilisés en JavaScript.
Par exemple, la fonction de tri `sort` prend en argument une fonction (donc un callback) qui permet de décider le critère de tri du tableau. On ne crée généralement pas une fonction nommée dans ces cas là.

``` js
values.sort(function(a,b){
  return a.localeCompare(b);
});
```

### Fonction flèche

ES6 introduit la fonction flèche (*arrow function*).

1. C'est une manière plus concise de créer une fonction anonyme.

    ``` js
    var someObject = function() {
      return "hello";
    };
    ```

    ``` js
    var someObject = () => {
      return "hello";
    };
    ```

2. Lorsqu'une fonction flèche ne fait que retourner une valeur, on peut omettre les accolades et le mot-clé `return`.

    ``` js
    var someObject = () => "hello";
    ```

    ``` js
    var doubleIt = (item) => item * 2;
    ```

    Attention, pour retourner un objet, il faut l'entourer de parenthèses (pour que les accolades de l'objet ne soit pas confondues avec les accolades de syntaxe).

    ``` js
    var someObject = () => ({msg: "hello"});
    ```

3. Dans un callback, si un seul paramètre est attendu, alors les parenthèses autour du paramètre peuvent être omises.

    ``` js
    [1,2,3].map((n) => n * 2); // 2 4 6
    ```

    ``` js
    [1,2,3].map(n => n * 2); // 2 4 6
    ```

    ``` js
    [1,2,3].map(n => ({value: n})); // {value:1}, {value:2}, {value:3}
    ```


4. La fonction flèche conserve le `this` de son parent  
   (plus de détails sur ce sujet dans l'article Programmation Orientée Objet)

    ``` js
    function Person(name, age) {
      var self = this;

      this.name = name;
      this.age  = age;

      (function() {
        console.log(this); // Window object
        console.log(self); // {name: 'Bob', age: 20}
      })();
    }
    var user = new Person('Bob', 20);
    ```

    ``` js
    function Person(name, age) {
      var self = this;

      this.name = name;
      this.age  = age;

      (() => {
        console.log(this); // {name: 'Bob', age: 20}
        console.log(self); // {name: 'Bob', age: 20}
      })();
    }
    var user = new Person('Bob', 20);
    ```

---

## Hoisting

Le moteur JavaScript va d'abord faire une analyse rapide du script avant d'executer quoi que ce soit. Qu'une fonction soit définie en haut ou en bas du code, elle est connue de JavaScript et peut être utilisée dans tout le fichier. Ce comportement s'appelle le *hoisting*. Cela dit, c'est une bonne pratique de définir les fonctions avant de les appeler.

``` js
console.log(sum(1,2));   // 3

function sum(x, y) {
  return x + y;
}
```

Les variables sont partiellement hoistées, leur déclaration est hoistée mais pas leur assignation.

``` js
console.log(mavar);      // retourne undefined
console.log(inexistant); // lève une erreur "ReferenceError: inexistant is not defined"

var mavar = "Hello";
```

Assigner une fonction anonyme à une variable n'est donc pas hoisté.

``` js
console.log(sum2(1,2));  // lève une erreur "TypeError: sum2 is not a function"

var sum2 = function(x, y) {
  return x + y;
}
```

---

## Closure

En JavaScript, une fonction a toujours accès au contexte dans lequel elle a été créée.  
Ce comportement s'appelle une *closure*.

``` js
function hello(name){
  var message = "Hello " + name;

  return function() {
    console.log(message)
  }
}
var helloUser = hello("Bob");
console.log(helloUser()); // Hello Bob
```

Si la valeur de la variable dans la closure est modifiée alors la fonction récupère la nouvelle valeur.

``` js
for (var i = 0; i < 4; i++) {

  setTimeout(function() {
    console.log(i);      // Affiche 4 fois 4
  }, (i+1) * 1000);
}
```

Pour éviter ça, on peut utiliser une IIEF qui prend en paramètre la valeur de la variable dans une nouvelle variable.  
On obtient la valeur de la variable d'origine "figée" a un moment donné.

``` js
for (var i = 0; i < 4; i++) {
  (function(j) {

    setTimeout(function() {
      console.log(j);    // Affiche 0 1 2 3
    }, (j+1) * 1000);
  })(i);
}
```

---

## Currying

L'*arité* d'une fonction est le nombre d'arguments qu'elle requiert. Le *currying* signifie qu'on convertit une fonction d'arité N en une fonction d'arité 1. En d'autres termes, on structure la fonction de telle sorte qu'elle renvoie une autre fonction qui prend l'argument suivant, et ainsi de suite.

Par exemple, le calcul d'une somme de deux nombres est d'arité 2. En utilisant le currying:

``` js
function curried(x) {
  return function(y) {
    return x + y;
  }
}
console.log(curried(1)(2)); // 3
```

Le currying est utile si l'on ne peut pas fournir tous les arguments à une fonction en même temps.

---

## Fonction partielle

Une fonction *partielle* peut être décrite comme une fonction à laquelle on a appliqué une partie des arguments et que l'on peut appeler ultérieurement en fournissant le reste des arguments.

En JavaScript, la méthode `bind` permet de lier des arguments à une fonction. Le résultat obtenu est une fonction partielle.

``` js
function sum(x, y, z) {
  return x + y + z;
}

var partialFunction = sum.bind(this, 1, 2);
console.log(partialFunction(3)); // 6
```

---

## Fonction pure

Une fonction est dite *pure* quand elle suit quelques principes de bases:

* les fonctions sont indépendantes de l'état du programme ou des variables globales.
  Elles ne dépendent que des paramètres qui leur sont fournis pour effecteur leurs traitements.
  Elles ne définissent ni ne modifient des variables globales.
* les mêmes paramètres donnent toujours le même résultat  
* tous les changements effectués sont minimisés et soigneusement contrôlés: par exemple une fonction pure triant un tableau renverra un nouveau tableau, trié, plutôt que d'effectuer le tri sur le tableau en entrée.

La programmation fonctionnelle est une approche en informatique basée sur l'utilisation de fonctions pures.

---

## Fonction de première classe

Une opération est dite de *première classe* lorsqu'elle peut être traitée comme n'importe quelle autre variable.  
En JavaScript, les fonctions sont toujours de première classe.

``` js
// Math.pow est de première classe, on peut l'assigner à une variable
var mafonction = Math.pow;
console.log(mafonction(2,3)); // 8
```

L'opération `+`, elle, n'est pas une opération de première classe: on ne peut pas stocker l'opérateur dans une variable pour une utilisation utérieure. Si on voulait utiliser une addition pour un callback par exemple, alors on devrait encapsuler le `+` dans une fonction.

``` js
// "+" n'est pas de première classe, on doit l'encapsuler
var mafonction = function(a, b){
  return a + b;
};
console.log(mafonction(2,3)); // 5
```

---

## Callback Queue

JavaScript est un langage single-thread. Cela signifie que le moteur JavaScript ne peut executer qu'un seul morceau de code à la fois. Cela a pour conséquence que lorsque JavaScript rencontre un morceau de code qui prend beaucoup de temps à traiter, le code situé après est bloqué — il ne peut pas être traité tant que le code qui le précède n'est pas fini.
La solution pour exécuter du code qui prend du temps sans bloquer le processus est d'utiliser un appel *asynchrone*, c'est à dire un appel en dehors de l'execution linéaire du code (de haut en bas).

JavaScript utilise une structure de données qui stocke les informations sur les fonctions actives appelé *Call Stack* (pile d'appels en français).  
Une fonction qui attend un évènement (clic ou autre) est placée dans un emplacement mémoire particulier appelé *Heap* (tas).  
Lorsque l'évènement que la fonction attend arrive, la fonction est déplacée dans la *Callback Queue* (pile de rappels) par le gestionnaire d'évènements.

La Call Stack est constamment vérifiée par le moteur. Lorsqu'elle est vide, la Callback Queue est vérifiée. Si une fonction est en attente, la première fonction dans la queue est poussée dans la Call Stack et executée.  
Ce processus de vérification est un appelé un *tick* dans la boucle d'évènements.

Cela signifie que toute fonction attendant un évènement ne sera éxecutée qu'une fois la Call Stack finie, même si l'évènement se produit avant. On peut donc pousser les fonctions qui prennent du temps en dernier pour ne pas bloquer le reste du processus.

``` js
function first() {
  console.log('1');
}
function second() {
  console.log('2');
}
function third() {
  console.log('3');
}

first();
setTimeout(second, 0);
third();

// Affiche 1 3 2
```