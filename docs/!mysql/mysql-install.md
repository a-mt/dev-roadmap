---
title: Installer MySQL
category: BDD, MySQL
---

## `mysql` ou `mysqld`

MySQL est un système de gestion de base de données relationnelle (*Relational Database Management System* en anglais, abbrégé RDBMS).

* Le serveur MySQL `mysqld` est le programme qui s'occupe de persister les données sur le disque, en gère l'accès et fournit une interface pour y accéder: le language SQL.
* Le client MySQL `mysql` est un programme accessible via la ligne de commande, qui permet d'envoyer des requêtes à un serveur MySQL — ce peut être un serveur sur la machine locale ou un serveur distant.

MariaDB est un fork de MySQL. Son API et son protocole sont compatibles avec ceux utilisés par MySQL — toutes applications et tous les packages qui fonctionnent avec MySQL fonctionnent donc avec MariaDB.
La seule différence, c'est l'ajout de nouvelles fonctionnalités sous MariaDB pour supporter les opérations natives non bloquantes et les rapports d'avancement.

## Installer

Pour installer `mysql` et/ou `mysqld`, le plus simple est de taper ces commandes dans le terminal et de choisir un package parmi les propositions

```
$mysqld

La commande « mysqld » n'a pas été trouvée, mais peut être installée avec :

sudo apt install mysql-server-core-5.7            
sudo apt install mariadb-server-core-10.1         
sudo apt install percona-xtradb-cluster-server-5.7
```

## Initialiser le mot de passe

Après avoir installé le serveur, il faut initialiser le mot de passe de l'utilisateur `root`:

* S'assurer que `mysql` est en cours d'execution

  ```
  sudo service mysql restart
  ```

* S'assurer que mySQL utilise son plugin natif pour l'authentification  
  (Source: [Change MySQL Server authentication plugin for root user](https://blog.ndk.name/change-mysql-server-authentication-plugin-for-root-user/))

  ```
  sudo mysql -u root
  update mysql.user set plugin='mysql_native_password' where User='root';
  flush privileges;
  exit;
  ```

* Lancer `mysql_secure_installation`

  ```
  mysql_secure_installation
  ```

  Accepter tous les paramètres par défaut à l'exception de "Reload privilege tables now?" (taper `y`).

* Essayer de se connecter

  ```
  mysql -u root -p
  ```

## Réinitialiser le mot de passe root de MySQL

Si vous avez oublié le mot de passe.

* Arrêter MySQL

  ```
  service mysql stop
  ```

* Démarrer MySQL avec la directive `skip-grant-tables`

  ```
  mysqld --skip-grant-tables &
  ```

* Mettre à jour le mot de passe de root — remplacer `rootpassword` avec le mot de passe de votre choix

  ```
  mysql -u root
  update mysql.user set authentication_string=password('rootpassword') where User='root';
  flush privileges;
  exit
  ```

* Redémarrer MySQL normallement

  ```
  service mysql restart
  ```

* Essayer de se connecter

  ```
  mysql -u root -p
  ```
