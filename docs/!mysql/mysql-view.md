---
title: Vue
category: BDD, MySQL, Schéma
---

Une vue est une table dérivée des autres tables d'une base de données, son contenu est dynamique (calculé à l'execution).
On peut utiliser une vue pour requêter une table qui n'existe pas explicitement, par exemple pour ajouter automatiquement des colonnes calculées ou des jointures.

## Création

    CREATE [OR REPLACE] VIEW nom_vue [(attributs)]
        AS SELECT ... FROM ... WHERE ...

<ins>Exemples</ins> :

``` sql
CREATE OR REPLACE VIEW emp
    AS SELECT id, name, YEAR(date_joined) as date_joined, "-" as salary FROM employees;
```

``` sql
CREATE OR REPLACE VIEW order_analytics
  AS SELECT id,
         YEAR(order_date) as year,
         QUARTER(order_date) as quarter,
         type,
         price * quantity as total_price
  FROM orders;
```

## Suppression

    DROP VIEW [IF EXISTS] nom_vue

``` sql
DROP VIEW IF EXISTS emp;
```