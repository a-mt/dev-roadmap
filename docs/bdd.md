---
title: Bases de données
category: Web
---

## SGBD

* Une *base de données* (BDD) est un ensemble de données stockées de façon organisée, souvent dans des tables mais pas forcemment, de manière être facilement accessibles.

* Le logiciel qui s'occupe de stocker la BDD est appelé un *système de gestion de base de données* (SGBD). Un SGBD doit fournir des mécanismes pour assurer l'intégrité, la confidentialité mais aussi les accès concurrents (autoriser les accès simultanés à la BDD par plusieurs utilisateurs) et la sureté de fonctionnement (assurer la cohérence des données en dépit des pannes matérielles et logicielles qui peuvent se produire).

  Par abus de language, on utilise généralement les deux comme synonyme

## Modèle de données relationnel

* La manière dont sont organisées les données dans la base de données est ce qu'on appelle un *modèle de données*.

* Le modèle le plus utilisé est le modèle de données *relationnel*:

  - La base de données est une collection de *tables*.  
    Un peu comme un stylesheet Excel, le contenu de chaque table est organisé en lignes et colonnes.

  - Chaque ligne d'une table, appelé un *n-uplet*, stocke les données d'une entité donnée en associant des valeurs dans les différentes colonnes, appelés *attributs*.

    ```
    N-uplet (aka valeurs):
    +--------+--------+-----------------+--------+
    | Durant | Paul   | 17              | A1     |
    +--------+--------+-----------------+--------+

    Attributs:
    +--------+--------+-----------------+--------+
    | Nom    | Prénom | Numéro étudiant | Groupe |
    +--------+--------+-----------------+--------+

    Attribut-valeur:
    Nom: Durant
    ```

    - Une *clé primaire* (*primary key* en anglais) est ce qui permet d'identifier un n-uplet dans une table de manière unique. Par exemple, No_etudiant dans la table étudiant

    - Une *clé étrangère* (*foreign key* en anglais) est une clé qui désigne la clé primaire d'une autre table, et qui crée donc une relation. Par exemple, No_etudiant dans la table note est une référence vers la clé primaire de la table étudiant

    - Dans certains cas, une clé primaire peut être une combinaison de clés étrangères: par exemple (No_etudiant, Code_cours) dans la table cours, si un étudiant ne peut avoir qu'une seule note par cours.

      Utiliser plusieurs colonnes comme clé primaire est généralement considéré comme une mauvaise pratique, mais est parfois nécessaire pour assurer la non-duplicité des clés — par exemple (code postal, commune) puisqu'un code postal (tel que 01330) peut être associé à plusieurs communes 

    ![Exemple BDD](https://i.imgur.com/I48BLJn.png)

* Il existe d'autres [modèle de données](https://www.lucidchart.com/pages/fr/quest-ce-quun-mod%C3%A8le-de-base-de-donn%C3%A9es).  
  Par exemple le modèle entité-attribut-valeur est souvent utilisé pour mettre en cache des données (comme avec Redis),  
  ou le modèle document est souvent utilisé dans les BDD NoSQL (comme avec Mongo), qui permet notamment de stocker un grand nombre de données sur différents serveurs sans garder de références inter-document — ce qui nécessiterait de requêter différents serveurs.

## Schéma

* Dans le cas d'une BDD relationnelle, il est nécessaire de définir le *schéma* des données, qui est la définition des colonnes de cette table: à chaque colonne est associé un type de données (nombre, chaîne de caractères, booléen, etc), avec éventuellement une valeur par défaut, un encodage donné, etc.

  ```
  +-------------+--------------+
  | Field       | Type         |
  +-------------+--------------+
  | Nom         | varchar(255) |
  | Prenom      | varchar(255) |
  | No_etudiant | int(11)      |
  | Groupe      | varchar(2)   |
  +-------------+--------------+
  ```

## Propriétés des bases de données classiques

1. <ins>Persistance des données</ins>  
   Les données sont sauvegardées sur le disque

2. <ins>Partage des données</ins>  
   Les utilisateurs accèdent en même temps aux mêmes données  
   Il existe des mécanismes de contrôle de la concurrence

3. <ins>Redondance faible</ins>  
   Chaque information n'est stockée qu'une seule fois  
   Dans le cas contraire, les informations dupliquées doivent rester valides

4. <ins>Sécurité</ins>  
   Il faut gérer les reprises en cas de pannes logicielles ou matérielles

5. <ins>Confidentialité</ins>  
   Les données sensibles doivent être protégées  
   Il y a des mécanismes de sécurité et d'autorisation

6. <ins>Contraintes d'intégrité</ins>  
   Contraintes sur le type de données (ex: le nombre d'heures d'un cours est un entier positif)  
   Contraintes sur les données (ex: la note d'un étudiant est comprise entre 0 et 20)
   Contraintes sur les relations (ex: une seule occurence d'un identifiant est précent)

## Propriétés ACID

* Une BDD relationnelle assure les propriétés ACID des données: lorsqu'on exécute plusieurs requêtes (ce qu'on appelle une *transaction*) — par exemple pour retirer de l'argent d'un côté et en ajouter de l'autre — le logiciel s'assure que les conditions suivantes soient bien remplies:

  <table>
    <tr>
      <th>Atomicité</th>
      <td>Tout est exécuté ou rien</td>
    </tr>
    <tr>
      <th>Cohérence</th>
      <td>Une transaction fait passer la BD d'un état cohérent à un autre été cohérent</td>
    </tr>
    <tr>
      <th>Isolation</th>
      <td>Les mises à jour faites par une transaction ne sont pas visibles de l'extérieur tant que la transaction n'est pas terminée</td>
    </tr>
    <tr>
      <th>Durabilité</th>
      <td>Les actions effectuées par une transaction terminée sont définitives</td>
    </tr>
  </table>

## SQL

* Le SQL (*Structured Query Language*) est le language qui permet de requêter une BDD relationnelle.  
  Chaque SGBD implémente une variante de SQL qui lui est propre, comme par exemple [MySQL](mysql.md) — souvent les commandes SQL de base sont identiques entre les différents SGBD.

  ```
  SELECT * FROM mytable
  ```

* Pour le SGBD MySQL, on peut executer des commandes SQL

  - dans la console en ouvrant MySQL (`mysql -u root -p`)
  - via une application web telle que phpMyAdmin
  - via un logiciel tel que [MySQL Workbench](https://www.mysql.com/fr/products/workbench/)

* Une BDD tel que Mongo (qui est une BDD NoSQL) ne dispose a priori pas d'un language SQL, uniquement d'une API,  
  mais il existe souvent des layers de compatibilité qui permettent d'utiliser le language SQL avec une BDD NoSQL.

  ```
  db.mytable.find({});
  ```

<ins>Exemples de SGBD SQL</ins>:

- Oracle, SQLServer, DB2 et Sybase pour les produits commerciaux
- SQLite, MySQL et PostgreSQL pour les systèmes libres

## NoSQL

* NoSQL (*Not Only SQL*) désigne un ensemble de SGBD alternatifs qui cherchent à fournir soit

  - Des modèles de données différents des modèles de données classiques en ligne (systèmes clé-valeur, systèmes orientés document, systèmes orientés colonnes)
  - Stocker et requêter des données au format JSON par exemple
  - Des performances extrêmes
  - Un passage à l'échelle transparent qui permet de gérer de gigantesques volumes de données, de l'ordre du Tera ou Petaoctet

* Pour permettre ces fonctionnalités, les bases de données NoSQL abandonnent une ou des propriétés des bases de données classiques et ne permettent pas les requêtes complexes des bases de données classiques.

<ins>Exemples de SGBD NoSQL</ins>:

| Type  | Organisation | Requêtes | Exemples de systèmes |
|---     |---                |---          |---                            |
| XML   | Donnés arborescentes, hiérarchiques | XQuery | XBase, existdb |
| Objet | Donnés complexes, avec propriétés et méthodes | OQL, VQL | 02, Versant |
| Graphe | Graphe avec noeuds, arêtes, propriétés | Cypher, Gremlin | Neo4j |
| Triplets | Triplets RDF du Web sémantique (sujet, prédicat, objet) | SPARQL | Apache Jena, Sesame |

## NewSQL

* Au délà des systèmes NoSQL, sont apparus récemment des systèmes NewSQL. La motivation de NewSQL est que certaines applications ne peuvent pas se contenter des compromis faits par NoSQL et ont besoin

  - De langages de requêtes riches (jointure, aggrégation)
  - D'une conformité aux propriétés ACID
  - De performances supérieures à celles des SGBD classiques
 
* Les solutions possibles sont d'essayer de se débarrasser de ce qui fait la lenteur des SGBD classiques

  - Les goulots d'étranglements des SGBD : verrous, journalisation, gestion des caches
  - Bases de données en mémoire vive, avec copie sur disque asynchrone
  - Gestion de concurrence sans verrou (MVCC)
  - Architecture distribuée sans partage d'information (*shared nothing*) et avec équilibrage de charge transparent

<ins>Exemples de SGBD NewSQL</ins>:  
Google Soanner, Clustrix, VoltDB
