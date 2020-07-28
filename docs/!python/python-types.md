---
title: Types de données & variables
category: Web, Python
---

## Types de données

Les différents types de données Python sont:

| Type de données      | Nom       | Exemple
|---                   |---        |---
| Valeur nulle         | `None`    | `None`
| Chaîne de caractères | `str`     | `"Hello World"` / `'Hello World'`
| Entier               | `int`     | `1`
| Réel                 | `float`   | `1.1`
| Nombre complexe      | `complex` | `1j` / `1 + 1j`
| Booléen              | `bool`    | `True` / `False`
| &nbsp; | &nbsp; | &nbsp;
| Liste ordonnée       | `list`    | `[1,2,3]`
| Liste ordonnée non mutable    | `tuple`   | `(1,2,3)`
| Liste entre a et b-1 | `range`   | `range(1,4)`
| Liste clé/valeur     | `dict`    | `{"a":1, "b":2, "c":3}`
| Liste non ordonnée de valeurs uniques | `set` | `{1,2,3}`
| &nbsp; | &nbsp; | &nbsp;
| Fonction             | `function` | `def f(x): return x+1` / `f = lambda x: x+1`
| Objet                | `class '...'` | `ClassName()`

---

## Variables

### Assigner une variable

Il n'est pas nécessaire de déclarer le type des données, celui-ci est automatiquement déduit de la valeur. La variable peut changer de valeur et utiliser un type de données différent que celui avec laquelle elle a été initialisée.

``` python
var = 10
var = "test"
var = lambda x: "OK"
```

* Les noms de variable peuvent contenir [a-zA-Z0-9_] mais doivent toujours commencer par une lettre.
* Par convention, les noms de variables sont en minuscule.
* Les mots clés du langage ne sont pas autorisés:

  ```
  and, as, assert, break, class, continue, def, del, elif, else,
  except, exec, finally, for, form, global, if, import, in, is,
  lambda, not, or, pass, print, raise, return, try, while, with, yield
  ```

### Assigner plusieurs variables

``` python
# Assigne 1 à a & b
a = b = 1

# Assigne 1 à a, 2 à b
a, b = 1, 2

# Swap
a, b = a, b
```

### Afficher une variable

* `print` permet d'afficher une ou plusieurs valeurs.

  ``` python
  var = "Hello"

  print(var)            # Hello
  print("mavar =", var) # mavar = Hello
  ```

* Par défaut, un espace est ajouté entre chaque valeur affichée. On peut changer ce comportement en définissant le paramètre `sep`

  ``` python
  print("Hello", "World", sep='') # HelloWorld
  ```

* Et par défaut, `print` ajoute un retour chariot à la fin. On peut changer ce comportement en définissant le paramètre `end`.

  ``` python
  print(i, end=" ")
  ```

### Vérifier le type d'une variable

* `type` retourne le type de la variable:

  ``` python
  i = 0
  print(type(i)) # int
  ```

* `isinstance` vérifie si la variable est d'une classe donnée:

  ``` python
  isinstance(var, Test)
  ```