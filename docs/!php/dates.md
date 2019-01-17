---
title: Dates
category: Web, PHP
---

Il existe différentes manières de gérer les dates en PHP:
* un timestamp UNIX.  
  Représente le nombre de secondes écoulées depuis le 1er janvier 1970 (à 00:00:00).  
  Il n'y a pas de notion de fuseau horaire.  
  Sur un ordinateur 32bits, la date maximale d'un timestamp est le 19/01/2038 (timestamp overflow).

* un tableau contenant la date et l'heure.
* un objet `DateTime`.

---

## Vérifier la validité d'une date

### checkdate

Vérifie la validité d'une date:
- que l'année soit comprise entre 1 et 32767 inclus
- que le mois soit compris entre 1 et 12
- que le jour existe pour le mois et l'année donnés

``` php
<?php
echo checkdate(15,1,2015) ? 'Y' : 'N'; # N
```

Format américain, le mois est avant le jour.

---

## Créer un timestamp

### time

Retourne le timestamp de la date et heure actuelle.  
On peut également utiliser `strtotime("now")`

``` php
<?php
echo time(); # 1443701663
```

### microtime

Retourne un timestamp de la date et heure actuelle avec les microsecondes.

``` php
<?php
echo microtime(); # 0.73348100 1443701663
```

Par défaut, `microtime` retourne une chaîne de caractère au format "msec sec". Elle peut également retourner un nombre à virgule flottante, ce qui permet par exemple de mesurer le temps d'exécution d'un script.

```php
<?php
echo microtime(true); # 1443701663.7334
```

### mktime

Crée un timestamp à partir d'une liste d'arguments.  
Format américain : le mois en premier, ensuite le jour (HH, mm, ss, MM, DD, YY)

Les arguments peuvent être omis, de droite à gauche, et tous les arguments manquants sont utilisés avec la valeur courante de l'heure et du jour.

``` php
<?php
# 1er fevrier 2003
echo mktime(0,0,0,2,1,2003); # 1044057600 
```

``` php
<?php
# Aujourd'hui à minuit
echo mktime(0,0,0); # 1443657600 
```

### strtotime

Crée un timestamp à partir d'une chaîne de caractères.  
Insensible à la casse.

``` php
<?php
echo strtotime('02/01/2003'); # 1044075600
```

Peut prendre en entrée un timestamp à utiliser comme base pour le calcul relatif des dates.

``` php
<?php
echo strtotime('+1 month', $date);
```

<ins>Formats acceptés</ins>:

    +----------------------------------------------------------+
    | now                           | jeu. 18/08/2016 12:51:12 |
    +----------------------------------------------------------+
    | TIME (absolute)                                         ||
    | midnight                      | jeu. 18/08/2016 00:00:00 |
    | noon                          | jeu. 18/08/2016 12:00:00 |
    | 02:00                         | jeu. 18/08/2016 02:00:00 |
    | 02:30:15                      | jeu. 18/08/2016 02:30:15 |
    +----------------------------------------------------------+
    | TIME                                                    ||
    | -2 hours                      | jeu. 18/08/2016 10:51:12 |
    | +2 hours                      | jeu. 18/08/2016 14:51:12 |
    | 2 hours                       | jeu. 18/08/2016 14:51:12 |
    | -60 seconds                   | jeu. 18/08/2016 12:50:12 |
    | +60 seconds                   | jeu. 18/08/2016 12:52:12 |
    +----------------------------------------------------------+
    | DAY                                                     ||
    | yesterday                     | mer. 17/08/2016 00:00:00 |
    | today                         | jeu. 18/08/2016 00:00:00 |
    | tomorrow                      | ven. 19/08/2016 00:00:00 |
    | -2 days                       | mar. 16/08/2016 12:51:12 |
    | +2 days                       | sam. 20/08/2016 12:51:12 |
    | +2 days +2 hours              | sam. 20/08/2016 14:51:12 |
    +----------------------------------------------------------+
    | DAY OF WEEK*                                            ||
    | this Monday                   | lun. 22/08/2016 00:00:00 |
    | last Monday                   | lun. 15/08/2016 00:00:00 |
    | next Monday                   | lun. 22/08/2016 00:00:00 |
    | Monday this week              | lun. 15/08/2016 00:00:00 |
    +----------------------------------------------------------+
    | WEEK                                                    ||
    | this week                     | lun. 15/08/2016 12:51:12 |
    | last week                     | lun. 08/08/2016 12:51:12 |
    | next week                     | lun. 22/08/2016 12:51:12 |
    | this week midnight            | lun. 15/08/2016 00:00:00 |
    | -2 weeks                      | jeu. 04/08/2016 12:51:12 |
    | 2 weeks ago                   | jeu. 04/08/2016 12:51:12 |
    | +2 weeks                      | jeu. 01/09/2016 12:51:12 |
    | -2 weeks Monday               | lun. 08/08/2016 00:00:00 |
    +----------------------------------------------------------+
    | MONTH                                                   ||
    | this month                    | jeu. 18/08/2016 12:51:12 |
    | last month                    | lun. 18/07/2016 12:51:12 |
    | next month                    | dim. 18/09/2016 12:51:12 |
    | -2 months                     | sam. 18/06/2016 12:51:12 |
    | +2 months                     | mar. 18/10/2016 12:51:12 |
    +----------------------------------------------------------+
    | DAY OF MONTH*                                           ||
    | first day of this month       | lun. 01/08/2016 12:51:12 |
    | first Wednesday of this month | mer. 03/08/2016 00:00:00 |
    | last day of this month        | mer. 31/08/2016 12:51:12 |
    | first day of march            | mar. 01/03/2016 00:00:00 |
    | last day of march             | jeu. 31/03/2016 00:00:00 |
    +----------------------------------------------------------+
    | YEAR                                                    ||
    | this year                     | jeu. 18/08/2016 12:51:12 |
    | last year                     | mar. 18/08/2015 12:51:12 |
    | next year                     | ven. 18/08/2017 12:51:12 |
    | first day of jan              | ven. 01/01/2016 00:00:00 |
    | 01/01                         | ven. 01/01/2016 00:00:00 |
    | 01/01 next year               | dim. 01/01/2017 00:00:00 |
    | -2 years                      | lun. 18/08/2014 12:51:12 |
    | +2 years                      | sam. 18/08/2018 12:51:12 |
    +----------------------------------------------------------+
    | DATE*                                                   ||
    | 01/02                         | sam. 02/01/2016 00:00:00 |
    | 01/02/2015                    | sam. 02/01/2015 00:00:00 |
    | 01 March                      | mar. 01/03/2016 00:00:00 |
    | 01 March 2015                 | mar. 01/03/2015 00:00:00 |
    | 01.02.2016                    | lun. 01/02/2016 00:00:00 |
    | 01-02-2016                    | lun. 01/02/2016 00:00:00 |
    | 2016-02-01                    | lun. 01/02/2016 00:00:00 |
    | 20160201                      | lun. 01/02/2016 00:00:00 |
    +----------------------------------------------------------+
    | DATE + TIME                                             ||
    | 2016-02-01 01:02:30           | lun. 01/02/2016 01:02:30 |
    | 2016-02-01T01:02:30           | lun. 01/02/2016 01:02:30 |
    | 2016-02-01T010230             | lun. 01/02/2016 01:02:30 |
    | 20160201 01:02:30             | lun. 01/02/2016 01:02:30 |
    | 20160201T01:02:30             | lun. 01/02/2016 01:02:30 |
    | 20160201T010230               | lun. 01/02/2016 01:02:30 |
    +----------------------------------------------------------+
    | WEEK OF YEAR                                            ||
    | 2016W02                       | lun. 11/01/2016 00:00:00 |
    | 2016-W02                      | lun. 11/01/2016 00:00:00 |
    | 2016-W02-2                    | mar. 12/01/2016 00:00:00 |
    +----------------------------------------------------------+

<ins>Jours de la semaine</ins>:

    - sunday, sun
    - monday, mon
    - tuesday, tue
    - wednesday, wed
    - thursday, thu
    - friday, fri
    - saturday, sat

<ins>Mois</ins>:

    - january, jan, I
    - february, feb, II
    - march, mar, III
    - april, apr, IV
    - may, may, V
    - june, jun, VI
    - july, jul, VII
    - august, aug, VIII
    - september, sep, IX
    - october, oct, X
    - november, nov, XI
    - december, dec, XII

---

## Afficher la date

### date

Convertit un timestamp en chaîne de caractères au [format spécifié](http://php.net/manual/fr/datetime.formats.php).  
Si le timestamp est omis, utilise la date du jour.

``` php
<?php
$date = mktime(0,0,0,3,10);

echo date('d/m/Y', $date);       # 10/03/2015
echo date('Y-m-d H:i:s', $date); # 2019-03-10 00:00:00
```

### gmdate

`date` utilise le fuseau horaire du serveur.  
`gmdate` utilise le temps GMT (Greenwich Mean Time).

``` php
<?php
echo date("M d Y H:i:s", mktime(0, 0, 0, 1, 1, 1998));   # Jan 01 1998 00:00:00
echo gmdate("M d Y H:i:s", mktime(0, 0, 0, 1, 1, 1998)); # Jan 01 1998 05:00:00
```

### strftime

Convertit un timestamp en chaîne de caractères au [format spécifié](http://php.net/manual/fr/function.strftime.php) selon la locale en cours.  
Si le timestamp est omis, utilise la date du jour.

``` php
<?php
if(!setlocale(LC_ALL, "fra")) { # Windows
    setlocale(LC_ALL, "fr_FR.UTF-8"); # Linux
}
echo strftime("%A %d %B %Y"); # jeudi 01 octobre 2015
echo date("l d F Y");         # Thursday 01 October 2015
```

La locale définit doit être installée sur le serveur.
* [Liste des locales Windows](https://msdn.microsoft.com/en-us/library/39cwe7zf%28v=vs.90%29.aspx)
* Liste des locales Unix    : `locale -a`

---

## Array

### getdate

Retourne la liste des valeurs retournées par `date` sous forme de tableau associatif.

``` php
<?php
$date = mktime(10,34,14, 8,20,2016); # sam 20 aout 2016 10:34:14
print_r(getdate($date));

/* Array (
  [seconds] => 14   [minutes] => 34  [hours]   => 10
  [mday]    => 20   [mon]     => 8   [year]    => 2016
  [month] => August [wday]    => 6   [weekday] => Saturday
  [yday]    => 232  [0] => 1471682330
) */
```

### localtime

Retourne la date actuelle sous forme de tableau.  
Identique à la fonction C `localtime`.  
Les valeurs retournées, dans l'ordre, sont:
```
tm_sec, tm_min, tm_hour,
tm_mday, tm_mon, tm_year,
tm_wday, tm_yday, tm_isdst
```

``` php
<?php
print_r(localtime($date));

/* Array (
    [0] => 14 [1] => 34  [2] => 10
    [3] => 20 [4] => 7   [5] => 116
    [6] => 6  [7] => 232 [8] => 1
) */
```

Peut également retourner les valeurs sous forme de tableau associatif.

### date_parse_from_format

Parse une chaîne de caractères au [format spécifié](http://php.net/manual/fr/datetime.createfromformat.php) et retourne la date extraite sous forme de tableau associatif.

``` php
<?php
print_r(date_parse_from_format("d/m/Y H:i:s", "01/02/2013 04:05:06"));

/* Array (
    [year] => 2013 [month] => 2  [day] => 1
    [hour] => 4    [minute] => 5 [second] => 6

    [fraction]      =>
    [warning_count] => 0 [warnings] => Array ( )
    [error_count]   => 0 [errors]   => Array ( )
    [is_localtime]  =>
) */
```

---

## DateTime

### new DateTime

Le constructeur de DateTime accepte une chaîne de caractères au même format que [strtotime](#strtotime) pour initialiser la date.
Une erreur (fatale) est levée si le paramètre d'entrée n'est pas reconnu.

``` php
<?php
$date = new DateTime();
```

``` php
<?php
$date = new DateTime('today');
```

``` php
<?php
$date = new DateTime('2015-10-01');
```

On peut égalelement créer un DateTime à partir d'un timestamp en le préfixant de `@`

``` php
<?php
$time = strtotime('02/01/2003'); # 1 fevrier
$date = new DateTime('@' . $time);
```

### getTimestamp

La méthode `getTimestamp` retourne la date sous forme de timestamp.

``` php
<?php
echo $date->getTimestamp(); # 1044075600
```

### format

La méthode `format` retourne la date sous forme de chaîne de caractères selon le format spécifié.  
Même format que celui accepté par `date()`.

``` php
<?php
echo $date->format('Y-m-d H:i:s'); # 2003-02-01 05:00:00
```

### modify

La méthode `modify` permet d'incrémenter / décrémenter la date.  
Le format accepté est celui de `strtotime`.

``` php
<?php
$date->modify('+10 days');
```

``` php
<?php
$date->modify('-10 days');
```

### new DateInterval

Les objets `DateInterval` permettent de modifier les objets `DateTime`.  
Il permettent également de vérifier la différence entre deux `DateTime`.

Pour créer un `DateInterval`, on peut utiliser différents formats.

* format court

  ``` php
  # 10 jours
  new DateInterval('P10D');
  ```
  ``` php
  # 30 minutes
  new DateInterval('PT30M');
  ```
  ``` php
  # 1 mois et 30 minutes
  new DateInterval('P1MT30M');
  ```

* format long

  ``` php
  # 10 jours
  new DateInterval('P0000-00-10T00:00:00');
  ```
  ``` php
  # 30 minutes
  new DateInterval('P0000-00-00T00:30:00');
  ```
  ``` php
  # 1 mois et 30 minutes
  new DateInterval('P0000-01-30T00:00:00');
  ```

* format `strtotime`

  ``` php
  # 10 jours
  DateInterval::createFromDateString('10 days');
  ```
  ``` php
  # 30 minutes
  DateInterval::createFromDateString('30 minutes');
  ```
  ``` php
  # 1 mois et 30 minutes
  DateInterval::createFromDateString('1 month and 30 minutes');
  ```

Il est possible de créer un intervalle négatif,
* soit en utilisant `invert` sur le `DateInterval` crée

  ``` php
  $obj = new DateInterval("P30D");
  $obj->invert = 1; // Rendre négatif
  ```

* soit en utilisant le format `strtotime`

  ``` php
  $obj = DateInterval::createFromDateString('-30 minutes');
  ```

### add, sub

Une fois le `DateInterval` crée, il peut être utilisé pour ajouter ou soustraire cette durée à un `DateTime`.

``` php
<?php
$date->add(new DateInterval('P10D'));
```

``` php
<?php
$date->sub(new DateInterval('P10D'));
```

### diff

Retourne un objet `DateInterval` représentant l'intervalle entre deux `DateTime`.

``` php
<?php
$date = new DateTime('2015-10-01');

print_r($date->diff(new DateTime('2015-11-01')));
/* (
    [y] => 0 [m] => 1 [d] => 1
    [h] => 0 [i] => 0 [s] => 0
    [weekday] => 0 [invert] => 0 [days] => 31) */

print_r($date->diff(new DateTime('2015-09-01')));
/* (
    [y] => 0 [m] => 0 [d] => 30
    [h] => 0 [i] => 0 [s] => 0
    [weekday] => 0 [invert] => 1 [days] => 30) */
```

## Comparer deux DateTime

Pour comparer deux `DateTime`, on peut comparer les timestamps:

``` php
<?php
// 1er fevrier
$time = strtotime('02/01/2003');
$date = new DateTime('@' . $time);

// 1er janvier
$time = strtotime('01/01/2003');
$ref  = new DateTime('@' . $time);

// diff ?
echo ($date->getTimestamp() > $ref->getTimestamp() ? 'Y' : 'N'); # Y
```

Ou utiliser un `DateInterval`:

``` php
<?php
echo ($date->diff($ref)->invert ? 'date > ref' : 'date <= ref'); # date > ref
```