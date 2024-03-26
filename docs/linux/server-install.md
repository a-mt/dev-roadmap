---
title: Installer un serveur
category: Linux
---

# Bases

- Vérifier ce qu’on a

    ``` bash
    cat /etc/os-release
    history
    whoami
    pwd
    echo $BASH_VERSION
    ```

- Installer les indispensables

    ``` bash
    which git vim curl wget
    apt update
    apt install vim git curl wget
    ```

- Définir LANG en UTF8

    ``` bash
    cat /etc/default/locale
    locale -a
    echo 'LANG="C.UTF-8"' > /etc/default/locale
    ```

    Vérifier les locales qu’on utilise et générer leurs fichiers

    ``` bash
    locale

    cat /etc/locale.gen | grep -v '^# '
    cat -n /etc/locale.gen | grep fr
    vim /etc/locale.gen
    locale-gen
    ```

- Définir la timezone

    ``` bash
    date
    timedatectl

    timedatectl list-timezones | grep Europe/Paris
    timedatectl set-timezone Europe/Paris
    date
    ```

- Définir les variables d’environnement globales

    ``` bash
    vim /etc/environment
    COMPOSE_PROJECT_NAME=myproject_staging
    ```

- Créer /var/www

    ``` bash
    mkdir /var/www
    ```

---

# Docker

Documentation: [Install Docker](https://docs.docker.com/engine/install/debian/)

## Ajouter le repo apt

- Ajouter le repository de Docker

    ``` bash
    apt-get install \
        ca-certificates \
        curl \
        gnupg \
        lsb-release

    mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
      $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
    ```

    ``` bash
    cat /etc/apt/sources.list.d/docker.list 
    # deb [arch=amd64 signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian buster stable
    ```

- Vérifier que le package qu’on va installer vient du repo download.docker.com et non de Debian

    ``` bash
    apt-get update
    apt-cache policy docker-ce | head
    ```

## Installer Docker

- Installer le package Docker

    ``` bash
    apt-get install docker-ce
    ```

    Vérifier s’il y a des erreurs (pas de soucis si on retombe sur le storage-driver vfs parce que les autres n’existent pas):

    ``` bash
    systemctl start docker
    systemctl status docker
    ```

    En cas d’erreur:

    ``` bash
    systemctl stop docker
    dockerd --debug
    dockerd --storage-driver=vfs --debug
    journalctl -xe
    ```

- Vérifier qu’on peut lancer un container

    ``` bash
    docker version
    docker run --rm hello-world
    ```

    En cas d’erreur comme suit, contacter un sysadmin pour activer l’option nesting sur la VM (puis redémarrer quand c’est fait)

    ```
    docker: Error response from daemon: failed to create shim task: OCI runtime create failed: runc create failed: unable to start container process: error during container init: error mounting "proc" to rootfs at "/proc": mount proc:/proc (via /proc/self/fd/6), flags: 0xe: permission denied: unknown.

    ```

    > Si jamais la VM de prod fini par être non-privilégiée il faudra juste activer l'option "keyctl" en plus de nesting sur la VM. Sur une privilégiée, "nesting" suffit.

- Démarrer Docker au boot

    ``` bash
    systemctl enable docker
    ```

- Si nécessaire, pour désinstaller Docker:
    1. Stopper Docker

        ``` bash
        systemctl stop docker
        ```

    2. Tout supprimer

        ``` bash
        apt-get purge -y docker-engine docker docker.io docker-ce docker-ce-cli
        apt-get autoremove -y --purge docker-engine docker docker.io docker

        rm -rf /var/lib/docker /etc/docker
        rm /etc/apparmor.d/docker
        groupdel docker
        rm -rf /var/run/docker.sock
        ```

    3. Vérifier qu’il ne reste plus rien

        ``` bash
        dpkg -l | grep -i docker
        apt list --installed | grep docker
        ```

## Installer Docker Compose

- Installer le plugin docker compose

    ``` bash
    apt-get install docker-compose-plugin
    docker compose version
    ```

- Créer un alias docker-compose pour tous les utilisateurs

    ``` bash
    vim /usr/local/bin/docker-compose

    #!/bin/bash
    #
    # aliasing docker compose as docker-compose for every user
    # with compatibility to respect previous container naming convention (with underscore delimiter _ over -)
    #
    docker compose --compatibility "$@"
    ```

    ``` bash
    chmod a+x /usr/local/bin/docker-compose
    docker-compose version
    ```

## Configurer logrotate

Documentation: [Configure logging drivers](https://docs.docker.com/config/containers/logging/configure/)

Par défaut, les logs des containers sont écrits dans /var/lib/docker/containers/[container-id]/[container-id]-json.log sans rotation. Pour activer la rotation des logs:

- Définir les options du log-driver

    ``` bash
    vim /etc/docker/daemon.json

    {
      "log-driver": "json-file",
      "log-opts": {
        "max-size": "10m",
        "max-file": "3"
      }
    }
    ```

- Redémarrer Docker

    ``` bash
    systemctl daemon-reload
    systemctl restart docker
    docker info
    ```

---

# Utilisateur

## Créer un utilisateur pour le CI/CD

- Créer un utilisateur

    ```bash
    $ useradd -D
    $ useradd --uid 1000 \
        --password '' \
        -s /bin/bash \
      -m \
        deployer
    ```

- L’ajouter dans le groupe Docker

    ```bash
    $ usermod -aG docker deployer
    ```

- Mettre à jour le format du prompt

    ```bash
    $ vim /home/deployer/.bashrc
      58  color_prompt=
      59  
      60  if [ "$color_prompt" = yes ]; then
    ```

- Se logger en tant de deployer

    ```bash
    $ su - deployer
    ```

- Créer un répertoire qui contiendra les scripts utilisés lors du CICD

    ```bash
    $ mkdir ~/bin
    ```

## Autoriser les connexions via SSH

- Créer une paire de clés RSA

    ```bash
    $ ssh-keygen -t rsa -b 4096 -C "GitLab Deployer MyProject"
    ```

- Copier la clé publique

    ```bash
    $ cat ~/.ssh/id_rsa.pub
    ```

- Ajouter la clé sur le SKA

- Vérifier que la clé SSH a été ajoutée à la VM

    ```bash
    $ ls /var/local/keys-sync/
    ```

## Vérifier la connexion SSH

- Copier la clé privée de deployer

    ```bash
    $ cat ~/.ssh/id_rsa
    ```

- Coller la clé dans un fichier `ID_RSA_MY_PROJECT` vérifier qu’il est possible de se SSH avec cette clé

    ```bash
    $ ID_RSA="$(pwd)/ID_RSA_MY_PROJECT"
    $ chmod og= "$ID_RSA"
    $ ssh -i "$ID_RSA" deployer@194.60.65.190 "pwd"
    ```

- Si c'est tout bon: supprimer la clé

    ``` bash
    $ rm $ID_RSA
    ```

---

# Sources

## Utilitaires

- Copier les fichiers .sh vers le serveur

    ```bash
    $ cd my-project-back/cicd/skel
    $ scp *.sh 194.60.65.190:/home/deployer/bin
    ```

- Sur le serveur, leur ajouter le droit d’exécution

    ```bash
    $ cd /home/deployer/bin
    $ chmod 755 *.sh
    $ chmod u+s *.sh
    ```

## Répertoires de logs

- Créer un répertoire pour les logs

    ```bash
    $ mkdir /var/log/deployer
    $ chown -R deployer: /var/log/deployer
    $ ls -ld /var/log/deployer
    drwxr-xr-x 3 deployer deployer 3 mars  28 14:33 /var/log/deployer
    ```

- Configurer syslog pour sauvegarder les logs de crontab dans un fichier séparé

    ```bash
    $ vim /etc/rsyslog.conf
    local0.* /var/log/crontab.log
    ```

    ```bash
    $ systemctl restart rsyslog
    ```

- Configurer logrotate

    ```python
    $ vim /etc/logrotate.d/crontab 
    /var/log/crontab.log {
        rotate 12
        weekly
        compress
        missingok
    }

    $ chmod 644 /etc/logrotate.d/crontab
    ```

## Déploiement

- Créer des répertoires pour le déploiement

    ```bash
    $ su - deployer
    $ cd
    $ mkdir front
    $ mkdir back
    $ echo 'Hello world' > front/index.html
    ```

- Configurer un runner
- Mettre à jour .gitlab-ci.yml
- Lancer une pipeline
- [Créer des certificats SSL](ssl.md#signé-par-letsencrypt-avec-certbot)
