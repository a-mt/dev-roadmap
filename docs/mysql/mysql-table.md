---
title: Table
category: BDD, MySQL, Schéma
---

## Lister

Lister les tables de la base de données :

``` shell
SHOW TABLES;
+---------------------+
| Tables in menagerie |
+---------------------+
| pet                 |
+---------------------+
```

---

## Afficher le schéma

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

---

## Créer

On peut créer une table permanente (par défaut) ou une table temporaire, supprimée lorsque la session est fermée.  
Une table temporaire peut être utilisée de manière ponctuelle, pour le temps d'une procédure par exemple.

``` txt
CREATE [TEMPORARY] TABLE [IF NOT EXISTS] nom_table (
    { definition_colonne | contrainte_relation: }*
) [options];

Où definition_colonne:
  nom_colonne type_donnee [NULL | NOT NULL] [DEFAULT val] [AUTO_INCREMENT] [UNIQUE | PRIMARY KEY]

Où contrainte_relation:
    PRIMARY KEY (attributs)
  | CHECK (condition)
  | {KEY|INDEX} [nom_index] (attributs)
  | {FULLTEXT|SPATIAL} [INDEX|KEY] [nom_index] (attributs)
  | UNIQUE [INDEX|KEY] [nom_index] (attributs)
  | FOREIGN KEY [nom_index] (attributs) references nom_table (attributs)
        [ON {UPDATE | DELETE} {RESTRICT | NO ACTION | SET NULL | CASCADE}]
```

`AUTO_INCREMENT` : uniquement pour les entiers et réels.

Le nom de la table et le nom des colonnes ne doivent pas être un [mot-clé réservé](https://dev.mysql.com/doc/refman/5.7/en/keywords.html).  
Les contraintes de relations / index peuvent être ajoutés pendant où [après avoir créé la table](mysql-constraint.md).  
[Liste des types de données](mysql-type.md)  
[Doc MySQL sur les options](https://dev.mysql.com/doc/refman/5.7/en/create-table.html#create-table-options)

### Exemples

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

---

## Modifier

    ALTER TABLE nom_table {
        ADD COLUMN definition_colonne [FIRST | AFTER nom_colonne]                # Ajouter une colonne
      | ALTER COLUMN nom_colonne {SET DEFAULT val | DROP DEFAULT}                # Changer la valeur par défaut d'une colonne
      | CHANGE COLUMN ancien_nom definition_colonne [FIRST | AFTER nom_colonne]  # Renommer ou changer de type de données d'une colonne
      | DROP COLUMN nom_colonne                                                  # Supprimer une colonne
      | ADD [CONSTRAINT nom_contrainte] contrainte_relation                      # Ajouter une contrainte, le nom est optionnel (généré si omis)
      | ADD {INDEX | UNIQUE | FULLTEXT | SPATIAL} [nom_index] nom_colonnes       # Ajouter un index, nom optionnel
      | DROP CONSTRAINT nom_contrainte                                           # Supprimer une contrainte / un index
    }*

Le format de `definition_colonne` et `contrainte_relative` sont décrits dans la section Créer  
Les contraintes de relations / index peuvent également être [ajoutés/modifiés séparemment](mysql-constraint.md).

### Exemples

``` sql
ALTER TABLE prof
ADD COLUMN prenom varchar(15) not null AFTER nom,
ADD COLUMN datedebut date
ADD CONSTRAINT nomprenom UNIQUE (nom,prenom);
```

---

## Créer une table à partir d'une autre

    SELECT ... INTO [TEMPORARY] TABLE nom_table
        FROM ...

<!-- -->

    CREATE [TEMPORARY] TABLE nom_table [(attributs)]
        as SELECT ... FROM ...

L'ordre des attributs du `SELECT` n'est pas important, les noms oui.

---

## Supprimer

Si on supprime une table, on supprime son schéma: elle n'existe plus.

    DROP TABLE [IF EXISTS] nom_table

## Supprimer les données

Si on tronque une table, on supprime ses données: elle est vide.

    TRUNCATE [TABLE] nom_table

---

## Renommer

    RENAME TABLE ancien_nom TO nouveau_nom

La table peut être déplacée d'une base de donnée à une autre:

    RENAME TABLE ancienne_database.nom_table TO nouvelle_database.nom_table