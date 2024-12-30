---
title: Installer / exécuter
category: Web, Python
---

## Principe de base

* Python est un language de programmation utilisé côté serveur.  
  Le créateur du language (Guido Van Rossum) explique l'avoir nommé d'après *Monty Python’s Flying Circus*, une série britannique passant sur la chaîne BCC dans les années 70, et non d'après l'animal.

* Python est un language interprété sensible à la casse, aux indentations et aux retours chariots.

  <ins>Exemple</ins>: file.py

  ``` python
  print("Hello World")
  ```

* Quand on parle de "Python", on parle généralement de CPython, l'implémentation de référence de Python — en C. Mais il en existe d'autres:

  - Pypy, Python écrit en Python
  - Stackless Python, the Eve Online secret sauce
  - Jpython, tourne sur la JVM
  - IronPython, tourne sur .Net
  - MicroPython, pour les micro-contrôleurs
  - Brython et Sculpt, pour générer du JS à partir de code Python
  - RustPython, en Rust

---

## Executer Python

### Extension de fichier Python

* Les fichiers Python portent l'extension `.py`.

    ```
    file.py
    ```

* Un fichier `.pyc` est un fichier précompilé (en bytecode) — permet d'accélérer le chargement d'un module python après qu'il ait été chargé une première fois. Il est généré automatiquement par le moteur python et n'est pas destiné à être distribué.

* Note: on peut utiliser le module `dis` pour voir les instructions bytecode d'un morceau de code python:

  ``` python
  import dis

  def f1():
      a = "test"
      return f"{a}"

  def f2():
      return "{a}".format(a='test')

  print(dis.dis(f1))
  print(dis.dis(f2))
  ```
  ``` txt
   11           0 LOAD_CONST               1 ('test')
                2 STORE_FAST               0 (a)

   12           4 LOAD_FAST                0 (a)
                6 FORMAT_VALUE             0
                8 RETURN_VALUE
  None
   15           0 LOAD_CONST               1 ('{a}')
                2 LOAD_ATTR                0 (format)
                4 LOAD_CONST               2 ('test')
                6 LOAD_CONST               3 (('a',))
                8 CALL_FUNCTION_KW         1
               10 RETURN_VALUE
  None
  ```

### Executer Python en ligne de commande

* Exécuter un fichier Python

    ```
    python file.py
    ```

  Une autre possibilité est de 1/ stipuler le path (ou commande) de l'interpréteur python à l'intérieur du script — première ligne:

    ```
    #!/usr/bin/env /usr/lib/python3
    ```

   2/ donner les droits d'exécution sur le fichier

  ```
  chmod +x file.py
  ```

  3/ lancer le script à partir de son nom

    ```
    ./file.py
    ```

* Exécuter une instruction Python

    ```
    python -c 'print("Hello World")'
    ```

* Exécuter en mode interactif (REPL)

    ```
    python
    >> print("Hello World")
    Hello World
    >> exit()
    ```

---

## Pip

`pip` est le gestionnaire de packets de Python, il permet d'installer des packages qui pourront par la suite être importés dans le code.

```
pip install package_name
```

## Conda

`conda` est un gestionnaire d'environnement pour Python: il permet d'installer différents environnements Python en parallèle, ou chaque environnement a sa propre version Python et ses propres packages. On peut donc installer Python v2.7 et v3.6 en parallèle avec leurs packages isolés l'un de l'autre.

Anaconda est une distribution Python: elle installe conda et certain nombre de packages.

Miniconda est une distribution Python minimale: elle n'installe pas tous les package par défaut d'Anaconda, uniquement conda.

## Jupyter notebook

* Jupyter (anciennement appelé IPython) est une application permettant d'utiliser des *notebooks*.
  Techniquement, un notebook est un fichier au format JSON, contenant une liste de cellules. Chaque cellule contient soit du markdown soit du code et optionnellement le résultat de ce code.

    ``` json
    {
     "cells": [
      {
       "cell_type": "markdown",
       "metadata": {},
       "source": [
        "Instructions: https://github.com/LetsUpgrade/AI-ML-July-2020/blob/master/Day-3/Day%203%20Assignment.pdf\n",
        "\n",
        "# 1. Subtract two complex numbers in Python"
       ]
      },
      {
       "cell_type": "code",
       "execution_count": 1,
       "metadata": {},
       "outputs": [
        {
         "name": "stdout",
         "output_type": "stream",
         "text": [
          "(10+10j)\n"
         ]
        }
       ],
       "source": [
        "a = 1 + 2j\n",
        "b = 11 + 12j\n",
        "print(b-a)"
       ]
      },
      ...
    ```

* L'extension des notebooks Jupyter est `.ipynb`

* Les notebooks ne sont pas édités à la main (au format JSON) mais via l'application Jupyter, interactivement. On peut créer et éditer les cellules et éxecuter du code python interactivement.

  ![](https://i.imgur.com/u6aJmFE.png)

* Le résultat du code est sauvegardé dans le fichier, ce qui permet de facilement partager ses résultats, même avec une personne qui n'a pas installé python.

  Github par exemple permet visualiser les notebooks en ligne: [Python%20Basics.ipynb](https://github.com/a-mt/LetsUpgrade-AI-ML/blob/master/Day%203/Python%20Basics.ipynb). NB: si le fichier ne charge pas, ajouter `?flush_cache=true` à l'URL

  Une autre alternative pour visualiser un notebook en ligne est [Jupyter nbviewer](https://nbviewer.jupyter.org/).

---

## Installer Python

Il existe diverses manières d'installer Python, on va ici utiliser miniconda:

* [Installer Miniconda](https://conda.io/miniconda.html)

* Lister les environnements crées  
  L'environnement en cours est précédé d'un astérisque.

  ```
  conda info --envs
  ```

  Lister les packages installés par Miniconda

  ```
  conda list
  ```

* Installer une nouvelle version Python

  ``` bash
  # Lister les versions Pythons possibles
  conda search --full-name python

  # Créer un environnement
  conda create -n pyv3.7.3 python=v3.7.3 anaconda

  # Installer la nouvelle version
  conda install -n pyv3.7.3 pip

  # Changer d'environnement
  source activate pyv3.7.3

  # Afficher la version Python de l'environnement en cours
  python --version
  ```

* Changer d'environnement

  ```
  conda activate YOUR_ENV_NAME
  ```

* Installer un packet avec conda

  ```
  conda install YOUR_PACKAGE_NAME
  ```

  Si vous ne voulez pas utiliser conda (non conseillé, les problèmes de path peuvent être difficiles à debugger si vous mélangez les deux):

  ```
  conda deactivate
  pip install YOUR_PACKAGE_NAME
  ```

## Installer Jupyter

* Installer jupyter

  ```
  conda install jupyter
  ```

* Lancer Jupyter  
  Aller dans le répertoire dans lequel vous voulez travailler (/ enregistrer les notebooks) et lancer la commande:

  ```
  jupyter notebook
  ```

  Le navigateur va être ouvert à l'adresse `http://localhost:8888`, interface web  qui permet d'accéder à l'application.