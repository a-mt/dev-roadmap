---
title: Chaînes de caractères - Fonctions
category: Web, PHP
---

## Fonctions essentielles

### strlen

Retourne la longueur d'une chaîne de caractères.  
(String length)

``` php
<?php
echo strlen("text"); # 4
```

### str_repeat

Répète une chaîne de caractères plusieurs fois.

``` php
<?php
echo str_repeat('-', 10);  # ----------
echo str_repeat('abc', 3); # abcabcabc
```

Si le nombre de répétition donné est inférieur à 0, une erreur est levée (WARNING).

### substr

Retourne n caractères à partir de l'index donné.  
Si l'index donné est négatif, l'index sera calculé à partir de la fin (longueur de la chaîne - idx).  
Si n est négatif, la longueur sera calculée à partir de la fin (longueur de la chaîne - n).  
Si la longueur n'est pas précisée, retourne tous les caractères jusqu'à la fin de la chaîne.

``` php
<?php
$var = "123456789";

echo substr($var, 0, 2);  # 12
echo substr($var, 2, 1);  # 3
echo substr($var, -2);    # 89
echo substr($var, 0, -2); # 1234567
echo substr($var, 2);     # 3456789
```

Notons que pour récupérer un caractère spécifique, on peut utiliser les crochets: `$var[2]`.

`susbtr` ne compte que les caractères sur 1 octet, pour gérer les caractères sur plus d'un caractère, utiliser la librairie mb (multi-byte). Toutes les fonctions multi-bytes sont préfixées de `mb_`:

``` php
<?php
header('Content-type: text/html; charset=utf-8');
mb_internal_encoding('UTF-8');

$str = '9°';
echo strlen($str); # 3
echo substr($str, 1, 1); # �

echo mb_strlen($str); # 2
echo mb_substr($str, 1, 1); # °
```

### strrev

Inverse les caractères d'une chaîne de caractères.  
(String reverse)

``` php
<?php
echo strrev("text"); # txet
```

### str_shuffle

Mélanger les caractères d'une chaîne de caractères.

``` php
<?php
echo str_shuffle("abcd"); # cbda
```

---

## Rechercher des caractères

### strpos, strrpos

Retourne la position de la première occurrence de la chaîne de caractère donnée ou `false`.  
Penser à faire une comparaison stricte pour vérifier si le caractère a été trouvé, le premier caractère étant à la position 0.

``` php
<?php
$path = "path/to/file";

$idx = strpos($path, "/");   # 4
echo substr($path, 0, $idx); # path
```

Il est également possible de spécifier la position de départ à partir de laquelle effectuer la recherche.  
Si la position donnée est négative, elle est calculée à partir de la fin de chaîne de caractère.

``` php
<?php
$idx = strpos($path, "/", 1);
```

`strrpos` accepte les mêmes paramètres que `strpos` mais retourne la position de la dernière occurence.

``` php
<?php
$idx = strrpos($path, "/");   # 7
echo substr($path, $idx + 1); # file
```

### stripos, strripos

Même principe que `strpos` et `strrpos` mais ne tient pas en compte la casse.

### strchr, strrchr

`strchr` retourne tout ce qui se situe après la première occurrence d'une chaîne de caractère donnée ou `false`.  
`strchr` est un alias de `strstr`.

``` php
<?php
$str = "a_b_c";
echo strstr($str, "_"); # _b_c
```
`strchr` peut également retourner se qui se situe AVANT la première occurrence trouvée.

``` php
<?php
echo strstr($str, "_", true); # a
```

`strrchr` returne tout ce qui se situe après la dernière occurrence trouvée.

``` php
<?php
echo strrchr($str, "_"); # _c
```

Il n'existe cependant pas de méthode pour retourner se qui se situe AVANT la dernière occurrence.  
Pour ce faire, utiliser `substr` et `strpos`.

``` php
<?php
echo substr($str, 0, strrpos($str, '_')); # a_b
```

### strpbrk

Recherche une liste de caractères dans une chaîne de caractères et retourne tout ce qui se trouve après la première occurrence trouvée.  
(String pointer break)

``` php
<?php
echo strpbrk("a-b_c", "_-"); 	# -b_c
echo strpbrk("a+b_c", "_-"); 	# _c
```

### count_chars

Accepte différents modes:

<table>
<tr>
<th><code>0</code></th>
<td>Retourne la liste des caractères ASCII (de 0 à 255) et leur nombre d'occurrences dans une chaîne donnée.
Le résultat est retourné sous formes de tableau associatif <code>[ code décimal => occurence ]</code>

<pre lang="php">
&lt;?php
$chars = count_chars('text', 0);
# Array ( [0] => 0 [1] => 0 ... [101] => 1 ... [255] => 0 )
</pre>
</td>
</tr>

<tr>
<th><code>1</code></th>
<td>Retourne la liste des caractères d'une chaîne de caractères et leur nombre d'occurrences.<br>
Le résultat est retourné sous formes de tableau associatif <code>[ code décimal => occurence ]</code>

<pre lang="php">
&lt;?php
$chars = count_chars('text', 0);
# Array ( [101] => 1 [116] => 2 [120] => 1 )
</pre>
</td>
</tr>

<tr>
<th><code>2</code></th>
<td>Retourne la liste des caractères ASCII qui ne sont pas dans la chaîne de caractères donnée.<br>
Le résultat est retourné sous formes de tableau associatif <code>[ code décimal => occurence ]</code>

<pre lang="php">
&lt;?php
$chars = count_chars('text', 2);
# Array ( [0] => 0 [1] => 0 ... [255] => 0 ) 
</pre>
</td>
</tr>

<tr>
<th><code>3</code></th>
<td>Retourne la liste des caractères d'une chaîne de caractères.

<pre lang="php">
&lt;?php
$chars = count_chars('text', 3);
# etx
</pre>
</td>
</tr>

<tr>
<th><code>4</code></th>
<td>Retourne la liste des caractères qui ne sont pas dans la chaîne de caractères donnée.

<pre lang="php">
&lt;?php
$chars = count_chars('text', 4);
# [...]&'()*+,-./0123456789[...]abcdfghijklmnopqrsuvwyz[...]
</pre>

</td>
</tr>

</table>

Les modes 1 et 3 sont les plus utiles.  
Le mode 1 pour le nombre d'occurrence, le mode 3 pour la liste des caractères sans leur occurrence.

``` php
<?php
$chars = count_chars('text', 1);

foreach($chars as $char => $nb){
  echo $nb . chr($char) . ' ';
}
# Affiche "1e 2t 1x"
```

### strspn

Retourne le nombre de caractères situés au début de la chaîne de caractère parmi la liste de caractère donnée.

``` php
<?php
$str = '+--+ OK';
echo strspn($str, '+- '); # 5
```

---

## Remplacer des caractères

### strtr

Remplace des caractères dans une chaîne, caractère par caractère.  
Cette fonction est souvent utilisée pour supprimer les caractères accentués d'une chaîne de caractère.

``` php
<?php
$from = 'áéíóúýÁÉÍÓÚÝàèìòùÀÈÌÒÙäëïöüÿÄËÏÖÜâêîôûÂÊÎÔÛåÅøØßçÇãñõÃÑÕ';
$to   = 'aeiouyAEIOUYaeiouAEIOUaeiouyAEIOUaeiouAEIOUaAoOscCanoANO';
$str  = strtr($str, $from, $to);
```

``` php
<?php
$str  = strtr($str, '.[]|:^$()*+?{}\\', '             ');
```

Plutôt que de passer deux chaînes de caractères (`$from, $to`), on peut passer un tableau (`[ $from => $to ]`).

``` php
<?php
$str = strtr(urlencode($str), array('%2F'=>'/', '%3A'=>':'));
```

`strtr` ne fonctionne qu'avec les caractères sur 8bits, il ne fonctionne donc pas avec un certain nombre de caractères spéciaux (comme `€`) ou de lettres accentuées UTF-8, contrairement à `str_replace`.

```php
<?php
$var = "€€€€ccc";
echo strtr($var, "€", "c");       # c��c��c��c��ccc
echo str_replace("€", "c", $var); # ccccccc
```

### str_replace

Remplace les occurrences d'une chaîne par une autre.  
Peut prendre en entrée des chaînes de caractères (`$from, $to`) ou des tableaux (`[ $from ], [ $to ]`).

``` php
<?php
$str = str_replace('"', '&quot;', $str);                         # " → &quot;
$str = str_replace(array('Œ','œ'), array('Oe','oe'), $str);      # Œ → Oe, œ → oe
$str = str_replace(array(chr(10), chr(13), chr(9)), ' ', $str);  # \n → \s, \r → \s, \t → \s
```

### str_​ireplace

Même principe que `str_replace` mais ne prend pas la casse en compte.

### substr_replace

Combinaison de `str_replace` et `substr`: remplace  un segment de chaîne par une autre.

``` php
<?php
echo substr_replace("12345689", "-", 0, 2); # -345689
```

On peut également s'en servir pour insérer une chaîne à un index donné, en remplaçant 0 caractères:

``` php
<?php
echo substr_replace("12345689", "-", 3, 0); # 123-45689
```

---

## Utiliser des expressions régulières

Il existe deux types d'expressions régulières :
* POSIX (Portable Operating System Interface for Unix)
* PCRE (Perl Compatible Regular Expression)

Ces deux types de regex ont des syntaxes différentes.  
Depuis PHP 5.3, l'extension de regex POSIX est obsolète.  
On utilise donc les PCRE, des regex dont la syntaxe est tirée du langage Perl.


### preg_match

Vérifie si la chaîne de caractère vérifie une expression régulière donnée.

L'expression régulière doit être délimitée par un caractère quelconque. `/` est le délimiteur utilisé le plus fréquemment — notamment parce de nombreux langages n'autorisent que ce délimiteur. À l'intérieur de la regex, le délimiteur doit être échappé avec un backslash `\`.

``` php
<?php
// Commence par http: ou https:
$b = preg_match('/^https?:/', $var);
```

`preg_match` peut prendre un pointeur en argument, où sera placée l'occurrence trouvée (dans un tableau).  
L'index 0 contiendra l'ensemble de la chaîne matchée et les index supérieurs à 0, les sous-groupes.  
`preg_match` ne matche que la première occurrence, utiliser `preg_match_all` pour récupérer toutes les occurrences.

``` php
<?php
$var = 'http://google.com';

$matches = array();
if(preg_match('/^(https?:\/\/)(.*)/', $var, $matches)) {
    print_r($matches);
}
# Array ( [0] => http://google.com [1] => http:// [2] => google.com ) 
```

Le délimiteur de fin peut être suivit d'un ou plusieurs [options](http://php.net/manual/fr/reference.pcre.pattern.modifiers.php).

### preg_match_all

Récupère l'ensemble des occurrences de la chaîne de caractères qui valident l'expression régulière donnée.

``` php
<?php
$var = 'a0b2335xxvbs9';

$matches = array();
if(preg_match_all('/[0-9]+/', $var, $matches)) {
   print_r($matches);
}
# Array ( [0] => Array ( [0] => 0 [1] => 2335 [2] => 9 ) ) 
```

### preg_replace, preg_replace_callback

Remplacer toutes les occurrences qui matchent une expression régulière donnée par une chaîne donnée.

``` php
<?php
// Supprime tous les nombres
$var = 'a39b38xxvbs123';
$var = preg_replace('/[0-9]/', '', $var); # abxxvbs
```

``` php
<?php
// Entoure tous les nombres par des crochets
$var = preg_replace('/([0-9]+)/', '[$1]', $var);  # a[39]b[38]xxvbs[123]
```

Il est possible de limiter le nombre de remplacement effectués:

``` php
<?php
$var = preg_replace('/([0-9]+)/', '[$1]', $var, 2);  # a[39]b[38]xxvbs123
```

On peut utiliser `preg_replace_callback` pour obtenir le même résultat mais en passant par une fonction pour effectuer le remplacement.

``` php
<?php
$var = preg_replace_callback('/([0-9]+)/', function($m){
    return chr($m[0]);
}, $var);
# a'b&xxvbs{
```

### preg_filter

Même principe que `preg_replace` mais ne retourne de résultat que si une modification a été effectuée.  
Accepte une chaîne de caractères ou un tableau en entrée.


``` php
<?php
$aUrl = array(
    '/mon/fichier/local',
    'http://127.0.0.1/files/mon_fichier_web',
    'http://127.0.0.1/files/un_autre',
    'OP'
);
$websiteUrl = preg_filter('#^http://127.0.0.1/files/#', '', $aUrl);

print_r($websiteUrl); # Array( [1] => mon_fichier_web [2] => un_autre )
```

### fnmatch

Vérifie si une chaîne de caractères vérifie un motif shell (wildcard).  
(Filename match)

``` php
<?php
$b = fnmatch('LOG_*', $var);
```

---

## Comparer deux chaînes

### strcmp, strcasecmp

Retourne l'ordre entre deux chaînes de caractères.
* `0`:  aucune différence
* `<0`: première chaîne &lt; deuxième chaîne
* `>0`: lpremière chaîne &gt; deuxième chaîne

Permet de trier des chaînes par ordre alphabétique.  
Il s'agit de la fonction utilisé par `sort()`.

``` php
<?php
echo strcmp("a", "b"); # -1
echo strcmp("a", "a"); # 0
echo strcmp("b", "a"); # 1
```

`strcasecmp` accepte les mêmes paramètres mais compare les chaînes en minuscules. L'ordre retourné ne tient donc pas compte de la casse.

``` php
<?php
echo strcasecmp("text", "Text"); # 0
```

### strncmp, strncasecmp

Même principe que `strcomp` et `strcasecmp` mais en limitant le nombre de caractères comparés.

``` php
<?php
echo strncmp("Hello!!", "Hello.", 5); # 0
echo strncmp("Hello!!", "Hallo.", 5); # 1
```

### strnatcmp, strnatcasecmp

L'algorithme `strcmp` compare caractère après caractère pour déterminer l'ordre entre les deux chaînes (que ce soit les lettres ou les chiffes). L'algorithme d'ordre naturel `strnatcmp` compare de manière "intelligente" : il compare les nombres entre eux et non chiffre par chiffre.

``` php
<?php
echo strcmp("img2", "img10"); 	 # 1  donc img2 > img10
echo strnatcmp("img2", "img10"); # -1 donc img2 < img10
```

``` php
<?php
$aFile = array("img12.png", "img10.png", "img2.png", "img1.png");
usort($aFile, 'strcmp');     # [img1, img10, img12, img2]
usort($aFile, 'strnatcmp');  # [img1, img2, img10, img12]
```

`strnatcasecmp` ne tient pas compte de la casse.

### levenshtein

Calcule la différence entre deux chaînes de caractères, c'est à dire le nombre de caractères à modifier / insérer / supprimer pour transformer l'un en l'autre.

``` php
<?php
echo strcmp("text", "tax")      # 1
echo levenshtein("text", "tax") # 2
```
Il est possible de définir le poids de l'insertion, de la modification et de la suppression d'un caractère (par défaut : 1 pour tous).

### similar_text

Calcule le nombre de caractères en commun, dans le même ordre, entre deux chaînes de caractère.

``` php
<?php
echo similar_text("tex", "tax"); # 2
echo levenshtein("tex", "tax");  # 1
```

`similar_text` peut également calculer le pourcentage de similarité, en prenant en paramètre un pointeur.

``` php
<?php
$percent = 0;
similar_text("tex", "tax", $percent);
echo $percent; # 66.666666666667
```

---

## Changer la casse

### ucfirst

Met le premier caractère en majuscule.

``` php
<?php
echo ucfirst("how do you do today?"); # How do you do today?
```

### ucwords

Met le premier caractère de chaque mots en majuscule.

``` php
<?php
echo ucwords("the prince of wales"); # The Prince Of Wales
```

### lcfirst

Met le premier caractère en minuscule.

``` php
<?php
echo lcfirst("The Prince Of Wales"); # the Prince Of Wales
```

`lcwords` n'existe pas

### strtoupper

Met tous les caractères en majuscules.

``` php
<?php
echo strtoupper("i'm not yelling!"); # I'M NOT YELLING!
```

L'encodage de caractères interne sera utilisé, utiliser `mb_strtoupper` pour forcer l'utilisation d'UTF-8.

``` php
<?php
mb_internal_encoding('UTF-8');
echo strtoupper('éléphant');         # éLéPHANT
echo mb_strtoupper('éléphant');      # ÉLÉPHANT
```

### strtolower

Met tous les caractères en minuscules.

``` php
<?php
echo strtolower("One"); # one
```

---

## Changer l'espacement

### trim, ltrim, rtrim

Supprime tous les caractères vides situés au début et à la fin de la chaîne de caractères.  
Caractères vides : `\t`, `\n`, `\r`, `\0`, `\v` et espace

``` php
<?php
echo trim("    a    "); # Affiche "a"
```

Plutôt que de supprimer les caractères vides, `trim` peut supprimer des caractères spécifiques:

``` php
<?php
echo trim("+-+-+ abc +-+-+", ' -+'); # Affiche "abc"
```

`ltrim` accepte les mêmes paramètres mais n'effectue le trim que sur le début de la chaîne.  
Même principe pour `rtrim` mais pour le fin de la chaîne.

``` php
<?php
echo ltrim("    a    "); # Affiche "a    "
echo ltrim("    a    "); # Affiche "    a"
```

### str_pad

Ajoute des espaces pour que la chaîne de caractères donnée atteigne une taille fixe définie.  
La chaîne n'est pas modifiée si elle est plus grande que la taille voulue.

``` php
<?php
echo str_pad("Hello", 10); # Affiche "Hello     "
```

Par défaut, les caractères sont ajoutés à la fin de la chaîne mais il peuvent être ajoutés au début.  
On peut également utiliser un/des caractère(s) différent(s) des espaces.

``` php
<?php
echo str_pad("1234", 10, '0', STR_PAD_LEFT); # Affiche "0000001234"
```

### wordwrap

Ajoute un retour à la ligne (`\n`) tous les x caractères.

``` php
<?php
$txt = wordwrap($txt, 60);
```

Il est possible de spécifier un/des caractère(s) de fin de ligne différent(s).

``` php
<?php
$txt = wordwrap($txt, 60, '<br>');
```

Par défaut, les mots ne sont pas césurés, le retour à la ligne sera effectué avant le mot.  
Une césure au caractère près est possible:

``` php
<?php
$txt = wordwrap($txt, 60, '<br>', true);
```

### chunk_split

Ajoute un retour à la ligne (`\r\n`) tous les x octets.

``` php
<?php
$txt = chunk_split($txt, 60);
```

Comme pour `wordwrap`, il est possible de spécifier sa propre chaîne de césure.

---

## Formater des arguments

De la même manière que `print`, `printf` affiche une chaîne donnée mais peut également formater des arguments selon des directives (qui commencent par `%`). Il existe plusieurs fonctions de la famille de `printf`:

<table>
<tr>
<th><code>printf</code></th>
<td>Affiche une chaîne formatée<br>
(print format)

<pre lang="php">
&lt;?php
printf("Le total vaut %d/%d soit %.2f", 20, 3, 20/3);
# Affiche "Le total vaut 20/3 soit 6.67"
</pre>
</td>
</tr>

<tr>
  <th><code>sprintf</code></th>
<td>Retourne une chaîne formatée<br>
(to string print format)

<pre lang="php">
&lt;?php
$txt = sprintf("Le total vaut %d/%d soit %.2f", 20, 3, 20/3);
</pre>
</td>
</tr>

<tr>
<th><code>vprintf</code></th>
<td>Affiche une chaîne formatée mais prend les arguments via un tableau<br>
(variable argument list print format)

<pre lang="php">
&lt;?php
vprintf("Le total vaut %d/%d soit %.2f", array(20, 3, 20/3));
# Affiche "Le total vaut 20/3 soit 6.67"
</pre>
</td>
</tr>

<tr>
<th><code>vsprintf</code></th>
<td>Retourne une chaîne formatée et prend les arguments via un tableau<br>
(variable argument list to string print format)

<pre lang="php">
&lt;?php
$txt = vsprintf("Le total vaut %d/%d soit %.2f", array(20, 3, 20/3));
</pre>
</td>
</tr>

<tr>
<th><code>fprintf</code></th>
<td>Ajoute une chaîne formatée dans un fichier<br>
(to file print format)

<pre lang="php">
&lt;?php
$fp = fopen('date.txt', 'w');
fprintf($fp, "Le total vaut %d/%d soit %.2f", 20, 3, 20/3);
</pre>
</td>
</tr>

<tr>
<th><code>vfprintf</code></th>
<td>Ajoute une chaîne formatée dans un fichier et prend les arguments via un tableau<br>
(variable argument list to file print format)

<pre lang="php">
&lt;?php
$fp = fopen('date.txt', 'w');
vfprintf($fp, "Le total vaut %d/%d soit %.2f", array(20, 3, 20/3));
</pre>
</td>
</tr>
</table>


Les arguments sont formatés selon des spécifications de conversion:
1. `%[lettre]`: le type

    ``` php
    <?php
    printf("%b", 13); 	# nombre binaire (1101)
    printf("%c", 13); 	# caractère ASCII (\r)
    printf("%d", 13); 	# entier (13)
    printf("%e", 13); 	# nombre scientifique (1.300000e+1)
    printf("%E", 13); 	# nombre scientifique en majuscule (1.300000E+1)
    printf("%f", 13); 	# réel (13.000000)
    printf("%s", 13); 	# string (13)
    printf("%x", 13); 	# hexadécimal (d)
    printf("%X", 13); 	# hexadécimal en majuscules (D)
    ```

2. `%+[lettre]`: afficher le signe  
   Uniquement sur les nombres (décimal ou réel)

    ``` php
    <?php
    printf("%d", 1);      # 1
    printf("%+d", 1);     # +1
    printf("%+d", -1);    # -1
    ```

3. `%.[nombre][lettre]`: afficher x chiffres après la virgule  
   Uniquement sur les réels

    ``` php
    <?php
    printf("%.2f", 1);    # 1.00
    ```

4. `%[nombre][lettre]`: afficher l'argument sur x caractères

    ``` php
    <?php
    printf("%10s", "Hello");   #      Hello
    printf("%20d", 1);         #          1
    printf("%10.2f", 1);       #       1.00
    ```

5. `%'[caractère][nombre][lettre]`: afficher l'argument sur x caractères en utilisant le caractère donné pour remplir  
   Espace par défaut

    ``` php
    <?php
    printf("%'*20d", 1);  # *******************1
    ```

    NB La quote est inutile pour spécifier le zéro :

    ``` php
    <?php
    printf("%020d", 1);   # 00000000000000000001
    printf("%02X", 13);   # 0D
    ```

6. `%-[nombre][lettre]`: afficher l'argument sur x caractères en alignant à gauche  
   Droite par défaut

    ``` php
    <?php
    printf("%'*-20d", 1); # 1******************* 
    ```

---

## Échapper des caractères

### addslashes, stripslashes

`addslashes` échappe les caractères ' " \0  
`stripslashes` supprime l'échappement de ces caractères

<pre lang="php">
&lt;?php
$str = <<&lt;HEREDOC
[\] [\'] [\"] [\0]
HEREDOC;

echo $str = addslashes($str); # [\\] [\'] [\"] [\0]
echo stripslashes($str);      # [\] ['] ["] [␀]
</pre>

<ins>Magic quotes</ins>:

* Lorsqu'on définit la directive `magic_quotes_gpc=on`,  
  la fonction `addslashes()` est automatiquement appelée sur les données get, post et cookie.

* Lorsqu'on définit la directive `magic_quotes_sybase=on`,  
 la simple quote `'` est échappée avec une simple quote `'` et non un blackslash `\`.

* Ces deux directives ont été supprimée en PHP 5.4.

``` php
<?php
# ?example=[\] [\'] [\"] [\0]

echo 'echo  : ' . $_GET['example'];
echo 'strip : ' . stripslashes($_GET['example']);
```

<table>
<tr>
  <td></td>
  <td><code>magic_quotes_gpc=Off</code></td>
  <td><code>magic_quotes_gpc=On</code></td>
</tr>

<tr>
  <td><code>magic_quotes_sybase=Off</code></td>
  <td><pre>
echo  : [\]  [']  ["]  [\0]
strip : []   [']  ["]  [␀]</pre>
</td>
  <td><pre>
echo  : [\\] [\'] [\"]  [\\0] 
strip : [\]  [']  ["]   [\0]</pre></td>
</tr>

<tr>
  <td><code>magic_quotes_sybase=On</code></td>
  <td><pre>
echo  : [\]  [']  ["]   [\0]
strip : []   [']  ["]   [␀]</pre></td>
  <td><pre>
echo  : [\]  [''] ["]  [\0]
strip : [\]  [']  ["]  [␀]</pre></td>
</tr>
</table>

### addcslashes, stripcslashes

`addcslashes` échappe une liste de caractères donnés.  
Si parmi les caractères à échapper, il y a
* des caractères spéciaux tels que des retours chariots, tabulations, etc:  
  les caractères sont convertis à la mode du langage C, c'est à dire les séquences d'échappement `\a`, `\b`, `\f`, `\n`, `\r`, `\t` et `\v`.

* des caractères non visibles tels que DEL, BACKSPACE, etc:  
  les caractères sont remplacés par leur représentation octale.

* les autres caractères sont simplement échappés avec un backslash `\`.

``` php
<?php
$txt = "Hello\x9\x1f\x20World";
echo $txt;                             # Hello  World
echo addcslashes($txt, "\x9\x1f\x20"); # Hello\t\037\ World
```

On peut spécifier un intervalle de caractère en utilisant deux points `..`:

``` php
<?php
$txt = "Hello\x9\x1f\x20World";
echo $txt;                              # Hello  World
echo addcslashes($txt, "\x0..\x1f\7f"); # Hello\t\037\ World
```

`stripcslashes` supprime tous les backslash `\`.

``` php
<?php
$txt = "Hello\x9\x1f\x20World";
$txt = addcslashes($txt, "\x0..\x1f\7f");

echo $txt;                # Hello\t\037\ World
echo stripcslashes($txt); # Hello  World
```

### preg_quote

Échappe les caractères spéciaux des expressions régulières.  
Caractères échappés: \ * ? ^ $ [ ] ( ) { } < > | + = - ! :

``` php
<?php
$str = "Ceci est une *recherche* !";

echo preg_quote($str); # Ceci est une \*recherche\* \!
```

### quotemeta

Échappe les caractères spéciaux des motifs shell (wildcard).  
Caractères échappés: \ * ? ^ $ [ ] ( ) . +

``` php
<?php
$str = 'file(001).png';

echo quotemeta($str); # file\(001\)\.png
```

### escapeshellcmd

Échappe les caractères spéciaux des commandes shell.  
Caractères échappés: \ * ? ^ $ [ ] ( ) { } < > | # & ; ~ ` ' " \n \xFF

```
<?php
$str = './file(001).sh';

echo escapeshellcmd($str); # ./file\(001\).sh
```

### escapeshellarg

Entoure la chaîne de quotes et échappe les quotes à l'intérieur pour pouvoir utiliser la chaîne comme argument shell.  
Caractères échappés: " '

```
<?php
$str = "l'\"id\"";

echo escapeshellarg($str); # 'l'\''"id"'
```

---

## URL

### urlencode

Encode une chaîne pour être utilisée comme paramètre GET dans une URL.  
Remplace tout ce qui n'est pas un caractère alphanumérique ou `-` `_` `.` <code>&nbsp;</code> en son équivalent hexadécimal précédé d'un `%`. Les espaces sont remplacés par des `+`.  
Caractères encodés: [^a-zA-Z0-90._-]

``` php
<?php
echo urlencode("mon paramètre"); # mon+param%C3%A8tre
```

### urldecode

Décode une chaîne de caractère qui représente un paramètre GET.  
Les plus `+` sont transformés en espaces <code> </code>.  
Cette fonction est automatiquement appelée sur les paramètres get, post et request.

``` php
<?php
echo urldecode("mon+param%C3%A8tre"); # mon paramètre
```

### rawurlencode

Encode une chaîne pour être utilisée comme path d'une URL.  
Remplace tout ce qui n'est pas un caractère alphanumérique ou `-` `_` `.` en son équivalent hexadécimal précédé d'un `%`. `rawurlencode` ne diffère de `urlencode` que sur les gestion des espaces.  
Caractères encodés: [^a-zA-Z0-90._-]

``` php
<?php
$url = 'mon repertoire';
echo urlencode($url);    # mon+repertoire
echo rawurlencode($url); # mon%20repertoire
```

``` php
<?php
$url = 'a b';
header('Location:' . urlencode($url));     # Redirige vers "a+b"
header('Location:' . rawurlencode($url));  # Redirige vers "a b"
```

### rawurldecode

Décode une URL.  
Le caractère plus `+` est conservé tel que.

``` php
<?php
$url = 'mon%20repertoire';
echo rawurldecode($url);    # mon repertoire
echo urldecode($url);       # mon repertoire

$url = 'mon+repertoire';
echo rawurldecode($url);    # mon+repertoire
echo urldecode($url);       # mon repertoire
```

### http_build_query

Convertit une liste de paramètres en requête GET.

``` php
<?php
$params = array(
    'foo',
    'cow' => 'milk',
    'php' => 'hypertext processor'
);
print_r(http_build_query($params));  # 0=foo&cow=milk&php=hypertext+processor
```

### parse_url

Analyse une URL et retourne ses composants

``` php
<?php
$url = 'http://www.example.com/path?googleguy=googley';
print_r(parse_url($url));
# Array ([scheme] => http [host] => www.example.com [path] => /path [query] => googleguy=googley)
```

### parse_str

Analyse une requête GET et retourne ses paramètres

``` php
<?php
$query = '0=foo&cow=milk&php=hypertext+processor';
print_r(parse_str($query));
# Array ([0] => foo [cow] => milk [php] => hypertext
```

Peut également populer un pointeur plutôt que de retourner le résultat.

``` php
<?php
$query = '0=foo&cow=milk&php=hypertext+processor';
parse_str($query, $get);
print_r($get);
# Array ([0] => foo [cow] => milk [php] => hypertext
```

---

## HTML

### htmlspecialchars

Remplace les caractères & " ' < > par leur notation HTML.  
Permet de mettre du texte à l'intérieur de balises HTML, sans risque que le texte ne soit considéré comme des balises (et potentiellement d'entraîner des erreurs HTML).

Il est possible de passer des options pour modifier le comportement de `htmlspecialchars` (`ENT_COMPAT | ENT_HTML401` par défaut).

``` php
<?php
$var = 'l\'"a" & <b>';

echo htmlspecialchars($var);                         # l'&quot;a&quot; &amp; &lt;b&gt;
echo htmlspecialchars($var, ENT_NOQUOTES);           # l'"a" &amp; &lt;b&gt;
echo htmlspecialchars($var, ENT_QUOTES);             # l&#039;&quot;a&quot; &amp; &lt;b&gt;
echo htmlspecialchars($var, ENT_HTML5 | ENT_QUOTES); # l&apos;&quot;a&quot; &amp; &lt;b&gt;
```

| Caractère | Remplacé par
|---        |---
| `&`       | `&amp;`
| `<`       | `&lt;`
| `>`       | `&gt;`
| `"`       | ENT_NOQUOTES: `"`<br> ENT_COMPAT: `&quot;`<br> ENT_QUOTES: `&quot;`
| `'`       |  ENT_NOQUOTES: `'`<br> ENT_COMPAT: `'`<br> ENT_QUOTES: `&#039;`<br> ENT_QUOTES &verbar; ENT_HTML5: `&apos;`

### htmlspecialchars_​decode

Remplace tous les caractères HTML encodés par `htmlspecialchars` en caractères normaux.  
Accepte les mêmes options.

``` php
<?php
echo htmlspecialchars_​decode("&lt;p&gt;Un cha&icirc;ne HTML&lt;/p&gt;");
# <p>Un cha&icirc;ne HTML</p>
```

### htmlentities

Remplace tous les caractères ayant une notation HTML par la notation HTML.  
Permet notamment de stocker une chaîne HTML (en BDD, dans un fichier, etc), sans risque que les caractères spéciaux soient mal encodés.  
Les retours à la ligne ne sont pas transformés en "`<br>`" (utiliser `nl2br`).

``` php
<?php

$var = '<p>Un chaîne HTML</p>';
echo htmlspecialchars($var);  # &lt;p&gt;Un chaîne HTML&lt;/p&gt; 
echo htmlentities($var);      # &lt;p&gt;Un cha&icirc;ne HTML&lt;/p&gt;
```

Comme `htmlspecialchars` accepte des paramètres:

``` php
<?php
$var = "L'exemple";

echo htmlentities($var);            # L'exemple
echo htmlentities($var, ENT_HTML5); # L&apos;exemple
```

Par défaut, `htmlentities` attend en entrée une chaîne UTF-8.  
Il est possible de spécifier un encodage différent depuis PHP >5.4:

``` php
<?php
htmlentities($var, 0, 'ISO8859-15') # Latin-9
```

### html_entity_decode

Remplace tous les caractères HTML en caractères normaux.  
Utile lorsqu'un texte HTML doit être exporté dans un fichier (en combinaison avec `strip_tags`) par exemple.

``` php
<?php
echo html_entity_decode("&lt;p&gt;Un cha&icirc;ne HTML&lt;/p&gt;");
# Un chaîne HTML
```

### get_html_translation_table

Retourne la table de translation de `htmlspecialchars` ou `htmlentities`.  
Accepte les mêmes options que `htmlentities`.

``` php
<?php
$arr = get_html_translation_table(HTML_SPECIALCHARS);

# Array ( ["] => &quot; [&] => &amp; [<] => &lt; [>] => &gt; )
```

``` php
<?php
$arr = get_html_translation_table(HTML_ENTITIES);

/* Array (252) (
    ["] => &quot;
    [&] => &amp;
    [<] => &lt;
    [>] => &gt;
    [ ] => &nbsp;
    [¡] => &iexcl;
    [¢] => &cent;
    [£] => &pound;
    [¤] => &curren;
    ...
) */
```

``` php
<?php
$arr = get_html_translation_table(HTML_ENTITIES, ENT_HTML5);

/* Array (1509) (
    [   ] => &Tab;
    [] => &NewLine;
    [!] => &excl;
    [#] => &num;
    [$] => &dollar;
    [%] => &percnt;
    [&] => &amp;
    [(] => &lpar;
    [)] => &rpar;
    ...
) */
```

### strip_tags

Supprime toutes les balises HTML.

``` php
<?php
echo strip_tags("lorem <p>ipsum</p> dolor")  # lorem ipsum dolor
```

### nl2br

Remplace les retours à la ligne (`\n`) par `<br>`.

``` php
<?php
$txt = nl2br($txt);
```

---

## Changer l'encodage (UTF-8 / ISO)

### utf8_encode

Convertit une chaîne en Latin-1 (ISO-8859-1) en UTF-8.

``` php
<?php
$txt = utf8_encode(file_get_contents("file.txt"));
```

Quelques points d'attention:

* <ins>Latin-1 / Ansi</ins>:  
  Les encodages ISO-8859-1, ISO-8859-15 et CP1252 ne sont pas identiques.  
  Windows utilise nativement l'encodage ANSI (CP1252), lequel n'est pas reconnut par les autres systèmes d'exploitation (utilisation des ISO). L'encodage UTF-8 est donc généralement utilisé par les serveurs web pour éviter les confusions et problèmes d'encodage entre machines.

  [Comparaison encodages Latin et ASCII](../assets/encoding-latin-vs-ansi.html).

* <ins>Byte Order Mark (BOM)</ins>:  
  La chaîne est encodée en UTF-8 sans BOM.  
  Certains logiciels requièrent le BOM pour utiliser l'encodage UTF-8 (Excel par exemple).   D'autres, au contraire, ne le comprennent pas et afficheront en dur les caractères correspondants (`ï»¿` pour le BOM UTF-8).  
  Il est donc recommandé de ne jamais encoder un script avec BOM, de l'ajouter manuellement en début de réponse lorsque nécessaire.

  ``` php
  <?php
  // ajout BOM utf-8 pour détection par Excel
  echo chr(239) . chr(187) . chr(191) . $data;
  ```

  BOM (Byte Order Mark) UTF:

  | Version UTF | Caractères en hexa | Caractères en décimal
  |---          |---                 |---
  |	UTF-8       | EF BB BF    | 239 187 191
  | UTF-16 (BE) | FE FF       | 254 255
  | UTF-16 (LE) | FF FE       | 255 254
  | UTF-32 (BE) | 00 00 FE FF | 0 0 254 255
  | UTF-32 (LE) | FF FE 00 00 | 255 254 0 0 

### utf8_decode

Convertit une chaîne UTF-8 en Latin-1 (ISO-8859-1)

``` php
<?php
file_put_contents("file.txt", utf8_decode($str));
```

### iconv

Convertit une chaîne dans un encodage donné vers un autre encodage.

``` php
<?php
iconv('UTF-8', 'cp1252', $str); // UTF-8 → ANSI (ne marche que sous Windows)
```

```
<?php
iconv('cp1252', 'UTF-8', $str); // ANSI → UTF-8 (ne marche que sous Windows)
```

### mb_detect_encoding

Détecte l'encodage de la chaîne de caractère

``` php
<?php
var_dump(mb_detect_encoding($str, "UTF-8,ISO-8859-1,ASCII", true));
```

``` php
<?php
if(mb_detect_encoding($str, "UTF-8,ASCII", true) === 'UTF-8') {
    $str = utf8_decode($str);
}
```

Si la liste des encodages n'est pas spécifiée, utilise la liste fournie par `mb_detect_order()`.

### mb_detect_order

Retourne ou définit la liste des encodages à essayer par `mb_detect_encoding`.  
[Liste des encodages supportés](http://php.net/manual/fr/mbstring.supported-encodings.php).

---

## Base64

### base64_encode

Encodage une chaîne de caractères en base64.  
Permet de garder une représentation textuelle d'une chaîne binaire (par exemple pour communiquer entre deux serveurs sur un protocole qui ne gère pas le binaire), ou d'afficher directement du contenu binaire (par exemple une image).
Le base64 prend plus de place que le contenu d'origine.

``` php
<?php
$data = base64_encode(file_get_contents('animation.gif'));
echo '<img src="data:image/gif;base64,' . $data . '">';
```

### base64_decode

Décode une chaîne de caractère encodée en base64.

``` php
<?php
file_put_contents('animation.gif', base64_decode($str));
```

---

## Sérialiser

### serialize

Génère une représentation textuelle d'un tableau.  
Conserve la structure et le type des éléments.  
Permet de conserver un tableau qui pourra par la suite être désérialisé (par exemple pour mettre en cache ou enregistrer dans la BDD)

``` php
<?php
$arr = array(1, 'a'=>'2','b'=>3);
echo serialize($arr);
# a:3:{i:0;i:1;s:1:"a";s:1:"2";s:1:"b";i:3;} 
```

### unserialize

Désérialise une chaîne de caractères encodées avec `serialize`..

``` php
<?php
$str = 'a:3:{i:0;i:1;s:1:"a";s:1:"2";s:1:"b";i:3;}';
var_dump(unserialize($str));
# array(3) { [0]=> int(1) ["a"]=> string(1) "2" ["b"]=> int(3) }
```

### json_encode

Génère une représentation JSON d'un tableau.  
Le JSON est la norme JavaScript de représentation des objets (et en JavaScript les tableaux sont des objets).  
Permet donc de définir une variable JavaScript.

``` php
<?php
$arr = array("a", "b", "c");
?>

<script type="text/javascript">
    var arr = <?= json_encode($arr); ?>
</script>
```
<ins>Quelques point de vigilance</ins>:

- Les chaînes de caractères JSON sont forcement encodées en UTF-8.  
  Si le tableau donné à `json_encode` contient des caractères non UTF-8, la valeur retournée est `null`.  
  Utiliser `utf8_decode` si nécessaire.
- Les types non existants en JavaScript ne sont pas conservés (et donc un objet perd sa classe)

### json_decode

Désérialise une chaîne de caractères en JSON.  
`json_encode` est plus rapide que `serialize`, on peut donc se servir de JSON pour stocker des données en base de données pourvu qu'on utilise UTF-8 et qu'on ne cherche pas à stocker des objets.

Par défaut, `json_decode` désérialise les objets JavaScript en objets PHP (de la classe standard `stdClass`).  
On peut également désérialiser en tableau.

``` php
<?php
$txt = json_encode(array("a" => 1, "b" => 2, "c" => 3));

echo $txt;
# {"a":1,"b":2,"c":3}

var_dump(json_decode($txt));
# object(stdClass)#1 (3) { ["a"]=> int(1) ["b"]=> int(2) ["c"]=> int(3) }

var_dump(json_decode($txt, true));
# array(3) { ["a"]=> int(1) ["b"]=> int(2) ["c"]=> int(3) } 
```

### implode

Transforme une liste de valeur en chaîne de caractères, où les éléments sont séparés par un délimiteur donné.  
`join` est un alias de `implode`.

``` php
<?php
echo implode(",", array("a", "b", "c")); # a,b,c
```

### explode

Transforme une chaîne de caractères contenant un délimiteur donné en un tableau.

``` php
<?php
print_r(explode(",", "a,b,c")); # Array ( [0] => a [1] => b [2] => c ) 
```

---

## Compresser

### zlib_encode

Compresse une chaîne de caractères avec l'algorithme DEFLATE.  
Peut également ajouter les headers de compatiblité GZIP ou ZLIB selon les options passées.

``` php
<?php
$gz = zlib_encode($output, ZLIB_ENCODING_GZIP);
```

``` php
<?php
$zlib = zlib_encode($output, ZLIB_ENCODING_DEFLATE);
```

``` php
<?php
$zip = zlib_encode($output, ZLIB_ENCODING_RAW);
```

<ins>Constantes de zlib_encode</ins>:

| Nom                   | Valeur | Description | Norme    |
|---                    |---     |---          |---       |
| ZLIB_ENCODING_RAW     | -15    | raw deflate | RFC 1951 |
| ZLIB_ENCODING_GZIP    | 31     | gzip        | RFC 1952 |
| ZLIB_ENCODING_DEFLATE	| 15     | zlib        | RFC 1950 |


### zlib_decode

Décompresse une chaîne de caractères avec l'algorithme DEFLATE.  
Détecte automatiquement les headers de compatibilité.

``` php
<?php
$input = zlib_decode($zip);
```

### gzencode

Compresse une chaîne de caractères avec l'algorithme DEFLATE et ajoute les headers de compatibilité GZIP.  
On peut également utiliser la fonction `zlib_encode` avec l'option `ZLIB_ENCODING_GZIP`.  
Permet de créer un fichier `.gz`.

``` php
<?php
function compress_output_option($output) {

    // Don't compress any pages less than 1000 bytes
    // as it's not worth the overhead at either side.
    if(strlen($output) < 1000) {
        return $output;
    }
    header("Content-Encoding: gzip");
    return gzencode($output);
}

if (strstr($HTTP_SERVER_VARS['HTTP_ACCEPT_ENCODING'], 'gzip')) {
    ob_start("compress_output_option");
}
```

### gzdecode

Décompresse une chaîne de caractères GZIP.  
On peut également utiliser la fonction `zlib_decode`.

``` php
<?php
$input = gzdecode($gz);
```

### gzcompress

Compresse une chaîne de caractères avec l'algorithme DEFLATE et ajoute les headers de compatibilité ZLIB.  
On peut également utiliser la fonction `zlib_encode` avec l'option `ZLIB_ENCODING_DEFLATE`.

``` php
<?php
$zlib = gzcompress($output);
```

### gzuncompress

Décompresse une chaîne de caractères ZLIB.  
On peut également utiliser la fonction `zlib_decode`.

``` php
<?php
$input = gzuncompress($zlib);
```

### gzdeflate

Compresse une chaîne de caractères avec l'algorithme DEFLATE.  
On peut également utiliser la fonction `zlib_encode` avec l'option `ZLIB_ENCODING_RAW`.  
Permet de créer un fichier `.zip`.

``` php
<?php
$zip = gzdeflate($output);
```

### gzinflate

Décompresse une chaîne de caractères DEFLATE.  
On peut également utiliser la fonction `zlib_decode`.

``` php
<?php
$input = gzinflate($zip);
```
