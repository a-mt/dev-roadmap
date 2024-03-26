---
title: TF-IDF
category: Machine Learning, NLP
latex: true
---

* *Term-Frequency Inverse-Document-Frequency* [TF-IDF] est un modèle statistique pouvant être utilisé dans toutes les situations où Bag-of-words peut utilisé, la différence étant dans la manière dont il est calculé: on donne moins de poids aux mots les plus fréquents.

  ![](https://i.imgur.com/nDc1D3G.png)

  ![](https://i.imgur.com/ZyCGZi6.png)

* TF-IDF s'appuie sur deux mesures pour calculer le score d'un mot:

  * *term frequency*:  
    Mesure la fréquence d'apparition des mots dans un document. Même chose qu'un dictionnaire BoW.

    $$
    \text{tf(t, doc)} = \frac{\text{compte t dans doc}}{\text{compte mots dans doc}}
    $$

  * *inverse document frequency*:  
    Mesure la fréquence d'apparition des mots dans le corpus de documents et inverse leur impact: en pénalisant le score des mots qui apparaissent souvent dans divers documents (ex "le", "la"), on augmente le score des termes qui apparaissent moins souvent et qui ont une réelle importance pour un document.

    $$
    \begin{aligned}
    \text{df(t)} &= \frac{\text{nombre docs}}{\text{compte t dans docs}} \\[15pt]

    \text{idf(t)} &= log(\text{df(t)}) + 1
    \end{aligned}
    $$

    Il existante une variante "lissée" de cette formule: comme on ne peut pas diviser par 0, on ajoute 1 au numérateur et au dénominateur, comme si on voyait un document supplémentaire contenant chaque terme de la collection exactement 1 fois.

    $$
    \begin{aligned}
    \text{smooth_df(t)} &= \frac{1 + \text{nombre docs}}{1 + \text{compte t dans docs}} \\[15pt]

    \text{smooth_idf(t)} &= log(\text{smooth_df(t)}) + 1
    \end{aligned}
    $$

  * *term-frequency inverse-document-frequency*:  
    C'est la fréquence du terme dans le document (tf) fois l'inverse de la fréquence du terme dans les documents (idf).

    $$
    \text{tf-idf(t, d)} = \text{tf(t, d)} \cdot \text{idf(t)}
    $$

* Un algorithme très simple de recherche pourrait
  * Calculer TF-IDF pour chaque mot d'un corpus
  * Trier les documents en fonction de leur score TF-IDF pour le mot recherché (un score tf-idf plus élevé indique qu'un terme est plus important pour le document correspondant)  
  * Retourner les premiers résultats

[TF-IDF.ipynb](notebooks/TF-IDF.html)