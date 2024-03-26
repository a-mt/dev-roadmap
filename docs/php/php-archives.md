---
title: Fichiers compressés
category: Web, PHP
---

## GZIP

La plupart des fonctions sur les fichiers existent également pour manipuler les fichiers GZIP.

| Fonction | Description
|---       |---
| `readgzfile("file.gz")` | Affiche le contenu du fichier GZIP donné
| `gzfile("file.gz")`     | Retourne le contenu du fichier GZIP lignes par lignes dans un tableau
| `gzopen("file.gz",'r')` | Ouvre en lecture le fichier GZIP donné
| `gzclose($zh)` 					| Ferme la resource
| `gzpassthru($zh)`       | Affiche le contenu
| `gzread($zh, 1024)`     | Retourne x octets
| `gzgetc($zh)`           | Retourne un caractère
| `gzgets($zh)`           | Retourne une ligne
| `gzgetss($zh)`          | Pareil de gzgets mais supprime tous les octets nuls, balises HTML et PHP trouvées
| `gzwrite($zh, "hello")` | Écrit du texte dans le fichier ouvert
| `gzrewind($zh)`         | Revient au début du fichier
| `gzeof($zh)`            | Vérifie si le pointeur est à la fin du fichier
| `gzseek($zh, 2, SEEK_CUR)` | Modifie la position du pointeur interne
| `gztell($zh)` 		         | Retourne la position courante du pointeur interne

---

## ZIP

Les fonctions zip permettent de lire les fichiers zip.  
Pour écrire dans un zip, il faut utiliser la classe `ZipArchive`.

### zip_open

Ouvre un fichier ZIP et retourne une ressource qui pourra être utilisée pour lire le contenu.

``` php
<?php
$zh = zip_open("file.zip");
```

### zip_close

Ferme la ressource

``` php
<?php
zip_close($zh);
```

### zip_read

Retourne le prochain fichier présent dans le zip

``` php
<?php
$h = zip_read($zh);
```

### zip_entry_name

Retourne le nom du fichier (retourné par `zip_read`)

``` php
<?php
$zh = zip_open("tmp.zip");

while($h = zip_read($zh)) {
  echo zip_entry_name($h) . "\n";
}
/*
  fileupload/
  fileupload/fileupload.js
  fileupload/fileupload.less
  fileupload/index.html
  tmp.txt
*/
```

### zip_entry_filesize

Retourne la taille décompressée du fichier (retourné par `zip_read`)

``` php
<?php
$size = zip_entry_filesize($h);
```

### zip_entry_compressedsize

Retourne la taille compressée du fichier (retourné par `zip_read`)

``` php
<?php
$size = zip_entry_compressedsize($h);
```

### zip_entry_read

Retourne le contenu du fichier (retourné par `zip_read`).  
Retourne une chaîne de caractères vide s'il s'agit d'un répertoire.

``` php
<?php
$txt = zip_entry_read($h, zip_entry_filesize($h));
```

---

## ZipArchive

### __construct

Crée un objet ZipArchive

``` php
<?php
$zip = new ZipArchive();
```

### open

Ouvre le zip.

``` php
<?php
$zip->open("file.zip");
```

### close

Ferme le zip.

``` php
<?php
$zip->close();
```

### statIndex

Retourne les infos (nom, index, etc) d'un fichier du zip à l'index spécifié.

``` php
<?php
$data = $zip->statIndex(3);
print_r($data);

/* Array (
    [name] => foobar/baz
    [index] => 3
    [crc] => 499465816
    [size] => 27
    [mtime] => 1123164748
    [comp_size] => 24
    [comp_method] => 8
) */
```

``` php
<?php
// Ouvrir le zip
$zip = new ZipArchive();
$zip->open('file.zip');

$aFile = array();
$seek  = 0;

// Récupérer tous les fichiers et les mettre dans "/tmp"
while($data = $zip->statIndex($seek++)) {
    $aFile[] = $data['name'];
}
$zip->extractTo('/tmp', $aFile);
```

### getNameIndex

Retourne le nom du fichier à l'index spécifié.

``` php
<?php
$file = $zip->getNameIndex(3);
```

### numFiles

Propriété: nombre de fichiers à l'intérieur du fichier zip

``` php
<?php
for($i = 0; $i < $zip->numFiles; $i++) {
  echo $zip->getNameIndex($i);
}
```

### extractTo

Extrait les fichiers spécifiés dans le répertoire donné.  
Extrait toute l'archive si la liste des fichiers à extraire est omise.

``` php
<?php
$zip->extractTo("/tmp", array("file"));
```

### addEmptyDir

Ajoute un répertoire vide à l'intérieur du fichier zip

``` php
<?php
$zip->addEmptyDir('exemple');
```

### addFile

Ajoute un fichier à l'intérieur du fichier zip.  
Par défaut, ajoute le fichier dans le zip sous le même nom et le même répertoire que le chemin donné.

``` php
<?php
// Ajoute le fichier "file" au zip
$zip->addFile('file');
```

``` php
<?php
// Ajoute le fichier "/tmp/file" à la racine du zip
$zip->addFile('/tmp/file', 'myfile');
```

``` php
<?php
// Ajoute le fichier "subdir/file"
$file = 'subdir/file';
$path = substr($file, 0, strrpos($file, '/'));

$zip->addEmptyDir($path);
$zip->addFile(UPLOAD_DIR . $file, $file);
```

### locateName

Retourne l'index du fichier avec le nom donné s'il existe dans le zip ou `false`.

``` php
<?php
$idx = $obj->locateName('file');
```

---

## PharData

### __construct

Crée un objet PharData et ouvre l'archive zip ou tar / tar.gz.

``` php
<?php
$tar = new PharData("file.tar");
```

### extractTo

Extrait les fichiers spécifiés dans le répertoire donné.  
Extrait toute l'archive si la liste des fichiers à extraire est omise.

``` php
<?php
$tar->extractTo("/tmp", array("file"));
```

### addEmptyDir

Ajoute un répertoire vide à l'intérieur de l'archive

``` php
<?php
$tar->addEmptyDir('exemple');
```

### addFile

Ajoute un fichier à l'intérieur de l'archive.  
Par défaut, ajoute le fichier dans l'archive sous le même nom et le même répertoire que le chemin donné.

``` php
<?php
// Ajoute le fichier "file" à l'archive
$tar->addFile('file');
```

``` php
<?php
// Ajoute le fichier "/tmp/file" à la racine de l'archive
$tar->addFile('/tmp/file', 'myfile');
```

### Lister le contenu de l'archive

L'objet `PharData` est itérable, on peut donc lister le contenu de l'archive en utilisant un `foreach`.  
Retourne des éléments `PharFileInfo`.

``` php
<?php
$tar = new PharData('archive.tar.gz');
foreach($tar as $file) {

    // Affiche le nom du fichier
    echo $file;

    // C'est un répertoire: lister le contenu
    if($file->isDir()) {
        echo ':';
        $dir = new PharData($file->getPathname());
        foreach($dir as $child) {
            echo "<br />$child";
        }
    }
    echo "<br />";
}
```