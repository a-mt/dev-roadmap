---
title: Les objets
category: Web, JavaScript
---

Un objet JavaScript est un container pour un ensemble de variables auxquelles on peut accéder via l'objet, les variables d'un objet, c'est ce qu'on appelle des *propriétés*.

## Définir un objet

Pour définir un objet, on utilise des crochets.

``` js
var monObjet = {};
```

Des définir des propriétés dans cet objet, on sépare le nom de la variable (la *clé*) de la valeur en utilisant deux-points: `:`.  
Pour définir plusieurs propriétés, on les sépare par une virgule: `,`.

``` js
var monObject = {
  key1: "value1",
  key2: "value2"
};
``` 

### Unicité

Une clé est unique par objet. Si une clé est redéfinie, alors elle écrase l'ancienne.

``` js
var monObjet = {
  key1: "value1",
  key2: "value2",
  key1: "value3"
}
console.log(monObjet); // { key1: "value3", key2: "value2" }
```

### Nommage

La clé doit obligatoirement être entourée de quotes si elle ne respecte pas les conventions de nommage d'une variable (nombres, lettres et underscore) — si elle contient des espaces par exemple. Elles sont optionnelles sinon.

``` js
var info = {
    "full name": "Firstname Lastname",
    email      : "bob@exemple.com"
};
```

### Type des valeurs

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

### Déclaration de propriété: Version abbrégée

On peut ommetre la clé de la propriété lorsqu'on crée une propriété à partir d'une valeur [ES6].  
Le nom de la propriété sera égal au nom de la variable, et la valeur de la propriété à la valeur de la variable.

<ins>Version normale</ins>:

``` js
var a = 'foo',
    b = 'bar';

var obj = {
  a: a,
  b: b
}; // {a: 'foo', b: 'bar'}
```

<ins>Version abbrégée</ins>:

``` js
var obj = {a, b}; // {a: 'foo', b: 'bar'}
```

### Déclaration de méthode: Version abbrégée

On peut ommetre le mot-clé `function` pour déclarer une fonction [ES6].

<ins>Version normale</ins>:

``` js
var obj = {
  sayHello: function() {
    return "Hello";
  }
};
```

<ins>Version abbrégée</ins>:

``` js
var obj = {
  sayHello() {
    return "Hello";
  }
};
```

### Clé dynamique

Des noms de propriétés dynamiques peuvent être utilisées lors de la création d'objets [ES6]

``` js
const obj = {
  prop_0        : 1,
  ['prop_' + 42]: 42
}
console.log(obj.prop_0);
console.log(obj.prop_42);
```

---

## Lire une propriété

Pour accéder à la valeur d'une propriété, on utilise des crochets:

``` js
console.log(info["email"]);     // bob@exemple.com
console.log(info["full name"]); // Firstname Lastname
```

``` js
var myvar = "email";
console.log(info[myvar]);      // bob@exemple.com
```

### Version abbrégée

On peut utiliser la notation abbrégée, avec un point (*dot notation*), lorsque la clé respecte les conventions de nommage d'une variable:

``` js
console.log(info.email);       // bob@exemple.com
```

### Temps d'accès

L'accès aux valeurs d'un objet est constant. Qu'on accède à la valeur d'un objet qui possède 5 propriétés ou 1 000 000, le temps d'accès reste le même. Ce n'est pas le cas pour les tableaux, ce qui rend les objets particulièrement intéressant.

### Tout est objet

En JavaScript tout est objet dans une certaine mesure. C’est à dire que tous les types de données sont constitués de clé/valeur, même les chaînes de caractères. Ainsi pour récupérer la longueur d’une chaîne de caractère, on récupère la valeur de `length`:

``` js
console.log("Hello World".length);
```

---

## Ajouter une propriété

On peut ajouter ou modifier la valeur d'une propriété directement:

``` js
info.telephone = "0440404040";
```

## Supprimer une propriété

Pour supprimer une propriété, on utilise le mot-clé `delete`

``` js
delete someObject.someKey;
```

---

## Lister les propriétés

On peut utiliser `for .. in` pour boucler sur les propriétés d'un objet.

``` js
for(k in someObject) {
  if(someObject.hasOwnProperty(k)) {
    console.log(k + ' = ' + someObject[k]);
  }
}
```

### Ordre

Les clés ne sont pas ordonnées, on ne peut pas être certain de les récupérer dans l'ordre dans lesquelles elles sont écrites. Si l'ordre est important, il est nécessaire d'utiliser un tableau — comme ci-dessous:

``` js
var links = [
    {"twitter"  : "twitter.com"},
    {"facebook" : "facebook.com"},
    {"youtube"  : "youtube.com"}
];
```

---

## Valeur vs reference

Les valeurs composées (objets, tableaux et fonctions) sont toujours passées par *référence*, leur contenu n'est pas dupliqué en mémoire: si on affecte un objet à une deuxième variable, les deux variables utilisent le même emplacement mémoire. En modifiant une référence, on modifie également l'originale.

<ins>Exemple</ins>:

``` js
var obj  = {name: "Bob"},
    obj2 = obj;

obj.name = "Alice";
console.log("obj:", obj);   // { name: "Alice" }
console.log("obj2:", obj2); // { name: "Alice" }
```

<ins>Pour éviter ça</ins>:  
Pour créer deux valeurs indépendantes, il est nécessaire de créer explicitement une copie de la variable.

``` js
var obj  = {name: "Bob"},
    obj2 = Object.assign({}, obj);

obj.name = "Alice";
console.log("obj:", obj);   // { name: "Alice" }
console.log("obj2:", obj2); // { name: "Bob" }
```
