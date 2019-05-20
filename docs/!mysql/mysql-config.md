---
title: Configurations
category: BDD, MySQL, Administration
---

## Afficher

Lister les variables et leur valeur :

    SHOW [GLOBAL | SESSION] VARIABLES [LIKE '%pattern']

---

## Modifier

Il est possible de modifier la valeur des variables MySQL au cours d'une session pour modifier les configurations de manière temporaire. Deux syntaxes sont possibles :

* 
  ```
  SET {GLOBAL | SESSION | LOCAL} var_name = value
  ```

      ``` sql
      SET GLOBAL max_connections = 1000;
      SET SESSION sql_mode = 'TRADITIONAL';
      ```

* 
  ```
  SET {@@global | @@session | @@local}.var_name = value;
  ```

      ``` sql
      SET @@global.max_connections = 1000;
      SET @@session.sql_mode = 'TRADITIONAL';
      ```

`LOCAL` et `SESSION` sont des synonymes.

On peut setter plusieurs variables en même temps :

``` sql
SET GLOBAL sort_buffer_size = 1000000, SESSION sort_buffer_size = 1000000;
SET @@global.sort_buffer_size = 1000000, @@local.sort_buffer_size = 1000000;
```

Liste des [variables système](https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html)
