---
title: Tuples
category: Web, Python
---

## Définition

Un élément `tuple` est une liste ordonnée d'éléments non mutables.

``` python
a = 2,3
print(a)    # (2, 3)
print(a[0]) # 2
```

On met généralement des parenthèses autour de la liste pour que le code soit facile à lire  mais elle ne sont pas obligatoires.

``` python
a = (2,3)
print(a)
```

Pour créer un tuple qui ne comporte qu'un seul élément, ajouter une virgule à la fin

``` python
a = (2)
print(type(a), a)  # <class 'int'> 2

a = (2,)
print(type(a), a)  # <class 'tuple'> (2,)
```

## Opérateurs

Les tuples ont les mêmes opérateurs que les liste (`[]`, `[:]`, `+`, `*`, `in`)

## Typecast

Pour convertir un autre type de données en en tuple, utiliser `tuple`

```
tuple([1,2,3,4,5])
```

## Fonctions

* Nombre d'occurences d'une valeur donnée

  ``` python
  print((1,2,2).count(2))    # 2
  print((1,2,2).count("a"))  # 0
  ```

* Position d'une valeur donnée

  ``` python
  print((1,2,2).index(2))   # 1
  print((1,2,2).index("a")) # ValueError: tuple.index(x): x not in tuple
  ```

## Namedtuples

``` python
from collections import namedtuple

Point = namedtuple('Point', 'x y')

p = Point(1, y=2) # Point(x=1, y=2)
p[0]             # 1
p.x              # 1
getattr(p, 'y')  # 2

p._fields        # Or: Point._fields #('x', 'y')
```