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

### 1> file : stdout vers un fichier

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

### 2> file : stderr vers un fichier

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

### 2>&1 : sortie vers une autre sortie

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

### < file : stdin à partir d'un fichier

* En utilisant `<`, l'entrée standard peut être récupérée à partir d'un fichier

  ``` bash
  $ tr : $'\t' < /etc/passwd
  root  x 0 0 root  /root /bin/bash
  daemon  x 1 1 daemon  /usr/sbin /usr/sbin/nologin
  bin x 2 2 bin /bin  /usr/sbin/nologin
  sys x 3 3 sys /dev  /usr/sbin/nologin
  sync  x 4 65534 sync  /bin  /bin/sync
  ```

  ``` bash
  $ diff <(sort foo.txt) <(sort bar.txt)
  ```

  ``` bash
  $ while IFS=: read user pass uid autres; do
  > echo $user: $uid
  > done < /etc/passwd
  root: 0
  bin: 1
  ...
  tcpdump: 72
  tremblay: 1000
  ```

### <<DELIM : here document

* En l'utilisant `<<`, l'entrée standard peut être récupérée à partir d'une chaîne de caractère.  
  La première ligne précise le délimiteur, qui indiquera la dernière ligne (on utilise souvent EOF, pour *end of file*)

  ``` bash
  $ sort <<EOF
  6
  3
  2
  5
  1
  4
  EOF
  ```

### <<< : here string

* Une variante similaire, le `<<<`, permet de passer une chaîne de caractère sur seule ligne en entrée. Pas de délimiteur nécessaire ici.

  ``` bash
  bc <<<1+2+3+4
  ```

### Fichiers spéciaux

On peut utiliser les flux avec des fichiers textes, mais également des fichiers virtuels (*device nodes*):

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

* `/dev/fd/N` correspond au flux N (*file descriptor*)  
  `/dev/stdin` correspond à /dev/fd/0  
  `/dev/stdout` correspond à /dev/fd/1  
  `/dev/stderr` correspond à /dev/fd/2

  ``` bash
  $ echo "Err: something went wrong" >/dev/stderr
  Err: something went wrong
  ```

* `/dev/tcp/HOST/PORT` et `/dev/udp/HOST/PORT`  
  permettent d'établir des connections TCP et UDP arbitraires

  ``` bash
  # Scan de ports
  for PORT in {1..65535}; do
      echo >/dev/tcp/127.0.0.1/$port &&
      echo "port $port is open" ||
      echo "port $port is closed"
  done
  80 open
  631 open
  ```
  ``` bash
  # Envoyer SHUTDOWN à Tomcat7
  echo SHUTDOWN > /dev/tcp/127.0.0.1/8005
  ```
  ``` bash
  # Obtenir l'heure de nist.gov
  $ cat </dev/tcp/time.nist.gov/13

  60039 23-04-05 04:06:44 50 0 0 861.2 UTC(NIST) *
  ```

### | : stdout vers stdin

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

### tee : stdout vers un fichier + stdout

* `tee` permet de sauvegarder stdout dans un fichier en plus de l'afficher dans le terminal.

  ```
  $ man -k which | grep ^which | tee studyMe.txt
  which (1)            - locate a command
  $
  $ cat studyMe.txt
  which (1)            - locate a command
  ```

  Utiliser l'option `-a` pour ajouter à la fin et non écraser le contenu du fichier

  ```
  $ man -k whereis | grep ^whereis | tee -a studyMe.txt
  whereis (1)          - locate the binary, source, and manual page files for a command
  $
  $ cat studyMe.txt
  which (1)            - locate a command
  whereis (1)          - locate the binary, source, and manual page files for a command
  ```

### exec

* `exec` permet de rediriger les flux du shell courant

  ``` bash
  # Met le contenu du fichier "datafile" dans fd6
  exec 6< datafile

  # Lit les lignes du fichier "datafile"
  read a1 <&6
  read a2 <&6

  # Supprime fd6
  exec 6<&-
  ```

  ``` bash
  # Copie stdout (fd1) dans fd6
  exec 6>&1

  # Remplace stdout par le fichier "logfile"
  exec > logfile

  # Écrit les lignes dans le fichier "logfile"
  date
  echo "-------------------------------------"
  ls -al

  # Restaure stdout à partir de fd6
  # puis supprime fd6
  exec 1>&6 6>&-

  # Vérifie l'état de stdout et du fichier logfile
  $ echo "ok"
  ok
  $ cat logfile
  Tue  4 Apr 08:35:55 CEST 2023
  -------------------------------------
  total 1032484
  drwxr-xr-x  6 am am      4096 Apr  4 08:35 .
  drwxr-xr-x 27 am am      4096 Apr  4 08:19 ..
  -rw-rw-r--  1 am am        68 Apr  4 08:36 logfile
  ```

  ``` bash
  # Window1: Démarer l'écoute sur le port 55555
  $ nc -l 55555

  # Window2: Rediriger la sortie vers le port 55555
  $ exec 6>&1 $ exec > /dev/tcp/127.0.0.1/55555
  # ou nc 127.0.0.1 55555

  $ echo "hello world" $ date

  # Window1: A reçu la sortie
  hello world
  Wed 5 Apr 06:00:36 CEST 2023

  # Window1: Ctrl+c pour stopper l'écoute
  # Window2: Restaurer stdout
  $ exec 1>&6 6>&-
  ```

  ``` bash
  $ exec </dev/tcp/127.0.0.1/80
  # ou nc -z 127.0.0.1 80
  ```

* Formellement

  - `[n]>&word` duplique un flux en sortie  
    Si *n* n'est pas spécifié, alors 1 est utilisé  
    Si *word* vaut `-`, alors le file descriptor *n* est fermé.

  - `[n]<&word` duplique un flux en entrée  
    Si *n* n'est pas spécifié, alors 0 est utilisé  
    Si *word* vaut `-`, alors le file descriptor *n* est fermé.

  - `[n]<&digit-` déplace un flux en entrée  
    Si *n* n'est pas spécifié, alors 0 est utilisé  
    *digit* est fermé après avoir été dupliqué dans *n*

  - `[n]<&digit-` déplace un flux en entrée  
    Si *n* n'est pas spécifié, alors 1 est utilisé  
    *digit* est fermé après avoir été dupliqué dans *n*

  Il est déconseillé d'utiliser un *n* supérieur à 9, car il peut entrer en conflit avec les flux utilisés en interne par le shell.

  [Redirections](https://www.gnu.org/software/bash/manual/html_node/Redirections.html)
