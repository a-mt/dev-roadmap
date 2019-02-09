---
title: Opérations CRUD
category: Web, BDD, MongoDB
---

CRUD est un acronyme pour Create, Read, Update, Delete.  
Ce sont les opérations de base pour travailler avec n'importe quel SGBD.

## Create

### insertOne

La commande `insertOne` permet d'insérer un document dans la base de données en cours.

``` js
// Insère un document
db.movies.insertOne({title: "Alice in Wonderland"})
```

### insertMany

Permet d'insérer plusieurs documents en même temps.

``` js
// Insère plusieurs documents
db.movies.insertMany([
    {title: "Star Trek"},
    {title: "Star Trek II"}
])
```

Par défaut, MongoDB effectue une insertion ordonnée, ce qui signifie que dès qu'il rencontre une erreur sur l'un des documents (un `_id` qui existe déjà par exemple), il arrête l'insertion des documents. En passant l'option `"ordered": false`, MongoDB exécutera une insertion non ordonnée, et continuera toujours d'insérer le reste des documents en cas d'erreur.

``` js
// Continue d'insérer le reste des documents en cas d'erreur
db.movies.insertMany([
    {title: "Star Trek", "_id": "1"},
    {title: "Star Trek", "_id": "1"},
    {title: "Star Trek II", "_id": "2"}
], {"ordered": false})
```

<ins>Exemples Node.js</ins>:

Sauvegarder les tweets de l'utilisateur "Marvel" en base de données:

``` js
/* Retrieve tweets since last inserted */

// Retrieve the last inserted document
var cursor = db.collection("documents").find("user.screen_name": "Marvel");
cursor.sort({"id": -1});
cursor.limit(1);

cursor.toArray(function(err, docs){
    assert.equal(err, null);

    // Twitter query parameters
    var params = { screen_name: "Marvel", count: 10 };

    if(docs.length == 1) {
        params.since_id = docs[0].id;
    }

    // Request Twitter
    twitterClient.get('statuses/user_timeline', params, function(err, documents, response) {
        assert.equal(err, null);

        // Insert the tweets in the database
        db.collection("documents").insertMany(documents, function(err, res){
            console.log(res);
        });
    });
});
```

``` js
/* Keep on listening new tweets */

twitterClient.stream('statuses/filter', { track: 'Marvel' }, function(stream){
    stream.on('data', function(doc) {
        console.log(doc);

        // Insert the tweet in the database
        db.collection("documents").insertOne(doc, function(err, res){
            console.log(res.insertedId + ' inserted');
        });
    });
    stream.on('error', function(error) {
        throw error;
    });
});
```

---

## Read

### find

La commande `find` permet de récupérer les documents d'une collection donnée.  
Il est possible de sélectionner les champs à récupérer et filtrer les documents à retourner. Par défaut, `find` retourne tous les documents.

``` js
// Listes des documents de la collection movies
db.movies.find()
```

### pretty

Pour récupérer le JSON espacé, indenté, etc, on peut chaîner la commande `pretty`.

``` js
db.movies.find().pretty()
```

### count

Pour récupérer le nombre de document matchés, on peut chaîner la commande `count`.

```
db.movieDetails.find().count()
```

### Afficher le résultat

La méthode `find` retourne un curseur. Pour accéder aux documents, il faut itérer sur le curseur.

<ins>Mongo shell</ins>:

Dans le shell MongoDB, si on n'assigne pas la valeur de retour de `find` à une variable, le curseur est automatiquement itéré 20 fois pour imprimer les premiers éléments retournés.

``` js
var c   = db.movieDetails.find();
var doc = function(){ return c.hasNext() ? c.next: null; }
doc();
```

Le serveur MongoDB effectue la recherche par lot (*batch*). Pour la plupart des requêtes, le premier lot renvoie 101 documents — juste assez de documents pour dépasser 1MB (il est possible de modifier la taille par défaut du batch). Tandis qu'on itère sur le curseur avec `next`, MongoDB récupérera le batch suivant s'il reste des résultats.
Pour voir le nombre de documents restant dans le batch en cours, on peut utiliser `objsLeftInBatch`

``` js
c.objsLeftInBatch();
```

<ins>Node.js</ins>:

Il y a différentes manières de récupérer le résultat:

* en utilisant `toArray`

  ``` js
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect('mongodb://localhost:27017/mydatabase', function(err, db){
      assert.equal(err, null);

      db.collection('companies')
        .find({category_code: "biotech"})
        .toArray(function(err, docs){

          assert.equal(err, null);
          asset.notEqual(docs.length, 0);

          docs.forEach(function(doc){
              console.log(doc.name);
          });
        });
  });
  ```

* `forEach`

  ``` js
  var cursor     = db.collection('companies').find({category_code: "biotech"}),
      numMatches = 0;

  cursor.forEach(function(doc){
      numMatches++;
      console.log(doc.name);

  // called at the end of iterations or if an error is triggered
  }, function(err) {
      assert.equal(err, null);
      console.log("Matching documents: " + numMatches);
  });
  ```

* `next`

  ``` js
  var cursor = db.movies.find();

  while(cursor.hasNext()) {
      var doc = cursor.next();
      console.log(doc.name);
  }
  ```

### Paginer le résultat

* `sort`: ordonner le résultat

  ``` js
  cursor.sort({
      ['founded_years', 1],
      ['number_of_employees', -1]
  });
  ```

  Si l'on essaie de trier un nombre important d'éléments qui n'ont pas d'index, il est vraisemblable d'obtenir une erreur, puisque le tri sera effectué en mémoire et non du côté MongoDB. Pour éviter ça, créer un index:

  ``` js
  db.companies.createIndex({ permalink: 1 });
  ```

* `skip`: passer les x premières lignes

  ``` js
  cursor.skip(nbElem*page);
  ```

* `limit`: limiter le résultat à x documents

  ``` js
  cursor.limit(nbElem);
  ```

### Filtrer les documents

#### Égalité

Si on veut filtrer les documents selon la valeur d'un ou des champs, on peut simplement utiliser la notation JSON:

``` js
// Films dont le titre est "Jaws"
db.movies.find({"title": "Jaws"})
```

``` js
// Films PG-13 sortis en 2009 (et)
db.movieDetails.find({ rated: "PG-13", year: 2009 })
```

<ins>Objet imbriqué</ins>:

On peut utiliser la notation par point pour requêter les champs d'un objet imbriqué:

``` js
// Le champs meter de l'objet imbriqué tomato doit valoir 100
db.movieDetails.find({ "tomato.meter": 100 })
```

<ins>Liste</ins>:

On peut également filtrer les éléments selon les valeurs d'une liste.

* tableau entier:

  ``` js
  // Documents dont les seuls auteurs sont Ethan Coen et Joel Coen, dans cet ordre
  db.movieDetails.find({ "writers": ["Ethan Coen", "Joel Coen"] })
  ```

* une des valeurs du tableau:

  ``` js
  // Documents où un des auteurs est Jeff Bridges
  db.movieDetails.find({ "authors": "Jeff Bridges" })
  ```

* une des valeurs du tableau, à un index spécifique:

  ``` js
  // Documents où le premier auteur de la liste est Jeff Bridges
  db.movieDetails.find({ "authors.0": "Jeff Bridges" })
  ```

#### Inégalité

Pour tester une inégalité (documents dont la valeur d'un champs n'est pas égale à, supérieur à, etc), on utilise un opérateur.

| Opérateur | Description
|---        |---
| `$eq`     | =
| `$gt`     | >
| `$gte`    | >=
| `$lt`     | <
| `$lte`    | <=
| `$ne`     | !=. Retourne les documents dont la valeur d'un champ n'est pas égale à la valeur donnée, ou qui n'ont pas le champ donné.

``` js
// Films dont la durée est supérieure à 90 min
db.movieDetails.find({ runtime: { $gt: 90 } })
```

``` js
// Films dont la durée est supérieure à 90 min et inférieure à 120 min
db.movieDetails.find({ runtime: { $gt: 90, $lte: 120 } })
```

#### Options

Les opérateurs `$in` et `$nin` permettent de vérifier si l'un valeur d'un champ est égale à l'une des valeurs spécifiées.

| Opérateur | Description
|---        |---
| `$in`     | =
| `$nin`    | !=. Retourne les documents où la valeur d'un champ n'est pas parmi les valeurs spécifiées, ou qui n'ont pas le champ donné.

``` js
// Films G ou PG
db.movieDetails.find({ rated: { $in: ["G", "PG"] } })
```

#### Regex

Pour tester si la valeur d'un champ correspond à une regex (PCRE), on utilise l'opérateur `$regex`.

``` js
// Films dont le champ award.text commence par Won
db.movieDetails.find({ "award.text": { $regex: /^Won.*/ } })
```

#### Champs

| Opérateur | Description
|---        |---
| `$exists` | Vérifie si le champ du document existe ou non.
| `$type`   | Vérifie le type (BSON) du champ.

``` js
// Documents où le champ tomato.meter existe
db.movieDetails.find({ "tomato.meter": { $exists: true } })
```

``` js
// Documents dont le champs _id est de type string
db.movieDetails.find({ "_id": { $type: "string" } })
```

#### Tableau

On peut filtrer les documents selon les caractéristiques d'un champ liste donné.

| Opérateur    | Description
|---           |---
| `$all`       | Liste contenant toutes les valeurs données, dans n'importe quel ordre.
| `$size`      | Liste de la longueur donnée.
| `$elemMatch` | Liste ayant au moins un élément matchant la requête donnée.

``` js
// Films ayant pour genre comedy, crime, drama (peut en avoir davantage)
db.movieDetails.find({
    genres: { $all: [ "Comedy", "Crime", "Drama" ] }
})
```

``` js
// Films ayant été filmés dans un seul pays
db.movieDetails.find({
    countries: { $size: 1 }
})
```

``` js
// Étudiants ayant un un score de type exam supérieur à 99.8
db.students.find({
  scores: { $elemMatch: { type: 'exam', score: { $gt: 99.8 } }}
})
```

#### Combinaisons

Il existe également des opérateurs permettant de combiner les filtres.

| Opérateur | Description
|---        |---
| `$or`     | &verbar;&verbar;
| `$and`    | &&
| `$not`    | !
| `$nor`    | !&verbar;&verbar;

``` js
// Documents dont le champ tomato.meter est supérieur à 95
// Ou dont le champ metacritic est supérieur à 88
db.movieDetails.find({
    $or: [
        { "tomato.meter": { $gt:95 } },
        { "metacritic": { $gt: 88 } }
    ]
})
```

``` js
// Étudiants ayant un score de type exam et un score supérieur à 99.8
// (pas forcemment le même élément de la liste)
db.students.find({
  $and: [
      { "scores.type": "exam" },
      { "scores.score": { $gt: 99.8 } }
  ]
})
```

### Sélectionner les champs retournés

Par défaut, MongoDB retourne tous les champs des documents qui matchent la requête. Utiliser une *projection*, c'est à dire limiter les champs retournés pour chaque document, permet de réduire la taille des données retournées par une requête et ainsi réduire l'utilisation du réseau et du CPU.

On peut inclure et exclure explicitement les champs des documents retournés.  
Lorsqu'on exclue explicitement des champs, tous les champs sont retournés hormis ceux exclus.  
Lorsqu'on inclue explicitement des champs, ce sont les seuls champs retournés, à l'exception de `_id`, qui est toujours retourné par défaut. Il faut l'exclure explicitement pour qu'il ne soit pas retourné.

``` js
// Récupérer uniquement le champs title (et non _id)
db.movieDetails.find({ rated: "PG"}, { title: 1, _id: 0 }).pretty()
```

<ins>Node.js</ins>:

``` js
var query      = {category_code: "biotech"};
var projection = {name:1, _id:0};

var cursor = db.collection('companies').find(query);
cursor.project(projection);
cursor.foreach(function(doc){
    //
});
```

---


## Update

### updateOne, updateMany

Met à jour les champs d'un document.  
`updateOne` met à jour le **premier** document qui matche la requête,  
`updateMany` met à jour **tous** les documents qui matchent la requête.

Les opérateurs permettent de définir l'opération à effectuer (mettre à jour la valeur, renommer le champ, etc).

``` js
// Met à jour le poster du film "The Martian"
db.movieDetails.updateOne(
    { title: "The Martian"},            // select
    { $set: { poster: "http://..." } }  // add or override value
)
```

#### Upsert

Les commandes de mise à jour (*update*) peuvent également insérer des documents (*insert*), ces opérations sont dites des opérations *upsert*. Lorsque l'option upsert est activée, une insertion sera effectuée lorsqu'il n'existe pas de documents correspondants au sélecteur utilisé.

``` js
// Met à jour les champs du document
// Ou l'insère s'il n'existe pas
db.movieDetails.updateOne(
    { "imdb.id" : detail.imbd.id },
    { $set: detail },
    { upsert: true }
)
```

#### Opérateurs simples

| Opérateur      | Description
|---             |---
| `$set`         | Définit la valeur d'un champ
| `$setOnInsert` | Met à jour le champ si l'upsert effectue un insert
| `$min`         | Met à jour le champ si la valeur spécifiée est inférieure à la valeur en base de données
| `$max`         | Met à jour le champ si la valeur spécifiée est supérieure à la valeur en base de données
| `$currentDate` | Met à jour le champ avec la date actuelle (Date ou Timestamp)
| `$inc`         | Incrémente la valeur du champ de la valeur spécifiée
| `$mul`         | Multiplie la valeur du champ par la valeur spécifiée
| `$unset`       | Supprime un champ
| `$rename`      | Renomme un champ

#### Opérateurs sur les listes

| Opérateur   | Description
|---          |---
| `$addToSet` | Ajoute des éléments au tableau s'il n'y sont pas déjà
| `$pop`      | Supprime le premier ou le dernier élément d'un tableau
| `$pullAll`  | Supprime toutes les valeurs correspondantes d'un tableau
| `$pull`     | Supprime toutes les éléments d'un tableau qui correspondent à une requête donnée
| `$push`     | Ajoute un élément au tableau

``` js
// Ajoute { rating: 4.5 } à la liste reviews
db.movieDetails.updateOne({ title : "The Martian" }, {
    $push: {
        reviews: { rating: 4.5 }
    }
})
```

`$push` accepte différents paramètres:
* `$each` pour ajouter plusieurs éléments séparément (et non ajouter une liste à l'intérieur de la liste)
* `$position` pour définir l'emplacement de l'insertion
* `$slice` pour tronquer la liste

``` js
// Ajoute { rating: 4.5 } et { rating: 5 } à la liste reviews
db.movieDetails.updateOne({ title : "The Martian" }, {
    $push: {
        reviews: {
            $each : [{ rating: 4.5 }, { rating: 5 }]
        }
    }
})
```

``` js
// Ajoute deux éléments au début de la liste reviews
// Et tronque la liste à 5 éléments
db.movieDetails.updateOne({ title : "The Martian" }, {
    $push: {
        reviews: {
            $each : [{ rating: 4.5 }, { rating: 5 }],
            $position: 0,                   // add reviews at the beginning
            $slice : 5                      // only keep 5 reviews (0 - 5)
        }
    }
})
```

### replaceOne

Remplace un document par un autre.  
Cette commande n'accepte pas les opérateurs de mise à jour.

``` js
db.movieDetails.replaceOne(
    { "imbd": detail.imbd.id },
    detail
);
```

---

## Delete

Les commandes `deleteOne` et `deleteMany` remplacent la commande `remove`, qui a été dépréciée.

``` js
db.stuff.remove({ thing: 'apple' }, { justOne: true })
```

### deleteOne

Supprime le premier document correspondant à la requête.

``` js
db.orders.deleteOne( { "_id" : ObjectId("563237a41a4d68582c2509da") } );
```

<ins>Node.js</ins>:

``` js
// Check and delete duplicates
var cursor = db.collection('companies').find({
    permalink : { $exists: true, $ne: null }
});
cursor.project({ permalink: 1, updatded_at: 1 });
cursor.sort({ permalink: 1 });

var num = 0;
var previous = { permalink: "", updated_at: "" };
cursor.forEach(function(doc){

    // Is duplicate ?
    if(doc.permalink != previous.permalink
        || doc.udpated_at != previous.updateAt) {
        previous = doc;
        return;
    }
    num++;

    // Delete duplicate
    db.collection('companies').deleteOne({ _id: doc._id }, function(err, res){
        assert.equal(err, null);
    });
});
```

### deleteMany

Supprime tous les documents correspondant à la requête.

``` js
db.orders.deleteMany( { "client" : "Crude Traders Inc." } );
```

<ins>Node.js</ins>:

``` js
var markedForRemoval = [];
cursor.forEach(function(doc){

    // Is duplicate ...

    // Delete duplicate
    markedForRemoval.push(doc._id);

}, function(err){
    assert.equal(err, null);

    db.collection('compagnies').deleteMany({
        _id: { $in: markedForRemoval }
    }, function(err, res) {
        num = markedForRemoval.length;
    });
});
```

