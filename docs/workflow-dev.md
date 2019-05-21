---
title: Workflow Dev
category: Other
---

## Créer un projet

Différents projets utilisent différents langages et différentes versions.  
Pour éviter des conflits entre différents projets, il est préférable de "containeriser" chaque projet

### Créer un workspace sur c9

Créer un nouveau workspace sur [c9.io](https://c9.io/)

### Créer un environnement Python

Pour créer un environnement Python avec une version spécifique, par exemple 2.7.14:

* Option 1: [Installer Miniconda](https://conda.io/miniconda.html)

  ```
  conda search --full-name python
  conda create -n py2.7.14 python=2.7.14 anaconda
  conda install -n py2.7.14 pip
  source activate py2.7.14
  python --version
  ```

* Option 2: [Installer pyenv](https://github.com/pyenv/pyenv)

  ```
  pyenv install --list
  pyenv install 2.7.14
  pyenv local 2.7.14
  python --version
  ```

### Créer un environnement Node

[Installer nvm](https://github.com/nvm-sh/nvm)

```
nvm ls
nvm install 11
nvm use 11
node --version
```

### Créer un container Docker

* Vérifier sur [Docker Hub](https://hub.docker.com/) s'il  existe déjà une image avec votre stack et les outils que vous voulez.  
  Si c'est le cas, la récupérer

  ```
  docker pull IMAGE_NAME
  ```

  Si ce n'est pas le cas

  * Créer un `Dockerfile`.

    ```
    FROM ubuntu:18.04
    RUN apt-get update

    RUN apt-get install -y curl git wget vim locate
    CMD ["/bin/bash"]
    ```

  * Construire l'image

    ```
    mkdir /tmp/empty
    docker build --file Dockerfile -t MYIMAGE /tmp/empty
    ```

* Créer un fichier `docker-compose.yml`  
  Utiliser un volume pour lier votre répertoire local à un répertoire à l'intérieur du container

  ```
  version: '2'

  services:
    myproject:
      # build: ./etc/docker
      image: MYIMAGE
      tty: true
      volumes:
        - .:/home/files
  ```

* Lancer le container

  ```
  docker-compose up -d
  ```

* Accéder au shell:

  ```
  docker-compose exec myproject bash
  ```

* Une fois fini: arrêter le container

  ```
  docker-compose down
  ```

[Docker](docker.md)

---

## Versionner un projet

* Créer un nouveau projet

  ```
  git init
  git status
  git add .
  git commit -m "initial commit"
  ```

  Pour sauvegarder les sources sur un dépot distant, créer un repo (sur Github par exemple) puis:

  ```
  git remote add origin <url>
  git push origin master
  ```

* Ou récupérer en local un dépot distant:

  ```
  git clone <url>
  ```

[Git](git.md)

---

## Déployer

### Sur Heroku

Pour un site dynamique

```
heroku login
heroku create
git push heroku master
```

[Heroku](heroku.md)

### Sur Github Pages

Pour un site statique

* Créer le fichier `_config.yml` à la racine du projet

  ```
  title: My Project

  markdown: kramdown
  kramdown:
    input: GFM
    hard_wrap: false
  ```

* Ajouter `_site` à `.gitignore`

  ```
  echo _site >> .gitignore
  ```

* Prévisualiser le site en local

  ```
  jekyll serve
  ```

  Par défaut, `jekyll` est lancé sur le port 4000 (http://localhost:4000).  
  On peut utiliser un port différent:

  ```
  jekyll serve -p 80
  ```

* Commiter le tout sur Github

  ```
  git add .gitignore _config.yml
  git commit -m "Add Jekyll"
  git push origin master
  ```

[Github Pages](github-pages.md)