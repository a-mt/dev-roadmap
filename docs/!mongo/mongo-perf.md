---
title: Performances
category: Web, BDD, MongoDB
---

## Explain

La commande `explain` est utilisée pour savoir ce que la base de données fait d'une requête donnée: comment elle l'exécute, quels index elle utilise, combien de documents elle inspecte, etc.

On ne peut pas l'utiliser sur l'instruction `insert`.  
Pour lister les méthodes qu'`explain` prend en charge chaîner la commande `help`:

``` js
db.students.explain().help()
```

La commande `explain` a différents modes, permettant d'afficher différentes statistiques:

* <ins>queryPlanner</ins>  
  C'est le mode par défaut. Indique les index que la base de données utilise.

  ``` js
  db.students.explain().find({ enseignants : {$all :[0,1]} } })
  ```

* <ins>executionStats</ins>  
  Indique quels sont les résultats des index: combien de documents ont été inspectés, combien ont été retournés, combien de temps ça a pris...

  ``` js
  db.students.explain('executionStats').find({ enseignants : {$all :[0,1]} } })
  ```

  ou

  ``` js
  db.students.explain(true).find({ enseignants : {$all :[0,1]} } })
  ```

* <ins>allPlansExecution</ins>  
  Périodiquement, l'optimiseur de requête exécute tous les index possibles qui pourraient être utilisés sur une requête, et garde en mémoire l'index le plus rapide pour exécuter les requêtes suivantes. Le mode *allPlansExecution* donne les stats résultantes.

  ``` js
  db.students.explain('allPlansExecution').find({ teachers: {$all:[0,1]} })
  ```

---

## Moteur de stockage

Le moteur de stockage est l'interface entre le stockage (disque) et la base de données (MongoDB). Le driver requête le serveur MongoDB, qui le relaie ensuite sur le disque via un moteur de stockage pour créer, lire, mettre à jour et supprimer des données.

Le moteur de stockage peut être modifié et selon celui qu'on utilise, les performances ne sont pas les mêmes pour différentes opérations. Les deux principaux moteurs de stockage sont MMAP (par défaut) et WiredTiger.
Le moteur de stockage n'affecte pas la communication entre les différents serveurs MongoDB ni l'API de la base de données.

### MMAP

MongoDB MMAP permet
* de verrouiller les collections: si on a deux opérations en écriture en même temps, et qu'elles sont dans la même collection, l'une va devoir attendre que l'autre soit finie.
* d'effectuer les mises en jour directement en mémoire, sur place, ce qui rend les modifications plus rapides. Elles sont ensuite répercutée sur le disque pour rendre le changement persistant.

### WiredTiger

WiredTiger
* utilise un système de verrou document par document et non par collection.
* compresse les données sur le disque.
* utilise des mises à jour en append: chaque fois que des documents sont modifiés, ils sont déplacés de la mémoire à la fin de la pile.

Les fichiers MMAP et WiredTiger sont incompatibles.

Pour démarrer MongoDB avec WiredTiger:

``` shell
killall mongodb
mongod -dbpath data -storageEngine wiredTiger
```

---

## Slow queries

Par défaut, MongoDB log les requêtes lentes de plus de 100ms dans la sortie console.

Pour démarrer MongoDB avec une durée autre, passer le paramètre `--slowms <integer>`

``` shell
mongod --slowms 2
```

## Profiler

Il est possible d'écrire les requêtes effectuées vers `system.profile`. Il s'agit d'une *cap collection*, ce qui signifie qu'elle a une taille fixe et que l'espace est recyclé une fois remplit (les anciennes logs sont effacées).

Pour logger les requêtes, il faut activer le profiler. Trois modes sont possibles:
* `0` (par défaut), désactivé
* `1` log les requêtes lentes
* `2` log toutes les requêtes

<!-- -->

* Pour démarrer MongoDB avec le profiler, passer le paramètre `--profile <integer>`

  ``` shell
  mongod --profile 1 --slowms 2
  ```

* Pour changer le mode du profiler, utiliser `setProfilingLevel`:

  ``` js
  db.setProfilingLevel(0) // --profile 0
  ```

  ``` js
  db.setProfilingLevel(1,4) // --profile 1 --slowms 4
  ```

* Pour afficher le statut du profiler:

  ``` js
  db.getProfilingLevel()
  ```

  ``` js
  db.getProfilingStatus()
  ```

---

## Mongotop

`mongotop` est nommée d'après la commande Unix `top`. Elle affiche où MongoDB passe son temps.

``` shell
mongotop 3 # rafraîchir toutes les 3 secondes
```

```
                     ns    total    read    write          2014-12-19T15:32:01-05:00
     admin.system.roles      0ms     0ms      0ms
   admin.system.version      0ms     0ms      0ms
               local.me      0ms     0ms      0ms
         local.oplog.rs      0ms     0ms      0ms
 local.replset.minvalid      0ms     0ms      0ms
      local.startup_log      0ms     0ms      0ms
   local.system.indexes      0ms     0ms      0ms
local.system.namespaces      0ms     0ms      0ms
   local.system.replset      0ms     0ms      0ms

```

## Mongostat

`mongostat` est nommée d'après la commande `iostat`. Elle échantillonne la base de données seconde par seconde et donne des informations sur qu'elle fait: nombre d'insertions, de requêtes, mise à jour et suppressions.

``` shell
mongostat
```

```
insert query update delete getmore command dirty used flushes vsize  res qrw arw net_in net_out conn                time
   991    *0     *0     *0       0     2|0  3.4% 4.5%       0 2.90G 297M 0|0 0|0  12.9m   84.2k    2 Oct  6 09:45:37.478
   989    *0     *0     *0       0     2|0  3.6% 4.7%       0 2.91G 310M 0|0 0|0  12.9m   84.1k    2 Oct  6 09:45:38.476
   988    *0     *0     *0       0     1|0  3.7% 4.8%       0 2.92G 323M 0|0 0|0  12.8m   83.8k    2 Oct  6 09:45:39.481
   976    *0     *0     *0       0     2|0  3.9% 5.0%       0 2.94G 335M 0|0 0|0  12.7m   83.7k    2 Oct  6 09:45:40.476
```