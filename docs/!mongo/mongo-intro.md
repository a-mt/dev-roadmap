---
title: Les bases de MongoDB
category: Web, BDD, MongoDB
---

MongoDB est une base de données NoSQL.  
MongoDB supporte nativement la mise à échelle (fonctionnalité de *sharding*), de manière abstraite, en dehors de la logique de l'application.

## Structure

* **document**:  
  Au lieu de stocker les données dans une base de données relationnelle, on stocke toutes les données associées dans un *document* unique. Cela rend la distribution et répartition des données  sur plusieurs serveurs beaucoup plus facile. Les documents sont de 16MB maximum.

* **collection**  
  Les documents sont stockés dans des *collections* (l'équivalent d'une table).

* **database**  
  Les collections sont elles-mêmes organisées en *databases* (base de données).   
  La collection et la database forment un espace de nom, utilisé pour désigner l'emplacement des données.  
  Par exempe, `video.movie` spécie la collection *movie* de la database *video*.

Il n'existe pas de schéma pour les documents. Différents documents peuvent avoir différents champs au sein de la même collection.

---

## Format

Les données sont stockées au format BSON (JSON binaire).  
BSON étend les types de valeurs JSON et permet de différencier les entiers, les doubles, les dates et les données binaires (pour stocker des images par exemple).

``` js
{
  "date": ISODate("2015-10-27T22:35:21.908Z")
}
```

On utilise la notation JSON pour effectuer des requêtes.  
La conversion entre le langage qu'on utilise (comme PHP ou Node.js) et BSON est assurée par le driver.

### BSON

* BSON a été conçu pour être **léger**: l'espace requit pour représenter les données est réduit au strict minimum.
* BSON est également **traversable**: supporte la variété d'opérations nécessaires à l'écriture, la lecture et l'indexation des documents MongoDB.
* Enfin, BSON est **efficient**: le codage des données vers BSON et le décodage des données de BSON, comme les drivers doivent le faire, peuvent être effectués très rapidement.

BSON stocke la longueur du document, le type de la valeur de chaque champ, sa longueur et sa valeur, et utilise NUL comme délimiteur.

    // JSON
    { "hello": "world" }

    //BSON
    \x16\x00\x00\x00\x02hello\x00\x06\x00\x00\x00world\x00\x00

En savoir plus: [http://bsonspec.org](http://bsonspec.org)

### ObjectID

Dans MongoDB, tous les documents doivent avoir un champ `_id` unique.   
Si le champ `_id` n'est pas définit au moment de l'insertion du document, MongoDB en génère un automatiquement, de type ObjectID.

ObjectId est un type spécifique définit dans les specs BSON.  
Il s'agit d'une chaîne hexadécimale de 12 octets structurée de cette façon:

    DATE_UNIX (4 octets) | MAC ADDR (3 octets) | PID (2 octets) | COUNTER (3 octets)

---

## Accéder à MongoDB

Même principe que Mysql, après avoir installé MongoDB, on peut accéder au SGDB par la ligne de commande.  
Pour utiliser MongoDB avec un langage de programmation, il est nécessaire d'installer le driver MongoDB pour le langage voulu, puis utiliser l'interface telle qu'elle a été définit pour ce langage.

### Shell

Pour se connecter

1. Démarrer le serveur MongoDB

       mongod

2. Démarrer un shell Mongo (démarre sur localhost 27017 par défaut).  
   Le shell Mongo est un interpréteur JavaScript entièrement fonctionnel.

       mongo

3. Afficher les commandes disponibles

       help

4. Sélectionner une base de données.  
   Si on utilise une base de données qui n'existe pas déjà, MongoDB la créera lorsqu'on insèrera un document dans une collection à l'intérieur de cette base de données.

   ``` js
   use video
   ```

5. Effectuer des requêtes.  
   Lorsqu'on effectue des opérations CRUD (Create, Read, Update, Delete), on travaille toujours avec une variable globale appelée `db`. Cette variable est une référence à la base de données actuellement utilisée.

   ``` js
   db.movies.insertOne({'title': 'Jaws', 'year', 1975})
   ```

   La commande ci-dessus insère un document dans la collection `movies` de la database `video` précédemment sélectionnée.

### Node.js

Le driver MongoDB de Node.js permet de faire des requêtes MongoDB comme on le ferait dans le shell.

``` js
var express     = require('express'),
    app         = express(),
    engines     = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    assert      = require('assert');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

MongoClient.connect('mongodb://localhost:27017/video', function(err, db){
    assert.equal(null, err);

    // Response on homepage
    app.get('/', function(req, res){

        // Get all documents in the mvoies collection
        db.collection('movies').find({}).toArray(function(err, docs){
            res.render('movies', {'movies': docs});
        });
    });

    // Fallthrough handler
    app.use(function(req, res){
        res.sendStatus(404);
    });
});
```

### PHP

Voir: [MongoDB driver (PHP)](http://php.net/manual/en/set.mongodb.php).

### Python

``` python
import pymongo
import sys

connection = pymongo.Connection('mongodb://localhost', safe=True)
db  = connection.school

doc = db.students.find_one({ student_id: 50000 })
if (doc is not None):
    print "first score for student ", doc['student_id'], " is ", doc['scores'][0]['score']
```