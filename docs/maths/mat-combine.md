---
title: Analyse combinatoire — Dénombrement
category: Maths
latex: true
---

Ensemble de théorèmes mathématiques qui permettent de calculer le nombre total de possibilités.

## Permutation (ensemble ordonné)

* Une permutation est une liste ordonnée comportant N objets sans répétition

* Le nombre de permutations d'un ensemble de n objets est le nombre n! (factorielle n).  
  Autrement dit, il y a n! manières d'ordonner n objets différents.

  $$
  P^N_N = N!
  $$

  <pre>
  Ex: Combien de "mots" de 4 lettres peut-on écrire avec des lettres du mot ABCD?

  4! = 4*3*2*1 = 24

  Combien peut-on former d’anagrammes du mot EXERCICE ?
  On compte le nombre de permutations possibles pour 8 lettres (8!), et on retranche les duplicats à cause de la lettre E (3!) et de la lettre C (2!)

  8! / (3! 2!) = 8*7*6*5*4 / 2 = 3360
  </pre>

* La formule de Stirling permet d'évaluer l'ordre de grandeur de n! sans en faire le calcul — c'est utile pour les grands nombre puisque n! croît très vite

  $$
  n! \sim \left(\frac{n}{e}\right)^n \sqrt{2\pi n} \text{ quand } n \to \infty
  $$

## P-uplet (ensemble ordonné, avec répétition)

* On fait un tirage, avec remise, de k jetons et on note le nombre obtenu (parmi N possibilités).  
  Cela signifie que l'on tient compte de l'ordre des chiffres tirés et qu'il y a une répétition possible de ces chiffres (on tire chaque jeton l'un après l'autre et on remet le jeton à chaque fois)

* Ensembles ordonnés (k objets parmis N), avec répétitions autorisées:  

  $$
  N^k
  $$

  <pre>
  Ex: On tire 3 fois à un dé de 10. Combien de jeux différents peut-on obtenir?
  On a toujours 10 possibilités à chaque tir, on a donc 10*10*10 possibilités (10**3)

  10<sup>3</sup> = 10*10*10 = 1000
  </pre>

  <pre>
  Ex:  
  Une urne contient 10 boules numérotées.  
  On tire successivement boules 3 en remettant la boule dans l'urne à chaque fois.  
  Quel est le nombre de tirages possible?

  10<sup>3</sup> = 10*10*10 = 1000
  </pre>

## Arrangement (ensemble ordonné, sans répétition)

* Un p-uplet d'éléments distincts est appelé un arrangement.

* On fait un tirage, sans remise, de k jetons et on note le nombre obtenu.
  Cela signifie que l'on tient toujours compte de l'ordre des chiffres mais qu'il n'y a plus de répétitions.

* Ensembles ordonnés (k objets parmis N), répétitions non autorisées:  
  Il y a A<sup>k</sup><sub>n</sub> manières d'ordonner k objets différents pris parmi n.

  $$
  _N A_k \equiv A^k_N \equiv A_{N,k} = \frac{N!}{(N - k)!}
  $$

  Note: N!/(N-k)! revient à prendre k éléments à partir de N!. Par exemple A(99,3) = 99!/(99-3)! = 99*98*97

  <pre>
  Ex: 
  Une urne contient 10 boules numérotées.  
  On tire successivement boules 3 sans remettre la boule dans l'urne.  
  Quel est le nombre de tirages possible?
  On a 10 possibilités au premier tir, 9 au deuxième et 8 au troisième: on a donc 10*9*8 possibilités (10!/(10-3)!)

  A<sub>10,3</sub> = 10!/(10-3)! = 10*9*8 = 720
  </pre>

  <pre>
  Ex: Combien de plaques d'immatriculation sur 6 chiffres peut-on créer?

  A<sub>9,6</sub> = 9!/(9-6)! = 60480
  </pre>

## Combinaison sans répétition (ensemble non ordonné)

* On tire k jetons simultanément. Il n'y a donc pas de répétitions possibles et on ne tient plus compte de l'ordre des chiffres car le tirage est simultané, on se retrouve avec les jetons "dans la main" sans notion d'ordre.

* Ensembles non-ordonnés (k objets parmis N), répétitions non autorisées:  
  Il y a C<sup>k</sup><sub>n</sub> manières de choisir p objets différents pris parmi n.

  $$
  _N C_k \equiv C^k_N \equiv C_{N,k} \equiv \binom{N}{k} = \frac{N!}{k!(N - k)!}
  $$

  <pre>
  Ex: On tire simultanément 3 cartes dans un paquet de 10 cartes (= non ordonné, sans remise et sans répétition).  
  Combien de mains différentes sont possibles?

  10!/(10-3)!3! = (10*9*8)/(3*2) = 10*3*4 = 10*12 = 120
  </pre>

  <pre>
  Ex: On tire 6 cartes dans un paquet de 52 cartes.  
  Combien de mains différentes sont possibles?

  C<sub>52,6</sub>
  = (52!)/((52 - 6)! 6!)
  = (52*51*50*49*48*47)/(6*5*4*3*2)
  = 20 358 520
  </pre>

  [Mathsolver](https://mathsolver.microsoft.com/en/solve-problem/%60frac%7B%2032%20!%20%20%20%20%7D%7B%20(32-4)%20!%20%204%20!%20%20%20%20%7D)

## Combinaison avec répétition (ensemble non ordonné)

* Ensembles non-ordonnés (k objets parmis N), avec répétitions autorisées:

  $$
  _N U_n \equiv \binom{k + (N - 1)}{N - 1} = \frac{(k + N - 1)!}{k! (N-1)!}
  $$

  <pre>
  Ex: On a 10 pièces de 1€ que l'on veut distribuer parmis 4 personnes.  
  Combien de combinaisons différentes sont possibles?

  C<sub>(10+(4-1)),(4-1)</sub> = C<sub>13,3</sub> = 286
  </pre>

[Exercises](https://www.annales2maths.com/terminale-specialite-mathematiques-denombrement-2/)