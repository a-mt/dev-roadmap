---
title: One hot encoding
category: Machine Learning, NLP
---

* Là où Bag-of-words et TF-IDF vectorisent les phrases des documents, et les mots sont des entiers, one-hot-encoding (aussi appelé *count vectorizing*) vectorise les mots.

* Pour vectoriser un mot en utilisant l'approche one-hot encoding:

  * Créer un dictionnaire des caractéristiques (*feature dictionary*) à partir de l'ensemble des documents. Chaque mot est assigné à un index.
  * Pour chaque mot, créer un vecteur nul avec autant de dimensions qu'il y a de mots uniques dans le corpus et assigner 1 à l'index correspondant au mot (garder 0 partout ailleurs).

* Si on a 10 000 mots uniques, chaque mot prend prend un vecteur de dimension 1×10 000, et contient 9 999 zéros.

  ![](https://i.imgur.com/w2fTuXz.png)

[One Hot encoding.ipynb](notebooks/One Hot encoding.html)