---
title: Archives
category: Linux, Fichiers
---

## Archivage & compression

* Une *archive* (par exemple un fichier zip) est un fichier permettant de rassembler plusieurs fichiers en un seul. On utilise des archives lorsqu'un ou plusieurs fichiers doivent être transmis ou stockés aussi efficacement que possible

  Les archives contiennent généralement de grandes quantités de fichiers et peuvent prendre beaucoup de place sur un système, c'est pourquoi elles sont généralement compressées.

* La *compression* réduit la quantité de données nécessaires au stockage ou à la transmission d'un fichier tout en le stockant de manière à ce que le fichier puisse être restauré. Un algorithme de compression est une procédure que l'ordinateur utilise pour encoder le fichier original et, par conséquent, le rendre plus petit.

  Il existe deux types de compressions:
  - sans perte: aucune information n'est supprimée
  - avec perte: certaines informations sur les fichiers peuvent être retirées — par exemple les permissions

## tar

* tar est l'utilitaire d'archivage traditionnel d'UNIX, le nom "tar" est une forme abrégée de *tape archive* (archive cassette). Lorsqu'une archive tar est compressée (par exemple un .tar.gz), on dit qu'il s'agit d'une *tarball*.  
  POSIX a abandonné tar en faveur de pax, mais tar reste très populaire.

  tar conserve une certain nombre d'attributs du système de fichier, comme le nom, la date de création, le propriétaire, les permissions et la hiérarchie des répertoire.

  tar retire le répertoire racine (`/`) sur les chemins absolus de fichier, on peut donc restaurer une archive n'importe où dans le répertoire virtuel.

### Créer

* Pour créer une archive tar, on peut utiliser différentes options, mais les plus courantes sont:

  | UNIX-style | Bash-style | Description
  |---  |---         |---
  | -c  | --create   | Créer une archive tar en plaçant une copie des fichiers passés en argument dans l'archive
  | -f  | --file     | Spécifier le nom de l'archive créée
  | -u  | --update   | Ajouter des fichiers dans une archive tar pré-existante
  | -v  | --verbose  | Afficher le nom du fichier ajouté dans l'archive

  ``` bash
  $ cp /var/log/wtmp file1
  $ cp /var/log/wtmp file2
  $ cp /var/log/wtmp file3
  $ cp /var/log/wtmp file4

  $ tar -cvf archive.tar file?
  file1
  file2
  file3
  file4

  $ file archive.tar
  archive.tar: POSIX tar archive (GNU)

  $ ls file?
  file1 file2 file3 file4
  ```

* Par défaut, l'arborescence des répertoires est recréée à l'intérieur du tar relativement à /.  

  ``` bash
  # Archive le répertoire /home/bob/databases/ vers /opt/archive.tar.bz2
  # home/bob/databases/ est le répertoire de base pour les fichiers stockés dans cette archive
  $ sudo tar -czf /opt/archive2.tar.gz bob/databases/

  $ tar tf /opt/archive.tar.bz2
  home/bob/databases/
  home/bob/databases/file.sql
  home/bob/databases/data.txt
  home/bob/databases/file
  ```

  - L'option `--directory` ou `-C` permet de modifier le répertoire à partir duquel l'arborescence va être créé — et les fichiers en arguments doivent être des path relatifs à ce répertoire.

    ``` bash
    # Idem mais le répertoire de base est bob/databases/
    $ sudo tar --directory=/home -czf /opt/archive2.tar.gz bob/databases/

    $ tar tf /opt/archive2.tar.gz
    bob/databases/
    bob/databases/file.sql
    bob/databases/data.txt
    bob/databases/file
    ```

  - L'option -P permet de préserver le / initial

    ``` bash
    # /var/www est le répertoire de base (on garde le / initial)
    tar -P -czvf /root/www-backup.tar.gz /var/www/
    ```

  - À l'extraction, on peut utiliser `--strip` pour retirer les répertoires parents dont on ne veut pas

    ``` bash
    tar xvf /backup/backup.tar --strip 1  
    ```

### Voir

* Pour lister les fichiers dans une archive, sans en extraire le contenu:

  | UNIX-style | Bash-style | Description
  |---  |---         |---
  | -t  | --list   | Lister les fichiers dans l'archive
  | -d  | --diff<br> --compare | Comparer les fichiers de l'archive avec les fichiers en dehors de l'archive, et afficher les différences

  ``` bash
  $ tar -tf archive.tar
  file1
  file2
  file3
  file4
  ```

  ``` bash
  $ echo "Hello" >> file1
  $
  $ tar -df archive.tar
  file1: Mod time differs
  file1: Size differs
  ````

### Extraire

* Pour récupérer les fichiers présents dans l'archive:

  | UNIX-style | Bash-style | Description
  |---  |---         |---
  | -x  | --extract<br> --get   | Extraire une copie des fichiers dans l'archive vers le répertoire courant
  | -O  | --to-stdout           | Extraire une copie des fichiers dans l'archive vers la sortie standard (stdout)
  | -v  | --verbose             | Affiche le nom du fichier extrait de l'archive

  ```
  $ tar -xvf archive.tar
  file1
  file2
  file3
  file4
  ```

  ``` bash
  # Extraire l'archive backup.tar.gz vers /opt/restored/
  $ sudo tar -xzf backup.tar.gz -C /opt/restored
  ```

### Compresser

* Il est possible de compresser une archive à la volée quand on la crée, ou de la décompresser quand on l'extrait, en spécifiant l'algorithme de compression à utiliser.

  | UNIX-style | Bash-style | Description
  |---  |---        |---
  | -z  | --gzip    | Utiliser gzip pour compresser/décompresser l'archive
  | -j  | --bzip2   | Utiliser bzip2 pour compresser/décompresser l'archive
  | -J  | --xz      | Utiliser xz pour compresser/décompresser l'archive

  Memo: z = gzip, j = 2, J = non j

  ![](https://i.imgur.com/g0H0jEF.jpg)

* La bonne pratique veut que le type de compression utilisé soit indiqué dans l'extension du fichier:

  - .tar.gz pour une archive tar compressée par gzip
  - .tar.bz ou .tbz pour du bzip2
  - .tar.xz ou .txz ppur du xz

* Par exemple, pour une archive avec compression xz:

  ``` bash
  # Créer
  $ tar -Jcvf archive.tar.xz file?
  file1
  file2
  file3
  file4
  ```

  ``` bash
  # Extraire
  $ tar -Jxvf archive.tar.xz
  file1
  file2
  file3
  file4
  ```

---

## gzip

* Il est possible de compresser un fichier quelconque et donc pas uniquement des archives) — mais il faudra le décompresser avant de pouvoir consulter le contenu.

* <ins>Compresser un fichier en .gz</ins>  
  gzip permet de compresser un fichier avec l'algorithme gzip. Quand cette commande est terminée, le fichier d'origine est supprimé, ne reste plus que la version compressée — avec l'extension .gz

  -v pour voir une barre de progression:

  ``` bash
  $ gzip -v anime.mkv
  anime.mkv: 0.1% -- replace with anime.mkv.gz
  ```

  -r pour compresser tous les fichiers d'un répertoire:

  ``` bash
  $ gzip -vr logs/
  logs/2022-04-24.log: 14.1% -- replaced with logs/2022-04-24.log.gz
  logs/2022-04-23.log: 4.7% -- replaced with logs logs/2022-04-23.log.gz
  ```

* <ins>Voir les infos</ins>:  
  -l pour voir les infos d'un fichier compressé avec gzip  
  -v pour ajouter des informations supplémentaires

  ``` bash
  $ gzip net.downloadhelper.coapp-1.6.3-1_amd64.deb
  $
  $ gzip -l net.downloadhelper.coapp-1.6.3-1_amd64.deb.gz
  compressed        uncompressed  ratio uncompressed_name
   24353176            24349488  -0.0% net.downloadhelper.coapp-1.6.3-1_amd64.deb
  $
  $ gzip -lv net.downloadhelper.coapp-1.6.3-1_amd64.deb.gz
  method  crc     date  time           compressed        uncompressed  ratio uncompressed_name
  defla a482004b Jan 31 10:44            24353176            24349488  -0.0% net.downloadhelper.coapp-1.6.3-1_amd64.deb
  ```

* <ins>Décompresser un fichier .gz</ins>  
  Les commandes `gunzip` ou `gzip -d` permettent de restaurer un fichier compressés dans leur forme originale (décompressée).

  ``` bash
  $ gzip -d net.downloadhelper.coapp-1.6.3-1_amd64.deb.gz
  ```

  ``` bash
  # Équivalent à: tar -zcf data.tar.gz data
  $ tar -c -f data.tar data
  $ gzip data.tar

  # Équivalent à: tar -zxf data.tar.gz
  $ gzip -d data.tar.gz
  $ tar -x -f data.tar
  ```

---

## Comparaison des algorithmes de compression

* gzip est l'algorithme de compression le plus courant  
  bzip2 fournit un taux de compression légèrement plus élevé que gzip  
  xz fournit le taux de compression le plus élevé des trois

  Note: Tous suppriment le fichier d'origine qu'ils compressent, et créent une nouvelle version compressée — avec l'extension appropriée. Si vous compressez un fichier important, pensez à le copier avant de le compresser.

  ``` bash
  $ cp /var/log/wtmp file1
  $ cp /var/log/wtmp file2
  $ cp /var/log/wtmp file3

  $ ls -1hs file?
  124K file1
  124K file2
  124K file3

  $ gzip file1
  $ bzip2 file2
  $ xz file3

  $ ls -1hs file?
  ls: cannot access file?: No such file or directory

  $ ls -1hs file?.*
  8.0K file1.gz
  4.0K file2.bz
  4.0K file3.xz
  ```

* Si pour une raison quelconque un fichier compressé n'a pas la bonne extensionn, il est possible de trouver le type de compression utilisé avec `file`:

  ``` bash
  $ file file3.xz
  file3.xz XZ compressed data
  ```

* Chaque compression a sa propre commande pour voir le contenu du fichier compressé:

  ``` bash
  $ zcat file1.gz | less
  $ bzcat file2.bz | less
  $ xzcat file3.xz | less
  ```

* Et pour décompresser:

  ``` bash
  $ gunzip file1.gz
  $ bunzip2 file2.bz2
  $ unxz fike3.xz
  ```

* zip est l'utilitaire d'archivage par défaut sous Microsoft.  
  Il n'est pas aussi répandu sous Linux mais reste malgré tout supporté avec les commandes zip et unzip.

  ``` bash
  # zipper data et son contenu (récursif)
  $ zip -r data.zip data

  # lister le contenu de l'archive
  $ unzip -l data.zip

  # extraire
  unzip data.zip
  ```

---

## cpio

* cpio (pour copy in/out) permet de créer une archive.  

  * Il utilise l'entrée standard pour obtenir la liste des fichiers à inclure dans l'archive, et écrit le résultat dans la sortie standard.

  * Contrairement à tar, il conserve les chemins absolus (avec la racine).  
    Il est ainsi souvent utilisé pour créer des sauvegardes de systèmes entier.

* <ins>Créer une archive</ins>  
  Pour créer une archive, utiliser l'option -o (mode copy out)

  ``` bash
  $ cp /var/log/wtmp file1
  $ cp /var/log/wtmp file2
  $ cp /var/log/wtmp file3
  $ cp /var/log/wtmp file4

  $ ls file? | cpio -ov > archive.cpio
  file1
  file2
  file3
  file4
  208 blocks

  $ ls *.cpio
  archive.cpio
  $ ls file?
  file1 file2 file3 file4
  ```

* <ins>Extraire une archive</ins>  
  Pour extraire une archive, utiliser l'option -i (mode copy in)  
  -I (input) pour spécifier le nom de l'archive en entrée

  ```
  $ cpio -iv -I archive.cpio
  file1
  file2
  file3
  file4
  208 blocks
  ```

  Pour restaurer les fichiers dans un répertoire différent que le répertoire d'origine, forcer cpio à utiliser des noms de fichiers relatifs avec --no-absolute-filenames:

  ```
  $ cd tmp
  $
  $ cpio -iv --no-absolute-filenames -I archive.cpio
  file1
  file2
  file3
  file4
  208 blocks
  ```

* <ins>Voir le contenu</ins>  
  Pour voir le contenu, sans véritablement extraire les fichiers: n'extraire que les metadonnées des fichiers avec l'option -t  

  ```
  $ cpio -ivt -I archive.cpio
  -rw-r--r-- 1 christine christine 26496 Dec 23 13:42 file1
  -rw-r--r-- 1 christine christine 26496 Dec 23 13:42 file2
  -rw-r--r-- 1 christine christine 26496 Dec 23 13:42 file3
  -rw-r--r-- 1 christine christine 26496 Dec 23 13:42 file4
  208 blocks
  ```

---

## dd

* `dd` (duplicate disk) permet de sauvegarder un disque ou une partition entière. Cette command prend toutes les données présentes sur le disque ou la partition et effectue une copie exacte bit par bit. Un processus également appelé "imaging" — le processus de créer une image de disque.

  Avant de sauvegarder une image de disque ou de partition, démonter ce disque ou cette partition pour s'assurer qu'aucune donnée n'est modifiée pendant la sauvegarde.

* Le véritable but de la commande `dd` est de copier un fichier, mais elle est souvent employée dans le domaine de la sécurité informatique puisqu'elle permet de créer un copie exacte d'un disque entier, qui peut souvent être utilisée comme preuve dans des affaires judiciaires.

* Pour copier un disque, spécifier:  
  - le fichier en entrée avec `if=inputFilename`  
  - le fichier en sortie avec `of=outputFilename`  
  - `status=progress` permet d'avoir une barre de progression
  - `bs=1M` permet de spécifier la taille des blocs (block size de 1M), l'augmenter permet d'accélérer considérablement le processus  
  - `count=16` permet de ne copier que le nombre de blocs spécifié. Ainsi un fichier contenant 16 blocs de 1M pèsera au final 16M

  ``` bash
  $ sudo lsblk
  NAME           MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
  sda              8:0    0   20G  0 disk
  ├─sda1           8:1    0   50M  0 part /boot
  └─sda2           8:2    0 19.5G  0 part
    ├─centos-root 253:0    0 17.5G  0 lvm  /
    └─centos-swap 253:1    0    2G  0 lvm  [SWAP]
  sr0             11:0    1 1024M  0 rom

  $ sudo dd if=/dev/sda of=/dev/null bs=1M status=progress
  21063083520 bytes (21 GB) copied, 106.356134 s, 198 MB/s  
  41943040+0 records in
  41943040+0 records out
  21474836480 bytes (21 GB) copied, 107.157 s, 200MB/s
  
  $ dd if=/dev/zero of=empty bs=64M count=16 status=progress
  805306368 bytes (805 MB, 768 MiB) copied, 1 s, 797 MB/s
  16+0 records in
  16+0 records out
  1073741824 bytes (1.1 GB, 1.0 GiB) copied, 1.29134 s, 831 MB/s
  ```

* Pour restaurer ultérieurement un disque ou partition à partir d'une image, il suffit d'inverser les labels if et of.  
  Attention cette commande écrase toutes les données présentes dans la destination.

---

## rsync

* Un outil populaire pour sauvegarder des données de `rsync` (remote synchronization), qui permet de garder un répertoire sur le server 1 synchronisé avec un répertoire sur le serveur 2 en copiant les données à travers le réseau, via SSH.
   Si la commande est exécutée une seconde fois, rsync ne copiera que les données qui ont été modifiées: les anciennes données qui sont encore à jour ne seront pas écrasées, ce qui permet d'accélérer le processus

* Pour copier un répertoire local vers un répertoire distant:  

  ``` bash
  rsync -a Pictures/ aaron@9.9.9.9:/home/aaron/Pictures/
  ```

  Note: L'option -a (archive) permet à rsync de synchroniser le sous-répertoires, les permissions de fichiers, la date de modification, etc.

* Pour copier un répertoire distant vers un répertoire local:

  ``` bash
  rsync -a aaron@9.9.9.9:/home/aaron/Pictures/ Pictures/
  ```

* On peut également synchroniser des répertoires locaux

  ``` bash
  rsync -a Pictures/ /Backups/Pictures/
  ```
