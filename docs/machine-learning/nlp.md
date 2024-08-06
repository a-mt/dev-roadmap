---
title: NLP
category: Machine Learning
---

* Les algorithmes de Machine learning ne peuvent pas s'appliquer directement sur du texte, il faut donc convertir les documents texte avec une taille variable, en vecteurs numériques avec une taille fixe.  
  Transformer le texte se fait généralement en utilisant un modèle qui assigne de probabilités, fréquences, ou nombre aux mots, phrases et documents.

* Il existe différentes techniques pour représenter le texte. Le choix se fait en fonction du sens pratique, de l'expérience de la team, de la disponibilité des données et coût des calculs:

  - One-hot encoding: basé sur des vecteurs binaires, où la présence d'un mot est représenté par un 1 dans le vecteur et 0 pour tous les autres.

  - Count vecteurs: basé sur la fréquence, tels que BoW et TF-IDF

  - Embeddings: encode le contexte du mot, sous-mot ou phrase
