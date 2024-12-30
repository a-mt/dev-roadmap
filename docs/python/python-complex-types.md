---
title: Types complexes
category: Web, Python
---

## Tables de hash

* Dans une liste, il faut au pire parcourir *n* éléments pour vérifier si une valeur donnée est présente — ce qui détermine le temps nécessaire pour récupérer le résultat. Autrement dit, on a un accès O(n)

  ``` python
  %timeit 'x' in range(100)
  2.33µs

  %timeit 'x' in range(10_000)
  284µs

  %timeit 'x' in range(1_000_OO0)
  28.3ms
  ```

* En python, les dictionnaires et ensembles (set) utilisent une table de hash: la clé est convertie en index via une fonction de hashage. En cas de conflit, plusieurs clés/valeurs sont stockées au même index. L'accès à une clé est de O(1)

  ![](https://i.imgur.com/BzYkGrWm.png)

## Références partagées

* Dans le cas d'une valeur scalaire, la valeur assignée à une variable est modifiée dynamiquement. Lorsqu'il n'y a plus de référence associée à la valeur, le garbage collector supprime la donnée de la mémoire

  ![](https://i.imgur.com/ObwjwAQm.png)

* Toutes les valeurs mutables sont assignées par référence. Si plusieurs variables référencent la même valeur,  
  alors modifier la valeur d'une variable modifie la valeur de l'autre variable. C'est notamment le cas lorsqu'on passe des paramètres à une fonction: elle récupère une référence et non une copie.

  ``` python
  cellule = [0]
  liste = [cellule, cellule, cellule]
  liste[0][0] = 1
  liste  # [[1], [1], [1]]

  cellule = [0]
  liste = [cellule, cellule, cellule]
  cellule[0] = 1
  liste   # [[1], [1], [1]]

  liste = 3 * [ [0] ]
  liste[0][0] = 1
  liste  # [[1], [1], [1]]
  ```

  ``` python
  a = [1, 2]

  a[1] = 'spam'
  a  # [1, 'spam']
  b  # [1, 'spam']
  ```

  ![](https://i.imgur.com/7RKjDWhm.png)

* On peut éviter ce comportement en créant une copie.  
  
  - une copie superficielle (*shallow copy*) recopie toutes les références — et non les valeurs

    ``` python
    a = [1, 2]
    b = a[:]

    a[1] = 'spam'
    a  # [1, 'spam']
    b  # [1, 2]
    ```

    ![](https://i.imgur.com/wYj1cANm.png)

  - une copie profonde (*deep copy*) recopie toutes les valeurs.  
    Cette approche est nécessaire si on veut que la modification de valeurs mutables imbriquées dans la variable 1 n'impacte pas la variable 2

    ``` python
    a = [1, [2]]
    b = a[:]

    a[1][0] = 'spam'
    a  # [1, ['spam']]
    b  # [1, ['spam']]
    ```
    ``` python
    import copy

    a = [1, [2]]
    b = copy.deepcopy(a)

    a[1][0] = 'spam'
    a  # [1, ['spam']]
    b  # [1, [2]]
    ```

    ![](https://i.imgur.com/B8I3jQlm.png)
    ![](https://i.imgur.com/aVelC1xm.png)