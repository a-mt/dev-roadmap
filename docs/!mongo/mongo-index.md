---
title: Index
category: Web, BDD, MongoDB
---

Sans index, pour trouver un document dans une collection, il faudrait scanner chaque document un par un. Un index est une liste ordonnée qui pour chaque valeur d'index a une référence vers un enregistrement physique. Les propriétés de cette liste vont rendre les requêtes beaucoup plus rapide (MongoDB utilise un B-tree).

L'indexation n'est pas gratuite, chaque fois qu'une mise à jour affectant l'index est effectuée, il va falloir mettre à jour cette liste. L'écriture est donc plus lente, mais la lecture est plus rapide.  
Une des stratégie couramment utilisée lors de l'insertion d'un grand nombre de données en base de données est d'enlever les index sur la collection, d'insérer les données, puis remettre les index — et ce, afin de ne lancer l'indexation qu'une seule fois.

---

## Modifier les index

### createIndex

Pour créer un index, on utilise `createIndex` (attention, peut prendre du temps).

``` js
db.students.createIndex({ { student_id : 1 })
```

``` js
db.students.createIndex({ student_id : 1, class_id : -1 }) # student ASC, class DESC
```

#### Index composé

Si l'index contient plusieurs clés, utilisez la politique *leftmost*: si un index `name, hair_color` est définit, vous pouvez l'utiliser  pour les recherches sur `name` ou `name, hair_color` mais pas `hair_color`.

Un index peut être composé d'un tableau mais pas deux:

``` js
// OK
insert({a : 3, b :[1,2] })

// OK
insert({a :[3,4,5], b:1 })

// Erreur: "cannot index parallel arrays"
insert({a :[3,4,5], b :[1,2] })
```

#### Unique

Il est possible de créer un index avec une contrainte *unique*.  
Ainsi, deux documents ne pourront pas avoir la même clé.

``` js
db.stuff.createIndex({ thing: 1 }, { unique: true })
```

Des index épars (*sparse indexes*) peuvent être utilisés lorsque la clé de l'index est manquante dans certains documents. Les documents n'ayant pas la clé correspondante seront ignorés, il sera donc possible d'insérer deux documents sans le champ sans briser la contrainte d'unicité.

``` js
db.stuff.createIndex({ thing: 1 }, { unique: true, sparse: true })
```

#### Arrière-plan

Par défaut, la création d'index est faite en avant-plan. C'est relativement rapide, mais bloque les lectures et écritures en base de données.

On peut créer les index en arrière-plan (non pas un arrière-plan de processus mais en arrière-plan du moteur de stockage). C'est plus lent, mais ne bloque ni les lectures ni les écritures pendant ce temps.

``` js
db.students.createIndex({'scores.score' : 1 }, { background : true })
```

Une autre manière d'indexer est de créer un index sur un serveur différent de celui utilisé pour la plupart des requêtes. Si vous avez un *replica set* MongoDB (c'est à dire un groupe de serveurs qui travaillent ensemble), vous pouvez sortir temporairement l'un d'eux du set, exécuter l'indexation en avant-plan sur ce serveur, puis le ramener dans le set une fois terminé.

### getIndexes

Retourne la liste des index qui existent sur une collection donnée.

``` js
db.students.getIndexes()
```

### stats

Pour des raisons de performance, il est essentiel que l'ensemble des index puissent être mis en mémoire.  
Pour le vérifier on peut

* afficher les stats d'une collection:

  ``` js
  db.students.stats()
  ```

* ou afficher uniquement la taille totale de l'index:

  ``` js
  db.students.totalIndexSize()
  ```

### dropIndex

Supprime un index donné.

``` js
db.students.dropIndex({ student_id: 1 })
```

### ensureIndex

#### Location: 2D

Les index géospatiaux permettent de trouver des éléments en fonction de leur emplacement.  
Pour rechercher des éléments dans un monde en 2D, il faut
* que les documents aient des coordonnées `x` et `y`

  ``` js
  {
    "location": [x, y]
  }
  ```

* utiliser `ensureIndex` pour créer un index géospatial 2d

  ``` js
  ensureIndex({ location: '2d', type: 1 }) // ASC index
  ```

* utiliser un opérateur géospatial lors de la requête

  ``` js
  db.stores.find({
      location: {$near: [x,y]}
  })
  ```

  `$near` retourne les résultats du proche au plus loin. Il existe d'autres opérateurs, par exemple pour trouver les résultats à l'intérieur d'une forme.

#### Location: 3D

Pour rechercher des éléments dan sun monde en 3D, il faut
* que les documents aient des coordonnées au format GeoJSON (seul Point et Polygon sont supportés).  
  Un point est définit par une longitude et une latitude, dans cet ordre.  
  Attention, MongoDB utilise `(longitude,latitude)` tandis que Google utilise `(latitude,longitude)`.

  ``` js
  {
      "name": "Apple Store",
      "location": {
          "type": "Point",
          "coordinates": [
              -122.1691295,
              37.4434854
          ]
      }
  }
  ```

* utiliser `ensureIndex` pour créer un index géospatial 3d

  ``` js
  db.places.ensureIndex({ location: '2dsphere' })
  ```

* utiliser un opérateur géospatial lors de la requête

  ``` js
  db.places.find({
      location: {
          $near: {
              $geometry: {
                  type: "Point",
                  coordinates: [-122.166641, 37.4278925]
              },
              $maxDistance: 2000  // meters
          }
      }
  });
  ```

### Words

Lorsqu'on effectue une recherche sur des chaîne de caractères, la chaîne entière doit matcher. Pour effectuer une recherche dans un champ texte, il faut donc indexer le document entier et chacun de ses mot.

1. utiliser `ensureIndex` pour créer un index *word*

   ``` js
   db.sentences.ensureIndex({'words':'text'})
   ```

2. utiliser `$text` lors de la requête

   ``` js
   db.sentences.find({
       $text: { $search: 'dog cat' }
   })
   ```

   La recherche appliquera un opérateur *ou* sur les mots: on recherche donc les documents qui contiennent soit chat soit chien. La recherche ignorera certains mots d'arrêts (comme "a" en anglais), la ponctuation et la casse.

3. pour trier sur la pertinence du résultat, utiliser `$meta`.

   ``` js
   db.sentences.find(
       { $text: {$search: "tree rat"} },
       { score: {$meta: 'textScore'} }
   ).sort({
       score: {$meta: 'textScore'}
   })
   ```

---

## Utilisation des index

### Requêtes couvertes

On dit qu'une requête est couverte (*covered query*) si elle peut être satisfaite entièrement par un index: aucun document n'a besoin d'être inspecté, la requête est donc très rapide. 
Pour être entièrement satisfaite par l'index, la requête ne doit pas récupérer de champs qui ne font pas partie de l'index (en spécifiant explicitement les champs sélectionnés).

``` js
db.numbers.createIndex({ i:1, j:1, k:1 })
db.numbers.find({ i:45, j:23 }, { _id:0, i:1, j:1, k:1 })
```

### Query planner

Pour choisir l'index à utiliser, MongoDB examine la requête: sur quels champs effectue-t-on la requête, les champs doivent-ils être triés? En se basant sur ces informations MongoDB
* identifie un ensemble d'index candidats
* créer un *query plan* (plan de requête) pour chacun d'entre eux
* exécute les requêtes dans différents thread
* vérifie laquelle est la plus rapide
* met en cache le *query plan* correspondant.

Ainsi, les prochaines requêtes utiliseront l'index le plus rapide.  
Évidemment une collection change au fil du temps, le *query plan* ne reste donc pas en cache indéfiniment.  
Il est vidé du cache
1. au bout d'un nombre d'écritures définit
2. si on modifie l'index
3. si on ajoute ou supprime un index de la collection
4. si MongoDB est redémarré

Il est possible de remplacer le *query plan* du planificateur de requête en spécifiant manuellement l'index à utiliser pour la requête avec `hint`:

``` js
db.status.find({ student_id: {$gt: 50000 }, class_id: 54 })
         .sort({ student_id: 1 })
         .hint({ class_id: 1 });
```

