---
title: Les bases de MySQL
category: BDD, MySQL
---

SQL (Structure Query Language) est un langage de requêtage des bases de données.  
La syntaxe qui sera décrite ici est celle du SGBD MySQL.

Il existe 3 classes de requêtes
- celles qui définissent la structure de la base données  
  Exemple: `create`, `alter`, `drop`  
  Un serveur SQL peut contenir plusieurs bases de données.
  Chaque base de données peut contenir 0 à n tables.  
  Le schéma de chaque table définit la liste de ses colonnes et le type de leurs données.

- celles qui manipulent les données  
  Exemple: `select`, `insert`, `update`, `delete`  
  On utilise les requêtes SQL pour insérer, modifier, supprimer et récupérer les données stockées dans les tables.

- celles qui permettent d'administrer la base de données (gestion des permissions, transactions, connexions)  
  Exemple: `grant`, `revoke`  
  Il faut disposer des droits d’administration pour créer une base de données.
  Un utilisateur peut voir une base de donnée et en modifier les données uniquement s’il a les permissions requises.

<ins>Resources</ins> :
- [sqlfiddle.com](http://sqlfiddle.com/) pour tester une requête SQL en ligne
- [dev.mysql.com](https://dev.mysql.com/doc/refman/5.7/en/keywords.html): la doc officielle de MySQL

---

## Structure

MySQL n'est pas sensible à la casse ni aux espaces: les instructions peuvent être écrites en majuscules tout comme en minuscules et on peut indenter et espacer du code SQL sans aucune incidence.

Le point-virgule permet de séparer deux requêtes SQL, il est optionnel pour la dernière requête.

``` sql
DELETE * FROM table;
DELETE * FROM table2
```

Les backticks (<code>`</code>) échappent les noms de colonnes et tables.  
Elles sont indispensables lorsque le nom ne contient pas que des chiffres, lettres et underscores. Optionnelles sinon.

``` sql
SELECT `nom-table`.`id`, `my name`, `another.field`, `field,with,comma`
FROM `nom-table`
```

---

## Notation

La définition de la syntaxe SQL respecte une notation bien précise, avec laquelle vous devez vous familiariser pour comprendre la documentation:

Les mots-clés sont écrits en majuscule (ex: `CREATE TABLE`)  
Les valeurs à définir sont écrites en minuscules (ex: `nom_table`)

Les symboles permettent d'indiquer lorsque les attributs sont obligatoires ou optionnels et s'ils peuvent être répétés:

| Symboles   | Description                           | Exemple                      |
|---         |---                                    |---                           |
| `|`        | Plusieurs choix possibles             | `[NULL | NOT NULL]`          |
| `[]`       | Attribut optionnel                    | `CREATE [TEMPORARY] TABLE`   |
| `{}`       | Attribut obligatoire                  | `ON {UPDATE | DELETE}`       |
| `{}*`      | De 1 à n attributs, séparés par `,`   | `{actions}*`                 |
| `{}*(AND)` | De 1 à n attributs, séparés par `AND` | `REQUIRE {SSL | X509}*(AND)` |

---

## Commentaires

Les commentaires commencent par `--` et finissent à la fin de la ligne.

    -- commentaire

Le `#` est parfois supporté.

    # commentaire

Les commentaires multilignes sont délimités par `/*` et `*/`

    /* commentaire
    sur plusieurs
    lignes */