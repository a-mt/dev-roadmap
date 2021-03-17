---
title: Trigonométrie dans le triangle rectangle
category: Maths, Géométrie
---

Concepts: hypoténuse, côté opposé, côté adjacent, résolution d'un triangle, sinus, cosinus, tangente, cosécante, sécante, cotangente, arcsinus, arccosinus, arctangente, angles remarquables, co-relations, identité remarquable

## Rappels

* Dans un triangle rectangle, on appelle *hypoténuse* le côté opposé à l'angle droit.  
  C'est le plus long des trois côtés du triangle.

  ![](https://i.imgur.com/4RNAtJQ.png)

* On appelle *côté opposé* à un angle le côté qui est en face de cet angle.

  ![](https://i.imgur.com/fWXNUSh.png)

* On appelle *côté adjacent* à un angle le côté qui est à côté de cet angle. L'hypoténuse est également adjacent, mais c'est avant-tout l'hypoténuse donc on dit hypoténuse pour le désigner et on dit côté adjacent pour désigner le côté adjacent à l'angle qui n'est pas l'hypoténuse.

  ![](https://i.imgur.com/kjUphsW.png)

<ins>Exemple</ins>:

![](https://i.imgur.com/QTgKw3l.png)

---

## Résolution d'un triangle

* Un triangle possède 3 côtés et 3 angles. Toutes ces informations ne sont pas utiles à la construction du triangle: par exemple connaître la longueur de deux côtés et de la mesure de l'angle entre ces côtés permet de compléter le triangle. Par contre, connaître trois angles ne permet pas retrouver le triangle, puisqu'il existe une infinité de triangles ayant les trois mêmes angles.  En fait, il faut connaître 3 parties dont au moins un côté pour reconstruire un triangle.

* La *résolution d'un triangle* consiste à déterminer différents éléments inconnus d'un triangle (comme la longueurs des côtés, la mesure des angles, ou l'aire) à partir d'éléments qui sont eux connus.

## Fonctions trigonométriques

* Prenons un triangle dont on connaît 3 angles: 90°, 30° et (180-90-30 =) 60°. Si on prend un côté et qu'on l'agrandit, les autres côtés s'agrandissent, et si on le réduit, les autres côtés sont réduits. En fait, le rapport entre les longueurs reste constant.

  ![](https://i.imgur.com/rGYR4sz.png)
  ![](https://i.imgur.com/eMlERE6.png)

  <!--https://www.geogebra.org/calculator/njeggkvf-->

  Si on change la mesure de l'angle, alors les rapports de longueur changent.

* Dans un triangle rectangle, les *fonctions trigonométriques* sont des fonctions qui prennent en entrée la mesure d'un angle et retournent en sortie le rapport entre deux côtés. Il y a 3 fonctions trigonométriques principales:

  * <ins>sinus</ins>: retourne le rapport entre le côté opposé et l'hypoténuse.

    ![](https://i.imgur.com/dK1qIDWm.png)

  * <ins>cosinus</ins>: retourne le rapport entre le côté adjacent et l'hypoténuse.

    ![](https://i.imgur.com/1TMCeQ3.png)

  * <ins>tangente</ins>: retourne le rapport entre  le côté opposé et le côté adjacent.

    ![](https://i.imgur.com/2J8IsTq.png)

  <ins>Exemple</ins>: tan(30deg) ≈ 0.58. Dans un triangle rectangle, si on augmente la longueur du côté adjacent d'un angle de 30° de 1, on augmente la longueur du côté opposé de 0.58

* Pour se souvenir de la définition des fonctions trigonométriques,  
  on peut se servir du moyen mnémotechnique "SOHCAHTOA":

  ![](https://i.imgur.com/tEhJgBxl.png?1)

* Si on connaît le rapport entre les longueurs,  
  alors il suffit de connaître une des longueurs du triangle pour retrouver les autres.  
  On utilise une fonction trigonométrique ou une autre selon les valeurs qu'on connaît.

  <ins>Exemple</ins>:

  ![](https://i.imgur.com/4QvJUpF.png)

---

## Inverses des fonctions trigonométriques

* On définit 3 fonctions, qui sont les inverses des fonctions trigonométriques principales:

  * <ins>cosécante</ins>: inverse du sinus
  * <ins>sécante</ins>: inverse du cosinus
  * <ins>cotangente</ins>: inverse de la tangente

  ![](https://i.imgur.com/Bfz6dP4.png?1)

  Exemple: cotan(30deg) ≈ 1.73. Dans un triangle rectangle, si on augmente la longueur du côté opposé d'un angle de 30° de 1, on augmente la longueur du côté adjacent de 1.73

## Réciproques des fonctions trigonométriques

* On définit 3 fonctions, qui sont les réciproques des fonctions trigonométriques principales — elles permettent de retrouver la mesure d'un angle en connaissant le rapport entre deux longueurs:

  * <ins>arcsinus</ins>: réciproque du sinus
  * <ins>arccosinus</ins>: réciproque du cosinus
  * <ins>arctangente</ins>: réciproque de la tangente

  ![](https://i.imgur.com/TOcPkM8l.png)

  <ins>Exemple</ins>:

  ![](https://i.imgur.com/b4qUgRFm.png)

* La réciproque d'une fonction *f* se note *f<sup>-1</sup>*. Arcsin(x) par exemple, est parfois noté sin<sup>-1</sup>(x). Cette notation a l'inconvénient de pouvoir être confondue avec [sin(x)]<sup>-1</sup>, qui est l'inverse de la fonction (= 1/sin(x)) et non la réciproque. Les notations arcsin, arcos et arctan n'ont pas cet inconvénient.

---

## Angles remarquables

En général, une calculatrice ou une table trigonométrique est indispensable pour trouver le sinus, le cosinus ou la tangente d'un angle, mais pas toujours:

* On peut facilement trouver la valeur du sinus, cosinus ou tangente d'un angle de 30° ou 60° car ce sont les angles aigus d'un triangle rectangle particulier, le demi-triangle équilatéral. Et on sait que dans le demi-triangle équilatéral, 1. l'hypoténuse est le double du plus petit côté et 2. le plus grand côté de l'angle droit est le produit du plus petit par racine de 3.

  Ex:  
  sin(30) = x/2x = 1/2  
  cos(30) = x√3/2x = √3/2  
  On peut continuer de se servir de ces rapports pour trouver la tangente et les valeurs des fonctions trigonométriques pour un angle de 60°.

  ![](https://i.imgur.com/FKqluAK.png)

* On peut également les trouver pour un angle de 45° car c'est la mesure des angles aigus d'un triangle rectangle isocèle. Et on sait que dans le triangle rectangle isocèle, l'hypoténuse est le produit de la longueur d'un côté par racine de 2.  
  Ex: sin(45) = x/x√2 = 1/√2 = √2/2

  ![](https://i.imgur.com/uHjBKdU.png)

* Si on calcule l'ensembles des valeurs, on obtient les égalités suivantes:

  ![](https://i.imgur.com/IfPNdvH.png)

---

## Co-relations

* sinus et cosinus, tangente et cotangente, sécante et cosécante sont des *corelations*: pour n'importe quel angle, le rapport des deux longueurs (f(θ)) est égal au rapport des deux longueurs de son angle complémentaire (cof(90-θ)).

  ![](https://i.imgur.com/jA8W5bi.png?1)

  Par exemple, le sinus d'un angle est égal au cosinus de son complémentaire.

  ![](https://i.imgur.com/SjUCfaN.png)

## Identité remarquable

* Le sinus au carré d'un angle plus le cosinus au carré du même angle est égal à 1: sin(x)²  + cos(x)² = 1.

  ![](https://i.imgur.com/WvSy5dE.png)

* Cette égalité peut être utile pour réduire une expression algébrique contenant des sinus et cosinus.

  <ins>Exemple</ins>:

  ![](https://i.imgur.com/xgSNfLh.png)