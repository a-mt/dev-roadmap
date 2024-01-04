---
title: NFS & autofs
category: Linux
---

* Sous Linux, si on veut monter un système de fichiers ou un répertoire stocké sur un autre serveur,  
  la solution la plus souvent utilisée est NFS (*network file sharing*)

* Pour utiliser NFS, deux éléments doivent être configurés:
    - le serveur NFS, pour partager un système de fichiers avec le reste du monde
    - le client NFS, pour monter un système de fichiers distant

## Serveur NFS

1. Activer le service nfs-server

    ``` bash
    # sudo apt install nfs-kernel-server
    $ sudo dnf install nfs-utils
    $ sudo systemctl start nfs-server.service
    $ sudo systemctl enable nfs-server.service
    ```

2. Indiquer les répertoires que le serveur NFS doit rendre disponibles dans `/etc/exports`.  
    Pour rendre accessible le répertoire /etc aux ordinateurs ayant l'adresse IP 127.0.0.1  
    en lecture-seule — les clients NFS pourrons donc lire ce répertoire mais pas écrire dedans:

    ``` bash
    $ sudo vim /etc/exports
    /etc 127.0.0.1(ro)
    ```

    1. En premier, on indique le répertoire à partager.  
    2. Ensuite, qui peut accéder au répertoire partagé.  Par exemple:

       - Partager un répertoire avec tous les ordinateurs dont le nom d'hôte fini par .exemple

         ```
         /etc *.example.com(ro,sync,no_subtree_check)
         ```

       - Partager avec n'importe quel client

         ```
         /etc *(ro,sync,no_subtree_check)
         ````

       - Partager avec une adresse IP donnée:  
         Si on veut autoriser une plage d'adresse IP, on peut utiliser la notation CIDR

         ```
         /etc 127.0.0.1(ro)
         ```

        - Partager avec plusieurs cibles qui ont différentes options:

          ```
          /srv/home server1.example.com(rw,syc,no_subtree_check) server2.example.com(ro,sync,no_subtree_check)
          ```

    3. Spécifier les options de montage entre parenthèses.  
       Attention à ne pas mettre d'espaces supplémentaires entre la destination et les options.

        - rw: (read/write)  
          Permet d'accéder au système de fichiers en lecture et écriture

        - ro: (read only)  
          Permet d'accéder au système de fichiers en lecture uniquement

        - sync:  
          Active l'écriture synchrone des données. NFS s'assurera que les données écrites par un client sont effectivement sauvegardées sur le disque avant de signaler que l'opération est réussie. C'est plus lent, mais garantit que lorsqu'une écriture est signalée comme terminée, c'est qu'elle est effectivement écrite sur le disque

        - async:  
          Active l'écriture asynchrone des données. Un client peut émettre plusieurs demandes d'écriture et NFS peut signaler que les écritures sont valides avant qu'elles ne soient réellement sauvegardées sur le périphérique de stockage. Permet aux clients d'agir plus rapidement, mais ne garantit pas que toutes les écritures soient effectivement enregistrées — si le serveur redémarre inopinément, l'opération d'écriture peut être perdue

        - no_subtree_check:  
          Avec NFS, il est possible d'exporter non pas un système de fichier entier (la racine du point de montage) mais un sous-répertoire. La vérification du subtree est un contrôle de sécurité supplémentaire, qui vérifie si un ou des sous-répertoires sont exportés et qu'elles options s'y appliquent. Ce contrôle a des répercussions sur les performances, raison pour laquelle il est par défaut déjà désactivé — ajouter l'option ne fait que le rendre plus explicite

        - no_root_squash:  
          Par défaut, toutes les demandes de lecture et écriture en tant que root sur le client sont mappées vers un utilisateur appelé "nobody" sur le serveur. Ça garantit que les clients NFS ne peuvent pas faire tout ce qu'ils veulent sur les systèmes de fichiers distants. On peut désactiver ce comportement avec no_root_squash: l'utilisateur root sur le client sera également root sur le système de fichiers distant. Il est déconseillé d'utiliser cette option

3. Recharger les configurations du serveur NFS

    ``` bash
    $ sudo exportfs -r
    ```

    Ou

    ``` bash
    $ sudo systemctl reload nfs-server.service
    ```

4. Pour lister les exports NFS actuels:

    ``` bash
    sudo exportfs -v
    ```

    ![](https://i.imgur.com/qjUDIkB.png)

## Client NFS

1. Installer les utilitaires nécessaires pour monter un NFS.  
   Ces utilitaires sont inclus dans le package nfs-common

    ``` bash
    $ sudo apt intall nfs-common
    ```

2. Monter un périphérique NFS:

    ``` bash
    # Mount the remote /etc to /mnt
    $ sudo mount 127.0.0.1:/etc /mnt
    ```

    Pour démonter:

    ``` bash
    $ sudo umount /mnt
    ```

3. Pour que le périphérique NFS soit automatiquement monté au démarrage,  
  on peut éditer /etc/fstab — mais à ce stade, il est préférable d'utiliser autofs (section suivante):

    ``` bash
    $ sudo vim /etc/fstab
    127.0.0.1:/etc /mnt nfs defaults 0 0
    ```

## Client NFS + Autofs

* Si on veut monter un système de fichier stocké sur un autre serveur, pour que ce système de fichier reste monté, les deux machines doivent constamment communiquer entre elles via le réseau. Si on a 100 serveurs qui ont besoin de monter des fichiers distants à partir du même serveur NFS, ça représenterait beaucoup de traffic sur le réseau et de pression sur le serveur.

* Pour éviter ça, on utilise le montage à la demande (*on demand mounting*):  
  les points de montage ne seront montés que lorsqu'on essaie d'y accéder, et seront démontés lorsqu'on ne s'en sert plus.

  Pour ce faire, simplement écrire une ligne dans le fichier /etc/fstab avec l'option montage automatique ne suffira pas:  
  une fois qu'on aura accédé au répertoire, et donc automatiquement monté sur le point de montage, il ne sera pas automatiquement démonté derrière. Pour cet usage, on a autofs.

1. Activer le service autofs

    ``` bash
    $ sudo dnf install autofs
    $ sudo systemctl start autofs.service
    $ sudo systemctl enable autofs.service
    ```

2. Ajouter une entrée dans `/etc/auto.master`

    ``` bash
    $ sudo vim /etc/auto.master
    /shares/ /etc/auto.shares --timeout=4000
    ```

    - /shares est le répertoire parent du point de montage.  
      Si ce répertoire n'existe pas, autofs le créera automatiquement

    - /etc/auto.shares est un fichier de configuration qui contiendra les options de montage automatique associées à /shares

    - 4000 est le délai avant démontage automatique:  
      si le point de montage n'est pas utilisé pendant 4000s alors le répertoire est démonté.  
      Si --timeout est omis, la valeur par défaut est 300 secondes.

3. Créer le fichier de configuration qu'on a spécifié, `/etc/auto.shares`

    ``` bash
    $ sudo vim /etc/auto.shares
    mynetworkshare -fstype=auto 127.0.0.1:/etc
    ```

    - mynetworkshare est le point de montage.  
      Parce qu'on a associé /shares à ce fichier de configuration, le point de montage utilisé sera /shares/mynetworkshare

    - fstype contient les options de montage.  
      Ici auto indique à autofs d'essayer de détecter automatiquement le type de système de fichier.

      Si on savait qu'il s'agit d'un partage de type nfs4, on pourrait écrire à la place fstype=nfs4.  
      On peut aussi ajouter plusieurs options de montage avec des virgules: `-fstype=auto,ro`

    - 127.0.0.1:/etc est l'emplacement du partage NFS.  
      Ici, on indique à autofs de monter le répertoire /etc du serveur NFS qui se trouve à l'adresse IP 127.0.0.1.

      On peut également spécifier un nom de domaine à la place de l'adresse IP: `fns1.example.com:/etc`  
      On encore utiliser autofs avec des systèmes de fichiers locaux en omettant la partie IP et en pointant vers un device node `:/dev/vdb2`

3. Recharger les configurations de autofs

    ``` bash
    $ sudo systemctl reload autofs
    ```

4. Tester

    ``` bash
    $ ls /shares  # Nothing is mounted yet

    $ ls /shares/mynetworkshare
    mysharedfile1    mysharedfile2
    ```

### Montage à la racine

* Si on veut un point de montage créé directement à la racine  
  et non dans un répertoire parent (/shares dans l'exemple précédent):

1. Utiliser `/-` dans auto.master

    ``` bash
    $ sudo vim /etc/auto.master
    /- /etc/auto.shares --timeout 4000
    ```

2. Spécifier un chemin absolu dans le fichier de configuration

    ``` bash
    /mynetworkshare -fstype=auto 127.00.0.1:/etc
    /localfiles/myext4files -fstype=auto :dev/vdb2
    ```

3. Recharger les configurations de autofs

    ``` bash
    $ sudo systemctl reload autofs
    ```
