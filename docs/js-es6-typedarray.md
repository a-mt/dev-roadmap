---
title: Tableaux typés
category: Web, JavaScript, ES6
---

Les tableaux JavaScript traditionnels peuvent être agrandis ou réduis dynamiquement et peuvent stocker n'importe quelle valeur.  
ES6 introduit de nouveaux types de tableaux:
* les tampons (*buffers*), avec `ArrayBuffer`
* et les vues (*views*), avec `TypedArray` et `DataView`

---

## ArrayBuffer

Un `ArrayBuffer` est un tampon de mémoire.  
Il est utilisé pour stocker des données binaires de longueur fixe, une image par exemple.

``` js
var buffer = new ArrayBuffer(16);
```

Afin d'accéder à la mémoire contenue dans le tampon, on doit utiliser une vue sous forme de tableau typé ou `DataView`.

---

## TypedArray

Les tableaux typés permettent d'accéder au contenu d'un tampon de mémoire.  
Par exemple, pour créer une vue qui traite le tampon comme un tableau d'entiers signés représentés sur 32 bits :

``` js
var int32View = new Int32Array(buffer);
```

Les éléments du tableau typé peuvent être accédés comme avec un tableau classique, avec les crochets.  
Les méthodes de `Array`, comme `push` et `pop`, n'existent pas sur les tableaux typés.

``` js
for(var i = 0; i < int32View.length; i++) {
  int32View[i] = i * 2;
}
```

Il existe différents tableaux typés possibles:

| Type        | Description
|---          |---
| `Int8Array` | Entier signé (en complément à deux) sur 8 bits
| `Uint8Array` | Entier non signé sur 8 bits
| `Uint8ClampedArray` | Entier non signé sur 8 bits. Ramène les valeurs entre 0 et 255
| `Int16Array` | Entier signé (en complément à deux) sur 16 bits
| `Uint16Array` | Entier non signé sur 16 bits
| `Int32Array` | Entier signé (en complément à deux) sur 32 bits
| `Uint32Array` | Entier non signé sur 32 bits
| `Float32Array` | Nombre flottant sur 32 bits selon la représentation IEEE (7 chiffres significatifs)
| `Float64Array` | Nombre flottant sur 64 bits selon la représentation IEEE (16 chiffres significatifs)

En combinant un même tampon et plusieurs vue de différents types, chacune commençant à un endroit différent dans le tampon, il est possible d'interagir avec des données qui représentent des objets contenant plusieurs types de données. Cela permet entre autres d'intéragir avec des structures de données complexes telles que WebGL, des fichiers de données, des structures C...

``` js
var buffer = new ArrayBuffer(24);

// ... on lit les données dans le tampon ...

var vueId             = new Uint32Array(buffer, 0, 1),
    vueNomUtilisateur = new Uint8Array(buffer, 4, 16),
    vueMontant        = new Float32Array(buffer, 20, 1);
```

NB La méthode `Array.isArray()` renvoie `false` lorsqu'elle est utilisée sur un tableau typé.

---

## DataView

Un `DataView` fournit une interface de bas niveau pour lire et écrire les données d'un `ArrayBuffer`.

``` js
var buffer   = new ArrayBuffer(16),
    fullView = new DataView(buffer),
    idView   = new DataView(buffer,12,4); // 4 octets à partir du 12ème octet

fullView.setInt8(12, 42); // mettre 42 au 12ème octet

console.log(idView.getInt8(0)); // 42
```
