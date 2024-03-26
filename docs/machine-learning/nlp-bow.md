---
title: Bag of words
category: Machine Learning, NLP
---

* Bag-of-words [BoW] (*sac de mots* en français), aussi appelé modèle *unigramme*, est un modèle linguistique basé sur le comptage des mots — le nombre de fois qu'ils apparaissent. Il est donc très simple mais a de nombreux cas d'utilisation, comme

  * déterminer les thèmes d'une chanson
  * filtrer les spams dans une boîte mail
  * déterminer si un avis client est positif ou négatif
  * créer un nuage de mot

* Il y a deux manières d'implémenter un BoW:

  1. <ins>Utiliser un dictionnaire</ins>  
     Chaque mot du document est associé au nombre de fois qu'il apparaît.

     ![](https://i.imgur.com/Nv5w7ak.png)

  2. <ins>Utiliser un vecteur</ins>  
     Créer un dictionnaire des caractéristiques (*feature dictionary*) à partir de l'ensemble des documents. Chaque mot est assigné à un index. Puis pour chaque document, créer un vecteur qui enregistre le nombre d'occurences des mots du document à l'index du dictionnaire des caractéristiques.

     ![](https://i.imgur.com/9dYzqzS.png)

* On peut ensuite comparer les vecteurs BoW avec d'autres vecteurs BoW pour les classifier — par exemple avec un algorithme de Naive Bayes.

* Et on peut représenter une phrase comme la somme des vecteurs one-hot encodés.

  ![](https://i.imgur.com/Q78r5iEm.png)

[Bag Of Words.ipynb](notebooks/Bag Of Words.html)