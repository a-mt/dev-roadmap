---
title: Limites
category: Maths, Algèbre
latex: true
---

## Limite d'une fonction en un point

* Une *limite* ne se préoccupe pas de la valeur d'une fonction en *x*, et ça n'a pas d'importance si *f(x)* n'existe pas. À la place, on s'interesse à ce qu'il se passe quand on s'approche de *x*

  <ins>Exemple</ins>:  
  Le buffet de sushis coûte 10$ par pound, mais est gratuit si on obtient exactement un pound.  
  La fonction qui décrit le prix du buffet est donc

  $$
  f(x) = \begin{cases}
  0 & \text{si } x = 1 \\
  10x & \text{si } x \neq 1
  \end{cases}
  $$

  f(1) vaut 0. Mais si on s'interesse à la valeur de f lorsqu'on s'approche de 1, sans véritablement être égal à 1, alors le résultat s'approche de 10.
  Autrement dit, f(x) devient arbitrairement proche de 10 quand x devient arbitrairement proche de 1. Ce qui se note:

  $$
  \lim_{x \to 1} f(x) = 10
  $$

* De manière plus générale, on dit que *f* a pour limite L quand *x* tend vers *a*.

  $$
  \boxed{\text{Limite en $a$}} \\
  \lim_{x \to a} f(x) = L
  $$

## Limite à gauche et à droite

* On parle de *limite à gauche* si  
  f(x) s'approche de L quand *x* approche *a* à partir de la gauche (avec des valeurs inférieures à *x*).  
  On le note avec un "-" en exposant:

  $$
  \boxed{\text{Limite en $a$ à gauche}} \\
  \lim_{x \to a^-} f(x) = L
  $$

* Et de *limite à droite* si  
  f(x) s'approche de L quand *x* approche *a* à partir de la droite (avec des valeurs supérieure à *x*).  
  On le note avec un "+" en exposant:

  $$
  \boxed{\text{Limite en $a$ à droite}} \\
  \lim_{x \to a^+} f(x) = L
  $$

* <ins>Exemple</ins>:

  ![](https://i.imgur.com/gLMbeHt.png)

## Limite d'une fonction en l'infini

* Avec la limite en l'infini, on cherche à savoir comment une fonction se comporte lorsqu'elle tend soit

  - vers des nombres très grands:  
    on dit que *x* tend vers *plus l'infini*, noté `x → +∞`

  - ou vers des nombres très petits (négatifs):  
    on dit que *x* tend vers *moins l'infini*, noté `x → -∞`

![](https://i.imgur.com/AVqAL40.png)

## Asymptote

* Une *asymptote* est une droite imaginaire vers laquelle la courbe s'approche sans jamais la rencontrer.  
  Note: le mot asymptote vient du grec "a", préfixe privatif, et "symptôsis", recontrer.  
  L'asymptote peut être horizontale, verticale ou oblique.

  ![](https://i.imgur.com/Ow2LD3e.png)

* La droite d'équation *y = b* est une asymptote horizontale à la courbe représentant *f*  
si et seulement si *f* a pour limite *b* lorsque x tend vers +∞ (ou -∞).

  $$
  \boxed{\text{Asymptote horizontale}} \\
  \lim_{x \to \pm\infty} f(x) = b
  $$

  La droite d'équation *x = c* est une asymptote verticale à la courbe représentative de *f* en *c*  
  si et seulement si *f* a pour limite +∞ ou (-∞) quand *x* tend vers *c* (éventuellement "à droite" ou "à gauche" de *c*)

  $$
  \boxed{\text{Asymptote verticale}} \\
  \lim_{x \to c} f(x) = \pm\infty
  $$

  <ins>Exemple 1</ins>:

  ![](https://i.imgur.com/9jxz6xq.png)

  <ins>Exemple 2</ins>:

  ![](https://i.imgur.com/W8ckrHn.png)

  ![](https://i.imgur.com/sNXIE4D.png)

## Limite inexistante

* La limite de *x* en *a* n'est pas définie si

  - La limite à gauche est différente de la limite à droite
  - Il y a un asymptote verticale
  - Les valeurs oscillent sans jamais converger vers une valeur unique

  ![](https://i.imgur.com/HOcyftx.png)

## Conjecturer une limite en un point

* On peut *conjecturer* la limite d'une fonction, c'est à dire essayer de la deviner sans en avoir la preuve mathématique, avec une calculatrice ou un logiciel. On calcule f(x) avec une valeur de *x* suffisamment proche mais différente de celle recherchée.

  <ins>Exemple</ins>: On peut conjecturer que 3sin(5x)/sin(2x) tend vers 7.5 en x → 0.

  ![](https://i.imgur.com/BgGbhIr.png)

## Limite en l'infini des fonctions usuelles

* Il est utile de savoir vers quelle valeur les fonctions usuelles tendent en l'infini — ce sera généralement +∞, -∞ ou 0:

  ![](https://i.imgur.com/xR1Oyn2.png)

## Limite en l'infini d'un polynôme

* Dans un polynôme de degré *n*, le monôme de plus haut degré va dominer tous les autres — puisque quel que soit la valeur de *x*, x<sup>n</sup> > x<sup>n-1</sup>. Pour étudier le comportement d'un polynôme en l'infini, on va donc uniquement étudier le monôme de plus haut degré.

  ![](https://i.imgur.com/usfhzb1.png)

  <ins>Exemple</ins>:  
  La limite de *-x² + x* quand x tend vers plus l'infini est la limite de *-x²*,  
  qui est -∞ (puisque le degré est pair, et le coefficient négatif)

  $$
  f(x) = -x^2 + x \\[10pt]

  \lim_{x \to +\infty} f(x) = -\infty \\
  \lim_{x \to -\infty} f(x) = -\infty
  $$

## Propriétés des limites

* Globalement, les règles algébriques habituelles s'appliquent — positif et positif s'additionnent, positif fois négatif égal négatif.  
  Dans quatre cas, les théorèmes d'opérations ne permettent pas de conclure.  
  On dit alors qu'on a une *forme indéterminée*.  
  On retient souvent cas sous la forme "∞ - ∞", "0 × ∞", "∞ / ∞", "0 / 0"

  ![](https://i.imgur.com/MAkBG2F.png)

<!--
![](https://i.imgur.com/hBeigNH.png)
-->

## Théorème de composition

* Une *composée de deux fonctions* consiste à appliquer une fonction sur une autre.   
  On dit que la fonction *f*, définie par *f(x) = v(u(x))* est la composée de *u* suivie de *v*, et notée *f = v ○ u*
  
  <ins>Exemple</ins>:  
  La fonction $$f(x) = \sqrt{-2x + 4}$$ définie sur ]-∞; 2] s'obtient en appliquant à *x* la fonction *u: x ↦ -2x + 4* suivie de la fonction racine carrée *v: √x*. On a donc *f(x) = v(u(x))*, également noté *f = v ○ u*.

* La limite de la composée est le résultat obtenu après avoir appliqué successivement les différentes fonctions.  

  $$
  \text{Si } \lim_{x \to a} = \beta \text{ et } \lim_{x \to \beta} = \delta \text{ alors } \lim_{x \to a} f(x) = \delta
  $$

  <ins>Exemple</ins>:  
  On s'interesse à la limite de $$f(x) = \sqrt{-2x + 4}$$ quand *x* tend vers −∞.  
  Si *x* tend vers −∞, alors *u(x) = -2x + 4* tend vers -∞.  
  Et si *u* tend vers −∞, alors *v(√u)* tend vers +∞.

  ![](https://i.imgur.com/9bgDWw4.png)

## Théorème de comparaison

* Soit *f* et *g*, deux fonctions définies sur un intervalle ]𝜆; +∞[,  
  si *f(x)* est supérieur ou égal à *g(x)*,  
  et que *g(x)* a pour limite +∞ quand *x* tend vers +∞, alors *f(x)* a également pour limite +∞

  $$
  \begin{align}
  \; & \text{Si } f(x) \lt g(x) \\[5pt]
  \; & \text{et } \lim_{x \to +\infty} f(x) = +\infty \\[5pt]
  \; & \text{alors } \lim_{x \to +\infty} g(x) = +\infty
  \end{align}
  $$

## Théorème des gendarmes

* Soit *f*, *g* et *h*, trois fonctions telles que *f(x) ≤ g(x) ≤ h(x)* sur un intervalle ]𝜆; +∞[,  
  si la limite de *f* est égale à la limite de *h*,  
  alors la limite de *g* est également égale à la limite de *f* et *h*.

  $$
  \begin{align}
  \; & \text{Si } \lim_{x \to +\infty} f(x) = \lim_{x \to +\infty} h(x) = l \\[5pt]
  \; & \text{alors } \lim_{x \to +\infty} g(x) = l
  \end{align}
  $$

  ![](https://i.imgur.com/d7gonk0.png)

## Croissance comparée

* Pour tout entier naturel *n* non-nul, e<sup>x</sup> "écrase" x<sup>n</sup>, c'est à dire que

  $$
  \begin{align}
  \lim_{x \to +\infty} \frac{e^x}{x^n} &= +\infty \\[10pt]
  \lim_{x \to +\infty} x^n e^{-x} &= 0 \\
  \end{align}
  $$

  ![](https://i.imgur.com/SJYWqPk.png)

## Convergence & divergence

* Lorsqu'une suite (U<sub>n</sub>)<sub>𝑛 ∈ ℕ</sub> a pour limite le réel *l* quand *n* tend vers +∞,  
  on dit que la suite *converge* vers *l*.

* Certaines suites n'ont pas de limite, comme les suites de terme général (-1)<sup>n</sup>, (-3)<sup>n</sup>, sin(n), cos(n).  
  On dit que ces suites *divergent*.