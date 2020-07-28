---
title: Structure de contrôle
category: Web, Python
---

## If

* L'identation est utilisé pour déterminer ce qui fait partie du bloc ou non

  ``` python
  if condition:
      print("A")
      print("B")

  print("C")
  ```

  ``` python
  if condition1:
      if condition2:
          print("condition1 et condition2 sont vraies")
  ```

* Si le `if` ne contient qu'une ligne d'instruction, le retour à la ligne n'est pas obligatoire — même chose pour les autres structures contrôle (for, while)

  ``` python
  if a > b: print("a is greater than b") 
  ```

## Elif / else

``` python
x = 50

if x == 0:
    print("x cannot be null")
elif x > 100:
    print("x cannot be superior to 100")
else:
    print("x = ", x)
```

## Conditions ternaires

``` python
a = 25
b = "majeur" if a >= 18 else "mineur"

print(b) # majeur
```

On peut également utiliser un tuple:

``` python
("is not", "is")[isPalindrome(txt)]
```

## For

* Boucler n fois

  ``` python
  for i in range(5):
      print(i)

  # 0 1 2 3 4
  ```

  `range` peut prendre jusqu'à 3 paramètres: from, to (non inclus) et step

  ``` python
  for i in range(50,40,-1):
      print(i)

  # 50 49 48 47 46 45 44 43 42 41
  ```

  `range` retourne une liste, sur laquelle toutes les opérations de liste peuvent s'appliquer (comme récupérer un index donné).

* Boucler sur une liste

  ``` python
  l = [10,20,30,40]
  for val in l:
      print(val)
  ```

  ``` python
  for i,val in enumerate(l):
      print(i,val)
  ```

* Boucler sur les caractères d'un mot

  ``` python
  word = "Hello"
  for i, char in enumerate(word)
      print(i, char)
  ```

  ``` python
  for i in range(len(word)):
      print(word[i])
  ```

* Boucler sur un dictionnaire

  ``` python
  d = {"a":1, "b":2, "c":3}
  for key in d:
      print(key, d[key])
  ```

  ``` python
  for key, item in d.items():
      print(key, item)
  ```

  ``` python
  for item in d.values():
      print(item)
  ```

* Boucler sur deux listes clés/valeurs

  ``` python
  questions = ['name', 'colour', 'shape']
  answers   = ['apple', 'red', 'a circle']

  # using zip() to combine two containers
  # and print values
  for question, answer in zip(questions, answers):
      print('What is your {0}?  I am {1}.'.format(question, answer))
  ```

## While

``` python
i = 0
while i<10:
    i += 1
    print(i)
```

## break

Met fin à une boucle `for` ou `while`

``` python
for i in range(5):
    if i == 3:
      break
    print(i)
# 0 1 2
```

Les boucles `for` peuvent avoir une clause `else`, qui sera exécutée uniquement si la boucle s'est terminée normalement — n'a pas rencontré d'instruction `break`.

``` python
for n in range(2, 10):
    for x in range(2, n):
        if n % x == 0:
            print( n, 'equals', x, '*', n/x)
            break
    else:
        # loop fell through without finding a factor
        print(n, 'is a prime number')
```

Même chose pour while

``` python
count = 0
while (count < 3):
    count = count + 1
    print(count) 
else: 
    print("block else") 
```

## continue

Saute l'itération en cours

``` python
for i in range(5):
    if i == 3:
      continue
    print(i)
# 0 1 2 4
```

## Compréhension de liste

Les compréhensions de liste (*list comprehensions*) fournissent un moyen rapide de créer une liste. Syntaxe:

```
new_list = [expression(i) for i in old_list if filter(i)]
```

Exemples:

``` python
l1 = [10,20,30,40]
l2 = [x * 2 for x in l1]

print(l2) # [20, 40, 60, 80]
```

``` python
l1 = [10,15,20,25,30]
l2 = [x/2 for x in l1 if x%2==0]

print(l2) # [5.0, 10.0, 15.0]
```

[PEP289](https://www.python.org/dev/peps/pep-0289/)