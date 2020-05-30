---
title: Les structures de contrôle
category: Linux, Shell
---

## If

Permet d'exécuter un bloc de code uniquement lorsqu'une condition est remplie.

``` bash
if condition1; then
  commande1
elif condition2; then
  commande2
else
  commande3
fi
```

[Conditions](shell-conditions.md)

## Condition ternaire

Pour une chaîne de caractère:

``` bash
a=$([ "$b" == 5 ] && echo "$c" || echo "$d")
```

Pour un nombre:

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

``` bash
case $var in
  [0-9]*) echo "$var est un nombre.";;
  [a-zA-Z]*) echo "$var est un mot.";;
  *) echo "$var n'est ni un nombre ni un mot.";;
esac
```

## While

Boucle tant qu'une condition est vraie.

``` bash
correctPassword="monpassword"

while test "$password" != "$correctPassword"
do echo "Mot de passe incorrect."
    echo "Tapez le mot de passe"
    read password
done
```

``` bash
numero=1
limit=10

while test $numero != $limit
    do 
    # la commande "touch" permet de créer un fichier vide :
    touch fichier"$numero"
    
    # cette commande ajoute 1 à la variable "numero" :
    numero=$(($numero + 1))
done
```

## Until

Boucle tant qu'une condition n'est pas vraie.

``` bash
correctPassword="monpassword"

until test "$password" = "$correctPassword"
do echo "Mot de passe incorrect."
    echo "Tapez le mot de passe"
    read password
done
```

## For

Boucle sur une liste.

``` bash
files=(lib/*)
for file in "${files[@]}"; do echo "-"$file; done
```

``` bash
for item in ("a b c")
   do echo "$item"
done
```

``` bash
for num in `seq 1 10`
    do touch fichier"$num"
done
```

``` bash
dir=(${PATH//:/$'\n'})

for i in "${!dir[@]}"; do
  echo "$i: ${dir[$i]}"
done
```

## Select

Permet d'afficher une question à choix multiple.  
Le `select` se comporte comme une boucle: il continuera d'afficher le prompt à l'utilisateur tant qu'il n'y a pas de `break`.

``` bash
echo "Êtes-vous favorable au remplacement de A par B?"
select opinion in Pour Contre; do 
  case $opinion in 
    # Laisser passer ceux qui répondent correctement à la question
    "Pour"|"Contre") echo "Vous avez répondu $opinion"; break;;

    # Au cas où des zozos tapent sur autre chose que 1 ou 2
    *) continue;;
  esac  
done
```

Résultat:

```
Êtes-vous favorable au remplacement de A par B ?
1) Pour
2) Contre
#? 3
#? 4
#? 3
#? 2
Vous avez répondu Contre
```
