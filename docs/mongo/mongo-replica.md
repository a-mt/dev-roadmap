---
title: Replica set
category: Web, BDD, MongoDB
---

## Qu'est-ce qu'un replica set

Afin d'assurer la disponibilité et la tolérance aux pannes, on peut mettre en place un *replica set*, c'est à dire un ensemble de noeuds Mongo qui communiquent entre eux et essaient de garder une copie de l'ensemble de données la plus à jour possible.

Il y a un noeud primaire, puis des noeuds secondaires. Les données sont écrites dans le noeud primaire puis sont répliquées de manière asynchrone dans les noeuds secondaires. L'application et les drivers sont connectés au noeud primaire et écrivent dans ce noeud.

La réplication prend en charge les moteurs de stockage en mode mixte, on peut l'utiliser avec MMAP et WiredTiger.

## En cas de panne

Si le noeud primaire tombe en panne, une élection sera effectuée pour choisir un nouveau noeud primaire. Chaque noeud du *replica set* vote pour un autre noeud. Le noeud ayant obtenu une majorité stricte du nombre initial de noeud devient le nouveau noeud primaire.

Un *replica set* doit au avoir minimum 3 noeuds car avec moins de 3 noeuds, il n'y aurait aucun moyen d'élire un nouveau noeud primaire.

On peut décider du nombre de voix de chaque noeuds mais on suppose généralement que chaque noeud possède une voix — parce qu'en réalité il n'est pas très pratique d'accorder plus d'une voix à un noeud.

## Rollback

Lorsque le noeud qui était tombé en panne revient dans le *replica set*, il revient en tant que noeud secondaire. Il recopie alors les données du nouveau noeud primaire. Si le nouveau noeud primaire n'a pas eu le temps de se synchroniser avec l'ancien noeud primaire avant qu'il ne tombe en panne, les changements effectués entre temps sont perdus.

## Types de noeuds

Il existe différents types de noeuds:

* `regular`. Un noeud possédant les données de la base de données. Il peut être primaire ou secondaire. C'est le type de noeud le plus courant.

* `arbiter`. Le noeud arbitre n'existe que pour le vote. Si vous voulez un nombre pair de répliques, alors il faut avoir un noeud arbitre pour s'assurer qu'il ait toujours une majorité.

* `delayed`. C'est souvent un noeud de récupération après panne. Il peut être fixé à une heure, deux heures, ou plus, derrière les autres noeuds. Il peut participer au vote mais ne peut pas devenir noeud primaire. Pour ce faire, sa priorité est fixée à zéro.

* `hidden`. C'est souvent un noeud utilisé pour effectuer des analyses. Il ne peut pas devenir noeud primaire. Sa priorité est également fixée à zéro.

## Créer un replica set

1. Démarrer chaque noeud du replica set

    ``` shell
    # Créer un noeud dans le replica set rs1
    # Qui écoute sur le port 27017
    # Sauvegarde les données dans /data/rs1
    # Et log dans 1.log
    mongod --replSet rs1 --logpath "1.log" --dbpath /data/rs1 --port 27017 --fork
    ```

2. Créer un fichier pour lancer le replica set.  
   `rs` est une variable globale à l'intérieur du shell mongo, qui fait référence au replica set en cours.  
   Il n'est pas indispensable de créer un fichier, mais cela permet d'automatiser le processus.  

    ``` js
    // init_replica.js
    config = {
        _id: "rs1",
        members: [
            { _id: 0, host: "Andrews-iMac.local:27017", priority:0, slaveDelay:5 },
            { _id: 1, host: "Andrews-iMac.local:27018" },
            { _id: 2, host: "Andrews-iMac.local:27019" },
        ]
    }
    rs.initiate(config)
    rs.status()
    ```

3. À partir d'une des instances du replica set, lancer le replica set.

   ```
   mongo --port 27018 < init_replica.js
   ```

<ins>Commandes sur `rs`</ins>:

* vérifier le statut du replica set.

  ``` shell
  mongo --port 27018
  rs.status()
  ```

* afficher les configurations du replica set.

  ``` js
  rs.conf()
  ```

* afficher les commandes disponibles.

  ``` js
  rs.help()
  ```

* activer la lecture sur un noeud secondaire. Par défaut, lorsqu'on se connecte au shell mongo avec une node secondaire, on ne peut pas lire les données, il faut l'activer.

  ``` shell
  mongo --port 27019
  db.people.find()  # error
  rs.slaveOk()      # enable read
  db.people.find()  # ok
  ```

* ajouter un noeud au replica set

  ``` shell
  mongo localhost:27019
  rs.add("Andrews-iMac.local:27019")
  ```

<ins>Lister les noeuds mongo</ins>:

``` shell
ps -ef | grep mongo
```

<ins>Stopper le serveur</ins>:

``` js
use admin
db.shutdownServer()
```

## Se connecter à un replica set

Pour se connecter à un replica set avec le driver MongoDB de Node.js, il suffit de lister les noeuds que vous connaissez, séparés par des virgules:

``` js
MongoClient.connect("mongodb://"
    + "localhost:3001,"
    + "localhost:3002,"
    + "localhost:3003/course", function(err, db){
    // ... 
});
```

Il n'est pas nécessaire de lister tous les noeuds, le serveur découvrira les noeuds du replica set pourvu qu'il ait accès a au moins un noeud valide.

Le driver se connecte au serveur, détermine quel est le noeud primaire, quels sont les noeuds secondaires, obtient leur état, et en déduit où il doit lire et écrire. Tout est fait de manière transparente pour l'application.

Les lectures et écritures envoyées par le driver sont mises en mémoire tampon dans le driver. En cas de panne d'un noeud, le driver conserve la requête jusqu'à ce que la nouvelle élection ait lieu, puis envoie les informations au nouveau noeud primaire.

## Synchronisation

Chaque noeud en cours d'exécution possède un journal *oplog*. Lorsqu'on écrit sur un noeud primaire, les requêtes sont écrites dans l'oplog puis, à intervalles réguliers, les noeuds secondaires viennent consulter ce qu'il y a de nouveau depuis leur dernière mise à jour pour appliquer ces mêmes requêtes.

Pour afficher ce qu'il y a dans l'oplog:

``` js
db.oplog.rs.find().pretty()
```

L'oplog est une *cap collection*, ce qui signifie que la quantité d'information qu'elle retient est limitée. Il faut s'assurer d'avoir un oplog assez grand pour faire face aux périodes où le noeud secondaire ne peut entrer en contact avec le noeud primaire. La taille choisie devra prendre en compte le réseau et la quantité de données écrites.

Dans le cas où l'oplog est trop court, il est toujours possible de synchroniser le noeud secondaire avec le noeud primaire en lisant l'intégralité de la base de données, ce qui est BEAUCOUP plus lent.

## Journalisation

Le serveur gère la mémoire et le disque dur.
La base de données est principalement écrite en mémoire, et est périodiquement lue et écrite sur le disque. MongoDB a également un journal qui enregistre tout ce que la base de données traite.

Par défaut, MongoDB écrit la requête sur le disque une fois que l'application termine la requête (`w=1`) mais garde le journal en mémoire (`j=0`). Le journal serait écrit après quelques secondes.

| w | j | Effet
|---|---|---
| 1 | 0 | Rapide, fenêtre de vulnérabilité réduite
| 1 | 1 | Lent
| 0 |   | Unack, non recommandé

* Le paramètre `w` détermine le nombre de noeud à attendre avant de passer à l'étape suivante de l'insertion. `w=1` attend simplement que le noeud primaire valide l'écriture, `w=2` attend que le noeud primaire et un autre noeud valident l'écriture.

  On peut également définir `w="majority"`, ce qui causera Mongo d'attendre que la majorité des noeuds valident l'écriture. Cela évite des rollbacks en cas de changement de noeud primaire.

* Le paramètre `j` détermine s'il faut également attendre l'écriture du journal. `j=1` attend que le journal soit écrit sur le disque.

* `wtimeout` est le temps que la base de données attendra pour la réplication avant de renvoyer une erreur sur le driver.

Ces paramètres peuvent être définis sur une connexion, une collection (via le driver) ou dans la configuration du replica set.

<ins>Node.js</ins>:

``` js
const url    = 'mongodb://localhost:50000,localhost:50001';
const dbName = 'myproject';
const client = new MongoClient(url, { w: "majority", j: 0 });
```

[Driver Node.js: Options de connection](http://mongodb.github.io/node-mongodb-native/3.1/reference/connecting/connection-settings/)

## Lecture & écriture

Par défaut, les lectures et écritures sont faites sur le noeud primaire. Par conséquent, on lit toujours ce qu'on a écrit.
Mais il est possible de changer les configurations pour lire les données à partir des noeuds secondaires. En faisant cela, il est possible de lire temporairement des données périmées car la réplication est asynchrone. Si cet inconvénient est acceptable, cela permettra de repartir la charge de requêtes sur différentes machines.

Les différentes préférences disponibles sont:

| Préférence           | Description
|---                   |---
| `primary`            | Toujours utiliser le noeud primaire (par défaut)
| `primaryPreferred`   | Utiliser un noeud secondaire si le noeud primaire n'est pas disponible
| `secondary`          | Faire pivoter les lectures vers les noeuds secondaires
| `secondaryPreferred` | Faire pivoter les lectures sur les noeuds secondaires ou sur le noeud primaire s'il n'y en a pas de disponibles
| `nearest`            | Utiliser l'instance `mongod` la plus proche en terme de temps ping

<ins>Node.js</ins>:

``` js
const client = new MongoClient(url, { readPreference: 'secondaryPreferred' });
```