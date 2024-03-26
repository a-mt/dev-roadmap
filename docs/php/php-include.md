---
title: Imports, exceptions & erreurs
category: Web, PHP
---

## Inclure des fichiers

Il existe différentes manières d'inclure et exécuter des fichiers PHP.

### include

Essaie d'inclure le fichier spécifié ou lève un warning s'il n'existe pas.

``` php
<?php
include 'inc.template.php';
```

On inclut généralement via `include` un fichier qui affiche quelque chose mais qui n'est pas nécessaire au déroulement du script.

Lorsqu'un chemin relatif est spécifié, le chemin sera calculé relativement au répertoire de travail courant. Dans de nombreux cas, c'est le dossier où est enregistré le script, à moins qu'il n'ait été modifié via `chdir`. En utilisant la version CLI, le chemin sera calculé par défaut par rapport au dossier d'appel du script (`__DIR__` != `getcwd()`).

### include_once

Essaie d'inclure le fichier spécifié s'il n'a pas déjà été inclut ou lève un warning s'il n'existe paq.

``` php
<?php
include_once 'fct.common.php';
```

On inclut généralement via `include_once` un fichier qui définit des fonctions ou des variables qui ne sont pas indispensables au déroulement du script (des macros par exemple).

### require

Inclut le fichier spécifié ou lève une erreur fatale s'il n'existe pas.

``` php
<?php
require 'inc.validate.php';
```

On inclut généralement via `require` un fichier qui se charge d'un traitement spécifique (calculer le tarif d'un produit en fonction des promotions en cours par exemple)

### require_once

Inclut le fichier spécifié s'il n'a pas déjà été inclut ou lève une erreur fatale s'il n'existe pas.

``` php
<?php
require_once 'class.cart.php';
```

On inclut généralement via `require_once` un fichier qui définit des fonctions ou des classes utilisées par le script.

### get_included_files

Retourne la liste des fichiers inclus.  
Du plus ancien au plus récent.  
L'index 0 est le fichier en cours  (0 = `$_SERVER['SCRIPT_FILENAME']`)  
`get_required_files` est un alias de `get_included_files`

``` php
<?php
$aFiles = get_included_files();
```

### get_include_path

Retourne les répertoires cherchés pour inclure les fichiers.  
Les fichiers peuvent être inclus par leur chemin absolu ou relatif.
Dans le cas d'une inclusion relative, le fichier sera cherché dans les répertoires spécifiés par `get_include_path`.  
Les répertoires sont séparés par le délimiteur PATH_SEPARATOR (`;` sous Windows, `:` sinon)

``` php
<?php
echo get_include_path();  # .;C:\php\pear
```

On peut également utiliser `ini_get('include_path')` pour le même effet.

### set_include_path

Modifie les répertoires cherchés pour inclure les fichiers.  
Cela permet par exemple d'utiliser une librairie qui fait des inclusions à partir de la racine.

``` php
<?php
set_include_path(__DIR__ . PATH_SEPARATOR . get_include_path());
```

Une autre alternative consiste à modifier le répertoire de travail courant.

``` php
<?php
chdir(__DIR__);
require_once 'Zend/Soap/AutoDiscover.php';
$autodiscover = new \Zend_Soap_AutoDiscover();
```

---

## Stopper l'exécution

### die

Termine le processus courant. Permet de debugger du code, de rediriger l'utilisateur vers une autre page avec `header` ou encore stopper le script en cas d'erreur critique (si la base de données n'est pas accessible par exemple).  
`exit` est un alias de `die`.

`die` peut prendre un argument, soit
* une chaîne de caractères, qui sera affichée à l'écran avant que le processus courant ne soit stoppé

  ``` php
  <?php
  $dbh = mysql_connect('127.0.0.1','dbuser','dbpassword')
         or die('Could not connect to MySQL: ' . mysql_error());
  ```

* un entier, qui sera le code retour du script (pouvant être récupéré et testé en CLI).  
  Attention `die(1)` != `die('1')`

  ``` php
  <?php
  die(1);
  ```

* rien, qui se contentera de stopper le processus et rendre la main au serveur web si on en utilise un.

  ``` php
  <?php
  header('Location: /');
  die;
  ```

### return

Termine l'exécution du fichier en cours sans arrêter l'exécution du processus PHP. `return` peut être utilisé par les fichiers inclus pour arrêter l'exécution du fichier et rendre la main au fichier appelant.

``` php
<?php
// inc.validate.php
if($nok) {
  return;
}
```

---

## Exceptions

### throw

Permet de lancer une exception.  
Une exception est une instance de la classe `Exception` ou d'une classe qui en hérite.  
Cette exception pourra être attrapée avec un `try... catch`

``` php
<?php
throw new Exception("message");
```

Liste des erreurs pouvant être lancées avec `throw`:

    Error
      ArithmeticError
        DivisionByZeroError
      AssertionError
      ParseError
      TypeError
        ArgumentCountError
    Exception
      ClosedGeneratorException
      DOMException
      ErrorException
      IntlException
      LogicException
        BadFunctionCallException
          BadMethodCallException
        DomainException
        InvalidArgumentException
        LengthException
        OutOfRangeException
      PharException
      ReflectionException
      RuntimeException
        OutOfBoundsException
        OverflowException
        PDOException
        RangeException
        UnderflowException
        UnexpectedValueException
      SodiumException 

### try, catch,  finally

* `try` délimite un bloc à l'intérieur duquel toutes les exceptions lancées seront attrapées.
* `catch` permet de gérer les exceptions d'un type donnée.  
  Il est possible de chaîner plusieurs `catch` pour gérer différentes exceptions différemment.
* `finally` sera exécuté après les blocs `try` et `catch`, qu'une exception ait été lancée ou non.

Chaque `try` doit avoir au moins un bloc `catch` ou `finally`.  
Si des `try` sont imbriquées, l'exception sera passée d'un `try` à l'autre jusqu'à trouver un `catch` qui l'attrape.

``` php
<?php
class NotFoundException extends Exception {}

try {
  if(!$id) {
    throw new NotFoundException("L'objet $id n'existe pas");
  }
} catch(NotFoundException $e) {
  // Do something if objet not found
  echo $e->getMessage();

} catch(Exception $e) {
  // Do something if an unknown exception has been thrown
  echo $e->getMessage();
}
```

Depuis PHP 7.1, `catch` peut gérer plusieurs types d'exceptions.

``` php
<?php
try {
    // some code
} catch (FirstException | SecondException $e) {
    // handle first and second exceptions
}

```

### set_exception_handler

Définit une fonction à exécuter lorsqu'une exception n'est capturée par aucun `catch`.

``` php
<?php
function exception_handler($e) {
  echo "Exception (" . get_class($e) . "): "
      . "{$e->getMessage()} in {$e->getFile()} on line {$e->getLine()}";
}
set_exception_handler('exception_handler');

throw new Exception('message');
```

### restore_exception_handler

Supprime le dernier gestionnaire d'erreur définit par `set_exception_handler`

``` php
<?php
restore_exception_handler();
```

---

## Erreurs

Les exceptions font partie du processus normal de l'application, elles sont destinées à être attrapées. Elles permettent d'afficher un message à l'utilisateur si une erreur s'est produite.   
Les erreurs quant à elles, ne devraient pas se produire.  Elles sont généralement loggées dans des fichiers ou affichées à l'écran en mode développement, et devraient être remédiées.

### error_reporting

Définit le type d'erreur à afficher/logger.  
Les erreurs qui ne sont pas d'un type spécifié par `error_reporting` sont ignorées.

``` php
<?php
// Toutes les erreurs
error_reporting(E_ALL);
```

Il est possible de cumuler / supprimer des erreurs en particulier grâce aux opérateurs sur les bits.

``` php
<?php
error_reporting(E_ALL & ~E_NOTICE); # Tous sauf E_NOTICE
error_reporting(E_ALL ^ E_NOTICE);  # Idem
error_reporting(E_ERROR | E_PARSE); # E_ERROR et E_PARSE
```

Liste des constantes d'erreur:

| Value | Constant            | Description                                        | Catchable
|---    |---                  |---                                                 |---
| 1     | E_ERROR             | Fatal error                                             | No
| 2     | E_WARNING           | Warning (Recoverable error)                             | Yes
| 4     | E_PARSE             | Parse error                                             | No
| 8     | E_NOTICE            | Notice (Recoverable error)                              | Yes
| 16    | E_CORE_ERROR        | Like E_ERROR but generated by the PHP core              | No
| 32    | E_CORE_WARNING      | Like E_WARNING but generated by the PHP core            | No
| 64    | E_COMPILE_ERROR     | Like E_ERROR but generated by the Zend Engine           | No
| 128   | E_COMPILE_WARNING   | Like E_WARNING but generated by the Zend Engine         | No
| 256   | E_USER_ERROR        | Like E_ERROR but triggered by calling trigger_error()   | Yes
| 512   | E_USER_WARNING      | Like E_WARNING but triggered by calling trigger_error() | Yes
| 1024  | E_USER_NOTICE       | Like E_NOTICE but triggered by calling trigger_error()  | Yes      
| 2047  | E_ALL               | Everything                                              | n/a
| 2048  | E_STRICT            | >=5.0 Strict Standards                                  | Yes
| 4096  | E_RECOVERABLE_ERROR | >=5.2 Catchable fatal error                             | Yes
| 8192  | E_DEPRECATED        | >=5.3 Obsolete application code                         | Yes
| 16384 | E_USER_DEPRECATED   | >=5.4 Like E_DEPRECATED with trigger_error()            | Yes

Comment les déclencher:

``` php
<?php
# Parse error: syntax error, unexpected '$wampConfFile' (T_VARIABLE), expecting ',' or ';' 
echo "MISSING ;"
```

``` php
<?php
# Fatal error: Call to undefined function myfunction()
myfunction();
```

``` php
<?php
# Catchable fatal error: Argument 1 passed to test() must be of the type array, string given
function test(array $in) {
    print_r($in);
}
test('it');
```

``` php
<?php
# Warning: fopen(nop): failed to open stream: No such file or directory 
fopen('nop', 'r');
```

``` php
<?php
# Notice: Undefined variable: void
echo $void;
```

``` php
<?php
# Deprecated: Function split() is deprecated 
split('-', 'a-b-c');
```

``` php
<?php
# Strict Standards: Non-static method A::exemple() should not be called statically
class A {
  public function exemple() {
    echo 'hello';
  }
}
A::exemple();
```

### ini: display_errors

La variable `display_errors` du fichier .ini définit si les erreurs doivent être affichées à l'écran ou non.

On peut également utiliser la fonction `ini_set` pour modifier les configurations.  
N'aura aucun effet si le script a des erreurs de parsing, car `ini_set` est exécuté après le parsing du script.

``` php
<?php
ini_set('display_errors', '1');
```

### ini: error_log

La variable `error_log` du fichier .ini définit si les erreurs doivent être écrites dans un fichier de log (mode append).
Liste des [variables de configuration des erreurs](http://php.net/manual/en/errorfunc.configuration.php)

``` php
<?php
ini_set("error_log", "example.log");
```

### error_log

Permet d'ajouter un message au fichier de log, sans rien afficher à l'écran, même si `display_errors` est vrai.  
Est ignoré si aucun fichier de log n'est définit.

``` php
<?php
error_log('message');
```

### trigger_error

Déclenche manuellement une erreur.  
Il n'est possible de déclencher que les erreurs utilisateur : `E_USER_DEPRECATED`, `E_USER_NOTICE`, `E_USER_WARNING`, `E_USER_ERROR`.  
`user_error` est un alias de `trigger_error`.

``` php
<?php
trigger_error('message', E_USER_NOTICE);  # Notice: message
trigger_error('message', E_USER_WARNING); # Warning: message
trigger_error('message', E_USER_ERROR);   # Fatal error: message
```

Particulièrement utile lors de l'appel de méthodes magiques.

``` php
<?php
class A {
  protected $var;

  /**
   * Handles $obj->var
   */
  public function __get($name) {
    if(property_exists($this, $name)) {
      return $this->$name;
    }
    trigger_error('Undefined property: ' . __CLASS__ . '::$' . $name, E_USER_NOTICE);
  }

  /**
   * Handles $obj->getVar()
   */
  public function __call($name, $args) {
    $field = lcfirst(preg_replace('/^get/', '', $name));

    if(property_exists($this, $field)) {
      return $this->$field;
    }
    trigger_error('Call to undefined method '.__CLASS__.'::'.$name.'()', E_USER_ERROR);
  }
}
$obj = new A;
echo $obj->var;
echo $obj->var2;
```

### error_get_last

Retourne la dernière erreur PHP survenue.  
Remplace `$php_errormsg` désormais déprécié.

``` php
<?php
echo $void;
print_r(error_get_last());

/* Array(
  [type]=>8
  [message]=>Undefined variable: void
  [file]=>C:\wamp\www\index.php [line]=>2
) */
```

### set_error_handler

Définit une fonction à exécuter lorsqu'une erreur capturable est déclenchée (c'est à dire toutes sauf Parse error et Fatal error).

``` php
<?php
function error_handler($type, $message, $file, $line) {
  echo "Warning ($type): $message in $file on line $line";
}
set_error_handler('error_handler');

echo $void;
```

### restore_error_handler

Supprime le dernier gestionnaire d'erreur définit par `set_error_handler`

``` php
<?php
restore_error_handler();
```

### register_shutdown_function

Définit une fonction à exécuter en fin d'exécution.
La fonction sera appelée en fin de script que le script se soit normalement terminé, terminé par un `die` ou terminé par une erreur. Pour gérer les erreurs fatales, il est donc nécessaire de tester si l'interruption du script est déclenchée par un erreur fatale ou non.

``` php
<?php
function fatal_error_handler() {
  // Le script s'arrête à cause d'une erreur fatale ?
  if(!($err = error_get_last()) || $err['type'] != E_ERROR) {
    return;
  }
  echo "Error ({$err['type']}): {$err['message']} in {$err['file']} on line {$err['line']}";
}
register_shutdown_function('fatal_error_handler');

myfunction();
```

---

## Ticks

### declare, register_tick_function

`declare` sert à ajouter des directives d'exécutions dans un bloc de code.   
Elle permet notamment d'exécuter tous les x ticks la fonction enregistrée avec `register_tick_function`.  
Un tick correspond à une instruction. Par exemple, `if(true) echo 'ok'` vaut deux ticks.

`declare` peut s'appliquer à un bloc de code:

``` php
<?php
register_tick_function(function() {
  global $x, $n;
  echo ' [' . ($x/$n)*100 . '%] ';
});
declare (ticks=10) {
  $n = 20;
  for ($x = 1; $x <= $n; ++$x) {
    echo ':' . $x;
  }
}
# Affiche :1:2:3:4:5 [25%] :6:7:8:9:10 [50%] :11:12:13:14:15 [75%] :16:17:18:19:20 [100%] 
```

Ou au reste du script, si on omet les accolades `{ ... }`:

``` php
<?php
declare(ticks=500000);

function octetToHuman($size) {
  $mod   = 1024;
  $units = explode(' ', 'o Ko Mo Go To Po');
  for ($i = 0; $size > $mod; $i++) {
    $size /= $mod;
  }
  return number_format($size, 2, ',', ' ') . ' ' . $units[$i];
}
function tickHandler() {
  echo 'Memory - ' . octetToHuman(memory_get_usage(true)) . "<br>\n";
}
register_tick_function('tickHandler');

// Le traitement...
```

### unregister_tick_function

Supprime la fonction de tick donnée en argument.  
Il n'est pas possible d'effectuer `unregister_tick_function` à l'intérieur de la fonction de tick elle-même.

``` php
<?php
unregister_tick_function('tickHandler');
```
