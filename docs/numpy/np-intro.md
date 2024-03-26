---
title: Introduction
category: Python, Library, Numpy
---

## Pourquoi Numpy

Numpy est le package de base utilisé dans tous les packages de traitement de données — tels que Pandas, Matplotlib ou Scipy. On peut passer des objets Numpy en paramètre et appeler les fonctions Numpy sur les objets crées par les différents packages qui l'utilisent.

La syntaxe de base de Python et le package `math` permettent d'effectuer des calculs numériques sur des entiers et réels.  
Numpy (*numerical computing in Python*) est un package Python qui permet d'effectuer des calculs numériques sur des vecteurs et matrices.

Les calculs sur les vecteurs/matrices permettent de paralléliser les calculs (avec un CPU ou GPU) et donc d'accélérer le processus. Vectoriser des calculs, c'est grosso modo se débarrasser des boucles explicites dans le code.

<ins>Exemple</ins>:

``` python
import numpy as np
import time

a = np.random.rand(1000000)
b = np.random.rand(1000000)

#----------------------------
# Calculs avec une boucle for sur des réels
c = 0
tic = time.time()
for in in range(1000000):
    c += a[i]*b[i]
toc = time.time()

print(c) # 250286.989866
print("Boucle for: " + str(100*(toc-tic)) + "ms")
# Boucle for: 474.29513931274414ms

#----------------------------
# Calculs avec un vecteur

tic = time.time()
c = np.dot(a,b)
toc = time.time()

print(c) # 250286.989866
print("Version vectorisée: " + str(1000*(toc-tic)) + "ms")
# Version vectorisée: 1.5027523040771484ms
```

Video: [What is NumPy](https://www.youtube.com/watch?v=5Nwfs5Ej85Q)

## Arrays

Numpy manipule des *array*, c'est à dire des listes ordonnées de nombres pouvant être sur plusieurs dimensions. Numpy peut ainsi manipuler

* Des <ins>vecteurs</ins>: liste ordonnée de nombres, 1 dimension (n données)
* Des <ins>matrices</ins>: liste ordonnée de nombres, 2 dimensions (n*m données)
* Des <ins>tenseurs</ins>: liste ordonnée de nombres, 3 dimensions ou plus (v\*n\*m données)

  ![](https://i.imgur.com/G32D8Vx.png)

Les vecteurs, matrices, etc, ne sont ni plus ni moins que des outils de calculs, ils possèdent des propriétés permettant d'effectuer des calculs en les distribuant plutôt que d'effectuer une longue ligne de calcul en un seul bloc.

## Bases

* Par convention, Numpy est toujours importé sous le nom `np`

  ``` python
  import numpy as np

  print(np.__version__) 
  ```

* On peut spécifie le type de données au moment de créer le tableau avec le paramètre `dtype` (pour data type).

  Il existe de nombreux [types possibles](https://numpy.org/doc/stable/reference/arrays.dtypes.html) — les plus couramment utilisés sont np.uint8, np.int32, np.int64, np.float32 et np.float64. Si non précisé, le type par défaut est np.int32

  ``` python
  print(np.array([[1,2,3], [4,5,6]]))
  '''
  [[1 2 3]
   [4 5 6]]
  '''
  ```

  ``` python
  np.array([[1,2,3], [4,5,6]], dtype=np.float32)
  '''
  [[1. 2. 3.]
   [4. 5. 6.]]
  '''
  ```

* On peut créer des types personnalisés, ce qui permet de nommer et typer les colonnes individuellement. Ce mécanisme est utilisé par Pandas, un package utilisé pour manipuler des données au format tabulaire (importées à partir de fichiers .csv ou .xls notamment).

  ``` python
  # Construct a custom datatype
  dt = np.dtype([('name', np.unicode_, 16),
                 ('grades', np.float64, (2,))])

  # Create a structure with custom datatype
  x = np.array([('Sarah', (8.0, 7.0)),
                ('John', (6.0, 7.0))], dtype=dt)

  print(x)                                     # [('Sarah', [8., 7.]) ('John', [6., 7.])]
  print(x[1])                                  # ('John', [6., 7.])
  print("Grades of John are:", x[1]['grades']) # Grades of John are: [6. 7.]
  print("Names are:", x['name'])               # Names are: ['Sarah' 'John']
  ```

  ``` python
  # fromarrays
  Z = np.array([('Sarah', (8.0, 7.0)),
                ('John', (6.0, 7.0))])
  R = np.core.records.fromarrays(Z.T, names='name, grades', formats = 'S8, O')
  ```

* Les attributs de l'objet permettent de vérifier sa taille/dimension:

  ``` python
  a = np.array([[1,2,3], [4,5,6]], dtype=np.float32)

  print(a.ndim)     # 2
  print(a.size)     # 6
  print(a.shape)    # (2, 3)
  print(a.dtype)    # float32
  print(a.itemsize) # 4  — octets par valeur
  print(a.nbytes)   # 24 — octets au total
  ```

---

## Types de données

On peut spécifier le type de données en récupérant l'objet dtype déclaré par Numpy, par exemple `np.complex(128)`.  
Ou alors utliser la notation symbolique: le premier caractère spécifie le type de données et le reste des caractères spécifie le nombre d'octets par élément, par exemple `"c16"` — doit correspondre à un type existant.

| Nom              | Symbole | Exemple
|---               |---      |---
| integer          | `i`     | -1
| unsigned integer | `u`     | 1
| float            | `f`     | 0.1
| boolean          | `?`     | True
| complex          | `c16`   | 1j
| timedelta        | `m`     | np.timedelta64(1, 'D')
| datetime         | `M`     | np.datetime64('today')
| object           | `O`     | lambda x: x**2
| unicode string   | `U`     | 'Hello'

[Numpy types](https://numpy.org/doc/stable/user/basics.types.html?highlight=data%20types)  
[One-character strings](https://numpy.org/doc/stable/reference/arrays.dtypes.html#specifying-and-constructing-data-types)  
[Datetimes and Timedeltas](https://docs.scipy.org/doc/numpy-1.13.0/reference/arrays.datetime.html)