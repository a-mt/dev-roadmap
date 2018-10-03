---
title: Hadoop
category: IT
---

## Qu'est-ce qu'Hadoop

"Hadoop" était le nom de la peluche appartenant au fils de l'un des développeurs, et la peluche d'éléphant est également le logo d'Hadoop. Mais plus sérieusement, qu'est-ce qu'Hadoop?

Hadoop n'est pas une seule chose, mais un ensemble d'applications logicielles utilisées pour travailler avec des Big Data. C'est un framework, une plateforme composée de plusieurs modules différents.

## Principaux modules

### HDFS

La partie la plus importante d'Hadoop est probablement le système de fichiers distribué d'Hadoop, HDFS (Hadoop Distributed File System). HDFS se charge de prendre des données et de les distribuer sur de nombreux ordinateurs.

Il peut s'agir de dizaines, voire de centaines, voire de dizaines de milliers de données dans certains cas. Ce n'est donc pas une base de données - car une base de données implique généralement un seul fichier (surtout s'il s'agit d'une base de données relationnelle). Hadoop peut avoir des millions de fichiers distincts, répartis sur des ordinateurs et tous reliés entre eux par le logiciel.

### MapReduce, YARN

MapReduce est un autre élément essentiel de Hadoop. Il est utilisé pour la manipulation et le traitement d'un nombre important de données au sein du réseau. Il consiste en deux parties: *map* et *reduce*.

* Le processus de *mapping* consiste à prendre une tâche ainsi qu'un certain nombre de données, et d'envoyer le tout vers différents ordinateurs capables de gérer cette quantité.  
  Par exemple, supposons que vous ayez 100Go de données et que chacun de vos ordinateurs disposent de 16Go de RAM, vous devrez alors scinder les données en 60 ou 70 blocs et les envoyer à chacun de ces ordinateurs - ordinateurs que vous louez probablement chez Amazon Web Services pour l'occasion.
  Map divise et l'envoie le travail en parallèle sur ces différents ordinateurs.

* Le processus de *réduction* prend les résultats des analyses effectuées sur chacun de ces ordinateurs et combine les résultats pour donner un résultat unique.

Le programme MapReduce original a été remplacé par Hadoop YARN, qui est l'abbréviation de Yet Another Resource Negociator (encoore un négociateur de ressources), parfois appelé MapReduce2.

YARN permet beaucoup de choses que le MapReduce d'origine ne pouvait pas faire. MapReduce était basé sur du *batch processing* (traitement par lot), ce qui nécessitait d'obtenir l'ensemble les données, de diviser toutes ces données, d'attendre la fin du processus et enfin d'aggréger le résultat. YARN introduit le traitement en *streaming* (flux continu), ce qui signifie que les données entrent et le résultat ressort aussi rapidement que possible, en simultané.
Il introduit également le traitement de graphes, ce qui permet de traiter les connections de réseaux sociaux.

### Pig

Pig est un module Hadoop qui permet d'écrire des programmes MapReduce, processus permettant de diviser les traitements puis de combiner les résultat. Il utilise son propre language, le Pig Latin Programming Language.

### Hive

Hive est le quatrième module majeur de Hadoop. Hive résume les requêtes et analyse les données contenues dans Hadoop. Il utilise un language semblable à SQL appelé HiveQL, et c'est ce que la plupart des gens utilisent pour réellement travailler avec les données.

## Autres modules

Entre HDFS, MapReduce ou YARN, Pig et Hive, vous avez couvert l'essentiel de ce que les gens utilisent lorsqu'ils utilisent Hadoop. Mais il existe d'autres modules. Il existe peut⁻être 150 projects différents pouvant tous concerner Hadoop, les principaux étant:

* **HBase**  
  HBase est une base de données noSQL, donc une base de données non relationnelle, pour Hadoop.

* **Storm**  
  Storm permet le traitement des données en streaming dans Hadoop.

* **Spark**, **Shark**  
  Spark permet le traitement en mémoire. C'est une grande avancée car les données ne sont plus accédées sur le disque dur mais directement en RAM, ce qui permet d'effectuer des traitements beaucoup plus rapidement, peut-être être 100 fois plus rapide. Bien que le processus de mettre les données en RAM prenne du temps, ce n'est généralement pas pris en compte quand les gens font des statistiques.  
  Spark est souvent utilisé avec Shark, qui permet le traitement de requêtes en mémoire.

* **Giraph**  
  Giraph, épelé comme graph avec un i (je), est utilisé pour analyser le graph des données de réseaux sociaux.

## Où se trouve Hadoop

Hadoop peut être installé sur n'importe quel ordinateur. Vous pouvez le mettre sur votre ordinateur portable si vous le souhaitez.
En fait, c'est ce que font beaucoup de gens pour pouvoir s'exercer et pour configurer les différents éléments, avant de l'envoyer sur le cloud, lieu où il se trouve habituellement.

Les fournisseurs en cloud computing comme Amazon Web Services ou Microsoft Azure utilisent Hadoop, et de nombreux autres fournisseurs vous permettent d'installer Hadoop et de l'exécuter sur leurs systèmes informatique.

## Qui utilise Hadoop

Fondamentalent, n'importe qui ayant besoin de gérer un nombre important de données peut utiliser Hadoop. Yahoo! est le plus gros utilisateur d'Hadoop (sans surprise, puisqu'ils l'ont développé) - ils ont plus de 42.000 noeuds en cours d'exécution sur Hadoop. LinkedIn, Facebook ou encore Quantcast (société d'analyse de marketing en ligne) ont également une énorme installation en ligne.

Enfin, Hadoop est open source. Bien qu'il est été développé par les ingénieurs de Yahoo!, c'est maintenant un projet open source d'Apache. Vous entendrez donc souvent parler d'Apache Hadoop, Apache Hive ou Apache Pig. Hadoop est donc gratuit, et tout le monde peut télécharger le code source et le modifier, ce qui explique sa popularité.

## ODBC, Excel

En utilisant les interfaces ODBC (Open DataBase Connectivity interfaces), on peut connecter Excel directement à Hadoop pour faire des requêtes et analyser le résultat avec l'interface Excel (menu Data > From Other Sources).

Excel permet de créer des tableaux croisées dynamiques interactifs, c'est un excellent moyen d'explorer la complexité des données. Il permet également de trier les données, de tracer des graphes et graphiques, c'est donc un excellent moyen de partager les résultats de l'analyse. Mettre les résultats finaux dans Excel fournit un certain degré d'exploration et de manipulation à l'utilisateur final, et c'est probablement le moyen le plus démocratique de partager les résultats d'une analyse de données volumineuses.
