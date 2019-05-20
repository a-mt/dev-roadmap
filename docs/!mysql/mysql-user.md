---
title: Utilisateurs
category: BDD, MySQL, Administration
---

## Créer un utilisateur

    CREATE USER username
        [IDENTIFIED BY "password"]
        [options]

NB Un utilisateur tout juste créé ne possède aucune [permission](mysql-grant.md).

### Username

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

### Contraintes sur les noms

Les noms d'utilisateur (`user`) sont limités à 32 caractères sous MySQL.  
Cette longueur peut être réduite selon l'OS utilisé — par exemple les noms d'utilisateur Unix sont souvent limités à 8 caractères.

Certains utilisateurs sont réservés :

- `root@localhost` : super-admin
- `mysql.sys@localhost` : utilisé par le schema `sys`
- `mysql.session@localhost` : utilisé en interne par les plugins pour accéder au serveur

### Options

Différentes options peuvent être ajoutées, par exemple:
- n'accepter que les connections via SSH
- limiter le nombre de requêtes par heure
- marquer la date d'expiration du mot de passe
- désactiver temporairement le compte

Voir [doc MySQL CREATE USER](https://dev.mysql.com/doc/refman/5.7/en/create-user.html) pour la description des options.

### Exemple

``` sql
CREATE USER 'david'@'198.51.100.0/255.255.255.0';

CREATE USER 'admin'@'localhost' IDENTIFIED BY 'password';

CREATE USER 'francis'@'localhost' IDENTIFIED BY 'frank'
         WITH MAX_QUERIES_PER_HOUR 20
              MAX_UPDATES_PER_HOUR 10
              MAX_CONNECTIONS_PER_HOUR 5
              MAX_USER_CONNECTIONS 2;
```

---

## Modification

Même principe qu'à la création

<ins>Définition</ins>:

``` lua
ALTER USER [IF EXISTS] username
    [IDENTIFIED BY "password"]
    [options]
```

<ins>Exemple</ins>:

``` sql
ALTER USER 'jeffrey'@'localhost' PASSWORD EXPIRE;
```

[Doc MySQL ALTER USER](https://dev.mysql.com/doc/refman/5.7/en/alter-user.html)

---

## Mettre à jour le mot de passe

<ins>Définition</ins>:

    SET PASSWORD FOR username = hash

<ins>Exemple</ins>:

``` sql
SET PASSWORD FOR 'abe'@'host_name' = PASSWORD('eagle');
```

---

## Renommer

<ins>Définition</ins>:

    RENAME USER username TO newname

<ins>Exemple</ins>:

``` sql
RENAME USER 'jeffrey'@'localhost' TO 'jeff'@'127.0.0.1';
```

---

## Afficher les détails

<ins>Définition</ins>:

    SHOW CREATE USER username

<ins>Exemple</ins>:

``` sql
SHOW CREATE USER 'tech'@'localhost' 

/* CREATE USER 'tech'@'localhost'
    IDENTIFIED WITH 'mysql_native_password' AS '*CAA7104F46B7680BA7AED696E4DE0F33F2225A1B'
    REQUIRE NONE PASSWORD EXPIRE DEFAULT ACCOUNT UNLOCK */
```

---

## Supprimer

<ins>Définition</ins>:

    DROP USER [IF EXISTS] username

<ins>Exemple</ins>:

``` sql
DROP USER 'jeffrey'@'localhost';
```