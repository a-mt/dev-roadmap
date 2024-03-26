---
title: Verrous
category: BDD, MySQL
---

## De tables

Il est possible de verrouiller des tables — empêcher la lecture et/ou écriture tant que la requête n'est pas finie.  
C'est utile par exemple si on veut mettre à jour une table à partir des données d'une autre table.

### Lock tables

Obtient un verrou.  
Une session qui travaille avec des tables verouillées doit obtenir le verrou sur toutes les tables dont elle a besoin.  
Attention, demander un nouveau verrou débloque toutes les tables précédemment verrouillées

    LOCK TABLES {nom_table {READ | WRITE}}*;

<ins>Exemple</ins> :

``` sql
LOCK TABLES t1 READ;
SELECT COUNT(*) FROM t1;
+----------+
| COUNT(*) |
+----------+
|        3 |
+----------+
SELECT COUNT(*) FROM t2;
-- ERROR 1100 (HY000): Table 't2' was not locked with LOCK TABLES
```

### Unlock tables

Debloque tous les verrous de la session

    UNLOCK TABLES


[Doc MySQL Lock](https://dev.mysql.com/doc/refman/5.7/en/lock-tables.html)

---

## De base de données

Il est également possible de créer des verrous nommés, dans le contexte global, pour empêcher que deux procédures entrent en collision. Plusieurs verrous peuvent dans ce cas exister en même temps.

Pour ce faire, on utilise des fonctions.  
[Voir verrous nommés](mysql-native-function.md#verrous)
