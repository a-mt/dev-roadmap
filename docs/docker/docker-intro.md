---
title: Les bases de Docker
category: Workflow, Containers, Docker
---

## À quoi sert Docker

<ins>Environnements Linux</ins>:  
Linux permet de créer des environnements isolés.
Par exemple, on peut avoir sur un même système d'exploitation
Red Hat Linux pour servir une base de données,
Ubuntu Linux pour exécuter un serveur web qui communique avec cette base de données,
et SUSE Linux comme serveur de mise en cache utilisé par le serveur web.
Cela nécessite beaucoup de connaissances sur Linux — cgroups, namespaces, iptables, mount, copy-on-write...
C'est là que Docker intervient.

<ins>Docker</ins>:  
Docker est un logiciel qui permet de créer des environnements Linux. Il se charge de gérer la partie technique: il crée, exécute, surveille et arrête des *containers* — des unités de logiciel autonomes et scellées qui incluent le code, les configurations, les processus, le réseau, les dépendances et assez du système d'exploitation pour exécuter votre code.

<ins>Containers</ins>:  
Chaque container ne peut voir que ce qu'on lui permet explicitement de voir. Par défaut, un container peut pas voir les fichiers de la machine hôte, ni voir les autres containers (et les autres containers ne peuvent pas le voir) — c'est comme si on faisait tourner une machine indépendante.

Mais Docker n'est pas une machine virtuelle, il n'y a qu'un seul système d'exploitation en cours d'exécution. Les containers existent au-dessus du système d'exploitation et partagent la plus grande partie de l'OS, ce qui les rend très petits et très rapides.

<ins>Images</ins>:  
Les containers sont sauvegardés en tant qu'*image*. 
Une image est l’ensemble des fichiers qui seront utilisés pour construire et exécuter un container. Une image est statique, sauvegardée sur le disque, un container est le processus en cours d’execution démarré à partir de l’image

![](https://i.imgur.com/pNZE1MYm.png)

Une image est légère et autonome, elle peut facilement être partagée et utilisée pour reproduire le même environnement et les mêmes données sur différentes machines.
[Docker Hub](https://hub.docker.com/) est un site web qui permet de partager des images publiquement. Si on essaie de démarrer une image qui n'existe pas sur l'ordinateur, Docker la téléchargera automatiquement depuis Docker Hub.

<ins>Pourquoi utiliser Docker</ins>:  
* Docker permet de s'assurer que tout le monde a exactement le même système d'exploitation, la même distribution, les mêmes outils et logiciels — et toujours la même version. Il permet de s'abstraire du casse-tête d'installer quoi que ce soit pour faire tourner du code. 1. tous les développeurs d'une équipe partagent un environnement de développement identique 2. le déploiement est beaucoup plus simple.

* Il permet de s'assurer qu'une application n'a pas plus de permissions qu'elle ne devrait (comme avoir accès à des fichiers par exemple) et inversemment, que d'autres applications n'y ont pas accès sans y être autorisé (comme avoir accès au serveur MySQL). L'environnement est entièrement contrôlé.

* On peut arrêter un container et le relancer à partir de l'image. Toutes les modifications qui n'ont pas été enregistrées dans l'image sont perdues. On peut ainsi facilement installer des outils, tester, et abandonner toutes les modifications — sans crainte qu'il reste des fichiers de configuration par exemple. On peut ainsi isoler les états d'une application, ce qui facilite les tests et le débuggage.

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

Suivre les instructions de la documentation: [Installer Docker sous Mac / Windows](https://docs.docker.com/install/).  
Si votre ordinateur ne répond pas aux exigences listées, utilisez [Docker ToolBox](https://docs.docker.com/toolbox/overview/).  
Si l'installation échoue, c'est peut être que vous avez une ancienne version de HyperKit — ou VirtualBox pour Docker ToolBox. Désinstallez-le et recommencez.

Cela installera tous les produits Docker. Docker Machine vous permettra de gérer votre machine virtuelle Linux pour Docker en ligne de commande. Pour lister les commandes disponibles, tapez

    docker-machine

### Linux

L'installation de Docker sur une machine Linux est légèrement plus facile que l'installation sur Mac ou Windows puisqu'il n'est pas nécessaire de configurer une machine virtuelle.
Suivre les instructions de la documentation: [Installer Docker sous Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu/). Il y a des instructions pour CentOS, Debian, Fedora, Ubuntu et pour installer à partir des sources (menu gauche).  

L'installation sous Linux ressemble à ça:

``` shell
# Install dependencies
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

Si vous ne voulez pas taper `sudo` à chaque fois que vous appelez Docker, ajoutez votre utilisateur au groupe `docker`. Déconnectez-vous puis reconnectez-vous pour que l'ajout du groupe soit pris en compte.

``` shell
sudo groupadd docker
sudo usermod -aG docker $USER
```

[Plus d'infos sur les configurations post-installation](https://docs.docker.com/install/linux/linux-postinstall/)

### Vérifier l'installation

1. Vérifier la version Docker installée:

    ``` shell
    docker version
    ```

2. Afficher les infos sur Docker:

    ``` shell
    docker info
    ```

3. Si Docker n'est pas démarré, le démarrer.  
   Sous Linux:

    ``` shell
    sudo service docker start
    ```

    ou

    ``` shell
    sudo systemclt start docker
    ```

4. Exécuter l'image hello-world

    ``` shell
    docker run hello-world
    ```

---

## Docker Labs

Il est possible de tester Docker CE en ligne, gratuitement, en utilisant [Docker Labs](https://labs.play-with-docker.com/). C'est un excellent moyen d'accéder rapidement, facilement et librement à Docker.