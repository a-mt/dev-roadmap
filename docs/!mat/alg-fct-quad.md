---
title: Fonction quadratique
category: Maths, Algèbre, Fonction
---

Concepts: sommet, convexe, concave, taux de variation moyen, intersection avec les abscisses, calculer le sommet, tracer une parabole

## Allure générale

* Une fonction quadratique ou fonction de second degré s'écrit sous la forme `f(x) = ax² + bx + c` et représente une relation courbe — quand on la trace sur un graphique, on obtient une parabole.

  <ins>Exemple</ins>:

  ![](https://i.imgur.com/BupC4nD.png)

* `ax² + bx +c = y` est une équation écrite sous forme réduite.  
  Les formes les plus courantes pour une fonction quadratique sont:

  * *forme factorisée*: sous forme de produits.  
    Permet de trouver facilement les points d'intersection avec *x* (résoudre *f(x) = 0*)

  * *forme canonique*: sous forme d'un carré et d'une constante.  
    Permet de trouver facilement le sommet.

  * *forme réduite*: développée et réduite au maximum.  
    Permet de trouver facilement le point d'intersection avec *y* (calculer *f(0)*)

  | Forme      | Exemple         |
  |---         |---              |
  | Réduite    | 2x² + 16x + 24  |
  | Canonique  | 2(x + 4)² - 8   |
  | Factorisée | 2(x + 6)(x + 2) |

---

## Sommet d'un parabole

* Une parabole n'a qu'un seul extremum, qu'on appelle le *sommet*. Le sommet est soit la valeur minimum des images soit la valeur maximum suivant le sens dans lequel la parabole est orientée. La parabole est symétrique par ce sommet.

  ![](https://i.imgur.com/XixFHqzl.png)

## Convexe ou concave

* Une parabole est dite *convexe* si son sommet est sa valeur minimale (⋃) — convexe comme un verre.  
  C'est le cas si le coefficient de plus haut degré (*a* dans *ax²+ bx + c*) est positif.

* Et *concave* si son sommet est sa valeur maximale (⋂) — concave comme une colline.  
    C'est le cas si le coefficient de plus haut degré (*a* dans *ax²+ bx + c*) est négatif.

  ![](https://i.imgur.com/hl2nztL.png)

## Taux de variation moyen

* Une courbe peut être plus ou moins inclinée, mais sa pente varie suivant le point où on regarde.  
  Pour se donner une idée de l'allure d'une courbe, on calcule le *taux de variation moyen*, c'est à dire la pente moyenne, sur un intervalle donné.

* Le taux de variation moyen de la fonction *f* sur l'intervalle [a, b] est:

  ![](https://i.imgur.com/4IyYYGj.png?1)

  <ins>Exemple</ins>:

  ![](https://i.imgur.com/lqfZb9dm.png)

  Graphiquement, le taux de variation moyen est égal au coefficient directeur de la sécante à la courbe (représentative de la fonction *f*) qui passe par les points *(a;f(a))* et *(b;f(b))*.

---

## Calculer les intersections avec les abscisses

* Pour trouver les intersections avec les abscisses, il faut trouver les valeurs pour lesquelles *y=0*.  
  Autrement dit, il faut résoudre l'équation.

  ```
  Soit f(x) = x² + 6x + 8.
  Quelles sont les valeurs de x pour lesquelles f(x) = 0?

     x² + 6x + 8 = 0
  (x + 2)(x + 4) = 0

  Solution 1:
    x + 2 = 0
        x = -2

  Solution 2:
    x + 4 = 0
        x = -4

  Les deux points d'intersection de la parabole sont -2 et -4.
  ```

  ```
  Soit g(x) = (x - 12)² - 30.25
  Calculer la position des intersections avec les abscisses.

  (x - 12)² - 30.25 = 0
          (x - 12)² = 30.25
         √(x - 12)² = √(30.25)
             x - 12 = ±5.5

  Solution 1:
    x - 12 = 5.5
         x = 17.5

  Solution 2:
    x - 12 = -5.5
         x = 6.5

  Les points d'intersection de la parabole sont x=6.5 et x=17.5.
  ```

## Calculer le sommet

Pour trouver le sommet de la parabole, on peut

1. utiliser la formule suivante:

   ![x = -b/2a](https://i.imgur.com/71rnkmK.png)

    ```
    Trouver le sommet de la parabole ayant pour
    équation y = -2x² + 8x + 8

    x = -b/2a
      = -8/2(-2)
      = 8/4
      = 2

    y = -2⋅2² + 8⋅2 + 8
      = -2⋅4 + 16 + 8
      = -8 + 16 + 8
      = 16

    Le sommet de la parabole est (2;16)
    ```

2. calculer le milieu des points d'intersection avec les abscisses — le sommet se situe au centre.  
   Si la parabole n'a qu'un seul point d'intersection avec les abscisses, c'est que le sommet est sur les abscisses.

    ```
    Soit f(x) = x² + 6x + 8
    La parabole a deux points d'intersection: -2 et -4.  
    Calculer la position du sommet

    x = (-2 + -4)/2
      = -6/2
      = -3

    y = (-3)² + -3⋅6 + 8
      = 9 - 18 + 8
      = -1

    Le sommet de la parabole est (-3;-1)
    ```

    ```
    Soit f(x) = x² - 5x + 6
    La parabole a deux points d'intersection: 2 et 3.
    Calculer la position du sommet

    x = (2 + 3)/2
      = 5/2

    y = (5/2)² - 5(5/2) + 6
      = 25/4 - 25/2 + 6
      = 25/4 - 50/4 + 24/4
      = -1/4

    Le sommet de la parabole est (5/2; -1/4), soit (2.5; -0.25)
    ```

3. écrire l'équation sous forme canonique et utiliser la relation suivante:

   ![f(x) = a(x - h)² + k a pour sommet (h; k)](https://i.imgur.com/ImLQXQa.png?1)

    ```
    Soit f(x) = 3(x + 1)² - 12.
    Calculer la position du sommet.

    h = 1
    k = -12

    Le sommet de la parabole est (-1; -12)
    ```

    ```
    Soit y = -2(x - 2)² + 16.
    Calculer la position du sommet.

    h = -2
    k = 16

    Le sommet de la parabole est (2; 16)
    ```

## Tracer le graphique d'une parabole

1. On peut calculer les points d'intersection avec les abscisses, c'est à dire résoudre l'équation f(x) = 0.  
   Ou, si la parabole n'a pas d'intersection avec les abcisses: trouver le point d'intersection avec l'ordonnée, c'est à dire calculer f(0)

2. Trouver le sommet de la parabole.

3. Placer les points sur le graphique et tracer une parabole passant par ces points.

<ins>Exemple a</ins>:

![](https://i.imgur.com/M2aeXC1.png)

<ins>Exemple b</ins>:

![](https://i.imgur.com/xB6E23D.png)