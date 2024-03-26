---
title: Docker Quick Overview
category: Workflow, Containers, Docker
---

## Image

* Une image est en quelque sorte une archive contenant une collection de fichiers nécessaires au fonctionnement du container. Cela inclut les applications, bibliothèques, fichiers de configuration, scripts, etc. Pour chercher une image:

    ```
    docker search nginx
    ```

* Pour récupérer une image en local:

    ```
    docker pull docker.io/library/nginx
    ```

* Pour lister les images existantes en local:  
  Les tags sont utilisés pour distinguer différentes versions d'une même image.

    ```
    docker images
    ```

* Pour supprimer une image:  
  On peut aussi utiliser l'identifiant de l'image — et utiliser juste la première partie de l'ID tant qu'il n'y a qu'une seule image qui y correspond

    ```
    docker rmi nginx:1.20.2
    ```

  On ne peut pas supprimer une image utilisée par un container, mais on peut supprimer le container et l'image en utilisant l'option `--force`

    ```
    docker rmi --force nginx
    ```

## Container

* On peut utiliser une image pour créer un container.  
  Pour créer un container à partir de l'image nginx:

  ```
  docker run nginx -d
  ```

  ```
  docker run -d -p 8080:80 --name mywebserver nginx
  # docker run --detach --publish 9000:80 --name mywebserver john/customnginx:1.0
  ```

  - -d  
    L'option -d permet de détacher le container du terminal — autrement dit, le lancer en arrière plan

  - --name  
    Par défaut les noms des containers sont générés automatiquement, mais on peut spécifier le nom avec cette option

  - -p  
    Permet d'effectuer une redirection des ports entre l'hôte et le container.  
    Notons que tout port inférieur à 1024 est un port privilégié: seul l'utilisateur root peut l'ouvrir.

* Pour vérifier si nginx fonctionne:

    ```
    nc localhost 8080
    GET /
    ```

* Pour lister les containers en cours d'exécution:

    ```
    docker ps
    # docker container list
    ```

* Pour arrêter un container:

    ```
    docker stop CONTAINER_NAME_OR_ID
    ```

* Pour lister tous les containers, y compris ceux arrêtés:

    ```
    docker ps -a
    # docker ps --all
    ```

* Pour démarrer un container préalablement stoppé:

  ```
  docker start CONTAINER_NAME_OR_ID
  ```

* Pour supprimer un container:

    ```
    docker rm CONTAINER_NAME_OR_ID
    ```

  Si le container est en cours d'exécution, il faut utiliser stop au préalable pour l'arrêter, ou alors utiliser l'option `--force`.