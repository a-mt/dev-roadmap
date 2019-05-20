---
title: Permissions
category: BDD, MySQL, Administration
---

## Afficher les permissions d'un utilisateur

<ins>Définition</ins>:

    SHOW GRANTS FOR username

<ins>Exemple</ins>:

``` sql
SHOW GRANTS FOR 'joe'@'office.example.com';
```

---

## Ajouter des permissions

<ins>Définition</ins>:

    GRANT { ALL | SELECT | INSERT | UPDATE | DELETE | ... }
        ON { nom_table | nom_vue }
        TO username
        [ WITH GRANT OPTION ]

`GRANT` permet d'accorder des privilèges (droits de lecture, d'écriture, etc) sur des tables ou des vues.  
`WITH GRANT OPTION` autorise un utilisateur à donner des permissions qu'il possède à d'autres utilisateurs.

[Liste complètes des droits](https://dev.mysql.com/doc/refman/5.7/en/privileges-provided.html)  
Les droits supportés par MySQL peuvent également être listés via `SHOW PRIVILEGES`

<ins>Exemple</ins>:

``` sql
GRANT ALL ON *.* TO 'finley'@'localhost' WITH GRANT OPTION;
```

``` sql
GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP ON bankaccount.* TO 'custom'@'localhost';
```

``` sql
GRANT RELOAD,PROCESS ON *.* TO 'admin'@'localhost';
```

---

## Supprimer des permissions

    REVOKE { ALL | SELECT | INSERT | UPDATE | DELETE | ... }
        ON { nom_table | nom_vue }
        FROM username

---

## Utiliser un proxy

Pour gérer des groupes d'utilisateur, on peut utiliser des proxy.  
Par exemple, pour donner accès à la base de donnée `app` à tous les utilisateurs qui utilisent le proxy `manager` :

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

Voir [doc MySQL Proxy](https://dev.mysql.com/doc/refman/5.5/en/proxy-users.html)

---

## Flush

Les permissions modifiées via les commandes de gestion de compte telles que `GRANT`, `REVOKE`, `SET PASSWORD`, et `RENAME USER` sont automatiquement détectées par le serveur et rafraichies en mémoire immédiatement.

En revanche, en cas de modification via `INSERT`, `UPDATE` ou `DELETE`, les modifications ne seront pas prises en compte jusqu'au redémarrage du serveur ou rafraichissement des permissions:

    FLUSH PRIVILEGES