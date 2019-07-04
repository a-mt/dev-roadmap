---
title: Commandes
category: Linux, Shell
---

## Script

### Éxecuter un script

* Créer un fichier avec un éditeur de texte.  
  Le caractère `#` démarque un commentaire, tout ce qui suit ce caractère n'est pas interprété par le shell (jusqu'à la fin de la ligne). `#!` est ce qu'on appelle un *shebang*, placé sur la première ligne du fichier script, il indique au système d'exploitation le path du shell à utiliser pour interpréter le contenu du fichier — si non indiqué, le shell en cours est utilisé.

  ``` bash
  #!/bin/bash
  # Ce script supprime tous les fichiers générés
  # par le compilatur Ada et qui peuvent facilement
  # être recréés par la compilation

  # Supprimer des fichiers objets
  rm *.ali *.o

  # Suppression des fichiers exécutables
  find -type f -perm -700 | xargs rm -i
  ```

* Rendre le fichier exécutable

  ```
  chmod +x NOM_DU_SCRIPT
  ```

* Éxecuter le script

  ```
  ./NOM_DU_SCRIPT
  ```

  Si le script se trouve dans un répertoire du `PATH` (variable d'environnement), alors il n'est pas nécessaire de spécifier le chemin du script.

  ```
  NOM_DU_SCRIPT
  ```

* On peut également exécuter un script qui n'est pas exécutable en le donnant en paramètre au shell:

  ```
  bash NOM_DU_SCRIPT
  ```

  `.` peut être utilisé pour spécifier "le shell en cours"

  ```
  . NOM_DU_SCRIPT
  ```

  `source` permet d'importer et exécuter les commandes du script donné dans le processus en cours. Cela permet par exemple d'utiliser un script pour définir des variables d'environnement (ex .bashrc) ou inclure des fichiers de librairie (ex lib.sh)

  ```
  source ~/.bashrc
  ```

### Afficher les commandes exécutées

Pour afficher les commandes exécutées au fur et à mesure de l'exécution du script, on peut

* utiliser l'option `-x` au moment de déclencher le script

  ```
  bash -x NOM_SCRIPT
  ```

* ou utiliser la commande `set` au début du script

  ```
  #!/bin/bash
  set -x
  ```

---

## Combiner des commandes

* `;` permet d'exécuter une commande après l'autre

  ```
  echo "Résultat"; ls
  ```

* `&&` permet d'exécuter une deuxième commande si la première a réussit ($? = 0)

  ```
  cd /Documents && ls
  ```

* `||` permet d'exécuter une deuxième commande si la première a échoué

  ```
  cd /home/wwwroot || cd /var/www
  ```

* `|` permet d'exécuter une première commande et d'utiliser son résultat (stdout) comme entrée d'une deuxième (stdin).  
  Une suite de commande séparées par des pipes (`|`) est appelée une pipeline.

  ```
  ls | grep "pattern"
  ```

  Pour utiliser le résultat d'une commande comme paramètre d'une deuxième commande, on peut utiliser `xargs`. Cela permet d'utiliser des pipes avec des commandes qui ne lisent pas stdin

  ```
  ls | xargs echo          # Executer "echo" sur le résultat de ls
  ls | xargs -i{} echo {}  # Executer "echo" sur chaque ligne de résultat de ls
  ```

---

## Rediriger stdout, stderr, stdin

Il existe 3 descripteurs de fichier par défaut:  
— 0: standard input (stdin) = entrée  
— 1: standard output (stdout) = sortie  
— 2: standard error (stderr) = erreurs  

* `>` permet de rediriger la sortie d'une commande vers un fichier.  
  Par défaut, stdout et stderr sont écrits dans la console

  ```
  # Redirige stdout vers file
  echo test > file
  cat file
  ```

  Si on ne précise pas le numéro de sortie à rediriger, on redirige par défaut la sortie 1 (stdout). On peut également rediriger la sortie 2 (stderr).

  ```
  # Redirige stdout vers out.txt et stderr vers err.txt
  cmd 1> out.txt 2> err.txt
  ```

  Les fichiers utilisés par les redirections sont ouverts en écriture avant que la commande ne sont lancée, il n'est donc pas possible d'utiliser une commande qui utilise un fichier en écriture et redirige dans ce même fichier.

  ```
  # Ne marche pas
  cat file > file
  ```

* `/dev/null` est un fichier spécial, rien n'est écrit dedans. C'est utile lorsqu'on ne souhaite pas garder la sortie d'une commande ni l'afficher.

  ```
  cmd > /dev/null
  ```

  Si toutes les sorties d'une commande sont redirigées, alors elle ne bloque pas le processus parent. On peut donc l'utiliser en PHP pour déclencher un processus asynchrone (attention néanmoins, ne marchera pas sous Windows).

  ```
  shell_exec('./generer_pdf > /dev/null 2>&1')
  ```

* Pour rediriger une sortie vers une redirection déjà définie, on peut utiliser `>&`. Il ne doit pas y avoir d'espace entre ces deux caractères.

  ```
  # Redirige stdout et stderr vers file
  cmd > file 2>&1
  ```

  ```
  # Écrit dans stdout
  echo "Tout va bien"

  # Écrit dans stderr
  echo "Une erreur" >&2
  ```

* On peut utiliser la commande `tee` pour écrire le résultat d'une commande dans la console ainsi que dans un fichier.

  ```
  echo test | tee file
  ```

* `>>` permet d'ajouter la sortie d'une commande a un effet.  
  Même principe que `>` à la différence près que `>` vide le contenu du fichier avant d'écrire, tandis que `>>` écrit à la suite.

  ```
  echo test >> file
  ```

  ```
  cmd 2>> err.txt
  ```

* `<` permet d'utiliser le contenu d'un fichier comme entrée (stdin) d'une commande.

  ```
  ls > file
  grep pattern < file
  ```

---

## Alias

* `alias` permet de créer un alias d'une commande (un raccourci)

  ```
  alias ll='ls -alF'
  ```

* `unalias` de supprimer un alias

  ```
  unalias ll
  ```

---

## Type de commande

* `type` permet d'afficher le type d'une commande.
  
  ``` bash
  type cd       # cd est une primitive du shell
  type ll       # ll est un alias vers « ls -alF »
  type man      # man est /usr/bin/man
  type myScript # myScript est ~/bin/myScript
  type azerty   # bash: type: azerty : non trouvé
  ```

* `which` affiche le chemin d'une commande.  
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