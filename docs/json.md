---
title: Json
category: Web
---

JSON (JavaScript Object Notation) est un format de représentation de données.
- JSON doit son origine à la syntaxe des objets JavaScript et est resté très proche à cette syntaxe.
- Il est pris en charge par de nombreux langages : le JavaScript mais aussi le C, Ruby, PHP, Python et Perl.
- C'est un format de texte qui permet de partager facilement des données entre ordinateurs (serveur-serveur, serveur-client) indépendemment du langage utilisé.
- JSON utilise un formatage minimal, ce qui le rend plus petit, plus facile à lire, et plus facile à convertir en une structure de données tel que le XML.

<ins>Exemple de document JSON</ins> :

``` json
{
  "database": {
    "username": "admin",
    "socket": "/var/tmp/database.sock", 
    "options": {
      "use_utf8": true
    }
  },
  "memcached": {
    "host": "10.0.0.99"
  },
  "workers": [
    {
      "host": "10.0.0.101", 
      "port": 2301
    }, 
    {
      "host": "10.0.0.102", 
      "port": 2302
    }
  ]
}
```

JSON supporte différents types de données: chaînes de caractères, nombres, booléens, objets, listes et null.

[Specs JSON](http://json.org/) (contient la liste complètes des langages supportant le JSON)

---

## Structure

En JSON tous les espaces, tabulations et retours à la ligne sont optionnels, ils ne sont là que pour rendre la lecture plus facile pour un humain.
Des délimiteurs permettent d'indiquer le début et la fin d'un objet (`{}`) ou d'une liste (`[]`).
Les différents éléments de cet ensemble sont séparés par des virgules (`,`).

Un document JSON est nécessairement encodé en UTF-8, UTF-16 ou UTF-32.

---

## Objets

Un objet JSON est délimité par des accolades et se constitue d'une liste de clés/valeurs séparées par des virgules.
Les clés et valeurs sont séparées par deux-points.

* Les clés JSON sont obligatoirement entourées de double-quotes et peuvent contenir n'importe quels caractères (y compris traits d'union, espaces et caractères spéciaux). En général, elles ne contiennent que des lettres et underscores pour que le JSON puisse être convertit et soit facilement accessible dans tous les langages.
* Les valeurs JSON peuvent être de type texte, nombre, objet, liste, booléan ou null.

``` json
{
  "cle": "valeur"
}
```

Une fois le JSON parsé, on accède aux valeurs via les clés :

``` js
// JS
console.log(variable.cle);
```

Un objet est non ordonné : il n'est pas garantit qu'une fois convertit dans un autre langage, les clés soient dans le même ordre que celui écrit dans le document JSON. Si l'ordre est important, alors il faut utiliser une liste.

---

## Listes

Une liste JSON est délimitée par des crochets et se constitue d'une liste de valeurs séparées par des virgules.

``` json
[ "Alice", "Bob", "Carole" ]
```

Une fois le JSON parsé, on accède aux valeurs via les index :

``` js
// JS
console.log(variable[0]);
```

### Liste imbriquée

Les items d'une liste peuvent être de n'importe quel type, y compris des listes et des objets.

``` json
[1.1, [2.1, 2.2], [[3.1, 3.2, 3.3]]]
```

### Structure imbriquée

Pour obtenir une liste ordonnée de clé/valeur :

``` json
{
  "links": [
    {"twitter"  : "twitter.com"},
    {"facebook" : "facebook.com"},
    {"youtube"  : "youtube.com"}
  ]
}
```

---

## Nombres

Les nombres peuvent être soit entiers soit réels. La notation scientifique est acceptée.

``` json
{
    "entier"  : 30,
    "reel"    : 30.2,
    "exposant": 1.2e+34
}
```

---

## Booléens

``` json
{
  "Vrai": true,
  "Faux": false 
}
```

---

## Texte

Le texte est entourée de double-quotes (`""`).  
Les double-quotes à l'intérieur des double-quotes sont échappées d'un antislash (`\"`).  
Le texte peut contenir des caractères spéciaux (sauf les caractères de contrôle) et des caractères Unicode (4 chiffres).

``` json
{
  "texte": "Ceci est une quote \". \nCe texte contient plusieurs lignes. \nEt un caractère Unicode \u263A"
}
```

---

## Valeur nulle

``` json
{
  "valeur": null
}

```

---

## JSON vs Objet JS

- En JS, les double-quotes autour des clés ne sont pas obligatoires : elles ne deviennent obligatoires que lorsque les clés ne contiennent pas que des alphanumériques ou underscore (`_`).
  En JSON, elles sont toujours obligatoires.

- En JS, les valeurs peuvent être de n'importe quel type existant en JavaScript.
  Or tous les types JavaScript ne sont pas supportés en JSON - par exemple les dates et les fonctions.

### Convertion JS/JSON

Objet JavaScript &rarr; JSON

``` js
var info = {
    full_name : "Firstname Lastname",
    born      : new Date(2000, 01, 02)
};
var json = JSON.stringify(info);
```

JSON &rarr; Objet JavaScript

``` js
var json = `{
    "full_name" : "Firstname Lastname",
    "born"      : "2000-01-02"
}`;
var info = JSON.parse(json);
info.born = new Date(info.born);
```

Les anciens navigateurs ne supportent pas tous `JSON.stringify` et `JSON.parse`.  
jQuery permet de parser et créer du JSON, et de s'affranchir des problèmes de compatibilité avec les anciens navigateurs.
