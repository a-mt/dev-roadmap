---
title: K-Nearest Neighbours
category: Machine learning, algo
---

* KNN est un algorithme supervisé de classification.

* Contrairement à la majorité des algorithmes de Machine Learning, KNN ne se base pas sur un modèle (on apprend un modèle à partir des données puis on effectue des prédictions à partir du modèle), mais utilise l'ensemble de données à chaque fois qu'on veut effectuer une prédiction.

## Comment ça fonctionne

* Pour chaque lignes de l'ensemble de données, on calcule la distance entre la ligne du dataset et celle qu'on veut prédire.
  En utilisant les K lignes les plus proches (plus petites distances), on retourne la valeur cible la plus courante comme prédiction.

  Dans l'exemple ci-dessous, on prédira "Yes" si K=3.

  ![](https://i.imgur.com/WGRyL49.pngg)

* Il est important de normaliser les données pour éviter qu'une caractéristique domine les autres.

* Différents K donnerons différents résultats.

  ![](https://i.imgur.com/PDFsHJR.png)

[KNN.ipynb](notebooks/KNN.html)

## Comment choisir K

1. Séparer le dataset en train/test set
2. Prédire le test set pour différentes valeurs de K et calculer l'erreur moyenne
3. Sélectionner la valeur K minimisant l'erreur

![](https://i.imgur.com/nU7Rdhk.png)

<details>
<summary>python</summary>
<pre lang="python">
scores = []
k_list = range(1,267)

for k in k_list:

    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        df.drop('Pclass', axis=1), df['Pclass'], test_size=0.3, random_state=0)

    # Train model
    knn = neighbors.KNeighborsClassifier(n_neighbors=k)
    knn.fit(X_train, y_train)
    score = knn.score(X_test, y_test)
    scores.append(score)

plt.plot(k_list, scores)
plt.xlabel("k")
plt.ylabel("Accuracy")
</pre>
</details>

## Pour & Contre

* Robuste aux valeurs abberantes

* Peut être appliqué quel que soit la distribution des données

* Prend de la place — nécessite de stocker l'ensemble de données en production

* Nécessite de calculer et comparer l'ensemble des données (O(knd)), ce qui peut être long suivant la taille du dataset

* Choisir K peut être difficile
