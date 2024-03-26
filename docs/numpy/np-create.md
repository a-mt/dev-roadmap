---
title: Créer array usuels
category: Python, Library, Numpy
---

Il existe un certain nombre de fonctions pour créer les vecteurs et matrices usuelles.

## 0

* Matrice de zéros:  
  Peut également prendre l'argument `dtype`

  ``` python
  print(np.zeros((2,3)))
  '''
  [[0. 0. 0.]
   [0. 0. 0.]]
  '''
  ```

  Matrice de zéros de même taille et type qu'une matrice donnée

  ``` python
  a = np.array([[1,2], [3,4], [5,6]], dtype=np.uint8)
  print(np.zeros_like(a))
  '''
  [[0 0]
   [0 0]
   [0 0]]
  '''
  ```

## 1

* Matrice de uns:

  ``` python
  print(np.ones((2,3)))
  '''
  [[1. 1. 1.]
   [1. 1. 1.]]
  '''
  ```

  ``` python
  a = np.array([[1,2], [3,4], [5,6]], dtype=np.uint8)
  print(np.ones_like(a))
  '''
  [[1 1]
   [1 1]
   [1 1]]
  '''
  ```

## x

* Matrice d'une valeur donnée:

  ``` python
  print(np.full((2,3),89))
  '''
  [[89 89 89]
   [89 89 89]]
  '''
  ```

  ``` python
  a = np.array([[1,2], [3,4], [5,6]], dtype=np.uint8)
  print(np.full_like(a, 89))
  '''
  [[89 89]
   [89 89]
   [89 89]]
  '''
  ```

## Diagonale

* Matrice identité:

  ``` python
  print(np.eye(3,3))
  '''
  [[1. 0. 0.]
   [0. 1. 0.]
   [0. 0. 1.]]
  '''
  ```

* Matrice avec valeurs en diagonale:

  ``` python
  print(np.diag(np.arange(1,5)))
  '''
  [[1 0 0 0]
   [0 2 0 0]
   [0 0 3 0]
   [0 0 0 4]]
  '''

  print(np.diag(np.arange(1,5), k=1))
  '''
  [[0 1 0 0 0]
   [0 0 2 0 0]
   [0 0 0 3 0]
   [0 0 0 0 4]
   [0 0 0 0 0]]
  '''

  print(np.diag(np.arange(1,5), k=-1))
  '''
  [[0 0 0 0 0]
   [1 0 0 0 0]
   [0 2 0 0 0]
   [0 0 3 0 0]
   [0 0 0 4 0]]
  '''
  ```

* Matrice de 1 dans le triangle inférieur:

  ``` python
  print(np.tri(3))
  '''
  [[1. 0. 0.]
   [1. 1. 0.]
   [1. 1. 1.]]
  '''
  ```

  ``` python
  # Garder le triangle du bas, le reste à 0
  a = np.arange(1,26).reshape(5,5)
  print(np.tril(a))
  '''
  [[ 1  0  0  0  0]
   [ 6  7  0  0  0]
   [11 12 13  0  0]
   [16 17 18 19  0]
   [21 22 23 24 25]]
  '''

  # Garder le triangle du haut, le reste à 0
  print(np.triu(a))
  '''
  [[ 1  2  3  4  5]
   [ 0  7  8  9 10]
   [ 0  0 13 14 15]
   [ 0  0  0 19 20]
   [ 0  0  0  0 25]]
  '''
  ```
  
## Vecteurs

* Vecteur entre deux bornes:  
  `from, to, step`

  ``` python
  print(np.arange(9))
  '''
  [0 1 2 3 4 5 6 7 8]
  '''

  print(np.arange(2, 10, 2))
  '''
  [2 4 6 8]
  '''
  ```

* Vecteur entre deux bornes:  
  n valeurs régulièrement espacées entre from et to (`from, to, n`)

  ``` python
  print(np.linspace(0, 5, 10))
  '''
  [0.         0.55555556 1.11111111 1.66666667 2.22222222 2.77777778
   3.33333333 3.88888889 4.44444444 5.        ]
  '''

  print(np.linspace(0, 9, 10))
  '''
  [0. 1. 2. 3. 4. 5. 6. 7. 8. 9.]
  '''
  ```

* Pour une matrice entre deux bornes, créer un vecteur et le redimensionner et `reshape`

  ``` python
  a = np.arange(1,26)
  print(a.reshape(5,5))

  '''
  [[ 1  2  3  4  5]
   [ 6  7  8  9 10]
   [11 12 13 14 15]
   [16 17 18 19 20]
   [21 22 23 24 25]]
  '''
  ```

## Aléatoire

* Nombres aléatoires:

  ``` python
  print(np.random.rand(2,3))
  '''
  [[0.16888752 0.24847248 0.11771533]
   [0.59762043 0.71147022 0.0933323 ]]
  '''
  ```

  ``` python
  # Max non inclus
  print(np.random.randint(50, 100, size=(3, 3)))
  '''
  [[53 57 82]
   [54 68 72]
   [51 68 57]]
  '''
  ```

* Valeurs aléatoires parmis la liste:

  ``` python
  print(np.random.choice([3, 5, 7, 9], size=(3, 5)))
  '''
  [[9 9 3 5 9]
   [7 5 9 3 3]
   [3 7 7 5 9]]
  '''
  ```

  Avec une probabilité donnée:

  ``` python
  x = random.choice([3, 5, 7, 9], p=[0.1, 0.3, 0.6, 0.0], size=(3, 5))
  ```

## Distribution

Numpy permet de créer des valeurs aléatoires avec un certain nombre de distributions pré-définies.

``` python
# Normale
x = np.random.normal(size=(100, 1))
sns.distplot(x, hist=False)
```

![](https://i.imgur.com/rB4BaLg.png)

``` python
# Normale avec moyenne de 1 et deviation standard de 2
x = np.random.normal(loc=1, scale=2, size=(100, 1))
sns.distplot(x, hist=False)
```

![](https://i.imgur.com/OLUdcFl.png)

``` python
# Binomiale
x = np.random.binomial(n=10, p=0.5, size=100)

# Multinomiale
x = random.multinomial(n=6, pvals=[1/6, 1/6, 1/6, 1/6, 1/6, 1/6])

# Poisson
x = random.poisson(lam=2, size=100)

# Uniforme
x = random.uniform(size=(2, 3))

# Logistique
x = random.logistic(loc=1, scale=2, size=(2, 3))

# Exponentielle
x = random.exponential(scale=2, size=(2, 3))

# Chi square
x = random.chisquare(df=2, size=(2, 3))

# Rayleigh
x = random.rayleigh(scale=2, size=(2, 3))

# Pareto
x = random.pareto(a=2, size=(2, 3))

# Zipf
x = random.zipf(a=2, size=(2, 3))
```