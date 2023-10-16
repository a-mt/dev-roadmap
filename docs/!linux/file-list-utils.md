---
title: Lister
category: Linux, Fichiers
---

### ls -F (classify)

* Ajoute un symbole, appelé *indicateur de classification*, derrière le nom des fichiers (autres que des fichiers réguliers) pour indiquer de quel type de fichier il s'agit. On trouve notamment:

  * `/` = répertoire
  * `*` = fichier exécutable
  * `@` = lien symbolique

  ```
  $ ls -F
  Desktop/ Documents/ Downloads/ Music/ Pictures/ Public/ Templates/ Videos/
  ```

### ls -1 (one per line)

* Affiche les résultats ligne par ligne

  ```
  $ ls -1
  Desktop
  Documents
  Downloads
  Music
  Pictures
  Public
  Templates
  Videos
  ```

### ls -R (recursive)

* Permet d'afficher les fichiers récursivement — les fichiers du répertoire courant, les fichiers des sous-répertoires, etc.

  ```
  $ ls -R /tmp
  /tmp:
   config-err-TQifDd
   Temp-b9199d7d-e396-4332-a3a5-7aba1a58e754
   ssh-K8dkXSBsF0T1
   www-data-temp-aspnet-0
   sublime_text.984860139de9dbe933a6da9bf8923bc3.sock

  /tmp/ssh-K8dkXSBsF0T1:
   agent.3081

  /tmp/Temp-b9199d7d-e396-4332-a3a5-7aba1a58e754:

  /tmp/www-data-temp-aspnet-0:
   efb61e74

  /tmp/www-data-temp-aspnet-0/efb61e74:
  ```

### ls -S, t, r (sort)

* Par défaut, `ls` trie les fichiers par ordre alphabétique, mais on peut trier selon d'autres critères:

  - par taille: `-S` (size)

    ```
    $ ls -lhS
    ```

  - par date de modification: `-t` (time)  
    Pour des informations plus détaillés sur l'heure de modification,  
    utiliser `--full-time` ou `--time-style=[full-iso|long-iso|iso|locale|+FORMAT]`

    ```
    $ ls -lt --time-style=long-iso
    ```

- On peut inverser le tri avec `-r` (reverse)

  ```
  $ ls -lhSr
  ```

  ``` bash
  #  Récupérer le fichier le plus ancien dans "/path"
  ls "/path" -tr1 ∣ head -1

  # Récupérer le fichier le plus récent dans "/path"
  ls "/path" -t1 ∣ head -1
  ```

---

## Filtrer

### locate

* Le moyen le plus simple de retrouver un fichier dont on ne connait pas l'emplacement est d'utiliser `locate`

  ```
  $ locate mlocate.db
  /usr/share/man/man5/mlocate.db.5.gz
  /var/lib/mlocate/mlocate.db
  /var/lib/mlocate/mlocate.db.bwlFte
  ```

* La commande `locate` utilise une base de données pour effectuer ses recherches — c'est donc très rapide. Cette base de données s'appelle mlocate.db et est généralement mise à jour quotidiennement.

  Un fichier crée après la dernière mise à jour BDD ne figurera pas dans les résultats. Pour le retrouver avec locate, déclencher une mise à jour de la BDD manuellement avec `updatedb` (nécessite les droits root)

  ```
  $ touch newword.txt
  $ locate newword.txt

  $ sudo updatedb
  $ locate newword.txt
  /home/am/Documents/newword.txt
  ```

* Le fichier de configuration <ins>/etc/updatedb.conf</ins> est utilisé pour sélectionner les répertoires à inclure ou ignorer dans la base de données mlocate (dans la variable PRUNEPATHS). On peut également ignorer des types de systèmes de fichiers (PRUNEFS).

  ``` bash
  $ cat /etc/updatedb.conf
  PRUNE_BIND_MOUNTS="yes"
  # PRUNENAMES=".git .bzr .hg .svn"
  PRUNEPATHS="/tmp /var/spool /media /var/lib/os-prober /var/lib/ceph /home/.ecryptfs /var/lib/schroot"
  PRUNEFS="NFS afs autofs binfmt_misc ceph cgroup cgroup2 cifs coda configfs curlftpfs debugfs devfs devpts devtmpfs ecryptfs ftpfs fuse.ceph fuse.cryfs fuse.encfs fuse.glusterfs fuse.gvfsd-fuse fuse.mfs fuse.rozofs fuse.sshfs fusectl fusesmb hugetlbfs iso9660 lustre lustre_lite mfs mqueue ncpfs nfs nfs4 ocfs ocfs2 proc pstore rpc_pipefs securityfs shfs smbfs sysfs tmpfs tracefs udev udf usbfs"
  ```

### find

* Tandis que `locate` a l'avantage d'être rapide,  `find` a l'avantage d'être flexible.  
  Spécifier le répertoire de départ, find cherchera résursivement dans tous les sous-répertoires les fichiers qui répondent au(x) critère(s) demandé(s)

  ```
  $ find ~ -name newword.txt
  /home/am/Documents/newword.txt
  ```

  ```
  $ find ~ -regex .*word.txt
  /home/am/Documents/newword.txt
  /home/am/Documents/word.txt
  ```

* find a de nombreuses options disponibles:  
  [Options find](utility-find.md)

### grep

* Pour trouver les fichiers en fonction des données qu'ils contiennent, on utilise [grep](file-text-utils.md#grep)

---

## Utiliser le résultat

### find

* On peut utiliser l'option `-exec` de find

  ``` bash
  # Recopier les fichiers crées aujourd'hui dans /mnt
  find . -ctime 0 -exec cp -v {} /mnt \;
  ```

### xargs

* On peut utiliser `xargs` pour transformer stdin en argument  

  ``` bash
  # Récupèrer l'ensemble des lignes qui se situent entre START et END (multiligne)
  # dans les fichiers du répertoire "logs" 
  find logs -type f | xargs awk '/START/,/END/ {printf "%-4s", FILENAME ":" NR ": "; print}'
  ```

  ``` bash
  find . -type f -print0 | xargs -0 grep -n "texteRecherche"
  ```

* `-n1` pour répéter la commande pour chaque résultat (plutôt que de passer l'ensemble en paramètre)  
  `-I` PLACEHOLDER pour utiliser un placeholder (plutôt que d'ajouter la valeur à la fin)

  ``` bash
  $ ls /proc | grep '^[a-z]' | head -3 | xargs echo -
  - acpi asound buddyinfo
  $
  $ ls /proc | grep '^[a-z]' | head -3 | xargs -n1 echo -
  - acpi
  - asound
  - buddyinfo
  $
  $ ls /proc | grep '^[a-z]' | head -3 | xargs -n1 -I {} echo "-{}"
  -acpi
  -asound
  -buddyinfo
  ```

### for

* On peut utiliser une boucle `for` pour boucler sur les résultats

  ``` bash
  files=(lib/*)

  for file in "${files[@]}"; do
    echo "-"$file;
  done
  ```

  ``` bash
  IFS=$'\n'

  # split ':' => '\n'
  LIST=(${PATH//:/$'\n'})

  for file in "${LIST[@]}"; do
    echo $file
  done
  ```

  ``` bash
  for file in `find dist -type f | egrep '(html|css|js|map)$'`; do
    sed -i 's/"\/assets/"\/static\/assets/g' $file;
  done
  ```
