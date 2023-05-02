---
title: Structures de contrôle
category: Linux, Shell, Bash
---

## If

* Plutôt que de chaîner des commandes avec `&&` et `||`, on peut utiliser des structures de contrôle: si la commande réussit, le code dans le bloc sera exécuté; sinon, le script passera directement au code qui suit la fin du bloc.

  ```
  #!/bin/bash

  if ls -d /bin; then
    echo "Command worked"
  fi
  ```

  Comme la plupart des langages de programmation, il est possible d'ajouter une instruction else:

  ```
  #!/bin/bash

  if ls -d /nop; then
    echo "Command worked"
  else
    echo "Command failed"
  fi
  ```

  Et des else if:

  ```
  #!/bin/bash

  if ls -d /nop; then
    echo "Command worked using /nop"
  elif ls -d /bin; then
    echo "Command worked using /bin"
  else
    echo "Command failed"
  fi
  ```

## Expressions booléennes

### exit status

* Le code retour d'une commande est stocké dans la variable `$?`  
  Si le code retour vaut 0, c'est que la commande a réussit.  
  Sinon, qu'une erreur s'est produite (cf [exit Codes with Special Meanings](http://tldp.org/LDP/abs/html/exitcodes.html))

  Si le code retour est 0, alors on entre dans le bloc `if`

  ``` bash
  $ ls -d /bin
  /bin
  $ echo $?
  0
  $
  $ ls -d /nop
  ls: cannot access '/nop': No such file or directory
  $ echo $?
  2
  ```

### Commande test

* La commande `test` permet de tester différentes conditions — par exemple si un fichier existe ou non, si ce fichier est un répertoire, si une variable est vide, si une chaîne de caractère est égale à une autre, etc.

  ``` bash
  $ test -f /etc/passwd
  $ echo $?
  0
  $
  $ test -f /nop
  $ echo $?
  1
  ```

  On peut donc se servir de cette commande avec un `if`

  ``` bash
  if test $USER = root; then
    echo "Hello root"
  else
    echo "Hello world"
  fi
  ```

### Crochets

* On voit rarement la commande test dans un script shell, à la place on utilise les crochets — ce qui revient à exécuter la commande test. Les espaces après la première accolade et avant la dernière sont obligatoires.

  ``` bash
  if [ $USER = root ]; then
    echo "Hello root"
  else
    echo "Hello world"
  fi
  ```

### Chaîner les tests

* On peut chaîner les commandes test comme on le ferait d'habitude avec `&&` et `||`

  ``` bash
  firstVar="a"
  secondVar="b"

  if [ -z "$firstVar" ] || [ -z "$secondVar" ]; then
    echo "Either firstVar or secondVar is empty"
  else
    echo "Both variables are defined"
  fi

  if [ -n "$firstVar" ] && [ -n "$secondVar" ]; then
    echo "Both variables are defined"
  else
    echo "Either firstVar or secondVar is empty"
  fi
  ```

  Une autre possibilité est d'utiliser les opérateurs `-o` et `-a` à l'intérieur des crochets

  ``` bash
  if [ -z "$firstVar" -o -z "$secondVar" ]; then
    echo "Either firstVar or secondVar is empty"
  else
    echo "Both variables are defined"
  fi

  if [ -n "$firstVar" -a -n "$secondVar" ]; then
    echo "Both variables are defined"
  else
    echo "Either firstVar or secondVar is empty"
  fi
  ```

  Et on peut également inverser le résultat d'un test avec `!`:

  ``` bash
  if [ ! -z "$firstVar" ] && [ ! -z "$secondVar" ]; then
    echo "Both variables are defined"
  else
    echo "Either firstVar or secondVar is empty"
  fi
  ```

### Grouper des commandes

* Il y a deux manières de grouper des commandes / expressions logiques:

  - `( list )`  
    Placer une liste de commandes entre parenthèses oblige l'interpréteur de commandes à créer un sous-shell. Les affectations de variables ne restent pas en vigueur après la fin du sous-shell

  - `{ list, }`  
    Placer une liste de commandes entre accolades permet de grouper des commandes sans créer de sous-shell. Le point-virhule (ou le retour chariot) est obligatoire à la fin de la ligne

### Doubles crochets

* Dans sa version 2.02, Bash introduit l'expression étendue de test: les doubles crochets — qui est une expression en elle-même et non une commande. Cette syntaxe est supportée par ksh, bash et zsh.

  L'expression étendue ajoute des fonctionnalités, notamment les regex et les opérateurs logiques: `&&`, `||`, `<` et `>` fonctionnent à l'intérieur d'une expression `[[ ... ]]` alors qu'ils génèrent une erreur à l'intérieur d'une expression `[ ... ]`

  <table>
  <tr><th align="left">[[ STRING =~ REGEX ]]</th><td>STRING matche la REGEX</td></tr>
  </table>

  ``` bash
  str="Hello World"

  if [[ $str =~ ^Hello ]]; then
    echo "str says Hello"
  fi
  ```

### true et false

* `true` est une commande qui réussit toujours  
  `false` est une commande qui échoue toujours

  ``` bash
  $ which true
  /bin/true
  $ type true
  true is a shell builtin
  $
  $ true
  $ echo $?
  0
  $ false
  $ echo $?
  1
  ```

  ``` bash
  if true; then
    echo "This works"
  fi
  ```

  ``` bash
  b=true
  if $b; then
    echo "This works"
  fi
  ```

### Doubles parentheses

* Les doubles parentheses permettent d'évaluer une expression arithmétique.  
  Si une expression est vraie, son état est 0; et si elle est fausse, son état est 1.  
  Elles fonctionnent seulement avec Bash, version 2.04 ou ultérieure.

  ```
  $ var=1
  $
  $ (( $var > 0 ))
  $ echo $?
  0
  $ (( $var > 2 ))
  $ echo $?
  1
  ```

  ``` bash
  if (( $var > 0 )); then
    echo "var is greater than 0"
  else
    echo "var is negative or null"
  fi
  ```

  `((...))` est une évaluation arithmétique et peut être utilisé dans if `if`.  
  `$((...))` est une expansion arithmétique et retourne un résultat qu'on peut afficher / assigner.  
  `$[...]` est l'ancienne syntaxe de l'expansion arithmétique et est dépréciée.  
  Le résultat d'une comparaison via expansion arithmétique est l'inverse du statut de l'évaluation arithmétique (1 = true, 0 = false).

  ```
  $ echo $(( $var > 0 ))
  1
  $ echo $(( $var > 2 ))
  0
  $
  $ let "res = (( $var > 0 ))"
  $ echo $res
  1
  $ let "res = (( $var > 2 ))"
  $ echo $res
  0
  ```

---

## Condition ternaire

* Pour une chaîne de caractère: utiliser une substitution de commande avec des opérateurs logiques

  ``` bash
  a=$([ "$b" == 5 ] && echo "$c" || echo "$d")
  ```

* Pour un nombre: la syntaxe `? :` est supportée

  ``` bash
  (( a = b==5 ? c : d ))
  ```

  ou

  ``` bash
  a=$(( b==5 ? c : d ))
  ```

## Switch

Permet d'exécuter un bloc de code uniquement lorsque la valeur d'une variable correspond à un motif donné.

``` bash
case $1 in
  "Chien" | "Chat" | "Souris")
    echo "C'est un animal"
    ;;
  "Bob")
    echo "C'est Bob"
    ;;
  *)
    echo "Je ne sais pas ce que c'est"
    ;;
esac
```

``` bash
case $var in
  [0-9]*)
    echo "$var est un nombre."
    ;;
  [a-zA-Z]*)
    echo "$var est un mot."
    ;;
  *)
    echo "$var n'est ni un nombre ni un mot."
    ;;
esac
```

``` bash
#!/bin/sh -
option="$1"
fichier="$2"

case $option in
  -d) [ -d $fichier ] &&
    echo "Repertoire: ’$fichier’";;
  -f) [ -f $fichier ] &&
    echo "Fichier: ’$fichier’";;
  -x) [ -x $fichier ] &&
    echo "Executable: ’$fichier’";;
  [*])
    echo "Un *";;
  *)
    echo "Option non traitee"
  exit 1;;
esac
```

## test

### Chaîne de caractères

<table>
<tr><th align="left">[ -z STRING ]</th><td>Vide</td></tr>
<tr><th align="left">[ -n STRING ]</th><td>Non vide</td></tr>
<tr><th align="left">[ STRING1 = STRING2 ]</th><td>Égalité</td></tr>
<tr><th align="left">[ STRING1 != STRING2 ]</th><td>Non égalité</td></tr>
<tr><th align="left">[ STRING1 < STRING2 ]</th><td>Dans un tri alphabétique, STRING1 vient avant STRING2</td></tr>
<tr><th align="left">[ STRING1 > STRING2 ]</th><td>Dans un tri alphabétique, STRING1 vient après STRING2</td></tr>
</table>

Tip:  
-z retourne vrai si la taille de la chaîne vaut zéro  
-n retourne vrai si la taille de la chaîne n'est pas zéro

``` bash
$ empty=""
$ var="value"

$ [ -z "$undefined" ] && echo "yes" || echo "no"
yes
$ [ -z "$empty" ] && echo "yes" || echo "no"
yes
$ [ -z "$var" ] && echo "yes" || echo "no"
no

$ [ -n "$undefined" ] && echo "yes" || echo "no"
no
$ [ -n "$empty" ] && echo "yes" || echo "no"
no
$ [ -n "$var" ] && echo "yes" || echo "no"
yes
```

``` bash
if [ -n "$1" ]; then
  if [ ! -r "$1" ]; then
    echo "Could not read file \"$1\"" >&2
    exit 1
  fi
  echo "Input from file \"$1\""
else
  echo "Input from stdin"
fi
```

### Fichiers

<table>
<tr><th align="left">[ -e "/home/$USER" ]</th><td>Existe</td></tr>
<tr><th align="left">[ -d "/etc" ]</th><td>Est un répertoire</td></tr>
<tr><th align="left">[ -f "/etc/passwd" ]</th><td>Est un fichier régulier</td></tr>
<tr><th align="left">[ -h "/bin/sh" ]</th><td>Est un lien symbolique</td></tr>
<tr><th align="left">[ -b "/dev/sda2" ]</th><td>Est un périphérique de type bloc</td></tr>
<tr><th align="left">[ -c "/dev/ttyS1" ]</th><td>Est un périphérique de type caractère</td></tr>
<tr><th align="left">[ -p "/dev/fd/0" ]</th><td>Est un périphérique de type pipe</td></tr>
<tr><th align="left">[ -S "/var/run/docker.sock" ]</th><td>Est un socket</td></tr>
<tr><th align="left">[ -x FILE ]</th><td>Est executable</td></tr>
<tr><th align="left">[ -r FILE ]</th><td>Est accessible en lecture</td></tr>
<tr><th align="left">[ -w FILE ]</th><td>Est accessible en écriture</td></tr>
<tr><th align="left">[ -s FILE ]</th><td>Taille > 0 octets</td></tr>
<tr><th align="left">[ -g FILE ]</th><td>A le flag setgid</td></tr>
<tr><th align="left">[ -u FILE ]</th><td>A le flag setuid</td></tr>
<tr><th align="left">[ -k FILE ]</th><td>A le flag sticky bit</td></tr>
<tr><th align="left">[ FILE1 -nt FILE2 ]</th><td>1 est plus récent que 2</td></tr>
<tr><th align="left">[ FILE1 -ot FILE2 ]</th><td>1 est plus ancien que 2</td></tr>
<tr><th align="left">[ FILE1 -ef FILE2 ]</th><td>Même fichier</td></tr>
<tr><th align="left">[ -N FILE ]</th><td>A une date d'accès inférieure ou égale à la date de modification</td></tr>
<tr><th align="left">[ -U FILE ]</th><td>L'utilisateur en cours est propriétaire du fichier</td></tr>
<tr><th align="left">[ -G FILE ]</th><td>L'utilisateur en cours fait partie du groupe propriétaire du fichier</td></tr>
</table>

Tip:  
-nt: newer than  
-ot: older than  
-ef: equal file

``` bash
if [ -e file1.txt ]; then
  echo "File exists"
fi
```
``` bash
$ touch test1 test2
$ [ test1 -ef test2 ] && echo "yes" || echo "no"
no
$ ln -s test1 test3
$ [ test1 -ef test3 ] && echo "yes" || echo "no"
yes
```
``` bash
$ touch test
$ [ -N test ] && echo "yes" || echo "no"
yes
$
$ cat test
$ [ -N test ] && echo "yes" || echo "no"
yes
$
$ echo "Hello World" > test
$ [ -N test ] && echo "yes" || echo "no"
yes
$
$ touch -a test
$ [ -N test ] && echo "yes" || echo "no"
no
$
$ touch test
$ [ -N test ] && echo "yes" || echo "no"
yes
```

### Arithmétique

<table>
<tr><th align="left">[ NUM -eq NUM ]</th><td>Égalité</td></tr>
<tr><th align="left">[ NUM -ne NUM ]</th><td>Non égalité</td></tr>
<tr><th align="left">[ NUM -lt NUM ]</th><td>Inférieur à</td></tr>
<tr><th align="left">[ NUM -le NUM ]</th><td>Inférieur ou égal à</td></tr>
<tr><th align="left">[ NUM -gt NUM ]</th><td>Supérieur à</td></tr>
<tr><th align="left">[ NUM -ge NUM ]</th><td>Supérieur ou égal à</td></tr>
</table>

``` bash
ls -d /nop

if [ $? -eq 0 ]; then
  echo "Last command succeeded"
else
  echo "Last command failed than 100"
fi
```

### Logique

<table>
<tr><th align="left">[ ! EXPR ]</th><td>Non</td></tr>
<tr><th align="left">[ EXPR1 -a EXPR2 ]</th><td>Et</td></tr>
<tr><th align="left">[ EXPR1 -o EXPR2 ]</th><td>Ou</td></tr>
</table>

``` bash
if [ -f "/usr/bin/netscape" -a -f "/usr/share/doc/HTML/index.html" ]; then
  netscape /usr/share/doc/HTML/index.html &
fi
```

