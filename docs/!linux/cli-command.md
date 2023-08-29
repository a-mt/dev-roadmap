---
title: Commandes
category: Linux, Shell
---

## Commande

* Une *commande* (parfois appelé *utilitaire*) est un programme executable en ligne de commande — donc sans interface graphique.

* Quand le prompt est affiché, l'interpréteur de commande attend qu'on lui envoie des commandes.   
  Pour exécuter une commande, taper le nom de la commande et appuyer sur Entrée.

  ```
  $ ls
  ```

  Note: tout sous Linux est sensible à la casse, que ce soit des noms de commandes ou de fichiers: hello est différent de HELLO.

* Certaines commandes peuvent prendre des entrées supplémentaires:

  - les options (kwargs) sont utilisées pour modifier le comportement de base d'une commande.

    ```
    $ ls -l
    ```

    Les options sont souvent des lettres simples, mais parfois aussi des mots ou des phrases. Les options à une lettre sont précédées d'un tiret unique (`-x`), tandis que les mots sont précédés de deux tirets (`--extract`). On peut grouper les options à une lettre avec un seul tiret:

    ```
    $ ls -l -H

    $ ls -lH
    ```

  - les arguments (args) sont utilisés pour désigner ce sur quoi la commande doit porter — ex: un nom de fichier, un nom d'utilisateur

    ```
    $ ls /path1 /path2
    ```

  - et bien sûr une commande peut prendre à la fois des options et des arguments

    ```
    $ ls -lH /path1 /path2
    ```

## Options

Il existe 3 grands formats d'option, acceptés ou non suivant la commande:

* les options GNU: ont deux tirets

  ```
  ps --tty tty2
  ```

* les options style Unix: ont un seul tiret

  ```
  ps -elf
  ```

* les options style BSD (*Berkeley Software Distribution*): n'ont pas de tiret

  ```
  ps aux
  ```

## Type de commande

* Certaines commandes font parties intégrante du shell, c'est ce qu'on appelle de commandes primitives (*built-in commands*).  
  Toutes celles qui ne font pas partie du shell, sont considérées comme des commandes externes (*external commands*).  
  Ces dernières sont des programmes qui résident dans le système de fichier virtuel.

* `type` permet d'afficher le type d'une commande.
  
  ``` bash
  type cd       # cd est une primitive du shell
  type ll       # ll est un alias vers « ls -alF »
  type man      # man est /usr/bin/man
  type myScript # myScript est ~/bin/myScript
  type azerty   # bash: type: azerty : non trouvé
  ```

  Si une commande a été utilisé recemment, `type` dit qu'il s'agit d'une commande hashée: cela signifie qu'elle est chargée en mémoire, et qu'elle sera plus rapide à exécuter.

  ``` bash
  $ type uname
  uname is /bin/uname

  $ uname
  Linux
  $ type uname
  uname is hashed (/bin/uname)
  ```

  On peut utiliser `help` pour lister toutes les commandes primitives du shell en cours.

* `which` retourne le chemin absolu d'une commande.  
  Ne renvoie rien si la commande donnée n’est pas présente dans le path.  
  Permet de vérifier l’existence ou non de certains packages.

  ``` bash
  which man      # /usr/bin/man
  which ll       #
  which cd       #
  which myScript # ~/bin/myScript
  which azerty   # 
  ```

* `whereis` affiche le nom, le chemin de l'executable, du manuel et des sources d'une commande.  
  Renvoit toujours au moins le nom, même si la commande n’existe pas.

  ``` bash
  whereis man      # man: /usr/bin/man /usr/share/man /usr/share/man/man1/man.1.gz
  whereis ll       # ll:
  whereis cd       # cd:
  whereis myScript # myScript:
  whereis azerty   # azerty:
  ```

## Alias

* Un alias peut être utilisé pour définir une commande personnalisée, par exemple pour mapper une commande à un nom plus court ou ajouter des options par défaut à une commande.

  ``` bash
  $ type ls
  ls is aliased to `ls --color=auto'
  $
  $ which ls
  /bin/ls
  ```

* `unalias NAME` permet de supprimer un alias

  ``` bash
  $ unalias ls
  $ type ls
  ls is /bin/ls
  ```

* `alias NAME=value` permet de créer un alias  
  Ne vaut que pour le shell en cours. Pour qu'un alias existe toujours, il faut l'ajouter à un fichier d'environnement

  ``` bash
  $ alias ls='ls --color=auto'
  $ type ls
  ls is aliased to `ls --color=auto'
  ```

* Sans arguments ou avec l'option -p (print), `alias` liste tous les alias qui existent

  ``` bash
  $ alias
  alias __git_find_on_cmdline='__git_find_subcommand'
  alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'
  alias chrome='google-chrome-stable'
  alias egrep='egrep --color=auto'
  alias fgrep='fgrep --color=auto'
  alias grep='grep --color=auto'
  alias l='ls -CF'
  alias la='ls -A'
  alias ll='ls -alF'
  alias ls='ls --color=auto'
  ```

* `alias NAME` permet d'afficher la valeur d'un alias donné

  ``` bash
  $ alias l
  alias l='ls -CF'
  ````