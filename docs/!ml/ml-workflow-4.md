---
title: 4 - Construire un modèle
category: Machine Learning, Processus
---

Une fois que les données ont été préparées, on peut créer un modèle à partir des données:

1. <ins>**Définir l'algorithme**</ins> à utiliser. Régression linéaire, non linéaire, arbre de décision, K-means, etc. Les possibilités sont nombreuses, et chaque algorithme a ses forces et ses faiblesses.  
   Le fonctionnement des différents algorithmes fera l'objet d'articles à part entière.

   Comment déterminer où et quand utiliser un algorithme plutôt qu'un autre?  
   Il n'existe pas d'algorithme standard pour un problème spécifique, on doit essayer différents algorithmes, les optimiser et comparer. Garder celui qui donne les meilleurs résultats.

   [![](https://i.imgur.com/Nat2iCe.jpg)](https://www.instagram.com/p/B8_qU0CgWzi/)

    ``` python
    from sklearn.tree import DecisionTreeRegressor

    # Define model
    model = DecisionTreeRegressor(random_state=1)
    ```

2. <ins>**Entraîner le modèle**</ins> (*fit*)  
   Dans le cas d'un algorithme supervisé, l'algorithme va utiliser les données pour chercher à miniminer les erreurs entre la valeur prédite (*f(x)*) et la valeur réelle (*y*).

    ``` python
    model.fit(train_X, train_y)
    ```

3. <ins>**Effectuer des prédictions**</ins> (*predict*)  
   Il s'agit tout simplement de calculer *f(x)* sur les données de test.

    ``` python
    predict_y = model.predict(test_X)
    ```

4. <ins>**Évaluer**</ins>  
   Comparer les valeurs prédites aux valeurs réelles des données de test.  
   Il existe différentes méthodes pour juger la performance d'un modèl. En fonction des problèmes constatés, on va pouvoir optimiser le modèle — changer les hyperparamètres, changer les données ou carrément changer d'algorithme.

   ``` python
   print("MEA:", mean_absolute_error(test_y, predict_y))
   ```