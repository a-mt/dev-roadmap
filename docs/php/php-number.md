---
title: Nombres
category: Web, PHP
---

## Entiers

Utiliser le code décimal pour définir un entier est la méthode la plus courante mais il est également possible d'utiliser le code octal, hexadécimal ou binaire.

| Code        | Exemple | Valeur décimale
|---          |---      |---
| Décimal     | `10`    | `10`
| Octal       | `010`   | `8`
| Hexadécimal | `0x10`  | `16`
| Binaire (depuis PHP 5.4) | `0b10`  | `2`

Le code octal est notamment utile pour les fonctions qui prennent en paramètre des permissions de fichier (comme `mkdir` et `chmod`):

``` php
<?php
mkdir($dir, 0777);
```

---

## Nombres relatifs

Tous les nombres, entiers ou réels, peuvent être positifs ou négatifs:

``` php
<?php
$a = +10;   # 10
$a = -10;   # -10
```

à ne pas confondre avec les opérateurs mathématiques:

``` php
<?php
$a += 10;   # $a + 10
$a -= 10;   # $a - 10
```

---

## Réels

Pour écrire un nombre à virgule, on utilise un point `.`. Le zéro est optionnel dans le partie entière d'un nombre réel:

``` php
<?php
$var = 0.1;
```

est équivalent à

``` php
<?php
$var = .1;
```

---

## Notation scientifique

On peut également utiliser la notation scientifique pour créer un nombre.  
La casse n'a pas d'importance, le `e` peut être minuscule ou majuscule.

``` php
<?php
$var = 1e3;    # 1000
$var = 1e-3;   # 0.001

$var = -1e3;   # -1000
$var = -1e-3;  # -0.001
