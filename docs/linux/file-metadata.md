---
title: Métadonnées
category: Linux, Fichiers
---

## file

* `file` affiche le type du fichier

  ``` bash
  $ file /etc/updatedb.conf
  /etc/updatedb.conf: ASCII text

  $ file /etc/update-manager
  /etc/update-manager: directory

  $ file /usr/share/man/man1/man.1.gz
  /usr/share/man/man1/man.1.gz: gzip compressed data, max compression, from Unix
  ```

## stat

* `stat` affiche certaines metadata du fichier, dont la date de dernier accès et date de modification

  ``` bash
  $ stat hello.txt
    File: hello.txt
    Size: 0           Blocks: 0          IO Block: 4096   regular empty file
  Device: 10302h/66306d Inode: 262391      Links: 1
  Access: (0664/-rw-rw-r--)  Uid: ( 1000/      christine)   Gid: ( 1000/      christine)
  Access: 2020-12-10 10:11:52.642884791 -0500
  Modify: 2020-12-10 10:11:48.376736102 -0500
  Change: 2020-12-10 10:11:48.376736102 -0500
   Birth: -
  ```

## ls -l, -h, -d

* ls permet d'afficher les métadonnées des fichiers grâce à l'option= -l (long)

  ```
  $ ls -l /etc/shadow
  -rw-r----- 1 root shadow 1275 Sep 22 11:07 /etc/shadow
  ```

  ![](https://i.imgur.com/QXu2WHHl.png)

1. <ins>Type</ins>  
   Le premier caractère indique le type du fichier.

    | Caractère | Signification
    |--- |---
    | - | fichier normal
    | d | (directory) répertoire
    | l | (link) lien symbolique
    | S | (socket) fichier virtuel, permet la communication entre les processus
    | p | (pipe) fichier virtuel, permet la communication entre les processus
    | b | (bloc) fichier virtuel, utilisé pour communiquer avec le matériel
    | c | (characters) fichier virtuel, utilisé pour communiquer avec le matériel
  
   Dans l'exemple `-rw-r-----`:

    ```
    -
    ```

2. <ins>Permissions</ins>  
   Les 9 caractères qui suivent indiquent les permissions sur ce fichier

    ```
    rw-r-----
    ```

3. <ins>Liens</ins>  
    Nombre de liens durs vers ce fichier

    ```
    1
    ```

4. <ins>Utilisateur propriétaire</ins>  
    Utilisateur propriétaire du fichier, sur lequel les permissions utilisateur s'appliquent.

    ```
    root
    ```

5. <ins>Groupe propriétaire</ins>  
    Groupe propriétaire du fichier, sur lequel les permissions de groupe s'appliquent.

    ```
    shadow
    ```

6. <ins>Taille</ins>  
    Taille du fichier en octets.

    ```
    1275
    ```

    Notes:

    * Pour les fichiers texte, un octet est un caractère (pour du UTF-8)  
      il est donc facile de comprendre la quantité que représente la taille du fichier.

    * Pour les fichiers volumineux, on peut afficher la taille du fichier  
      en méga ou giga-octets avec l'option -h (human format)

      ``` bash
      $ ls -lh /etc/shadow
      -rw-r----- 1 root shadow 1.3K Sep 22 11:07 /etc/shadow
      ```

    * La taille indiqué pour un répertoire n'est pas la taille des fichiers qu'il contient  
      mais juste du répertoire lui-même. Pour afficher la somme des tailles de fichier dans un répertoire, utiliser `du -sh`

      ``` bash
      $ ls -lhd /etc
      drwxr-xr-x 154 root root 12K juil. 15 04:04 /etc

      $ du -sh /etc
      16M /etc
      ```

7. <ins>Date & heure de modification</ins>  
   Indique quand le contenu d'un fichier a été modifié pour la dernière fois

    ```
    Sep 22 11:07
    ```

8. <ins>Nom du fichier</ins>

    ```
    /etc/shadow
    ```

* Pour afficher les métadonnées d'un répertoire et non lister son contenu, utiliser l'option -d (directory)

  ```
  $ ls -lh /tmp
  total 32K
  -rw------- 1 am am 0 juil. 21 04:19 config-err-YjHvaK
  ```

  ```
  $ ls -ldh /tmp
  drwxrwxrwt 15 root root 20K juil. 21 05:51 /tmp
  ```
