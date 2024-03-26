---
title: Mémoire tampon
category: Web, JavaScript
---

## ArrayBuffer

La classe `ArrayBuffer` permet de créer une mémoire tampon (*memory buffer*) [ES6].  
On peut l'utiliser pour stocker des données binaires, comme une image.  
Contrairement à un tableau traditionnel, un ArrayBuffer est de taille fixe (il ne peut pas être agrandit) et pour accéder à son contenu, on doit utiliser une vue (*view*): un objet `TypedArray` ou `DataView`.

### Créer un ArrayBuffer

Pour créer un ArrayBuffer, préciser le nombre d'octets en paramètre.

``` js
var buffer = new ArrayBuffer(16);
console.log(buffer.byteLength); // 16
```

---

## DataView

La classe `DataView` permet de créer un objet pouvant lire et écrire les données d'un `ArrayBuffer` (bas niveau).

``` js
var fullView = new DataView(buffer);
fullView.setInt8(12, 42); // 12ème octet = 42
```

### Paramètres optionnels

Le constructeur accepte également les arguments `byteOffset` et `length`, qui précisent la plage mémoire à laquelle la vue a accès. Lorsqu'omis, tout le buffer est récupéré. Si seul `byteOffset` est précisé, la vue récupère le reste du buffer à partir de la position donnée.

```
DataView(buffer [, byteOffset [, byteLength]])
```

``` js
var idView   = new DataView(buffer,12,4); // Récupérer 4 octets à partir du 12ème octet 
console.log(idView.getInt8(0)); // 42
```

[MDN DataView](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)

---

## TypedArray

### Classes

La classe `TypedArray` permet de manipuler un buffer. On ne peut pas l'instancier directement, on instancie une classe enfant — selon le type de données du buffer:

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

### Créer un TypedArray

Par exemple, pour manipuler un tampon comme un tableau d'entiers signés sur 32 bits:

``` js
var int32View = new Int32Array(buffer);
```

### Paramètres optionnels

Le constructeur accepte également les arguments `byteOffset` et `length`, qui précisent la plage mémoire à laquelle la vue a accès. Lorsqu'omis, tout le buffer est récupéré. Si seul `byteOffset` est précisé, la vue récupère le reste du buffer à partir de la position donnée.

```
TypedArray(buffer [, byteOffset [, length]])
```

En combinant un même tampon et plusieurs vues, à différents endroits du tampon, on peut interagir avec des données qui représentent des objets contenant plusieurs types de données. Cela permet entre autres d'interagir avec des structures de données complexes telles que WebGL, des fichiers de données, des structures C...

``` js
var vueId             = new Uint32Array(buffer, 0, 1),
    vueNomUtilisateur = new Uint8Array(buffer, 4, 16),
    vueMontant        = new Float32Array(buffer, 20, 1);
```

[MDN TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)