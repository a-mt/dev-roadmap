---
title: Tableaux
category: Web, PHP
---

## Déclarer un tableau

Un tableau se crée avec

* `array( ... )`

  ``` php
  <?php
  $var = array("a","b","c");     # Array ( [0] => a [1] => b [2] => c )
  ```

* ou `[ ... ]` (depuis PHP 5.4)

  ``` php
  <?php
  $var = ["a","b","c"];          # Array ( [0] => a [1] => b [2] => c )
  ```

Un tableau PHP peut contenir n'importe quel type de valeur (chaîne de caractère, entier, objet, un autre tableau...) et plusieurs types dans un même tableau.

``` php
<?php
$var = array(
    "a",
    1,
    array("sous-tableau", "!")
);
```

<ins>Tableau associatif</ins>:

Tout tableau est une liste de clé / valeur.  
On dit qu'un tableau est *associatif* lorsque ses clés ne sont pas des entiers dans un ordre naturel (0, 1, 2... n).

Pour définir la clé, on utilise une flèche `=>`.  
Si la clé n'est pas précisée, elle vaudra la valeur maximale des clés + 1 (ou 0 si c'est la première).

``` php
<?php
$test = array(
    16 => 'Lincoln',
    'Johnson',
    'Grant'
);
# Array ( [16] => Lincoln [17] => Johnson [18] => Grant ) 
```

``` php
<?php
$test = array(
    'a' => 'Lincoln',
    'Johnson',
    'Grant'
);
# Array ( [a] => Lincoln [0] => Johnson [1] => Grant ) 
```

La clé peut également être calculée.

``` php
<?php
$k = 3;

$arr = array(
  1     =>0,
  1+1   =>1,
  $k    =>2,
  $k.'4'=>3
);
print_r($arr);
# Array ( [1] => 0 [2] => 1 [3] => 2 [34] => 3 ) 
```

<ins>Unicité des clés</ins>:

Une clé est unique, si deux clés identiques sont ajoutées au tableau, la dernière REMPLACE la première.

``` php
<?php
$test = array(
    3 => 'Lincoln',
    2 => 'Johnson',
    'Grant',
    4 => 'And more'
);
# Array ( [3] => Lincoln [2] => Johnson [4] => And more )
```

<ins>Types des clés</ins>:

Les clés sont converties implicitement soit en chaîne de caractères soit en entier:
* `"0"`, `0`, `0.0`, `false` valent `0`
* `""`, `null` valent `""`

``` php
<?php
$test = array(
    0     => '0',
    false => 'false',
    null  => 'null',
    ''    => '""'
);
# array(2) { [0]=> string(5) "false" [""]=> string(2) """" } 
```

<ins>Ordre des éléments</ins>:

L'ordre des éléments est toujours respecté à l'intérieur du tableau quelle que soit la valeur de la clé.

``` php
<?php
$test = array(
   3 => 'Lincoln',
   2 => 'Johnson',
   'Grant'
);
# Array ( [3] => Lincoln [2] => Johnson [4] => Grant )
```

---

## Récupérer la valeur d'un index

La valeur d'un index se récupère avec `$var[$idx]`.

``` php
<?php
$arr = ["a", "b", "c"];
echo $arr[2]; # c
```

Si on essaie d'accéder à un index qui n'existe pas, une erreur est levée (notice) —
 à moins d'utiliser `@`.

``` php
<?php
echo $arr[3];
# NOTICE Undefined offset: 3 on line number 4
```

---

## Ajouter des éléments

Pour ajouter un élément à la fin du tableau, on utilise `$var[] = ...`.  
On peut également préciser la clé à utiliser `$var["key"] = ...`.

``` php
<?php
$arr      = ["a", "b", "c"];
$arr[]    = "d";
$arr["k"] = "e";
# Array ( [0] => a [1] => b [2] => c [3] => d [k] => e )
```

Si la clé est précisée et qu'elle existe déjà, la nouvelle valeur remplace l'ancienne et prend sa position.

``` php
<?php
$arr[1] = "f";
# Array ( [0] => a [1] => f [2] => c [3] => d [k] => e )
```

---

## Produit cartésien

L'opérateur `+` permet d'effectuer un produit cartésien entre deux tableaux.  
Si le deuxième tableau contient les mêmes clés que le premier (associatives ou non), les valeurs du premier seront conservées.

``` php
<?php
$lc = array('a', 'b');
$uc = array('A', 'B', 'C');

print_r($lc + $uc);
# Array ([0] => a [1] => b [2] => C)
```

On peut se servir du produit cartésien pour ajouter une valeur avec une clé donnée au début du tableau.

``` php
<?php
$arr = ["a", "b", "c"];
$arr = array('d' => 4) + $arr;

# Array ( [d] => 4 [0] => a [1] => b [2] => c ) 
```

Attention cependant, si la même clé existe dans les deux tableaux, l'élément du tableau plus à droite est ignoré.

``` php
<?php
$arr = ["a", "b", "c"];
$arr = array(1 => 4) + $arr;

# Array ( [1] => 4 [0] => a [2] => c )
```