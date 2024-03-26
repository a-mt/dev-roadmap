---
title: Apriori
category: Machine learning, algo
latex: true
---

* Apriori est un algorithme de détection des règles d'association: il trouve les combinaisons d'articles les plus fréquentes. 

  Il est principalement utilisé pour mettre en place des systèmes de recommendations — produits à ajouter au panier, relations à ajouter sur les réseaux sociaux, vidéos à regarder, etc.

## Métriques

* <ins>support</ins>: utilisé pour sélectionner les groupes apparaissant fréquemment  
  Support(A, B) = probabilité qu'une transaction contienne A et B

* <ins>confidence</ins>: utilisé pour générer les règles d'association    
  Confidence(A, B) = Support(A, B)/Support(A) = probabilité qu'une transaction contenant A contienne également B

  ![](https://i.imgur.com/ni7hBos.png)

## Comment ça marche

### 1. Sélectionner les groupes apparaissant fréquemment

Principe apriori: tous les sous-ensembles d'un ensemble d'éléments fréquent doivent être fréquents.

1. Pour chaque items de la base de données, compter le nombre de fois qu'il occure (C<sub>1</sub>).

2. Supprimer les éléments qui n'apparaissent pas fréquemment (L<sub>1</sub>). Le seuil à partir duquel un élément est considéré comme fréquent est un hyperparamètre — ex: apparaît dans au moins 1% des commandes.

3. Avec les éléments qui restent, créer des combinaisons de 2 (C<sub>2</sub>) — les articles qui ont été achetés ensemble sont mis dans un groupe.

4. Supprimer les combinaisons qui apparaissent le moins fréquemment (L<sub>2</sub>).

5. Avec les combinaisons qui restent, créer des combinaisons de 3 (C<sub>3</sub>). Et répéter ce processus jusqu'à ce qu'il ne soit plus possible de générer des groupes plus gros.

![](https://i.imgur.com/CBCMIH4.png)

<!-- https://i.imgur.com/EFmwuOZ.png -->

### 2. Générer les règles d'association

Calculer la confiance antecedant/conséquent pour chaque groupe d'éléments apparaissant souvent ensemble.  
Forme: "Antecedent &rarr; Consequence [support, confidence]" 

![](https://i.imgur.com/DhvNX2G.png)

Si une personne achète le produit A, il y a 66% de chances qu'elle achète le produit C. Si elle achète le produit C, il y a 100% de chances qu'elle achète le produit A.

[Apriori.ipynb](notebooks/Apriori.html)  
[Association Rules Generation from Frequent Itemsets](http://rasbt.github.io/mlxtend/user_guide/frequent_patterns/association_rules)