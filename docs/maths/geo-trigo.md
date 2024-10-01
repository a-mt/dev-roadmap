---
title: Trigonométrie dans le triangle rectangle
category: Maths, Géométrie
---

Concepts: hypoténuse, côté opposé, côté adjacent, résolution d'un triangle, sinus, cosinus, tangente, cosécante, sécante, cotangente, arcsinus, arccosinus, arctangente, angles remarquables, co-relations, identité remarquable

La *trigono-métrie* s'intéresse aux *mesures* des *triangles*.

## Rapports de longueur

* Prenons un triangle dont on connaît 3 angles: 90°, 40° et (180-90-40 =) 50°. Si on prend une longueur et qu'on l'agrandit, les autres longueurs s'agrandissent, et si on la réduit, les autres longueurs sont réduites. En fait, tant qu'on ne change pas les angles le rapport entre les longueurs reste constant.

  ![](https://i.imgur.com/vbx73WK.png)

  [Geogebra](https://www.geogebra.org/calculator/veajcsut)

  <!--https://www.geogebra.org/calculator/njeggkvf-->

  Quelle que soit les longueurs du triangle, si on se demande par quel nombre il faut multiplier la longueur du plus grand côté pour obtenir le plus petit, on trouvera toujours le même résultat: environ 0.64. Il en est de même pour les autres rapports qu'on peut calculer: on passe du grand au moyen côté en multipliant par environ 0.766 et du petit au moyen en multipliant par environ 1.192

* Mais les rapports trigonométriques posent un problème: leurs valeurs varient d'un triangle à l'autre. Les rapports 0.642, 0.766 et 1.192 ne sont valables que pour les triangles d'angles 40°, 50° et 90°. Dans un triangle rectangle avec des angles de 20°, 70° et 90°, les cosinus, sinus et tangente valent environ 0.342, 0.940 et 2.747. Et si on change encore la mesure de l'angle, alors les rapports de longueur changent encore. Il ne s'agit pas simplement de trouver un nombre, ni même trois, mais des tableaux entiers de nombres qui varient en fonction des différents triangles possibles qu'il faut calculer.

* Les grecs furent sans doute les premiers à établir des tables trigonométriques.
  Comme il est impossible d'attribuer à ces trois rapports des valeurs exactes, les mathématiciens leur ont donné des noms pour mieux pouvoir les étudier. Plusieurs mots ont été utilisés selon les lieux et les époques, mais aujourd'hui on les appelle "cosinus", "sinus" et "tangente". 

  Aujourd’hui, on a toutes les fonctions trigonométriques dans une unique calculatrice. En utilisant une calculatrice, on peut calculer le sinus, le cosinus et la tangente de n’importe quel angle — ainsi que les sécantes, cosécantes et cotangentes. Et de la même manière, si on connait les valeurs des sinus, cosinus et tangente, alors on peut retrouver l’angle duquel ils viennent.


## Résolution d'un triangle

* Pour bien connaître un triangle, il faut 6 informations: les longueurs des 3 côtés et les mesures des 3 angles. Mais toutes ces informations ne sont pas utiles à la construction du triangle: par exemple, si on connait la longueur de deux côtés et la mesure d'un angle entre ces deux côtés, alors on peut retrouver toutes les autres valeurs. Par contre, connaître trois angles ne permet pas retrouver le triangle, puisqu'il existe une infinité de triangles qui ont les trois mêmes angles. En fait, il faut connaître 3 parties dont au moins un côté pour reconstruire un triangle.

 * Sur le terrain, il est souvent bien plus simple de mesurer l'angle entre deux directions que la distance entre deux points.
  Par exemple, un géographe qui voudrait établir la carte d'un territoire peut facilement mesurer les angles d'un triangle formé par 3 montagnes. Il utilise une alidade (une sorte de rapporteur muni d'un système de visée) et une boussole pour orienter la carte dans l'espace, ce lui permet de mesurer l'angle entre le Nord et une direction donnée.
  Alors que mesurer la distance entre les 3 montagnes requiert une expédition et des calculs plus complexes.
  Le but du jeu est alors le suivant: comment faire pour obtenir toutes les informations d'un triangle en mesurant le moins de distances possibles?

* La *résolution d'un triangle* consiste à déterminer différents éléments inconnus d'un triangle (comme la longueurs des côtés, la mesure des angles, ou l'aire) à partir d'éléments qui sont eux connus.

## Rappels

* Dans un triangle rectangle, on appelle *hypoténuse* le côté opposé à l'angle droit.  
  C'est le plus long des trois côtés du triangle.

  ![](https://i.imgur.com/4RNAtJQ.png)

* On appelle *côté opposé* à un angle le côté qui est en face de cet angle.

  ![](https://i.imgur.com/fWXNUSh.png)

* On appelle *côté adjacent* à un angle le côté qui est à côté de cet angle. L'hypoténuse est également adjacent, mais c'est avant-tout l'hypoténuse, donc on dira adjacent pour désigner le côté adjacent à l'angle qui n'est pas l'hypoténuse.

  ![](https://i.imgur.com/kjUphsW.png)

<ins>Exemple</ins>:

![](https://i.imgur.com/QTgKw3l.png)

## Fonctions trigonométriques

* Dans un triangle rectangle, les *fonctions trigonométriques* sont des fonctions qui prennent en entrée la mesure d'un angle et retournent en sortie le rapport entre deux côtés. Les 3 principales fonctions trigonométriques sont:

  * <ins>sinus</ins>: retourne le rapport entre le côté opposé et l'hypoténuse.

    ![](https://i.imgur.com/dK1qIDWm.png)

  * <ins>cosinus</ins>: retourne le rapport entre le côté adjacent et l'hypoténuse.

    ![](https://i.imgur.com/1TMCeQ3.png)

  * <ins>tangente</ins>: retourne le rapport entre  le côté opposé et le côté adjacent.

    ![](https://i.imgur.com/2J8IsTq.png)

  * Pour se souvenir de la définition des fonctions trigonométriques,  
    on peut se servir du moyen mnémotechnique "SOHCAHTOA":

    ![](https://i.imgur.com/tEhJgBxl.png?1)

  <ins>Exemple</ins>:

  ![](https://i.imgur.com/eV64srj.png)

  ```
  sin(CAB) = BC/AB  ⟼  sin(30deg) = 0.5
  sin(ABC) = BC/AB  ⟼  cos(60deg) = 0.5
  sin(ABC) = AC/BC  ⟼  tan(60deg) = √3
  sin(CAB) = BC/AC  ⟼  tan(30deg) = 1/√3
  ```

  On sait que tan(30deg) = 1/√3 ≈ 0.58. Donc si on augmente de 1 la longueur du côté adjacent à un angle de 30° (AC = √3+1 ≈ 2.73), alors on augmente la longueur du côté opposé d'environ 0.58 (BC = 1+1/√3 ≈ 1.58)

* Et si on connaît le rapport entre les longueurs,  
  alors il suffit de connaître une des longueurs du triangle pour retrouver les autres.  
  On utilise une fonction trigonométrique ou une autre suivant les valeurs qu'on connaît.

  <ins>Exemple</ins>:

  ![](https://i.imgur.com/4QvJUpF.png)

---

## Inverses des fonctions trigonométriques

* On définit 3 fonctions, qui sont les inverses des fonctions trigonométriques principales:

  * <ins>cosécante</ins>: inverse du sinus
  * <ins>sécante</ins>: inverse du cosinus
  * <ins>cotangente</ins>: inverse de la tangente

  ![](https://i.imgur.com/Bfz6dP4.png?1)

  <ins>Exemple</ins>:  
  cotan(30deg) ≈ 1.73. Dans un triangle rectangle, si on augmente la longueur du côté opposé d'un angle de 30° de 1, on augmente la longueur du côté adjacent de 1.73

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

* sinus et cosinus, tangente et cotangente, sécante et cosécante sont des *corelations*: pour n'importe quel angle, le rapport des deux longueurs (f(θ)) est égal au rapport des deux longueurs de son angle complémentaire (co-f(90-θ)).

  ![](https://i.imgur.com/jA8W5bi.png?1)

  Par exemple, le sinus d'un angle est égal au cosinus de son complémentaire.

  ![](https://i.imgur.com/SjUCfaN.png)

## Identité remarquable

* Le sinus au carré d'un angle plus le cosinus au carré du même angle est égal à 1: sin(x)² + cos(x)² = 1.

  ![](https://i.imgur.com/Gh7IUQz.png)

  ![](https://i.imgur.com/WvSy5dE.png)

* Cette égalité peut être utile pour réduire une expression algébrique qui contient des sinus et cosinus.

  <ins>Exemple</ins>:

  ![](https://i.imgur.com/xgSNfLh.png)
