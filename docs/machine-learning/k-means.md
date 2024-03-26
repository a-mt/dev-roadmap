---
title: K-Means
category: Machine learning, algo
latex: true
---

* K-Means est un algorithme non supervisé de clustering.

## Comment ça fonctionne

1. Créer K points au hasard, dits *centroids*.
2. Assigner chaque point du dataset au centroid le plus proche.
3. Re-calculer la position de chaque centroid, pour qu'ils soient au centre des points attribués.
4. Répéter les étapes 2 et 3 jusqu'à ce que la position des centroids ne change plus.

![](https://i.imgur.com/CmbOkYi.png)

[K-Means.ipynb](notebooks/K-Means.html)

## Comment choisir K

Le nombre optimal de clusters n'est pas forcemment évident à savoir, particulièrement quand on ne peut pas visualiser les données (+ de 2 caractéristiques).

La méthode la plus répandue est "L-bow": choisir la valeur de K à partir de laquelle le modèle ne fait plus de "saut" d'amélioration — il ne fait plus que s'améliorer progressivement. Dans l'exemple ci-dessous, K=3 sera la valeur optimale.

![](https://i.imgur.com/pizONNY.png)

<details>
<summary>python</summary>
<pre lang="python">
sse = {}
for k in range(1,10):
    kmeans = KMeans(n_clusters=k, max_iter=100).fit(X)

    df['clusters'] = kmeans.labels_
    sse[k] = kmeans.inertia_

plt.figure()
plt.plot(list(sse.keys()), list(sse.values()))
plt.xlabel('No. of clusters (K-Value)')
plt.ylabel('Within Cluster Sum of Squared')
</pre>
</details>