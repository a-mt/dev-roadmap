---
title: Objets - Fonctions
category: Web, PHP
---

## Vérifier l'existance

### class_exists

Vérifie si la classe donnée existe

``` php
<?php
echo class_exists('A') ? 'Y' : 'N';
```

### property_exists

Vérifie si la propriété donnée existe.  
Accepte un nom de classe ou une instance de classe.

``` php
<?php
echo property_exists($obj, 'var') ? 'Y' : 'N';
```

``` php
<?php
echo property_exists('A', 'var') ? 'Y' : 'N';
```

### method_exists

Vérifie si la méthode donnée existe.  
Accepte un nom de classe ou une instance de classe.

``` php
<?php
echo method_exists($obj, 'test') ? 'Y' : 'N';
```

``` php
<?php
echo method_exists('A', 'test') ? 'Y' : 'N';
```

---

## Vérifier la classe

### get_class

Retourne le nom de la classe d'une instance de classe.

``` php
<?php
$classname = get_class($obj);
```

### get_parent_class

Retourne le nom de la classe parente d'une instance de classe (ou `false` si elle n'hérite d'aucune classe).

``` php
<?php
$parentname = get_parent_class($obj);
```

### is_a

Vérifie si l'instance de classe donnée est de la classe spécifiée.  
Même principe que `instanceof` mais peut tester une variable ou être utilisée comme callback.

``` php
<?php
echo is_a($obj, 'DateTime') ? 'Y' : 'N';
```

### is_subclass_of

Vérifie si l'instance de classe donnée hérite de la classe spécifiée (mais n'appartient pas à cette classe).

``` php
<?php
var_dump($obj instanceof NotFoundException);         # true
var_dump($obj instanceof Exception);                 # true

var_dump(is_subclass_of($obj, 'NotFoundException')); # false
var_dump(is_subclass_of($obj, 'Exception'));         # true
```

---

## Lister

### get_class_methods

Retourne la liste des méthodes publiques d'une classe ou instance de classe donnée.

``` php
<?php
class A {
  public function test() {}
  protected function test2() {}
}
$obj = new A;
print_r( get_class_methods($obj) ); # Array ( [0] => test )
```

### get_class_vars

Retourne la liste des propriétés publiques d'une classe donnée avec leur valeur par défaut.

``` php
<?php
class A {
  protected $var = 'a';
  public $var2 = 'b', $var3;
}

print_r( get_class_vars('A') ); # Array ( [var2] => b [var3] => )
```

### get_object_vars

Retourne la liste des propriétés publiques d'un objet donné.

``` php
<?php
class A {
  protected $var = 'a';
  public $var2 = 'b', $var3;
}
$obj = new A;
$obj->var3 = 'c';

print_r( get_object_vars($obj) ); # Array ( [var2] => b [var3] => c ) 
```

---

## Autoloader

### spl_autoload_register

On place généralement une classe par fichier, pour plus de lisibilité, mais cela signifie également qu'il faut inclure un grand nombre de fichiers. Un autoloader permet d'inclure dynamiquement des fichiers en fonction des classes invoquées.

`spl_autoload_register` enregistre une fonction d'autochargement.  
PHP exécute les fonctions d'autochargement les unes après les autres, dans l'ordre où elles ont été définies.

``` php
<?php

// Registers an SPL autoloader for Twig
spl_autoload_register('autoload_twig');

/**
 * Handles autoloading of Twig classes.
 * @param string $class A class name.
 */
function autoload_twig($class)
{
    if (0 !== strpos($class, 'Twig')) {
        return;
    }

    // Twig_TokenParser_Block → twig/lib/Twig/TokenParser/Block.php
    $file = dirname(__FILE__)
            .'/twig/lib/'
            . str_replace(array('_', "\0"), array('/', ''), $class)
            . '.php';

    if (is_file($file)) {
        require $file;
    }
}
```

### spl_autoload_unregister

Supprime une fonction de la pile des fonctions d'autochargement.

``` php
<?php
spl_autoload_unregister('autoload_twig');
```

---

## Rendre un objet itérable

Par défaut, on peut utiliser `foreach` pour boucler sur les propriétés acessibles d'un objet.

``` php
<?php
class A {
  public $var1 = "1";
  protected $var2 = "2";
  private $var3 = "3";
}

$obj = new A;
foreach($obj as $key => $val) {
  echo $key . ":" . $val . "\n";
}
# var1:1 
```

``` php
<?php
class A {
  public $var1    = "1";
  protected $var2 = "2";
  private $var3   = "3";

  public function iterate() {
    foreach($this as $key => $val) {
      echo $key . ":" . $val . " ";
    }
  }
}

$obj = new A;
$obj->iterate();
# var1:1 var2:2 var3:3
```

### Iterator

`Iterator` est une interface à implémenter pour rendre un objet itérable avec un `foreach` en contrôlant les valeurs accessibles.

Les méthodes à implémenter sont:

* `current`, renvoie l'élément courant
* `key`, retourne la clé de l'élément courant
* `next`, déplace le pointeur sur l'élément suivant
* `rewind`, remet le pointeur sur le premier élément
* `valid`, vérifie si la position courante est valide

``` php
<?php
class Example implements Iterator
{
  private $seek = 0;
  private $data = array();

  public function __construct(array $data) {
      $this->data = $data;
  }
  public function current() {
    return $this->data[$this->seek];
  }
  public function key() {
    return $this->seek;
  }
  public function next() {
    $this->seek++;
  }
  public function rewind() {
    $this->seek = 0;
  }
  public function valid() {
    return isset($this->data[$this->seek]);
  }
}
$objet = new Example(array('one', 'two', 'three', 'for', 'five'));
foreach ($objet as $key => $value) {
  echo $key . ' => ' . $value . '<br>';
}
```

### SeekableIterator

`SeekableIterator` ajoute le fait de pouvoir déplacer le pointeur sur un index donné avec `seek`.

Les méthodes à implémenter sont les mêmes que `Iterator` plus
* `seek`, déplace le pointeur sur l'élément

``` php
<?php
class Example implements SeekableIterator
{
  // [...]

  public function seek($seek) {
    if(!isset($this->data[$seek])) {
      trigger_error('Position is not valid', E_USER_WARNING);
      return;
    }
    $this->seek = $seek;
  }
}

$objet = new Example(array('one', 'two', 'three', 'for', 'five'));
$objet->seek(2);
echo $objet->current();
```

### ArrayAccess

`ArrayAccess` est une interface à implémenter pour rendre les éléments de l'objet accessibles avec les crochets `[ ... ]`.

Les méthodes à implémenter sont:

* `offsetExists`, vérifie si la position donnée est valide
* `offsetGet`, retourne la valeur de la position donnée
* `offsetSet`, modifie la valeur de la position donnée
* `offsetUnset`, supprime la position donnée

``` php
<?php
class Example implements ArrayAccess
{
  private $data = array();

  public function offsetExists($key) {
    return isset($this->data[$key]);
  }
  public function offsetGet($key) {
    return $this->data[$key];
  }
  public function offsetSet($key, $value) {
    $this->data[$key] = $value;
  }
  public function offsetUnset($key) {
    unset($this->data[$key]);
  }
}

$objet = new Example();
$objet[2] = 'Hello world !';
unset($objet[3]);
echo isset($objet[3]) ? 'Y' : 'N';
```

### Countable

`Countable` est une interface à implémenter pour que la fonction `sizeof` puisse être appelée sur l'objet.

``` php
<?php
class Example implements SeekableIterator, ArrayAccess, Countable {
  private $seek = 0;
  private $data = array();

  public function __construct(array $data) {
      $this->data = $data;
  }

  // Support foreach
  public function current() {
    return $this->data[$this->seek];
  }
  public function key() {
    return $this->seek;
  }
  public function next() {
    $this->seek++;
  }
  public function rewind() {
    $this->seek = 0;
  }
  public function valid() {
    return isset($this->data[$this->seek]);
  }

  // Support seek
  public function seek($seek) {
    if(!isset($this->data[$seek])) {
      trigger_error('Position is not valid', E_USER_WARNING);
      return;
    }
    $this->seek = $seek;
  }

  // Support brackets
  public function offsetExists($key) {
    return isset($this->data[$key]);
  }
  public function offsetGet($key) {
    return $this->data[$key];
  }
  public function offsetSet($key, $value) {
    $this->data[$key] = $value;
  }
  public function offsetUnset($key) {
    unset($this->data[$key]);
  }

  // Support count
  public function count() {
    return count($this->data);
  }
}

$objet = new Example(array('one', 'two', 'three', 'for', 'five'));
for ($i = 0; $i < sizeof($objet); $i++) {
  echo $i . ' => ' . $objet[$i] . '<br>';
}
```
