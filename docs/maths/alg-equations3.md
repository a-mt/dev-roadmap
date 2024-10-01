---
title: Opérations sur les polynômes
category: Maths, Algèbre, Équations
latex: true
---

## Additionner des polynômes

On peut appliquer les applications arithmétiques sur les polynômes simplement en respectant les règles algébriques habituelles: on garde les termes de même degré et même inconnue entre eux.

```
(x³ + 3x - 6) + (-2x² + x - 2) - (3x - 4)

= x³ + 3x - 6 - 2x² + x - 2 - 3x + 4
= x³ - 2x² + x - 4
```

## Soustraire des polynômes

```
(4x²y - 3xy + 25) - (9y²x + 7xy - 20)

= 4x²y - 3xy + 25 - 9y²x - 7xy + 20
= 4x²y - 10xy + 45 - 9y²x
```

## Multiplier deux polynômes

On applique la multiplication en respectant les règles de distribution.

```
(10a - 3)(5a² + 7a - 1)

= 10a(5a² + 7a - 1) - 3(5a² + 7a - 1)
= 50a³ + 70a² - 10a - 15a² - 21a + 3
= 50a³ + 55a² - 31a + 3
```

### Théorème binomial

* Le théorème binomial permet de développer un binome (a + b)<sup>n</sup> très rapidement.

  $$
  (a + b)^n = \sum_{k=0}^n \binom{n}{k} a^{n-k} b^k
  $$

  <ins>Exemple</ins>:

  ![](https://i.imgur.com/E0fk5Epl.png)

### Triangle de Pascal

* Le triangle de Pascal permet de trouver très facilement les coefficients du théorème binomal,  
  sans avoir à les calculer avec une combinaison $$\binom{n}{k}$$.

  ![](https://i.imgur.com/0fFKWHq.png)

  <ins>Exemple 1</ins>:

  ![](https://i.imgur.com/1Xo0Kjg.png)

  <ins>Exemple 2</ins>:

  ![](https://i.imgur.com/mnQ57pN.png)

## Diviser un polynôme par un monôme

Pour la division par un monôme, distribuer la division sur tous les termes.

```
(18x⁴ - 3x² + 6x - 4)/6x

= 18x⁴/6x - 3x²/6x + 6x/6x - 4/6x
= 3x³ - x/2 + 1 - 2/3x
= 3x³ - 0.5x + 1 - (2/3)x⁻¹
```

## Diviser deux polynômes

Pour diviser deux polynômes, poser la division.  
Lorsqu'il n'est plus possible de multipler le diviseur pour obtenir le dividence restant, on a le reste de la division.

<ins>Exemple 1</ins>:

```
(x² + 3x + 6)/(x + 1)

    x² + 3x + 6    |    x + 1
  - x² + x         |    x
  ----------------------------
    0  + 2x + 6    |
  -      2x + 2    |    +2
  ----------------------------
          0 + 4    |  Reste 4

x² + 3x + 6 = (x + 1)(x + 2) + 4
```

<ins>Exemple 2</ins>:

```
    3x³ - 2x² + 7x - 4    |    x² + 1
  - 3x³ + 3x              |    3x
  -----------------------------------
     0  - 2x² + 4x - 4    |
  -       2x² - 2         |    -2
  -----------------------------------
            0 + 4x - 2    |


3x³ - 2x² + 7x - 4 = (x² + 1)(3x - 2) + 4x - 2
```

### Méthode de Horner

Lorsqu'on divise un polynôme par un polynôme du premier degré dont le coefficient directeur est 1,  
on peut utiliser la *division synthétique* (aussi appelé méthode de Horner)

<ins>Le plus simple est d'apprendre par l'exemple</ins>:  
Calculer (3x³ + 4x² - 2x - 1)/(x + 4)

  1. Écrire les coefficients du dividende:  
     3 4 -2 -1  
     Si un terme manque, mettre le coefficient 0

  2. Écrire l'opposé de la constante:  
     -4

  3. Descendre le premier coefficient et le multiplier par la constante:  
     3 × -4 = - 12

  4. Sommer le résultat avec le prochain coefficient:  
     -12 + 4 = -8

  5. Utiliser le résultat et le multiplier par la constante:  
     -8 × -4 = 32

  6. Répéter les étapes 4 et 5:  
     32 + -2 = 30  
     30 × -4 = -120  
     -120 + -1 = -121

  Le quotient est 3x² - 8x + 30 et le reste est - 121.  
  On obtient 3x³ + 4x² - 2x - 1 = (x + 4)(3x² - 8x + 30) - 121

  ![](https://i.imgur.com/boOXwuG.png)

[Vidéo: Méthode de Horner](https://www.youtube.com/watch?v=9vL3D96mueg)  
[Pourquoi ça marche](https://www.youtube.com/watch?v=Ka0dSQvu894)

<ins>Exemple 2</ins>:

![](https://i.imgur.com/SEmG8rFl.png)

### Théorème du reste

* Soit f(x), un polynöme. Si on divise f par x - a (où a appartient à l'ensemble des réels), le reste de la division est f(a)

  <ins>Exemple 1</ins>:

  ```
  (3x³ + 4x² - 2x - 1)/(x + 4)

  f(-4) = 3(-4)³ + 4(-4)² - 2(-4) - 1
        = 3(-64) + 4(16) - 2(-4) - 1
        = -192 + 64 + 8 - 1
        = -121

  Le reste de la division est -121
  ```

  <ins>Exemple 2</ins>:

  ```
  Soit le polynôme p(x) = x³ + 2x² + cx + 10.  
  Pour quelle(s) valeur(s) de c le polynôme x-5 est-il un facteur de p?

  p(5) = 0  ⇒   5³ + 2(5)² + c5 + 10 = 0
                125 + 50 + 5c + 10 = 0
                185 + 5c = 0
                c = -37
  ```
