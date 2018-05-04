---
title: Conditions
category: Linux > Bash Script
---

## Conditions

L'allure générale du `if` est comme suit :

``` shell
if condition1; then
  commande1
elif condition2; then
  commande2
else
  commande3
fi
```

### if condition

`if condition` permet de tester un booléen.

``` shell
b=true

if $b; then
  echo ok
fi
```

### if [ condition ]

`if [ condition ]` permet de tester une expression booléenne.

``` shell
count=99

if [ $count -eq 100 ]; then
  echo "Equal to 100"
elif [ $count -gt 100 ]; then
  echo "Greater than 100"
else
  echo "Less than 100"
fi
```

### if [[ condition ]]

`if [[ condition ]]` est une extension de ksh des expressions booléennes qui ajoute des fonctionnalités, comme le test de Regex.
Également supportée par bash et zsh.

```
str="Hello World"

if [[ $str =~ ^Hello ]]; then
  echo "str says Hello"
fi
```

### if (( condition ))

`if (( condition ))` permet de tester une expression mathématique. 
Supporté par ksh, bash et zsh.

``` shell
a=1
b=2

if (( $a < $b )); then
  echo "a < b"
else
  echo "a >= b"
fi
```

### if ( condition )

`if ( condition )` permet de tester le résultat d'une commande.
Cette instruction execute la commande dans un sous-shell puis vérifie le code de sortie.

``` shell
if ( mkdir test 2>/dev/null ); then
  echo "test has been created";
fi
```

---

## Condition ternaire

Pour une chaîne de caractère:

``` shell
a=$([ "$b" == 5 ] && echo "$c" || echo "$d")
```

Pour un nombre:

``` shell
(( a = b==5 ? c : d ))
```

ou

``` shell
a=$(( b==5 ? c : d ))
```

---

## Switch

``` shell
case $1 in
  "Chien" | "Chat" | "Souris")
    echo "C'est un mammifère"
    ;;
  "Moineau" | "Pigeon")
    echo "C'est un oiseau"
    ;;
  "Bob")
    echo "C'est Bob"
    ;;
  *)
    echo "Je ne sais pas ce que c'est"
    ;;
esac
```

---

## Opérateurs booléens

### ET

``` shell
if [ X ] && [ Y ]; then
  ...
fi
```

### OU

``` shell
if [ X ] || [ Y ]; then
  ...
fi
```

### NON

``` shell
if [ ! X ]; then
  ...
fi
```

---

## Tests

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
<tr><th align="left">[ -x FILE ]</th><td>Executable</td></tr>
<tr><th align="left">[ -r FILE ]</th><td>Accessible en lecture</td></tr>
<tr><th align="left">[ -w FILE ]</th><td>Accessible en écriture</td></tr>
<tr><th align="left">[ -s FILE ]</th><td>Taille > 0 octets</td></tr>
<tr><th align="left">[ FILE1 -nt FILE2 ]</th><td>1 est plus récent que 2</td></tr>
<tr><th align="left">[ FILE1 -ot FILE2 ]</th><td>1 est moins récent que 2</td></tr>
<tr><th align="left">[ FILE1 -ef FILE2 ]</th><td>Même fichier</td></tr>
<tr><th align="left">[ -N FILE ]</th><td>Fichier modifié depuis la dernière lecture</td></tr>
</table>

### Booléens

<table>
<tr><th align="left">[ ! e ]</th><td>Non</td></tr>
<tr><th align="left">[ e1 -a e2 ]</th><td>Et</td></tr>
<tr><th align="left">[ e1 -o e2 ]</th><td>Ou</td></tr>
</table>

