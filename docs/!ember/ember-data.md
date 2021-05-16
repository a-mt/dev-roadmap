---
title: Modèles de données
category: Web, JavaScript, Library, Ember
---

Ember-data est une librairie permettant d'agir comme intermédiaire entre l'API d'un serveur et l'application Ember, qui va s'occuper d'effectuer les requêtes, sérialiser et désérialiser les données en objets, et mettre en cache les données — autrement dit, c'est un ORM. Elle est installée par défaut dans les applications générées par Ember CLI.

## 1. Définir un modèle

* Un modèle est une classe qui définit le schéma des données — les propriétés et leur type. Les objets récupérés seront des instances de cette classe. Le modèle peut également définir des propriétés calculées, des méthodes et des relations.

   <ins>app/model/user.js</ins>

    ```
    import Model, { attr } from '@ember-data/model';
    import moment from 'moment';

    export default class UserModel extends Model {
      @attr('string') name;
      @attr('boolean', { defaultValue: true }) isActive;
      @attr('date', { readOnly: true }) createdAt;
      @attr('date', { defaultValue: () => moment() }) lastAccess;
    }
    ```

* On peut créer un modèle en déclarant une classe (ci-dessus) ou un objet:

  ``` js
  import Model from 'ember-data/model';
  import attr from 'ember-data/attr';

  export default Model.extend({
    modality: attr('string'),
    started: attr('nullable-string'),
    isDeferred: attr('boolean', { defaultValue: true }),
  });
  ```

---

## 2. Utiliser le store

* Les requêtes s'effectuent via le store, qui est un service automatiquement injecté dans les objets Route. Le store va requêter les données si nécessaire, et les stocker: si on a besoin d'y accéder à nouveau, il ne sera pas nécessaire de re-requêter le serveur — à moins de le demander explicitement.

   <ins>app/routes/user/edit.js</ins>:

    ```
    import Route from '@ember/routing/route';

    export default class UserEditRoute extends Route {
      model(params) {
        return this.store.findRecord('user', params.user_id);
      }
    }
    ```

   <ins>app/routes/user/index.js</ins>:

    ```
    import Route from '@ember/routing/route';

    export default class UsersRoute extends Route {
      model(params) {
        return this.store.findAll('user');
      }
    }
    ```

---

## 3. Créer un adapter (optionnel)

* Un adapter définit où et comment obtenir les informations à partir d'une API.

* Par défaut, Ember utiliser l'adaptateur JSONAPIAdapter — qui hérite de [RESTAdapter](https://api.emberjs.com/ember-data/release/classes/RESTAdapter).  
   Pour construire l'URL du endpoint, JSONAPIAdapter utilise les conventions suivantes:

   | Action                              | Méthode HTTP |	 URL  | Description
   |---                                  |---     |---         |---
   | `store.findAll('post')`             | GET    | /posts     | Récupèrer une liste d'objets
   | `store.findRecord('post', 123)`     | GET    | /posts/123 | Récupèrer un objet
   | `store.createRecord('post').save()` | POST   | /posts     | Créer un objet
   | `postRecord.save()`                 | PATCH  | /posts/123 | Mettre à jour un objet
   | `postRecord.destroyRecord()`        | DELETE | /posts/123 | Supprimer un objet

* On peut créer un adapter pour définir l'hôte à requêter (`host`), l'URL du endpoint (`namespace`) et modifier le comportement par défaut.  
   <ins>app/adapters/application.js</ins>

    ``` js
    import JSONAPIAdapter from '@ember-data/adapter/json-api';
    import Cookies from 'js-cookie';

    export default class ApplicationAdapter extends JSONAPIAdapter {

      // Set URL
      host      = ENV.DOMAIN;
      namespace = 'api';

      // Set custom headers
      get headers() {
        let csrfToken, currentProfile;

        try {
          csrfToken = Cookies.get('csrftoken');
        } catch (e) {
          csrfToken = '';
        }
        try {
          currentProfile = this.session.currentProfileId;
        } catch (e) {
          currentProfile = '';
        }
        return {
          'X-CSRFToken': csrfToken,
          'X-Current-Profile': currentProfile,
        };
      }

      // Do not use cached data
      shouldReloadRecord() {
        return true;
      }
      shouldReloadAll() {
        return true;
      }
    }
    ```

* L'adapter `application` (ci-dessus) affecte l'ensemble des requêtes effectuées. Mais on peut également créer un adapter spécifique à un type donné.

   <ins>app/adapters/user.js</ins>:

   ``` js
   import ApplicationAdapter from 'emberjs/adapters/application';

   export default class UserAdapter extends ApplicationAdapter {
      includedRelationships = [
        'profile',
        'exposures'
      ].join(',');

      // Ask API to include all relationships in the returned payload
      urlForFindRecord(query, modelName, snapshot) {
        return `${super.urlForFindRecord(...arguments)}?include=${
          this.includedRelationships
        }`;
      }
   }
   ```

[Customizing Adapters](https://guides.emberjs.com/release/models/customizing-adapters/)

---

## 4. Créer un serializer (optionnel)

* Un serializer permet de convertir les données reçues (get) et envoyées au serveur (put, patch, delete).

* Par défaut, Ember utilise le serializer JSONAPISerializer, qui s'occupe de la sérialisation et désérialisation d'objets respectant le format [json:api](https://jsonapi.org/):

  ```
  {
      "jsonapi": {
          "version": "1.0"
      },
      "links": {
          "self": "http://example.com/article/1",
      },
      "meta": {
          "created": "2017-04-02T23:28:35"
      },
      "data": [{
          "id": "1",
          "type": "article",
          "attributes": {
              "title": "document root example"
          },
          "relationships": {
              "author": {
                  "data": {
                      "type": "people",
                      "id": "9"
                  }
              }
          }
      }],
      "included": [{
          "type": "people",
          "id": "9",
          "attributes": {
              "first-name": "Dan",
              "last-name": "Gebhardt",
              "twitter": "dgeb"
          },
      }]
  }
  ```

* On peut créer un serializer application, valable sur l'ensemble des modèle, et/ou un serializer spécifique à un type donné.

  <ins>app/serializers/application.js</ins>:

    ``` js
    import JSONAPISerializer from '@ember-data/serializer/json-api';

    export default class ApplicationSerializer extends JSONAPISerializer {
      primaryKey = '_id';

      // Don't serialize read only attributes
      serializeAttribute(snapshot, json, key, attribute) {
        if (attribute.options && attribute.options.readOnly) {
          return;
        }
        super.serializeAttribute(...arguments);
      }

      // Retrieve the payload key from the model name
      // Ex: `user/records` -> `user-records`
      payloadKeyFromModelName(modelName) {
        return modelName.replace(/\//g, '-');
      }
    }
    ```

[Customizing Serializers](https://guides.emberjs.com/release/models/customizing-serializers/)

---

## Types personnalisés

* Ember définit un certain nombre de types de données: string, number, date, etc. Mais il est également possible de créer des types personnalisés

1. Créer un objet Transform  
   <ins>app/transforms/null-boolean.js</ins>:

    ``` js
    import Transform from '@ember-data/serializer/transform';
    import { isNone } from '@ember/utils';

    /**
     * [NullBooleanTransform description]
     *
     * @class NullBooleanTransform
     */
    export default class NullBooleanTransform extends Transform {
      deserialize(serialized) {
        var type = typeof serialized;

        if (isNone(serialized)) {
          return null;
        }

        if (type === 'boolean') {
          return serialized;
        } else if (type === 'string') {
          return serialized.match(/^true$|^t$|^1$/i) !== null;
        } else if (type === 'number') {
          return serialized === 1;
        }
        return false;
      }

      serialize(deserialized) {
        if (isNone(deserialized)) {
          return null;
        }
        return Boolean(deserialized);
      }
    }
    ```

2. Utiliser ce transform comme type

    ``` js
    @attr('null-boolean') hasChanges;
    ```

---

## Relations

* **belongsTo** est utilisé pour définir une relation one-to-one.  
  **hasMany** pour une relation one-to-many.

  ``` js
  import { belongsTo, hasMany } from 'ember-data/relationships';

  //...
    @belongsTo('team', { async: false }) team;         // one to many
    @hasMany('patient', { async: false }) patients;   // one to many
  ```

    Si le nom du modèle est omis, Ember le déduira à partir du nom de la propriété.

    ```
    @belongsTo post;
    ```

    [Update Relationships](https://guides.emberjs.com/v2.11.0/models/relationships/#toc_updating-existing-records)

### Option async

* (true par défaut)  
  En déclarant une relation one-to-one ou one-to-many, Ember va automatiquement effectuer des requêtes API supplémentaires pour obtenir les informations des objets liés — si elles ne sont pas déjà renvoyées par le serveur dans la partie included (cf créer un serializer).

  On peut empêcher Ember d'effectuer des requêtes supplémentaires en spécifiant l'option { async: false }. Avec cette option, Ember tentera de récupérer l'objet lié dans le store ou dans la section included — si la ressource n'a pas été chargée alors une erreur est levée.

### Option inverse

* Ember déduit automatiquement les relations entre les objets. Ainsi, si on ajoute un objet Comment à un Post:

  ``` js
  var post    = store.find('post', '1');
  var comment = store.createRecord('comment', {});

  post.get('comments').addObject(newComment);
  ```

  alors Ember définit automatiquement le post sur l'objet comment:

  ``` js
  // behind the scenes
  comment.set('post', post);
  ```

* L'option inverse permet de spécifier la propriété du modèle lié. Pour reproduire le comportement par défaut avec notre exemple:

  ``` js
  App.Post = DS.Model.extend({
      comments: DS.hasMany('comment', { inverse: 'post' })
  });
  App.Comment = DS.Model.extend({
      post: DS.belongsTo('post', { inverse: 'comments' })
  });
  ```

* L'option inverse est notamment utile dans le cas de relations refléxives (un modèle qui a une relation avec lui-même):

  ``` js
  App.Folder = DS.Model.extend({
    children: DS.hasMany('folder', { inverse: 'parent' }),
    parent: DS.belongsTo('folder', { inverse: 'children' })
  });
  ```

* Et les relations sans inverses peuvent être indiquées avec `null`:

  ``` js
  App.User = DS.Model.extend({
      posts: DS.hasMany('post', { inverse: null });
  });
  App.Post = DS.Model.extend({
    // No inverse relationship required
  });
  ```

### Option polymorphic

* Ember s'attend à recevoir des objets liés du type spécifié par le modèle. L'option polymorphic permet d'indiquer que le type spécifié est une classe abstraite: l'objet lié n'est pas de ce type mais en hérite.

  ``` js
  // User
  App.User = DS.Model.extend({
    paymentMethods: DS.hasMany('payment-method', { polymorphic: true })
  });

  // abstract PaymentMethod
  App.PaymentMethod = DS.Model.extend({
    user: DS.belongsTo('user', { inverse: 'paymentMethods' }),
  });

  // PaymentMethod: CC
  App.PaymentCC = PaymentMethod.extend({
    obfuscatedIdentifier: Ember.computed('last4', function () {
      return `**** **** **** ${this.get('last4')}`;
    })
  });

  // PaymentMethod: Paypal
  App.PaymentPaypal = PaymentMethod.extend({
    linkedEmail: DS.attr(),

    obfuscatedIdentifier: Ember.computed('linkedEmail', function () {
      let last5 = this.get('linkedEmail').split('').reverse().slice(0, 5).reverse().join('');

      return `••••${last5}`;
    })
  });
  ```

---

## Propriétés calculées

* On peut définir des propriétés automatiquement calculées à partir d'autres grâce aux macros.

  ``` js
  import Model, { attr } from '@ember-data/model';
  import { computed } from '@ember/object';
  import { sum, and, not, collect, or, alias } from '@ember/object/computed';

  export default class Record extends Model {
    // ...

    @alias('patient.birthDate') patientBirthDate;
    @collect('errors.length', 'patient.errors.length') allErrors;
    @sum('allErrors') errorsCount;

    @or('isError', 'patient.isError') isTotallyError;
    @and('isValid', 'patient.isValid') isTotallyValid;
    @not('isTotallyValid') isTotallyInvalid;

    @computed('didSave', 'isTotallySaving', 'isTotallyValid')
    get displaySaveSuccessMessage() {
      if (this.isTotallySaving) {
        return false;
      }
      return this.didSave && this.isTotallyValid;
    }
  ```

[Package @ember/object/computed](https://api.emberjs.com/ember/release/modules/@ember%2Fobject#functions-computed)

## Macros personnalisées

1. On peut créer une macro personnalisée, qui est simplement une fonction retournant une fonction @computed  
   <ins>app/macros/age-format.js</ins>:

    ``` js
    import { computed, get } from '@ember/object';

    /**
     * Returns a string like "28 years old" according to age.
     *
     * @param  {String} ageKey
     * @return {String}
     */
    export default function (ageKey) {
      return computed(ageKey, function () {
        var age = get(this, ageKey);
        if (age) {
          return `${age} years old`;
        }
        return;
      });
    }
    ```

2. Utiliser cette macro  
   <ins>app/models/record.js</ins>:

    ``` js
    import ageFormat from 'emberjs/macros/age-format';

    //...
      @ageFormat('age') ageFormated;
    ```

---

## Mixins

* La classe Mixin permet de créer un objet dont les propriétés peuvent être ajoutées à d'autres classes.

1. Créer une mixin  
   <ins>app/mixins/record-history.js</ins>:

    ``` js
    import Mixin from '@ember/object/mixin';

    export default Mixin.create({
      trackingRecord: null,
      record: null,
      hasChanges: null,
    });
    ```

2. Utiliser la mixin  
   <ins>app/models/tracking-record-history.js</ins>:


    ```
    import Model from 'ember-data/model';
    import attr from 'ember-data/attr';

    import RecordHistoryMixin from 'emberjs/mixins/record-history';
    import RecordOverviewMixin from 'emberjs/mixins/record-overview';

    export default Model.extend(
      RecordHistoryMixin,
      RecordOverviewMixin,
      {
        recordType: 'TRACKING',
      }
    );
    ```