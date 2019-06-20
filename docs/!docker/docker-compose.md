---
title: Docker Compose
category: Workflow, Containers, Docker
---

Docker Compose est un outil d'orchestration, qui permet d'automatiser le lancement d'image (sur une seule machine). Cela permet de remplacer les lignes de commandes et paramètres (créer un réseau, démarrer le container a & b, définir les variables d'environnement, etc) par un fichier de configuration `docker-compose.yml`.

[Installer Docker Compose](https://docs.docker.com/compose/install/).

---

## Démarrer des containers

* Définir le fichier de configuration `docker-compose.yml` avec l'ensemble des containers à démarrer et leurs paramètres, ainsi que les volumes et réseaux à utiliser.

  ```
  version: '3.1'
  services:
    nginx-proxy:
      image: jwilder/nginx-proxy
      ports:
        - "80:80"
        - "5050:5050"
        - "8080:8080"
        - "8081:8081"
        - "8082:8082"
      volumes:
        - ./nginx.tmpl:/app/nginx.tmpl
        - ./proxy_vhost.conf:/etc/nginx/vhost.d/default
        - /var/run/docker.sock:/tmp/docker.sock:ro
      environment:
        - DEFAULT_HOST=localhost

    nginx:
      image: nginx
      expose:
        - "80"
      volumes:
        - ./app:/var/www/app:ro
        - ./default.conf:/etc/nginx/conf.d/default.conf
      environment:
       - VIRTUAL_HOST=localhost
      links:
        - fpm

    mysql:
      restart: always
      image: mariadb:10.2
      command: ['mysqld','--character-set-server=utf8']
      volumes:
      - databasevolume:/var/lib/mysql
      environment:
        MYSQL_ROOT_PASSWORD: rootpassword

    fpm:
      #image: php:fpm
      #build: ./templates/php
      image: localcloud9/php
      user: www-data
      volumes:
        - ./volumes/db:/var/db
        - ./app:/var/www/app:ro
        - /var/run/docker.sock:/var/run/docker.sock
      depends_on:
      - mysql

  volumes:
    databasevolume: {}

  networks:
    default:
      external:
        name: nginx-proxy
  ```

  Notes:
  * Les ports exposés avec `expose` ne sont accessibles que sur les services sur le même réseau privé.
  * Les ports publiés sur l'hôte avec `ports` sont accessibles à l'extérieur.
  * La syntaxe longue permet la configuration de champs supplémentaires qui ne peuvent pas être exprimés avec la syntaxe courte:

    ```
    ports:
    - target: 80
      published: 8080
      protocol: tcp
      mode: host
    ```

* Ouvrir le terminal dans le même répertoire, et lancer la commande:

  ```
  docker-compose up -d
  ```

---

## Utilitaires

On peut utiliser `docker ps` pour trouver l'ID des containers démarrés et utiliser `docker logs`, etc, ou on peut utiliser Docker Compose directement et utiliser le nom du service en guise d'ID.

* Pour voir les logs d'un container:

  ```
  docker-compose logs nginx
  ```

* Pour executer une commande sur un container:

  ```
  docker-compose exec nginx top
  ```

  ```
  docker-compose exec mysql mysql -u root -p
  ```

---

## Lifecycle

* Stopper les containers

  ```
  docker-compose stop
  ```

* Démarrer les containers stoppés

  ```
  docker-compose start
  ```

* Stopper et supprimer les containers

  ```
  docker-compose down
  ```

  Stopper et supprimer les containers ainsi que les volumes:

  ```
  docker-compose down -v
  ```

---

## Ajouter des services

* Modifier le fichier `docker-compose.yml`

  ```
  services:
    ...
    phpmyadmin:
      restart: always
      image: phpmyadmin/phpmyadmin
      ports:
      - 80:81
      environment:
        PMA_HOSTS: mysql
  ```

* Pour démarrer spécifiquement un service donné:

  ```
  docker-compose up -d phpmyadmin
  ```

* Pour le stopper:

  ```
  docker-compose stop phpmyadmin
  ```