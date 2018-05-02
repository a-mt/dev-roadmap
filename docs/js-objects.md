---
title: Javascript: Objets, tableaux et fonctions
category: Web, JavaScript
---

## Objets

Un objet JavaScript est un container possédant un ensemble de variables auxquelles on peut accéder via l'objet.

### Définir un objet

Pour définir un objet, on utilise des crochets.

``` js
var monObjet = {};
```

Des définir des variables à cet objet, on sépare le nom de la variable (la *clé*) de sa valeur par deux-points: `:`.  
Pour en définir plusieurs, on les sépare par une virgule: `,`.

``` js
var monObject = {
  key1: "value1",
  key2: "value2"
};
``` 

Une clé est unique par objet. Si une clé est redéfinie, alors elle écrase l'ancienne.

``` js
var monObjet = {
  key1: "value1",
  key2: "value2",
  key1: "value3"
}
console.log(monObjet); // { key1: "value3", key2: "value2" }
```

La clé doit obligatoirement être entourée de quotes si elle contient des caractères autres que des caractères de mot (nombres, lettres et underscore). Elles sont optionnelles sinon.

``` js
var info = {
    "full name": "Firstname Lastname",
    email      : "bob@exemple.com"
};
```

Les objets permettent de structurer nos données de manière intuitive. Plusieurs types de données peuvent être utilisés au sein d'un même objet, et on peut notamment imbriquer des objets et des fonctions.

``` js
var info = {
    name  : {
        first: "Firstname",
        last : "Lastname"
    },
    email    : "bob@exemple.com",
    isActive : true,
    getFullName : function() {
      return this.name.first + " " + this.name.last;
    }
};
```

L'accès aux valeurs d'un objet est constant. Qu'on accède à la valeur d'un objet qui possède 5 entrées ou 1 000 000, le temps d'accès reste le même. Ce n'est pas le cas pour les tableaux, ce qui rend les objets particulièrement intéressants.

### Accéder aux valeurs

Pour accéder à la valeur d'une clé, on utilise des crochets:

``` js
console.log(info["email"]);     // bob@exemple.com
console.log(info["full name"]); // Firstname Lastname
```

``` js
var myvar = "email";
console.log(info[myvar]);      // bob@exemple.com
```

On peut utiliser la notation abbrégée, avec un point (*dot notation*), lorsque la clé ne contient que des caractères de mot:

``` js
console.log(info.email);       // bob@exemple.com
```

En JavaScript tout est objet dans une certaine mesure. C’est à dire que tous les types de données sont constitués de clé/valeur, même les chaînes de caractères. Ainsi pour récupérer la longueur d’une chaîne de caractère, on récupère la valeur de `length`:

``` js
console.log("Hello World".length);
```

### Modifier les valeurs

On peut ajouter ou modifier la valeur d'une clé directement:

``` js
info.telephone = "0440404040";
```

Pour supprimer une clé, on utilise le mot-clé `delete`

``` js
delete someObject.someKey;
```

### Lister les valeurs

``` js
for(k in someObject) {
  if(someObject.hasOwnProperty(k)) {
    console.log(k + ' = ' + someObject[k]);
  }
}
```

Les clés ne sont pas ordonnées, on ne peut pas être certain de les récupérer dans l'ordre dans lesquelles elles sont écrites. Si l'ordre est important, il est nécessaire d'utiliser un tableau.

``` js
var links = [
    {"twitter"  : "twitter.com"},
    {"facebook" : "facebook.com"},
    {"youtube"  : "youtube.com"}
];
```

---

## Tableaux

Un tableau, ou liste, est un objet qui contient une liste ordonnée de valeurs: la première valeur est à l'index 0, la deuxième à l'index 1, etc.  Ces valeurs peuvent être de types différents au sein du même tableau.  
Les tableaux peuvent être aussi gros que nécessaire et peuvent être modifiés très facilement.

### Définir un tableau

On peut utiliser un objet `Array()` ou la syntaxe `[]`.

``` js
console.log(["Valeur1", "Valeur2"]);               // [ "Valeur1", "Valeur2" ]
console.log(new Array("Valeur1", "Valeur2"));      // [ "Valeur1", "Valeur2" ]
```

Créer un tableau vide:

``` js
var arr = [];
```

Créer un tableau avec des valeurs:

``` js
var arr = ["Valeur1", "Valeur2"];
```

Si un argument numérique est passé à `Array`, un tableau de N valeurs est crée.

``` js
var arr = new Array(4);
console.log(arr); // [undefined, undefined, undefined, undefined]
```

### Modifier les valeurs

Assigner une valeur à un index:

``` js
arr[2] = "Valeur3";
```

Ajouter une valeur en fin de tableau:

``` js
arr.push("Valeur4");
```

### Afficher les valeurs

Récupérer la valeur à un index donné:

``` js
console.log(arr[0]); // Valeur1
```

Afficher la liste des valeurs d'un tableau:

``` js
for(var i=0; i<arr.length; i++) {
    console.log(arr[i]);
}
```

### Array-like

Certaines fonctions JavaScript, notamment celles qui accèdent au DOM, retournent des objets qui représentent des tableaux (*Array-like* en anglais) et non de véritables tableaux (objets HTMLCollection ou NodeList par exemple). C'est le cas par exemple de `document.getElementsByTagName` et `document.querySelectorAll`.

``` js
var realArray = ['a', 'b', 'c'];
var arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};
```

Il est possible de boucler sur un objet Array-like (avec un for), en revanche les méthodes des tableaux, comme `push()` ou `slice()` ne sont pas disponibles.

Pour traduire un objet Array-like en tableau: 

``` js
realArray = [].slice.call(arrayLike)
```

---

## Fonctions

Les fonctions sont des objets `Function`. Une fonction contient un bloc de code qui n'est executé que lorsqu'on en demande explicitement l'execution.

### Définir une fonction

``` js
var myFunction = function() {
  console.log("Hello World");
}
```

ou

``` js
function myFunction() {
  console.log("Hello World");
}
```

### Appeler la fonction

On appelle une méthode grâce aux parenthèses: `()`.

``` js
myFunction(); // Hello World
```

``` js
var maVar = myFunction;
maVar();      // Hello World
```

### Entrée/sortie

Il est possible de passer des valeurs en entrée à une fonction, des *paramètres*.  
Une fonction peut retourner une valeur en sortie, un *résultat*.

``` js
function myFunction(x, y) {
  return x * y;
}

var result = myFunction(123, 456);
console.log(result); // 56088
```

<ins>Paramètres en moins</ins>:

On peut appeler une fonction sans tous ses paramètres.  
Les paramètres non définis seront de type `undefined`.

``` js
function myFunction(x, y) {
    console.log("x:", typeof x); // x: number
    console.log("y:", typeof y); // y: undefined
}
console.log(myFunction(1));
```

<ins>Paramètres en trop</ins>:

On peut également appeler une fonction avec des paramètres en plus.  
La fonction peut accéder à la liste complètes des paramètres via `arguments`.

``` js
function myFunction(x, y) {
    console.log(arguments); // { 0: 1, 1: 2, 2: 3 }
};
myFunction(1,2,3);
```

---

## Caveats, tips & tricks

### Valeur vs reference

Les valeurs composées (objets, tableaux et fonctions) sont toujours passées par référence, c'est à dire que leur contenu n'est pas dupliqué en mémoire: lorsqu'on passe un paramètre ou que l'on affecte la valeur d'un objet à un autre objet, les deux variables utilisent le même emplacement mémoire. Cela veut dire qu'en modifiant une référence, on modifie également l'originale.

Exemple 1:

``` js
var arr  = [1,2,3],
    arr2 = arr;

arr2.push(4);
console.log("arr:", arr);   // [1,2,3,4]
console.log("arr2:", arr2); // [1,2,3,4]
```

Exemple 2:

``` js
var arr = [1,2,3];

function doSomething(arr) {
  arr.push(4);
}
doSomething(arr);
console.log(arr); // [1,2,3,4]
```

Pour créer deux valeurs indépendantes, il est nécessaire de créer explicitement une copie de la variable.

``` js
var arr  = [1,2,3],
    arr2 = arr.slice();

arr2.push(4);
console.log("arr:", arr);   // [1,2,3]
console.log("arr2:", arr2); // [1,2,3,4]
```

### Portée d'une variable

La portée d'une variable signifie tout simplement "l'endroit où cette variable est accessible". Les variables crées dans une fonction sont des variables locales, elles n'existent pas en dehors de la fonction. Ce n'est pas le cas des autres blocs de code comme les boucles et les conditions.

``` js
function myFunction() {
  var myVar = "Hello world";
  console.log(myVar);    // Hello World
}
myFunction();
console.log(myVar);      // undefined
```

Si le mot-clé `var` n'est pas utilisé, alors la variable est déclarée dans le contexte global et peut être accédée de n'importe où (en lecture et écriture).

``` js
function myFunction() {
    myVar = "Hello world";
    console.log(myVar);  // Hello World
}
myFunction();
console.log(myVar);      // Hello world
```

De la même façon qu'une variable crée en dehors de toute fonction a une portée globale.

``` js
var myVar = "Hello people";

function myFunction() {
  myVar = "Hello world";
  console.log(myVar);    // Hello world
}

myFunction();
console.log(myVar);      // Hello world
```

Tandis qu'en utilisant `var`, la fonction va déclarer une variable locale totalement indépendante du contexte global.

``` js
var myVar = "Hello people";

function myFunction() {
  var myVar = "Hello world";
  console.log(myVar);    // Hello world
}

myFunction();
console.log(myVar);      // Hello people
```

### Fonctions anonymes

JavaScript permet de créer des fonctions anonymes, c'est à dire des fonctions qui ne sont pas nommées.  
Elles sont souvent utilisées pour des IIFE ou des callbacks.

#### Immediately Invoked Function Expression (IIFE)

Une méthode courante en JavaScript consiste à utiliser des fonctions anonymes invoquées dès qu'elles sont déclarées:

``` js
(function () {
  console.log("IIFE");
})();
// Affiche IIFE immédiatement
```

Cela permet de regrouper des fonctionnalités connexes dans un seul bloc et de rendre les variables inaccesibles à l'extérieur. Cela évite notamment les conflits de nommage de variable entre deux scripts.

#### Callback & lambda

Les fonctions peuvent être passées dans une autre fonction ou renvoyées par une fonction comme n'importe quelle valeur.
On appelle *callback* les fonctions transmises à d'autres fonctions pour être appelées:

``` js
function fonction1(callback) {
  console.log("fonction1");
  callback();
}
function fonction2(){
  console.log("fonction2");
}
fonction1(fonction2);
// Affiche fonction1 fonction2
```

Les fonctions anonymes passées ou retournées entre deux fonctions sont dites *lambda*.

``` js
function fonction1(callback) {
  console.log("fonction1");
  callback();
}
fonction1(function(){
  console.log("fonction2");
});
// Affiche fonction1 fonction2
```

Les callbacks sont souvent utilisés en JavaScript.
Par exemple, la fonction de tri `sort` prend en argument une fonction (donc un callback) qui permet de décider du critère de tri du tableau.

``` js
values.sort(function(a,b){
  return a.localeCompare(b);
});
```

### Hoisting

Le moteur JavaScript va d'abord faire une analyse rapide du script avant d'executer quoi que ce soit. Qu'une fonction soit définie en haut ou en bas du code, elle est connue de JavaScript et peut être utilisée dans tout le fichier. Ce comportement s'appelle le *hoisting*. C'est une bonne pratique de définir les fonctions avant de les appeler.

``` js
console.log(sum(1,2));   // 3

function sum(x, y) {
  return x + y;
}
```

Les variables sont partiellement hoistées, leur déclaration est hoistée mais pas leur assignation.

``` js
console.log(mavar);      // retourne undefined
console.log(inexistant); // lève une erreur "ReferenceError: inexistant is not defined"

var mavar = "Hello";
```

Assigner une fonction anonyme à une variable n'est donc pas hoisté.

``` js
console.log(sum2(1,2));  // lève une erreur "TypeError: sum2 is not a function"

var sum2 = function(x, y) {
  return x + y;
}
```

### Closure

En JavaScript, une fonction a toujours accès au contexte dans lequel elle a été créée. Ce comportement s'appelle une *closure*.

``` js
function hello(name){
  var message = "Hello " + name;

  return function() {
    console.log(message)
  }
}
var helloUser = hello("Bob");
console.log(helloUser()); // Hello Bob
```

Si la valeur de la variable dans la closure est modifiée alors la fonction récupère la nouvelle valeur.

``` js
for (var i = 0; i < 4; i++) {

  setTimeout(function() {
    console.log(i);      // Affiche 4 fois 4
  }, (i+1) * 1000);
}
```

Pour éviter ça, on peut utiliser une IIEF qui prend en paramètre la valeur de la variable dans une nouvelle variable.  
On obtient donc la valeur de la variable d'origine "figée" a un moment donné.

``` js
for (var i = 0; i < 4; i++) {
  (function(j) {

    setTimeout(function() {
      console.log(j);    // Affiche 0 1 2 3
    }, (j+1) * 1000);
  })(i);
}
```

### Currying

L'*arité* d'une fonction est le nombre d'arguments qu'elle requiert. Le *currying* signifie qu'on convertit une fonction d'arité N en une fonction d'arité 1. En d'autres termes, on structure la fonction de telle sorte qu'elle renvoie une autre fonction qui prend l'argument suivant, et ainsi de suite.

Par exemple, le calcul d'une somme de deux nombres est d'arité 2. En utilisant le currying:

``` js
function curried(x) {
  return function(y) {
    return x + y;
  }
}
console.log(curried(1)(2)); // 3
```

Le currying est utile si l'on ne peut pas fournir tous les arguments à une fonction en même temps.

### Fonction partielle

Une fonction partielle peut être décrite comme une fonction à laquelle on a appliqué une partie des arguments et que l'on peut appeler ultérieurement en fournissant le reste des arguments.

En JavaScript, la méthode `bind` permet de lier des arguments à une fonction. Le résultat obtenu est une fonction partielle.

``` js
function sum(x, y, z) {
  return x + y + z;
}

var partialFunction = sum.bind(this, 1, 2);
console.log(partialFunction(3)); // 6
```

### Fonction pure

Une fonction est dite *pure* quand elle suit quelques principes de bases:

* les fonctions sont indépendantes de l'état du programme ou des variables globales.
  Elles ne dépendent que des paramètres qui leur sont fournis pour effecteur leurs traitements.
  Elles ne définissent ni ne modifient des variables globales.
* les mêmes paramètres donnent toujours le même résultat  
* tous les changements effectués sont minimisés et soigneusement contrôlés: par exemple une fonction pure triant un tableau renverra un nouveau tableau, trié, plutôt que d'effectuer le tri sur le tableau en entrée.

La programmation fonctionnelle est une approche en informatique basée sur l'utilisation de fonctions pures.

### Callback Queue

JavaScript est un langage single-thread. Cela signifie que le moteur JavaScript ne peut executer qu'un seul morceau de code à la fois. Cela a pour conséquence que lorsque JavaScript rencontre un morceau de code qui prend beaucoup de temps à traiter, le code situé après est bloqué - il ne peut pas être traité tant que le code qui le précède n'est pas fini.
La solution pour exécuter du code qui prend du temps sans bloquer le processus est d'utiliser un appel asynchrone, c'est à dire un appel en dehors de l'execution linéaire du code (de gauche à droite, de haut en bas).

JavaScript utilise une structure de données qui stocke les informations sur les fonctions actives appelé *Call Stack* (pile d'appels).  
Une fonction qui attend un évènement (clic ou autre) est placée dans un emplacement mémoire particulier appelé *Heap* (tas).  
Lorsque l'évènement que la fonction attend arrive, la fonction est déplacée dans la *Callback Queue* (pile de rappels) par le gestionnaire d'évènements.

La Call Stack est constamment vérifiée par le moteur. Lorsqu'elle est vide, la Callback Queue est vérifiée. Si une fonction est en attente, la première fonction dans la queue est poussée dans la Call Stack et executée.  
Ce processus de vérification est un appelé un *tick* dans la boucle d'évènements.

Cela signifie que toute fonction attendant un évènement ne sera éxecutée qu'une fois la Call Stack finie, même si l'évènement se produit avant. Cela permet de pousser les fonctions qui prennent du temps en dernier pour ne pas bloquer le reste du processus.

``` js
function first() {
  console.log('1');
}
function second() {
  console.log('2');
}
function third() {
  console.log('3');
}

first();
setTimeout(second, 0);
third();

// Affiche 1 3 2
```

---

## Programmation Orientée Objet

La Programmation Orientée Objet est une approche en informatique qui consiste à utiliser les objets pour encapsuler un ensemble de données (des variables) et de traitements (des fonctions).

``` js
var myCar = {
    brand    : "Toyota",
    color    : "blue",
    numDoors : 4,
    getInfo  : function() {
      return this.color + " " + this.brand + " (" + this.numDoors + " doors)";
    }
};
```

Les variables d'un objet sont appelées ses *propriétés*.  
Les fonctions d'un objet sont appelées ses *méthodes*.

Le mot-clé `this` agit comme un placeholder qui désigne l'objet ayant appelé la méthode lorsqu'elle est réellement utilisée.

### Constructeurs d'objet

Bien souvent, il est nécessaire de créer des objets similaires, qui partagent la même structure, les mêmes méthodes: `myCar` et `yourCar` par exemple.
Les objets similaires partagent les mêmes propriétés mais pas forcemment les mêmes valeurs: toutes les voitures ont une marque, une couleur, un nombre de porte, etc, mais pas forcemment les mêmes.

Les *constructeurs* permettent des créer des objets, ils définisssent les propriétés et les comportements qui appartiendront à l'objet. On peut les considérer comme un modèle pour la création de nouveaux objets.
En JavaScript, on utilise des fonctions pour constructeur. Par convention, on nomme les constructeurs avec une majuscule à la première lettre pour les distinguer des fonctions qui n'en sont pas.

On utilise le mot-clé `this` pour définir les valeurs de l'objet. Le mot-clé `new` indique à JavaScript de créer un objet à partir du constructeur, et de récupérer l'objet crée avec `this` en résultat.


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

### Getter, setter

Pour que seul la fonction/l'objet ait accès à une variable en lecture et en écriture, on utilise une variable locale au lieu de `this`. On dit que la propriété est *privée*, par opposition à une variable accessible à l'extérieur, qui est dite *publique*. On préfixe généralement les propriétés privées avec un `_` pour les repérer facilement.

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

### constructor

La propriété `constructor` est automatiquement ajoutée sur les objets crées à partir d'un constructeur, elle contient le constructeur. Pour récupérer le nom du constructeur de l'objet : `someObject.constructor.name`. Attention néanmoins, la propriété `constructor` peut être réecrite, on ne peut donc pas s'y fier mais l'utiliser pour debugger.

``` js
console.log(myCar.constructor);
```

### instanceof

Lorsqu'un objet est crée à partir d'un constructeur, on dit que cet objet est une *instance* de ce constructeur. JavaScript permet de tester si un objet est une instance ou non avec le mot-clé `instanceof`.

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

### prototype

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

### isPrototypeOf

Le prototype d'un objet est lui-même un objet qui possède des méthodes.  
La méthode `isPrototypeOf` permet de vérifier si un objet hérite d'un prototype ou non.

``` js
console.log(Car.prototype.isPrototypeOf(myCar)); // true
```

### hasOwnProperty

La méthode `hasOwnProperty` permet de vérifier si une propriété est définie sur l'objet ou si elle est héritée du prototype.

``` js
console.log(myCar.hasOwnProperty("getName"));        // true
console.log(myCar.hasOwnProperty("getDescription")); // fase
```

Puisqu'en JavaScript tout est objet, les chaînes de caractère ont également un prototype - et la majorité des données JavaScript ont un prototype. Ainsi pour lister les propriétés d'un objet et non celles de son prototype, on voit très souvent :

``` js
for(k in someObject) {
  if(someObject.hasOwnProperty(k)) {
    console.log(k + ' = ' + someObject[k]);
  }
}
```

### getOwnPropertyNames

On peut récupérer la liste des propriétés d'un prototype avec `Object.getOwnPropertyNames()`

``` js
var prototype  = Object.getPrototypeOf(myCar),
    properties = Object.getOwnPropertyNames(prototype);

for(var i=0; i<properties.length; i++) {
  console.log(properties[i]);
}
```

### Parent

Il y a un principe en programmation appelé Do not Repeat Yourself (DRY). Le problème avec du code répété à plusieurs endroit est que toute modification de code, une résolution de bug par exemple, nécessite qu'être répercutée à tous les endroits où ce code est utillisé. Cela signie généralement plus de travail à fournir et plus de risque d'erreurs ou d'oublis.

Quand plusieurs prototypes utilisent une même méthode, utiliser un prototype parent permet de mettre du code en commun et de respecter au mieux le principe DRY. On déclare un prototype générique qui contient les méthodes communes, puis on crée des prototypes enfants via `Object.create()`.

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

### Mixin

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

### Chainage

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

### toString

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

---

## Les subtilités de this

### this

* lorsque la fonction d'un objet est appelée, `this` est l'objet appelant

  ``` js
  var someObject = {
    name: "Example",

    someMethod: function() {
      console.log(this); // { name: "Example", someMethod: someMethod() }
    }
  }
  someObject.someMethod();
  ```

* lorsqu'on appelle le mot-clé `new` pour appeler une fonction, `this` designe l'objet créé. Il s'agit de la valeur retournée.

  ``` js
  function Person(name, age) {
    this.name = name;
    this.age  = age;
    console.log(this);   // { name: 'Bob', age: 20 }
  }
  const user = new Person('Bob', 20); 
  ```

* lorsqu'on utilise `bind`, `this` est l'objet passé en argument

  ``` js
  function maFonction() {
    console.log(this);   // { name: 'Bob', age: 20 }
  }
  var user = { name: 'Bob', age: 20 },
      fct  = maFonction.bind(user);
  fct();
  ```

* si aucun des cas précédents ne s'applique `this` est l'objet global (dans un navigateur, c'est l'objet `window`).

  ``` js
  function someFunction() {
    console.log(this);   // Window object
  }
  someFunction();
  ```

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

* en ES6, quand une fonction est appelée avec `=>`, `this` est le `this` du contexte au moment où l'on crée la fonction

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

### bind, call, apply

Les fonctions `bind`, `call` et `apply` sont utilisées pour attacher `this` à une fonction. La différence est dans l'invocation.

* `call` appelle la fonction immédiatement

  ``` js
  mafonction.call(this, 'arg1', 'arg1'); 
  ```

* `apply` appelle la fonction immédiatement mais prend une liste pour passer les paramètres.  
  Memo: Apply for Array, Call for Comma.

  ``` js
  mafonction.apply(this, ['arg1', 'arg1']); 
  ```

* `bind` retourne une fonction partielle

  ``` js
  var partialFunction = mafonction.bind(this, 'arg1', 'arg1'); 
  ```
