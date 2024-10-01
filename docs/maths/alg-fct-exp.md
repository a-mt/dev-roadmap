---
title: Fonction Exponentielle
category: Maths, Algèbre, Fonction
latex: true
---

* Il existe une unique fonction 𝑓 dérivable sur ℝ qui est égale à propre dérivée et prend la valeur 1 en 0.  
  Cette fonction s’appelle la fonction *exponentielle*. On la note exp(x) ou e<sup>x</sup>.

  $$
  \begin{align}
  e^x &= e'^x \\
  e^0 &= 1
  \end{align}
  $$

  Cette fonction est utilisée pour modéliser des phénomènes dans lesquels une différence constante sur la variable conduit à un rapport constant sur les images.

* e<sup>x</sup> est

  - dérivable sur ℝ
  - strictement positive pour tout réel x supérieur à 0: 𝑒<sup>𝑥</sup> > 0, ∀𝑥 ∈ ℝ
  - strictement croissante sur ℝ

  ![](https://i.imgur.com/R4DMoy9m.png)  
  ![](https://i.imgur.com/AT4bcM1m.png)

* On note *e* l'image de 1 par la fonction exponentielle. Ainsi *e = e<sup>1</sup> = exp(1)*.  
  *e* est un nombre irrationnel qui n'a ni écriture décimale finie ni écriture fractionnaire, tout comme &pi; on le désigne par une lettre, et on utilise la valeur arrondie au dernier moment.

  $$
  e^1: e \approx 2.72
  $$

## Propriétés

* La courbe représentative de la fonction exponentielle est au-dessus de la tangente en A(0; 1),  
  d'où e<sup>x</sup> ≥ x + 1 pour tout 𝑥 ∈ ℝ.

  ![](https://i.imgur.com/nBHyhad.png)

* Les règles des puissances s'appliquent. On dit que la fonction exponentielle transforme les sommes en produits, les différences en quotients, et les produits en puissances.

  $$
  \begin{align}
  e^a \times e^b &= e^{a+b} \\
  \frac{e^a}{e^b} &= e^{a-b} \\
  (e^a)^n &= e^{na} \\
  e^{-a} &= \frac{1}{e^a}
  \end{align}
  $$

  <ins>Exemple 1</ins>:  
  Si pour tout x, 6<sup>x</sup> = A<sup>x/4</sup>, quelle est la valeur de A?

  $$
  \boxed{\text{1. On transforme } 6^x} \qquad \\
  \begin{align}
  6^x &= 6^{4 \times \frac{x}{4}} \\
  &= (6^4)^{\frac{x}{4}}
  \end{align}
  $$

  <!-- -->

  $$
  \boxed{\text{2. On déduit la valeur de A}} \\
  \begin{align}
  6^x &= A^{\frac{x}{4}} \\
  (6^4)^{\frac{x}{4}} &= A^{\frac{x}{4}} \\
  \text{donc } A &= 6^4 = 1296
  \end{align}
  $$

  <!--![](https://i.imgur.com/2JFl43o.png)-->

  <ins>Exemple 2</ins>:

  ![](https://i.imgur.com/z6MHxKq.png)

  <ins>Exemple 3</ins>:

  ![](https://i.imgur.com/RrXrFR9.png)

  <ins>Exemple 4</ins>:

  ![](https://i.imgur.com/GigRQ93.png)

  <ins>Exemple 5</ins>:

  ![](https://i.imgur.com/nNRIlJ5.png)

## Logarithme népérien

![](https://i.imgur.com/236a82U.png)