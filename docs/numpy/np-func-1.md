---
title: Fonctions I
category: Python, Library, Numpy
---

NB Certaines fonctions peuvent être appelées soit sous la forme `np.nomfonction(X, args)` soit `X.nomfonction(args)`

## Reshaping

### reshape

* reshape() permet de modifier le nombre de dimensions d'un array, pourvu que le nombre total d'élément soit le même — ex 1×9 et 3×3

  ``` python
  print(np.arange(10).reshape((5,2)))
  '''
  [[0 1]
   [2 3]
   [4 5]
   [6 7]
   [8 9]]
  '''

  print(np.arange(10).reshape((2,5)))
  '''
  [[0 1 2 3 4]
   [5 6 7 8 9]]
  '''

  print(np.array([[1,2],[3,4],[5,6]]).reshape(3,2,1))
  '''
  [[[1]
    [2]]

   [[3]
    [4]]

   [[5]
    [6]]]
  '''
  ```

  En passant la valeur `-1`, numpy calcule automatiquement la valeur qui va bien — pour que le nombre total de dimensions soit correct.

  ``` python
  print(np.arange(10).reshape((-1,2)))
  '''
  [[0 1]
   [2 3]
   [4 5]
   [6 7]
   [8 9]]
  '''
  ```

### flatten

* flatten() retourne la liste des éléments dans un nouveau tableau — soit en lisant les valeurs lignes par lignes, soit colonnes par colonnes avec l'argument `order="F"`.

  ``` python
  a = np.array([[1,2],[3,4],[5,6]])

  print(a.flatten())           # [1 2 3 4 5 6]
  print(a.flatten(order='F'))  # [1 3 5 2 4 6]
  print(a.reshape(1,-1))       # [[1 2 3 4 5 6]]
  ```

### ravel

* ravel() fait la même chose que flatten() mais retourne une vue et non une copie — permet d'économiser de la mémoire

  ``` python
  print(a.ravel())            # [1 2 3 4 5 6]
  ```

---

## Reorder

### transpose

* transpose() retourne la matrice transposée — les lignes deviennent des colonnes et les colonnes deviennent des lignes. On peut aussi utiliser `X.T`

  ``` python
  a = np.array([[0,1,2,3],[10,11,12,13],[20,21,22,23],[30,31,32,33]])
  print(a)
  '''
  [[ 0  1  2  3]
   [10 11 12 13]
   [20 21 22 23]
   [30 31 32 33]]
  '''

  print(a.T)
  '''
  [[ 0 10 20 30]
   [ 1 11 21 31]
   [ 2 12 22 32]
   [ 3 13 23 33]]
  '''

  print(np.transpose(a))
  '''
  [[ 0 10 20 30]
   [ 1 11 21 31]
   [ 2 12 22 32]
   [ 3 13 23 33]]
  '''
  ```

### rotation, flip

* On peut appliquer différentes transformations:

  ``` python
  # Rotation à 90 anti-clockwise
  print(np.rot90(a))
  '''
  [[ 3 13 23 33]
   [ 2 12 22 32]
   [ 1 11 21 31]
   [ 0 10 20 30]]
  '''

  # Inverse l'ordre des éléments
  print(np.flip(a))
  '''
  [[33 32 31 30]
   [23 22 21 20]
   [13 12 11 10]
   [ 3  2  1  0]]
  '''

  # Inverse l'ordre des colonnes
  print(np.fliplr(a))
  '''
  [[ 3  2  1  0]
   [13 12 11 10]
   [23 22 21 20]
   [33 32 31 30]]
  '''

  # Inverse l'ordre des lignes
  print(np.flipud(a))
  '''
  [[30 31 32 33]
   [20 21 22 23]
   [10 11 12 13]
   [ 0  1  2  3]]
  '''
  ```

### shuffle, permutation

* Mélange les éléments du tableau.  
  shuffle() modifie le tableau d'origine.  
  permutation() retourne un nouveau tableau.

    ``` python
    a = np.arange(10)
    np.random.shuffle(a)
    print(a)
    '''
    [6 5 2 9 8 4 0 1 3 7]
    '''
    ```

    ``` python
    a = np.arange(10)
    print(np.random.permutation(a))
    '''
    [7 8 3 5 4 0 6 9 2 1]
    '''
    ```

### sort

* sort() permet de trier les éléments

  ``` python
  a = np.array([[3,2],[1,0]])

  # En ligne
  print(np.sort(a))
  '''
  [[2 3]
   [0 1]]
  '''

  # En colonne
  print(np.sort(a, axis=0))
  '''
  [[1 0]
   [3 2]]
  '''

  # Sur tous les éléments
  print(np.sort(a, axis=None))
  '''
  [0 1 2 3]
  '''

  print(np.sort(a, axis=None).reshape(a.shape))
  '''
  [[0 1]
   [2 3]]
  '''
  ```

* argsort() retourne les indices si le tableau était trié, ligne par ligne

  ``` python
  a = np.array([
      [1,2,3],
      [6,5,4],
      [7,9,8]
  ])
  print(np.argsort(a))
  '''
  [[0 1 2]
   [2 1 0]   2 est l'index de 4 sur cette ligne
   [0 2 1]]
  '''
  ```

---

## Itérations

### for... flatten

* flatten() permet de réduire le tableau a une dimension, ce qui permet de boucler sur les éléments du tableau:

  ``` python
  x = np.array([
    [[1, 2], [3, 4]],
    [[5, 6], [7, 8]]
  ])

  for i in x.flatten():
    print(i, end=' ')
  '''
  1 2 3 4 5 6 7 8
  '''
  ```

### for... nditer

* nditer() permet d'obtenir le même résultat que flatten() mais en utilisant un générateur — plus économe en mémoire

  ``` python
  for i in np.nditer(x):
      print(i, end=' ')

  '''
  1 2 3 4 5 6 7 8
  '''
  ```

   Peut itérer sur plusieurs tableaux en même temps

  ``` python
  a = np.array([[1,2],[3,4]])
  b = np.array([[10,20],[30,40]])

  for ai,bi in np.nditer([a,b]):
      print("%d:%d" % (ai,bi), end=' ')

  '''
  1:10 2:20 3:30 4:40
  '''
  ```

  On peut récupérer une vue, et donc itérer en mode lecture/écriture, en passant le flag `readwrite`

  ``` python
  a = np.arange(9)
  for i in np.nditer(a, op_flags=['readwrite']):
      i[...] = i*2

  print(a)
  '''
  [ 0  2  4  6  8 10 12 14 16]
  '''
  ```

### for... ndenumerate

* ndenumerate() permet en plus de récupérer l'index de l'élément en cours:

  ``` python
  for coords, x in np.ndenumerate(arr):
    print(coords, ':', x)

  '''
  (0, 0, 0) : 1
  (0, 0, 1) : 2
  (0, 1, 0) : 3
  (0, 1, 1) : 4
  (1, 0, 0) : 5
  (1, 0, 1) : 6
  (1, 1, 0) : 7
  (1, 1, 1) : 8
  '''
  ```