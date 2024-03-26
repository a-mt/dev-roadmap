---
title: N-gram
category: Machine Learning, NLP
---

## Qu'est-ce que c'est

* Un n-gramme quantifie la probabilité qu'une expression de *n* mots apparaisse dans un corpus. Par exemple "front bumper", "oil leak", "maryland college park", etc.

* Un *unigramme* est un n-gram de 1 mot, où on se contente se compter le nombre d'occurence de chaque mot. Un *bigramme* est un n-gram de 2 mots où on compte le nombre de fois que le second mot vient après le premier. Un *trigramme* est un n-gram de 3 mots où on compte le nombre de fois que le troisième mot vient après les deux premiers, un *4-gramme* avec 4 mots, etc.

  ![](https://i.imgur.com/Rm40otHm.png)
  ![](https://i.imgur.com/ZGU0VDim.png)

## Markov assumption

* Si on voulait estimer la probabilité qu'une longue séquence (disons 100 mots) soit une vraie phrase, il a des chances que la séquence n'apparaisse jamais dans le corpus et donc que la probabilité soit 0 — et une phrase n'ayant aucun sens sera tout aussi probable qu'une phrase bien formulée.

  Pour pallier à ce problème, on divise le problème en plusieurs sous-problèmes: on calcule la probabilité du premier mot, la probabilité du second mot sachant qu'il vient après le premier, le troisième après le second et le premier, etc, en limitant l'historique aux *n* derniers termes: on applique une règle en chaîne (*chain rule*) sur les *n* derniers mots (*Markov assumption*).

  ![](https://i.imgur.com/bx1Y73am.png)

## Start & end tokens

* Il reste encore deux problèmes avec l'approche ci-dessus:

  1. tous les mots ne sont pas susceptibles d'être en début de phrase mais on ne le prend pas en compte. Pour résoudre ce problème, 1/ on ajoute un faux token "start" en début de phrase dans le corpus, 2/ le premier mot de la séquence à estimer sera calculé sachant qu'il vient après le token "start".

  2. les phrases courtes sont tout autant probables que les phrases longues. Et pour résoudre ce problème, 1/ on ajoute un faux token "end" en fin de phrase dans le corpus, 2/ on ajoute la probabilité du token "end" à la fin de la séquence à estimer. Ainsi, le modèle a la possibilité de terminer une phrase.

  <ins>Exemple du bigramme</ins>:

  ![](https://i.imgur.com/5KJRoJZm.png)

* Notons que le nombre de continuations possibles d'une séquence, sera désormais le nombre de n-gramme du corpus (V) + 1: le faux token du début ne fait que servir de préfixe pour les premières probabilités, mais le faux token de la fin est considéré comme n'importe quel autre mot (le modèle tente de le prédire), on a donc un mot de plus.

## Définition mathématique

* Mathématiquement, on effectue une estimation sur la maximisation des vraissemblances (*likelihood maximization estimates*).

  ![](https://i.imgur.com/CP0GevSm.png)

* Le n-gramme est une généralisation du bigramme, l'historique est juste plus long.

  ![](https://i.imgur.com/slguO3bm.png)

<details>
<summary>python</summary>

<pre lang="python">
from nltk.util import ngrams
from collections import Counter

tokens = preprocess_text(txt)

# Unigram (Bag-of-Words) approach:
bag_of_words = Counter(tokens)
print("Most frequent words according to Bag-of-Words:\n",
      bag_of_words.most_common(10))

# Bigram approach:
bigrams = Counter(ngrams(tokens, 2))
print("Most frequent word sequences according to Bigrams:\n",
      bigrams.most_common(10),
     "\n")
</pre>
</details>

## Choisir n

* Si on utilise un n-gramme pour générer un texte, on obtiendra un résultat plus ou moins réaliste suivant le nombre *n* de mots choisit. Les 5-grammes sont généralement meilleurs pour la génération de texte, mais ça dépend aussi des données et de la tâche à réaliser.

  ![](https://i.imgur.com/19kNz10m.png)

* Pour choisir le meilleur *n*, on peut 

  1. effectuer une évaluation extrinsèque, c'est à dire évaluer une tâche en aval: machine translation, speech recognition, spelling correction... C'est un bon moyen, mais on n'a pas toujours le temps ou les ressources pour (re)construire l'application entière.

  2. effectuer une évaluation intrinsèque, c'est à dire évaluer le modèle linguistique directement. La méthode la plus couramment utilisé est la [*perplexité*](nlp-perplexity.md) (*perplexity*)
