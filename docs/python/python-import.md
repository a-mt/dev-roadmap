---
title: Modules
category: Web, Python
---

## Module et package

* Un module encapsule différentes fonctions.

  ```
  module_jouet.py
  ```

* Si on implémente une très grosse bibliothèque, on ne va tout concentrer en un seul fichier. C'est là qu'intervient la notion de **package**, qui est un peu aux **répertoires** ce que que le **module** est aux **fichiers**.

  ```
  package_jouet/
    __init__.py
    module_jouet.py
  ```

  `__init__.py` peut contenir n’importe quel code Python chargé d’initialiser le package

* On a coutume de faire la différence entre package et module, mais en termes d’implémentation les deux objets sont en fait de même nature, ce sont des modules

  ```
  type(package_jouet)
  type(package_jouet.module_jouet)
  ```

## import

* Pour utiliser un module, il faut d'abord l'importer avec `import`

  ``` python
  import math
  print(math.sqrt(64))
  ```

  L'importation n'est effectuée qu'une seule fois: lors de l'import on récupère une référence vers le module et il s'agit donc un objet mutable

* On peut importer un module sous un alias

  ``` python
  import math as m
  print(m.sqrt(64)) # 8.0
  ```

## from, as

* On peut également importer directement les fonctions d'un module avec `from`

  ``` python
  from math import sqrt
  print(sqrt(64))
  ```

  ``` python
  from math import sin, pi
  print(sin(pi/2)) # 1.0
  ```

* Ou importer toutes les fonctions d'un module — mais ce n'est pas recommendé. Importer explicitement les modules permet d'éviter les conflits de nom de fonction.

  ``` python
  from math import *
  ```

* On peut importer une fonction sous un alias

  ``` python
  from math import sin as other_sin
  print(other_sin(0)) # 0.0
  ```

## Import absolu: résolution des chemins

* Pour récupérer un module, python doit d'abord trouver le fichier sur le disque dur. Il va chercher:

  - dans le répertoire courant (là où on a démarré l'interpréteur)

    ``` python
    from pathlib import Path
    Path.cwd()
    ```

  - dans la variable système PYTHONPATH

    ``` python
    import os
    os.environ['PYTHONPATH']
    ```

  - dans les répertoires des librairies standard. Cette liste est contenu dans sys.path (suivit par python dans l'ordre, de haut en bas). Il est possible d’étendre sys.path avant de faire un import mais ce n’est pas une pratique très courante, ni très recommandée.

    ``` python
    import sys
    sys.path
    ```

## import relatif

* Pour importer un module à partir du module où se trouve la clause import, on utilise un import relatif:

  ```
  package_relatif/
      __init__.py      (vide)
      main.py
      random.py
      subpackage/
         __init__.py  (vide)
         submodule.py
  ```
  ```python
  # package_relatif/main.py
  from . import random
  ```
  ``` python
  from .random import run
  ```

* On peut “remonter” dans l’arborescence de fichiers en utilisant plusieurs points . consécutifs

  ``` python
  # package_relatif/subpackage/submodule.py
  from ..random import run
  ```

## sys.modules

* L'interpréteur utilise la variable `sys.modules` pour conserver la trace des modules actuellement chargés.

  ``` python
  import sys
  'csv' in sys.modules  # False

  import csv
  'csv' in sys.modules  # True
  csv is sys.modules['csv']  # True
  ```

  Il est possible de forcer le rechargement d’un module en l’enlevant de cette variable sys.modules.

  ``` python
  del sys.modules['multiple_import']
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

## \_\_all\_\_

Contient la liste des symboles concernés  par un `import *`

## \_\_name\_\_ et \_\_file\_\_

* `__name__` contient le nom canonique d'un module.  
  `__file__` contient l'emplacement du fichier en cours

  L'entrypoint du programme, c'est-à-dire le fichier qui est passé directement à l'interpréteur python, est considéré comme un module dont l'attribut `__name__` vaut la chaîne `"__main__"`

  ``` python
  # test.py
  import package_jouet
  print(__name__)
  print(__file__)
  print(package_jouet.__name__)
  print(package_jouet.__file__)
  ```
  ```
  $ python test.py
  __main__
  test.py
  package_jouet
  ~/package_jouet/__init__.py
  ```

* On utilise souvent l'attribut name pour insérer du code à la fin d'un module — souvent un code de test — qui
    * va être exécuté quand on le passe directement à l'interpréteur python, mais
    * qui n'**est pas exécuté** lorsqu'on importe le module

  ``` python
  if __name__ == "__main__": 
      print("File is being run directly")
  else: 
      print("File is being imported")
  ```

* Le mécanisme d'import relatif se base sur `__name__` pour localiser les modules importés.  
  Il n'est ainsi quasiment pas possible d'utiliser les imports relatifs à partir du script de lancement.  
  Le [PEP 366](https://www.python.org/dev/peps/pep-0366/) ajoute la possibilité pour un module de définir l'attribut `__package__`, pour contourner cette difficulté. Définir `__package__` en tant que chaîne de caractère vide a pour effet de désactiver les imports relatifs pour ce module

  ``` python
  if __name__ == "__main__" and __package__ is None:
      __package__ = "expected.package.name"
  ```

## \_\_import\_\_

* Il arrive qu'on ne sache pas quel module importer avant l'execution du code (si le module à importer depend d'une condition notamment). Dans ce cas, on peut utilise la fonction `__import__`

  ``` python
  # import numpy as np
  np = __import__('numpy', globals(), locals(), [], 0)
  np.random.rand(3)
  ```

* Ou utiliser `importlib.import_module`

  ``` python
  from importlib import import_module

  np = import_module('numpy')
  type(np)
  ````

## setuptools

* `setuptools` permet de partager une application ou librairie sous forme de packaging dans un fichier appelé traditionnellement `setup.py`. Ce fichier permet

  * d'installer l'application sur une machine à partir des sources
  * de préparer un package de l'application
  * de diffuser le package dans [l'infrastructure PyPI](https://pypi.python.org/pypi)
  * d'installer le package depuis PyPI en utilisant [`pip3`](http://pip.readthedocs.org/en/latest/installing.html)
