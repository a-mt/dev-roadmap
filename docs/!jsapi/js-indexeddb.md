---
title: IndexedDB
category: Web, JavaScript, API
---

## Storage vs IndexedDB

Le Storage (sessionStorage, localStorage) permet d'enregistrer des données côté client sous forme de clé/valeur (chaînes de caractères). Tous les accès au storage sont synchrones et donc bloquants, il n'est donc adapté que pour de petites quantités de données.
IndexedDB permet également d'enregistrer des données côté client mais pas de la même manière:
* les accès sont asynchrones.  
  Il est donc possible de stocker davantage de données sans impacter les performances de la page
* c'est une base de donnée relationnelle.  
  Chaque table a des attributs (colonnes) et des entrées, que l'on peut trier, mettre à jour, etc
* supporte les transactions
* peut stocker différents types de données

  ``` sh
  Tous les types primitifs sauf Symbol
  Boolean (objet)
  String (objet)
  Date
  RegExp # La propriété lastIndex n'est pas préservée
  Blob
  File
  FileList
  ArrayBuffer
  ArrayBufferView # Ce qui implique tous les tableaux typés comme Int32Array etc.
  ImageData
  Array
  Object # Objets simples uniquement (objet litteral)
  Map
  Set
  ```

[Exemple IndexedDB](https://codepen.io/a-mt/pen/LeOVMV)

IndexedDB utilise le principe "same-origin" (même origine), ce qui signifie qu'une base de donnée ne peut être consultée que par une seule origine: le domaine/sous-domaine avec laquelle elle a été créée.

---

## Limites de stockage

L'espace de stockage maximal du navigateur est dynamique, il est basé sur la taille du disque dur.

Il existe deux limites
* La limite globale
  * Elle est calculée sur la base de 50% de l'espace disque libre.
  * C'est une limite douce (*soft limit*). Lorsque la limite est dépassée, une procédure d'"éviction d'origine" est enclenchée: le gestionnaire de quotas commence à effacer les données sur la base de la politique LRU (Least Recently Used) — l'origine la moins utilisée sera d'abord supprimée, puis la suivante, jusqu'à ce que le navigateur ne dépasse plus la limite.

* La limite de groupes
  * C'est la limite pour un nom de domaine donné

    | Url                   | Groupe | Origine
    |---                    |---     |---
    | mozilla.org           | 1      | 1
    | www.mozilla.org       | 1      | 2
    | joe.blogs.mozilla.org | 1      | 3
    | firefox.com           | 2      | 4


  * Elle est définie comme 20% de la limite globale
  * C'est une limite dure (*hard limit*)

Si la limite de groupe est dépassée, ou si l'éviction d'origine ne crée pas assez d'espace libre, le navigateur lance `QuotaExceededError`.

---

## 1. Créer une base de données

La première étape consiste à créer la base de données si elle n'existe pas ou si on fait une montée de version.

``` js
window.indexedDB      = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange    = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

const VERSION = 1,
      DB_NAME = "myDb";

var openReq = window.indexedDB.open(DB_NAME, VERSION), db;

// Créer ou monter en version la base de données
/* Doc: https://www.w3.org/TR/IndexedDB-2/#introduction */
openReq.onupgradeneeded = function(e) {
  db = openReq.result;
  // Créer le schéma ici
};

// La BDD n'a pas pu être ouverte
openReq.onerror = function(e) {
  console.error("Error loading database");
};

// La BDD est ouverte
openReq.onsuccess = function(e) {
  db = openReq.result;
  // Accéder à la BDD
}
```

### Montée en version

Lors d'une montée en version, si un autre onglet est chargé avec la base de données (avec l'ancienne version), alors l'événement `onblocked` est levé. L'utilisateur doit fermer tous les autres onglets ouverts sur le site pour que que `onupgradeneeded` soit appelé. Pour les autres onglets, l'événément `onversionchange` est déclenché sur l'instance.

``` js
openReq.onblocked = function(event) {
  // On veut mettre à jour la BDD mais un autre onglet est chargé avec l'ancienne version
  alert("Veuillez fermer tous les ongles ouverts sur ce site!");
};
  
openReq.onupgradeneeded = function(event) {
  // Toutes les autres bases de données ont été fermées. Mettre à jour
}  
  
openReq.onsuccess = function(event) {
  db = event.target.result;

  // Un autre onglet essaie de mettre à jour la BDD
  db.onversionchange = function(event) {
    db.close();
    alert("A new version of this page is ready. Please reload!");
  }

  // Accéder à la BDD
}
```

## 2. Créer le schéma

Les tables de la base de données doivent être crées lorsque cette dernière est installée (`onupgradeneeded`).  
Au moment de créer une table (un *objectStore*), on choisit le champ à utiliser comme clé primaire et on peut ajouter des index pour effectuer des recherches/tris de la table. Pour le reste, les colonnes n'ont pas à être définies, on peut ajouter les champs qu'on veut au moment de l'insertion.

* Supprimer les anciennes tables avec `deleteObjectStore`

  ``` js
  try {
    db.deleteObjectStore("myTableName");
  } catch(e) {}
  ```

* Créer une table avec `createObjectStore`

  ``` js
  var store = db.createObjectStore("myTableName");
  ```

  On peut utiliser une clé primaire avec autoIncrement:

  ``` js
  var store = db.createObjectStore("myTableName", {keyPath:"id", autoIncrement:true});
  ```
  
  Ou définir l'index à utiliser comme clé primaire:

  ``` js
  var store = db.createObjectStore("myTableName", {keyPath:"id"});
  store.createIndex("id", "id", { unique: true });
  ```

* Ajouter des index à la table

  ``` js
  store.createIndex("title", "title");
  ```

  On peut ajouter une contrainte d'unicité.  
  Quand le c'est le cas, une erreur `ConstraintError` est levée si on essaie de créer deux entrées avec la même valeur.

  ``` js
  store.createIndex("isbn", "isbn", { unique: true });
  ```

  On peut également préciser la locale à utiliser pour le tri (anglais par défaut).

  ``` js
  store.createIndex("title", "title", { locale: "fr" });
  ```

* Éventuellement, initialiser le contenu de la table avec des données

  ``` js
  store.put({title: "My item"});
  ```

## 3. Accéder à la base de donnée

Lorsque la base de donnée existe, soit parce qu'on vient de la créer, soit parce qu'elle existait déjà, le callback de `openReq.onsuccess` est appelé et on peut accéder à son contenu: créer, modifier, supprimer ou accéder au données.

### Ajouter des entrées

Si l'on essaie de créer une entrée avec un id qui existe déjà, une erreur est levée (`Key already exists in the object store.`).

* Créer une transaction

  ``` js
  // Demander l'accès à myTableName en lecture/écriture
  var transaction = db.transaction(["myTableName"], IDBTransaction.READ_WRITE);

  transaction.onerror = function(e) {
    console.error(e.target.error.name, e.target.error.message);
  };
  transaction.oncomplete = function() {
    // Transaction terminée: rafraichir la vue par exemple
  };
  ```

* Ajouter des entrées

  ``` js
  var item = {
    title: "Hello World"
  };

  // Ajouter item à la table myTableName
  transaction
    .objectStore("myTableName")
    .add(item)
    .onsuccess = function(){
       console.log("OK");
    };
  ```

  [Exemple Sauvegarder un blob](https://hacks.mozilla.org/2012/02/storing-images-and-files-in-indexeddb/#gist1893530)

### Récupérer le contenu d'une table

``` js
// Récupérer l'objectStore en lecture
var objectStore = db.transaction(["myTableName"], "readonly").objectStore("myTableName");
var n = 0;

// Boucler sur le contenu de l'objecStore via un curseur
objectStore.openCursor().onsuccess = function(event) {
  var it = event.target.result;

  // Fin de la liste
  if(!it) {
    console.log(n + ' entries');
    return;
  }
  n++;

  // Entrée en cours
  var item = it.value;
  console.log(item);

  // Passer à l'itération suivante
  it.continue();
}
```

Pour trier le résultat, voir la section [Rechercher plusieurs entrées](#rechercher-plusieurs-entrées).

### Récupérer une entrée via son id

On peut récupérer une entrée via son id.  
Si l'id spécifié n'existe pas, la méthode `onsuccess` est appelée mais `request.result` est `undefined`.

``` js
var id = 2;

// Récupérer l'objectStore en lecture (mode par défaut)
var objectStore = db.transaction(["myTableName"]).objectStore("myTableName");

// Récupérer l'entrée avec l'id donné
objectStore.get(id).onsuccess = function(e) {
  var item = request.result;

  console.log(item);
};
```

### Mettre à jour une entrée

`put` met à jour une entrée si l'id existe déjà en base de donnée ou en crée une nouvelle.

``` js
var id = 2;

// Récupérer l'objectStore en lecture/écriture
var objectStore = db.transaction(["myTableName"], "readwrite").objectStore("myTableName");

// Récupérer l'entrée en base de donnée ou créer un objet de toute pièce
var item = {
    id: id,
    title: "Hello You"
};
objectStore.put(item).onsuccess = function(e) {
  console.log("ok");
}
```

### Supprimer une entrée

``` js
// Récupérer l'objectStore en lecture/écriture
var objectStore = db.transaction(["myTableName"], "readwrite").objectStore("myTableName");

// Supprimer une entrée
objectStore.delete(2).onsuccess = function(e) {
  console.log("ok");
};
```

Il est important de toujours laisser la base de donnée dans un état cohérent. Par exemple, si vous effacez des entrées dans une transaction et en ajoutez dans une autre transaction, il y a un risque que l'utilisateur ferme son navigateur entre les deux et se retrouve avec une base de données vide. Pour éviter cela, utiliser une seule transaction - laquelle sera entièrement annulée si le navigateur est fermé.

### Rechercher une entrée

Il est possible de rechercher une ou des entrée(s) en utilisant un index.  
Le résultat sera `undefined` si aucune entrée ne correspond.

``` js
// Récupérer l'index "title" de l'objectStore en lecture
var index = db.transaction(["myTableName"])
            .objectStore("myTableName")
            .index("title");

// Rechercher une entrée
index.get("Hello World").onsuccess = function(e) {
  var item = e.target.result;
  console.log(item);
}
```

### Rechercher plusieurs entrées

Pour rechercher plusieurs entrées qui correspondent à un critère et non plus une, plutôt que d'appeler `get` sur l'index, on appelle `openCursor`. 
Les entrées retournées sont triées par ordre croissant sur l'index.

``` js
// Récupérer l'index "title" de l'objectStore en lecture
var index = db.transaction(["myTableName"])
            .objectStore("myTableName")
            .index("title");

// Récupérer tous les résultats de l'index
index.openCursor().onsuccess = function(e) {
  var cursor = e.target.result;
  if(!cursor) {
    return;
  }

  // Entrée en cours
  var title = cursor.key,
      id    = cursor.primaryKey,
      item  = cursor.value;
  console.log(id, title, item);

  // Continuer l'itération
  cursor.continue();
};
```

L'exemple ci-dessus retourne toutes les entrées de la table. Pour limiter les entrées retournées on passe un intervalle à `openCursor` (méthodes pour créer un intervalle plus bas)

``` js
// Toutes les entrées dont le title vaut "Hello World"
var range = IDBKeyRange.only("Hello World");

index.openCursor(range).onsuccess = function(e) {
  // ...
}
```

Par défaut, le résultat est retourné par ordre croissant. Pour itérer en mode décroissant, passer la valeur `"prev"` en 2ème argument (vaut `"next"` par défaut).

``` js
index.openCursor(range, "prev").onsuccess = function(e) {
  // ...
}
```

Pour récupérer la liste des entrées sans doublons (donc en excluant les entrées qui ont le même index qu'une autre), utiliser `"nextunique"` (ou `"prevunique"` pour l'ordre décroissant)

``` js
index.openCursor(range, "nextunique").onsuccess = function(e) {
  // ...
}
```

#### Intervalle (IDBKeyRange)

Un intervalle de clé peut être une seule valeur ou un intervalle avec des bornes inférieure et supérieure.  
Les bornes peuvent être inclues ou exclues.  
Pour créer un intervalle, plusieurs méthodes sont disponibles:

* `only`: un intervalle de clé qui ne contient qu'une valeur

  ``` js
  // Seulement "Donna"
  IDBKeyRange.only("Donna");
  ```

* `lowerBound`: un intervalle de clé avec une borne inférieure

  ``` js
  // Toutes les clés supérieures à "Bill", y compris "Bill"
  IDBKeyRange.lowerBound("Bill");
  ```

  ``` js
  // Toutes les clés supérieures à "Bill", mais pas "Bill"
  IDBKeyRange.lowerBound("Bill", true);
  ```

* `upperBound`: un intervalle de clé avec une borne supérieure

  ``` js
  // Toutes les clés inférieures à "Donna", y compris "Donna"
  IDBKeyRange.upperBound("Donna", true);
  ```

  ``` js
  // Toutes les clés inférieures à "Donna", mais pas "Donna"
  IDBKeyRange.upperBound("Donna", true);
  ```

* `bound`: un intervalle de clé avec une borne inférieure et une borne supérieure

  ``` js
  // N'importe quoi compris entre "Bill" et "Donna", "Bill" inclus mais "Donna" exclus
  IDBKeyRange.bound("Bill", "Donna", false, true);
  ```

Il est possible de tester si une clé est contenue dans un intervalle de clé ou non avec la méthode `includes`:

``` js
console.log(range.includes('Charlie'));
```

#### Tri et localisation

Par défaut, IndexedDB ne prend pas en charge l'internationalisation des chaînes de tri, et est trié comme s'il s'agit d'un texte anglais. Par exemple, a, à, b est trié a, b, à. Pour qu'un index soit trié selon une locale spécifique, il est nécessaire de préciser à la création du schéma la locale à utiliser.

``` js
store.createIndex("title", "title", { locale: "fr" });
```
