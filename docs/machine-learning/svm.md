---
title: SVM
category: Machine learning, algo
latex: true
---

* Support Vector Machines (SVM) est un algorithme supervisé de classification (Support Vector Classifier [SVC]) ou régression (Support Vector Regressor [SVR]). Il est particulièrement indiqué lorsqu'on a un grand nombre de caractéristiques.

## Linear SVM

### Hyperplan

* SVM cherche à trouver un hyperplan de dimension D-1 (si on a 2 caractéristiques, l'hyperplan sera un simple ligne; pour 3 caractéristiques, ce sera un plan 2D) pour différencier les classes.

  Tout hyperplan peut être exprimé sous la forme d'un vecteur *w* et constante *b*:

  $$
  \text{Hyperplan} \\  
  w \cdot x + b = 0
  $$

* SVM distingue deux classes:  
  la classe négative (-1), inférieure à l'hyperplan, et la classe positive (+1), supérieure à l'hyperplan.

  $$
  \begin{cases}
  w \cdot x + b < 0 & \text{ si } y = -1  \\
  w \cdot x + b > 0 & \text{ si } y = 1
  \end{cases}
  $$

  En connaissant l'hyperplan, on pourra donc prédire la valeur du point *x* suivant le signe obtenu — positif ou négatif

  $$
  f(x) = signe(w \cdot x + b)
  $$

### Support vectors

* Il peut exister plusieurs hyperplan pour séparer les deux classes. Pour trouver le meilleur hyperplan, SVM va uniquement considérer les points les plus proches de l'hyperplan, dits *support vectors*.

  La distance entre les support vectors et l'hyperplan est appelée *marge* et le but est de maximiser cette marge — plus la marge est grande, moins il y a de risque de misclassification.

   ![](https://i.imgur.com/MdoZwKz.png)

   ![](https://i.imgur.com/QNK8Jey.png?1)

* La distance entre un point x<sub>i</sub> et l'hyperplan est notée *r*:

  $$
  r = \frac{|w^T x_i + b|}{||w||}
  $$

  La distance entre deux supports vectors (x<sub>s</sub>) de part et d'autre de l'hyperplan sera donc

  $$
  r = \frac{y_s(w^T x_s + b)}{||w||} = \frac{1}{||w||}
  $$

  Ce qui nous permet d'exprimer la marge comme suit:

  $$
  \rho = 2r = \frac{2}{||w||}
  $$

### Fonction coût

La fonction coût cherche à faire plusieurs choses:

1. Minimiser les erreurs de classification

  $$
  \text{Hinge loss function:} \\
  max(0, 1 - y_i \times (w \cdot x_i + b))
  $$

2. Maximiser la marge

  $$
  \begin{aligned}
  \text{Maximiser } & \rho = \frac{2}{||w||} \\[7pt]
  \equiv \text{Minimiser } & ||w||^2 = w^T w \\
  \ 
  \end{aligned}
  \\
  \forall (x_i, y_i), i=1..n: y_i (w^T w_i + b) \geq 1
  $$

3. Admettre des erreurs de classification.

   *C* est un hyperparamètre de régularisation: pour un C infiniment grand, la marge devient une marge stricte (*hard margin*) tandis qu'un petit C résulte en une limite souple (*soft limit*) plus large — qui accepte davantage de points mal classifiés.

   Suivant les implémentations, on peut avoir *&lambda;* à la place, qui fait l'inverse de C (*C ∼ 1/&lambda;*): un grand &lambda; admet une marge souple plus grande tandis que pour un &lambda; infiniment petit, la marge devient une marge stricte.

  $$
  \text{SVM loss function:} \\[7pt]
  J(w) = \frac{1}{2} ||w||^2
       + C \left[
             \frac{1}{N} \sum_i^N max(0, 1 - y_i \times (w \cdot x_i + b))
           \right]
  \\[20pt]
  J(w) = \frac{\lambda}{2} ||w||^2
       + \left[
             \frac{1}{N} \sum_i^N max(0, 1 - y_i \times (w \cdot x_i + b))
           \right]
  $$

### Gradient

$$
J(w)' = \frac{1}{N} \sum_i^N \begin{cases}
w  & \text{si } max(0, 1 - y_i \times (w \cdot x_i + b)) = 0 \\
w - Cy_i x_i & \text{sinon}
\end{cases}
$$

[SVC.ipynb](notebooks/SVC.ipynb)  
[Linear SVM](http://www.adeveloperdiary.com/data-science/machine-learning/support-vector-machines-for-beginners-linear-svm/)

---

## Kernel SVM

* Que faire quand les données ne peuvent pas être séparées linéairement, ou s'il y a plus de deux variables indépendantes? On peut résoudre ce problème en introduisant une caractéristique supplémentaire. Par exemple, pour un cercle on peut ajouter une caractéristique z=x²+y²:

  ![](https://i.imgur.com/mJVJIfy.png)

* Il n'est pas nécessaire de le faire manuellement, SVM peut le faire automatiquement avec un *kernel*.

  Un kernel est une fonction qui ajoute des dimensions à un espace donné — autrement dit, qui ajoute des caractéristiques à l'ensemble de données. Ce faisant, le kernel transforme un problème qui n'est pas linéairement séparable en un problème qui l'est.

* Les différents types de kernel utilisés pour résoudre un problème de classification sont:

  1. Linear Kernel
  2. Polynomial Kernel
  3. Radial Basis Function Kernel (RBF)
  4. Sigmoid Kernel

  ![](https://i.imgur.com/0c1yOuB.png)

[Kernel SVM](http://www.adeveloperdiary.com/data-science/machine-learning/support-vector-machines-for-beginners-kernel-svm/)

---

## Pour & Contre

* Peut être appliqué aux problèmes non linéaires

* L'impact des valeurs aberrantes est moindre par rapport à une regression linéaire

* Fonctionne très bien si on trouve le bon Kernel

* L'importance des caractéristiques est difficile à interpréter avec un kernel

* Long a entraîner si l'ensemble de données est grand