---
title: Date
category: Web, Python
---

## datetime.date

Créer un date:

``` python
import datetime

datetime.date(2005, 12, 30)         # datetime.date(2005, 12, 30)

datetime.date.today()               # datetime.date(2023, 8, 5)
```

## datetime.datetime

Créer un datetime:

``` python
import datetime
import pytz

datetime.datetime(2012, 12, 31)     # datetime.datetime(2012, 12, 31, 0, 0)

datetime.datetime(2012, 12, 31, tzinfo=pytz.UTC)  # datetime.datetime(2012, 12, 31, 0, 0, tzinfo=<UTC>)

datetime.datetime.now()             # datetime.datetime(2023, 8, 5, 6, 22, 20, 334715)

datetime.datetime.utcnow()          # datetime.datetime(2023, 8, 5, 4, 22, 22, 470678)

datetime.strptime("25/11/2022", "%d/%m/%Y")

datetime.fromtimestamp(1617836400.0)
```

Modifier un datetime:

``` python
value                               # datetime.datetime(2023, 8, 5, 6, 56, 27, 172795)

value.replace(tzinfo=pytz.UTC)      # datetime.datetime(2023, 8, 5, 6, 56, 27, 172795, tzinfo=<UTC>)

value.replace(year=2018, month=9, day=1)  # datetime.datetime(2018, 9, 1, 6, 56, 27, 172795)

datetime.datetime.combine(value, datetime.time.max)  # datetime.datetime(2023, 8, 5, 23, 59, 59, 999999)

datetime.datetime.combine(value, datetime.time.min)  # datetime.datetime(2023, 8, 5, 0, 0)
```

Afficher un datetime:

``` python
value.timestamp()                   # 1691211387.172795

int(value.timestamp())              # 1691211387

value.year                          # 2023

value.time()                        # datetime.time(6, 56, 27, 172795)

value.isoformat()                   # '2023-08-05T06:56:27.172795'

value.strftime('%Y-%m-%d %H:%M:%S') # '2023-08-05 06:56:27'
```

| Code | Format | Exemple
|--- |--- |---
| %a | Nom du Jour de la semaine abbrégé | Sun
| %A | Nom du Jour de la semaine | Sunday
| %b | Nom du Mois abbrégé | Jan
| %B | Nom du Mois | January
| %c | Date et temps | Sun Jan 1 00:00:00 2021
| %d | Jour | 01 to 31 
| %H | Temps 24 heures | 00 to 23 
| %I | Temps 12 heures | 01 to 12 
| %j | Jour de l'année | 001 to 366 
| %m | Mois | 01 to 12 
| %M | Minute | 00 to 59 
| %p | AM ou PM | AM/PM
| %S | Secondes | 00 to 61 
| %U | Numéro de la Semaine (Sun) | 00 to 53 
| %W | Numéro de la Semaine (Mon) | 00 to 53 
| %w | Jour de la semaine | 0 to 6 
| %x | Représentation locale de la date | 08/16/88 (None); 08/16/1988 (en_US); 16.08.1988 (de_DE)
| %X | Représentation locale du temps | 21:30:00 (en_US); 21:30:00 (de_DE)
| %y | Année sans le siècle | 00 to 99
| %Y | Année | 2022
| %z | Offset | 900
| %Z | Time zone | EDT/JST/WET etc (GMT)

Changer de timezone:

``` py
from pytz import timezone

NY_time = datetime.strptime("25-11-2022  09:34:00-0700", "%d-%m-%Y  %H:%M:%S%z")

Tokyo_time = ny_time.astimezone(timezone("Asia/Tokyo"))
```

## time.time

``` python
import time

time.time()                         # 1691209077.3384707
```

## datetime.timedelta

Permet d'ajouter / soustraire un intervalle de temps donné à une date:

``` py
now        = datetime.datetime.now() # datetime.datetime(2023, 8, 5, 7, 14, 18, 396731)

today      = now.replace(hour=0, minute=0, second=0, microsecond=0)  # datetime.datetime(2023, 8, 5, 0, 0)
```

``` python
yesterday  = today - datetime.timedelta(days=1)  # datetime.datetime(2023, 8, 4, 0, 0)

a_year_ago = today - datetime.timedelta(365)  # datetime.datetime(2022, 8, 5, 0, 0)

a_min_ago  = today - datetime.timedelta(seconds=60)  # datetime.datetime(2023, 8, 4, 23, 59)
```

## dateutil.relativedelta

Permet d'ajouter / soustraire un nombre de mois donnés à une date (nombre de jours non fixe):

import math
import datetime

``` py
from dateutil.relativedelta import relativedelta

today = datetime.datetime(2020, 3, 16)                   # datetime.datetime(2020, 3, 16, 0, 0)
date = datetime.date(2020, 1, 15)                        # datetime.date(2020, 1, 15)
periodicity = 3
```

``` python
# how many months between date and now
diff = relativedelta(today, date)                        # relativedelta(months=+2, days=+1)
months = diff.years * 12 + diff.months + diff.days / 100 # 2.01

# next date = date1 + n*periodicity
n_periodic = math.ceil(months / periodicity)             # 1
diff = relativedelta(months=n_periodic * periodicity)    # relativedelta(months=+3)

next_date = date + diff                                  # datetime.date(2020, 4, 15)
```

## dateutil.parser

Permet de convertir une chaîne de caractères en datetime:

``` python
def normalize_date(txt, dayfirst=False):
    """
    Try to detect which date format it is, return it as ISO-8601
    :param string txt
    :return string|None
    """

    # Let dateutil try out a whole bunch of formats
    try:
        dt = dateutil.parser.parse(txt, dayfirst=dayfirst)

        # 67 stands for 1967, not 2067
        if dt.year > YEAR:
            dt = dt.replace(year=dt.year-100)

        return dt.strftime('%Y-%m-%d')

    except dateutil.parser.ParserError:
        return None
```
``` python
def test_normalize_date(self):
    res = functions.normalize_date('04-Mar-67', dayfirst=True)
    self.assertIsNotNone(res)
    self.assertEqual(res, '1967-03-04')

    res = functions.normalize_date('25.11.2021', dayfirst=True)
    self.assertIsNotNone(res)
    self.assertEqual(res, '2021-11-25')

    res = functions.normalize_date('04-03-2022', dayfirst=True)
    self.assertIsNotNone(res)
    self.assertEqual(res, '2022-03-04')

    res = functions.normalize_date('04/03/2022', dayfirst=True)
    self.assertIsNotNone(res)
    self.assertEqual(res, '2022-03-04')

    res = functions.normalize_date('04-Mar-67', dayfirst=False)
    self.assertIsNotNone(res)
    self.assertEqual(res, '1967-03-04')

    res = functions.normalize_date('25.11.2021', dayfirst=False)
    self.assertIsNotNone(res)
    self.assertEqual(res, '2021-11-25')

    res = functions.normalize_date('04-03-2022', dayfirst=False)
    self.assertIsNotNone(res)
    self.assertEqual(res, '2022-04-03')

    res = functions.normalize_date('04/03/2022', dayfirst=False)
    self.assertIsNotNone(res)
    self.assertEqual(res, '2022-04-03')

    res = functions.normalize_date('25/15/1984', dayfirst=True)
    self.assertIsNone(res)
```

## Django

### duration_iso_string

``` python
from django.utils.duration import duration_iso_string

duration_iso_string(datetime.timedelta(seconds=60))  # 'P0DT00H01M00S'
```

``` bash
if isinstance(value, datetime.datetime):   # must be before date
    return value.isoformat()

elif isinstance(value, datetime.date):
    return value.strftime('%Y-%m-%d')

elif isinstance(value, datetime.time):
    return value.strftime('%H:%M:%S')

elif isinstance(value, datetime.timedelta):
    return duration_iso_string(value)
```

### timezone

``` python
from django.utils import timezone

timezone.now()                     # datetime.datetime(2023, 8, 5, 4, 15, 19, 851789, tzinfo=<UTC>)

timezone.datetime(2016, 1, 1)      # datetime.datetime(2016, 1, 1, 0, 0)
```

#### timezone.make_aware

``` python
timezone.make_aware(value)         # datetime.datetime(2016, 1, 1, 0, 0, tzinfo=<DstTzInfo 'Europe/Paris' CET+1:00:00 STD>)

timezone.make_naive(value)         # datetime.datetime(2016, 1, 1, 0, 0)
```

``` python
from datetime import date, time
from dateutil.relativedelta import relativedelta

from django.conf import settings
from django.utils import timezone

# date = today - 1 month
today = datetime.date.today()
expired_delta = relativedelta(months=1)

maxage = today - expired_delta

# date to datetime at 23:59:59
maxage = timezone.datetime.combine(maxage, datetime.time.max)

# add timezone info
if settings.USE_TZ:
    maxage = timezone.make_aware(maxage)
```
