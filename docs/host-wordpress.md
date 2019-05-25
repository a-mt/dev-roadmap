---
title: Installer Wordpress (servi par Nginx-proxy)
category: Hosting
---
 
Source: [Host multiple websites on one VPS with Docker and Nginx](https://blog.ssdnodes.com/blog/host-multiple-websites-docker-nginx/)

* Créer un répertoire pour mettre tous les fichiers que vous allez utiliser avec Wordpress

  ```
  mkdir ~/diary
  cd ~/diary
  ```

* Créer `docker-compose.yml`
  * <ins>Mots de passe</ins>:  
    Remplacer `rootpassword` et `wspassword` avec les mots de passe de votre choix
  * <ins>Nom de domaine</ins>:  
    Remplacer `diary.a-mt.xyz` avec votre propre nom de domaine / sous-domaine

  ```
  version: "3"

  services:
     db_node_diary:
       image: mysql:5.7
       volumes:
         - db_data:/var/lib/mysql
       restart: always
       environment:
         MYSQL_ROOT_PASSWORD: rootpassword
         MYSQL_DATABASE: wordpress
         MYSQL_USER: wordpress
         MYSQL_PASSWORD: wspassword

     wordpress:
       depends_on:
         - db_node_diary
       image: wordpress:latest
       ports:
         - "8082:80"
       restart: always
       environment:
         VIRTUAL_HOST: diary.DOMAIN.TLD
         WORDPRESS_DB_HOST: db_node_diary:3306
         WORDPRESS_DB_USER: wordpress
         WORDPRESS_DB_PASSWORD: wspassword

  volumes:
     db_data:

  networks:
    default:
      external:
        name: nginx-proxy
  ```

* Démarrer le container

  ```
  docker-compose up -d
  ```

* Vérifier que ça fonctionne: `http://diary.a-mt.xyz`  
  Puisque c'est la première fois que vous accédez au site, vous aller tomber sur la page d'installation

* Choisir un language

  ![](https://i.imgur.com/uW1FJmb.png)

* Choisir un nom pour votre site web et vos identifiants pour vous connecter au back-end

  ![](https://i.imgur.com/GIReW3G.png)

* Wordpress a été installé. Cliquez sur "Log in" avec les identifiants que vous avez précédemment choisis.

  ![](https://i.imgur.com/Gj2JWmU.png)

* Pour que les plugins et thèmes que vous installez (et fichiers que vous téléchargez) ne soient pas perdus lorsque vous supprimez le container Docker, récupérer le répertoire `wp-content` et le partager entre le container et la machine hôte.

  * Récupérer le répertoire `wp-content` du container sur la machine hôte.  
    Remplacer `diary_wordpress_1` avec le nom de votre container.

    ```
    docker ps
    sudo docker cp diary_wordpress_1:/var/www/html/wp-content wp-content
    sudo chown -R www-data: wp-content
    ```

  * Ajouter un volume dans `docker-compose.yml` pour partager le répertoire

    ```
    services:
     ...
     wordpress:
       volume:
          - ./wp-content:/var/www/html/wp-content
       environment:
    ```

  * Redémarrer le container

    ```
    docker-compose down
    docker-compose up -d
    ```