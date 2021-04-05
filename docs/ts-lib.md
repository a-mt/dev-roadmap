---
title: Typescript: Fichiers de définition
category: Web, JavaScript, Library, Typescript
---

## Declare

* Si ont veut utiliser une librairie, cette librairie n'a pas nécessairement été écrite en TypeScript. On peut ne disposer que du JavaScript, et malgré tout vouloir bénéficier des vérifications TypeScript dans notre code. Pour ce faire, on peut écrire la définition d'un code qui existe ailleurs avec le mot-clé `declare`.

  ``` js
  foo = 123; // Error: `foo` is not defined
  ```

  ``` js
  declare var foo: any;
  foo = 123; // allowed
  ```

## .d.ts

* Par convention, un fichier `.d.ts` est un fichier de déclaration. Toute définition dans ce fichier doit être précédée du mot-clé `declare`.

* Pour créer les fichiers de déclaration d'une librairie, il y deux possibilités:

  1. on crée un répertoire `node_modules/@types/[libname]`. Les fichiers de déclaration doivent réfléter la disposition des fichiers de la librairie. Par exemple, si on a:

      ``` js
      myLib
        +---- index.js
        +---- foo.js
        +---- bar
               +---- index.js
               +---- baz.js
      ```

      Alors les fichiers de déclaration seront:

      ``` js
      @types/myLib
        +---- index.d.ts
        +---- foo.d.ts
        +---- bar
               +---- index.d.ts
               +---- baz.d.ts
      ```

  2. on crée un fichier `[libname].d.ts` à la racine.

## Definitely Typed

* [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) est un repo Github où sont publiés les fichiers de déclaration des librairies les plus populaires — comme jQuery, Moment ou Lodash.

  [DefinitelyTyped Contribution guide](http://definitelytyped.org/guides/contributing.html)

* Les packages de DefinitelyTyped sont publiés automatiquement sur NPM sous l'organisation `@types`. Par exemple, pour récupérer la déclaration de jQuery:

  ``` txt
  npm install @types/jquery --save-dev
  ```

  Après l'installation, aucune configuration n'est nécessaire, on peut juste l'utiliser. 

* Pour que Typescript ne prennent en compte que les types qu'on veut, il faut l'expliciter dans le fichier `tsconfig.json`:

  ``` json
  {
      "compilerOptions": {
          "types" : [
              "jquery"
          ]
      }
  }
  ```

## lib.d

* Le fichier `lib.d.ts` est un fichier de déclaration livré avec l'installation de Typescript. Il contient les déclarations de diverses variables présentes dans le moteur JS et le DOM (ex `window`, `document`, `math`), ainsi que leurs interfaces (ex `Window`, `Document`, `Math`). On peut donc utiliser ces éléments dans TypeScript sans avoir à les définir au préalable.

  L'option `--noLib` exclut l'inclusion automatique de `lib.d.ts`, tandis que `--lib` provoque l'inclusion de fichiers lib supplémentaires.

  ``` txt
  tsc --target es5 --lib dom,es6
  ```

  [Lib option](https://basarat.gitbook.io/typescript/type-system/lib.d.ts#lib-option)

Pour aller plus loin:  
[Declaration Reference](https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html)


