---
title: Systèmes d'équations
category: Maths, Algèbre, Équations
---

Concepts: système d'équation, systèmes équivalents, résoudre

## Système d'équation

* Il arrive qu'on veuille déterminer la valeur d'inconnues de sortes qu'elles satisfassent plusieurs conditions.

  <ins>Exemple</ins>:

  ```
  Fabriquer un objet X coûte 6 euros et nécessite 4h de travail.
  Fabriquer un object Y coûte 4 euros et nécessite 5h de travail.
  Combien d'objets X et Y peut-on fabriquer si on veut
  dépenser au maximum 180 euros et travailler au maximum 200h?

  On peut formuler ce problème comme suit:

  ╭ 6x + 4y <= 180 (contrainte argent)
  ╰ 4x + 5y <= 200 (contrainte temps)

  Où x représente la quantité de produits X fabriqués,
  et y la quantité de produits Y.
  ```

  ![](https://i.imgur.com/PlWGndT.png)

* Un *système d'équations* est une liste d'équations, généralement rassemblées par une accolade à gauche ({), dans laquelle on cherche des inconnues qui puisse satisfaire chacune des équations. Même principe pour un système d'inéquation.

  ![](https://i.imgur.com/OzL1OUi.png)

---

## Systèmes équivalents

* Deux équations sont dites *équivalentes* si elles ont les mêmes solutions.  
  C'est le cas si une équation est un multiple de l'autre.

  <ins>Exemple</ins>:  
  x + 1 = 0 est équivalente à 2x + 2 = 0

* Deux systèmes d'équations sont dits équivalents s'ils ont les mêmes couples solution.

  * Si on multiplie les membres d'une équation par le même nombre, la nouvelle équation est équivalente à l'ancienne, et le nouveau système obtenu est équivalent au système initial — il admet toujours les mêmes solutions. Par exemple, les deux systèmes suivants sont équivalents:

    ![](https://i.imgur.com/KUBh5dw.png)

    <!--
    \left\{ \begin{aligned}

    -12x + 9y &= 7 &(a) \\
      9x - 12y &= 6 &(b)

    \end{aligned} \right.
    \hspace{1em}
    \Longleftrightarrow
    \hspace{1em}
    \left\{ \begin{aligned}

    -12x + 9y &= 7 &(a)\\
      3x - 4y &= 2 &3(b)

    \end{aligned} \right.
    -->

  * Si on remplace l'une des équations par la somme de deux équations données, le nouveau système obtenu est lui aussi équivalent au système initial. Les deux systèmes suivants sont équivalents:

    ![](https://i.imgur.com/mNhO5Vk.png)

## Résoudre un système d'équation

Pour résoudre un système d'équations, on peut:

* Utiliser la méthode des substitution:

  1. exprimer l'une des inconnues en fonction de l'autre

      ``` txt
      Résoudre le système suivant:

      5x + 3y = -2  (a)
      2x + y  = 1   (b)

      On isole y:
      y = 1 - 2x    (b)
      ```

  2. dans l'autre équation, remplacer cette inconnue par l'expression trouvée.  
     On obtient une équation ne contenant plus qu'une inconnue, ce qu'on sait résoudre.

      ``` txt
      On remplace y:
      5x + 3(1 - 2x)  = -2  (a)

      On résout la valeur de x:
      5x + 3 - 6x = -2
      -x = -5
       x = 5
      ```

  3. déduire la valeur de la deuxième inconnue.

      ``` txt
      On remplace x:
      2⋅5 + y = 1   (b)

      On résout la valeur de y:
      10 + y = 1
      y = -9

      Solution: (5; -9)
      ```

* Utiliser la méthode des combinaisons.  
  On peut utiliser n'importe quel système équivalent au système initial pour résoudre les solutions du système. On peut donc additionner ou soustraire deux équations, ou multiplier une équation, pour parvenir à éliminer une variable et résoudre l'expression restante.

  ``` txt
  Résoudre le système suivant:

  2y + 7x = -5  (a)
  5y - 7x = 12  (b)

  On isole y:
  2y+5y + 7x-7x = -5+12  (a)+(b)
  7y = 7
   y = 1

  On remplace y:
  2⋅1 + 7x = -5  (a)
  7x = -7
   x = -1

  Solution: (-1; 1)
  ```

---

## Nombre de solutions

Un système d'équation peut avoir

* 1 solution.  
  La solution correspond au point d'intersection des deux droites.

  ![](https://i.imgur.com/8LuruJx.png)

  <ins>Exemple</ins>:

  ```
  Soit ce système:

  ╭ 6x + y = 8
  ╰ 3x + y = -4

  Les deux droites ont des coefficients directeurs différents,
  donc elles sont sécantes. Le système a un unique couple en solution.
  ```

* 0 solution.  
  Les deux droites sont parallèles.

  ![](https://i.imgur.com/0lsZQ0r.png)

  <ins>Exemple</ins>:

  ```
  Soit ce système:

  ╭ 3x - y = -9
  ╰ 3x - y = 7

  Les deux droites ont des coefficients directeurs égaux, donc elles sont parallèles.
  Leurs ordonnées à l'origine sont différentes, donc elles ne sont pas confondues.
  Le système n'a aucune solution.
  ```

* Une infinité de solutions.  
  Les deux droites sont confondues.

  ![](https://i.imgur.com/hTlIy0p.png)

  <ins>Exemple</ins>:

  ```
  Soit ce système:

  ╭ -6x + 4y = 2
  ╰  3x - 2y = -1

  Les deux équations sont équivalentes: si on multiple
  la deuxième équation par -2, on obtient la première.
  Les deux équations représentent donc la même droite.

  Tout point (x;y) de la première droite est également un point de la deuxième, 
  puisque c'est les mêmes. Et comme une droite a un nombre infini de points:
  Le système a une infinité de solutions.
  ```
