---
title: Données HTTP
category: Web, PHP
---

## Variables super-globales

Les super-globales sont des variables créées automatiquement par le serveur web à chaque requête, à partir de la communication avec le client.
Elles sont accessibles en lecture / écriture globalement et quel que soit le contexte - il n'est donc pas nécessaire de mettre un `global $_GET` pour accéder à `$_GET` à l'intérieur d'une fonction par exemple.

<ins>Paramètres</ins>:  
Les super-globales sont des tableaux associatifs, contenant la liste des paramètres définis, associés à leur valeur.

``` php
<?php
print_r($_GET);
# Array ( [myparam]=>val
```

<ins>Clés</ins>:  
PHP utilisant le point comme opérateur de concaténation, un paramètre `animal.height` est automatiquement convertit en `animal_height` (et ce, pour toutes les super-globales: GET, POST, COOKIE, etc). Cela évite de créer des ambiguïtés pour le parser.

<ins>Valeurs</ins>:  
Les valeurs des super-globales sont nécessairement des chaînes de caractères (puisque transmises sous forme texte), donc pour des booléens utiliser `1` et `0`.

### $_GET

Tableau contenant tous les paramètres transmis via la méthode GET.

``` php
<?php
// url = http://127.0.0.1/?a=1&b[]=2&b[]=3&c.d=4

print_r($_GET);
# Array ( [a]=>1 [b]=>Array( [0]=>2 [1]=>3 ) [c_d]=>4 )
```

### $_POST

Tableau contenant tous les paramètres transmis via la méthode POST.

``` php
<form method="POST">
  <input name="a" value="1">
  <input name="b[]" value="2">
  <input name="b[]" value="3">
  <input name="c.d" value="4">
  <input type="submit">
</form>
<?php
print_r($_POST);
# Array ( [a]=>1 [b]=>Array( [0]=>2 [1]=>3 ) [c_d]=>4 )
```

### $_COOKIE

Tableau contenant tous les cookies du client.  
Les cookies sont envoyés dans les entêtes HTTP, ceux définis au cours du script avec `setcookie` ne seront pas présents dans la variable $_COOKIE avant la prochaine requête.

``` php
<?php
setcookie("mycookie", true);
setcookie("a.b", 2);

echo print_r($_COOKIE);
# Array()

// Après rafraichissement
# Array( [mycookie]=>1 [a_b]=>2 )
```

Les cookies sont stockés dans le navigateur du client, et peuvent facilement être modifiés manuellement par l'utilisateur. Leurs valeurs des cookies ne contiennent donc pas forcement les informations que le serveur a envoyés. Ne pas utiliser des informations critiques, comme un id client pour relogger le client via cookie, sans utiliser de HMAC.

``` php
<?php
define('COOKIE_KEY', 'thisismysecretkey');

// Setter cookie
if(!isset($_COOKIE['cookieId'])) {

  $idClient = 3;
  setcookie('cookieId', $idClient);
  setcookie('cookiePass', md5(COOKIE_KEY . $idClient));

// Vérifier cookie
} else if(md5(COOKIE_KEY . $_COOKIE['cookieId']) == $_COOKIE['cookiePass']) {
  echo 'OK';

// Cookie modifié
} else {
  echo 'NOK';
}
```

l est possible de créer des cookies contenant des tableaux, de la même manière qu'un formulaire HTTP. Attention à bien tester les données au cas où l'utilisateur modifie ses cookies.

``` php
<?php
setcookie('exemple[0]', 1);
setcookie('exemple[1]', 2);

// Après rafraichissement
print_r($_COOKIE); # Array( [exemple]=>Array( [0] => 1 [1] => 2 ) ) 
```

### $_SESSION

Tableau contenant les variables de session.  
Les données de sessions sont stockées côté serveur. Seul est transmis au client son identifiant de session, stocké dans ses cookies en tant que cookie de session, afin d'indiquer au serveur où chercher.  
Il est nécessaire d'indiquer au serveur de créer/vérifier/envoyer les cookies de session en appelant `session_start`, autrement la session est perdue au rafraîchissement de la page.

``` php
<?php
session_start();

if(!isset($_SESSION['example'])) {
  echo 'Set : ';
  $_SESSION['example'] = true;
}
print_r($_SESSION);
```

Les clés du tableau `$_SESSION` doivent respecter le même format que les noms de variable (ne peut contenir que des lettres non accentuées, chiffres et underscore et commence obligatoirement par une lettre ou un underscore): une clé numérique ne sera donc pas enregistrée en session.

### $_FILES

Tableau contenant les fichiers envoyés par le client.  
Les fichiers sont envoyés via la méthode POST. Pour que PHP gère le flux d'envoi, il est nécessaire d'utiliser le type d'encodage HTTP `multipart/form-data` (et non `application/x-www-form-urlencoded`, qui est l'encodage par défaut). Sinon, le tableau `$_FILES` sera vide (et il faudra manuellement parser `php://input`).

``` php
<form method="POST" enctype="multipart/form-data">
  <input type="file" name="myFile">
  <input name="a" value="1">
  <input type="submit">
</form>
<?php

print_r($_FILES);
/* Array(
  [myFile]=>Array(
    [name]=>tux.png
    [type]=>image/png
    [tmp_name]=>C:\wamp\tmp\phpE988.tmp
    [error]=>0
    [size]=>20962
  )) */

print_r($_POST);
# Array( [a]=>1 )
```

<ins>[Codes erreur](http://www.php.net/manual/en/features.file-upload.errors.php)</ins>:

| #  | Constante             | Description                                                        
|--- |---                    |---
| 0  | UPLOAD_ERR_OK         | Pas d'erreur : le fichier a été téléchargé avec succès
| 1  | UPLOAD_ERR_INI_SIZE   | La taille du fichier est supérieure à upload_max_filesize (php.ini)
| 2  | UPLOAD_ERR_FORM_SIZE  | La taille du fichier est supérieure à MAX_FILE_SIZE (HTML form)
| 3  | UPLOAD_ERR_PARTIAL    | Le fichier a été partiellement téléchargé
| 4  | UPLOAD_ERR_NO_FILE    | Pas de fichier téléchargé
| 6  | UPLOAD_ERR_NO_TMP_DIR | Dossier temporaire manquant
| 7  | UPLOAD_ERR_CANT_WRITE | Impossible d'écrire sur le disque dur
| 8  | UPLOAD_ERR_EXTENSION  | Une extension PHP a stoppé le téléchargement                       

Le téléchargement de fichiers peut être configuré dans le fichier php.ini:

* `file_uploads=On`  
  Autoriser le chargement des fichiers par HTTP

* `upload_tmp_dir=/tmp`  
  Dossier temporaire où sont téléchargés les fichiers

* `upload_max_filesize=2MB`  
  Taille maximale d'un fichier téléchargé.  
  Empêche quelqu'un d'essayer de crasher le serveur en remplissant le disque dur avec de gros fichiers

* `post_max_size=8MB`  
  Taille maximale des données POST soumises en une seule requête

### $_REQUEST

Contient tous les paramètres HTTP passés.  
Les propriétés des paramètres dépendent de l'ordre définit dans php.ini `variables_order`.  
Par défaut: `GPCS`, c'est à dire Get Post Cookie Session (Session écrase Cookie, écrase Post, écrase Get).

``` php
<?php
// http://127.0.0.1/index.php?test=1
<form method="POST">
  <input name="test" value="2">
</form>
<?php
print_r($_REQUEST); # Array( [test]=>2 )

echo ini_get('variables_order'); # GPCS
```

### $_SERVER

Tableau contenant les informations transmises par le serveur web.
On y trouve notamment l'url de la requête en cours, le nom du fichier de la requête, le nom du serveur...

| Clé             | Exemple                    | Description
|---              |---                         |---
| REQUEST_URI     | /test/?var=1               | Web : URI
| QUERY_STRING    | var=1                      | Web : paramètres
| PHP_SELF        | /test/index.php            | Web : fichier
| SCRIPT_NAME     | /test/index.php            | Serveur : fichier
| SCRIPT_FILENAME | C:/wamp/www/test/index.php | Serveur : chemin fichier
| DOCUMENT_ROOT   | C:/wamp/www                | Serveur : chemin projet
| REQUEST_METHOD  | GET / POST                 | Web : type
| SERVER_PROTOCOL | HTTP/1.1                   | Web : protocole
| REQUEST_SCHEME  | http / https               | Web : schema
| HTTP_HOST       | dev.myproject              | Web : hôte
| HTTP_USER_AGENT | Mozilla/5.0 (Windows NT... | Web : User-Agent client
| SERVER_ADDR     | 127.0.0.5                  | Serveur : IP
| REMOTE_ADDR     | 127.0.0.1                  | Serveur : IP client
| SERVER_NAME     | myproject                  | Serveur : hôte

### $_ENV

Tableau contenant les variables d'environnement.  
Les valeurs tout comme les clés sont entièrement dépendantes du serveur utilisé.  
Ce tableau n'est remplit que si "E" est présent dans `variables_order` (php.ini) - par exemple `EGPCS`.  
Celui-ci est par défaut désactivé depuis PHP 4.1 pour des raisons de performance.

<ins>Exemple de variables d'environnement sous Windows</ins>:

| Clé                    | Valeur                                                    |
|---                     |---                                                        |
| ALLUSERSPROFILE        | C:\ProgramData                                            |
| APPDATA                | C:\Windows\system32\config\systemprofile\AppData\Roaming  |
| CommonProgramFiles     | C:\Program Files\Common Files                             |
| CommonProgramFiles86)' | C:\Program Files (x86)\Common Files                       |
| CommonProgramW6432     | C:\Program Files\Common Files                             |
| COMPUTERNAME           | ORD14CSASX                                                |
| ComSpec                | C:\Windows\system32\cmd.exe                               |
| FP_NO_HOST_CHECK       | NO                                                        |
| JAVA_HOME              | C:\Program Files\Java\jdk1.7.0_71                         |
| LOCALAPPDATA           | C:\Windows\system32\config\systemprofile\AppData\Local    |
| NUMBER_OF_PROCESSORS   | 4                                                         |
| OS                     | Windows_NT                                                |
| Path                   | C:\Program Files (x86)\Git\bin;C:\Program Files (x86)\... |
| PATHEXT                | .COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC     |
| PROCESSOR_ARCHITECTURE | AMD64                                                     |
| PROCESSOR_IDENTIFIER   | Intel64 Family 6 Model 60 Stepping 3, GenuineIntel        |
| PROCESSOR_LEVEL        | 6                                                         |
| PROCESSOR_REVISION     | 3c03                                                      |
| ProgramData            | C:\ProgramData                                            |
| ProgramFiles           | C:\Program Files                                          |
| ProgramFiles86         | C:\Program Files (x86)                                    |
| ProgramW6432           | C:\Program Files                                          |
| PSModulePath           | C:\Windows\system32\WindowsPowerShell\v1.0\Modules\       |
| PUBLIC                 | C:\Users\Public                                           |
| SystemDrive            | C:                                                        |
| SystemRoot             | C:\Windows                                                |
| TEMP                   | C:\Windows\TEMP                                           |
| TMP                    | C:\Windows\TEMP                                           |
| USERDOMAIN             | lan                                                       |
| USERNAME               | ORD14CSASX$                                               |
| USERPROFILE            | C:\Windows\system32\config\systemprofile                  |
| windir                 | C:\Windows                                                |
| AP_PARENT_PID          | 10660                                                     |

<ins>Sous Linux</ins>:

| Clé                    | Valeur                                                    |
|---                     |---                                                        |
| APACHE_RUN_DIR         | /var/run/apache2                                          |
| APACHE_PID_FILE        | /var/run/apache2/apache2.pid                              |
| PATH                   | /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin...      |
| APACHE_LOCK_DIR        | /var/lock/apache2                                         |
| LANG                   | C                                                         |
| APACHE_RUN_USER        | www-data                                                  |
| APACHE_RUN_GROUP       | www-data                                                  |
| APACHE_LOG_DIR         | /var/log/apache2                                          |
| PWD                    | /                                                         |

### $GLOBALS

Contient toutes les variables globales du script

``` php
<?php
$test = 1;
print_r($GLOBALS);

/* Array (
  [_GET] => Array ( )
  [_POST] => Array ( )
  [_COOKIE] => Array ( )
  [_FILES] => Array ( )
  [GLOBALS] => Array *RECURSION*
  [test] => 1
  ) */
```

---

## Lire / écrire les données HTTP

Les variables super-globales sont des tableaux associatifs accessibles en lecture et écriture, on peut donc récupérer et mettre à jour les valeurs de ces tableaux comme des tableaux associatifs classiques. La mise à jour du tableau n'aura pour effet que de modifier le tableau, les paramètres actuels (l'url, les cookies) ne seront pas modifiés, hormis pour les paramètres de session.

``` php
<?php
$_GET['test'] = 1;
```

``` php
<?php
echo $_GET['test'];
```

``` php
<?php
echo isset($_GET['test']) ? 'Y' : 'N';
```

Il existe également des fonctions pour récupérer les valeurs des paramètres HTTP, utile au cas où les variables super-globales ont été modifiées depuis la reception de la requête.

### filter_has_var

Vérifie si un paramètre HTTP existe.

``` php
<?php
$_GET['test'] = 1;

echo isset($_GET['test']) ? 'Y' : 'N';              # Y
echo filter_has_var(INPUT_GET, 'test') ? 'Y' : 'N'; # N
```

### filter_input

Récupère la valeur d'un paramètre HTTP.

``` php
<?php
echo filter_input(INPUT_GET, 'test');
```

Peuvent être récupérés:
* INPUT_GET
* INPUT_POST
* INPUT_COOKIE
* INPUT_SERVER
* INPUT_ENV

### setcookie

Ajoute ou modifie un cookie.  
Les cookies sont envoyés dans les headers HTTP et ceux-ci doivent être envoyés avant le corps de texte de la réponse.

``` php
<?php
setcookie("example", 1);
```

`setcookie` accepte différents paramètres en plus du nom et de la valeur:

* la date d'expiration.

  ``` php
  <?php
  // Cookie de 30 jours
  $days30 = strtotime('30 days');
  setcookie("example", 1, $days30);

  $_COOKIE['example'] = 1;
  ```

  Si la date d'expiration est omise, ou inférieure ou égale à 0, un cookie de session est crée, c'est à dire un cookie qui n'existe que jusqu'à ce que le navigateur soit fermé.

  Si la date d'expiration est supérieure à 0 et inférieure à la date en cours, le cookie est expiré.  
  Il sera supprimé par le navigateur à la prochaine requête.

  ``` php
  <?php
  // Cookie expiré
  setcookie("example", "", 1);

  unset($_COOKIE['example']);
  ```

* le chemin. Définit un cookie uniquement pour les pages situées dans le répertoire donné (et sous-répertoires).

  ``` php
  <?php
  // Crée un cookie de session pour les pages dans /app
  setcookie("example", 1, 0, "/app");
  ```

* le domaine. Définit un cookie pour un domaine donné.  
  Le navigateur n'envoie au serveur que les cookies qui le concerne et n'accepte de lui que les cookies de son propre domaine.

  ``` php
  <?php
  // Définit un cookie pour tous les sous-domaines de example.com
  setcookie("example" 1, 0, "", ".example.com");
  ```

  ``` php
  <?php
  // Définit un cookie pour dev.example.com uniquement
  setcookie("example" 1, 0, "", "dev.example.com");
  ```

* cookie sécurisé. Mettre à vrai pour que le navigateur n'envoie le cookie que sur des connexions sécurisées (https). Côté serveur, c'est au développeur de vérifier si la connexion est sécurisée avant de d'appeler `setcookie` (`$_SERVER["HTTPS"]`).

* cookie HTTP. Mettre à vrai pour que le cookie ne soit accessible que via le protocole HTTP, et non accessible aux langages de script tel que JavaScript.
 
Sont présent dans `$_COOKIE` les cookies envoyés par le client (dans les entêtes HTTP).
Les cookies définis via `setcookie` n'y sont pas avant la prochaine requête.
Modifier manuellement la valeur d e`$_COOKIE` en plus de l'appel à  `setcookie` si la valeur du cookie est testée pendant le script.

Les utilisateurs doivent être informés et donner leur consentement à l'utilisation de cookies.
Une modale doit donc être affichée à l'utilisateur lorsque le site utilise des cookies autres que des cookies de session. Ce consentement est valable 13 mois maximum.

---

## Session

### session_start

Récupère la session existante ou en crée une à la volée.  
Par défaut un fichier de session est supprimé 24h après sa création..

[Liste des configurations de session et valeurs par défaut](http://php.net/manual/fr/session.configuration.php).  
Les configurations doivent être effectuées avant l'appel à `session_start`.

``` php
<?php
session_start();
```

### session_id

Retourne l'id de la session.  
Également accessible via `PHPSESSID`.

``` php
<?php
echo session_id();
```

### session_destroy

Supprime le fichier associé à la session côté serveur.
Toutes les variables de session sont donc perdues.

``` php
<?php
session_destroy();
```

Pour pouvoir utiliser `$_SESSION` après un `session_destroy`, il est nécessaire de ré-ouvrir la session avec `session_start`.
La session générée aura toujours le même id que précédemment si `PHPSESSID` contient toujours le même id (utiliser `session_regenerate_id` pour générer un nouvel id).

``` php
<?php
session_destroy();
session_regenerate_id();
session_start();
```

### session_regenerate_id

Génère un nouvel id de session.
Un nouveau fichier de session est crée. Les valeurs de l'ancienne session sont copiées dans la nouvelle. Le cookie client change de valeur.

``` php
<?php
session_regenerate_id();
```

### session_status

Récupère le statut de la session.  
Permet notamment de vérifier si une session a été démarrée.

``` php
<?php
echo session_status() == PHP_SESSION_ACTIVE ? 'Y' : 'N';
```

| # | Constante            | Description                     |
|---|---                   |---                              |
| 0 | PHP_SESSION_DISABLED | Session désactivée côté serveur |
| 1 | PHP_SESSION_NONE     | Session non démarrée            |
| 2 | PHP_SESSION_ACTIVE   | Session démarrée                |

### Configurations

| Variable | Description
|---       |---
| `session.name` | Nom du cookie contenant l'id de session
| `session.save_path` | Chemin du répertoire où son sauvegardées les sessions sur le serveur
| `session.gc_maxlifetime` | Durée d'une session côté serveur (en minutes). <br><br>Sous Linux, un cron tourne tourne toutes les demi-heures pour effacer les sessions expirées (`/etc/cron.d/php5`). Pour conserver des sessions au délà de la configuration du fichier php.ini, il est nécessaire de les enregistrer dans un répertoire différent - non lu par le cron - puis de gérer soi-même le "[nettoyage](http://php.net/manual/en/function.session-set-save-handler.php#example-5327)".
| `session.cookie_lifetime` | Durée par défaut des cookies côté client (en secondes, 3600 = 1h).<br> 0 pour que le cookie soit conservé jusqu'à ce que le navigateur soit fermé.
| `session.cookie_path` | Chemin par défaut des cookies côté client
| `session.cookie_domain` | Domaine par défaut des cookies côté client

### session_name

Retourne le nom du cookie contenant l'id de session.  
On peut également le récupérer avec `ini_get("session.name")`.

### session_save_path

Retourne le chemin du répertoire des sessions sur le serveur.  
On peut également le récupérer avec `ini_get("session.save_path")`.

### session_get_cookie_param

Retourne l'ensemble des configurations des cookies de sessions, sous forme de tableau associatif.

| Clé      | Exemple | Champs                    |
|---       |---      |---                        |
| lifetime | `0`     | `session.cookie_lifetime` |
| path     | `"/"`   | `session.cookie_path`     |
| domain   | `""`    | `session.cookie_domain`   |
| secure   | `false` | `session.cookie_secure`   |
| httponly | `false` | `session.cookie_httponly` |

---

## Fichiers

### move_uploaded_file

Déplace un fichier uploadé par l'utilisateur vers un répertoire du serveur.  
La destination doit exister.

``` php
<?php
move_uploaded_file($_FILES['myfile']['tmp_name'], '/mypath');
```

---

## Environnement

### getenv

Retourne la valeur d'une variable d'environnement ou `false` si elle n'existe pas.  
Insensible à la casse (Windows & Linux).

``` php
<?php
echo getenv('PATH');
```

### putenv

Met à jour la valeur d'une variable d'environnement.

``` php
<?php
putenv('ORACLE_SID=ORACLE');
```

---

## Entêtes HTTP

### headers_list

Retourne la liste des entêtes HTTP qui ont ou vont être envoyées dans la réponse.

``` php
<?php
print_r(headers_list());
```

[Description des entêtes HTTP 1.1](http://www.faqs.org/rfcs/rfc2616.html)


### headers_sent

Vérifie si les headers ont déjà été envoyés.

``` php
<?php
echo headers_sent() ? 'Y' : 'N';
```

### http_response_code

Vérifie ou met à jour le code HTTP qui a été ou va être envoyé dans la réponse.

``` php
<?php
echo http_response_code();
```

``` php
<?php
http_response_code(404);
```

[Liste des codes HTTP](https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP)

- 1xx : Information
- 2xx : Succès
- 3xx : Redirection
- 4xx : Erreur Client
- 5xx : Erreur Serveur

### header

Définit une entête HTTP.

La clé d'une entête HTTP doit être directement suivi de deux-points `:`, sans espace.  
Elle est insensible à la casse.  
Si cette clé d'entête HTTP a déjà été définie, la nouvelle valeur remplace l'ancienne.

#### HTTP

Définit le code HTTP de la réponse et la version HTTP utilisée

``` php
<?php
header('HTTP/1.0 404 Not Found');
```

#### Location

Redirige le client vers une autre page.

``` php
<?php
header("Location: example.php");
die;
```

Les entêtes sont envoyées au client avec le corps de la réponse. Par défaut, à la fin du script.  
Ainsi pour rediriger le client vers une autre page, sans exécuter la suite du script, faire suivre le `header` d'un `die`.

Il est possible de spécifier un code HTTP:

``` php
<?php
// Moved Permanently
header('Location: example.php', true, 301);
die;
```

#### Content-Language

Définit la langue de la page.  
Le langage doit suivre la norme [ISO 639-1](https://fr.wikipedia.org/wiki/Liste_des_codes_ISO_639-1) (en deux lettres).  
Il peut éventuellement être suivi d'un sous-tag indicatif du pays, norme [ISO_3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) (en deux lettres).

``` php
<?php
header('Content-Language: en');
```
``` php
<?php
header('Content-Language: en-US');
```

#### Content-Type

Définit le type MIME du contenu.  
On peut également préciser l'encodage.

``` php
<?php
header('Content-type: text/plain');
```

``` php
<?php
header('Content-type: text/csv; charset=utf-8');
```

[Liste des types MIME](http://www.iana.org/assignments/media-types/media-types.xhtml)  
<ins>Les plus courants</ins>:

| Extension | Type MIME                |
|---        |---                       |
| HTML      | text/html                |
| TXT       | text/plain               |
| CSV       | text/csv                 |
| XML       | text/xml                 |
| PDF       | application/pdf          |
| JSON      | application/json         |
| XLS       | application/vnd.ms-excel |
| ZIP       | application/octet-stream |
| PNG       | image/png                |

#### Last-Modified

Définit la dernière date de modification du fichier, au format GMT.  
Peut être utilisé pour mettre en cache la page.

``` php
<?php
$time = gmdate('D, d M Y H:i:s T', filemtime($file));
header('Last-Modified: ' . $time);
```

#### Content-Length

Définit la taille du contenu.  
Peut être utilisé pour envoyer un fichier au client.

``` php
<?php
$file = 'example.png';

header('Last-Modified: ' . gmdate('D, d M Y H:i:s', filemtime($file)) . ' GMT', true, 200);
header('Content-Length: ' . filesize($file));
header('Content-Type: image/png');
print file_get_contents($file);
```

#### Content-Disposition

La valeur `attachment` oblige le navigateur à télécharger le fichier plutôt que de l'afficher.  
Ne fait pas partie de la norme HTTP 1.1 (RFC2616) mais RFC1806

``` php
<?php
// Déclencher le téléchargement d'un fichier CSV généré
set_time_limit(0);
header('Content-Type: text/csv; charset=utf-8');
header("Pragma: public");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header('Content-Disposition: attachment; filename="' . $filename . '.csv"');
echo $csv;
```

``` php
<?php
// Déclencher le téléchargement d'un PDF sur le serveur
header('Content-Type: application/pdf');
header('Content-Disposition: attachment; filename="' . basename($file) . '"');
readfile($file);
```

#### Cache-Control

Définit la mise en cache des pages par le navigateur.

Pour HTTP 1.0, le cache est contrôlé par l'entête `Pragma`.

``` php
<?php
// HTTP 1.0 only: désactiver le cache
header('Pragma: no-cache');
```

`Cache-Control` est définit pour HTTP 1.1:

 ``` php
 <?php
 // Valider le cache en fonction de Expires
 $time = gmdate('D, d M Y H:i:s T', strtotime('+1 month'));

 header('Cache-Control: no-cache');
 header('Expires: ' . $time);
 ```

 ``` php
 <?php
// Valider le cache en fonction de Last-Modified
if(isset($_GET['file'])) {
    $file = $_GET['file'];
    $time = filemtime($file);

    // Not Modified
    if (isset($_SERVER['HTTP_IF_MODIFIED_SINCE'])
      && (strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']) == $time)) {
        header('HTTP/1.1 304 Not Modified');

    // New version
    } else {
        header('Cache-Control: must-revalidate');
        header('Last-Modified: ' . gmdate('D, d M Y H:i:s T', $time));
        header('Content-Length: ' . filesize($file));
        header('Content-Type: image/png');
        print file_get_contents($file);
    }
    exit;
}
echo '<img src="?file=bored_animation.gif">';
```

``` php
<?php
// Valider le cache en fonction de ETag
if(isset($_GET['file'])) {
    $file = $_GET['file'];
    $etag = md5_file($file);

    // Not Modified
    if (isset($_SERVER['HTTP_IF_NONE_MATCH'])
      && (trim($_SERVER['HTTP_IF_NONE_MATCH']) == $etag)) {
        header('HTTP/1.1 304 Not Modified');

    // New version
    } else {
        header('Cache-Control: must-revalidate');
        header('Etag: ' . $etag); 
        header('Content-Length: ' . filesize($file));
        header('Content-Type: image/png');
        print file_get_contents($file);
    }
    exit;
}
echo '<img src="?file=bored_animation.gif">';
```

[Liste des directives Cache-Control HTTP 1.1](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9)
