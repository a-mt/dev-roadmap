---
title: Introduction
category: Web, Python
---

## Commentaires

``` python
# single line comment

"""This is
for multi-line
comments"""

'''This is
for multi-line
comments'''
```

---

## Commandes UNIX

Commencer une ligne par `!` dans Jupyter permet de lancer une commande UNIX (dans une cellule de type code)

```
!ls mon_programme.py
```
```
!cat mon_programme.py
```
```
!pip install pandas
```

On peut également utiliser des variables Python, en les préfixant d'un dollar:

```
!stat "$filename"
```

---

## Indentation

* Python utilise l'indentation pour déterminer ce qui fait partie d'un bloc ou non.  
  Par convention, l'indentation se fait par 4 espaces, mais ce n'est pas une obligation.

  ``` python
  if True:
      print("À l'intérieur du bloc")

      if True:
        print("Un sous-bloc")

  print("En dehors des blocs")
  ```

* Python n'autorise pas les blocs (if, for, def, class, etc) qui ne contiennent aucune instruction. Pour créer un bloc vide, on utilise l'instruction `pass` — une instruction qui indique à Python de ne rien faire.

  ``` python
  def mafonction():
      pass
  ```

---

## Retours à la ligne

* Les retours à la ligne sont pris en compte mais l'interpréteur Python est intelligent: si une parenthèse n'est pas fermée, alors il continue de lire les lignes suivantes, jusqu'à la fermeture de la parenthèse.

  ``` python
  print(
      "Hello",
      "World"
  )
  # Hello World
  ```

  C'est également le cas pour les accolades (`{}`) et les crochets (`[]`).

  ``` python
  footballer = ['MESSI',
                'NEYMAR',
                'SUAREZ']
  ```

  ``` python
  x = {1 + 2 + 3 + 4 + 5 + 6 +
       7 + 8 + 9}
  ```

* Par contre dans les autres cas, pour chainer des fonctions par exemple, il sera nécessaire d'échapper un retour à la ligne de complaisance avec un backslash (`\`)

  ``` python
    return pprint.pformat(x, indent=4) \
        .replace('\\n', '\n') \
        .replace('&', '&amp;') \
        .replace("<", "&lt;") \
        .replace(">", "&gt;") \
        .replace('"', '&quot;')

  ```

  Lorsqu'un retour chariot est ignoré, l'indentation qui le suit est également ignorée.
