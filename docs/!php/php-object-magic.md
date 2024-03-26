---
title: Méthodes magiques
category: Web, PHP
---

Les méthodes magiques sont des méthodes que l'on ne peut pas appeler directement (avec la flèche `->`), mais qui sont appelées automatiquement par l'interpréteur dans des situations particulières.

Les méthodes magiques doivent toujours être déclarées publiques. Il n'est pas possible de donner des paramètres par référence à une méthode magique.

## construct

La méthode `__construct` est appelée à l'initialisation d'un objet.  
Elle peut prendre des paramètres, lesquels devront être donnés à la création de l'objet.

``` php
class A {
  public function __construct() {}
}
```

``` php
<?php
class A {
  protected $var;

  public function __construct($var) {
    $this->var = $var;
  }
  public function getVar() {
    return $this->var;
  }
}
$obj = new A("test");
echo $obj->getVar();
```

En PHP<5, le constructeur se désignait par le nom de la classe

``` php
class A {
  public function A() {}
}
```

## destruct

La méthode `__destruct` est appelée dès qu'il n'y a plus aucune variable sur l'objet.

``` php
public function __deconstruct() {}
```

``` php
<?php
class A {
  public function __destruct() {
    echo 'destruct';
  }
}

$obj  = new A();
$obj2 = $obj;

echo 'a';
unset($obj);

echo 'b';
unset($obj2);

# Affiche "abdestruct"
```

## toString

La méthode `__toString` est appelée lorsqu'on essaie de caster un objet en chaîne de caractères.

``` php
public function __toString() { return "text"; }
```

``` php
<?php
class A {
  protected $var;

  public function __construct($var) {
    $this->var = $var;
  }
  public function __toString() {
    return $this->var;
  }
}
$obj  = new A("test");
echo $obj; # test
```

## invoke

La méthode `__invoke` est appelée lorsqu'on cherche à appeler l'objet en tant que fonction.  
Depuis PHP 5.3

``` php
public function __invoke() {}
```

``` php
<?php
class Process {
  public function __invoke() {
    $this->run();
  }
  protected function run() {
    echo "OK";
  }
}
$run = new Process;
$run();
# Affiche "OK"
```

## clone

La méthode `__clone` est appelée lorsqu'on clone un objet.

``` php
public function __clone() {}
```

``` php
<?php
class A {
  protected $startTime;

  public function __construct() {
    $this->startTime = microtime(true);
  }
  public function __clone() {
    $this->startTime = microtime(true);
  }
}
$obj  = new A;      # __construct
$obj2 = clone $obj; # __clone
```

## call

La méthode `__call` est appelée lorsqu'on essaie d'appeler une méthode inexistante ou non publique.  
Permet notamment de définir des getters dynamiquement.

``` php
public function __call($name, $args) {}
```

``` php
<?php
class A {
  protected $var  = 'a',
  $var2 = 'b',
  $var3 = 'c';

  public function getVar() {
    return $this->var;
  }
  protected function getVar2() {
    return $this->var2;
  }
  public function __call($name, $args) {
    echo '.';
    $field = lcfirst(preg_replace('/^get/', '', $name)); // getVar -> var

    if(property_exists($this, $field)) {
      return $this->$field;
    }
    trigger_error('Call to undefined method '.__CLASS__.'::'.$name.'()', E_USER_ERROR);
  }
}
$obj = new A;
echo $obj->getVar();  # a
echo $obj->getVar2(); # .b
echo $obj->getVar3(); # .c
echo $obj->getVar4(); # .Error Call to undefined method A::getVar4()
```

## callStatic

Même principe que `_call` mais pour les méthodes statiques.  
Depuis PHP 5.3

``` php
public function __callStatic($name, $args) {}
```

``` php
<?php
class A {
  protected static $var  = 'a',
                   $var2 = 'b',
                   $var3 = 'c';

  public static function getVar() {
    return self::$var;
  }
  protected static function getVar2() {
    return self::$var2;
  }
  public static function __callStatic($name, $args) {
    echo '.';
    $field = lcfirst(preg_replace('/^get/', '', $name)); // getVar -> var

    if(property_exists(__CLASS__, $field)) {
      return self::$$field;
    }
    trigger_error('Call to undefined method ' . __CLASS__ . '::' . $name . '()', E_USER_ERROR);
  }
}
$obj = new A;
echo $obj::getVar();  # a
echo $obj::getVar2(); # .b
echo $obj::getVar3(); # .c
echo $obj::getVar4(); # .Error Call to undefined method A::getVar4()
```

## get

La méthode `__get` est appelée lorsqu'on essaie d'accéder à une variable inexistante ou non publique.  
Permet par exemple d'accéder à des variables contenues dans un tableau et non comme propriétés indépendantes.  
Depuis PHP 5.0.

``` php
public function __get($name) {}
```

``` php
<?php
class A {
  public $var     = 'a';
  protected $var2 = 'b';

  public function __get($name) {
    echo '.';
    if(property_exists($this, $name)) {
      return $this->$name;
    }
    trigger_error('Undefined property: ' . __CLASS__ . '::$' . $name, E_USER_NOTICE);
  }
}
$obj = new A;
echo $obj->var;  # a
echo $obj->var2; # .b
echo $obj->var3; # .NOTICE Undefined propClasserty: A::$var3
```

## set

La méthode `__set` est appelée lorsqu'on essaie d'écrire une variable inexistante ou non publique.  
Utile en conjonction de `__get`.

``` php
public function __set($name, $value) {}
```

``` php
<?php
class A {
  public $var     = 'a';
  protected $var2 = 'b';

  public function __set($name, $value) {
    echo '.';
    $this->$name = $value;
  }
}
$obj = new A;
$obj->var  = 1;
$obj->var2 = 2; # .
$obj->var3 = 3; # .
```

Notons que définir une propriété publique est le comportement par défaut si la méthode `__set` n'est pas définie.

``` php
<?php
class A {}

$obj = new A;
$obj->var = "a";
echo $obj->var; # a
```

## isset

la méthode `__set` est appelée lorsqu'on cherche à vérifier l'existence d'une propriété inexistante ou non publique.  
Utile en conjonction de `__get`.  
Depuis PHP 5.1

``` php
public function __isset($name) {}
```

``` php
<?php
class A {
  public $var     = 'a';
  protected $var2 = 'b';

  public function __isset($name) {
    echo ".";
    return (property_exists($this, $name) && $this->$name !== null);
  }
}
$obj = new A;
var_dump(isset($obj->var));  # true
var_dump(isset($obj->var2)); # .true
var_dump(isset($obj->var3)); # .false
```

## unset

La méthode `__unset` est appelée lorsqu'on cherche à détruire une propriété inexistante ou non publique.  
Depuis PHP 5.1

``` php
public function __unset($name) {}
```

``` php
<?php
class A {
  public $var     = 'a';
  protected $var2 = 'b';

  public function __unset($name) {
    echo '.';
    unset($this->$name);
  }
}
$obj = new A;
unset($obj->var);
unset($obj->var2); # .
unset($obj->var3); # .
```

## sleep

La méthode `__sleep` est appelée lorsqu'on cherche à sérialiser un objet.  
Doit retourner la liste des propriétés à sérialiser.  
Permet valider des données en attente, d'effectuer des opérations de nettoyage, de sérialiser de gros objets.

``` php
public function __sleep() {}
```

``` php
<?php
class A {
  public $var, $var2;

  public function __sleep() {
    return array('var'); # Ne pas serialiser $var2
  }
}
$obj = new A;
echo serialize($obj); # O:1:"A":1:{s:3:"var";N;}
```

## wakeup

La méthode `__wakeup` est appelée lorsqu'on désérialise un objet sérialisé.  
Permet de rétablir toute connexion qui aurait été perdue (ex : base de données), d'effectuer des tâches de réinitialisation

``` php
public function __wakeup() {}
```

``` php
<?php
class A {
  public $var, $var2;

  public function __construct($var) {
    $this->var  = $var;
    $this->var2 = "NOP";
  }
  public function __sleep() {
    return array('var'); # Ne serialiser que var (pas $var2)
  }
  public function __wakeup() {
    print_r($this);      # A Object ( [var] => test [var2] => ) 
  }
}
$obj   = new A("test");
$cache = serialize($obj);
unserialize($cache);
```

## set_state

Méthode statique invoquée pour créer un objet et initialiser ses propriétés, sans passer par le constructeur.  
C'est le format retourné lorsqu'on exporte un objet avec `var_export()`.  
Depuis PHP 5.1

``` php
public function __set_state($vars) {}
```

``` php
<?php
class A {
  protected $var, $var2;

  public static function __set_state($vars) {
    $obj = new static();

    foreach($vars as $var => $value) {
      $obj->$var = $value;
    }
    $obj->var2 = 'ok';
    return $obj;
  }
}
$obj = A::__set_state(array( 'var' => 'test', ));

print_r($obj); # A Object ( [var:protected] => test [var2:protected] => ok ) 
```