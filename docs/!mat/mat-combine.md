---
title: Analyse combinatoire
category: Maths
latex: true
---

Ensemble de théorèmes mathématiques qui permettent de calculer le nombre total de possibilités.

## Permutation

* Permutation de N objets:  
  Il y a n! manières d'ordonner n objets différents.

  $$
  P^N_N = N!
  $$

  <pre>
  Ex: Combien de "mots" peut-on écrire avec des lettres du mot LONG?

  4! = 4*3*2*1 = 24
  </pre>

  La formule de Stirling permet d'évaluer l'ordre de grandeur de n! sans en faire le calcul — c'est utile car n! croît très vite:

  $$
  n! \sim \left(\frac{n}{e}\right)^n \sqrt{2\pi n} \text{ quand } n \to \infty
  $$

## Ensemble ordonné avec répétition (p-uplet)

* Ensembles ordonnés (k objets parmis N), avec répétitions autorisées:  

  $$
  N^k
  $$

  <pre>
  Ex: Tirage avec remise.  
  Une urne contient 10 boules numérotées.  
  On tire successivement boules 3 en remettant la boule dans l'urne à chaque fois.  
  Quel est le nombre de tirages possible?

  10<sup>3</sup> = 10*10*10 = 1000
  </pre>

## Ensemble ordonné sans répétition (arrangement)

* Ensembles ordonnés (k objets parmis N), répétitions non autorisées:  
  Il y a A<sup>k</sup><sub>n</sub> manières d'ordonner k objets différents pris parmi n.

  $$
  _N A_k \equiv A^k_N \equiv A_{N,k} = \frac{N!}{(N - k)!}
  $$

  <pre>
  Ex: Tirage sans remise.  
  Une urne contient 10 boules numérotées.  
  On tire successivement boules 3 sans remettre la boule dans l'urne.  
  Quel est le nombre de tirages possible?

  P<sub>10,3</sub> = 10!/(10-3)! = 10*9*8 = 720
  </pre>

  <pre>
  Ex: Combien de plaques d'immatriculation sur 6 chiffres peut-on créer?

  P<sub>9,6</sub> = 9!/(9-6)! = 60480
  </pre>

## Ensemble non ordonné sans répétition (combinaison)

* Ensembles non-ordonnés (k objets parmis N), répétitions non autorisées:  
  Il y a C<sup>k</sup><sub>n</sub> manères de choisir p objets différents pris parmi n.

  $$
  _N C_k \equiv C^k_N \equiv C_{N,k} \equiv \binom{N}{k} = \frac{N!}{k!(N - k)!}
  $$

  <pre>
  Ex: On tire 6 cartes dans un paquet de 52 cartes.  
  Combien de mains différentes sont possibles?

  C<sub>52,6</sub> = (52!)/((52 - 6)! 6!) = 20358520
  </pre>

## Ensemble non ordonné avec répétition

* Ensembles non-ordonnés (n objets parmis N), avec répétitions autorisées:

  $$
  _N U_n \equiv \binom{n + (N - 1)}{N - 1} = \frac{(n + N - 1)!}{n! (N-1)!}
  $$

  <pre>
  Ex: On a 10 pièces de 1€ que l'on veut distribuer parmis 4 personnes.  
  Combien de combinaisons différentes sont possibles?

  C<sub>(10+(4-1)),(4-1)</sub> = C<sub>13,3</sub> = 286
  </pre>