---
title: Sur les listes
category: Terraform, Fonctions
---

## Créer une liste

tolist, range, csvdecode

``` bash
# list(arg)
# Convertit un set ou tuple en liste
> tolist(["a", "b", "c"])
tolist([
  "a",
  "b",
  "c",
])

# range(from, to, step)
# Crée une liste qui va de I à J (non inclus)
> range(3)
tolist([
  0,
  1,
  2,
])
> range(0, 6, 2)
tolist([
  0,
  2,
  4,
])

# csvdecode(string)
# Crée une liste à partir d'un CSV
> csvdecode("A1,A2\nB1,B2")
tolist([
  {
    "A1" = "B1"
    "A2" = "B2"
  },
])
```

## Récupérer / vérifier un élément

length, sum, element, index, contains, alltrue, anytrue, one

``` bash
# length(list)
# Retourne la longueur de la liste
> length(["a", "b", "c"])
3
> length({"a" = "b"})
1
> length("hello")
5

# sum(list)
# Retourne la somme de tous les éléments
> sum([1, 2, 3])
6

# element(index)
# Retourne the n-ième élément
> element(["a", "b", "c"], 1)
"b"

# index(value)
# Retourne l'index oe la valeur donnée
> index(["a", "b", "c"], "b")
1
> index(["a", "b", "c"], "d")
│ Call to function "index" failed: item not found.

# contains(value)
# Vérifie si la valeur donnée est présente dans la liste
> contains(["a", "b", "c"], "b")
true
> contains(["a", "b", "c"], "d")
false

# alltrue(list)
# Vérifie si toutes les valeurs sont à vrai
> alltrue([true, "true"])
true
> alltrue([true, "false"])
false
> alltrue([])
true

# anytrue(list)
# Vérifie si au moins une valeur est à vrai
> anytrue([false, "true"])
true
> anytrue([false, "false"])
false
> anytrue([])
false

# one(list)
# Retourne le premier élément du tableau ou null
# Échoue si la longueur de la liste est supérieure à 1
> one([])
null
> one([1])
1
> one([1, 2])
│ Invalid value for "list" parameter: must be a list, set, or tuple value with either zero or one elements.
```

## Tri

reverse, sort

``` bash
# reverse(list)
# Inverse les éléments de la liste
> reverse([3, 2, 1])
[
  1,
  2,
  3,
]

# sort(list)
# Trie alphabétique les éléments de la liste
> sort(["1", "10", "2"])
tolist([
  "1",
  "10",
  "2",
])
```

## Séparer, joindre, filtrer

chunklist, concat, flatten, distinct, compact, coalescelist, slice, setintersection, setproduct, setsubtract, setunion

``` bash
# chunklist(list, number)
# Split une liste en sous-listes de N éléments
> chunklist(["A1", "A2", "B1", "B2", "C"], 2)
tolist([
  tolist([
    "A1",
    "A2",
  ]),
  tolist([
    "B1",
    "B2",
  ]),
  tolist([
    "C",
  ]),
])

# concat(...)
# Concatène des listes en une liste
> concat(["A1", "A2"], ["B1", "B2"], ["C"])
[
  "A1",
  "A2",
  "B1",
  "B2",
  "C",
]

# flatten(...)
# Concatène des listes, sous-listes ou valeurs ou une liste
> flatten([["A1", "A2"], "B1", "B2", [["C"]]])
[
  "A1",
  "A2",
  "B1",
  "B2",
  "C",
]

# distinct(...)
# Retire les duplicats de la liste
> distinct(["A1", "A2", "A1", "B2"])
tolist([
  "A1",
  "A2",
  "B2",
])

# compact(list)
# Retire toutes les valeurs nulles ou vides
> compact(["a", "", "b", null, "c"])
tolist([
  "a",
  "b",
  "c",
])

# coalescelist(...)
# Retourne la première liste ayant une longueur supérieure à 1
> coalescelist([], [null], [1])
[
  null,
]

# slice(list, from, to)
# Retourne un sous-ensemble de la liste
> slice(["a", "b", "c", "d"], 1, 3)
[
  "b",
  "c",
]
```
``` bash
# setintersection(...)
# Retourne l'intersection des différentes listes
> setintersection(["A1", "A2"], ["A1", "B2"])
toset([
  "A1",
])

# setproduct(...)
# Retourne le produit des différentes listes
> setproduct(["A1", "A2"], ["A1", "B2"])
tolist([
  [
    "A1",
    "A1",
  ],
  [
    "A1",
    "B2",
  ],
  [
    "A2",
    "A1",
  ],
  [
    "A2",
    "B2",
  ],
])

# setsubtract(...)
# Retourne la soustraction des différentes listes
> setsubtract(["A1", "A2"], ["A1", "B2"])
toset([
  "A2",
])

# setunion(...)
# Retourne l'union des différentes listes
> setunion(["A1", "A2"], ["A1", "B2"])
toset([
  "A1",
  "A2",
  "B2",
])
```
