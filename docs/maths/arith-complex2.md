---
title: Nombres complexes dans l'espace
category: Maths, Arithmétique
latex: true
---

## Affixe d'un point

* Pour tout nombre complexe *z = x + iy*, on peut associer un point *M(x; y)* dans le plan complexe.  
  Le nombre complexe, associé aux coordonnées de M, est appelé l'*affixe* du point.  
  Par exemple, 3 - 2i est l'affixe du point M(3; 2) représenté dans le plan complexe représenté ci-dessous:

  ![](https://i.imgur.com/m384ZZo.png)

* Dans le plan complexe, l'axe des abscisses est appelé *axe des réels* et l'axe des ordonnées est l'*axe des imaginaires*.  
  Si *x = 0* alors *z* est un imaginaire pur (puisque *z = iy*)

  ![](https://i.imgur.com/KEOllMv.png)

## Conjugué

* Soit *z = a + ib* avec *a* et *b* réels.  
  Le nombre complexe conjugué de *z*, noté z&#x0305;, est le nombre complete *z&#x0305; = a - ib = a + i(-b)*.  
  Les points d'affixes z et z&#x0305; sont symétriques par rapport à l'axe des réels.

  ![](https://i.imgur.com/8rSfOSe.png)

## Solution d'une Équation de second degré

* Dans ℂ, comme dans ℝ, un produit est nul si et seulement si l’un de ses facteurs est nul.  
  Ainsi l’équation 𝑧² = −4, d’inconnue 𝑧 n’a pas de solution réelle mais équivaut à 𝑧² = (2𝑖)².  
  Et (𝑧 − 2𝑖)(𝑧 + 2𝑖) = 0 a donc deux solutions dans ℂ : 2𝑖 et −2𝑖.

## Module

* Le *module* d'un nombre complexe *z = a + ib*, noté *\|z\|*, est le nombre réel positif qui mesure sa "taille" — graphiquement, il s'agit de la distance entre l'origine du repère et le point d'affixe M.

  $$
  \left| z \right| = \sqrt{a^2 + b^2}
  $$

  <ins>Exemple</ins>:  
  Si z = √3 + i, le module de z est  
  \|z\| = √[(√3)² + 1] = √(3 + 1) = 2

* Le module de *z* est égal au conjugué du module du conjugué de *z*

  $$
  \lvert z \rvert = \lvert \bar{z} \rvert = \lvert −z \rvert
  $$

## Argument

* Un *argument* de *z*, noté *arg(z)*, est la mesure de l'angle ($$\vec{u}; \vec{OM}$$), en radians.  
  Toute mesure d'angle d'un multiple de 2π est également un argument de z.

  ![](https://i.imgur.com/PyzkbYu.png)

  <ins>Exemple</ins>:

  ![](https://i.imgur.com/ihaCcKy.png)

* Si arg(z) = 0 ou ⁡π(2π),  
  *z* est un réel non nul (la partie imaginaire est nulle, on est sur l'axe des *x*)  

* Si arg(z) = π/2 ou (-π/2)(2π),  
  *z* est un imaginaire pur non nul (la partie réelle est nulle, on est sur l'axe des *y*)

## Forme trigonométrique d'un nombre complexe

* Les coordonnées du point M, exprimées en fonction de l'angle, seront donc ($$\lvert z \rvert cos\theta; \lvert z \rvert sin\theta$$),  
  et on peut exprimer *z* avec

  $$
  z = \lvert z \rvert cos\theta + i \lvert z \rvert sin\theta
  $$

* Pour exprimer un nombre *z* sous forme trigonométrique, on se sert du fait que

  $$
  \frac{z}{\lvert z \rvert} = cos\theta + i sin\theta
  $$

  <ins>Exemple</ins>:  
  Soit z = √3 + i, exprimer *z* sous forme trigonométrique

  $$
  \begin{align}
  \frac{z}{\lvert z \rvert} &= \frac{\sqrt{3} + i}{2} \\
  &= \frac{\sqrt{3}}{2} + i\frac{1}{2} \\
  \\
  & \text{Sachant que cosθ = $\frac{\sqrt{3}}{2}$ et sinθ = $\frac{1}{2}$,} \\
  & \text{on peut en déduire que θ = $\frac{\pi}{6}$} \\
  \\
  \frac{z}{\lvert z \rvert} &= cos \frac{\pi}{6} + i \cdotp sin \frac{\pi}{6} \\
  z &= \lvert z \rvert (cos \frac{\pi}{6} + i \cdotp sin \frac{\pi}{6}) \\
    &= 2 (cos \frac{\pi}{6} + i \cdotp sin \frac{\pi}{6})
  \end{align}
  $$
