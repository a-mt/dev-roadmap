---
title: Environnement shell
category: Linux
---

## Variables d'environnements

* Une variable d'environnement est une variable stockant des information sur l'environnement en cours, et qui peut être utilisée par n'importe quel programme pour vérifier les configurations de l'environnement ou modifier son comportement.

* Par convention, les variables d'environnement sont en majuscule et les variables locales en minuscule

### Variables notables

Parmis les variables d'environnement notables on trouve:

* <ins>Path</ins>:

  - **PWD**: contient le répertoire de travail actuel

    ``` bash
    $ echo $PWD
    /home/christine
    ```

  - **PATH**: contient la liste des répertoires (séparés par des :) dans lesquels le système va chercher des executables

    ``` bash
    $ echo $PATH
    /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
    ```

  - **LD_LIBRARY_PATH**: contient les listes des répertoires dans lesquels les librairies vont être cherchées.  
    Typiquement utilisé quand on teste une nouvelle librairie

* <ins>Utilisateur</ins>:

  - **USER**: contient le nom de l'utilisateur en cours

    ``` bash
    $ echo $USER
    christine
    ```

  - **UID**: contient l'identifiant de l'utilisateur en cours

    ``` bash
    $ echo $UID
    1000
    ```

  - **GROUPS**: contient les identfiiants des groupes de l'utilisateur

    ``` bash
    $ echo $GROUPS
    1000

    $ echo ${GROUPS[*]}
    1000 24 27 30 46 116 126 4
    ```

* <ins>Shell</ins>:

  - **SHELL**: contient le path du shell en cours

    ``` bash
    $ echo $SHELL
    /bin/bash
    ```

  - **BASH_VERSION**: contient la version du shell bash en cours

    ``` bash
    $ echo $BASH_VERSION
    5.0.17(1)-release
    ```

  - **HOSTNAME**: contient le nom de l'hôte en cours

    ``` bash
    $ echo $HOSTNAME
    UbuntuDesktop1804
    ```

  - **PS1**: détermine l'apparence du prompt

    ``` bash
    $ echo $PS1
    $
    $ PS1="My prompt> "
    My prompt>
    ```

  - **PS2**: détermine l'apparence du prompt secondaire

    ``` bash
    $ echo $PS2
    >
    $ echo \
    > $USER
    christine
    $
    $ PS2="2d prompt> "
    $ echo \
    2d prompt> $USER
    christine
    ```

  - **SHLVL**: (shell level) indique le niveau du shell en cours  
    1 signifie qu'on ne se trouve pas dans un sous-shell

    ``` bash
    $ echo $SHLVL
    1
    $
    $ bash
    $ echo $SHLVL
    2
    $ exit
    $
    $ echo $SHLVL
    1
    ```

* <ins>Language</ins>:

  - **LANG**: contient la locale en cours  

    ``` bash
    $ echo $LANG
    en_US.UTF-8
    ```

  - **LC_\***: ces variables permettent d'écraser la locale utilisée pour différentes catégories.  
    Par exemple **LC_TIME** pour la localisation de la date/heure uniquement

    ``` bash
    $ echo $LC_TIME
    fr_FR.UTF-8
    ```

  - **TZ**: si définie, permet à un utilisateur d'utiliser une timezone différente de la timezone du système

### Lister les variables d'environnement

* Pour lister les variables d'environnement: `env` ou `printenv`

  ``` bash
  $ env | head
  SHELL=/bin/bash
  SESSION_MANAGER=local/XPS1393057cc859cd:@/tmp/.ICE-unix/1832,unix/XPS1393057cc859cd:/tmp/.ICE-unix/1832
  QT_ACCESSIBILITY=1
  COLORTERM=truecolor
  XDG_CONFIG_DIRS=/etc/xdg/xdg-pantheon:/etc/xdg
  XDG_SESSION_PATH=/org/freedesktop/DisplayManager/Session0
  XDG_MENU_PREFIX=gnome-
  GNOME_DESKTOP_SESSION_ID=this-is-deprecated
  LANGUAGE=en_US
  LC_ADDRESS=en_GB.UTF-8
  ```

### Définir des variables d'environnemnt

* On peut créer ou modifier des variables d'environnement avec `export VAR=value`

  Définir des variables d'environnement de cette manière ne survivra pas à une déconnexion: pour qu'une variable d'environnement persiste il faut qu'elle soit définie dans un fichier d'environnement — un fichier exécuté lorsqu'on ouvre un nouveau shell.

  ``` bash
  $ MAVAR="1"
  $ export MAVAR
  $ export MAVAR2="2"
  ```

---

## Fichier d'environnement

* Un fichier d'environnement est un script shell qui paramètre des éléments de l'environnement shell, par exemple

  - définir des variables d'environnement

    ```
    EDITOR=/usr/bin/nano
    ```

  - modifier des commandes

    ```
    alias rm='rm -i'
    ```

  - changer l'apparence du terminal

    ```
    setterm -inversescreen on
    ```

### Fichiers d'environnment globaux

* Les fichiers d'environnement globaux sont exécutés pour quiconque se connectant au shell.

  - <ins>/etc/profile</ins>  
    est généralement présent sur toutes les distributions Linux.  
    Il est exécuté lorsqu'un utilisateur se connecte, et va charger des fichiers d'environnement secondaires

  - <ins>/etc/profile.d</ins>  
    est un répertoire contenant un ensemble de scripts chargés par /etc/profile

  - <ins>/etc/bash.bashrc</ins> sous Ubuntu  
    ou <ins>/etc/bashrc</ins> sous CentOS  
    est également un fichier chargé par /etc/profile 

  - <ins>/etc/environment</ins>  
    est un fichier de configuration permettant de définir des variables d'environnement pour tous les utilisateurs. Seul root peut le modifier

    ``` bash
    $ cat /etc/environment
    COMPOSE_PROJECT_NAME=myproject_staging
    CI_PIPELINE=staging
    ```

### Fichiers d'environnement locaux

* Les fichiers d'environnement locaux sont personnels à chaque utilisateur,  
  ce sont sont des fichiers cachés situés dans le répertoire $HOME, exécutés après l'exécution des fichiers globaux.

* Le shell va chercher les fichiers suivants, et exécuter uniquement le premier fichier trouvé — les fichiers restants seront ignorés s'ils existent:

  - 1) <ins>\~/.bash_profile</ins>
  - 2) <ins>\~/.bash_login</ins>
  - 3) <ins>\~/.profile</ins>

  Typiquement, tout fichier d'environnement local va charger un fichier d'environnement local secondaire: <ins>\~/.bashrc</ins>.  
  Le fichier .bashrc est donc l'endroit idéal pour mettre des paramètres d'environnement personnels.

* <ins>\~/.bash_logout</ins> est un script shell exécuté lorsqu'un utilisateur se déconnecte du shell. Il peut ne pas exister.

---

## Flags

### Lister les flags

* Il est possible d'activer des options, officiellement appelés *flags*, pour modifier le comportement de la session en cours.  
  La variable `$-` contient la liste des flags activés

  ```
  $ echo $-
  himBHs
  ```

  Pour voir ce que chaque lettre signifie: `help set`

### Définir des flags

* On peut utiliser la commande `set` pour ajouter ou enlever une option

  ```
  $ set -a+
  $ echo $-
  ahimBHs
  $
  $ set +a
  $ echo $-
  himBHs
  ```

  Note: Sans paramètre, `set` liste toutes les variables et fonctions définies dans la session en cours

  ```
  $ set | head
  BASH=/bin/bash
  BASHOPTS=checkwinsize:cmdhist:complete_fullquote:expand_aliases:extglob:extquote:force_fignore:histappend:interactive_comments:progcomp:promptvars:sourcepath
  BASH_ALIASES=()
  BASH_ARGC=()
  BASH_ARGV=()
  BASH_CMDS=()
  BASH_COMPLETION_VERSINFO=([0]="2" [1]="8")
  BASH_LINENO=()
  BASH_REMATCH=()
  BASH_SOURCE=()
  ```

* On peut également ajouter des options lorsqu'on crée un sous-shell:

  ``` bash
  bash -x NOM_SCRIPT
  ```

  Ou au niveau du shebang

  ``` bash
  #!/bin/bash -x
  ```

  Ce qui revient au même qu'ajouter la commande `set` au début du script

  ``` bash
  #!/bin/bash
  set -x
  ```

### Flag B: Expansion des accolades

* L'expansion des accolades est l'une des nombreuses options qu'on peut activer ou désactiver pour la session en cours — si activée, l'interpréteur de commandes lira les éléments entre les accolades comme une liste.

  ```
  $ echo {a,b,c,d}
  a b c d

  $ echo {a..d}
  a b c d
  ```

  B indique que l'expansion des accolades est activée

  ```
  $ echo $-
  himBHs
  ```

### Flag X: Afficher les commandes

* -x permet d'afficher les commandes exécutées au fur et à mesure de l'exécution du script

  ``` bash
  $ cat script

  #!/bin/bash
  latest=`ls -t1F | grep /$ | head -1`

  if [ ! current -ef "$latest" ]; then
    ln -sfT $latest current
  fi
  ```

  ``` bash
  bash -x script
  ++ ls -t1F
  ++ grep '/$'
  ++ head -1
  + latest=002/
  + '[' '!' current -ef 002/ ']'
  + ln -sfT 002/ current
  ```

### Flag o: Options de vérifications

#### nounset

* Activer `nounset` lèvera une erreur si on fait référence à des variables indéfinies (qui par défaut prennent la valeur "")

  ``` bash
  $ cat secur1.sh
  #!/bin/bash -
  set -o nounset

  echo $a
  foo
  echo "FIN"

  $ ./secur1.sh
  ./secur1.sh: ligne4: a :
  variable sans liaison
  $
  ```

#### errexit

* Activer `errexit` permet de sortir du script si une commande échoue

  ``` bash
  $ cat secur2.sh
  #!/bin/bash -
  set -o errexit

  echo $a
  foo
  echo "FIN"

  $ ./secur2.sh

  tmp: line 5: foo: command not found
  ```

#### pipefail

* Activer `pipefail` permet aux pipelines de conserver le dernier statut non nul.  
  
  - En temps habituel, une pipeline retourne le statut de la dernière commande: si on pipe plusieurs commandes, errexit ne sera donc déclenché que si la dernière commande échoue et non une commande intermédiaire.

    ``` bash
    $ cat secur3.sh
    #!/bin/bash -
    set -o errexit

    foo 2>&1 | xargs echo '- '
    echo "FIN"

    $ ./secur3.sh
    -  tmp: line 4: foo: command not found
    FIN
    ```

  - pipefail modifie ce comportement

    ``` bash
    $ cat secur4.sh
    #!/bin/bash -
    set -o errexit
    set -o pipefail

    foo 2>&1 | xargs echo '- '
    echo "FIN"

    $ ./secur4.sh
    -  tmp: line 5: foo: command not found
    ```

### Flag r: Mode restreint

* Le fait d'exécuter un script ou une partie de script en mode restreint désactive certaines commandes qui, sans cette option, seraient disponibles. Cette mesure de sécurité est prévue pour limiter les droits de l'utilisateur du script et donc minimiser les risques liés à l'exécution du script.

   Les commandes et actions désactivées sont:
  * L'usage de `cd` pour changer de répertoire de travail.
  * Le changement de valeur des variables d'environnement suivantes : `$PATH`, `$SHELL`, `$BASH_ENV`, `$ENV`.
  * La lecture ou le remplacement d'options d'environnement de shell `$SHELLOPTS`.
  * La redirection de sortie.
  * L'appel à des commandes contenant un ou plusieurs /.
  * L'appel à `exec` pour substituer un processus différent de celui du shell.
  * Diverses autres commandes qui pourraient permettre de détourner le script de son objectif initial.
  * La sortie du mode restreint à l'intérieur d'un script.

* Pour lancer un script en mode restreint, utiliser l'option `-r` (`--restricted`)

[Options de Bash](https://abs.traduc.org/abs-fr/ch33.html)
