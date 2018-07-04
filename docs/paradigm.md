---
title: Paradigmes de programmation
category: Other
---

Un paradigme est un ensemble de principes, une manière de développer et d'organiser son code. Par exemple, en programmation orientée objet une application est considérée comme une collection d'objets, tandis qu'en programmation fonctionnelle c'est une suite de fonctions. Certains langages sont conçus pour supporter un paradigme en particulier (POO: Smalltalk, Java; fonctionnelle: Haskell) alors que d’autres supportent des paradigmes multiples (C++, Python, Ruby, Scala...). Il existe beaucoup de paradigmes, et plusieurs paradigmes peuvent être utilisés ensemble et se complémenter.

## Style impératif vs Style déclaratif

Le *style impératif* en programmation consiste à donner à l'ordinateur l'ensemble des instructions pour effectuer une tâche, de A à Z. 
Le *style déclaratif* consiste à appeler des fonctions et des méthodes, et de ce fait de diviser la complexité d'un programme en petites parties plus faciles à tester et à debugger.

La programmation fonctionnelle et la programmation orientée objet sont des styles de développement déclaratifs.

## Programmation Fonctionnelle

La programmation fonctionnelle est une approche de développement logiciel basée sur l'utilisation de fonctions.  
Elle suit quelques principes de base:

* Les mêmes paramètres donnent toujours le même résultat.

* Les fonctions sont indépendantes de l'état du programme ou des variables globales.  
  Elles ne dépendent que des paramètres qui lui sont fournits pour effectuer un calcul.

* Les fonctions essaient de limiter les changements apportés à l'état du programme.  
  Elles ne définissent ni ne modifient les variables globales.

* Les fonctions ont des effets minimes dans le programme et tous les changements sont soigneusement contrôlés:  
  on préfère une fonction de tri qui retourne un nouveau tableau trié, qu'une fonction qui trie le tableau donné en entrée.

Une fonction devrait idéalement être une *fonction pure*, c'est à dire une fonction qui obéit à tous les principes listés ci-dessus.

``` js
function push(arr, item) {
    return [...arr, item];
}

var arr2 = push(arr, "new item");
```

## Programmation Orientée Objet

La Programmation Orientée Objet (POO) est un approche de développement logiciel basé sur l'utilisation d'objet. Un objet encapsule des méthodes et des données en relation. Les données ne peuvent être manipulées que par les méthodes de l'objet.

On crée un objet à partir d'un "moule", une classe, qui décrit la structure de l'objet. Un objet est une instance de classe, cette structure mais avec un état qui lui est propre.

``` php
<?php
class Personnage {
    protected $nom   = "";
    protected $sante = 0;
    protected $force = 0;
    protected $xp    = 0;

    public function __construct($nom, $sante, $force) {
        $this->nom   = $nom;
        $this->sante = $sante;
        $this->force = $force;
    }

    public function decrire() {
        $description = $this->nom
                     . " a " . $this->sante . " points de vie, "
                     . $this->force . " en force et "
                     . $this->xp . " points d'expérience";
        return $description;
    }
}

$perso1 = new Personnage("Aurora", 150, 25);
echo $perso1->decrire();
```

## Programmation Orientée Prototype

La Programmation Orientée Prototype est un style de POO particulier. Un prototype décrit une structure d'objet mais il n'est pas figé et peut évoluer dynamiquement à l'exécution, contrairement à une classe qui est figée à la compilation.

``` js
function Personnage(nom, sante, force) {
    this.nom = nom;
    this.sante = sante;
    this.force = force;
    this.xp = 0;
};

// Renvoie la description du personnage
Personnage.prototype.decrire = function () {
    var description = this.nom + " a " + this.sante + " points de vie, " +
        this.force + " en force et " + this.xp + " points d'expérience";
    return description;
}

var perso1 = new Personnage("Aurora", 150, 25);
console.log(perso1.decrire());
```

## Programmation modulaire

La programmation modulaire consiste à encapsuler les objets en modules, en utilisant notamment des espaces de nom.  
On voit très souvent ce mode de fonctionnement en JavaScript:

``` js
var APP = APP || {};

APP.monextension = (function(){
  return {
    ...
  };
})();
```
