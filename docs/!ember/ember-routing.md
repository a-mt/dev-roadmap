---
title: Routing
category: Web, JavaScript, Library, Ember
---

{% raw %}
## Définir des routes

### Router

* Les routes de l'application sont définies dans <ins>app/router.js</ins>:

  ``` js
  import EmberRouter from '@ember/routing/router';
  import config from 'emberjs/config/environment';

  class Router extends EmberRouter {
    location = config.locationType;
    rootURL = config.rootURL;
  }

  // Définit les routes de l'application
  Router.map(function(){
    this.route('dashboard', { path: '/' });
    this.route('contact');
  });

  export default Router;
  ```

  Il est inutile de préciser le path s'il correspond au nom de la route:  
  `this.route('contact');` revient à `this.route('contact', { path: '/contact' });`

### app/templates/application.hbs

* Quelle que soit la route en cours, le template principal reste <ins>app/templates/application.hbs</ins>.  
  Le contenu du template du path en cours sera inséré à la place de `{{outlet}}`.

    ```
    {{page-title "Emberjs"}}

    <h1>Mon Application</h1>
    <nav>
      <LinkTo @route="dashboard">Dashboard</LinkTo>
      <LinkTo @route="contact">Contact</LinkTo>
    </nav>

    {{outlet}}
    ```

### app/templates/routeName.hbs

* Suivant l'URL en cours, Ember va chercher le template associé. Avec l'exemple ci-dessus, si on accède à localhost:4200, alors Ember va chercher <ins>app/templates/dashboard.hbs</ins> et l'insèrer dans l'outlet du template parent (app/templates/application.hbs en l'occurence).

  ```
  <h2>Dashboard</h2>
  ```

  Si on accède à localhost:4200/contact, Ember va chercher <ins>app/templates/contact.hbs</ins>:

  ```
  <h2>Contact</h2>
  ```

* Et pour rappel, pour chaque template on peut également créer un controlleur associé dans <ins>app/controllers</ins>.

---

## Sous-routes

* On peut définir des sous-routes, ce qui peut être utile si on veut créer différents onglets.  
  <ins>app/router.js</ins>:

  ``` js
  this.route('user', { path: '/user' }, function() { // /user
    this.route('create');                            // /user/create
   });
  ```

* Quand on accède à /user, Ember va chercher <ins>app/templates/user.hbs</ins>:

  ```
  <h2>Users</h2>
  <nav>
    <LinkTo @route="user">List</LinkTo>
    <LinkTo @route="user.create">Create</LinkTo>
  </nav>

  {{outlet}}
  ```

* **../index**  
  Ember va également aller chercher <ins>app/templates/user/index.hbs</ins>  
  et inclut le contenu dans l'outlet du template parent (app/templates/user.hbs en l'occurence).

  ```
  <h3>List users</h3>
  ```

  Si on voulait nommer le sous-template par défaut <ins>app/templates/user/list.hbs</ins> et non index:

  ``` js
  this.route('user', { path: '/user' }, function() { // /user
    this.route('list', { path: '/' });               // /user (default sub)
    this.route('create');                            // /user/create
  });
  ```

* **../subrouteName**  
  Quand on accède à /user/create, Ember va chercher <ins>app/templates/user/create.hbs</ins>  
  et inclut le contenu dans l'outlet du template parent.

  ```
  <h3>Create user</h3>
  ```

---

## Paramètres de route

### Router

* On peut spécifier un paramètre dans le path en utilisant les deux-points (:)

  ``` js
  this.route('user', { path: '/user' }, function() {  // /user
    this.route('create');                             // /user/create
    this.route('edit', { path: '/edit/:user_id'});    // /user/edit/:user_id
  });
  ```

### Route model

* Quand une route spécifie un paramètre, alors il est nécessaire de créer une classe dans <ins>app/routes</ins> pour implémenter le hook `model`

  <ins>app/routes/user/edit.js</ins>:

  ``` js
  import Route from '@ember/routing/route';

  export default class UserEditRoute extends Route {
    model(params) {
      const { user_id } = params;

      return {id: user_id};
    }
  }
  ```

* **async model**  
  Le hook model peut retourner n'importe quel type de données: scalaire, objet, tableau ou même une promesse. Si c'est une promesse, alors Ember attendra qu'elle soit résolue avant d'afficher le template.

  ``` js
  import Route from '@ember/routing/route';
  import fetch from 'fetch';

  export default class PhotosRoute extends Route {
    async model() {
      const response = await fetch('/my-cool-end-point.json');
      const photos = await response.json();

      return { photos };
    }
  }
  ```

  Ou avec later:

  ``` js
  import Route from '@ember/routing/route';
  import { later } from '@ember/runloop';

  export default class TardyRoute extends Route {
    model() {
      return new Promise(function(resolve) {
        later(function() {
          resolve({ msg: 'Hold Your Horses' });
        }, 3000);
      });
    }

    setupController(controller, model) {
      console.log(model.msg); // "Hold Your Horses"
    }
  }
  ```

* **paramsFor**  
  On peut utiliser la méthode `paramsFor` pour récupérer les paramètres d'une route parente.

  ``` js
  export default class AlbumIndexRoute extends Route {
    model() {
      let { album_id } = this.paramsFor('album');
      // ...
    }
  }
  ```

* **setupController**  
  La classe Route passe le modèle au controlleur dans la méthode `setupController ` — et le controlleur rend la variable accessible au template. Par défaut setupController appelle cette variable `model`:

  ```
  class Route {
    setupController: function(controller, model){
       controller.set('model', model);
    }
    ...
  }
  ```

### template, controller

* Le template et le controller associés à la route auront ainsi accès aux données retournées par le hook `model` via la variable `model`.  
  <ins>app/templates/user/edit.hbs</ins>:

  ```
  <h3>Edit user</h3>

  <p>User {{this.model.id}}</p>
  ```

  <ins>app/controllers/user/edit.js</ins>:

  ```
  import Controller from '@ember/controller';

  export default class UserEditController extends Controller {
    get sayHello() {
      return `Hello ${this.model.id}`;
    }
  }
  ```

---

## Paramètres optionnels

* Le controller peut spécifier une liste de paramètres optionnels (paramètres apparaissant à droite du `?`) dans la propriété `queryParams`, ce qui aura pour effet de populer les propriétés correspondantes.

  ```
  import Controller from '@ember/controller';

  export default class UserCreateController extends Controller {
    queryParams = ['param'];

    param = null;
  }
  ```

* La propriété peut avoir un nom différent que le paramètre de l'URL, en utilisant la syntaxe `{name: ulrname}`:

  ``` js
    queryParams = ['page', {'query_param': 'param'}];

    page = 1;
    query_param = null;
  ```

* Si la propriété est suivie (avec @tracked), alors modifier la valeur de la propriété modifie l'URL dynamiquement.

  ``` js
  export default class ArticlesController extends Controller {
    queryParams = ['category'];

    @tracked category = null;
  ```

---

## Transitions

### LinkTo

* **@route**  
  `LinkTo` est un composant permettant d'insérer un lien vers une route nommée.

  ```
  <LinkTo @route="user">List</LinkTo>
  <LinkTo @route="user.create">Create</LinkTo>
  ```

* **@model**  
  Pour créer un lien vers une route contenant un paramètre, on utilise @model

  ```
  <LinkTo @route="user.edit" @model="1">User 1</LinkTo>
  ```

* **@models**  
  Si la route contient plusieurs paramètres,
  alors on utilise @models avec le helper array:

  ```
  <!-- {path: '/edit/:user_id/:token'} -->

  <LinkTo @route="user.edit" @models={{array "1" "abc"}}>User 1</LinkTo>
  ```

* **@query**  
  Pour créer un lien avec des paramètres optionnels, on utilise @query avec le helper hash:

  ```
  <LinkTo @route="user.create" @query={{hash param="value"}}>Create user</LinkTo>
  ```  

  Si @query n'est pas précisé, alors Ember ajoute automatiquement les paramètres optionnels en cours. Pour réinitialiser les paramètres query, il faut passer explicitement une valeur à @query — et c'est également le cas pour transitionTo.

### transitionTo()

* Dans un objet route, on peut utiliser la méthode `transitionTo` pour diriger vers une autre route.

  ```
  import Route from '@ember/routing/route';

  export default class PostsRoute extends Route {
    afterModel(posts, transition) {
      if (posts.get('length') === 1) {
        this.transitionTo('post.show', posts.get('firstObject'));
      }
    }
  }
  ```

* Dans un controller ou component, on peut injecter le service router pour appeler cette même méthode.

  ```
  import Component from '@glimmer/component';
  import { action } from '@ember/object';
  import { inject as service } from '@ember/service';

  export default class ExampleComponent extends Component {
    @service router;

    @action
    next() {
      this.router.transitionTo('other.route');
    }
  }
  ```

* À la place de transitionTo, on peut utiliser replaceWith. La seule différence est que replaceWith subtitue la route actuelle dans l'historique — alors que transitionTo ajoute la route dans l'historique: on ne peut donc pas utiliser la flèche pour retourner à la page précédente quand on utilise replaceWith.

---

## Route lifecycle

* **beforeModel** est executé avant le hook `model`. On peut par exemple s'en servir pour vérifier si l'utilisateur est authentifié.

  <ins>app/routes/profile.js</ins>:  
  Si l'utilisateur n'est pas authentifié: stocke la transition en cours tard et redirige vers /login.

  ``` js
  export default class ProfileRoute extends Route {
    beforeModel(transition) {

      // check if user is logged in
      if (!this.controllerFor('auth').userIsLoggedIn) {

        // store the current transition for later
        let loginController = this.controllerFor('login');
        loginController.previousTransition = transition;

        // redirect to /login
        this.transitionTo('login');
      }
    }
  }
  ```

  <ins>app/controllers/login.js</ins>:  
  Quand l'utilisateur s'authentifie: redirige vers la transition précédemment stockée.

  ``` js
  export default class LoginController extends Controller {
    @action
    login() {
      // log the user in
      //...

      // redirect to previous transition if any
      let previousTransition = this.previousTransition;
      if (previousTransition) {
        this.previousTransition = null;
        previousTransition.retry();

      // else redirect to homepage
      } else {
        this.transitionToRoute('index');
      }
    }
  }
  ```

* **afterModel** est executé après le hook `model`. On peut par exemple s'en servir pour rediriger vers une autre page si la page en cours n'est pas valide.

  ``` js
  export default class PostsRoute extends Route {
    afterModel(model, transition) {
      if (model.get('length') === 1) {
        this.transitionTo('post', model.get('firstObject'));
      }
    }
  }
  ```

* **redirect** est très similaire à **afterModel** à une distinction près: 

  * lors d'un appel à transitionTo depuis afterModel, la transition en cours est invalidée — les hooks beforeModel, model et afterModel vont être re-déclenchés pour la nouvelle route.

  * lors d'un appel à transitionTo depuis redirect, la transition originale reste valide — les hooks ne vont pas être re-déclenchés. On peut s'en servir pour rediriger vers une URL canonique par exemple.

  ``` js
  export default class PostsRoute extends Route {
    redirect(model, transition) {
      if (model.get('length') === 1) {
        this.transitionTo('posts.post', model.get('firstObject'));
      }
    }
  }
  ```

* **willTransition**  
  Quand une transition est declenchée (via LinkTo ou transitionTo), la route en cours reçoit l'action willTransition. On peut s'en servir pour annuler la transition ou la stocker

  ``` js
  export default class FormRoute extends Route {
    @action
    willTransition(transition) {
      if (this.controller.userHasEnteredData &&
          !confirm('Are you sure you want to abandon progress?')) {
        transition.abort();
      } else {
        // Bubble the `willTransition` action so that
        // parent routes can decide whether or not to abort.
        return true;
      }
    }
  };
  ```

* **error** est une action déclenchée quand une erreur est levée.

  ``` js
  export default class GoodForNothingRoute extends Route {
    model() {
      return Promise.reject("FAIL");
    }

    @action
    error(reason) {
      console.error(reason); // "FAIL"

      // Can transition to another route here, e.g.
      // this.transitionTo('index');

      // Uncomment the line below to bubble this error event:
      // return true;
    }
  }
  ```

* **loading** est une action déclenchée dans le model retourne une promesse en attente de résolution.

  ``` js
  export default class FooSlowModelRoute extends Route {
    // ...
    @action
    async loading(transition, originRoute) {

      // currentlyLoading true
      let controller = this.controllerFor('foo');
      controller.set('currentlyLoading', true);

      // currentlyLoading false
      transition.promise.finally(function() {
          controller.set('currentlyLoading', false);
      });
    }
  };
  ```

[Classe Route](https://api.emberjs.com/ember/release/classes/Route/methods)

---

## Template de fallback

### Loading

* Récupérer le model d'une route peut prendre du temps — la vue sera vide jusqu'à ce que la promesse se réalise. Pour afficher un feedback pendant ce temps, on peut définir un template de loading.

  Pour la route `user.about.overview`, Ember cherchera un template dans la hiérarchie dans cet ordre: `user.about.overview-loading`, `user.about-loading`, `user-loading`, `application-loading`.

  <ins>app/templates/application-loading.hbs</ins>:

  ```
  <MagicSpinner @verticalAlign={{true}} />
  ```

### Error

* De la même manière, si une erreur non gérée est levée, Ember cherchera un template d'erreur.

  Pour la route `articles.overview`, Ember cherchera dans cet ordre: `articles.overview-error`, `articles-error`, `application-error`.

{% endraw %}