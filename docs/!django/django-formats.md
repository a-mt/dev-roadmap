---
title: Formats
category: Python, Django, i18n
---

## Internationalisation

* Outre la traduction d'un texte d'un language à l'autre (c'est à dire la *localisation*, abbrégé l10n), on veut également ajouter de l'*internationalisation* (abbrégé i18n), de sorte que l'application puisse être utilisée n'importe où dans le monde. Il va donc falloir prendre en compte un ensemble plus large de règles que le language, par exemple:

  - en France un nombre à décimale s'écrit avec une virgule (3,1) tandis qu'en Angleterre, on utilise le point (3.1).
  - la date s'écrit jour/mois (31/12) tandis qu'en Angleterre, on écrit mois/jour (12/31)
  - et si on écrit la date en lettres, on doit utiliser les mots du language — lundi vs monday

## Configurations

* Activer la localisation:

  <ins>www/core/settings/defaults.py</ins>

  ``` python
  USE_L10N = True

  FORMAT_MODULE_PATH = (
      'core.formats',
  )
  ```

* Déclarer les formats des différents languages

  <ins>www/core/formats/en/formats.py</ins>

  ``` python
  SHORT_YEAR_MONTH_FORMAT = 'Y/m'
  NUMERIC_DATE_FORMAT = 'm/d/Y'
  NUMERIC_DATETIME_FORMAT = 'm/d/Y H:i:s'
  CONDENSED_FILENAME_DATE_FORMAT = 'ymd'
  FULL_MONTH_YEAR_FORMAT = 'F Y'
  CONDENSED_MONTH_YEAR_FORMAT = 'b y'
  NUMERIC_UNIT_SEPARATOR = '\xa0'
  ```

  <ins>www/core/formats/fr/formats.py</ins>

  ``` python
  SHORT_YEAR_MONTH_FORMAT = 'm/Y'
  NUMERIC_DATE_FORMAT = 'd/m/Y'
  NUMERIC_DATETIME_FORMAT = 'd/m/Y H:i:s'
  CONDENSED_FILENAME_DATE_FORMAT = 'dmy'
  FULL_MONTH_YEAR_FORMAT = 'F Y'
  CONDENSED_MONTH_YEAR_FORMAT = 'b y'
  NUMERIC_UNIT_SEPARATOR = '\xa0'
  ```

## Récupèrer un texte i18n

On utilise `django.utils.formats` pour formatter des dates et nombres

### Nombres

``` python
def get_imc(instance, field, data):
    return _('IMC : {}').format(
      formats.localize(data, use_l10n=True)
    )
```

``` python
separator = formats.get_format('NUMERIC_UNIT_SEPARATOR')
```

### Dates

  ``` python
  today = datetime.date.today()
  now = datetime.datetime.now()

  # 2022
  print(formats.date_format(today, 'Y'))

  # 12/2022
  print(formats.date_format(today, 'SHORT_YEAR_MONTH_FORMAT'))

  # décembre 2022
  print(formats.date_format(today, 'FULL_MONTH_YEAR_FORMAT'))

  # déc 22
  print(formats.date_format(today, 'CONDENSED_MONTH_YEAR_FORMAT'))

  # 26/12/2022
  print(formats.date_format(today, 'NUMERIC_DATE_FORMAT'))

  # lundi 26 décembre 2022
  print(formats.date_format(today, 'l d F Y', use_l10n=False,))

  # 26/12/2022 24:59:59
  print(formats.date_format(now, 'NUMERIC_DATETIME_FORMAT'))

  # 24:59
  print(formats.date_format(now, 'TIME_FORMAT'))

  # 26 déc. 2022 24:59
  print(formats.date_format(now, 'SHORT_DATETIME_FORMAT'))
  ```

  [Formats date](https://docs.djangoproject.com/en/4.1/ref/templates/builtins/#std-templatefilter-date)

### Utilitaires

#### Taille du fichier (K,M,G)

``` python
from django.template.defaultfilters import filesizeformat

class File(models.Model):
    fileinput_size = models.PositiveIntegerField(
        editable=False,
    )

    @property
    def fileinput_size_formatted(self):
        return filesizeformat(self.fileinput_size)
```

## Changer de locale

* `activate` permet de changer le format utilisé, exactement comme pour le changement de langue

  <ins>www/core/tests/test_environment.py</ins>

  ``` python
  import datetime

  from django.utils.translation import activate
  from django.test import TestCase
  from django.utils import formats


  class EnvironmentTest(TestCase):

      def test_formats(self):
          date = datetime.date(2020, 12, 30)

          activate('en')
          self.assertEqual(
              formats.date_format(date, 'NUMERIC_DATE_FORMAT'),
              '12/30/2020'
          )

          activate('fr')
          self.assertEqual(
              formats.date_format(date, 'NUMERIC_DATE_FORMAT'),
              '30/12/2020'
          )
  ```
