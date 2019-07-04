---
title: Script
category: Linux, Shell
---

## Code retour

La commande `exit` permet d'arrêter l'execution du script avec le statut donné (code numérique) — ou 0 si omis.

``` bash
file="/var/file"

if [ ! -f $file ]; then
  echo "Le fichier $file n'existe pas" >&2
  exit 1
fi
```

[Exit Codes with Special Meanings](http://tldp.org/LDP/abs/html/exitcodes.html)

---

## Prompt

La commande `read` permet de récuperer une entrée de l'utilisateur, interractivement.

``` bash
while true; do
printf "Terminer le processus [y/N]? "
  read answer

  if [ "$answer" = "y" ]; then
    exit
  fi
done
```

``` bash
flechehaut=$'\x1b[A'
flechebas=$'\x1b[B'
flechegauche=$'\x1b[D'
flechedroite=$'\x1b[C'

read -s -n3 -p "Appuyez sur une flèche : " x

case "$x" in
$flechehaut)
   echo "Vous avez appuyé sur la flèche haute"
   ;;
$flechebas)
   echo "Vous avez appuyé sur la flèche basse"
   ;;
$flechegauche)
   echo "Vous avez appuyé sur la flèche gauche"
   ;;
$flechedroite)
   echo "Vous avez appuyé sur la flèche droite"
   ;;
esac
```

---

## Opérations mathématiques

Les doubles parenthèses permettent d'effectuer des opérations mathématiques.  
On peut également utiliser les commandes `expr` ou `let` pour des opérations simples

* `expr`

  ```
  result=`expr $var + 1`
  ```

* `let`

  ```
  let "result=var+1"
  ```

  ``` bash
  let "dec = 32"
  let "oct = 032"
  let "hex = 0x32"

  echo $dec # 32
  echo $oct # 26
  echo $hex # 50
  ```

* `(( ... ))`

  ```
  ((result=var+1))
  ```

  ``` bash
  # Opération mathématique simple
  num=10
  echo $(( num+1 ))       # 11

  # Incrémenter
  ((num++))
  echo $num               # 11

  # Interpréter une chaîne de caractère
  operation="$num+1"
  echo $operation         # 11+1
  echo $((operation))     # 12

  # Récupérer un nombre aléatoire
  it=$RANDOM              # nombre aléatoire
  it=$(($RANDOM%100))     # nombre aléatoire entre 0 et 100
  it=$((1+($RANDOM%100))) # nombre aléatoire entre 1 et 100

  # Conversion de base
  echo $(( 0x9abc ))
  echo $(( 16#9abc ))     # Base 16 (ou autre) à base 10
  ```

  [Les opérateurs](https://abs.traduc.org/abs-fr/ch08.html)

---

## Fonctions

* Définir une fonction:

  ```
  myfunc() {
    # content
  }
  ```

* Appeler une fonction:

  ```
  myfunc
  ```

* Passer des paramètres

  ```
  myfunc() {
    echo $1
  }
  myfunc "Hello World"
  ```

  ```
  DEFAULT="Hello World"

  myfunc() {
    var=${1-$DEFAUT}
    echo $var
  }
  myfunc "Hello You !"
  ```

* Récupérer le résultat

  ```
  myfunc() {
    return $(( $1 + 1 ))
  }
  myfunc 10
  echo $?  # 11
  ```

  ```
  myfunc() {
    echo "Hello $1!"
  }

  name="Bob"
  msg=`myfunc $name`
  echo "Message: $msg" # Message: Hello Bob!
  ```

Il est possible d'écraser une fonction existante.

```
fonction() {
  echo "Première version de func ()."
}

fonction() {
  echo "Deuxième version de func ()."
}

fonction   # Deuxième version de func ().
```

Les fonctions permettent de rendre le code beaucoup plus lisible.  
[Exemple script](https://github.com/docker/cli/blob/086df60bab3dad7ffb5cb7b5169741ddd78e23c8/scripts/test/e2e/run)

---

## Paramètres

La fonction `getopts` permet de récupérer les options passés au script.

* Fichier `exemple`

  ``` bash
  #!/bin/bash
  usage() { echo "Usage: $0 [-n <45|90>] [-m <string>]" 1>&2; exit 1; }

  # Si la lettre est suivit de deux-points,
  # getopts définit la variable OPTARG avec la valeur de l'option
  while getopts ":n:m:" option; do
      case "${option}" in
          n)
              num=${OPTARG}
              ((num == 45 || num == 90)) || usage
              ;;
          m)
              msg=${OPTARG}
              ;;
          :)
            echo "Invalid Option: -$OPTARG requires an argument" 1>&2
            usage
            ;;
          *)
            echo "Invalid Option: -$OPTARG" 1>&2
            usage
            ;;
      esac
  done

  # Déplace le pointeur d'argument à la suite
  shift $((OPTIND-1))

  echo "Number  = ${num}"
  echo "Message = ${msg}"
  echo $1
  ```

* Éxecuter

  ```
  bash exemple -n 45 -m "Hello World" run
  ```

  Résultat:

  ```
  Number  = 45
  Message = Hello World
  run
  ```

`getopts` ne prend pas en charge les options longues.  
On peut tricher en définissant `-` comme option.

``` bash
#!/usr/bin/env bash 
optspec=":hv-:"
while getopts "$optspec" optchar; do
    case "${optchar}" in
        -)
            case "${OPTARG}" in
                loglevel)
                    val="${!OPTIND}"; OPTIND=$(( $OPTIND + 1 ))
                    echo "Parsing option: '--${OPTARG}', value: '${val}'" >&2;
                    ;;
                loglevel=*)
                    val=${OPTARG#*=}
                    opt=${OPTARG%=$val}
                    echo "Parsing option: '--${opt}', value: '${val}'" >&2
                    ;;
                *)
                    if [ "$OPTERR" = 1 ] && [ "${optspec:0:1}" != ":" ]; then
                        echo "Unknown option --${OPTARG}" >&2
                    fi
                    ;;
            esac;;
        h)
            echo "usage: $0 [-v] [--loglevel[=]<value>]" >&2
            exit 2
            ;;
        v)
            echo "Parsing option: '-${optchar}'" >&2
            ;;
        *)
            if [ "$OPTERR" != 1 ] || [ "${optspec:0:1}" = ":" ]; then
                echo "Non-option argument: '-${OPTARG}'" >&2
            fi
            ;;
    esac
done
```

Ou utiliser `getopt`

``` bash
# NOTE: This requires GNU getopt.  On Mac OS X and FreeBSD, you have to install this
# separately; see below.
TEMP=`getopt -o vdm: --long verbose,debug,memory:,debugfile:,minheap:,maxheap: \
             -n 'javawrap' -- "$@"`

if [ $? != 0 ] ; then echo "Terminating..." >&2 ; exit 1 ; fi

# Note the quotes around `$TEMP': they are essential!
eval set -- "$TEMP"

VERBOSE=false
DEBUG=false
MEMORY=
DEBUGFILE=
JAVA_MISC_OPT=
while true; do
  case "$1" in
    -v | --verbose ) VERBOSE=true; shift ;;
    -d | --debug ) DEBUG=true; shift ;;
    -m | --memory ) MEMORY="$2"; shift 2 ;;
    --debugfile ) DEBUGFILE="$2"; shift 2 ;;
    --minheap )
      JAVA_MISC_OPT="$JAVA_MISC_OPT -XX:MinHeapFreeRatio=$2"; shift 2 ;;
    --maxheap )
      JAVA_MISC_OPT="$JAVA_MISC_OPT -XX:MaxHeapFreeRatio=$2"; shift 2 ;;
    -- ) shift; break ;;
    * ) break ;;
  esac
done
```

[Using getopts to process long and short command line options](https://stackoverflow.com/questions/402377/using-getopts-to-process-long-and-short-command-line-options#answer-7948533)

---

## Exec

`exec` permet de rediriger les descripteurs de fichier.

``` bash
# Sauvegarde stdin dans fd6
exec 6<&0

# Remplace stdin par le fichier "datafile"
exec < datafile

# Lit les lignes du fichier "datafile"
read a1            
read a2

# Restaure stdin à partir de fd6
# puis supprime fd6
exec 0<&6 6<&-
```

``` bash
# Sauvagrde stdout dans fd6
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
```

---

## Mode restreint

Le fait d'exécuter un script ou une partie de script en mode restreint désactive certaines commandes qui, sans cela, seraient disponibles. Cette mesure de sécurité est prévue pour limiter les droits de l'utilisateur du script et donc minimiser les risques liés à l'exécution du script.

 Les commandes et actions ci-dessous sont désactivées :
* L'usage de `cd` pour changer de répertoire de travail.
* Le changement de valeur des variables d'environnement suivantes : `$PATH`, `$SHELL`, `$BASH_ENV`, `$ENV`.
* La lecture ou le remplacement d'options d'environnement de shell `$SHELLOPTS`.
* La redirection de sortie.
* L'appel à des commandes contenant un ou plusieurs /.
* L'appel à `exec` pour substituer un processus différent de celui du shell.
* Diverses autres commandes qui pourraient permettre de détourner le script de son objectif initial.
* La sortie du mode restreint à l'intérieur d'un script.

Pour lancer un script en mode restreint, utiliser l'option `-r` (`--restricted`)

```
#!/bin/bash -r
```

```
set -r
```

[Options de Bash](https://abs.traduc.org/abs-fr/ch33.html)

---

## Couleurs

``` bash
# Efface l'écran.
clear

# Liste de contacts: Blanc sur fond bleu
echo -n "          "
echo -e '\E[37;44m'"\033[1mListe de contacts\033[0m"
echo; echo

# Choisissez une des personnes suivantes: Bold
echo -e "\033[1mChoisissez une des personnes suivantes :\033[0m"
tput sgr0

# (Entrez seulement les premières lettres du nom)
echo "(Entrez seulement les premières lettres du nom)"
echo

# [E]vans, Roland: Bleu sur fond blanc
echo -en '\E[47;34m'"\033[1mE\033[0m"
tput sgr0
echo "vans, Roland"

# [J]ones, Milfred: Magenta sur fond blanc
echo -en '\E[47;35m'"\033[1mJ\033[0m"
tput sgr0
echo "ones, Mildred"

# [S]mith, Julie: Vert sur fond blanc
echo -en '\E[47;32m'"\033[1mS\033[0m"
tput sgr0
echo "mith, Julie"

# [Z]ane, Morris: Rouge sur fond blanc
echo -en '\E[47;31m'"\033[1mZ\033[0m"
tput sgr0
echo "ane, Morris"
echo
```

![](https://i.imgur.com/UDDH9yR.png)

[ANSI Escape sequences](http://ascii-table.com/ansi-escape-sequences.php)

---

## Binaire

On peut créer un binaire exécutable à partir d'un script en utilisant [shc](http://www.datsi.fi.upm.es/~frosal/sources/).  
Le binaire peut, dans certains cas, etre décrypté pour retrouver le code source original ([article](http://www.linuxjournal.com/article/8256)).