---
title: Proxy
category: Web, JavaScript
---

Un `Proxy` est un objet qui permet d'envelopper un autre objet (ou fonction) et d'intercepter tous les accès aux attributs et méthodes de cet objet (ou fonction) [ES6]. On peut s'en servir pour valider des données, implémenter un DOM virtuel, étendre les fonctionnalités de l'objet, etc.

## Créer un Proxy

Pour créer un proxy, vous devez avoir
1. l'objet de base, dont vous voulez contrôler l'accès

   ``` js
   var obj = {
     name: "Bob",
     age : 20
   };
   ```

2. un ensemble de *traps* — les méthodes qui vous permettrons d'intercepter les appels vers l'objet source

   ``` js
   var traps = {
     get: function(target, key, context) {
      return key in target ? target[key] : '"' + key + '" does not exist';
     }
   };
   ```

3. créer le `Proxy`

   ``` js
   var proxy = new Proxy(obj, traps);
   console.log(proxy.name);   // Bob
   console.log(proxy.street); // "street" does not exist
   ```

---

## Traps

### get

Contrôle les accès en lecture vers une propriété ou méthode.  
Appelé lorsqu'on exécute `obj.prop`  
Retourne la propriété ou `undefined`.

<ins>Définition</ins>:

```
get(target, property, receiver): mixed | undefined
```

<ins>Exemple</ins>:

``` js
var traps = {
  get: function(target, property, receiver){
    console.log("Proxy get");
    return target[property];
  }
};
```

``` js
var obj   = {name: "Bob"};
var proxy = new Proxy(obj, traps);
console.log(proxy.name);
```

### set

Contrôle les accès en écriture vers une propriété ou méthode.  
Appelé lorsqu'on exécute `obj.prop = ...`    
Retourne un booléen: `true` si la propriété a été définie avec succès, `false` en cas d'échec

<ins>Définition</ins>:

```
set(target, property, value, receiver): boolean
```

<ins>Exemple</ins>:

``` js
var traps = {
  set: function(target, property, value, receiver){
    console.log("Proxy set");
    target[property] = value;
    return true;
  }
};
```

``` js
var obj   = {name: "Bob"};
var proxy = new Proxy(obj, traps);
console.log(proxy.name = "Alice");
```

### has

Permet de vérifier si une propriété donnée existe.  
Retourne un booléen: `true` si la propriété existe, `faux` sinon.

<ins>Définition</ins>:

```
has(target, property): boolean
```

<ins>Exemple</ins>:

``` js
var traps = {
  has: function(target, property){
    console.log("Proxy has");
    return (property in target) ? true : false;
  }
};
```

``` js
var obj   = {name: "Bob"};
var proxy = new Proxy(obj, traps);
console.log("name" in proxy);
```

### isExtensible

Permet de vérifier si l'objet est dans un état extensible.  
Appelé lorsqu'on exécute `Object.isExtensible()`.  
Retourne un booléen.

<ins>Définition</ins>:

```
isExtensible(target): boolean
```

<ins>Exemple</ins>:

``` js
var traps = {
  isExtensible: function(target){
    console.log("Proxy isExtensible");
    return Object.isExtensible(target);
  }
};
```

``` js
var obj   = {name: "Bob"};
var proxy = new Proxy(obj, traps);

// is extensible
console.log(Object.isExtensible(proxy)); // true
proxy.age = 20;
console.log(proxy.age);                  // 20

// is not extensible
Object.preventExtensions(proxy);
console.log(Object.isExtensible(proxy)); // false
proxy.surname = "Bobby";
console.log(proxy.surname);              // undefined
```

### preventExtensions

Permet d'empêcher l'ajout de nouvelles propriétés.  
Appelé lorsqu'on exécute `Object.preventExtensions()`.
Retourne un booléen: `false` si l'opération a échoué.

<ins>Définition</ins>:

```
preventExtensions(target): boolean
```

<ins>Exemple</ins>:

``` js
var traps = {
  preventExtensions: function(target){
    console.log("proxy preventExtensions");
    Object.preventExtensions(target);
    return true;
  }
};
```

``` js
var obj   = {name: "Bob"};
var proxy = new Proxy(obj, traps);

console.log(Object.preventExtensions(proxy));
```

### getPrototypeOf

Permet d'obtenir le prototype de l'objet.  
Appelé lorsqu'on exécute `Object.getPrototypeOf()`, `obj.__proto__` ou `instanceof`.  
Retourne le prototype.

<ins>Définition</ins>:

```
getPrototypeOf(target): object | null
```

<ins>Exemple</ins>:

``` js
var traps = {
  getPrototypeOf: function(target){
    console.log("Proxy getPrototypeOf");
    return Object.getPrototypeOf(target);
  }
};
```

``` js
var obj   = {name: "Bob"};
var proxy = new Proxy(obj, traps);
console.log(proxy.__proto__);
```

### setPrototypeOf

Permet de définir le prototype de l'objet.  
Appelé lorsqu'on exécute `Object.setPrototypeOf()` ou `obj.__proto__ = ...`.  
Retourne un booléen: `true` si le prototype a été définit avec succès,  `faux` sinon

<ins>Définition</ins>:

```
setPrototypeOf(target, prototype): boolean
```

<ins>Exemple</ins>:

``` js
var traps = {
  setPrototypeOf: function(target, prototype){
    console.log("Proxy setPrototypeOf");
    Object.setPrototypeOf(target, prototype);
    return true;
  }
};
```

``` js
var obj   = {name: "Bob"};
var proxy = new Proxy(obj, traps);
proxy.__proto__ = {};
```

### getOwnPropertyDescriptor

Permet de récupérer la description d'une propriété.  
Appelé lorsqu'on exécute `Object.getOwnPropertyDescriptor()`.  
Retourne la description de la propriété ou `undefined`.

<ins>Définition</ins>:

```
getOwnPropertyDescriptor(target, prototype): object | undefined
```

<ins>Exemple</ins>:

``` js
var traps = {
  getOwnPropertyDescriptor: function(target, property){
    console.log("Proxy getOwnPropertyDescriptor");
    return Object.getOwnPropertyDescriptor(target, property);
  }
};
```

``` js
var obj   = {name: "Bob"};
var proxy = new Proxy(obj, traps);
console.log(Object.getOwnPropertyDescriptor(proxy, 'name'));
// { value: "Bob", writable: true, enumerable: true, configurable: true }
```

### defineProperty

Permet de modifier la description d'une propriété.  
Appelé lorsqu'on exécute `Object.defineProperty`.  
Retourne un booléen: `false` si l'opération a échoué.

<ins>Définition</ins>:

```
defineProperty(target, prototype): boolean
```

<ins>Exemple</ins>:

``` js
var traps = {
  defineProperty: function(target, property, descriptor){
    console.log("Proxy defineProperty");
    Object.defineProperty(target, property, descriptor);
    return true;
  }
};
```

``` js
var obj   = {name: "Bob"};
var proxy = new Proxy(obj, traps);
proxy.age = 20;
```

### deleteProperty

Permet de supprimer une propriété de l'objet.  
Appelé lorsqu'on exécute `delete obj.prop`  
Retourne un booléen: `true` si la suppession a réussit, `false` sinon

<ins>Définition</ins>:

```
deleteProperty(target, prototype): boolean
```

<ins>Exemple</ins>:

``` js
var traps = {
  deleteProperty: function(target, property){
    console.log("Proxy deleteProperty")
    return delete target[property];
  }
};
```

``` js
var obj   = {name: "Bob"};
var proxy = new Proxy(obj, traps);
delete proxy.name;
```

### ownKeys

Retourne les clés des propriétés de l'objet.  
Appelé lorsqu'on exécute `Object.getOwnPropertyNames()` ou `Object.getOwnPropertySymbols()`  
Retourne un tableau de chaîne de caractères et symboles.

<ins>Définition</ins>:

```
ownKeys(target): array
```

<ins>Exemple</ins>:

``` js
var traps = {
  ownKeys: function(target){
    console.log("Proxy ownKeys");
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
  }
};
```

``` js
var secret = Symbol("secret"),
    obj    = {
      name:     "Bob",
      [secret]: "sffhg4f8g7fz"
};
var proxy = new Proxy(obj, traps);

console.log(Object.getOwnPropertyNames(proxy));   // [ "name" ]
console.log(Object.keys(proxy));                  // [ "name" ]
console.log(Object.getOwnPropertySymbols(proxy)); // [ Symbol(secret) ]
```

### apply

Appelé lorsqu'on essaie d'éxecuter le proxy.  
Uniquement lorsque le proxy est appliqué à une fonction

<ins>Définition</ins>:

```
apply(target, this, args): mixed
```

<ins>Exemple</ins>:

``` js
var traps = {
  apply: function(target, thisValue, args){
    console.log("Proxy apply");
    return target.apply(thisValue, args);
  }
};
```

``` js
var func  = function() { return "Hello"; };
var proxy = new Proxy(func, traps);
console.log(proxy());
```

### construct

Constructeur appelé lors de la création d'un nouvelle instance (avec `new`).  
Uniquement lorsque le proxy est appliqué à une fonction

<ins>Définition</ins>:

```
construct(target, args): object
```

<ins>Exemple</ins>:

``` js
var traps = {
  construct: function(target, args){
    console.log("Proxy construct");
    return new target(...args);
  }
};
```

``` js
var func  = function(name, age) {
  this.name = name;
  this.age  = age;
};
var proxy = new Proxy(func, traps);
console.log(new proxy("Bob", 20)); // { name: "Bob", age: 20 }
```

---

## Exemples

### Validation des données

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
person.age  = 4.5; // TypeError: The age is not an integer
```

### URL Query API

``` js
var METHODS = ["GET", "HEAD", "POST", "PUT", "DELETE", "CONNECT", "OPTIONS", "TRACE", "PATCH"];

var api = new Proxy({}, {
  get(target, propKey) {

    // Valid HTTP method (GET/POST/etc)?
    const method = METHODS.find(method => propKey.startsWith(method.toLowerCase()))
    if (!method) {
      return;
    }

    // Convert method name to URL
    const path = '/' + propKey
        .substring(method.length)
        .replace(/([a-z])([A-Z])/g, '$1/$2')
        .replace(/\$/g, '/$/')
        .toLowerCase();

    return (...args) => {
      const finalPath   = path.replace(/\$/g, () => args.shift()); // Replace $ in URL with argument
      const queryOrBody = args.shift() || {};                      // Remaining arguments are passed as is

      console.log(method + " " + finalPath + " " + JSON.stringify(queryOrBody));
      // return fetch(finalPath, { method, body: queryOrBody })
    }
  }
});

api.get();                               // GET /
api.getUsers();                          // GET /users
api.getUsers$Likes('1234');              // GET /users/1234/likes
api.getUsers$Likes('1234', { page: 2 }); // GET /users/1234/likes {"page": 2}
api.postItems({ name: 'Item name' });    // POST /items {"name":"Item name"}
api.foobar();                            // api.foobar is not a function
```

### Search API

``` js
// Implements findWhere[Field][Assertion] methods
function SearchAPI(arr) {

  // Accepted assertions
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

 // Return a Proxy of the array
  return new Proxy(arr, {
    get(target, key) {

      // We're accessing the object property
      if (key in target) {
        return target[key];
      }

      // The method starts with findWhere
      if(!key.startsWith("findWhere")) {
        return;
      }
      // And ends with an Assertion (such as Equals)
      var method = assertionsList.find((str) => key.endsWith(str));
      if (!method) {
        return;
      }
      // Retrieve the name of the requested field (findWhere[Field][Assertion])
      var field = key.substring("findWhere".length, key.length - method.length).toLowerCase();

      // Return the function to be executed
      return function(arg) {
        return target.filter((item) => assertions[method](item[field], arg));
      }
    }
  });
}

var arr = SearchAPI([
  { name: 'John', age: 23, skills: ['mongodb'] },
  { name: 'Lily', age: 21, skills: ['redis'] },
  { name: 'Iris', age: 43, skills: ['python', 'javascript'] }
]);
console.log(arr.findWhereNameEquals('Lily'))           // [{ name: "Lily", age: 21, skills: […] }]
console.log(arr.findWhereSkillsIncludes('javascript')) // [{ name: "Iris", age: 43, skills: […] }]
console.log(arr.length);                               // 3
console.log(arr.nop());                                // arr.nop is not a function
```