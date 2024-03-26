---
title: Volumes
category: Workflow, Containers, Docker
---

Par défaut, tous les fichiers créés dans un container sont stockés dans le container, ce qui a plusieurs conséquences:

* les accès aux fichiers sont plus lents, car il faut que le driver de stockage gère le système de fichier (⋍4x plus lent)
* les fichiers ne peuvent pas être facilement migrés d'un container à l'autre
* lorsqu'un container est supprimé, et qu'on démarre un nouveau container à partir de l'image, toutes les modifications apportées dans le container précédent sont perdues.  
  Dans le cas d'une base de données ou d'un serveur sur lequel l'utilisateur peut uploader des fichiers, on perdrait toutes les données si l'on voulait mettre à jour l'image ou juste changer d'ordinateur.

Pour résoudre ces problèmes, on peut utiliser un *volume*, *bind* ou *tmpfs*.

---

## Volume

Un volume fonctionne un peu sur le même principe qu'un fichier/dossier partagé entre l'hôte et le container. Il peut être utilisé pour stocker et partager des données entre différents containers. Il s'agit de la manière recommandée pour persister des données, qui doivent exister au-delà de la durée de vie d'un container.

Les volumes sont indépendants des images. Le contenu des volumes ne sera pas inclus lorsque vous téléchargez une image, et le contenu des volumes ne sera pas exporté si vous créez une image à partir du container.  
Par défaut, le contenu des volumes est sauvegardé dans `/var/lib/docker/volumes` sur la machine hôte.

* Pour utiliser un volume, utiliser l'option `--mount` ou pour la syntaxe abrégée `-v`:

  ```
  docker run -d \
    --name devtest \
    --mount source=myvol2,target=/app \
    nginx:latest
  ```

  ```
  docker run -d \
    --name devtest \
    -v myvol2:/app \
    nginx:latest
  ```

* Lorsqu'on démarre un container avec un volume qui n'existe pas encore, Docker crée le volume à la volée. Lors de la création du volume, si le container contient des fichiers ou répertoires dans le répertoire à monter (`/app` dans l'exemple précédent), alors le volume est pré-rempli avec le contenu du répertoire. Si ce n'est pas ce que vous souhaitez, vous pouvez créer le volume au préalable:

  ```
  docker volume create my-vol
  ```

* Par défaut, les volumes sont montés en lecture-écriture — le container peut modifier le contenu du volume. Mais on peut monter le volume en lecture uniquement:

  ```
  --mount source=nginx-vol,destination=/usr/share/nginx/html,readonly
  ```

  ```
  -v nginx-vol:/usr/share/nginx/html:ro
  ```

* On peut utiliser un volume avec Docker Swarm, et ainsi avoir plusieurs replicas qui utilisent toutes le même volume pour stocker leurs données persistantes.

  ```
  docker service create -d \
    --replicas=4 \
    --name devtest-service \
    --mount source=myvol2,target=/app \
    nginx:latest
  ```

  `docker service create` ne supporte pas la syntaxe `-v`

---

## Volume éphémère

Il est possible de partager un volume entre containers, qui n'existera que tant que des containers l'utilise. Lorsqu'il n'y a plus aucun container pour utiliser le dossier (situé en mémoire), alors le volume est supprimé. On parle de volume éphémère.

* Pour créer un volume éphémère, utiliser l'option `-v` sans spécifier de chemin:

  ```
  docker run -ti --name container-a -v /shared-data ubuntu bash
  ```

* Pour qu'un autre container utilise le même volume, utiliser l'option `--volumes-from`:

  ```
  docker run -ti --volumes-from container-a ubuntu bash
  ```

  Dans cet exemple, les deux containers auront accès au dossier `/shared-data`, où ils pourront se partager des fichiers. On peut ajouter autant de containers qu'on le souhaite pour utiliser le même volume. Le volume existera toujours si le container qui l'a crée est arrêté, et disparaîtra lorsque tous les containers qui l'utilisent sont arrêtés.

---

## bind mount

Une autre option pour le stockage de données est de monter un répertoire de la machine hôte vers le container, ce qui peut être utile lorsqu'on développe une application — les modifications de code effectuées sur la machine hôte sont directement apportées dans le container et inversemment.

Pour ce faire, monter un volume de type `bind`:

```
docker run -ti -v /home/docker/example:/shared-folder ubuntu bash
```

```
--mount type=bind,source="$(pwd)"/target,target=app
```

---

## tmpfs mount

Sous Linux, on peut utiliser une partition `tmpfs`.
Contrairement aux volumes et bind mounts, utiliser tmpfs est temporaire, les données ne subsistent que dans la mémoire de l'hôte et non sur le disque dur. Lorsque le container s'arrête, la partition `tmpfs` est supprimée et les fichiers qui y sont écrits sont perdus. Une partition `tmpfs` ne peut pas non plus être partagée entre containers.
C'est utile pour stocker temporairement des fichiers sensibles, que vous ne souhaitez pas conserver dans le container ni sur l'hôte.

```
docker run -d \
  -it \
  --name tmptest \
  --mount type=tmpfs,destination=/app \
  nginx:latest
```

```
docker run -d \
  -it \
  --name tmptest \
  --tmpfs /app \
  nginx:latest
```

---

## Volume driver

On peut ajouter de nouveaux drivers de volume, sous forme de plugins. Ils peuvent permettent de stocker les volumes sur des hôtes distants ou des fournisseurs de cloud, et/ou d'encrypter le contenu.

- Un *block storage* est un bloc de données fixe, qui n'a pas de métadonnées associées — le système de fichier ne sait pas exactement quelles données sont stockées dans le bloc. Ce type de storage est généralement utilisé pour stocker les données persistantes des applications.

- Un *object storage* quant à lui stocke les données avec un certain nombre de métadonnées associées, ainsi qu'un identifiant unique. Il n'y a pas d'organisation ou de hiérarchie pour les objets stockés, en revanche la scabilité est pratiquement illimitée. Les données stockées sont accessibles avec des appels HTTP RESTful. Le stockage S3 d'Amazon est un exemple d'object storage. Ce type de storage est généralement utilisé pour stocker des images Docker, avec le trusted registry de Docker.

Pour spécifier le driver à utiliser:

```
docker volume create --driver vieux/sshfs \
  -o sshcmd=test@node2:/home/test \
  -o password=testpassword \
  sshvolume
```

```
docker run -d \
  --name sshfs-container \
  --volume-driver vieux/sshfs \
  --mount src=sshvolume,target=/app,volume-opt=sshcmd=test@node2:/home/test,volume-opt=password=testpassword \
  nginx:latest
```

```
docker service create -d \
  --name nfs-service \
  --mount 'type=volume,source=nfsvolume,target=/app,volume-driver=local,volume-opt=type=nfs,volume-opt=device=:/var/docker-nfs,volume-opt=o=addr=10.0.0.10' \
  nginx:latest
```

[Volume plugins](https://docs.docker.com/engine/extend/legacy_plugins/#volume-plugins)  
[Managing persistence for Docker containers](https://thenewstack.io/methods-dealing-container-storage)

---

## Backup & restore

* Pour sauvegarder un volume, le plus simple est de créer une archive

  ```
  docker run --rm \
    --volumes-from dbstore \
    -v $(pwd):/backup \
    ubuntu bash -c 'tar cvf /backup/backup.tar /dbdata'
  ```

* Pour restaurer, il suffit de récupérer le contenu de l'archive

  ```
  docker run --rm \
    --volumes-from dbstore2 \
    -v $(pwd):/backup \
    ubuntu bash -c 'cd /dbdata && tar xvf /backup/backup.tar --strip 1'
  ```

---

## Permissions

Les permissions à l'extérieur du container — rwx, UID et GUID — sont conservées à l'intérieur du container.  
Pour contrôler les permissions à l'intérieur du container, il faut donc contrôler à quel utilisateur/groupe appartient l'UID/GUID propriétaire du fichier. Par exemple:

``` bash
# Permissions du fichier /var/run/docker.sock côté hôte
host$ ls -l /var/run/docker.sock
srw-rw---- 1 root docker 0 juin  15 02:45 /var/run/docker.sock

# GUID du groupe "docker"
host$ getent group docker
docker:x:999:bob

# Démarre un container qui utilise ce fichier comme volume
host$ docker run --rm -it \
  -v /var/run/docker.sock:/var/run/docker.sock \
  ubuntu:18.04 bash
```

``` bash
# Permissions du fichier /var/run/docker.sock côté container
/# ls -l /var/run/docker.sock
srw-rw---- 1 root 999 0 Jun 15 00:45 /var/run/docker.sock

# Ajoute un groupe avec le GUID 999
/# groupadd ping -g 999

# Vérifie que "ping" est maintenant le groupe propriétaire du fichier côté container
/# ls -l /var/run/docker.sock
srw-rw---- 1 root ping 0 Jun 15 00:45 /var/run/docker.sock

# Ajoute l'utilisateur "www-data" au groupe "ping"
# Lui donne donc l'autorisation de lire et écrire (rw) le fichier
/# usermod -aG ping www-data
```