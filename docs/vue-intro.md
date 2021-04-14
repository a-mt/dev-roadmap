---
title: Introduction
category: Web, JavaScript, Library, Vue
---

## Qu'est-ce que c'est

* Vue.js est un framework JavaScript pour la création d'UI, construit en prenant les concepts d'autres librairies et frameworks, et en les améliorant si nécessaire.

* Vue a une architecture basée sur des composants, ce qui permet de décomposer l'application en modules encapsulés, et la rendre plus facile à gérer et à réutiliser.

* Vue a actuellement [180k stars sur Github](https://github.com/vuejs/vue) — c'est le troisième repo Github le plus populaire. Beaucoup de développeurs apprécient Vue, on trouve donc facilement des solutions à la plupart des problèmes.

* Vue ne mesure que 20kb une fois minifié et gzippé.

* Vue ne s'occupe que de l'UI et non des autres aspects de l'application, comme le routage ou les requêtes HTTP, mais il existe des librairies complémentaires:
  * Vuex pour une gestion plus complexe de l'état des composants
  * Vue-router pour le routage
  * Vuetify pour une implémentation de material design
  * Vue devtools pour inspecter l'état d'une application Vue.
  * Vue CLI pour rapidement créer un projet Vue.

* On peut tester Vue en ligne avec [Vue Playground](https://vuep.run/)

---

## Inclure la librairie

Il y a différentes manières d'ajouter Vue à un projet:

- Ajouter Vue comme package CDN  
  Manière privilégié pour intégrer Vue dans une application existante ou pour rapidement réaliser un prototype.

  ``` html
  <script src="https://unpkg.com/vue@next"></script>
  ```

- Ajouter Vue comme dépendance via NPM  
  Manière recommandée pour créer une application d'envergure.

  ```
  npm install vue@next
  ```

- Utiliser Vue CLI  
  Permet de rapidement créer un projet Vue avec hot-reloading et linting à la sauvegarde. Démarre un serveur sur le port 8080.

  ```
  npm install -g @vue/cli
  vue --version
  vue create my-vue-project-name

  cd my-vue-project-name
  npm run serve
  ```

* Utiliser Vite.  
  Une alternative à Vue CLI.

  ```
  npm init vite-app my-project-name
  ```

---

## Architecture d'un projet Vue

* <ins>public/index.html</ins>:  
  Typiquement, le HTML ne contient qu'un seul élément: un container dans lequel Vue viendra ajouter des éléments — en l'occurence le div app.

  ``` html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <link rel="icon" href="<%= BASE_URL %>favicon.ico">
      <title><%= htmlWebpackPlugin.options.title %></title>
    </head>
    <body>
      <noscript>
        <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
      </noscript>
      <div id="app"></div>
      <!-- built files will be auto injected -->
    </body>
  </html>
  ```

* <ins>src/main.js</ins>:  
  Il s'agit de l'entrypoint de l'application Vue.  
  On spécifie le composant racine (App) et l'élément DOM (#app) dans lequel il sera injecté.

  ``` js
  import { createApp } from 'vue'
  import App from './App.vue'

  createApp(App).mount('#app')
  ```

* <ins>src/App.vue</ins>:  
  Il s'agit du composant racine.  
  Chaque composant Vue est responsable de son propre balisage, style et logique, par le biais de trois types de bloc:
  * &lt;template> spécifie le HTML du composant
  * &lt;style> son CSS
  * et &lt;script> son JS

  ``` html
  <template>
    <h2>Hello World</h2>
  </template>

  <script>
  export default {
    name: 'App'
  }
  </script>

  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  </style>
  ```

## Composants

* Comme React ou Angular, Vue a une architecture basée sur des composants. Un même composant peut être utilisé avec différents propriétés pour contrôler son comportement. Pour utiliser un composant:

1. Déclarer le composant  
   Par convention, les composants sont crées dans le répertoire `components`. Chaque composant doit exporter un objet par défaut contenant à minima son nom:

    <ins>src/components/HelloWorld.vue</ins>:

    ``` html
    <template>
      <h2>Hello World</h2>
    </template>

    <script>
    export default {
      name: 'HelloWorld'
    }
    </script>
    ```

2. Importer le composant  
   Un composant souhaitant inclure d'autres composants doit les spécifier dans la propriété `components`. La clé spécifie le nom du composant et la valeur, le composant lui-même.

   On peut ensuite utiliser ce composant comme tag HTML dans le bloc template. S'il n'y a pas de contenu entre les balises, on peut utiliser une balise auto-fermante.

   <ins>src/App.vue</ns>:

    ``` html
    <script>
    import HelloWorld from './components/HelloWorld.Vue'

    export default {
      name: 'App',
      components: { HelloWorld }
    }
    </script>

    <template>
      <HelloWorld />
    </template>
    ```