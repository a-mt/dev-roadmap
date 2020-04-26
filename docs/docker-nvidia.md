---
title: NVIDIA Docker
category: Workflow, Containers, Docker
---

## Installer NVIDIA Docker

Pour avoir accès à votre carte graphique NVIDIA à l'intérieur de Docker, le plus simple est d'installer [NVIDIA Docker](https://github.com/NVIDIA/nvidia-docker), qui est un utilitaire permettant de configurer automatiquement les containers pour exploiter les GPU NVIDIA.
Un container lancé avec NVIDIA Docker utilise les drivers NVIDIA de l'hôte sur lequel il tourne, il est donc indispensable que les drivers soient bel et bien installés avant de lancer un container — sinon le container ne pourra pas utiliser la carte graphique.

* Pour installer nvidia-docker:

  ``` bash
  # Ajoute le repository correspondant à votre distribution
  distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
  curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add -
  curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | sudo tee /etc/apt/sources.list.d/nvidia-docker.list

  # Installe nvidia-container-toolkit
  sudo apt-get update && sudo apt-get install -y nvidia-container-toolkit

  # Redémarre Docker
  sudo systemctl daemon-reload
  sudo systemctl restart docker
  ```

## Lancer un container

* Pour lancer un container:  
  Indiquer à nvidia-docker qu'on veut avoir accès à la carte graphique NVIDIA avec l'option `--gpus`.  
  `gpus=all` donne accès à tous les GPUs, `gpus=0,1` donne accès aux GPUs 0 et 1.

* Pour vérifier qu'on a bien accès à la carte graphique:  
  Démarrer un container avec CUDA installé et vérifier qe `nvidia-smi` affiche bien la carte graphique utilisée.

  ``` bash
  distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
  docker run --rm --gpus=all nvidia/opengl:1.0-glvnd-runtime-$distribution nvidia-smi
  ```

## Afficher des fenêtres graphiques

* Si vous voulez afficher des fenêtres à partir d'un container Docker,
  le container doit avoir accès à X.org — le serveur qui s'occupe d'afficher des éléments à l'écran sous Ubuntu.
  Pour ce faire, exécuter (une fois par session) la commande suivante sur la machine hôte:

    ``` bash
    # Permet à root de se connecter au serveur X
    xhost local:root
    ```

* Pour qu'un container puisse ouvrir des fenêtres, il a besoin
  - du volume `/tmp/.X11-unix`, répertoire contenant les sockets du serveur X
  - de la variable d'environnement `DISPLAY`, qui contient l'ID du serveur X actif
  - et si vous voulez utiliser une carte graphique Nvidia, l'option `--gpus` de NVIDIA Docker

  <br>

  ```
  docker run \
    -it \
    --gpus=all \
    --volume /tmp/.X11-unix:/tmp/.X11-unix:rw \
    --env DISPLAY=$DISPLAY \
    nvidia/opengl:1.0-glvnd-runtime-ubuntu18.04 bash
  ```

* Pour vérifier qu'on peut bien afficher des fenêtres:

  ```
  apt update
  apt install -y mesa-utils
  glxinfo -B
  LIBGL_DEBUG=verbose glxgears
  ```
