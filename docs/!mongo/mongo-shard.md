---
title: Sharding
category: Web, BDD, MongoDB
---

## Qu'est-ce que le sharding

La réplication crée des copie supplémentaires des données et permet le basculement automatique vers un autre noeud en cas de panne. La réplication peut également aider à mettre à échelle les lectures pourvu qu'il soit acceptable de lire des données qui, potentiellement, ne sont pas les plus récentes.

Le *sharding* (éclatement), quant à elle, est une technique qui permet la mise à échelle des écritures en partitionnant les données sur plusieurs serveurs. Plutôt que d'avoir une collection dans une seule base de données, on l'étale sur plusieurs.

Le sharding et la réplication sont typiquement combinés pour créer un [sharded cluster](https://docs.mongodb.com/manual/core/sharded-cluster-components/).

## Mettre en place du sharding

1. On déploie de multiples serveurs `mongod`. Les *shards* sont typiquement en eux-mêmes des replica set, donc il peut y avoir 3 hôtes dans un shard.

1. On démarre le router, `mongos` (livré avec l'installation de MongoDB), pour garder l'ensemble des connexions et s'occuper de la distribution des données.

1. On choisit une clé (*shard key*), par exemple `student_name`. Ce peut être une clé composée et les valeurs n'ont pas a être unique, mais le champs doit être **immutable** et exister dans tous les documents de la collection. Il doit également y avoir un index sur cette clé.

   Une fois qu'on a choisit une clé, `mongos` éclate les données entre les différentes serveurs suivant cette clé. Chaque *shard* gère un intervalle de clé donné. Pour cette raison, il faut choisir une clé qui n'augmente pas de façon monotome, comme un timestamp ou id BSON, ou seul le dernier shard sera utilisé en permanence. Une bonne clé pourrait être `{product.brand, product.date}` ou `{user.username}`.

   Une fois le sharding effectué, il n'est donc plus possible de changer de clé. Il est donc important de bien réfléchir à l'avance.

1. `mongos` conserve les informations sur la façon dont les données sont distribuées à travers les différents *shards* sur les serveurs de configuration. Les serveurs de configuration ne font pas forcément partie d'un replica set mais utilisent un commit en deux phases pour tout changement.

1. L'application envoie les requêtes vers `mongos` (qui tourne généralement sur le port 27017). Celui-ci s'occupe de communiquer avec les instances `mongod` situées sur les différents serveurs, la distribution des données est donc transparente pour l'application.

   Tout insert doit contenir la clé.  
   Pour les mises à jour, suppressions ou recherches, si la clé n'est pas donnée alors la requête sera diffusée sur tous les serveurs qui contiennent la collection.  
   Si la requête ne sélectionne que les champs qui font partie de la clé, le routeur s'en occupe directement et on obtient la réponse très rapidement.

Cf [init_sharded_env.sh](https://github.com/qmmr/mongodb/blob/master/init_sharded_env.sh)