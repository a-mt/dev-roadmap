---
title: Promise
category: Web, JavaScript, ES6
---

## Legacy: Utiliser des callbacks

Si on veut créer une fonction asynchrone, avec ES5, on utiliserait `setTimeout`. Si cette fonction doit retourner une valeur, ou effectuer une action lorsqu'elle est terminée, alors il est nécessaire de passer un callback en paramètre. Et si on a beaucoup de fonctions asynchrones dans le code, alors le code devient très vite illisible (*callback hell*).

Par exemple, pour exécuter B une fois qu'A a fini, C une fois que B a fini, etc:

``` js
function doA(callback) {
  console.log("A does something");
  callback && callback();
}
function doB(callback) {
  console.log("B does something");
  callback && callback();
}
function doC(callback) {
  console.log("C does something");
  callback && callback();
}
function doD(callback) {
  console.log("D does something");
  callback && callback();
}
doA(doB.bind(null, doC.bind(null, doD)));
```

## Utiliser des promesses

Pour régler ce problème, ES6 introduit les promesses (*promise* en anglais). Une promesse permet de créer une fonction asynchrone, et d'utiliser le chaînage pour exécuter des callbacks plutôt que de les prendre en paramètre.

``` js
function doA() {
  return new Promise((resolve) => {
    console.log("A does something", Date.now());
    resolve();
  });
}
function doB() {
  return new Promise((resolve) => {
    console.log("B does something", Date.now());
    resolve();
  });
}
function doC() {
  return new Promise((resolve) => {
    console.log("C does something", Date.now());
    resolve();
  });
}
function doD() {
  return new Promise((resolve) => {
    console.log("D does something", Date.now());
    resolve();
  });
}
console.log("Start", Date.now());

doA().then(() => doB())
     .then(() => doC())
     .then(() => doD())
     .then(() => {
        console.log("All promises ended", Date.now());
     });

/*
Start 1558015603802
A does something 1558015603803
B does something 1558015603804
C does something 1558015603804
D does something 1558015603804
All promises ended 1558015603805
*/
```

<ins>Exemple</ins>:

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

``` js
async function loadScript(url){
  return new Promise((resolve, reject) => {
    var script  = document.createElement("script");
    script.type = "text/javascript";

    if(script.readyState){  //IE
      script.onreadystatechange = function(){
        if (script.readyState == "loaded" || script.readyState == "complete"){
          script.onreadystatechange = null;
          resolve();
        }
      };
    } else { // Others
      script.onload = resolve;
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  });
};

loadScript("react-chartjs.js")
  .then(() => {
    console.log(window['react-chartjs']);
});
```

---

## Concurrence

Une promesse est exécutée dès qu'elle est instanciée, on peut s'en servir pour exécuter plusieurs processus en concurrence.

``` js
var doA = new Promise((resolve) => {
  console.log("A does something", Date.now());
  resolve();
});
var doB = new Promise((resolve) => {
  console.log("B does something", Date.now());
  resolve();
});
var doC = new Promise((resolve) => {
  console.log("C does something", Date.now());
  resolve();
});
var doD = new Promise((resolve) => {
  console.log("D does something", Date.now());
  resolve();
});
console.log("Start", Date.now());

doA.then(() => doB)
   .then(() => doC)
   .then(() => doD)
   .then(() => {
      console.log("All promises ended", Date.now())
   });

/*
A does something 1558015640463
B does something 1558015640463
C does something 1558015640463
D does something 1558015640463
Start 1558015640464
All promises ended 1558015640466
*/
```

---

## Gérer les erreurs: catch

Chaque promesse reçoit deux fonctions en argument:
* la première, a appeler pour retourner un résultat — par convention, on l'appelle `resolve`
* la deuxième, a appeler pour retourner une erreur — par convention, on l'appelle `reject`

``` js
var doA = new Promise((resolve, reject) => {
    var result = Math.random();

    if(result > 0.5) {
      resolve(result);
    } else {
      reject('Your score is too damn low');
    }
});
````

Lorsque l'une ou l'autre est appelée, le moteur JavaScript s'occupe de transmettre le résultat à la fonction qui attend la résolution de la promesse.  

* On peut soit utiliser `.then(result, error)`

  ``` js
  doA.then(result => {
    console.log('Result is: ' + result);

  }, error => {
    console.log('Error: ' + error);
  });
  ```

* Soit `.then(result).catch(error)`

  ``` js
  doA.then(result => {
    console.log('Result is: ' + result);

  }).catch(error => {
    console.log('Error: ' + error);
  });
  ```

---

## Type d'une variable

Pour savoir si une variable est une promesse, on peut utiliser le test suivant:

``` js
const isPromise = obj => Boolean(obj) && typeof obj.then === 'function';
```

---

## async

`async` permet de déclarer une fonction asyncrhone [ES8].  
Ces fonctions ne bloquent pas le processus et retournent automatiquement une promesse. Une fois que la fonction arrive au `return`, la promesse est réalisée — comme si on appelait `resolve`.

```
async function doA() {
  console.log("A does something", Date.now());
}
async function doB() {
  console.log("B does something", Date.now());
}
async function doC() {
  console.log("C does something", Date.now());
}
async function doD() {
  console.log("D does something", Date.now());
}
console.log("Start", Date.now());

doA().then(() => doB())
     .then(() => doC())
     .then(() => doD())
     .then(() => {
        console.log("All promises ended", Date.now());
      });

/*
Start 1558015694403
A does something 1558015694404
B does something 1558015694404
C does something 1558015694405
D does something 1558015694405
All promises ended 1558015694406
*/
```

---

## await

`await` permet d’attendre la résolution d’une promesse [ES8].  
Ce mot-clé n’est valide qu'à l’intérieur d’une fonction `async`.

``` js
let obj = {
  async method() {
    let value = await fetch('/');
  }
};
```

``` js
class MyClass {
  async myMethod() {
    let value = await fetch('/');
  }
}
```

### Concurrence

Pour exécuter la promesse A après la promesse B:

``` js
(async function(){
    var a = await doA(),
        b = await doB();

    console.log('Results: ', a, b);
})();
```

Pour exécuter les promesses en même tempos:

``` js
(async function(){
    var promiseA = doA(),
        promiseB = doB();

    var a = await promiseA,
        b = await promiseB;

    console.log('Results: ', a, b);
})();
```

### Catch

Avec un `await`, les erreurs levées par une promesse peuvent être récupérées avec

* un bloc `try... catch`

  ``` js
  try {
    let x = await myAsyncFunction();

  } catch(e) {
    console.error(e);
  }
  ```

* ou avec `catch()`

  ``` js
  let x = await myAsyncFunction().catch(e => console.error(e));
  ```

---

## ES8

### Promise.all()

`Promise.all` permet d'executer plusieurs promesses en parallèle (de manière concurrente) et de n'executer le callback qu'une fois toutes les promesses réalisées.

``` js
async function getAB(a, b) {
    [a, b] = await Promise.all([getA(a), getB(b)]);
    return a + b;
}
```

### Promise.race()

`Promise.race` permet d'executer plusieurs promesses en parallèle (de manière concurrente) et d'executer le callback une fois qu'une des promesses est réalisée, avec le résultat de la première promesse résolue.

``` js
const first = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, 'first');
})
const second = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'second');
})

Promise.race([first, second]).then((result) => {
  console.log(result); // second
});
```

---

## ES9

### finally

Sur le même principe que le `finally` d'un bloc `try... catch`, `finally` est executé à la fin — quel que soit le résultat de la requête (erreur ou non) [ES2018]

``` js
var myPromise = new Promise(function(resolve, reject){
    resolve('all good');
});

myPromise.then(val => {
  console.log(val);

}).catch(val => {
  console.error(val);

}).finally(() => {
  stopLoader();
});
```

### for await... of

La boucle `for await` permet de boucler sur une liste de promesses [ES2018].  
Chaque itération est appelée une fois que l'itération précédente est terminée.

``` js
var promises = [
  new Promise(resolve => resolve(1)),
  new Promise(resolve => resolve(2)),
  new Promise(resolve => resolve(3))
];

async function test() {
  for await(var res of promises) {
    console.log(res); // 1 2 3
  }
}

test();
```
