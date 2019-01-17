---
title: Informations serveur
category: Web, PHP
---

## Version du serveur

### phpinfo

Affiche les configurations du serveur.  
Permet de savoir quelles extensions sont chargées et leur configuration, la version PHP, l'emplacement du fichier php.ini, etc.

``` php
<?php
phpinfo();
```

### php_uname

Retourne la description du système d'exploitation.

``` php
<?php
echo php_uname();
# Windows NT ORD14CSASX 6.2 build 9200 (Unknown Windows version Business Edition) AMD64
```

Accepte un paramètre.

| Mode | Description | Exemple
|---   |---          |---
| `s`  | Nom du système d'exploitation | `Windows NT`
| `n`  | Nom de l'hôte                 | `ORD14CSASX`
| `r`  | Nom de la version             | `6.2 build 9200`
| `v`  | Information sur la version    | `(Unknown Windows version Business Edition)`
| `m`  | Type de la machine            | `AMD64`
| `a`  | Valeur par défaut, séquence "s n r v m" | &nbsp;


### PHP_OS

Constante contenant le nom du système d'exploitation.

``` php
<?php
echo php_uname('s'); # Windows NT
echo PHP_OS;         # WINNT
```

### SERVER_SOFTWARE

Clé de la super-globale `$_SERVER` contenant le nom du serveur web

``` php
<?php
echo $_SERVER['SERVER_SOFTWARE']; # Apache/2.4.4 (Win64) PHP/5.4.12
```

### strlen

Permet de compter le nombre de bits du serveur.

``` php
<?php
$bit64 = (strlen(decbin(~0)) == 64); # Serveur 64 bit
```

On peut également tester `PHP_INT_SIZE`::

``` php
<?php
$bit64 = PHP_INT_SIZE==8; # == 4 pour 32 bits
```

### phpversion

Retourne la version PHP.  
On peut également utiliser `PHP_VERSION`

``` php
<?php
echo phpversion();
echo PHP_VERSION;
```

### version_compare

Permet de vérifier si la version PHP du serveur est supérieure, inférieure ou égale à la version spécifiée.  
Retourne
* `-1` : si la version du serveur est inférieure à celle spécifiée
* `0` : si la version du serveur est égale à celle spécifiée
* `1` : si la version du serveur est supérieure à celle spécifiée

``` php
<?php
if(version_compare(PHP_VERSION, '5.3.0') >= 0) {

}
```

Peut également retourner un booléen si un opérateur est précisé.

``` php
<?php
if(version_compare(PHP_VERSION, '5.3.0', '>=')) {

}
```

<ins>Opérateurs possibles</ins>:

    <, lt
    <=, le
    >, gt
    >=, ge
    ==, =, eq
    !=, <>

---

## Extensions

### get_loaded_extensions

Liste les extensions PHP activées

``` php
<?php
print_r(get_loaded_extensions() );
```

On peut également obtenir la liste en CLI avec `php -m`.

### extension_loaded

Vérifie si l'extension donnée est activée.

``` php
<?php
echo extension_loaded('xml') ? 'Y' : 'N';
```

### get_extension_funcs

Retourne la liste des fonctions définies par une extension.

``` php
<?php
print_r(get_extension_funcs('xml'));
```

### is_function

Vérifie si une fonction donnée existe.

``` php
<?php
echo is_function("gettext") ? 'Y' : 'N';
```

### exec

Pour vérifier si une commande shell existe, on peut utiliser `where` (sous Windows & Linux).  
Retourne le chemin de l'exécutable si la commande existe, sinon une chaîne vide (warning dans stderr)

``` php
<?php
if(exec("where msgfmt")) {

}
```

Sous Linux, `exec("which msgfmt")` peut également être utilisé.

---

## Spécifique à Apache

### apache_get_modules

Liste les extensions Apache activées.

``` php
<?php
printr(apache_get_modules());
```

On peut également obtenir la liste en CLI
* Linux: `apache2ctl -M`
* Windows: `wamp/bin/apache/Apache2.4.4/bin/httpd.exe -M`

### apache_get_version

Retourne la version Apache utilisée

``` php
<?php
echo apache_get_version(); # Apache/2.4.4 (Win64) PHP/5.4.12
```

---

## Mémoire

### memory_get_usage

Retourne la mémoire allouée à PHP (en octets)

``` php
<?php
$mem = memory_get_usage(true);
echo $mem; # 297448
echo octetToHuman($mem); # 290,48 Ko

function octetToHuman($size)
{
  // Adapted from: http://www.php.net/manual/en/function.filesize.php
  $mod   = 1024;
  $units = explode(' ', 'o Ko Mo Go To Po');
  for ($i = 0; $size > $mod; $i++) {
    $size /= $mod;
  }
  return number_format($size, 2, ',', ' ') . ' ' . $units[$i];
}
```

### memory_get_peak_usage
Retourne le pic de mémoire maximum all
ouée à PHP (en octets).

``` php
<?php
$mem = memory_get_peak_usage(true);
```

### disk_free_space

Retourne l'espace libre de la partition en cours (en octets).  
`diskfreespace` est un alias de `disk_free_space`.

``` php
<?php
$mem = disk_free_space("/");
```

### disk_total_space

Retourne la taille totale de la partition en cours (en octets).

``` php
<?php
echo octetToHuman(disk_free_space("/"))
      . ' libres sur '
      . octetToHuman(disk_total_space("/"));
```

---

## DNS Lookup

### gethostbyname

Retourne l'adresse IP de l'hôte donné. Les hosts locaux sont pris en compte.  
Retourne le nom d'hôte si non trouvé.

``` php
<?php
$ip = gethostbyname('myproject.com');
```

### gethostbynamel

Retourne la liste des adresses IP associés à un hôte donné.

``` php
<?php
$aIp = gethostbynamel('www.yahoo.com');
```

### gethostbyaddr

Retourne le nom d'hôte associé à l'adresse IP donnée. Les IP locales sont prises en compte.  
Retourne l'IP donnée si non trouvé.

``` php
<?php
$host = gethostbyaddr('127.0.0.1');
```

### getmxrr

Permet de récupérer la liste des MX Records (serveur de messagerie) associés à l'hôte donné.

``` php
<?php
// Liste des hosts
$hosts = array();
getmxrr('yahoo.com', $hosts);

print_r($hosts);
# Array( [0] => mta6.am0.yahoodns.net [1] => mta7.am0.yahoodns.net [2] => mta5.am0.yahoodns.net ) 
```

``` php
<?php
// Hosts + weight
$hosts = $weight = array();
getmxrr('yahoo.com', $hosts, $weight);

for ($i = 0; $i < count($hosts); $i++) {
  echo "$weight[$i] $hosts[$i]\n";
}
/*
  5 mx4.mail.yahoo.com
  1 mx2.mail.yahoo.com
  1 mx1.mail.yahoo.com
*/
```

### dns_check_record

Vérifie si des MX Records sont associés à l'hôte donné.  
`checkdnsrr` est un alias de `dns_check_record`.

``` php
<?php
echo dns_check_record('yahoo.com') ? 'Y' : 'N';
```

### dns_get_record

Retourne la liste des données DNS associées à un hôte donné.  
Permet par exemple de récupérer la liste des sous-domaines d'un domaine donné.

``` php
<?php
print_r(dns_get_record('yahoo.com'));
/*
  [0] => Array (
    [host] => yahoo.com
    [class] => IN
    [ttl] => 1072
    [type] => NS
    [target] => ns5.yahoo.com
  )
  [1] => Array (
    [host] => yahoo.com
    [class] => IN
    [ttl] => 1072
    [type] => NS
    [target] => ns3.yahoo.com
  )
*/
```

Il est possible de spécifier le type des données à rechercher.

``` php
<?php
print_r(dns_get_record('yahoo.com',  DNS_MX));
```

<ins>Valeurs possibles</ins>:

| Constante | Recherche                                      |
|---        |---                                             |
| DNS_A     | Adresse IPv4                                   |
| DNS_MX    | Champs serveur Mail (MX)                       |
| DNS_CNAME | Champs alias (Nom canonique) (A)               |
| DNS_NS    | Champs de serveur autorité (NS)                |
| DNS_PTR   | Champs de pointeur (PTR)                       |
| DNS_HINFO | Champs d'informations d'hôte (HINFO)           |
| DNS_SOA   | Champs de délégation d'autorité (SOA)          |
| DNS_TXT   | Texte                                          |
| DNS_AAAA  | Adresse IPv6                                   |
| DNS_SRV   | Champs SRV                                     |
| DNS_NAPTR | Champs NAPTR                                   |
| DNS_A6    | Prefixe IPv6                                   |
| DNS_ANY   | Tous les champs                                |
| DNS_ALL   | Sollicite le serveur pour chaque type de champ |