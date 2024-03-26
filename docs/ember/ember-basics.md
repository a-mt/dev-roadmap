---
title: Les bases
category: Web, JavaScript, Library, Ember
---

{% raw %}
## Qu'est-ce que c'est

* Ember est un framework JavaScript qui permet de construire des applications front-end single page.

* Ember CLI permet d'ajouter rapidement des fichiers dans l'application (composants, tests, etc) et de compiler l'application.

## Installer

```
npm install -g ember-cli
ember -v
```

## Créer un projet

* Créer un répertoire

  ```
  mkdir emberjs
  cd emberjs
  ```

* Initialiser le projet

  ```
  ember init
  ```

* Lancer le projet

  ```
  ember serve
  ```

  Démarre un serveur sur le port 4200 (avec hot-reloading).

* Aller sur localhost:4200

---

## Architecture

### ember-cli-build.js

* Spécifie comment Ember CLI doit construire l'application

  ``` js
  'use strict';
  const EmberApp = require('ember-cli/lib/broccoli/ember-app');

  module.exports = function (defaults) {
    let app = new EmberApp(defaults, {
      // Add options here
    });

    // add additional libraries to the generated output files

    return app.toTree();
  };
  ```

### vendor/

* Emplacement des librairies externes à Ember (ex polyfills).

* Ces fichiers doivent être importés par  
  <ins>ember-cli-build.js</ins>:

  ``` js
    // add additional libraries to the generated output files
    app.import('vendor/shims/autosize.js');

    return app.toTree();
  };
  ```

### public/

* Contient les fichiers statiques de l'application  
  Côté front-end, les fichiers sont accessibles à la racine (sans public/)

  ```
  <img src="/images/test.png">
  ```

### config

* Contient les configurations de l'application — notamment le fichier environment.js, qui définit les variables d'environnement modifiant le comportement de l'application et les constantes utilisées dans les fichiers .js.

  <ins>config/environment.js</ins>:

  ``` js
  'use strict';

  module.exports = function (environment) {
    let ENV = {
      modulePrefix: 'emberjs',
      environment,
    ...

    ENV.APP.API_URL = 'http://localhost:8000/api/';
    return ENV;
  };
  ```

  <ins>app/components/my-component.js</ins>:

  ```
  import ENV from 'emberjs/config/environment';
  ```

### app/

* Contient les fichiers de l'application à proprement parler — composants, modèles, routes, templates et styles entre autres. Initialement, on peut trouver:

  * <ins>app/index.html</ins>:  
    Fichier HTML envoyé au client.  
    Il se contente de charger les scripts générés par Ember.  
    Le contenu de l'application est inseré à la fin du body (en Javascript).

  * <ins>app/templates/application.hbs</ins>:  
    Template principal. Le language de template est Handlebars.

      ```
      <h1>Mon Application</h1>

      {{outlet}}
      ```

  * <ins>app/styles/app.css</ins>:  
    Fichier CSS principal

      ``` css
      h1 {
        text-decoration: underline;
      }
      ```

### tests/

* Contient les tests de l'applications  
  Ember a 3 types de tests:

  * <ins>unit (tests unitaires)</ins>   
    Vérifie le fonctionnement des fonctions et méthodes  
    Pour: Router, Controller, Service, Helper, Model, Adapter, Serializer, Utils

  * <ins>integration (tests d'intégration)</ins>  
    Vérifie le fonctionnement d'un composant  
    Pour: Component

  * <ins>acceptance (tests d'interface)</ins>  
    Vérifie des users stories complètes du point de vue de l'utilisateur final

* testem.json contient des configurations pour Ember CLI.

* Pour lancer les tests:

  ```
  ember test
  ```

### dist/

* Emplacement où sont générés les fichiers du build. Pour lancer le build:

  ```
  ember build
  ```

### jsconfig.json

* Définit les options du compilateur.

  ``` json
  {
    "compilerOptions": {
      "target": "es2015",
      "experimentalDecorators": true,
    },
    "exclude": [
      "node_modules",
      "dist"
    ]
  }
  ```

{% endraw %}