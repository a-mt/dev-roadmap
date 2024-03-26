---
title: Reflect
category: Web, JavaScript
---

`Reflect` est un module qui fournit des méthodes pour les opérations pouvant être interceptées avec des `Proxy` [ES6].

## Proxy et Reflect

Les méthodes fournies ont le même nom que les méthodes des `Proxy` et prennent les même arguments — et pour cause, `Proxy` et `Reflect` sont conçu pour fonctionner ensemble. Une reflection permet de "faire la chose par défaut": appliquer l'opération interceptée.

``` js
new Proxy(obj, {
  get: Reflect.get,
});
```

``` js
var loggedObj = new Proxy(obj, {
  get: function(target, name) {
    console.log("get", target, name);
    return Reflect.get(target, name);
  }
});
```

## Reflect vs Object

La plupart des méthodes de `Reflect` sont très similaires voire identiques à celles implémentées par `Object`, mais il y a souvent de [subtiles différences entre les deux](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Reflect/Comparaison_entre_Reflect_et_les_m%C3%A9thodes_Object).

Le module `Reflect` est un endroit plus naturel pour la plupart des méthodes de reflection précédemment définies sur `Object`. Pour des raisons de compatibilité, il est peu probable que les méthodes d'`Object` disparaissent, mais ces dernières on tout de même été dépréciées.
Ainsi `Function.prototype.apply` et `Function.prototype.call` sont toutes deux depréciées en faveur de `Reflect.apply`.

## Callback

Les éléments de syntaxe ne peuvent pas être utilisé comme callback, il est nécessaire de l'encapulser dans une fonction. Avec `Reflect`, toutes les opérations sont accessibles comme fonction de première de classe — c'est à dire des opérations que l'on peut stocker dans des variables.

Par exemple:

* Suppression

  ``` js
  var del = function(obj, name) {
    delete obj[name];
  };
  ```

  ``` js
  var del = Reflect.deleteProperty;
  ```

* Affectation

  ``` js
  var set = funtion(obj, field, value) {
    obj[field] = value;
  };
  ```

  ``` js
  var set = Reflect.set
  ```

* Accès

  ``` js
  var get = function(obj, field) {
    return obj[field];
  };
  ```

  ``` js
  var get = Reflect.get;
  ```

* Vérification

  ``` js
  var has = function(obj, field) {
    return field in obj;
  };
  ```

  ``` js
  var has = Reflect.has;
  ```