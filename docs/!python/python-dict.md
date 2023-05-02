---
title: Dictionnaires
category: Web, Python
---

## Définition

* Un élément `dict` est une suite non ordonnée de clé/valeurs mutables.  
  Les dictionnaires sont indexés (recherche à coût constant)

  ``` python
  print({"a":1, "b":2, "c":3}) # {'a': 1, 'b': 2, 'c': 3}
  print(dict(a=1, b=2, c=3))   # {'a': 1, 'b': 2, 'c': 3}
  ```

* On peut également créer des dictionnaires sur le même principe que les comprehension de liste:

  ``` python
  planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']
  planet_to_initial = {planet: planet[0] for planet in planets}
  planet_to_initial
  '''
  {'Mercury': 'M',
   'Venus': 'V',
   'Earth': 'E',
   'Mars': 'M',
   'Jupiter': 'J',
   'Saturn': 'S',
   'Uranus': 'U',
   'Neptune': 'N'}
  '''
  ```

## list -> dict

``` python
# Creates a dict from collection of key-value pairs.
new_dict = dict([
  ['name','Andrei'],
  ['age',32],
  ['magic_power',False],
])
# Creates a dict from two collections.
new_dict = dict(zip(
  ['name','age','magic_power'],
  ['Andrei',32, False],
))
```

## Opérateurs

* <ins>Get ([x])</ins>  
  On peut accéder aux valeurs avec `[]` ou `.get()`

  ``` python
  d = {"a":1, "b":2, "c":3}
  print(d["a"])     # 1
  print(d["z"])     # KeyError: 'z'
  ```

  ``` python
  print(d.get("a")) # 1
  print(d.get("z")) # None
  ```

* <ins>Set (=)</ins>  
  On peut utiliser les crochets pour modifier la valeur d'un index ou pour ajouter de nouvelles clés

  ``` python
  d["a"] = 9
  d["z"] = 9
  print(d)
  # {'a': 9, 'b': 2, 'c': 3, 'z': 9}
  ```

* <ins>Delete (del)</ins>  
  Le mot-clé `del` permet de supprimer une clé donnée.

  ``` python
  del d['z']        # KeyError: 'z'
  ```

  `pop` fait la même chose mais retourne la valeur supprimée

  ``` python
  print(d.pop('a')) # 1
  print(d.pop('z')) # KeyError: 'z'
  ```

* <ins>Appartenance (in, not in)</ins>  
  Vérifie si une clé donnée est dans le dictionnaire

  ``` python
  print("a" in {"a":1, "b":2, "c":3}) # True
  ```

* <ins>Égalité (==)</ins>  
  Vérifie si deux dictionnaires contiennent les mêmes éléments

  ``` python
  print({"a":1, "b":2} == {"b":2, "a":1})      # True
  print({"a":1, "b":2} == {"b":"2", "a":"1"})  # False
  ```

* `+` et `*` ne sont pas supportés.

## Compréhension de dictionnaire

* Même principe qu'une compréhension de liste mais avec un dictionnaire

  ``` py
  l = [
      {"id": "1", "name": "Alice"},
      {"id": "2", "name": "Bob"}
  ]
  d = {
      x['id']: x
      for x in l
  }
  print(d)
  """
  {
    '1': {'id': '1', 'name': 'Alice'},
    '2': {'id': '2', 'name': 'Bob'}
  }
  """
  ```

## Fonctions

* Récupérer les valeurs

  ``` python
  d = {"a":1, "b":2, "c":3}

  for val in d.values():
    print(val)
  # 1 2 3
  ```

* Récupérer les clés

  ``` python
  for key in d.keys():
    print(key)
  # a b c
  ```

* Récupérer une liste de tuples (key, val)

  ``` python
  for key, val in d.items():
    print(key, "-", val, sep="")
  # a-1 b-2 c-3
  ```

* Supprimer le dernier élément inséré

  ``` python
  d = {"a":1, "b":2, "c":3}
  print(d.popitem())  # ('c', 3)
  print(d)            # {'a': 1, 'b': 2}
  ```

* Définir la valeur d'une clé si elle n'est pas déjà définie. Retourne la valeur de la clé.

  ``` python
  d = {"a":1, "b":2, "c":3}
  print(d.setdefault("a", 9))  # 1
  print(d.setdefault("d", 9))  # 9
  print(d)                     # {'a': 1, 'b': 2, 'c': 3, 'd': 9}
  ```

* Union

  ``` python
  d = {"a":1, "b":2, "c":3}
  print(d.update({"c":4, "d": 5})) # None
  print(d)                         # {'a': 1, 'b': 2, 'c': 4, 'd': 5}

  print({**d, **{"e": 6} })        # {'a': 1, 'b': 2, 'c': 4, 'd': 5, 'e': 6}
  print(d)                         # {'a': 1, 'b': 2, 'c': 4, 'd': 5}
  ```
