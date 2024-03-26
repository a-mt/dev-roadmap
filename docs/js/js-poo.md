---
title: Programmation Orientée Objet
category: Web, JavaScript
---

La Programmation Orientée Objet est une approche en informatique qui consiste à utiliser les objets pour encapsuler un ensemble de données (des variables) et de traitements (des fonctions).

Les variables d'un objet sont appelées ses *propriétés*.  
Les fonctions d'un objet sont appelées ses *méthodes*.

## this

Le mot-clé `this` agit comme un placeholder qui désigne l'objet ayant appelé la méthode d'un objet.  
Autrement dit, si on exécute `myCar.getInfo()`, `this` vaut `myCar`.

``` js
var myCar = {
    brand    : "Toyota",
    color    : "blue",
    numDoors : 4,
    getInfo  : function() {
      return this.color + " " + this.brand + " (" + this.numDoors + " doors)";
    }
};
console.log(myCar.getInfo());
```

---

## Constructeurs d'objet

Bien souvent, il est nécessaire de créer des objets similaires, qui partagent la même structure — les mêmes méthodes, les mêmes propriétés, mais pas forcemment les même valeurs de propriété: `myCar` et `yourCar` par exemple. Toutes les voitures ont une marque, une couleur, un nombre de porte, etc, mais pas toutes n'ont pas les mêmes.

Les *constructeurs* sont des fonctions qui permettent des créer des objets — elles définisssent les propriétés et les méthodes qui appartiendrons à l'objet. On peut considérer un constructeur comme un *modèle* pour créer de nouveaux objets.
Par convention, on nomme les constructeurs avec une majuscule en première lettre pour les distinguer des fonctions qui ne sont pas des constructeurs.

On utilise le mot-clé `this` pour définir les valeurs de l'objet.  
Le mot-clé `new` indique à JavaScript de créer un objet à partir du constructeur, et de d'affecter `this` à la variable.


``` js
function Car() {
  this.brand   = "Toyota";
  this.color   = "blue";
  this.numDoor = 4;
}
console.log(new Car()); // { brand: "Toyota", color: "blue", numDoor: 4 }
```

Pour créer des objets plus facilement, on peut utiliser les paramètres.

``` js
function Car(brand, color) {
  this.brand   = brand;
  this.color   = color;
  this.numDoor = 4;
}
var myCar = new Car("Toyota", "red");
```

Les objets crée peuvent être utilisés comme n'importe quel objet - on peut accéder aux valeurs, les modifier, en ajouter, invoquer des fonctions, etc.

``` js
var myCar = new Car();
myCar.color = "red";
console.log(myCar.color);
```

Les objets crée via `{}` sont dits *littéral* (*litteral object*): on a littéralement écrit le contenu de l'objet.  
Tandis que pour les objets créés à partir d'un constructeur, on parle d'*instance* de classe/de constructeur.

---

## Propriétés privées

Pour que seul la fonction/l'objet ait accès à une variable en lecture et en écriture, on utilise une variable locale au lieu de `this`. On dit que la propriété est *privée*, par opposition à une variable accessible à l'extérieur, qui est dite *publique*. On préfixe généralement les propriétés privées avec un `_` pour les repérer facilement.

## Getter

Pour donner accès à la variable en lecture uniquement, on peut créer une méthode publique qui retourne la valeur de la variable. On appelle ces méthodes des *getter*. Leur nom commence généralement par `get`.

``` js
function Car(brand, color) {
  var _brand   = brand,
      _color   = color,
      _numDoor = 4;

  this.getBrand = function() {
    return _brand;
  }
  this.getColor = function() {
    return _color;
  }
  this.getNumDoor = function() {
    return _numDoor;
  }
}
var myCar = new Car("toyota", "red");
console.log(myCar.getColor());
```

## Setter

Un *setter* est une méthode qui permet de modifier la valeur de la variable. Elle permet d'effectuer des contrôles sur le type de données accepté, voire des calculs pour mettre à jour d'autres variables. Leur nom commence généralement par `set`.

``` js
function Person(name, age) {
  var _name = name,
      _age  = age;

  this.getName = function() {
    return _name;
  }
  this.getAge = function() {
    return _age;
  }
  this.setAge = function(age) {
    if(parseInt(age) != NaN) {
      _age = parseInt(age);
    }
  }
}
```

---

## constructor

La propriété `constructor` est automatiquement ajoutée sur les objets crées à partir d'un constructeur, elle contient le constructeur. Pour récupérer le nom du constructeur de l'objet : `someObject.constructor.name`. Attention néanmoins, la propriété `constructor` peut être réecrite, on ne peut donc pas s'y fier mais l'utiliser pour debugger.

``` js
console.log(myCar.constructor);
```

## instanceof

JavaScript permet de tester si un objet est une instance d'un constructeur donné ou non avec le mot-clé `instanceof`.

``` js
function Car(brand,color) {
  this.brand   = brand;
  this.color   = color;
  this.numDoor = 4;
}
var myCar  = {brand: "Peugeot", color: "white", numDoor: 2},
    myCar2 = new Car("Peugeot", "white");

console.log("myCar:", myCar instanceof Car);   // false
console.log("myCar2:", myCar2 instanceof Car); // true
```

---

## prototype

Toutes les propriétés et méthodes d'un objet lui sont propres, il peut redéfinir ses valeurs sans impacter les autres objets. Cela veut également dire qu'une fois créé, l'objet possède une copie de la méthode définie dans le constructeur: si 12 objets sont définis, il y 12 méthodes en mémoire.

Plutôt que de définir les méthodes sur l'objet, on peut les définir sur le `prototype` du constructeur. Dans ce cas là, l'objet *hérite* de la fonction mais ne la possède pas. En modifiant une valeur du prototype, on la modifie pour toutes les instances.

Attention, un `prototype` n'a pas accès aux méthodes et propriétés privées du constructeur.

``` js
function Car(brand, color) {
  var _brand    = brand,
      _color    = color,
      _numDoors = 4;

  this.getBrand    = function() { return _brand; }
  this.getColor    = function() { return _color; }
  this.getNumDoors = function() { return _numDoors; }
}
Car.prototype.getDescription = function() {
  return this.getColor() + " " + this.getBrand() + " with " + this.getNumDoors() + " doors";
}

var myCar = new Car("toyota", "red");
console.log(myCar.getDescription()); // red toyota with 4 doors
```

La propriété `__proto__` ou `constructor.prototype` retourne le prototype de l'objet.

``` js
console.log(myCar.__proto__); // { constructor: function Car(), getDescription: function getDescription() }
console.log(myCar.constructor.prototype);
```

On peut également utiliser `Object.getPrototypeOf()`

``` js
console.log(Object.getPrototypeOf(myCar));
```

## isPrototypeOf

Le prototype d'un objet est lui-même un objet qui possède des méthodes.  
La méthode `isPrototypeOf` permet de vérifier si un objet hérite d'un prototype donné ou non.

``` js
console.log(Car.prototype.isPrototypeOf(myCar)); // true
```

---

## hasOwnProperty

La méthode `hasOwnProperty` permet de vérifier si une propriété est définie sur l'objet ou si elle est héritée du prototype.

``` js
console.log(myCar.hasOwnProperty("getName"));        // true
console.log(myCar.hasOwnProperty("getDescription")); // fase
```

Puisqu'en JavaScript tout est objet, les chaînes de caractère ont également un prototype — et la majorité des données JavaScript ont un prototype. Ainsi pour lister les propriétés d'un objet et non celles de son prototype, on voit très souvent :

``` js
for(k in someObject) {
  if(someObject.hasOwnProperty(k)) {
    console.log(k + ' = ' + someObject[k]);
  }
}
```

## getOwnPropertyNames

On peut récupérer la liste des propriétés d'un prototype avec `Object.getOwnPropertyNames(prototype)`

``` js
var prototype  = Object.getPrototypeOf(myCar),
    properties = Object.getOwnPropertyNames(prototype);

for(var i=0; i<properties.length; i++) {
  console.log(properties[i]);
}
```

---

## Parent

En programmation, on obéit généralement au principe DRY (*Do not Repeat Yourself*): lorsque du code est répété à plusieurs endroit, les modifications de code (une résolution de bug par exemple) doivent être répercutées à plusieurs endroits — partout où le même morceau de code est utillisé. Cela signifie plus de travail à fournir et plus de risque d'erreurs/oublis.

Quand plusieurs prototypes utilisent une même méthode, utiliser un prototype parent permet de mettre du code en commun et de respecter au mieux le principe DRY. On déclare un prototype générique qui contient les méthodes communes (parent), puis on crée des prototypes enfants via `Object.create()`.

<ins>Prototype parent</ins>:

``` js
function Animal() {}
Animal.prototype.describe = function() {
  console.log("I'm a " + this.constructor.name);
}
```

<ins>Prototype enfant</ins>:

``` js
function Bird() {}
Bird.prototype = Object.create(Animal.prototype);
Bird.prototype.constructor = Bird;

var canary = new Bird();
console.log(canary.describe()); // I'm a Bird
```

``` js
function Dog() {}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

var labrador = new Dog();
console.log(labrador.describe()); // I'm a Dog
```

Le prototype enfant peut ajouter ses propres méthodes, ou redéfinir les méthodes héritées sans impacter les autres prototypes enfants.

``` js
Bird.prototype.fly = function() {
  console.log("I'm flying !");
}
Dog.prototype.bark = function() {
  console.log("I'm barking !");
}
```

---

## Mixin

Utiliser un prototype parent est une méthode qui ne fonctionne pas bien pour les objets non liés, comme un oiseau et un avion. Les deux peuvent voler mais ce sont deux objets indépendants qui ne partagent aucune autre caractéristique.
Une *mixin* permet à des objet d'utiliser des fonctions en commun.

<ins>Définir une mixin</ins>:

``` js
var flyMixin = function(obj) {
  obj.fly = function() {
    console.log("I'm flying !");
  }
}
```

<ins>Ajouter une mixin à un prototype</ins>:

``` js
function Bird() {}
flyMixin(Bird.prototype);

var canary = new Bird();
console.log(canary.fly()); // I'm flying
```

``` js
function Airplane() {}
flyMixin(Airplane.prototype);

var boeing = new Airplane();
console.log(boeing.fly()); // I'm flying
```

---

## Chainage

*Chainer* des méthodes consiste à appeler des méthodes les unes après les autres sur le résultat de la précédente.

<ins>Méthodes non chaînées</ins>:

``` js
monObjet.setName("Name");
monObjet.setFirstName("FirstName");
monObjet.print();
``` 

<ins>Méthodes chainées</ins>:

``` js
monObjet.setName("Name")
        .setFirstName("FirstName")
        .print();
```

Pour pouvoir chainer des méthodes de cette manière, chaque méthode doit retourner l'objet:

``` js
function Person() {
    var _name      = "",
        _firstName = "";

    this.setName = function(name) {
        _name = name;
        return this;
    }
    this.setFirstName = function(firstName) {
        _firstName = firstName;
        return this;
    }
    this.print = function() {
        console.log(_firstName + " " + _name);
        return this;
    }
}
```

---

## toString

La méthode (publique) `toString` est une méthode spéciale qui retourne la valeur de l'objet lorsqu'on le caste en chaîne de caractère.

``` js
function Car(brand,color) {
  this.brand   = brand;
  this.color   = color;
  this.numDoor = 4;
}
var myCar = new Car("toyota", "red");
console.log(""+myCar); // [object Object]
```

``` js
function Car(brand,color) {
  this.brand   = brand;
  this.color   = color;
  this.numDoor = 4;
  this.toString = function() {
    return "[" + this.color + " " + this.brand + " Car]";
  }
}
var myCar = new Car("toyota", "red");
console.log(""+myCar); // [red toyota Car]
```

## Symbol.toPrimitive

Depuis ES6, un objet peut implémenter `@@Symbol.toPrimitive` pour contrôler la valeur de l'objet lorsqu'on le caste en une valeur primitive.

``` js
function Example() {
  this[Symbol.toPrimitive] = function(hint) {
    switch(hint) {
      case "string": return "Hello";
      case "number": return 42;

      // when pushed, most classes (except Date)
      // default to returning a number primitive
      default: return 0;
    }
  }
};

var obj = new Example();
console.log(Number(obj)); // 42
console.log(String(obj)); // "Hello"
console.log(0 + obj);     // 0
console.log("" + obj);    // "0"
```

---

## Les subtilités de this

* Lors de l'exécution d'une méthode:  
  lorsque la fonction d'un objet est appelée, `this` est l'objet appelant

  ``` js
  var someObject = {
    name: "Example",

    someMethod: function() {
      console.log(this); // { name: "Example", someMethod: someMethod() }
    }
  }
  someObject.someMethod();
  ```

* Lors d'une instanciation:  
  lorsqu'on appelle le mot-clé `new` pour appeler une fonction, `this` designe l'objet créé

  ``` js
  function Person(name, age) {
    this.name = name;
    this.age  = age;
    console.log(this);   // { name: 'Bob', age: 20 }
  }
  const user = new Person('Bob', 20); 
  ```

* Lors de l'exécution d'une fonction sans objet:  
  `this` est l'objet de plus au niveau (dans un navigateur, il s'agit de l'objet `window`).

  ``` js
  function someFunction() {
    console.log(this);   // Window object
  }
  someFunction();
  ```

---

## Conserver this

Lorsqu'on exécute une fonction dans un constructeur, il donc faut faire attention à ne pas perdre `this`.  
Pour ce faire, on peut

1. utiliser une variable à laquelle on a affecté `this`:

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

2. utiliser la fonction flèche (depuis ES6)  
   Le `this` à l'intérieur de la fonction flèche est le `this` qui existait au moment où a été déclaré la fonction

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

3. attacher `this` (en utilisant `call`, `apply` ou `bind`)

    ``` js
    function Person(name, age) {
      var self = this;

      this.name = name;
      this.age  = age;

      (function() {
        console.log(this); // {name: 'Bob', age: 20}
        console.log(self); // {name: 'Bob', age: 20}
      }).call(this);
    }
    var user = new Person('Bob', 20);
    ```

## call, apply, bind

Il existe trois méthodes permettant de modifier la valeur de `this`

* `bind` retourne une fonction partielle, qui peut être utilisée en callback

  ``` js
  var fct = mafonction.bind(obj, 'arg1', 'arg1'); 
  fct();
  ```

* `call` appelle la fonction immédiatement

  ``` js
  mafonction.call(obj, 'arg1', 'arg1'); 
  ```

* `apply` appelle la fonction immédiatement mais prend les arguments dans un tableau  
  (Call for Comma, Apply for Array)

  ``` js
  mafonction.apply(obj, ['arg1', 'arg1']); 
  ```

---

## Modules

Des *modules* sont des objets qui mettent à disposition des fonctions, mais qui ne peuvent pas être instanciés.  
Ils permettent de rassembler un ensemble de fonctions sous un même espace de nom.

<ins>Exemple</ins>:

```
var k = Math.pow(2, 8);
```

Dans un navigateur, certains modules sont préchargés.

- [Math](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math)
- [JSON](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/JSON)
- [Intl](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Intl)

---

## Méthode statique

On peut créer méthodes non pas sur le `prototype` du constructeur, mais directement sur le constructeur, c'est ce qu'on appelle une *méthode statique*. Une méthode statique permet de mettre à disposition des méthodes liées à l'objet mais qui ne s'appliquent pas l'objet — un peu sur le même principe qu'un module.

* Une méthode statique ne peut pas être appelée à partir d'une instance.
* `this` est indéfini à l'intérieur d'une méthode statique.

``` js
function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.distance = function(p1, p2) {
  var dx = p1.x - p2.x,
      dy = p1.y - p2.y;
  return Math.hypot(dx, dy);
}

var p1 = new Point(5, 5);
var p2 = new Point(10, 10);

console.log(Point.distance(p1, p2)); // 7.0710678118654755
console.log(p1.distance(p1, p2));    // TypeError: p1.distance is not a function
```
