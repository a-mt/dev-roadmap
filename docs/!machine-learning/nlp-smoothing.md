---
title: Techniques de lissage en NLP
category: Machine Learning
latex: true
---

Il existe plusieurs techniques de lissage, des plus simples comme le lissage Laplace, aux plus complexes comme la technique Kneser-Ney.

* Laplace smoothing (add-one, add-k)
* Katz backoff
* Interpolation smoothing
* Absolute discounting
* Kneser-Ney smoothing

[An empirical study of smoothing techniques forlanguage modeling](https://u.cs.biu.ac.il/~yogo/courses/mt2013/papers/chen-goodman-99.pdf)

---

## Laplace smoothing

* Pour éviter de se retrouver avec des probabilités 0, on peut simplement augmenter l'intégralité des valeurs de la distribution par 1: on ajoute `1` en numérateur et `1*V` (la taille du vocabulaire) en dénominateur. Cette technique est aussi appelée *add-one smoothing*.

  $$
  \text{Add-one smoothing}: \\

  \hat{p}(w_i | w^{i-1}_{i-n+1})
  = \frac{c(w^i_{i-n+1}) + \color{#4DB391}{1}}{c(w^{i-1}_{i-n+1}) + \color{#4DB391}{V}}
  $$

  Ou on peut utiliser toute autre valeur à la place de 1: on aura donc respectivement +`k` et +`k*V` au numérateur et dénominateur. Cette technique est aussi appelé *add-k smoothing*

  $$
  \text{Add-k smoothing}: \\

  \hat{p}(w_i | w^{i-1}_{i-n+1})
  = \frac{c(w^i_{i-n+1}) + \color{#4DB391}{k}}{c(w^{i-1}_{i-n+1}) + \color{#4DB391}{Vk}}
  $$

  <!-- https://i.imgur.com/WhaCM1R.png -->

---

## Katz backoff

* Parfois, on aimerais pouvoir utiliser de long n-grams, sauf qu'on a pas forcemment assez de données pour le faire. L'idée est donc d'utiliser des n-grams longs, et, dans le cas où on n'a pas assez de données pour estimer leur nombre, prendre des n-grams plus court. C'est ce que fait *Katz backoff*

  $$
  \text{Katz backoff}: \\

  \hat{p}(w_i | w^{i-1}_{i-n+1}) = \begin{cases}
    \tilde{p}(w_i | w^{i-1}_{i-n+1}) & \text{si } c (w_i | w^{i}_{i-n+1}) > 0 \\
    \alpha(w^{i-1}_{i-n+1}) \color{#4DB391}{\hat{p}(w_i | w^{i-1}_{i-n+2})} & \text{sinon}
  \end{cases}
  $$

  <!-- https://i.imgur.com/owNULdx.png -->

  &alpha; est une constante permettant d'assurer que les probabilités des séquences s'additionnent à 1.

---

## Interpolation smoothing

* La même idée peut être implémentée par interpolation. On utilise un mix d'unigramme, bigram, trigram, etc, et on les pondère avec des coefficients &lambda;.
  Ces coefficients doivent s'additionner à 1, pour avoir une distribution de probabilités correcte. Les valeurs &lambda; peuvent être définies à l'avance, ou peuvent dépendre d'un contexte plus ou moins sophistiqué.

  $$
  \text{Interpolation smoothing}: { } \\
  \text{(example for trigram model)} \\[10pt]

  \begin{aligned}
  & \hat{p}(w_i|w_{i-2} w_{i-1}) = \lambda_1 p(w_i|w_{i-2} w_{i-1})
                                 + \lambda_2 p(w_i|w_{i-1})
                                 + \lambda_3 p(w_i) \\[10pt]

  & \lambda_1 + \lambda_2 + \lambda_3 = 1
  \end{aligned}
  $$

  <!-- https://i.imgur.com/sf7Gpnd.png -->

---

## Absolute discounting

* Supposons qu'on veuille soustraire un peu des probabilités des n-grams qu'on connaît pour les redistribuer sur les n-grams qu'on ne connaît pas dans les données d'entraînement. De combien soustraire?

  ![](https://i.imgur.com/YKoic7l.png)

* Une expérience menée en 1991 (par Church & Gale) démontre que le nombre moyen de bigrammes des données d'entraînement et celui des données de test sont fortemment corrélées: en soustrayant 0.75 du compte des données d'entraînement, on obtient une très bonne estimation des données de test. C'est une propriété du langage qu'on peut essayer d'utiliser.

  ![](https://i.imgur.com/iIbpnYom.png)

  <!-- https://i.imgur.com/Xlx4hQpm.png -->

* Pour l'utiliser: on soustrait une valeur *d* (qu'on définit généralement à 0.75, mais on peut la modifier pour mieux s'adapter aux données qu'on a) du compte de chaque n-gram. Et on redistribue le compte restant sur les n-grams inconnus des données de test.

  $$
  \text{Absolute discounting} \\

  \begin{aligned}
  \hat{p}(w_i | w_{i-1}) &= \frac{c(w_{i-1} w_i) \color{#4DB391}{- d}}{c(w_{i-1})} \color{#4DB391}{+ \lambda(w_{i-1})p(w_i)} \\[5pt]

  \lambda(w_{i-1}) &= \frac{d}{c(w_{i-1})}
  \end{aligned}
  $$

  ![](https://i.imgur.com/LuwResb.png)

---

## Kneser-Ney smoothing

* Dans le cas de *absolute discounting*, on normalise la distribution des unigrammes inconnus en fonction du nombre de fois qu'ils apparaissent. Kneser-Ney cherche à faire mieux.

* En effet, le mot "Kong" est peut-être plus courant que le mot "malt", sauf que Kong n'apparaît que dans le bigramme "Hong Kong", tandis que malt n'est pas très populaire mais peut s'adapter à différents contextes.

  Avec Kneser-Ney, la probabilité des mots est proportionnelle au nombre de contextes différents pouvant précéder le mot. Cette idée est formalisée avec la formule ci-dessous:

  $$
  \text{Kneser-Ney}: \\

  \hat{p}(w_i) \propto |\{x : c(x w) > 0\}| \\[10pt]

  \hat{p}(w_i) = \frac{|w_{i-1}: c(w_{i-1} w_i) > 0|}{|w_{j-1}, w_j: c(w_{j-1} w_j) > 0|} \\[30pt]

  \text{Interpolated Kneser-Ney smoothing}: \\

  \begin{aligned}
  \hat{p}(w_i | w_{i-1}) &= \frac{\color{#4DB391}{max(0,} c(w_{i-1} w_i) \color{#4DB391}{- d)}}{c(w_{i-1})} \color{#4DB391}{+ \lambda(w_{i-1}) \hat{p}(w_i)} \\[5pt]

  \lambda(w_{i-1}) &= \frac{d}{c(w_{i-1})}
                     |\{w: c(w_{i-1}, w)\}|
  \end{aligned}
  $$

  <!-- https://i.imgur.com/DoMm3vq.png -->