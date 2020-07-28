---
title: Fichiers
category: Web, Python
---

## Répertoire courant

* Retourne le path du répertoire courant

  ``` python
  print(os.getcwd())
  ```

* Change le path du répertoire cournt

  ``` python
  os.chdir("/my/path")
  ```

* Les modules Python sont cherchés dans le path et dans le répertoire courant. Pour importer des modules qui ne sont pas dans le répertoire courant mais dans le répertoire du fichier en cours, on peut soit modifier le répertoire courant, soit ajouter le répertoire en cours au path.

  ``` python
  # Make it work no matter the current directory
  from os import path, environ
  import sys

  pwd = path.dirname(path.realpath(__file__))
  sys.path.insert(0, pwd)
  ```

## Lire/écrire

### Définition

* La fonction `open` permet d'ouvrir un fichier

  ``` python
  f = open('file.txt', 'w')
  print(f) # <_io.TextIOWrapper name='file.txt' mode='w' encoding='UTF-8'>
  ```

  Différents modes d'ouverture sont possibles:
  * `r` (read): lecture.  
    Si le fichier n'existe pas, l'erreur FileNotFoundError est levée

  * `w` (write): écriture.  
    Si le fichier n'existe pas, il est crée.  
    Si le fichier existe déjà, son contenu est supprimé

  * `x` (write): écriture.  
    Une erreur `FileExistsError` est levée si le fichier existe déjà

  * `a` (append): écriture à la fin.  
    Si le fichier n'existe pas, il est crée.  
    Si le fichier existe déjà, le texte écrit sera ajouté à la fin

* La fonction `close` ferme le fichier (libère la mémoire)

  ``` python
  f.close()
  ```

### Attributs

* Nom du fichier ouvert

  ``` python
  print(f.name) # file.txt
  ```

* Mode d'ouverture

  ``` python
  print(f.mode) # w
  ```

* Statut ouvert/fermé

  ``` python
  print(f.closed) # False
  ```

### Écriture

* `write` écrit dans le fichier.  
  Les retours à la ligne doivent être ajoutés manuellement

  ``` python
  f = open('file.txt', 'w')
  f.write("Line 1\n")
  f.write("Line 2\n")
  f.close()
  ```

### Lecture

* `read` retourne le contenu du fichier en entier

  ``` python
  f = open('file.txt', 'r')
  print(f.read())
  f.close()

  '''
  Line 1
  Line 2
  '''
  ```

  Ou on peut préciser le nombre de bytes à récupérer

  ``` python
  f = open('file.txt', 'r')
  print(">", f.read(10)) # > Line 1\nLin
  print(">", f.read(10)) # > e 2
  f.close()
  ```

* Pour lire le fichier ligne par ligne on peut utiliser une boucle `for`  
  Les retours chariots sont préservés

  ``` python
  f = open('file.txt', 'r')
  i = 0

  for line in f:
      print(i, ":", line, end="")
      i += 1
  f.close()

  '''
  0 : Line 1
  1 : Line 2
  '''
  ```

  Ou utiliser `readline`

  ``` python
  f = open('file.txt', 'r')
  print(f.readline(), end="") # Line 1\n
  print(f.readline(), end="") # Line 2\n
  print(f.readline(), end="") # Empty string
  f.close()
  ```

  Python n'a pas d'attribut accessible permettant de vérifier quand on a atteint la fin du fichier.  Une solution est d'utiliser `seek` pour déplacer la position du pointeur et `tell` pour vérifier la position du pointer

  ``` python
  # Go to the end of the file, save the position
  eof = f.seek(0,2)

  # Go the the beginning of the file
  f.seek(0,0)

  # Read
  print(f.readline(), f.tell() == eof, end="") # Line 1\n False
  print(f.readline(), f.tell() == eof, end="") # Line 2\n True
  ```

* `readlines` retourne la liste de toutes les lignes du fichier

  ``` python
  f = open('file.txt', 'r')
  print(f.readlines()) # ['Line 1\n', 'Line 2\n']
  f.close()
  ```

### Manipuler le curseur

* `seek` déplace la position du curseur (et retourne la position du curseur)

  ``` python
  # Aller au début du fichier (octet 0)
  f.seek(0)
  ```

  Peut prendre un deuxième argument qui indique le mode de déplacement:
  * `0` (par défaut): déplacement par rapport au début du fichier
  * `1`: déplacement par rapport de la position actuelle
  * `2`: déplacement par rapport à la fin du fichier

  ``` python
  # Aller à la fin du fichier
  eof = f.seek(0,2)
  print(eof) # 14
  ```

* `tell` retourne la position du curseur

  ``` python
  print(f.read(4)) # Line
  print(f.tell())  # 4
  ```

---

## Renommer

``` python
import os
os.rename("t1.txt", "t2.txt")
os.rename("mydir", "mydir2")
```

## Touch

``` python
open("tmp/t1.txt", 'a').close()
```

---

## Répertoire

* Créer

  ``` python
  os.mkdir("mydir")
  ```

* Supprimer (répertoire vide)

  ``` python
  os.rmdir("mydir")
  ```

* Lister  
  `listdir` permet de lister le contenu d'un répertoire.  
  Si le répertoire cible n'est pas précisé, alors il s'agit du répertoire en cours.

  ``` python
  os.mkdir("tmp")
  os.mkdir("tmp/subdir")
  os.mkdir("tmp/.hidden")

  open("tmp/t1.txt", 'a').close()
  open("tmp/t2.txt", 'a').close()
  open("tmp/subdir/t3.txt", 'a').close()

  # Liste le contenu de tmp
  print(os.listdir("tmp"))
  # ['.hidden', 't2.txt', 't1.txt', 'subdir']
  ```

* `pathlib` permet de faire la même chose mais orienté objet

  ``` python
  from pathlib import Path

  p = Path('tmp')
  for x in p.iterdir():
      print(x, x.name, x.parent, x.parts, x.stem, x.suffix, x.is_dir())

  '''
  tmp/.hidden .hidden tmp ('tmp', '.hidden') .hidden  True
  tmp/t2.txt t2.txt tmp ('tmp', 't2.txt') t2 .txt False
  tmp/t1.txt t1.txt tmp ('tmp', 't1.txt') t1 .txt False
  tmp/subdir subdir tmp ('tmp', 'subdir') subdir  True
  '''
  ```

  [PurePosixPath properties](https://docs.python.org/3.4/library/pathlib.html#pathlib.PurePosixPath)

* Une autre alternative, sous Linux, est de récupérer le résultat d'une commande shell

  ``` python
  import subprocess

  p = subprocess.Popen("ls -lh tmp",
                       shell=True,
                       stdout=subprocess.PIPE,
                       stderr=subprocess.STDOUT)
  it = iter(p.stdout.readline, b'')

  for path in it:
      print(path.decode('utf8'), end='')

  '''
  total 4,0K
  drwxr-xr-x 2 myself myself 4,0K juil. 26 06:51 subdir
  -rw-r--r-- 1 myself myself    0 juil. 26 06:51 t1.txt
  -rw-r--r-- 1 myself myself    0 juil. 26 06:51 t2.txt
  '''
  ```