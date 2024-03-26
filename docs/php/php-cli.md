---
title: CLI
category: Web, PHP
---

## Éxecuter des commandes CLI

### shell_exec

Exécute une commande en ligne de commande et retourne toutes les lignes de résultat.  
Finit généralement par un retour à la ligne `\n`, effectuer un `trim` avant de tester le résultat.

``` php
<?php
$aFiles = explode("\n", trim(shell_exec("ls")));
```

On peut également utiliser les backticks <code>&#96;...&#96;</code>.  
Le contenu des backticks est parsé, on peut donc y mettre des variables (<code>&#96;ls $path&#96;</code>), en revanche il n'est pas possible de concaténer / appeler des fonctions avec, contrairement à `shell_exec`.

``` php
<?php
$aFiles = explode("\n", trim(`ls`));
```

### exec

Exécute une commande en ligne de commande et retourne la dernière ligne de résultat.

``` php
<?php
$file exec("ls");
```

Peut également récupérer l'ensemble des lignes de résultat ainsi que le code retour du processus (pointeurs).

``` php
<?php
exec("ls", $output, $status);
```

Pour ne lire que la sortie erreur:

* Linux   : `cmd 2>&1 1>/dev/null`
* Windows : `cmd 2>&1 1>NUL`

### passthru

Exécute une commande en ligne de commande et affiche le résultat directement.  
`passthru` permet de récupérer du contenu de type binaire, il n'est pas convertit en chaîne de caractères.

``` php
<?php
passthru("ls");
```

### system

Exécute une commande en ligne de commande, affiche le résultat et récupère la dernière ligne ainsi que le code retour (pointeur).

``` php
<?php
$last_line = system('ls', $status);
```

### popen

Crée un processus en effectuant un fork de la commande fournie.  
Cela permet de déclancher un script asynchrone sous Windows.  
Sous Linux, il suffit de déclencher le processus en fond et de ne pas récupérer le résultat.

``` php
<?php
// Script asynchrone Linux
exec('php example.php >/dev/null 2>&1 &');
```

``` php
<?php
// Script asynchrone Windows
popen('start php example.php', 'r');
```

---

## Éxecuter des commandes PHP

### eval

Exécute une chaîne de caractères en tant que script PHP.  
Peut présenter un risque de sécurité.

``` php
<?php
$str = 'echo "hello"';
eval($str); # Affiche hello
```

---

## Éxecuter PHP en CLI

### getmypid

Retourne le numéro de processus de PHP

``` php
<?php
$pid = getmypid();
```

### php_sapi_name

Retourne le type d'interface utilisée.  
Permet de tester si le script est utilisé dans le terminal ou via un serveur web.

``` php
<?php
if(php_sapi_name() == 'cli') {
    // ...
}
```

<ins>Valeur retournée</ins>:

* Apache  : `apache2handler`
* Console : `cli`

### $argv, $argc

`$argv` contient la liste des arguments passés au script.  
`$argc` contient le nombre d'argument passés au script.

``` shell
$ php index.php test=1
```

``` php
<?php
var_dump($argv); # Array( [0]=>index.php [1]=>test=1 )
var_dump($argc); # 2
```

### getopt

Permet de récupérer une ou des options passées au script.  
Si la lettre est suivit de deux-points `:`, récupère également la valeur de l'option.  

``` shell
$ php index.php -a=EXEMPLE -b
```

``` php
<?php
print_r(getopt('a'));  # Array( a => )
print_r(getopt('a:')); # Array( a => EXEMPLE )
```

``` php
<?php
function usage() {
  global $argv;
  echo 'Usage : ' . $argv[0] . ' -a=VALUE [ -b ] [ -e=GEO_xx ]' . chr(10);
  echo '    -a=[VALUE] : Lorem ipsum' . chr(10);
  echo '    -b : Dolor sit' . chr(10);
  echo '    -e=[GEO_xx|GES_xx] : Amet' . chr(10);
}
$argoptions = getopt('a:be:');

// Vérifier les options
if(!isset($argoptions['a'])) {
  usage();
  die;
}

// Effectuer le traitement demandé
print_r($argoptions);
```

### readline

Affiche un message dans le terminal et attend une réponse de l'utilisateur.  
La librairie `readline` n'est pas disponible sous Windows, il est nécessaire de créer sa propre fonction.

``` php
<?php
if(!function_exists('readline')) {
  function readline($str) {
    echo $str;
    return stream_get_line(STDIN, 1024, PHP_EOL);
  }
}

$line = readline("Nom : ");
echo 'Vous avez écrit "' . $line . '"';
```