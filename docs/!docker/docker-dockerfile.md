---
title: Dockerfile
category: Workflow, Containers, Docker
---

{% raw %}
Jusqu'à présent, on a récupéré et construit des images Docker à la main pour créer des containers. Mais on peut également faire la même chose de manière scriptée, avec un fichier — un `Dockerfile`.

## Qu'est ce qu'un Dockerfile

Un fichier Dockerfile est un petit programme conçu pour décrire comment créer une image Docker:

* Créer un fichier `Dockerfile`:

  ```
  FROM busybox
  RUN echo "building simple docker image"
  CMD echo "hello container"
  ```

  Chaque ligne commence par un nom de commande (comme `LABEL` ou `CMD`), suivit d'une instruction.

* Créer une image à partir du Dockerfile  
  En partant du principe que vous êtes dans le répertoire qui contient le fichier `Dockerfile`:

  ```
  docker build -t hello .
  ```

  Par défaut, Docker cherche le fichier `Dockerfile` (sensible à la casse).  
  Utiliser l'option `--file` pour utiliser un fichier nommé autrement

  ```
  docker build -t myimage:alpine --file alpine.Dockerfile .
  ```

  Une fois terminé, l'image existera dans la liste d'images téléchargées, prête à être exécutée avec `docker run`.

* Lancer un container à partir de l'image

  ```
  docker run --rm hello
  ```

  `busybox` est une image extrêmement petite, qui n'a rien d'autre qu'un shell.  
  Si on lance un container à partir de l'image qui aura été créé avec le Dockerfile cid-essus, le container affichera "hello container" et s'arrêtera.

  Notons que lorsque la commande a exécuter n'est pas précisée à la fin de `docker run`, alors la commande par défaut — définie par `CMD` — est exécutée.

---

## Mise en cache

Lorsqu'on construit l'image, chaque commande du Dockerfile est exécutée dans un nouveau container qui est arrêté à la fin de la ligne.
Chacun de ces containers est mis en cache (on parle de *layer*), cela économise énormément de temps lorsqu'on teste l'installation mais peut prendre de la place si vous ne les nettoyez jamais. Si vous voulez télécharger à nouveau la dernière version d'un fichier (outrepasser le cache), vous devrez le faire explicitement avec `no-cache=true`.

Si vous modifiez votre Dockerfile et relancez le build, Docker ignorera les lignes qui n'ont pas été modifiées depuis le dernier build, et utilisera les containers en cache — il est donc prérérable de mettre les commandes que vous risquez de modifier le plus à la fin du Dockerfile.

---

## Contexte du build

Le contexte peut être le répertoire qui contient le Dockerfile ou un autre. Tous les fichiers qui se trouvent dans ce dossier seront ajoutés au système de fichiers crée lorsque l'image est crée, et seront accessibles à l'intérieur du Dockerfile (commandes `ADD` et `COPY`).

Si vous spécifiez un contexte de compilation arbitraire, disons votre répertoire personnel — où se situe quelques giga de fichiers vidéos, et que vous lancez `docker build` alors ces fichiers seront inclus dans l'image. Cette image sera énorme, à cause des quelques giga de fichiers vidéos que vous avez involontairement ajoutés à l'image.

* Pour éviter ça, vous pouvez créer un répertoire spécifique qui servira de contexte de build pour le Dockerfile:

  ```
  /workspace
    /Dockerfile
    /files
      /.profile
      /.gitignore
      /default.conf
  ```

  ```
  docker build --file Dockerfile -t myimage files
  ```

* Vous pouvez également utiliser un fichier `.dockerignore`.  
  Même principe qu'un `.gitignore`, le dockerignore indique à Docker d'ignorer certains patterns de fichiers dans le contexte du build.

---

## Bonnes pratiques

* Un container ne devrait avoir qu'une seule préoccupation: ne faire fonctionner qu'n suel processeur, qu'une seule application. Si vous voulez utilisez plusieurs applications, comme un serveur web et une base de données, utiliser deux containers reliés par un réseau privé.

* Lier `apt-get update` et `apt-get install` sur la même ligne avec `&&`. La raison pour cela, c'et que si vous avez ces deux commandes sur des lignes séparées, `apt-get update` ne sera pas relancé s'il est déjà en cache, et vous risquez d'installer des packages qui ne sont pas à jour.

* Ne pas laisser les containers récupérer de dépendances lorsqu'ils démarrent, les mettre directement dans l'image — faute de quoi votre image peut devenir inutilisable si des dépendances sont supprimées du registre.

---

## Réduire les layers

Une image est construite à partir de multiples layers — visibles via la commande `docker image history IMAGE_NAME` — qui prennent de la place.

Pour réduire une image à un seul calque, et ainsi réduire la taille de l'image, on peut

* utiliser une nouvelle option (expérimentale): `squash`

  ```
  docker build --squash -f dd-docker -t ubuntu:v3 .
  ```

* exporter le container puis le réimporter sous forme d'image

      docker container export CONTAINER_ID > nginx.tar
      docker image import nginx.tar

---

## Syntaxe Dockerfile

### FROM

La première ligne d'un Dockerfile (hors commentaire) doit spécifier à partir de quelle image démarrer:

    FROM busybox

Vous pouvez mettre plusieurs instructions `FROM` dans votre Dockerfile, pour créer plusieurs images.

### CMD

`CMD` définit la commande par défaut à exécuter lorsqu'un container est démarré.
Deux formes sont acceptées:

* la forme shell

      CMD echo "hello container"

* et la forme exec

      CMD ["nano", "myfile"]

  La forme exec est directement exécutée par Docker, et non par le bash, c'est donc légèrement plus efficace.

### ENTRYPOINT

`ENTRYPOINT` ressemble beaucoup à `CMD` mais ne spécifie que le début de la commande à exécuter lors du démarrage du container, et permet de spécifier la suite lors de l'appel.

    ENTRYPOINT ls

Si votre container fonctionne comme un programme de ligne de commande, vous pouvez utiliser `ENTRYPOINT` pour récupérer les arguments. Accepte la forme shell et la forme exec.

### RUN

`RUN` exécute une commande au moment du build, attend qu'elle se termine et sauvegarde le résultat.  
Accepte la forme shell et la forme exec.

    RUN apt-get update && apt-get install -y inotify-tools nginx apache2 openssh-server

<!-- -->

    RUN unzip install.zip /opt/opt/

Les variables d'environnements, définies avec `export`, ne sont pas conservées (puisque chaque commande est exécutée dans un container à part). Pour persister une variable d'environnement sur toutes les lignes, il faut utiliser la commande `ENV`.

### ENV

`ENV` permet de définir des variables d'environnement — qui valent pendant le build et lors de l'exécution du container.

    ENV DB_HOST=db.production.example.com

<!-- -->

    ENV DB_PORT=5432

### ARG

`ARG` définit une variable dont l'utilisateur peut modifier la valeur au moment de lancer le build — avec `build-arg`.

* `Dockerfile`:

  ```
  # Dockerfile
  FROM php:fpm
  ARG DOCKER_GUID=999

  WORKDIR /var/www/app

  # Allow www-data to use /var/run/docker.sock
  RUN groupadd ping -g $DOCKER_GUID && \
       usermod -aG ping www-data
  ```

* build:

  ``` bash
  host$ DOCKER_GUID=$(getent group docker | cut -d: -f3)
  host$ docker build --file Dockerfile --build-arg DOCKER_GUID=$DOCKER_GUID -t localcloud9/php .
  ```

### LABEL

Une instruction `LABEL` ajoute des métadatas à une image, sous forme de paire clé-valeur.  
On peut en définir plusieurs à la fois.

```
# Nginx
#
# VERSION 0.0.1

FROM ubuntu
LABEL Description="This image is used to start the foobar executable" Vendor="ACME Products" Version="1.0"
LABEL maintainer="SvenDowideit@home.org.au"
```

Ces données sont visibles lorsqu'on lance la commande `docker inspect`.

```
docker inspect 7c56cc7c2c0b --format '{{json .Config.Labels}}'
# {"localcloud9":"1"}
```

On peut également filtrer la liste des containers selon un label donné.

```
docker ps -a --filter 'label=localcloud9=1'
```

### EXPOSE

`EXPOSE` liste les ports qui doivent être exposés.  
Ces ports ne sont exposés que sur le réseau privé du container.  
Il faut toujours utiliser `-p` au moment de lancer `docker run` pour exposer les ports en dehors.

    EXPOSE 8080 8081

### ADD

`ADD` permet d'ajouter un fichier dans l'image. Ce peut être

* un fichier local

      ADD run.sh /run.sh

* le contenu d'une archive compressé. Si vous passez un fichier .tar.gz, Docker le décompressera dans l'image.

      ADD project.tar.gz /install/

* un fichier distant

      ADD https://project.example.com/download/1.0/project.rpm /project/

Si la destination fini avec un slash, Docker copiera le contenu du fichier vers la destination et non juste le fichier.  
Ainsi `ADD mydir /home` crée le dossier `mydir` dans le home directory tandis que `ADD mydir /home/` copie `mydir` et tout son contenu récursivement.

### COPY

`COPY` d'ajouter un fichier (local uniquement) dans l'image

```
COPY run.sh /run.sh
```

### VOLUME

`VOLUME` définit les volumes persistents ou éphèmères à utiliser (selon que vous passiez deux chemins ou un seul).

    # persistent
    VOLUME ["/host/path", "/container/path"]

<!-- -->

    # éphémère
    VOLUME ["/shared-data"]

Vous devriez généralement éviter d'utiliser des volumes persistents avec Dockerfile, car cela signifie qu'il ne marchera que sur votre ordinateur.

### WORKDIR

`WORKDIR` définit le répertoire courant pour les commandes qui suivent dans le Dockerfile — c'est comme si vous tapiez `cd` au début de chaque expression `RUN`. C'est aussi le répertoire courant lorsqu'on lance un container.

    WORKDIR /install/

### USER

`USER` définit avec quel utilisateur les commandes du container doivent être exécutées.  
On peut passer le nom ou l'id de l'utilisateur.

    USER www-data

<!-- -->

    USER 1000

### SHELL

`SHELL` définit le shell par défaut pour les commandes exécutées lors du build.  
Le shell par défaut sous Linux est ["/bin/sh", "-c"].

```
SHELL ["/bin/bash", "-c"]
```

[Dockerfile reference](https://docs.docker.com/engine/reference/builder/#from)

{% endraw %}