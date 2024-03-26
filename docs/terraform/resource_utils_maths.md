---
title: Mathématiques
category: Terraform, Fonctions
---

abs, ceil, floor, log, max, min, parseint, pow, signum

On peut utiliser `...` pour étendre une liste en arguments individuels
```
> max([12, 54, 3]...)
54
```

``` bash
# tonumber(string)
# Convertit une chaîne de caractères en nombre
> tonumber("100")
100

# abs(number)
# Renvoie la valeur absolue d'un nombre
> abs(-12.4)
12.4

# ceil(number)
# Arrondit un nombre à l'entier supérieur
> ceil(5.1)
6

# floor(number)
# Arrondit un nombre à l'entier inférieur
> floor(4.9)
4

# log(number, base)
# Calcule le logarithme d'un nombre avec une base spécifique
> log(16, 2)
4

# max(...)
# Renvoie le plus grand nombre d'un ensemble de nombres
> max(5, 12, 9)
12

# min(...)
# Renvoie le plus petit nombre d'un ensemble de nombres
> min(12, 54, 3)
3

# parseint(string, base)
# Parse une chaîne de caractère en nombre avec une base spécifique
> parseint("100", 10)
100
> parseint("FF", 16)
255
> parseint("1011111011101111", 2)
48879

# pow(x, y)
# Calcule x élevé à la puissance de y
> pow(3, 2)
9

# signum(number)
# Renvoie le signe d'un nombre
> signum(-13)
-1
> signum(0)
0
> signum(344)
1
```
