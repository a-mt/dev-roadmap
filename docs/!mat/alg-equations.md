---
title: Développer et factoriser
category: Maths, Algèbre, Équation
---

Concepts: réduire, décomposer, développer, identités remarquables, factoriser, forme factorisée, forme canonique

## Réduire une expression

* *Réduire une expression*, c'est regrouper les termes de même degré (et même inconnue) entre eux.

  ![](https://i.imgur.com/ce5uPUw.png)

  ![](https://i.imgur.com/Ty97Z8T.png?1)

## Décomposer une expression

* *Décomposer une expression*, c'est éclater un terme en plusieurs termes:

  ```
  10x = 6x + 4x
  ```

---

## Développer

* *Développer une expression*, c'est appliquer la distributivité.

  <ins>Exemple a</ins>:

  ![](https://i.imgur.com/qiISlXV.png?1)

  <ins>Exemple b</ins>:

  ![](https://i.imgur.com/ytfBzfam.png)

  <ins>Exemple c</ins>:

  ![](https://i.imgur.com/IS9yV4L.png?2)

## Identiques remarquables

* Les *identiques remarquables* sont des formules (à connaître par coeur)  
  qui permettent d'accélerer le développement et la factorisation d'une expression:

  ![](https://i.imgur.com/vRoDws0.png)

  <ins>Exemple (a + b)(a - b)</ins>:

  ![](https://i.imgur.com/5Pgkf1z.png)

  <ins>Exemple (a + b)²</ins>:

  ![](https://i.imgur.com/xnDIPnV.png)

  <ins>Exemple (a - b)²</ins>:

  ![](https://i.imgur.com/hHAAwyt.png)

---

## Factoriser

*Factoriser une expression*, c'est la réecrire sous la forme d'un produit.

![](https://i.imgur.com/lqZ3YiP.png)

### Forme factorisée: ax² + bx + c ⇒ (Ax + B)(Cx + D)

* On dit qu'une équation est sous *forme factorisée* lorsqu'elle s'exprime sous forme de produits.  
  Pour mettre un polynôme de la forme <ins>ax² + bx + c</ins> sous forme factorisée:

  1. Trouver les deux entiers dont la somme est *b* et le produit est *ac*.  
     (faire la liste des paires d'entiers dont la somme est *b*, et chercher celle dont le produit est *ac*).

      ```
      Factoriser 3x² + 10x + 8

      m + n = 10
      m × n = 3×8 = 24

      6+4 = 10
      6×4 = 24
      ```

  2. Utiliser ces deux entiers pour décomposer le terme *x*

      ```
      3x² + 4x + 6x + 8
      ```

  3. Factoriser séparemment les deux premiers termes et les deux derniers.

      ```
        3x² + 4x + 6x + 8
      = x(3x + 4) + 2(3x + 4)
      = (3x + 4)(x + 2)
      ```

  Il n'est pas toujours possible d'utiliser cette méthode de factorisation. Par exemple pour le polynôme 2x² + 2x + 1, il faudrait trouver des entiers dont la somme est 2 et dont le produit est 2×1 = 2, or il n'y en a pas. Si on ne peut pas utiliser cette méthode, c'est que la factorisation du polynôme n'est pas de la forme (Ax + B)(Cx + D) — où A,B,C,D sont des entiers.

  <details>
  <summary>Plus d'exemples</summary>

  <ins>Exemple a</ins>:  
  ![](https://i.imgur.com/QBHIoFn.png)

  <ins>Exemple b</ins>:  
  ![](https://i.imgur.com/bbst0wN.png)

  <ins>Exemple c</ins>:  
  ![](https://i.imgur.com/BaYgM24.png)
  </details>

### Forme factorisée: ax² - b => (Ax - B)(Ax + B)

* Pour mettre un polynôme de la forme <ins>a² - b²</ins> sous forme factorisée:  
  On se sert de l'identité remarquable (a + b)(a - b).

  ```
  Factoriser x² - 49y²:

  x² - 49y² = (x - 7y)(x + 7y)
  ```

  ```
  Factoriser 45x² - 125:

    45x² - 125
  = 5(9x² - 25)
  = 5(3x - 5)²
  ```

### Forme canonique: ax² + bx + c ⇒ (Ax + B)² + C

* On dit qu'une équation sous *forme canonique* lorsqu'elle s'exprime sous forme d'un carré et d'une constante. Pour mettre un polynôme de la forme <ins>ax² + bx + c</ins> sous forme canonique:

  1. Diviser tous les termes par *a* pour que le coefficient de *x²* soit égal à 1

      ```
      Mettre l'équation 3x² + 18x + 6 = 0 sous forme canonique.

      3x² + 18x + 6 = 0
        x² + 6x + 2 = 0
      ```

  2. Ajouter et retrancher (b/2)²

      ```
      (b/2)² = (6/2)² = 36/4 = 9

      x² + 6x + 9 - 9 + 2 = 0
      ```

  3. Factoriser les trois premiers termes et réduire les deux derniers

      ```
      (x + 3)² - 7 = 0
      ```

  <details>
  <summary>Plus d'exemples</summary>

  ```
  Mettre x² - 4x = 5 sous forme canonique.

  x² - 4x + 4 - 4 - 5 = 0
        (x² - 2)² - 9 = 0
  ```

  ```
  Mettre -2x² + 8x + 8 sous forme canonique.

  -2(x² - 4x - 4)
  -2(x² - 4x + 4 - 4 - 4)
  -2((x - 2)² - 8)
  -2(x - 2)² - 16
  ```

  ```
  Mettre 2x² + 11x + 15 sous forme canonique.

  2(x² + 11/2x + 15/2)
  2(x² + 11/2x + 121/16 - 121/16 + 15/2)
  2((x + 11/4)² - 121/16 + 120/16)
  2((x + 11/4)² - 1/16)
  2(x + 11/4)² - 1/8
  ```
  </details>