---
title: Lister
category: Linux, Fichiers
---

### ls -F (classify)

* Ajoute un symbole, appelé *indicateur de classification*, derrière certains type de fichiers pour indiquer de quel type de fichier il s'agit. On trouve notamment:

  * `/` = répertoire
  * `*` = fichier exécutable
  * `@` = lien symbolique

  ```
  $ ls -F
  Desktop/ Documents/ Downloads/ Music/ Pictures/ Public/ Templates/ Videos/
  ```

### ls -1 (one file per line)

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

### ls -R (resursive)

* Permet d'afficher les fichiers récursivement — c'est à dire les fichiers du répertoire courants, ainsi que les fichiers de sous-répertoires, et ainsi de suite.

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

  - par taille: -S (size)

    ```
    $ ls -lhS
    ```

  - par date de modification: -t (time)  
    Pour des informations plus détaillés sur l'heure de modification,  
    utiliser `--full-time` ou `--time-style=[full-iso|long-iso|iso|locale|+FORMAT]`

    ```
    $ ls -lt --time-style=long-iso
    ```

- On peut inverser le tri avec -r (reverse)

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

* Le moyen le plus simple de retrouver un fichier dont vous ne savez pas l'emplacement, est d'utiliser la commande `locate`

  ```
  $ locate mlocate.db
  /usr/share/man/man5/mlocate.db.5.gz
  /var/lib/mlocate/mlocate.db
  /var/lib/mlocate/mlocate.db.bwlFte
  ```

* locate utilise une base de données pour effectuer ses recherches — c'est donc très rapide. Cette base de données s'appelle mlocate.db et est généralement mise à jour quotidiennement.

  Un fichier crée après la dernière mise à jour BDD figurera pas dans les résultats. Pour le retrouver avec locate, déclencher une mise à jour de la BDD avec `updatedb` (nécessite les permissions root)

  ```
  $ touch newword.txt
  $ locate newword.txt

  $ sudo updatedb
  $ locate newword.txt
  /home/am/Documents/newword.txt
  ```

* Le fichier de configuration /etc/updatedb.conf est utilisé pour sélectionner les répertoires à inclure ou ignorer dans la base de données mlocate (PRUNEPATHS). On peut également ignorer des types de systèmes de fichiers (PRUNEFS).

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

* find a de nombreuses options disponibles. Parmis les plus courantes:

  | Option | Description
  |---     |---
  | -cmin *minutes* | Fichiers dont le status a changé il y a tant de *minutes*
  | -mmin *minutes* | Fichiers dont le contenu a changé il y a tant de *minutes*
  | -user *username* | Fichiers qui appartiennent à l'utilisateur *username*
  | -group *groupname* | Fichiers qui appartiennent au groupe *groupname*
  | -perm *permissions* | Fichiers qui ont les permissions *permissions*
  | -empty | Fichiers vides
  | -size *filesize* | Fichier ayant une taille de *filesize*
  | -name *filename* | Fichiers nommés *filename* (sensible à la casse)
  | -iname *filename* | Fichiers nommés *filename* (insensible à la casse)
  | -regex *regex* | Fichiers dont le nom matche *regex*

  * -maxdepth permet de limiter le nombre de récursion.  

    ``` bash
    # Ne rechercher que dans le répertoire /etc (et non les sous-répertoires)
    find /etc -maxpdeth 1 -name passwd
    ```

  * -not permet d'inverser une recherche  

    ``` bash
    # Les fichiers qui n'ont pas été modifiés depuis $date (timestamp)
    find . -type f -not -newermt "$date"
    ```

  * -mtime permet de chercher des fichiers en fonction de leur date de modification (ex: modification du contenu), par périodes de 24 heures  
    et -ctime en fonction de leur date de changement de statut (ex: modification des permissions)

    n  : il y a n jours  
    +n : il y a plus de n jours  
    -n : il y a moins de n jours  

    ``` bash
    $ touch file0
    $ touch file1 -d "1 day ago"
    $ touch file2 -d "2 days ago"
    $ touch file3 -d "3 days ago"

    # Les fichiers modifiés aujourd'hui
    $ find . -type f -mtime 0
    ./file0

    # Les fichiers modifiés il y a plus d'un jour
    $ find . -type f -mtime +1
    ./file3
    ./file2

    # Les fichiers crées aujourd'hui
    $ find . -type f -ctime 0
    ./file3
    ./file1
    ./file0
    ./file2
    ```

  * -mmin, même principe mais en minutes

    ``` bash
    find -mmin 5       # modified 5 minutes ago
    find -mmin -5      # modified less than 5 minutes ago
    find -mmin +5      # modified more than 5 minutes ago
    ```

  * -size par taille

    ``` bash
    find -size 512k
    find -size +512k   # greater than 512 kb
    find -size -512k   # less than 512 kb
    ```

  * -perm permet de filtrer par permission  
    On peut également utiliser -executable

    ``` bash
    $ find -perm 664              # exactly 664
    $ find -perm u=rw,g=rw,o=r    # exactly 664

    $ find -perm -664             # at least 664
    $ find -perm -u=rw,g=rw,o=r   # at least 664

    $ find -perm /664             # any of these permissions
    $ find -perm /u=rw,g=rw,o=r   # any of these permissions

    # Les fichiers avec SUID et SGID
    $ sudo find /usr/*bin -perm /6000 -type f
    /usr/bin/gpasswd
    ...

    # Les fichiers executables par l'utilisateur en cours
    $ sudo find /usr/bin -executable
    /usr/bin
    ...
    ```

  * -print -quit pour s'arrêter au premier résultat

    ```
    find ... -print -quit
    ```

    -printf pour modifier le format du résultat

    ``` bash
    $ find /tmp -name '*.txt'
    /tmp/imap-ports.txt
    /tmp/index.txt

    $ find /tmp -name '*.txt' -printf '%p: %s\n'
    /tmp/imap-ports.txt: 8
    /tmp/index.txt: 325

    $ find /tmp -name '*.txt' -printf '%P\n'
    imap-ports.txt
    index.txt
    ```

    ```
    %n nombre de liens (hard links) vers le fichier
    %p nom du fichier
    %P nom du fichier sans path
    %s taille du fichier
    %t date de dernière modification
    ```

  * find applique une logique ET, pour appliquer une logique OU utiliser -o.  
    On peut également appliquer un NON avec -not

    ``` bash
    find -name "f*" -size 512k     # AND Operator
    find -name "f*" -o -size 512k  # OR Operator
    find -not -name "f*"           # NOT Operator
    ```

### grep

* On peut utiliser grep pour lire tous les fichiers d'un répertoire, récursivement, avec -r  
  -n pour afficher le numéro de la ligne

  ``` bash
  # Récupèrer l'ensemble des lignes qui contiennent ERROR
  # dans les fichiers du répertoire "logs" 
  $ grep -rn 'ERROR' logs
  ./subdir/file:1:ERROR ma 2ème erreur
  ./file:2:ERROR mon erreur
  ```

---

## Utiliser le résultat

### find

* L'option -exec de find permet d'effectuer une action sur chaque résultat de find (ligne par ligne)  
  L’option -exec doit se terminer par point-virgule (`;`) pour marquer la fin du paramètre: le point-virgule ayant une signification en shell, il faut l’échapper d’un anti-slash (`\`) pour qu’il soit interprété par la commande find et non par le shell.

  ``` bash
  find . -exec echo {}\;
  ```

  exec ne peut exécuter qu'une seule commande, pour en exécuter plusieurs, créer un script temporaire avec `sh -c`.

  ``` bash
  # Afficher le nom fichier puis son contenu
  find . -exec sh -c "echo {} && cat {}" \;
  ```

* -execdir fonctionne de la même manière que exec, à la différence près que la commande sera executée dans le répertoire contenant le résultat et non dans le répertoire en cours:

  ``` bash
  $ mkdir dir
  $ touch dir/file
  $
  $ find dir -type f -exec echo {} \;
  dir/file
  $
  $ find dir -type f -execdir echo {} \;
  ./file
  ```

  ``` bash
  # Chercher le contenu du répertoire "dirname" et archiver les résultats un à un (tar.gz)
  find dirname -execdir tar -cxf {}.tar.gz {} \;
  ```

* -ok fonctionne de la même manière que exec mais, à chaque résultat, demande la confirmation avant d'exécuter la commande (y = oui, tout autre caractère = non)

  ``` bash
  find dirname -ok rm {} \;
  ````

### xargs

* On peut utiliser `xargs` pour utiliser le résultat d'un filtre sur les fichiers

  ``` bash
  # Récupèrer l'ensemble des lignes qui se situent entre START et END (multiligne)
  # dans les fichiers du répertoire "logs" 
  find logs -type f | xargs awk '/START/,/END/ {printf "%-4s", FILENAME ":" NR ": "; print}'
  ```

  ``` bash
  find . -type f -print0 | xargs -0 grep -n "texteRecherche"
  ```

* -n1 pour répéter la commande pour chaque résultat (plutôt que de passer l'ensemble en paramètre)
  -I PLACEHOLDER pour utiliser un placeholder (plutôt que d'ajouter la valeur à la fin)

  ```
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

* Ou alors une boucle `for`

  ``` bash
  files=(lib/*)

  for file in "${files[@]}";
    do echo "-"$file;
  done
  ```

  ``` bash
  for file in `find dist -type f | egrep '(html|css|js|map)$'`;
      do sed -i 's/"\/assets/"\/static\/assets/g' $file;
  done
  ```

