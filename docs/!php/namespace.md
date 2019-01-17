---
title: Namespace
category: Web, PHP
---

## Déclarer un namespace

Tout comme un fichier appartient à un répertoire et deux fichiers de même nom ne peuvent exister dans le même répertoire, on peut placer des classes dans un *namespace* et éviter des conflits de nom. C'est utile sur les gros projets et pour les librairies.

La déclaration du namespace doit être la première instruction du fichier PHP (seules les lignes vides et lignes de commentaires peuvent être présentes avant le namespace).

``` php
namespace MonNamespace;

class A {}
```

<ins>Nom</ins>:

Le namespace répond aux mêmes exigences d'appellation qu'une variable, on ne peut donc pas utiliser
- de mots-clés du langage

  ``` php
  <?php
  namespace Abstract;
  # FATAL ERROR syntax error, unexpected 'Abstract' (T_ABSTRACT)
  ```

- ni de caractères spéciaux

  ``` php
  <?php
  namespace core.example;
  # FATAL ERROR syntax error, unexpected '.
  ```

<ins>Sous-namespace</ins>:

Un sous-namespace est traité comme un namespace à part entière:  
`Example\Sub` n'a pas accès à `Example` et inversemment.

<ins>Déclarer plusieurs namespaces</ins>:

Il est possible de déclarer plusieurs namespace à l'intérieur d'un même fichier,
* soit par ordre de précédence

  ``` php
  <?php
  //------ EXAMPLE ------
  namespace Example;

  function hello() {
    return "Example";
  }
  echo hello();

  //------ ANOTHER ------
  namespace Another;

  function hello() {
    return "Another";
  }
  echo hello();
  echo \Example\hello();
  ```

* soit par accolade (il n'est pas possible de faire un mix des deux)

  ``` php
  <?php
  //------ EXAMPLE ------
  namespace Example {
    function hello() {
      return "Example";
    }
    echo hello();
  }

  //------ ANOTHER ------
  namespace Another {
    function hello() {
      return "Another";
    }
    echo hello();
    echo \Example\hello();
  }
  ```

---

## Utiliser une entité dans un namespace

Lorsqu'on déclare un namespace, toutes les classes (classes abstraites, interfaces et traits y compris), fonctions et constantes dans ce fichier sont déclarées comme faisant partie du namespace.

<ins>Entités du namespace courant</ins>:

Toutes les entités du namespace courant sont directement accessibles, sans préfixe.

``` php
<?php
namespace Example;

function hello() {
    return "OK";
}
echo hello();
```

<ins>Entités d'un autre namespace</ins>:

Les entités d'un namespace différent doivent être

* soit préfixées du namespace

  ``` php
  <?php
  namespace Another;

  $obj = new Example\A();
  ```

* soit importées avec `use`.  
  Cela permet d'appeler une classe par son nom sans avoir à la précéder de son namespace.  
  Les `use` doivent être placés au haut du fichier, juste après la déclaration du namespace courant.

  ``` php
  <?php
  namespace Another;
  use Example\A;

  $obj = new A();
  ```

  Il est également possible d'utiliser une classe sous un autre nom que son nom de classe grâce à `as`.  
  Particulièrement utile quand les noms de classe sont en conflit.

  ``` php
  <?php
  namespace Another;
  use Example\A as B;

  $obj = new B();
  ```

  Jusqu'à PHP 5.6, le `use` ne peut être utilisé que les classes, interfaces et traits (et non les fonctions et constantes locales). Depuis, on peut importer les fonctions et constantes avec `function` et `const` respectivement

  ``` php
  <?php
  use function some\namespace\fn_a;
  use const some\namespace\ConstA;
  ```

  Depuis PHP 7, il est possible d'importe plusieurs classes, fonctions et constantes du même namespace en même temps.

  ``` php
  <?php
  use some\namespace\{ClassA, ClassB, ClassC as C};
  use function some\namespace\{fn_a, fn_b, fn_c};
  use const some\namespace\{ConstA, ConstB, ConstC};
  ```

Lorsqu'on est dans un namespace, pour accéder à une classe qui n'est dans aucun namespace (déclarée dans le contexte global), il faut précéder le nom de la classe de la racine `\`.

``` php
<?php
namespace Example;

$date = new \DateTime();
```

<ins>Comportement des callbacks</ins>:

Les closures gardent le contexte courant, il n'est donc pas utile de préfixer les classes à l'intérieur.

``` php
<?php
$var = function() {
    return hello();
};
echo $var();
```

Les fonctions nommées par contre (lorsqu'on passe par une variable), perdent le contexte.

``` php
<?php
$var = 'Example\hello';
echo $var();
```

---

## Alias de classe

La fonction `class_alias` permet de créer un alias de classe.  
L'alias est déclaré dans le contexte global (donc à la racine).

``` php
<?php
//------ EXAMPLE ------
namespace Example;
class A {}

class_alias('Example\A', 'EA');
var_dump(new \EA);

//------ EXAMPLE\SUB ------
namespace Example\Sub;
var_dump(new \EA);
```
