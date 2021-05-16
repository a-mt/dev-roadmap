---
title: Les bases
category: Web, JavaScript, Library, Typescript
---

{% raw %}

## Qu'est-ce que Typescript

* Typescript est un superset de Javascript, qui ajoute une fonctionnalité supplémentaire: le typage des données.  
  Javascript est typé dynamiquement: on ne sait le type d'une variable que lorsqu'on lui donne une valeur, et on peut changer son type à tout moment. Typescript permet de spécifier le type d'une variable, de sorte que les erreurs puissent être identifiées au moment d'écrire le code et de compiler, et non au moment de l'execution du code. On passe plus de temps à coder et moins de temps à debugger.

  La spécification du type est facultative: lorsqu'on ne spécifie pas le type d'une variable, Typescript le déduit du type de valeur assigné. On peut donc juste renommer un fichier .js en .ts et bénéficier des vérifications de type.

  ![](https://i.imgur.com/BdLwMQg.png)

  ![](https://i.imgur.com/2KiROIH.png)

* Typescript est un langage de programmation open-source développé et maintenu par Microsoft, les fonctionnalités sont améliorées en permanence. Il s'agit également du language de programmation à la base d'Angular et il est supporté par React et Vue.

* Typescript a un [playground](https://www.typescriptlang.org/play) pour le tester en ligne.

## Installer

* Installer node.js

  ```
  node -v
  ```

* Installer typescript

  ```
  npm install -g typescript
  tsc -v
  ```

## Compiler

* Compiler un fichier .ts en .js  
  On peut omettre l'extension de fichier

  ```
  tsc main.ts
  ```

  Pour éviter les erreurs du type "cannot redeclare block-scope variable 'message'" (parce la variable est déclarée dans le .js et le .ts): on peut faire en sorte que typescript considère le fichier comme un module est non un script en ajoutant un export vide en début de fichier:

  ``` js
  // main.ts
  export {}

  let message = 'Hello World';
  console.log(message);
  ```

* Typescript peut être compilé vers diverses versions d'EcmaScript. Par défaut, typescript compile en ES3, une ancienne version d'EcmaScript. Les templates litterals sont donc compilés en concaténation de chaîne.

  ``` js
  // main.ts
  `Hello ${person}, today is ${date.toDateString()}!`;
  ```

  ``` js
  // main.js
  "Hello " + person + ", today is " + date.toDateString() + "!";
  ```

  On peut spécifier une version EcmaScript différentes avec l'option `--target`

  ```
  tsc --target es2015 main.ts
  ```

## Configurer

* Typescript a différents paramètres de vérification de type qui peuvent être activés ou désactivés.  
  L'option `--scrict` en ligne de commande ou `"strict" : true` dans le fichier  [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) les active tous.

* Les deux options paramètres les plus importants sont:

  * `noImplicitAny`: lever une erreur si le type implicitement déduit est `any`  
    Typescript déduit le type d'une variable au moment de la déclaration de cette variable.  
    Et s'il ne le peut pas, par défaut, il déduit que la variable peut avoir n'importe quel type de données.

  * `strictNullChecks`: rendre obligatoire la déclaration explicite de `null` et `undefined`.  
    Par défaut, les valeurs `null` et `undefined` peuvent être assignées sur tout type de variable.

---

## Fondamentaux

### Types primitifs

* On spécifie le type d'une variable au moment de sa déclaration, en ajoutant deux-point (:) et le type de la variable après son nom:

  ``` js
  let isBeginner: boolean = true;
  let total: number = 0;
  let msg: string = '';
  ```

* Les types primitifs de Typescript sont `string`, `number`, `bigint`, `boolean`, `symbol`, `null`, ou `undefined`.

  ``` js
  const oneHundred: bigint = BigInt(100);
  const anotherHundred: bigint = 100n;
  ```

### Union

* Si une variable accepte différents types, on utilise l'opérateur d'union `|`:

  ``` js
  let multiType: number | boolean;
  multiType = 20;
  multiType = true;
  ```

### Type littéral

* En plus des types `string` et `number`, on peut spécifier des chaînes de caractères ou nombres spécifiques.

  ``` js
  let alignment: "left" | "right" | "center";

  alignment = "centre"; // Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.
  ```

### typeof

* On peut capturer le type d'une autre variable avec `typeof`:

  ``` js
  let foo = 123;
  let bar: typeof foo;

  bar = 456;   // Ok
  bar = '789'; // Err: Type 'string' is not assignable to type 'number'
  ```

  Ce n'est pas nécessaire pour récupérer le type d'une propriété d'un type.

### keyof

* On peut capturer le nom des propriétés d'un type avec `keyof`:

  ``` js
  interface Todo {
    id: number;
    text: string;
    due: Date;
  }
  type TodoKeys = keyof Todo; // "id" | "text" | "due"
  ```

  ``` js
  const colors = {
    red: 'reddish',
    blue: 'bluish'
  }

  let color: keyof typeof colors; // "red" | "blue"
  color = 'red';  // Ok
  color = 'blue'; // Ok
  color = 'x';    // Err: Type '"anythingElse"' is not assignable to type '"red" | "blue"'
  ```

### any

* Le type `any` permet de donner n'importe quel type de données à une variable.

  ``` js
  let randomValue: any = 10;
  randomValue = true;
  ```

### null et undefined

* On peut toujours assigner les valeurs `null` et `undefined` à une variable — quel que soit son type.

  ``` js
  let isNew: boolean = null;
  let myName: string = undefined;
  ```

### Inférence

* Si on ne spécifie pas le type de la variable au moment de sa déclaration, Typescript le déduit de la valeur:

  ``` js
  let b = 20;
  //  ^ = let b: number

  b = true; // Type 'true' is not assignable to type 'number'
  ```

  ``` js
  let x = Math.random() < 0.5 ? 10 : "hello world!";
  //  ^ = let x: string | number
  ```

  Si aucune valeur et aucun type n'est spécifié, alors la variable accepte tout type de données (`any`):

  ``` js
  let a;
  //  ^ = let b: any

  a = 10;
  a = true;
  ```

---

## Assertions

### as [type]

* Les assertions de type peuvent être utilisées pour donner des indications sur le type d'une variable. Ces annotations sont enlevées par le compilateur, il n'y a pas de vérification de type au moment de l'execution du JavaScript, elles ne servent qu'au moment de l'écriture du code.

  ``` js
  const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
  ```

  ``` ts
  const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
  const underWater: Fish[] = zoo.filter(isFish) as Fish[];
  ```

### as const

* `as const` permet de convertir un objet en type littéral:

  ``` js
  const config = {
    a: 84595,
    b: 'some string',
    c: {
      items: ['item1', 'item2', 'item3'],
    },
  } as const
  ```

  L'IDE considérera ainsi que les valeurs de l'objet ne peuvent pas être modifiées — ça revient à écrire:

  ``` js
  const config: {
      readonly a: 84595;
      readonly b: "some string";
      readonly c: {
          readonly items: readonly ["item1", "item2", "item3"];
      };
  }
  ```

### unknown

* Plutôt qu'`any`, on peut spécifier le type `unknown`, la seule différence étant qu'il faut spécifier le type de la variable quand on veut accéder à sa valeur — autrement une erreur est affichée dans l'IDE:

  ``` js
  let myVariable: unknown = 10;

  (myVariable as string).toUpperCase();
  ```

### Non null

* Écrire un point d'exclamation (!) après une expresson indique que cette valeur ne peut pas être nulle ou non définit. Tout comme les autres assertions de type, cette assertion ne modifie pas le comportement du code à l'execution.

  ``` js
  console.log(x!.toFixed());
  ```

{% endraw %}