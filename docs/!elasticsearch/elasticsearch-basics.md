---
title: Les bases
category: Web, ElasticSearch
---

## Qu'est-ce que c'est

* ElasticSearch est un moteur de recherche et d'analyse des données. Ses points forts: la rapidité, la scalabilité et la pertinence des résultats de recherches.

  Il est notamment conçu pour exceller dans les recherches fulltext. Si on voulait chercher les posts contenant "Python programming language" dans une base de données, où les termes peuvent apparaître soit dans le titre soit dans la description, et où les termes peuvent être séparés par d'autres termes, il faudrait ajouter plusieurs clauses OR avec chaque terme, puis calculer la pertinence des résultats côté back-end pour les ordonner (compter le nombre de termes qui matchent et leurs distances). Avec Elasticsearch, c'est lui qui s'occupe de tout, et ce très rapidement. Il peut également manipuler les valeurs numériques, dates, localisations géographiques, etc.

  On peut se servir de cette capacité pour créer un moteur de recherche ou pour analyser des données — des logs, des capteurs, mails, articles, etc.

* Elasticsearch est gratuit et open-source, développé en Java (basé sur Lucene).  
  On communique avec Elasticsearch via une API REST avec des requêtes JSON — port 9200 par défaut.

* Pour ajouter Elasticsearch pour un site e-commerce, il faudra nécessairement dupliquer les données entre la base de données et le moteur de recherche. On envoit les données à ElasticSearch, qui les stocke et optise les index pour une recherche efficace, après quoi on peut requêter les données. Pour contre-balancer cet inconvénient 1. l'espace disque est peu cher, et on économise en processing 2. on augmente les performances de l'application.

* De par sa scalabilité (distribution des données dans un cluster), Elasticsearch supporte nativement de grandes quantités de données et ce en temps réel. C'est la raison pour laquelle Elasticsearch est souvent utilisé en production par de grandes entreprises — comme Uber, Tinder, Github, Samsung, Docker, Shopify, Slack, etc.

## Elastic Stack

* Elastic Stack est un ensemble d'outils permettent de chercher, analyser et visualiser des données:

  * **Elasticsearch** est le coeur de la stack, il indexe les données et effectue des recherches dessus.

  * **Kibana** est une application web permettant de voir et d'interragir avec Elasticsearch. On peut également créer un dashboard et afficher des graphiques en temps réel.

  * **Beats** est une collection d'agents légers ayant pour objectif de récolter des données. Par exemple, Filebeat est utilisé pour collecter des fichiers: il a notamment des modules pour récupérer les fichiers de logs courants tels que Nginx, Apache web server ou mySQL. Metricbeat quant à lui collecte des métriques systèmes telles que l'usage CPU, RAM ou les services en cours d'execution. Les données collectées peuvent être envoyées vers Elasticsearch ou Logstash.

  * **Logstash** est une pipeline de traitement des données. Elle est constituée de 3 parties:

    - entrées: Logstash reçoit des données sous forme d'événement. Ce peut être tout ce qu'on veut: des logs, mails, commandes e-commerce, messages chat, etc.

    - filtres: les données sont traitées. Par exemple, on peut indiquer à Logstash de lire ligne par ligne le contenu d'un fichier de logs et d'en extraire les données: méthode HTTP, path, query, adresse IP, etc. On peut aussi enrichir les données, comme rechercher l'emplacement géographique d'une adresse IP ou lire des infos en base de données.

      ```
      184.252.108.229 - joe [20/Sep/2017:13:22:22 +0200] "GET /products/view/123" 200 12798

      ↆ

      {
        "ip_address": "184.252.108.229",
        "user": "joe",
        "http_verb": "GET",
        "request_path": "/products/view/123",
        "http_status": 200,
        ...
      }
      ```

    - sortie: le résultat du filtre est envoyé vers une ou plusieurs destinations (appelées stash). Ce peut être vers Elasticsearch, une queue Kafka, une adresse email, un endpoint HTTP, etc.

  * **X-Pack** ajoute des fonctionnalités supplémentaires à Elasticsearch et Kibana 

    * <ins>authentification et permissions</ins>: créer des utilisateurs et des rôles.
    * <ins>monitoring</ins>: CPU, RAM et usage disque d'elasticsearch, logstash et kibana.
    * <ins>envois d'alertes</ins>: pour tout ce qu'on veut — usage CPU, comportement suspect, etc.
    * <ins>reporting</ins>: générer un PDF des graphiques ou CSV des données. Peut être déclenché à la demande, à intervalle régulier, ou quand des règles définies sont remplies.
    * <ins>machine learning</ins>: détecter des anomalies, prédire des données futures.
    * <ins>graph</ins>: trouver des items similaires. Utilise le calcul de pertinence d'Elasticsearch pour distinguer ce qui est populaire (ex papier toilette, pates) de ce qui est lié (ex pates, sauce tomate).
    * <ins>SQL</ins>: traduire une requête SQL en requête DSL (format Elasticsearch). Peut être utile au début pour apprendre.

* ELK est l'acronyme d'Elasticsearch, Logstash et Kibana. Ce terme était utilisé avant que Beats et X-Pack ne s'ajoutent à la liste d'outils Elastic. Aujourd'hui, on parle généralement d'Elastic Stack à la place — qui est un superset d'ELK.

---

## Concepts de base

* <ins>Document</ins>  
  Les données sont stockées dans des *documents*, qui sont des objets JSON — il n'y a pas de schéma de données. Comme les documents sont stockés en JSON, qui est un format web largement utilisé, on peut facilement intégrer Elasticsearch avec n'importe quelle technologie.

  ![](https://i.imgur.com/Ue4fi5M.png)

* <ins>Index</ins>:  
  Les documents sont associés de manière logique à un *index*, qui peut être considéré comme un label pour désigner un ensemble de documents qui partagent des caractéristiques similaires. On limite généralement une recherche aux documents d'un index donné.

* <ins>Node</ins>:  
  Une instance d'ElasticSearch en cours d'execution est appelée une *node*. Chaque node a un identifiant unique et un nom.

* <ins>Cluster</ins>:  
  Un *cluster* est un ensemble de nodes, réparties sur différentes machines, qui travaillent ensemble pour accomplir une tâche. Quand on démarre une node, un cluster est automatiquement créé.

* <ins>Shard</ins>:  
  Un *shard* est un emplacement physique sur le disque où sont stockées les données. Le nombre de documents qu'un shard peut contenir dépend de sa capacité.

  ![](https://i.imgur.com/JKz7gUW.png?2)

* <ins>Sharding</ins>:  
  Disperser les données sur plusieurs shards est une pratique appellée *sharding*. Cela permet

  1. d'augmenter la capacité du cluster.  
     On peut ajouter de nouvelles nodes/shards pour pouvoir stocker plus de données.

  2. d'augmenter la rapidité de la recherche.  
     * Si on effectue une recherche dans 500 000 documents stockés dans 1 shard, ElasticSearch va être limité par la puissance du CPU. Disons que la recherche prend 10 secondes.  

     * Si on distribue les documents dans 10 shards sur 10 nodes différentes, alors chaque shard stocke 50 000 documents. La recherche est effectuée en parallèle par différentes machines sur un sous-ensemble des données et la recherche ne prend au final plus qu'1 seconde.

* <ins>Replica</ins>:  
  Un *replica shard* est la copie d'un shard — et l'original est appellé *primary shard*.  
  Un replica permet

  1. de servir de backup.  
     Si une node tombe en panne, les données seront toujours accessibles ailleurs.

  2. d'augmenter la rapidité de la recherche.  
     Si le shard principal a du mal à répondre à toutes les requêtes, le replica shard peut s'occuper d'une partie des requêtes.

---

## Installer

### ElasticSearch

1. Télécharger [Elasticsearch](https://www.elastic.co/downloads/elasticsearch) et l'extraire

2. Modifier les configurations d'ElasticSearch dans le fichier <ins>config/elasticsearch.yml</ins>  
   C'est une bonne pratique de donner un nom significatif à la node (`node.name`) et au cluster (`cluster.name`).

    ```
    cd elasticsearch-*-linux-x86_64/
    cd elasticsearch-*
    vi config/elasticsearch.yml
    ```

3. Démarrer ElasticSearch

    ```
    bin/elasticsearch
    ```

4. Vérifier qu'ElasticSearch écoute sur le port 9200:

    ```
    curl http://localhost:9200
    ```

### Kibana

1. Télécharger [Kibana](https://www.elastic.co/downloads/kibana) et l'extraire

2. Démarrer Kibana

    ```
    cd kibana-*-linux-x86_64
    bin/kibana
    ```

3. Aller sur localhost:5601

#### Requêter ElasticSearch

* Ouvrir la console Kibana  
  Ouvrir le menu (icone en haut à gauche) > Management > Dev Tools

* Vérifier l'état du cluster  
  Écrire la requête ci-dessous, placer le curseur sur la ligne contenant le verbe HTTP (GET) et cliquer sur la flèche à droite de la ligne. Le résultat de la requête est affiché dans le panel de droite.

  ```
  GET _cluster/health
  ```

  ![](https://i.imgur.com/J6eTugC.png?1)

* Inspecter les nodes du cluster

  ```
  GET _nodes/stats
  ```