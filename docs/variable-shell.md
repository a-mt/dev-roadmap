---
title: Variables Shell
category: Linux
---

<ins>Convention</ins>: le caractère &#xAC; désigne le retour chariot

## Affecter

<table>
<tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
<tr>
  <th align="left">var=test</th>
  <td>Affecte la valeur "test" à la variable var. <br><a href="echap-shell.md">Voir règles d'échappement du shell</a><br>
  Attention, pas d'espaces autour du égal</td>
</tr>
<tr>
  <th align="left">var=`pwd`</th>
  <td>Affecte le résultat de la commande "pwd" à la variable var.<br> Il n'est pas possible d'imbriquer les backticks
  <pre lang="shell">user=`whoami`
echo "Salut ${user}!"</pre></td>
</tr>
<tr>
  <th align="left">var=$(basename $(pwd))</th>
  <td>Affecte le résultat de la commande "basename" sur "pwd" à la variable var.<br> Possibilité d'imbriquer les commandes avec cette syntaxe
  <pre lang="shell">dir=$(basename $(pwd))
echo "Dossier: $dir"</pre>

<pre lang="shell">echo "Hello World"
var=$(!!)
echo $var # Hello World</pre></td>
</tr>
<tr>
  <th align="left">var=$'1\n2'</th>
  <td>Affecte la chaîne de caractère en interprétant les <a href="https://www.gnu.org/software/bash/manual/bash.html#ANSI_002dC-Quoting">caractères spéciaux</a> à la variable var.
  <pre lang="shell">var=$'1\n2'
echo "$var"</pre></td>
</tr>
<tr>
  <th align="left">var=$"Text"</th>
  <td>Affecte la traduction de "Text", selon la locale en cours, à la variable var.
  <pre lang="shell"># cd /usr/share/locale/fr/LC_MESSAGES
# ls
# msgunfmt apt.mo
TEXTDOMAIN=apt
msg=$"Write error"
echo $msg # Erreur d'écriture</pre></td>
</tr>
<tr>
  <th align="left">var=$(($var + 1))</th>
  <td>Incrémente var<br> <code>$(( ... ))</code> permet d'effectuer des <a href="https://www.gnu.org/software/bash/manual/html_node/Shell-Arithmetic.html#Shell-Arithmetic">opérations arithmétiques</a>
  <pre lang="shell">var=1
var=$(($var + 1))
echo $var # 2</pre>

<pre lang="shell">hexa=AF
echo $(( 16#$hexa )) # 175</pre>

<pre lang="shell">rand=$((RANDOM%=200)) # Nombre aléatoire entre 0 et 200</pre></td>
</tr>
<tr>
  <th align="left">range={1..10}</th>
  <td>Prend les valeurs de 1 à 10
  <pre lang="shell">echo {1..10} # => 1 2 3 4 5 6 7 8 9 10
echo {a..z} # => a b c d e f g h i j k l m n o p q r s t u v w x y z</pre></td>
</tr>

<tr><td colspan="2"></td></tr>
<tr>
  <th align="left">array=(a b c)</th>
  <td>Affecte les valeurs "a", "b" et "c" au tableau array.<br>
  Entourer de parenthèses permet de mettre les valeurs dans un tableau. <sup>(1)</sup>
  <pre lang="shell">array=("a a" b "c c" d)
for i in "${array[@]}"; do echo - $i; done # a a¬b¬c c¬d</pre>
  <pre lang="shell">files=(`ls dir`)</pre>
  <pre lang="shell">files=(*)</pre></td>
</tr>

<tr><td colspan="2"></td></tr>
<tr>
  <th align="left">unset var</th>
  <td>Supprime la variable var</td>
</tr>
</table>

<sup>(1)</sup> Les valeurs sont séparées par un caractère de délimitation. <br>
&emsp;La liste des caractères de délimitation acceptés est dans la variable d'environnement $IFS.<br>
&emsp;La valeur par défaut de $IFS est ' \t\n' (espace, tabulation et retour à la ligne).<br>
&emsp;Pour afficher la valeur de $IFS: <code>printf "%q\n" "$IFS"</code><br>
&emsp;Si les valeurs du tableau contiennent des caractères de délimitation, il faut les échapper à la lecture et à l'écriture.

---

## Afficher

<table>
<tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
<tr>
  <th align="left">echo $var</th>
  <td>Écrit la valeur de la variable var.<br>Le dollar s'applique au mot qui le suit (un mot est une suite de lettres, chiffres ou underscore)
  <pre lang="shell">var=test
echo $var     # test</pre>
  </td>
</tr>
<tr>
  <th align="left">echo "$var"</th>
  <td>Écrit la valeur de la variable var en empêchant l'interprétation des caractères spéciaux par le shell. Cela permet d'afficher les caractères spéciaux, qui ne seraient pas visibles autrement puisque interceptés par le shell.
  <pre lang="shell">var=$'1\n2'
echo $var   # 1 2
echo "$var" # 1¬2</pre>
  </td>
</tr>
<tr>
  <th align="left">print "%q\n" "$var"</th>
  <td>Écrit la valeur de la variable var en ANSI C Quoting = remplace les caractères spéciaux par les séquences de caractères qui correspondent.
  <pre lang="shell">var=$'1\n2'
echo "$var"          # 1¬2
printf "%q\n" "$var" # $'1\n2'</pre></td>
</tr>
<tr>
  <th align="left">echo -e $var</th>
  <td>Écrit la valeur de la variable var en remplaçant les séquences de caractère spécial par le caractère désigné
  <pre lang="shell">var='1\t2'
echo $var     # 1\t2
echo -e $var  # 1    2</pre></td>
</tr>
<tr>
  <th align="left">echo ${var}</th>
  <td>Écrit la valeur de la variable var.<br>La syntaxe ${} permet de délimiter la variable ainsi que de lui appliquer des filtres.
  <pre lang="shell">var=test
echo $varok   # (rien)
echo $var"ok" # testok
echo $var\ok  # testok
echo $var ok  # testok
echo "$var"ok # testok
echo ${var}ok # testok</pre>
  </td>
</tr>
</table>

---

## Divers

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

---

## Isset

<table>
<tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
<tr>
  <th align="left">${var:-nok}</th>
  <td>Retourne la valeur de var ou la chaîne "nok" si la valeur est vide ou que la variable n'existe pas.
      La valeur de var n'est pas affectée
      <pre lang="shell">var=""
echo ${var:-vide} # vide
echo $var         # (rien)</pre>
  </td>
</tr>
<tr>
  <th align="left">${var:+ok}</th>
  <td>Retourne "ok" si var existe et a une valeur.
      <br>La valeur de var n'est pas affectée
      <pre lang="shell">var=""
echo ${var:+ok}   # vide
echo $var         # (rien)</pre>
  </td>
</tr>
<tr>
  <th align="left">${var:=nok}</th>
  <td>Affecte var à "nok" si la valeur de var est vide ou que la variable n'existe pas puis affiche la valeur de var.
      <pre lang="shell">var=""
echo ${var:=vide} # vide
echo $var         # vide</pre>
  </td>
</tr>
<tr>
  <th align="left">${var:?nok}</th>
  <td>Affiche "nok" dans stderr si la variable var n'existe pas ou que sa valeur est vide.
      <br>La valeur de var n'est pas affectée
      <pre lang="shell">var=""
echo ${var:?vide} # bash: var: vide (dans stderr)
echo $var         # (rien)</pre>
  </td>
</tr>
</table>

---

## Truncate

<table>
<tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
<tr>
  <th align="left">${var:3}</th>
  <td>Supprime les 3 premiers caractères de la variable var
  <pre lang="shell">var=123456789
echo ${var:3}      # 456789</pre></td>
</tr>
<tr>
  <th align="left">${var:0:3}</th>
  <td>Retourne les 3 premiers caractères de la variable var<br>À partir de 0, 3 caractères
  <pre lang="shell">var=123456789
echo ${var:0:3}    # 123
echo ${var:0:12}   # 123456789</pre></td>
</tr>
<tr>
  <th align="left">${var:2:1}</th>
  <td>Retourne le 3ème caractère de la variable var
  <pre lang="shell">var=123456789
echo ${var:2:1}    # 3</pre></td>
</tr>

<tr><td colspan="2"></td></tr>
<tr>
  <th align="left">${var:0:-3}</th>
  <td>Supprime les 3 derniers caractères de la variable var
  <pre lang="shell">var=123456789
echo ${var:0:-3}   # 123456</pre></td>
</tr>
<tr>
  <th align="left">${var:&nbsp;-3}</th>
  <td>Retourne les 3 derniers caractères de la variable var<br>ATTENTION, ne pas oublier l'espace avec le "-" (moins) pour un "à partir de" négatif
  <pre lang="shell">var=123456789
echo ${var: -3}    # 789</pre></td>
</tr>
<tr>
  <th align="left">${var: -3:1}</th>
  <td>Retourne le 3ème caractère à partir de la fin de la variable var.<br>À partir de -3, un caractère
  <pre lang="shell">var=123456789
echo ${var: -3:1}  # 7</pre></td>
</tr>
<tr>
  <th align="left">${var:&nbsp;-3:-1}</th>
  <td>Retourne les 3 derniers caractères de la variable var, sauf le dernier.<br>À partir de -3, -1 caractère
  <pre lang="shell">var=123456789
echo ${var: -3:-1} # 78
echo ${var: -3:-4} # erreur</pre></td>
</tr>
</table>

---

## Trim

<table>
<tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
<tr>
  <th align="left">${var%%+(.)}</th>
  <td>Supprime tous les points à la FIN
  <pre lang="shell">var="a.b.c..."
echo ${var%%+(.)} # a.b.c</pre></td>
</tr>
<tr>
  <th align="left">${var##+(.)}</th>
  <td>Supprime tous les points au DÉBUT
  <pre lang="shell">var="...a.b.c"
echo ${var##+(.)} # a.b.c</pre></td>
</tr>

<tr><td colspan="2"></td></tr>
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
  <td>Supprime tout ce qu'il y a AVANT le DERNIER point<br><code>${variable##pattern}</code> = supprimer le match le PLUS LONG à partir du début
  <pre lang="shell">var=a.b.c
echo ${var##*.}  # c</pre></td>
</tr>
</table>

---

## Replace

<table>
<tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
<tr>
  <th align="left">${var/ /.}</th>
  <td>Remplace le PREMIER espace par un point<br><code>${parameter/pattern/string}</code> où <code>pattern</code> est un wildcard (plus long match)<br> Si <code>string</code> est vide (revient à supprimer ce qui mache pattern), le deuxième slash n'est pas nécessaire.
  <pre lang="shell">var="a b c d "
echo ${var/ /.}  # a.b c d </pre></td>
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
<tr>
  <th align="left">${var// /.}</th>
  <td>Remplace TOUS les espaces par un point
  <pre lang="shell">var="a b c d "
echo ${var// /.} # a.b.c.d.</pre>

  <pre lang="shell">for i in ${PATH//:/ }; do echo $i; done # Affiche les chemins ligne par ligne</pre></td>
</tr>
</table>

---

## Case modification

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

---

## Tableau

On peut accéder aux valeurs du tableau avec `${array[@]}` ou `${array[*]}`

<table>
<tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
<tr>
  <th align="left">${array[*]}</th>
  <td>Retourne l'ensemble des valeurs de array, séparées par le premier caractère de IFS (par défaut espace) : <code>"var1 var2 var3"</code>
      <pre lang="shell">array=("a a" b "c c" d)
for i in "${array[*]}"; do echo - $i; done # - a a b c c d</pre>
  </td>
</tr>
<tr>
  <th align="left">${array[@]}</th>
  <td>Retourne chaque valeur de array, l'une après l'autre : <code>"var1" "var2" "var3"</code>
      <pre lang="shell">array=("a a" b "c c" d)
for i in "${array[@]}"; do echo - $i; done # - a a¬- b¬- c c¬- d</pre>
  </td>
</tr>
</table>

Si les quotes sont omises, le shell interprète tout caractère de délimitation (avec * tout comme @)
<pre lang="shell">array=("a a" b "c c" d)
for i in ${array[@]}; do echo - $i; done # - a¬- a¬- b¬- c¬- c¬- d</pre>

<table>
<tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
<tr>
  <th align="left">${array[@]:0:3}</th>
  <td>Retourne les 3 premières valeurs de array
  <pre lang="shell">array=("a a" b "c c" d)
echo "${array[@]:0:3}" # a a b c c</pre></td>
</tr>
<tr>
  <th align="left">${!array[@]}</th>
  <td>Retourne les index du tableau
      <pre lang="shell">array=("a a" b "c c" d)
for i in "${!array[@]}"; do echo $i": "${array[@]:$i:1}; done
# 0: a a¬1: b¬2: c c¬3: d</pre>
  </td>
</tr>
<tr>
  <th align="left">${array[@]// }</th>
  <td>Retourne les valeurs du tableau en supprimant tous les espaces des valeurs
  <pre lang="shell">array=("a a" b "c c" d)
echo ${array[@]// } # aa b cc d
  </pre></td>
</tr>
<tr>
  <th align="left">${array[@]^^}</th>
  <td>Retourne les valeurs du tableau en mettant tous les caractères en majuscule
  <pre lang="shell">array=("a a" b "c c" d)
echo ${array[@]^^} # A A B C C D</pre></td>
</tr>
</table>

---

## Matrice

Avec le shell **Bash**.  
Les matrices permettent de simuler un tableau multi-dimensionnel ou un tableau associatif.  

<table>
<tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
<tr>
  <th align="left">declare -A list</th>
  <td>Déclare une matrice list. La matrice peut être initialisée avec des valeurs ou non
  <pre lang="shell">declare -A list=(
["00:00:00"]="Track 1"
["00:07:04"]="Track 2"
["00:11:23"]="Track 3"
["00:15:30"]="Track 4"
)</pre></td>
</tr>
<tr>
  <th align="left">list[$c,0]="val"</th>
  <td>Assigne une valeur à un index.<br>Index séparés par des virgules s'il y en a plusieurs
  <pre lang="shell">list["00:19:40"]="Track 5"</pre></td>
</tr>
<tr>
  <th align="left">${list[$c,0]}</th>
  <td>Retourne la valeur d'un index
  <pre lang="shell">for time in ${!list[@]}; do echo $time": "${list[$time]}; done
# 00:00:00: Track 1
# 00:15:30: Track 4
# 00:11:23: Track 3
# 00:19:40: Track 5
# 00:07:04: Track 2
</pre></td>
</tr>
</table>

Une matrice n'est pas ordonnée, si l'ordre est important il faut stocker l'ordre des index à part.

<pre lang="shell">declare -A list=(
["00:00:00"]="Track 1"
["00:07:04"]="Track 2"
["00:11:23"]="Track 3"
["00:15:30"]="Track 4"
)

order=$(sort -n -t":" -k1 -k2 -k3 <<< "${!list[*]}")
for time in ${order[@]}
do
    echo $time": "${list[$time]}
done
# 00:00:00: Track 1
# 00:07:04: Track 2
# 00:11:23: Track 3
# 00:15:30: Track 4
</pre>

---

## Variables spéciales

<table>
<tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
<tr>
  <th align="left">$?</th>
  <td>Exit status du dernier processus</td>
</tr>
<tr>
  <th align="left">$!</th>
  <td>PID du dernier processus mis en background</td>
</tr>
<tr>
  <th align="left">$$</th>
  <td>PID du shell</td>
</tr>
</table>

[Variables d'environnement](http://wiki.bash-hackers.org/syntax/shellvars)
