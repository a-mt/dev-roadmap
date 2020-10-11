---
title: Explorer les données
category: Python, Library, Pandas
---

## head

* La fonction `head` retourne les 5 premières lignes du DataFrame — par défaut.  
  On peut récupérer plus ou moins de valeurs en passant le nombre souhaité en paramètre.

  ``` python
  df = pd.DataFrame({
      'A': np.arange(1,10),
      'B': np.arange(10,100,10)
  })
  print(df.head(3))
  '''
     A   B
  0  1  10
  1  2  20
  2  3  30
  '''
  ```

  C'est juste un raccourci pour `df[:nb]`

## tail

* La fonction `tail` retourne les 5 dernières lignes ou le nombre passé en paramètre

  ``` python
  print(df.tail(3))
  '''
     A   B
  6  7  70
  7  8  80
  8  9  90
  '''
  ```

  C'est juste un raccourci pour `df[-nb:]`

## info

* `info()` retourne les noms, le nombre de valeurs non nulles et le type de chaque colonne


    ``` python
  df = pd.DataFrame(data=[
      ('Alice','2000-03-04',20),
      ('Bob','1990-12-03',30),
      ('Carole','1995-08-06',25),
      ('Alice','1980-04-15',40)
  ], columns=['Name', 'Date naissance', 'Age'])
  print(df.info())

  df.info()
  '''
  <class 'pandas.core.frame.DataFrame'>
  RangeIndex: 4 entries, 0 to 3
  Data columns (total 3 columns):
  Name              4 non-null object
  Date naissance    4 non-null object
  Age               4 non-null int64
  dtypes: int64(1), object(2)
  memory usage: 176.0+ bytes
  None
  '''
  ```

## Attributs

* `columns`: liste des colonnes de l'objet

  ``` python
  df.columns
  '''
  Index(['Name', 'Date naissance', 'Age'], dtype='object')
  '''
  ```

* `index`: liste des index de l'objet

  ``` python
  df.index
  '''
  RangeIndex(start=0, stop=4, step=1)
  '''
  ```

* `values`: liste des valeurs

  ``` python
  df.values
  '''
  [['Alice' '2000-03-04' 20]
   ['Bob' '1990-12-03' 30]
   ['Carole' '1995-08-06' 25]
   ['Alice' '1980-04-15' 40]]
  '''
  ```

* `shape`: nombre de lignes et colonnes

  ``` python
  df.shape
  '''
  (4, 3)
  '''
  ```

* `dtypes`: type des différentes colonnes

  ``` python
  Name              object
  Date naissance    object
  Age                int64
  dtype: object
  ```

## select_dtypes

* `select_dtypes` permet de récupérer les colonnes d'un type donné

  ``` python
  # Colonnes de type object
  print(df.select_dtypes('object').columns)
  '''
  Index(['Name', 'Date naissance'], dtype='object')
  '''

  # Colonnes de type != object
  print(df.select_dtypes(exclude=['object']).columns)
  '''
  Index(['Age'], dtype='object')
  '''
  ```

## describe

* `describe()` retourne les statistiques descriptives de toutes les colonnes de type numérique

  ``` python
  df.describe()
  '''
               Age
  count   4.000000
  mean   28.750000
  std     8.539126
  min    20.000000
  25%    23.750000
  50%    27.500000
  75%    32.500000
  max    40.000000
  '''
  ```

  On peut passer le paramètre `percentiles` pour contrôler les percentiles à calculer:

  ``` python
  df.describe(percentiles=[0.05, .5, 0.95])
  '''
               Age
  count   4.000000
  mean   28.750000
  std     8.539126
  min    20.000000
  5%     20.750000
  50%    27.500000
  95%    38.500000
  max    40.000000
  '''
  ```

* On peut également récupérer les valeurs individuellement:

  ``` python
  len(df)           # Count
  df.mean()         # Mean
  df.std()          # Standard deviation
  df.min()          # Min
  df.max()          # Max
  df.quantile(.95)  # 95th percentile
  df.median()       # Median
  df.skew()         # Skewness
  df.kurt()         # Kurtosis
  ```

## values_counts

* `value_counts` compte le nombre d'occurence de chaque valeur

  ``` python
  print(df['Name'].value_counts())

  '''
  Alice     2
  Carole    1
  Bob       1
  Name: Name, dtype: int64
  '''
  ```

## unique

* `unique` retourne la liste des valeurs (sans duplicats)

  ``` python
  print(df['Name'].unique())
  '''
  ['Alice' 'Bob' 'Carole']
  '''
  ```

## nunique

* `nunique` retourne le nombre de valeurs uniques.  
  Le nombre de valeurs uniques dans une colonne est ce qu'on appelle sa *cardinalité*

  ``` python
  print(df['Name'].nunique())
  '''
  3
  '''
  ```

## isnull

* `isnull` retourne une matrice de booléen où les données non nulles valent False et les données nulles (tel que np.nan, np.nat ou None) valent True. Appeler `sum` sur le résultat permet de compter le nombre de valeurs nulles.

  ``` python
  df = pd.DataFrame({
    'Column A': [1, np.nan, 7],
    'Column B': [np.nan, 2, 3],
    'Column C': [np.nan, 2, np.nan],
    'Column D': [4, 2, 9]
  })
  print(df)
  '''
     Column A  Column B  Column C  Column D
  0       1.0       NaN       NaN         4
  1       NaN       2.0       2.0         2
  2       7.0       3.0       NaN         9
  '''

  print(df.isnull())
  '''
     Column A  Column B  Column C  Column D
  0     False      True      True     False
  1      True     False     False     False
  2     False     False      True     False
  '''

  print(df.isnull().sum())
  '''
  Column A    1
  Column B    1
  Column C    2
  Column D    0
  dtype: int64
  '''

  print(df.isnull().sum().sum())
  '''
  4
  '''
  ```

  L'inverse existe également: `nonnull()`

## groupby

* Permet de grouper sur les valeurs d'une colonne.

  ``` python
  print(df.groupby('Name').mean())
  '''
          Age
  Name
  Alice    30
  Bob      30
  Carole   25
  '''
  ```

  ``` python
  print(df.groupby('Name').nunique())
  '''
          Name  Date naissance  Age
  Name
  Alice      1               2    2
  Bob        1               1    1
  Carole     1               1    1
  '''
  ```

  ``` python
  # L'item le moins cher par catégorie:
  reviews.groupby('category').price.min()
  ```

  ``` python
  # Le plus cher et le moins cher par variété
  reviews.groupby('variety').price.agg([min, max])
  ```

## sort_values

* Trie les lignes selon les valeurs d'une ou plusieurs colonnes

  ``` python
  print(df.sort_values(by='year'))
  ```

  ``` python
  print(df.sort_values(by='year', ascending=False))
  ```

## sort_index

* Trie les lignes selon l'index

  ``` python
  print(df.sort_index())
  ```

  ``` python
  print(df.sort_index(ascending=False))
  ```

## qcut

* Regroupe les données en quantiles

  ``` python
  df = pd.DataFrame({'Age': np.random.randint(20, 60, size=50)})

  df['Ages_quantiles'] = pd.qcut(
      df.Age, 4,
      labels=['Young','Mid','Senior','Old']
  )
  df.groupby(['Ages_quantiles']) \
    [['Age']].agg(['min','mean','max','count'])

  '''
                 Age                     
                 min       mean max count
  Ages_quantiles                         
  Young           20  23.538462  27    13
  Mid             31  36.230769  43    13
  Senior          44  47.000000  51    13
  Old             53  55.272727  58    11
  '''
  ```

## cut

* Regroupe les données selon des bornes arbitraires

  ``` python
  df['Ages_bin']= pd.cut(
      df.Age, [0,30,40,50,60],
      include_lowest=True,
      labels=['Young','Mid','Senior','Old']
  )
  df.groupby(['Ages_bin']) \
    [['Age']].agg(['min','mean','max','count'])

  '''
             Age                     
           min       mean max count
  Ages_bin                         
  Young     20  23.538462  27    13
  Mid       31  35.000000  39    11
  Senior    43  45.333333  50    12
  Old       51  54.357143  58    14
  '''
  ```
