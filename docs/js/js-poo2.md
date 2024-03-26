---
title: Programmation Orientée Objet - Version ES6
category: Web, JavaScript
---

## Constructeurs d'objet

ES6 ajoute une nouvelle syntaxe pour créer des objets avec un constructeur: `class`.  
`class` effectue la même chose qu’une fonction constructeur mais permet d’organiser le code plus facilement.

Contrairement aux fonctions, les classes ne peuvent pas être utilisées avant d’être déclarée (pas de hoisting).  
Elles ne peuvent pas non plus être redéfinies/écrasées — une erreur serait levée.

<ins>Version ES5</ins>:

``` js
function Car(brand, color) {
  this.brand   = brand;
  this.color   = color;
  this.numDoor = 4;
}
var myCar = new Car("Toyota", "red");
```

<ins>Version ES6</ins>:

``` js
class Car {
  constructor(brand, color) {
    this.brand   = brand;
    this.color   = color;
    this.numDoor = 4;
  }
}
var myCar = new Car("Toyota", "red");
```

---

## Prototype

La syntaxe `class` permet d'ajouter des méthodes au prototype extrêmement facilement.

``` js
class Car {
  constructor(brand, color) {
    var _brand    = brand,
        _color    = color,
        _numDoors = 4;

    this.getBrand    = function() { return _brand; }
    this.getColor    = function() { return _color; }
    this.getNumDoors = function() { return _numDoors; }
  }
  getDescription() {
    return this.getColor() + " " + this.getBrand() + " with " + this.getNumDoors() + " doors";
  }
}

var myCar = new Car("toyota", "red");
console.log(myCar.getDescription()); // red toyota with 4 doors
```

---

## Getter / Setter

Le fait de déclarer une fonction comme getter ou setter avec `get` et `set` permet de récupérer/modifier la valeur comme s’il s’agissait d’une propriété (publique) et non pas un appel de fonction.

``` js
class Book {
  constructor(author) {
    this._author = author;
  }
  get writer(){
    return this._author;
  }
  set writer(author){
     this._author = author;
  }
}

const mybook = new Book('Alice');
console.log(mybook.writer); // appelle get writer() — Alice
mybook.writer = 'Bob';      // appelle set writer("Bob")
console.log(mybook.writer); // appelle get writer() — Bob
```

---

## Parent

La syntaxe avec `class` permet également d'hériter d'un prototype très simplement, en utilisant `extends`.

<ins>Prototype parent</ins>:

``` js
class Animal {
  describe() {
    console.log("I'm a " + this.constructor.name);
  }
}
```

<ins>Prototype enfant</ins>:

``` js
class Cat extends Animal {}

var kitty = new Cat();
console.log(kitty.describe()); // I'm a Bird
```

``` js
class Dog extends Animal {}

var fido = new Dog();
console.log(fido.describe()); // I'm a Dog
```

Il est possible d'appeler une méthode parente avec `super`.

``` js
class Bird extends Animal {
    describe() {
        return super.describe() + ' so I can fly';
    }
}

var coco = new Bird();
console.log(coco.describe()); // I'm a Bird so I can fly
```

---

## Mixin

<ins>Définir une mixin</ins>:

``` js
var flyMixin = (Base) => class extends Base {
  fly() {
    return "I'm flying !";
  }
}
```

<ins>Ajouter une mixin à une classe</ins>:

``` js
class Bird extends flyMixin(Object) {}

var coco = new Bird();
console.log(coco.fly()); // I'm flying
```

---

## Méthodes statiques

La mot-clé `static` permet de définir une méthode statique.

``` js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.hypot(dx, dy);
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);

console.log(Point.distance(p1, p2));
```

---

## Utiliser un symbole comme clé

ES6 ajoute un nouveau type: le symbole.  
On peut l'utiliser comme nom de méthode/de propriété — pas uniquement sur une classe mais pour n'importe quel objet. 

Si on place une classe dans un module et qu'on l'exporte sans exporter les symboles, alors les autres scripts ne pourront pas accéder à ces méthodes/propriétés. Cela permet de mimer une propriété / méthode privée.

``` js
const PRIVATE_VALUE  = Symbol('privateValue');
const PRIVATE_METHOD = Symbol('privateMethod');

class Foo {
  constructor () {
    this.publicValue = 'bar';
    this[PRIVATE_VALUE] = 'baz';
  }

  [PRIVATE_METHOD] () {
    // Can't see or call me without jumping through hoops
  }
}
```
