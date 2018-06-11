---
title: Async & Await
category: Web, JavaScript, ES6
---

## Async

`async function` déclare une fonction asynchrone. Ces fonctions peuvent être utilisées de la même manière que des fonctions normales mais elles retournent automatiquement une promesse et ne bloquent pas le processus. Une fois que la fonction arrive au `return`, la promesse est réalisée - comme un `resolve`.

``` js
function first() {
  console.log('first call');
  return 1;
}
async function second() {
  console.log('second call');

  for (var i=0; i<10000; i++) { }
  return 2;
}
function third() {
  console.log('third call');
  return 3;
}

console.log(first());
console.log(second().then((result) => { console.log(result); }));
console.log(third());

/*
  first call
  1
  second call
  Promise { <state>: "pending" }
  third call
  3
  2
 */
```

`async` peut être utilisé pour les méthodes d'objets/classes

``` js
let obj = {
  async method() {
    let value = await fetch('/');
  }
};

// Class methods
class MyClass {
  async myMethod() {
    let value = await fetch('/');
  }
}
```

---

## Await

`await` permet d'attendre la résolution d'une promesse. Ce mot-clé n'est valide qu'à l'intérieur d'une fonction `async`.

``` js
var promesse = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Hello World');
    }, 3000);
});

async function maFonction() {
    var result = await promesse;
    console.log(result); // Hello World
}

maFonction();
```

### Catch

Les erreurs levées par la promesse (avec `reject()`) peuvent être récupérée avec `try... catch` ou  avec `catch()`

``` js
try {
  let x = await myAsyncFunction();
}
catch(e) {
 // Error!
}
```

``` js
let x = await myAsyncFunction().catch(e => console.error(e));

if(!x) {
    return NaN;
}
```

### Concurrence

Pour executer la promesse A après la promesse B:

``` js
(async function () {
    // Wait for the first promise to be fulfilled.
    var a = await getRandomWithPromise();

    // Wait for the second promise to be fulfilled.
    var b = await getRandomWithPromise();

    // The function execution time would equal to the sum of time of the two promises
    console.log(`Your random numbers are ${a} and ${b}!`);
})();
// [Execution Time] 0.490 ms total
```

Pour executer les promesses en mêmes temps:

``` js
(async function () {

    var aPromise = getRandomWithPromise();
    var bPromise = getRandomWithPromise();

    // At this point, the requests were both executed concurrently
    // We now just need to wait for both promises to be fulfill.
    var a = await aPromise;
    var b = await bPromise;

    // The function execution time would be equal to the promise that takes the most time.
    console.log(`Your random numbers are ${a} and ${b}!`);
})();
// [Execution Time] 0.283 ms total
```
