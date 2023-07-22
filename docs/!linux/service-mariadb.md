---
title: MariaDB
category: Linux > DB
---

## Installer

* De nos jours, l'application la plus populaire utilisée pour créer un serveur de base de données est MariaDB. MariaDB était à l'origine un fork de MySQL — autrement dit, un fork de MySQL qui a fini par être développé dans une direction différente de celle du projet original.

  Comme MariaDB et MySQL partagent les mêmes racines, ils fonctionnent de manière très similaire. Les commandes utilisées par les deux projets sont souvent identiques et pour des raisons de compatibilité, de nombreuses commandes utilisent encore le mot-clé `mysql` bien que ce soit mariadb qui est installé.

* Pour installer mariadb:

  ``` bash
  sudo dnf install mariadb-server
  ```

  Pour l'activer:

  ``` bash
  sudo dnf start mariadb.service
  sudo dnf enable mariadb.service
  ```

## Connexion

* La configuration par défaut de mariadb est très ouverte et peu sécurisée. Par exemple, n'importe quel utilisateur se connectant au serveur peut accéder à la base de données en tant que super utilisateur:

  ``` bash
  mysql -u root
  ```

  Ainsi connecté, il obtient toutes les permissions — lire, créer des base de données ou même les supprimer.

* Une pratique courante après l'installation de mariadb (ou mysql) consiste à resteindre les accès — et notamment ajouter un mot de passe au compte root.

  ``` bash
  mysql_secure_installation
  ```

  ![](https://i.imgur.com/JKxN1SJ.png)

* Maintenant, pour se connecter à mariadb, il faut ajouter l'option -p pour indiquer à mariadb que la connexion sera avec mot de passe

  ``` bash
  mysql -u root -p
  ```

## Configurations

* Le fichier de configuration principal, `/etc/my.cnf`, ne fait qu'inclure d'autres fichiers

  ![](https://i.imgur.com/7MwVw3Y.png)

* Le fichier `/etc/my.cnf.d/mariadb-server.cnf` contient les configurations du serveur

  ![](https://i.imgur.com/fOvgWli.png)

  - **datadir**  
    Répertoire dans lequel les bases de données seront stockées.  
    Si nos bases de données sont très volumineuses, il se peut qu'on ait à le changer pour un autre emplacement disposant de plus d'espace de stockage.

    ```
    datadir=/var/lib/mysql
    ```

  - **socket**  
    Une application peut se connecter à une autre par l'intermédiaire d'un fichier socket.  
    Il n'y a généralement pas d eraison de changer son emplacement, les autres applications s'attendent à trouver ce socket mariadb à l'emplacement par défaut.

    ```
    socket=/var/lib/mysql/mysql.sock
    ```

  - **log-error**  
    Emplacement du fichier dans lequel les erreurs seront enregistrées

    ```
    log-error=/var/log/mariadb/mariadb.log
    ```

  - **pid-file**  
    Fichier qui contiendra le PID du daemon faisant tourner la BDD.  
    Il n'y a que très rarement de raisons de le modifier, car d'autres applications peuvent chercher ce fichier pour savoir comment elles peuvent interagir avec l'application de base de données.

    ```
    pid-file=/run/mariadb/mariadb.pid
    ```

  - **port**  
    Pour modifier le port du serveur maraidb à 3308, rajouter une instruction port dans le bloc `[mysqld]`

    ```
    port=3308
    ```

  - **bind-address**  
    Par défaut mariadb écoute les connexions réseau provenant de n'importe quelle IP sur internet.  
    On peut restreindre les adresses IP sur lesquels le daemon écoute

    ```
    bind-address=10.0.0.5
    ```
