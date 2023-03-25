---
title: Swap
category: Linux
---

## Qu'est-ce que la swap

* L'accès aux données en RAM est beaucoup plus rapide que l'accès aux données sur le disque, raison pour laquelle les processus se voient alloués un espace en RAM où ils peuvent stocker et accéder à leurs données. Lorsqu'un processus est en pause (il n'a pas de temps CPU), son espace en RAM lui est toujours réservé.

  Considérons une situation où on a 8G de RAM: au début, tout fonctionne correctement, puis au fur et à mesure que de nouveaux processus sont démarrés, des erreurs de RAM insuffisante commençent à se produire. La meilleure solution pour pallier à ce problème serait d'ajouter de la RAM au système, mais ce n'est pas toujours possible — les limitations matérielles ou budgétaires peuvent nécessiter une autre solution.

* Pour y remédier, on utilise la *swap* (de l'anglais, *to swap* échanger) — aussi appelé *mémoire virtuelle*, *espace d'échange* ou *espace de pagination*. La swap est une partie du disque dur qui est utilisée comme mémoire temporaire lorsqu'il n'y a plus de RAM disponible: Linux place les données des processus en pause de la RAM à la swap; et lorsque ce processus redevient actif, Linux échange les données de la swap de nouveau à la RAM.

  Lorsque la RAM est pleine et que le système commence à swapper, l'utilisateur constatera des ralentissement — l'accès au disque dur est plus lent que l'accès à la RAM. Bien que le système puisse continuer de fonctionner, c'est le moment de faire le ménage et fermer des processus.

* Deux types de swap qui peuvent être crées:

  * <ins>partition swap</ins>:  
     La partition swap est une partition ayant le système de fichier swapfs: elle n'est pas montée dans le système de fichier virtuels et ne contient pas des fichiers mais des données disparates. Typiquement, une partition swap est crée pendant l'installation, mais des partitions swap supplémentaires peuvent être ajoutées ultérieurement.

  * <ins>fichier swap</ins>:  
     Dans le cas où il n'y a plus d'espace non partitionné sur le disque dur, un fichier swap peut être utilisé. Les partitions swap sont généralement un peu plus rapides que les fichiers swap, mais les fichiers swap sont pus flexibles et peuvent être créés à la volée sans avoir besoin de repartitionner le disque dur.

## Lister les partitions swap

* `swapon` permet de listers les espaces swap  
  -s pour afficher les swaps actuellement activées

    ``` bash
    $ swapon
    NAME      TYPE SIZE USED PRIO
    /swapfile file   2G   0B   -2

    $ swapon -s
    Filename        Type    Size  Used  Priority
    /swapfile                               file      2097148 0 -2
    ```

    ``` bash
    $ swapon
    NAME      TYPE      SIZE USED PRIO
    /dev/dm-2 partition 3.8G   0B   -2

    $ swapon -s
    Filename                Type        Size    Used    Priority
    /dev/dm-2                               partition   4001276 0   -2

    $ cat /proc/swaps
    Filename                Type        Size        Used        Priority
    /dev/dm-2                               partition   4001276     0       -2
    ```

## Afficher la swap utilisée

* `free` permet d'afficher la quantité de swap utilisée

  ``` bash
  $ free -h
                total        used        free      shared  buff/cache   available
  Mem:            15G        3,6G        7,7G        654M        4,1G         10G
  Swap:          2,0G          0B        2,0G
  ```

---

## Créer une partition swap


1. Créer une partition de type 82

    ```
    # fdisk /dev/sda
    ```

2. Utiliser `mkswap` pour formatter la partition avec le système de fichier swap

    ```
    # mkswap /dev/sda3
    ```

3. Utiliser `swapon` pour activer temporairement la partition swap  
   Si le système est redémarré, le partition swap existera toujours, mais ne sera pas activée comme swap

    ```
    # swapon /dev/sda3
    #
    # swapon -s
    Filename        Type        Size      Used  Priority
    /swapfile       file        2097148   17152 -2
    /dev/sdb1       partition   15137788  0     -3
    ```

    Utiliser `swapoff` pour désactiver temporairement:

    ```
    # swapoff /dev/sdb1
    ```

4. Pour activer la swap au démarrage, l'ajouter au fichier /etc/swap

    ```
    # tail -1 /etc/fstab
    /swapfile                                 none            swap    sw              0       0
    ```

## Créer un fichier swap

1. Déterminer quel système de fichiers a de la place pour le fichier swap

    ```
    # df -h
    ```

   Créer un gros fichier avec la commande `dd`  
   Le contenu du fichier n'a pas d'importance, seule sa taille importe.  
   Pour créer un fichier de 100MB (100 blocs de 1MB remplis de 0):

    ```
    # dd if=/dev/zero of=/var/extraswap bs=1M count=100
    ```

2. Utiliser `mkswap` pour convertir le fichier en swap

    ```
    # mkswap /var/extraswap
    ```

3. Utiliser `swapon` pour activer temporairement le fichier comme swap

    ```
    # swapon /var/extraswap
    ```
