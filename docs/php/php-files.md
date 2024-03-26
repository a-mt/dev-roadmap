---
title: Créer / lister des fichiers
category: Web, PHP
---

## Scripts PHP

### getcwd
Retourne le répertoire courant de PHP.  
(get current working dir)

``` php
<?php
echo getcwd();
```

### chdir

Change le répertoire courant de PHP.  
(change dir)

``` php
<?php
chdir(__DIR__);
```

### getlastmod

Retourne la date de modification du script en cours (timestamp)  
Permet notamment setter les headersHTTP  "Last-Modified" d'un script

``` php
<?php
// Caching prevention
header("Last-Modified: $last_modified GMT"); 
header("Cache-Control: no-store, no-cache, must-revalidate"); // HTTP/1.1
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache"); // HTTP/1.0 
```

### realpath_cache_get

Retourne la liste des informations de fichier dans le cache système.  
Ce cache aide à connaître l'emplacement des différents fichiers dont l'emplacement a déjà été recherché, et d'éviter des accès disque supplémentaires.
Il est notamment utilisé par `realpath`, `fopen`, `file_get_contents`, `is_file`, `is_dir`, `require`, `require_once`, `include` et `include_once`.

``` php
<?php
print_r(realpath_cache_get());
/* Array (
  [/var/www/index.php] => Array (
      [key] => 17521676
      [is_dir] => false
      [realpath] => /var/www/index.php
      [expires] => 1460556333
  ) */
```

### clearstatcache

Vide le cache systèmes des informations fichier.

``` php
<?php
clearstatcache();
```

---

## Vérifier un fichier

### file_exists

Vérifie si le chemin spécifié existe sur le serveur.

``` php
<?php
echo file_exists("/path/du/fichier") ? 'Y' : 'N';
```

### is_file

Vérifie si le chemin spécifié existe et est un fichier (et non un dossier).

``` php
<?php
echo is_file("/path/du/fichier") ? 'Y' : 'N';
```

### is_dir

Vérifie si le chemin spécifié existe et est un dossier.

``` php
<?php
echo is_dir("/path/du/fichier") ? 'Y' : 'N';
```

### is_link

Vérifie si le chemin spécifié existe et est un lien symbolique.

``` php
<?php
echo is_link("/path/du/fichier") ? 'Y' : 'N';
```

### filetype

Retourne le type du fichier à l'emplacement spécifié (dir, file).

``` php
<?php
echo filetype('/path/du/fichier');
```

### mime_content_type

Retourne le type MIME du fichier à l'emplacement spécifié.

``` php
<?php
echo mime_content_type('/path/du/fichier');
```

---

## Récupérer le nom du fichier

### realpath

Retourne le chemin absolu du fichier à l'emplacement spécifié ou `false` s'il n'existe pas.

``` php
<?php
$file = __FILE__;
echo $file;           # index.php
echo realpath($file); # C:\wamp\www\index.php
```

### pathinfo

Retourne un tableau contenant les différentes parties du chemin spécifié (dossier, nom du fichier, extension).  
Ne vérifie pas s'il existe ou non.

``` php
<?php
print_r(pathinfo(__FILE__));
/* Array (
  [dirname]   => C:\wamp\www
  [basename]  => index.php
  [extension] => php
  [filename]  => index
) */
```

Peut également retourner un élément précis, en le précisant en option.

| Option | Résultat | Équivalent substr
|---     |---       |---
| `pathinfo($file, PATHINFO_DIRNAME)`   | `C:\wamp\www` | `substr($file, 0, strrpos($file, '/'))`
| `pathinfo($file, PATHINFO_BASENAME)`  | `index.php`   | `substr($file, strrpos($file, '/') + 1)`
| `pathinfo($file, PATHINFO_EXTENSION)` | `php`         | `substr($file, strrpos($file, '.') + 1)`
| `pathinfo($file, PATHINFO_FILENAME)`  | `index`       | `substr($file, 0, strrpos($file, '.'))`

### basename

Retourne le nom de fichier (extension comprise) du chemin spécifié.  
Ne vérifie pas s'il existe ou pas.  
On peut également utiliser `pathinfo` pour le même effet.

``` php
<?php
$name = basename($file); # index.php
```

``` php
<?php
$name = pathinfo($file, PATHINFO_BASENAME);
```

## dirname

Retourne le dossier du chemin spécifié.  
Ne vérifie pas s'il existe ou pas.  
On peut également utiliser `pathinfo` pour le même effet.

``` php
<?php
$dir = dirname($file); # C:\wamp\www
```

``` php
<?php
$dir = pathinfo($file, PATHINFO_DIRNAME);
```

---

## Lire les metadatas

### is_readable

Vérifie si le fichier à l'emplacement spécifié est accessible en lecture.

``` php
<?php
echo is_readable("/path/du/fichier") ? 'Y' : 'N';
```

### is_writable

Vérifie si le fichier à l'emplacement spécifié est accessible en écriture.

``` php
<?php
echo is_writable("/path/du/fichier") ? 'Y' : 'N';
```

### filemtime

Récupère la date de modification du fichier à l'emplacement spécifié (timestamp).

``` php
<?php
$time = filemtime("/path/du/fichier");
```

### fileatime

Récupère la date du dernier accès au fichier à l'emplacement spécifié (timestamp).

``` php
<?php
$time = fileatime("/path/du/fichier");
```

### filesize

Retourne la taille du fichier à l'emplacement spécifié (en octets).

``` php
<?php
$size = filesize("/path/du/fichier");
```

### stat

Retourne les metadatas du fichier à l'emplacement spécifié (tableau associatif).

``` php
<?php
$stats = stat("/path/du/fichier");

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

<ins>Valeurs retournées</ins>:

| #  | Index   | Example    | Description                                     |
|--- |---      |---         |---                                              |
| 0  | dev     | 2053       | Device                                          |
| 1  | ino     | 22944773   | Inode                                           |
| 2  | mode    | 33279      | Permissions                                     |
| 3  | nlink   | 1          | Link count                                      |
| 4  | uid     | 1000       | Owner's user ID                                 |
| 5  | gid     | 33         | Group's group ID                                |
| 6  | rdev    | 0          | Device type for inode devices (-1 on Windows)   |
| 7  | size    | 1360       | Size (bytes)                                    |
| 8  | atime   | 1460539628 | Last access (timestamp)                         |
| 9  | mtime   | 1460539624 | Last change of contents (timestamp)             |
| 10 | ctime   | 1460539624 | Last change of contents or metadata (timestamp) |
| 11 | blksize | 4096       | Block size for I/O (-1 on Windows)              |
| 12 | blocks  | 8          | Number of block allocated to this file          |


---

## Créer / supprimer

### mkdir

Crée un répertoire à l'emplacement spécifié.

``` php
<?php
mkdir("/path");
```

### rmdir

Supprime le répertoire (vide) à l'emplacement spécifié.

``` php
<?php
rmdir("/path");
```

Le répertoire ne peut pas être supprimé avec `rmdir` s'il n'est pas vide. Supprimer tout son contenu au préalable ou le supprimer en ligne de commande si nécessaire.

``` php
<?php
// Version Windows
exec("rmdir /s /q $dir");

// Version Linux
exec("rm -rf $dir");
```

### touch

Crée un fichier vide à l'emplacement spécifié.  
Si le fichier existe déjà, sa date de modification est mise à jour (et le contenu est conservé tel quel).

``` php
<?php
touch("/path/to/file");
```

### unlink

Supprime le fichier à l'emplacement spécifié.

``` php
<?php
unlink("/path/du/fichier");
```

### rename

Renomme/déplace un fichier.

``` php
<?php
rename("oldname", "newname");
```

### copy

Copie un fichier vers un autre emplacement.

``` php
<?php
copy("oldname", "newname");
```

### sys_get_temp_dir

Retourne le chemin du répertoire temporaire.

``` php
<?php
echo sys_get_temp_dir();
```

### tmpfile

Crée un fichier temporaire et retourne une ressource en lecture et écriture pour modifier son contenu.  
Le fichier sera supprimé dès que la ressource sera fermée (avec `fclose`).

``` php
<?php
$h = tmpfile();
```

### tempnam

Crée un fichier avec un nom unique dans le répertoire donné, préfixé d'une chaîne donnée, et retourne le chemin de ce fichier. Utile pour écrire des logs.

``` php
<?php
$path = tempnam("/var/log", "app_") ;
```

---

## Modifier les metadatas

### touch

Modifie la date de modification du fichier au temps spécifié (timestamp).

``` php
<?php
touch("/path/du/fichier", $time);
```

### chown

Modifie le propriétaire du fichier.  
(change owner)

``` php
<?php
chown("/path/du/fichier", "myuser");
```

### chgrp

Modifie le groupe propriété du fichier.  
Accepte le nom ou l'identifiant du groupe.  
(change gruup)

``` php
<?php
chgrp("/path/du/fichier", "mygroup");
```

### chmod

Modifie les permissions du fichier.  
Utiliser la notation octale (précéder d'un 0)
(change mode)

``` php
<?php
chmod("/path/du/fichier", 0777);
```

---

## Lister le contenu d'un répertoire

### glob

Retourne la liste des fichiers/dossiers présents dans le dossier donné.  
Accepte les wildcards shell (!= regex).

``` php
<?php
// Fichiers dans le répertoire courant
$files = glob('*');

# array( index.php )
```

``` php
<?php
// Fichier .php dans le répertoire /path
$files = glob("/path/*.php");
```

### scandir

Retourne la liste des fichiers/dossiers dans le dossier donné.  
Y compris les fichiers cachés, comme `.` (répertoire courant) et `..` (répertoire parent).

``` php
<?php
print_r(glob('*'));    # array( index.php )
print_r(scandir('.')); # array( . .. .htaccess index.php )
```

### opendir, readdir, rewinddir, closedir

| Fonction    | Description
|---          |---
| `opendir`   | Ouvre le dossier donné en lecture et retourne une ressource qui peut être utilisée pour récupérer la liste des fichiers/dossier avec une boucle `while`. Y compris les fichiers cachés.
| `readdir`   | Lit une entrée du dossier ouvert avec `opendir` et retourne le nom du fichier.  <br> Si la ressource est omise, la dernière ressource ouverte avec la fonction `opendir` sera utilisée.
| `rewinddir` | Revient au début du dossier ouvert avec `opendir`
| `closedir`  | Ferme la ressource

``` php
<?php
$h = opendir('.');
while($file = readdir($h)) {
    echo $file . ' ';
}
# Affiche ". .. .htaccess "

rewinddir($h);
echo readdir($h); # Affiche "."

closedir($h);
```

### dir, read, rewind, close

`dir` crée un objet `Directory` sur le dossier donné.  
Peut être utilisé pour récupérer la liste des fichiers/dossiers avec une boucle `while`. Y compris les fichiers cachés.  
C'est l'équivalent orienté objet des fonctions `opendir`, `readdir`, etc.

``` php
<?php
$h = dir('.');
while($file = $h->read()) {
    echo $file . ' ';
}
# Affiche ". .. .htaccess "

$h->rewind();
echo $h->read(); # Affiche "."

$h->close();
```

---

## Chercher un fichier dans un répertoire

Pour chercher un fichier dans un répertoire, on peut utiliser `glob`, sinon utiliser les outils de la ligne de commande tels que `grep`, `ls`, `find`, etc (sous Linux uniquement).

* Retourne le fichier le plus ancien dans "/path"

  ``` php
  <?php
  $file = exec('ls "/path" -tr1 ∣ head -1');
  ```

* Retourne le fichier le plus récent dans "/path"

  ``` php
  <?php
  $file = exec('ls "/path" -t1 ∣ head -1');
  ```

* Récupère la liste des fichiers dans le répertoire courant qui n'ont pas été modifiés depuis $date (timestamp)

  ``` php
  <?php
  exec('find . -type f -not -newermt "' . date('Y-m-d H:i:s', $date) . '"', $aFile);
  ```

* Récupère l'ensemble des lignes des fichiers à l'intérieur du répertoire "logs" qui contiennent ERROR

  ``` php
  <?php 
  $cmd = "grep -rn 'ERROR' logs";
  $res = explode("\n", substr(shell_exec($cmd), 0, -1));

  foreach($res as $str) {
      preg_match('/^([^:]+):(\d+):\s*(.*+)/', $str, $match);
      list($str, $filepath, $lineno, $line) = $match;

      echo $filepath . '(' . $lineno . '):' . $line . "\n";
  }
  ```

* Récupère l'ensemble des lignes des fichiers à l'intérieur du répertoire "logs" qui se situent entre START et END (multiligne)

  ``` php
  <?php
  $cmd = 'find logs -type f'
        .' | xargs awk \'/START/,/END/ {printf "%-4s \x1A", FILENAME ":" NR ": "; print}\'';

  $res = explode('END', substr(shell_exec($cmd), 0, -1));
  array_pop($res);

  foreach($res as $block) {
      $block    = trim($block);
      $filepath = false;
      $lines    = [];

      foreach(explode("\n", $block) as $str) {
          list($info, $line) = explode("\x1A", $str);

          if(!$filepath) {
              preg_match('/^([^:]+):(\d+):/', $info, $match);
              list($str, $filepath, $lineno) = $match;
          }
          $lines[] = trim($line);
      }
      $lines = implode("\n", $lines);
      $lines = substr($lines, strpos($lines, 'START') + 5); // Remove "START"

      echo $filepath . '(' . $lineno . '):' . $lines . "\n\n";
  }
  ```