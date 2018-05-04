---
title: Générateur
category: Web, JavaScript, ES6
---

## Qu'est-ce qu'un générateur

Les générateurs sont des fonctions qui peuvent retourner plusieurs valeurs dans le temps, avec le mot-clé `yield`.  
On déclare un générateur avec `function*`.

``` js

function* foo() {
  yield 'a';
  yield 'b';
  yield 'c';
}
```

Pour récupérer le(s) résultat(s) d'un générateur, il faut

1. récupérer une instance du générateur en appelant la fonction.  
   Le résultat obtenu est un objet à partir duquel on pourra récupérer les résultats yieldés. 

2. appeler `next()` sur l'instance.  
   On obtient un objet qui contient la valeur du yield, dans `value`, ainsi que le flag `done` qui indique si la générateur a retourné sa dernière valeur.

3. L'execution du générateur est temporairement stoppée à chaque yield jusqu'à ce qu'on appelle le prochain résultat avec `next()`.

``` js
var it = foo();
console.log(it.next()); // { value: "a", done: false }
console.log(it.next()); // { value: "b", done: false }
console.log(it.next()); // { value: "c", done: false }
console.log(it.next()); // { value: undefined, done: true }
```

## Itérer sur le résultat

On peut se servir de `for... of` pour itérer sur les valeurs retournées tant qu'il y en a.

``` js
for(var val of foo()) {
  console.log(val); // a b c
}
```

## Entrées/sorties

`next()` peut prendre un argument qui sera passé au générateur. Cela permet de créer des interractions très facilement.

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

## Stopper un générateur

Il est possible de lever une erreur sur le générateur, ce qui a pour effet de le stopper.

``` js
function* loop() {
  var i = 0;

  while(true) {
    yield i++;
  }
}
var it = loop();
console.log(it.next()); // { value: 0, done: false }
console.log(it.next()); // { value: 1, done: false }
console.log(it.next()); // { value: 2, done: false }

it.throw('Something went wrong'); // lève "Something went wrong"
```

## Déléguer un générateur

`yield*` est une forme de `yield` qui permet de déléguer la tâche à un autre générateur ou à un tableau de donnés.

``` js
function* foo() {
  yield "a";
  yield* bar();
}

function* bar() {
  yield "b";
  yield "c";
  yield* ["d", "e"];
}

var it = foo();
for(var val of foo()) {
  console.log(val); // a b c d e
}
```
