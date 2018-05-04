---
title: ECMAScript 8
category: Web, JavaScript
---

ECMAScript 8 ou ECMAScript 2017 a été publié fin Juin 2017 par le TC39.

## Objet

### Object.values

Retourne un tableau contenant toutes les valeurs du tableau

``` js
const countries = {
    BR: 'Brazil',
    DE: 'Germany',
    RO: 'Romania',
    US: 'United States of America'
};

Object.values(countries); // ['Brazil', 'Germany', 'Romania', 'United States of America']
```

### Object.entries

Retourne un tableau contenant toutes les paires clés/valeurs du tableau

``` js
const countries = {
    BR: 'Brazil',
    DE: 'Germany',
    RO: 'Romania',
    US: 'United States of America'
};

Object.entries(countries); 

// [['BR', 'Brazil'], ['DE', 'Germany'], ['RO', 'Romania'], ['US','United States of America']]
```

### Object.getOwnPropertyDescriptors

Retourne toutes les propriétés de l'objet et leur attributs. Les attributs possibls sont: `value`, `writable`, `get`, `set`, `configurable` et `enumerable`.

``` js
const obj = {
    name: 'Pablo',
    get foo() { return 42; }
};

Object.getOwnPropertyDescriptors(obj);
/*
  foo:
      configurable: true
      enumerable: true
      get: function get foo()
      set: undefined
  name:
      configurable: true
      enumerable: true
      value: "Pablo"
      writable: true
*/
```

Cela permet notamment de recopier intégralement un objet, avec getter et setter, et non plus uniquement les propriétés.

``` js
const objSource = {
    set greet(who) { console.log('Hello ' + who); }
};

const objTarget = {};
Object.defineProperties(objTarget, Object.getOwnPropertyDescriptors(objSource));

objTarget.greet = 'World'; // Hello World
```

---

## Chaîne de caractères

### padStart, padEnd

Permet d'ajouter un padding au début ou à la fin

``` js
'23.10'.padStart(12);        // '      23.10'
```

``` js
'loading'.padEnd(10, '.');   // 'loading...'
```

---

## Fonctions

### Virgules en fin de liste

Il est désormais possible d'avoir une virgule après le dernier paramètre d'une fonction (ce qui générait une erreur `SyntaxError` auparavent).

``` js
function es8(var1, var2, var3,) {
  // ...
}
```

``` js
es8(10, 20, 30,);
```

### async

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

### await

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

<ins>Catch</ins>:

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

<ins>Concurrence</ins>:

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

---

## Promesses

### Promise.all

`Promise.all` permet d'executer plusieurs promesses en parallèle (de manière concurrente) et de n'executer le callback qu'une fois toutes les promesses réalisées.

``` js
async function getAB(a, b) {
    [a, b] = await Promise.all([getA(a), getB(b)]);
    return a + b;
}
```
