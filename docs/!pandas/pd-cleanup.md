---
title: Nettoyer les données
category: Python, Library, Pandas
---

## dropna

* `dropna` supprime les lignes qui contiennent des valeurs nulles.

  ``` python
   # Lignes contenant au moins une valeur nulle
  print(df.dropna())

  # Lignes ne contenant que des valeurs nulles
  df = df.dropna(how='all')

  # Lignes contenant au moins 3 valeurs nulles
  df = df.dropna(thres=3)
  ```

  On peut également supprimer les colonnes qui contiennent des valeurs nulles au lieu des lignes — accepte également `how` et `thres`.

  ``` python
  df = df.dropna(axis=1)
  ```

## replace

* `replace` permet de remplacer une valeur par une autre:

  ``` python
  df['Username'] = df['Username'].replace("@kerinokeefe", "@kerino")
  ```

  On peut l'appliquer sur le dataset entier:

  ``` python
  df.replace('?', np.NaN, inplace=True)
  ```

## fillna

* `fillna` remplit les valeurs nulles avec une valeur donnée

  ``` python
  # Broadcasting sur tout le tableau
  print(df.fillna(0))
  '''
     Column A  Column B  Column C  Column D
  0       1.0       0.0       0.0         4
  1       0.0       2.0       2.0         2
  2       7.0       3.0       0.0         9
  '''

  # Broadcasting colonne par colonne
  print(df.fillna({'Column A': 99, 'Column B': 98, 'Column C': 97}))
  '''
     Column A  Column B  Column C  Column D
  0       1.0      98.0      97.0         4
  1      99.0       2.0       2.0         2
  2       7.0       3.0      97.0         9
  '''

  # Broadcasting colonne par colonne
  print(df.fillna(df.mean()))
  '''
     Column A  Column B  Column C  Column D
  0       1.0       2.5       2.0         4
  1       4.0       2.0       2.0         2
  2       7.0       3.0       2.0         9
  '''
  ```

  On peut également remplir en mode forward filling ou backward filling, qui consiste à remplir avec la valeur non nulle précédente  ou suivante respectivement

  ``` python
  print(df.fillna(method='ffill'))
  '''
     Column A  Column B  Column C  Column D
  0       1.0       NaN       NaN         4
  1       1.0       2.0       2.0         2
  2       7.0       3.0       2.0         9
  '''

  print(ds.fillna(method='bfill'))
  '''
     Column A  Column B  Column C  Column D
  0       1.0       2.0       2.0         4
  1       7.0       2.0       2.0         2
  2       7.0       3.0       NaN         9
  '''
  ```

---

## duplicated

* Permet vérifier les lignes dupliquées (ont les mêmes valeurs mais pas le même index):

  ``` python
  df = pd.DataFrame(data=[
    ('Alice',20),
    ('Bob',30),
    ('Carole',25),
    ('Alice',20)
  ], columns=['Name', 'Age'])

  # La première instance n'est pas considérée comme dupliquée
  print(df.duplicated())
  '''
  0    False
  1    False
  2    False
  3     True
  dtype: bool
  '''
  ```

* Le paramètre `keep` permet de contrôler quelles lignes sont considérées comme dupliquées

  ``` python
  # La dernière instance n'est pas considérée comme dupliquée
  print(df.duplicated(keep='last'))
  '''
  0     True
  1    False
  2    False
  3    False
  dtype: bool
  '''

  # Toutes les instances sont considérées comme dupliquées
  print(df.duplicated(keep=False))
  '''
  0     True
  1    False
  2    False
  3     True
  dtype: bool
  '''
  ```

* Le paramètre `subset` permet de limiter la vérification à un ensemble de colonnes

  ```
  df.duplicated(subset=['Name'])
  ```

## drop_duplicates

Accepte les mêmes paramètres que `duplicated` mais retire les lignes dupliquées au lieu de retourner une matrice de booléens

``` python
print(df.drop_duplicates(keep=False))
'''
     Name  Age
1     Bob   30
2  Carole   25
'''
```

---

## map

* `map` est une fonction sur les objets Series qui permet de transformer les valeurs avec un callback

  ``` python
  df = pd.DataFrame(data=[
    ('Alice','2000-03-04',20),
    ('Bob','1990-12-03',30),
    ('Carole','1995-08-06',25),
    ('Alice','1980-04-15',40)
  ], columns=['Name', 'Date naissance', 'Age'])

  print(df['Name'].map(lambda x: x.upper()))
  '''
  0     ALICE
  1       BOB
  2    CAROLE
  3     ALICE
  Name: Name, dtype: object
  '''
  ```

## apply

* `apply` est une fonction sur les objets DataFrame qui s'applique ligne par ligne ou colonne ou colonne

  ``` python
  import hashlib

  def create_id(row):
      row['id'] = hashlib.md5(
          row['Date naissance'].encode('utf8') + row['Name'].encode('utf8')
      ).hexdigest()
      return row

  print(df.apply(create_id, axis=1))
  '''
       Name Date naissance  Age                                id
  0   Alice     2000-03-04   20  b4ef827e8286a1d7ddb88a5347d715e6
  1     Bob     1990-12-03   30  5b0deb16cabd6f37b029af0bb4f6ac36
  2  Carole     1995-08-06   25  6cc26d9601cd29ad46663bc1e0724ea7
  3   Alice     1980-04-15   40  310d308e72a6d991b8bb48a23c8b7b4c
  '''
  ```
