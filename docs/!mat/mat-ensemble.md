---
title: Notation
category: Maths
latex: true
---

Concepts: intervalles, ensembles, sous-ensembles, quantificateurs, connecteurs

## Énoncé

* Un *énoncé* est un texte exposant les données qu'on connaît et/ou qu'on doit résoudre / démontrer. Les informations de l'énoncé peuvent être écrites

  * en langage courant  
    Ex: Le carré de tout réel est un réel positif

  * ou en symboles mathématiques.  
    Ex: ∀x ∈ ℝ, x² ≥ 0 (pour tout x appartenant à l'ensemble des réels, le carré de x est supérieur ou égal à 0)

## Intervalles

* Un *intervalle* est un ensemble de valeurs comprises entre deux bornes.  
  Un intervalle peut être

  * *ouvert*: les bornes ne font pas partie de l'intervalle.  
    Ex: ]-1, 4[ désigne les valeurs de -1 à 4, -1 et 4 exclus.

  * *fermé*: les bornes font partie de l'intervalle  
    Ex: [-2, 3] désigne les valeurs de -2 à 3, -2 et 3 inclus.

  * ou *semi-ouvert*: une seule des deux bornes fait partie de l'intervalle.  
    Ex: ]-1, 3] désigne les valeurs de -1 à 3, -1 inclus et 3 exclus.

  <ins>Exemples</ins>:

  ![](https://i.imgur.com/WH7ceAhl.png)

## Ensembles

* Un *ensemble* représente une collection d'objets.

* Les nombres sont classés en différents ensembles en fonction de leurs caractéristiques:

  | Notation     | Ensemble
  |---           |---
  | ℕ            | Naturels (0,1,2,...): servent à dénombrer 
  | ℤ            | Entiers ou relatifs (-2,1,0,...): nombres naturels et leurs opposés
  | ℝ            | Réels (√2, 1.68, π): nombres admettant des chiffres après la virgule<br>ℝ<sup>\*</sup> réels non nuls <br>ℝ<sub>+</sub> réels positifs <br>ℝ<sub>+</sub><sup>\*</sup> réeels strictement positifs
  | ℚ            | Rationnels (1/3,0.2,...): nombres réels pouvant s'exprimer en fraction
  | ℚ'           | Irrationnels (√11,e;,...): nombres réels ne pouvant pas s'exprimer en fraction
  | ⅅ            | Décimaux (3.12,4/7,...): nombres rationnels ayant un nombre fini de chiffres
  | ℂ            | Complexes (ex 1 + 1i): nombres composés d'une partie réelle et imaginaire
  | ∅ ou {}      | Ensemble vide

  ![](https://i.imgur.com/veWrt7q.png)

* Pour définir un ensemble personnalisé, on peut

  * définir la liste des valeurs possibles: E = {1,2,3,4}  
    Les points de suspension peuvent être utilisés pour des ensembles ayant beaucoup d'éléments: {1,2,…,1000}

  * ou définir les bornes de l'ensemble avec un intervalle: E = [0; +∞[  
    La notation [n] est souvent utilisée pour signifier {1,2,…,n}.  

  * ou encore faire un mix des deux  
    Par exemple: {x ∈ [99]: 2|x} signifie tous les éléments pairs de 1 à 99

## Quantificateurs

* Parmis les symboles mathématiques souvent utilisés on trouve les quantificateurs:

  * ∀   : pour tout
  * ∃   : il existe (au moins un)
  * ∃!  : il existe un unique

  <ins>Exemples</ins>:

  * ∀x ∈ ℝ<sup>\*</sup> ∃!y ∈ ℝ<sup>\*</sup> xy = 1  

    Pour tout x réel non nul, il existe un unique réel y non nul tel que le produit xy soit égal à 1.

  * ∀x ∃y (x < y)

    Pour tout x, il existe au moins un y, tel que x est inférieur à y (admet un y différent pour chaque x)

  * ∃y ∀x (x < y)

    Il existe au moins un y, tel que pour tout x, x est inférieur à y (un même y marche avec tous les x)

  * f(x) ≥ f(b) ∀ x ∈ [a,b]  

    f(x) est supérieur ou égal à f(b) pour tout x dans l'intervalle a..b (bornes inclues).

## Connecteurs

* Les connecteurs sont également souvent utilisés:

  * ¬   : négation
  * ∧   : et (conjonction)
  * ∨   : ou (disjonction)
  * ⊻   : ou exclusif
  * \|  : sachant que
  * /   : tel que
  * \   : sauf
  * ⇔ ou ≡ : est équivalent à
  * ⇒   : implique que
  * {}  : l'ensemble des conditions listées doivent être réunies (et)

  <ins>Exemples</ins>:

  * x < 3 ∧ x > 1

    x est compris entre 1 et 3 (1 < x < 3)  
    On pourrait aussi écrire x ∈ ]1; 3[

  * {2n + 1 \| n ∈ ℤ}

    n est un entier impair

  * {y² \| y ∈ ℕ et y ≥ 1}

    y est un carré parfait non nul

  * { x ∈ ℝ / x ∈ ]-1; 4[ }

    x est un nombre réel entre -1 et 4 (bornes exclues).

## Sous-ensembles

* Les symboles des sous-ensembles:

  * ⊂ : sous-ensemble
  * ∩ : intersection
  * ∪ : union

* A ⊂ B  
  A est un *sous-ensemble* de B  
  Tous les éléments de A appartiennent à B.  
  Si A peut être égal à B, on utilise ⊆

  ![](https://i.imgur.com/Dn9Pnrz.png)

* A ∩ B  
  L'*intersection* de A et B  
  Tous les éléments qui sont à la fois dans A et B  
  ∧ est lié à l'intersection: x ∈ A ∧ x ∈ B signifie x ∈ A ∩ B

  ![](https://i.imgur.com/Mfbmlsr.png)

* A ∪ B  
  L'*union* de A et B  
  Tous les éléments qui sont dans A, dans B, ou les deux  
  ∨ est lié à l'union: x ∈ A ∨ x ∈ B signifie x ∈ A ∪ B

  ![](https://i.imgur.com/nqfM5uL.png)

* A ∖ B  
  La *différence* entre A et B  
  Tous les éléments de A qui ne sont pas dans B

  ![](https://i.imgur.com/UwL0MQ9.png)

  Ou alors, la *complémentaire* de B dans A — on exlut un sous-ensemble de A.  
  On peut utiliser A ∖ B ou ∁<sub>A</sub>B. Si A est sans ambiguité, on peut simplement écrire ∁B ou B&#x0305;.

  ![](https://i.imgur.com/4YKDjKo.png)

* A △ B  
  La *différence symétrique* entre A et B  
  Tous les éléments qui sont dans A ou B, mais pas les deux

  ![](https://i.imgur.com/6XeQ3Vm.png)

[Ensembles et sous-ensembles](https://perso.univ-rennes1.fr/laurent.moret-bailly/docpedag/polys/MA2.pdf)
