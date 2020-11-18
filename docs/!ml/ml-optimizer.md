---
title: Optimiseurs
category: Machine learning
---

* Un optimiseur est un algorithme utilisé pour minimiser une fonction coût.

  ![](https://i.imgur.com/Zui9aVw.gif)

## Gradient Descent

* Le gradient descent consiste à soustraire aux poids une fraction de la dérivée de la fonction coût.

  ```
  gradient = dJ(w)
  w       -= alpha * gradient
  ```

* Si la dérivée est positive, c'est que le coût augmente lorsqu'on augmente les poids. Inversemment, si elle est négative, c'est que le coût diminue lorsqu'on augmente les poids. On doit donc soustraire pour diminuer le coût.

  Si la pente est raide (large coefficient), c'est que le coût change rapidement: on est loin du minimum, on peut donc faire un grand pas. Inversemment, si la pente est relativement faible, c'est qu'on approche du minimum, on fera de plus petits pas. La taille du pas sera donc directement proportionnelle à la pente de la dérivée. 

  Cette proportion est appellée *taux d'apprentissage* (*learning rate*) et est généralement notée &alpha; (alpha). Il s'agit généralement d'une valeur entre 0.1 et 0.001.

   ![](https://i.imgur.com/nRIH90u.png)

* Les optimiseurs utilisés aujourd'hui (adam, adaptive gradient descent, rmsprop) modifient le taux d'apprentissage automatiquement pour converger plus rapidement.

* Si le coût en fonction des poids n'est pas convexe (en forme U), alors suivant l'initialisation aléatoire des poids, l'algorithme peut trouver un minimum  local et non le minimum global (celui qu'on cherche). En pratique, ce cas ne se présente généralement pas.

  ![](https://i.imgur.com/TwUjhXL.png)

* Il existe 3 implémentations du gradient descent:

  1. <ins>Batch gradient descent</ins>  
     On calcule l'erreur en utilisant l'ensemble des points du dataset (*n* données)

     ``` python
     for i in range(num_epochs):
         gradient = compute_gradient(data, params)
         params   = params - learning_rate * gradient
     ```

  2. <ins>Mini-batch gradient descent</ins>  
     À chaque itération (epoch), on divise le dataset en lots (*batch* en anglais) de *m* données, et on calcule l'erreur lot par lot.

     ``` python
     for i in range(num_epochs):
         np.random.shuffle(data)

         for batch in radom_minibatches(data, batch_size=32):
             gradient = compute_gradient(batch, params)
             params   = params - learning_rate * gradient
     ```

  3. <ins>Stochastic gradient descent</ins> (SGD)  
     On calcule l'erreur par rapport à une seule valeur du dataset, prise au hasard (1 donnée)

     ``` python
     for i in range(num_epochs):
         np.random.shuffle(data)

         for xi in data:
             gradient = compute_gradient(xi, params)
             params   = params - learning_rate * gradient
     ```

     SGD n'est pas aussi direct pour attreindre le minimum mais est toujours garanti de l'atteindre si la fonction coût est convexe et demande moins de calculs. Les algorithmes qui suivent sont basés sur SGD.

  ![](https://i.imgur.com/iYoSV2s.png)

## Gradient descent + Momentum

Utilisé en conjonction avec SGD, le momentum utilise les dérivés passées pour lisser les mises à jour: au lieu d'utiliser la dérivée de la fonction coût à l'étape *i*, on utilise la moyenne pondérée exponentiellement des dérivées de l'étape 1 à *i* (appelée vélocité *v*) pour mettre à jour les poids. Ça permet de minimiser les oscillations et ainsi accélérer la convergence de l'algorithme.

Momentum nécessite un hyperparamètre additionnel: &beta; (beta).

``` python
gradient = dJ(w)
v  = beta * v + (1 - beta) * gradient
W -= alpha * v
```

``` python
# scale alpha by (1 - beta) beforehand
v  = beta * v + alpha * gradient
w -= v
```

![](https://i.imgur.com/1qhr80l.png)

[Stochastic Gradient Descent with momentum](https://towardsdatascience.com/stochastic-gradient-descent-with-momentum-a84097641a5d)

## Nesterov Accelerated Gradient (NAG)

Le Momentum de Nesterov est un simple changement par rapport au momentum standard: au lieu de calculer la dérivée par rapport au poids de l'étape *i*, on y ajoute la vélocité. Cela aide à lisser davantage la convergence de l'algorithme: si le momentum point dans la mauvaise direction, la derivée peut aider à corriger le tir.

``` python
gradient = dJ(w - (beta*v))
v  = beta * v + (1 - beta) * gradient
W -= alpha * v
```

## Adaptive Gradient (Adagrad)

* Parfois, certaines caractéristiques du dataset sont rares, et du coup les poids de ces caractéristiques sont entraînées à un rythme beaucoup plus lent que les autres.

  Adagrad aborde ce problème en disant que plus on a déjà mis à jour une caractéristique, moins on doit encore la mettre à jour. On va donc pénaliser les caractéristiques les plus présentes, pour laisser une chance aux caractéristiques les moins fréquentes de rattraper leur retard.

* Pour ce faire, Adagrad utilise un taux d'apprentissage différents pour les différentes caractéristiques, en divisant le taux d'apprentissage par la somme des carrés des dérivées précédentes (qui est un vecteur):

  * si la somme des dérivées précédentes pour une caractéristique donnée a une large valeur, alors le taux d'apprentissage est réduit

  * si c'est une petite valeur, alors le taux d'apprentissage augmente

  Les caractéristiques fréquentes seront ainsi peut mises à jour, tandis que les caractéristiques peu fréquentes seront rapidement mises à jour.

* L'algorithme est comme suit:

  ``` python
  gradient = dJ(w)
  ss += gradient**2
  w  -= alpha/(sqrt(ss) + epsilon) * gradient
  ```

  Epsilon est une très petite valeur (1e-5), qui permet d'éviter une division par zéro.

* Notons que cette approche peu devenir problèmatique: si la somme au carré devient très large, alors le taux d'apprentissage est très réduit et les poids ne sont que très peu mis à jour — l'entrainement va devenir très long.

## RMSprop / Adadelta

RMSprop et Adadelta font la même chose mais ont été développés pour deux teams différentes de chercheurs.

* Si on entraîne Adagrad longtemps, il devient incroyablement lent. C'est dû au fait que la somme des dérivés ne fait que croître et ne diminue jamais.

  RMSprop résout ce problème en ajoutant un facteur de décroissance, &rho; (rho).

  ``` python
  gradient = dJ(w)
  ss  = rho * ss + (1 - rho) * gradient**2
  w  -= alpha/(sqrt(ss) + epsilon) * gradient
  ```

* La somme des dérivées devient une somme pondérée exponentiellement: les dérivées au carré du début prennent ainsi de moins en moins de poids au fur et à mesure qu'on ajoute de nouvelles valeurs.

## Adaptive Moment estimation (Adam)

Adam est l'optimiseur qui obtient les meilleurs résultats en moyenne. Il combine RMSprop et Momentum

1. Calcule la moyenne pondérée exponentiellement des dérivées passées (momentum)

2. Calcule la moyenne pondérée exponentiellement des carrés des dérivées passés (rmsprop)

3. Ces moyennes ont un bias vers zéro, pour le contrer une correction de biais est appliquée. *t* est une variable incrémentées au fur et à mesure des batchs et epochs.

4. Les poids sont mis à jour en utilisant les moyennes calculées

``` python
gradient = dJ(W)

v  = beta1 * v + (1 - beta1) * gradient
s  = beta2 * s + (1 - beta2) * gradient**2

v2 = v/(1 - beta1**t)
s2 = s/(1 - beta1**t)

w -= alpha * (v2/(sqrt(s2) + epsilon))
```

Les valeurs proposées pour ADAM sont
α=0.001, β1=0.9, β2=0.999, ϵ=10e-8.  

[Optimisation Algorithm — Adaptive Moment Estimation(Adam)](https://towardsdatascience.com/optimisation-algorithm-adaptive-moment-estimation-adam-92144d75e232)