---
title: Reflect
category: Web, JavaScript, ES6
---

`Reflect` est un module qui contient des méthodes pour manipuler les objets. La plupart chevauchent les méthodes ES5 définies sur l'objet global, il s'agit à ce jour des mêmes méthodes que celles définies sur `Proxy`:

* `apply()`
* `construct()`
* `defineProperty()`
* `deleteProperty()`
* `enumerate()`
* `get()`
* `getOwnPropertyDescriptor()`
* `getPrototypeOf()`
* `has()`
* `isExtensible()`
* `ownKeys()`
* `preventExtensions()`
* `set()`
* `setPrototypeOf()`

[Comparaison méthodes](https://medium.com/@denzels/es6-reflect-api-e90483d6c3bc)

Alors quel est l'intérêt de `Reflect`?

### Regrouper les méthodes de reflection

Le module `Reflect` est un endroit plus naturel pour la plupart des méthodes de reflection précédemment définies sur `Object`. Pour des raisons de compatibilité, il est peu probable que les méthodes d'`Object` disparaissent, mais elles on tout de même été dépréciées en faveur de `Reflect`.
Ainsi `Function.prototype.apply` et `Function.prototype.call` sont toutes deux depréciées pour laisser place à `Reflect.apply`.

``` js
const args = Reflect.apply(Array.prototype.slice, arguments, []);
```

### Proxy

Lorsqu'on utilise des `Proxy`, il est très courant d'intercepter une opération, de faire quelque chose avant de "faire la chose par défaut", qui consiste à appliquer l'opération interceptée. Pour appliquer cette opération, on utilise `Reflect`.

``` js
var loggedObj = new Proxy(obj, {
  get: function(target, name) {
    console.log("get", target, name);
    return Reflect.get(target, name);
  }
});
```

### Valeurs de retour

Les méthodes de `Reflect` retournent un booléen indiquant si l'opération c'est bien passé.  
Les méthodes d'`Object` retournaient l'objet ou lançaient une exception en cas d'erreur.

``` js
try {
  Object.defineProperty(obj, name, desc);
  // property defined successfully
} catch (e) {
  // possible failure (and might accidentally catch the wrong exception)
}
```

devient

``` js
if (Reflect.defineProperty(obj, name, desc)) {
  // success
} else {
  // failure
}
```

### Opérations de première classe

En ES5, pour détecter si une propriété existe sur un objet, on écrit `name in obj` et pour supprimer une propriété, on écrit `delete obj[name]`. Bien que cette syntaxe soit courte et agréable, elle ne peut pas être stockée dans une variable directement - il faut définir une fonction qui effectue cette opération.

``` js
var del = function(obj, name) {
  delete obj[name];
}
```

Avec `Reflect`, ces opération sont accessibles comme fonctions de première classe (des fonctions que l'on peut assigner à des variable). Pour détecter si une propriété existe, on a `Reflect.has(obj, name)` et pour supprimer une propriété, `Reflect.deleteProperty(obj, name)`.

``` js
var del = Reflect.deleteProperty;
```

### Remplacer Function.prototype.apply.call

En ES5, pour appeler une fonction en définissant `this`, on utilise `apply`.

``` js
f.apply(obj, args);
```

Le problème c'est que `f` peut définir une propriété `apply`, qui serait donc appelée à la place d'appeler `f`.  
Pour s'assurer que la bonne méthode soit appelée, en écrit typiquement ce qui suit:

``` js
Function.prototype.apply.call(f, obj, args);
```

C'est verbeux et difficile à comprendre, `Reflect` permet de faire ça de manière beaucoup plus abbrégée:

``` js
Reflect.apply(f, obj, args);
```

### Arguments à longueur variable

En ES6, il est possible d'appeler un constructeur avec un nombre variable d'arguments avec la syntaxe spread:

``` js
var obj = new F(...args);
```

Pour faire la même chose en ES5, on peut utiliser `Reflect` (avec un [polyfill](https://github.com/tvcutsem/harmony-reflect/)):

``` js
var obj = Reflect.construct(F, args)
```

### This sur les getters et setters

En ES5, pour lire ou mettre à jour une propriété on utilise les crochets.

``` js
obj[name] = value;      // set
console.log(obj[name]); // get
```

Les méthodes `Reflect.get` et `Reflect.set` permettent de faire la même chose mais permettent en outre de définir `this`, ce qui peut être utile pour rediriger des appels vers un autre objet.

``` js
var obj = {
  get foo() { return this.bar(); },
  bar: function() { ... }
}

Reflect.get(obj, "foo", wrapper); // appelle wrapper.bar();
```

### Prototype

Sur certains navigateurs `__proto__` est défini comme une propriété spéciale qui permet d'accéder au prototype. `Reflect.getPrototypeOf(obj)` et `Reflect.getPrototypeOf(obj, proto)` sont les méthodes standardisées par ES6 pour récupérer et mettre à jour le prototype.
