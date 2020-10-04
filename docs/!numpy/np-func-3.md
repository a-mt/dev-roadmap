---
title: Fonctions III
category: Python, Library, Numpy
---

## Casting

### astype

* astype() permet de modifier le type des données

  ``` python
  a = np.arange(10)
  print(a)       # [0 1 2 3 4 5 6 7 8 9]
  print(a.dtype) # int64

  b = a.astype('float16')
  print(b)       # [0. 1. 2. 3. 4. 5. 6. 7. 8. 9.]
  print(b.dtype) # float16
  ```

---

## Vérifier les données

* Il existe différentes méthodes pour vérifier si le tableau contient des valeurs spéciales, telles que inf ou NaN.

  ``` python
  a = np.array([12, 2, 1j])
  print(np.iscomplexobj(a))    # True
  print(np.isrealobj(a))       # False

  a = np.array([[1, 2, 3], [4, 5, 6]], order='F')
  print(np.isfortran(a))       # True
  ```

  Les fonctions suivantes peuvent également être utilisées comme filtre:

  ``` python
  a = np.array([12, 2, 1, np.NAN, np.inf, np.NINF])

  print(np.iscomplex(a)) # [False False  True False False False]
  print(np.isreal(a))    # [ True  True False  True  True  True]

  print(np.isfinite(a))  # [ True  True  True False False False]
  print(np.isnan(a))     # [False False False  True False False]
  print(np.isinf(a))     # [False False False False  True  True]
  print(np.isposinf(a))  # [False False False False  True False]
  print(np.isneginf(a))  # [False False False False False  True]
  ```

---

## Map

### vectorize

* vectorize() permet d'appliquer une fonction élément par élément:

  ``` python
  X = np.array([0,1,2])
  print(np.vectorize(lambda x: 'test {:d}'.format(x))(X))
  '''
  ['test 0' 'test 1' 'test 2']
  '''
  ```

  On peut passer plusieurs matrices de même dimension:

  ``` python
  X = np.array([0,1,2])
  Y = np.array([0,1,2])
  XX, YY = np.meshgrid(X,Y)

  def f(xx,yy):
      return '({:d},{:d})'.format(xx,yy)
  print(np.vectorize(f)(XX, YY))
  '''
  [['(0,0)' '(1,0)' '(2,0)']
   ['(0,1)' '(1,1)' '(2,1)']
   ['(0,2)' '(1,2)' '(2,2)']]
  '''
  ```

### apply_along_axis

* apply_along_axis() permet d'appliquer une fonction d'aggrégation ligne par ligne ou colonne par clonne:

  ``` python
  a = np.array([[1,2,3],[4,5,6]])

  # somme les colonnes des lignes 1 & 2
  print(np.apply_along_axis(lambda x: x.sum(), 0, a))
  '''
  [5 7 9]
  '''

  # somme chaque ligne
  print(np.apply_along_axis(lambda x: x.sum(), 1, a))
  '''
  [ 6 15]
  '''
  ```

### place

* place() permet de remplacer les valeurs d'un tableau selon un masque (matrice de booléens)

  ``` python
  a = np.array([[1,2],[3,4]])
  b = np.array([10,20])

  np.place(a, a%2==0, b)
  print(a)
  '''
  [[ 1 10]
   [ 3 20]]
  '''
  ```

---

## Vérifier la fréquence des données

### unique

* unique() retourne les valeurs du tableau en enlevant les duplicats

  ``` python
  a = np.array([1,2,2,3,8,1,2])

  print(np.unique(a))
  '''
  [1 2 3 8]
  '''
  ```

  Passer le paramètre `return_counts=True` pour récupérer le nombre d'occurrences de chaque valeur

  ``` python
  values, count = np.unique(a, return_counts=True)
  print(values) # [1 2 3 8]
  print(count)  # [2 3 1 1]
  ```

### bincount

* bincount() compte la fréquence des valeurs entre 0 et X.max()

  ``` python
  a = np.array([2,2,3,8,1,2])

  print("Valeurs a     :", a)
  print("Index 0..a.max:", np.arange(a.max()+1))
  print("Occurences    :", np.bincount(a))

  '''
  Valeurs a     : [2 2 3 8 1 2]
  Index 0..a.max: [0 1 2 3 4 5 6 7 8]
  Occurences    : [0 1 3 1 0 0 0 0 1]
  '''
  ```

  Peut être utilisé pour faire du binning:

  ``` python
  a = np.random.randint(20, 60, size=100)

  _min  = 20
  _max  = 60
  _step = 5

  count  = np.bincount(a, minlength=_max)[_min:]  # compte la fréquence des valeurs de 0 à 60 (trunc à partir de 20)
  groups = np.split(count, (_max-_min)/_step)     # sépare en groupes
  bins   = np.apply_along_axis(np.sum, 1, groups) # somme chaque groupe
  print(bins)

  for i, val in enumerate(bins):
    k = _min + i*_step
    print('Entre {min:d} et {max:d} ans: {value:d}'.format(
        min=k,
        max=k+_step-1,
        value=val))

  '''
  [14  9 17 13 15 14  9  9]
  Entre 20 et 24 ans: 14
  Entre 25 et 29 ans: 9
  Entre 30 et 34 ans: 17
  Entre 35 et 39 ans: 13
  Entre 40 et 44 ans: 15
  Entre 45 et 49 ans: 14
  Entre 50 et 54 ans: 9
  Entre 55 et 59 ans: 9
  '''

  plt.hist(a, bins=int((_max-_min)/_step), range=(_min,_max))
  plt.grid()
  ```

  On peut s'en servir pour savoir quelle valeur apparaît le plus souvent (mode):

  ``` python
  print(np.bincount(a).argmax()) # 34
  ```

## Limiter l'intervalle

### clip

* clip() remplace les valeurs inférieures à la valeur minimum par la valeur minimum, et les valeurs supérieures à la valeur maximum par la valeur maximum.

  ``` python
  a = np.arange(10)
  print(a)
  '''
  [0 1 2 3 4 5 6 7 8 9]
  '''

  print(np.clip(a, a_min=2, a_max=6))
  '''
  [2 2 2 3 4 5 6 6 6 6]
  '''
  ```

---

## Chaînes de caractères

``` python
x = np.array(['Hello wOrld ', 'and  bob'])

print(np.char.lower(x))           # ['hello world ' 'and  bob']
print(np.char.upper(x))           # ['HELLO WORLD ' 'AND  BOB']
print(np.char.capitalize(x))      # ['Hello world ' 'And  bob']
print(np.char.title(x))           # ['Hello World ' 'And  Bob']
print(np.char.strip(x))           # ['Hello wOrld' 'and  bob']

print(np.char.center(x, 10, '*')) # ['Hello wOrl' '*and  bob*']
print(np.char.ljust(x, 10, '*'))  # ['Hello wOrl' 'and  bob**']
print(np.char.rjust(x, 10, '*'))  # ['Hello wOrl' '**and  bob']

print(np.char.count(x, 'l'))      # [3 0]
print(np.char.find(x, 'l'))       # [ 2 -1]
print(np.char.rfind(x, 'l'))      # [ 9 -1]

x2 = np.char.split(x)
print(x2)                         # [list(['Hello', 'wOrld']) list(['and', 'bob'])]
print(np.char.join(' ', x2))      # ['Hello wOrld' 'and bob']
print(np.concatenate(x2))         # ['Hello' 'wOrld' 'and' 'bob']
```

[String operations](https://numpy.org/doc/stable/reference/routines.char.html)

## Booléens

``` python
a = np.array([True, False, True])
print(a.all())  # False
print(a.any())  # True

b = np.array([True, True, False])
print(np.logical_and(a, b)) # [ True False False]
print(np.logical_or(a, b))  # [ True  True  True]
print(np.logical_xor(a, b)) # [False  True  True]
print(np.logical_not(a))    # [False  True False]
```

## Autres

``` python
# Charger les données à partir d'un fichier
a = np.genfromtxt('data.txt', delimiter=',')
print(a)
print(a.astype(int32))
```

