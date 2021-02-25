---
title: Nombres premiers
category: Maths, Arithmétique
---

Concepts: premier, composé, PPCM, PGCD

## Nombres premiers

* Un *nombre premier* est un nombre qui a exactement 2 diviseurs: 1 et lui-même.  
  Ex: 7 est premier, il n'est divisible que par 1 et 7.

  Un *nombre composé* est un nombre qui a plus de 2 diviseurs.  
  Ex: 16 est composé, il est divisible par 1, 2, 4, 8 et 16.

  1 est ni premier ni composé (il n'est divisible que par 1).

  ![](https://i.imgur.com/4eofOvj.png)

### Plus Petit Commun Multiple (PPCM)

* Le PPCM de 2 nombres ou plus est le plus petit multiple commun à tous ces nombres.  
  Pour le trouver on peut

  1. Lister les multiples des nombres, garder le premier qui est commun à tous

      ```
      Trouver le PPCM de 15, 6 et 10

      Multiples de 15: 15, 30,
      Multiples de  6:  6, 12, 18, 24, 30
      Multiples de 10: 10, 20, 30

      PPCM(15, 6, 10) = 30
      ```

  2. Décomposer les différents nombres en facteurs de nombres premier, puis multiplier les facteurs communs par les facteurs non communs

      ```
      Trouver le PPCM de 15, 6 et 10

      15 = 3 × 5
       6 = 3 × 2
      10 = 2 × 5

      Facteurs non communs: 3, 5, 2
      PPCM(15, 6, 10) = 3×2×5 = 30
      ```

      ```
      Trouver le PPCM de 12 et 20

      12 = 2 × 2 × 3
      20 = 2 × 2 × 5

      Facteurs communs: 2, 2
      Facteurs non communs: 3, 5
      PPCM(12, 20) = 2×2×3×5 = 60
      ```

      <details>
      <summary>Plus d'exemples</summary>

      <pre>
      Trouver le PPCM de 9 et 24

       9 = 3 × 3
      24 = 2 × 3 × 4

      Facteurs communs: 3
      Facteurs non communs: 3, 2, 4
      PPCM(9, 24) = 3×3×2×4 = 72
      </pre>

      <pre>
      Trouver le PPCM de 18 et 12

      18 = 3 × 2 × 3
      12 = 2 × 2 × 3

      Facteurs communs: 2, 3
      Facteurs non communs: 3, 2
      PPCM(18, 12) = 2×3×3×2 = 36
      </pre>
      </details>

<ins>Exemple</ins>:

```
Ronald et Tim ont fait leur lessive aujourd'hui.  
Or Ronald fait sa lessive tous les 6 jours et Tim tous les 9 jours.  
Combien de jours se passera-t-il avant que Ronald et Tim ne refassent leur lessive le même jour?

Multiples de 6: 12, 18
Multiples de 9: 18
PPCM(6, 9) = 18

Il se passera 18 jours avant qu'ils ne refassent leur lessive le même jour.
```

Si on connait deux diviseurs d'un nombre, alors on peut utiliser la décomposition en facteurs premier du PPCM pour déterminer des diviseurs additionnels.

```
Tous les nombres divisibles par 9 et 24 sont aussi disibibles par?

 9: 3 × 3
24: 2 × 2 × 2 × 3

PPCM(9, 24) = 3×3×2×2×2
Réponse: 2, 3, 3×3 (9), 3×2 (6), 2×2 (4), 3×3×2 (18), 3×2×2 (12), 2×2×2 (8)
```

### Plus Grand Common Diviseur (PGCD)

* Le PGCD est le plus grand nombre par lequel ont peut diviser deux nombres donnés.  
  Pour le trouver on peut

  1. Lister les diviseurs des nombres, garder le dernier qui est commun à tous

      ```
      Trouver le PGCD de 10 et 7

      10: 1, 2, 5, 10
       7: 1, 7

      PGCD(10, 7) = 1
      ```

      ```
      Trouver le PGCD de 21 et 30

      21: 1, 3, 7, 21
      30: 1, 2, 3, 5, 6, 10, 15, 30

      PGCD(21, 30) = 3
      ```

  2. Décomposer les différents nombres en facteurs de nombres premiers, puis multiplier tous les facteurs communs entre eux.

      ```
      Trouver le PGCD de 21 et 30

      21: 3 × 7
      30: 2 × 3 × 5

      PGCD(21, 30) = 3
      ```

      ```
      Trouver le PGCD de 105 et 30

      105: 5 × 3 × 7
       30: 2 × 3 × 5

      PGCD(105, 30) = 3×5 = 15
      ```

<ins>Exemple</ins>:

```
Alice a 63 plants de tomate et 81 plant de rhubarbe.  
Elle voudrait mettre ces plants en rangées de sorte que chaque rangée
ait toujours le même nombre de plants de tomate et de plants de rhubarbe.

Quel est le plus grand nombre de rangées qu'Alice peut planter?  
Combien de plants de tomate et de rhubarbe y aura-t-il par rangée?

63 = 3 × 3 × 7
81 = 3 × 3 × 3 × 3
PGCD(63, 81) = 3×3 = 9

Elle peut planter au maximum 9 rangées.  
Chaque rangée aura 7 plants de tomate et (3×3=)9 plants de rhubarbe.
```