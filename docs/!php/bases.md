---
title: Les bases
category: Web, PHP
---

## Balises

### Balise d'ouverture PHP

    <?php

Les balises d'ouverture et de fermeture PHP délimitent le code qui doit être interprété.  
Tout ce qui est en dehors de ces balises est directement affiché.

La balise d'ouverture doit être suivie d'un caractère vide (espace, tabulation ou retour à la ligne).
Ex :

``` php
echo "hello world"
<?php echo "hello world"
# Affiche echo "hello world"hello world

```

### Balise courte d'ouverture

    <?

Cette balise peut être désactivée dans php.ini (`short_open_tag = Off`) et est donc déconseillée.

<ins>Autres balises alternatives supprimées en PHP 7</ins>:

| Balises | Exemple                             | Infos
|---      |---                                  |---
| ASP     | `<% %>`                             | doivent être activée dans php.ini (`asp_tags = On`) |
| script  | `<script language="php"> </script>` | insensibles à la casse                            

### Balise de fermeture

    ?>

La balise doit être précédée d'un caractère vide (espace, tabulation ou retour à la ligne).

Il n'est pas nécessaire et même déconseillé de fermer la balise PHP en fin de script (risque d'afficher les lignes vides présentes en fin de fichier). Fermer la balise PHP est utile pour afficher du texte non interprété (donc sans avoir à échapper d'éventuelles quotes) à l'intérieur d'un script PHP.
Ex :

``` php
<?php
if(true) { ?>
  Ce texte n'est pas interprété
<?php }
# Affiche ce texte n'est pas interprété
```

### Balise d'affichage

La balise `<?php` permet d'executer du code. Pour executer et afficher le résultat de l'execution, il existe la balise `<?=`.

``` php
<?= $var ?>
```

revient à

``` php
<?php echo $var ?>
```

Depuis PHP 5.4, `<?=` n'est plus désactivé par `short_open_tag`.

---

## Instructions

    exemple();

Toutes les instructions PHP sont closes par un point-virgule. Seules les structures de contrôles délimitées par accolades (if, switch, foreach, etc) ne sont pas terminées par un point-virgule. 
Ex :

``` php
<?php
if(true) {
  echo "Hello";
  echo "world";
}
```

Le point-virgule n'est pas obligatoire devant la balise de fermeture PHP.
Ex :

``` php
<?php echo $var ?>
```

## Commentaires

Il existe deux types de commentaires.

* Les commentaires jusqu'à la fin de la ligne:

  ``` php
  <?php
  //Commentaire
  ```

  ``` php
  <?php
  #Commentaire
  ```

  `#` est la syntaxe du langage MySQL, il a été porté en PHP uniquement pour le confort du developpeur (il n'y aucune différence entre `#` et `//`).

* Les commentaires délimités:

  ``` php
  <?php
  /*Commentaire*/
  ```

  Permet de mettre un commentaire sur plusieurs lignes.

---

## Syntaxe de base

Récapitulatif de la syntaxe PHP:

<ins>Variable</ins>:

``` php
<?php
$var = "value";
echo $var . "!";
```

<ins>Conditions</ins>:

``` php
<?php
if($var == "Hello") {
  echo "Homepage";

} else if($var == "About") {
  echo "About us";

} else {
  echo "404";
}
```

``` php
<?php
switch($var) {
  case "Hello": echo "Homepage"; break;
  case "About": echo "About us"; break;
  default: echo "404";
}
```

``` php
<?php
echo ($nb == 0 ? '?' : '&');
```

<ins>Boucles</ins>:

``` php
<?php
for($i = 0; $i < 10; $i++) {
  echo $i++;
}
```

``` php
<?php
$arr = ["a", "b", "c"];

foreach($arr as $item) {
  echo $item;
}
```

``` php
<?php
$arr = ["a" => 1, "b" => 2, "c" => 3];

foreach($arr as $key => $value) {
  echo $key . ":" . $value;
}
```

<ins>Fonctions</ins>:

``` php
<?php
function hello($name) {
  return "Hello " . $name;
}
echo hello("Bob"); # Affiche "Hello Bob"
```

<ins>Objets</ins>:

``` php
<?php
class Person {
  protected $name = "";

  public function __construct($name) {
    $this->name = $name;
  }
  public function hello() {
    return "Hello " . $this->name;
  }
}

$obj = new Person("Bob");
echo $obj->hello(); # Affiche "Hello Bob"
```

<ins>Exceptions</ins>:

``` php
<?php
try {
  echo file_get_contents("file.txt");

} catch(Exception $e) {
  echo $e->getMessage();
}
```

<ins>Include</ins>:

``` php
<?php
include 'inc.commonFct.php';
```

---

## Ignorer les erreurs

Le caractère arobase `@` permet d'ignorer les erreurs.  
Par exemple, lorsqu'on essaie d'accéder à une variable qui n'existe pas, une erreur est levée (notice). En plaçant `@` devant la variable, on récupère la valeur de la variable si elle est définie et `null` sinon.

``` php
<?php
$var = @$var2;
```

Cela fonctionne également pour les erreurs levée par les fonctions:

``` php
<?php
@unlink($file);
```
