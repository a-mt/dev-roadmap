---
title: Nombres
category: Web, Python
---

## Nombres relatifs

| Code        | Exemple | Valeur décimale
|---          |---      |---
| Décimal     | `10`    | `10`
| Octal       | `0o10`  | `8`
| Hexadécimal | `0x10`  | `16`
| Binaire     | `int("1001",2)` | `9`

* Tous les nombres peuvent être positifs ou négatifs.

  ``` python
  print(1)   # 1
  print(+1)  # 1
  print(-1)  # -1
  ```

* Depuis Python 3.6, il est possible d'utiliser des underscores pour améliorer la lisibilité des grands nombres. 

  ``` python
  print(1_000_000_000_000_000)
  # 1000000000000000
  ```

* En Python 2, une opération sur deux entiers résulte en un entier, tandis qu'une opération sur un entier et un float résultat en un float. Ce comportement a été abandonné depuis Python 3

  ``` python
  # Comportement en Python v2
  print(3/2)        # 1
  print(3/2.)       # 1.5
  print(3/float(2)) # 1.5
  ```

* Python alloue dynamiquement la mémoire selon la valeur du nombre

  ``` python
  num = 3
  print(num.bit_length()) # 2

  num = 255
  print(num.bit_length()) # 8

  import sys
  print(sys.maxsize) # 9223372036854775807
  ```

* Python encode les entiers en complément à 2.  
  Pour un encodage différent, utiliser un bytes — une liste d'octets.

  ``` python
  # Returns byte representation of 1024 in big endian.
  print((1024).to_bytes(2, byteorder ='big')) # b'\x04\x00'

  # Returns integer value of '\x00\x10' in big endian.
  print(int.from_bytes(b'\x00\x10', byteorder ='big')) # 16
  ```
  
  Pour des opérations décimales nécessitant une précision maximale (on ne veut pas arrondir les valeurs), utiliser le module `decimal`:

  ``` python
  from decimal import Decimal

  print(0.1 * 3)             # 0.30000000000000004
  print(Decimal('0.1') * 3)  # 0.3
  ```

## Réels

Pour écrire un nombre à virgule, on utilise le point `.`. Le zéro est optionnel.

``` python
print(1.0)  # - 1.0
print(0.1)  # 0.1
print(.1)   # 0.1
```

On peut également utiliser la notation scientifique

``` python
print(1e3)  # 1000.0
print(1e-3) # 0.001
```

## Complexes

* <ins>Nombre imaginaire</ins>  
  &radic;-1 n'existe pas. Mais si on pose (&radic;-1)² = -1, alors il est possible de résoudre des équations du troisième degré. C'est la raison pour laquelle on pose *i* = &radic;-1. *i* est un nombre dit imaginaire.

* <ins>Nombre complexe</ins>  
  Un nombre complexe est composé d'une partie réelle et d'une partie imaginaire: `x + yi`.

* Python permet de créer des nombres complexes, constitués d'un partie réelle suivit d'une partie imaginaire (dans cet ordre obigatoirement): `x + yj`. La partie réelle est optionnelle.

  Comme `i` est souvent le nom utilisé pour désigner une variable incrémentée dans une boucle — `for i in range(n)` — les nombres complexes utilisent `j` pour éviter de porter à confusion.

  ``` python
  print(2j)       # 2j
  print(2.j)      # 2j
  print(2 * 1.j)  # 2j
  print(1 + 1j)   # (1+1j)
  ```

* On peut récupérer la partie réelle / imaginaire indépendemment:

  ``` python
  a = 1 + 2j
  print(a.real) # 1.0
  print(a.imag) # 2.0
  ```

* On peut également effectuer des additions, soustractions, etc: [Opérations sur les nombres complexes](https://nbviewer.jupyter.org/github/a-mt/LetsUpgrade-AI-ML/blob/master/Day%204/Python%20Basics.ipynb)

## Typecast

* Convertir en entier: `int`  
  Retourne une exception si la chaîne de caractère ne représente pas un chiffre

  ``` python
  age = int(input('What is your age ?'))
  if age < 18:
      print("Vous êtes mineur")
  else
      print("Vous êtes majeur")
  ```

* Convertir en float: `float`

  ``` python
  print(float("1abc")) # ValueError: could not convert string to float: '1abc'
  ```

* On peut également récupérer le code octal/hexa, etc d'un entier

  | Fonction | Description | Exemple
  |---       |---          |---
  | `ord`    | Caractère &rarr; entier | `ord("A") # 65`
  | `chr`    | Entier &rarr; caractère | `ord(65) # 'A'`
  | `hex`    | Entier &rarr; hexa | `hex(65) # '0x41'`
  | `oct`    | Entier &rarr; octal | `oct(65) # 0o101`

## Nombre aléatoire

* Pour générer un nombre aléatoire, on utilise le package `random`:

  ``` python
  import random
  ```

* Retourner un chiffre aléatoire entre [0.0 et 1.0]

  ``` python
  random.random()
  ```

* Retourner un nombre aléatoire entre [1,1000]

  ``` python
  random.randint(1, 1000)
  ```

* Retourner une valeur de la liste

  ``` python
  random.choice([1,2,3,4,5])
  ```

## Fractions

``` python
import fractions
a = fractions.Fraction(2,3)
b = fractions.Fraction(1,2)

print(a, b) # 2/3 1/2
```

## Arrondis

``` python
from math import ceil, floor

print(ceil(123.456))      # 124
print(floor(123.456))     # 123
print(round(123.456, 2))  # 123.46
print(round(123.456, -2)) # 100.0
```
