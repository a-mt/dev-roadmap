---
title: Fonction flèche
category: Web, JavaScript, ES6
---

## Qu'est-ce que c'est

En JavaScript, les fonctions anonymes sont fréquemment utilisées. La fonction flèche (arrow function) est

1. une manière plus concise de créer une fonction anonyme.

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

2. une fonction qui conserve le `this` de son parent

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

## Omettre return

Lorsque la fonction ne fait que retourner une valeur, on peut omettre les accolades et le mot-clé `return`.


``` js
var someObject = () => { return "hello"; }
```

``` js
var someObject = () => "hello";
```

``` js
const doubleIt = (item) => item * 2;
```

Attention pour retourner un objet, afin que les accolades de l'objet ne soit pas confondues avec les accolades de syntaxe, il faut l'entourer de parenthèses.

``` js
var someObject = () => ({msg: "hello"});
```

## Omettre les parenthèses

Dans un callback, si un seul paramètre est attendu, alors les parenthèses autour du paramètre peuvent être omises.

``` js
[1,2,3].map((n) => n * 2); // 2 4 6
```

``` js
[1,2,3].map(n => n * 2); // 2 4 6
```

``` js
[1,2,3].map(n => ({value: n})); // {value:1}, {value:2}, {value:3}
```

