---
title: Importer/exporter les données
category: Python, Library, Pandas
---

## Bases

* Généralement, on ne crée pas un DataFrame à la main, mais on le charge à partir de fichiers. Par exemple, un fichier CSV:

  ``` python
  df = pd.read_csv('file.csv')
  ```

* Et après avoir nettoyé les données, on peut exporter les données dans un fichier:

  ``` python
  df.to_csv("../file.csv", index=False)
  ```

  NB: Le paramètre `index=False` désactive l'export des index, autrement la liste d'index occupe la première colonne

* Les formats les plus souvent utilisés sont les suivants:

  ![](https://i.imgur.com/TGiqL4t.png)

---

## Paramètres courants

* <ins>index_col</ins>  
  Par défaut, l'index des lignes est un auto-incrément (de 0 à n).  
  Pour utiliser une des colonnes du CSV comme index, définir le nom ou l'index de la colonne à utiliser avec le paramètre `index_col`

  ``` python
  df = pd.read_csv(filepath, index_col="Date")
  ```

* <ins>usecols</ins>  
  Par défaut, toutes les colonnes sont chargées. Mais on peut ne charger que certaines colonnes:

  ``` python
  # Avec leur nom
  df = pd.read_csv('exam_review.csv', usecols=['first_name', 'last_name', 'age'])

  # Avec leur position
  df = pd.read_csv('exam_review.csv', usecols=[0, 1, 2])
  ```

* <ins>dtype</ins>  
  Plutôt que de laisser Pandas décider du type des données, on peut forcer Pandas à utiliser un type donné:

  ``` python
  df = pd.read_csv('btc-market-price.csv', dtype={'Price': 'float'})
  ```

* <ins>parse_date</ins>  
  Par défaut, Pandas ne cherche pas à convertir les dates en datetime — c'est juste des chaînes de caractères. On peut indiquer à Pandas les colonnes à parser avec le paramètre `parse_dates` (nom ou position des colonnes)

  ``` python
  data = '''
  Date,Value
  2020-01-05,123.2
  2020-02-02,2135.8
  2020-03-01,215.7
  '''
  with open('file.csv', 'w') as f:
      f.write(data)
  ```

  ``` python
  df = pd.read_csv('file.csv', parse_dates=['Date'])
  print(df['Date'].dt.day)
  '''
  0     5
  1     2
  2     1
  Name: Date, dtype: int64
  '''
  ```

* <ins>date_parser</ins>  
  Si la colonne contient des valeurs que Numpy ne reconnaît pas comme une date, une erreur est levée. Pour résoudre ce problème, on peut

  1. Utiliser le paramètre `data_parser` si toutes les colonnes suivent le même format

      ``` python
      data = '''
      Date,Value
      Y2020M01D05,123.2
      Y2020M02D02,2135.8
      Y2020M03D01,215.7
      '''
      with open('file.csv', 'w') as f:
          f.write(data)
      ```

      ``` python
      def date_parser(val):
          # https://docs.python.org/2/library/datetime.html#strftime-strptime-behavior
          return pd.datetime.strptime(val, 'Y%YM%MD%d')

      df = pd.read_csv('file.csv', parse_dates=['Date'], date_parser=date_parser)
      print(df['Date'].dt.day)
      ```

  2. Sinon, parser les colonnes individuellement après avoir chargé les données

      ``` python
      df['Date'] = df['Date'].apply(date_parser)
      ```

      ``` python
      df['Date'] = pd.to_datetime(df['Date'], format='Y%YM%MD%d')
      ```

* <ins>header</ins>, <ins>names</ins>  
  Par défaut, pandas cherche le label des colonnes sur la première ligne du CSV.  
  Si le CSV ne contient pas de labels, utiliser `header=None` pour ne pas perdre la première ligne.  
  Si l'entête n'est pas sur la première ligne, utiliser `header=n` où *n* est le numéro de ligne où se trouve l'entête.

  Pour définir le nom des colonnes manuellement, utiliser `names`:

  ``` python
  data = '''
  2020-01-05,123.2
  2020-02-02,2135.8
  2020-03-01,215.7
  '''
  with open('file.csv', 'w') as f:
      f.write(data)
  ```

  ``` python
  df = pd.read_csv('file.csv', header=None, names=['Date','Value'])
  ```

* <ins>na_values</ins>  
  Permet d'indiquer les valeurs à considérer comme NaN

  ``` python
  df = pd.read_csv('btc-market-price.csv', na_values=['', '?', '-'])
  ```

* <ins>true_values</ins>  
  Permet d'indiquer les valeurs à considérer comme vrai:

  ``` python
  df = pd.read_csv('btc-market-price.csv', na_values=['vrai', 'VRAI', 'v'])
  ```

* <ins>false_values</ins>  
  Permet d'indiquer les valeurs à considérer comme faux:

  ``` python
  df = pd.read_csv('btc-market-price.csv', na_values=['faux', 'FAUX', 'f'])
  ```

* <ins>sep</ins>  
  Par convention, les champs d'un CSV sont délimités par des virgules (d'où le nom Comma-Separated-Values), mais on peut spécifier un autre délimiteur:

  ``` python
  df = pd.read_csv('exam_review.csv', sep='>')
  ```

* <ins>decimal</ins>  
  Si le dataset contient des données réelles qui contient un séparateur autre que le point entre la partie entière et la partie décimale, les valeurs seront considérées comme des chaînes de caractères et non réelles. Pour régler ce problème, spécifier le délimiteur des décimales:

  ``` python
  df = pd.read_csv('exam_review.csv', sep='>', decimal=',')
  ```

* <ins>thousands</ins>  
  Spécifie le séparateurs des milliers (ex: 1 000.9)

  ``` python
  df = pd.read_csv('exam_review.csv', sep='>', thousands=' ')
  ```

* <ins>encoding</ins>  
  Permet de spécifier l'encodage des données

  ```
  encoding='UTF-8'
  encoding='iso-8859-1'
  ```
  
  Si l'encodage n'est pas bon, une erreur est levée: `UnicodeDecodeError: 'utf-8' codec can't decode byte 0x99 in position 11: invalid start byte`.
  
  Le package `chardet` permet d'estimer l'encodage d'un fichier.
  
  ``` python
  import chardet
  
  # look at the first ten thousand bytes to guess the character encoding
  with open("../input/kickstarter-projects/ks-projects-201801.csv", 'rb') as rawdata:
      result = chardet.detect(rawdata.read(10000))

  # check what the character encoding might be
  print(result)
  '''
  {'encoding': 'Windows-1252', 'confidence': 0.73, 'language': ''}
  '''
  ```

* <ins>skip_blank_lines</ins>  
  Spécifie si les lignes vides doivent être ignorées ou non (vrai par défaut). Si faux, les lignes vides sont chargées avec des valeurs `NaN`  dans toutes les colonnes

  ``` python
  df = pd.read_csv('exam_review.csv', skip_blank_lines=False)
  ```

* <ins>skiprows</ins>  
  Lire le fichier à partir de la nème ligne (cela supprime également l'entête si elles est sur la première ligne) ou sauter les lignes A à B.

  ``` python
  df = pd.read_csv('exam_review.csv', skiprows=2)
  ```

  ``` python
  df = pd.read_csv('exam_review.csv', skiprows=[1,3])
  ```

* <ins>skip_footer</ins>  
  Nombre de lignes à ignorer à la fin du fichier

* <ins>nrows</ins>  
  Nombre de lignes à lire

---

## CSV

* Pour charger les données à partir d'un fichier CSV, on utilise `read_csv`

  ``` python
  df = pd.read_csv('file.csv')
  ```

* Pour exporter un dataframe en CSV, on utilise `to_csv`.   
  Le paramètre `index=False` désactive l'export des index, autrement la liste d'index occupe la première colonne

  ``` python
  df.to_csv("../file.csv", index=False)
  ```

Documentation: [pandas.read_csv](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_csv.html)

---

## TXT

Pour charger un TXT qui n'est structuré correctement — par exemple où les colonnes ne sont pas toutes ordonnées de la même manière d'une ligne à l'autre — alors il faut charger le fichier manuellement et structurer les données avant de charger le DataFrame.

``` python
import csv

with open('certificates.csv', 'r') as fp:
    reader = csv.reader(fp, delimiter=',')
    next(reader)
    for index, values in enumerate(reader):
        name, certs_num, months_num = values
        print(f"{name} earned {certs_num} certificates in {months_num} months")
```

---

## Excel

* Pour charger les données à partir d'un fichier XLS, on utilise `read_excel`

  ``` python
  df = pd.read_excel('file.xls', sheet_name=0)
  ```

  <ins>sheet_name</ins>   
  Indique le nom ou index de la feuille de calcul à utiliser (onglets affichés en bas dans Excel)

* Une autre approche possible est d'utiliser la classe `ExcelFile`

  ``` python
  excel_file = pd.ExcelFile('products.xlsx')
  print(excel_file.sheet_names)

  df = excel_file.parse('Merchants', index_col='merchant_id')
  ```

* Pour exporter un dataframe en XLS, il faut passer par `ExcelWriter`:

  ``` python
  writer = pd.ExcelWriter('cryptos.xlsx')
  btc.to_excel(writer, sheet_name='Bitcoin')
  eth.to_excel(writer, sheet_name='Ether')
  writer.save()
  ```

Documentation: [pandas.read_excel](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_excel.html)

---

## JSON

``` python
df = pd.read_json(filepath_or_url)
```

Pour récupérer un JSON distant qui nécessite des headers/cookies personnalisés ou qui n'est au bon format (ex dans une sous-clé), utiliser `requests`

``` python
import requests

def get_historic_price(
  symbol,
  exchange='bitfinex',
  after='2018-09-01'
):
    url = 'https://api.cryptowat.ch/markets/{exchange}/{symbol}usd/ohlc'.format(
      symbol=symbol,
      exchange=exchange
    )

    # Get JSON
    resp = requests.get(url, params={
        'periods': '3600',
        'after': str(int(pd.Timestamp(after).timestamp()))
    })
    resp.raise_for_status()
    data = resp.json()

    # Create DataFrame from JSON
    df = pd.DataFrame(
        data=data['result']['3600'],
        columns=[
          'CloseTime',
          'OpenPrice',
          'HighPrice',
          'LowPrice',
          'ClosePrice',
          'Volume',
          'NA'
    ])
    df['CloseTime'] = pd.to_datetime(df['CloseTime'], unit='s')
    df.set_index('CloseTime', inplace=True)

    return df

last_week = (pd.Timestamp.now() - pd.offsets.Day(7))

df_btc = get_historic_price('btc', 'bitstamp', after=last_week)
bf_eth = get_historic_price('eth', 'bitstamp', after=last_week)
```

---

## Table HTML

* `read_html` permet de charger des dataframes à partir de tables HTML:

  ``` python
  html_string = """
  <table>
      <thead>
        <tr>
          <th>Order date</th>
          <th>Region</th> 
          <th>Item</th>
          <th>Units</th>
          <th>Unit cost</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1/6/2018</td>
          <td>East</td> 
          <td>Pencil</td>
          <td>95</td>
          <td>1.99</td>
        </tr>
        <tr>
          <td>1/23/2018</td>
          <td>Central</td> 
          <td>Binder</td>
          <td>50</td>
          <td>19.99</td>
        </tr>
        <tr>
          <td>2/9/2018</td>
          <td>Central</td> 
          <td>Pencil</td>
          <td>36</td>
          <td>4.99</td>
        </tr>
        <tr>
          <td>3/15/2018</td>
          <td>West</td> 
          <td>Pen</td>
          <td>27</td>
          <td>19.99</td>
        </tr>
      </tbody>
  </table>
  """

  dfs = pd.read_html(html_string)
  dfs[0].head()
  ```

  `read_html` retourne une liste de dataframes — puisqu'il peut y avoir plusieurs tables dans le HTML.

* Si les entêtes de la table ne sont pas dans des `th` mais des `td`, spécifier la ligne contenant les entêtes:

  ``` python
  pd.read_html(html_string, header=0)[0]
  ```

* On peut également charger le HTML à partir d'une URL distante:

  ``` python
  html_url = "https://www.basketball-reference.com/leagues/NBA_2019_per_game.html"
  dfs = pd.read_html(html_url)
  ```

Documentation: [pandas.read_html](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_html.html)

---

## SQLite3

``` python
import sqlite3

_file = '../input/pitchfork-data/database.sqlite'
query = 'SELECT * FROM artists'

conn  = sqlite3.connect(_file)
df    = pd.read_sql_query(query, conn)
conn.close()
```

``` python
from sqlalchemy import create_engine

engine = create_engine('sqlite:///chinook.db')
conn   = engine.connect()
df     = pd.read_sql_table('employees', con=conn)
```

---

## SQL

``` python
from sqlalchemy import create_engine

engine = create_engine("postgresql+pg8000://YOUR_USERNAME:YOUR_PASSWORD@localhost/YOUR_DATABASE")
conn   = engine.connect()

df = pd.read_sql("SELECT * FROM stocks.stock_dim", conn)
```

``` python
df.to_sql('housing_table', con=connection, schema='public', if_exists='replace')
```

---

## Parquet

``` python
df = pd.read_parquet('../input/feature-engineering-data/baseline_data.pqt')
```

---

## Matlab

``` python
from scipy.io import loadmat

mat = loadmat('cardio.mat')
df  = pd.DataFrame(np.hstack((mat['X'], mat['y'])))
```
