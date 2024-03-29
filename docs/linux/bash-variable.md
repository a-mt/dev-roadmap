---
title: Variables
category: Linux, Shell, Bash
---

## Créer une variable

* Une variable est une donnée nommée et stockée temporairement en mémoire.  
  Le type d'une variable n'est pas déclaré, on affecte simplement à une valeur et son type est interprété selon le contexte (opération arithmétique, affichage texte, etc).

* Il existe deux types de variables utilisateur:

  * <u>les variables d'environnement</u>, aussi appelée variables globales  
    Sont communes à tous les processus et accessibles partout.  
    Les variables PATH, HOME et HISTSIZE sont des exemples de variables d'environnement.  
    Par convention, leur nom est en majuscule.  

    ``` bash
    export NOM_VARIABLE=value

    VAR1="value1"
    VAR2="value2"
    export VAR1 VAR2
    ```

    Notons que les processus enfant peuvent modifier les variables exportées, mais le changement ne se propage pas au shell parent: les variables exportées ne sont pas partagées mais seulement copiées.

  * <u>les variables locales</u>  
    Sont définies uniquement pour le shell courant, les processus enfants n'en héritent pas.  
    Par convention, leur nom est en minuscule

    ``` bash
    nom_variable=value
    ```

Il y a différentes manières d'affecter la valeur d'une variable.  
Dans tous les cas, ne jamais mettre d'espaces autour du égal — ils sont invalides à cet endroit

<table>
<tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
<tr>
  <th colspan="2" align="center">Texte</th>
</tr>
<tr>
  <th align="left">var=test</th>
  <td>Affecte la valeur "test" à la variable var. <br>
    Si la valeur contient des caractères spéciaux, comme "$", alors il faut les échapper.<br>
    Si la valeur contient des espaces, alors il est nécessaire d'utiliser des quotes.</td>
</tr>
<tr>
  <th align="left">var="hello world"</th>
  <td>Affecte la valeur "hello world" à la variable var. <br>
    Les caractères spéciaux, comme "$", doivent être échappés.</td>
</tr>
<tr>
  <th align="left">var=$'1\n2'</th>
  <td>Affecte la chaîne de caractère à la variable var en interprétant les <a href="https://www.gnu.org/software/bash/manual/bash.html#ANSI_002dC-Quoting">caractères spéciaux</a>.
  <pre lang="shell">var=$'1\n2'
echo "$var"</pre></td>
</tr>
<tr>
  <th align="left">var=$"Text"</th>
  <td>Affecte la traduction de "Text" à la variable var, selon la locale en cours.
  <pre lang="shell"># cd /usr/share/locale/fr/LC_MESSAGES
# ls
# msgunfmt apt.mo
TEXTDOMAIN=apt
msg=$"Write error"
echo $msg # Erreur d'écriture</pre></td>
</tr>
<tr>
  <th align="left">var=$(cat &lt;&lt;HEREDOC<br>
Hello $name,<br>
Tu as $n nouveaux messages!<br>
HEREDOC<br>
)</th>
  <td>Affecte une valeur sur plusieurs lignes à la variable var. <br>
    Les caractères spéciaux, comme "$", doivent être échappés.<br>Le délimiteur de fin doit être seul sur la ligne</td>
</tr>
<tr>
  <th align="left">var=$(cat &lt;&lt;'NOWDOC'<br>
Get the full ebook for only 9.99$<br>
NOWDOC<br>
)</th>
  <td>Affecte une valeur sur plusieurs lignes à la variable var. <br>
    Les caractères spéciaux ne sont pas interprétés.</td>
</tr>
<tr>
  <th colspan="2" align="center">Subtitution de commande</th>
</tr>
<tr>
  <th align="left">var=`pwd`</th>
  <td>Affecte le résultat de la commande "pwd" à la variable var.<br> Il n'est pas possible d'imbriquer les backticks
  <pre lang="shell">user=`whoami`
echo "Salut ${user}!"</pre></td>
</tr>
<tr>
  <th align="left">var=$(basename $(pwd))</th>
  <td>Donne le résultat de la commande "pwd" à la commande "basename" et affectue ce résultat à la variable var.<br> Possibilité d'imbriquer les commandes avec cette syntaxe
  <pre lang="shell">dir=$(basename $(pwd))
echo "Dossier: $dir"</pre>

<pre lang="shell">echo "Hello World"
var=$(!!)
echo $var # Hello World</pre></td>
</tr>
<tr>
  <th colspan="2" align="center">Opérations mathématiques</th>
</tr>
<tr>
  <th align="left">var=$(($var + 1))</th>
  <td><code>$(( ... ))</code> permet d'effectuer des <a href="https://www.gnu.org/software/bash/manual/html_node/Shell-Arithmetic.html#Shell-Arithmetic">opérations arithmétiques</a>
  <pre lang="shell">$ var=1
$ var=$(($var + 1))
$ echo $var
2
</pre>
<pre lang="shell">
$ operation="$var + 1"
$ echo operation
2 + 1
$ echo $((operation))
3</pre>

Accepte une base différente de 10:

<pre lang="shell">hexa=AF
echo $(( 16#$hexa )) # 175</pre>

RANDOM est une variable d'environnement spéciale: elle contient un nombre aléatoire

<pre lang="shell">$ echo $RANDOM
4386
$ echo $RANDOM
21621
$ echo $((RANDOM%=200))      # nombre aléatoire entre 0 et 200
155
$ echo $((1+($RANDOM%100)))  # nombre aléatoire entre 1 et 100</pre></td>
</tr>
<tr>
  <th align="left">let var=var+1</th>
  <td>
  Le mot-clé <code>let</code> permet d'assigner la valeur d'une variable avec une évaluation arithmétique.

  <pre lang="shell">
  $ var=1
  $ let var++
  $ echo $var
  2
  $ let var=var+10
  $ echo $var
  12
  </pre>

  Accepte la notation octale et hexadécimale:

  <pre lang="shell">
  let "dec = 32"
  let "oct = 032"
  let "hex = 0x32"

  echo $dec # 32
  echo $oct # 26
  echo $hex # 50
  </pre>
</td>
</tr>
<tr>
<th align="left">bc &lt;&lt;&lt; $var/2</th>
<td>
  Bash ne supporte que les opérations mathématiques sur les entiers, <code>bc</code> permet d'utiliser des réels

  <pre lang="shell">
  $ t=23850.96
  $ echo $(bc &lt;&lt;&lt; $t/3600):$(bc &lt;&lt;&lt; $t%3600/60)
  6:37
  </pre>
</td>
</tr>
</table>

---

## Variables spéciales

* Chaque script a des variables spéciales, créées automatiquement par le shell:

  | Variable    | Description
  |---          |---
  | 0,1,2,3,... | Paramètres utilisés pour lancer le script en cours.<br> 0 contient le nom de la commande (telle qu'elle a été appelée, peut être un path absolu ou relatif ou même un lien symbolique), 1 et plus contiennent le reste des paramètre
  | #           | Nombre de paramètres passés au script
  | @           | Liste des paramètres passés au script (à partir de 1)
  | ?           | Statut de la dernière commande (code numérique).<br> 0 si OK, différent de 0 en cas d'erreur
  | $           | PID du shell exécutant le script

  ``` bash
  #!/bin/bash
  if [ $# = 0 ]; then
    echo 'Usage: chr NUM'
    exit 1
  fi
  python -c "print(chr($1))"
  ```

  ``` bash
  if [ "$1" == "-h" ]; then
    display_help
    exit 0
  fi
  ````

---

## Afficher la valeur

* Pour afficher la valeur d'une variable, on précède son nom par `$`.

  ``` bash
  $ username="bob"
  $ echo $username
  bob
  ```

  <details>
    <summary>Exemple avec variables spéciales</summary>

    <pre lang="bash">
    $ cat exemple.sh

    # Variable d'environnement
    echo Shell: $SHELL

    # Variable locale
    mavariable=test
    echo Variable: $mavariable

    # Variables spéciales
    echo PID: $$
    echo Nombre de paramètres: $#
    echo 0: $0
    echo 1: $1
    echo 2: $2
    echo 3: $3

    for i in $@; do
      echo - $i
    done
    </pre>
    <pre lang="bash">
    $ bash exemple.sh -H hello world !
    Shell: /bin/bash
    Variable: test
    PID: 15206
    Nombre de paramètres: 4
    0: exemple
    1: -H
    2: hello
    3: world
    - -H
    - hello
    - world
    - !
    </pre>
  </details>

Suivant la manière dont on veut afficher les caractères spéciaux, on peut utiliser des variantes:

<table>
<tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
<tr>
  <th align="left">echo $var</th>
  <td>Écrit la valeur de la variable <code>var</code>.<br>Le dollar s'applique au mot qui le suit (un mot est une suite de lettres, chiffres ou underscore)
  <pre lang="shell">var=test
echo $var     # test</pre>
  </td>
</tr>
<tr>
  <th align="left">echo "$var"</th>
  <td>Écrit la valeur de la variable <code>var</code> en empêchant l'interprétation des caractères spéciaux par le shell. Permet d'afficher les caractères spéciaux, qui ne seraient pas visibles autrement puisqu'interceptés par le shell.
  <pre lang="shell">$ var=$'1\n2'
$ echo $var
1 2
$ echo "$var"
1
2
</pre>
  </td>
</tr>
<tr>
  <th align="left">print "%q\n" "$var"</th>
  <td>Écrit la valeur de la variable <code>var</code> en <a href="https://www.gnu.org/software/bash/manual/bash.html#ANSI_002dC-Quoting">ANSI C Quoting</a> = remplace les caractères spéciaux par les séquences de caractères qui correspondent.
  <pre lang="shell">$ var=$'1\n2'
$ echo "$var"
1
2
printf "%q\n" "$var"
$'1\n2'
</pre></td>
</tr>
<tr>
  <th align="left">echo -e $var</th>
  <td>Écrit la valeur de la variable <code>var</code> en remplaçant les séquences de caractère spécial par le caractère désigné
  <pre lang="shell">$ var='1\t2'
$ echo $var
1\t2
$ echo -e $var
1    2</pre></td>
</tr>
<tr>
  <th align="left">echo ${var}</th>
  <td>Écrit la valeur de la variable <code>var</code>.<br>La syntaxe ${} permet de délimiter la variable ainsi que de lui appliquer des filtres.
  <pre lang="shell">$ var=test
$ echo $varok

$ echo $var"ok"
testok
$ echo $var\ok
testok
$ echo $var ok
testok
$ echo "$var"ok
testok
$ echo ${var}ok
testok</pre>
  </td>
</tr>
</table>

---

## Lister les variables

* Pour lister les variables d'environnement définies, on peut utiliser `env` ou `printenv`

  ```
  env
  printenv
  printenv PATH
  ```

  [Variables d'environnement du Shell](https://wiki.bash-hackers.org/syntax/shellvars)

* Pour afficher toutes les variables définies (globales et locales): `$ <tab> <tab>`

## Supprimer une variable

* Pour supprimer une variable, locale ou d'environnement, utiliser `unset`

  ``` bash
  unset var
  ```

---

## Interpolation de variable

* Une fois une variable créée, il est possible de récupérer la valeur en lui faisant subir des modifications — qui ne seront pas enregistrées dans la variable.

<table>
<tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
<tr>
  <th align="left">${!ref}</th>
  <td>Retourne la valeur de la variable désignée par ref
  <pre lang="shell">prix=ttc
ht=1
ttc=1.20
echo ${!prix} # 1.20</pre></td>
</tr>
<tr>
  <th align="left">${#var}</th>
  <td>Retourne le nombre de caractère de la valeur de var<br>Ou le nombre d'éléments si var est un tableau
  <pre lang="shell">var=abc
echo ${#var}  # 3</pre></td>
</tr>
<tr>
  <th align="left">${!var@}</th>
  <td>Retourne la liste des variables qui commençent par var<br><code>${!var*}</code> marche aussi
  <pre lang="shell">var1="A"
var2="B"
echo ${!var@} # var1 var2</pre>
  </td>
</tr>
</table>

``` bash
$ var1=A
$ var2=B

$ for varname in ${!var*}; do echo "${varname}: ${!varname}"; done
var: A
var: B
```

### Isset

<table>
<tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
<tr>
  <th align="left">${var:-nok}</th>
  <td>Retourne la valeur de var ou la chaîne "nok" si la valeur est vide ou que la variable n'existe pas.
      La valeur de var n'est pas affectée
      <pre lang="shell">var=""
echo ${var:-NA} # NA
echo $var       # (rien)</pre>
  </td>
</tr>
<tr>
  <th align="left">${var:+ok}</th>
  <td>Retourne "ok" si var existe et a une valeur.
      <br>La valeur de var n'est pas affectée
      <pre lang="shell">var=""
echo ${var:+ok}   # (rien)
echo $var         # (rien)</pre>
  </td>
</tr>
<tr>
  <th align="left">${var:=nok}</th>
  <td>Affecte var à "nok" si la valeur de var est vide ou que la variable n'existe pas puis affiche la valeur de var.
      <pre lang="shell">var=""
echo ${var:=NA} # NA
echo $var       # NA</pre>
  </td>
</tr>
<tr>
  <th align="left">${var:?nok}</th>
  <td>Affiche "nok" dans stderr si la variable var n'existe pas ou que sa valeur est vide.
      <br>La valeur de var n'est pas affectée
      <pre lang="shell">var=""
echo ${var:?NA} # bash: var: NA (dans stderr)
echo $var       # (rien)</pre>
  </td>
</tr>
</table>

### Truncate

<table>
<tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
<tr>
  <th align="left">${var:3}</th>
  <td>À partir de l'index 3 =<br>Supprime les 3 premiers caractères de la variable var
  <pre lang="shell">var=123456789
echo ${var:3}      # 456789</pre></td>
</tr>
<tr>
  <th align="left">${var:0:3}</th>
  <td>À partir de l'index 0, 3 caractères =<br>Retourne les 3 premiers caractères de la variable var
  <pre lang="shell">var=123456789
echo ${var:0:3}    # 123
echo ${var:0:12}   # 123456789</pre></td>
</tr>
<tr>
  <th align="left">${var:2:1}</th>
  <td>À partir de l'index 2, 1 caractère =<br>Retourne le 3ème caractère de la variable var
  <pre lang="shell">var=123456789
echo ${var:2:1}    # 3</pre></td>
</tr>

<tr><td colspan="2"></td></tr>
<tr>
  <th align="left">${var:0:-3}</th>
  <td>À partir de l'index 0, le nombre de caractères dans la chaîne - 3 =<br>Supprime les 3 derniers caractères de la variable var
  <pre lang="shell">var=123456789
echo ${var:0:-3}   # 123456</pre></td>
</tr>
<tr>
  <th align="left">${var:&nbsp;-3}</th>
  <td>À partir de l'index -3 (3 à partir de la fin)=<br>Retourne les 3 derniers caractères de la variable var<br>ATTENTION, ne pas oublier l'espace avec le "-" (moins) pour un "à partir de" négatif
  <pre lang="shell">var=123456789
echo ${var: -3}    # 789</pre></td>
</tr>
<tr>
  <th align="left">${var: -3:1}</th>
  <td>À partir de -3, un caractère =<br>Retourne le 3ème caractère à partir de la fin de la variable var
  <pre lang="shell">var=123456789
echo ${var: -3:1}  # 7</pre></td>
</tr>
<tr>
  <th align="left">${var:&nbsp;-3:-1}</th>
  <td>À partir de -3, -1 caractère =<br>Retourne les 3 derniers caractères de la variable var, sauf le dernier.
  <pre lang="shell">var=123456789
echo ${var: -3:-1} # 78
echo ${var: -3:-4} # erreur</pre></td>
</tr>
</table>

### Trim

<table>
<tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
<tr>
  <th align="left">${var%.*}</th>
  <td>Supprime tout ce qu'il a APRÈS le DERNIER point<br><code>${variable%pattern}</code> = supprimer le match le PLUS COURT à partir de la FIN
  <pre lang="shell">var=a.b.c
echo ${var%.*}  # a.b</pre></td>
</tr>
<tr>
  <th align="left">${var%%.*}</th>
  <td>Supprime tout ce qu'il a APRÈS le PREMIER point<br><code>${variable%pattern}</code> = supprimer le match le PLUS LONG à partir de la FIN
  <pre lang="shell">var=a.b.c
echo ${var%%.*}  # a</pre></td>
</tr>

<tr><td colspan="2"></td></tr>
<tr>
  <th align="left">${var#*.}</th>
  <td>Supprime tout ce qu'il y a AVANT le PREMIER point<br><code>${variable#pattern}</code> = supprimer le match le PLUS COURT à partir du DÉBUT
  <pre lang="shell">var=a.b.c
echo ${var#*.}  # b.c</pre></td>
</tr>
<tr>
  <th align="left">${var##*.}</th>
  <td>Supprime tout ce qu'il y a AVANT le DERNIER point<br><code>${variable##pattern}</code> = supprimer le match le PLUS LONG à partir du DÉBUT
  <pre lang="shell">var=a.b.c
echo ${var##*.}  # c</pre></td>
</tr>
</table>

``` bash
var="...a.b.c..."

# Supprimer les points à la fin, match le plus long
$ echo ${var%%+(.)}
...a.b.c

# Supprimer les points au début, match le plus long
$ echo ${var##+(.)}
a.b.c...
```
``` bash
var="123name"

# Supprimer les nombres au début, match le plus court
$ echo ${var#+([[:digit:]])}
23name

# Supprimer les nombres au début, match le plus long
$ echo ${var##+([[:digit:]])}
name

# Supprimer les lettres à la fin, match le plus court
$ echo ${var%+([[:alpha:]])}
123nam

# Supprimer les lettres à la fin, match le plus long
$ echo ${var%%+([[:alpha:]])}
123
```

### Replace

<table>
<tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
<tr>
  <th align="left">${var/ /.}</th>
  <td>Remplace le PREMIER espace par un point<br><code>${parameter/pattern/string}</code> où <code>pattern</code> est un wildcard (plus long match)<br> Si <code>string</code> est vide (revient à supprimer ce qui mache pattern), le deuxième slash n'est pas nécessaire.
  <pre lang="shell">var="a b c d "
echo ${var/ /.}  # a.b c d </pre></td>
</tr>
<tr>
  <th align="left">${var// /.}</th>
  <td>Remplace TOUS les espaces par un point
  <pre lang="shell">var="a b c d "
echo ${var// /.} # a.b.c.d.</pre>

  <pre lang="shell">for i in ${PATH//:/ }; do echo $i; done
# Affiche les chemins ligne par ligne</pre></td>
</tr>
<tr>
  <th align="left">${var/# /.}</th>
  <td>Remplace l'espace situé au DÉBUT de la chaîne par un point
  <pre lang="shell">var="a b c d "
echo ${var/# /.} "a b c d "

var=" a b c d "
echo ${var/# /.} ".a b c d "</pre></td>
</tr>
<tr>
  <th align="left">${var/% /.}</th>
  <td>Remplace l'espace situé à la FIN de la chaîne par un point
  <pre lang="shell">var="a b c d "
echo ${var/% /.} "a b c d."

var="a b c d"
echo ${var/% /.} "a b c d"</pre></td>
</tr>
</table>

``` bash
var="12name34"

# Remplacer la 1ère lettre par -
$ echo ${var/[[:alpha:]]/-}
12-ame34

# Remplacer toutes les lettres par -
$ echo ${var//[[:alpha:]]/-}
12----34

# Remplacer tous les chiffres par rien
$ echo ${var//[[:digit:]]/}
name

# Remplacer tous les chiffres situés au début par -
$ echo ${var/#+([[:digit:]])/-}
-name34

# Remplacer tous les chiffres situés à la fin par -
$ echo ${var/%+([[:digit:]])/-}
12name-
```

### Case modification

<table>
<tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
<tr>
  <th align="left">${var^}</th>
  <td>Met le PREMIER caractère en MAJUSCULE
  <pre lang="shell">var=abc
echo ${var^}     # Abc</pre></td>
</tr>
<tr>
  <th align="left">${var^^}</th>
  <td>Met TOUS les caractères en MAJUSCULE
  <pre lang="shell">var=abc
echo ${var^^}    # ABC</pre></td>
</tr>

<tr><td colspan="2"></td></tr>
<tr>
  <th align="left">${var,}</th>
  <td>Met le PREMIER caractère en MINUSCULE
  <pre lang="shell">var=ABC
echo ${var,}    # aBC</pre></td>
</tr>
<tr>
  <th align="left">${var,,}</th>
  <td>Met TOUS les caractères en MINUSCULE
  <pre lang="shell">var=ABC
echo ${var,n}    # abc</pre></td>
</tr>
</table>
