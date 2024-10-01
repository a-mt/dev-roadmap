---
title: Vecteurs
category: Maths, Géométrie
latex: true
---

* Un **vecteur** définit une translation, c'est à dire un glissement linéaire (une flèche).  
  Un vecteur n'a pas un emplacement bien définit dans l'espace, c'est les composants du vecteur qui le déterminent:

  - la direction (une droite),
  - le sens (vers le sud-ouest),
  - et la longueur

  ![](https://i.imgur.com/t5YnwKF.png)

  <ins>Exemple</ins>: le vecteur <code>u&#x20D7;(3; -2)</code> indique un déplacement de 3 en absisse et -2 en ordonnée.

  ![](https://i.imgur.com/GPiGLl4.png)

* Pour indiquer qu'on parle d'un vecteur, on place une flèche au-dessus du nom du vecteur: <code>u&#x20D7;</code> désigne le vecteur u.  
  La flèche d'origine A et d'extremité B (autrement dit le vecteur AB) se note $$\vec{AB}$$.

  ![](https://i.imgur.com/UH8VZZJ.png)

## Vecteur nul

* Si A = B, alors l'origine est confondue avec l'extrémité et il s'agit du vecteur nul, noté $$\vec{0}$$ (donc $$\vec{AA} = \vec{BB} = \vec{0}$$)

## Coordonnées d'un vecteur

* Donner les coordonnées d'un vecteur, c'est définir de combien on doit se déplacer dans la direction *x* et *y*.  
  On note les coordonnées du vecteur: $$\vec{u}(x; y)$$ ou $$\vec{u}\binom{x}{y}$$.  
  Les coordonnées sont généralement écrites en colonnes pour éviter la confusion avec les coordonnées d'un point.

* Soit $$A(x_A; y_A)$$ et $$B(x_B; y_B)$$ deux points distincts.  
  Le vecteur $$\vec{AB}$$ a pour coordonnées $$\vec{AB}\binom{x_B - x_A}{y_B - y_A}$$  
  <ins>Exemple:</ins>  
  Dans un repère orthonormé, le déplacement de A(2; 1) vers B(5; -1) est $$\vec{AB}\binom{5-2}{-1-1} = \binom{3}{-2}$$

## Opposé d'un vecteur

* Le vecteur opposé du vecteur <code>u&#x20D7;</code>, noté <code>-u&#x20D7;</code>, est le vecteur tel que <code>u&#x20D7; + (-u&#x20D7;) = 0&#x20D7;</code>.  
  Il s'agit du vecteur qui va dans le sens opposé de <code>u&#x20D7;</code> et permet de revenir au point d'origine après avoir appliqué <code>u&#x20D7;</code>.  
  Le vecteur opposé au vecteur $$\vec{AB}$$ est donc le vecteur $$-\vec{AB} = \vec{BA}$$.

## Norme du vecteur

* La norme du vecteur $$\vec{u}$$ est notée $$\lVert\vec{u}\rVert$$. Elle représente la longueur du vecteur.  
  Dans un repère orthonormé du plan avec u&#x20D7;(x; y), la norme de u au carré est la somme des carrés de x et y (on a simplement appliqué le théorème de Pythogare).

  $$
  \left\| \vec{u} \right\| = \sqrt(x^2 + y^2)
  $$

  <ins>Exemple</ins>:

  ![](https://i.imgur.com/Nzhp6zz.png)

## Vecteurs égaux

* Deux vecteurs sont dits égaux s'ils ont la même direction, le même sens et la même norme.  
  En d'autres termes, deux vecteurs sont égaux lorsqu’ils effectuent le même déplacement.

  ![](https://i.imgur.com/4dKMcuc.png)

## Vecteur unitaire

* Un vecteur unitaire est un vecteur qui ne se déplace que d'une unité dans une seule direction.  
  On définit <code>i&#x20D7;(1; 0)</code> pour un déplacement horizontal et <code>j&#x20D7;(0; 1)</code> pour un déplacement vertical.

  ![](https://i.imgur.com/UecEvGm.png)

* Tout vecteur peut être décomposé en une somme de vecteurs unitaires et peut donc être noté <code>xi&#x20D7; + yj&#x20D7;</code>

  $$\vec{u}\binom{2}{3} = 2\vec{i} + 3\vec{j}$$

## Somme de vecteurs

* En enchaînant la translation du vecteur <code>u&#x20D7;</code> et celle de vecteur <code>u&#x20D7;</code>, on obtient une nouvelle translation.  
  Le vecteur qui lui est associé est la somme de <code>u&#x20D7;</code> et <code>v&#x20D7;</code>: <code>u&#x20D7; + v&#x20D7;</code>

  ![](https://i.imgur.com/hK9RDBm.png)

  Pour ajouter deux vecteurs, ajouter les composants *x* entre eux et les composants *y* entre eux.  
  L'ordre dans lequel on applique les translations n'a pas d'importance: <code>u&#x20D7; + v&#x20D7;</code> = <code>v&#x20D7; + u&#x20D7;</code>

  $$
  \vec{u} + \vec{v} = \binom{x + x'}{y + y'}
  $$

  <ins>Exemple</ins>:

  ![](https://i.imgur.com/MZutYWr.png)

## Soustraction de vecteurs

* Même principe pour la soustraction (sauf que l'ordre a de l'importance)

  $$
  \vec{u} - \vec{v} = \binom{x - x'}{y - y'}
  $$

  <ins>Exemple</ins>:

  ![](https://i.imgur.com/B2aoF7g.png)

## Multiplication scalaire d'un vecteur

* Un vecteur peut être multiplé par un nombre scalaire.  
  Le nouveau vecteur est une version redimensionnée du vecteur original: la direction ne change pas mais la longueur est plus grande. Par exemple, si on multiple un vecteur par 3, alors le nouveau vecteur sera 3 plus grand que l'original.

  $$
  \lambda \vec{u} = \binom{\lambda x}{\lambda y}
  $$

  <ins>Exemple</ins>:

  $$
  \binom{4}{6} \times 3 = \binom{12}{18}
  $$

## Vecteurs colinéaires

* Dire que deux vecteurs non nuls $$\vec{u}$$ et $$\vec{v}$$ sont *colinéaires* signifie qu’il existe un nombre réel k tel que $$\vec{v} = k\vec{u}$$ (donc que les coordonnées sont proportionnelles). Si le facteur *k* est positif alors le déplacement est dans le même sens, et sinon dans le sens opposé.

  ![](https://i.imgur.com/S30iKpF.png)

  <ins>Exemple</ins>:  
  On considère les vecteurs $$\vec{u}\binom{-1}{3}$$ et $$\vec{v}\binom{3}{-9}$$.  
  On constate que les vecteurs sont proportionnels avec $$\vec{v} = 3\vec{u}$$, ils sont donc colinéaires.

* Si les vecteurs $$\vec{u}\binom{x}{y}$$ et $$\vec{v}\binom{x'}{y'}$$ sont colinéaires, alors $$xy' - x'y = 0$$

  <ins>Exemple</ins>:  
  On considère les vecteurs $$\vec{u}\binom{\sqrt5 - 1}{-1}$$ et $$\vec{v}\binom{-4}{\sqrt5 - 1}$$. Les vecteurs sont-ils colinéaires?  
  (√5 - 1) × (√5 + 1) - (-1) × (-4) = 5 - 1 - 4 = 0. Les vecteurs sont donc colinéaires.

* Si le vecteur AB et AC sont colinéaires, alors les points A, B et C sont alignés.

  <ins>Exemple</ins>:  
  On considère les points A(5; -2), B(8; 2) et C(-1; -10). Les points A, B et C sont-ils alignés?  
  Les coordonnées des vecteurs sont AB(3; 4), AC(-6; -8).  
  (3 × -8) - (4 × -6) = 0. Les vecteurs sont colinéaires donc les points A, B et C sont alignés

## Vecteur directeur

* Un vecteur <code>u&#x20D7;</code> est dit *directeur* d'une droite *d* s'il existe deux points A et B de *d* tels que $$\vec{AB} = \vec{u}$$.  
  Le vecteur $$\vec{v}\binom{-b}{a}$$ est un vecteur directeur de la droite d'équation *ax + by + c = 0*, où *c* est quelconque.  
  Et donc le vecteur $$\vec{u}\binom{1}{a}$$ est un vecteur directeur de la droite d'équation *y = ax + c*.

  ![](https://i.imgur.com/qZJSyBlm.png)

* <ins>Exemple</ins>:  
  Soit la droite d'équation y = (2/3)x + 5. Donner un exemple de vecteur directeur à cette droite.

  Le vecteur u(1; 2/3) est un vecteur directeur de la droite.  
  Le vecteur v = 3u, de coordonnées (3; 2) en est un autre

## Vecteur normal

* Un vecteur est dit *normal* s'il est orthogonal à un vecteur directeur de la droite.  
  Le vecteur $$\vec{n}\binom{a}{b}$$ est un vecteur normal de la droite d'équation *0 = ax + by + c*.

  <ins>Exemple</ins>:  
  L'équation de droite 2x -y + 4 = 0 admet pour vecteur directeur  <code>v&#x20D7;(1; 2)</code> et pour vecteur normal <code>n&#x20D7;(2; -1)</code>

## Produit scalaire de deux vecteurs

* Le *produit scalaire* (*dot product* en anglais) de deux vecteurs est  
  une opération dans laquelle tous les termes de même rang des vecteurs sont multipliés entre eux, puis les produits obtenus sont additionés: le produit des composants *x* est ajouté au produit des composants *y*.

  $$
  \vec{u} \cdotp \vec{v} = xx' + yy'
  $$

  On notera que donc u&#x20D7; · v&#x20D7; = v&#x20D7; · u&#x20D7; (puisque xx' + yy' = x'x + y'y)

  <ins>Exemple</ins>:

  $$
  \begin{aligned}
  \binom{2}{4} \cdotp \binom{12}{4} &= 2\times12 + 4\times4 \\
  &= 24 + 16 \\
  &= 40
  \end{aligned}
  $$

* Le nombre <code>u&#x20D7; · u&#x20D7;</code> est appelé le *carré scalaire* de u et il est noté <code>u&#x20D7;²</code>

* Pour tous vecteurs u et v, les identités remarquables habituelles s'appliquent

  $$
  \begin{align}
  \vec{u} \cdotp (k\vec{v}) &= k(\vec{u} \cdotp \vec{v}) \\
  \\
  (\vec{u} + \vec{v})^2 &= \vec{u}^2 + 2(\vec{u} \cdotp \vec{v}) + \vec{v}^2 \\
  \\
  (\vec{u} - \vec{v})^2 &= \vec{u}^2 - 2(\vec{u} \cdotp \vec{v}) + \vec{v}^2 \\
  \\
  (\vec{u} + \vec{v})(\vec{u} - \vec{v}) &= \vec{u}^2 - \vec{v}^2
  \end{align}
  $$

## Orthogonalité de deux vecteurs

* Deux vecteurs sont orthogonaux si et seulement si leur produit scalaire est nul.  
  Notation: u&#x20D7; ⊥ v&#x20D7; signifie que les vecteurs u et v sont orthogonaux

  $$
  \text{Si } \vec{u} \cdotp \vec{v} = 0 \text{ alors } \vec{u} \perp \vec{v}
  $$

