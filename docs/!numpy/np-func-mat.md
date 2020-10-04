---
title: Fonctions mathématiques
category: Python, Library, Numpy
---

## Statistiques descritives

* Fonctions usuelles:

  ``` python
  a = np.random.rand(2,3)
  print(a)
  '''
  [[0.04703464 0.930676   0.17006579]
   [0.74658188 0.23148728 0.86145293]]
  '''

  print(a.sum())      # 2.9872985242505363
  print(a.mean())     # 0.4978830873750894
  print(np.median(a)) # 0.4890345803558861
  print(a.std())      # 0.3566134819519723
  print(a.var())      # 0.12717317550990967
  print(a.min())      # 0.04703464248321543
  print(a.max())      # 0.9306760015352592
  print(a.ptp())      # 0.8836413599999999 - range
  print(np.percentile(a, 95)) # 0.9133702324999999
  ```

* Somme cumulée

  ``` python
  print(a.cumsum())
  # [0.04703464 0.97771064 1.14777643 1.89435831 2.12584559 2.98729852]
  ```

* Produit

  ``` python
  print(np.prod(np.array([1, 2, 3, 4])))
  # 24
  ```

  Produit cumulé

  ``` python
  print(np.cumprod(np.array([1, 2, 3, 4]))) 
  # [ 1  2  6 24]
  ```

* Toutes ces fonctions peuvent prendre `axis` pour paramètre, ce qui aura pour effet d'appliquer la fonction sur chaque ligne (1) ou colonne (0)

  ``` python
  print(a.sum(axis=0))
  '''
  [0.79361652 1.16216328 1.03151872]
  '''

  print(a.sum(axis=1))
  '''
  [1.14777643 1.83952209]
  '''

  print(a.sum(axis=1, keepdims=True))
  '''
  [[1.14777643]
   [1.83952209]]
  '''

  print(a.cumsum(axis=0))
  '''
  [[0.04703464 0.930676   0.17006579]
   [0.79361652 1.16216328 1.03151872]]
  '''
  ```

* Mode  
  Il n'existe pas de méthode pour trouver le mode directement, il faut le faire manuellement

  ``` python
  a = np.array([1,2,2,3,4,1,2])
  print(np.bincount(a).argmax()) # 2
  ```

## Arrondis

``` python
x = np.array([[0.2, 0.5, 1.2]])

# À l'entier en-dessous
print(np.floor(x))       # [[0. 0. 1.]]

# À l'entier au-dessus
print(np.ceil(x))        # [[1. 1. 2.]]

# À l'entier le plus proche
print(np.round(x))       # [[0. 0. 1.]]
print(np.floor(x + 0.5)) # [[0. 1. 1.]]
```

## Produit matriciel

``` python
# Inner product
x = np.array([[1,2],[3,4]])
y = np.array([[10,20],[30,40]])

print(x.dot(y))
print(np.dot(x, y))
print(np.matmul(x, y))
'''
[[ 70 100]
 [150 220]]
'''
```

``` python
# Outer product
print(np.outer(x, y))
'''
[[ 10  20  30  40]
 [ 20  40  60  80]
 [ 30  60  90 120]
 [ 40  80 120 160]]
'''
```

## Constantes

``` python
print(np.pi)           # 3.141592653589793
print(np.e)            # 2.718281828459045
print(np.euler_gamma)  # 0.5772156649015329
print(np.PINF)         # inf
print(np.NINF)         # -inf
print(np.NAN)          # nan
print(np.PZERO)        # 0.0
print(np.NZERO)        # -0.0
```

## Fonctions universelles

``` python
np.negative(x)   # 1-X
np.square(x)     # Carré
np.sqrt(x)       # Racine carrée
np.abs(x)        # Valeur absolue
np.exp(x)        # Exponentielle
np.log(x)        # Log exp(x)
np.log1p(x)      # Log exp(x)-1
np.log10(x)      # Log 10
np.log2(x)       # Log 2

np.sin(x)        # Sinus
np.cos(x)        # Cosinus
np.tan(x)        # Tangente
np.hypot(x1, x2) # Hypothénuse

np.arcsin(x)
np.arccos(x)
np.arctan(x)
np.arctan2(x1, x2)

np.sinh(x)
np.cosh(x)
np.tanh(x)
np.arcsinh(x)
np.arccosh(x)
np.arctanh(x)

np.degrees(x)    # Radian -> degres
np.radians(x)    # Degres -> radians
```

## Autres

``` python
# Greatest Common Denominator
print(np.gcd(6, 9)) # 3

print(np.gcd.reduce(np.array([6, 9, 15]))) # 3

# Lowest Common Multiple
print(np.lcm(6, 9)) # 18

print(np.lcm.reduce(np.array([6, 9, 15]))) # 90

```

[Math functions](https://numpy.org/doc/stable/reference/routines.math.html)  
[Linear Algebra](https://numpy.org/doc/stable/reference/routines.linalg.html)  
[Linear Algebra examples](https://www.geeksforgeeks.org/numpy-linear-algebra/)
