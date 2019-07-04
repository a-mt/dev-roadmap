---
title: Expressions conditionnelles
category: Linux > Bash Script
---

## Booléens

`if condition` permet de tester un booléen.  
Ce peut être une variable ou le résultat d'une commande.

``` bash
b=true
if $b; then
  echo ok
fi
```

``` bash
if test $USER = Robert
    then echo "Le hachoir va se mettre en marche."
    mettre en marche le hachoir
else echo "Quand tu seras grand, $USER."
    echo "Et fais bien attention en traversant la rue."
fi
```

``` bash
if grep -q Bash fichier
  then echo "'fichier' contient au moins une occurrence du mot Bash."
fi
```

---

## Expression booléenne

`if [ condition ]` permet de tester une expression booléenne.  
`[ ... ]` revient donc à faire `test ...`

``` bash
count=99

if [ $count -eq 100 ]; then
  echo "Equal to 100"
elif [ $count -gt 100 ]; then
  echo "Greater than 100"
else
  echo "Less than 100"
fi
```

``` bash
[ -e file1.txt ]
echo $?  #0: file1.txt existe, 1: file.txt n'existe pas
```

### Chaînes de caractère

<table>
<tr><th align="left">[ STRING = STRING ]</th><td>Égalité</td></tr>
<tr><th align="left">[ STRING != STRING ]</th><td>Non égalité</td></tr>
<tr><th align="left">[ -z STRING ]</th><td>Vide</td></tr>
<tr><th align="left">[ -n STRING ]</th><td>Non vide</td></tr>
<tr><th align="left">[[ STRING =~ STRING ]]</th><td>Regex</td></tr>
</table>

### Nombres

<table>
<tr><th align="left">[ NUM -eq NUM ]</th><td>Égalité</td></tr>
<tr><th align="left">[ NUM -ne NUM ]</th><td>Non égalité</td></tr>
<tr><th align="left">[ NUM -lt NUM ]</th><td>Inférieur à</td></tr>
<tr><th align="left">[ NUM -le NUM ]</th><td>Inférieur ou égal à</td></tr>
<tr><th align="left">[ NUM -gt NUM ]</th><td>Supérieur à</td></tr>
<tr><th align="left">[ NUM -ge NUM ]</th><td>Supérieur ou égal à</td></tr>
<tr><th align="left">(( NUM < NUM ))</th><td>Inégalité mathématique</td></tr>
</table>

### Fichiers

<table>
<tr><th align="left">[ -e FILE ]</th><td>Existe</td></tr>
<tr><th align="left">[ -d FILE ]</th><td>Est un répertoire</td></tr>
<tr><th align="left">[ -f FILE ]</th><td>Est un fichier</td></tr>
<tr><th align="left">[ -h FILE ]</th><td>Est un lien symbolique</td></tr>
<tr><th align="left">[ -b FILE ]</th><td>Est un périphérique de type bloc</td></tr>
<tr><th align="left">[ -c FILE ]</th><td>Est un périphérique de type caractère</td></tr>
<tr><th align="left">[ -p FILE ]</th><td>Est un périphérique de type pipe</td></tr>
<tr><th align="left">[ -S FILE ]</th><td>Est un socket</td></tr>
<tr><th align="left">[ -x FILE ]</th><td>Executable</td></tr>
<tr><th align="left">[ -r FILE ]</th><td>Accessible en lecture</td></tr>
<tr><th align="left">[ -w FILE ]</th><td>Accessible en écriture</td></tr>
<tr><th align="left">[ -s FILE ]</th><td>Taille > 0 octets</td></tr>
<tr><th align="left">[ -g FILE ]</th><td>A le flag setgid</td></tr>
<tr><th align="left">[ -u FILE ]</th><td>A le flag setuid</td></tr>
<tr><th align="left">[ -k FILE ]</th><td>A le flag sticky bit</td></tr>
<tr><th align="left">[ FILE1 -nt FILE2 ]</th><td>1 est plus récent que 2</td></tr>
<tr><th align="left">[ FILE1 -ot FILE2 ]</th><td>1 est moins récent que 2</td></tr>
<tr><th align="left">[ FILE1 -ef FILE2 ]</th><td>Même fichier</td></tr>
<tr><th align="left">[ -N FILE ]</th><td>Fichier modifié depuis la dernière lecture</td></tr>
<tr><th align="left">[ -U FILE ]</th><td>L'utilisateur en cours est propriétaire du fichier</td></tr>
<tr><th align="left">[ -G FILE ]</th><td>L'utilisateur en cours fait partie du groupe propriétaire du fichier</td></tr>
</table>

```
[ -b "/dev/sda2" ]
[ -c "/dev/ttyS1" ]
[ -p "/dev/fd/0" ]
[ -S "/var/run/docker.sock" ]
```

### Booléens

<table>
<tr><th align="left">[ ! e ]</th><td>Non</td></tr>
<tr><th align="left">[ e1 -a e2 ]</th><td>Et</td></tr>
<tr><th align="left">[ e1 -o e2 ]</th><td>Ou</td></tr>
</table>

``` bash
if [ -f /usr/bin/netscape -a -f /usr/share/doc/HTML/index.html ]; then
       netscape /usr/share/doc/HTML/index.html &
fi
```

---

## Expression étendue

`if [[ condition ]]` est ajoute des fonctionnalités, comme le test de Regex.  
Syntaxe supporté par ksh, bash et zsh.

``` bash
str="Hello World"

if [[ $str =~ ^Hello ]]; then
  echo "str says Hello"
fi
```

---

## Expression mathématique

`if (( condition ))` permet de tester une expression mathématique.  
Syntaxe supporté par ksh, bash et zsh.

``` bash
a=1
b=2

if (( $a < $b )); then
  echo "a < b"
else
  echo "a >= b"
fi
```

`(( ... ))` peut être utilisé pour exécuter des opérations mathématiques, pas uniquement des tests — par exemple des incrémentations.

---

## Statut

`if ( condition )` permet de tester le résultat d'une commande.
Cette instruction execute la commande dans un sous-shell puis vérifie le code de sortie.

``` bash
if ( mkdir test 2>/dev/null ); then
  echo "test has been created";
fi
```

---

## Opérateurs

* `&&`: et

  ``` bash
  if [ X ] && [ Y ]; then
    ...
  fi
  ```

* `||`: ou

  ``` bash
  if [ X ] || [ Y ]; then
    ...
  fi
  ```

* `!`: non

  ``` bash
  if [ ! X ]; then
    ...
  fi
  ```
