---
title: Fonctions
category: Web, PHP
---

## Déclarer une fonction

Une fonction peut être définie en utilisant la syntaxe suivante : 

``` php
<?php
function hello($name) {
  return "Hello " . $name;
}

echo hello("Bob"); # Hello Bob
```

<ins>Nom</ins>:

Les mots-clés du langages ne peuvent pas être utilisées comme noms de fonction (ex: `class`, `function`, `if`, etc).  
Par convention, les noms de fonctions sont en lowerCamelCase.

<ins>Appeler une fonction</ins>:

L'appel peut être effectué avant ou après la déclaration de la fonction si déclarée dans le même script PHP. Sinon, le fichier contenant le fonction doit être inclus avant l'appel de la fonction (ou lève une erreur "Fatal error: Call to undefined function").

<ins>Portée d'une fonction</ins>:

Toutes les fonctions et classes en PHP ont une portée globale - elles peuvent être appelées à l'extérieur d'une fonction si elles ont été définies à l'intérieur et vice-versa.

``` php
<?php
<?php
function foo()  {
  function bar() {
    echo "Je n'existe pas tant que foo() n'est pas appelé.\n";
  }
}

/* bar() n'existe pas. */
foo();
/* bar() existe maintenant, puisqu'on a appelé foo(). */
bar();
```

---

## Valeur de retour

Il n'existe pas de "vraie" procédure en PHP, uniquement des fonctions: si aucune valeur de retour n'est spécifiée, la valeur par retournée est `null`.

``` php
<?php
function hello($name) {
  echo "Hello " . $name; # Hello Bob
}
var_dump(hello("Bob")); # NULL
```

``` php
<?php
function hello($name) {
  echo "Hello " . $name; # Hello Bob
  return;
}
var_dump(hello("Bob")); # NULL
```

Une fonction peut prendre plusieurs paramètres en entrée mais ne peut retourner qu'un seul résultat. Pour retourner plusieurs résultats, deux possibilités:

* prendre des pointeurs en entrée

  ``` php
  <?php
  function getData(&$a, &$b) {
      $a = "valeur1";
      $b = "valeur2";
  }
  getData($var, $var2);

  echo $var;  # valeur1
  echo $var2; # valeur2
  ```

* retourner un tableau en sortie

  ``` php
  <?php
  function getData() {
      return array("valeur1", "valeur2");
  }
  list($var, $var2) = getData();

  echo $var;  # valeur1
  echo $var2; # valeur2
  ```

---

## Portée des variables

Une variable définie dans une fonction n'existe que dans cette fonction.

``` php
<?php
function test() {
    $var = 1;
}
test();
echo $var; # NOTICE Undefined variable: var on line number 7
```

Une variable définie en dehors d'une fonction n'est pas directement accessible par la fonction.

``` php
<?php
$var = 1;
function test() {
    echo $var; # NOTICE Undefined variable: var on line number 5
}
test();
```

### global

Pour accéder ou définir une variable dans le contexte global, on utilise le mot-clé `global`.

``` php
<?php
$var = 1;
function test() {
    global $var;
    echo $var; # 1
    $var++;
}
test();
echo $var; # 2
```

``` php
<?php
function test() {
    global $var;
    $var = 1;
}
test();
echo $var; # 1
```

On peut également spécifier plusieurs variables globales en même temps:

``` php
<?php
global $var, $var2;
```

Pour récupérer la valeur d'une variable globale, en lecture uniquement, on peut également utiliser `$GLOBALS`

``` php
<?php
$var = 1;
function test() {
    $var = $GLOBALS['var'];
    echo $var; # 1
    $var++;
}
test();
echo $var; # 1
```

### static

Les variables statiques restent locales à leur fonction mais conservent leur valeur entre deux appels.

``` php
<?php
function test() {
    static $a = 0;
    echo $a++;
}
test();  # 0
test();  # 1
echo $a; # NOTICE Undefined variable: a on line number 10
```

---

## Paramètres

Un *argument* est un paramètre en entrée.  
Un *résultat* est un paramètre de sortie.  
Un *pointeur* est un paramètre en entrée/sortie.

La valeur des arguments donnés à la fonction n'est modifiée que dans le contexte de la fonction.

``` php
<?php
function increment($a) {
    $a++;
    echo $a; # 4
}
$var = 3;
increment($var);
echo $var; # 3
```

Pour que la valeur soit modifiée en dehors de la fonction, il faut utiliser un pointeur.

``` php
<?php
function increment(&$a) {
    $a++;
    echo $a; # 4
}
$var = 3;
increment($var);
echo $var; # 4
```

Seules les variables peuvent être passées par référence:

``` php
<?php
function test(&$a) {
    var_dump($a);
}
$var = "";
test($var); # OK
test("");   # Fatal error: Only variables can be passed by reference
```

Les objets sont toujours passés par référence, il est donc inutile d'utiliser un pointeur pour un objet (cloner l'objet s'i est souhaitable que sa valeur ne soit pas modifiée).

---

## Paramètres optionnels

Pour rendre des paramètres optionnels, il suffit de déclarer une valeur par défaut. C'est la valeur que prendra la variable si cet argument n'est pas donné à la fonction au moment de l'appel.

La valeur par défaut d'un argument doit obligatoirement être une valeur constante, et ne peut être ni une variable, ni un membre de classe, ni un appel de fonction.

Les arguments optionnels doivent être placés à la suite de tous les paramètres sans valeur par défaut.

``` php
<?php
function hello($name) {
    echo "Hello " . $name;
}
hello(); # WARNING Missing argument 1 for hello()
```

``` php
<?php
function hello($name = "World") {
    echo "Hello " . $name;
}
hello(); # Hello World
```

Les pointeurs peuvent également être optionnels.

---

## Nombre variable d'arguments

### Rest

Depuis PHP 5.6, l'opérateur `...` permet de créer des fonctions qui prennent un nombre indéfinis d'arguments, récupérés sous la forme de tableau. Dans ce contexte, on l’appelle l’opération de reste (*rest operator*).

``` php
<?php
function sum(...$nums) {
    return array_sum($nums);
}
echo sum(1, 2, 3, 4); # 10
```

### Spread

À l'inverse, il peut également transformer un tableau en une liste d'arguments. Dans ce contexte, on l’appelle l’opération de décomposition (*spread operator*).

``` php
<?php
function add($a, $b) {
    return $a + $b;
}
echo add(...[1, 2]); # 3
```

Notez que contrairement à JavaScript, cet opérateur ne peut pas être utilisé en dehors de l'appel de fonction.

``` php
<?php
$arr2 = [...$arr, 4]; # Parse error: syntax error, unexpected '...' (T_ELLIPSIS),
```

### PHP < 5.6

Avant PHP 5.6, on utilise un ensemble de fonction:

* `func_num_args()` retourne le nombre de paramètres passés à la fonction
* `func_get_args()` retourne la liste des paramètres passés à la fonction
* `func_get_arg($i)` récupère la valeur du ième argument passé à la fonction

``` php
<?php
function sum() {
    return array_sum(func_get_args());
}
echo sum(1, 2, 3, 4); # 10
```

``` php
<?php
function sum() {
    $size = func_num_args();
    $sum  = 0;

    for ($i = 0; $i < $size; $i++) {
        $sum += func_get_arg($i);
    }
    return $sum;
}
echo sum(1, 2, 3, 4); # 10
```

Seuls les arguments effectivement passés à la fonction sont pris en compte, les paramètres optionnels qui n'ont pas été passé ne sont pas comptabilisés.

``` php
<?php
function foo($a, $b=2){
    print_r(func_get_args()); # Array ( [0] => 1 )
}
foo(1);
```

---

## Type hinting

### Paramètres en entrée

Il est possible de spécifier le type d'argument accepté.
Si le type de donnée passé en argument n'est pas celui spécifié, en PHP5, une erreur est levée fatale est levée. En PHP7, une exception TypeError est levée.

``` php
<?php
function test(array $a) {
    print_r($a);
}
test(array(10.0));
# OK

test(10.0);
# Catchable fatal error: Argument 1 passed to test() must be of the type array, double given
```

<ins>Types valides</ins>:

Les types valides pour le type hinting en PHP 5 sont un nom de classe/d'interface, `array` et `callable`.  
PHP 7 ajoute `float`, `int`, `string`, `iterable` et `object`.

``` php
<?php
function test(double $a) {
   echo $a;
}
test(10.0);
# Catchable fatal error: Argument 1 passed to test() must be an instance of double, double given
```

<ins>Valeur par défaut</ins>

Si un paramètre est typé, il n'est pas possible de mettre une valeur par défaut qui ne soit pas de ce type, sauf `null`.

``` php
<?php
function test(stdClass $obj = null) { // OK
    var_dump($obj);
}
```

``` php
<?php
function test(stdClass $obj = false) { // E_FATAL
    var_dump($obj);
}
````

<ins>Type hinting d'une classe</ins>:

Lorsqu'on spécifie un nom de classe pour type, les classes filles sont acceptées.  
PHP se sert de `instanceof` pour vérifier le type de l'objet, une erreur est levée si l'objet donné n'est pas une instance de la classe attendue.

### Valeur retour

Depuis PHP 7, il est possible de déclarer le type de retour. Les mêmes types sont disponibles pour le typage.

``` php
<?php
function sum($a, $b): float {
    return $a + $b;
}
```

Pour que la fonction puisse retourner `null` on ajoute `?`.

``` php
<?php
function get_item(): ?string {
    if (isset($_GET['item'])) {
        return $_GET['item'];
    } else {
        return null;
    }
}
```

Le type `void` a été introduit. Une fonction retournant `void` doit obligatoirement omettre la valeur de retour. `return null` n'est pas accepté.

``` php
<?php
function swap(&$left, &$right): void {
    if ($left === $right) {
        return;
    }
    $tmp   = $left;
    $left  = $right;
    $right = $tmp;
}
```

---

## Callback

Il existe différente manière de donner des fonctions en argument.

### create_function

Crée une fonction anonyme lambda.

``` php
<?php
usort($files, create_function('$a, $b', 'return strnatcmp($b, $a);'));
```

`create_function` doit contenir du code PHP valide (ne pas oublier le point-virgule !) ou une erreur fatale est levée au moment de l'appel de la fonction.

### Closure

Une closure est une fonction anonyme, ayant le même usage qu'une fonction lambda - mais avec une déclaration plus intuitive. Les closures existent à partir de PHP 5.3.

``` php
<?php
usort($files, function($a, $b) {
    return strnatcmp($a, $b);
});
```

<ins>use<ins>:

Les closures restent dans le namespace où elles sont déclarées et peuvent garder une copie de variables existantes au moment de la déclaration de la closure, contrairement à une lambda. Pour qu'une closure conserve une variable du contexte courant on utilise le mot-clé `use`:

``` php
<?php
$i = 2;
$var = function($n) use($i){
    return $n + $i;
};
$i = 3;
echo $var(2); # 4
```

La variable donnée en argument au `use` se comporte exactement comme un paramètre de fonction: il faut utiliser un pointeur pour modifier la variable d'origine.

``` php
<?php
$stack = array();
$add   = function($n) use(&$stack){
    $stack[] = $n;
};
$add(2);
print_r($stack); # Array ( [0] => 2 ) 
```

### Fonction nommée

On peut également donner le nom d'une fonction pour callback.

``` php
<?php
usort($files, 'strnatcmp');
```

<ins>Éléments de syntaxe</ins>:

Attention, les éléments de syntaxe peuvent être appelés comme des fonctions, avec des parenthèses, ou en omettant les parenthèses - si on omet les parenthèses en appelant une fonction, une erreur est levée (parse error). Les éléments de syntaxe ne peuvent pas être utilisés comme callback: donner `echo` en callback lèvera une erreur au moment de l'execution (fatal error), contrairement à `printf`.

Élements de syntaxe souvent utilisés comme des fonctions :  
`echo`, `print`, `die`, `exit`, `require`, `include`, `require_once`, `include_once`, `isset`, `unset`, `empty`, `eval`.

[Liste complète des éléments de syntaxe](http://php.net/manual/en/reserved.keywords.php)

``` php
<?php
// Élement de syntaxe
print "ok";
print("ok");

// Fonction
printf("ok");
printf "nok"; # parse error
```

### Fonction d'un objet

Pour créer un callback qui appelle la fonction d'un objet donné, on définit un tableau où l'index 0 est l'objet et l'index 1 est le nom de la fonction à appeler.

``` php
<?php
$method = array($object, 'createFromFormat');
```

Si la fonction est statique, on peut donner le nom de la classe plutôt qu'une instance de classe:

``` php
<?php
$method = array('DateTime', 'createFromFormat');
```

### Appeler un callback

On exécute un callback exactement comme s'il s'agissait d'un appel de fonction classique, en passant les paramètres en paranthèses.

``` php
<?php
$method = 'strtolower';
echo $method('E'); # e*
```

---

## Appel dynamique

Pour appeler une fonction dont on ne connaît pas le nom au préalable, deux solutions

* utiliser une variable

  ``` php
  <?php
  $case   = 'lower';
  $method = 'strto' . $case;
  echo $method('E');
  ```

* utiliser `call_user_func`

  ``` php
  <?php
  $case = 'lower';
  echo call_user_func('strto' . $case, 'E');
  ```

  ou `call_user_func_array`, qui prend la liste des arguments à passer à la fonction dans un tableau et non séparé par des virgules.

  ``` php
  <?php
  $case = 'lower';
  echo call_user_func('strto' . $case, array('E'));
  ```

--- 

## Générateurs

Une fonction générateur est une fonction qui, plutôt que de retourner une valeur en une fois avec `return`, retourne plusieurs valeurs consécutives avec `yield`. Cette syntaxe est disponible depuis PHP 5.5.

Lorsque la fonction est appelée, elle retourne un objet `Generator`.  
Pour récupérer les valeurs retournées, on utilise un `foreach`.  
L'exécution de la fonction est interrompue entre deux `yield`.

``` php
<?php
function xtimes($n) {
  for($i = 0; $i < $n; $i++) {
    yield time();
  }
}

$it = xtimes(10);
var_dump($it); # object(Generator)#1 (0) { }

foreach($it as $i => $num) {
  echo $i . ":" . $num . "\n";
  sleep(1);
}

/*
0:1547368272
1:1547368273
2:1547368274
3:1547368275
4:1547368276
5:1547368277
6:1547368278
7:1547368279
8:1547368280
*/
```

<ins>yield associatif</ins>:

Le `yield` peut également retourner une clé associée à la valeur.

``` php
<?php
function xtimes($n) {
  for($i = 0; $i < $n; $i++) {
    yield "t$i" => time();
  }
}

foreach(xtimes(10) as $k => $num) {
  echo $k . ":" . $num . "\n";
  sleep(1);
}

/*
t0:1547368944
t1:1547368945
t2:1547368946
t3:1547368947
t4:1547368948
t5:1547368949
t6:1547368950
t7:1547368951
t8:1547368952
t9:1547368953
*/
```

<ins>yield null</ins>:

De la même manière que les fonctions normales, un générateur peut retourner des valeurs nulles en omettant la valeur.

``` php
<?php
yield;
```

<ins>yield délégué</ins>:

Il est possible de déléguer le `yield` d'une autre fonction.

``` php
<?php
function from() {
    yield 1; // clé 0
    yield 2; // clé 1
    yield 3; // clé 2
}
function gen() {
    yield 0; // clé 0
    yield from from(); // clés 0-2
    yield 4; // clé 1
}
foreach(gen() as $num) {
    echo $num;
}
# 01234
```

<ins>Récupérer les résultats dans un tableau</ins>:

On peut utiliser la fonction `iterator_to_array` pour récupérer la liste des résultats dans un tableau.

``` php
<?php
<?php
function xtimes($n) {
  for($i = 0; $i < $n; $i++) {
    yield "t$i" => time();
  }
}

print_r(iterator_to_array(xtimes(10)));
/* Array (
    [t0] => 1547369444
    [t1] => 1547369444
    [t2] => 1547369444
    [t3] => 1547369444
    [t4] => 1547369444
    [t5] => 1547369444
    [t6] => 1547369444
    [t7] => 1547369444
    [t8] => 1547369444
    [t9] => 1547369444
)*/
```
