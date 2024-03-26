---
title: Decision Tree
category: Machine learning, algo
latex: true
---

* Decision Tree est un algorithme supervisé de classification ou de regression.

* Un decision tree construit un arbre comportant un ensemble de conditions hiérarchisées. Chaque noeud indique un test, chaque branche représente un résultat du test, chaque feuille nous permet d'effectuer une prédiction.

---

## Lire un arbre

On veut prédire si une personne va décrocher un CDI ou non. Après avoir lancé l'algorithme, on a obtenu l'arbre suivant:

  ![](https://i.imgur.com/WkZX7Cd.png)

  Pour prédire si la personne ayant les caractéristiques "{Experience:0, Employed:0, Previous jobs:0, Education level:0, Top-tier school:1, Interned:1}" va être engagée, on commence à partir du haut:  
  1. <ins>On lit la condition</ins>: interned <= 0.5.  
     La personne a-t-elle fait un stage dans l'entreprise?

  2. <ins>On suit la branche</ins> appropriée à notre cas.  
     Dans notre cas, Interned vaut 1 donc "Interned <= 0.5" est faux: on va vers la droite.

  3. <ins>S'il s'agit d'une feuille</ins> (le bloc ne contient pas de condition, comme c'est le cas ici), alors on peut d'ores et déjà donner une prédiction.

     Le bloc indique que, dans notre dataset, 5 personnes étaient dans cette situation (samples = 5).  
     Sur les 5 personnes, 0 ont reçus un Non et 5 ont reçus un Oui (value = [0, 5]).  
     Il est plus probable d'obtenir un Oui qu'un Non, donc on prédit Oui.

  4. <ins>S'il s'agit d'un noeud</ins> (si le bloc contient une condition, comme ça aurait le cas si on avait pris la branche de gauche), alors on reprend le processus à partir de l'étape 1 avec la nouvelle condition — et on répète jusqu'à finir sur une feuille.

---

## Construire un arbre

* Si on a les caractéristiques "{Experience, Employed, Previous jobs, Education level, Top-tier school, Interned}", comment décider quelle condition viendra en premier — en haut?

* L'index Gini est une métrique permettant de mesurer la qualité d'un partitionnement — ex: combien si on sépare Interned 0 vs Interned 1, combien pour Years Experience <10 vs >=10, etc (plus d'infos dans la section ci-dessous).  

   On calcule l'index Gini pour l'ensemble des partitionnements possibles. Le partitionnement qui a l'index Gini le plus bas est considéré comme le meilleur: on le met en premier. Puis on répète l'opération pour les sous-partitions jusqu'à avoir traité l'ensemble du dataset.

  [Decision Tree Classifier.ipynb](notebooks/Decision Tree Classifier.html)  
  [Decision Tree Regressor.ipynb](notebooks/Decision Tree Regressor.html)

* Notons qu'on peut utiliser différentes métriques:  
  * <ins>Dans le cas d'une classification</ins>: gini, entropy ou misclassification error.  
    L'index de Gini a une meilleure précision.

  * <ins>Dans le cas d'une régression</ins>: rmse.

  ![](https://i.imgur.com/5bx1QSI.png)

### Gini

Métrique décrite par l'algorithme Classification and Regression Tree (CART).

* Gini est une valeur entre 0 et 0.5 qui mesure l'"impureté" d'une catégorie. 0 indique une catégorie complètement homogène (ne contient qu'une seule valeur), 0.5 indique une catégorie très hétérogène.

  ![](https://i.imgur.com/NrKgSKE.png)

  Par exemple, si on classifie des animaux par espèce: un groupe où tous les animaux sont de la même espèce a un coefficient Gini 0, tandis qu'un groupe où tous les animaux sont d'une espèce différente a un coefficient Gini de 0.5

* Le coefficient Gini d'une catégorie contenant J classes (J valeurs distinctes) est 1 moins la somme des probabilités d'obtenir chaque classe, mises au carré.

  $$
  \text{Gini} = 1 - \sum_{i=1}^J P(i)^2
  $$

  ![](https://i.imgur.com/zCwUkym.png)

  <details>
  <summary>python</summary>
  <pre lang="python">
  def gini(x):
      res = 1
      n   = len(x)

      for c, count in x.value_counts().iteritems():
          res -= (count/n)**2

      return res

  # Gini of the "Hired" column
  # For the dataset filtered on Interned = 1
  x = df[df['Interned'] == 1]['Hired']

  print(x.value_counts())  # {1: 5}
  gini(x)                  # 0.0

  # Gini of the "Hired" column
  # For the dataset filtered on Interned = 0
  x = df[df['Interned'] == 0]['Hired']

  print(x.value_counts())  # {1: 4, 0: 4}
  gini(x)                  # 0.5
  </pre>
  </details>

* L'index Gini est la moyenne pondérée des coefficients de Gini

  $$
  \text{Gini index} = \sum_{k=1}^{K} P(k) \times Gini(k)
  $$

  <details>
  <summary>python</summary>
  <pre lang="python">
  def partition(df, b):
      return df[b], df[~b]

  def gini_index(true_rows, false_rows):

      n_true  = len(true_rows)
      n_false = len(false_rows)

      res  = 0
      res += gini(true_rows)  * n_true
      res += gini(false_rows) * n_false

      return res/(n_true+n_false)

  true_rows, false_rows = partition(df, df['Interned'] == 1)

  gini_index(true_rows['Hired'], false_rows['Hired'])
  # 0.3076923076923077
  </pre>
  </details>

### Entropy

Métrique décrite par l'algorithme Iterative Dichotomous (ID3).

* Similaire à l'index Gini mais avec un intervalle entre 0 et 1.

  $$
  \text{Entropy} = - \sum_{i=1}^J P(i) \times log_2 P(i)
  $$

  ![](https://i.imgur.com/hC5V452.png)

* Plutôt que de miniser l'index Gini, ID3 parle de maximiser le gain d'information — ce qui revient au même.

  $$
  \text{Information gain} = E(\text{Parent}) - {\text{Weighted Average}} * E(\text{Children})
  $$

### Misclassification error

Intervalle entre 0 et 0.5

  $$
  \text{Error} = 1 - max P(i)
  $$

  ![](https://i.imgur.com/LCSnupk.png)

## Optimisations

Les Decision Tree ont tendance à être sur-ajustés aux données.

### Pruning

L'algorithme C4.5 (très similaire à ID3 et CART) introduit un concept supplémentaire: l'*élagage* (*pruning* en anglais), qui consiste à réduire la complexité de l'arbre pour réduire les risques d'être sur-ajusté aux données.

* <ins>pre-pruning (ou forward pruning)</ins>: utiliser un critère d'arrêt pour limiter le nombre de noeuds crées. Ex: nombre minimum d'échantillons dans un groupe, nombre maximum de feuilles.

* <ins>post-pruning (ou backward pruning)</ins>: construire l'arbre puis éliminer les noeuds qui n'améliorent pas la performance de l'arbre.

## Pour & Contre

* Facile à interpréter
* Classification multi-classe possible
* Fonctionne mal si les classes sont déséquilibrées ou s'il y a des valeurs aberrantes
* Long à entraîner s'il y a beaucoup de caractéristiques
