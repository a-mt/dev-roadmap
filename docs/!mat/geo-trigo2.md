---
title: Trigonométrie dans le cercle
category: Maths, Géométrie
---

Concepts: cercle unité, propriétés des fonctions trigonométriques, fonctions sinusoidales, formules d'addition / de soustraction / angle double / angle moitié

## Triangle sphérique

* Dans le cas d'un triangle sphérique (triangle dessiné sur une sphère), les règles habituelles ne sont plus applicables: par exemple la somme des angles d'un triangle situés sur une sphère est supérieure à 180 degrés — elle peut varier entre 180° et 540° (entre π et 3π radians).

  ![](https://i.imgur.com/8GVo4qU.png)

* Les fonctions trigonométriques ont été définies pour les angles entre 0° et 90° (soit entre 0 et π/2 radians). Mais en utilisant le cercle unité, on peut étendre cette définition.

## Cercle unité

* Une *cercle unité* (ou *cercle trigonométrique*) est un cercle de rayon 1 et prenant pour origine le centre d'un repère cartésien — (0,0).

  Lorsqu'on utilise le cercle unité, on dessine toujours l'angle en partant de l'axe des *x* positifs puis dans le sens inverse des aiguilles d'une montre. C'est ce qu'on appelle le *sens trigonométrique*. Le sens inverse est dit anti-trigonométrique, ce qui correspond à un angle négatif.

  ![](https://i.imgur.com/WL4W4HS.png)

* Si on dessine un triangle rectangle avec un angle de plus en plus grand, le sommet du triangle placé sur le cercle balaie le cercle unité. L'hypoténuse vaut toujours 1, puisque c'est le rayon.

  ![](https://i.imgur.com/Ht0rfYs.png)

  Si on nomme (a,b) les coordonnées du point sur le cercle:

  * Le cosinus de l'angle vaut adjacent/hypoténuse = a/1 = a.
  * Le sinus de l'angle vaut opposé/hypoténuse = b/1 = b.
  * La tangente de l'angle vaut opposé/adjacent = b/a

  ![](https://i.imgur.com/G9f2Wz5.png)

## (Re)Définition des fonctions trigonométriques

* De manière générale, pour les angles qui ne peuvent pas faire partie d'un triangle rectangle (parce qu'ils sont trop grands), on utilise le point sur le cercle unité et on définit

  * **cosinus**: coordonnée *x* du point sur le cercle unité associé à l'angle considéré
  * **sinus**  : coordonnée *y* du point
  * **tangente**: *y/x*

  <ins>Exemples</ins>:

  ![](https://i.imgur.com/uGSrb4E.png)

  ![](https://i.imgur.com/e6UovCg.png)

  ![](https://i.imgur.com/wGJtaux.png)

---

## Propriétés des fonctions trigonométriques

Les propriétés des fonctions trigonométriques peuvent être déduite de leur définition avec le cercle unité:

### Périodicité

* Les fonctions sinus et cosinus sont périodiques en 2π.  
  Ainsi on a par exemple `cos(θ) = cos(θ + 2π) = cos(θ - 2π)`.  
  Ou si on exprime θ en degrés: `cos(θ) = cos(θ + 360°) = cos(θ - 360°)`

  Et la fonction tangente est périodique en π: `tan(θ) = tan(θ + π) = tan(θ - π)`.

  ![](https://i.imgur.com/oZ9a5WG.png)

  <ins>Exemple</ins>:

  ```
  Trouver cos(5π)

    cos(5π)
  = cos(4π + π)
  = cos(π)
  = -1
  ```

  ```
  Trouver sin(-420°)

    sin(-420°)
  = sin(-360° - 60°)
  = sin(-60°)
  = -√3/2
  ```

### Parité

* cosinus est une fonction paire, ce qui signifie que cos(-θ) = cos(θ)  
  sinus est une fonction impaire: sin(-θ) = -sin(θ)  
  Par conséquent, tangente est une fonction impaire: tan(-θ) = -tan(θ)

  ![](https://i.imgur.com/ZKJkVMA.png)

  ![](https://i.imgur.com/dMqVw7j.png)

### Décalage de phase

* Si on trace les valeurs de sinus et cosinus en fonction de l'angle, on voit que le graphique de cosinus est le même que le graphique de sinus mais décalé horizontalement de π/2 vers la gauche. Dans les deux cas, le domaine de définition est (-∞, ∞) et l'intervalle [-1, 1].

  ![](https://i.imgur.com/XIho9JF.png)

  ![](https://i.imgur.com/x2eXsRT.png)

---

## Fonctions sinusoidales

* k×sin: modifie l'amplitude  
  3sin(x) étire la fonction sinus verticalement par un facteur 3.

  ![](https://i.imgur.com/Ga1FsjV.png)

* k×θ: modifie la période  
  sin(2x) compresse la fonction sinus horizontalement par un facteur 2.

  ![](https://i.imgur.com/QiMeIAD.png)

* sin+k: décale l'amplitude  
  Ex: sin(x) + 1 décale la fonction sinus de 1 vers le haut.

  ![](https://i.imgur.com/t5agh5s.png)

* θ+k: décale la période (aussi appelé décalage de phase)  
  Ex: θ+π/4 décale la fonction sinus de π/4 vers la droite.

  ![](https://i.imgur.com/k17oeWJ.png)

---

## Formules d'addition et soustraction de deux angles

![](https://i.imgur.com/GrNdVVD.png?1)

![](https://i.imgur.com/F2ZU9xI.png?1)

<ins>Exemple</ins>:

![](https://i.imgur.com/k1Ajt9U.png)

## Formules de l'angle double

On peut déduire les formules de l'angle double des formules d'addition:

![](https://i.imgur.com/xQxO7oN.png?1)

## Formules de l'angle moitié

Ainsi que les formules de l'angle moitié:

![](https://i.imgur.com/usIFijQ.png)
