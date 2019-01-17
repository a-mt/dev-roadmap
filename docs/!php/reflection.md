---
title: Reflection
category: Web, PHP
---

Une Reflection permet de reverse-engineer des classes, méthodes, propriétés et fonctions.  
Elle peut par exemple récupérer les commentaires d'une méthode ou accéder à des propriétés à priori non accessibles.

## ReflectionClass

### _construct

Une reflection peut être crée
* à partir d'un nom de classe

  ``` php
  <?php
  $r = new ReflectionClass('Example');
  ```

* ou d'un objet

  ``` php
  <?php
  $r = new ReflectionObject($obj);
  ```

### newInstanceWithoutConstructor

Permet de créer un objet d'une classe donnée sans appeler son constructeur.

``` php
<?php
$r   = new ReflectionClass('Example');
$obj = $r->newInstanceWithoutConstructor();
print_r($obj);
```

### getDocComment

Retourne les commentaires de la classe.

``` php
<?php
echo $r->getDocComment(); # /** * Classe B */
```

### getProperties, getStaticProperties

`getProperties` retourne la liste des propriétés de la classe, statiques et non statiques
(liste de `ReflectionProperty`).

``` php
<?php
interface I {}

/**
 * Classe abstraite A
 */
abstract class A {

  /**
   * Test
   * @return string
   */
  public function test() { return 'A'; }
}

/**
 * Classe B
 */
class B extends A implements I {
  const CONST = "VALUE";

  public static $staticVar = "B";
  protected $var = "b";
}

$r = new ReflectionClass("B");
print_r($r->getProperties());

/* Array (
  [0] => ReflectionProperty Object ( [name] => staticVar [class] => B )
  [1] => ReflectionProperty Object ( [name] => var [class] => B ) ) 
*/
```

`getStaticProperties` retourne la liste des propriétés statiques de la classe 
(leur nom associé à leur valeur).

``` php
<?php
print_r($r->getStaticProperties());

/* Array (
  [staticVar] => B
) */
```

### getStaticPropertyValue, setStaticPropertyValue

`getStaticPropertyValue` récupère la valeur d'une propriété statique.

``` php
<?php
echo $r->getStaticPropertyValue('staticVar'); # B
```

`setStaticPropertyValue` modifie la valeur d'une propriété statique.

``` php
<?php
$r->setStaticPropertyValue('staticVar', 'HELLO');
echo B::$staticVar; # HELLO
```

### getConstants

Retourne la liste des constantes de la classe (leur nom associé à leur valeur).

``` php
<?php
print_r($r->getConstants();
# Array ( [CONST] => VALUE ) 
```

### getMethods

Retourne la liste des méthodes de la classe (liste de `ReflectionMethod`).

``` php
<?php
print_r($r->getMethods();

/* Array (
  [0] => ReflectionMethod Object ( [name] => test [class] => A ))
*/
```

### hasProperty, hasConstant, hasMethod

Vérifie respectivement si une propriété, constante ou propriété donnée existe.

``` php
<?php
echo $r->hasProperty('var') ? 'Y' : 'N'; # Y
```

``` php
<?php
echo $r->hasConstant('CONST') ? 'Y' : 'N'; # Y
```

``` php
<?php
echo $r->hasMethod('hello') ? 'Y' : 'N'; # Y
```

### isAbstract, isFinal

Vérifie respectivement s'il s'agit d'une classe abstraite ou finale.

``` php
<?php
echo $r->isAbstract() ? 'Y' : 'N'; # N
```

``` php
<?php
echo $r->isFinal() ? 'Y' : 'N'; # N
```

### getParentClass

Retourne la classe parente ou `false`.

``` php
<?php
echo $r->getParentClass(); # ReflectionClass Object ( [name] => A )
```

### isSubclassOf

Vérifie si la classe hérite ou implémente la classe donnée.

``` php
<?php
echo $r->isSubclassOf('A') ? 'Y' : 'N'; # Y
echo $r->isSubclassOf('I') ? 'Y' : 'N'; # Y
```

### isInterface

Vérifie si la classe est une interface.

``` php
<?php
echo $r->isInterface() ? 'Y' : 'N'; # N
```

### implementsInterface

Vérifie si la classe implémente l'interface donnée.

``` php
<?php
echo $r->implementsInterface('I') ? 'Y' : 'N'; # Y
```

### getInterfaces, getInterfaceNames

`getInterfaces` retourne la liste des interfaces que la classe implémente (liste d'objets `Reflection`)

``` php
<?php
print_r($r->getInterfaces());

/* Array (
  [I] => ReflectionClass Object ( [name] => I ) )
*/
```

`getInterfaceNames` retourne les noms (chaîne de caractères).

``` php
<?php
print_r($r->getInterfaceNames(); # Array ( [0] => I )
```

---

## ReflectionProperty

### __construct

Il existe deux manières de récupérer une reflection de propriété

* à partir du nom de classe

  ``` php
  <?php
  $rp = new ReflectionProperty('B', 'var');
  ```

* à partir d'un objet `ReflectionClass`

  ``` php
  <?php
  $rp = $r->getProperty('var');
  ```

### getName

Retourne le nom de la propriété.

``` php
<?php
echo $rp->getName(); # var
```

### getValue

Retourne la valeur de la propriété pour un objet donné.  
L'objet en paramètre peut être omis pour récupérer la valeur d'une propriété statique.

``` php
<?php
echo $rp->getValue($obj);
```

### setAccessible

Rend la propriété publique pour la reflection en cours.  
Permet de récupérer la valeur d'une propriété d'un objet qui n'est pas publique.

``` php
<?php
$rp = new ReflectionProperty('B', 'var');
$rp->setAccessible(true);

print_r($rp->getValue($obj)); # b
```

``` php
<?php
$r  = new ReflectionObject($obj);
$rp = $r->getProperty('var');
$rp->setAccessible(true);

print_r($rp->getValue($obj));
```

### isPublic, isProtected, isPrivate

Vérifie respectivement si la propriété est publique, protégée ou privée.

``` php
<?php
echo $rp->isPublic() ? 'Y' : 'N'; # N
```

``` php
<?php
echo $rp->isProtected() ? 'Y' : 'N'; # Y
```

``` php
<?php
echo $rp->isPrivate() ? 'Y' : 'N'; " N
```

### isStatic

Vérifie si la propriété est statique.

``` php
<?php
echo $rp->isStatic() ? 'Y' : 'N'; # N
```

---

## ReflectionMethod

### __construct

De la même manière que pour les propriétés, on peut récupérer une reflection de méthode

* à partir du nom de classe

  ``` php
  <?php
  $rm = new ReflectionMethod('B', 'test');
  ```

* à partir d'un objet `ReflectionClass`

  ``` php
  <?php
  $rm = $r->getMethod('test');
  ```

### getDocComment

Retourne les commentaires de la méthode.

``` php
<?php
echo $rm->getDocComment();
# /** * Test * @return string */
```

### setAccessible

Rend la méthode publique pour la reflection en cours.

``` php
<?php
$rm->setAccessible(true);
```

### invoke, invokeArgs

Appelle la méthode sur l'objet donné.  
`invoke` prend une liste d'argument, séparés par des virgules, tandis que `invokeArgs` prend un tableau.

``` php
<?php
$rm->invoke($obj, 1, 2);
```

``` php
<?php
$rm->invokeArgs($obj, array(1, 2));
```

### isPublic, isProtected, isPrivate

Vérifie respectivement si la méthode est publique, protégée ou privée.

``` php
<?php
echo $rm->isPublic() ? 'Y' : 'N'; # Y
```

``` php
<?php
echo $rm->isProtected() ? 'Y' : 'N'; # N
```

``` php
<?php
echo $rm->isPrivate() ? 'Y' : 'N'; # Y
```

### isStatic

Vérifie si la méthode est statique.

``` php
<?php
echo $rm->isStatic() ? 'Y' : 'N'; # N
```

### isAbstract, isFinal

Vérifie respectivement si la méthode est abstraite ou finale.

``` php
<?php
echo $rm->isAbstract() ? 'Y' : 'N'; # N
```

``` php
<?php
echo $rm->isFinal() ? 'Y' : 'N'; # N
```

### isConstructor, isDestructor

Vérifie respectivement si la méthode est le constructeur ou le destructeur de la classe.

``` php
<?php
echo $rm->isConstructor() ? 'Y' : 'N'; # N
```

``` php
<?php
echo $rm->isDestructor() ? 'Y' : 'N'; # N
```