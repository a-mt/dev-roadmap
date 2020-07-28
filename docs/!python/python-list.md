---
title: Listes
category: Web, Python
---

## Définition

* Un élément `list` est une suite ordonnée d'éléments mutables (c'est à dire dont la valeur peut être modifiée).

  ``` python
  l = [2,3]
  print(l)    # [2, 3]
  print(l[0]) # 2
  ```

* Il n'est pas possible d'assigner une valeur à un index qui n'existe pas (il faut utiliser une fonction `append` ou `insert`)

  ``` python
  l[0] = 1    # Modifie la valeur de l'index 0
  l[2] = 1    # IndexError: list assignment index out of range
  ```

* Une liste peut contenir différents types.

  ``` python
  l2 = [1,2,"Hello World",[3,4],(True,False)]

  print(l2)       # [1, 2, 'Hello World', [3, 4], (True, False)]
  print(l2[3])    # [3, 4]
  print(l2[3][0]) # 3
  ```

## Opérateurs

Les opérateurs disponibles sur les chaînes de caractères sont également disponibles sur les listes.

* <ins>Get ([i])</ins>

  ``` python
  l = ['H', 'e', 'l', 'l', 'o']

  print(l[0])  # H
  print(l[-1]) # o
  ```

* <ins>Slice ([from:to])</ins>

  ``` python
  l = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  print(l[2:])       # [2, 3, 4, 5, 6, 7, 8, 9]
  print(l[:5])       # [0, 1, 2, 3, 4]
  print(l[2:5])      # [2, 3, 4]

  print(l[::2])      # [0, 2, 4, 6, 8]
  print(l[::-1])     # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

  print(l[-5:-2])    # [5, 6, 7]
  print(l[-2:-5:-1]) # [8, 7, 6]
  ```

* <ins>Set (=)]</ins>  
  On peut assigner une valeur donnée à un index donné mais on peut aussi remplacer un intervalle par un autre

  ``` python
  l = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  l[0]   = 'z'
  l[2:5] = ['a','b']

  print(l)    # ['z', 1, 'a', 'b', 5, 6, 7, 8, 9]

  ```

* <ins>Concat (+)</ins>

  ``` python
  print(['a', 'b', 'c'] + ['d', 'e', 'f']) # ['a', 'b', 'c', 'd', 'e', 'f']
  ```

* <ins>Repeat (*)</ins>

  ``` python
  print([1,2,3]*3) # [1, 2, 3, 1, 2, 3, 1, 2, 3]
  ```

* <ins>Delete (del)</ins>  
  Le mot-clé `del` permet de supprimer un ou plusieurs index

  ``` python
  l = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  del l[2]
  print(l)    # [0, 1, 3, 4, 5, 6, 7, 8, 9]

  del l[:2]
  print(l)    # [3, 4, 5, 6, 7, 8, 9]
  ```

* <ins>Appartenance (in, not in)</ins>  
  Vérifie si une valeur donnée est dans la liste

  ``` python
  print(2 in [1,2,3])        # True
  print("2" in [1,2,3])      # False
  print("2" not in [1,2,3])  # True
  ```

* <ins>Égalité (==)</ins>  
  Vérifie si deux listes contiennent les mêmes éléments, dans le même ordre

  ``` python
  print([1,2,3] == [1,2,3])  # True
  print([1,2,3] == [1,3,2])  # False
  ```

## Fonctions

* Longueur

  ``` python
  print(len([1,2,3])) # 3
  ```

* Caster un autre type de donnée en liste

  ``` python
  print(list("hello")) # ['h', 'e', 'l', 'l', 'o']
  print(list((1,2)))   # [1, 2]
  ```

  On peut utiliser la méthode `split` pour séparer une chaîne de caractère selon un délimiteur donné

  ``` python
  print("abc,def,ghi".split(','))
  # ['abc', 'def', 'ghi']
  ```

  Ou on peut effectuer un split avec un regex:

  ``` python
  regex = r'-+'
  text  = "abc---def-ghi"

  import re
  print(re.split(regex, text))
  # ['abc', 'def', 'ghi']
  ```

* Vérifier si une variable est une liste

  ``` python
  print(isinstance(l, list)) # True
  ```

* Valider

  ``` python
  # Au moins une des valeurs est vraie
  print(any([0,0,0,1,0,0])) # True
  print(any([0,0,0,0,0,0])) # False

  # Toutes les valeurs sont vraies
  print(all([1,1,1,0,1,1])) # False
  print(all([1,1,1,1,1,1])) # True
  ```

* Trier les éléments d'une liste  
  Retourne un nouveau tableau, le tableau d'origine reste tel que.

  ``` python
  l = [27,6,78,215,1,36]

  print(sorted(l)) # [1, 6, 27, 36, 78, 215]
  ```

  Le paramètre `key` peut prendre une fonction lambda en entrée. Cette fonction doit retourner la ou les valeurs à utiliser pour le tri.

  ``` python
  l = [
    ('bob', 2),
    ('alice', 2),
    ('charlie', 1),
  ]
  print(sorted(l, key=lambda x: (x[1], x[0])))
  # [('charlie', 1), ('alice', 2), ('bob', 2)]
  ```

* Récupérer la valeur maximale/minimale

  ``` python
  l = [1,2,3]
  print(min(l)) # 1
  print(max(l)) # 3
  print(sum(l)) # 6
  ```

* Mapper les éléments d'une liste (passer d'une valeur à l'autre grâce à une fonction de callback)

  ``` python
  # Avec map
  l = map(lambda x: x*x, [1,2,3,4,5])
  print(list(l)) # [1,4,9,16,25]
  ```

  ``` python
  # Avec une compréhension de liste
  l = [x*x for x in [1,2,3,4,5]]
  print(l) # [1, 4, 9, 16, 25]
  ```

* Filtrer les éléments d'une liste

  ``` python
  # Avec filter
  l = filter(lambda x: x%2==0, [1,2,3,4])
  print(list(l)) # [2, 4]
  ```

  ``` python
  # Avec une compréhension de liste
  l = [x for x in [1,2,3,4] if x%2==0]
  print(l) # [2, 4]
  ```

* Aggréger les valeurs d'une liste en une seule valeur

  ``` python
  from functools import reduce

  x = reduce(lambda a,b: a+b, [1,2,3,4])
  print(x) # 10
  ```

  ``` python
  l1 = [12, 24, 35, 24, 88, 120, 155, 88, 120, 155]

  # Removing duplicates
  l2 = reduce(lambda l,item: l if item in l else l + [item], l1, [])

  print(l2) # [12, 24, 35, 88, 120, 155]
  ```

## Fonctions pointeur

* Insérer

  ``` python
  # Insérer à la fin
  l.append(4)
  print(l)   # [1, 3, 4]
  ```

  ``` python
  # Insérer à l'index donné
  l.insert(1,2)
  print(l)  # [1, 2, 3, 4]
  ```

* Concaténer  
  Pour concaténer, on peut utiliser `+` (retourne un nouveau tableau) ou la fonction `extend` (modifie le tableau original)

  ``` python
  l = [1,2,3]
  print(l.extend([4,5,6]))  # None
  print(l)                  # [1, 2, 3, 4, 5, 6]
  ```

* Supprimer une valeur donnée (la première occurence)  
  Une erreur ValueError est levée si la valeur n'est pas dans la liste

  ``` python
  l = ["a", "b", "a"]
  print(l.remove("a"))  # None ou ValueError if not found
  print(l)              # ['b', 'a']
  ```

* Supprimer la valeur à un index donné.  
  `pop` retourne la valeur de cet élément

  ``` python
  l = [1,2,3]
  print(l.pop(1)) # 2
  print(l)        # [1, 3]
  ```

  Si aucun index n'est passé à `pop`, la dernière valeur du tableau est supprimée.

  ``` python
  l = [1,2,3]
  print(l.pop()) # 3
  print(l)       # [1, 2]
  ```

* Localiser

  ``` python
  l = [1,2,3]
  print(l.index(2))    # 1
  print(l.index('z'))  # ValueError: 'z' is not in list
  ```

* Trier  
  `sorted(l)` retourne un nouveau tableau `l.sort()` tri le tableau d'origine.

  ``` python
  l = [
    ('bob', 2),
    ('alice', 2),
    ('charlie', 1),
  ]
  print(l.sort(key=lambda x: (x[1], x[0]))) # None

  print(l) # [('charlie', 1), ('alice', 2), ('bob', 2)]
  ```

* Inverser l'ordre des valeurs

  ``` python
  l = [1,2,3]
  print(l.reverse()) # None
  print(l)           # [3, 2, 1]
  ```