---
title: Les types de données
category: BDD, MySQL
---

[Liste complètes des types](https://dev.mysql.com/doc/refman/5.7/en/create-table.html)  
[Taille des types](https://dev.mysql.com/doc/refman/5.7/en/storage-requirements.html)  
[Limite du nombre de colonnes et taille des n-upplets](https://dev.mysql.com/doc/refman/5.7/en/column-count-limit.html)

---

## Null

Tout type de données peut prendre la valeur nulle si le schema l'autorise.

### Format

Les valeurs nulles sont: `NULL`, `null` et `\N`.

``` sql
SELECT NULL;
SELECT null;
SELECT \N;
```

---

## Nombres

### Types

<table>
  <tr>
    <th><u><em>Type</em></u></th>
    <td>Description</td>
    <td>Minmax signé</td>
    <td>Non signé</td>
  </tr>
  <tr>
    <th>tinyint</th>
    <td>Entier sur 1 octet</td>
    <td>-128;127</td>
    <td>0;255</td>
  </tr>
  <tr>
    <th>smallint</th>
    <td>Entier sur 2 octets</td>
    <td>-32768;32767</td>
    <td>0;65535</td>
  </tr>
  <tr>
    <th>mediumint</th>
    <td>Entier sur 3 octets</td>
    <td>-8388608;8388607</td>
    <td>0;16777215</td>
  </tr>
  <tr>
    <th>int</th>
    <td>Entier sur 4 octets</td>
    <td>-2147483648;2147483647</td>
    <td>0;4294967295</td>
  </tr>
  <tr>
    <th>numeric(n,d)</th>
    <td>Réel (nombre de chiffres, précision)&nbsp;&nbsp;</td>
    <td>(5,2): -999.99;999.99</td>
    <td>(5,2): 0;999.99</td>
  </tr>
</table>

### Signe

Un nombre peut être signé ou non.  
Par défaut, les nombres sont signés (ils peuvent être positifs ou négatifs).
Il est possible de préciser que le nombre est non signé (uniquement positif), ce qui permet d'insérer des nombres plus grands :
- les valeurs d'un `TINYINT` vont de -128 à 127
- les valeurs d'un `TINYINT UNSIGNED` vont de 0 à 255.

<!-- -->

    type UNSIGNED

### Taille maximale

On peut préciser la taille maximale de la valeur

    type(largeur max)

Par exemple, `tinyint(1)` est un entier sur un chiffre (0 à 9).

La taille maximale de la donnée est indépendante de son poids en mémoire : `int(1)` prendra 4 octets en mémoire même si un seul octet est utilisé.
Par contre, MySQL effectuera des vérifications à l'insertion / modification des données: si la taille de la valeur est supérieure à la taille maximale, alors une erreur est retournée — `Data too long for column 'first_name' at row 1`.

### Format

Les décimales sont marquées par le point `.`.  

``` sql
SELECT 1;
SELECT .2;
SELECT 3.4;
SELECT -5;
SELECT -6.78;
SELECT +9.10;
```

La notation scientification est acceptée

``` sql
SELECT 1.2E3;
SELECT 1.2E-3;
SELECT -1.2E3;
SELECT -1.2E-3;
```

---

## Booléens

### Types

Le type `BOOL` ou `BOOLEAN` est un alias de `TINYINT(1)`.

### Format

Un booléean est `TRUE` / `FALSE` ou `1` / `0`.

``` sql
SELECT TRUE;
SELECT 1;
SELECT FALSE;
SELECT 0;
```

---

## Dates

### Types

<table>
  <tr>
    <th><u><em>Type</em></u></th>
    <td>Description</td>
    <td>Taille en mémoire</td>
    <td>Min..max</td>
  </tr>
  <tr>
    <th>date</th>
    <td>AAAA-MM-JJ</td>
    <td>3 octets</td>
    <td>'1000-01-01' <br>'9999-12-31'</td>
  </tr>
  <tr>
    <th>time</th>
    <td>hh:mm:ss</td>
    <td>3 octets</td>
    <td>'00:00:00' <br>'23:59:59'</td>
  </tr>
  <tr>
    <th>datetime</th>
    <td>AAAA-MM-JJ hh:mm:ss</td>
    <td>5 octets</td>
    <td>'1000-01-01 00:00:00' <br>'9999-12-31 23:59:59'</td>
  </tr>
  <tr>
    <th>timestamp&emsp;</th>
    <td>AAAA-MM-JJ hh:mm:ss&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;</td>
    <td>4 octets</td>
    <td>'1970-01-01 00:00:01' UTC <br>'2038-01-09 03:14:07' UTC</td>
  </tr>
</table>

### Format

Une chaîne de caractère peut être convertie en date si elle est au format 'YYYY-MM-DD' ou 'YY-MM-DD'.  
N'importe quel délimiteur est admis ou même aucun.

``` sql
SELECT DATE('2012-12-31');
SELECT DATE('2012/12/31');
SELECT DATE('2012^12^31');
SELECT DATE('2012@12@31');
SELECT DATE('20121231');
```

Les datetimes sont au format  'YYYY-MM-DD HH:MM:SS' ou 'YY-MM-DD HH:MM:SS'.  
N'importe quel délimiteur au même aucun. Un délimiteur différent peut être utilisé entre la partie date et heure.  
La date et l'heure sont separées par un espace ou par "T" (ou aucun si aucun délimiteur n'est utilisé).

``` sql
SELECT TIMESTAMP('2012-12-31 11:30:45');
SELECT TIMESTAMP('2012^12^31 11+30+45');
SELECT TIMESTAMP('2012/12/31 11*30*45');
SELECT TIMESTAMP('2012@12@31 11^30^45');
SELECT TIMESTAMP('2012-12-31T11:30:45');
SELECT TIMESTAMP('20121231113045');
```

Les times sont au format 'HH:MM:SS', 'HH:MM' ou 'SS'. Comme délimiteur, on utilise soit `:` soit rien.

``` sql
SELECT TIME('10:11:12');
SELECT TIME(101112);
SELECT TIME('10:11');
SELECT TIME('12');
```

---

## Chaînes de caractère

### Types

<table>
  <tr>
    <th><u><em>Type</em></u></th>
    <td>Description</td>
    <td>Max octets</td>
    <td>Max caractères<sup>(1)</sup></td>
  </tr>

<!-- CHAR -->
  <tr>
    <th>char(n)</th>
    <td>Chaîne de taille fixe à n caractères</td>
    <td>255 octets</td>
    <td>255</td>
  </tr>
  <tr>
    <th>varchar(n)&emsp;</th>
    <td>... taille variable < n caractères</td>
    <td>255 octets</td>
    <td>255</td>
  </tr>

<!-- TEXT -->
  <tr>
    <th>tinytext</th>
    <td>... taille variable < 2^8 octets &emsp;&nbsp;&nbsp;<sup>(2)</sup></td>
    <td>255 octets</td> 
    <td>255</td>
  </tr>
  <tr>
    <th>text</th>
    <td>... taille variable < 2^16 octets &emsp;<sup>(2)</sup></td>
    <td>64 Kilo</td>
    <td>65 535</td>
  </tr>
  <tr>
    <th>mediumtext</th>
    <td>... taille variable < 2^24 octets &emsp;<sup>(2)</sup></td>
    <td>16 Mega</td>
    <td>16 777 215</td>
  </tr>
  <tr>
    <th>longtext</th>
    <td>... taille variable < 2^32 octets &emsp;<sup>(2)</sup></td>
    <td>4 Giga</td>
    <td>4 294 967 295</td>
  </tr>

<!-- ENUM-->
  <tr>
    <th>enum('v1', 'v2')</th>
    <td>Une des valeurs énumérées</td>
    <td>64 Kilo</td>
    <td>65 535</td>
  </tr>
  <tr>
    <th>set('v1', 'v2')</th>
    <td>Une ou des valeurs parmis celles énumérées</td>
    <td>64 Kilo</td>
    <td>64 valeurs max.</td>
  </tr>
</table>

<sup>(1)</sup> <small>Calculé en caractères de 1 octet (en UTF-8 un caractère peut prendre entre 1 et 4 octets)</small>  
<sup>(2)</sup> <small>Il n'est pas possible d'allouer un attribut `DEFAULT` à une colonne de type `TEXT`</small>

### Encodage

Il est possible de préciser l'[encodage](https://dev.mysql.com/doc/refman/5.7/en/charset-mysql.html) à utiliser.  
`CHARACTER SET` précise l'encodage, `COLLATE` les règles de comparaison des chaînes (a/A, e/é, ss/ß, etc).

    nom_type [CHARACTER SET charset_name] [COLLATE collation_name]

Exemple:

``` sql
CREATE TABLE IF NOT EXISTS labels (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
)
```

### Format

Le texte est entouré de simples ou doubles quotes.

``` sql
SELECT 'a string';
SELECT "another string";
```

On peut échapper une quote avec `\` ou en la doublant

``` sql
SELECT 'a\'b';
SELECT 'a''b';
```

Les chaînes placés les unes à côté des autres (séparées par un espace) sont concaténées

``` sql
SELECT 'a string';
SELECT 'a' ' ' 'string';
```

Les [caractères spéciaux](https://dev.mysql.com/doc/refman/5.7/en/string-literals.html#character-escape-sequences) sont acceptés

``` sql
SELECT 'a\nb';
```

#### Code hexadécimal

Des caractères hexadécimaux peuvent être crées avec la notation `X'val'` ou `0xval`.

``` sql
SELECT X'01AF';
SELECT X'01af';
SELECT x'01AF';
SELECT x'01af';
SELECT 0x01AF;
SELECT 0x01af;
```

#### Code binaire

Les bits sont notés `b'val'` ou `0bval`

``` sql
SELECT b'01';
SELECT B'01';
SELECT 0b01;
```

#### Encodage

L'encodage et collations peuvent être précisé pour les données texte (y compris hexa et bits).

``` sql
SELECT _latin1'string';
SELECT _binary'string';
SELECT _utf8'string' COLLATE utf8_danish_ci;
```

``` sql
SELECT _latin1 X'4D7953514C';
SELECT _utf8 0x4D7953514C COLLATE utf8_danish_ci;
```

``` sql
SELECT _latin1 b'1000001';
SELECT _utf8 0b1000001 COLLATE utf8_danish_ci;
```
