---
title: "Méthodes: Objets"
category: Web, JavaScript, Méthodes
---

## hasOwnProperty()

Permet de vérifier si une propriété est définie sur l’objet (et non sur son prototype).

``` js
var obj = {};

obj.name = "Bob";
obj.__proto__.type = "person";

console.log(obj.name); // Bob
console.log(obj.hasOwnProperty("name")); // true

console.log(obj.type); // person
console.log(obj.hasOwnProperty("type")); // false
```

## isPrototypeOf()

Permet de vérifier si un objet hérite d’un prototype ou non.

``` js
function Person() {
  
}
var obj  = new Person(),
    obj2 = {};

console.log(obj);                                 // {}
console.log(Person.prototype.isPrototypeOf(obj)); // true

console.log(obj2);                                // {}
console.log(Person.prototype.isPrototypeOf(obj2)) // false
```

## propertyIsEnumerable()

Vérifie si une propriété est enumerable. Par défaut, toutes les propriétés de l'objet (et non de son prototype) sont énumérables, à moins de spécifier le contraire avec `Object.defineProperty`.

``` js
var obj = {
  name: "Bob",
  age: 20,
  hobbies: []
};
Object.defineProperty(obj, "age", {enumerable: false});

console.log(obj.name);                            // Bob
console.log(obj.propertyIsEnumerable("name"));    // true

console.log(obj.age);                             // 20
console.log(obj.propertyIsEnumerable("age"));     // false

for(var k in obj) {
  console.log(k); // name hobbies
}
```

---

## Object.create()

Un objet crée par `{}` hérite de `Object.prototype` et de toutes les méthodes et propriétés par défaut d'un objet.  
Un objet crée par `Object.create(obj)` hérite de l'objet passé en paramètre.

``` js
var obj  = {name: "Alice"},
    obj2 = Object.create(obj);

obj.name = "Bob";

console.log(obj2.name);                   // Bob
console.log(obj2.hasOwnProperty("name")); // false
console.log(obj.isPrototypeOf(obj2));     // true
```

Si l'objet est crée avec `Object.create(null)`, alors il n'hérite de rien, pas même des méthodes et propriétés par défaut.

``` js
var obj2 = Object.create(null);

obj2.name = "Bob";
console.log(obj2.name);                   // Bob
console.log(obj2.hasOwnProperty("name")); // TypeError: obj2.hasOwnProperty is not a function
```

## Object.getPrototypeOf()

Retourne le prototype de l'objet

``` js
var parent = {
  type: "person"
},
obj = Object.create(parent);

console.log(Object.getPrototypeOf(obj)); // { type: "person" }
```

## Object.defineProperty()

Permet de définir ou modifier une propriété sur un objet. Lorsqu'on ajoute une propriété via une affectation, celle-ci est créée avec un comportement par défaut. `Object.defineProperty()` permet de configurer le comportement de la propriété.

``` js
var obj = {};

Object.defineProperty(obj, "name", {value: "Bob"});

console.log(obj.name); // Bob
obj.name = "Alice";
console.log(obj.name); // Bob
```

Les configurations suivantes peuvent être définies par `Object.defineProperty`:

| Nom            | Description | Valeur par défaut
|---             |---          |---
| `value`        | Valeur associée à la propriété | `undefined`
| `writable`     | `true` si la propriété peut être modifiée en utilisant un opérateur d'affectation | `false`
| `enumerable`   | `true` si la propriété apparaît lors de l'énumération des propriétés de l'objet | `false`
| `configurable` | `true` si la propriété peut encore être changée/supprimée | `false`
| `get`          | Permet de définir une fonction appelée pour récupérer la valeur de la propriété | `undefined`
| `set`          | Permet de définir une fonction appelée lorsqu'on affecte la valeur de la propriété | `undefined`

## Object.defineProperties()

Permet de définir ou modifier des propriétés sur un objet. Même principe que `Object.defineProperty()`.

``` js
var obj = {};

Object.defineProperties(obj, {
  name: {value: "Bob"},
  age : {value: 20}
});

console.log(obj.name); // Bob
obj.name = "Alice";
console.log(obj.name); // Bob
```

## Object.getOwnPropertyDescriptor()

Retourne la description de la propriété demandée. Uniquement pour les propriétés de l'objet et non les propriétés héritées (par prototype).

``` js
var obj = {
  name: "Bob"
};
Object.defineProperty(obj, "name", {writable: false});

var desc = Object.getOwnPropertyDescriptor(obj, "name");
console.log(desc); // { value: "Bob", writable: false, enumerable: true, configurable: true }
```

## Object.getOwnPropertyNames()

Retourne la liste des propriétés propres à l'objet.

``` js
var parent = {
  type: "person"
},
obj = Object.create(parent);

obj.name = "Bob";
console.log(Object.getOwnPropertyNames(obj)); // [ "name" ]
```

## Object.keys()

Retourne la liste des propriétés propres à l'objet qui sont énumérables.

``` js
var parent = {
  type: "person"
},
obj = Object.create(parent);
obj.name = "Bob";
Object.defineProperty(obj, "age", {value: 20});

console.log(Object.getOwnPropertyNames(obj)); // [ "name", "age" ]
console.log(Object.keys(obj)); // [ "name" ]
```

---

## Object.preventExtensions()

Empêche d'ajouter de nouvelles propriétés à un objet.

``` js
var obj = {
  name : "Bob"
};
Object.preventExtensions(obj);

obj.age = 20;
console.log(obj.age); // undefined
```

## Object.isExtensible()

Vérifie s'il est possible d'ajouter de nouvelles propriétés à l'objet

``` js
var obj = {
  name : "Bob"
};
console.log(Object.isExtensible(obj)); // true
Object.preventExtensions(obj);
console.log(Object.isExtensible(obj)); // false
```

## Object.seal()

Empêche d'ajouter de nouvelles de fonctionnalités ou d'en supprimer.

``` js
var obj = {
  name : "Bob"
};
Object.seal(obj);

delete obj.name;
console.log(obj.name); // Bob
```

## Object.isSealed()

Permet de vérifier si un objet est scellé.

``` js
var obj = {
  name : "Bob"
};
console.log(Object.isSealed(obj)); // false
Object.seal(obj);
console.log(Object.isSealed(obj)); // true
```

## Object.freeze()

Permet de geler l'objet - empêche d'ajouter de nouvelles propriétés, supprimer ou éditer des propriétés existantes.

``` js
var obj = {
  name: "Bob"
};

Object.freeze(obj);

obj.name = "Alice";
console.log(obj.name); // Bob
```

## Object.isFrozen()

Permet de vérifier si un objet est gelé.

``` js
var obj = {
  name: "Bob"
};

console.log(Object.isFrozen(obj)); // false
Object.freeze(obj);
console.log(Object.isFrozen(obj)); // true
```

|   |CREATE|READ|UPDATE|DELETE|
|---|:---:|:---:|:---:|:---:|
|`Object.freeze`| ✗ | ✓ | ✗ | ✗ |
|`Object.seal`| ✗ | ✓ | ✓ | ✗ |
|`Object.preventExtensions`| ✗ | ✓ | ✓ | ✓ |

---

## Object.assign()

[ES6]

Copie les propriétés et les méthodes des objets les plus à droite dans l'objet le plus à gauche et renvoie le résultat.

```  js
var o1 = {foo: 'foo'};
var o2 = {bar: 'bar'};
var o3 = {baz: 'baz', foo: 'qux'};

Object.assign(o1, o2, o3); // {foo: 'qux', bar: 'bar', baz: 'baz'}
console.log(o1); // {foo: 'qux', bar: 'bar', baz: 'baz'}
```

Cette méthode peut être utilisée pour copier un objet (et non une référence). Attention cependant, la copie n'est pas récursive: la valeur des sous-objets est une référence aux sous-objets d'origine.

``` js
var person  = {name: "Alice"};
    person2 = Object.assign({}, person);

person2.name = "Bob";
console.log(person);  // {name: Alice}
console.log(person2); // {name: Bob}
```

``` js
var person  = { id: 1, name: {firstName: "Alice"} },
    person2 = Object.assign({}, person);

person2.id = 2;
person2.name.firstName = "Bob";

console.log(person);  // {id: 1, name: {firstName: "Bob"}}
console.log(person2); // {id: 2, name: {firstName: "Bob"}}
```

## Object.is()

[ES6]

Permet de comparer deux objets strictement.  Cette méthode se comporte de la même façon que `===` sauf pour `NaN` et `+0/-0`.

``` js
console.log(+0 === -0);                         // true
console.log(Object.is(+0, -0));                 // false

console.log(NaN === NaN);                       // false
console.log(Object.is(NaN, NaN));               // true

console.log(Number.NaN === Number.NaN);         // false
console.log(Object.is(Number.NaN, Number.NaN)); // true

console.log(NaN === Number.NaN);                // false
console.log(Object.is(NaN, Number.NaN));        // true
```

## Object.getOwnPropertySymbols()

[ES6]

Permet de récupérer les propriétés d'un objet qui sont un symbole.  
Ne retourne que les symboles définis sur l'objet et non sur le prototype (!= classe).

``` js
const PRIVATE_VALUE = Symbol('privateValue');

var obj = {
  [PRIVATE_VALUE]: "foo",
  publicValue: "bar"
};

console.log(Object.getOwnPropertyNames(obj));   // [ "publicValue" ]
console.log(Object.getOwnPropertySymbols(obj)); // Array [ Symbol(privateValue) ]
```

---

## Object.values()

[ES8]

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

## Object.entries()

[ES8]

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

## Object.getOwnPropertyDescriptors()

[ES8]

Retourne toutes les propriétés de l'objet et leur attributs. Les attributs possibles sont: `value`, `writable`, `get`, `set`, `configurable` et `enumerable`.

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