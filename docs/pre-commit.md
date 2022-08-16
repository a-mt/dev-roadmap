---
title: Pre commit
category: Webenv
---

## Qu'est-ce que c'est

* Les hook Git permettent d'executer des scripts au moment de la création d'un commit. Ils peuvent par exemple normaliser les espaces en fin de ligne, vérifier les packages importés non utilisés, etc.

  * Si, au moment de commiter, des modifications sont effectuées par un script, alors le commit n'est pas créé: il faut ajouter ces modifications (git add) avant de ré-exécuter git commit.

  * Si des erreurs sont détectées par un script, alors il faut rectifier le code, ajouter ces modifications, puis ré-exécuter git commit.

* Pre-commit est un package Python qui permet d'installer des hooks Git à partir d'un fichier de configuration yaml, ce qui permet de facilement partager ces configs entre les développeurs d'un projet.

## Installer pre-commit

* Avant de pouvoir ajouter des hooks Git avec pre-commit, il faut installer pre-commit:

  * Avec la version Python en cours:
  
    ``` bash
    # Installer pre-commit
    sudo pip3 install pre-commit
    ```
  
  * Avec une version Python spécifique:
  
    ``` bash
    # Installer python 3.10
    sudo add-apt-repository ppa:deadsnakes/ppa
    sudo apt install python3.10 python3.10-dev
    python3.10 -m ensurepip --default-pip --user
  
    # Installer pre-commit sous python3.10
    python3.10 -m pip install pre_commit
    ```

## Créer un fichier de configuration

* Le fichier de configuration pre-commit doit  
  * se situer à la racine du projet (où se situe le répertoire .git)
  * et être appelé `.pre-commit-config.yaml`.

<!-- -->

* Quelques exemples:
  - Pour un projet Django: [.pre-commit-config.yaml](assets/django-pre-commit-config.yaml)
  - Pour un projet Ember: [.pre-commit-config.yaml](assets/ember-pre-commit-config.yaml)

<!-- -->

*  [Documentation sur le format du fichier](https://pre-commit.com/#plugins).

## Installer les hooks

* Pour ajouter les hooks Git, décrits par le fichier .pre-commit-config.yaml, avec

  * la version Python en cours:

    ``` bash
    # Retirer les hooks existants
    pre-commit uninstall

    # Ajouter les hooks git
    pre-commit install
    ```

  * une version Python spécifique:

    ``` bash
    python3.10 -m pre_commit uninstall
    python3.10 -m pre_commit install
    ```

## Utiles

* Après un rebase ou la résolution d'un conflit, il faut lancer pre-commit manuellement:

  ``` bash
  python3.10 -m pre_commit run --all-files
  ```

* Pour bypass les vérifications des hooks Git:

  ``` bash
  # Commiter sans exécuter les hooks
  git commit --amend -m "nouveau message" --no-verify

  # Cherry-pick sans exécuter le hook nommé "migrations-check"
  SKIP=migrations-check git cherry-pick --continue
  ```

## Troubleshooting

### SyntaxError: Unexpected reserved word

- En cas d’erreur “SyntaxError: Unexpected reserved word” sur await

  ```
  /.cache/pre-commit/repoi385p90x/node_env-system/lib/node_modules/prettier/third-party.js:9863
        for await (const place of this.config.searchPlaces) {
            ^^^^^

  SyntaxError: Unexpected reserved word
  ```

- Vérifier la version node en cours (doit être au moins égale à 10)

  ```
  node --version
  ```

  Pour changer de version:

  ```
  sudo npm install -g n
  sudo n stable
  ```

- Vérifier la version node utilisée par pre-commit

  ```
  # path indiqué dans le message d'erreur
  cd ~/.cache/pre-commit/repoi385p90x/node_env-system/bin

  # node utilisé par pre-commit
  ls -l
  ./node --version
  ```

  Pour remplacer la version node utilisée par pre-commit:

  ```
  which node
  rm node
  cp /usr/local/bin/node node
  ls -l
  ```
