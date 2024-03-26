---
title: Fonctions II
category: Python, Library, Numpy
---

## Copier

### copy

* Par défaut, les objets Numpy sont passés par référence. copy() crée un nouvel objet. Un changement sur la copie ne change pas l'original et inversemment un changement sur l'original ne change pas la copie.

  ``` python
  a = np.array([1, 2, 3, 4, 5])
  b = a
  b[2] = 20
  print(b)  # [ 1  2 20  4  5]
  print(a)  # [ 1  2 20  4  5]
  ```

  ``` python
  a = np.array([1, 2, 3, 4, 5])
  b = a.copy()
  b[2] = 20
  print(b)  # [ 1  2 20  4  5]
  print(a)  # [1 2 3 4 5]
  ```

### view

* view() récupère les données de l'objet par référence. Toute modification apportée aux données de la vue change l'original et tout changement à l'original affecte la vue. En revanche un changement des propriétés de l'objet reste local.

  ``` python
  a = np.array([1, 2, 3, 4, 5])
  b = a
  b.shape = (5,1)
  print(b)  # [[1][2][3][4][5]]
  print(a)  # [[1][2][3][4][5]]
  ```

  ``` python
  a = np.array([1, 2, 3, 4, 5])
  b = a.view()
  b.shape = (5,1)
  print(b)  # [[1][2][3][4][5]]
  print(a)  # [1 2 3 4 5]
  ```

## Répéter

### repeat

* repeat() répète les valeurs d'un tableau.  
  Retourne un vecteur, utiliser reshape pour obtenir une matrice aux dimensions souhaitées

  ``` python
  print(np.array([[1,2],[3,4]]).repeat(2))
  '''
  [1 1 2 2 3 3 4 4]
  '''
  ```

  ``` python
  print(np.array([[1,2],[3,4]]).repeat(4).reshape(2,-1))
  '''
  [[1 1 1 1 2 2 2 2]
   [3 3 3 3 4 4 4 4]]
  '''
  ```


### tile

* tile() répète les lignes d'un tableau

  ``` python
  # Répéter sur la ligne
  print(np.tile(np.arange(5), 2))
  '''
  [0 1 2 3 4 0 1 2 3 4]
  '''

  print(np.tile(np.array([[1,2],[3,4]]), 2))
  '''
  [[1 2 1 2]
   [3 4 3 4]]
  '''
  ```

  ``` python
  # Répéter sur une nouvelle ligne
  print(np.tile(np.arange(5), (2, 1)))
  '''
  [[0 1 2 3 4]
   [0 1 2 3 4]]
  '''

  print(np.tile(np.array([[1,2],[3,4]]), (2, 1)))
  '''
  [[1 2]
   [3 4]
   [1 2]
   [3 4]]
  '''
  ```

### concatenate

* vstack() permet de concaténer verticalement deux array

  ``` python
  a = [[1,2],[3,4]]
  b = [[10,20],[30,40]]

  print(np.vstack((a, b)))
  '''
  [[ 1  2]
   [ 3  4]
   [10 20]
   [30 40]]
  '''

  print(np.concatenate((a, b), axis=0))
  '''
  [[ 1  2]
   [ 3  4]
   [10 20]
   [30 40]]
  '''
  ```

* hstack() de concaténer horizontalement deux array

  ``` python
  a = [[1,2],[3,4]]
  b = [[10,20],[30,40]]

  print(np.hstack((a, b)))
  '''
  [[ 1  2 10 20]
   [ 3  4 30 40]]
  '''

  print(np.concatenate((a, b), axis=1))
  '''
  [[ 1  2 10 20]
   [ 3  4 30 40]]
  '''
  ```

### meshgrid

* meshgrid() permet de récupérer les coordonnées des intersections entre deux axes

  ``` python
  # valeurs des axes X et Y
  X = np.array([0,1,2])
  Y = np.array([0,1,2])

  # dessiner la grille X/Y (ci-dessous)
  for x in X:
      plt.axvline(x, color='blue')
  for y in Y:
      plt.axhline(y, color='red')

  # intersections des deux axes
  XX, YY = np.meshgrid(X,Y)

  # coordonnées X des intersections
  print(XX)
  '''
  [[0 1 2]
   [0 1 2]
   [0 1 2]]
  '''

  # coordonnées Y des intersections
  print(YY)
  '''
  [[0 0 0]
   [1 1 1]
   [2 2 2]]
  '''

  # coordonnées X/Y des intersections
  print(np.char.add(XX.astype('str'), YY.astype('str')))
  '''
  [['00' '10' '20']
   ['01' '11' '21']
   ['02' '12' '22']]
  '''
  ```

  ![](https://i.imgur.com/ktGr5Yp.png)

## Séparer

### split, hsplit

* split() sépare une matrice en tableaux  

  ``` python
  a = np.arange(1,26).reshape((5,5))
  print(a)
  '''
  [[ 1  2  3  4  5]
   [ 6  7  8  9 10]
   [11 12 13 14 15]
   [16 17 18 19 20]
   [21 22 23 24 25]]
  '''

  print(np.split(a, 5))
  '''
  [
    array([[ 1,  2,  3,  4,  5]]),
    array([[ 6,  7,  8,  9, 10]]),
    array([[11, 12, 13, 14, 15]]),
    array([[16, 17, 18, 19, 20]]),
    array([[21, 22, 23, 24, 25]])
  ]
  '''

  print(np.hsplit(a, 5))
  '''
  [
    array([[ 1], [ 6], [11], [16], [21]]),
    array([[ 2], [ 7], [12], [17], [22]]),
    array([[ 3], [ 8], [13], [18], [23]]),
    array([[ 4], [ 9], [14], [19], [24]]),
    array([[ 5], [10], [15], [20], [25]])
  ]
  '''
  ```

## Comparer deux tableaux

### maximum

* maximum() compare deux tableaux de même dimension et retourne un tableau contenant les valeurs maximales élément par élément.

  ``` python
  x = np.array([[1,2],[3,4]])
  y = np.array([[0,2],[2,5]])

  print(np.maximum(x, y))
  '''
  [[1 2]
   [3 5]]
  '''
  ```

### minimum

* minimum() retourn les valeurs minimales élément par élément.

  ``` python
  print(np.minimum(x, y))
  '''
  [[0 2]
   [2 4]]
  '''
  ```

### intersect

* intersect1d() retourne la liste de valeurs présentes dans les deux tableaux

  ``` python
  a1 = np.array([[1,2],[3,4]])
  a2 = np.array([[4,5],[6,1]])

  print(np.intersect1d(a1, a2))
  # [1 4]
  ```

### union

* union1d() retourne la liste de valeurs présentes dans le tableau 1 ou 2, sans duplicat.

  ``` python
  print(np.union1d(a1, a2))
  # [1 2 3 4 5 6]
  ```

### diff

* setdiff1d() retourne les éléments du tableau 1 qui ne sont pas dans le tableau 2

  ``` python
  print(np.setdiff1d(a1, a2))
  # [2 3]
  ```

### equal, less, greater

* Les fonctions d'inégalités retournent une liste de booléens, utiliser any()  pour tester si au moins une valeur est vraie
  ou all() pour tester si toutes les valeurs sont vraies.

  ``` python
  a = np.array([1, 3, 2])
  b = np.array([1, 2, 3])

  print(np.equal(a, b))          # [ True False False]
  print(np.equal(a, b).any())    # True
  print(np.equal(a, b).all())    # False
  ```

  ``` python
  print(np.not_equal(a, b))     # [False  True  True]
  print(np.less(a, b))          # [False False  True]
  print(np.less_equal(a, b))    # [ True False  True]
  print(np.greater(a, b))       # [False  True False]
  print(np.greater_equal(a, b)) # [ True  True False]
  ```
