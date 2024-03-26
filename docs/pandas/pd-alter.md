---
title: Changer la structure
category: Python, Library, Pandas
---

## Drop

On utilise `drop` pour supprimer des lignes ou des colonnes.

* Supprimer une ou plusieurs lignes

  ``` python
  df.drop('Canada')

  df.drop(['Canada', 'Japan'])

  df.drop(['Italy', 'Canada'], axis=0)

  df.drop(['Canada', 'Germany'], axis='rows')

  # À partir de la 22ème ligne, supprimer une ligne toutes les 20 lignes
  # Utile si les entêtes sont repétées toutes les x lignes
  df.drop(range(22, dp.shape[0] + 1, 20))
  ```

* Supprimer une ou plusieurs colonne

  ``` python
  df.drop(columns=['Population', 'HDI'])

  df.drop(['Population', 'HDI'], axis=1)

  df.drop(['Population', 'HDI'], axis='columns')
  ```

* Par défaut, `drop` retourne un nouvel objet, on peut appliquer la suppression sur l'objet d'origine avec le paramètre `inplace=True`

* Si on essaie de supprimer une ligne ou colonne qui n'existe pas, une erreur est levée. On peut éviter ça en passant le paramètre `errors='ignore'`

## Rename

On utilise `rename` pour renommer des index et/ou colonnes.  
On peut passer des colonnes ou index qui n'existent pas — ça ne levera pas d'erreur.

``` python
# from:to
df.rename(
    columns={
        'HDI': 'Human Development Index',
        'Anual Popcorn Consumption': 'APC'
    }, index={
        'United States': 'USA',
        'United Kingdom': 'UK',
        'Argentina': 'AR'
    })
```

``` python
df.rename(index=str.upper)
```

``` python
df.rename(index=lambda x: x.lower())
```

``` python
reviews.rename(index={0: 'firstEntry', 1: 'secondEntry'})
```

## Changer d'index

* Définir la colonne a utiliser comme index pour les différentes lignes avec `set_index`:

  ``` python
  df = pd.DataFrame({
    'Product A' : [35, 41, 12],
    'Product B' : [21, 34, 44],
    'Product C' : [10, 38, 46],
    'Year'      : ['2017', '2018', '2019']
  })
  print(df)

  df = df.set_index('Year')
  print(df)
  '''
     Product A  Product B  Product C  Year
  0         35         21         10  2017
  1         41         34         38  2018
  2         12         44         46  2019
  '''
  ```

* Retirer l'index avec `reset_index`:

  ``` python
  df = df.reset_index()
  print(df)
  '''
     Year  Product A  Product B  Product C
  0  2017         35         21         10
  1  2018         41         34         38
  2  2019         12         44         46
  '''
  ```

* Changer l'ordre des index ou colonnes avec `reindex`:

  ``` python
  df = df.reindex(['a', 'b', 'c', 'd', 'e', 'f'])
  ```

  ``` python
  df = df.reindex(columns=sorted(df.columns))
  ```

## Assign

* On utilise `assign` pour ajouter des colonnes

  ``` python
  df = df.assign(hour=df.launched.dt.hour,
                 day=df.launched.dt.day,
                 month=df.launched.dt.month,
                 year=df.launched.dt.year)
  ```

* On peut aussi directement assigner des valeurs à une colonne qui n'existe pas encore:

  ``` python
  df['day']    = df['click_time'].dt.day.astype('uint8')
  df['hour']   = df['click_time'].dt.hour.astype('uint8')
  df['minute'] = df['click_time'].dt.minute.astype('uint8')
  df['second'] = df['click_time'].dt.second.astype('uint8')
  ```

## Append

* On utilise `append` pour ajouter des valeurs

  ``` python
  df = pd.DataFrame({
  'Product A' : [35, 41, 12],
  'Product B' : [21, 34, 44],
  'Product C' : [10, 38, 46]
  }, index=['2017', '2018', '2019'])

  df = df.append(pd.Series({
      'Product A': 1,
      'Product B': 2,
      'Product C': 3}, name='2020'))

  print(df)
  '''
          Product A  Product B  Product C
  2017         35         21         10
  2018         41         34         38
  2019         12         44         46
  2020          1          2          3
  '''
  ```

* On peut aussi directement assigner des valeurs à un index qui n'existe pas encore:

  ``` python
  df.loc['2021'] = {
      'Product A': 1,
      'Product B': 2,
      'Product C': 3
  }
  print(df[-1:])
  '''
        Product A  Product B  Product C
  2021          1          2          3
  '''
  ```

  Même principe pour les DataFrame non indexés, sauf qu'on utilisera `df.loc[len(df)] = ...`

  ``` python
  df_rank = pd.DataFrame(data=[], columns=['Feature', 'Importance'])

  for feature, imp in zip(X.columns, model.feature_importances_):
      df_rank.loc[len(df_rank)] = [feature, imp]

  df_rank.sort_values(by=['Importance'], ascending=False)
  ```

* Utiliser un dictionnaire permet de passer les différentes colonnes dans n'importe quel ordre mais si l'ordre est respecté alors on peut utiliser une liste.

  ``` python
  df.loc['2022'] = [1, 2, 3]

  print(df[-1:])
  '''
        Product A  Product B  Product C
  2022          1          2          3
  '''
  ```

---

## concat

* `concat` permet de combiner deux DataFrame en un

* Concaténer

  ``` python
  pd.concat([canadian_youtube, british_youtube])
  ```

* Joindre (se base sur l'index si colonne non précisée).  
  Utiliser des suffixes si les deux fichiers contiennent des colonnes qui ont le même label. Les suffixes sont ajoutés au nom des colonnes des datasets.

  ``` python
  left = canadian_youtube.set_index(['title', 'trending_date'])
right = british_youtube.set_index(['title', 'trending_date'])

  left.join(right, lsuffix='_CAN', rsuffix='_UK')
  ```
