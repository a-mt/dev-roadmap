---
title: Redirection de flux
category: Linux, Shell
---

## Flux

* <ins>stdin</ins>  
  Normalement, on entre des données ou des commandes via le clavier ou la souris: c'est l'*entrée standard* (*standard input* en anglais), abbrégé stdin. Il s'agit du flux 0.

  Notons qu'un grand nombre de commande acceptent deux manières d'opérer:

  - un nom de fichier en argument

    ``` bash
    $ grep HOME ~/.bashrc 
            if [ "$PWD" == "$HOME" ]; then
    ```

  - ou l'entrée standard (taper ligne par ligne, ctrl+c pour quitter)

    ``` bash
    $ grep home
    bin
    dev
    home
    home
    ```
* <ins>stdout</ins>  
  Normalement, les commandes affichent leurs messages sur l'écran du terminal: c'est la *sortie standard* (*standard output* en anglais), abbregé stdout. Il s'agit du flux 1.

  ``` bash
  $ ls
  file1 file2 file3 file3
  ```

* <ins>stderr</ins>  
  Plus subtil, mais les commandes affichent leurs erreurs dans un autre flux, qui lui aussi est affiché à l'écran du terminal par défaut: c'est la *sortie erreur standard* (*standard error output* en anglais), abbregé stderr. Il s'agit du flux 2.

  ``` bash
  $ ls /none
  ls: cannot access '/none': No such file or directory
  ```

---

## Redirection de flux

La *redirection de flux* est la capacité d'envoyer ou de recevoir du texte non pas à partir des flux standard mais d'un autre endroit — typiquement un fichier.

### stdout vers un fichier

* En utilisant `>` ou `1>`, la sortie standard d'une commande peut être redirigée vers un fichier:

  ``` bash
  $ ls -d /etc > file
  $ cat file
  /etc
  ```

* Le chevron simple écrase le contenu d'un fichier existant.  
  Pour ajouter le contenu à la fin du fichier, au lieu d'écraser le contenu, utiliser un double chevron (`>>`):

  ``` bash
  $ ls -d /bin >> file
  $ cat file
  /etc
  /bin
  ```

* Les fichiers utilisés par les redirections sont ouverts en écriture avant que la commande ne sont lancée: il n'est donc pas possible d'utiliser une commande qui redirige vers un fichier (= utilise un fichier en écriture) et lit ce même fichier.

  ``` bash
  # Ne marche pas
  cat file > file
  ```

### stderr vers un fichier

* En utilisant `2>`, la sortie erreur standard d'une commande peut être redirigée vers un fichier:

  ``` bash
  $ ls /nop 2> file2
  $ cat file2
  ls: cannot access '/nop': No such file or directory
  ```

  Il est tout à fait possible de rediriger stdout et stderr vers deux fichiers différents:

  ``` bash
  $ ls -d /etc /nop >file3 2>file4
  $ cat file3
  /etc
  $ cat file4
  ls: cannot access '/nop': No such file or directory
  ```

* Utiliser `2>>` pour ajouter à la fin du fichier et non écraser

### sortie vers une autre sortie

* En utilisant `FROM>&TO`, on peut rediriger une sortie vers une autre.  
  Par exemple, pour rediriger stdout vers un fichier et stderr vers le même fichier (attention l'ordre est important):

  ``` bash
  $ ls -d /etc /nop >file5 2>&1
  $ cat file5
  ls: cannot access '/nop': No such file or directory
  /etc
  ```

* Pour rediriger toutes les sorties vers un fichier, on peut utiliser `&>`

  ``` bash
  $ ls -d /etc /nop &>file6
  $ cat file6
  ls: cannot access '/nop': No such file or directory
  /etc
  ```

* `/dev/null` est un fichier virtuel spécial: rien ne s'écrit dedans.  
  C'est utile lorsqu'on souhaite ne pas afficher une sortie — ni la sauvegarder ailleurs.

  ``` bash
  $ find /tmp -name config*
  find: ‘/tmp/systemd-private-f716fc5907e04bbfaf6dc0be65163b35-systemd-timesyncd.service-F5ySet’: Permission denied
  find: ‘/tmp/systemd-private-f716fc5907e04bbfaf6dc0be65163b35-rtkit-daemon.service-dIx1cm’: Permission denied
  find: ‘/tmp/systemd-private-f716fc5907e04bbfaf6dc0be65163b35-colord.service-lcIMc6’: Permission denied
  /tmp/config-err-WQWVab
  find: ‘/tmp/systemd-private-f716fc5907e04bbfaf6dc0be65163b35-systemd-resolved.service-BvJOpB’: Permission denied
  find: ‘/tmp/systemd-private-f716fc5907e04bbfaf6dc0be65163b35-ModemManager.service-fLP75J’: Permission denied

  $ find /tmp -name config* 2> /dev/null
  /tmp/config-err-WQWVab
  ```

### stdin à partir d'un fichier

* En utilisant `<`, l'entrée standard peut être récupérée à partir d'un fichier

  ``` bash
  $ tr : $'\t' < /etc/passwd
  root  x 0 0 root  /root /bin/bash
  daemon  x 1 1 daemon  /usr/sbin /usr/sbin/nologin
  bin x 2 2 bin /bin  /usr/sbin/nologin
  sys x 3 3 sys /dev  /usr/sbin/nologin
  sync  x 4 65534 sync  /bin  /bin/sync
  ```

### stdout vers stdin

* Le caractère pipe (`|`) permet d'envoyer la sortie standard d'une commande vers l'entrée standard d'une autre commande.

  ```
  $ ls / | grep home
  home
  ```

  Plusieurs pipes peuvent être utilisés consécutivement pour relier plusieurs commandes entre elles. Chaque commande ne voit que la sortie de la commande précédente.

  ``` bash
  $ cut -d: -f1,7 /etc/passwd | tr : $'\t' | sort | more
  am  /bin/bash
  _apt  /usr/sbin/nologin
  avahi-autoipd /usr/sbin/nologin
  avahi /usr/sbin/nologin
  backup  /usr/sbin/nologin
  bin /usr/sbin/nologin
  colord  /usr/sbin/nologin
  ```

### stdout vers un fichier + stdout

* `tee` permet de sauvegarder stdout dans un fichier en plus de l'afficher dans le terminal.

  ```
  $ man -k which | grep ^which | tee studyMe.txt
  which (1)            - locate a command
  $
  $ cat studyMe.txt
  which (1)            - locate a command
  ```

  -a pour ajouter à la fin et non écraser le contenu du fichier

  ```
  $ man -k whereis | grep ^whereis | tee -a studyMe.txt
  whereis (1)          - locate the binary, source, and manual page files for a command
  $
  $ cat studyMe.txt
  which (1)            - locate a command
  whereis (1)          - locate the binary, source, and manual page files for a command
  ```
