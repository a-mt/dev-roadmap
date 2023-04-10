---
title: Interraction utilisateur
category: Linux, Shell, Bash
---

## Paramètres

### Unix-style

* La fonction `getopts` permet de récupérer les options passés au script.

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

  ```
  $ bash monScript.sh -n 45 -m "Hello World" run
  Number  = 45
  Message = Hello World
  run
  ```

* Les options longues ne sont pas supportées mais on peut tricher en utilisant deux `case` imbriqués.

  <details>
    <summary>Exemple</summary>

    <pre lang="bash">
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
    </pre>
  </details>

### Bash-style

* `getopt` quand à elle supporte les options longues

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

## Prompt

La commande `read` permet de récupérer interactivement une entrée de l'utilisateur.

``` bash
while true; do
  printf "Terminer le processus [y/N]? "
  read answer

  if [ "$answer" = "y" ]; then
    exit
  fi
done
```

On peut lire non seulement du texte mais aussi des touches spéciales:

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

## Select

`select` permet d'afficher une question à choix multiple.  
Il se comporte comme une boucle: il affiche un prompt à l'utilisateur tant qu'on ne `break` pas.

``` bash
echo "Que voulez-vous faire?"
select action in "ActionA" "ActionB" "Quitter"
do
  echo "Vous avez dit: $action"
  if [ "$action" = "Quitter" ]; then
    break
  fi
done
```

```
Que voulez-vous faire?
1) ActionA
2) ActionB
3) Quitter
#? 1
Vous avez dit: ActionA
#? 
1) ActionA
2) ActionB
3) Quitter
#? 4
Vous avez dit: 
#? 3
Vous avez dit: Quitter
$
```

---

## Couleurs

* Bash accepte certains caractères spéciaux pour modifier l'affichage, déplacer le curseur et réaffecter des touches.  
  [ANSI Escape sequences](http://ascii-table.com/ansi-escape-sequences.php)

* `Esc[VALUE;...;VALUEm` permet de modifier l'affichage:

  ``` bash
  echo -e '          \E[37;44m\033[1m'Liste de contacts'\033[0m'
  echo
  echo
  echo -e '\033[1m'Choisissez une des personnes suivantes :'\033[0m'
  echo \(Entrez seulement les premières lettres du nom\)
  echo
  echo -e '\E[47;34m\033[1m'E'\033[0m'vans, Roland
  echo -e '\E[47;35m\033[1m'J'\033[0m'ones, Mildred
  echo -e '\E[47;32m\033[1m'S'\033[0m'mith, Julie
  echo -e '\E[47;31m\033[1m'Z'\033[0m'ane, Morris
  echo
  ```

  ![](https://i.imgur.com/UDDH9yR.png)

  <ins>Les valeurs acceptées sont</ins>:

  <table>
    <tr><td>&emsp;&emsp;</td><td></td></tr>
    <tr>
      <th colspan="2" align="center">Attributs du texte</th>
    </tr>
    <tr>
      <th>0</th>
      <td>Aucun</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Bold</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Underscore (on monochrome display adapter only)</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Blink</td>
    </tr>
    <tr>
      <th>7</th>
      <td>Reverse video</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Concealed</td>
    </tr>

    <tr>
      <th colspan="2" align="center">Couleurs du texte</th>
    </tr>
    <tr>
      <th>30</th>
      <td>Black</td>
    </tr>
    <tr>
      <th>31</th>
      <td>Red</td>
    </tr>
    <tr>
      <th>32</th>
      <td>Green</td>
    </tr>
    <tr>
      <th>33</th>
      <td>Yellow</td>
    </tr>
    <tr>
      <th>34</th>
      <td>Blue</td>
    </tr>
    <tr>
      <th>35</th>
      <td>Magenta</td>
    </tr>
    <tr>
      <th>36</th>
      <td>Cyan</td>
    </tr>
    <tr>
      <th>37</th>
      <td>White</td>
    </tr>

    <tr>
      <th colspan="2" align="center">Couleurs du fond</th>
    </tr>
    <tr>
      <th>40</th>
      <td>Black</td>
    </tr>
    <tr>
      <th>41</th>
      <td>Red</td>
    </tr>
    <tr>
      <th>42</th>
      <td>Green</td>
    </tr>
    <tr>
      <th>43</th>
      <td>Yellow</td>
    </tr>
    <tr>
      <th>44</th>
      <td>Blue</td>
    </tr>
    <tr>
      <th>45</th>
      <td>Magenta</td>
    </tr>
    <tr>
      <th>46</th>
      <td>Cyan</td>
    </tr>
    <tr>
      <th>47</th>
      <td>White </td>
    </tr>
  </table>

## Écrire dans stderr

``` bash
# Écrit dans stdout
echo "Tout va bien"

# Écrit dans stderr
echo "Une erreur" >&2
```

---

## Code retour

La commande `exit` permet d'arrêter l'execution du script avec un statut donné (code numérique) — ou 0 si omis.

``` bash
file="/var/file"

if [ ! -f $file ]; then
  echo "Le fichier $file n'existe pas" >&2
  exit 1
fi
```

[Exit Codes with Special Meanings](http://tldp.org/LDP/abs/html/exitcodes.html)
