---
title: Classe
category: Web, JavaScript, ES6
---

## Définir une classe

<ins>Version ES5</ins>:

En ES5, les objets sont initialisés à partir d'un constructeur qui est une fonction (en utilisant la valeur `this`).

``` js
function SpaceShuttle(targetPlanet){
  this.targetPlanet = targetPlanet;
}
SpaceShuttle.prototype.about = function() {
  return "Name: " + this.targetPlanet;
}
var planet = new SpaceShuttle('Jupiter');
console.log(planet.about()); // Name: Jupiter
```

ES6 ajoute la syntaxe `class`.

<ins>Version ES6</ins>:

`class` effectue la même chose qu'une fonction constructeur mais permet d'organiser le code plus facilement.

``` js
class SpaceShuttle {
  constructor(targetPlanet){
    this.targetPlanet = targetPlanet;
  }
  about(){
    return "Name: " + this.targetPlanet;
  }
}
const planet = new SpaceShuttle('Jupiter');
console.log(planet.about()); // Name: Jupiter
```

Contrairement aux fonctions, les classes ne peuvent pas être utilisées avant d'être déclarée (pas de hoisting).  
Elles ne peuvent pas non plus être redéfinies/écrasées - une erreur est levée.

## Méthodes privées

Il n'existe pas de syntaxe pour créer des méthodes et propriétés privées.  
En général, on préfixe d'un `_` les propriétés auxquelles on est pas censé accéder directement.

## Getter et setter

Pour rappel, une fonction getter permet de récupérer une valeur privée et une fonction setter permet de modifier une valeur privée.
En ES6, le fait de déclarer une fonction comme getter ou setter permet de récupérer/modifier la valeur comme s'il s'agissait d'une propriété (publique) et non pas d'un appel de fonction.

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
```

``` js
const mybook = new Book('Alice');
console.log(mybook.writer); // appel à get writer(): Alice
mybook.writer = 'Bob';      // appel à set writer()
console.log(mybook.writer); // appel à get writer(): Bob
```

## Méthodes statiques

La mot-clé `static` permet de définir une méthode statique pour une classe, c'est à dire une méthode qui appartient à la classe et non à l'objet.

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

* Une méthode statique ne peut pas être appelée à partir d'une instance
* `this` est indéfini à l'intérieur d'une méthode statique

## Héritage

Le mot-clé `extends` permet de créer une classe qui hérite d'une autre.

``` js
class Animal {
    describe() {
        return "I'm a " + this.constructor.name;
    }
}

class Bird extends Animal {
    
}

var canary = new Bird();
console.log(canary.describe()); // I'm a Bird
```

Si on déclare un constructeur dans une classe fille, on doit appeler `super()` avant de pouvoir utiliser `this`.

``` js
class Animal {
    constructor(name) {
        this.name = name;
    }
    describe() {
        return "I'm a " + this.name;
    }
}

class Bird extends Animal {
    constructor(name) {
        super();
        this.name = this.constructor.name + ' (' + name + ')';
    }
}

var canary = new Bird("canary");
console.log(canary.describe()); // I'm a Bird (canary)
```

Il est possible d'appeler une méthode parente avec `super.nomMethode()`.

``` js
class Animal {
    describe() {
        return "I'm a " + this.constructor.name;
    }
}

class Bird extends Animal {
    describe() {
        return super.describe() + ' so I can fly';
    }
}

var canary = new Bird();
console.log(canary.describe()); // I'm a Bird so I can fly
```

## toString

Comme pour un objet crée classiquement, la méthode `toString` est appelée quand on caste un l'objet en chaîne de caractère.

``` js
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  toString() {
    return '[X=' + this.x + ', Y=' + this.y + ']'
  }
}

console.log('The point is ' + new Point(2, 10)) // The point is [X=2, Y=10]
```

## Mixin

<ins>Définir une mixin</ins>:

``` js
var flyMixin = Base => class extends Base {
  fly() {
    return "I'm flying !";
  }
}
```

<ins>Ajouter une mixin à une classe</ins>:

Pour ajouter une mixin à une classe, il faut appeler la mixin sur le nom de la classe.  
Le résultat obtenu est une nouvelle classe contenant les méthodes de classe d'origine et celles de la mixin.

``` js
class Bird {
    describe() {
        return "I'm a Bird";
    }
}
console.log(flyMixin(Bird).prototype); // {fly: function(), __proto__: { describe: function() }}
console.log(Bird.prototype);           // {describe: function()}
```

Pour créer une classe qui hérite directement des méthodes de la mixin, il suffit de lui faire hériter d'un objet quelconque auquel on a ajouté la mixin:

``` js
class Bird extends flyMixin(Object) {
  describe() {
    return "I'm a Bird";
  }
}
console.log(Bird.prototype);           // {describe: function(), __proto__: { fly: function() }}

var canary = new Bird();
console.log(canary.fly()); // I'm flying
```
