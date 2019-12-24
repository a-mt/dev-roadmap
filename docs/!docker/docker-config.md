---
title: Configurer Docker
category: Workflow, Containers, Docker
---

## Configurations

* Il est possible de modifier le comportement par défaut de Docker en lui passant des options au moment de démarrer le daemon:

  ```
  dockerd --iptables=false
  ```

* Plutôt que de passer des options en ligne de commandes, on peut également les définir dans un fichier de configuration. Par défaut, Docker cherche le fichier `/etc/docker/daemon.json` (le créer s'il n'existe pas).

  <ins>Exemple 1</ins>:

  ```
  {
    "iptables": false
  } 
  ```

  <ins>Exemple 2</ins>:

  ```
  {
    "storage-driver": "overlay2",
    "graph": "/var/lib/docker",
    "log-driver": "json-file",
    "log-opts": {
      "max-size": "10m",
      "max-file": "2"
    },
    "debug": false,
    "userns-remap": "1000:1000"
  } 
  ```
  
  Pour éviter que les logs prennent deviennent trop gros, on peut configurer Docker pour gérer la rotation des fichiers (supprimer les logs les plus anciens quand la limite de taille est dépassée):
  
  ```
  {
    "log-driver": "json-file",
    "log-opts": {"max-size": "10m", "max-file": "3"}
  }
  ```

  Les options définies dans le fichier de configuration ne doivent pas entrer en conflit avec les options définies en ligne de commande: le daemon Docker ne démarre pas si une option est dupliquée (et ce, quelle que soit sa valeur).

* On peut utiliser l'option `--config-file` pour spécifier un fichier de configuration autre que celui par défaut:

  ```
  dockerd --config-file /my/mypath/daemon.json
  ```

[Liste des options de dockerd](https://docs.docker.com/engine/reference/commandline/dockerd/)

---

## Experimental

Certaines fonctions Docker sont expérimentales — par exemple `build --squash`.  
Pour activer le mode expérimental, il est nécessaire de (re)démarrer Docker avec le flag `--experimental`.

La commande `docker version` permet de vérifier si le mode expériemental est activé ou non.

---

## Logging driver

On peut modifier le driver de logging:

```
docker run --log-driver=syslog --log-opt syslog-addres=udp://1.1.1.1 alpine
```

Cela enverra les logs au serveur syslog spécifié.

---

## Storage driver

Lorsqu'on démarre un container, Docker récupère l'image source et crée une zone d'écriture par dessus. Pour ce faire, un storage driver est nécessaire. Pour savoir quel storage driver vous utilisez:

    docker info

* Par défaut, sous Ubuntu, le driver utilisé est Overlay2.
* Device Mapper est une alternative supportée pour Docker EE sur Red Het, CentOS et Oracle, et pour Docker CE sur CentOS, Fedora, Ubuntu et Debian.

  Device Mapper fonctionne au niveau bloc plutôt qu'au niveau fichier, contrairement à la plupart des autres drivers. Ainsi, Docker peut accéder et gérer le stockage physique directement, ce qui vous donnera des performances beaucoup plus élevées. En revanche, Device Mapper a tendance à utiliser plus de mémoire que les autres drivers.

Lorsqu'on change de storage driver, toutes les images et containers existants deviennent inacessible. Pour ne pas les perdre, assurez-vous de les sauvegarder, par exemple dans Docker Hub.

Pour changer le driver storage, définir l'option `storage-driver`:

```
{
  "storage-driver": "devicemapper"
}
```

Docker fournit quelques recommendations de performance liées à l'utilisation de Device Mapper, notamment de ne jamais utiliser Loop LVM en production et d'utiliser des disques SSD.
Loop LVM est la valeur par défaut si vous ne configurez pas Direct LVM.
Lorsque activé, Direct LVM est automatiquement configuré avec un simple jeu de configurations de base.
Une fois Device Mapper et Direct LVM configurés, vous pouvez effectuer des opérations telles que le thin provisioning et accéder aux disques physiques au niveau bloc.

[Storage drivers](https://docs.docker.com/storage/storagedriver/select-storage-driver/)
