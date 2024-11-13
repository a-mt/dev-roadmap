---
title: Nombres complexes
category: Maths, Arithmétique
---

Concepts: nombre imaginaire, imaginaire pur, nombre complexe, conjugué

## Nombres imaginaires

* Une racine carrée ne peut pas exister sur un nombre négatif — puisqu'un nombre négatif multiplié par lui-même résulte en un nombre positif, de même qu'un nombre positif multiplié par lui-même. Pourtant, pour résoudre certains problèmes algèbrique, des concepts plus complexes sont nécessaires: le nombre *i*. *i* est définit comme suit:

  ```
  i² = -1 (donc i = √-1)
  ```

  Le nombre *i* est dit *imaginaire* puisqu'il ne peut pas réellement exister: il est définit par une propriété qu'aucun nombre réel ne possède.

* Note: L'histoire des nombres complexes commence vers le milieu du XVe sicèle avec une première apparition en 1545, dans l'oeuvre de Cardan, d'une expression contenant la racine carrée d'un nombre négatif, nombre qu'il appelle *sophistiqué*. C'est Raphaël Bombelli qui met en place les règles de calcul sur ces quantités qu'on appelle alors *impossibles* avant de leur donner le nom d'i*imaginaires*.

## Propriétés de *i*

* *i* suit un schéma régulier:

  ```
  i¹ = i
  i² = -1
  i³ = -i  (puisque i²⋅i  = -1⋅i)
  i⁴ = 1   (puisque i²⋅i² = (-1)⋅(-1))
  ```

  Ce schéma se répète indéfiniment:

  ![](https://i.imgur.com/9jnPyVP.png)

* Pour trouver la valeur de i<sup>x</sup>, on peut se servir des règles de calcul des exposants et du fait que i<sup>4</sup>=1 (ou toute autre puissance de i multiple de 4 est égal à 1):

  <pre>
  i<sup>20</sup> = i<sup>4⋅5</sup>
      = 1<sup>5</sup>
      = 1
  </pre>

  <pre>
  i<sup>138</sup> = i<sup>136</sup>⋅i<sup>2</sup>
      = i<sup>4⋅34</sup>⋅i<sup>2</sup>
      = 1<sup>34</sup>⋅(-1)
      = 1⋅(-1)
      = -1
  </pre>

## Imaginaires purs

* Si on multiplie le nombre *i* par un nombre réel différent de 0, on obtient ce qu'on appelle un *imaginaire pur*. Les imaginaires purs sont des nombres dont le carré est négatif.

  ![](https://i.imgur.com/iZzdkvO.png?1)

  ![](https://i.imgur.com/lcsHpvC.png)

  <ins>Exemple</ins>:

  ![](https://i.imgur.com/3I4D8so.png?1)

## Nombres complexes

* Un *nombre complexe* est un nombre composé d'une partie réelle et d'une partie imaginaire.  
  Ex: 4 + 2i

  ![](https://i.imgur.com/r24lbSI.png)

* Dans le cas de l'addition et soustraction, on peut traiter *i* comme une simple inconnue.

  ```
    (1 + 2i) + (10 + 10i)
  = 11 + 12i
  ```

  ```
    (11 + 12j) - (1 + 2i)
  = 10 + 10i
  ```

* Dans le cas de la multiplication, il faut calculer la valeur de *i<sup>x</sup>* quand une puissance est portée sur *i*.

  ```
   (1 + 2i) * 2
  = 2 + 4i

    (1 + 2i) * 2i
  = 2i + 4i²
  = 2i - 4

    (1 + 2i) * (2 + 3i)
  = 2 + 3i + 4i + 6i²
  = 2 + 7i - 6
  = 7i - 4
  ```

## Conjugué d'un nombre complexe

* Par définition, si on multiplie un nombre complexe par son *conjugué*,  
  alors on obtient un nombre réel (donc on se débarrasse des nombres imaginaires):  
  ainsi <code>a + bi</code> est le conjugué de <code>a - bi</code> et inversemment.

  ![](https://i.imgur.com/GLzYEx8.png)

## Diviser par un nombre complexe

* Pour effectuer une divison par un nombre complexe,  
  1/ on considère la division comme une multiplication par l'inverse  
  2/ sur cet inverse, on multiplie le numérateur et le dénominateur par le conjugué du dénominateur. On obtient alors un nombre réel en tant que diviseur (en simplifiant l'expression) et un nombre complexe en dividende

  ![](https://i.imgur.com/FP6g3oO.png)

  Par exemple:

  ```
    1/(1 + 2i)
  = (1 - 2i)/[(1 - 2i)(1 + 2i)]
  = (1 - 2i)/[1² - (2i)²]
  = (1 - 2i)/(1 + 4)
  = (1 - 2i)/5
  = 0.2 - 0.4i
  ```

  ```
    (-4 + 7i)/(1 + 2i)
  = (-4 + 7i)(1 - 2i)/(1 + 2i)(1 - 2i)
  = (-4 + 8i + 7i - 14i²)/ 5
  = (-4 + 15i + 14)/5
  = (10 + 15i)/5
  = 2 + 3i
  ```
