---
title: NFS & autofs
category: Linux
---

## Serveur NFS

* Sous Linux, si on veut monter un système de fichiers ou un répertoire stocké sur un autre serveur,  
  la solution la plus souvent utilisée est NFS (*network file sharing*)

1. Activer le service nfs-server

    ``` bash
    $ sudo dnf install nfs-utils
    $ sudo systemctl start nfs-server.service
    $ sudo systemctl enable nfs-server.service
    ```

2. Indiquer les répertoires que le serveur NFS doit rendre disponibles dans `/etc/exports`

    ``` bash
    $ sudo vim /etc/exports
    /etc 127.0.0.1(ro)
    ```

    En l'occurence, on rend accessible le répertoire /etc aux ordinateurs ayant l'adresse IP 127.0.0.1  
    en lecture-seule — les clients NFS pourrons donc lire ce répertoire mais pas écrire dedans

3. Recharger les configurations du serveur NFS

    ``` bash
    $ sudo systemctl reload nfs-server.service
    ```

## Client NFS

* Si on veut monter un système de fichier stocké sur un autre serveur, pour que ce système de fichier reste monté, les deux machines doivent constamment communiquer entre elles via le réseau. Si on a 100 serveurs qui ont besoin de monter des fichiers distants à partir du même serveur NFS, ça représenterait beaucoup de traffic sur le réseau et de pression sur le serveur.

* Pour éviter ça, on utilise le montage à la demande (*on demand mounting*):  
  les points de montage ne seront montés que lorsqu'on essaie d'y accéder, et seront démontés lorsqu'on ne s'en sert plus.

  Pour ce faire, simplement écrire une ligne dans le fichier /etc/fstab avec l'option montage automatique ne suffira pas:  
  une fois qu'on aura accédé au répertoire, et donc automatiquement monté le point de montage, il ne sera pas automatiquement démonté derrière. Pour cet usage, on a autofs.

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

    - 4000 est le délai avant démontage automatique: si le point de montage n'est pas utilisé pendant 4000s alors le répertoire est démonté.  
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
