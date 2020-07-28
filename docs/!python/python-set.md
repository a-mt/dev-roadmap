---
title: Sets
category: Web, Python
---

## Définition

* Un élément `set` est une suite non ordonnée d'éléments uniques.

  ``` python
  print(set((1,1,2)))   # {1, 2}
  print({1,1,2})        # {1, 2}
  ```

## Opérateurs

* <ins>Appartenance (in, not in)</ins>

  ``` python
  print(2 in {1,2}) # True
  ```

* <ins>Égalité (==)</ins>

  ``` python
  print({1,2} == {2,1}) # True
  ```

* Il n'est pas possible d'utiliser `[]`, `[:]`, `+`, `*`

  ``` python
  s = {1,2}
  print(s[0]) # TypeError: 'set' object is not subscriptable
  ```

## Fonctions

* Ajouter une valeur

  ``` python
  s = {1,2}
  print(s.add(3)) # None
  print(s)        # {1,2,3}
  ```

* Ajouter plusieurs valeurs

  ``` python
  print(s.update([4,5])) # None
  print(s)               # {1, 2, 3, 4, 5}
  ```

* Supprimer une valeur

  ``` python
  print(s.remove(2))  # None, KeyError if not found
  print(s.discard(2)) # None
  print(s)            # {1, 3, 4, 5}
  ```

* Union (ajouter)

  ``` python
  # a+b
  s1 = {1,2,3}
  s2 = {3,4,5}
  print(s1.union(s2))  # {1, 2, 3, 4, 5}

  # a+= b
  s1 = {1,2,3}
  s2 = {3,4,5}
  print(s1.update(s2)) # None
  print(s1)            # {1, 2, 3, 4, 5}
  ```

* Différence (soustraire)

  ``` python
  # a-b
  s1 = {1,2,3}
  s2 = {3,4,5}
  print(s1.difference(s2))        # {1, 2}

  # a -= b
  s1 = {1,2,3}
  s2 = {3,4,5}
  print(s1.difference_update(s2)) # None
  print(s1)                       # {1, 2}
  ```

* Intersection

  ``` python
  # a ∩ b
  s1 = {1,2,3}
  s2 = {3,4,5}
  print(s1.intersection(s2))        # {3}

  # a ∩= b
  s1 = {1,2,3}
  s2 = {3,4,5}
  print(s1.intersection_update(s2)) # None
  print(s1)                         # {3}
  ```

* Exclusion

  ``` python
  # a xor b
  s1 = {1,2,3}
  s2 = {3,4,5}
  print(s1.symmetric_difference(s2))        # {1, 2, 4, 5}

  # a xor= b
  s1 = {1,2,3}
  s2 = {3,4,5}
  print(s1.symmetric_difference_update(s2)) # None
  print(s1)                                 # {1, 2, 4, 5}
  ```

* Valider

  ``` python
  # Aucune des valeurs données n'est dans le set
  s1 = {1,2,3}
  print(s1.isdisjoint({3,4,5}))   # False
  print(s1.isdisjoint({4,5}))     # True

  # Toutes les valeurs données sont dans le set
  s1 = {1,2,3}
  print(s1.issuperset({1,2}))     # True
  print(s1.issuperset({1,2,3,4})) # False

  # Les valeurs données comprennent toutes les valeurs du set
  s1 = {1,2,3}
  print(s1.issubset({1,2}))      # False
  print(s1.issubset({1,2,3,4}))  # True
  ```