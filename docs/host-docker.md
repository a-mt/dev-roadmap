---
title: Installer Docker
category: Hosting
---

Le serveur est configuré, il est temps d'[installer Docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04)

* Installer les dépendances de Docker

  ```
  sudo apt install apt-transport-https ca-certificates curl software-properties-common
  ```

* Ajouter le repository de Docker à APT

  ```
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
  sudo apt-get update
  ```

* Installer Docker  
  Cela installe Docker, démarre le daemon et l'ajoute à la liste des programmes lancés au démarrage

  ```
  sudo apt install docker-ce
  ```

* Vérifier que Docker tourne

  ```
  sudo systemctl status docker
  ```

* Ajouter l'utilisateur que vous êtes en train d'utiliser au groupe `docker`.  
  De cette manière, vous n'aurez pas à taper `sudo` à chaque fois.

  ```
  sudo usermod -aG docker ${USER}
  ```

* Vérifier que vous pouvez utiliser et télécharger des images à partir de Docker Hub

  ```
  docker run hello-world
  ```

---

Si vous voulez utiliser Docker Compose, il faut l'installer également.

* Installer Docker Compose

  ```
  sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
  ```

* Vérifier qu'il a bien été installé

  ```
  docker-compose --version
  ```