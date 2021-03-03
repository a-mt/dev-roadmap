---
title: Fonctions composées
category: Maths, Algèbre, Fonction
---

Concepts: fonction composée, fonction réciproque

## Fonction composée

* Une *fonction composée* est une fonction qui prend en entrée le résultat d'une autre fonction.  
  Exemple: *y = f(g(x))*. *f(g(x))* s'appelle la composée de *g* suivie de *f*.  

* Plutôt qu'imbriquer les fonctions les unes dans les autres,  
  on utilise généralement la notation *(f ∘ g)(x)* — se lit "f rond g".

  ![](https://i.imgur.com/u2NH5tdm.png)

* Pour lire l'image d'une fonction composée sur un graphique,

  1. on commence par chercher l'image de la première fonction executée (la plus à droite).  
     Exemple: pour lire l'image de *f(g(8))*, on lit *g(8)* (=2)

  2. on cherche l'image de la deuxième fonction executée, avec pour paramètre l'image obtenue précédemment. Exemple: on lit *f(2)* (= -3)

  3. si la fonction est composée de plus de deux fonctions, on continue jusqu'à la dernière. Le résultat de la fonction composée est le résultat de la dernière fonction qui la constitue.  
     Exemple: *f(g(8)) = f(2) = -3*

  ![](https://i.imgur.com/mkikF9B.png)

* Plutôt que de garder une liste de fonctions, on peut calculer l'expression de la fonction composée:

  ```
  Soit f(x) = 3x - 1, et g(x) = x³ + 2
  Quelle est l'expression de f(g(x))?

  f(g(x)) = 3(x³ + 2) - 1
          = 3x³ + 6 - 1
          = 3x³ + 5
  ```

---

## Fonction réciproque

* Des fonctions *réciproques* sont des fonctions qui se neutralisent l'une l'autre: si on passe l'image de *f* à *g*, on retrouve le paramètre de *f*, et inversemment — en termes mathématiques: *f(g(x)) = g(f(x)) = x*.  
  Par exemple, *f(x) = x/3* est la fonction réciproque de *g(x) = 3x*

* La réciproque de la fonction *f* se note *f<sup> -1</sup>*. Attention, puisqu'on l'applique sur une fonction, il ne s'agit pas d'une puissance mais bien de la réciproque — l'inverse d'une fonction se note 1/f.

  ![](https://i.imgur.com/7WvFm3j.png)

* Graphiquement, une fonction et sa réciproque sont symétriques par rapport à l'axe *y = x*.

  ![](https://i.imgur.com/q74SaD3.png)

* Pour démontrer que des fonctions sont réciproques, on démontre que *(f ∘ g)(x) = (g ∘ f)(x) = x*:

  ![](https://i.imgur.com/7y2CZwL.png)

### Trouver la fonction réciproque

* Une fonction n'admet une réciproque que si chaque image a une unique antécédant.  
    <ins>Exemple</ins>: la fonction carré n'admet pas de réciproque.

  ![](https://i.imgur.com/kCyikPg.png)

  On peut facilement voir si une fonction admet une réciproque ou non en regardant son graphique. C'est ce qu'on appelle parfois le "test de la droite horizontale": une fonction admet une réciproque si et seulement si sa courbe représentative a un seul point d'intersection avec toute parallèle à l'axe des abscisses.  
  <ins>Exemple</ins>: la fonction cube admet une réciproque.

  ![](https://i.imgur.com/pkbTO4T.png)

* La fonction *f* exprime *y* en fonction de *x* — *f(x) = y*.  
  Pour trouver sa réciproque, il suffit d'exprimer *x* en fonction de *y*.

  <ins>Exemple</ins>:

  ```
  Soit f(x) = 2x+ 4.
  Calculer sa réciproque

        y = 2x + 4
    y - 4 = 2x
  y/2 - 2 = x

  f⁻¹(x) = 0.5x - 2

  On peut vérifier:
  f(2) = 2×2 + 4 = 8
  f(3) = 2×3 + 4 = 10

  f⁻¹(8) = 0.5×8 - 2 = 2
  f⁻¹(10) = 0.5×10 - 2 = 3
  ```

  ```
  Calculer la réciproque de f(x) = 4∛x.

      y = 4∛x
     y/4 = ∛x
  (y/4)³ = x
   y³/64 = x

  f⁻¹(x) = x³/64
  ```
