---
title: Grep
category: Linux
---

{% raw %}

Grep est une commande Unix qui permet de filtrer des lignes sur un motif donné (texte ou regex — POSIX BRE ou ERE).  
Le nom grep vient de `g/re/p`: global regex print.

## Données en entrée

Grep peut filtrer sur

- stdin, notamment pour filtrer des noms de fichier

  ``` bash
  $ ls | grep .md              # Les lignes qui contiennent ".md"

  awk.md
  composer.md
  github-pages.md
  index.md
  json.md
  liquid.md
  regex.md
  regex-posix.md
  sed.md
  semver.md
  text-editing.md
  vim.md
  wildcard.md
  yaml.md
  ```

- le contenu d'un fichier

  ``` bash
  $ grep BRE regex-posix.md     # Les lignes qui contiennent "BRE" dans le fichier regex-posix.md

  - les regex POSIX BRE (Basic Regex Expression), qui ne comprennent que le strict minimum des regex,
  - et les regex POSIX ERE (Extended Regex Expression), une extension des BRE, qui ajoute le support des groupe
  | BRE           | grep, vi, sed, csplit, dbx, dbxtool, more, ed, expr, lex, pg, nl, rdist |
  `grep` utilise par défaut les regex BRE, il est possible d'utiliser les caractères ERE pourvu qu'ils soient p
   ## POSIX Basic Regex Expression (BRE)
  ```

- le contenu de plusieurs fichiers

  ``` bash
  $ grep BRE *.md              # Les lignes qui contiennent "BRE" dans les fichiers .md du répertoire en cours

  awk.md:- les lignes qui matchent une regex (syntaxe POSIX BRE)
  awk.md:- les lignes dont un champs donné matche une regex (POSIX BRE)
  regex-posix.md:- les regex POSIX BRE (Basic Regex Expression), qui ne comprennent que le strict minimum des r
  regex-posix.md:- et les regex POSIX ERE (Extended Regex Expression), une extension des BRE, qui ajoute le sup
  sed.md:                        Regex POSIX BRE, ERE possible en échappant les caractères
  sed.md:    /word/              Sur les lignes contenant /word/ (POSIX BRE)
  vim.md:    :/word/             Sur la prochaine ligne contenant /word/ (POSIX BRE)
  vim.md:    /text              Rechercher la prochaine occurence de /text/ (POSIX BRE)
  vim.md:    :s/old/new/        Sur la ligne en cours, remplacer la 1ère occurence de /old/ par "new" (POSIX BR
  ```

## Type de recherche

* Par défaut, grep cherche une regex — POSIX BRE

  ``` bash
  $ grep "category: .* PHP" *.md

  composer.md:category: Web, PHP
  ```

* <u>-E</u> (extended regex) permet d'utiliser des regex étendues — POSIX ERE  
  Note: anciennenment, plutôt que `grep -E` on utilisait `egrep`, désormais déprécié

  ``` bash
  $ ls | grep -E '(html|css|js|map)$'
  tmp.html
  tmp.js
  ```

* <u>-F</u> (fixed strings) permet de désactiver les regex — autrement dit chercher une chaîne littérale 
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

## Opérations logiques

* Pour effectuer des opérations logiques, on peut:

  - **OU**  
    Utiliser <u>-e</u> pour spécifier plusieurs recherches

    ``` bash
    # Liste des moniteurs connectés, avec la config actuelle (*), et la config par défaut (+) 
    $ xrandr | grep -e '^\w[^ ]* connected' -e '*' -e '\+'
    eDP-1 connected 1920x1080+3840+0 (normal left inverted right x axis y axis) 294mm x 165mm
       3840x2160     60.00 +  59.98    59.97    48.00  
       1920x1080     60.01*   59.97    59.96    59.93  
    DP-1 connected 1920x1080+0+0 (normal left inverted right x axis y axis) 480mm x 270mm
       1920x1080     60.00*+  50.00    59.94  
    DP-2 connected primary 1920x1080+1920+0 (normal left inverted right x axis y axis) 480mm x 270mm
       1920x1080     60.00*+  50.00    59.94
    ```

  - **ET**  
    Chaîner les grep pour effectuer un ET

    ``` bash
    $ ip a | grep 'inet ' | grep global
        inet 172.16.2.140/24 brd 172.16.2.255 scope global noprefixroute wlp164s0
        inet 192.168.1.4/24 brd 192.168.1.255 scope global noprefixroute wlp164s0
        inet 172.22.0.1/16 brd 172.22.255.255 scope global br-8f6c02a7f7c8
        inet 172.19.0.1/16 brd 172.19.255.255 scope global br-dc576f5fce1d
        inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
        inet 172.23.0.1/16 brd 172.23.255.255 scope global br-75596f96b734
        inet 172.26.0.1/16 brd 172.26.255.255 scope global br-7da60e4c7c94
    ```

---

## Options

Quelques options utiles :

### -v, invert

* <u>-v</u> (invert) pour faire une recherche inversée — exclure les lignes qui contiennent un motif

  ``` bash
  # Toutes les lignes sauf celles qui contiennent "self-insert" ou "(not bound)"
  $ bind -p | grep -v -e self-insert -e '(not bound)'
  "\C-g": abort
  "\C-x\C-g": abort
  "\e\C-g": abort
  "\C-j": accept-line
  "\C-m": accept-line
  "\C-b": backward-char
  "\eOD": backward-char
  "\e[D": backward-char
  "\C-h": backward-delete-char
  "\C-?": backward-delete-char
  ```

### -i, insensitive

* <u>-i</u> (insensitive) pour une recherche insensible à la casse

  ``` bash
  $ dpkg -s dpkg | grep -i version
  Version: 1.19.7ubuntu3.2
  ```

### -r, recursive

* <ins>-r</ins> (recursive) pour chercher dans tous les fichiers d'un répertoire

  ``` bash
  # grep -ri listen /etc/httpd/
  /etc/httpd/conf/httpd.conf:# Listen: Allows you to bind Apache to specific IP addresses and/or
  /etc/httpd/conf/httpd.conf:# Change this to Listen on specific IP addresses as shown below to 
  /etc/httpd/conf/httpd.conf:#Listen 12.34.56.78:80
  /etc/httpd/conf/httpd.conf:Listen 80
  ```

À utiliser avec le mode récursif, les options `exclude-dir` et `include` :

* `--exclude-dir` : exclure un dossier de la recherche récursive

  ``` bash
  $ grep -r /search --exclude-dir _site

  search.html:        fetch("{{ "/search.json" | relative_url }}")
  _includes/searchbar.html:<form action="{{ "/search" | relative_url }}" method="get" class="searchbar">
  ```

* `--include` : filtrer sur les fichiers qui matchent un pattern

  ``` bash
  $ grep -r ".js\b" --exclude-dir _site --include "*.html"

  _layouts/default.html:    <script src="{{ '/assets/js/common.js?v=' | append: site.github.build_revision 
  _layouts/default.html:    <script src="{{ "assets/javascript/anchor-js/anchor.min.js" | relative_url }}">
  ```

### -w, word

* <ins>-w</ins> (word) pour ne matcher que les mots (ex. "red" et non "redhat")

  ``` bash
  $ grep -rw special /opt/findme
  /opt/findme/file559:You found me! I'm the special file.
  ```

### -n, number

* <u>-n</u> pour afficher le numéro des lignes

  ``` bash
  $ grep -n -v nologin /etc/passwd
  1:root:x:0:0:root:/root:/bin/bash
  5:sync:x:4:65534:sync:/bin:/bin/sync
  41:am:x:1000:1000:am,,,:/home/am:/bin/bash
  ```

### -h, -H, head

* <u>-h</u> pour ne pas afficher le nom du fichier.   
  Par défaut, grep affiche le nom du fichier si plusieurs fichiers sont passés en argument,  
  et ne l'affiche pas si un seul fichier est passé en argument

  ``` diff
  -$ grep 'Command line: BOOT_IMAGE' kern*
  -kern_000:Aug 20 06:01:56 XPS1393057cc859cd kernel: [    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-79-generic root=/dev/mapper/data-root ro quiet splash vt.handoff=7
   kern_01:Aug 21 06:08:55 XPS1393057cc859cd kernel: [    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-79-generic root=/dev/mapper/data-root ro quiet splash vt.handoff=7
   kern_015:Aug 21 06:08:55 XPS1393057cc859cd kernel: [    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-79-generic root=/dev/mapper/data-root ro quiet splash vt.handoff=7
   kern_02:Aug 21 08:53:50 XPS1393057cc859cd kernel: [    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-79-generic root=/dev/mapper/data-root ro quiet splash vt.handoff=7
   kern_028:Aug 21 08:53:50 XPS1393057cc859cd kernel: [    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-79-generic root=/dev/mapper/data-root ro quiet splash vt.handoff=7

  +$ grep -h 'Command line: BOOT_IMAGE' kern*
  +Aug 20 06:01:56 XPS1393057cc859cd kernel: [    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-79-generic root=/dev/mapper/data-root ro quiet splash vt.handoff=7
   Aug 21 06:08:55 XPS1393057cc859cd kernel: [    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-79-generic root=/dev/mapper/data-root ro quiet splash vt.handoff=7
   Aug 21 06:08:55 XPS1393057cc859cd kernel: [    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-79-generic root=/dev/mapper/data-root ro quiet splash vt.handoff=7
   Aug 21 08:53:50 XPS1393057cc859cd kernel: [    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-79-generic root=/dev/mapper/data-root ro quiet splash vt.handoff=7
   Aug 21 08:53:50 XPS1393057cc859cd kernel: [    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-79-generic root=/dev/mapper/data-root ro quiet splash vt.handoff=7
  ```

* <u>-H</u> pour afficher le nom du fichier

  ``` bash
  $ find /usr/local/ -name '*.sh' -type f -executable -print -quit | xargs grep '^#!'
  #!/bin/sh

  $ find /usr/local/ -name '*.sh' -type f -executable -print -quit | xargs grep -H '^#!'
  /usr/local/lib/node_modules/lerna/node_modules/node-gyp/gyp/tools/emacs/run-unit-tests.sh:#!/bin/sh
  ```

### -d, directory

* <u>-d skip</u> pour ignorer les répertoires — ne rechercher qu'à l'intérieur des fichiers  

  ``` bash
  $ sudo grep -n _HOME /etc/* 2>&1 | head -5
  grep: /etc/acpi: Is a directory
  /etc/adduser.conf:58:# If SETGID_HOME is "yes" home directories for users with their own
  /etc/adduser.conf:63:SETGID_HOME=no
  grep: /etc/alsa: Is a directory
  grep: /etc/alternatives: Is a directory

  $ grep -n _HOME -d skip /etc/* 2>/dev/null
  /etc/adduser.conf:58:# If SETGID_HOME is "yes" home directories for users with their own
  /etc/adduser.conf:63:SETGID_HOME=no
  /etc/deluser.conf:4:REMOVE_HOME = 0
  /etc/deluser.conf:10:# REMOVE_HOME or REMOVE_ALL_FILES is set.
  /etc/login.defs:207:DEFAULT_HOME  yes
  ```

### -o, only-matching

* <u>-o</u> (only-matching) pour n'afficher que les valeurs qui correspondent au résultat de recherche  
  et non la ligne entière qui le contient

  ``` diff
  -$ /sbin/lsmod | grep -e ^iwlmvm -e ^iwldvm -e ^iwlwifi
  -iwlmvm                565248  0
   iwlwifi               446464  1 iwlmvm

  +$ /sbin/lsmod | grep -o -e ^iwlmvm -e ^iwldvm -e ^iwlwifi
  +iwlmvm
   iwlwifi
  ```

### -q, quiet

* <u>-q</u> (quiet) permet de ne pas afficher les résultats de la recherche, uniquement récupérer le code retour:  
  0 (succès) si un résultat a été trouvé, 1 (erreur) sinon

  ``` bash
  # file contient la valeur "5"?
  $ grep -q '5' file && echo 'y' || echo 'n'
  n
  $ grep -q '4' file && echo 'y' || echo 'n'
  y
  ```

### -m, max

* <u>-m</u> (max) pour limiter le nombre de résultats par fichier

  ``` bash
  $ grep -inm 1 jekyll *.md

  github-pages.md:13:- Github supporte Jekyll, un générateur de site statique et qui permet
  index.md:26:  - [ ] Jekyll
  liquid.md:8:et a depuis été adopté par de nombreuses applications web, dont notamment Jekyll.
  ```

### -c, count

* <u>-c</u> (count) pour afficher le nombre de lignes matchées pour chaque fichier — et non les lignes matchées

  ``` bash
  $ grep -c "category:" *.md

  awk.md:1
  composer.md:1
  github-pages.md:1
  index.md:0
  json.md:1
  liquid.md:1
  regex.md:1
  regex-posix.md:1
  sed.md:1
  semver.md:1
  text-editing.md:1
  vim.md:1
  wildcard.md:1
  yaml.md:1
  ```

### &#45;&#45;color

* L'option <u>--color</u> permet d'indiquer si on veut colorer les résultats de recherche ou non

  - `auto` (config par défaut sous Ubuntu): colorer

  - `never`: ne pas colorer

  - `always`: colorer en utilisant des caractères spéciaux.  
    Permet de conserver la couleur même en passant la sortie à d'autres commandes.

    ``` bash
    $ grep --color=always js composer.md | grep -v '`'
    | composer.𝗷𝘀on | contrat | Liste des packages à installer
        composer require mypackage    Ajoute mypackage au .𝗷𝘀on
    ```

    Notons que les caractères spéciaux peuvent interférer avec le bon fonctionnement des commandes qui suivent:  
    par exemple si "js" est coloré (il y a donc des caractères spéciaux avant et après le "js"), alors on va pas matcher "json" derrière

    ``` bash
    $ grep --color=always js composer.md | grep -v json
    1. Créer un fichier `composer.𝗷𝘀on` à la racine du projet
    2. Déclarer les packages à installer dans `composer.𝗷𝘀on`
          ``` 𝗷𝘀on
    3. Installer les dépendances listées dans `composer.𝗷𝘀on`
    | composer.𝗷𝘀on | contrat | Liste des packages à installer
        composer require mypackage    Ajoute mypackage au .𝗷𝘀on
    3. Créer le fichier `composer.𝗷𝘀on` à la racine de `monprojet/`
        ``` 𝗷𝘀on
    ```

{% endraw %}
