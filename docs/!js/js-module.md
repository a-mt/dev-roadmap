---
title: Modules
category: Web, JavaScript, ES6
---

## Legacy: Utiliser des objets

En ES5, pour créer un module, on créerait un objet auquel on ajouterait différentes méthodes, en encapsulant la déclaration dans une IIFE pour que les variables du module n'entrent pas en conflit avec d'autres parties du code.

``` js
var StringUtils = StringUtils || {};

(function(){
  const re = /[^-a-z0-9]/g;

  // Remove all characters that aren't alphanumerics
  StringUtils.normalize = function(str) {
    return str.replace(re, '');
  };

  // Check if the string is normalized
  StringUtils.isValid = function(str) {
    return !re.test(str);
  }
})();
```

---

## Export

ES6 permet désormais à un script d'exporter des variables et fonctions au choix, et sans avoir à encapsuler la déclaration avec un objet / IIFE, en utilisant le mot-clé `export`.  
Il existe deux manières d'exporter une variable / fonction / classe:

* En préfixant `export` devant la déclaration

  ``` js
  export const normalize = (string) => {
    return str.replace(re, '');
  }
  export const isValid = (string) => {
    return !re.test(str);
  }
  ```

* Ou en définissant une liste d'export en fin de fichier

  ``` js
  const normalize = (string) => {
    return str.replace(re, '');
  }
  const isValid = (string) => {
    return !re.test(str);
  }
  export { normalize, isValid };
  ```

## Import

On peut ensuite importer ce qui a été exporté — sur le même principe que les imports en C, Java ou Python.  

``` js
import { normalize, isValid } from "./stringUtils";

console.log(normalize("ésfe'fxc"));
```

On peut récupérer un export sous un autre nom:

``` js
import { normalize as normalizeMath } from "math";
```

Note: Avec Node.js, on utilisait `require()` pour cet usage.
`import` permet désormais choisir les parties du module à charger, ce qui permet d'économiser du temps et de la mémoire.

### Script type

Pour utiliser les instructions `import` et `export` côté navigateur, il faut inclure le script comme module:

``` js
<script type="module" src="filename.js"></script>
```

---

## Export par défaut

On peut exporter une valeur par défaut en ajoutant le mot-clé `default`.  
Cette syntaxe est généralement utilisée si une seule valeur est exportée.

* Devant le déclaration

  ``` js
  export default const normalize = (string) => {
    return str.replace(re, '');
  }
  ```

* En fin de fichier

  ``` js
  const normalize = (string) => {
    return str.replace(re, '');
  }
  export default normalize;
  ```

## Import par défaut

Pour importer la valeur par défaut, on enlève les crochets:

``` js
import n from "./stringUtils";

console.log(n("ésfe'fxc"));
```

---

## Importer tout

On peut importer directement tout le contenu accessible dans un espace de nom:

``` js
import * as StringUtils from "./stringUtils"

StringUtils.normalize("hello World!");
```

----

## Redirection entre modules

On peut ré-exporter d'autres modules avec `from`.


``` js
export * from './foo';
```

``` js
export { default } from './foo';
```

``` js
export { default as bar } from './foo';
```
