---
title: Créer des objets
category: Web, PHP
---

## Déclarer une classe

Pour déclarer une classe, on utilise le mot-clé `class`.  
Par convention, les noms de classe sont en UpperLowerCase.

``` php
class A {}
```

---

## Créer un objet

Un objet est une instance de cl[Objets - Additions](php-object2.md)
  * [Namespaces](php-namespace.md)
  * [Héritasse.  
Pour instancier une classe, on utilise le mot-clé `new`.  
Les parenthèses sont facultatives si aucun argument n'est passé.

``` php
$obj = new A();
```

<ins>Nom dynamique</ins>:

On peut créer un objet dont le nom de classe est stocké dans une variable.

``` php
<?php
class A {}

$class = 'A';
$obj   = new $class();
```

Le nom de la classe doit être absolu (être précédé du namespace), y compris s'il s'agit du namespace courant.

``` php
<?php
namespace Example;

class Test {
    public static function getExemple() {
        return 'OK';
    }
}
$class = __NAMESPACE__ . '\Test';
$obj   = new $class;
```

---

## Propriétés

Une propriété est une variable spécifique à une classe.

La déclaration de la variable doit être précédée du mot-clé `public`, `protected` ou `private` —  qui précise si la variable est accessible en dehors de la classe ou non. La valeur de la variable peut être initialisée au moment de la déclaration avec une valeur constante, il n'est pas possible de faire des traitements à ce moment là (ex: appel de fonction, concaténation, etc)    — initialiser la propriété à l'intérieur du constructeur si c'est l'effet désiré.

``` php
class A {
  public $var = null;
}
```

Pour accéder à la propriété d'un objet, on utilise la flèche `->`.

``` php
$obj = new A;
echo $obj->var;
```

<ins>Déclarer plusieurs propriétés</ins>:

Il est possible de déclarer plusieurs propriétés en même temps:

``` php
<?php
class A {
   public $var, $var2;
   protected $var3;
   protected $var4;
}
```

``` php
<?php
class A {
    public $var  = 'a',
           $var2 = 'b';
}
```

Avant PHP 5, les propriétés devaient être déclarées avec `var`.  
Si une propriété est déclarée avec `var` au lieu de `public`, `protected` ou `private`, PHP 5 traitera la propriété comme publique.

---

## public, protected, private

* `public`: les propriétés peuvent être accédées (en lecture et écriture) en dehors de la classe

  ``` php
  <?php
  class A {
      public $var = "a";
  }
  $obj = new A;
  echo $obj->var; # a
  ```

* `protected`: les propriétés sont accessibles aux classes enfant mais ne sont pas accessibles en dehors.

  ``` php
  <?php
  class A {
      protected $var = "a";
  }
  $obj = new A;
  echo $obj->var; # Fatal error: Cannot access protected property A::$var
  ```

* `private`: les propriétés ne sont pas accessibles en dehors de la classe, y compris pour les classes enfant.

  ``` php
  <?php
  class A {
      private $var = "a";
  }
  $obj = new A;
  echo $obj->var; # Fatal error: Cannot access private property A::$var
  ```

---

## Propriétés statiques

Les propriétés statiques sont des propriétés communes à toutes les instances de classe.  
On peut les déclarer publiques, protégées ou privées.

``` php
class A {
    public static $var = null;
}
```

Pour accéder à une propriété statique, on utilise l'opérateur de résolution de portée `::`

``` php
$obj = new A;
echo $obj::$var;
```

On peut accéder aux propriétés statiques directement via la classe:

``` php
echo A::$var;
```

``` php
<?php
class A {
    public static $var = "a";
    public $var2       = "a";
}

// Objet 1
$obj       = new A;
$obj::$var = "b";
$obj->var2 = "b";

// Objet 2
$obj2      = new A;
echo $obj2::$var;  # b: valeur commune à tous les objets
echo $obj2->var2;  # a
```

---

## Constantes

Il est possible de définir des constantes à l'intérieur d'une classe.  
Les constantes sont communes à toutes les instances de classe, mais contrairement aux variables statiques, leurs valeurs ne peuvent pas être modifiées — pas même par l'objet.
Elle servent généralement à définir des configurations non administrables mais modifiables par le développeur.

On déclare une constante de classe avec `const`.  
Depuis PHP 7.1, on peut aussi préciser sa visibilité. Avant, une constante était toujours publique.

``` php
class A {
    const MACONST = "valeur";
}
```

Pour accéder à une constante de classe, on utilise l'opérateur de résolution de portée `::`

``` php
$obj = new A;
echo $obj::MACONST;
```

On peut accéder aux constantes de classe via une instance de classe ou directement via la classe:

``` php
echo A::MACONST;
```

---

## Méthodes

Une méthode est une fonction spécifique à une classe.

La déclaration de la fonction doit être précédée du mot-clé `public`, `protected` ou `private` — qui précise si la variable est accessible en dehors de la classe ou non.

``` php
class A {
    public function hello() {
        return "Hello World";
    }
}
```

Pour appeler la méthode d'un objet, on utilise la flèche `->`.

``` php
$obj = new A;
echo $obj->hello();
```

---

## $this

À l'intérieur de la fonction, `$this` fait référence à l'objet appelant. Il permet d'accéder aux variables de l'objet (publiques, protégées et publiques) et d'appeler ses fonctions.

``` php
class A {
  public function test() {
    $this->test2();
  }
  protected function test2() {}
}
```

``` php
<?php
class A {
    protected $var = "a";

    public function getVar() {
        return $this->var;
    }
}
$obj = new A;
echo $obj->getVar(); # a
```

---

## Méthodes statiques

Les méthodes statiques sont des méthodes communes à toutes les instances de classe.  
On peut les déclarer publiques, protégées ou privées.

``` php
class A {
    public static function hello() {
        return "Hello World";
    }
}
```

Pour appeler une méthode statique, on utilise l'opérateur de résolution de portée `::`

``` php
$obj = new A;
echo $obj::hello();
```

On peut appeler des méthodes statiques directement via la classe:

``` php
echo A::hello();
```

La flèche `->` est acceptée pour accéder aux méthodes statiques via une instance de classe:

``` php
echo $obj->hello();
```

---

## self, static

Pour accéder aux variables statiques, constantes de classes et méthodes statiques il existe deux mots-clés spéciaux:

* `self`, fait référence à la classe où se situe la définition de la méthode
* `static`, fait référence à la classe appelant de la méthode

``` php
class A {
   const MACONST = "valeur";

   public function hello() {
       echo self::MACONST;
   }
}
```

La différence entre les deux ne se voit que dans lorsqu'on utilise l'héritage.

``` php
<?php
class A {
  protected static $var = 'A';

  public function getVar() {
    echo self::$var;        # A::$var
    echo static::$var;      # B::$var
  }
}
class B extends A {
    protected static $var = 'B';
}

$obj = new B;
$obj->getVar(); # AB
```

---

## Retourner un pointeur

Pour que la méthode d'un objet retourne un pointeur, il est nécessaire de précéder la déclaration de la fonction d'un et commercial `&` de même que l'appel de la fonction — sinon c'est une variable simple.

``` php
<?php
class A {
    protected $var = "a";

    function &get() {
        return $this->var;
    }
}
$obj = new A;
$var = &$obj->get();
$var = "b";

echo $obj->get(); # b
```

Une fonction retournant un pointeur ne peut retourner qu'une variable. Ainsi, les exemples suivants lèvent tous une erreur (notice).

``` php
return ($this->var);
```
``` php
return $this->var++;
```
``` php
return null;
```
``` php
return;
```

---

## Classe anonyme

Depuis PHP 7, il est possible d'utiliser des classes anonymes pour créer des objets à la volée.

``` php
<?php
$person = new class(21, "Bob"){
    public $age, $nom;

    public function __construct($age, $nom) {
        $this->age = $age;
        $this->nom = $nom;
    }
    public function greet() {
        return "Hello " . $this->nom;
    }
    public function __toString() {
        return $this->nom . ' (' . $this->age . ')';
    }
};
echo $person->age;     # 21
echo $person->nom;     # Bob
echo $person->greet(); # Hello Bob
echo $person;          # Bob (21)
```

## stdClass

Avant PHP 7, on pouvait utiliser la classe standard `stdClass` pour créer des objets sans avoir à créer de classe, uniquement pour définir et accéder à des propriétés. On ne pouvait en revanche pas définir de méthodes.

``` php
<?php
$person = new stdClass;
$person->age = 21;
$person->nom = "Bob";
$person->greet = function() {
    return "Hello " . $this->nom;
};

echo $person->age; # 21
echo $person->nom; # Bob
echo $person->greet(); # FATAL ERROR Uncaught Error: Call to undefined method stdClass::greet()
```

``` php
<?php
$obj = new stdClass;
$obj->var = "exemple";
echo json_encode($obj); # {"var":"exemple"}
```

`stdClass` est notamment la classe des objets lorsqu'on convertit du JSON en PHP.

``` php
<?php
class Test {
  public $var = 'exemple';
}
$obj = new Test;
$str = json_encode($obj);
print_r(json_decode($str)); # stdClass Object ( [var] => exemple )
```

---

## Classes prédéfinies notables

| Classe                                        | Sert à manipuler
|---                                            |---
| [`stdClass`](#stdClass)                       | Objets anonymes
| [`Exception`](include.md#Exceptions)          | Exceptions
| [`DateTime`](dates.md#DateTime)               | Dates/heures
| [`ZipArchive`](archives.md#ZipArchive)        | Fichiers ZIP
| [`PharData`](archives.md#PharData)            | Fichiers ZIP et TAR
| [`SimpleXMLElement`](xml.md#SimpleXMLElement) | Fichiers XML
| [`Reflection`](reflection.md)                 | Objets (reverse-engineer)