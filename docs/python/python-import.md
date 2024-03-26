---
title: Modules
category: Web, Python
---

Un module encapsule différentes fonctions.

## import

* Pour utiliser un module, il faut d'abord l'importer avec `import`

  ``` python
  import math
  print(math.sqrt(64))
  ```

* On peut importer un module sous un alias

  ``` python
  import math as m
  print(m.sqrt(64)) # 8.0
  ```

## from

* On peut également importer directement les fonctions d'un module avec `from`

  ``` python
  from math import sqrt
  print(sqrt(64))
  ```

  ``` python
  from math import sin, pi
  print(sin(pi/2)) # 1.0
  ```

* On peut importer toutes les fonctions d'un module mais ce n'est pas recommendé. Importer explicitement les modules permet d'éviter les conflits de nom de fonction.

  ``` python
  from math import *
  ```

* On peut importer une fonction sous un alias

  ``` python
  from math import sin as other_sin
  print(other_sin(0)) # 0.0
  ```

## Documentation

* Pour voir la documentation du module (liste des fonctions disponibles et leur usage), on utilise la fonction `help`

  ``` python
  help("math")
  ```

* Pour lister les fonctions définies par un module, on peut utiliser `dir`

  ``` python
  import math
  print(dir(math))

  '''
  ['__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__',
  'acos', 'acosh', 'asin', 'asinh', 'atan', 'atan2', 'atanh', 'ceil',
  'copysign', 'cos', 'cosh', 'degrees', 'e', 'erf', 'erfc', 'exp',
  'expm1', 'fabs', 'factorial', 'floor', 'fmod', 'frexp', 'fsum', 'gamma',
  'gcd', 'hypot', 'inf', 'isclose', 'isfinite', 'isinf', 'isnan', 'ldexp',
  'lgamma', 'log', 'log10', 'log1p', 'log2', 'modf', 'nan', 'pi',
  'pow', 'radians', 'remainder', 'sin', 'sinh', 'sqrt', 'tan', 'tanh',
  'tau', 'trunc']
  '''
  ```

## Print

Utiliser `print` pour connaître l'emplacement du module:

``` python
import os
import socket

print(os)
print(socket)
'''
<module 'os' from '/usr/lib/python3.5/os.py'>
<module 'socket' from '/usr/lib/python3.5/socket.py'>
'''
```

## \_\_name\_\_

Il n'y a pas de fonction main() mais on peut vérifier si le fichier en cours est exécuté comme programme principal ou s'il est inclus comme module par un autre fichier en utilisant la variable magique `__name__`

``` python
if __name__ == "__main__": 
    print("File is being run directly")
else: 
    print("File is being imported")
```

## \_\_import\_\_

Il arrive qu'on ne sache pas quel module importer avant l'execution du code (si le module à importer depend d'une condition notamment). Dans ce cas, on utilise la fonction `__import__`

``` python
# import numpy as np
np = __import__('numpy', globals(), locals(), [], 0)
np.random.rand(3)
```