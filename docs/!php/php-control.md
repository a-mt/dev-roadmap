---
title: Structures de contrôle
category: Web, PHP
---

## If

L'instruction qui suit le `if` est exécutée uniquement si la condition située entre parenthèses est vraie:

``` php
<?php
if(true) echo "OK";   # Affiche "OK"
if(false) echo "NOK"; # N'affiche rien
```

### Instructions

Il est possible d'exécuter plusieurs instructions

* soit en créant un bloc de code délimité par des accolades `{ ... }`

  ``` php
  <?php
  if(true) {
      echo "OK";
      echo "!";
  }
  ```

* soit en utilisant la syntaxe `: ... endif`

  ``` php
  <?php
  if(true):
      echo "OK";
      echo "!";
  endif;
  ```

Il n'est pas possible de mixer la syntaxe `{ ... }` et `: ... endif`.

### Condition

Le `if` accepte toute expression, le résultat obtenu sera comparé à `true` (test non strict).  
Ainsi toute valeur équivalente à faux (comme `0` ou `[]`) ne validera pas le `if`, et toute valeur qui n'est pas équivalent à faux validera le `if`.

Lorsqu'on affecte une valeur à une variable, l'expression retourne la valeur qui a été affectée. Ainsi, dans l'exemple suivant, le contenu du `if` sera exécuté si `getValue()` retourne une valeur qui n'est pas équivalente à faux.

``` php
<?php
if($var = getValue()) {
    // ...
}
```

Cela revient à faire:

``` php
<?php
$var = getValue();
if($var) {
    // ...
}
```

### Elseif

Le `if` peut être suivit d'un ou plusieurs `elseif`.  
Le `elseif` n'est évalué que si le `if` (ou les `elseif` qui le précède s'il y en a) était faux.  
On peut l'écrire en deux mots, `else if`, sauf lorsqu'on utilise la syntaxe `: ... endif` (parse error).

``` php
<?php
if($score == 100) {
  echo "OK";

} else if($score >= 75) {
  echo "Almost";

} else if($score >= 50) {
  echo "Meh";

} else {
  echo "NOK";
}
```

### Else

Le `else` est exécuté dans le cas où tous les `if` et `elseif` le précédent ont échoué.

``` php
<?php
if(false) echo "OK";
else echo "NOK";
```

---

## Switch

Le `switch` permet d'évaluer une série d'instruction `if ($var == ?)`. Cela permet de comparer la même variable à un grand nombre de valeurs différentes (non strict) de manière plus lisible qu'un grand nombre de `if`. Il n'y a aucune différence de performance entre `if` et `switch`.

``` php
<?php
$a = 0;
switch(++$a) {
    case 3: echo 3; break;
    case 2: echo 2; break;
    case 1: echo 1; break;
    default: echo "No match!"; break;
}
# Affiche 1
```

revient à

``` php
<?php
$a = 0;
$a++;

if($a == 3) {
    echo 3;
} elseif($a == 2) {
    echo 2;
} elseif($a == 1) {
    echo 1;
} else {
    echo "No match!";
}
```

### Instructions

Même principe qu'un `if`, on peut utiliser la syntaxe `{ ... }` ou `: ... endswitch`.

``` php
<?php
switch ($a):
    case 3: echo 3; break;
    case 2: echo 2; break;
    case 1: echo 1; break;
    default: echo "No match!"; break;
endswitch;
```

### Case

Le `switch` contient une série de `case` dont la valeur sera comparé à l'expression du `switch`.  
Ainsi un `case` peut évaluer le résultat d'une fonction ou même une expression.

``` php
<?php
switch (true) {
  case (X != 1): break;
  case (Y != 1): break;
  default:
}
```

revient à

``` php
<?php
if((X != 1) == true):
elseif((Y != 1) == true):
else:
endif;
```

Le `case` est suivit de deux-points `:` ou d'un point-virgule `;`, puis de 0 à n instructions.

### Break

Lorsqu'un `switch` entre dans un `case` (parce qu'il est évalué à vrai), il entre dans tous les `case` qui suivent (sans tester leur expression) jusqu'à rencontrer un `break`. On peut également utiliser le mot-clé `continue` à la place de `break`.

``` php
<?php
$var = 1;
switch($var) {
    case 1:
    case 2: echo '1 ou 2';
    case 3: echo 3;
    default: echo 'default';
}
# Affiche "1 ou 23default"
```

``` php
<?php
$var = 1;
switch($var) {
    case 1:
    case 2: echo '1 ou 2'; break;
    case 3: echo 3; break;
    default: echo 'default';
}
# Affiche "1 ou 2"
```

Une fois le `break` rencontré, on sort du `switch` (les autres `case` ne sont pas testés).

``` php
<?php
$var = 1;
switch($var) {
  case 1:
  case 2:
    echo '1 ou 2';
    continue;
  case 1:
  case 2:
    echo 'On ne passe pas ici';
    continue;
}
# Affiche "1 ou 2"
```

### Default

Le `default` est exécuté dans le cas où aucun `case` n'est évalué à vrai, même principe que le `else` du `if`.  
Tout comme le `case`, il peut être suivit de deux-points `:` ou d'un point-virgule `;`.

---

## Condition ternaire

Les conditions ternaires retournent une valeur sous condition (pour afficher ou affecter).

``` php
<?php
$url .= ($nb == 0 ? '?' : '&');
```

Les parenthèses autour de l'expression ne sont pas obligatoires mais sont recommandées.  
Le système de priorité des conditions ternaires n'est pas intuitif:

* concaténation

  ``` php
  <?php
  echo ('a' . false ? 'true' : 'false');
  # Affiche 'true'
  ```
  
  revient à
  
  ``` php
  <?php
  echo (('a' . false) ? 'true' : false)
  ```

* multiples conditions ternaires
  
  ``` php
  <?php
  echo (true ? 1 : true ? 2 : 3);
  # Affiche 2
  ```
  
  revient à
  
  ``` php
  <?php
  echo ((true ? 1 : true) ? 2 : 3);
  ```

La valeur du vrai est optionnelle depuis PHP 5.3:

``` php
<?php
echo "chien" . ($n<0 ?:'s')
```

## Null coalescent

Depuis PHP 7, l'opérateur `??` permet de donner une valeur par défaut si le premier opérande vaut `null`.

``` php
<?php
$id = $_GET['id'] ?? 1;
```

est équivalent à

``` php
<?php
$id = isset($_GET['id']) ? $_GET['id'] : 1;
```

---

## Goto

Le `goto` permet de sauter à un point d'ancrage donné (depuis PHP 5.3).  
Pour définir un point d'ancrage, on utilise un label suivit de deux-points `monlabel:`.

Le `goto` a mauvaise réputation, il rend le code moins lisible et peut généralement être substitué par des `if`, son utilisation est déconseillée.

``` php
<?php
echo 'Before';
goto section;

echo 'Middle';

section:
echo 'After';

// Affiche BeforeAfter
```

