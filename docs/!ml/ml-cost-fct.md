---
title: Fonction coût
category: Machine learning
latex: true
---

* On ne cherche pas à avoir un modèle avec une précision à 100%, puisque les données dont on dispose ne nous le permet pas toujours — ex les points dans un nuage de points ne sont généralement pas parfaitement alignés, ils ne font que suivre une tendance; ou dans le cas d'une classification, tous les points ne sont pas toujours séparables. Ce qu'on veut, c'est limiter les erreurs du modèle aux erreurs irréductibles.

* La fonction coût (*error*, *cost*, *loss*, *objective*) permet de mesurer la quantité d'erreurs commises. C'est cette valeur qu'on cherchera à minimiser.

---

## Pour des régressions

### Mean Squared Error (MSE)

La fonction MSE pénalise les erreurs importantes en les mettant au carré: les petites erreurs (entre 0 et 1) deviennent encore plus petites tandis que les grandes erreurs deviennent encore plus grandes. Les grandes erreurs sont donc amplifiées tandis que les petites sont ignorées. Cette propriété rend MSE sensible aux valeurs extrêmes.  
C'est généralement la fonction coût utilisée pour une régression linéaire.

$$
MSE = \frac{1}{n} \sum_{i=1}^n (y_i - \bar{y}_i)^2
$$

<!-- https://i.imgur.com/MzXwBe1l.png -->

### Mean Absolute Error (MAE)

La fonction MAE n'a pas de prédilection pour les grandes ou petites erreurs: une erreur de 100$ est deux fois pire qu'une erreur de 50$. Cela rend MAE plus robuste face aux valeurs extrêmes.

$$
MAE = \frac{1}{n} \sum_{i=1}^n |y_i - \bar{y}_i|
$$

### Huber

Huber combine les propriétés de MSE et MAE:  
le coût est quadratique pour les petites erreurs et linéaire pour les grandes erreurs.  
On peut ajuster la valeur de &delta; pour désigner le seuil à partir duquel les erreurs doivent être pénalisées.

$$
Huber = \frac{1}{n} \sum \begin{cases}
\frac{(y_i - \bar{y_i})^2}{2} & \text{si } |y_i - \bar{y_i}| < \delta \\
\delta|y_i - \bar{y_i}| - \frac{\delta^2}{2} & \text{sinon}
\end{cases}
$$

---

## Pour des classifications binaires

### Cross-entropy / log-loss

Vise à réduire l'entropie de la distribution de probabilité prédite.  
C'est généralement la fonction coût utilisée pour une régression logistique.

$$
\begin{aligned}
Log &= \sum_{i=0}^n \begin{cases}
         - log(\bar{y_i}) & \text{si } y = 1 \\
         - log(1 - \bar{y_i}) & \text{si } y = 0
       \end{cases} \\

    &= \sum_{i=0}^n \left[
        - y_i log(\bar{y_i})
        - (1 - \bar{y_i}) log(1 - \bar{y_i})
      \right]
\end{aligned}
$$

### Hinge

Pénalise les misclassifications.  
Elle est notamment utilisée par SVM.

$$
Hinge = max(0, 1 - \bar{y} \times y)
$$

---

## Pour des classifications multi-classes

### Multi-class Cross-entropy

Il s'agit d'une généralisation de la fonction cross-entropy pour K classes.

$$
H(p,q) = - \sum_{c=1}^K y \times log(\bar{y})
$$

[Cross-entropy for classification](https://towardsdatascience.com/cross-entropy-for-classification-d98e7f974451)

### Kullback Leibler Divergence

Mesure la dissimilarisé entre deux distributions.  
Plus p(y) se rapproche de q(y), plus la divergence est réduite.

$$
KLDiv(q, p) = \sum_{i=1}^N q(y_i) \cdot
 \left[ 
  log(q(y_i)) - log(p(y_i))
\right]
$$

[Common loss functions that you should know!](https://medium.com/ml-cheat-sheet/winning-at-loss-functions-common-loss-functions-that-you-should-know-a72c1802ecb4)