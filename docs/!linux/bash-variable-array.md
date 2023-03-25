---
title: Tableau
category: Linux, Shell, Bash, Variable
---

## Tableau

### Créer un tableau

* Pour créer un tableau, il faut entourer une liste de valeurs avec des parenthèses.  
  Ou on peut créer un intervalle avec des accolades.

  Pour que deux valeurs soient deux éléments distincts du tableau, elles doivent être séparées par un caractère de délimitation contenu dans la variable d'environnement IFS. La valeur par défaut de $IFS est '&nbsp;\t\n' (espace, tabulation et retour à la ligne).

  ``` bash
  $ printf "%q\n" "$IFS"
  $' \t\n'
  ```
  ``` bash
  OLDIFS="$IFS"
  IFS=':'
  desktop=
  for val in $XDG_CURRENT_DESKTOP; do
      for d in 'GNOME' 'MATE' 'UKUI' 'Unity'; do
          [ "$d" = "$val" ] && { desktop="$d"; break 2; }
      done
  done
  IFS="$OLDIFS"
  ```

  <table>
  <tr>
    <th align="left">array=(a b c)</th>
    <td>Affecte les valeurs "a", "b" et "c" au tableau array.<br>
    Entourer de parenthèses permet de mettre les valeurs dans un tableau. <sup>(1)</sup>
    <pre lang="shell">$ array=("a a" b "c c" d)
  $ for i in "${array[@]}"; do echo - $i; done
  - a a
  - b
  - c c
  - d
  </pre>
    <pre lang="shell">$ files=(`ls dir`)</pre>
    <pre lang="shell">$ files=(*)</pre></td>
  </tr>
  <tr><td colspan="2"></td></tr>
  <tr>
    <th align="left">range={1..10}</th>
    <td>Prend les valeurs de 1 à 10
    <pre lang="shell">$ echo {1..10}
  1 2 3 4 5 6 7 8 9 10
  $
  $ echo {z..a}
  z y x w v u t s r q p o n m l k j i h g f e d c b a
  </pre></td>
  </tr>
  </table>

### Afficher une valeur

On peut accéder à la valeur d'un index avec `${array[i]}`.  
On peut accéder à toutes les valeurs du tableau avec `${array[@]}` ou `${array[*]}`.

<table>
<tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>

<tr>
  <th align="left">${#array}</th>
  <td>Retourne la longueur de array
  <pre lang="shell">$ array=("a a" b "c c" d)
$ echo "${#array}"
3</pre></td>
</tr>
<tr>
  <th align="left">${array[0]}</th>
  <td>Retourne la première valeur de array
  <pre lang="shell">$ array=("a a" b "c c" d)
$ echo "${array[0]}"
a a</pre></td>
</tr>
<tr>
  <th align="left">${array[*]}</th>
  <td>Retourne l'ensemble des valeurs de array, séparées par le premier caractère de IFS (par défaut espace) : <code>"var1 var2 var3"</code>
      <pre lang="shell">$ array=("a a" b "c c" d)
$ for i in "${array[*]}"; do echo - $i; done
- a a b c c d
</pre>
  </td>
</tr>
<tr>
  <th align="left">${array[@]}</th>
  <td>Retourne chaque valeur de array, l'une après l'autre : <code>"var1" "var2" "var3"</code>
      <pre lang="shell">$ array=("a a" b "c c" d)
$ for i in "${array[@]}"; do echo - $i; done
- a a
- b
- c c
- d
</pre>
  </td>
</tr>
</table>

Si les valeurs du tableau contiennent des caractères de délimitation, il faut les échapper à la lecture et à l'écriture.

```
$ array=("a a" b "c c" d)
$ echo ${#array}
3
$ for i in ${array[@]}; do echo - $i; done
- a
- a
- b
- c
- c
- d
$
$ for i in "${array[@]}"; do echo - $i; done
- a a
- b
- c c
- d
```

### Interpolation

<table>
<tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
<tr>
  <th align="left">${array[@]:0:3}</th>
  <td>Retourne les 3 premières valeurs de array
  <pre lang="shell">$ array=("a a" b "c c" d)
echo "${array[@]:0:3}"
a a b c c</pre></td>
</tr>
<tr>
  <th align="left">${!array[@]}</th>
  <td>Retourne les index du tableau
      <pre lang="shell">$ array=("a a" b "c c" d)
$ for i in "${!array[@]}"; do echo $i": "${array[@]:$i:1}; done
0: a a
1: b
2: c c
3: d
</pre>
  </td>
</tr>
<tr>
  <th align="left">${array[@]// }</th>
  <td>Retourne les valeurs du tableau en supprimant tous les espaces des valeurs
  <pre lang="shell">$ array=("a a" b "c c" d)
$ echo ${array[@]// }
aa b cc d
  </pre></td>
</tr>
<tr>
  <th align="left">${array[@]^^}</th>
  <td>Retourne les valeurs du tableau en mettant tous les caractères en majuscule
  <pre lang="shell">$ array=("a a" b "c c" d)
$ echo ${array[@]^^}
A A B C C D</pre></td>
</tr>
</table>

### Tableau associatif

Bash permet également de déclarer des tableaux associatifs.  
Un tableau associatif n'est pas ordonné, si l'ordre est important il faut stocker l'ordre des index à part.

<table>
<tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
<tr>
  <th align="left">declare -A list</th>
  <td>Déclare un tableau associatif — il est possible d'ajouter des index après ou pendant la déclaration
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

<ins>Exemple</ins>:

``` bash
declare -A list=(
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
```