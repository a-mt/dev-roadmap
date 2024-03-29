---
title: 6 - Optimiser les performances
category: Machine Learning, Processus
latex: true
---

## Techniques

Certaines techniques d'optimisations sont spécifiques aux différents algorithmes:

* Régression linéaire ou logistique: régularisation L1 ou L2
* Decision Tree: pruning, random forest
* ?NN: régularisation batchnorm, dropout, early stopping, transfer learning
* CNN: augmentation des images

D'autres vont pouvoir être applicable dans la majorité des algorithmes, si ce n'est tous:

* Cross-validation
* Classification: Réequilibrer les classes
* Utiliser un ensemble (bagging, boosting, stacking)
* Ajuster les hyperparamètres

---

## Cross-validation

* Pour rappeler l'intérêt du dataset de validation:  
  Pour pouvoir évaluer les performances du modèle, on partitionne l'ensemble de données de départ en deux: train/test set. Si entre les deux, on veut adjuster le modèle (par exemple modifier les hyperparamètres pour améliorer les performances du modèle), alors on utilise un troisième groupe: le validation set. On a donc

  * un <ins>train set</ins>,  
    utilisé pour entraîner le modèle,

  * un <ins>validation set</ins>,  
    utilisé pour optimiser le modèle, c'est à dire évaluer le modèle et faire des changements en conséquence pour améliorer ses performances,

  * un <ins>test set</ins>,  
    utilisé pour vérifier les performances du modèle sur des données qu'il n'a jamais vu auparavant.

* Sauf qu'en partitionnant l'ensemble de données en trois sous-ensembles, on réduit considérablement le nombre de données qui peuvent être utilisées pour entraîner le modèle. Si l'ensemble de données de départ était déjà relativement petit, le *train set* sera probablement trop  petit pour pouvoir construire un bon modèle.

  Autre risque: si le *validation set* est petit, il risque de ne pas être fiable — si on utilise 2-3 données pour comparer les performances de différents modèle, que l'un ait de meilleures prédictions que l'autre sera surtout une question de chance.

* Pour parer ce problème, on peut utiliser la *cross-validation* (*validation croisée* en français).  
  La cross-validation K-fold consiste à exécuter l'algorithme et évaluer ses performances sur différents sous-ensembles de données comme suit:

  * On sépare les données en K segments
  * On entraîne les données sur K-1 segments et on mesure les performances du modèle sur le segment restant. On répète ce processus K fois, en utilisant un segment différent à chaque fois pour mesurer les performances.
  * On prend la moyenne des scores obtenus pour évaluer les performances.

  ![](https://i.imgur.com/j9V3l8P.png)

  En additionnant toutes ces itérations, 100% des données (hormi le test set) sont utilisées pour l'entraînement, et le score de performance est plus fiable, puisque c'est une moyenne calculée sur différents sous-ensembles.

* Si l'ensemble de données a un ordre chronologique, alors on ne peut pas utiliser la cross-validation K-fold, mais on peut utiliser une technique de *forward chaining*: on entraîne le modèle sur des données passées puis on teste ses performances sur des données futures:

  * fold 1: train [1], test [2]
  * fold 2: train [1 2], test [3]
  * fold 3: train [1 2 3], test [4]
  * etc

[Notebook: Cross-validation](https://www.kaggle.com/alexisbcook/cross-validation)

---

## Réequilibrer les classes

### Up-sampling de la classe minoritaire

* Le *up-sampling* (*sur-échantillonage* en français) consiste à dupliquer aléatoirement des observations d'une classe minoritaire pour renforcer son signal.

  * <ins>avec remplacement</ins>:  
    La probabilité de choisir l'élément x après avoir tiré l'élément y est 1/n: chaque tirage est indépendant, l'un n'influence pas l'autre. Mathématiquement, ça veut dire que la covariance entre les deux est 0.

          P(John, John) = (1/7) * (1/7) = .02
          P(John, Jack) = (1/7) * (1/7) = .02
          P(John, Qui)  = (1/7) * (1/7) = .02
          P(Jack, Qui)  = (1/7) * (1/7) = .02
          P(Jack Tina)  = (1/7) * (1/7) = .02

  * <ins>sans remplacement</ins>:  
    La probabilité de choisir l'élément x après avoir tiré l'élément y est 1/(n-1): tirer un élément rend plus probable le fait de tirer un autre élément. La covariance n'est pas 0.

        P(John, Jack) = (1/7) * (1/6) = .024
        P(John, Qui)  = (1/7) * (1/6) = .024
        P(Jack, Qui)  = (1/7) * (1/6) = .024
        P(Jack Tina)  = (1/7) * (1/6) = .024

  <!-- https://www.statisticshowto.com/sampling-with-replacement-without/-->

* La façon la plus courante de procéder est de:

  1. Séparer l'ensemble de données en différents sous-ensembles suivant leur classe
  2. Sur-échantiller avec remplacement la classe minoritaire, en fixant le nombre total d'élément à atteindre à celui de la classe majoritaire
  3. Re-combiner les différents sous-ensembles

<details>
<summary>python</summary>

<pre lang="python">
from sklearn.utils import resample

# Separate majority and minority classes
df_majority = df[df.balance==0]
df_minority = df[df.balance==1]

# Upsampling minority class
df_minority_up = resample(
  df_minority,
  replace=True,
  n_samples=len(df_majority),
  random_state=0
)

# Combine majority class with upsampled minority class
df_up = pd.concat([df_majority, df_minority_up])

# Display new class counts
df_up.balance.value_counts()
</pre>
</details>

### SMOTE

* La technique SMOTE (*Synthetic Minority Oversampling Technique*) consiste à créer de nouvelles données minoritaires entre les données minoritaires existantes.

  1. Sélectionner une donnée minoritaire (a)
  2. Sélectionner k données minoritaires les plus proches de a (B)
  3. Pour chacunes des données voisines sélectionnées (b):

     * Calculer la distance entre a et b (pour chacun des attributs)
     * Multiplier la distance par un nombre aléatoire entre 0 et 1
     * Créer un point à cet endroit — c'est à dire quelque part entre a et b.

  ![](https://i.imgur.com/71qbucWm.png)
  ![](https://i.imgur.com/6nqtxrBm.png)

  [Journal of Artificial Intelligence Research: SMOTE](https://arxiv.org/pdf/1106.1813v1.pdf)

<details>
<summary>python</summary>

<pre lang="python">
!pip install imbalanced-learn

from imblearn.over_sampling import SMOTE

smote = SMOTE()
X, y  = smote.fit_resample(X, y)
</pre>
</details>

### Down-sampling de la classe majoritaire

* *Down-sampling* (*sous-échantillonage* en français) consiste à supprimer aléatoirement des observations d'une classe majoritaire pour éviter que son signal domine.

* La façon la plus courante de procéder est de:

  1. Séparer l'ensemble de données en différents sous-ensembles suivant leur classe
  2. Sous-échantilloner sans remplacement la classe majoritaire, en fixant le nombre total à celui de la classe minoritaire
  3. Re-combiner les différents sous-ensembles

<details>
<summary>python</summary>

<pre lang="python">
from sklearn.utils import resample

# Separate majority and minority classes
df_majority = df[df.balance==0]
df_minority = df[df.balance==1]

# Downsampling majority class
df_majority_down = resample(
  df_majority,
  replace=False,
  n_samples=len(df_minority),
  random_state=0
)

# Combine minority class with downsampled majority class
df_down = pd.concat([df_majority_down, df_minority])

# Display new class counts
df_down.balance.value_counts()
</pre>
</details>

### NearMiss

* Le NearMiss consiste à supprimer les données majoritaires les plus éloignées de la classe minoritaire — pour garder un maximum de points proches de la limite de décision.

  1. Calculer les distances entre les observations de la classe majoritaire et les observations de la classe minoritaire (en utilisant K-Nearest Neighbors).

  2. Garder les observations de la classe majoritaire qui ont la distance la plus courte avec la classe minoritaire. Supprimer les plus éloignées.

[Under-over sampling.ipynb](notebooks/Under-over sampling.html)

Pour aller plus loin:  
[imbalanced-learn API](https://imbalanced-learn.readthedocs.io/en/stable/api.html)  
[Techniques to handle Class Imbalance in data](https://knowledgengg.wordpress.com/2019/03/04/this-is-suresh/)  
[Pandas resample() tricks for time-series data](https://towardsdatascience.com/pandas-resample-tricks-you-should-know-for-manipulating-time-series-data-7e9643a7e7f3)

---

## Ajuster les hyperparamètres

Différents algorithmes vont avoir différents hyperparamètres, des paramètres qui ne sont pas appris par l'algorithme mais définis par le développeur — par exemple: la fonction d'hypothèse, la fonction coût, la fonction d'optimisation, le nombre K à utiliser dans K-means, etc.  
   Quand on utilise un framework tel que Keras ou scikit-learn, les hyperparamètres ont une valeur par défaut. On commence généralement avec les valeurs par défaut et, après évaluation, on vient modifier les hyperparamètres. Le but étant de trouver la combinaison d'hyperparamètes avec laquelle le modèle est le plus performant. Pour ce faire, on peut utiliser:

* <ins>L'approche manuelle</ins>  
  Modifier différents hyperparamètres manuellement, avec une logique de trial and error.

* <ins>Grid Search</ins>  
  Dresser une liste des différentes valeurs d'hyperparamètres envisagées. Toutes les combinaisons possibles sont testées et la meilleure est sélectionnée.

  <details>
  <summary>python</summary>

  <pre lang="python">
  from sklearn.model_selection import GridSearchCV

  param_grid = {
      "n_estimators": [100, 200, 300, 400],
      "max_depth": [1, 3, 5, 7, 9],
      "criterion": ["gini", "entropy"],
  }
  model = GridSearchCV(
      estimator=rf_classifier,
      param_grid=param_grid,
      cv=5,
      verbose=2,
      n_jobs=1
  )
  model.fit(X_scaled,y)

  print(grid.best_estimator_)
  print(grid.best_score_)
  print(grid.best_params_)
  </pre>

  <a href="https://github.com/Davisy/Hyperparameter-Optimization-Techniques/blob/master/GridSearchCV%20.ipynb">GridSearchCV.ipynb</a>
  </details>

* <ins>Random Search</ins>  
  Teste des combinaisons aléatoires de valeurs, la meilleure est sélectionnée.

  <details>
  <summary>python</summary>

  <pre lang="python">
  from sklearn.model_selection import RandomizedSearchCV 

  param_grid = {
      "n_estimators": [100, 200, 300, 400],
      "max_depth": [1, 3, 5, 7, 9],
      "criterion": ["gini", "entropy"],
  }
  model = RandomizedSearchCV(
      estimator=rf_classifier,
      param_distributions=param_grid,
      n_iter=5,
      scv=5,
      verbose=2,
      n_jobs=1,
      random_state=42
  )
  model.fit(X_scaled,y)
  </pre>

  <a href="https://github.com/Davisy/Hyperparameter-Optimization-Techniques/blob/master/RandomizedSearchCV.ipynb">RandomizedSearchCV.ipynb</a>
  </details>

* <ins>Optimisation Bayesienne</ins>  
  Avec Grid Search et Random Search, chaque estimation d'hyperparamètre est indépendante. L'approche bayesienne construit une distribution de probabilité avec les performances passées pour estimer la performance du modèle avec certains choix d'hyperparamètres.

  <details>
  <summary>python</summary>

  <pre lang="python">
  !pip install scikit-optimize

  from skopt.searchcv import BayesSearchCV

  params = {
      "n_estimators": [100, 200, 300, 400],
      "max_depth": (1, 9),
      "criterion": ["gini", "entropy"],
  }
  search = BayesSearchCV(
      estimator=rf_classifier,
      search_spaces=params,
      n_jobs=1,
      cv=5,
      n_iter=30,
      scoring="accuracy",
      verbose=4,
      random_state=42
  )
  search.fit(X_scaled,y)

  print(search.best_score_)
  print(search.best_params_)
  </pre>
  </details>

Pour aller plus loin:  
[Hyperparameter Optimization Techniques](https://www.freecodecamp.org/news/hyperparameter-optimization-techniques-machine-learning/)  
[Bayesian Optimization](https://nanonets.com/blog/hyperparameter-optimization/#bayesian-optimization)

---

## Techniques d'ensemble

Un modèle aura toujours ses forces et ses faiblesses — il reconnaîtra certaines tendances, mais passera à côté des autres. Pour rendre les prédictions plus fiables, on peut construire différents modèles et les laisser "voter" la prédiction finale. Ça permet d'exploiter les points forts de différents modèles et les résultats seront généralement meilleurs que les résultats d'un seul modèle. Plusieurs approches existent pour parvenir à ce but.

### Bagging

(aka *boostrap aggregating*, *parallel ensemble learning*)

On divise l'ensemble de données en différents sous-ensembles, et on s'en sert pour entraîner parallélement différents modèles du même type. On utilise une méthode statistique (typiquement la moyenne) pour combiner les différentes prédictions en une seule.

Ex: Bagged Decision Trees, Extra Trees

  ![](https://i.imgur.com/ZybvE8al.png)

<details>
<summary>python</summary>

<pre lang="python">
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import BaggingClassifier

model_log = LogisticRegression(solver='liblinear')

bagging_log = BaggingClassifier(
    base_estimator=model_log,
    n_estimators=12
)
bagging_log.fit(X_train, y_train)

print('Accuracy Score on train:', bagging_log.score(X_train, y_train))
print('Accuracy Score on test:', bagging_log.score(X_test, y_test))
</pre>

<pre lang="python">
from sklearn.ensemble import ExtraTreesClassifier

model_et = ExtraTreesClassifier(n_estimators=8)
model_et.fit(X_train, y_train)

y_pred = model_et.predict(X_test)
print('Accuracy Score:', accuracy_score(y_test, y_pred))
</pre>
</details>

### Random Forest

Random Forest est une technique d'ensemble spécifiques aux Decision Tree. Là où une technique de bagging sélectionne des observations de manière aléatoire pour construire des modèles, Random Forest sélectionne des caractéristiques au hasard. Différents arbres vont donc choisir différentes caractéristiques pour partitionner les données. La prédiction finale est calculée en calculant la réponse moyenne des arbres.

Random Forest peut être utilisé comme une finalité (effectuer une prédiction à partir de différents modèles) mais aussi comme outil pour identifier les caractéristiques les plus pertinentes.

<details>
<summary>python</summary>

<pre lang="python">
# Random Forest
model = RandomForestClassifier(
  n_estimators=1000,
  max_features=2,
  oob_score=True
)
model.fit(X=X, y=y)

# Feature importance
df_rank = pd.DataFrame(
  data=[],
  columns=['Feature', 'Importance'])

for feature, imp in zip(X.columns, model.feature_importances_):
    df_rank.loc[len(df_rank)] = [feature, imp]

df_rank.sort_values(by=['Importance'], ascending=False)
</pre>
</details>

### Boosting

(aka *sequential ensemble learning*)

On entraîne un modèle, détermine quelles observations ont été mal prédites, puis on entraîne un nouveau modèle sur ces observations, en espérant qu'il leur accorde plus d'attention et que ses prédictions soient correctes. Chaque modèle apprend à partir des erreurs des précedents.

Ex: AdaBoost, Gradient Boosting Machine (GBM), Extreme Gradient Boosting (XGBoost)

  ![](https://i.imgur.com/SnUse8Ll.png)

<details>
<summary>python</summary>

<pre lang="python">
from sklearn.ensemble import AdaBoostClassifier

boosting_log = AdaBoostClassifier(
    base_estimator=model_log,
    n_estimators=10
)
boosting_log.fit(X_train, y_train)

print('Accuracy Score on train:', boosting_log.score(X_train, y_train))
print('Accuracy Score on test:', boosting_log.score(X_test, y_test))
</pre>

<pre lang="python">
from sklearn.ensemble import GradientBoostingClassifier

gboosting_log = GradientBoostingClassifier()
gboosting_log.fit(X_train, y_train)

y_pred = gboosting_log.predict(X_test)
print('Accuracy Score:', accuracy_score(y_test, y_pred))
</pre>
</details>

[AdaBoost, Gradient Boost, XGBoost](https://www.kdnuggets.com/2020/10/explain-machine-learning-algorithms-interview.html)

### Bucket of models

Ce n'est pas une technique d'ensemble — mais on en entend généralement parler dans ce contexte. On entraîne différents types de modèles en parallèle et on choisit celui qui a les meilleures performances.

### Stacking

(aka *voting*)

On entraîne différents types de modèles en parallèle et on combine leur résultat via une méthode statistique (comme la moyenne ou le mode).

  ![](https://i.imgur.com/n6Y8b9ql.png)

<details>
<summary>python</summary>

<pre lang="python">
from sklearn.ensemble import VotingClassifier

model1 = LogisticRegression(random_state=1)
model2 = DecisionTreeClassifier(random_state=1)

stacking = VotingClassifier(estimators=[
  ('lr', model1),
  ('dt', model2)
], voting='hard')

stacking.fit(X_train,y_train)
stacking.score(X_test,y_test)
</pre>
</details>