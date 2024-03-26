---
title: Lire / écrire des fichiers
category: Web, PHP
---

## Standalone

### readfile

Affiche le contenu du fichier à l'emplacement spécifié.  
Accepte les URLS (http://ip/location/).  
Ne pose pas problème de mémoire pour les gros fichiers, tant que le contenu n'est pas bufferisé (`ob_get_level() == 1`)

``` php
<?php
readfile("/path/du/fichier");
```

### file

Retourne le contenu du fichier à l'emplacement spécifié, ligne par ligne, dans un tableau.

``` php
<?php
$lines = file("/path/du/fichier");
```

### file_get_contents

Retourne le contenu du fichier à l'emplacement spécifié (sous forme de chaîne de caractères).  
Revient à appeler les fonctions `fopen()`, `fgets()` et `fclose()` successivement.  
Peut poser des problèmes de mémoire sur les gros fichiers - préférer `fgets` ligne par ligne si nécessaire.

``` php
<?php
$txt = file_get_contents("/path/du/fichier");
```

### file_put_contents

Écrit le contenu donné dans le fichier à l'emplacement spécifié.  
Revient à appeler les fonctions `fopen()`, `fwrite()` et `fclose()` successivement.  
Remplace le texte existant

``` php
<?php
file_put_contents("/path/du/fichier", "text");
```

---

## En passant par une ressource

### fopen

Ouvre un fichier et retourne une ressource qui pourra être utilisée pour lire / écrire un fichier.

``` php
<?php
// Ouvre en lecture et écriture
// Lève une erreur si le fichier n'existe pas
$h = fopen("/path/du/fichier", "r+");
```

Si existe différents mode d'ouverture.  
On peut ajouter `+` à la fin de tous les modes d'ouverture pour ouvrir en lecture et écriture, tout en conservant le comportement du mode (créer à la volée, écrire à la suite, etc).

| Mode | Lecture | Écriture | Crée à la volée | Description
|---   |---      |---       |---              |---
| `r`  | ✓       | ✗        | ✗               | read
| `c`  | ✓       | ✗        | ✓               | create
| `w`  | ✗       | ✓        | ✓               | write. Vide le contenu du fichier
| `a`  | ✗       | ✓        | ✓               | append. Toutes les écritures sont faites à la fin du fichier (on ne peut pas utiliser `fseek`)
| `x`  | ✗       | ✓        | ✓               | exclam. Une erreur est levée si le fichier existe déjà

`fopen` supporte différents protocoles. Si le protocole n'est pas précisé, utilise `file`.

| Protocole             | Description                  | Exemple
|---                    |---                           |---
| file                  | Fichier local                | monfichier.txt
| http, https           | Fichier distant HTTP (body)  | ftp://username:password@ftp.example.com/pub/Index
| ftp, ftps             | Fichier distant FTP          | http://username:password@www.example.com/robots.txt
| php                   | Flux I/O*                    | php://stdin
| compress.zlib<br> (PHP<4.3 : zlib)   | Archive GZ   | compress.zlib://file.gz
| compress.bzip2<br> (PHP<4.3 : bzip2) | Archive BZ2 | compress.bzip2://file.bz2
| zip                   | Archive ZIP (read only)      | zip://archive.zip#dir/file.txt
| rar                   | Archive RAR (read only)      | rar://archive.rar#dir/file.txt
| data                  | Flux de données              | data://text/plain;base64,SSBsb3ZlIFBIUAo=
| phar                  | Archive PHAR                 | phar://mon.phar/unfichier.phar                    

*Voir section Flux I/O pour plus d'info.

### fclose

Ferme la ressource donnée.  
Une fois fermée, la ressource ne peut plus être utilisée.

``` php
<?php
fclose($h);
```

### fpassthru

Affiche le contenu de la ressource.

``` php
<?php
fpassthru($h);
```

### fread

Lit n octets.

``` php
<?php
$h       = fopen("/path/du/fichier", "r");
$content = fread($h, filesize($filename));
fclose($h);
```

### fgetc

Lit un caractère.  
(file get character)

``` php
<?php
while (false !== ($char = fgetc($fp))) {
    echo $char;
}
```

### fgets

Lit une ligne.  
(file get string)

``` php
<?php
while (false !== ($line = fgets($fp))) {
    echo $line . "\n";
}
```

### fgetss

Lit une ligne et supprime tous les octets nuls, ainsi que balises HTML et PHP trouvés.  
(file get stripped string)

``` php
<?php
while (false !== ($line = fgetss($fp))) {
    echo $line . "\n";
}
```

### fgetcsv

Lit une ligne d'un fichier CSV et la retourne sous forme de tableau selon le délimiteur choisit.  
S'il est omis, utilise la virgule `,`.

``` php
<?php
while(false !== ($data = fgetcsv($h, 0, ";"))) {
    print_r($data);
}
```

### fscanf

Lit une ligne et extrait des valeurs de la chaîne obtenue selon un motif donnée.  
(file scan format)

``` php
<?php
$h = fopen('tmp.txt', 'r');
/*
SN:1000 Ref:982 la suite de la ligne
la ligne suivante
*/
print_r(fscanf($h, "SN:%d Ref:%d")); # Array ( [0] => 1000 [1] => 982 )
print_r(fscanf($h, "%[^\t\n]"));     # Array ( [0] => la ligne suivante )
```

### fputs, fwrite

Écrit une ligne dans le fichier.  
`fputs` est un alias de `fwrite`.  
Il faut que le fichier soit ouvert en écriture (w) pour que ça fonctionne.

``` php
<?php
fwrite($h, "text");
```

### fputcsv

Écrit une ligne dans le fichier CSV.  
Prend en entrée un tableau, utilise la virgule `,` si le délimiteur est omis.

``` php
<?php
fputcsv($h, $fields);
```

### fflush

Force l'écriture sur le disque du contenu ajouté au fichier.

``` php
<?php
fflush($h);
```

### ftruncate

Tronque le contenu du fichier au nombre d'octets spécifié.

``` php
<?php
$file = 'tmp.xml';
$h    = fopen($file, 'r');

ftruncate($h, 1024);
echo fread($h, filesize($file));
```

### ftell

Retourne la position courante du pointeur interne de la ressource.  
Peut être utilisé pour, plus tard, replacer le pointeur interne à cette position avec `fseek`.

``` php
<?php
$pos = ftell($h);
```

### fseek

Avance le pointeur interne de la ressource à la position donnée.  
Accepte différents modes

* `SEEK_CUR` : position à partir de la position courante
* `SEEK_SET` : position à partir du début du fichier
* `SEEK_END` : position à partir de la fin du fichier

``` php
<?php
$chunkstart = ftell($h); // 0xCC

fseek($h, $chunkstart + $next_chunk * $chunksize, SEEK_SET);
$chr = fread($h, 2);
```

Accepte les nombres négatifs pour lire à la fin du fichier.

``` php
<?php
// Lire les 80 derniers octets
fseek($h, 0, SEEK_END);
fseek($h, -80, SEEK_CUR);
echo fread($h, 80);
```

### feof

Vérifie si le pointeur interne de la ressource est à la fin du fichier.  
Utile quand on ne connaît pas la taille du fichier à l'avance, parce qu'on utilise un socker par exemple.  
(file end of file)

``` php
<?php
$h = fsockopen("example.host.com", 80);
while(!feof($h)) {
  $content .= fread($h, 1024);
}
fclose($h);
```

### rewind

Remet le pointeur interne de la ressource au début du fichier.

``` php
<?php
rewind($h);
```

---

## Metadatas d'une ressource

### stream_get_meta_data

Retourne les informations sur la ressource ouverte.  
Permet par exemple de récupérer le nom du fichier ouvert

``` php
<?php
$h = fopen(__FILE__, 'r');
$data = stream_get_meta_data($h);

print_r($data);

/* Array (
  [wrapper_type] => plainfile
  [stream_type] => STDIO
  [mode] => r
  [unread_bytes] => 0
  [seekable] => 1
  [uri] => C:\wamp\www\index.php
  [timed_out] => false
  [blocked] => 1
  [eof] => 0 ) */
```

### fstat

Retourne les metadatas de la ressource ouverte.  
Même chose que `stat` mais prend une ressource en entrée.

``` php
<?php
$stats = f($h);

/* Array
(
    [dev] => 2053
    [ino] => 22944773
    [mode] => 33279
    [nlink] => 1
    [uid] => 1000
    [gid] => 33
    [rdev] => 0
    [size] => 1360
    [atime] => 1460539628
    [mtime] => 1460539624
    [ctime] => 1460539624
    [blksize] => 4096
    [blocks]  => 8
) */
```

### get_resource_type

Retourne le type de la ressource.

``` php
<?php
$c = mysql_connect();
echo get_resource_type($c); # Affiche "mysql link"
```

``` php
<?php
$fp = fopen("foo", "w");
echo get_resource_type($fp); # Affiche "stream"
```

``` php
<?php
$doc = new_xmldoc("1.0");
echo get_resource_type($doc->doc); # Affiche "domxml document"
```

---

## Flux I/O

[Wrpaper.php](http://php.net/manual/en/wrappers.php.php)

### php://input

Permet de récupérer les données POST non parsées.  
Ne marche pas avec `enctype="multipart/form-data"`

``` php
<form method="POST">
  <input type="file" name="myFile">
  <input name="a" value="1">
  <input type="submit">
</form>
<?php
print_r(file_get_contents("php://input")); # myFile=tux.png&a=1
```

### php://output

Permet d'écrire dans le buffer de sortie. Revient à un `echo`. (writeonly)

``` php
<?php
$h = fopen("php://output", "w");
fwrite($h, "test");
fclose($h);
```

### php://temp

Permet d'écrire en mémoire.  
Ecrit dans un fichier temporaire si la mémoire utilisée dépasse celle autorisée dans ini (defaut : 2M).  
Possibilité de définir la mémoire maximale à utiliser.

``` php
<?php
$size = 5*1024*1024; // 5M
$h    = fopen("php://temp/maxmemory:$size", 'r+');
```

### php://stdin

CLI : permet de lire l'entrée standard php (readonly).  
Notamment utile pour les webservices.

``` shell
echo "mon texte en entrée" | php file.php
```

``` php
<?php
$input = file_get_contents('php://stdin');
echo $input; # mon texte en entrée
```

### php://stdout

CLI : permet d'écrire dans la sortie standard php (writeonly)

``` php
<?php
file_put_contents('php://stdout', 'Done');
```

### php://stderr

CLI : permet d'écrire dans la sortie erreur standard php (writeonly)

``` php
<?php
file_put_contents('php://stderr', 'File is missing');
```

### php://fd/...

CLI : permet d'écrire dans le descripteur de fichier donné.  
Lance un warning "failed to open stream" en dehors d'un contexte CLI

``` php
<?php
// Ecrit "example" dans la sortie 2 (c'est à dire stderr)
file_put_contents('php://fd/2', 'example');
```

### php://filter/.../resource=

Permet d'appliquer un filtre sur un fichier (lecture écriture).  
Les filtres peuvent être concaténés avec des pipes.

- Si un filtre est préfixé de `read=`, il s'applique à la lecture
- S'il est préfixé de `write=`, il s'applique à l'écriture
- Sinon, aux deux

``` php
<?php
// Afficher test.html en majuscules
readfile("php://filter/read=string.toupper/resource=test.html");
```

``` php
<?php
readfile('php://filter/zlib.inflate/resource=test.deflated');
```

<ins>Liste des filtres disponibles</ins>:

    string.rot13
    string.toupper
    string.tolower
    string.strip_tags
    convert.base64-encode
    convert.base64-decode
    convert.quoted-printable-encode
    convert.quoted-printable-decode
    zlib.deflate
    zlib.inflate
    bzip2.compress
    bzip2.decompress
    mdecrypt.tripledes (need passphrase params)
    mcrypt.tripledes   (need passphrase params)

Il est possible de créer ses propres filtres (ci-dessous).

---

## Filtres sur la lecture / écriture

### stream_filter_append

Applique un filtre sur une ressource.  
Permet d'appliquer un filtre à la volée sans passer par un traitement intermédiaire (par exemple pour encrypter des données).

Peut être appliqué
- en lecture: `STREAM_FILTER_READ`
- en écriture: `STREAM_FILTER_WRITE`
- ou les deux (par défaut): `STREAM_FILTER_ALL`

``` php
<?php
// Lire en majuscules
stream_filter_append($h, 'string.toupper', STREAM_FILTER_READ);
```

``` php
<?php
// +----------------------------------------------------------------------+
// | Permet de lire / écrire un fichier encrypté avec l'algorithme 3DES
// +----------------------------------------------------------------------+

define('PASSPHRASE', 'My secret phrase');

class Tripledes {
    protected $opts;

    /**
     * @param string $passwd - Clé permettant de sécuriser le fichier
     */
    public function __construct($passwd) {
        $this->opts = array(
            'iv'  => substr(md5('iv' . $passwd, true), 0, 8),
            'key' => substr(md5('pass1' . $passwd, true) . md5('pass2' . $passwd, true), 0, 24)
        );
    }

    /**
     * Lit le fichier $path encrypté en 3DES avec la clé passée au constructeur
     * @param string $path
     */
    public function read($path) {
        $h = fopen($path, 'r');
        stream_filter_append($h, 'mdecrypt.tripledes', STREAM_FILTER_READ, $this->opts);
        fpassthru($h);
        fclose($h);
    }

    /**
     * Ajoute $data au fichier $path en l'encryptant en 3DES avec la clé passée au constructeur
     * @param string $path
     * @param string $data
     */
    public function write($path, $data) {
        $h = fopen($path, 'w');
        stream_filter_append($h, 'mcrypt.tripledes', STREAM_FILTER_WRITE, $this->opts);
        fwrite($h, $data);
        fclose($h);
    }
}
$handler = new Tripledes(PASSPHRASE);
$handler->write('example.txt', 'Encoded data');
$handler->read('example.txt');
```

### stream_filter_register

Instancie un nouveau filtre.  
Le filtre doit être une classe qui hérite de `php_user_filter`.

Le filtre `string.toupper` existe déjà, mais si on voulait en créer un à partir de zéro:

``` php
<?php
// +----------------------------------------------------------------------+
// | Créer un filtre personnalisé
// +----------------------------------------------------------------------+

/**
 * Filtre Strtoupper
 */
class Strtoupper_filter extends php_user_filter
{
    /**
     * Entrypoint
     * @param resource $in
     * @param resource $out
     * @param integer $consumed
     * @param boolean $closing
     * @return integer - PSFS_PASS_ON | PSFS_FEED_ME | PSFS_ERR_FATAL
     */
    function filter($in, $out, &$consumed, $closing) {
        while ($bucket = stream_bucket_make_writeable($in)) {
            $bucket->data = $this->handle($bucket->data);
            $consumed += $bucket->datalen;
            stream_bucket_append($out, $bucket);
        }
        return PSFS_PASS_ON;
    }
    /**
     * @param string $str
     * @return string
     */
    protected function handle($str) {
        return strtoupper($str);
    }
}

// Enregistrer le filtre créé (classe Strtoupper_filter) sous le nom "strtoupper"
stream_filter_register("strtoupper", "Strtoupper_filter");

// Afficher tmp.txt en appliquant strtoupper
readfile("php://filter/read=strtoupper/resource=tmp.txt");
```
