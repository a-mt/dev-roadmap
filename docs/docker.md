---
title: Docker
category: Workflow, Containers
---

{% raw %}

## À quoi sert Docker

Linux permet de créer des environnements isolés.
Par exemple, vous pouvez avoir sur un même système d'exploitation
Red Hat Linux pour servir une base de données,
Ubuntu Linux pour exécuter un serveur web qui communique avec cette base de données,
et SUSE Linux comme serveur de mise en cache utilisé par le serveur web.
Cela nécessite beaucoup de connaissances sur Linux — cgroups, namespaces, iptables, mount, copy-on-write...
C'est là que Docker intervient.

Docker permet de créer des containers — des unités de logiciel autonomes et scellées qui incluent le code, les configurations, les processus, le réseau, les dépendances et assez du système d'exploitation pour exécuter votre code. Chaque container a son propre petit monde, il ne peut voir rien d'autre et d'autres container ne peuvent pas le voir. Docker est le programme qui se charge de gérer la partie technique: il crée, exécute, surveille et arrête les containers.

Les containers existent par dessus le système d'exploitation tout en partageant la plus grande partie de l'OS, ce qui les rend très petits et très rapides. Docker n'est pas une machine virtuelle, il n'y a qu'un seul système d'exploitation en cours d'exécution.

Les containers sont conçus pour être portables, ils peuvent être partagés.  
Docker a également une plateforme pour vous aider à trouver et partager des containers.

Cela a de nombreux cas d'utilisation différents:
* Pour les développeurs
  * créer un environnement de développement contrôlé et contenu
  * partager un environnement de développment identique à travers l'équipe
  * isoler les états d'une application pour faciliter le debuggage et les rapports de bug
* Pour les opérations IT
  * test
  * déploiement

---

## Installer Docker

Docker existe en deux versions:
* Docker Community Edition (CE), pour les développeurs et petites équipes, gratuit
* Docker Enterprise Edition (E.E.), pour les entreprises, payant

On utilisera Docker CE.

Il existe plusieurs produits Docker
* Docker Engine, le programme qui s'occupe de faire tourner les containers
* Docker CLI client, un programme en ligne de commande qui permet de donner des instructions au Docker Engine
* Docker Compose, un outil d'orchestration (optionnel)
* Docker Machine, gère une machine virtuelle Linux (Mac & Windows)
* Kitematic, GUI pour installer et gérer Docker (Mac & Windows)

### Windows, Mac

Suivre les instructions de la documentation: [Installer Docker Sous Mac / Windows](https://docs.docker.com/install/).  
Si votre ordinateur ne répond pas aux exigences listées, utilisez [Docker ToolBox](https://docs.docker.com/toolbox/overview/).  
Si l'installation échoue, c'est peut être que vous avez une ancienne version de HyperKit — ou VirtualBox pour Docker ToolBox. Désinstallez-le et recommencez.

Cela installera tous les produits Docker. Docker Machine vous permettra de gérer votre machine virtuelle Linux pour Docker en ligne de commande. Pour lister les commandes disponibles, tapez

    docker-machine

### Linux

L'installation de Docker sur une machine Linux est légèrement plus facile que l'installation sur Mac ou Windows puisqu'il n'est pas nécessaire de configurer une machine virtuelle.
Suivre les instructions de la documentation: [Installer Docker sous Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/).  
Cela devrait ressembler à ça:

``` shell
# Install packages
sudo apt-get install apt-transport-https ca-certificates curl gnupg2 software-properties-common

# Add Docker's GPG key
curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg | sudo apt-key add -

# Add Docker's last stable repository
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

# Install Docker
sudo apt-get update
sudo apt-get install docker-ce

# Verify that Docker CE is installed correctly
sudo docker run hello-world
```

Si vous ne voulez pas taper `sudo` à chaque fois que vous appelez Docker, ajoutez votre utilisateur au groupe `docker`. Déconnectez-vous puis reconnectez-vous quand c'est fait.

``` shell
sudo groupadd docker
sudo usermod -aG docker $USER
```

[Plus d'infos sur les configurations post-installation](https://docs.docker.com/install/linux/linux-postinstall/)

### Vérifier l'installation

Vous pouvez vérifier la version Docker installée:

``` shell
docker version
```

Afficher les infos:

``` shell
docker info
```

Linux: Si Docker n'est pas démarré, démarrez-le

``` shell
sudo service docker start
```

Exécutez l'image hello-world

``` shell
docker run hello-world
```

---

## Flow Docker

### Qu'est ce qu'une image

Tout commence par une image. Une image est l'ensemble des fichiers qui seront utilisés pour construire et exécuter un container. Une image est statique, sauvegardée sur le disque, un container est le processus en cours d'execution démarré à partir de l'image. Les images peuvent être partagées, ce qui permet de facilement recréer le même environnement de développement entre plusieurs personnes et ordinateurs.

Docker a des images pré-construites dans le Docker Store. Si vous tentez d'utiliser une image qui n'existe pas sur votre disque, Docker ira la télécharger. Pour lister les images téléchargées sur votre disque:

    docker images

Si vous avez plusieurs images, vous ne pouvez pas additionner leurs tailles respectives pour obtenir la quantité totale d'espace disque utilisée par Docker, parce que ces images partagent une grande partie de leurs données.

### Lancer une image

La commande `docker run` prend une image et en fait un container en cours d'exécution, avec un processus qui fait quelque chose.

![](https://i.imgur.com/iHXR4DM.png)

<ins>Exemple</ins>:

    docker run -ti ubuntu:latest bash

* `-ti` est une option qui signifie "terminal interractif".  
  Cela permet d'executer le shell, d'avoir la complétion par tabulation et que les choses soient formattées correctement.
* `ubuntu` est l'image et `latest` est la version de l'image que nous voulons exécuter.  
  Si vous ne spécifiez pas la version, `latest` est la valeur par défaut.
* `bash` est la commande que nous voulons exécuter sur cette image.

Si vous vouliez exécuter des commandes Bash directement, vous pourriez faire:

    docker run ubuntu bash -c "sleep 3; echo all done"

### Lister les containers en cours d'exécution

Pour lister tous les containers en cours d'exécution, lancez (dans un autre terminal)

    docker ps

Vous pouvez passer une chaîne de caractères pour formatter sa sortie. Par exemple, pour afficher le résultat verticalement:

    export FORMAT="\nID\t{{.ID}}\nIMAGE\t{{.Image}}\nCOMMAND\t{{.Command}}\nCREATED\t{{.RunningFor}}\nSTATUS\t{{.Status}}\nPORTS\t{{.Ports}}\nNAMES\t{{.Names}}\n"
    docker ps --format $FORMAT

### Lister les containers stoppés

Lorsque vous créez un container à partir d'une image, cela ne change pas l'image: si vous créez un fichier, ce fichier n'existe que dans le container; si vous démarrez un autre container à partir de la même image, il ne récupérera pas le fichier.

Tant que le container est en cours d'exécution, il est vivant, il fait tourner des processus. Quand le ou les processus se termine(nt), le container est toujours là, il n'est pas supprimé — c'est un container stoppé.

Pour lister les containers stopppés, vous pouvez utiliser

    docker ps -a

``` shell
$ docker ps
CONTAINER ID    IMAGE            COMMAND   CREATED           STATUS           PORTS    NAMES
a8c267869b0b    ubuntu:latest    "bash"    53 seconds ago    Up 52 seconds             elegant_noether
```

Pour ne lister que le dernier container:

    docker ps -l

`docker container ls` est un alias de `docker ps`.

### Sauvegarder un container stoppé

Si vous voulez sauvegarder les fichiers et les logiciels que vous avez installé dans le container, l'étape suivante consiste à créer une image à partir du container stoppé avec `docker commit`.

![](https://i.imgur.com/pNZE1MY.png)

`docker run` prend une image et en fait un container, `docker commit` prend un container et en fait une image. Il n'écrase pas l'image à partir de laquelle le container a été fabriqué et ne supprime pas le container.

Pour sauvegarder un container en image:

    docker commit CONTAINER_ID

Vous pouvez créer une image qui aura un nom différent du container:

    docker commit CONTAINER_ID IMAGE_NAME

<ins>Exemple</ins>:

    docker commit a8c267869b0b my-image

#### Structure du nom d'une image

La structure complète du nom pour une image est comme suit:

![](https://i.imgur.com/tBUQO6b.png)

Vous pouvez omettre les parties dont vous n'avez pas besoin.  
Ainsi, pour spécifier un tag, vous pouvez faire

    docker commit c58877f1653b my-image:v2.1

Ou, si vous avez l'intention de partager votre image, spécifier votre nom en suivant le format `organization/image-name`

---

## Containers en arrière plan

### Container détaché

Dans l'exemple précédent, nous avons utilisé un terminal interactif en premier plan. On peut également créer des containers détachés, qui tournent en arrière plan. Pour ce faire, on utilise l'option `-d`

    docker run -d -ti ubuntu bash

C'est généralement une bonne idée de nommer votre container pour le retrouver facilement, en utilisant l'option `--name`. Si vous ne le faites pas, Docker va le nommer par lui-même.

    docker run --name example -d -ti ubutu 

### Passer d'un état à l'autre

* Pour passer en premier plan un container en arrière plan:

      docker attach CONTAINER_NAME

  Si vous ne l'avez pas nommé vous-même, utilisez `docker ps -a` pour trouver son nom.

* Pour passer en arrière plan un container en premier plan: <kbd>Ctrl</kbd> + <kbd>p</kbd>, <kbd>Ctrl</kbd> + <kbd>q</kbd>

### Ajouter des processus à un container

Vous avez démarré un container, quelque chose est en cours d'exécution et vous souhaitez ajouter un autre processus au container en cours d'exécution en arrière plan. Vous pouvez utiliser `docker exec`.

``` shell
# start a new bash in that container
docker exec -ti bash
```

Lorsque le container d'origine s'arrête, tout processus ajouté avec `exec` s'arrête également.  
On ne peut pas ajouter de ports, de volumes, etc, en cours d'exécution.

### Installer des logiciels

Pour installer des logiciels, il vous suffit d'utiliser le shell interactif sur le container en cours d'exécution, puis de sauvegarder votre container en image.

``` shell
docker run -it ubuntu bash
apt-get update
apt-get install netcat
exit
docker ps -l
docker commit 4e3b351f752d my-image
```

### Sorties du container

Docker garde toutes les sorties du container pendant aussi longtemps que vous gardez le container.  
Vous pouvez utiliser `docker logs` pour le voir

    docker logs CONTAINER_NAME

Faites attention à ne pas laisser les logs Docker devenir trop gros, cela peut ralentir Docker jusqu'au point où votre système entier ne répond plus!

---

## Arrêter, supprimer, limiter

### Stopper un container

Vous pouvez stopper un container en cours d'exécution (qu'il passe à l'état stoppé) avec

    docker kill CONTAINER_NAME

### Supprimer un container

Lorsque le container à l'état terminé, vous pouvez le supprimer avec la commande

    docker rm CONTAINER_NAME

Notez que vous pouvez démarrer un container qui sera automatiquement supprimé lorsqu'il sera stoppé avec l'option `--rm`. Attention à ne l'utiliser que si vous êtes sûr de ne pas vouloir conserver des données de ce container.

    docker run --rm IMAGE_NAME

### Supprimer une image

Les images peuvent s'accumuler rapidement. Pour supprimer une image:

    docker rmi IMAGE_NAME

Vous pouvez également utiliser son ID au lieu de son nom.

### Limiter les ressources

L'une des grandes fonctionnalités de Docker est la possibilité d'imposer des limites quant aux ressources utilisées par un container.

* Pour limiter la quantité de mémoire maximale autorisée, utilisez l'option `--memory`

      docker run --memory MAX_MEMORY IMAGE_NAME COMMAND

* Le CPU est distribué entre les containers en cours d'execution.
  Par défaut chaque container a `1024` parts de CPU et chaque container reçoit la même part de cycles CPU.
  Pour donner plus ou moins de poids à un container, utilisez l'option `--cpu-shares` (`-c` en version courte).
  Si un container est inutilisé alors le deuxième pourra utiliser 100% du CPU.

      docker run -c 614 -dit --name db postgres /postgres.sh   # 60% de 1024
      docker run -c 410 -dit --name web nginx /nginx.sh        # 40% de 1024

* Pour limiter par rapport à la quantité totale de CPU, utilisez `--cpu-quota`.  
  La valeur par défaut est `1000000`, soit 100% du CPU.

      docker run --cpu-quota=10000 -dit my-image               # 10% du CPU

  Docker limitera l'usage du CPU à cette quantité, quand bien même 90% du CPU reste inutilisé.

La plupart des systèmes d'orchestration exigent que vous indiquiez les limites d'un container.

---

## Debugger

### Network Host

Vous pouvez désactiver l'isolation qui empêcher les containers de manipuler le réseau de l'hôte en utilisant l'option `--net=host`. C'est très utile pour l'apprentissage et le debuggage mais une mauvaise idée pour la production.

### Inspecter

`docker inspect` permet de récupérer les infos d'un container, comme son PID ou son adresse IP.  
Par exemple, pour afficher le PID du container "hello":

    docker inspect --format '{{.State.Pid}}' hello

---

## Networking

### Exposer un port spécifique

Vous pouvez spécifier quels ports du container sont visibles à l'extérieur. Vous spécifiez le numéro du port à l'intérieur du container et le numéro du port tel qu'il est vu à l'extérieur avec l'option `-p`. Vous pouvez spécifier pour autant de ports que vous le souhaitez.

<ins>Exemple</ins>:

    docker run -ti -p 45678:45678 -p 45679:45679 my-image bash
    nc -lp 45678 | nc -lp 45679

On expose ici le port 45678 du container comme port 45678 pour l'extérieur. Même chose pour le port 45679.
On démarre ensuite netcat pour rediriger les messages reçus sur le port 45678 vers le port 45679.
Pour y accéder depuis l'extérieur du container, il suffit d'aller sur cet hôte avec le bon port.
1. Trouver l'adresse ip de votre container:

       docker inspect --format "{{.NetworkSettings.IPAddress}}" CONTAINER_NAME

2. Se connecter à cette addresse

   Terminal A: Lancer netcat sur le container au port 45678

       nc 172.17.0.2 45678

   Terminal B: Lancer netcat sur le container au port 45679

       nc 172.17.0.2 45679

   Terminal A: Taper quelque chose (+ entrée)  
   Terminal B: Reçoit les données

Exposer un port spécifique nécessite que les services que vous exécutez connaisse à l'avance les ports utilisés.

### Exposer les ports dynamiquement

Vous pouvez exposer vos ports dynamiquement. Le port à l'intérieur du container sera toujours fixé (le programme à l'intérieur du container écoute toujours sur le même port), en revanche le numéro de port exposé à l'extérieur sera choisit aléatoirement parmis les ports disponibles.
De cette façon, vous n'avez pas à vous préoccuper des conflits à l'avance, et de ne pas pouvoir exécuter un container car un autre container utilise ce port.

Pour exposer un port dynamiquement, il suffit de ne spécifier que le numéro de port à l'intérieur du container. Par exemple:

    docker run -ti -p 45678 -p 45679 ubuntu bash

Pour générer les ports externes d'un container en cours d'exécution:

    docker port CONTAINER_NAME

Pour notre exemple, un résultat possible est comme suit:

        45678/tcp -> 0.0.0.0:32770
        45679/tcp -> 0.0.0.0:32769

`0.0.0.0` indique qu'il accepte les connexions de n'importe qui. `32770` est le numéro du port `45678` exposé à l'extérieur. Si vous exécutez cette même commande une deuxième fois, le résultat sera différent. Vous pouvez donc exécuter plusieurs containers qui utilisent les mêmes ports fixes à l'intérieur du container, sans que cela ne crée de conflit.

### Ports UDP

Par défaut, quand vous entrez un numéro de port, Docker part du principe que vous voulez un port TCP. Si vous avez un service qui utilise UDP, vous devez spécifier le protocole avec le format suivant:

``` shell
OUTSIDE_PORT:INSIDE_PORT/PROTOCOL  # protocol: tcp|udp
```

### Note complémentaire sur les adresses IP

Très souvent, un service est configuré pour écouter les connexions de la machine locale (`127.0.0.0`) ou d'Internet. Lorsque ce service est placé dans un container, la machine locale est cantonnée à l'intérieur du container.

Si vous souhaitez réellement pouvoir recevoir des connexions du même hôte, mais dans des containers différents, vous devez modifier le service pour qu'il écoute les connexions à partir d'Internet en définissant son adresse à `0.0.0.0`. Et vous pouvez toujours utiliser Docker pour limiter l'accès à un seul hôte:

    docker run -p 127.0.0.1:80:80/tcp

---

## Connecter deux containers

Pour connecter deux containers, vous pouvez utiliser deux approches différentes:

* Utiliser le network  
  Vous connectez deux containers ensembles en exposant un port sur chacun de ces containers et connectant chacun d'entre eux.

* Lier les containers  
  Une approche plus efficace consiste à lier les containers, pour que les données du container client aillent directement au données du serveur tout en restant encapsulés par Docker — sans utiliser le réseau.

### Lier des containers

Lorsque vous liez deux containers ensemble, vous liez tous leurs ports, de manière unidirectionnelle (du client au serveur). Vous ne devriez l'utiliser que pour des services qui ne peuvent jamais être exécutés sur des machines différentes — un service et un healthcheck est un bon exemple, un service et sa base de données non.
Lier des containers est généralement utilisé avec un outil d'orchestration pour garder une trace de ce qui est en cours d'exécution.

Pour lier des containers, vous commencez par créer un serveur normallement:

    docker run --ti --name server ubuntu:14.04 bash

Puis vous démarrez un client lié à ce serveur grâce à l'option `--link`:

    docker run -ti --link server --name client ubuntu:14.04 bash

Quand vous liez le client au serveur, l'adresse IP du serveur est ajouté aux hosts du client (`/etc/hosts`), avec le nom du container. Ainsi, vous pouvez requêter le serveur avec `nc server 1234` par exemple. Si l'adresse IP du serveur change après coup, le lien sera rompu.

### Créer des liens qui ne rompent pas

Vous pouvez lier les containers de telle sorte que les liens ne se rompent pas en utilisant des réseaux privés. Vous pouvez créer des réseaux privés, y ajouter des containers, et le réseau gèrera l'association nom/adresse ip. Ainsi, lorsque les containers s'en vont et reviennent, l'adresse sera toujours bonne pour tous les containers du réseau.

Pour créer un réseau:

    docker network create NETWORK_NAME

Pour ajouter des containers à un réseau, utiliser l'option `--net`.

    docker run --ti --net=NETWORK_NAME --name server ubuntu:14.04 bash

    docker run --ti --link server --net=NETWORK_NAME --name client ubuntu:14.04 bash

Vous pouvez ainsi redémarrer votre serveur et/ou votre client et cela fonctionnera toujours.

### Anciennes façon de créer des liaisons

Lier à travers des réseaux privés est relativement nouveau pour Docker. Avant, on utilisait une fonction appelée `linking`, qui était très similaire mais fonctionnait en définissant des variables d'environnement à l'intérieur des containers.

---

## Volumes

### Qu'est-ce qu'un volume

Docker propose une fonctionnalité dite de volumes. Les volumes fonctionnent un peu comme des dossiers/fichiers partagés. Ce sont des disques virtuels dans lesquels vous pouvez stocker des données et les partager entre les containers ou entre container et hôte.

Les volumes sont indépendants des images. Aucun contenu des volumes ne sera inclus lorsque vous téléchargez une image, et aucun contenu de volumes ne sera impliqué si vous envoyez une image.

### Partager des données avec l'hôte

Le partage de données entre hôte et container fonctionne un peu comme les dossiers partagés auxquels vous êtes habitués lorsque vous travaillez avec des sytèmes de machines virtuelles tels que VirtualBox. Les données persistent même après l'arrêt du container. On parle de volume persistant.

1. Pour Mac et Windows, connectez-vous à la machine virtuelle Linux au préalable:

       docker-machine ssh

2. Créez un répertoire pour stocker des données

       mkdir /home/docker/example

3. Démarrez un container en lui disant d'utiliser ce répertoire avec l'option `-v`

       docker run -ti -v /home/docker/example:/shared-folder ubuntu bash

   Maintenant, le container a accès à un répertoire `/shared-folder` qui correspond au répertoire `/home/docker/example` de l'hôte.
   Si vous arrêtez votre container, ces données existeront toujours. Vous pouvez faire pareil avec un fichier.

### Partager des données entre container

Il est possible de partager des disques entre containers, qui n'existeront que tant qu'ils sont utilisés. Lorsqu'il n'y a plus aucun container pour utiliser le dossier (situé en mémoire), alors il disparaît. On parle de volume éphémère.

Pour créer un volume éphémère, utilisez l'option `-v` sans spécifier de chemin:

    docker run -ti --name container-a -v /shared-data ubuntu bash

Pour qu'un autre container utilise le même volume, utilisez l'option `--volumes-from`:

    docker run -ti --volumes-from container-a ubuntu bash

Maintenant, les deux containers ont accès au dossier `/shared-data` où ils peuvent se partager des fichiers. Vous pouvez ajouter autant de containers que vous le souhaitez. Le volume existera toujours si vous arrêtez le container qui l'a démarré, mais il disparaîtra lorsque vous aurez arrêté tous les containers qui l'utilisent.

---

## Registres

Les registres gèrent et distribuent les images. Ils permettent d'envoyer, télécharger et rechercher les images que vous souhaitez utiliser. L'entreprise Docker met à disposition un registre publique et gratuit, Docker Store. Vous pouvez également utiliser votre propre registre — de nombreuses entreprises font ce choix pour s'assurer que leurs données restent sécurisées et privées.

### Trouver des images

Vous pouvez rechercher des images directement à partir de la ligne de commande avec

    docker search NAME

Les images ont le flag "official" lorsque Docker, l'organisation qui gère le registre, a vérifié l'image.

Vous pouvez également adopter une approche web en vous rendant sur [https://hub.docker.com/](https://hub.docker.com/). Si vous cliquez sur une image, vous obtenez des informations sur ce à quoi elle sert, la liste les tags disponibles et des indications de quel tag vous devriez utiliser.

### Récupérer une image

Les images sont automatiquement récupérées du registre lorsque vous essayez de lancer une image qui n'existe pas sur votre disque avec `docker run`. Mais vous pouvez également télécharger l'image à l'avance avec `docker pull` si vous prévoyez que vous n'aurez pas de réseau à ce moment là.

    docker pull IMAGE_NAME

### Partager une image

Pour envoyer une image sur le registre Docker, vous devez au préalable vous identifier:

    docker login

Puis utiliser la commande `docker push`

    docker push USERNAME/IMAGE_NAME:TAG

Faites attention à de pas envoyer d'images qui contienne vos mots de passe.

### Utiliser votre propre registre

Un registre est un programme qui se charge de stocker les images et leurs métadonnées. Il écoute sur le port 5000 les instructions comme `push` et `pull`. Il s'occupe également de vérifier les personnes autorisées à se connecter, pourvu que ce soit configuré.

Pour créer votre propre registre, utilisez l'image `registry`, version 2, de Docker.  
L'option `--restart=always` indique que si le container meurt, Docker doit le redémarrer immédiatement:

    docker run -d -p 5000:5000 --restart=always --name registry registry:2

Vous pouvez désormais envoyer des images sur ce registre en spécifiant l'adresse du registre (voir [Structure du nom](#structure-du-nom-dune-image)):

    docker tag ubuntu:14.04 localhost:5000/mycompany:my-ubuntu:v3.2
    docker push localhost:5000/my-company/my-ubuntu:v3.2

Vous devez configurer l'authentification et la sécurité du registre avant de l'exposer à n'importe quel réseau, en particulier Internet. Pour ce faire, rendez-vous sur [la documentation Docker des registres](https://docs.docker.com/registry/).

### Sauvegarder localement

Vous pouvez également enregistrer et charger vos images sans utiliser de registre du tout. Docker propose une paire de commandes:

* `docker save` permet de sauvegarder des images dans une archive compressée. C'est un bon moyen pour les sauvegarder, migrer de version Docker, transférer des images d'un ordinateur à l'autre, les expédier à un client, etc.

      docker save -o my-images.tar.gz debian:sid busybox ubuntu:14.04

* `docker load` permet de récupérer les images d'une archive compressée

      docker load -i my-images.tar.gz

---

## Dockerfiles

Jusqu'à présent, nous avons récupéré et construit des images Docker à la main pour créer des containers. On peut également faire la même chose de manière scriptée, avec les fichiers `Dockerfile`.

### Qu'est ce qu'un Dockerfile

Un fichier Dockerfile est un petit programme conçu pour décrire comment créer une image Docker.  
Par exemple:

    # Nginx
    #
    # VERSION               0.0.1

    FROM      ubuntu
    LABEL Description="This image is used to start the foobar executable" Vendor="ACME Products" Version="1.0"
    RUN apt-get update && apt-get install -y inotify-tools nginx apache2 openssh-server

* La syntaxe ressemble à celle des scripts shells, cela facilite les choses, mais ce n'est pas un script shell.
* Les processus que vous démarrez sur une ligne ne seront pas exécutés sur la ligne suivante, chaque ligne est exécuté dans son propre container qui cesse à la fin de la ligne.
* Les variables d'environnement persistent sur toutes les lignes si vous utilisez la commande `ENV` pour les définir.

### Construire une image à partir d'un Dockerfile

Pour construire une image à partir d'un Dockerfile, vous devez nommer le fichier...  `Dockerfile` (sensible à la casse) puis exécuter la commande `docker build` en passant le nom du répertoire qui contient ce fichier en paramètre.

    docker build -t IMAGE_NAME PATH

Une fois terminé, l'image existera dans votre liste d'images téléchargées, prête à être exécutée avec `docker run`.
Si vous modifiez votre Dockerfile et relancez le build, Docker passera les lignes qui n'ont pas été modifiées depuis le dernier build. Mettez les parties de votre code que vous modifiez le plus à la fin de votre Dockerfile, de cette façon, vous économiserez des instructions.

Chaque étape est mise en cache, ce qui économise énormément de temps. D'un autre côté, si vous voulez télécharger à nouveau la dernière version d'un fichier, vous devrez le faire explicitement.

Vous pouvez en savoir plus sur le sujet, dans la [documentation Docker](https://docs.docker.com/engine/reference/builder/).

<ins>Example</ins>:

    # Contenu du Dockerfile
    FROM busybox
    RUN echo "building simple docker image"
    CMD echo "hello container"

`busybox` est une image extrêmement petite, qui n'a rien d'autre qu'un shell.  
Si vous construisez et exécutez cet image, elle vous affichera "hello container" et s'arrêtera.

    docker build -t hello .
    docker run --rm hello

Notez que nous n'avons pas mis de commande après le nom de l'image, contrairement à ce qu'on a fait dans les exemples précédent. C'est parce que la commande à exécuter est écrite dans l'image (commande `CMD`).

### Syntaxe Dockerfile

#### FROM

La première ligne d'un Dockerfile (hors commentaire) doit spécifier à partir de quelle image commencer, avec l'instruction `FROM`.

      FROM busybox

Vous pouvez mettre plusieurs instructions `FROM` dans votre Dockerfile, cela signifie que plusieurs images sont créées.

#### CMD

`CMD` va exécuter une commande quand l'image sera démarrée.
Deux formes sont acceptées: la forme shell et la forme exec. La forme exec fait que la commande est exécutée directement par Docker, et non par le bash, c'est donc légèrement plus efficace.

* Forme shell

      CMD echo "hello container"

* Forme exec

      CMD ["nano", "myfile"]

Si la personne qui exécute le container tape une commande après le nom de l'image, cette commande sera exécutée à la place de la commande du `CMD`.

#### RUN

`RUN` va exécuter une commande au moment du build, attendre qu'elle se termine et sauvegarder le résultat.

    RUN echo "building simple docker image"

<!-- -->

    RUN unzip install.zip /opt/opt/

Accepte la forme shell et la forme exec.

#### ENTRYPOINT

`ENTRYPOINT` ressemble beaucoup à `CMD` mais ne spécifie que le début de la commande à exécuter lors du démarrage du container, et permet de spécifier la suite lors de l'appel.

    ENTRYPOINT ls

Si votre container fonctionne comme un programme de ligne de commande, vous pouvez utiliser `ENTRYPOINT` pour récupérer les arguments. Accepte la forme shell et la forme exec.

#### ADD

`ADD` permet d'ajouter un fichier dans l'image. Ce peut être

* un fichier local

      ADD run.sh /run.sh

* le contenu d'une archive compressé. Si vous passez un fichier .tar.gz, Docker le décompressera dans l'image.

      ADD project.tar.gz /install/

* un fichier distant

      ADD https://project.example.com/download/1.0/project.rpm /project/

#### MAINTAINER

`MAINTAINER` est une ligne de documentation, elle définit la personne responsable de la création de l'image, à contacter en cas de bug.

    MAINTAINER Firstname Lastname <email@example.com>

#### ENV

`ENV` permet de définir des variables d'environnement — vaut pendant le build et lors de l'exécution du container.

    ENV DB_HOST=db.production.example.com

<!-- -->

    ENV DB_PORT=5432

#### EXPOSE

`EXPOSE` permet d'exposer un port du container. Utiliser `-p` fait la même chose.

    EXPOSE 8080

#### VOLUME

`VOLUME` définit les volumes persistents ou éphèmères à utiliser (selon que vous passiez deux chemins ou un seul).

    # persistent
    VOLUME ["/host/path", "/container/path"]

<!-- -->

    # éphémère
    VOLUME ["/shared-data"]

Vous devriez généralement éviter d'utiliser des volumes persistents avec Dockerfile, car cela signifie qu'il ne marchera que sur votre ordinateur.

#### WORKDIR

`WORKDIR` définit le répertoire dans lequel le container s'exécute, à la fois pour le reste du Dockerfile et pour le container résultant de l'image créée. C'est comme si vous tapiez `cd` au début de chaque expression `RUN`.

    WORKDIR /install/

#### USER

`USER` définit avec quel utilisateur les commandes du container sont exécutées. On peut passer le nom ou l'id de l'utilisateur.

    USER arthur

<!-- -->

    USER 1000

Plus d'options sont disponibles, consulter la [documentation Docker](https://docs.docker.com/engine/reference/builder/#from).

---

## Conseils et mises en garde

* Ne laissez pas les containers récupérer de dépendences lorsqu'ils démarrent, mettez-les directement dans l'image — faute de quoi votre image peut devenir inutilisable si des dépendences sont supprimées du registre. Incluez également les installateurs.
* Ne laissez pas de choses importantes dans des containers stoppés sans nom.
* Nettoyez vos images régulièrement. Sauvegardez celles qui sont importantes.
* Sachez d'où vous téléchargez vos images, qui l'a crée et si vous faites confiance à cette personne ou non.
* En production, utilisez des build canoniques: évitez la tentation de vous connecter, corriger le Dockerfile et sauvegarder l'image sous le même nom.
* Lorsque vous créez des images que vous allez partager publiquement, créez-les à partir de Dockerfiles. De cette façon, vous pouvez retrouver comment l'image a été construite et enquêter en cas de bug.
* Ne laissez jamais de mot de passe dans vos fichiers Docker.

---

## Orchestration

Les systèmes d'orchestration démarrent vos containers, les font tourner et les redémarrent s'ils échouent.  
Ils permettent également aux containers de se trouver l'un l'autre — si un container est redémarré, toutes les machines qui s'y connectent doivent être en mesure de trouver son remplaçant. La découverte de service est une partie importante de tout système d'orchestration Docker.  
Pour finir, ils s'assurent que les containers fonctionnent dans un endroit où les ressources dont ils ont besoin existent pour qu'ils puissent faire leur travail: assez de RAM, de CPU, réseau internet disponible, etc.

Il existe de nombreuses options pour orchester des système de containers Docker.

### Docker Composer

Le plus simple est Docker Composer, pour la coordination d'une seule machine. Il est conçu pour le test, le développement et staging et est généralement utilisé pour les projets qui utilisent plus d'un container mais pas pour les grands systèmes et les systèmes mis à l'échelle automatiquement.

Il démarre tous les containers, volumes, networks, etc, en une seule ligne de commande: `docker composer up`.

Pour commencer: [https:///docs.docker.com/compose](https:///docs.docker.com/compose)

### Kubernetes

Pour les systèmes plus large, il y a beaucoup de choix. Kubernetes apporte quelques fonctionnalités assez communes à tous les sytèmes d'orchestration — mais exprimées partout différemment.

Dans la nomenclature Kubernetes, les containers exécutent des programmes, les pods sont des groupes de containers destinés à fonctionner ensemble (toujours sur le même système), les services rendent les pods détectables et accessibles par d'autres, et le système de labels permet de décrire chaque aspect de votre système.

La commande `kubectl` permet de scripter un grand nombre d'opérations (si ce n'est facile, au moins possible contrairement à d'autres systèmes d'orchestration) dans Kubernetes.

Il fonctionne très bien sur hardware ou sur cloud.  
Pour commencer: [Kubernetes.io](https://kubernetes.io/)

### Amazon EC2 Container Service (ECS)

Utilise un vocabulaire analogue à quelques différences près. Les définitions de tâches définissent un ensemble de containers qui fonctionnent toujours ensemble, les tâches sont des containers en cours d'exécution, les services prennent des tâches et les exposent au réseau tout en s'assurant qu'elles restent éveillées.

Fonctionne sur le cloud Amazon.  
Pour commencer: [https://aws.amazon.com/ecs/](https://aws.amazon.com/ecs/)

{% endraw %}
