---
title: Fonction d'activation
category: Machine learning
latex: true
---

* Une fonction d'activation est simplement une fonction appliquée au résultat d'un neurone. Sans fonction d'activation, les réseaux neuronaux ne peuvent qu'apprendre des relations linéaires.  
  Il existe tout un tas de fonctions d'activation possibles.

  ![](https://i.imgur.com/c2f9wzMm.png)

## Heaviside step function

Est la fonction d'activation utilisé dans le perceptron. Elle n'est plus utilisée aujourd'hui car trop abrupte: une légère modification de poids, même 0.001, peut faire basculer le résultat de 0 à 1.

$$
\text{Heaviside step function} \\
\begin{aligned}
H(x) &= \frac{sign(x) +1}{2} \\

&= \begin{cases}
0 & \text{si } x <= 0 \\
1 & \text{sinon}
\end{cases}
\end{aligned}
$$

![](https://i.imgur.com/blg208c.png)

## Sigmoid / logit

La fonction sigmoid, aussi appelé fonction logit, restreint le résultat entre 0 et 1.  
Cette fonction a un inconvénient: elle a une pente relativement raide entre -3 et 3 alors que les pentes au-dessus et en-dessous sont presque plates. Ainsi, même si les données changent beaucoup, le résultat de la fonction d'activation ne change que très peu. C'est la raison pour laquelle sigmoid n'est pas utilisée pour les couches cachées (pose problème pour mettre à jour les poids), mais uniquement pour la couche en sortie — dans le cas d'un algorithme de classification du moins, pour un algorithme de régression on n'utilise pas de fonction d'activation en sortie.

$$
\text{Sigmoid function} \\
\sigma(x) = \frac{1}{1 + e^{-x}}
$$

![](https://i.imgur.com/zXkE8HZ.png)

## Tanh

La fonction tanh restreint le résultat entre -1 et 1.  
Même problème que sigmoid.

$$
\text{Tanh function} \\
tanh(x) = \frac{e^{2x} -1}{e^{2x} +1}
$$

![](https://i.imgur.com/hlSiXLX.png)

## Rectified linear unit (ReLU)

La fonction relu nullifie les valeurs inférieures à 0.  
Relu est la fonction d'activation la plus couramment utilisé pour les couches cachées.

$$
\text{Relu function} \\[7pt]
\begin{aligned}
relu(x) &= max(0, x) \\
        &= \begin{cases}
0 & \text{si } x < 0 \\
x & \text{sinon}
\end{cases}
\end{aligned}
$$

![](https://i.imgur.com/rmQqjy9.png)

## Leaky Relu

Leaky relu introduit une pente légèrement réduite (0.01) pour toutes les valeurs de x inférieures à 0.

$$
\text{Leaky relu function} \\
lrelu(x) = \begin{cases}
0.01x & \text{si } x < 0 \\
x & \text{sinon}
\end{cases}
$$

![](https://i.imgur.com/gtpmkZy.png)

## Softmax / normalized exponential

Softmax est juste une version généralisée de sigmoid — pour K sorties, la somme de doit être égale à 1. Sigmoid est utilisée en sortie pour les problèmes de classification binaire, Softmax est utilisé pour les problème de classification multi-classe.

$$
\text{Softmax function} \\
softmax(x_i) = \frac{e^{x_i}}{\sum^K_{j=1} e^{x_j}}
$$

![](https://i.imgur.com/FzisRRh.png)

## Linear

L'activation linéaire ne fait que renvoyer l'entrée qu'elle a reçue. Quand on utilise un framework, indiquer une activation linéaire est juste une manière de dire "ne rien faire". C'est ce qu'on utilise sur la couche en sortie dans le cas d'un problème de régression.

![](https://i.imgur.com/FdItKP4.png)

## Recap

* <ins>Sigmoid</ins>:  
  fonction d'activation de la couche en sortie pour les problèmes de classification binaire (retourne la probabilité que la classe soit 1)

* <ins>Softmax</ins>:  
  fonction d'activation de la couche en sortie pour les problème de classification multi-classes (retourne la probabilité associée à chaque classe)

* <ins>Linear</ins>:  
  fonction d'activation de la couche en sortie pour les problèmes de régression

* <ins>Tanh</ins>:  
  fonction d'activation de la couche en sortie quand on souhaite un résultat dans l'intervalle [-1, +1]

* <ins>Relu</ins> ou <ins>leaky relu</ins>:  
  fonction d'activation pour les couches cachées

Pour aller plus loin:  
[Tensorflow: activations](https://www.tensorflow.org/api_docs/python/tf/keras/activations)
