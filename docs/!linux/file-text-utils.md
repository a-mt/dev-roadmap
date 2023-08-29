---
title: Manipuler des fichiers texte
category: Linux, Fichiers
---

## cat

* `cat` permet d'afficher le contenu d'un fichier texte

  ``` bash
  $ cat /etc/timezone
  Europe/Paris
  ```

  Pour afficher les caractères spéciaux:  
  -v : caractères de contrôle ([)  
  -e : caractères de fin de ligne ($)  
  -t : tabulations (^)  

  ``` bash
  $ echo -e '\E[47;34m\033[1m'E'\033[0m'$'a\tb\nc' > filename

  $ cat filename
  𝗘a  b
  c

  $ cat -vet filename
  ^[[47;34m^[[1mE^[[0ma^Ib$
  c$
  ```

## nl

* `nl` permet d'afficher le contenu d'un fichier texte en numérotant les lignes

  ``` bash
  $ nl /etc/passwd
       1  root:x:0:0:root:/root:/bin/bash
       2  daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
       3  bin:x:2:2:bin:/bin:/usr/sbin/nologin
       4  sys:x:3:3:sys:/dev:/usr/sbin/nologin
       5  sync:x:4:65534:sync:/bin:/bin/sync
       6  games:x:5:60:games:/usr/games:/usr/sbin/nologin
       7  man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
       8  lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
       9  mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
  ```

* Par défaut, les lignes vides ne sont pas numérotées.  
  L'option `-b` (body-numbering) permet de modifier ce comportement.
  (t par défaut)

  ``` diff
   $ echo -e "Hello\n\nWorld" > file
   $
  -$ nl file
        1  Hello
  -       
        2  World
   $
  +$ nl --body-numbering=a file
        1  Hello
  +     2  
        3  World
  ```

* `-s` (number-separator) permet de modifier le suffixe après le numéro des lignes.
  (tabulation par défaut)

  ``` bash
  # suffix
  $ nl -s ') ' file
     1) Hello
        
     2) World
  ```

* `-n` (number-format) permet de modifier l'alignement des numéros.
  (rn par défaut)

  ``` bash
  # Right Justified, Leading Zeros ( rz )
  $ nl -n rz file
  000001  Hello
         
  000002  World

  # Left Justified, No Leading Zeros ( ln )
  $ nl -n ln file
  1       Hello
         
  2       World
  ```

* `-w` de modifier le nombre de chiffres.
  (6 par défaut)

  ``` bash
  $ nl -n rz -w 2 file
  01  Hello
     
  02  World
  ```

## head

* `head` permet d'afficher les premières lignes d'un fichier texte  

  ``` bash
  $ head /var/log/apt/term.log

  Log started: 2022-07-04  19:08:55
  (Reading database ... 390086 files and directories currently installed.)
  Preparing to unpack .../login_1%3a4.5-1ubuntu2.3_amd64.deb ...
  Unpacking login (1:4.5-1ubuntu2.3) over (1:4.5-1ubuntu2.2) ...
  Setting up login (1:4.5-1ubuntu2.3) ...
  (Reading database ... 390086 files and directories currently installed.)
  Preparing to unpack .../0-libcurl3-gnutls_7.58.0-2ubuntu3.19_amd64.deb ...
  Unpacking libcurl3-gnutls:amd64 (7.58.0-2ubuntu3.19) over (7.58.0-2ubuntu3.18) ...
  Preparing to unpack .../1-curl_7.58.0-2ubuntu3.19_amd64.deb ...
  ```

* `-n` permet de modifier le nombre de lignes affichées (10 par défaut)

  ``` bash
  $ sudo nl --body-numbering=a /var/log/apt/term.log | head -n 5
       1  
       2  Log started: 2023-08-05  20:41:24
  (Reading database ... 173249 files and directories currently installed.)
       4  Preparing to unpack .../libatomic1_10.5.0-1ubuntu1~20.04_amd64.deb ...
       5  Unpacking libatomic1:amd64 (10.5.0-1ubuntu1~20.04) over (10.3.0-1ubuntu1~20.04) ...
  ```

## tail

* `tail` permet d'afficher les dernières lignes d'un fichier texte.  
  L'option `-n` permet de modifier le nombre de lignes affichées (10 par défaut)

  ``` bash
  $ tail -n 5 /var/log/kern.log
  Jul 21 18:04:35 am-XPS-13-7390 kernel: [49604.924885] pci_bus 0000:3b: Allocating resources
  Jul 21 18:04:35 am-XPS-13-7390 kernel: [49604.924976] pci_bus 0000:05: Allocating resources
  Jul 21 18:04:35 am-XPS-13-7390 kernel: [49604.924995] pci_bus 0000:3b: Allocating resources
  Jul 21 18:04:35 am-XPS-13-7390 kernel: [49604.925086] pci_bus 0000:05: Allocating resources
  Jul 21 18:04:35 am-XPS-13-7390 kernel: [49604.925104] pci_bus 0000:3b: Allocating resources
  ```

* L'option `-f` permet d'afficher les dernières lignes puis afficher les nouveaux messages au fur et à mesure qu'ils arrivent.  
  Ctrl+C pour arrêter le processus

## more

* Pour consulter le contenu d'un gros fichier, la meilleure manière de parcourir les lignes
  est d'utiliser un utilitaire de pagination (dit *pager* en anglais).

* `more` est un pager très simple.  
  Une fois lancé, il affiche la première page — une page correspond à suffisamment de texte pour remplir l'écran.  
  Un pourcentage s'affiche en bas de l'écran, qui est la progression dans le fichier.

  ``` bash
  $ more /var/log/boot.log
  ```

* On peut avancer dans le fichier une page à la fois avec la barre espace.  
  Ou une seule ligne à la fois avec la touche Entrée.  

* Avec more, une fois qu'on a avancé, on ne peut plus revenir en arrière.  
  Et une fois à la fin du fichier, la commande est terminée — on a de nouveau le prompt.

## less

* `less` est un pager plus récent, qui offre plus de fonctionnalités, mais il n'est pas inclus dans toutes les distributions Linux, contrairement à `more`. Il tire son nom de "less is more".
  Tout comme `more`, une fois lancé, il montre la première page. 

  ``` bash
  $ sudo less /var/log/boot.log
  ```

- On peut avancer une ligne à la fois avec Entrée ou la flèche vers le bas (`↓`).  
  Pour remonter d'une ligne, utiliser la flèche vers le haut (`↑`).

- On peut avancer une page à la fois avec espace ou page suivante (`⇟`).  
  Pour remonter d'une page, utiliser `b` (back) ou page précédente (`⇞`).

- On peut avancer d'une demi-page avec `d` (demi)  
  Pour remonter d'une demi-page, utiliser `u` (undo demi)

- On peut effectuer une recherche en tapant `/` suivit du motif à chercher et Entrée.  
  Pour effectuer une recherche en sens inverse, utiliser `?` suivit du motif et Entrée.

<!-- -->

- Utiliser `h` pour voir toutes les informations d'aide.
- Une fois à la fin du fichier, on peut remonter vers le haut ou presser `q` pour quitter.

* Les pages de manuel utilisent less

## wc

* `wc` (word count) permet d'afficher le nombre de lignes, mots et octets d'un fichier texte

  ``` bash
  $ wc /etc/passwd
  41 70 2426 /etc/passwd
  ```

* -l (line) pour ne récupérer que le nombre de lignes

  ``` bash
  $ wc -l /etc/passwd
  41 /etc/passwd
  ```

* -w (word) pour le nombre de mots

  ``` bash
  $ wc -w /etc/passwd
  70 /etc/passwd
  ```

* -c (characters) pour le nombre d'octets.  
  Notons qu'en ASCII et UTF-8, un octet = un caractère. Mais si le fichier contient des caractères sur plusieurs octets, alors le nombre d'octets retourné ne représente pas le nombre de caractères. 

  ``` bash
  $ wc -c /etc/passwd
  2426 /etc/passwd
  ```

* -m (multibytes) pour le nombre de caractères.  
  Prend en compte les caractères sur plusieurs octets

  ``` bash
  $ echo "Page down: ⇟. Page up: ⇞." > file
  $ wc -c file
  30 file
  $ wc -m file
  26 file
  ```

## split

* `split` permet de séparer un gros fichier en plusieurs plus petits fichiers.

  - Argument: par défaut le préfixe est "x",
    on peut spécifier un autre préfixe en argument
  - Option `-d`: par défaut split numérote les fichiers avec les lettres de l'alphabet (file_aa, file_ab, etc),  
    on peut utiliser un suffixe numérique à la place (file_01, file_02, etc)
  - Option `-a N`: spécifie la longueur du suffixe (par défaut 2)  
  - Option `-l N`: spécifie le nombres de lignes dans chaque fichier

  ``` bash
  $ wc -l /var/log/kern.log
  13138 /var/log/kern.log

  $ split -l 1000 -d -a 2 /var/log/kern.log kern_
  $ ls -l
  total 1400
  -rw-rw-r-- 1 am am 107508 juil. 21 20:33 kern_00
  -rw-rw-r-- 1 am am 103087 juil. 21 20:33 kern_01
  -rw-rw-r-- 1 am am 108839 juil. 21 20:33 kern_02
  -rw-rw-r-- 1 am am 108693 juil. 21 20:33 kern_03
  -rw-rw-r-- 1 am am 108912 juil. 21 20:33 kern_04
  -rw-rw-r-- 1 am am 106404 juil. 21 20:33 kern_05
  -rw-rw-r-- 1 am am 114918 juil. 21 20:33 kern_06
  -rw-rw-r-- 1 am am 111301 juil. 21 20:33 kern_07
  -rw-rw-r-- 1 am am 105822 juil. 21 20:33 kern_08
  -rw-rw-r-- 1 am am 106223 juil. 21 20:33 kern_09
  -rw-rw-r-- 1 am am 102236 juil. 21 20:33 kern_10
  -rw-rw-r-- 1 am am 108284 juil. 21 20:33 kern_11
  -rw-rw-r-- 1 am am 101509 juil. 21 20:33 kern_12
  -rw-rw-r-- 1 am am  13429 juil. 21 20:33 kern_13
  ```

* Note: pour rassembler plusieurs petits fichiers, on peut simplement utiliser cat et une redirection de sortie

  ``` bash
  $ cat * > kern.log
  -rw-rw-r-- 1 am am 1407165 juil. 21 20:37 kern.log
  ```

## cut

* `cut` est utilisée pour travailler avec des fichiers qui contiennent des données en colonnes, séparées par un délimiteur ou non. On peut extraire les données de ces colonnes

  * -d pour spécifier le(s) délimiteur(s) à utiliser  
    Par défaut, cut utilise le caractère Tab

  * -f pour spécifier les champs à afficher  
    Pour afficher plusieurs champs, utiliser

    - la virgule pour ET: `1,3` = les champs 1 et 3
    - le tiret pour DE..À: `1-3` = les champs 1 à 3
    - ou les deux: `1,3-5,7` = les champs 1, 3 à 5, et 7

    ``` bash
    $ cut -d: -f1,6 /etc/passwd | head
    root:/root
    daemon:/usr/sbin
    bin:/bin
    sys:/dev
    sync:/bin
    games:/usr/games
    man:/var/cache/man
    lp:/var/spool/lpd
    mail:/var/mail
    news:/var/spool/news

    $ getent group docker | cut -d: -f3
    1001
    ```

  * -c pour extraire les données en fonction de la position des caractères

    ``` bash
    # Caractères de 1 à 10
    $ cut -c1-10 /etc/passwd
    root:x:0:0
    daemon:x:1
    bin:x:2:2:
    sys:x:3:3:
    sync:x:4:6
    games:x:5:
    ```

## tr

* `tr` permet de remplacer un caractère par un autre.  
  tr prend stdin en entrée et n'accepte pas de nom de fichier en argument

  ``` bash
  # Remplacer chaque deux-point par une tabulation
  $ tr : $'\t' < /etc/passwd
  root  x 0 0 root  /root /bin/bash
  daemon  x 1 1 daemon  /usr/sbin /usr/sbin/nologin
  bin x 2 2 bin /bin  /usr/sbin/nologin
  sys x 3 3 sys /dev  /usr/sbin/nologin
  sync  x 4 65534 sync  /bin  /bin/sync
  ```

## column

* `column` permet de présenter des données tabulaires (ex csv) en colonnes.  
  Ajoute des espaces de manière appropriée pour que les infos soient alignées

  ``` bash
  $ head /etc/passwd | column -s: -t
  root    x  0  0      root    /root            /bin/bash
  daemon  x  1  1      daemon  /usr/sbin        /usr/sbin/nologin
  bin     x  2  2      bin     /bin             /usr/sbin/nologin
  sys     x  3  3      sys     /dev             /usr/sbin/nologin
  sync    x  4  65534  sync    /bin             /bin/sync
  games   x  5  60     games   /usr/games       /usr/sbin/nologin
  man     x  6  12     man     /var/cache/man   /usr/sbin/nologin
  lp      x  7  7      lp      /var/spool/lpd   /usr/sbin/nologin
  mail    x  8  8      mail    /var/mail        /usr/sbin/nologin
  news    x  9  9      news    /var/spool/news  /usr/sbin/nologin
  ```

## uniq

* `uniq` permet de supprimer les lignes dupliquées.  
  Des lignes ne sont considérées comme dupliquées que si elles sont côte à côte.

  ``` diff
   $ echo "Hello" > word.txt
   $ echo "World" >> word.txt
   $ echo "World" >> word.txt
   $ echo "World" >> word.txt
   $ echo "Hello" >> word.txt 

   $ cat word.txt
   Hello
  -World
  -World
  -World
   Hello 

   $ uniq word.txt
   Hello
  +World
   Hello
  ```

* Afficher le nombre d'occurence: `-c`

  ``` bash
  $ uniq -c word.txt
      1 Hello
      3 World
      1 Hello
  ```

* N'afficher que les lignes dupliquées:  
  Une fois: `-d`

  ``` bash
  $ uniq -d word.txt
  World

  # + afficher le nombre d'occurences
  $ uniq -dc word.txt
      3 World
  ```

  Autant de fois qu'elle apparaissent: `-D`

  ``` bash
  $ uniq -D word.txt
  World
  World
  World
  ```

* Ignorer N champs au début de la ligne: `-f N`

  ``` diff
   $ echo '1 Hello A' > wordk.txt
   $ echo '2 World A' >> wordk.txt
   $ echo '3 World B' >> wordk.txt
   $ echo '4 World B' >> wordk.txt
   $ echo '5 Hello B' >> wordk.txt
   $ echo '6 World A' >> wordk.txt
   $ echo '7 ! A' >> wordk.txt 

  -$ cat wordk.txt
   1 Hello A
   2 World A
  -3 World B
  -4 World B
   5 Hello B
   6 World A
   7 ! A

  # Ignorer les numéros de ligne (1 caractère en début de ligne)
  +$ uniq -f 1 wordk.txt
   1 Hello A
   2 World A
  +3 World B
   5 Hello B
   6 World A
   7 ! A
  ```

## sort

* `sort` permet de trier les lignes

  ``` bash
  $ sort word.txt

  Hello
  Hello
  World
  World
  World
  World
  $ 
  $ sort word.txt | uniq -c
        1 
        2 Hello
        4 World
  ```

  [Plus sur sort](utility-sort.md)

## tac

* `tac` (nom inverse de cat) permet d'inverser l'ordre des lignes

  ``` bash
  $ sort -V file | tac
  file100
  file20
  file10
  file1
  ```

## grep

* `grep` permet de filtrer les lignes suivant un motif

  ``` bash
  $ grep root /etc/passwd
  root:x:0:0:root:/root:/bin/bash
  nm-openvpn:x:116:123:NetworkManager OpenVPN,,,:/var/lib/openvpn/chroot:/usr/sbin/nologin
  ```

  ``` bash
  # Récupèrer l'ensemble des lignes qui contiennent ERROR
  # dans les fichiers du répertoire "logs" 
  $ grep -rn 'ERROR' logs
  ./subdir/file:1:ERROR ma 2ème erreur
  ./file:2:ERROR mon erreur
  ```

  Le motif recherché est un regex — penser échapper les caractères interprétés par le shell (wildcards) s'il y en a

  ``` bash
  $ grep ^root /etc/passwd
  root:x:0:0:root:/root:/bin/bash
  ```

  [Plus sur grep](utility-grep.md)

## sed

* `sed` permet de remplacer un mot par un autre, ligne par ligne.  
  Par défaut, seul la première occurence sur chaque ligne est remplacée.  
  Ajouter le modifier `g` pour remplacer toutes les instances

  ``` bash
  $ echo "I love chocolate chocolate cake" > food.txt
  $ echo "I love chocolate vanilla cake" >> food.txt

  $ sed 's/chocolate/strawberry/' food.txt
  I love strawberry chocolate cake
  I love strawberry vanilla cake

  $ sed 's/chocolate/strawberry/g' food.txt
  I love strawberry strawberry cake
  I love strawberry vanilla cake
  ```

  [Plus sur sed](utility-sed.md)

## awk

* `awk` permet de chercher des motifs et formatter le résultat

  ``` bash
  cat <<'NOWDOC' > file
  a
  b
  START
  c
  d
  e
  END
  f
  g
  NOWDOC

  # Récupère les lignes entre START et END
  $ awk '/START/,/END/ {printf "%-4s", FILENAME ":" NR ": "; print}' file
  file:3: START
  file:4: c
  file:5: d
  file:6: e
  file:7: END
  ```

  [Plus sur awk](utility-awk.md)

## diff

* `diff` permet de voir les différences entre deux fichiers  
  Par défaut diff n'affiche que les différences, en utilisant la convention suivante:

  - **c** (change): changement  
    1c1 signifie que la ligne 1 du fichier à changé (entre file1 et file2)

    ``` bash
    $ echo "ab" > file1
    $ echo "abc" > file2
    $ diff file1 file2
    1c1
    < ab
    ---
    > abc
    ```

  - **a** (add): ajout  
    1a2 signifie que la ligne 2 a été ajoutée dans le deuxième fichier

    ``` bash
    $ echo "ab" > file1
    $ echo -e "ab\nac" > file2
    $ diff file1 file2
    1a2
    > ac
    ```

  - **d** (delete): suppression  
    2d1 signifie que la 2ème ligne du premier fichier a été supprimée

    ``` bash
    $ echo -e "ab\nac" > file1
    $ echo "ab" > file2
    $ diff file1 file2
    2d1
    < ac
    ```

* Il est possible d'afficher les différences côté à la place  

  `-y` pour afficher les différences côté à côte  
  `-W 50` pour espacer les deux colonnes de 50 espaces  
  `--suppress-common-lines` pour ne pas afficher les lignes identiques

  ``` bash
  $ diff -y -W 50 file1 file2
  ab      ab
  ac          <
  $
  $ diff -y -W 50 --suppress-common-lines file1 file2
  ac		      <
  ```

## paste

* `paste` permet de combiner des fichiers texte côte à côte, en colonnes  
  L'ordre des colonnes est déterminé par l'ordre des fichiers en argument  

  ``` bash
  $ cat alpha.txt
  alpha
  foxtrot
  charlie
  november
  sierra
  $
  $ cat numbers.txt
  1
  3
  10
  42
  7
  $
  $ paste alpha.txt numbers.txt
  alpha      1
  charlie    3
  foxtrot    10
  november   42
  sierra     7
  $
  $ paste numbers.txt alpha.txt
  1    alpha
  3    charlie
  10   foxtrot
  42   november
  7    sierra
  ```

* `-d` permet de spécifier le séparateur à utiliser (tabulation par défaut)

  ``` bash
  $ paste -d= alpha.txt numbers.txt 
  alpha=1
  foxtrot=3
  charlie=10
  november=42
  sierra=7
  ```

## join

* `join` permet de combiner des fichiers texte côte à côte en effectuant une jointure sur une colonne.  
  Les lignes doivent être dans le même ordre entre les deux fichiers

  - `-t` pour spécifier le séparateur (espace par défaut)

  - `-a1` pour un left join (inner join par défaut)    

  - `-12 -23` pour joindre sur le mot 2 du fichier 1 avec le mot 3 du fichier 2  
    (la jointure est effectuée sur le premier mot des deux fichiers par défaut, soit `-11 -21`)

  ``` bash
  $ sudo join -t: /etc/passwd /etc/shadow
  root:x:0:0:root:/root:/bin/bash:!:18753:0:99999:7:::
  daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin:*:18296:0:99999:7:::
  bin:x:2:2:bin:/bin:/usr/sbin/nologin:*:18296:0:99999:7:::
  sys:x:3:3:sys:/dev:/usr/sbin/nologin:*:18296:0:99999:7:::
  sync:x:4:65534:sync:/bin:/bin/sync:*:18296:0:99999:7:::
  games:x:5:60:games:/usr/games:/usr/sbin/nologin:*:18296:0:99999:7:::
  ```

  ``` bash
  $ { getent passwd | nl -s: -n rz; } >6

  $ join -t: <(cut -d: -f1,2 <6) <(cut -d: -f1,7 <6 | grep /home)
  000023:syslog:/home/syslog
  000032:cups-pk-helper:/home/cups-pk-helper
  000045:aurelie:/home/aurelie
  ```

## od

* `od` (octal dump) permet d'afficher le code octal d'un fichier binaire.  
  Le plus souvent, on utilise l'hexadécimal plutôt que l'octal pour examiner le contenu d'un code en binaire.

  ``` bash
  $ od /bin/cat | head
  0000000 042577 043114 000402 000001 000000 000000 000000 000000
  0000020 000003 000076 000001 000000 023420 000000 000000 000000
  0000040 000100 000000 000000 000000 100770 000000 000000 000000
  0000060 000000 000000 000100 000070 000011 000100 000034 000033
  0000100 000006 000000 000005 000000 000100 000000 000000 000000
  0000120 000100 000000 000000 000000 000100 000000 000000 000000
  0000140 000770 000000 000000 000000 000770 000000 000000 000000
  0000160 000010 000000 000000 000000 000003 000000 000004 000000
  0000200 001070 000000 000000 000000 001070 000000 000000 000000
  0000220 001070 000000 000000 000000 000034 000000 000000 000000
  ```

- `-Ax` pour afficher les adresses (à gauche) en hexadécimal
- `-t` pour modifier la manière dont le contenu est affiché

  - `z` en suffixe: afficher les caractères imprimables à la fin de chaque ligne
  - `c`: afficher les caractères imprimables ou code d'échappement
  - `xN` pour afficher le contenu hexadécimal, en prenant N octets

  ``` bash
  $ od -A x -t x1z -v /bin/cat | head
  000000 7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00  >.ELF............<
  000010 03 00 3e 00 01 00 00 00 10 27 00 00 00 00 00 00  >..>......'......<
  000020 40 00 00 00 00 00 00 00 f8 81 00 00 00 00 00 00  >@...............<
  000030 00 00 00 00 40 00 38 00 09 00 40 00 1c 00 1b 00  >....@.8...@.....<
  000040 06 00 00 00 05 00 00 00 40 00 00 00 00 00 00 00  >........@.......<
  000050 40 00 00 00 00 00 00 00 40 00 00 00 00 00 00 00  >@.......@.......<
  000060 f8 01 00 00 00 00 00 00 f8 01 00 00 00 00 00 00  >................<
  000070 08 00 00 00 00 00 00 00 03 00 00 00 04 00 00 00  >................<
  000080 38 02 00 00 00 00 00 00 38 02 00 00 00 00 00 00  >8.......8.......<
  000090 38 02 00 00 00 00 00 00 1c 00 00 00 00 00 00 00  >8...............<
  ```

  ``` bash
  $ od -A x -t c -v /bin/cat | head
  000000 177   E   L   F 002 001 001  \0  \0  \0  \0  \0  \0  \0  \0  \0
  000010 003  \0   >  \0 001  \0  \0  \0 020   '  \0  \0  \0  \0  \0  \0
  000020   @  \0  \0  \0  \0  \0  \0  \0 370 201  \0  \0  \0  \0  \0  \0
  000030  \0  \0  \0  \0   @  \0   8  \0  \t  \0   @  \0 034  \0 033  \0
  000040 006  \0  \0  \0 005  \0  \0  \0   @  \0  \0  \0  \0  \0  \0  \0
  000050   @  \0  \0  \0  \0  \0  \0  \0   @  \0  \0  \0  \0  \0  \0  \0
  000060 370 001  \0  \0  \0  \0  \0  \0 370 001  \0  \0  \0  \0  \0  \0
  000070  \b  \0  \0  \0  \0  \0  \0  \0 003  \0  \0  \0 004  \0  \0  \0
  000080   8 002  \0  \0  \0  \0  \0  \0   8 002  \0  \0  \0  \0  \0  \0
  000090   8 002  \0  \0  \0  \0  \0  \0 034  \0  \0  \0  \0  \0  \0  \0
  ```
