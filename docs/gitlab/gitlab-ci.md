---
title: GitlabCI
category: Devops
---

# Les bases

GitLab intègre une solution de CI/CD, permettant notamment d'effectuer des tests, builds et deploiements à chaque push correspondant à des critères spécifiés.

* Pour mettre en place du CI/CD il, faut commencer par créer un fichier `.gitlab-ci.yml` à la racine du projet.

  gitlab-ci.yml est le nom par défaut du manifeste Gitlab CI.  
  Pour changer le path du manifeste: Settings > CI/CD > General pipelines > Custom CI config path

* Le manifeste Gitlab spécifie a minima

  1. des **stages**:  
     C'est la liste des étapes qui vont être déclenchées par GitlabCI, dans l'ordre spécifié,  
     et dans lesquelles plusieurs jobs peuvent être ajoutés

        ```
        stages:
        - build
        - test
        - deploy
        ```

     ![](https://i.imgur.com/U3UWl3S.png)

  2. des **jobs**:

        - <ins>nom</ins>  
          Les noms des jobs doivent être uniques et ne doivent pas faire partie des mots réservés.  
          (les mots réservés permettent de définir des configs soit pour l'ensemble des jobs,  
          soit éventuellement être (re-)définis sur des jobs)

          ```
          image
          services
          stages
          types
          before_script
          after_script
          variables
          cache
          ```

       - <ins>script</ins>  
         Chaque job contient la propriété `script`, pour spécifier la ou les commandes à éxecuter — peut être pour lancer des tests, des builds, des déploiements, etc.

       - <ins>image</ins>  
         Généralement, un job spécifie également une `image`, qui désigne l'image à utiliser pour lancer le script.  
         Si l'image n'est pas spécifiée, alors c'est l'image par défaut du runner (la machine qui executera le job) qui sera utilisée

       - <ins>stage</ins>  
         Le `stage` doit également être spécifié.  
         Ce label doit être définit dans les stages, et correspond à une des étapes de la pipeline.

          ``` yml
          pre-commit:
            stage: checks
            image: bryanlarsen/pre-commit
            script:
              - pip install --upgrade pre-commit
              - pre-commit run -v --all-files --show-diff-on-failure
          ```

## variables

* On peut définir des variables d'environnement dans le fichier gitlab-ci, de manière globale ou pour un job en particulier

  ``` diff
  +variables:
  + SYMFONY_ENV: prod

   build:prod:
     script: echo ${SYMFONY_ENV} # prod

   build:dev:
  + variables:
  +   SYMFONY_ENV: dev
     script: echo ${SYMFONY_ENV} # dev
  ```

* Pour que les variables globales ne soient pas disponibles dans un job, mettre `variables` à `{}`

  ``` diff
   variables:
     GLOBAL_VAR: "A global variable"

   job1:
  +  variables: {}
     script:
       - echo This job does not need any variables
  ```

* Gitlab pré-définit un certain nombre de variable d'environnement, dont notamment

  * Des variables d'authentification: CI_REGISTRY, CI_REGISTRY_USER, CI_REGISTRY_PASSWORD
  * Des variables  liées au commit: CI_PROJECT_DIR, CI_COMMIT_BRANCH, CI_COMMIT_SHA
  * Des variables du registry: CI_REGISTRY_IMAGE

    [Liste des varialbes CI/CD prédéfinies](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html)

* On peut également ajouter des variables d'environnement depuis l’interface web de GitLab, ce qui est notamment utile pour stocker des informations sensibles — comme une clé SSH. Les variables peuvent être définies à l'échelle d'une instance Gitlab (pour l'ensemble des projets), ou pour un projet spécifique.

    ![](https://i.imgur.com/ZmGYZND.png)

[Documentation variables CI/CD](https://docs.gitlab.com/ee/ci/variables/)

## GIT_STRATEGY

* Par défaut, un checkout git est effectué par chaque job: les sources du commit en cours sont récupérées à l'intérieur de l'image en cours. On peut désactiver ce comportement en définissant `GIT_STRATEGY: none`

  ``` diff
   # Push the image to the end host
   deploy:
     stage: deploy-cicd
     extends: .deploy
     variables:
  +    GIT_STRATEGY: none
       TAG_LATEST: "$CI_REGISTRY_IMAGE/$CI_PIPELINE:latest"
     script:
       - >
         ssh
         -i $ID_RSA
         -o StrictHostKeyChecking=no
         $SERVER_USER@$SERVER_IP "~/bin/docker_pull.sh $TAG_LATEST -u gitlab-ci-token -p $CI_JOB_TOKEN $CI_REGISTRY && ~/bin/docker_start.sh $TAG_LATEST" &&
         echo "OK"
     rules:
       - if: $CI_PIPELINE == "staging"
         exists:
         - Dockerfile.cicd
     allow_failure: true
  ```

## Templates

* Les templates sont des définitions abstraites de jobs, qui peuvent être héritées par les jobs.  
  Un template se distingue d'un job avec son nom, qui commence par un point.  

  ``` diff
   # -- TEMPLATES
   # Abstract job definitions that may be extended

  +.python:
     image:
       name: python:3.10.2
       pull_policy: if-not-present

   # -- JOBS
   # Code linting
   pre-commit:
     stage: lint
  +  extends: .python
     variables:
       PRE_COMMIT_HOME: $CI_PROJECT_DIR/.cache/pre-commit
     cache:
       key: pre-commit
       policy: pull-push
       paths:
         - ${PRE_COMMIT_HOME}
     script:
       - echo "Running tests for pipeline $CI_PIPELINE"
       - pip install --upgrade pre-commit
       - pre-commit run -v --all-files --show-diff-on-failure
     rules:
       - exists:
         - .pre-commit-config.yml
     allow_failure: false
  ```

* Note: on peut transformer un job en template (ajouter un point au début de son nom) pour le "commenter" — empêcher son exécution sans pour autant le supprimer complètement du manifeste.

## rules, only, except

* rules, only et except permettent de contrôler quand un job sera déclenché: il ne sera exécuté que si les conditions spécifiées sont réunies.
  On peut par exemple, déclencher le job si le commit est executé sur une branche donnée ou si un fichier donné existe.

  ``` yaml
  pre-commit:
    ...
    rules:
      - if: '$CI_COMMIT_REF_NAME == "test-ci" && $CI_COMMIT_TAG'
      - exists:
        - .pre-commit-config.yml

  build_latest:
    ...
    only:
      - master

  build_branch:
    ...
    only:
      - branches
    except:
      - master

  build_tag:
    ...
    only:
      - tags
  ```

## workflow

* workflow permet de contrôler quand la pipeline doit être déclenchée: si le commit ne correspond pas aux règles du workflow, alors la pipeline n'est pas déclenchée — et donc aucun job n'est lancé. On peut également y définir des variables au passage.  

  ``` yaml
  # Only run pipelines for given branches
  workflow:
    rules:
      - if: $CI_COMMIT_BRANCH == "staging"
        variables:
          CI_PIPELINE: 'staging'
      - if: $CI_COMMIT_BRANCH == "prod"
        variables:
          CI_PIPELINE: 'prod'
  ```

## before_script, after_script

* before_script et after_script permettent d'ajouter des actions avant ou après les instructions de `script`.  
  C'est particulièrement utile lorsqu'on se sert des templates / de l'héritage.

  ``` diff
   .deploy:
     image:
       name: alpine:latest
       pull_policy: if-not-present
     tags:
       - deploy  # task picked up by runners allowed to deploy
  +  before_script:
  +    - chmod og= $ID_RSA
  +    - apk update && apk add openssh-client

   deploy:
     stage: deploy-cicd
     extends: .deploy
     variables:
       GIT_STRATEGY: none
       TAG_LATEST: "$CI_REGISTRY_IMAGE/$CI_PIPELINE:latest"
     script:
       ...
   ```

## when

* when permet de restreindre l'execution du job suivant l'état du job précédent

  ``` yaml
  stages:
    - build
    - test
    - report
    - clean
    - deploy

  job:build:
    stage: build
    script:
      - make build

  job:test:
    stage: test
    script:
      - make test
    when: on_success # s'exécutera uniquement si le job `job:build` passe

  job:report:
    stage: report
    script:
      - make report
    when: on_failure # s'exécutera si le job `job:build` ou `job:test` ne passe pas

  job:clean:
    stage: clean
    script:
      - make clean
    when: always # s'exécutera quoi qu'il se passe

  job:deploy:
    stage: deploy
    script:
      - echo "Deploy"
    when: manual # s'executera quand on le déclenche manuellement (via l'UI)
  ```

## allow_failure

* allow_failure permet d'accepter qu'un job échoue sans faire échouer la pipeline — la pipeline passera au stage suivant même si le job échoue.

  ``` yaml
  stage: clean
  script:
    - make clean
  when: always
  allow_failure: true # Ne fera pas échouer la pipeline
  ```

## services

* `services` permet de démarrer d'autres containers dont le job en cours dépend

  ``` diff
   .test:
     image:
       name: "$CI_REGISTRY_IMAGE:latest"
       pull_policy: if-not-present
  +  services:
  +    - name: postgres:14
  +      alias: postgres-test

   # Run unit tests (using git checkout)
   test-unit:
     stage: test
     extends: .test
     variables:
       # Services.postgres variables
       POSTGRES_USER: test
       POSTGRES_PASSWORD: test
       POSTGRES_DB: test
       # App variables
       DB_HOST: postgres-test
       DB_PORT: 5432
       DB_NAME: test
       DB_USER: test
       DB_PASS: test
       TAG_VERSION: "$CI_REGISTRY_IMAGE:$CI_IMAGE_VERSION"
     script:
       - echo "Image $TAG_VERSION ($IMAGE_VERSION)"
       - cd www
       - python manage.py test
     interruptible: true
     allow_failure: false
  ```

---

# Activer GitlabCI

Sur GitLab,

- Activer le menu CI/CD
  * Settings > General > Visibility, project features, permissions:  
  * Cocher repository > CI/CD
  * Cocher container registry
  * Sauvegarder les modifications

- Modifier les configurations par défaut

  * Settings > CI/CD
  * Décocher default to Auto DevOps pipeline
  * Sauvegarder les modifications
  * Décocher shared runners > enable shared runners for this project

- Définir la politique de supression des anciennes images Docker
  * Settings > Packages & registries > Clean up image images
  * Enable
  * Run cleanup: every week
  * Remove these tags
    - Older than: 7 days
    - Remove tags matching: .*  
      Note: le tag `latest` est toujours gardé

# Installer un Runner local

Un *runner* est une machine à qui est envoyée les jobs Gitlab, et qui exécutera les scripts.  
Pour installer un runner sur une VM, suivre les instructions gut Gitlab: Settings > CI/CD > show runner installation instructions.  
Pour utiliser sa propre machine locale comme runner:

## Installer gitlab-runner

* Le plus simple est de lancer gitlab-runner dans un container:

  ``` bash
  mkdir myproject-runner
  cd myproject-runner

  docker run -d --name myproject-runner --restart unless-stopped \
      -v /var/run/docker.sock:/var/run/docker.sock \
      -v /etc/localtime:/etc/localtime:ro \
      -v "$(pwd)/docker_volumes/config":/etc/gitlab-runner \
      gitlab/gitlab-runner:latest
  ```

* Pour l'arrêter:

  ``` bash
  docker stop myproject-runner
  ```

  Pour le relancer:

  ``` bash
  docker start myproject-runner
  ```

## Enregister le runner auprès de Gitlab

* Aller sur Gitlab: Settings > CI/CD > Project runners  
  Dans "Set up a project runner for a project": copier l' URL et le registration token

* Démarrer le runner local

  ``` bash
  docker start myproject-runner
  ```

* Enregistrer le runner auprès de Gitlab

  ``` bash
  # cd myproject-runner
  docker run --rm -it -v "$(pwd)"/docker_volumes/config:/etc/gitlab-runner gitlab/gitlab-runner register
  ```

  Une série de questions vont être posées:

  - **Enter the GitLab instance URL**:  
    Entrer l'URL précédemment copiée sur GitLab

  - **Enter the registration token**:  
    Entrer le token précédemment copié sur GitLab

  - **Enter a description for the runner**:  
    Un nom qui aidera à identifier le runner sur Gitlab — par exemple `YOUR-FIRSTNAME MyProject-Back`

  - **Enter tags for the runner**:  
    Liste des tags que le runner accepte (ex `docker,deploy`).  
    Correspond aux tags qu'on retrouve dans le manifeste gitlab

    ``` diff
     .deploy:
       image:
         name: alpine:latest
         pull_policy: if-not-present
    +  tags:
    +    - deploy  # task picked up by runners allowed to deploy
       before_script:
         - chmod og= $ID_RSA
         - apk update && apk add openssh-client
    ```

  - **Enter optional maintenance note for the runner**:  
    Laisser vide

  - **Enter an executor**:  
    `docker`

  - **Enter the default Docker image**:  
    `alpine:latest` — on peut le changer après coup dans les configs

* Vérifier que le runner est détecté sur GitLab:  
  GitLab > Settings > CI/CD

  Éventuellement, l'éditer pour accepter les jobs non taggés:  
  Edit > cocher "Can run untagged jobs"

* De retour dans le terminal, arrêter le runner local

  ``` bash
  docker stop myproject-runner
  ```

* Éditer le fichier de configuration pour éditer les configs suivantes: `privileged`, `volumes`, `allowed_pull_policies`  

  ``` bash
  sudo vim docker_volumes/config/config.toml
  ```
  ``` diff
  concurrent = 1
  check_interval = 0
  shutdown_timeout = 0

  [session_server]
    session_timeout = 1800

  [[runners]]
    name = "John MyProject-Back"
    url = "https://gitlab.ascan.io/"
    id = ...
    token = ...
    token_obtained_at = ...
    token_expires_at = ...
    executor = "docker"
    [runners.docker]
      tls_verify = false
      image = "alpine:latest"
  +   privileged = true
      disable_entrypoint_overwrite = false
      oom_kill_disable = false
      disable_cache = false
  +   volumes = ["/var/run/docker.sock:/var/run/docker.sock", "/cache"]
  +   allowed_pull_policies = ["always", "if-not-present"]
      shm_size = 0

  [[runners]]
    name = "John MyProject-Front"
    url = "https://gitlab.ascan.io/"
    id = ...
    token = ...
    token_obtained_at = ...
    token_expires_at = ...
    executor = "docker"
    [runners.cache]
      MaxUploadedArchiveSize = 0
    [runners.docker]
      tls_verify = false
      image = "node:18-alpine"
  +   privileged = true
      disable_entrypoint_overwrite = false
      oom_kill_disable = false
      disable_cache = false
  +   volumes = ["/var/run/docker.sock:/var/run/docker.sock", "/cache"]
  +   allowed_pull_policies = ["always", "if-not-present"]    
      shm_size = 0
  ```

* Une fois installé et enregistré, il suffit de démarrer le runner pour que GitLab puisse exécuter des jobs sur cette machine:

  ``` bash
  docker start myproject-runner
  ```

* Et une fois la pipeline finie, on peut simplement arrêter le runner:

  ``` bash
  docker stop myproject-runner
  ```

# Lancer une pipeline

* Aller sur Gitlab et s'assurer qu'il y a au moins un runner disponible (icône verte).  
  S'il n'y en a pas: configurer un runner avant de revenir à cette étape

  ![](https://i.imgur.com/zEUK2Xx.png)

* Pusher sur Gitlab déclenchera la pipeline. Notons que si un `workflow` est spécifié dans le fichier .gitlab-ci.yml, alors la pipeline ne sera déclenchée que si le commit / la branche correspondent aux règles indiquées

* Vérifier que la pipeline s'exécute correctement du début à la fin:  
  CI/CD > Pipelines.  
  Cliquer sur l’id de la pipeline (ex: #12839 dans l'exemple ci-dessous) pour voir la liste des différents jobs et leurs statuts respectifs. Cliquer sur un job pour consulter ses logs.

  ![](https://i.imgur.com/FViSK4J.png)

---

# Tester SSH + registry

## Configurer les variables CI/CD

- Settings > CICD > Variables
    - Ajouter un fichier contenant <ins>la clé privée RSA</ins>: Add variable
        - Key: `ID_RSA`
        - Value: coller la clé privée RSA + un retour à la ligne à la fin
        - Type: File
        - Environment Scope: All (default)
        - Protect variable: Décoché
        - Mask variable: Décoché (on verra le path du fichier mais pas son contenu)

    - Ajouter une variable contenant <ins>l’adresse IP du serveur</ins>: Add variable
        - Key: `SERVER_IP`
        - Value: coller l’adresse IP du serveur
        - Type: Variable
        - Environment scope: All (default)
        - Protect variable: Décoché
        - Mask variable: ☑ Coché

    - Ajouter une variable contenant <ins>le nom d’utilisateur</ins>: Add variable
        - Key: `SERVER_USER`
        - Value: deployer
        - Type: Variable
        - Environment scope: All (default)
        - Protect variable: Décoché
        - Mask variable: ☑ Coché

    - Pour le front: ajouter un fichier contenant le fichier robots.txt
        - Key: `ROBOTS`
        - Value:

            ```bash
            # http://www.robotstxt.org
            User-agent: *
            Disallow: /
            ```

        - Type: File
        - Environment scope: All (default)
        - Protect variable: Décoché
        - Mask variable: Décoché

### Créer le fichier .gitlab-ci.yml

``` bash
stages:
  - test-ssh
  - test-registry

ssh:
  stage: test-ssh
  image:
    name: alpine:latest
    pull_policy: if-not-present
  variables:
    GIT_STRATEGY: none
  script:
    - chmod og= $ID_RSA
    - apk update && apk add openssh-client
    - >
      ssh
      -i $ID_RSA
      -o StrictHostKeyChecking=no
      $SERVER_USER@$SERVER_IP '
      pwd &&
      whoami &&
      docker --version &&
      echo "OK"
      '

docker:
  stage: test-registry
  image:
    name: docker:latest
    pull_policy: if-not-present
  tags:
    - docker  # task picked up by runners allowed to run Docker in Docker (privileged)
  services:
    - docker:dind
  variables:
    GIT_STRATEGY: none
  script:
    - >
      docker login -u gitlab-ci-token -p $CI_JOB_TOKEN $CI_REGISTRY &&
      echo "OK" &&
      docker logout
```
