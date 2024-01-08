---
title: Libraries
category: Linux
---

* Une bibliothèque (*library*) est un morceau de code pouvant être utilisé par plusieurs programmes: plutôt que d'avoir chaque développeur qui développe sa propre logique (par exemple encoder ou encrypter des données), les développeurs peuvent simplement utiliser le code d'un autre développeur et ajouter cette librairie comme dépendance.

## ldd: liste des bibliothèques

* La commande `ldd` (*list dynamic dependencies*) permet d'afficher les bibliothèques utilisées par un programme (avec son path absolu)

  ``` bash
  $ ldd /bin/ps
    linux-vdso.so.1 (0x00007ffd6f199000)
    libprocps.so.8 => /lib/x86_64-linux-gnu/libprocps.so.8 (0x00007f59fd614000)
    libdl.so.2 => /lib/x86_64-linux-gnu/libdl.so.2 (0x00007f59fd60e000)
    libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f59fd41c000)
    libsystemd.so.0 => /lib/x86_64-linux-gnu/libsystemd.so.0 (0x00007f59fd36d000)
    /lib64/ld-linux-x86-64.so.2 (0x00007f59fd695000)
    librt.so.1 => /lib/x86_64-linux-gnu/librt.so.1 (0x00007f59fd363000)
    liblzma.so.5 => /lib/x86_64-linux-gnu/liblzma.so.5 (0x00007f59fd33a000)
    liblz4.so.1 => /lib/x86_64-linux-gnu/liblz4.so.1 (0x00007f59fd317000)
    libgcrypt.so.20 => /lib/x86_64-linux-gnu/libgcrypt.so.20 (0x00007f59fd1f9000)
    libpthread.so.0 => /lib/x86_64-linux-gnu/libpthread.so.0 (0x00007f59fd1d6000)
    libgpg-error.so.0 => /lib/x86_64-linux-gnu/libgpg-error.so.0 (0x00007f59fd1b3000)
  ```

### Convention de nommage

* Le nom des libraories suit la convention suivante:

  1/ préfixe "lib"  
  2/ nom de la librairie  
  3/ extension .so  
  4/ numéro de version

  ``` bash
  $ ls /lib/x86_64-linux-gnu/libapparmor.so.1.4.2

  $ ls /lib/systemd/libsystemd-shared-237.so
  ```

  Les noms des fichiers varient souvent par rapport à cette convention.  
  On peut par exemple trouver des fichiers avec le numéro de version avant l'extension.

## Path des librairies

* Les commandes associées aux librairies suivent un ordre donné pour trouver l'emplacement des fichiers:

  1. Variable d'environnement LD_LIBRARY_PATH.  
     Cette variable d'environnement contient tous les répertoires non standard ou de développement dans lesquels les bibliothèques doivent être recherchées. Cette variable ne sera généralement définie que si vous développez vos propres bibliothèques.

      ``` bash
      $ echo $LD_LIBRARY_PATH

      ```

  2. Variable d'environnement PATH

      ``` bash
      $ echo $PATH
      /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
      ```

  3. Fichier de configuration /etc/ld.so.conf

      ``` bash
      $ cat /etc/ld.so.conf
      include /etc/ld.so.conf.d/*.conf

      $ ls -1 /etc/ld.so.conf.d/*.conf
      /etc/ld.so.conf.d/fakeroot-x86_64-linux-gnu.conf
      /etc/ld.so.conf.d/libc.conf
      /etc/ld.so.conf.d/x86_64-linux-gnu.conf

      $ cat /etc/ld.so.conf.d/x86_64-linux-gnu.conf
      # Multiarch support
      /usr/local/lib/x86_64-linux-gnu
      /lib/x86_64-linux-gnu
      /usr/lib/x86_64-linux-gnu
      ```

      Typiquement, on trouvera les fichiers de bibliothèque dans /lib, /lib64 et /usr/lib

      ``` bash
      $ ls -d /lib*
      /lib /lib64

      $ ld -d /usr/lib*
      /usr/lib /usr/libexec
      ```

## ldconfig, mise en cache des librairies

* Le *dynamic loader* est un programme qui s'occupe de trouver toutes les bibliothèques nécessaires à une application et tente de les charger.
  La liste des différents répertoires et librairies trouvées est ensuite mise en cache — cache qui permet de lancer plus rapidemment les programmes.

  Pour consulter le cache:

  ``` bash
  $ ldconfig -p | head
  921 libs found in cache `/etc/ld.so.cache'
    libzvbi.so.0 (libc6,x86-64) => /lib/x86_64-linux-gnu/libzvbi.so.0
    libzvbi-chains.so.0 (libc6,x86-64) => /lib/x86_64-linux-gnu/libzvbi-chains.so.0
    libzstd.so.1 (libc6,x86-64) => /lib/x86_64-linux-gnu/libzstd.so.1
    libzmq.so.5 (libc6,x86-64) => /lib/x86_64-linux-gnu/libzmq.so.5
    libzinnia.so.0 (libc6,x86-64) => /lib/x86_64-linux-gnu/libzinnia.so.0
    libzeitgeist-2.0.so.0 (libc6,x86-64) => /lib/x86_64-linux-gnu/libzeitgeist-2.0.so.0
    libz.so.1 (libc6,x86-64) => /lib/x86_64-linux-gnu/libz.so.1
    libz.so (libc6,x86-64) => /lib/x86_64-linux-gnu/libz.so
    libyelp.so.0 (libc6,x86-64) => /lib/x86_64-linux-gnu/libyelp.so.0
  ```

  Pour lister les répertoires et librairies dans le cache:  
  -N indique à ldconfig de ne pas reconstruire le cache  
  -v de rendre la sortie plus verbeuse

  ``` bash
  $ ldconfig -vN | head
  /usr/lib/x86_64-linux-gnu/libfakeroot:
    libfakeroot-0.so -> libfakeroot-tcp.so
  /usr/local/lib:
  /lib/x86_64-linux-gnu:
    libnss3.so -> libnss3.so
    libnss_mdns6.so.2 -> libnss_mdns6.so.2
    libffi.so.7 -> libffi.so.7.1.0
    libgdbm_compat.so.4 -> libgdbm_compat.so.4.0.0
    libdcerpc-server-core.so.0 -> libdcerpc-server-core.so.0.0.1
    libsoxr.so.0 -> libsoxr.so.0.1.2
  ```

* Le cache est automatiquement mis à jour par les gestionnaires de paquets lorsqu'on installe des packages.  
  Ce n'est typiquement que pendant le développement d'une nouvelle application qu'on doit le mettre à jour — par exemple, après avoir modifié LD_LIBRARY_PATH.  
  Pour mettre à jour le cache:

  ``` bash
  $ sudo ldconfig
  ```

## Dynamic loader

* Pour résoudre des problèmes de résolution de librairie d'une application:

  1. Obtenir le path absolu de l'application

      ``` bash
      $ which man
      /usr/bin/man
      ```

  2. Lister les bibliothèques de cette application

      ``` bash
      $ ldd /usr/bin/man
        linux-vdso.so.1 (0x00007ffd9f9df000)
        libmandb-2.9.1.so => /usr/lib/man-db/libmandb-2.9.1.so (0x00007f8c8a8bd000)
        libman-2.9.1.so => /usr/lib/man-db/libman-2.9.1.so (0x00007f8c8a87a000)
        libz.so.1 => /lib/x86_64-linux-gnu/libz.so.1 (0x00007f8c8a84b000)
        libpipeline.so.1 => /lib/x86_64-linux-gnu/libpipeline.so.1 (0x00007f8c8a83a000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f8c8a648000)
        libgdbm.so.6 => /lib/x86_64-linux-gnu/libgdbm.so.6 (0x00007f8c8a638000)
        libseccomp.so.2 => /lib/x86_64-linux-gnu/libseccomp.so.2 (0x00007f8c8a614000)
        /lib64/ld-linux-x86-64.so.2 (0x00007f8c8a8e6000)
      ```

  3. Vérifier l'emplacement des bibliothèques dans le cache.

      ``` bash
      ldconfig -p | grep libz.so.1
        libz.so.1 (libc6,x86-64) => /lib/x86_64-linux-gnu/libz.so.1
      ```

      Si cette librairie n'est pas dans le cache, rebuilder le cache

      ``` bash
      ldconfig
      ```

  4. Vérifier que ce fichier existe et a les droits d'execution.  
     Si le fichier n'existe pas, réinstaller l'application

      ``` bash
      $ ls -l /lib/x86_64-linux-gnu/libz.so.1
      lrwxrwxrwx 1 root root 14 Oct 14  2022 /lib/x86_64-linux-gnu/libz.so.1 -> libz.so.1.2.11
      ```
