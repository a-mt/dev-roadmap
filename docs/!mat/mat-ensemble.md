---
title: Ensembles
category: Maths
latex: true
---

## Notation d'un ensemble

* L'ensemble E dont les éléments sont 1,2,3,4 est noté E = {1,2,3,4}

* L'ensemble E dont les éléments sont des entiers naturels est noté E = {x &in; ℕ}. La notation des ensembles les plus courants est:

  | Notation    | Ensemble
  |---          |---
  | &naturals;  | Entiers naturels (ex 1)
  | &integers;  | Entiers relatifs (ex -1)
  | &rationals; | Rationnels (ex 1/3)
  | &reals;     | Réels (ex &radic;2) <br>&reals;<sup>\*</sup> réels non nuls <br>&reals;<sub>+</sub> réels positifs <br>&reals;<sub>+</sub><sup>\*</sup> réeels strictement positifs
  | &complexes; | Complexes (ex 1 + 1i)
  | &empty;     | Ensemble vide

* L'ensemble E dont les éléments sont entre -1 et 1 inclus est noté E = [-1, 1].  
  Si les bornes sont exclues, alors on note E = ]-1, 1[

* La notation [n] est souvent utilisée pour signifier {1,2,...,n}

* On peut également ajouter un pas: tous les éléments pairs de 1 à 99 se note E = {x &in; [99] : 2|x}

## Sous-ensemble

* **Sous-ensemble**: tous les éléments de A sont dans B

  ![](https://i.imgur.com/Dn9Pnrz.png)

  $$
  A \subset B
  $$

  ou (si A peut avoir autant l'élément que B):

  $$
  A \subseteq B
  $$

  <ins>Assertion</ins>:

  $$
  \begin{aligned}
  &  \{x \in E\} \\
  \equiv \ & \{x\} \subset E \\
  \equiv \ & \{x\} \in P(E)
  \end{aligned}
  $$

## Intersection

* **Intersection**: désigne les éléments qui sont à la fois dans A et B

  ![](https://i.imgur.com/Mfbmlsr.png)

  $$
  A \cap B
  $$

  <ins>Assertion</ins>:

  $$
  \{x | x \subset A \text{ et } x \subset B\}
  $$

  $$
  \text{Généralisation pour } A_1 \cup A_2 \cup \ldots \cup A_n: \\

  \{x | \exists i \in \{1,2,\ldots,n\}, x \in A_i \}
  $$

## Union

* **Union**: désigne les élément dans A ou B (ou les deux)

  ![](https://i.imgur.com/nqfM5uL.png)

  $$
  A \cup B
  $$

  <ins>Assertion</ins>:

  $$
  \{x | x \subset A \text{ ou } x \subset B\}
  $$

  $$
  \text{Généralisation pour } A_1 \cap A_2 \cap \ldots \cap A_n: \\

  \{x | \forall i \in \{1,2,\ldots,n\}, x \in A_i \}
  $$

## Complémentaire

* **Complémentaire**: les éléments du sous-ensemble B qui ne sont pas dans A

  ![](https://i.imgur.com/eF5W9bP.png)

  $$
  C_B A
  $$

  Si B est sans ambiguité, on peut simplement écrire A<sup>C</sup>

  <ins>Assertion</ins>:

  $$
  \{x \in B; x \notin A\}
  $$

## Différence

* **Différence**: les éléments de A qui ne sont pas dans B

  ![](https://i.imgur.com/UwL0MQ9.png)

  $$
  A \setminus B
  $$

  <ins>Assertion</ins>:

  $$
  \{x \in B; x \notin A\}
  $$

## Exclusion

* **Exclusion**: les éléments dans A ou B mais pas les deux

  ![](https://i.imgur.com/6XeQ3Vm.png)

  $$
  A \bigtriangleup B \\
  \equiv (A \cup B) \setminus (A \cap B)
  $$

## Quantificateurs

Les assertions contiennent parfois des quantificateurs. Il en existe deux:

| Notation | Nom | Signification
|---       |--- |---
| &forall; | quantificateur universel | quel que soit (= tous)
| &exist;  | quantificateur existentiel | il existe (= un)

<ins>Exemples</ins>:

Pour tout *x*, il existe un *y*  
(permet un *y* différent pour chaque *x*):

$$
\forall x \ \exists y \ Q(x,y)
$$

Il existe un *y* pour tout *x*  
(un même *y* doit marcher avec tous les *x*):

$$
\exists y \ \forall x \ Q(x,y)
$$

## Produit

Si E = F = &reals;, le produit des deux est noté &reals;²:

  $$
  \forall(a,b) \in \mathbb{R}^2 \\
  \exists(x,y,z) \in \mathbb{R}^3
  $$

## Résumé

* &sub; &in;: dans
* &cap; :et
* &cup;: ou (inclusif)
* &bigtriangleup;: ou exclusif
* &bsol;: sauf

[Ensembles et sous-ensembles](https://perso.univ-rennes1.fr/laurent.moret-bailly/docpedag/polys/MA2.pdf)