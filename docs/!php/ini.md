---
title: INI
category: Web, PHP
---

[Liste des directives INI](http://php.net/manual/fr/ini.core.php)

### ini_get_all

Retourne la liste des variables de configuration définies et leur valeur.

``` php
<?php
ini_set('include_path', __DIR__);
print_r(ini_get_all()['include_path']);

# Array( [global_value]=>.;C:\php\pear [local_value]=>C:\wamp\www [access]=>7 )
```

Retourne la liste des clés, associées à
- `global_value` : la valeur définie dans php.ini
- `local_value`  : la valeur locale - modifiée par le script en cours via `ini_set`
- `access`       : niveau d'accès (endroit où peut être modifiée la valeur)

<ins>Niveau d'accès</ins>:

| Constante      | Valeur | Niveau d'accès
|---             |---     |---
| PHP_INI_USER   |   1    | ini_set()
| PHP_INI_PERDIR |   2    | php.ini + .htaccess + httpd.conf
| PHP_INI_SYSTEM |   4    | php.ini + httpd.conf
| PHP_INI_ALL    |   7    | php.ini + .htaccess + httpd.conf + ini_set()

`ini_get_all` accepte deux arguments:
* `extension`: retourner les options spécifiques à une extension donnée
* `details`: si `false` retourne la valeur courante de chaque variable plutôt qu'un tableau contenant toutes les valeurs définies.

``` php
<?php
ini_get_all(null, false);
```

``` php
<?php
ini_get_all('session', false);
```

### ini_get

Retourne la valeur courante d'une variable de configuration donnée.

``` php
<?php
echo ini_get('include_path');
```

### ini_set

Modifie la valeur d'une variable de configuration.  
Uniquement possible pour les variables de configuration où le niveau d'accès est PHP_INI_ALL (7) ou PHP_INI_USER (1).

``` php
<?php
ini_set('include_path', ini_get('include_path') . PATH_SEPARATOR . __DIR__);
```

Pour les valeurs booléennes, `ini_set` doit passer un booléen PHP (`0`, `1`, `true`, `false`) et non ini (`On`, `Off`).

### ini_restore

Restaure la valeur globale d'une variable de configuration donnée.

``` php
<?php
ini_set('include_path', __DIR__);

// Use a library as if on root folder
require_once 'Zend/Soap/AutoDiscover.php';
$autodiscover = new \Zend_Soap_AutoDiscover();
$autodiscover->setClass('ws_example');
$autodiscover->handle();

ini_restore('include_path');
```

### php_ini_loaded_file

Retourne le path du fichier php.ini chargé

``` php
<?php
echo php_ini_loaded_file();
# C:\wamp\bin\apache\apache2.4.4\bin\php.ini
```

### parse_​ini_​file

Retourne les variables du fichier INI donné.  
PHP utilise le format INI pour définir des variables, au même titre qu'on peut utiliser YML ou JSON nativement dans d'autres langages. Ainsi, on peut utiliser des fichiers `.ini` à l'intérieur de son application pour définir des variables de tout type (et non des variables de configuration).

``` php
<?php
if (!isset($_ENV['DEBUG'])) {
    $_ENV = parse_ini_file(__DIR__ . '/.env.ini', false, INI_SCANNER_TYPED);
}
```

<ins>Format INI</ins>:

| Type         | Example
|---           |---
| Section      | `[MYSECTION]`
| Commentaire  | `; My comment`
| Variable     | `my_example = On`
