---
title: Perplexité
category: Machine Learning
---

## Qu'est-ce que c'est

* La *perplexité* (*perplexity* en anglais) est une mesure permettant de mesurer la performance d'un modèle NLP. La perplexité est la racine n-ième de la vraissemblance en dénominateur (*likelihood* en anglais)

  ![](https://i.imgur.com/4uksATKm.png)

* Pour mesurer la perplexité, on met de côté des données avant d'entraîner le modèle, puis on utilise ces données pour comparer ce que le modèle prédit avec le texte réel. Autrement dit, on effectue un train/test split, on entraîne le modèle avec le train set et on mesure la perplexité avec les données de test. Dans la littérature de NLP, on ne parle pas de train/test split mais de *hold-out perplexity* (*mettre de côté* = *hold out* en anglais), ce qui est juste une manière différente de dire la même chose.

* La vraissemblance indique si notre modèle est surpris par le texte ou non — s'il prédit les mêmes donnes que les données de texte ou pas. Plus la vraissemblance est grande, mieux c'est. Et inversemment, plus la perplexité est faible, mieux c'est.

## Mots inexistants

* En l'état, si on calcule la perplexité du modèle avec des mots de vocabulaire dans les données de test qui ne sont pas dans les données d'entraînement, alors on obtient une perplexité infinie (1/0).

  ![](https://i.imgur.com/II1hu2um.png)

* Pour éviter ça,
  1. On construit le vocabulaire en limitant le nombre de mots à *m* (on garde les *m* mots les plus courants)
  2. On remplace les mots de vocabulaire inconnus par le token spécial &lt;UNK&gt; (pour *unknown*, inconnu), dans les données de test et d'entraînement
  3. On calcule les probabilités comme d'habitude pour les mots du vocabulaire et les mots inconnus substitués par &lt;UNK&gt;

## N-gramme inexistant

* Un autre problème qui peut se présenter, c'est si le n-gramme qu'on cherche à évaluer ne se présente jamais dans les données d'entraînement. Là encore, on obtient une perplexité infinie.

  ![](https://i.imgur.com/mlDUibum.png)

* Pour éviter ça, on peut utiliser différentes [techniques de lissage](nlp-smoothing.md) (*smoothing* en anglais). La plus courante est add-one smoothing: pour toutes les probabilités, on ajoute +1 en numérateur et +V en dénominateur.

  <ins>Exemple</ins>:  
  On entraîne un modèle trigramme, avec add-one smoothing, sur le texte suivant:

  ```
  This is the rat that ate the malt that lay in the house that Jack built.
  ```

  Trouver la perplexité de ce modèle pour ce texte:

  ```
  This is the house that Jack built.
  ```

  Il y a 12 mots uniques, donc V=13 (à cause du token &lt;end&gt;).  
  Tous les trigrammes du test set apparaissent exactement 1 fois dans le train set, sauf "is the house" qui n'apparait jamais.

  ```
  p(this|_ _)        = (1 + 1) / (1 + 13) = 2/14
  p(is|this _)       = ...
  p(the|this is)     = ...
  p(house|is the)    = (0 + 1) / (1 + 13) = 1/14
  p(that|the house)  = ...
  p(Jack|house that) = ...
  p(built|that jack) = ...
  p(_|Jack built)    = ...

  likelihood = (2/14)**7 * (1/14)
  perplexity = likelihood**(-1/7) ≈ 10.205
  ```

  <!--https://i.imgur.com/y8qARma.png-->
