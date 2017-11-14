---
title: Schéma MySQL
category: Web, BDD, MySQL
---

## Databases

Un serveur SQL peut contenir plusieurs bases de données.  
Une base de données est un conteneur qui peut contenir 0 à n tables.  
Il faut disposer des droits d'administration pour créer une base de données.  
Un utilisateur peut voir une base de donnée et en modifier les données uniquement s'il a les permissions requises.

### Afficher

Lister les bases de données (que l'utilisateur peut voir)

    SHOW DATABASES [LIKE 'pattern' | WHERE expr]

### Créer

Contrairement aux mots-clés SQL les noms de databases et tables sont sensibles à la casse sous Unix.  

    CREATE DATABASE nom_database

### Sélectionner une BDD

Sélectionner la BDD sur laquelle effectuer les opérations (création de table, manipulation des données, etc).

    USE nom_database

### Supprimer

    DROP DATABASE [IF EXISTS] nom_database

---

## Tables

### Afficher

Lister les tables de la base de données :

``` shell
SHOW TABLES;
+---------------------+
| Tables in menagerie |
+---------------------+
| pet                 |
+---------------------+
```

Afficher le schéma d'une table :

``` shell
mysql> DESCRIBE pet;
+---------+-------------+------+-----+---------+-------+
| Field   | Type        | Null | Key | Default | Extra |
+---------+-------------+------+-----+---------+-------+
| name    | varchar(20) | YES  |     | NULL    |       |
| owner   | varchar(20) | YES  |     | NULL    |       |
| species | varchar(20) | YES  |     | NULL    |       |
| sex     | char(1)     | YES  |     | NULL    |       |
| birth   | date        | YES  |     | NULL    |       |
| death   | date        | YES  |     | NULL    |       |
+---------+-------------+------+-----+---------+-------+
```

Ou pour obtenir de la description de la table tout en sélectionnant les attributs à retourner :

    SHOW COLUMNS FROM nom_table [LIKE 'pattern' | WHERE expr]

``` shell
mysql> SHOW COLUMNS FROM City;
+-------------+----------+------+-----+---------+----------------+
| Field       | Type     | Null | Key | Default | Extra          |
+-------------+----------+------+-----+---------+----------------+
| ID          | int(11)  | NO   | PRI | NULL    | auto_increment |
| Name        | char(35) | NO   |     |         |                |
| CountryCode | char(3)  | NO   | MUL |         |                |
| District    | char(20) | NO   |     |         |                |
| Population  | int(11)  | NO   |     | 0       |                |
+-------------+----------+------+-----+---------+----------------+
```

### Créer

``` txt
CREATE [TEMPORARY] TABLE [IF NOT EXISTS] nom_table (
    { definition_colonne | contrainte_relation }*
) [options];
```

Une table temporaire est supprimée à la fin de la session. Elle peut être utilisée de manière ponctuelle, pour le temps d'une procédure par exemple.

Le nom de la table et le nom des colonnes ne peuvent pas être un [mot-clé réservé](https://dev.mysql.com/doc/refman/5.7/en/keywords.html).

<ins>Définition d'une colonne</ins> :

``` txt
nom_colonne type_donnee [NULL | NOT NULL] [DEFAULT val] [AUTO_INCREMENT] [UNIQUE | PRIMARY KEY]
```

`AUTO_INCREMENT` : uniquement pour les entiers et réels.

<ins>Contrainte de relation</ins> :

``` txt
{
    PRIMARY KEY (attributs)
  | CHECK (condition)
  | {KEY|INDEX} [nom_index] (attributs)
  | {FULLTEXT|SPATIAL} [INDEX|KEY] [nom_index] (attributs)
  | UNIQUE [INDEX|KEY] [nom_index] (attributs)
  | FOREIGN KEY [nom_index] (attributs) references nom_table (attributs)
        [ON {UPDATE | DELETE} {RESTRICT | NO ACTION | SET NULL | CASCADE}]
}
```

<ins>Par exemple</ins> :

``` sql
CREATE TABLE prof (
    numprof numeric(2) primary key,
    nom varchar(15) not null,
    specialite varchar(5) default "PG",
    check(specialite in("BD","PG","MAT"))
);
```

``` sql
CREATE TABLE enseigne (
    numprof numeric(2),
    numcours varchar(2),
    primary key(numprof, numcours),
    foreign key(numprof) references prof (numprof),
    foreign key(numcours) references cours (numcours),
);
```

``` sql
CREATE TABLE IF NOT EXISTS `labels` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `label` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;
```

Voir [types de données](#types-de-données), [clés étrangères](#clés-étrangères),
[doc MySQL sur les options](https://dev.mysql.com/doc/refman/5.7/en/create-table.html#create-table-options)

### Modifier

    ALTER TABLE nom_table {
        ADD COLUMN definition_colonne [FIRST | AFTER nom_colonne]                # Ajouter une colonne
      | ALTER COLUMN nom_colonne {SET DEFAULT val | DROP DEFAULT}                # Changer la valeur par défaut d'une colonne
      | CHANGE COLUMN ancien_nom definition_colonne [FIRST | AFTER nom_colonne]  # Renommer ou changer de type de données d'une colonne
      | DROP COLUMN nom_colonne                                                  # Supprimer une colonne
      | ADD [CONSTRAINT nom_contrainte] contrainte_relation                      # Ajouter une contrainte, le nom est optionnel (généré si omis)
      | ADD {INDEX | UNIQUE | FULLTEXT | SPATIAL} [nom_index] nom_colonnes       # Ajouter un index, nom optionnel
      | DROP CONSTRAINT nom_contrainte                                           # Supprimer une contrainte / un index
    }*

<ins>Par exemple</ins> :

``` sql
ALTER TABLE prof
ADD COLUMN prenom varchar(15) not null AFTER nom,
ADD COLUMN datedebut date
ADD CONSTRAINT nomprenom UNIQUE (nom,prenom);
```

Les index peuvent également être ajoutés/supprimés via la syntaxe [create/drop index](#index).

### Supprimer

`DROP` supprime le schéma de la table, elle n'existe plus.

    DROP TABLE [IF EXISTS] nom_table

### Supprimer les données

`TRUNCATE` vide la table, elle ne contient plus de données.

    TRUNCATE [TABLE] nom_table

### Renommer

    RENAME TABLE ancien_nom TO nouveau_nom

La table peut être changée de base de donnée :

    RENAME TABLE ancienne_database.nom_table TO nouvelle_database.nom_table

### Créer une table à partir d'une autre

    SELECT ... INTO [TEMPORARY] TABLE nom_table
        FROM ...

<!-- -->

    CREATE [TEMPORARY] TABLE nom_table [(attributs)]
        as SELECT ... FROM ...

L'ordre des attributs du `SELECT` n'est pas important, les noms oui.

---

## Types de données

[Liste complètes des types](https://dev.mysql.com/doc/refman/5.7/en/create-table.html)  
[Taille des types](https://dev.mysql.com/doc/refman/5.7/en/storage-requirements.html)  
[Limite du nombre de colonnes et taille des n-upplets](https://dev.mysql.com/doc/refman/5.7/en/column-count-limit.html)

### Nombres

<table>
  <tr>
    <th><u><em>Type</em></u></th>
    <td>Description</td>
    <td>Minmax signé</td>
    <td>Non signé</td>
  </tr>
  <tr>
    <th>tinyint</th>
    <td>Entier sur 1 octet</td>
    <td>-128;127</td>
    <td>0;255</td>
  </tr>
  <tr>
    <th>smallint</th>
    <td>Entier sur 2 octets</td>
    <td>-32768;32767</td>
    <td>0;65535</td>
  </tr>
  <tr>
    <th>mediumint</th>
    <td>Entier sur 3 octets</td>
    <td>-8388608;8388607</td>
    <td>0;16777215</td>
  </tr>
  <tr>
    <th>int</th>
    <td>Entier sur 4 octets</td>
    <td>-2147483648;2147483647</td>
    <td>0;4294967295</td>
  </tr>
  <tr>
    <th>numeric(n,d)</th>
    <td>Réel (nombre de chiffres, précision)&nbsp;&nbsp;</td>
    <td>(5,2): -999.99;999.99</td>
    <td>(5,2): 0;999.99</td>
  </tr>
</table>

### Booléens

Le type `BOOL` ou `BOOLEAN` est un alias de `TINYINT(1)`.

### Dates

<table>
  <tr>
    <th><u><em>Type</em></u></th>
    <td>Description</td>
    <td>Taille en mémoire</td>
    <td>Min..max</td>
  </tr>
  <tr>
    <th>date</th>
    <td>AAAA-MM-JJ</td>
    <td>3 octets</td>
    <td>'1000-01-01' <br>'9999-12-31'</td>
  </tr>
  <tr>
    <th>time</th>
    <td>hh:mm:ss</td>
    <td>3 octets</td>
    <td>'00:00:00' <br>'23:59:59'</td>
  </tr>
  <tr>
    <th>datetime</th>
    <td>AAAA-MM-JJ hh:mm:ss</td>
    <td>5 octets</td>
    <td>'1000-01-01 00:00:00' <br>'9999-12-31 23:59:59'</td>
  </tr>
  <tr>
    <th>timestamp&emsp;</th>
    <td>AAAA-MM-JJ hh:mm:ss&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;</td>
    <td>4 octets</td>
    <td>'1970-01-01 00:00:01' UTC <br>'2038-01-09 03:14:07' UTC</td>
  </tr>
</table>

### Texte

<table>
  <tr>
    <th><u><em>Type</em></u></th>
    <td>Description</td>
    <td>Max octets</td>
    <td>Max caractères<sup>(1)</sup></td>
  </tr>

<!-- CHAR -->
  <tr>
    <th>char(n)</th>
    <td>Chaîne de taille fixe à n caractères</td>
    <td>255 octets</td>
    <td>255</td>
  </tr>
  <tr>
    <th>varchar(n)&emsp;</th>
    <td>... taille variable < n caractères</td>
    <td>255 octets</td>
    <td>255</td>
  </tr>

<!-- TEXT -->
  <tr>
    <th>tinytext</th>
    <td>... taille variable < 2^8 octets &emsp;&nbsp;&nbsp;<sup>(2)</sup></td>
    <td>255 octets</td> 
    <td>255</td>
  </tr>
  <tr>
    <th>text</th>
    <td>... taille variable < 2^16 octets &emsp;<sup>(2)</sup></td>
    <td>64 Kilo</td>
    <td>65 535</td>
  </tr>
  <tr>
    <th>mediumtext</th>
    <td>... taille variable < 2^24 octets &emsp;<sup>(2)</sup></td>
    <td>16 Mega</td>
    <td>16 777 215</td>
  </tr>
  <tr>
    <th>longtext</th>
    <td>... taille variable < 2^32 octets &emsp;<sup>(2)</sup></td>
    <td>4 Giga</td>
    <td>4 294 967 295</td>
  </tr>

<!-- ENUM-->
  <tr>
    <th>enum('v1', 'v2')</th>
    <td>Une des valeurs énumérées</td>
    <td>64 Kilo</td>
    <td>65 535</td>
  </tr>
  <tr>
    <th>set('v1', 'v2')</th>
    <td>Une ou des valeurs parmis celles énumérées</td>
    <td>64 Kilo</td>
    <td>64 valeurs max.</td>
  </tr>
</table>

<sup>(1)</sup> <small>Calculé en caractères de 1 octet (en UTF-8 un caractère peut prendre entre 1 et 4 octets)</small>  
<sup>(2)</sup> <small>Il n'est pas possible d'allouer un attribut `DEFAULT` à une colonne de type `TEXT`</small>

### Largeur d'affichage

On peut préciser la largeur d'affichage de la valeur : `tinyint(1)` est un entier sur un chiffre (0 à 9).  
La largeur est indépendante de la taille en mémoire : `int(1)` prendra 4 octets en mémoire même si un seul est utilisé.

    nom_type(largeur max)

La largeur d'affichage effectue des vérifications à l'insertion et modification des données. Si la largeur de la valeur entrée est supérieure à la largeur d'affichage une erreur est retournée : `Data too long for column 'first_name' at row 1`.

### Encodage

Pour les données texte, il est possible de préciser l'[encodage](https://dev.mysql.com/doc/refman/5.7/en/charset-mysql.html) à utiliser.  
`CHARACTER SET` précise l'encodage, `COLLATE` les règles de comparaison des chaînes (a/A, e/é, ss/ß, etc).

    nom_type [CHARACTER SET charset_name] [COLLATE collation_name]

<ins>Par exemple</ins> :

``` sql
CREATE TABLE IF NOT EXISTS labels (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
)
```

### Signe

Par défaut, les nombres sont signés (ils peuvent être positifs ou négatifs).
Il est possible de préciser que le nombre est non signé (uniquement positif), ce qui permet d'insérer des nombres plus grands :
- les valeurs d'un `TINYINT` vont de -128 à 127
- les valeurs d'un `TINYINT UNSIGNED` vont de 0 à 255.

<!-- -->

    type UNSIGNED

---

## Clés étrangères

Pour créer une clé étrangère, il faut
- un index sur la colonne source (= primary key ou key)
- que la colonne source et la colonne cible aient exactement le même type de données (même largeur)

``` sql
CREATE TABLE groupe (
  id INT(11) PRIMARY KEY,
  label VARCHAR(255)
);

CREATE TABLE etudiant (
  id INT(11) PRIMARY KEY,
  nom VARCHAR(255),
  prenom VARCHAR(255),
  groupe INT(11),
  FOREIGN KEY(groupe) REFERENCES groupe (id)
);
```

On peut contrôler le comportement de la valeur cible lorsque la valeur source est supprimée avec

    ON DELETE {RESTRICT | NO ACTION | SET NULL | CASCADE}

Même principe pour la mise à jour des données avec

    ON UPDATE {RESTRICT | NO ACTION | SET NULL | CASCADE}

<table>
  <thead>
    <tr>
      <th>Valeur</th>
      <th>Description</th>
      <th>Exemple</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th align="left">NO ACTION</th>
      <td>(Comportement par défaut) Lever une erreur si l'on essaie de supprimer une référence<br>Synonyme: RESTRICT</td>
      <td>Si l'on essaie de supprimer un groupe alors qu'un étudiant appartient à ce groupe, la suppression échoue en affichant une erreur (Cannot delete or update a parent row: a foreign key constraint fails [...])</td>
    </tr>
    <tr>
      <th align="left">SET NULL</th>
      <td>Mettre à <code>NULL</code> la valeur lorsqu'on supprime la référence</td>
      <td>Si l'on supprime une catégorie, on met <code>NULL</code> pour catégorie aux produits associés (= sans catégorie)</td>
    </tr>
    <tr>
      <th align="left">CASCADE</th>
      <td>Supprimer la ligne si la référence est supprimée</td>
      <td>Si l'on supprime un concert, on supprime toutes les réservations associées.</td>
    </tr>
  </tbody>
</table>

<ins>Exemples</ins> :

Ajouter les contraintes à la création de table :

``` sql
CREATE TABLE commande (
  id INT(11) PRIMARY KEY,
  date DATETIME
);

CREATE TABLE produit(
  id INT(11) PRIMARY KEY,
  label VARCHAR(255)
);

CREATE TABLE commande_produits (
  id INT(11) PRIMARY KEY,
  id_commande INT(11),
  id_produit INT(11),
  FOREIGN KEY(id_commande) REFERENCES commande (id) ON UPDATE SET NULL ON DELETE CASCADE,
  FOREIGN KEY(id_produit) REFERENCES produit (id)
);
```

Ajouter les contraintes en altérant la table :

``` sql
ALTER TABLE groupcourses ADD FOREIGN KEY (course_id)
REFERENCES courses (id) ON DELETE CASCADE;

ALTER TABLE groupexams ADD FOREIGN KEY (course_id)
REFERENCES courses (id) ON DELETE CASCADE;

DELETE FROM courses WHERE name LIKE '%-toremove';
```

``` sql
ALTER TABLE branches ADD FOREIGN KEY (branchtype_id)
REFERENCES branch_types (id) ON DELETE SET NULL;

DELETE FROM branch_types WHERE name LIKE '%-outdated';
```

---

## Index

Les index sont généralement utilisés pour améliorer les performances des recherches (les jointures effectuées sur des colonnes indexées sont beaucoup plus rapides)

### Lister

    SHOW INDEX FROM nom_table [FROM database] [WHERE expr]

### Ajouter

    CREATE [UNIQUE | FULLTEXT | SPATIAL] INDEX nom_index ON nom_table (attributs)

### Supprimer

    DROP INDEX nom_index

---

## Vues

Une vue est une table dérivée des autres tables d'une base de données, son contenu est dynamique (calculé à l'execution).
On peut utiliser une vue pour requêter une table qui n'existe pas explicitement, par exemple pour ajouter automatiquement des colonnes calculées ou des jointures.

### Création

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

### Suppression

    DROP VIEW [IF EXISTS] nom_vue

``` sql
DROP VIEW IF EXISTS emp;
```

---

## Schémas internes

### Information_schema

`information_schema` est une base de donnée qui est gérée automatiquement par le SGBD MySQL
où l'on peut trouver diverses stats et informations sur les bases de données et tables du serveur.

<ins>Exemples</ins> :

Afficher l'auto_increment d'une table:

``` sql
SELECT AUTO_INCREMENT FROM information_schema.TABLES
WHERE table_schema = 'DATABASE_NAME' AND table_name = 'TABLE_NAME';
```

Chercher une table dans la BDD "ri_db" qui commence par "e" et finit par "s", et lister ses colonnes :

``` sql
SELECT table_name as tab_name, column_name as col_name, data_type
FROM information_schema.columns
WHERE table_schema = "ri_db"
AND table_name LIKE "e%" AND table_name LIKE "%s"
ORDER BY tab_name, col_name;
```

Lister les clés étrangères qui référencent une table :

``` sql
SELECT TABLE_NAME, COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE REFERENCED_TABLE_NAME = 'mytable'
```

[Plus d'info sur information_schema](https://dev.mysql.com/doc/refman/5.7/en/information-schema.html)

### Performance_schema

`performance_schema` permet de voir les évènements qui se passent sur le serveur MySQL

<ins>Exemple</ins> :

Afficher les threads bloqués :

    SELECT * FROM performance_schema.events_waits_current

[Plus d'info sur performance_schema](https://dev.mysql.com/doc/refman/5.7/en/performance-schema.html)

### Sys

`sys` contient des vues de `performance_schema`, crée des stats plus facilement compréhensibles

<ins>Exemple</ins> :

Liste les requêtes en cours :

    SELECT * FROM sys.session

[Plus d'info sur sys](https://dev.mysql.com/doc/refman/5.7/en/sys-schema-object-index.html)
