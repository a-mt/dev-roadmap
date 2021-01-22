---
title: Webpack
category: Web
---

## Les bases

### Qu'est-ce que c'est

Webpack est un système de bundle.
Il prend tous les fichiers (SASS, LESS, JS, images, etc) qui sont connectés d'une manière ou d'une autre
et les regroupe en fichiers standard JS, CSS, PNG et JPG — après les avoir compilés/transpilés si nécessaire.

![](https://i.imgur.com/jnmJco7.png)

Une des principale différence entre Webpack et les task runners habituels (tels que Gulp ou Grunt) est le concept de *graphique de dépendence* (*dependency graph* en anglais).
Par exemple,
* `index.js` (fichier en entrypoint) contient `import fooString from ./foo.js`
* `foo.js`contient `export default "foo"`

Avec un task runner, on devrait spécifier manuellement une liste de fichiers JavaScript à concaténer ensemble.  
Webpack utilise un graphique de dépendances: il lit le fichier en entrypoint, l'analyse, recherche les instructions telles que `import`, `export`, `require` et `define`, construit un graphique de dépendance, suit chacune de ces dépendances et à partir de là crée les modules qui formeront le fichier final.
Ainsi, le code qui n'est jamais utilisé sera éliminé de la compilation.

Webpack permet d'inclure non seulement des fichiers JavaScript, mais tout type de fichier (par exemple CSS).

```
import 'style.css'
```

### Ajouter Webpack à un projet

1. Installer Webpack

   ```
   npm install webpack --save-dev
   ```

2. Ajouter la commande `build` dans `package.json`.  
   Cela permettra de lancer Webpack avec la commande `npm run build`

   ```
   "scripts": {
       "build": "webpack"
   }
   ```
   
   Pour éviter d'avoir à relancer cette commande constamment quand vous êtes en train de développer,
   Webpack offre également le mode watch, qui surveille l'état des fichiers et met à jour le fichier compilé
   quand un des fichiers est modifié.

   ```
   "scripts": {
       "build": "webpack",
       "watch": "webpack --watch"
   }
   ```

3. Créer le fichier de configuration de webpack: `webpack.config.js`

    ``` js
    module.exports = {
        entry: "./src/index.js",
        output: {
            filename: "bundle.js",
            path: path.join(__dirname, "build")
        }
    }
    ```
    
    * `entry` est l'entrypoint de votre application
    * `output` est le fichier généré
    * Le `path` est optionnel, il permet de spécifier le répertoire dans lequel le fichier doit être généré.  
      Le chemin doit être absolu.

### Mode Webpack

Webpack peut être lancé en mode `development` ou `production` (par défaut).

``` js
module.exports = { 
    entry: './index.js', 
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    }
}
```

En mode de développement, le build est effectué très rapidement mais le fichier obtenu est moins optimisé qu'en le mode production.

![](https://i.imgur.com/UjhwZrL.png)
![](https://i.imgur.com/oNUiZMo.png)

### Devtools

Comme Webpack regroupe le code, en cas d'erreur la référence au fichier original peut être difficile à retrouver.  
Pour éviter ce problème, il suffit de générer un fichier sourcemap grâce à l'instructions `devtools`.

``` js
module.exports = {  /*...*/  devtool: 'source-map',  /*...*/}
```

| Valeur              | Description
|---                  |---
| `none`              | N'ajoute aucun fichier sourcemap
| `source-map`        | Ajoute un fichier sourcemap séparé, et ajoute une référence vers la bonne section dans le fichier généré.
| `inline-source-map` | Ajoute le sourcemap en ligne dans le fichier généré comme dataURL

---

## Loaders & Rules

Les *loaders* et *rules* permettent de gérer toutes les ressources que vous avez,
quel que soit leur type et même si elles ne dépendent pas les uns des autres.
Par exemple, vous pouvez compiler vos fichiers Sass, compresser vos images et exécuter Babel pour convertir Javascript ES6 en ES5.

### Loaders

Dans Webpack, toute transformation (compilation, compression, etc) est effectuée par une fonction JavaScript —
qui prend en entrée la source, la transforme et renvoit une nouvelle version de cette source.

* Vous n'aurez probablement pas à créer de loaders, il en existe tout un tas déjà présent sur NPM.  
  Par exemple, `babel-loader` pour transformer un fichier ES6 en ES5:

  ```
  npm install babel-loader@7 babel-core babel-preset-env webpack@4 --save-dev
  ```

  webpack.config.js:

  ``` js
  const path = require('path');

   module.exports = {
      mode: 'development',
      entry: path.resolve(__dirname, "./static/js6/app.js"),
      output: {
        filename: "app.js",
        path: path.resolve(__dirname, "./static/js/")
      },
      module: {
        rules: [
           {
             test: /\.js$/,
             exclude: /node_modules/,
             use: ['babel-loader']
           }
        ]
      }
   };
   ```

* Si vous créez vos propres loaders, penser à les installer comme module node.

  ``` js
  // my-loader/index.js
  const doSomething = require("do-something");
  module.exports = function(source) {
      const newSource = doSomethingToSource(source);
  }
  ```

  ```
  npm add my-loader --save-dev
  ```

### Rules

Les règles à l'intérieur du fichier `webpack.config.js` permettent d'appliquer des transformations
(effectuées par des loaders) sur des fichiers. Chaque règle est constituée d'au moins deux propriétés:

* `test`: Indique les fichiers sur les lesquels appliquer des transformations (avec une regex)
  — avant que ces fichiers ne soient ajoutés au graphique de dépendance.
* `exclude`: (optionnel) Indique les fichiers qui correspondent à la regex mais qu'on veut exclure
* `use`: Indique le ou les loader(s) à appliquer — on peut passer des options au loader si l'on veut

``` js
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "build")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.jpe?g$/,
                use: [
                    {loader: "url-loader", options: {limit:10000}}
                ]
            }
        ]
    }
}
```

Webpack va automatiquement résoudre le nom du loader vers un module node,
il faut donc installer les loaders que vous voulez utiliser au prélable.

---

## Plugins

Un plugin peut exécuter toutes les fonctionnalités que les loaders ne peuvent pas.  
Un loader n'effectue une transformation que sur un seul fichieer avant de l'ajouter au graphique de dépendances.
Si vous voulez appliquer des changements sur plusieurs fichiers, comme créer des modules CSS à partir de différents fichiers,
alors vous devez utiliser des plugins.

Spécifiez les `plugins` que vous voulez utiliser dans le fichier de configuration `webpack.config.js`:

``` js
const ExamplePlugin = require("./ExamplePlugin.js");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "build")
    },
    plugins: [
        new ExamplePlugin(),
        new webpack.optimize.uglifyJsPlugin(),
        new webpack.ContextReplacementPlugin()
    ]
}
```

Il existe un tas de [plugins existant](https://webpack.js.org/plugins/), et vous pouvez également créer vos propres plugins.
L'instruction `apply` permet d'ajouter un hook pour exécuter des actions lors de différentes étapes du cycle de vie de Webpack.

``` js
// ./ExamplePlugin.js

class ExamplePlugin {
    apply(compiler) {
        compiler.plugin("run", (compiler, callback) => {
            console.log("WEBPACK IS RUNNING");
            callback();
        })
    }
}

module.exports = ExamplePlugin;
```

Sources:
[Webpack.academy]( http://webpack.academy/courses/the-core-concepts),
[Webpack: what is it and is it better than Gulp](https://blog.vanila.io/webpack-what-is-it-and-is-it-better-than-gulp-375db8011d22),
[A beginner's introduction to Webpack](https://www.freecodecamp.org/news/a-beginners-introduction-to-webpack-2620415e46b3/)

## Pour aller plus loin

[Documentation Webpack.js](https://webpack.js.org/)  
[Configuration File with Comments](https://medium.com/@timurcatakli/an-easy-to-understand-webpack-4-configuration-file-with-comments-6213882e9edf)
