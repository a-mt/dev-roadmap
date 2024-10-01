---
title: Fonction polynômiale
category: Maths, Algèbre, Fonction
---

Concepts: racine d'un polynôme, tableau des signes, parité d'une fonction

## Racines d'un polynôme

* On appelle *racine d'un polynôme* la (ou les) solution(s) d'une équation polynômiale — c'est à dire les valeurs de *x* qui résolvent *f(x) = 0*.

  Une racine réelle correspond à une intersection de la fonction avec l'axe des abscisses.  
  Une racine complexe correspond à un virage.

  <ins>Exemple</ins>:

  ![](https://i.imgur.com/OsdxfHc.png)

  ```
  On résout l'équation:
      x³ + 3x² + x + 3 = 0
  x² (x + 3) + (x + 3) = 0
       (x² + 1)(x + 3) = 0

  Solution 1:
    x² + 1 = 0
        x² = -1

  Solution 2:
    x + 3 = 0
        x = -3

  L'équation a une racine réelle: x=-3 (intersection en -3)
  Et deux racines complexes: ±i (deux virages)
  C'est donc le graphique A
  ```

---

## Tableau des signes

* Pour tracer la courbe représentative d'une fonction, il ne suffit pas de connaître les points d'intersection avec les abscisses. Il est précieux de savoir si la courbe est au-dessus ou au-dessous de l'axe des *x* sur tel ou tel intervalle. Pour ce faire, on étude son signe entre deux de ses racines consécutives.

  <ins>Exemple</ins>:  
  Soit f(x) = (x + 3)(x - 1)².  
  La fonction *f* s'annule en -3 et 1.  
  Ces deux nombres déterminent 3 intervalles: (-∞ < x < -3), (-3 < x < 1), (1 < x < ∞)

  ![](https://i.imgur.com/PhCP6mt.png?1)

  On sait que *f* est toujours de même signe sur cet intervalle, donc il suffit de trouver quel est le signe de *f* pour une valeur particulière de *x* appartenant à cet intervalle.

  * (-∞ < x < -3): on prend -4 et on cherche le signe de f(-4)

    ```
    f(-4) = (-4 + 3)(-4 -1)²
          = (-)(-)²
          = (-)(+)
          = -
    ```

    f(-4) est négatif donc *f* est négative sur l'intervalle ]-∞, 3[.

  * (-3 < x < 1):

    ```
    f(0) = (0 + 3)(0 -1)²
         = (+)(-)²
         = (+)(+)
         = +
    ```

    f(0) est positif donc *f* est positive sur l'intervalle ]-3, 1[.

  * (1 < x < ∞):

    ```
    f(2) = (2 + 3)(2 - 1)²
         = (+)(+)²
         = (+)(+)
         = +
    ```

    f(2) est positif donc *f* est positive sur l'intervalle ]1, ∞[.

  On obtient:

  ![](https://i.imgur.com/86NhGIF.png?1)

  Voici la courbe approximative de la fonction *f*:

  ![](https://i.imgur.com/TGi8x3n.png?1)

<details>
<summary>Plus d'exemples</summary>

<img src="https://i.imgur.com/UlsLbGc.png" />

<img src="https://i.imgur.com/hGkEOLh.png" />
</details>

---

## Parité d'une fonction

### Fonction paire

* Une fonction est dite *paire* quand elle est symétrique par rapport à l'axe des ordonnées, c'est à dire que *f(x) = f(-x)*. Si tous les exposants du polynôme sont pairs, la fonction est paire.

  ![](https://i.imgur.com/CpvfPkm.png?1)

  ![](https://i.imgur.com/CvL3EFl.png)

### Fonction impaire

* Une fonction est dite *impaire* quand elle est symétrique par rapport à l'axe des abscisses, c'est à dire que *f(x) = -f(-x)*. Si tous les exposants du polynôme sont impairs, la fonction est impaire.

  ![](https://i.imgur.com/yoxLh41.png?1)

  ![](https://i.imgur.com/15Vp5U7.png)

### Fonction ni paire ni impaire

* Il existe des fonctions qui ne sont ni paires ni impaires: si les exposants n'ont pas tous la même parité.

  ![](https://i.imgur.com/s8zXx5Y.png?1)

  ![](https://i.imgur.com/IoFOqoQ.png)