---
title: Opérateurs
category: Python, Library, Numpy
---

## Get

* On peut accéder aux différentes dimensions soit avec `a[d1][d2][d3]` soit `a[d1, d2, d3]`

  ``` python
  a = np.array([[0,1,2,3],[10,11,12,13],[20,21,22,23],[30,31,32,33]])
  print(a[3][2]) # 32
  print(a[3, 2]) # 32
  ```

* On peut passer une liste d'index: `a[[i1_d1, i2_d1][i1_d2, i2_d2]]`

  ``` python
  # Ligne 1/colonne 2 + ligne 3/colonne 2
  print(a[ [1,3],[2,2] ]) # [12 32]
  ```

## Slicing

Les opérations de slicing s'appliquent sur les arrays, et on peut les appliquer sur plusieurs dimensions.

* <ins>Ligne</ins>  
  Retourne la première ligne

  ``` python
  print(a[0])
  '''
  [0 1 2 3]
  '''
  ```

  Reoturne les deux premières lignes  
  (index de début : index de fin -1 : step)

  ``` python
  print(a[0:2])
  '''
  [[ 0  1  2  3]
   [10 11 12 13]]
  '''
  ```

  Retourne les lignes paires

  ``` python
  print(a[::2])
  '''
  [[ 0  1  2  3]
   [20 21 22 23]]
  '''
  ```

  Retourne les lignes 1 et 3

  ``` python
  print(a[[1,3]])
  '''
  [[10 11 12 13]
   [30 31 32 33]]
  '''
  ```

* <ins>Colonne</ins>  
  Retourne la première colonne

  ``` python
  print(a[:,0])
  '''
  [ 0 10 20 30]
  '''
  ```

  Retourne les deux premières colonnes  
  (index de début : index de fin -1 : step)

  ``` python
  print(a[:,0:2])
  '''
  [[ 0  1]
   [10 11]
   [20 21]
   [30 31]]
  '''
  ```

  Retourne les colonnes 1 et 3

  ``` python
  print(a[:,[1,3]])
  '''
  [[ 1  3]
   [11 13]
   [21 23]
   [31 33]]
  '''
  ```

* <ins>Ligne & colonne</ins>  
 Retourne les deux premières lignes des deux premières colonnes

  ``` python
  print(a[0:2,0:2])
  '''
  [[ 0  1]
   [10 11]]
  '''
  ```

---

## Assignation

On peut assigner une valeur donnée aux valeurs sélectionnées:

  ``` python
  # Avec un scalaire
  a    = np.zeros((3,2))
  a[:] = 1
  print(a)
  '''
  [[1. 1.]
   [1. 1.]
   [1. 1.]]
  '''
  ```

  ``` python
  # Avec une matrice de même dimension
  a    = np.zeros((3,2))
  a[1] = [1,2]
  print(a)
  '''
  [[0. 0.]
   [1. 2.]
   [0. 0.]]
  '''
  ```

  ``` python
  a = np.ones((8,8))
  a[1::2,::2] = 0  # colonnes paires des lignes impaires
  a[::2,1::2] = 0  # colonnes impaires des lignes paires
  print(a)
  '''
  [[1. 0. 1. 0. 1. 0. 1. 0.]
   [0. 1. 0. 1. 0. 1. 0. 1.]
   [1. 0. 1. 0. 1. 0. 1. 0.]
   [0. 1. 0. 1. 0. 1. 0. 1.]
   [1. 0. 1. 0. 1. 0. 1. 0.]
   [0. 1. 0. 1. 0. 1. 0. 1.]
   [1. 0. 1. 0. 1. 0. 1. 0.]
   [0. 1. 0. 1. 0. 1. 0. 1.]]
  '''
  ```

---

## Filtre

* Comparer une matrice à une expression retourne une matrice de booléens

  ``` python
  a = np.arange(25).reshape((5,5))
  print(a)
  '''
  [[ 0  1  2  3  4]
   [ 5  6  7  8  9]
   [10 11 12 13 14]
   [15 16 17 18 19]
   [20 21 22 23 24]]
  '''

  print(a % 2 == 0)
  '''
  [[ True False  True False  True]
   [False  True False  True False]
   [ True False  True False  True]
   [False  True False  True False]
   [ True False  True False  True]]
  '''
  ```

* On peut ensuite filtrer les valeurs d'une matrice avec les valeurs booléennes

  ``` python
  print(a[a % 2 == 0])
  '''
  [ 0  2  4  6  8 10 12 14 16 18 20 22 24]
  '''
  ```

  Pour filtrer en utilisant plusieurs critères, mettre les différentes expressions entre parenthèses et appliquer un opérateur bitwise:

  ``` python
  print(a[(a % 2 == 0) & (a > 9)])
  '''
  [10 12 14 16 18 20 22 24]
  '''

  print(a[(a % 2 == 0) | (a < 9)])
  '''
  [ 0  1  2  3  4  5  6  7  8 10 12 14 16 18 20 22 24]
  '''
  ```

  ``` python
  a = np.array([1,2,np.nan,4])
  print(a)               # [ 1.  2. nan  4.]
  print(a[~np.isnan(a)]) # [1. 2. 4.]
  ```

* Comme avec le slicing, on peut assigner une valeur donnée aux valeurs sélectionnées:

  ``` python
  a[a % 5 == 0] = 99
  print(a)
  '''
  [[99  1  2  3  4]
   [99  6  7  8  9]
   [99 11 12 13 14]
   [99 16 17 18 19]
   [99 21 22 23 24]]
  '''
  ```

* Trouver les index qui correspondant aux critères:

  ``` python
  res = np.where(a % 2 == 0)
  print(res)
  '''
  (
    array([0, 0, 0, 1, 1, 2, 2, 2, 3, 3, 4, 4, 4]),
    array([0, 2, 4, 1, 3, 0, 2, 4, 1, 3, 0, 2, 4])
  )
  '''

  for x,y in np.nditer(res):
    print(a[x, y], end=' ')
  # 0 2 4 6 8 10 12 14 16 18 20 22 24 
  ```

---

## Broadcasting

Quand on applique un opération arithmétique sur un array avec un scalaire (ex un entier), alors le scalaire est *broadcasté*, c'est à dire appliqué à l'ensemble des éléments de la matrice — comme si le scalaire était une matrice de même dimension où toutes les valeurs sont égales au scalaire.

``` python
print(np.array([1,2,3,4]) + 10) # [11 12 13 14]
```

De la même manière, si on fournit un array de 1 dimension et un array de n dimensions, alors les deux sont "etirés".

``` python
a = np.array([[0],[1],[2],[3]])
print(a)
'''
[[0]
 [1]
 [2]
 [3]]
'''

b = np.zeros(5)
print(b)
'''
[0. 0. 0. 0. 0.]
'''

print(a + b)
'''
[[0. 0. 0. 0. 0.]
 [1. 1. 1. 1. 1.]
 [2. 2. 2. 2. 2.]
 [3. 3. 3. 3. 3.]]
'''
```

## Arithmérique element-wise

* <ins>Addition</ins>  
  `x + y` ou `np.add(x, y)`

  ``` python
  x = np.array([[1,2],[3,4]])
  y = np.array([[10,20],[30,40]])

  print(x + 10)
  '''
  [[11 12]
   [13 14]]
  '''

  print(x + y)
  '''
  [[11 22]
   [33 44]]
  '''

  '''
  [[11 22]
   [33 44]]
  '''
  ```

* <ins>Soustraction</ins>  
  `x - y` ou `np.subtract(x, y)`

  ``` python
  print(y - 10)
  '''
  [[ 0 10]
   [20 30]]
  '''

  print(y - x)
  '''
  [[ 9 18]
   [27 36]]
  '''
  ```

* <ins>Multiplication</ins>  
  `x * y` ou `np.multiply(x, y)`

  Notons qu'il s'agit ici d'une  multiplication élément par élément et non d'une multiplication de matrice (pas comme Matlab).

  ``` python
  print(x * 10)
  '''
  [[10 20]
   [30 40]]
  '''

  print(x * y)
  '''
  [[ 10  40]
   [ 90 160]]
  '''

  '''
  [[ 10  40]
   [ 90 160]]
  '''
  ```

* <ins>Division</ins>  
  `x / y` ou `np.divide(x,y)`  
  `x // y` ou `np.floor_divide(x,y)`  
  `x % y` ou `np.mod(x,y)`

  ``` python
  print(y / 10)
  '''
  [[1. 2.]
   [3. 4.]]
  '''

  print(y / x)
  '''
  [[10. 10.]
   [10. 10.]]
  '''
  ```

  ``` python
  print(1 / x)
  print(np.divide(1, x))

  print(1 // x)
  print(np.floor_divide(1, x))

  print(1 % x)
  print(np.mod(1, x))
  ```

* <ins>Exposant</ins>  
  `x**k` ou `np.power(x, k)`

  ``` python
  print(x**2)
  '''
  [[ 1  4]
   [ 9 16]]
  '''

  print(np.power(x, 2))
  '''
  [[ 1  4]
   [ 9 16]]
  '''
  ```

* <ins>Bitwise</ins>  
  `x & y` ou `np.bitwise_and(x, y)`  
  `x | y` ou `np.bitwise_or(x, y)`

  ``` python
  x = np.array([[8]])
  y = np.array([[25]])

  print(x & y)                 # [[8]]
  print(np.bitwise_and(x, y))  # [[8]]

  print(x | y)                 # [[25]]
  print(np.bitwise_or(x, y))   # [[25]]
  print(np.bitwise_xor(x, y))  # [[17]]

  print(np.invert(x))          # [[-9]]
  print(np.left_shift(x, 1))   # [[16]]
  print(np.right_shift(x, 1))  # [[4]]
  ```