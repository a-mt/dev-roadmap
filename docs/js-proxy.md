---
title: Proxy
category: Web, JavaScript, ES6
---

## Qu'est ce qu'un Proxy

Un `Proxy` est un objet qui enveloppe un autre objet ou une fonction. Il intercepte tous les accès aux attributs ou méthodes de l'objet source (dit *target*), qu'elles existent ou non. Cela peut servir à valider des données, implémenter un DOM virtuel, ajouter des extensions, etc.

``` js
var handler = {
  get: function(target, key, context) {
    return key in target ? target[key] : 'key does not exist';
  }
};

var obj = {
  key1: "val1"
}

var objProxy = new Proxy(obj, handler);
console.log(objProxy.key1); // val1
console.log(objProxy.key2); // key does not exist
```

## Traps

Un objet proxy contient différentes méthodes, dites *traps*, qui permettent de gèrer l'accès de la cible.

* `get`: contrôle les accès en lecture
* `set`: contrôle les accès en écriture
* `apply`
* `construct`
* `defineProperty`
* `deleteProperty`
* `getOwnPropertyDescriptor`
* `getPrototypeOf`
* `has`
* `isExtensible`
* `ownKeys`
* `preventExtensions`
* `setPrototypeOf`

### set

`set` peut servir pour valider des données :

``` js
var validator = {
  set: function(target, key, value) {
    
    if(key == "age") {
      if(!Number.isInteger(value)) {
        throw new TypeError("The age is not an integer");
      }
      if(value > 200) {
        throw new RangeError("The age seems invalid");
      }
    }

    target[key] = value;
    return true;
  }
}

var person = new Proxy({}, validator);
person.name = "Bob";
person.age  = 4.5; // lève "TypeError: The age is not an integer"
```

### get

`get` peut servir pour invoquer dynamiquement des fonctions:  
Exemple 1:

``` js
const { METHODS } = require('http');

const api = new Proxy({},
  {
    get(target, propKey) {
      const method = METHODS.find(method => propKey.startsWith(method.toLowerCase()))
      if (!method) {
        return;
      }

      const path = '/' + propKey
          .substring(method.length)
          .replace(/([a-z])([A-Z])/g, '$1/$2')
          .replace(/\$/g, '/$/')
          .toLowerCase();

      return (...args) => {
        const finalPath   = path.replace(/\$/g, () => args.shift());
        const queryOrBody = args.shift() || {};

        console.log(method, finalPath, queryOrBody);
        // return fetch(finalPath, { method, body: queryOrBody })
      }
    }
  }
)

api.get();                               // GET /
api.getUsers();                          // GET /users
api.getUsers$Likes('1234');              // GET /users/1234/likes
api.getUsers$Likes('1234', { page: 2 }); // GET /users/1234/likes?page=2
api.postItems({ name: 'Item name' });    // POST /items with body
api.foobar();                            // api.foobar is not a function
```

Exemple 2:

``` js
var assertions = {
  Equals: (object, value) => object === value,
  IsNull: (object, value) => object === null,
  IsUndefined: (object, value) => object === undefined,
  IsEmpty: (object, value) => object.length === 0,
  Includes: (object, value) => object.includes(value),
  IsLowerThan: (object, value) => object === value,
  IsGreaterThan: (object, value) => object === value
}
var assertionsList = Object.keys(assertions);

function wrap(arr) {
  return new Proxy(arr, {

    get(target, key) {
      if (key in target) {
        return target[key];
      }

      var method = assertionsList.find((str) => key.endsWith(str));
      if (method && key.startsWith("findWhere")) {
        var field = key.substring("findWhere".length, key.length - method.length).toLowerCase();

        // Retourne une fonction dynamique et non une méthode de l'objet source
        return function(arg) {
          return target.filter((item) => assertions[method](item[field], arg));
        }
      }
    }
  });
}

var arr = wrap([
  { name: 'John', age: 23, skills: ['mongodb'] },
  { name: 'Lily', age: 21, skills: ['redis'] },
  { name: 'Iris', age: 43, skills: ['python', 'javascript'] }
])
console.log(arr.findWhereNameEquals('Lily'))           // [{ name: "Lily", age: 21, skills: […] }]
console.log(arr.findWhereSkillsIncludes('javascript')) // [{ name: "Iris", age: 43, skills: […] }]
```
