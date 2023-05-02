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
  -v : caractères de contrôle  
  -e : caractères de fin de ligne ($)  
  -t : tabulations (^)  

  ``` bash
  $ cat -vet filename
  ```

## nl

* `nl` permet d'afficher le contenu d'un fichier texte et les numéros de ligne

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

  Par défaut, les lignes vides ne sont pas numérotées

  ``` bash
  $ echo "Hello" > file
  $ echo "" >> file
  $ echo "World" >> file
  $
  $ nl file
       1  Hello
         
       2  World
  $
  $ nl --body-numbering=a file
       1  Hello
       2  
       3  World

  # suffix
  $ nl -s ') ' file
     1) Hello
        
     2) World

  # Right Justified, Leading Zeros ( rz )
  $ nl -n rz file
  000001  Hello
         
  000002  World

  # Left Justified, No Leading Zeros ( ln )
  $ nl -n ln file
  1       Hello
         
  2       World
  ```

## head

* `head` permet d'afficher les premières lignes d'un fichier texte  
  L'option -n peut être utilisée pour indiquer le nombre de lignes à afficher (10 par défaut)

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

## tail

* `tail` permet d'afficher les dernières lignes d'un fichier texte  
  -n pour modifier le nombre (10 par défaut)

  ``` bash
  $ tail -n 5 /var/log/kern.log
  Jul 21 18:04:35 am-XPS-13-7390 kernel: [49604.924885] pci_bus 0000:3b: Allocating resources
  Jul 21 18:04:35 am-XPS-13-7390 kernel: [49604.924976] pci_bus 0000:05: Allocating resources
  Jul 21 18:04:35 am-XPS-13-7390 kernel: [49604.924995] pci_bus 0000:3b: Allocating resources
  Jul 21 18:04:35 am-XPS-13-7390 kernel: [49604.925086] pci_bus 0000:05: Allocating resources
  Jul 21 18:04:35 am-XPS-13-7390 kernel: [49604.925104] pci_bus 0000:3b: Allocating resources
  ```

  L'option -f permet d'afficher les dernières lignes et d'afficher les nouveaux messages au fur et à mesure qu'ils arrivent. Ctrl+C pour arrêter le processus

## more

* Pour consulter le contenu d'un gros fichier, la meilleure manière de parcourir les lignes est d'utiliser un utilitaire de pagination (dit *pager* en anglais).

* `more` est un pager très simple

  ``` bash
  $ more /var/log/boot.log
  ```

  Une fois lancé, il montre la première page — une page correspond à suffisamment de texte pour remplir l'écran. Un pourcentage s'affiche en bas de l'écran, qui est la progression dans le fichier.

  * On peut avancer dans le fichier une page à la fois avec la barre espace.  
  * Ou une seule ligne à la fois avec la touche Entrée.  
    Avec more, une fois qu'on a avancé, on ne peut plus revenir en arrière.  
  * Une fois à la fin du fichier, la commande est terminée — on a de nouveau le prompt.

## less

* `less` est un pager plus récent, qui offre plus de fonctionnalités, mais n'est pas incluse dans toutes les distributions Linux — contrairement à `more`. Il tire son nom de "less is more".

  ``` bash
  $ sudo less /var/log/boot.log
  ```

  Tout comme `more`, une fois lancé, il montre la première page. 

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

* -w (word) pour ne récupérer que le nombre de mots

  ``` bash
  $ wc -w /etc/passwd
  70 /etc/passwd
  ```

* -c (characters) pour ne récupérer que le nombre d'octets  
  Notons qu'en ASCII et UTF-8, un octet = un caractère. Si le fichier contient des caractères sur plusieurs octets, alors le nombre d'octets (retourné) ne représente pas le nombre de caractères. 

  ``` bash
  $ wc -c /etc/passwd
  2426 /etc/passwd
  ```

* -m (multibytes) pour récupérer le nombre de caractères  
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
  Par défaut le préfixe est "x"

  -d  : utiliser un suffixe numérique (par défaut alphabétique : file_aa, file_ab, etc)  
  -a N: longueur du suffixe (par défaut 2)  
  -l N: nombres de lignes à mettre dans un fichier avant d'en créer un nouveau  

  ``` bash
  $ wc -l /var/log/kern.log
  13138 /var/log/kern.log

  $ split -l 1000 -d /var/log/kern.log kern_
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

* `cut` est utilisée pour travailler avec des fichiers qui contiennent des colonnes séparées par un délimiteur. Elle permet d'extraire certaines colonnes

  * -d pour spécifier le(s) délimiteur(s) à utiliser  
    Par défaut, cut utilise le caractère Tab

  * -f pour spécifier les champs à afficher  
    Pour afficher plusieurs champs, utiliser

    - la virgule: `1,3` pour les champs 1 et 3
    - ou le tiret: `1-3` pour les champs 1 à 3
    - ou les deux: `1,3-5,7`

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
  $
  $ getent group docker | cut -d: -f3
  1001
  $
  ```

* -c pour extraire les colonnes en fonction de la position des caractères

  ``` bash
  $ cut -c1-10 /etc/passwd
  root:x:0:0
  daemon:x:1
  bin:x:2:2:
  sys:x:3:3:
  sync:x:4:6
  games:x:5:
  ```

## tr

* `tr` permet de remplacer un caractère par un autre  
  tr n'accepte pas de nom de fichier en argument, uniquement stdin en entrée

  ``` bash
  $ tr : $'\t' < /etc/passwd
  root  x 0 0 root  /root /bin/bash
  daemon  x 1 1 daemon  /usr/sbin /usr/sbin/nologin
  bin x 2 2 bin /bin  /usr/sbin/nologin
  sys x 3 3 sys /dev  /usr/sbin/nologin
  sync  x 4 65534 sync  /bin  /bin/sync
  ```

## column

* `column` permet de créer présenter l'info en colonnes  
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

* `uniq` permet de supprimer les lignes dupliquées  
  Des lignes sont considérées comme dupliquées si elles sont côte à côte.

  ``` bash
  $ echo "Hello" > word.txt
  $ echo "World" >> word.txt
  $ echo "World" >> word.txt
  $ echo "World" >> word.txt
  $ echo "Hello" >> word.txt
  $
  $ cat word.txt
  Hello
  World
  World
  World
  Hello
  $
  $ uniq word.txt
  Hello
  World
  Hello
  ```

* -c pour récupérer le nombre d'occurence

  ``` bash
  $ uniq -c word.txt
      1 Hello
      3 World
      1 Hello
  ```

* -d pour n'afficher que les lignes dupliquées, une fois

  ``` bash
  $ uniq -d word.txt
  World
  $
  $ uniq -dc word.txt
      3 World
  ```

 * -D pour n'afficher que les lignes dupliquées, autant de fois qu'elle apparaissent

  ``` baqh
  $ uniq -D word.txt
  World
  World
  World
  ```

* -f pour ignorer N champs au début de la ligne

  ``` bash
  $ echo '1 Hello A' > wordk.txt
  $ echo '2 World A' >> wordk.txt
  $ echo '3 World B' >> wordk.txt
  $ echo '4 World B' >> wordk.txt
  $ echo '5 Hello B' >> wordk.txt
  $ echo '6 World A' >> wordk.txt
  $ echo '7 ! A' >> wordk.txt
  $ cat wordk.txt
  1 Hello A
  2 World A
  3 World B
  4 World B
  5 Hello B
  6 World A
  7 ! A
  $ uniq -f 1 wordk.txt
  1 Hello A
  2 World A
  3 World B   <-
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

* L'option -n permet d'effectuer un tri numérique  
  et -V d'effectuer un tri naturel (alphabétique sur les caractères alphabétiques et numérique sur les caractères numériques).

  ``` bash
  $ echo -e "1. A\n20. B\n10. C\n100. D" > file
  $ cat file
  1. A
  20. B
  10. C
  100. D
  $
  $ sort file
  100. Z
  10. W
  1. A
  20. Q
  $
  $ sort -n file
  1. A
  10. W
  20. Q
  100. Z
  ```

  ``` bash
  $ echo -e "file1\nfile20\nfile10\nfile100" > file
  $ cat file
  file1
  file20
  file10
  file100
  $
  $ sort file
  file1
  file10
  file100
  file20
  $
  $ sort -n file  # échoue puisque f n'est pas numérique
  file1
  file10
  file100
  file20
  $
  $ sort -V file  # fonctionne correctement
  file1
  file10
  file20
  file100
  ```

* sort peut réorganiser la sortie en fonction du contenu d'un ou plusieurs champs, déterminés par un délimiteur.

  * -t pour spécifier le séparateur de champs.

  * -k pour spécifier le numéro du champ à premier duquel trier les lignes.  
    On peut utiliser une virgule pour s'arrêter avant la fin de la ligne  

    Exemple: -k2 trie à partir de la colonne 2 (et colonne 3, 4 etc...),  
    tandis que -k2,2 trie uniquement sur la colonne 2

  ``` bash
  $ getent passwd | sort -n -t: -k3
  root:x:0:0:root:/root:/bin/bash
  daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
  bin:x:2:2:bin:/bin:/usr/sbin/nologin
  sys:x:3:3:sys:/dev:/usr/sbin/nologin
  sync:x:4:65534:sync:/bin:/bin/sync
  ```

  ``` bash
  $ cat wordk.txt
  1 Hello A
  2 World A
  3 World B
  4 World B
  5 Hello B
  6 World A
  $ sort -k2 wordk.txt
  7 ! A
  1 Hello A
  5 Hello B
  2 World A
  6 World A
  3 World B
  4 World B
  $ sort -k2,2 wordk.txt
  7 ! A
  1 Hello A
  5 Hello B
  2 World A
  3 World B   <-
  4 World B
  6 World A   <-
  ```

* -u pour appliquer uniq sur les champs utilisés dans le tri

  ``` bash
  $ cat wordk.txt
  1 Hello A
  2 World A
  3 World B
  4 World B
  5 Hello B
  6 World A
  7 ! A
  $ sort -k2 wordk.txt
  7 ! A
  1 Hello A
  5 Hello B
  2 World A
  6 World A
  3 World B
  4 World B
  $ sort -k2 -u wordk.txt
  7 ! A
  1 Hello A
  5 Hello B
  2 World A
  3 World B
  $ sort -k2,2 -u wordk.txt
  7 ! A
  1 Hello A
  2 World A
  ```

* -f pour ignorer la casse

  ``` bash
  $ echo '8 World a' >> wordk.txt

  $ sort -k3 -u wordk.txt
  8 World a
  1 Hello A
  3 World B

  $ sort -k3 -uf wordk.txt
  1 Hello A
  3 World B
  ```

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

* `grep` permet de filtrer des lignes suivant un motif

  ``` bash
  $ grep root /etc/passwd
  root:x:0:0:root:/root:/bin/bash
  nm-openvpn:x:116:123:NetworkManager OpenVPN,,,:/var/lib/openvpn/chroot:/usr/sbin/nologin
  ```

  Le motif recherché est un regex (penser échapper les caractères interprétés par le shell s'il y en a)

  ``` bash
  $ grep ^root /etc/passwd
  root:x:0:0:root:/root:/bin/bash
  ```

* Quelques options utiles:

  * <u>-F</u> (fixed strings) pour désactiver les regex  
    Note: anciennement, plutôt que `grep -F` on utilisait `fgrep`, désormais déprécié

    ``` bash
    $ touch file1 file2 file.
    $ ls | grep file.
    file.
    file1
    file2
    $ ls | grep -F file.
    file.
    ```

  * <u>-E</u> (extended regex) pour utiliser des regex étendues  
    Note: anciennenment, plutôt que `grep -E` on utilisait `egrep`, désormais déprécié

    ``` bash
    $ ls | grep -E '(html|css|js|map)$'
    tmp.html
    tmp.js
    ```

  * <u>-v</u> (invert) pour faire recherche inversée (exclure les lignes qui contiennent un motif)    
    <u>-i</u> (insensitive) pour un motif insensible à la casse

    ``` bash
    $ grep -vi NOLOGIN /etc/passwd
    root:x:0:0:root:/root:/bin/bash
    sync:x:4:65534:sync:/bin:/bin/sync
    :am:x:1000:1000:am,,,:/home/am:/bin/bash
    ```

  * <u>-d skip</u> pour ne rechercher qu'à l'intérieur des fichiers  
    <u>-n</u> pour indiquer le numéro de la ligne

    ``` bash
    $ grep -n _HOME -d skip /etc/* 2>/dev/null
    /etc/adduser.conf:58:# If SETGID_HOME is "yes" home directories for users with their own
    /etc/adduser.conf:63:SETGID_HOME=no
    /etc/deluser.conf:4:REMOVE_HOME = 0
    /etc/deluser.conf:10:# REMOVE_HOME or REMOVE_ALL_FILES is set.
    /etc/login.defs:207:DEFAULT_HOME  yes
    ```

  [Syntaxe grep](grep.md)

## sed

* `sed` permet de remplacer un mot par un autre, ligne par ligne  
  Par défaut, seul la première occurence sur chaque ligne est remplacée  
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

  [Syntaxe sed](sed.md)

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

  [Syntaxe awk](awk.md)

## diff

* `diff` permet de voir les différences entre deux fichiers  
  Par défaut diff n'affiche que les différences, en utilisant la convention suivante:

  - changement (c = change):  
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

  - ajout (a = add):  
    1a2 signifie que la ligne 2 a été ajoutée dans le deuxième fichier

    ``` bash
    $ echo "ab" > file1
    $ echo -e "ab\nac" > file2
    $ diff file1 file2
    1a2
    > ac
    ```

  - suppression (d = delete):  
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
  Le séparateur par défaut est une tabulation

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
  $
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
  Par défaut:

  - Le séparateur est l'espace  
    -t pour spécifier un autre séparateur

  - Seules les lignes qui trouvent une correspondance sont retournées  
    -a1 pour un left join

  - La jointure est effectuée sur le premier mot des deux fichiers  
    -12 -23 pour joindre sur le mot 2 du fichier 1 avec le mot 3 du fichier 2

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
