---
title: Manipuler des objets
category: Web, PHP
---

## Cloner un objet

Par défaut, par soucis de mémoire, tout objet est passé par référence (que se soit comme argument ou pour affectation). Pour se défaire de ce comportement, il est nécessaire de copier l'objet via `clone`.

``` php
clone $obj;
```

``` php
<?php
class A {
    public $var = 1;
}
$obj = new A;

$obj2 = $obj;
$obj3 = clone $obj;

$obj->var++;
print_r($obj2); # A Object ( [var] => 2 )
print_r($obj3); # A Object ( [var] => 1 )
```

---

## Vérifier l'égalité de deux objets

L'opérateur `==` permet de vérifier si deux objets sont des instances de la même classe et ont les mêmes valeurs de propriété.
En PHP 4, la classe n'était pas testée, uniquement les valeurs.

``` php
<?php
class A {
  protected $name;

  public function __construct($name) {
    $this->name = $name;
  }
}
$obj  = new A("item1");
$obj2 = new A("item2");
$obj3 = new A("item1");

echo ($obj == $obj2 ? 'Y' : 'N'); # N
echo ($obj == $obj3 ? 'Y' : 'N'); # Y
```

---

## Vérifier la classe d'un objet

L'opérateur `instanceof` permet de vérifier si un objet est une instance d'une classe donnée.

``` php
$obj instanceof A
```

On peut également utiliser la fonction `is_a`

``` php
is_a($obj, 'A')
```

``` php
<?php
interface myInterface {}
abstract class myAbstract {}
trait myTrait {}
class myClass extends myAbstract implements myInterface {
    use myTrait;
}
$obj = new myClass;
var_dump($obj instanceof myInterface); # true
var_dump($obj instanceof myAbstract);  # true
var_dump($obj instanceof myClass);     # true
var_dump($obj instanceof myTrait);     # false
var_dump($obj instanceof DateTime);    # false
```

---

## Récupérer le nom de la classe

La fonction `get_class` retourne le nom de la classe d'un objet.

``` php
<?php
$classname = get_class($obj);
```

Quand on place cette fonction dans une méthode, on peut omettre l'argument.  
Elle retourne alors le nom de la classe où se situe la méthode.  
On peut également utiliser `self::class`.

``` php
<?php
class A {
  public function getClassname() {
    return get_class();
  }
}
```

Un peu sur le même principe, la fonction `get_called_class` retourne le nom de la classe qui *appelle* la méthode.  
La différence entre les deux ne se voit que quand on se sert de l'héritage de classe.  
On peut également utiliser `static::class`.

``` php
<?php
class A {
    public function echo_class() {
        echo get_class();
    }
    public function echo_called_class() {
        echo get_called_class();
    }
}
class B extends A {}
$obj = new B;
$obj->echo_class();        # A
$obj->echo_called_class(); # B
```

---

## Appel dynamique de méthode

Pour appeler une méthode dont on ne connaît pas le nom au préalable, on peut

* utiliser une variable

  ``` php
  $obj->$method();
  ```

* utiliser les accolades `{ ... }`

  ``` php
  $obj->{'get' . $method}();
  ```

* utiliser la fonction `call_user_func`

  ``` php
  call_user_func(array($obj, $method));
  ```

Cela fonctionne également avec les méthodes statiques, en remplaçant la flèche `->` par deux deux-points `::`.

*
  ``` php
  Test::$method();
  ```

*
  ``` php
  Test::{'get' . $method}();
  ```

*
  ``` php
  call_user_func(array('Test', $method));
  ```

Le nom de la classe peut lui aussi être dynamique (préfixé du namespace)

``` php
$class::{'get' . $method}();
```
