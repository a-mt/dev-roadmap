---
title: Tableaux - fonctions
category: Web, PHP
---

## Fonctions essentielles

### sizeof

Retourne le nombre d'élément de niveau 1 du tableau.  
`count` est un alias de cette fonction.

``` php
<?php
$arr = ["a", "b", "c"];
$nb  = sizeof($arr); # 3
```

`sizeof` accepte le flag `COUNT_RECURSIVE` (valeur: 1), il retournera alors le nombre d'éléments récursivement.

``` php
<?php
$food = array('fruits' => array('orange', 'banana', 'apple'),
              'veggie' => array('carrot', 'collard', 'pea'));

echo count($food);                  # 2
echo count($food, COUNT_RECURSIVE); # 8
```

### isset

Vérifie si un index donné existe et que la valeur de cet index est différente de `null`.  
Utiliser `array_key_exists` pour ne vérifier que si l'index existe.

``` php
<?php
$arr = ["a", "b", "c"];
echo isset($arr[3]) ? 'Y' : 'N'; # N
```

### unset

Supprime un élément à un index donné.  
Utilise un pointeur.

``` php
<?php
$arr = ["a", "b", "c"];
unset($arr[1]); # Array ( [0] => a [2] => c ) 
```

### list

Extrait les éléments du tableau index par index.

``` php
<?php
$arr = ["a", "b", "c"];
list($a,$b,$c) = $arr;

# $a = "a", $b = "b", $c = "c"
```

La première variable est affectée à l'élément de l'index 0 du tableau, la deuxième de l'index 1, etc.  
Si le tableau ne contient pas ces clés, une erreur est levée (notice).

``` php
<?php
$arr = ["a" => 1, "b" => 2, "c" => 3];
list($a,$b,$c) = $arr;

# NOTICE Undefined offset: 0
# NOTICE Undefined offset: 1
# NOTICE Undefined offset: 2
```

Il est possible d'ignorer des index:

``` php
<?php
list(, $minute) = explode(':', '12:34:56');

# $minute = "34"
```

### extract

Extrait chaque clé d'un tableau (associatif) en une variable.

``` php
<?php
$abc = array(
    'a' => 1,
    'b' => 2,
    'c' => 3
);
extract($abc);
# $a = 1, $b = 2, $c = 3
```

---

## Fonctions d'ajout / suppression

### array_pop

Supprime le dernier élément du tableau.  
Retourne l'élément supprimé.  
Utilise un pointeur.

``` php
<?php
$arr = ["a", "b", "c"];
echo array_pop($arr); # c
print_r($arr);        # Array ( [0] => a [1] => b ) 
```

### array_push

Ajoute un ou des éléments à la fin du tableau.  
Utilise un pointeur.

``` php
<?php
$arr = ["a", "b", "c"];
array_push($arr, "d", "e"); # Array ( [0] => a [1] => b [2] => c [3] => d [4] => e )  
```

### array_shift

Supprime le premier élément du tableau.  
Retourne l'élément supprimé.  
Utilise un pointeur.

``` php
<?php
$arr = ["a", "b", "c"];
echo array_shift($arr); # a
print_r($arr);          # Array ( [0] => b [1] => c ) 
```

### array_unshift

Ajoute une ou des valeurs au début du tableau.  
Utilise un pointeur.

``` php
<?php
$arr = ["a", "b", "c"];
array_unshift($arr, "d", "e"); # Array ( [0] => d [1] => e [2] => a [3] => b [4] => c )
```

### array_splice

Supprime un ou des éléments du tableau à partir de l'index donné.  
Retourne les éléments supprimés du tableau.  
Utilise un pointeur.

``` php
<?php
$arr = ["a", "b", "c", "d"];

print_r(array_splice($arr, 1, 2)); # Array ( [0] => b [1] => c )
print_r($arr);                     # Array ( [0] => a [1] => d ) 
```

---

## Pointeur interne

Chaque tableau entretient un pointeur interne, qui pointe sur un index spécifique du tableau.  
Ce pointeur peut être avancé ou reculé, ce qui permet de récupérer les valeurs du tableau sans connaître leur clé.  
Après l'initialisation du tableau, le pointeur interne est au début du tableau.

<ins>Boucler sur un tableau est un while</ins>:

Il est parfois nécessaire de boucler sur un tableau avec une boucle `while`.  
En effet, la boucle `foreach` boucle du premier au dernier élément du tableau quelle que soit la position initiale du pointeur interne, ou du fait que des éléments soient supprimés à l'intérieur de la boucle, ce qui peut être problématique.
Les fonctions qui permettent de manipuler le pointeur interne deviennent alors utiles.

``` php
<?php
while ($value = current($arr)) {
    $key = key($arr);
    //...
    next($arr);
}
```

``` php
<?php
while(list($key,$value) = each($arr)) {
    //...
    next($arr);
}
```

### current

Retourne l'élément courant du pointeur interne.  
`pos` est un alias de `current`.

``` php
<?php
$arr = ["a" => 1, "b" => 2, "c" => 3];
echo current($arr); # 1
```

### key

Retourne l'index courant du pointeur interne.

``` php
<?php
$arr = ["a" => 1, "b" => 2, "c" => 3];
echo key($arr); # a
```

### each

Retourne la paire clé/valeur courante du pointeur interne.

``` php
<?php
$arr = ["a" => 1, "b" => 2, "c" => 3];
print_r(each($arr)); # Array ( [1] => 1 [value] => 1 [0] => a [key] => a ) 
```

On peut récupérer les variables $key et $value (clé et valeur respectivement) en utilisant
* `list`
  ``` php
  list($key, $value) = each($arr)
  ```

* `extract`
  ``` php
  extract(each($arr));
  ```

* ou les clés du tableau retourné
  ``` php
  $item  = each($arr);
  $key   = $item["key"];
  $value = $item["value"];
  ```

### next

Avance le pointeur interne du tableau d'un cran.  
Retourne la valeur de cet élément.

``` php
<?php
$arr = ["a" => 1, "b" => 2, "c" => 3];
echo next($arr);    # 2
echo current($arr); # 2
```

### prev

Recule le pointeur interne du tableau d'un cran.  
Retourne la valeur de cet élément.

``` php
<?php
$arr = ["a" => 1, "b" => 2, "c" => 3];
echo next($arr);  # 2
echo next($arr);  # 3
echo prev($arr);  # 2
```

### reset

Met le pointeur interne du tableau sur le premier élément.  
Retourne la valeur de cet élément.

``` php
<?php
$arr = ["a" => 1, "b" => 2, "c" => 3];
echo next($arr);  # 2
echo next($arr);  # 3
echo reset($arr); # 1
```

En PHP 5, `foreach` laissait le pointeur interne à la fin du tableau.  
Ce n'est plus le cas en PHP 7.

``` php
<?php
$arr = array('a','b','c');
echo current($arr);      # a

foreach($arr as $row) {}
echo current($arr);      # false

reset($arr);
echo current($arr);      # a
```

### end

Met le pointeur interne du tableau sur le dernier élément.  
Retourne la valeur de cet élément.

``` php
<?php
$arr = ["a" => 1, "b" => 2, "c" => 3];
echo end($arr);   # 3
echo next($arr);  # false
```

---

## Créer un tableau

### range

Permet de créer rapidement un tableau qui est un intervalle entre deux chiffres ou deux caractères ASCII.

``` php
<?php
$arr = range(1, 5);
# Array ( [0] => 1 [1] => 2 [2] => 3 [3] => 4 [4] => 5 )
```

``` php
<?php
$arr = range("a","z");
# Array ( [0] => a [1] => b [2] => c ... [25] => z ) 
```

L'ordre des deux bornes est respecté:

``` php
<?php
$arr = range(5,1);
# Array ([0] => 5 [1] => 4 [2] => 3 [3] => 2 [4] => 1)
```

On peut également préciser le pas:

``` php
<?php
$arr = range(1,6,2);
# Array ( [0] => 1 [1] => 3 [2] => 5 ) 
```

### explode

Scinde une chaîne de caractères en segments selon un délimiteur donné.  
Si le délimiteur est vide, une erreur est levée (warning).

``` php
<?php
print_r(explode("-", "aa-bb-cc"));
# Array ( [0] => aa [1] => bb [2] => cc ) 
```

Il est possible de limiter le nombre d'éléments crées:

``` php
<?php
print_r(explode("-", "aa-bb-cc", 2));
# Array ( [0] => aa [1] => bb-cc ) 
```

### str_split

Scinde une chaîne de caractères en segments d'une longueur fixe.

``` php
<?php
print_r(str_split("aabbcc", 2));
# Array ( [0] => aa [1] => bb [2] => cc ) 
```

Si la longueur est omise, scinde en segments de 1 caractère.

``` php
<?php
print_r(str_split("aabbcc"));
# Array ( [0] => a [1] => a [2] => b [3] => b [4] => c [5] => c ) 
```

### preg_split

Scinde une chaîne de caractères en segments selon un délimiteur qui vérifie l'expression régulière donnée.

``` php
<?php
print_r(preg_split("/[+-]/", "aa-bb+cc"));
# Array ( [0] => aa [1] => bb [2] => cc ) 
```

Il est possible de limiter de nombre d'éléments crées:

``` php
<?php
print_r(preg_split("/[+-]/", "aa-bb+cc", 2));
# Array ( [0] => aa [1] => bb+cc )
```

### sscanf

Récupère une liste de valeurs en fonction du format spécifié.  
Il s'agit de la fonction inverse de `printf`.

``` php
<?php
print_r(sscanf("SN:1000 Ref:5567", "SN:%d Ref:%d"));
# Array ( [0] => 1000 [1] => 5567 ) 
```

### strtok

Coupe une chaîne de caractères en segments selon un ou des caractères donnés.  
Cette fonction ne retourne pas un tableau mais elle peut être appelée successivement pour récupérer les différents segments car elle conserve un pointeur interne.

Seul le premier appel à `strtok` nécessite les deux arguments. Les appels ultérieurs ne nécessitent que le délimiteur. Le pointeur interne revient au début dès lors qu'on redonne les deux arguments.

``` php
<?php
$str  = 'hello_world-!';
$sep  = '_-';
$it   = strtok($str, $sep);

while($it !== false) {
    echo '['.$it.']';
    $it = strtok($sep);
}
# Affiche "[hello][world][!]"
```

---

## Get

### min

Retourne la plus petite valeur du tableau.  
Selon le code ASCII (b < à).  
Lorsque le tableau contient des entiers et des chaînes de caractères, les chaînes sont castées en entier.

``` php
<?php
$arr = [9, "a", -9];
echo min($arr);  # -9
```

### max

Retourne la plus grande valeur du tableau.  
Selon le code ASCII (b < à)  
Lorsque le tableau contient des entiers et des chaînes de caractères, les chaînes sont castées en entier.

``` php
<?php
$arr = [9, "a", -9];
echo max($arr);  # 9
```

### array_sum

Retourne la somme de toutes les valeurs du tableau.

``` php
<?php
$arr = [9, 3, -9];
echo array_sum($arr);  # 3
```

### array_reduce

Applique une fonction donnée aux éléments du tableau, de manière à réduire le tableau à une valeur simple.

``` php
<?php
$arr = [9, 3, -9];
echo array_reduce($arr, function($prev, $val){
  return $prev * $val;
}, 1);  # -243
```

Par défaut, la valeur initiale (valeur du premier $prev) est 0.

### array_rand

Retourne une clé au hasard.

``` php
<?php
$arr = [9, 3, -9];
$k   = array_rand($arr);

echo $arr[$k]; # -9
```

Peut retourner plusieurs clés (dans un sous-tableau):

``` php
<?php
$arr = [9, 3, -9];
print_r(array_rand($arr, 2)); # Array ( [0] => 0 [1] => 2 )
```

---

## Recherche

### array_key_exists

Vérifie qu'un index donné existe au sein du tableau (même avec une valeur nulle, contrairement à `isset`).

``` php
<?php
$arr = [null, 1, null];

echo isset($arr[0]) ? 'Y' : 'N';            # N
echo array_key_exists(0, $arr) ? 'Y' : 'N'; # Y
```

### in_array

Vérifie si une valeur donnée existe dans le tableau.  
Par défaut, le test effectué est non strict.

``` php
<?php
$arr = ["a", "b", "c"];

echo in_array("a", $arr) ? 'Y' : 'N'; # Y
```

Attention à la comparaison non stricte de chaînes de caractères et de nombres.

``` php
<?php
$arr = ["a", "b", "c"];

echo in_array(0, $arr) ? 'Y' : 'N'; # Y (parce que intval("a") == 0)
```

On peut également effectuer une recherche stricte:

``` php
<?php
$arr = ["a", "b", "c"];

echo in_array(0, $arr, true) ? 'Y' : 'N'; # N
```

### array_search

Cherche l'index d'une valeur donnée dans le tableau et retourne son index ou `false`.

``` php
<?php
$arr = ["a", "b", "c"];

echo array_search("a", $arr); # 0
```

Possibilité de faire une recherche stricte

``` php
<?php
$arr = ["a", "b", "c"];

echo array_search(0, $arr, true); # false
```

---

## Tri

### sort, rsort

Tri les valeurs du tableau.  
Utilise un pointeur.  
Les clés ne sont pas préservées, pour un tableau associatif, utiliser `asort`.

Par défaut, le tri est effectué selon l'ordre ASCII, caractère par caractère.  
Il est possible de modifier ce comportement en passant une option:

``` php
<?php
$aFile = array(
    "img12.png",
    "img10.png",
    "img2.png",
    "img1.png"
);
sort($aFile, SORT_REGULAR);       # [ img1.png, img10.png, img12.png, img2.png ] (par defaut)
sort($aFile, SORT_STRING);        # [ img1.png, img10.png, img12.png, img2.png ]
sort($aFile, SORT_LOCALE_STRING); # [ img1.png, img10.png, img12.png, img2.png ]
sort($aFile, SORT_FLAG_CASE);     # [ img1.png, img10.png, img12.png, img2.png ]
sort($aFile, SORT_NUMERIC);       # [ img2.png, img12.png, img10.png, img1.png ]
sort($aFile, SORT_NATURAL);       # [ img1.png, img2.png, img10.png, img12.png ]
```

`rsort` accepte les mêmes arguments mais trie dans l'ordre descendant.

``` php
<?php
rsort($aFile, SORT_REGULAR);       # [ img2.png, img12.png, img10.png, img1.png ] (par défaut)
rsort($aFile, SORT_STRING);        # [ img2.png, img12.png, img10.png, img1.png ]
rsort($aFile, SORT_LOCALE_STRING); # [ img2.png, img12.png, img10.png, img1.png ]
rsort($aFile, SORT_FLAG_CASE);     # [ img2.png, img12.png, img10.png, img1.png ]
rsort($aFile, SORT_NUMERIC);       # [ img2.png, img12.png, img10.png, img1.png ]
rsort($aFile, SORT_NATURAL);       # [ img12.png, img10.png, img2.png, img1.png ]
```

### asort, arsort

Tri les valeurs du tableau en conservant l'association clé/valeur.  
Utilise un pointeur.

<table>
<tr>
  <th></th>
  <th><code>sort($arr)</code></th>
  <th><code>asort($arr)</code></th>
</tr>
<tr>
  <td><pre>$arr = [
"b",
"a",
"c"
];</pre></td>
  <td><pre>Array (
[0] => a
[1] => b
[2] => c
)</pre></td>
  <td><pre>Array (
[1] => a
[0] => b
[2] => c
)</pre></td>
</tr>
<tr>
  <td><pre>$arr = [
"a" => 2,
"b" => 1,
"c" => 3
];</pre></td>
  <td><pre>Array (
[0] => 1
[1] => 2
[2] => 3
)</pre></td>
  <td><pre>Array (
[b] => 1
[a] => 2
[c] => 3
)</pre></td>
</tr>
</table>

Accepte également les mêmes options de tri que `sort`.  
`arsort` accepte les mêmes arguments mais trie dans l'ordre descendant.

### ksort, krsort

Trie les clés du tableau.

``` php
<?php
$arr = ["b" => 1, "a" => 2, "c" => 3];
ksort($arr);

# Array ( [a] => 2 [b] => 1 [c] => 3 )
```

`krsort` accepte les mêmes arguments mais trie dans l'ordre descendant.

### usort, uksort, uasort

Tri les valeurs du tableau en appelant une fonction définie pour déterminer l'ordre des éléments.  
Utilise un pointeur.  
Les clés ne sont pas préservées, utiliser `uasort` pour les garder.

Les valeurs de retour de la fonction sont
* <code>&nbsp;1</code> : déplacer l'item 1 vers la gauche
* `-1` : déplacer l'item 2 vers la gauche
* <code>&nbsp;0</code>  : garder l'ordre actuel
* 
``` php
<?php
$arr = [
  ["id" => 1, "name" => "b"],
  ["id" => 2, "name" => "a"],
  ["id" => 3, "name" => "c"]
];

usort($arr, function ($item1, $item2) {
    if ($item1["name"] == $item2["name"]) {
        return 0;
    }
    if($item1["name"] < $item2["name"]) {
        return -1;
    }
    return 1;
});

/*
Array (
    [0] => Array ( [id] => 2 [name] => a )
    [1] => Array ( [id] => 1 [name] => b )
    [2] => Array ( [id] => 3 [name] => c )
) 
*/
```

`uksort` trie les clés du tableau en appelant une fonction définie pour déterminer l'ordre des éléments.

`uasort` trie les valeurs en conservant l'association clé/valeur en appelant une fonction définie pour déterminer l'ordre des éléments.

### array_multisort

Trie simultanément plusieurs tableaux.  
Le premier tableau est trié selon ses valeurs, les tableaux qui suivent suivent le même tri.  
Les clés associatives sont conservées mais les clés numériques sont réindexées.

``` php
<?php
$aFile = array(
    "img12.png",
    "img10.png",
    "img2.png",
    "img1.png"
);
foreach($aFile as $i => $file) {
   $aSize[$i] = filesize($file);
}
# $aSize = array(4, 3, 1, 2);

array_multisort($aSize, $aFile);
print_r($aSize); # Array ( 1, 2, 3, 4 )
print_r($aFile); # Array ( img2.png, img1.png, img10.png, img12.png )
```

### shuffle

Mélange les valeurs du tableau.  
Les clés ne sont pas préservées.  
Utilise un pointeur.

``` php
<?php
$arr = ["a", "b", "c"];
shuffle($arr);

# Array ( [0] => c [1] => a [2] => b ) 
```

Pour un tableau associatif, il est nécessaire d'utiliser un tri associatif basé sur `rand`:

``` php
<?php
uksort($arr, function() { return rand() > rand(); });
```

---

## Fusion / intersection

### array_merge

Fusionne des tableaux.  
Les clés numériques du deuxième tableau sont incrémentées à partir du premier tableau.  
Si le deuxième tableau contient des clés associatives (texte) identiques au premier tableau, la valeur est écrasée.  
Accepte 1 à n tableaux en entrée.

``` php
<?php
$lc = array('a', 'b', 'x' => 1);
$uc = array('A', 'B', 'C', 'x' => 2);

print_r($lc + $uc);             # Array ([0] => a [1] => b [x] => 1 [2] => C)
print_r(array_merge($lc, $uc)); # Array ([0] => a [1] => b [x] => 2 [2] => A [3] => B [4] => C) 
```

### array_merge_recursive

Fusionne des tableaux récursivement.  
Les clés numériques du deuxième tableau sont incrémentées à partir du premier tableau.  
Si le deuxième tableau contient des clés associatives (texte) identiques au premier tableau, les valeurs sont rassemblées dans un sous-tableau, et ce récursivement.

``` php
<?php
print_r(array_merge_recursive($lc, $uc));
# Array ( [0] => a [1] => b [x] => Array ( [0] => 1 [1] => 2 ) [2] => A [3] => B [4] => C ) 
```

``` php
<?php
$arr1 = array("color" => array("blue", "favorite" => "red"));
$arr2 = array("color" => array("pink", "favorite" => "green"));
print_r(array_merge_recursive($arr1, $arr2));

/* Array (
    [color] => Array (
        [0] => blue
        [favorite] => Array ( [0] => red [1] => green )
        [1] => pink
    ) ) 
*/
```

### array_intersect

Retourne un tableau contenant les valeurs communes entre plusieurs tableaux.  
Les clés sont conservées (celles du tableau à gauche).  
Accepte 2 à n tableaux en entrée.  

``` php
<?php
$arr  = array('a'=>1, 'b'=>2, null);
$arr2 = array('a'=>3, 'c'=>2, false);
print_r(array_intersect($arr, $arr2)); # Array ( [b] => 2 [0] => null) 
```

### array_intersect_key

Retourne un tableau contenant les clés communes entre plusieurs tableaux.  
Les valeurs conservées sont celles du tableau le plus à gauche.  
Accepte 2 à n tableaux en entrée.

``` php
<?php
$arr  = array('a'=>1, 'b'=>2, null);
$arr2 = array('a'=>3, 'c'=>2, false);
print_r(array_intersect_key($arr, $arr2)); # Array ( [a] => 1 [0]=> null)
```

### array_intersect_assoc

Retourne un tableau contenant les éléments qui ont la même clé et la même valeur dans tous les tableaux.  
Accepte 2 à n tableaux en entrée.

``` php
<?php
$arr  = array('a'=>1, 'b'=>2, null);
$arr2 = array('a'=>3, 'c'=>2, false);
print_r(array_intersect_assoc($arr, $arr2)); # Array ( [0]=> null)
```

### array_uintersect

Retourne un tableau contenant les valeurs communes entre plusieurs tableaux en utilisant une fonction donnée pour comparer les données.  
Accepte 2 à n tableaux en entrée.

Cette fonction retourne
* `0`: les deux valeurs sont égales
* `<0`: le premier argument est inférieur
* `>0`: le premier argument est supérieur

``` php
<?php
$arr  = array('a'=>1, 'b'=>2, null);
$arr2 = array('a'=>3, 'c'=>2, false);

print_r(array_uintersect($arr, $arr2, function($a, $b){
    if(!$a) return -1;
    if(!$b) return 1;
    return $a === $b;
}));
# Array ( [a] => 1 [b] => 2 )
```

### array_diff

Retourne un tableau contenant les valeurs du tableau le plus à gauche qui ne sont pas dans les tableaux les plus à droite. Accepte 2 à n tableaux.  
Conserve les clés.

``` php
<?php
$arr = array('a', 'b', 'c');
$arr2 = array('a', 'c', 'd');
print_r(array_diff($arr, $arr2)); 	# Array ([1] => b) 
```

### array_diff_key

Retourne un tableau contenant les clés du tableau le plus à gauche qui ne sont pas dans les tableaux les plus à droite. Accepte 2 à n tableaux.

``` php
<?php
$arr = array('a'=>1, 'b'=>2, 'c'=>3);
$arr2 = array('a'=>1, 'c'=>2, 'd'=>3);
print_r(array_diff_key($arr, $arr2)); 	# Array ( [b] => 2 ) 
```

### array_diff_assoc

Retourne un tableau contenant les éléments du tableau le plus à gauche (association clé / valeur) qui ne sont pas dans les tableaux les plus à droite.  
Accepte 2 à n tableaux.

``` php
<?php
$arr = array('a'=>1, 'b'=>2, 'c'=>3);
$arr2 = array('a'=>1, 'c'=>2, 'd'=>3);
print_r(array_diff_assoc($arr, $arr2)); # Array ( [b] => 2 [c] => 3 ) 
```

### array_combine

Retourne un tableau où les valeurs du premier tableau deviennent les clés.

``` php
<?php
$keys   = array('a', 'b', 'c');
$values = array(0, 1, 2);
print_r(array_combine($keys, $values)); # Array( [a]=>0 [b]=>1 [c]=>2 ) 
```

---

## Créer un tableau à partir d'un autre

### array_flip

Retourne un tableau où les clés deviennent les valeurs et inversement.

``` php
<?php
$arr = array('a','b','c');
print_r($arr);             # Array ( [0] => a [1] => b [2] => c )
print_r(array_flip($arr)); # Array ( [a] => 0 [b] => 1 [c] => 2 )
```

### array_reverse

Retourne un tableau où l'ordre des éléments est inversé.

``` php
<?php
$arr = array('a'=>1, 'b'=>2, 'c'=>3);

print_r(array_reverse($arr));
# Array ( [c] => 3 [b] => 2 [a] => 1 ) 
```

### array_slice

Retourne un nouveau tableau qui commence à l'index donné et contient le nombre d'élément(s) spécifié.

``` php
<?php
$arr = array('a'=>1, 'b'=>2, 'c'=>3);

print_r(array_slice($arr, 0, 1));
# Array ([a] => 1)
```

### array_pad

Retourne un tableau complété avec la valeur donnée pour que le tableau soit d'une taille donnée.

``` php
<?php
$arr = array('a'=>1, 'b'=>2, 'c'=>3);

print_r(array_pad($arr, 5, 'z'));
# Array ( [a] => 1 [b] => 2 [c] => 3 [0] => z [1] => z ) 
```

Si la taille donnée est négative, les éléments sont ajoutés au début du tableau.

``` php
<?php
$arr = array('a'=>1, 'b'=>2, 'c'=>3);

print_r(array_pad($arr, -5, 'z'));
# Array ( [0] => z [1] => z [a] => 1 [b] => 2 [c] => 3 ) 
```

### preg_grep

Retourne un tableau dont les éléments ont été filtres par une expression régulière donnée.

``` php
<?php
$arr = array(
    "a" => "Alice001",
    "b" => "Bob",
    "c" => "Charlie2"
);

print_r(preg_grep('/\d/', $arr));
# Array ( [a] => Alice001 [c] => Charlie2 ) 
```

### array_filter

Retourne un tableau dont les éléments ont été filtrés par une fonction donnée.  

``` php
<?php
$arr = array('a'=>1, 'b'=>2, 'c'=>3);

print_r(array_filter($arr, function($value){
   return $value % 2 != 0;
}));
# Array ( [a] => 1 [c] => 3 )
```

### array_unique

Retourne un tableau sans doublons.  
En cas de doublon, c'est la clé la plus à gauche qui est conservée.  
Les valeurs sont comparées entre elles en tant que chaîne de caractères (`(string)$elem1 == (string)$elem2`) donc

- `0`, `0.0`, `"0"` sont des doublons
- `""`, `false`, `null` sont des doublons

``` php
<?php
$arr = array("a", "a", 0, false, null, "b");

print_r(array_unique($arr));
# Array ( [0] => a [2] => 0 [3] => false [5] => b )
```

### array_map

Retourne un tableau dont les valeurs ont été modifiées par la fonction donnée.

``` php
<?php
$arr = array('a'=>1, 'b'=>2, 'c'=>3);

print_r(array_map(function($value){
   return "[$value]";
}, $arr));
# Array ( [a] => [1] [b] => [2] [c] => [3] ) 
```

### array_walk

Exécute une fonction donnée sur les éléments du tableau.

``` php
<?php
$arr = array('a'=>1, 'b'=>2, 'c'=>3);

array_walk($arr, function(&$value, $key){
   $value = "[$value]";
});
print_r($arr);
# Array ( [a] => [1] [b] => [2] [c] => [3] ) 
```

### array_walk_recursive

Exécute une fonction donnée sur les éléments du tableau, récursivement.

``` php
<?php
$arr = array('a'=>array(1,2), 'b'=>2, 'c'=>3);

array_walk_recursive($arr, function(&$value, $key){
   $value = "[$value]";
});
print_r($arr);
# Array ( [a] => Array ( [0] => [1] [1] => [2] ) [b] => [2] [c] => [3] )
```

### array_keys

Retourne les clés du tableau.

``` php
<?php
$arr = array('a'=>1, 'b'=>2, 'c'=>3);

print_r(array_keys($arr));
# Array ( [0] => a [1] => b [2] => c )
```

### array_values

Retourne les valeurs du tableau.  
Permet de transformer un tableau associatif en une liste (tableau non associatif)

``` php
<?php
$arr = array('a'=>1, 'b'=>2, 'c'=>3);

print_r(array_values($arr));
# Array ( [0] => 1 [1] => 2 [2] => 3 )
```

### array_count_values

Retourne un tableau où les valeurs du tableau donné sont associées à leur nombre d'occurrences.

``` php
<?php
$arr = array('a','b','c','b','b');

print_r(array_count_values($arr));
# Array ( [a] => 1 [b] => 3 [c] => 1 )
```
