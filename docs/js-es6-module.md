---
title: Modules
category: Web, JavaScript, ES6
---

ES6 permet désormais une création simplifié de modules grâce à `import` et `export`.

## Export

Il est possible de tourner un fichier script en module.  
Ce modules peut exporter des fonctions et des variables grâce au mot-clé `export`.

Plusieurs méthodes d'export sont  possibles:

* Soit en préfixant `export` devant la déclaration de la fonction ou de la variable

  ``` js
  export const capitalizeString = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  export const foo = "bar";
  ```

* Soit en définissant une liste d'export en fin de fichier

  ``` js
  const capitalizeString = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const foo = "bar";

  export { capitalizeString, foo }
  ```

## Import

`import` permet de charger un/des module(s).  
Il s'agit du même principe que les imports en C, Java ou Python:
on importe un fichier qui contient des variables et des fonctions,
que l'on peut alors utiliser (rendu accessibles à l'extérieur via `export`).

Pour importer un ensemble de fonctions ou variables du module:

``` js
import { capitalizeString, foo } from "mymodule"
```

``` js
import { counter } from "./lib/creatures"
```

``` js
import { subtract as foo } from 'math';
```

Ou pour importer directement tout le contenu accessible:

``` js
import * as myModule from "mymodule"

myModule.capitalizeString("hello World");
```

Les variables importées ne peuvent pas être modifiées.

NB En Node.js, on utilisait `require()` pour cet usage.
`import`, contrairement à `require()`, permet choisir les parties du module à charger,
ce qui permet d'économiser du temps et de la mémoire.

## Import/export par défaut

On peut utiliser un export/import par défaut. Cette syntaxe est généralement utilisée si une seule valeur est exportée. Pour un export ou un import par défaut, on n'utilise pas les accolades.

* Export par défaut

  ``` js
  export default const add = (x,y) => {
    return x + y;
  }
  ```

  ``` js
  class Person {
    constructor(name) {
      this.name = name;
    }
    doWork() {
      return work(this.name);
    }
  }
  export default Person;
  ```

* Import par défaut

  ``` js
  import add from "mymodule";
  add(5, 4); // 9
  ```

## Exporter des imports

Il est possible de ré-exporter des modules.

``` js
export {default as foo} from './foo';
export {default as bar} from './bar';
```
