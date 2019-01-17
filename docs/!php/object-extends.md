---
title: Objets - Héritage
category: Web, PHP
---

## Hériter d'une classe

Pour faire hériter un objet d'un objet, on utilise le mot-clé `extends`.  
Une classe ne peut hériter que d'une et une seule classe.

``` php
class B extends A {}
```

`B` hérite des méthodes et variables de `A` et peut les écraser, hormis celles qui sont privées.

Lorsqu'une classe enfant redéfinit une méthode parent, il est nécessaire qu'elle garde la même déclaration que la méthode parente (nombre d'argument, type des arguments, etc).

``` php
<?php
abstract class A {
  public function test() {
    return 'A';
  }
}
class B extends A {
  public function test($a) {
    return 'B' . $a;
  }
}
# Strict Standards: Declaration of B::test() should be compatible with A::test()
```

---

## parent

Une classe enfant peut appeler les méthodes ou récupérer des variables de la classe parente (qui ne sont pas privées) avec `parent::`.

``` php
class B extends A {
    public function mafonction() {
        return parent::mafonction() . '!';
    }
}
```

``` php
<?php
// Classe parente
class A {
  public $var     = 'A';
  protected $var2 = 'B';
  private $var3   = 'C';

  public function __toString() {
    return $this->var . $this->var2 . $this->var3 . ' ';
  }
}

// Classe enfant
class B extends A {
  protected $var2 = 'b'; # écrase la valeur de A
  private $var3   = 'c'; # définit une valeur indépendante de A

  public function __toString() {
    return parent::__toString() . $this->var . $this->var2 . $this->var3 . ' ';
  }
}

// Instance de la classe B
$obj = new B();
echo (string)$obj; # AbC Abc
```

---

## Classe abstraite

Une classe abstraite est une classe qui ne peut pas être instanciée, uniquement héritée.  
Permet de définir des méthodes qui seront communes à plusieurs classes enfant.

``` php
abstract class A {}
```

``` php
<?php
abstract class A {
  public function getClass() {
    return get_called_class();
  }
}
class B extends A { }
class C extends A { }

$obj  = new B();
$obj2 = new C();
echo $obj->getClass(); # B
echo $obj2->getClass(); # C
```

## Classe finale

Une classe finale est une classe qui ne peut pas être héritée.

``` php
final class A {}
```

---

## Méthodes abstraites

Une méthode abstraite est une méthode qui ne contient pas de corps et qui doit être implémentée par les classes enfants (à la manière d'une interface).  
Seules les classes abstraites peuvent avoir des méthodes abstraites.

``` php
abstract public function test();
```

``` php
<?php
abstract class A {
  abstract public function test();
}
class B extends A {
  public function test() {
    return 'B';
  }
}
```

## Méthodes finales

Une méthode finale est une méthode qui ne peut pas être redéfinie par les classes enfants.  
Si un enfant essaie de redéfinir une méthode finale, une erreur (fatale) est levée

``` php
final public function test() {}
```

``` php
<?php
class A {
  final public function test() {
    return 'A';
  }
}
class B extends A {
  public function test() {
    return 'B';
  }
}
# FATAL ERROR Cannot override final method A::test()
```


---

## Déclarer une interface

Une interface définit un ensemble de méthode qui devront être définies par toutes les classes qui l'implémentent. Contrairement à une classe abstraite, une interface ne peut pas déclarer le corps d'une méthode, seules les classes le peuvent.

``` php
interface A {}
```

``` php
<?php
interface A {
  public function getName();
}
class B implements A {
  public function getName() {
    return 'B';
  }
}
```

## Implémenter une interface

Pour déclarer une classe qui implémente une interface, on utilise le mot-clé `implements`.  
Une classe peut implémenter 0 à n interfaces.

``` php
class B implements A {}
```

Fréquemment, les classes qui implémentent une interface vont également hériter d'une classe abstraite qui permettra des définir des méthodes utiles à tous les enfants.
`extends` se place devant `implements`.

``` php
<?php
class C extends B implements A {}
```

``` php
<?php
interface A {
  public function getName();
}
abstract class B {
  public function getName() {
    return 'Nom : ' . static::NAME;
  }
}
class C extends B implements A {
  const NAME = 'C';
}
```

``` php
<?php
class Session implements SessionInterface, IteratorAggregate, Countable {}
class SessionHandlerProxy extends AbstractProxy implements SessionHandlerInterface {}
```

---

## Déclarer un trait

Les traits sont disponibles depuis PHP 5.4.  
Une classe ne peut hériter que d'une seule classe mais peut utiliser plusieurs traits. Un trait permet d'ajouter des fonctionnalités à une classe de manière transverse, c'est à dire rajouter un comportement générique à toute classe — par exemple, de lire un fichier CSV ou XML.

``` php
trait A {}
```

### Méthodes abstraites

Les traits peuvent définir des propriétés, méthodes, méthodes statiques, etc, tout comme une classe.

Les méthodes abstraites peuvent être utilisée pour imposer des contraintes aux classes qui utilisent le trait.

``` php
<?php
trait Hello {
  public function sayHello() {
     echo 'Hello ' . $this->getName();
  }
  abstract public function getName();
}

class HelloWorld {
  use Hello;

  public function getName() {
     return 'World';
  }
}
```

## Utiliser un trait

Pour utiliser un trait, on utilise le mot-clé `use`.  
Attention à ne pas confondre ce `use` avec l'importation d'un namespace: l'importation d'un trait s'effectue à l'intérieur de la classe et non avant.  
Une classe peut utiliser 0 à n traits.  
Un trait peut également utiliser d'autres traits.

``` php
class B { use A; }
```

``` php
<?php
trait XML {
  public function getType() {
    return 'XML';
  }
}
class A {
  use XML;
}

$obj = new A;
echo $obj->getType();
```

Si une classe définit une méthode qui existe également dans le trait, la classe prédomine sur le trait.

### Résolution de méthode

Si deux trait définissent une même méthode, PHP lève une erreur fatale.  
Pour résoudre ce genre de conflits, on peut 

* indiquer quelle méthode doit prédominer sur l'autre avec `insteadof`
* renommer la méthode d'un trait avec `as`

``` php
use A, B{
  A::method1 insteadof B;
  M::method2 as method3;
}
```

Il est également possible de modifier la visibilité des méthodes.

``` php
use A {
  method1 as protected;
}
```