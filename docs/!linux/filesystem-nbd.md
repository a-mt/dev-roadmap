---
title: Network Block Device (NBD)
category: Linux
---

* Des fichiers spéciaux de type *block*, présents dans /dev, font référence aux périphériques de stockage.  
  Par exemple /dev/sda pointe vers le premier disque du système,  
  et /dev/sda1 vers la première partition du premier disque.

* Les NBD (*Network Block Device*) font quelque chose de similaire, mais au lieu de pointer vers des périphériques de stockage connectés au système, ils pointent vers des périphériques de stockage situés sur une autre machine.

  Du point de vue applicatif, ils ont l'apparence et se comportent comme n'importe quel autre périphérique bloc — sauf que derrière, à chaque fois qu'on lit ou écrit sur ce périphérique, les requêtes sont envoyés aux périphériques d'un autre serveur.

* Pour utiliser un NBD, deux emplacements doivent être configurés:

    - le serveur NBD, qui possède le périphérique bloc qui sera partagé au réseau

    - le client NBD, où sera attaché le périphérique bloc

## Serveur NBD

1. Installer le package nbd-server

    ```
    sudo apt install nbd-server
    ```

2. Éditer la configuration  
   Pour plus d'infos: `man 5 nbd-server`

    ```
    sudo vi /etc/nbd-server/config
    ```
    ```
    [generic]
    # user = nbd
    # group = nbd
    includir = /etc/nbd-server/conf.d
    allowlist = true

    [partition1]
    exportname = /dev/vda1
    ```

   ![](https://i.imgur.com/hP0qert.png)

   * <ins>user = nbd</ins>  
     Par défaut, le daemon s'execute avec un utilisateur appelé `nbd`. Cet utilisateur n'a pas les droits de lecture et d'écriture sur les périphétiques bloc tels que /dev/vda. Le commenter pour qu'il s'exécute en tant que root

   * <ins>allowlist = true</ins>  
     Permet aux clients de lister les exports disponibles sur le serveur

   * <ins>[partition1]</ins>  
     Entre accolades, on spécifie un identifiant. Ici "partition1" mais on peut utiliser n'importe quel nom

   * <ins>exportname</ins>  
     Le périphérique qu'on veut exporter

3. Redémarrer le daemon

    ```
    sudo systemctl restart nbd-server.service
    ```

## Client NBD

1. Installer le package nbd-client

    ```
    sudo apt install nbd-client
    ```

2. Charger le module dans le noyau.  
   Ce module étend les fonctionnalités du noyau pour qu'il puisse gérer les périphériques réseau distants.

   ```
   sudo modprobe nbd
   ```

   Le charger de cette manière ne sera valable que pour le l'exécution en cours — après un redémarrage, le module ne sera pas automatiquement chargé. Pour charger automatiquement un module au démarrage (sous une distribution basée Debian):

    ```
    $ sudo vi /etc/modules-load.d/modules.conf
    nbd
    ```

    ![](https://i.imgur.com/etEptHF.png)

3. Lister les exports disponibles sur le serveur:

    ``` bash
    $ sudo nbd-client 161.35.115.18 -l
    Negociaton: ..
    partition1
    ```

4. Attacher le périphérique au système

    ``` bash
    $ sudo nbd-client 161.35.114.18 -N partition1
    Negociation: ..size = 25488MB
    Connected /dev/nbd0
    ```

    Ici nbd0 est le fichier bloc qui sera associé au périphérique distant:  
    à chaque fois qu'on utilise /dev/nbd0 en local, on accède au fichier bloc /dev/sda1 du serveur distant

5. Monter le périphérique

    ``` bash
    $ sudo mount /dev/nbd0 /mnt
    ls /mnt
    bin dev home ...
    ```

    ![](https://i.imgur.com/8k5qinl.png)

6. Pour détacher le périphérique:

    ``` bash
    $ sudo umount /mnt

    $ sudo nbd-client -d /dev/nbd0
    ```
