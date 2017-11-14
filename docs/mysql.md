---
title: MySQL
category: Web, BDD
---

SQL (Structure Query Language) est un langage de requêtage des bases de données. La syntaxe qui sera décrite ici est celle du SGBD MySQL.

Il n'est pas sensible à la casse, les instructions peuvent être écrites en majuscules tout comme en minuscules.  
Il n'est pas sensible aux espaces, on peut indenter et espacer du code SQL sans aucune incidence.  
Le point-virgule permet de séparer deux requêtes SQL, il est optionnel pour la dernière requête.

Il existe 3 classes de requêtes
- la définition de la structure: `create`, `alter`, `drop`
- la manipulation des données: `select`, `insert`, `update`, `delete`
- les contrôles: `grant`, `revoke` ainsi que la gestion des transactions et des connexions.

<ins>Resources</ins> :
- [sqlfiddle.com](http://sqlfiddle.com/) pour tester une requête SQL en ligne
- [dev.mysql.com](https://dev.mysql.com/doc/refman/5.7/en/keywords.html) pour la doc officielle de MySQL

---

## Convention

Les mots-clés sont indiqués en majuscule (ex: `CREATE TABLE`)  
Les valeurs à choisir sont indiquées en minuscules (ex: `nom_table`)  
Les symboles indiquent lorsque les attributs sont obligatoires, optionnels ou peuvent être répétés :

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

---

## Notation

### Valeur nulle

Un champs sans valeur a la valeur `NULL`, `null` ou `\N`.

``` sql
SELECT NULL;
SELECT null;
SELECT \N;
```

### Nombre

Un nombre peut être signé ou non.  
Les décimales sont marquées par le point `.`.  

``` sql
SELECT 1;
SELECT .2;
SELECT 3.4;
SELECT -5;
SELECT -6.78;
SELECT +9.10;
```

La notation scientification est acceptée

``` sql
SELECT 1.2E3;
SELECT 1.2E-3;
SELECT -1.2E3;
SELECT -1.2E-3;
```

### Texte

Le texte est entouré de simples ou doubles quotes.

``` sql
SELECT 'a string';
SELECT "another string";
```

On peut échapper une quote avec `\` ou en la doublant

``` sql
SELECT 'a\'b';
SELECT 'a''b';
```

Les chaînes placés les unes à côté des autres (séparées par un espace) sont concaténées

``` sql
SELECT 'a string';
SELECT 'a' ' ' 'string';
```

Les [caractères spéciaux](https://dev.mysql.com/doc/refman/5.7/en/string-literals.html#character-escape-sequences) sont acceptés

``` sql
SELECT 'a\nb';
```

### Hexadécimal

Des chaînes héxadécimales peuvent être crées avec la notation `X'val'` ou `0xval`.

``` sql
SELECT X'01AF';
SELECT X'01af';
SELECT x'01AF';
SELECT x'01af';
SELECT 0x01AF;
SELECT 0x01af;
```

### Bit

Les bits sont notés `b'val'` ou `0bval`

``` sql
SELECT b'01';
SELECT B'01';
SELECT 0b01;
```

### Encodage et collation

L'encodage et collations peuvent être précisé pour les données texte (y compris hexa et bits).

``` sql
SELECT _latin1'string';
SELECT _binary'string';
SELECT _utf8'string' COLLATE utf8_danish_ci;
```

``` sql
SELECT _latin1 X'4D7953514C';
SELECT _utf8 0x4D7953514C COLLATE utf8_danish_ci;
```

``` sql
SELECT _latin1 b'1000001';
SELECT _utf8 0b1000001 COLLATE utf8_danish_ci;
```

### Booléen

Un booléean est `TRUE` . `FALSE` ou `1` / `0`.

``` sql
SELECT TRUE;
SELECT 1;
SELECT FALSE;
SELECT 0;
```

### Date

Une chaîne de caractère peut être convertie en date si elle est au format 'YYYY-MM-DD' ou 'YY-MM-DD'.  
N'importe quel délimiteur est admis ou même aucun.

``` sql
SELECT DATE('2012-12-31');
SELECT DATE('2012/12/31');
SELECT DATE('2012^12^31');
SELECT DATE('2012@12@31');
SELECT DATE('20121231');
```

Les datetimes sont au format  'YYYY-MM-DD HH:MM:SS' ou 'YY-MM-DD HH:MM:SS'.  
N'importe quel délimiteur au même aucun. Un délimiteur différent peut être utilisé entre la partie date et heure.  
La date et l'heure sont separées par un espace ou par "T" (ou aucun si aucun délimiteur n'est utilisé).

``` sql
SELECT TIMESTAMP('2012-12-31 11:30:45');
SELECT TIMESTAMP('2012^12^31 11+30+45');
SELECT TIMESTAMP('2012/12/31 11*30*45');
SELECT TIMESTAMP('2012@12@31 11^30^45');
SELECT TIMESTAMP('2012-12-31T11:30:45');
SELECT TIMESTAMP('20121231113045');
```

Les times sont au format 'HH:MM:SS', 'HH:MM' ou 'SS'. Comme délimiteur, on utilise soit `:` soit rien.

``` sql
SELECT TIME('10:11:12');
SELECT TIME(101112);
SELECT TIME('10:11');
SELECT TIME('12');
```

---

## Définition de la structure

[Schéma MySQL](mysql-schema.md) explique les :
- base de données
- tables
- types de données
- index
- vues

---

## Données

[Données MySQL](mysql-data.md) explique les :
- insertion, mise à jour, suppression des données d'une table
- sélection de données d'une ou plusieurs table(s)
- variables utilisateur

[Fonctions MySQL](mysql-fonctions.md) contient la liste des fonctions et opérateurs prédéfinis.

[Programme MySQL](mysql-program.md) explique :
- créer une fonction
- créer une procédure
- if, case
- while, repeat, loop
- statements
- curseurs
- event scheduler (crontab)

---

## Contrôles

[Contrôles MySQL](mysql-control.md) explique les :
- utilisateurs et autorisations
- backups
- variables de configuration
- triggers
- transactions, savepoints et journal
- verrous

---

## Plugins

<ins>Lister les plugins</ins> disponibles et leur statut (activé, désactivé) :

    SHOW PLUGINS

<ins>Installer un plugin</ins> :

    INSTALL PLUGIN nom_plugin SONAME 'nom_librairie'

`nom_plugin` est le nom du plugin tel que définit dans le fichier de [déclaration du plugin]( https://dev.mysql.com/doc/refman/5.7/en/plugin-data-structures.html)  
`nom_librairie` est le nom de la librairie qui contient le plugin (exemple: `libmyplugin.so`).  
Cette librairie est située dans le répertoire des plugins (`SHOW GLOBAL VARIABLES like 'plugin_dir'`).

<ins>Désinstaller</ins> :

    UNINSTALL PLUGIN nom_plugin
