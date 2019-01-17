---
title: Debugger PHP
category: Web, PHP
---

## Afficher le contenu d'une variable

Pour afficher le contenu d'une variable de tout type, il existe différentes fonctions:

* `print_r` affiche récursivement le contenu de la variable.  
  Les valeurs sont castées en chaîne de caractères, les valeurs `null`, `false`, etc, ne sont  donc pas affichées.

  ``` php
  <?php

  $var = array('a', 'b', 'c');
  print_r($var);  # Affiche "Array ( [0] => a [1] => b [2] => c )"
  ```

  Cette fonction peut également retourner le résultat plutôt que de l'afficher.  
  C'est utile pour écrire dans des logs par exemple ou simplement concaténer le résultat.

  ``` php
  <?php
  echo '<pre>' . print_r($var, true) . '</pre>';
  ```

* `var_dump` affiche le type et la valeur des variables.  
  Lorsque l'extension `xdebug` est activée, `var_dump` affiche un texte HTML avec coloration syntaxique.

  ``` php
  <?php
  $var = false;
  echo $var;      # N'affiche rien
  print_r($var);  # N'affiche rien
  var_dump($var); # Affiche "bool(false)"
  ```

* `var_export` permet quant à elle d'afficher le code PHP qui permet de générer la variable donnée.  
  Cela permet notamment de réaliser des benchmark à partir de données récupérées.  
  Cette fonction ne peut pas être utilisée avec les objets contenant des variables récursives (memory overflow).
  
  ``` php
  <?php
  $var = array('a', 'b', 'c');
  var_export($var); #  Affiche "array ( 0 => 'a', 1 => 'b', 2 => 'c', )"
  ```
  
  Elle peut également retourner le résultat plutôt que de l'afficher, même principe que `print_r`:
  
  ``` php
  <?php
  var_export($var, true);
  ```

---

## Lister les données déclarées

`get_defined_vars()` liste toutes les variables définies et leurs valeurs:

``` php
<?php
$var = 1;
print_r(get_defined_vars());

# Array( [_GET] => Array() [_POST] => ...  [var] => 1 )
```

`get_defined_constants()` liste toutes les constantes définies et leurs valeurs:

``` php
<?php
define('EXEMPLE', 'hello');
print_r(get_defined_constants());

# Array([E_ERROR] => 1 [E_RECOVERABLE_ERROR] => ... [EXEMPLE] => hello )
```

`get_defined_functions()` liste toutes les fonctions définies:

``` php
<?php
function hello() {
  echo 'hello';
}
print_r(get_defined_functions());
/*
  Array (
      [internal] => Array( [0] => zend_version [1] => func_num_args [2] => func_get_arg ...)
      [user] => Array( [0] => hello )
  )la
*/
```

`get_declared_classes()` liste toutes les classes définies:

``` php
<?php
namespace Exemple;
class Hello {
  
}
print_r(get_declared_classes());

# Array( [0] => stdClass [1] => Exception ... [146] => Exemple\Hello )
```

`get_declared_interfaces()` liste toutes les interfaces définies:

``` php
<?php
print_r(get_declared_interfaces());

# Array ( [0] => Traversable [1] => IteratorAggregate [2] => Iterator ... )
```