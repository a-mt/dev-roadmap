---
title: Paramètres Kernel
category: Linux
---

* Les paramètres d'execution du kernel permettent de configurer la manière dont le kernel Linux travaille en interne. Comme le kernel s'occupe des fonctionnalités bas niveau, comme l'allocation de mémoire ou le traffic réseau, la plupart des paramètres tournent autour.

## Lister

* Pour lister les paramètres du kernel utilisés:

    ``` bash
    $ sysctl -a
    abi.vsyscall32 = 1
    debug.exception-trace = 1
    debug.kprobes-optimization = 1
    dev.cdrom.autoclose = 1
    dev.cdrom.autoeject = 0
    dev.cdrom.check_media = 0
    dev.cdrom.debug = 0
    dev.cdrom.info = CD-ROM information, Id: cdrom.c 3.20 2003/12/17
    dev.cdrom.info = 
    dev.cdrom.info = drive name:
    ```

    La convention de nommage permet de comprendre facilement ce que fait le paramètre. Par exemple, tout ce qui commence par
    - net (pour *network*) est un de paramètre lié au réseau,
    - vm (pour *virtual memory*) correspond à la gestion de la mémoire
    - et fs (pour *file system*) pour les paramètres du système de fichiers

## Afficher

* Pour afficher la valeur d'un paramètre donnée:

    ``` bash
    $ sysctl vm.swappiness
    vm.swappiness = 60
    ```

* Note: vm.swappiness peut prendre une valeur entre 0 et 100. Une valeur élevée poussera le kernel à utiliser le disque comme mémoire virtuelle plus tôt que nécessaire. Une valeur faible l'obligera à faire de son mieux pour éviter d'utiliser le disque, sauf en cas de nécessité. Les utlisateurs configurent souvent ce paramètres lorsqu'ils comment à manquer de mémoire libre.

## Modifier

### Non persistant

* Pour modifier la valeur d'un paramètre donné:

    ``` bash
    $ sudo sysctl -w vm.swappiness=10
    vm.swappiness = 10
    ```

    Il s'agit d'une modification non persistante: le changement sera effectif à partir de maintenant, mais dès le prochain redémarrage, le paramètre sera remis à sa valeur par défaut.

### Persistant

* Pour modifier un paramètre de manière persistente, ajouter un fichier dans `/etc/sysctl.d`

    ``` bash
    $ sudo vim /etv/sysctl.d/swap-less.conf

    vm.swappiness=29
    ```

    Ainsi, à chaque redémarrage la valeur par défaut de vm.swappiness sera 29

* Jusqu'au prochain redémarrage, l'ancienne valeur sera toujours effective.  
  Pour que Linux ajuste immédiatement le paramètre avec la valeur définie dans le fichier de configuration:

    ```
    $ sudo sysctl -p /etc/sysctl.d/swap-less.conf
    ```

    Mnémotechnique: p comme persistent. On peut considérer qu'il s'agit d'une lecture du paramètre persistent.
