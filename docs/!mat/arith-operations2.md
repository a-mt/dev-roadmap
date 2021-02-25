---
title: Opérations II
category: Maths, Arithmétique
---

Concepts: exponentiation, puissance, exposant, base, racine, logarithme, factorielle, valeur absolue

## Puissance

* Une *exponentiation* est la répétition d'une multiplication: <code>2×2×2 = 2<sup>3</sup> = 8</code>.  
  a<sup>n</sup> se lit "a puissance n".  
  Sur une calculatrice, on l'écrit a^(n).

  Le résultat d'une exponentiation est une *puissance*.  
  On dit que *n* est l'*exposant*, *a* est la *base* et on calcule une *puissance de a*.

* Tout nombre puissance 0 vaut 1: <code>2<sup>0</sup> = 1</code>  
  Tout nombre puissance 1 se vaut lui-même: <code>2<sup>1</sup> = 2</code>

  ![](https://i.imgur.com/lBDRiFK.png)

* Un exposant 2 se dit *mettre au carré*  
  Ex: 3<sup>2</sup> peut se lire "3 puissance 2", "3 exposant 2" ou "3 au carré".

  Un exposant 3 se dit *mettre au cube*  
  Ex: 2<sup>3</sup> peut se lire "2 puissance 3", "2 exposant 2" ou "2 au cube".

### Exposant négatif

* Si l'exposant est négatif, alors c'est la répétition d'une division.  
  On peut aussi le voir comme la répétition d'une multiplication par l'inverse:

  <pre>
       2<sup>-3</sup> = 1/2<sup>3</sup>
  = 1/2/2/2 = 1 × 1/2 × 1/2 × 1/2 = 1/(2×2×2)
  = 0.125 = 1/8
  </pre>

### Propriétés

* x<sup>-n</sup> est l'inverse de x<sup>n</sup>

  ![](https://i.imgur.com/0XanMBQ.png)

  <ins>Exemples</ins>:

  ![](https://i.imgur.com/H5S6HrD.png)

* Quand on applique un exposant sur un nombre négatif, la règle des signes s'applique et le produit est donc positif si l'exposant est pair, et négatif sinon.

  ![](https://i.imgur.com/YVGxcyM.png?1)

### Écriture scientifique

* 10 puissance *n*, c'est 1 suivit de *n* zéro.  
  Ex: 10<sup>5</sup> = 10×10×10×10×10 = 100 000

  10 puissance *-n*, c'est *n* chiffres après la virgule.  
  Ex: 10<sup>-5</sup> = 1/10/10/10/10/10 = 1/10 000 = 0.000 01

* Pour simplifier la lecture de grands nombres ou de petits nombres, on utilise souvent l'*écriture scientifique*, qui consiste à écrire un nombre sous forme d'entier entre 1 et 10 multiplié par une puissance de 10.

  <pre>
  604000 = 6.04 × 10<sup>5</sup>  
  0.0058 = 5.8 × 10<sup>-3</sup>
  </pre>

  Pour écrire un nombre sous forme scientifique, on déplace la virgule jusqu'à obtenir un nombre décimal avec une partie entière de un chiffre (≠ 0) et on indique le nombre de fois qu'on a déplacé la virgule en exposant de la puissance de 10.

### Règles de calcul

![](https://i.imgur.com/lvaayp6.png)

<ins>Exemple</ins>:

![](https://i.imgur.com/IwnGySi.png)

---

## Racine

* Une *racine* (*radical* en anglais) est l'inverse d'une puissance: on cherche à déterminer quel nombre a été répété *n* fois.

  ![](https://i.imgur.com/xnkgw0M.png)

  On peut l'écrire soit sous forme d'exposant fractionnaire, soit avec le symbole &radic; (racine).  
  Ex: <sup>5</sup>&radic;32 = 32<sup>1/5</sup> = 2

  ![](https://i.imgur.com/iE9IVj4.png)

* La racine carrée (racine 2-ième, inverse de la puissance de 2) est le type de racine le plus utilisé: on cherche à déterminer quel nombre a été multiplié par lui-même. Quand le *n* de la racine n'est pas précisé, il s'agit implicitement d'un 2 — &radic;x = <sup>2</sup>&radic;x = x<sup>1/2</sup>.

  ![](https://i.imgur.com/0WYLqqa.png)

* Une racine paire ne peut pas exister sur un nombre négatif — puisque qu'un nombre positif fois lui-même résulte en un produit positif, et qu'un nombre négatif négatif fois lui-même résulte également en un produit positif. Une racine impaire peut par contre exister sur un nombre négatif.

  ![](https://i.imgur.com/1XjzR26.png)

### Calculer ou simplifier une racine

* Pour trouver la racine d'un nombre, on le décompose en facteurs premiers.

  ![](https://i.imgur.com/NcTyx2A.png)

* Il est possible qu'une racine n'aie pas un résultat entier.  
  Dans ce cas, on se contente de simplifier l'expression au maximum.

  ![](https://i.imgur.com/R0Kl06S.png)

* Si la racine porte sur une fraction, on traite le numérateur et le dénominateur séparemment.  
  Et si le résultat contient une racine au dénominateur, on la ramène généralement au numérateur.

  ![](https://i.imgur.com/jkfvUHZ.png)

---

## Logarithme

* Le *logarithme* est l'autre pièce du puzzle: tandis que la racine cherche la base sachant l'exposant et le total, le logarithme cherche l'exposant sachant la base et le total.

   <pre>
   2<sup>3</sup> = 8
   8<sup>1/3</sup> = 2
   log<sub>2</sub>8 = 3
   </pre>

  Se lit "log base 2 de 8 est égal à 3".

* Le logarithme base 10 est le type de logarithme le plus utilisé:  
  quand la base du logarithme n'est pas précisé, il s'agit implicitement d'un 10.  
  Ex: log1000 = log<sub>10</sub>1000 = 3 (parce que 10³ = 1000)

* Sur une calculatrice, seul le logarithme 10 est disponible.  
Pour trouver la valeur d'un logarithme d'une base différente, on se sert de l'égalité suivante:

  ![](https://i.imgur.com/V8DhI0v.png)

  Ex: log<sub>2</sub>10 = log 10 / log 2

---

## Factorielle

* Une *factorielle* est le produit de tous les entiers inférieurs à un nombre *n*: `5! = 5×4×3×2×1 = 120`  
  Par convention 0! = 1

* La notation factorielle est surtout utilisée en probabilités,  
  pour calculer le nombre de permutations possibles dans un ensemble.

  ``` txt
  Combien de "mots" peut-on écrire avec des lettres du mot LONG?

  4! = 4*3*2*1 = 24
  ```

---

## Valeur absolue

* La *valeur absolue* d'un nombre est sa distance à 0.  
  Autrement dit, on enlève le signe du nombre.

  ![](https://i.imgur.com/1IuVT9U.png)

* La valeur absolue d'un nombre *x* est notée \|x\|.  
  Ex: \|-2 × 45\| = \|-90\| = 90
