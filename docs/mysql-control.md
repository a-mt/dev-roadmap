---
title: Contrôles MySQL
category: Web, BDD, MySQL
---

## Flush

Les permissions modifiées via les commandes de gestion de compte telles que `GRANT`, `REVOKE`, `SET PASSWORD`, et `RENAME USER` sont automatiquement détectées par le serveur et rafraichies en mémoire immédiatement.

En revanche, en cas de modification via `INSERT`, `UPDATE` ou `DELETE`, les modifications ne seront pas prises en compte jusqu'au redémarrage du serveur ou rafraichissement des permissions :

    FLUSH PRIVILEGES

---

## Utilisateur

### Création

    CREATE USER username
        [IDENTIFIED WITH "password"]
        [options]

``` sql
CREATE USER 'david'@'198.51.100.0/255.255.255.0';

CREATE USER 'admin'@'localhost' IDENTIFIED BY 'password';

CREATE USER 'francis'@'localhost' IDENTIFIED BY 'frank'
         WITH MAX_QUERIES_PER_HOUR 20
              MAX_UPDATES_PER_HOUR 10
              MAX_CONNECTIONS_PER_HOUR 5
              MAX_USER_CONNECTIONS 2;
```

NB Un utilisateur tout juste créé ne possède aucune [autorisation](#autorisations).

<ins>Options</ins> :

Différentes options sont possibles comme
- n'accepter que les connections via SSH
- limiter le nombre de requêtes par heure
- marquer la date d'expiration du mot de passe
- désactiver temporairement le compte

Voir [doc MySQL](https://dev.mysql.com/doc/refman/5.7/en/create-user.html) pour la description des options.

<ins>Format username</ins> :

`username` est la combinaison du nom utilisateur et de la machine source autorisée (`'user'@'host'`)  
Quelques exemples de combinaisons :

| User   | Host                         | Permissible Connections                                                            |
|---     |---                           |---                                                                                 |
| 'fred' | 'h1.example.net'             | fred, se connectant à partir de h1.example.net                                     |
| ''     | 'h1.example.net'             | N'importe quel utilisateur, se connectant à partir de h1.example.net               |
| 'fred' | '%'                          | fred, se connectant à partir de n'importe quel hôte                                |
| ''     | '%'                          | N'importe quel utilisateur, se connectant à partir de n'importe quel hôte          |
| 'fred' | '%.example.net'              | fred, se connectant à partir de n'importe quel hôte du domaine example.net         |
| 'fred' | 'x.example.%'                | fred, se connectant à partir de x.example.net ou x.example.com, x.example.edu, etc |
| 'fred' | '198.51.100.177'             | fred, se connectant à partir de l'adresse IP 198.51.100.177                        |
| 'fred' | '198.51.100.%'               | fred, se connectant à partir de n'importe quel hôte dans le réseau 198.51.100      |
| 'fred' | '198.51.100.0/255.255.255.0' | Identique à l'exemple précédent                                                    |

<ins>Contraintes sur les noms</ins> :

Les noms d'utilisateur (`user`) sont limités à 32 caractères sous MySQL. Cette longueur peut être réduite selon l'OS utilisé - par exemple les noms d'utilisateur Unix sont souvent limités à 8 caractères.

Certains utilisateurs sont réservés :

- `root@localhost` : super-admin
- `mysql.sys@localhost` : utilisé par le schema `sys`
- `mysql.session@localhost` : utilisé en interne par les plugins pour accéder au serveur

### Modification

Même principe qu'à la création

``` lua
ALTER USER [IF EXISTS]

    -- list of users
    {username
    [
        IDENTIFIED BY 'password'
      | IDENTIFIED WITH auth_plugin
      | IDENTIFIED WITH auth_plugin BY 'password'
      | IDENTIFIED WITH auth_plugin AS 'hash_string'
    ]}*

    -- tls
    [ REQUIRE {
       SSL
     | X509
     | CIPHER 'cipher'
     | ISSUER 'issuer'
     | SUBJECT 'subject'
    }*(AND) ]

    -- limits
    [ WITH {
        MAX_QUERIES_PER_HOUR count
      | MAX_UPDATES_PER_HOUR count
      | MAX_CONNECTIONS_PER_HOUR count
      | MAX_USER_CONNECTIONS count
    }*( )]

    -- password / lock option
    [
        PASSWORD EXPIRE
      | PASSWORD EXPIRE DEFAULT
      | PASSWORD EXPIRE NEVER
      | PASSWORD EXPIRE INTERVAL N DAY
      | ACCOUNT LOCK
      | ACCOUNT UNLOCK
    ]
```

``` sql
ALTER USER 'jeffrey'@'localhost' PASSWORD EXPIRE;
```

Voir [doc MySQL](https://dev.mysql.com/doc/refman/5.7/en/alter-user.html)

### Afficher les détails

    SHOW CREATE USER username

``` sql
SHOW CREATE USER 'tech'@'localhost' 

/* CREATE USER 'tech'@'localhost'
    IDENTIFIED WITH 'mysql_native_password' AS '*CAA7104F46B7680BA7AED696E4DE0F33F2225A1B'
    REQUIRE NONE PASSWORD EXPIRE DEFAULT ACCOUNT UNLOCK */
```

### Mettre à jour le mot de passe

    SET PASSWORD FOR username = hash

``` sql
SET PASSWORD FOR 'abe'@'host_name' = PASSWORD('eagle');
```

### Renommer

    RENAME USER username TO newname

``` sql
RENAME USER 'jeffrey'@'localhost' TO 'jeff'@'127.0.0.1';
```

### Supprimer

    DROP USER [IF EXISTS] username

``` sql
DROP USER 'jeffrey'@'localhost';
```

### Utiliser un proxy

Pour gérer des groupes d'utilisateur, on peut utiliser des proxy. Par exemple, pour donner accès à la base de donnée `app` à tous les utilisateurs qui utilisent le proxy `manager` :

``` sql
-- create proxy account
CREATE USER 'myuser'@'localhost'
  IDENTIFIED WITH my_auth_plugin AS 'my_auth_string';

-- create proxied account and grant its privileges
CREATE USER 'manager'@'localhost'
  IDENTIFIED BY 'password';
GRANT ALL ON app.*
  TO 'manager'@'localhost';

-- grant PROXY privilege to proxy account for proxied account
GRANT PROXY
  ON 'manager'@'localhost'
  TO 'myuser'@'localhost';
```

``` sql
REVOKE PROXY ON 'manager' FROM 'myuser';
```

NB `USER()` retourne l'utilisateur authentifié. `CURRENT_USER()` retourne l'utilisateur réel

``` sql
SELECT USER(), CURRENT_USER();
+------------------+-------------------+
| USER()           | CURRENT_USER()    |
+------------------+-------------------+
| myuser@localhost | manager@localhost |
+------------------+-------------------+
```

Voir [doc MySQL](https://dev.mysql.com/doc/refman/5.5/en/proxy-users.html)

---

## Autorisations

Permet d'accorder ou supprimer des privilèges (droits d'accès) sur des relations ou des vues.

## Afficher

    SHOW GRANTS FOR username

``` sql
SHOW GRANTS FOR 'joe'@'office.example.com';
```

### Création

    GRANT { ALL | SELECT | INSERT | UPDATE | DELETE | ... }
        ON { nom_table | nom_vue }
        TO username
        [ WITH GRANT OPTION ]

`WITH GRANT OPTION` autorise un utilisateur à donner des autorisations qu'il possède à d'autres utilisateurs.

``` sql
GRANT ALL ON *.* TO 'finley'@'localhost' WITH GRANT OPTION;
```

``` sql
GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP ON bankaccount.* TO 'custom'@'localhost';
```

``` sql
GRANT RELOAD,PROCESS ON *.* TO 'admin'@'localhost';
```

[Liste complètes des droits](https://dev.mysql.com/doc/refman/5.7/en/privileges-provided.html)  
Les droits supportés par MySQL peuvent également être listés via `SHOW PRIVILEGES`

### Suppression

    REVOKE { ALL | SELECT | INSERT | UPDATE | DELETE | ... }
        ON { nom_table | nom_vue }
        FROM username

---

## Backups

### De tables

* <ins>Créer un backup</ins>

    ``` sql
    SELECT * INTO OUTFILE 'nom_fichier'
    FROM nom_table
    ```

* <ins>Restaurer</ins>

    ``` sql
    LOAD DATA INFILE 'nom_fichier'
    INTO TABLE nom_table
    ```

### De bases de données

Passer en ligne de commande :

* <ins>Créer un backup</ins>

    ``` shell
    mysqldump [--databases db1 db1 ... | --all-databases] > backup-file.sql
    ```

* <ins>Restaurer</ins>

    ``` shell
    mysql -u user -p database < backup-file.sql
    ```

    Ou pour restorer une base de donnée qui n'existe pas encore :

    ``` shell
    mysql -u user -p
    mysql> create database mydb
    mysql> use mydb
    mysql> source backup-file.sql
    ```

Il existe d'[autres méthodes pour créer et restaurer](https://dev.mysql.com/doc/refman/5.7/en/backup-methods.html) les tables

---

## Variables de configuration

### Afficher

Lister les variables et leur valeur :

    SHOW [GLOBAL | SESSION] VARIABLES [LIKE '%pattern']

### Modifier

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

---

## Triggers

Un *trigger* permet d'ajouter des contraintes (ex: le salaire horaire d'un employé ne peut pas diminuer) ou des calculs (ex: normalisation) lors du le passage d'un état à un autre.
Il est déclenché par le SGBD lorsque certains évènements se produisent sur une table (insertion, mise à jour ou suppression), ligne par ligne, soit avant soit après l'execution de la requête.

On ne peut pas mettre de trigger sur des vues, `information_schema`et `performance_schema` compris.  
Un trigger ne peut pas utiliser de procédures qui mettent à jour les valeurs ni utiliser de transactions.

### Lister

    SHOW TRIGGERS
        [FROM nom_database]
        [LIKE '%pattern' | WHERE expr]

### Création

    CREATE
        [DEFINER = { user | CURRENT_USER }]

        TRIGGER nom_trigger
        { BEFORE | AFTER } { INSERT | UPDATE | DELETE }
        ON nom_table FOR EACH ROW

        [{ FOLLOWS | PRECEDES } nom_autre_trigger]
        corps_trigger

#### Corps du trigger

À l'intérieur du corps du trigger, on peut accéder aux valeurs de la ligne via `OLD` et `NEW`.  
`OLD` contient les anciennes valeurs de la ligne (update, delete), `NEW` les nouvelles valeurs (insert, update).

``` sql
CREATE TRIGGER ins_sum BEFORE INSERT ON account
FOR EACH ROW
SET @sum = @sum + NEW.amount;

---

SET @sum = 0;
INSERT INTO account VALUES(137,14.98),(141,1937.50),(97,-100.00);
SELECT @sum AS 'Total amount inserted';
+-----------------------+
| Total amount inserted |
+-----------------------+
|               1852.48 |
+-----------------------+
```

Si le corps du trigger contient plusieurs intructions, le début et la fin doivent être délimité par `BEGIN` et `END`

``` sql
delimiter //
CREATE TRIGGER upd_check BEFORE UPDATE ON account
FOR EACH ROW
BEGIN
    IF NEW.amount < 0 THEN
        SET NEW.amount = 0;
    ELSEIF NEW.amount > 100 THEN
        SET NEW.amount = 100;
    END IF;
END //
delimiter ;
```

#### Lever une erreur

Une erreur peut être levée avec `SIGNAL`

    SIGNAL SQLSTATE '45000' set message_text='mon message';

<ins>Exemple complet</ins> :

``` sql
CREATE TABLE IF NOT EXISTS employe (
  id INT(11) UNSIGNED PRIMARY KEY,
  nom VARCHAR(255),
  prenom VARCHAR(255),
  salaire_horaire FLOAT
);

INSERT IGNORE INTO employe VALUES
(1, 'Dupont', 'Jean', 35),
(2, 'Durand', 'Marie', 40),
(3, 'Dufour', 'Henri', 45);

DROP TRIGGER IF EXISTS t_verif_salaire;

DELIMITER //
CREATE TRIGGER t_verif_salaire BEFORE UPDATE ON employe
FOR EACH ROW
BEGIN
    IF NEW.salaire_horaire < OLD.salaire_horaire THEN
        SET @msg = CONCAT('Le salaire de l\'employé #', OLD.id, ' (', OLD.nom, ' ', OLD.prenom, ') ne peut pas diminuer');
        SIGNAL SQLSTATE '45000' set message_text=@msg;
    END IF;
END //
DELIMITER ;

UPDATE employe SET salaire_horaire = 30 WHERE salaire_horaire = 35;
-- #1644 - Le salaire de l'employé #1 (Dupont Jean) ne peut pas diminuer
```

### Suppression

    DROP TRIGGER [IF EXISTS] nom_trigger

``` sql
DROP TRIGGER test.ins_sum;
```

[Doc MySQL triggers](https://dev.mysql.com/doc/refman/5.7/en/trigger-syntax.html)

---

## Transaction

### Propriétés ACID

Un SGBD doit fournir des mécanismes pour assurer l'intégrité, la confidentialité mais aussi les accès concurrents (autoriser les accès simultanés à la BD par plusieurs utilisateurs) et la sureté de fonctionnement (assurer la cohérence des données en dépit des pannes matérielles et logicielles qui peuvent se produire).

Une *transaction* est une séquence d'actions à réaliser sur la BD, qui a les propriétés suivantes (ACID) :

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

Les actions à l'intérieur d'une transaction sont effectuées en mémoire.  
Lorsque la transaction atteint son point de validation (`COMMIT`), les modifications sont enregistrées sur le disque.  
Si la transaction est annulée (`ROLLBACK`), la transaction se supprime en effaçant toute trace de son passage.

### Journal

Un *point de contrôle* est une sauvegarde des modifications de la BD sur le disque.  
Le *journal* est un fichier texte dans lequel le SGBD inscrit dans l'ordre toutes les actions effectuées depuis le dernier point de contrôle.

Quand le système redémarre, il détermine en fonction du contenu du journal l'état des transactions et va automatiquement
- refaire le travail des transactions gagnantes
- défaire le travail des transactions perdantes

Le journal garantit ainsi les propriétés ACID : une transaction laisse toujours la base de données dans un état cohérent même après une panne.

### Transaction MySQL

Une transaction commence par

    START TRANSACTION

Les modifications d'une transaction sont validées et enregistrées via

    COMMIT

Ou annulées via

    ROLLBACK

<ins>Exemple</ins> :

``` sql
START TRANSACTION;
    SELECT @A:=SUM(salary) FROM table1 WHERE type=1;
    UPDATE table2 SET summary=@A WHERE type=1;
COMMIT;
```

Attention, les actions qui modifient le schéma ne peuvent pas être annulées (create, drop, alter), elles commitent automatiquement la transaction. [Liste des requêtes qui commitent automatiquement une transaction](https://dev.mysql.com/doc/refman/5.7/en/implicit-commit.html).

[Doc MySQL transactions](https://dev.mysql.com/doc/refman/5.7/en/commit.html)

### Savepoint

Le moteur InnoDB supporte les points de restauration au sein d'une transaction, les *savepoints*. Ils permettent de revenir à une étape donnée dans la transaction et d'annuler celles qui ont suivit.

Créer un savepoint :

    SAVEPOINT identifier

Rollback vers un savepoint :

    ROLLBACK [WORK] TO [SAVEPOINT] identifier

Supprimer un savepoint (ni commit ni rollback) :

    RELEASE SAVEPOINT identifier

<ins>Exemple</ins> :

``` sql
START TRANSACTION;
    INSERT INTO matable VALUES (1);
    SAVEPOINT savepoint1; -- création du savepoint1
    INSERT INTO matable VALUES (2);
    SAVEPOINT savepoint2; -- création du savepoint2
    INSERT INTO matable VALUES (3);
    ROLLBACK TO SAVEPOINT savepoint1; -- ROLLBACK TO savepoint1
COMMIT;

SELECT * FROM tmp;
+----+
| id |
+----+
| 1  |
+----+
```

[Doc MySQL savepoints](https://dev.mysql.com/doc/refman/5.7/en/savepoint.html)

---

## Verrou

### Tables

Il est possible de verrouiller des tables (empêcher la lecture et/ou écriture tant que la requête n'est pas finie), par exemple pour mettre à jour une table à partir des données d'une autre table.

Obtenir un verrou (attention, débloque les tables précédemment verrouillées) :

    LOCK TABLES {nom_table {READ | WRITE}}*;

Debloquer tous les verrous de la session :

    UNLOCK TABLES

Une session qui travaille avec des tables verouillées doit obtenir le verrou sur toutes les tables dont elle a besoin.

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

[Doc MySQL Lock](https://dev.mysql.com/doc/refman/5.7/en/lock-tables.html)

### Base de donnée

Il est également possible de créer des verrous nommés, dans le contexte global, pour empêcher que deux procédures entrent en collision. Plusieurs verrous peuvent dans ce cas exister en même temps.
[Voir verrous nommés](mysql-fonctions.md#verrous)
