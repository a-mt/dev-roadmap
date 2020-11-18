---
title: 3 - Préparer et analyser les données
category: Machine Learning, Processus
latex: true
---

## Nettoyer les données

(*Data cleaning* ou *data cleansing* en anglais)

Après une première phase de nettoyage "en superficie" — formattage — des données, l'analyse des données (*exploratory data analysis [EDA]*) va nous permettre de creuser plus en profondeur et s'assurer que les données utilisées sont correctes pour construire le modèle.

### Données manquantes

Vérifier la présence de <ins>données manquantes</ins>. Les valeurs manquantes peuvent fausser les outils statistiques tels que la moyenne, la variance et le pourcentage, ce qui peut mener à des conclusions trompeuses et expliquer un modèle peu performant.

* Si la plupart des valeurs d'une caractéristique sont manquantes, on peut juste <ins>supprimer</ins> la caractéristique.

  ![](https://i.imgur.com/HioR3o6.png)

    <details>
    <summary>python</summary>

    <pre lang="python>
    # Supprimer les colonnes données
    reduced_X_train = X_train.drop(cols_with_missing, axis=1)
    reduced_X_valid = X_valid.drop(cols_with_missing, axis=1)
    </pre>
    </details>

* Si certaines valeurs d'une caractéristique sont manquantes, et qu'une valeur manquante n'a pas de signification particulière, on peut juste supprimer les lignes qui ont des valeurs manquantes.

    <details>
    <summary>python</summary>

    <pre lang="python>
    # Supprimer les lignes avec des données manquantes
    melbourne_data = melbourne_data.dropna(axis=0)
    </pre>
    </details>

* On peut aussi <ins>imputer</ins> les valeurs manquantes, c'est à dire les remplacer avec une valeur donnée — ce peut être une constante (comme 0) mais aussi le mode, la moyenne ou la valeur la plus fréquente.  
Ça permet généralement d'obtenir des modèles plus précis que si on supprime complètement la caractéristique — c'est souvent la médiane qui donne les meilleurs résultats.

  ![](https://i.imgur.com/PD10qMp.png)

    <details>
    <summary>python</summary>

    <pre lang="python">
    median = df['glucose']

    df['glucose'] = df['glucose'].fillna(med)
    </pre>

    <pre lang="python>
    from sklearn.impute import SimpleImputer

    # Imputation
    my_imputer = SimpleImputer()
    imputed_X_train = pd.DataFrame(my_imputer.fit_transform(X_train))
    imputed_X_valid = pd.DataFrame(my_imputer.transform(X_valid))

    # Remettre le nom des colonnes
    imputed_X_train.columns = X_train.columns
    imputed_X_valid.columns = X_valid.columns
    </pre>
    </details>

* Dernière alternative, <ins>marquer</ins> les lignes pour lesquelles la valeur est manquante.

  ![](https://i.imgur.com/AbLnxWC.png)

    <details>
    <summary>python</summary>

    <pre lang="python">
    df['sub_area'] = df['sub_area'].fillna('_MISSING_')
    </pre>

    <pre lang="python>
    # Copier les données originales
    X_train_plus = X_train.copy()
    X_valid_plus = X_valid.copy()

    # Créer de nouvelles colonnes pour indiquer les valeurs imputées
    for col in cols_with_missing:
        X_train_plus[col + '_was_missing'] = X_train_plus[col].isnull()
        X_valid_plus[col + '_was_missing'] = X_valid_plus[col].isnull()

    # Imputation
    my_imputer = SimpleImputer()
    imputed_X_train_plus = pd.DataFrame(my_imputer.fit_transform(X_train_plus))
    imputed_X_valid_plus = pd.DataFrame(my_imputer.transform(X_valid_plus))

    # Remettre le nom des colonnes
    imputed_X_train_plus.columns = X_train_plus.columns
    imputed_X_valid_plus.columns = X_valid_plus.columns
    </pre>
    </details>

### Données catégoriques

1. Identifier toutes les caractéristiques catégoriques comme telles. Une colonne contenant des valeurs 1,2,3,etc sera a priori considérée comme numérique. Si les numéros sont des labels (ex: siège 1,2,3), alors il faut caster la caractéristique — puisque ça n'aurait pas de sens de calculer la moyenne de valeurs catégoriques.

2. Certains algorithmes ne peuvent gérer que des valeurs numériques. En cas de valeurs catégoriques, on peut:

   * <ins>Supprimer</ins> la caractéristique.  
    Cette approche ne va être appropriée que si la caractéristique ne contient pas d'informations utiles.

   * <ins>Encoder les labels</ins> (*label encoding*)  
     Assigner un entier à chaque valeur différente.  
    Cette approche est appropriée s'il existe un ordre logique entre les différentes catégories. Exemple: non (0), oui (1) / jamais (0), rarement (1), la plupart du temps (2), tous les jours (3)

     ![](https://i.imgur.com/poo8NDm.png)

     <details>
     <summary>python</summary>

     <pre lang="python>
     from sklearn.preprocessing import LabelEncoder
     label_encoder = LabelEncoder()
     labels = {}

     for col in object_cols:
         X_train[col] = label_encoder.fit_transform(X_train[col])
         X_valid[col] = label_encoder.transform(X_valid[col])
         labels[col]  = list(encoder.classes_)
     </pre>

     <pre lang="python>
     values        = df.sex.astype('category')
     df['sex']     = values.cat.codes
     labels['sex'] = values.cat.categories
     </pre>
     </details>

   * <ins>Encoder un à un</ins> (*one-hot encoding*)  
     Créer un nouvelle colonne pour chaque valeur possible (caractéristiques couramment appelées *0/1 dummy variables*).  
     Cette approche est appropriée s'il n'existe qu'un nombre limité de valeurs (<15).

      ![](https://i.imgur.com/Dhve3Rz.png)

      <details>
      <summary>python</summary>

      <pre lang="python">
      from sklearn.preprocessing import OneHotEncoder

      # Apply one-hot encoder to each column with categorical data
      OH_encoder = OneHotEncoder(handle_unknown='ignore', sparse=False)
      OH_cols_train = pd.DataFrame(OH_encoder.fit_transform(X_train[object_cols]))
      OH_cols_valid = pd.DataFrame(OH_encoder.transform(X_valid[object_cols]))

      # One-hot encoding removed index; put it back
      OH_cols_train.index = X_train.index
      OH_cols_valid.index = X_valid.index

      # Remove categorical columns (will replace with one-hot encoding)
      num_X_train = X_train.drop(object_cols, axis=1)
      num_X_valid = X_valid.drop(object_cols, axis=1)

      # Add one-hot encoded columns to numerical features
      OH_X_train = pd.concat([num_X_train, OH_cols_train], axis=1)
      OH_X_valid = pd.concat([num_X_valid, OH_cols_valid], axis=1)
      </pre>

      <pre lang="python">
      df = df.join(pd.get_dummies(df.region, prefix='region')).drop('region', axis=1)
      df.head()
      </pre>
      </details>

   * <ins>Encoder le compte</ins> (*count encoding*)  
     Remplacer chaque valeur catégorique par le nombre de fois qu'elle apparaît dans les données. Si la valeur "GB" apparaît 10 fois dans la colonne "pays", "GB" sera remplacée par 10.

      <details>
      <summary>python</summary>

      <pre lang="python">
      import category_encoders as ce
      cat_features = ['category', 'currency', 'country']

      # Create the encoder
      count_enc = ce.CountEncoder()

      # Transform the features, rename the columns with the _count suffix, and join to dataframe
      count_encoded = count_enc.fit_transform(ks[cat_features])
      data = data.join(count_encoded.add_suffix("_count"))
      </pre>
      </details>

   * <ins>Encoder la cible</ins> (*target encoding*)  
     Remplacer chaque valeur catégorique par la moyenne de la valeur prédite pour cette catégorie. Par exemple, si la valeur prédite est le salaire, le valeur "GB" de la colonne "pays" sera remplacée par salaire moyen du pays.

     Il est nécessaire d'utiliser les mêmes valeurs pour l'entrainement et pour les tests / prédictions. Recalculer le salaire moyen avec les données de test constituerait une fuite des données prédites (*target leakage*).

      <details>
      <summary>python</summary>

      <pre lang="python">
      # Create the encoder
      target_enc = ce.TargetEncoder(cols=cat_features)
      target_enc.fit(train[cat_features], train['outcome'])

      # Transform the features, rename the columns with _target suffix, and join to dataframe
      train_TE = train.join(target_enc.transform(train[cat_features]).add_suffix('_target'))
      valid_TE = valid.join(target_enc.transform(valid[cat_features]).add_suffix('_target'))
      </pre>
      </details>

   * <ins>Encoder la cible avec augmentation</ins> (*CatBoost encoding*)  
     Similaire à l'exemple précédent sauf que pour chaque ligne, la valeur est calculée uniquement à partir des lignes avant la ligne en cours.

      <details>
      <summary>python</summary>

      <pre lang="python">
      # Create the encoder
      target_enc = ce.CatBoostEncoder(cols=cat_features)
      target_enc.fit(train[cat_features], train['outcome'])

      # Transform the features, rename columns with _cb suffix, and join to dataframe
      train_CBE = train.join(target_enc.transform(train[cat_features]).add_suffix('_cb'))
      valid_CBE = valid.join(target_enc.transform(valid[cat_features]).add_suffix('_cb'))
      </pre>
      </details>

### Date et heure

Typiquement, on récupère les données au format timestamp et on sépare les informations dans de nouvelles colonnes (années, mois, jour, heure, minute et seconde) — suivant la précision souhaitée.

<details>
<summary>python</summary>

<pre lang="python">
data['day']    = data['click_time'].dt.day.astype('uint8')
data['hour']   = data['click_time'].dt.hour.astype('uint8')
data['minute'] = data['click_time'].dt.minute.astype('uint8')
data['second'] = data['click_time'].dt.second.astype('uint8')
</pre>
</details>

### Données extrêmes

* Vérifier la distribution des données et supprimer les <ins>données extrêmes</ins> (*outliers* en anglais) — qui pourraient fausser le modèle qu'on cherche à construire.

  ![](https://i.imgur.com/7S5qPUam.jpg?1)

* Typiquement, on considère comme extrêmes
  * les valeurs inférieures au 1er quartile (Q1) moins une déviation standard de 1,5 de l'écart interquartile (IQR = Q3 - Q1):

    ```
    Extrême si > Q1 - 1.5 × IQR
    ```

  * les valeurs supérieures au 3ème quartile (Q3) plus une déviation standard de 1,5 de l'écart interquartile:

    ```
    Extrême si < Q3 + 1.5 × IQR
    ```

* Les données extrêmes peuvent résulter d'erreurs de traitement (auquel cas on peut simplement les supprimer) ou peuvent être légitimes. Si elles représentent moins de 2% de l'ensemble de données, généralement on va simplement les supprimer, mais tout dépend de la solution qu'on cherche à développer:

  * Si on regarde le salaire moyen d'une population, le revenus des millionaires doit-il être exclus?

  * Si on regarde les logs d'un site web et qu'un ID de session revient sans cesse (sûrement un bot) faut-il considérer ces logs?

### Corrélations

* Vérifier les <ins>corrélations</ins> entre les données en entrées (X) et les valeurs à prédire (y).

  * Entre 0 et 0.2:  
    pas de corrélation. On peut simplement supprimer cette caractéristique

  * Entre 0.3 et 0.6:  
    corrélation modérée

  * Entre 0.6 et 0.8:  
    bonne corrélation

  * Entre 0.8 et 1:  
    forte corrélation

  S'il n'y a aucune corrélation entre les différentes caractéristiques X et la valeur à prédire y, alors on ne peut pas créer de modèle avec les données dont on dispose.

  Si la déviation standard des données est de plus de 30%, il y a beaucoup de bruit dans les données, le modèle ne s'entraînera pas bien.

* Vérifier les corrélations entre les différentes caractéristiques.  
  La plupart des modèles requièrent que les caractéristiques ne soient pas corrélées pour fonctionner correctement. S'il y a une corrélation, ne garder qu'une des deux caractéristiques (ex: soit l'âge soit l'année de naissance, soit le pays soit la ville, etc).

* Notons que le coefficient de corrélation de Pearson (méthode utilisée par défaut par Pandas, le package usuellement utilisé pour analyser les données) ne permet de vérifier que les relations linéaires.

  ![](https://i.imgur.com/mVvshnu.png)

  Pour aller plus loin: [RIP correlation. Introducing the Predictive Power Score](https://towardsdatascience.com/rip-correlation-introducing-the-predictive-power-score-3d90808b9598)

---

## Séparer les données

(*Split data* en anglais)

### Train/test

* L'intérêt d'un modèle est de pouvoir faire des prédictions sur de nouvelles données. Pour évaluer le modèle (c'est à dire juger sa performance, combien de fois il tombe juste), on va utiliser des données que le modèle n'a jamais vu auparavant — des données qui n'ont pas été utilisée pour le calculer. Pour ce faire, on sépare le dataset en deux:

  * un sous-ensemble qui sera utilisé pour créer le modèle, qu'on appelle le *training set* (*ensemble de données d'entraînement* en français)

  * un sous-ensemble qui sera utilisé pour mesurer la performance du modèle sur des données qu'il n'a jamais vu auparavent, qu'on appelle le *test set* (*ensemble de données de test* en français)

* Typiquement, on utilise un partage de 70/30% ou de 80/20%.

  ![](https://i.imgur.com/M3sAjeo.png)

* Pour que ça fonctionne correctement, il faut que le *test set* soit représentatif des données (et non juste un intervalle) et donc mélanger les données avant de séparer les données en training/test set — à moins d'avoir affaire à des données datées, auquel cas on peut utiliser les données les plus récentes pour évaluer le modèle. Les frameworks de machine learning effectuent cette opération automatiquement.

  <details>
  <summary>python</summary>

  <pre lang="python">
  from sklearn.model_selection import train_test_split

  X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.3, random_state=0)
  </pre>

  <pre lang="python">
  from sklearn.model_selection import GroupShuffleSplit

  # We'll do a "grouped" split to keep all of an artist's songs in one
  # split or the other. This is to help prevent signal leakage.
  def group_split(X, y, group, train_size=0.75):
      splitter = GroupShuffleSplit(train_size=train_size)
      train, test = next(splitter.split(X, y, groups=group))
      return (X.iloc[train], X.iloc[test], y.iloc[train], y.iloc[test])
  
  X_train, X_valid, y_train, y_valid = group_split(X, y, artists)
  </pre>
  </details>

### Test/validation

On prend un peu d'avance, mais après avoir entraîné le modèle on devra également optimiser ses performances (ex: changer les hyperparamètres). Pour ne pas optimiser et choisir un modèle en se basant uniquement sur le test set (et potentiellement avoir un modèle plus performant sur cet ensemble de données mais par hasard), on sépare les données non plus en 2 mais en 3 ensembles:

* le *train set*, pour l'entrainement
* le *validation set*, pour évaluer et optimiser le modèle
* la *test set*, pour évaluer le modèle final (/ choisir entre différents modèles)

![](https://i.imgur.com/rSHq9dE.jpg)

---

## Mettre à échelle

(*Feature scaling* en anglais)

Il est parfois nécessaire de mettre les données à l'échelle pour que l'algorithme utilisé fonctionne correctement.

* <ins>**Normaliser**</ins>  
  Un dollar américain vaut environ 100 yens, si on ne change pas l'échelle des données alors des méthodes telles que SVM ou KNN considérerons une différence de 1 yen comme aussi importante qu'une différence de 1 USD.

  La normalisation consiste à mettre les valeurs dont on dispose dans une plage resteinte — typiquement [0,1] ou [-1,1]. On change l'intervalle des données.

  $$
  \text{Normalisation moyenne (-1, 1)} \\
  x_i = \frac{x_i - \mu}{max - min}
  $$

  $$
  \text{Normalisation minimum (0, 1)} \\
  x_i = \frac{x_i - min}{max - min}
  $$

  ![](https://i.imgur.com/HflZmCo.jpg)

  <details>
  <summary>python</summary>

  <pre lang="python">
  # for min_max scaling
  from mlxtend.preprocessing import minmax_scaling

  # generate 1000 data points randomly drawn from an exponential distribution
  original_data = np.random.exponential(size=1000)

  # mix-max scale the data between 0 and 1
  scaled_data = minmax_scaling(original_data, columns=[0])
  </pre>

* <ins>**Standardiser**</ins>  
  Généralement, on standardise les données lorsque l'algorithme utilisé suppose que les données sont normallement distribuées, comme LDA ou NBGaussian.

  La standardisation consiste à convertir les valeurs dont on dispose en écart-type. Par exemple, une valeur standardisée de 2 indique que la valeur initiale est 2 fois plus élevée que la moyenne. On change la distribution des données.

  $$
  \text{Standardisation} \\
  x_i = \frac{x_i - \mu}{std}
  $$

  ![](https://i.imgur.com/6TrKNp6.jpg)

  <details>
  <summary>python</summary>

  <pre lang="python">
  # for Box-Cox Transformation
  from scipy import stats

  # normalize the exponential data with boxcox
  normalized_data = stats.boxcox(original_data)
  </pre>
  </details>

Une bonne pratique est de tester le modèle avec et sans mise à échelle, et comparer leurs performances.

Pour aller plus loin:
[Data Cleaning in Python: the Ultimate Guide (2020)](https://towardsdatascience.com/data-cleaning-in-python-the-ultimate-guide-2020-c63b88bf0a0d)
