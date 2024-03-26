---
title: Boucles
category: Web, PHP
---

Les boucles permettent de répéter l'exécution d'un bloc de code tant qu'une condition donnée est vraie. Attention à ce que cette condition soit toujours vérifiée à un moment ou un autre, autrement le script est bloqué dans un état de boucle infinie.

## For

Le `for` permet de boucler de 0 à n.

``` php
<?php
for ($i = 0; $i < 10; $i++) {
    echo $i;
}
# Affiche 0123456789

echo $i;
# Affiche 10
```

### Condition

Le `for` est suivit de 3 instructions, séparées par des points-virgule `;`: 
* la première expression est exécutée une seule fois tout au début du `for`.  
  Elle est a priori utilisée pour effectuer une assignation.

* la deuxième expression est exécutée au début de chaque boucle.  
  Le contenu du `for` est exécuté tant que le résultat cette l'expression est équivalent à `true` (test non strict).

  ``` php
  <?php
  for($str = "abc"; $str; $str = substr($str, 1)) {
  	echo $str;
  }
  # Affiche "abcbcc"
  ```

* la troisième expression est exécutée à la fin de chaque boucle.  
  Elle est a priori utilisée pour incrémenter/décrémenter la variable testée.

  ``` php
  <?php
  for($i = 8; $i >= 0; $i -= 2) {
      echo $i;
  }
  ```

Chacune de ces instructions est optionnelle.

``` php
<?php
for(;;) {
    echo 'ok';
    break;
}
```

Les expressions peuvent exécuter plusieurs instructions, séparées par des virgules `,`, mais ce n'est pratiquement jamais utilisé car peu lisible.

``` php
<?php
for ($i = 1, $j = 2; $i <= 9 && $j < 15; $i++, $j+=2) {
    // ...
}
```

---

## Foreach

`foreach` permet de boucler sur les élément d'un tableau (liste ou tableau associatif).

``` php
<?php
$arr = array("a", "b", "c");

foreach($arr as $item) {
    echo $item;
}
# Affiche "abc"
```

Les modifications apportées au tableau d'origine à l'intérieur de la boucle (suppressions, mises à jour) ne sont pas prises en compte par les itérations suivantes. Utiliser un autre moyen de boucler sur le tableau si c'est le comportement souhaité.

``` php
<?php
$arr = array("a", "b", "c");
foreach($arr as $item) {
    echo $item;

    unset($arr[1]);
}
# Affiche "abc"

print_r($arr);
# Affiche "( [0] => a [2] => c)"
```

### Mise à jour des éléments

Pour mettre à jour les éléments du tableau à l'intérieur, utiliser un pointeur de chaque élément en précédant la variable d'un et commercial `&`.

``` php
<?php
$arr = array("a", "b", "c");
foreach($arr as $item) { $item = 1; }

print_r($arr); # Affiche "Array ( [0] => a [1] => b [2] => c )"
```

``` php
<?php
$arr = array("a", "b", "c");
foreach($arr as &$item) { $item = 1; }

print_r($arr); # Affiche "Array ( [0] => 1 [1] => 1 [2] => 1 )"
```

### Récupérer l'index

On peut également récupérer l'index en cours en même temps que l'élément en cours en séparant les deux avec une flèche `=>`.

``` php
<?php
$arr = array("a", "b", "c");

foreach($arr as $idx => $item) {
    echo $idx . ':' . $item;
}
# Affiche "0:a1:b2:c"
```

### Découplage

Depuis PHP 5.5, `foreach` supporte le découplage avec `list`.

``` php
<?php
<?php
$array = [
    [1, 2],
    [3, 4],
];

foreach ($array as list($a, $b)) {
    echo "A: $a; B: $b\n";
}
```

PHP 7.1 ajoute l'usage des crochets `[ ... ]`

``` php
<?php
foreach ($array as [$a, $b]) {
    echo "A: $a; B: $b\n";
}
```

Ainsi que le découplage des tableaux associatifs.

``` php
<?php
$data = [
    ["id" => 1, "name" => 'Tom'],
    ["id" => 2, "name" => 'Fred'],
];

foreach ($data as list("id" => $id, "name" => $name)) {
    // ...
}
foreach ($data as ["id" => $id, "name" => $name]) {
    // ...
}
```

---

## While

Le `while` permet de boucler tant qu'une condition donnée est vraie.

``` php
<?php
$i = 0;
while(++$i < 3) {
    echo $i;
}
# Affiche 12
```

Le `do ... while` permet de faire la même chose mais en exécutant le bloc de code qu'il contient au moins une fois, même si la condition n'est jamais vérifiée.

``` php
<?php
$i = 0;
do {
    echo $i;
} while(++$i < 3);
# Affiche 012
```

---

## Break

Le `break` permet de sortir de la boucle.  
Cela fonctionne avec toutes les boucles: `for`, `foreach` et `while`.

``` php
<?php
for ($i = 0; $i < 10; $i++) {
    echo $i;

    if($i == 5) {
      break;
    }
}
# Affiche 012345
```

Le `break` peut être suivit d'un numéro pour l'appliquer sur plusieurs structures (`for`, `foreach`, `while`, `switch`).

``` php
<?php
$stop = "12";
for ($i = 0; $i < 10; $i++) {
    for ($j = 0; $j <= 5; $j++) {
        echo $i . $j . '-';

        if($i . $j == $stop) {
            break 2;
        }
    }
}
# Affiche 00-01-02-03-04-05-10-11-12-
```

## Continue

Le `continue` permet de passer à la prochaine itération de la boucle.  
Cela fonctionne avec toutes les boucles: `for`, `foreach` et `while`.

``` php
<?php
for ($i = 0; $i < 10; $i++) {
    if($i == 5) continue;

    echo $i;
}
# Affiche 012346789
```

Même principe que le `break`, le `continue` peut être suivit d'un numéro spécifiant le nombre de structures sur lequel il s'applique.
