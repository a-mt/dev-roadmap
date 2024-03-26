---
title: Naive Bayes
category: Machine learning, algo
latex: true
---

* Naive Bayes est un algorithme supervisé de classification.

## Fonctionnement

* Il basé sur le théorème de Bayes.  
  Son fonctionnement est très simple:

  1. <ins>Entrainement</ins>  
    Convertir les données en table de fréquence et calculer les probabilités associées à chaque combinaison IDV/DV possible.

     ![](https://i.imgur.com/BPgO6e4.png)

  2. <ins>Prédiction</ins>  
    Utiliser le théorème de Bayes pour calculer la probabilité postérieure de chaque classe (dans notre cas, oui/non).  
    On prédira la classe la plus probable comme résultat.

     <pre>
     S'il fait beau, va-t-il y avoir un match?

     P(yes | sunny) = P(sunny | yes) * P(yes) / P(sunny)
                   = 3/9  * 9/14 / 5/14
                   = 0.33 * 0.64 / 0.36
                   = 0.60

     Il n'y a que deux combinaisons possibles donc on sait que
     P(no | sunny) = 1 - P(yes | sunny)
                   = 0.40

     P(yes | sunny) > P(no | sunny), donc on prédit "yes"
     </pre>

* Notons qu'il n'est pas nécessaire de diviser par P(D) l'ensemble des probabilités pour les comparer entre elles. Pour aller plus vite, on l'omet généralement.

  $$
  \begin{aligned}
   & \text{ argmax } P(h | D) \\[7pt]
  =& \text{ argmax } \frac{P(D | h) P(h)}{P(D)} \\[7pt]
  =& \text{ argmax } P(D | h) P(h)
  \end{aligned}
  $$

* Dans le cas où a plusieurs attributs, on multiplie les probabilités entre elles

  ![](https://i.imgur.com/4H3EUOIl.png)
  ![](https://i.imgur.com/PrdjPzKl.png?1)

  <pre>
  S'il fait beau, que la température est bonne,  
  que l'humidité est élevée et qu'il y a un fort vent,
  va-t-il y avoir un match?

  P(play=yes | sunny, cool, high, strong) = 2/9 * 3/9 * 3/9 * 3/9 * 9/14 = 0.0053
  P(play=no  | sunny, cool, high, strong) = 3/5 * 1/5 * 4/5 * 3/5 * 5/14 = 0.0206

  P(yes | x) < P(no | x), donc on prédit "no".
  </pre>

  [Naive Bayes.ipynb](notebooks/Naive Bayes.html)

* Naive Bayes repose sur le principe que les caractéristiques sont indépendantes les unes des autres — autrement dit, que la valeur d'une caractéristique n'aura aucune influence sur la valeur d'une autre caractéristique. Raison pour laquelle l'algorithme est dit "naïf".

## Optimisations

### Laplace smoothing

Le lissage Laplace est une technique ayant pour but de résoudre le problème de la probabilité zéro: si la probabilité a priori vaut 0, les probabilités a posteriori vaudrons toujours 0 quel que le nombre de contre-vérités ajoutées. Pour éviter que ça se produise, on ajoute une valeur &lambda; (qui vaut généralement 1).

$$
P(k) = \frac{\text{Nombre d'occurences} + \lambda}{n + m}
$$

(n: nombre de lignes,
m: nombre de caractéristiques)

## Pour & Contre

* Fonctionne très bien si l'assumption d'indépendance des caractéristiques est remplie

* Rapide

* Généralement utilisé lorsque les caractéristiques sont catégoriques, et non réelles

* Facilement sur-ajusté si le lissage de Laplace n'est pas ajouté