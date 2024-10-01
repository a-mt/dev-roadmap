---
title: Dérivation
category: Maths, Algèbre
latex: true
---

## Vitesse instantannée

* Bob se rend au stade et parcourt 3720 mètres en 12min 37sec (= 757sec).  
  La vitesse moyenne de Bob est donc de 3720m/757s = 4,9m/s.

  Sa vitesse à un instant *t* serait égale à sa vitesse moyenne si le trajet avait était effectué à un rythme constant, mais le trajet a été marqué par des changements de rythme: il a d'abord rejoint l'arrêt de bus à pied, a attendu le bus, le bus s'est arrếté aux feux rouges et aux arrêts de bus sur le chemin, et Bob a fini le chemin à pied.

  ![](https://i.imgur.com/e5xJLc5l.png)

* Si on considère t1 et t2, deux instants différents: plus l'intervalle de temps diminue, plus la vitesse moyenne colle à la trajectoire.
  Éventuellement, lorsque l'intervalle de temps devient infinitésimal (tellement petit qu'on le considére comme négligeable), le vecteur vitesse devient tangent à la courbe. Il s'agit alors de la *vitesse instantannée* (aussi appelé le *taux d'accroissement*).

  ![](https://i.imgur.com/Z5sc4gnm.png)
  ![](https://i.imgur.com/iyKw4gAm.png)

* La vitesse instantanée est le cas limite de la vitesse moyenne pour un intervalle de temps tendant vers 0.  
  On peut approcher la vitesse instantannée en calculant la vitesse moyenne sur un intervalle de temps le plus petit possible.

  ![](https://i.imgur.com/ASMbfYH.png)

## Nombre dérivé

* La pente qui représente la courbe au moment *t* est la droite tangente à la courbe.  
  Plus la pente est abrupte, plus la vitesse est grande.

  ![](https://i.imgur.com/ENf1ZOY.png)
 
* Le coefficient directeur de cette pente est ce qu'on appelle le *nombre dérivé* de la fonction en ce point.  
  Le nombre dérivé de *f* en *a* se note *f'(a)* et se lit f prime de a.  
  Dans le langage courant on peut simplement dire "la dérivée de..."

  <ins>Exemple 1</ins>:  
  On a tracé la courbe représentative d'une fonction f et ses tangentes A, B et C.  
  Lire graphiquement f'(-2), f'(1) et f'(3).

  ![](https://i.imgur.com/WScUHoz.png)

  On lit graphiquement que f'(2) = 2, f'(1) = -1 et f'(3) = 0

  <ins>Exemple 2</ins>:  
  Supposons que la fonction f(x) représente la température de votre café en degrés Fahrenheit en fonction du temps en minutes x. Interpréter les équations suivantes:

  1. f(0) = 140  
     Au temps 0, la température était de 140°

  2. f(10) - f(0) = -20  
     La température a diminué de 20° entre le temps 0 et 10 minutes

  3. (f(10) - f(0))/10 = -2  
     La température a diminué en moyenne de 2° par minute entre le temps 0 et 10 minutes

  4. f'(15) = -0.5  
     A exactement 15 minutes, la température diminuait à un rythme de 0.5° par minute

  <ins>Exemple 3</ins>:  
  Soit G(x) = -5x + 2. Déterminer la dérivée de G.  
  G est une fonction affine et le coefficient directeur de sa droite représentative est -5, donc pour tout x, G'(x) = -5

## Définition mathématique

* Formellement, la définition du nombre dérivé de la fonction f en a, noté f'(a), est

  $$
  \begin{aligned}
  f'(a) &= \lim_{h \to a} \frac{f(h) - f(a)}{h - a} \\
  &= \lim_{h \to 0} \frac{f(a + h) - f(a)}{h}
  \end{aligned}
  $$

  si cette limite existe.

* f(x) est différentiable en *x = a* si la limite en *a* existe.  
  La dérivée en *a* peut donc ne pas exister

  - si f(x) n'existe pas

    ![](https://i.imgur.com/lFqt46g.png)

  - si f(x) a un changement abrupte (un coin) — la limite à gauche est différente de la limite à droite

    ![](https://i.imgur.com/nihPvPx.png)

  - si f(x) est discontinue

    ![](https://i.imgur.com/QLZ7CKd.png)

  - si la tangente est verticale — la limite est l'infini

    ![](https://i.imgur.com/0thh8qX.png)

* <ins>Exemple</ins>:  
  Trouver la dérivée de f(x) = $$\frac{1}{\sqrt{3 - x}}$$ en x = -1

  $$
  \begin{aligned}
  f'(-1) &= \lim_{h \to 0} \frac{f(-1 + h) - f(-1)}{h} \\
  &= \lim_{h \to 0} \frac{\frac{1}{\sqrt{3 - (-1 + h)}} - \frac{1}{\sqrt{3 - (-1)}}}{h}
  = \lim \frac{\frac{1}{\sqrt{4 - h}} - \frac{1}{\sqrt{4}}}{h}
  = \lim \frac{\frac{2}{2 \sqrt{4 - h}} - \frac{\sqrt{4 - h}}{2 \sqrt{4 - h}}}{h}
  = \lim \frac{\frac{2 - \sqrt{4 - h}}{2 \sqrt{4 - h}}}{h} \\
  \\
  &= \lim_{h \to 0} \frac{2 - \sqrt{4 - h}}{2 \sqrt{4 - h}} \times \frac{1}{h}
  = \lim \frac{2 - \sqrt{4 - h}}{2h \sqrt{4 - h}} \times \frac{2 + \sqrt{4 - h}}{2 + \sqrt{4 -h}} \\
  \\
  &= \lim_{h \to 0} \frac{2^2 - (\sqrt{4 - h})^2}{2h \sqrt{4 - h}} \times \frac{1}{2 + \sqrt{4 - h}}
  = \lim \frac{4 - 4 + h}{2h \sqrt{4 - h}} \times \cdots
  = \lim \frac{1}{2 \sqrt{4 - h}} \times \cdots \\
  \\
  =& \lim_{h \to 0} \frac{1}{(2 \sqrt{4 - h})(2 + \sqrt{4 - h})}
  = \frac{1}{(2 \sqrt{4})(2 + \sqrt{4})}
  = \frac{1}{(2 \times 2)(2 + 2)}
  = \frac{1}{4 \times 4}
  = \frac{1}{16} \\
  \end{aligned}
  $$

  Effectuer le calcul de la dérivée à partir de la définition demande beaucoup de calculs.  
  Il existe des raccourcis pour calculer la dérivée sans avoir recours à la définition

### Notation de Lagrange

* La notation $$f'$$ pour désigner la dérivée de la fonction *f* est due au mathématicien français Lagrange (1736 - 1813).
  Si *y = f(x)*, on peut désigner la dérivée de *f* par *y'*.  
  Cette notation est la plus usuelle et la plus simple si la fonction étudiée est une fonction d'une seule variable.

  Si par exemple f(x) = 3x² + 4x - 5, on peut écrire que f'(x) = (3x² + 4x - 5)'

### Notation de Leibniz

* La notation $$\frac{d}{dx} f(x)$$ pour désigner la dérivée de la fonction *f* est due au philosophe et mathématicien allemand Leibniz (1646 - 1716).
  Si *y = f(x)*, on peut désigner la dérivée de *f* par *dy/dx*.  
  Le symbole *d/dx* donne la précision qu'il s'agit de la dérivée par rapport à *x*. C'est la notation qu'il faut obligatoirement utiliser si la fonction étudiée est une fonction de plusieurs variables.

  Par exemple, si f est la fonction qui à tout x réel fait correspondre son carré x², la dérivée de f peut s'écrire *d/dx(x²)*

### Notation de Newton

* La notation $$\dot{f}$$ est due au mathématicien, physicien et astronome anglais Newton (1642 - 1727).  
  Elle est surtout utilisée en physique.

---

## Dérivée et sens de variation d'une fonction

* S'il n'y a pas de pente (le taux d'accroissement est un plateau), le nombre dérivé de f en a est nul (= 0).  
  Si la pente est positive, la dérivée est positive (> 0).  
  Et si la pente est négative, la dérivée est négative (< 0).

  ![](https://i.imgur.com/FzqbBtT.png)

  <ins>Exemple</ins>:  
  On peut considérer la dérivée comme une fonction elle-même: on trace une fonction f et, pour tout point, sa dérivée f'.  
  - Entre ]-∞; -2[, la fonction f décroit: la dérivée est donc négative (< 0).  
  - Au point 2, on a un changement de direction: la dérivée est donc nulle (= 0).  
  - Entre ]-2; -2[, la fonction f croit: la dérivée est donc positive (> 0).

  ![](https://i.imgur.com/cneXEqb.png)

## Continuité

* Une fonction définie sur un intervalle 𝐼 est continue sur 𝐼 si sa courbe représentative ne présente aucune rupture (on peut la tracer sans lever le crayon de la feuille). Les fonctions usuelles (affines, carré, inverse, racine carrée, valeur absolue) sont continues sur tout intervalle inclus dans leur ensemble de définition.

  ![](https://i.imgur.com/BIm7iU4.png)

* Une fonction dérivable sur un intervalle 𝐼 est nécessairement continue sur 𝐼. Mais une fonction continue n'est pas forcemment dérivable. Par exemple, la fonction raciné carré est continue sur [0; +∞[ mais n'est pas dérivable en 0.

* Si la fonction est discontinue à cause d'un seul point, on dit qu'elle est *régularisable*. On dit aussi qu'on peut "prolonger la fonction par continuité".

  ![](https://i.imgur.com/pj0oAt7.png)

## Tableau de variation

* Le calcul de la dérivée permet d'obtenir le tableau de variation d'une fonction

  <ins>Exemple</ins>:

  ![](https://i.imgur.com/ILqcOI7.png)

* Pour trouver chaque extremum local d'une fonction, il faut 1. déterminer les points pour lesquels sa dérivée s'annule, 2. qu'en ce point se produise un changement de variation (donc un changement de signe de la dérivée).

  ![](https://i.imgur.com/lddzRfs.png)

* Une flèche dans le tableau des variations d'une fonction *f* indique que la fonction est strictement monotone sur cet intervalle (autrement dit, elle est strictement croissante ou décroissante), ainsi que sa continuité sur cet intervalle.

  <ins>Exemple</ins>:  
  Soit f une fonction définie sur l'intervalle [-2; 1] par f(x) = 2x³ + 3x² - 2.  
  Sa dérivée est f'(x) = 6x² + 6x pour x ∈ ℝ.  
  On a donc f'(x) = x(6x + 6) et f'(x) = 0 a deux solutions: x = 0 ou x = -1.  
  On en déduit le tableau suivant:

  ![](https://i.imgur.com/egE2UF1.png)

* Pour localiser les solutions de l'équation f(x) = k, on s'aide du tableau de variations.  
  On examine chaque intervalle pour regarder si *k* est compris entre les valeurs extrêmes prises par *f* sur cet intervalle.

  <ins>Exemple</ins>:

  ![](https://i.imgur.com/vDzO554.png)

  Sur [0; 1], c'est d'une part la continuité de *f* qui assure que pour paser de -2 à 3, *f* prend bien la valeur 1; et d'autre part la stricte monotomie de *f* qui fait qu'elle ne prend la valeur 1 qu'une seule fois.

## Théorème des valeurs intermédiaires

* Si la fonction *f* est continue sur [a; b], alors *f* prend au moins une fois  
  toute valeur comprise entre *f(a)* et *f(b)*

  <ins>Exemple</ins>:

  ![](https://i.imgur.com/sewtIpHl.png)

---

## Règles de dérivation

* Jusqu'à présent, on utilisé la définition la dérivée (le calcul avec la limite) pour calculer la dérivée. Mais on peut aller plus vite on utilisant des "règles de différenciation" qui permettent de trouver des dérivées sans utiliser directement la définition

### Dérivée d'une constante (k)

* Si 𝑓(𝑥) = 𝑘 avec 𝑘 ∈ ℝ,  
  alors 𝑓 est dérivable sur ℝ avec 𝑓 ′(𝑥) = 0

  $$
  \frac{d}{dx}[c] = 0
  $$

  <details>
  <summary>Démonstration</summary>

  <img src="https://i.imgur.com/YZGP9Ze.png" />
  </details>

  <ins>Exemple</ins>:  
  Soit 𝑓(𝑥) = 5. Calculer la dérivée

  $$
  f'(x) = 0
  $$

### Dérivée du produit (x<sup>n</sup>)

* Si 𝑓(𝑥) = 𝑥<sup>𝑛</sup> (𝑛 entier, 𝑛 ≥ 1) sur ℝ,  
 alors 𝑓 est dérivable sur ℝ avec 𝑓′(𝑥) = 𝑛𝑥 <sup>𝑛−1</sup>.

  <!--
  - pour 𝑓(𝑥) = 𝑥, 𝑓′(𝑥) = 1
  - pour 𝑓(𝑥) = 𝑥², 𝑓 ′(𝑥) = 2𝑥
  - pour 𝑓(𝑥) = 1/𝑥 = x<sup>-1</sup>, 𝑓 ′(𝑥) = -1/𝑥²
  - pour 𝑓(𝑥) = √𝑥 = x<sup>1/2</sup>𝑓′(𝑥) = 1/2√𝑥
  -->

  $$
  \begin{align}
  \frac{d}{dx}[x^n] &= nx^{n-1} \\
  \\
  \text{Qui a } & \text{également pour conséquence que:} \\
  \frac{d}{dx}[x] &= 1 \\
  \frac{d}{dx}[x^2] &= 2x \\
  \frac{d}{dx}[\frac{1}{x}] &= \frac{d}{dx}[x^{-1}] = -1x^{-2} = \frac{-1}{x^2} \\
  \frac{d}{dx}[\sqrt{x}] &= \frac{d}{dx}[x^{1/2}] = \frac{1}{2} x^{-1/2} = \frac{1}{2} \frac{1}{x^{1/2}} = \frac{1}{2 \sqrt{x}}
  \end{align}
  $$

  <details>
  <summary>Démonstration</summary>

  <img src="https://i.imgur.com/MUCX8O0.png" />
  </details>

  <ins>Exemple</ins>:  
  Trouver les dérivées des fonctions suivantes:

  1.  

      $$
      \begin{align}
      y &= x^{15} \\

      \frac{dy}{dx} &= 15x^{14}
      \end{align}
      $$

  2.  

      $$
      \begin{align}
      f(x) &= \sqrt[3]{x} \\

      f'(x) &= \frac{1}{3}x^{-\frac{2}{3}} \\
      &= \frac{1}{3x^{2/3}}
      \end{align}
      $$

  3.  

      $$
      \begin{align}
      g(x) &= \frac{1}{x^{37}} \\

      g'(x) &= -3.7x^{-4.7} \\
      &= \frac{3.7}{x^{4.7}}
      \end{align}
      $$

### Dérivée du produit par un réel (ku)

* Si 𝑓(𝑥) = 𝜆𝑢(𝑥) avec 𝑢 une fonction dérivable sur 𝐷 et 𝜆 ∈ ℝ,  
  alors 𝑓 est dérivable sur 𝐷 avec 𝑓′(𝑥) = 𝜆𝑢′(𝑥)

  $$
  \frac{dy}{dx}[\lambda u] = \lambda u'
  $$

  <ins>Exemple</ins>:  
  Soit 𝑓(𝑥) = 5𝑥³, calculer la dérivée

  $$
  \begin{align}
  \frac{dy}{dx} &= 5 \times 3x^2 \\
  &= 15x^2
  \end{align}
  $$

### Dérivée de la fonction puissance (u<sup>n</sup>)

* Si 𝑓(𝑥) = 𝑢(𝑥)<sup>𝑛</sup> (𝑛 entier, 𝑛 ≥ 1) avec 𝑢 une fonction dérivable sur 𝐷,  
  alors 𝑓 est dérivable sur 𝐷 avec 𝑓′(𝑥) = -𝑛𝑢′(𝑥)𝑢<sup>𝑛 - 1</sup>

  $$
  \frac{dy}{dx}[u^{n}] = nu^{n-1}u'
  $$

  <ins>Exemple</ins>:

  $$
  \begin{align}
  f(x) &= \frac{1}{\sqrt{3-x}} \\
  &= ((3-x)^{1/2})^{-1} \\
  &= (3-x)^{-1/2} \\
  \\
  f'(x) &= -\frac{1}{2} (3 - x)^{-3/2} \times (3 - x)'\\
        &= -\frac{1}{2} \frac{1}{(3 -x)^{3/2}} \times -1 \\
        &= \frac{1}{2(3 - x)^{3/2}}\\
  \\
  \text{Trouver } & \text{la dérivée de f(x) en x = -1} \\
  f'(-1) &= \frac{1}{2(3 - (-1))^{3/2}} \\
        &= \frac{1}{2 \times 4^{3/2}} = \frac{1}{2 \times 8} = \frac{1}{16}
  \end{align}
  $$

### Dérivée de la somme de deux fonctions (u + v)

* Si 𝑓(𝑥) = 𝑢(𝑥) + 𝑣(𝑥) avec 𝑢 et 𝑣 deux fonctions dérivables sur 𝐷,  
  alors 𝑓 est dérivable sur 𝐷 avec 𝑓′(𝑥) = 𝑢′(𝑥) + 𝑣′(𝑥)

  $$
  \frac{dy}{dx}[u + v] = u' + v'
  $$

  <ins>Exemple 1</ins>:  
  Soit 𝑓(𝑥) = 𝑥² + 𝑥 sur ℝ. Calculer la dérivée.  

  $$
  f'(x) = 2x + 1
  $$
 
  <ins>Exemple 2</ins>:  
  Soit 𝑓(𝑥) = −3𝑥<sup>4</sup> + 2𝑥<sup>3</sup> − 5𝑥 + 6 sur ℝ.  Calculer la dérivée.

  $$
  \begin{align}
  f'(x) &= -3(4 x^{3}) + 2(3 x^{2}) -5(1) + 0 \\
  &= -12 x^3 + 6 x^{2} - 5
  \end{align}
  $$

### Dérivée du produit de deux fonctions (u * v)

* Si 𝑓(𝑥) = 𝑢(𝑥) × 𝑣(𝑥) avec 𝑢 et 𝑣 deux fonctions dérivables sur 𝐷,  
  alors 𝑓 est dérivable sur 𝐷 avec 𝑓′(𝑥) = 𝑢′(𝑥)𝑣(𝑥) + 𝑢(𝑥)𝑣′(𝑥)

  $$
  \frac{dy}{dx}[u \times v] = u' v + u v'
  $$

  <ins>Exemple</ins>:  
  Soit 𝑓(𝑥) = (2𝑥 + 1)√𝑥 sur ℝ+.

  $$
  \begin{align}
  u′(x) &= 2  \\
  v′(x) &= \frac{1}{2 \sqrt{x}} \\
  \\
  f'(x) &= 2 \sqrt{x} + (2x + 1)\frac{1}{2 \sqrt{x}} \\
  &= \frac{2 \sqrt{x} \times 2 \sqrt{x}}{2 \sqrt{x}} + \frac{2x + 1}{2 \sqrt{x}} \\
  &= \frac{4x + 2 - 1}{2 \sqrt{x}} \\
  &= \frac{4x - 1}{2 \sqrt{x}}
  \end{align}
  $$

### Dérivée du quotient de deux fonctions (u / v)

* Si 𝑓(𝑥) = 𝑢(𝑥)/𝑣(𝑥) avec 𝑢 et 𝑣 deux fonctions dérivables sur 𝐷 et 𝑣(𝑥) ≠ 0 sur 𝐷,  
  alors 𝑓 est dérivable sur 𝐷 avec 𝑓′(𝑥) = (𝑢′(𝑥)𝑣(𝑥) − 𝑢(𝑥)𝑣′(𝑥))/𝑣(𝑥)²

  $$
  \frac{dy}{dx}[u/v] = \frac{u' v - u v'}{v^2}
  $$

  <ins>Exemple</ins>:  
  Soit 𝑓(𝑥) = (−2𝑥 + 1)/(√𝑥 − 1)

  $$
  \begin{align}
  f'(x) &= \frac{-2(\sqrt{x} - 1) - (-2x + 1) \frac{1}{2 \sqrt{x}}}{(\sqrt{x} - 1)^2} \\
  &= \frac{-2(\sqrt{x} - 1) 2 \sqrt{x} - (-2x + 1)}{2 \sqrt{x} (\sqrt{x} - 1)^2} \\
  &= \frac{-4x + 4\sqrt{x} + 2x - 1}{2 \sqrt{x} (\sqrt{x} - 1)^2} \\
  &= \frac{-2x + 4\sqrt{x} - 1}{2 \sqrt{x} (\sqrt{x} - 1)^2}
  \end{align}
  $$

### Dérivée de la fonction inverse (1 / u)

* Si 𝑓(𝑥) = 1/𝑣(𝑥) avec 𝑣 une fonction dérivable sur 𝐷 et 𝑣(𝑥) ≠ 0 sur 𝐷,  
  alors 𝑓 est dérivable sur 𝐷 avec 𝑓′(𝑥) = -𝑣′(𝑥)/𝑣(𝑥)²

  $$
  \frac{dy}{dx}[1/v] = - \frac{v'}{v^2}
  $$

### Dérivée de la fonction racine (√u)

* Si 𝑓(𝑥) = √𝑢(𝑥) avec 𝑢 une fonction dérivable sur 𝐷 et 𝑢(𝑥) ≠ 0 sur 𝐷,  
  alors 𝑓 est dérivable sur 𝐷 avec 𝑓′(𝑥) = -𝑢(𝑥)′/2𝑢(𝑥)

  $$
  \frac{dy}{dx}[\sqrt{u}] = \frac{u'}{2 \sqrt{u}}
  $$

### Dérivée d'une fonction composée

* Soit la fonction 𝑓 définie par 𝑓(𝑥) = 𝑢(𝑎𝑥 + 𝑏) où 𝑢 est une fonction définie et dérivable sur une partie 𝐷 de ℝ et 𝑎, 𝑏 deux constantes réelles. Alors 𝑓 est définie et dérivable pour tout 𝑥 ∈ 𝐷 tel que 𝑎𝑥 + 𝑏 ∈ 𝐷 et 𝑓′(𝑥) = 𝑎×𝑢′(𝑎𝑥 + 𝑏)

  $$
  \frac{dy}{dx}[u(ax + b)] = au'(ax + b)
  $$