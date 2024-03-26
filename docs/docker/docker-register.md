---
title: Registres
category: Workflow, Containers, Docker
---

Un registre Docker est une application qui permet de stocker et distribuer des images Docker. Un registre peut être local (privé) ou sur le cloud (privé ou publique).

* Le *Docker Hub* (anciennement Docker Store) est un registre publique, gratuit, mis à disposition par Docker. Il dispose d'une [interface web](https://hub.docker.com/). C'est le registre qu'utilise Docker par défaut: si vous essayez de télécharger ou uploader une image, Docker cherchera sur Docker Hub.

* Vous pouvez également utiliser votre propre registre. De nombreuses entreprises font ce choix pour que leurs images restent privées.

* Docker Trusted Registry (DTR) fait quant à lui partie de Docker Enterprise edition. C'est un registre sécurisé, entièrement équipé, avec une interface graphique pour les tâches administratives.

---

## Trouver des images

* Pour chercher une image à partir de la ligne de commande, utiliser `docker search`

  ```
  docker search NAME
  ```

  Les images ont le flag "official" lorsque Docker (l'organisation qui gère le registre) a vérifié l'image.

* Il est possible de filtrer les résultats:

  ``` bash
  docker search --filter=stars=3 fedora              # au moins 3 étoiles
  docker search --filter "is-official=true" ubuntu   # que les images officielles
  docker search --filter "is-official=true" --filter "stars=80" ubuntu
  ```

* Par défaut, on obtient jusqu'à 25 résultats pour toute rechercher effectuée.  
  On peut utiliser l'option `--limit` pour spécifier un nombre autre que 25, entre 1 et 100.

* On peut également utiliser l'application web [Docker Hub](https://hub.docker.com/) pour rechercher des imges.  
  En cliquant sur une image, on obitent des informations des informatons supplémentaires — description de l'image, liste des tags disponibles et indications pour chaque tag.

---

## Récupérer une image

Les images sont automatiquement récupérées du registre lorsqu'on essaie de lancer une image qui n'existe pas sur le disque dur (avec `docker run`).
Mais on peut également télécharger l'image à l'avance avec `docker pull` — utile si vous savez que vous n'aurez pas de réseau plus tard.

    docker pull IMAGE_NAME

---

## Partager une image

* Pour envoyer une image sur le registre Docker, vous devez au préalable vous identifier:

  ```
  docker login
  ```

  Si vous n'avez pas d'ID Docker, allez sur hub.docker.com pour en créer un — c'est gratuit et ne prend qu'une minute, il suffit de fournir une adresse email et vérifier cette adresse pour pouvoir utiliser Docker Hub et stocker des images.

  Pour utiliser DTR, spécifier l'adresse IP du registre:

  ```
  docker login 192.168.1.129
  ```

* Une fois identifié, utiliser la commande `docker push`:

  ```
  docker push USERNAME/IMAGE_NAME:TAG
  ```

  Faites attention à de pas envoyer d'images qui contiennent vos mots de passe / clés SSH.

* Pour se déconnecter:

  ```
  docker logout
  ```

## Supprimer une image

Utiliser l'interface graphique.

---

## Utiliser un registre privé

Docker Registry est une application qui se charge de stocker des images Docker et leurs metadonnées. Elle écoute les instructions `push` et `pull` sur le port 5000. Il est également possible de configurer l'application pour vérifier les personnes autoritsées à se connecter.

* Pour créer un registre privé, utiliser l'image `registry` de Docker.

  ```
  docker run -d -p 5000:5000 --restart=always --name registry registry:2
  ```

  L'option `--restart=always` indique que si le container meurt, Docker doit le redémarrer immédiatement

  Il est possible de configurer l'authentification et la sécurité du registre, voir la [documentation sur le déploiement des registres](https://docs.docker.com/registry/deploying/).  
  Pour utiliser un fichier de configuration personnalisé:

  ```
  docker run -d \
    -p 5000:5000 \
    --restart=always \
    --name registry \
    -v `pwd`/config.yml:/etc/docker/registry/config.yml \
    registry:2
  ```

* S'identifier au registre:

  ```
  docker login localhost:5000
  ```

* Envoyer des images

  ```
  docker tag ubuntu:14.04 mycompany:my-ubuntu:v3.2
  docker push my-company/my-ubuntu:v3.2
  ```

---

## Docker Notary

Étant donné que des centaines voire milliers d'images sont distribuées entre des milliers de personnes et entreprises sur Internet, il est important de pouvoir vérifier que la personne qui prétend avoir crée une image Docker est vraiment celle qu'elle prétend être.

Avec Docker Content Trust (disponible dans Docker Enterprise Edition), vous pouvez signer numériquement des images avec votre clé privée, et lorsque vous téléchargez des images, vérifier que l'image a bien été crée par la personne qui dit l'avoir crée en vérifiant sa clé publique.

Si vous ne voulez pas payer pour les fonctionnalités de Enterprise Edition, Docker offre également Docker Notary. Il s'agit essentiellement d'une version open source de Docker Content Trust — en plus basique.

---

## Sauvegarder en local

Il est possible d'enregistrer et charger des images Docker sans utiliser de registre du tout. Pour ce faire, il existe deux commandes:

* `docker save` permet de sauvegarder des images dans une archive compressée. C'est un bon moyen pour les sauvegarder, migrer de version Docker, transférer des images d'un ordinateur à l'autre, les expédier à un client, etc.

      docker save -o my-images.tar.gz debian:sid busybox ubuntu:14.04

* `docker load` permet de récupérer les images d'une archive compressée

      docker load -i my-images.tar.gz
