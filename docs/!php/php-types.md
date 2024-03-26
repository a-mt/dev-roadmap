---
title: Types de données et variables
category: Web, PHP
---

## Types de données

Les différents types de données PHP sont:

| Type de données      | Nom                       | Exemple de valeur
|---                   |---                        |---
| Valeur nulle         | `null`                    | `null`
| Entier               | `integer`, `int`          | `0`
| Réel                 | `float`, `double`, `real` | `0.0`
| Booléen              | `boolean`, `bool`         | `true`, `false`
| Chaîne de caractères | `string`                  | `"Hello"`, `'Hello'`
| Fonction             | `callable`                | `function(){}`
| Objet                | `object`                  | `new stdClass`, `new stdClass()`
| Pointeur vers un fichier ou flux de données | `resource` | `fopen("file.txt")`

---

## Variables

### Assigner une variable

Toute variable commence par un dollar `$` suivit d'une suite de lettres (minuscules ou majuscules sans accent), chiffres et underscores `_`. Le nom de la variable ne peut pas commencer par un chiffre.

PHP est faiblement typé, il n'est pas nécessaire de déclarer le type de données, celui-ci est automatiquement déduit de la valeur. La variable peut changer de valeur et utiliser un type de données différent que celui avec laquelle elle a été initialisée.

``` php
<?php

$var = 10;
$var = "test";
$var = function() {
	return "OK";
};  # Attention le point-virgule est obligatoire dans ce cas
```

Notez qu'une affectation retourne la valeur assignée ce qui permet également d'afficher ou de tester la valeur en même temps.


``` php
<?php
echo $var = "hello world";
```

``` php
<?php
if($var = strtoupper("hello world")) {
    echo $var . '!';
}
```

### Afficher une variable

L'instruction `echo` ou `print` permet d'afficher la valeur d'une variable.

``` php
<?php
$var = "Hello";
echo $var;
```

``` php
<?php print "Hello";
```

``` php
<?php print("Hello");
```

`print` est une fonction (qui retourne toujours 1), `echo` est une procédure (qui ne retourne donc rien). À ce titre `echo` est légèrement plus rapide que `print`, en revanche il est possible de chaîner un `print` dans une expression, contrairement au `echo`.

``` php
<?php
if((true && print "it is true") || (!false && print "it is not false")) {
    //do somme stuff...
}
```

``` php
<?php
var_dump(echo "a");  # parse error
var_dump(print "a"); # OK
```

### Assigner plusieurs variables

Il est possible d'assigner la même valeur à plusieurs variables en même temps.
Cela permet d'initialiser ou de modifier rapidement plusieurs variables et c'est moins gourmand en mémoire que d'affecter les variables séparément.

``` php
<?php
$var = $var2 = '';
```

### Désigner une variable par une valeur

En PHP, le dollar peut se lire "valeur de". Il est ainsi possible de cumuler les dollars pour récupérer la *valeur de* la *valeur de*. Attention néanmoins à la perte de lisibilité du code:

``` php
<?php
$var  = "value";
$$var = "text";
echo $value; # Affiche "text"
```

``` php
<?php
$a = "b";
$b = "c";
$c = "d";
echo $a . $$a . $$$a;
# Affiche d (valeur de $a ("b") => valeur de $b ("c") => valeur de $c ("d"))
```

Les accolades `{}` sont des caractères d'interpolation: elles permettent de délimiter les variables, désigner ce sur quoi le dollar se rapporte.

``` php
<?php
${$var} = "text";
```

Cela permet par exemple

* de créer le nom de la variable dynamiquement.

  ``` php
  <?php
  ${$var."2"}     = "text";
  ${"name_$type"} = "text";
  ${mafonction()} = "text";
  ```

* D'enlever l'ambiguïté des double-dollars quant on cherche à accéder à l'élément d'un tableau.

  ``` php
  <?php
  ${$arr[1]}
  ${$arr}[1]
  ```

* D'isoler les variables à l'intérieur des chaînes de caractère pour que le code fonctionne correctement.

  ``` php
  <?php
  echo "Il y a plusieurs ${objet}s".
  echo "On affiche un ${tableau['index']}"
  ```

  À l'intérieur des doubles-quotes, le dollar peut être placé avant ou après l'accolade ouvrante:  
  `"${text}"` == `"{$text}"`, même principe que `${"text"}` vs `$text`.

[php.net: Les variables dynamiques](http://us3.php.net/variables.variable)

### Assigner par référence

Il est possible d'assigner par référence la valeur d'une variable à une autre.
Lorsqu'on récupère la valeur d'une variable qui référence une autre variable, on récupère en vérité la valeur de cette dernière. Si sa valeur a changé entre temps, c'est la nouvelle valeur qui est récupérée. Attention, en modifiant la valeur d'une variable pointant vers une autre, on modifie la valeur de la référence.

Une référence vers une autre variable s'appelle un *pointeur* et, en PHP, il faut précéder la variable d'un et commercial `&` pour créer un pointeur.

``` php
<?php
$ref = 1; $copy = $ref;  $ref = 2;      # $ref == 2, $copy == 1
$ref = 1; $copy = &$ref; $ref = 2;      # $ref == 2, $copy == 2
$ref = 1; $copy = &$ref; $copy = null;  # $ref == null, $copy == null
```

Pour ne plus modifier la variable d'origine, utiliser `unset` ou affecter la variable à un autre pointeur.

``` php
<?php
$ref  = 1;
$copy = &$ref;

unset($copy);
$copy = 2;
# $ref == 1, $copy == 2
```

``` php
<?php
$ref     = 1;
$copy    = &$ref;

$ref2    = 2;
$copy    = $&ref2;
$copy    = 3;
# $ref == 1, $copy == $ref2 == 3
```

### Supprimer une variable

La fonction `unset` supprime une variable.
Si d'autres variables référencent cette variable, il prennent la valeur de la variable avant qu'elle ne soit supprimée. Pour supprimer la valeur d'une variable pour tous les pointeurs, utiliser `$var = null`.

``` php
<?php
$a = 5; $b = &$a; unset($a); # $b == 5
$a = 5; $b = &$a; $a = null; # $b == null
```

### Vérifier l'existence d'une variable

La fonction `isset()` permet de vérifier si des variables sont définies et non nulles.

``` php
<?php
echo isset($a); # false

$a = 0;
echo isset($a); # true

$a = null;
echo isset($a); # false
```

`isset()` peut prendre plusieurs paramètres pour vérifier si toutes les variables données sont définies.

``` php
<?php
if(isset($var, $var2)) {
  // ...
}
```

---

## Constantes

Une constante est une variable dont la valeur ne peut pas être redéfinie. Lorsqu'on essaie de créer une constante qui existe déjà, une erreur est levée (notice).

### Définir une constante

Par convention et pour une meilleure lisibilité, le nom d'une constante est toujours en majuscule. Il ne peut contenir que des lettres non accentuées, des chiffres et des underscores `_`.

``` php
<?php
define("MACONSTANTE", "valeur");

echo MACONSTANTE;
```

Une constante ne peut contenir que des données de type scalaire (c'est à dire une chaîne de caractères ou un nombre) - pas d'objet ni de tableau. On ne peut pas non plus passer un pointeur (fatal error).

### Vérifier l'existence d'une constante

La fonction `defined()` permet de vérifier si une constante donnée existe.

``` php
<?php
if(!defined('PHYSICAL_PATH_TMP')) {
    define('PHYSICAL_PATH_TMP', sys_get_temp_dir());
}
```

### Désigner une constante par une valeur

Pour récupérer la valeur d'une constante dont on ne connaît pas le nom au préalable, on peut utiliser la fonction `constant`. Si la constante n'existe pas, une erreur est levée (warning).

``` php
<?php
$var = "MACONSTANTE";
echo constant($var); # Affiche "valeur"
```

### Constantes prédéfinies

PHP définit un certain nombre de constantes. Parmis les plus utiles:

* `M_PI`, retourne la valeur de Pi.

  ``` php
  <?php
  echo M_PI; # 3.1415926535898
  ```

* `PHP_OS`, retourne le nom de l'OS.

  ``` php
  <?php
  switch(PHP_OS) {
    case "WINNT"  : echo "Windows"; break;
    case "Linux"  : echo "Linux"; break;
    case "FreeBSD": echo "FreeBSD"; break;
    echo "Darwin" : echo "Mac OS X"; break;
  }

* `PATH_SEPARATOR`, retourne le caractère délimiteur des variables path.  
  Sous Windows, il s'agit du point-virgule `;`.  
  Sous Linux, du deux-points `:`.

  ``` php
  <?php
  $aPath    = explode(PATH_SEPARATOR, ini_get('path'));
  $aInclude = explode(PATH_SEPARATOR, ini_get('include_path')); # .;C:\php\pear
  ```

* `DIRECTORY_SEPARATOR`, retourne le caractère délimiteur de chemin de fichier.  
  Sous Windows, il s'agit du back-slash `\`.  
  Sous Linux, du slash `/`.

  ``` php
  <?php
  $aFolder = explode(DIRECTORY_SEPARATOR, __DIR__); # C:\wamp\www
  ```

### Constantes magiques

Les constantes magiques sont des constantes dont la valeur est retournée par l'interpréteur PHP, elle change selon le contexte.

| Constante       | Description | Existe depuis
|---              |---          |---
|  `__LINE__`     | Numéro de ligne où se trouve l'instruction                       | &nbsp;
| `__FILE__`      | Chemin absolu du fichier php en cours                            | &nbsp;
| `__DIR__`       | Chemin absolu du répertoire où se trouve le fichier php en cours | PHP 5.3
| `__FUNCTION__`  | Nom de la fonction en cours                                      | PHP 4.3
| `__CLASS__`     | Nom de la classe où se trouve l'instruction (avec namespace)     | PHP 4.3
| `__NAMESPACE__` | Namespace de la classe où se trouve l'instruction                | PHP 5.3
| `__METHOD__`    | Nom de la méthode où se trouve l'instruction                     | PHP 5.0
| `__TRAIT__`     | Nom du trait où se trouve l'instruction (avec namespace)         | PHP 5.4

NB `__CLASS__` marche aussi avec les traits.
