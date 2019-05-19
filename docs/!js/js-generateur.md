---
title: Les générateurs et itérateurs
category: Web, JavaScript, ES6
---

Les *générateurs* sont des fonctions qui peuvent retourner plusieurs valeurs dans le temps [ES6]

## Déclarer un générateur

On déclare un générateur avec un astérisque: `function*`.  
Pour retourner une valeur, plutôt qu'utiliser `return`, on utilise `yield`.

``` js
function* foo() {
  yield 'a';
  yield 'b';
  yield 'c';
}
```

## Appeler un générateur

On appelle un générateur de la même manière qu'une fonction normale, la différence étant dans le résultat récupéré: un générateur ne retourne pas directement une valeur mais un objet particulier, un *itérateur*.

``` js
var it = foo();
console.log(it); // Generator {  }
```

Avec cet itérateur, on peut récupérer la valeur du prochain `yield` en appelant `next()`.  
On obtient un objet avec deux propriétés:
* `value`, la valeur retournée par le `yield`
* `done`, un booléen qui indique si le générateur a retourné sa dernière valeur

``` js
console.log(it.next()); // { value: "a", done: false }
console.log(it.next()); // { value: "b", done: false }
console.log(it.next()); // { value: "c", done: false }
console.log(it.next()); // { value: undefined, done: true }
```

### Exécution

L'execution du générateur est temporairement stoppée à chaque `yield`.  
Il reprend son exécution à chaque fois qu'on appelle `next()`.

``` js
function* time() {
  yield Date.now();
  yield Date.now();
}

console.log("Before", Date.now());
var it = time();
console.log("Call", Date.now());
console.log("1", it.next());
console.log("2", it.next());

/*
Before 1558111567051
Call 1558111567052
1 Object { value: 1558111567053, done: false }
2 Object { value: 1558111567055, done: false }
*/
```

### Donner des paramètres

On peut donner un argument à `next()` et le récupérer avec le `yield`.  
Cela permet de créer des interractions très facilement.

``` js
function* sayHello() {
  const name = yield "What is your name ?";
  yield "Hello " + name;

  const color = yield "What is your favorite color ?";
  yield "Well it don't like it";
}

var it = sayHello();
console.log(it.next().value);       // What is your name ?
console.log(it.next("Bob").value);  // Hello Bob

console.log(it.next().value);       // What is your favorite color ?
console.log(it.next("black").value) // Well it don't like it
```

---

## Boucler sur un itérateur

On peut se servir de `for... of` pour boucler sur un itérateur.  
La boucle est terminée lorsque le générateur a retourné la dernière valeur.

``` js
for(var val of foo()) {
  console.log(val); // a b c
}
```

---

## Stopper un générateur

On peut appeler la méthode `throw` sur le générateur, cela aura pour effet de le stopper.

``` js
function* loop() {
  var i = 0;

  while(true) {
    yield i++;
  }
}
```

``` js
var it = loop();
try {
  console.log(it.next()); // { value: 0, done: false }
  console.log(it.next()); // { value: 1, done: false }
  console.log(it.next()); // { value: 2, done: false }
  it.throw('Something went wrong'); // déclenche une erreur "Something went wrong"
} catch(e) {}

console.log(it.next()); // Object { value: undefined, done: true }
```

---

## Déléguer un générateur

`yield*` permet de déléguer les valeurs retournées à un autre générateur ou à un tableau de données.

``` js
function* foo() {
  yield "a";
  yield* bar(); // retourne les yield de bar (un par un)
}

function* bar() {
  yield "b";
  yield "c";
  yield* ["d", "e"]; // retourne les valeurs du tableau (une par une)
}

var it = foo();
for(var val of foo()) {
  console.log(val); // a b c d e
}
```

---

## Itérateur

De la même manière qu'il existe `toString` pour caster un objet en chaîne de caractère, un objet peut être casté en itérateur s'il implémente une méthode `@@Symbol.iterator`.

``` js
var iterable = {
  *[Symbol.iterator]() {
    yield "a";
    yield "b";
    yield "c";
  }
}

for(var val of iterable) {
  console.log(val); // a b c
}
```
