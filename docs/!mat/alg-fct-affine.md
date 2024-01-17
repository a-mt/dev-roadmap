---
title: Fonction affine
category: Maths, Algèbre, Fonction
---

Concepts: coefficient directeur, ordonnée à l'origine, abscisse à l'origine, lire une équation, tracer une droite (équation ou inéquation)

## Allure générale

* Une fonction affine ou fonction de premier degré s'écrit sous la forme `f(x) = ax + b` et représente une relation linéaire — quand on la trace sur un graphique, on obtient une droite.

  <ins>Exemple</ins>:

  ![](https://i.imgur.com/70EMSFul.png)

* `ax + b = y` est une équation écrite sous forme réduite, c'est la forme la plus courante puisqu'elle permet de facilement se représenter l'allure d'une droite sur un graphique. Quand l'équation est écrite sous une autre forme, on commence généralement par la ré-écrire sous forme réduite. Les formes les plus courantes pour une fonction affine sont:

  ![](https://i.imgur.com/i8HWLoJ.png)

---

## Coefficient directeur

* On appelle *coefficient directeur* (ou *taux de variation*) le coefficient de l'inconnue de plus haut degré.  
  C'est le paramètre *a* dans *f(x) = ax + b*.

* Le coefficient directeur détermine la pente et l'inclinaison de la droite:
  * s'il est positif, la pente est croissante. Et s'il est négatif, la pente est décroissante
  * plus sa valeur absolue est grande, plus la pente est inclinée — elle augmente ou diminue plus rapidement.

  ![](https://i.imgur.com/N2ELZMtm.png)
  ![](https://i.imgur.com/ibqTSCPm.png)

* Le coefficient directeur correspond au rapport entre la variation verticale et la variation horizontale de la droite.

  ![](https://i.imgur.com/A6GBHtz.png)

### Coefficient directeur nul ou non définit

* Si le coefficient directeur est nul (y = a) ou non définit (x = a),  
  alors il ne s'agit pas d'une fonction affine mais d'une constante.

  ![](https://i.imgur.com/HXCOhIB.png)

  ![](https://i.imgur.com/5Xm9j2H.png)

## Ordonnée à l'origine

* L'*ordonnée à l'origine* est le point où la droite coupe l'axe des ordonnées (plan vertical, celui des *y*), c'est à dire la valeur de *y* quand *x* vaut 0. Elle correspond au paramètre *b* dans *f(x) = ax + b*

  ![](https://i.imgur.com/l7qvj9u.png)

## Abscisse à l'origine

* L'*abscisse à l'origine* est le point où  la droite coupe l'axe des abscisses (plan horizontal, celui des *x*), c'est à dire la valeur de *x* quand *y* vaut 0.

## Calculer l'intersection avec l'abscisse

* Pour trouver l'intersection avec l'abscisse, il faut trouver la valeur pour laquelle y=0. Autrement dit, résoudre l'équation.  
  L'équation ax+b=0 a une seule solution: -b/a

  ```
  ax + b = 0
  ax = -b
  x - -b/a
  ```

  ![](https://i.imgur.com/DMSLtCM.png)

---

## Lire l'équation d'une droite

### À partir de deux points

* Si on connaît deux points d'une droite, on peut calculer le coefficient directeur de la droite, puis l'ordonnée à l'origine.

  ![](https://i.imgur.com/AJrfOPI.png)

  <ins>Exemple 1</ins>:

  ```
  Établir l'équation réduite de la droite passant
  par les points (0;3) et (2;7).

  a = Δy / Δx
    = (7-3) / (2-0)
    = 4/2
    = 2

  On a donc y = 2x + b
  Et on sait que la droite passe par (0;3):

  3 = 2×0 + b
  3 = b

  L'équation réduite de la droite est f(x) = 2x + 3
  ```

  ![](https://i.imgur.com/qdIkJFG.png)

  <ins>Exemple 2</ins>:

  ```
  Déterminer l'équation réduite de la fonction décrite par le tableau ci-dessous:

  | Temps de travail         | Salaire (euros) |
  |---                       |---              |
  | 1/2 journée (4 heures)   |   54            |
  |   1 journée (8 heures)   |  108            |
  |   2 jours   (16 heures)  |  216            |
  |   1 semaine (40 heures)  |  540            |
  |   1 mois    (180 heures) | 2430            |

  x: temps de travail en heures
  y: salaire en euros

  a = Δy / Δx
    = (108-54)/(8/4)
    = 54/4
    = 13,5

  On a donc y = 13.5x + b

  54 = 13.5×4 + b
  54 = 54 + b
  0  = b

  L'équation réduite décrite par ce tableau est y = 13.5x
  On on déduit que le salaire est de 13.5€/h
  ```

### À partir d'un point + coefficient directeur

* Si on connaît un point d'une droite ainsi que le coefficient directeur de la droite, on peut établir l'équation sous la forme y - b = m(x - a) avant de la réduire.

  ![](https://i.imgur.com/21pX1jp.png?1)

  <ins>Exemple</ins>:

  ```
  Établir l'équation réduite de la droite passant
  par le point (1;5) et ayant pour coefficient directeur -2.

  y - 5 = -2(x - 1)
  y = -2x + 2 + 5
  y = -2x + 7
  ```

---

## Tracer le graphique d'une droite

### Équation

* Pour tracer le graphique d'une droite, on peut

  1. calculer l'abscisse à l'origine, en remplaçant *y* par 0
  2. calculer l'ordonnée à l'origine, en remplaçant *x* par 0
  3. placer les deux points sur le graphique et les relier entre eux

  ![](https://i.imgur.com/YhiS3rL.png)

* Si l'abscisse à l'origine et/ou l'ordonnée à l'origine ne sont pas des nombres entiers, on peut

  1. calculer un point avec des coordonnées entières
  2. utiliser le coefficient directeur pour trouver un deuxième point entier: si le coefficient directeur est de *a/b*, se déplacer de *b* vers la droite et de *a* vers le haut (ou vers le bas si le coefficient est négatif).

  ![](https://i.imgur.com/fRrdaa0.png)

### Inéquation

* Pour représenter une inéquation, on trace la droite et  
  on colorie le demi-plan contenant les solutions de l'inéquation.

  ![](https://i.imgur.com/g907vzb.png)

* Si l'inégalité est stricte (ex inférieur et non inférieur ou égal),  
  alors on trace la droite en pointillés.

  ![](https://i.imgur.com/30AyzfW.png)