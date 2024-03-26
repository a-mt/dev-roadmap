---
title: Fonction
category: Maths, Algèbre
---

Concepts: image, antécédant, ensemble de définition, extremum, ensemble des images, positive, négative, croissante, décroissante

## Définition

* Pour rappel, une *fonction* est une règle qui établit la relation entre deux inconnues (ou plus).  
  [Terminologie d'algèbre](alg-intro.md#fonction)

## Réecrire une équation en fonction

* Pour écrire une fonction, il faut isoler *y* d'un côté de l'équation:

  ```
  Les nombres x et y sont liés par la relation suivante:  
  -5x - 4y = -8

  Réecrire cette équation sous forme de fonction, telle que y = f(x)
  -5x - 4y = -8
       -4y = -8 + 5x
         y = (-8 + 5x)/(-4)
         y = 2 - (5/4)x

  f(x) = 2 - (5/4)x
  ```

---

## Image et antécédant

Toute fonction a

* une *variable indépendante* (ou plusieurs), aussi appelée *antécédant*  
  C'est la variable donnée en entrée à la fonction. Traditionnellement, on nomme la variable indépendante *x*. Et s'il y en a plusieurs, on les nomme généralement x<sub>1</sub>, x<sub>2</sub>, etc.

* une *variable dépendante* ou *image*  
  C'est la variable calculée à partir des variables indépendantes — c'est à dire le résultat de la fonction.  
  Traditionnelllement, on nomme la variable dépendante *y*.

### Calculer l'image d'un nombre

* Pour calculer *y* sachant *x*, on remplace la valeur de *x* dans l'équation et *y* est le résultat de la fonction.

  ```
  Dans f(x) = 49 + x², quel est l'image de 5?

  f(5) = 49 - 5²
       = 49 - 25
       = 24

  L'image de 5 est 24.  
  On peut aussi dire que l'antécédant de 24 est 5.
  ```

### Calculer l'antécédant d'un nombre

* Pour calculer *x* sachant *y*, on remplace la valeur *y* dans l'équation et on résout l'équation.

  ```
  Dans h(x) = -4x + 15, quel est le ou les antécédants de -13?

     -13 = -4x + 15
  -13-15 = -4x
     -28 = -4x
    28/4 = x
       7 = x

  L'antécédant de -13 est 7.  
  On peut aussi dire que l'image de 7 est -13.
  ```

### Courbe représentative

* Pour construire une courbe représentant une fonction f, définie sur D:  
   1. choisir un repère,  
   2. construire tous les points dont l'abscisse est un nombre de D et l'ordonnée est l'image de l'abscisse

  ![](https://i.imgur.com/JY73yWR.png)

### Lire l'image ou l'antécédant d'un nombre

* On peut éventuellement lire les valeurs sur un graphique — si elles sont entières.  
  Par convention, *x* est en abscisse (horizontal) et *y* en ordonnée (vertical).

  <ins>Exemple</ins>:  

  ![](https://i.imgur.com/pm7iGH5.png)

  L'image de 2 est 5.  
  Les antécédants de 2 sont -1 et -5.

---

## Intervalles

### Ensemble de définition

* L'*ensemble de définition* (ou *domaine de définition*) est l'intervalle sur lequel la fonction existe.  
  On ne peut pas calculer f(x) si *x* est en dehors de l'intervalle.

  <ins>Exemples</ins>:

  ![](https://i.imgur.com/ixBWEiTm.png)

  ![](https://i.imgur.com/WoVxhvRm.png?2)

  ![](https://i.imgur.com/fZiZTmym.png)

* Soit D, l'ensemble de définition de la fonction f.  Définir sur fonction f sur D, c'est donner un procédé (une formule, une situation concrète) qui à chaque nombre de D associe un (et un seul) réel.  
  En notation mathématique, "f : D ⟶ ℝ, x ⟼ y" se lit "f est la fonction de D vers ℝ qui a tout nombre x associe y"

### Extremum

* Un *extremum* est un minimum ou maximum.  
  Un extremum est dit *global* (ou *absolu*) s'il s'agit d'un extremum sur l'intervalle de définition de la fonction.  
  Et il est dit *local* (ou *relatif*) s'il s'agit d'un extremum sur un intervalle inférieur à l'intervalle de définition.

  ![](https://i.imgur.com/Vo7v59kl.png)

* Toutes les fonctions n'ont pas forcemment d'extrêmum — par exemple si la fonction tend vers l'infini.

### Ensemble des images

* L'*ensemble des images* est l'ensemble des valeurs possibles des images.  
  Il se situe entre les deux extremums (s'il y en a).

  <ins>Exemples</ins>:

  ![](https://i.imgur.com/M3pQgmB.png)

  ![](https://i.imgur.com/TE5gIR2.png)

### Fonction positive

* Une fonction est dite *positive* sur un intervalle quand l'image est supérieure à 0.  
  Et *négative* sur un intervalle quand l'image est inférieure à 0.

  ![](https://i.imgur.com/F7hDoOSl.png)

  ![](https://i.imgur.com/wC0pY8Jl.png)

### Fonction croissante

* Une fonction est dite *croissante* sur un intervalle quand augmenter *x* augmente *y*.  
  On peut aussi dire qu'elle a une *pente positive*.  

  Elle est dite *décroissante* sur un intervalle quand augmenter *x* diminue *y*.  
  On peut aussi dire qu'elle a une *pente négative*.

  ![](https://i.imgur.com/lbTKGQPl.png)

  ![](https://i.imgur.com/M5CWd8Cl.png)

* Soit f une fonction définie sur un ensemble D, et I un intervalle inclut dans D

  * Si f est croissante sur I: quelque soit a ∈ I et b ∈ I, si a < b alors f(a) ≤ f(b).  
    Autrement dit, le plus petit nombre a la plus petite image.  
    On dit aussi que f conserve l'ordre sur I.

  * Si f est décroissante sur I: quelque soit a ∈ I et b ∈ I, si a < b alors f(a) ≤ f(b).  
    Autrement dit, le plus grand nombre a la plus petite image.  
    On dit aussi que f modifie l'ordre sur I

  * Si f est constante sur I: quelque soit a ∈ I et b ∈ I, alors f(a) = f(b)

### Sens de variation

* Étudier le sens de variation de f, c'est découper son ensemble de définition D en intervalles sur lesquels f est soit croissante soit décroissante soit constante. On consigne les résultats dans un tableau de variation de f.

  ![](https://i.imgur.com/qVKWAHc.png)

---

## Nomenclature

* Une fonction qui ne contient aucune inconnue est dite *constante*.  
* Une fonction contenant des inconnues dont le plus haut degré est 1, est dit *affine*.  
* Si le plus haut degré est 2, elle est dite *quadratique*.  
* Et si le plus haut degré est 3, elle est dite *cubique*.

| Degré | Nom      | Formule générale            | Exemple graphique
|--- |---          |---                          |---
| 0  | Constante   | `f(x) = a`                  | ![](https://i.imgur.com/FrekHTqt.png)
| 1  | Affine      | `f(x) = ax + b`             | ![](https://i.imgur.com/W0SQbTMt.png)
| 2  | Quadratique | `f(x) = ax² + bx + c`       | ![](https://i.imgur.com/d3GGnaYt.png)
| 3  | Cubique     | `f(x) = ax³ + bx² + cx + d` | ![](https://i.imgur.com/tUfLbBYt.png)
