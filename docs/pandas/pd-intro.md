---
title: Création & accès aux éléments
category: Python, Library, Pandas
---

## Pourquoi Pandas

Pandas est une librairie utilisée pour l'analyse de données structurées (ex: une feuille Excel, un fichier .csv). Pandas permet de charger les données, les pré-traiter, les analyser et créer des rapports. Tous les packages de machine learning et de visualisation de données prennent des objets Pandas en entrée (DataFrame et Series). Sous le capot, Pandas utilise Numpy.

Par convention, Pandas est importé sous le nom `pd`

``` python
import pandas as pd
```

---

## Créer des objets Pandas

Pandas a deux grands types de structures: Series et DataFrame.

### Series

* Un objet Series permet de stocker un vecteur (1×n valeurs).

  ``` python
  pd.Series([10.5,35.2,12.9,18.7])
  '''
  0    10.5
  1    35.2
  2    12.9
  3    18.7
  dtype: float64
  '''
  ```

* <ins>Index</ins>  
  Par défaut, les Series ont un index auto-incrémenté (similaire aux index assignés aux listes Python, de 0 à n) mais on peut définir un index personnalisés (similaire aux dictionnaires Python sauf que les index sont ordonnés).

  ``` python
  ds = pd.Series([10.5,35.2,12.9,18.7])
  ds.index = [2017,2018,2019,2020]
  print(ds)
  '''
  2017    10.5
  2018    35.2
  2019    12.9
  2020    18.7
  dtype: float64
  '''
  ```

  Comme toujours, on a différentes manières de faire la même chose:

  ``` python
  pd.Series(
    [10.5,35.2,12.9,18.7],
    index=[2017,2018,2019,2020])
  ```

  ``` python
  pd.Series({
      2017: 10.5,
      2018: 35.2,
      2019: 12.9,
      2020: 18.7
  })
  ```

* <ins>Name</ins>  
  On peut donner un nom à l'objet. Ça ne présente pas un grand intérêt pour le moment, mais on peut combiner des Series pour former des DataFrame et assigner un nom permettra d'identifier les différentes colonnes.

  ``` python
  ds = pd.Series({
    'Tom'  : 8,
    'Kris' : 2,
    'Ahmad': 5,
    'Beau' : 6
  })
  ds.name = 'Certificates earned'
  print(ds)

  '''
  Tom      8
  Kris     2
  Ahmad    5
  Beau     6
  Name: Certificates earned, dtype: int64
  '''
  ```

  Le nom peut être définit au moment de l'initialisation:

  ``` python
  ds = pd.Series({
    'Tom'  : 8,
    'Kris' : 2,
    'Ahmad': 5,
    'Beau' : 6
  }, name='Certificates earned')
  ```

* <ins>Dtype</ins>  
  Un Series ne peut contenir qu'un seul type de données, qui sera automatiquement choisit par Pandas au moment de charger les données. Ou on peut spécifier le type explicitement — une erreur sera levée si des valeurs ne peuvent pas être castées

  ``` python
  print(pd.Series([10.5,35.2,12.9,18.7]))
  '''
  0    10.5
  1    35.2
  2    12.9
  3    18.7
  dtype: float64
  '''

  print(pd.Series([10.5,35.2,12.9,18.7], dtype='float16'))
  '''
  0    10.500000
  1    35.187500
  2    12.898438
  3    18.703125
  dtype: float16
  '''
  ```

  ``` python
  print(pd.Series([10.5,35.2,12.9,18.7]).astype('float16'))
  ```

  On peut vérifier le type de donnée d'un Series avec l'attribut `dtype`

  ``` python
  ds = pd.Series([10.5,35.2,12.9,18.7])
  print(ds.dtype) # float64
  ```

### DataFrame

* Un objet DataFrame permet de stocker une matrice (m×n valeurs)

  ``` python
  df = pd.DataFrame(data=[
      ('2017', 35, 21),
      ('2018', 41, 34)
  ])
  print(df)

  '''
        0   1   2
  0  2017  35  21
  1  2018  41  34
  '''
  ```

* <ins>Colonnes</ins>  
  On peut assigner un nom aux différentes colonnes:

  ``` python
  df = pd.DataFrame(data=[
      ('2017', 35, 21),
      ('2018', 41, 34)
  ])
  df.columns = [
    'Year',
    'Product A',
    'Product B'
  ]
  print(df)

  '''
     Year  Product A  Product B
  0  2017         35         21
  1  2018         41         34
  '''
  ```

  ``` python
  df = pd.DataFrame(data=[
      ('2017', 35, 21),
      ('2018', 41, 34)
    ], columns=[
      'Year',
      'Product A',
      'Product B'
    ]
  )
  ```

  ``` python
  df = pd.DataFrame({
      'Year'      : ['2017', '2018'],
      'Product A' : [35, 41],
      'Product B' : [21, 34]
  })
  ```

* <ins>Lignes</ins>  
  Et on peut assigner un index aux différentes lignes:

  ``` python
  df = pd.DataFrame({
      'Product A' : [35, 41],
      'Product B' : [21, 34]
  }, index=['2017', '2018'])

  print(df)
  '''
        Product A  Product B
  2017         35         21
  2018         41         34
  '''
  ```

  ``` python
  df = pd.DataFrame({
    'Product A' : [35, 41],
    'Product B' : [21, 34]
  })
  df.index=['2017', '2018']
  ```

  ``` python
  df = pd.DataFrame({
    'Year'      : ['2017', '2018'],
    'Product A' : [35, 41],
    'Product B' : [21, 34]
  })
  df = df.set_index('Year')
  ```

* <ins>Dtype</ins>  
  Chaque colonne ne peut contenir qu'un seul type de données, qui sera automatiquement choisit par Pandas au moment de charger les données.

  On peut vérifier les types de donnée d'un DataFrame avec l'attribut `dtypes`

  ``` python
  df = pd.DataFrame({
    'Year'      : ['2017', '2018'],
    'Product A' : [35, 41],
    'Product B' : [21, 34]
  })
  print(df.dtypes)
  '''
  Year         object
  Product A     int64
  Product B     int64
  dtype: object
  '''
  ```

  On peut modifier le type de chaque colonne individuellement avec `astype`:

  ``` python
  df['Year'] = df['Year'].astype('int16')
  print(df.dtypes)
  '''
  Year         int16
  Product A    int64
  Product B    int64
  dtype: object
  '''
  ```

  ``` python
  df['Gender'] = df['Gender'].astype('categorical')
  ```

---

## Méthodes & attributs Numpy

* Panda crée des objets Numpy avec les données, on peut donc appeler des fonctions Numpy sur ces objets.

  ``` python
  df = pd.DataFrame({
    'Product A' : [35, 41, 12],
    'Product B' : [21, 34, 44],
    'Product C' : [10, 38, 46]
  }, index=['2017', '2018', '2019'])

  print(df)
  '''
        Product A  Product B  Product C
  2017         35         21         10
  2018         41         34         38
  2019         12         44         46
  '''

  print(df.mean())
  '''
  Product A    29.333333
  Product B    33.000000
  Product C    31.333333
  dtype: float64
  '''

  df['Sum'] = df.sum(axis=1)
  print(df)
  '''
        Product A  Product B  Product C  Sum
  2017         35         21         10   66
  2018         41         34         38  113
  2019         12         44         46  102
  '''
  ```

  On peut utiliser `df.fonction` ou `np.fonction(df)`, le résultat est le même

  ``` python
  df['Mean'] = np.mean(df, axis=1)
  print(df)
  '''
        Product A  Product B  Product C  Sum  Mean
  2017         35         21         10   66  33.0
  2018         41         34         38  113  56.5
  2019         12         44         46  102  51.0
  '''
  ```

* On peut aussi accéder aux attributs Numpy:

  ``` python
  print(df.shape)
  '''
  (3, 4)
  '''
  ```

* Et appliquer les opérateurs arithmétique — avec ou sans broadcasting:

  ``` python
  # Broadcasting sur toutes les lignes & colonnes
  print(df + 100)
  '''
        Product A  Product B  Product C  Sum   Mean
  2017        135        121        110  166  133.0
  2018        141        134        138  213  156.5
  2019        112        144        146  202  151.0
  '''

  # Broadcasting sur toutes les lignes
  print(df + [100,200,300,0,0])
  '''
        Product A  Product B  Product C  Sum  Mean
  2017        135        221        310   66  33.0
  2018        141        234        338  113  56.5
  2019        112        244        346  102  51.0
  '''

  # Sans broadcasting
  print(df['Product A'] + df['Product B'])
  '''
  2017    56
  2018    75
  2019    56
  dtype: int64
  '''
  ```

---

## Accès

* On peut récupérer les valeurs d'une colonne via `df[colonne]`.  
  Les valeurs d'une ligne à un index donné via `df.loc[index]`  
  Et les valeurs d'une ligne à une position donnée (à partir de 0) via `df.iloc[i]`

  ``` python
  df = pd.DataFrame({
    'Product A' : [35, 41, 12],
    'Product B' : [21, 34, 44],
    'Product C' : [10, 38, 46]
  }, index=['2017', '2018', '2019'])

  print(df)
  '''
        Product A  Product B  Product C
  2017         35         21         10
  2018         41         34         38
  2019         12         44         46
  '''

  # Colonne Product A
  print(df['Product A'])
  '''
  2017    35
  2018    41
  2019    12
  Name: Product A, dtype: int64
  '''

  # Ligne 2017
  print(df.loc['2017'])
  '''
  Product A    35
  Product B    21
  Product C    10
  Name: 2017, dtype: int64
  '''

  # Ligne #0
  print(df.iloc[0])
  '''
  Product A    35
  Product B    21
  Product C    10
  Name: 2017, dtype: int64
  '''

  # Toutes les lignes, colonne #0
  print(df.iloc[:,0])
  '''
  2017    35
  2018    41
  2019    12
  Name: Product A, dtype: int64
  '''
  ```

### Liste

* Comme avec Numpy, on peut récupérer plusieurs éléments en utilisant une liste:

  ``` python
  print(df[['Product A', 'Product C']])
  '''
        Product A  Product C
  2017         35         10
  2018         41         38
  2019         12         46
  '''

  print(df.loc[['2017','2019']])
  '''
        Product A  Product B  Product C
  2017         35         21         10
  2019         12         44         46
  '''

  print(df.iloc[[0,2]])
  '''
        Product A  Product B  Product C
  2017         35         21         10
  2019         12         44         46
  '''
  ```

### Slicing

* Appliquer du slicing mais attention:
  1. quand on applique du slicing, la limite supérieure est incluse.

  2. le slicing s'effectue sur les lignes — ce qui peut être contre-intuitif puisque l'accès simple s'applique sur les colonnes.

  3. si on passe un entier plutôt qu'une chaîne de caractères, Pandas considère qu'il s'agit d'une position

  ``` python
  print(df['2017':'2018'])
  '''
        Product A  Product B  Product C
  2017         35         21         10
  2018         41         34         38
  '''

  print(df[:2])
  '''
        Product A  Product B  Product C
  2017         35         21         10
  2018         41         34         38
  '''
  ```

### Plusieurs dimensions

* On peut récupérer plusieurs dimensions avec loc ou iloc: `df.loc[ligne, colonne]` ou `df.loc[ligne][colonne]`. On peut ici aussi appliquer du slicing ou passer une liste.

  ``` python
  print(df.loc['2017':'2018',['Product A','Product C']])
  '''
        Product A  Product C
  2017         35         10
  2018         41         38
  '''
  ```

### Conditions & filtres

Comme pour Numpy, comparer un objet Pandas à une expression retourne un objet de booléens. On peut ensuite filtrer les objets avec les valeurs booléennes.

``` python
df = pd.DataFrame({
  'Product A' : np.arange(1,10),
  'Product B' : np.arange(10,100,10)
})
print(df)
'''
   Product A  Product B
0          1         10
1          2         20
2          3         30
3          4         40
4          5         50
5          6         60
6          7         70
7          8         80
8          9         90
'''

# Condition
print(df % 3 == 0)
'''
   Product A  Product B
0      False      False
1      False      False
2       True       True
3      False      False
4      False      False
5       True       True
6      False      False
7      False      False
8       True       True
'''

# Filtre
print(df[df['Product A'] % 3 == 0])
'''
   Product A  Product B
2          3         30
5          6         60
8          9         90
'''
```

### Résultat

* Le résultat obtenu est soit un DataFrame soit un Series suivant le nombre de dimensions récupérées. Dans un cas comme dans l'autre, ce sont des vues du DataFrame d'origine. Autrement dit, modifier une sélection modifie l'objet de base.

  ``` python
  # Broadcasting 0 to all values
  df.iloc[[0,2]] = 0

  print(df)
  '''
        Product A  Product B  Product C
  2017          0          0          0
  2018         41         34         38
  2019          0          0          0
  '''
  ```

* On peut transformer un Series en DataFrame avec `to_frame`

  ``` python
  df['Product A'].to_frame()
  ```

---

## Itérations

On peut itérer sur les lignes d'un DataFrame avec `iterrows`:

``` python
n = df.shape[0]

for index, row in df.iterrows():
    print('{0:d}/{1:d}'.format(index+1, n))
    download_content(row)
```

Pour mettre à jour une valeur du dataframe à l'intérieur de la boucle:

``` python
df.at[idx,'column'] = value
```

On peut itérer sur les valeurs d'un Series avec `iteritems`:

``` python
for index, val in df.iteritems():
    print(index, val)
```

---

## Méthodes par type

* Toutes les colonnes de type `datetime` ont un attribut `dt` qui permet d'accéder aux méthodes et attributs des datetimes.

  ``` python
  ds = pd.Series([
      pd.to_datetime('2020-05-01')
  ])
  print(ds.dt.day)
  ```

* Toutes les colonnes `category` ont un attribut `cat`.

  ``` python
  ds = pd.Series(['M', 'F', 'M', 'M', 'F'])
  print(ds)
  '''
  0    M
  1    F
  2    M
  3    M
  4    F
  dtype: object
  '''

  print(ds.astype('category').cat.codes)
  '''
  0    1
  1    0
  2    1
  3    1
  4    0
  dtype: int8
  '''
  ```

* Toutes les colonnes `object` ont un attribut `str`

  ``` python
  ds = pd.Series(['Alice', 'Bob', 'Carole'])
  print(ds.str.upper())
  '''
  0     ALICE
  1       BOB
  2    CAROLE
  dtype: object
  '''
  ```
