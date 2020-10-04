---
title: Nettoyer les données textuelles
category: Python, Library, Pandas
---

## str.split

* `split` permet de séparer les chaînes de caractères d'un Series en une liste suivant un délimiteur donné

  ``` python
  df = pd.DataFrame({
      'Data': [
          '1987_M_US _1',
          '1990?_M_UK_1',
          '1992_F_US_2',
          '1970?_M_   IT_1',
          '1985_F_I  T_2'
  ]})

  df['List'] = df['Data'].str.split('_')
  print(df)
  '''
                Data                  List
  0     1987_M_US _1     [1987, M, US , 1]
  1     1990?_M_UK_1     [1990?, M, UK, 1]
  2      1992_F_US_2      [1992, F, US, 2]
  3  1970?_M_   IT_1  [1970?, M,    IT, 1]
  4    1985_F_I  T_2    [1985, F, I  T, 2]
  '''
  ```

  On peut éclater la liste en colonnes avec le paramètre `expand`

  ``` python
  print(df['Data'].str.split('_', expand=True))
  '''
         0  1      2  3
  0   1987  M    US   1
  1  1990?  M     UK  1
  2   1992  F     US  2
  3  1970?  M     IT  1
  4   1985  F   I  T  2
  '''

  df2 = pd.concat([df, df['Data'].str.split('_', expand=True)], axis=1)
  print(df2)
  '''
                Data                  List      0  1      2  3
  0     1987_M_US _1     [1987, M, US , 1]   1987  M    US   1
  1     1990?_M_UK_1     [1990?, M, UK, 1]  1990?  M     UK  1
  2      1992_F_US_2      [1992, F, US, 2]   1992  F     US  2
  3  1970?_M_   IT_1  [1970?, M,    IT, 1]  1970?  M     IT  1
  4    1985_F_I  T_2    [1985, F, I  T, 2]   1985  F   I  T  2
  '''

  df2 = df2.rename(columns={0:'Year', 1:'Sex', 2:'Country', 3:'# Children'})
  print(df2)
  '''
                Data                  List   Year Sex Country # Children
  0     1987_M_US _1     [1987, M, US , 1]   1987   M     US           1
  1     1990?_M_UK_1     [1990?, M, UK, 1]  1990?   M      UK          1
  2      1992_F_US_2      [1992, F, US, 2]   1992   F      US          2
  3  1970?_M_   IT_1  [1970?, M,    IT, 1]  1970?   M      IT          1
  4    1985_F_I  T_2    [1985, F, I  T, 2]   1985   F    I  T          2
  '''
  ```

## str.extract

* `extract` permet de séparer les chaînes de caractères d'un Series en une liste suivant les groupes d'un regex donné

  ``` python
  ds = pd.Series(['a1', 'b2', 'c3'])
  print(ds.str.extract('([^\d])(\d)'))
  '''
     0  1
  0  a  1
  1  b  2
  2  c  3
  '''
  ```

* `extractall` pour extraire tous les groupes

  ``` python
  ds = pd.Series(['a1a10', 'b2b20', 'c3c30'])

  print(ds.str.extract('([^\d]+)(\d+)'))
  '''
     0  1
  0  a  1
  1  b  2
  2  c  3
  '''

  print(ds.str.extractall('([^\d]+)(\d+)'))
  '''
           0   1
    match
  0 0      a   1
    1      a  10
  1 0      b   2
    1      b  20
  2 0      c   3
    1      c  30
  '''
  ```

  Le résultat est un tableau multi-indexé, pour séparer les deux, utiliser `reset_index`

  ``` python
  print(ds.str.extractall('([^\d])(\d+)').reset_index())
  '''
     level_0  match  0   1
  0        0      0  a   1
  1        0      1  a  10
  2        1      0  b   2
  3        1      1  b  20
  4        2      0  c   3
  5        2      1  c  30
  '''
  ```

  Pour récupérer un tableau "plat", utiliser `unstack`

  ``` python
  print(ds.str.extractall('([^\d])(\d+)').unstack())
  '''
         0     1    
  match  0  1  0   1
  0      a  a  1  10
  1      b  b  2  20
  2      c  c  3  30
  '''
  ```

## str.contains

* `contains` permet de vérifier si des cellules contiennent un motif donné (regex)

  ``` python
  print(df2['Year'].str.contains('[^\d]'))
  '''
  0    False
  1     True
  2    False
  3     True
  4    False
  Name: Year, dtype: bool
  '''
  ```

## str.strip

* `strip` permet de supprimer un caractère donné en début et/ou fin des cellules

  ``` python
  print(df2['Year'].str.strip('?'))
  '''
  0    1987
  1    1990
  2    1992
  3    1970
  4    1985
  Name: Year, dtype: object
  '''
  ```

* On peut également utiliser `lstrip` et `rstrip`

## str.replace

* `replace` permet de remplacer un motif par autre chose

  ``` python
  print(df2['Country'].str.replace(' +', lambda match: '[{0:d}]'.format(len(match.group(0))) ))
  '''
  0    US[1]
  1       UK
  2       US
  3    [3]IT
  4    I[2]T
  Name: Country, dtype: object
  '''
  ```

## str.cat

* `cat` permet de concaténer plusieurs colonnes entres elles

  ``` python
  df2['Year'].str.cat(df2['Sex'], sep=',')
  '''
  0     1987,M
  1    1990?,M
  2     1992,F
  3    1970?,M
  4     1985,F
  Name: Year, dtype: object
  '''
  ```

La plupart des fonctions sur les chaînes de caractères sont disponibles: [Working with text data](https://pandas.pydata.org/pandas-docs/stable/user_guide/text.html#method-summary)