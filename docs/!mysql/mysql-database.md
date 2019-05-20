---
title: Database
category: BDD, MySQL, Schéma
---

## Lister

Lister les bases de données (que l'utilisateur peut voir)

    SHOW DATABASES [LIKE 'pattern' | WHERE expr]

---

## Créer

Contrairement aux mots-clés SQL les noms de databases et tables sont sensibles à la casse sous Unix.  

    CREATE DATABASE nom_database

---

## Sélectionner une BDD

Sélectionner la BDD sur laquelle effectuer les opérations (création de table, manipulation des données, etc).

    USE nom_database

---

## Supprimer

    DROP DATABASE [IF EXISTS] nom_database

---

## Base de données natives

### information_schema

`information_schema` est une base de donnée native, gérée automatiquement par le SGBD MySQL
où l'on peut trouver diverses stats et informations sur les bases de données et tables du serveur.

<ins>Exemples</ins>:

* Afficher l'auto_increment d'une table:

  ``` sql
  SELECT AUTO_INCREMENT FROM information_schema.TABLES
  WHERE table_schema = 'DATABASE_NAME' AND table_name = 'TABLE_NAME';
  ```

* Chercher une table dans la BDD "ri_db" qui commence par "e" et finit par "s", et lister ses colonnes:

  ``` sql
  SELECT table_name as tab_name, column_name as col_name, data_type
  FROM information_schema.columns
  WHERE table_schema = "ri_db"
  AND table_name LIKE "e%" AND table_name LIKE "%s"
  ORDER BY tab_name, col_name;
  ```

* Lister les clés étrangères qui référencent une table:

  ``` sql
  SELECT TABLE_NAME, COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
  FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
  WHERE REFERENCED_TABLE_NAME = 'mytable'
  ```

[Doc MySQL information_schema](https://dev.mysql.com/doc/refman/5.7/en/information-schema.html)

---

### performance_schema

`performance_schema` est également une base de données native.  
Elle permet de voir les évènements qui se passent sur le serveur MySQL

<ins>Exemple</ins>:

* Afficher les threads bloqués:

  ``` sql
  SELECT * FROM performance_schema.events_waits_current
  ```

[Doc MySQL performance_schema](https://dev.mysql.com/doc/refman/5.7/en/performance-schema.html)

---

### sys

`sys` est une base de données native qui contient des vues de `performance_schema`.  
Ces vues créent des stats plus facilement compréhensibles

<ins>Exemple</ins>:

* Liste les requêtes en cours:

  ```
  SELECT * FROM sys.session
  ```

[Doc MySQL sys](https://dev.mysql.com/doc/refman/5.7/en/sys-schema-object-index.html)
