---
title: Lancer et arrêter des containers
category: Workflow, Containers, Docker
---
{% raw %}

## Lister les images

Un container est lancé à partir d'une image.  
Si on essaie de lancer un container à partir d'une image qui n'existe pas sur le disque, Docker tentera de la télécharger à partir de [Docker Hub](https://hub.docker.com/).

Lister les images téléchargées sur le disque:

    docker images

Cette commande est un alias de

    docker image ls

Additionner la taille de chaque container ne permet pas de connaître la quantité totale d'espace disque utilisée par Docker, puisque ces images partagent une grande partie de leurs données.

---

## Lancer un container

`docker run` crée un nouveau container à partir d'une image.

    docker run [options] IMAGE_NAME COMMAND
  
Lorsqu'on crée un container à partir d'une image, cela ne change pas l'image: si on crée un fichier, ce fichier n'existe que dans le container; et si on démarre un autre container à partir de la même image, il ne récupérera pas le fichier.

<ins>Exemple</ins>:

    docker run -ti ubuntu:latest bash

* `-ti`  
  Signifie "terminal interractif".    
  Permet d'executer le shell, d'avoir la complétion par tabulation et que les choses soient formattées correctement.

* `ubuntu:latest`  
  `ubuntu` est le nom de l'image et `latest` est la version de cette image qu'on veut exécuter.  
  Si on ne spécifie pas la version, `latest` est la valeur par défaut.

* `bash`  
  Est la commande qu'on veut exécuter sur cette image.  
  Lorsque cette commande est terminée/stoppée, le container s'arrête.

### Lancer en mode détaché

Dans l'exemple précédent, on a lancé un terminal interactif en premier plan. On peut également créer des containers détachés, qui tournent en arrière plan. Pour ce faire, utiliser l'option `-d`

    docker run -d -ti ubuntu bash

### Lancer plusieurs commandes

Pour lancer plusieurs commandes Bash, on peut utiliser `bash -c`:

    docker run ubuntu bash -c "sleep 3; echo all done"

### Nommer le container

C'est généralement une bonne idée de nommer un container avec `--name`.  
Si le container n'est pas nommé, Docker va auto-générer un nom.

    docker run --name example -d -ti ubutu 

### Définir des variables d'environnement

On peut définir des variables d'environnement au moment de lancer le container.

* Soit en utilisant l'option `-e`

  ```
  docker run -e VAR1=value myimage
  ```

* Soit en chargeant un fichier

  ``` shell
  host$ cat env.list
  # This is a comment
  VAR1=value1
  VAR2=value2
  USER=denis

  host$ docker run --env-file env.list ubuntu bash
  /# env | grep VAR
  VAR1=value1
  VAR2=value2
  ```

---

## Lister les containers

### Containers en cours d'exécution

Pour lister tous les containers en cours d'exécution, lancer (dans un autre terminal)

    docker ps

Cette commande est un alias de:

    docker container ls

``` shell
$ docker ps
CONTAINER ID    IMAGE            COMMAND   CREATED           STATUS           PORTS    NAMES
a8c267869b0b    ubuntu:latest    "bash"    53 seconds ago    Up 52 seconds             elegant_noether
```

### Le dernier container

Pour ne lister que le dernier container:

    docker ps -l

### Tous les containers

Le container est en cours d'exécution tant qu'il fait tourner des processus.  
Lorsqu'il ne fait plus tourner de processus, le container est stoppé. Mais il n'est pas supprimé.  
Pour lister les containers stopppés en plus des containers en cours d'exécution:

    docker ps -a

### Formatter le résultat

On peut formatter la sortie de `docker ps` avec l'option `--format`.  
Par exemple, pour afficher le résultat verticalement:

    export FORMAT="\nID\t{{.ID}}\nIMAGE\t{{.Image}}\nCOMMAND\t{{.Command}}\nCREATED\t{{.RunningFor}}\nSTATUS\t{{.Status}}\nPORTS\t{{.Ports}}\nNAMES\t{{.Names}}\n"
    docker ps --format $FORMAT

---

## Sauvegarder un container stoppé

On peut sauvegarder les fichiers et les logiciels installés dans un container en créant une image à partir du container (une fois stoppé). `docker run` prend une image et en fait un container, `docker commit` prend un container et en fait une image. Cela n'écrase pas l'image à partir de laquelle le container a été fabriqué et ne supprime pas le container.

    docker commit CONTAINER_ID

Pour créer une image avec un nom différent de celui du container:

    docker commit CONTAINER_ID IMAGE_NAME

Ainsi pour créer une image personnalisée, il suffit de lancer une image de base (comme `ubuntu`), installer les outils/logiciels que vous voulez en utilisant le shell interractif, puis de sauvegarder le container en image.

``` shell
docker run -it ubuntu bash
> apt-get update
> apt-get install netcat
> exit
docker ps -l
docker commit 4e3b351f752d my-image
```

### Nom d'une image

La structure complète du nom pour une image est comme suit:

![](https://i.imgur.com/tBUQO6b.png)

Vous pouvez omettre les parties dont vous n'avez pas besoin.  
Ainsi, pour spécifier un tag, vous pouvez faire

    docker commit c58877f1653b my-image:v2.1

Ou, si vous avez l'intention de partager votre image, spécifier votre nom en suivant le format `organization/image-name`

### Tagger une image

* Pour créer un alias d'une image donnée:

  ```
  docker image tag 692fd3 myapp:latest
  ```

  Le tag doit être utilisé pour identifier la version du système d'exploitation ou de l'application que vous avez construit.  
  Vous pouvez utiliser n'importe quel nom/version localement, mais si vous voulez pousser une image vers un dépot public, vous allez devoir utiliser une convention de nommage — `myusername/myapp:version`

* Pour renommer une image, créer un alias puis supprimer l'ancienne image

  ```
  $ docker tag <old_name> <new_name>
  $ docker rmi <old_name>
  ```

---

## Execution

### Passer de l'arrière à l'avant-plan

Si un container est en arrière-plan, on peut le faire passer en avant-plan avec `docker attach`

    docker attach CONTAINER_ID

Si vous ne l'avez pas nommé vous-même, utilisez `docker ps -a` pour trouver son nom.  
Pour passer en arrière plan un container en premier plan: <kbd>Ctrl</kbd> + <kbd>p</kbd>, <kbd>Ctrl</kbd> + <kbd>q</kbd>

### Ajouter des processus

Si vous avez démarré un container et que vous n'avez pas accès au prompt de ce container, vous pouvez démarrer un processus à l'intérieur du container, en plus des processus en cours d'exécution, avec `docker exec`

``` shell
# start a new bash in the container
docker exec -ti bash
```

Lorsque le processus d'origine s'arrête (PID 1 du container), tout processus ajouté avec `exec` s'arrête également.  
On ne peut pas ajouter de ports, de volumes, etc, à un container en cours d'exécution.

### stdout du container

Docker enregistre toutes les sorties du container pendant aussi longtemps que le container existe.  
`docker logs` permet de voir ces messages

    docker logs CONTAINER_ID

Faites attention à ne pas laisser les logs Docker devenir trop gros.  
Cela peut ralentir Docker, et aller jusqu'au point où votre système entier ne répond plus!

---

## Cleanup

### Stopper un container

On peut stopper un container en cours d'exécution avec

    docker stop CONTAINER_ID

Ou, pour forcer l'arrêt d'un container sans laisser l'opportunité aux processus de s'arrêter normalement:

    docker kill CONTAINER_ID

### Redémarrer un container

On peut redémarrer un container stoppé avec

    docker start CONTAINER_ID

### Supprimer un container

Pour supprimer un container stoppé:

    docker rm CONTAINER_ID

Notez que vous pouvez démarrer un container qui sera automatiquement supprimé lorsqu'il sera stoppé grâce à l'option `--rm`. Attention à ne l'utiliser que si vous êtes sûr de ne pas vouloir conserver les données de ce container.

    docker run --rm IMAGE_ID

### Supprimer une image

* Pour supprimer une image:

      docker rmi IMAGE_ID

  Cette commande est un alias de

      docker image rm IMAGE_ID

  Une erreur sera levée si cette image est utilisée par un container.

* Pour supprimer toutes les images ni taggées ni référencées par un container (*dangling images*):

      docker image prune

  Pour supprimer toutes les images qui n'ont aucun container associé (*unused images*):

      docker image prune -a

  On peut également utiliser les filtres.  
  Par exemple pour supprimer les images qui n'ont pas été utilisées depuis plus de 24h:

      docker image prune -a --filter "until=24h"

### System prune

`system prune` supprime tous les containers stoppés, tous les réseaux qui ne sont pas utilisés par au moins un container en cours d'exécution, toutes les *dangling images*, et tous les caches de construction d'image.

Cela peut vous faire économiser beaucoup d'espace disque, mais vous devez aussi faire très attention de ne pas vous débarrasser accisdentellement de quelque chose dont vous avez vraiment besoin

    docker prune system

---

## Limiter les ressources

L'une des grandes fonctionnalités de Docker est la possibilité de limiter les ressources utilisées par un container.

* Pour limiter la quantité de mémoire maximale autorisée, on utilise l'option `--memory`

      docker run --memory MAX_MEMORY IMAGE_NAME COMMAND

* Le CPU est distribué entre les containers en cours d'execution.
  Par défaut chaque container a `1024` parts de CPU et chaque container reçoit la même part de cycles CPU.
  Pour donner plus ou moins de poids à un container, utiliser l'option `--cpu-shares` (`-c` en version courte).
  Si un container est inutilisé alors le deuxième pourra utiliser 100% du CPU.

      docker run -c 614 -dit --name db postgres /postgres.sh   # 60% de 1024
      docker run -c 410 -dit --name web nginx /nginx.sh        # 40% de 1024

* Pour limiter par rapport à la quantité totale de CPU, utiliser `--cpu-quota`.  
  La valeur par défaut est `1000000`, soit 100% du CPU.

      docker run --cpu-quota=10000 -dit my-image               # 10% du CPU

  Docker limitera l'usage du CPU à cette quantité, quand bien même 90% du CPU reste inutilisé.

La plupart des systèmes d'orchestration exigent que vous indiquiez les limites d'un container.

---

## Informations

### Inspecter

`docker inspect` permet de récupérer les infos d'un container, comme son PID ou son adresse IP.  
On peut également l'utiliser pour inspecter une image, un volume, etc.

```
docker inspect ID
```

On peut récupérer toutes les infos ou formatter le résultat avec l'option `--format`.  
Par exemple, pour afficher le PID du container:

```
docker inspect --format '{{.State.Pid}}' mon_container
```

``` bash
$ docker image inspect ubuntu:latest --format='{{.Id}}'
sha256:7698f282e5242af2b9d2291458d4e425c75b25b0008c1e058d66b717b4c06fa9

$ docker image inspect ubuntu:latest --format='{{json .ContainerConfig}}'
{"Hostname":"3a6a6b99b2a4","Domainname":"","User":"","AttachStdin":false,"AttachStdout":false,"AttachStderr":false,"Tty":false,"OpenStdin":false,"StdinOnce":false,"Env":["PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"],"Cmd":["/bin/sh","-c","#(nop) ","CMD [\"/bin/bash\"]"],"ArgsEscaped":true,"Image":"sha256:6dba68421bcf398ca037dd630d3b221cc4b894a90f218165175f3d057bcccfb1","Volumes":null,"WorkingDir":"","Entrypoint":null,"OnBuild":null,"Labels":{}}

$ docker image inspect ubuntu:latest --format='{{.ContainerConfig.Hostname}}'
3a6a6b99b2a4
```

### Historique de l'image

Pour lister toutes les étapes effectuées pour créer l'image:

```
docker image history IMAGE_ID
```

Exemple:

```
$ docker history docker

IMAGE               CREATED             CREATED BY                                      SIZE                COMMENT
3e23a5875458        8 days ago          /bin/sh -c #(nop) ENV LC_ALL=C.UTF-8            0 B
8578938dd170        8 days ago          /bin/sh -c dpkg-reconfigure locales &&    loc   1.245 MB
be51b77efb42        8 days ago          /bin/sh -c apt-get update && apt-get install    338.3 MB
4b137612be55        6 weeks ago         /bin/sh -c #(nop) ADD jessie.tar.xz in /        121 MB
750d58736b4b        6 weeks ago         /bin/sh -c #(nop) MAINTAINER Tianon Gravi <ad   0 B
511136ea3c5a        9 months ago                                                        0 B                 Imported from -
```

{% endraw %}