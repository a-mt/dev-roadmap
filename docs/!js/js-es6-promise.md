---
title: Promesse
category: Web, JavaScript, ES6
---

## Qu'est-ce qu'une promesse

Les promesses (promises) sont des objets qui permettent de retourner une valeur à une autre fonction de manière asynchrone.
Une fonction asynchrone peut executer du code de manière asynchrone mais ne peut pas retourner de valeur à une autre fonction
autrement que par callback. Cela implique qu'il est nécessaire de casser le flow d'execution en sous-fonctions.
Pourvu qu'il y en ait beaucoup, le code devient vite illisible (*callback hell*)

Une promesse, elle, peut être appelée à l'intérieur d'une fonction sans casser le flow d'execution.

``` js
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("ok");
  }, 1)
})
.then(result => console.log('Result is: ' + result)) // Result is: ok
.catch(result => console.error('Error: ' + result));
```

## Créer une promesse

Pour créer une promesse, il faut instancier un objet `Promise` qui prend en paramètre une fonction a deux arguments:
* `resolve`, fonction appelée avec le résultat quand tout s'est bien passé
* `reject`, fonction appelée avec l'erreur quand quelque chose s'est mal déroulé

``` js
var asyncFunc = new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = Math.random();
      result > 0.5 ? resolve(result) : reject('Oppps....I cannot calculate')
    }, 1)
});
```

Lorsque `resolve` ou `reject` est appelé, le moteur JavaScript s'occupe de transmettre le résultat à la fonction qui attend la résolution de la promesse.

## Utiliser une promesse

La promesse est appelée dès qu'elle est instanciée.  
Pour en récupérer le résultat, il suffit de chainer les méthodes `then` et/ou `catch` à la promessse.

* `.then()` récupére le résultat - une fois que la promesse a appelé `resolve()`
* `.catch()` récupére l'erreur - quand la promesse a appelé `reject()`

``` js
asyncFunc
.then(result => console.log('Result is: ' + result))
.catch(result => console.log('Error: ' + result))
```

La puissance des promesses vient du fait qu'une fonction peut retourner une promesse:

``` js
// Déclaration
var asyncFunc = function() {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
        const result = Math.random();
        result > 0.5 ? resolve(result) : reject('Oppps....I cannot calculate')
      }, 1)
  });
}

// Appel
asyncFunc()
.then(result => console.log('Result is: ' + result))
.catch(result => console.log('Error: ' + result))
```

Et que l'on peut ainsi chaîner une suite de promesses retournées par des fonctions:

``` js
function logFetch(url) {
  return fetch(url)
    .then(response => response.text())
    .then(text => {
      console.log(text);
    }).catch(err => {
      console.error('fetch failed', err);
    });
}
```

## Tester si l'on a une promesse

``` js
const isPromise = obj => Boolean(obj) && typeof obj.then === 'function';
```
