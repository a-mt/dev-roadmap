---
title: Backups
category: BDD, MySQL, Administration
---

## De tables

### Créer un backup

``` sql
SELECT * INTO OUTFILE 'nom_fichier'
FROM nom_table
```

### Restaurer

``` sql
LOAD DATA INFILE 'nom_fichier'
INTO TABLE nom_table
```

---

## De bases de données

Passer en ligne de commande

### Créer un backup

`mysqldump` permet de générer un fichier .sql contenant toutes les instructions SQL nécessaires pour créer le schéma de la base de données (tables, champs, etc) et le remplir avec les données que la base de données contient au moment du dump.

``` shell
mysqldump [--databases db1 db1 ... | --all-databases] > backup-file.sql
```

```
mysqldump --quick --single-transaction --max_allowed_packet=512M \
          --skip-add-locks --skip-add-drop-table \
          --user=username --password=userpassword dbname > dump.sql
```

[Documentation de mysqldump](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html)

<ins>Options</ins>:

* `--single-transaction`  
  Par défaut, mysqldump verrouille toutes les tables jusqu'à ce que le backup soit finit. Autrement dit, on ne peut ni lire ni écrire les tables pendant ce temps.

  Si vous utilisez InnoDB (ou XtraDB), vous pouvez utiliser `--single-transation` pour effectuer un backup des tables sans les verrouiller. Le dump sera un instantané des tables au moment où la commande a été lancée, peu importe combien de temps le dump met (InnoDB supporte [MVCC](https://dev.mysql.com/doc/refman/5.7/en/innodb-multi-versioning.html)).

  Le dump n'est pas garanti d'être cohérent pour les autres moteurs de stockage — par exemple, toute table TokuDB, MyISAM ou MEMORY dumpée peut encore changer d'état après que la commande ait été lancée.

  InnoDB est le moteur de stockage par défaut de MySQL et de MariaDB 10.2, donc à moins de l'avoir modifié, vous pouvez utiliser cette option. Vous pouvez vérifier votre moteur de stockage avec phpMyAdmin ou avec la ligne de commande:

  ```
  SELECT TABLE_NAME, ENGINE, TABLE_ROWS, DATA_LENGTH, TABLE_COLLATION
  FROM information_schema.tables
  WHERE table_schema = DATABASE();
  ```

  [Choosing the Right Storage Engine](https://mariadb.com/kb/en/library/choosing-the-right-storage-engine/)

* `--quick`  
  mysqldump peut récupérer et dumper le contenu d'une table ligne par ligne, ou il peut récupérer le contenu entier de la table et le mettre en mémoire avant de le dumper.
  Mettre en mémoire une table entière peut être problématique si elle contient beaucoup de données. L'option `--quick` permet d'exporter les tables ligne par ligne.

### Restaurer

Le dump peut être importé dans n'importe quelle base de données, pour recréer le même état de la base de données dumpée.

* Pour récupérer les données dans la même base de données:  
  Il faut d'abord supprimer toutes les tables et données qu'elle contient, pour que l'importe ne duplique pas les données ni ne crée de conflit. Puisqu'il n'y a pas de moyen facile d'effacer le contenu de base de données, le plus simple est de supprimer la base de données et d'en créer une nouvelle avec le même nom.

  Supprimer une base de données ne supprime pas les permissions qui y sont associées. Quand on crée un base de données avec le même nom, les utilisateurs qui avaient accès à la base de données auront accès à la nouvelle base de données (vide).

  ```
  mysqladmin --password="rootpassword" --force drop dbname;
  mysql -u root --password="rootpassword" --execute "CREATE DATABASE dbname CHARACTER SET utf8 COLLATE utf8_general_ci"
  ```

* Pour importer les données dans une autre base de données:  
  Créer une nouvelle base de données et un utilisateur y ayant accès.

  ```
  CREATE DATABASE `dbname` CHARACTER SET utf8 COLLATE utf8_general_ci;
  CREATE USER 'username'@'localhost' IDENTIFIED BY 'userpassword';
  GRANT ALL PRIVILEGES ON `dbname`.* TO 'username'@'localhost';
  ```

* Une fois que la base de données est vide et accessible, on peut importer le dump comme suit:

  ```
  mysql --init-command="SET SESSION foreign_key_checks=0; SET SESSION bulk_insert_buffer_size=1024 * 1024 * 512" \
         -u username --password="userpassword" dbname < dump.sql
  ```

  <ins>Options</ins>:

  * `--init-command`  
    Vérifier les clés étrangères est lent et inutile quand on importer des données dans une base de données vide.  
    Par défaut, le bulk insert insère les données par batch de 8M (hyper lent). Utilisez 512M si vous pouvez.

Il existe d'[autres méthodes pour créer et restaurer](https://dev.mysql.com/doc/refman/5.7/en/backup-methods.html) les tables
