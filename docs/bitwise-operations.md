---
title: Opérations sur les bits
category: Other
latex: true
---

*Opérations bit à bit*, ou *bitwise operations* en anglais.  
Les opérations bit à bit sont des calculs sur les bits qui utilisent l'algèbre de Boole: NOT, AND, OR, XOR et décalages.

---

## Opérations sur les bits en programmation

Les opérations sur les bits sont très utiles en programmation pour gérer des listes d'options (multiples de 2):

``` php
<?php

define('UAG_OPTION1', 1);     # 001
define('UAG_OPTION2', 2);     # 010
define('UAG_OPTION3', 4);     # 100

function hasOption($config, $opt) {
    return ($config & $opt) > 0;
}
function removeOption($config, $opt) {
    return ($config & ~$opt);
}
function addOption($config, $opt) {
    return ($config | $opt);
}

$opts = UAG_OPTION1;                             # 001
$opts = addOption($opts, UAG_OPTION2);           # 011
$opts = addOption($opts, UAG_OPTION3);           # 111
$opts = removeOption($opts, UAG_OPTION2);        # 101
```

NB Il n'est pas nécessaire d'apprendre par coeur tous les multiples de 2 !  
Connaître 1,2,4,8 puis utiliser la notation hexadécimale :

<table>
  <tr><th>Valeur</th><th>Représentation binaire</th></tr>
  <tr><td>1</td><td>1</td></tr>
  <tr><td>2</td><td>10</td></tr>
  <tr><td>4</td><td>100</td></tr>
  <tr><td>8</td><td>1000</td></tr>
  <tr><td>0x10</td><td>10000</td></tr>
  <tr><td>0x20</td><td>100000</td></tr>
  <tr><td>0x40</td><td>1000000</td></tr>
  <tr><td>0x80</td><td>10000000</td></tr>
  <tr><td>0x100</td><td>100000000</td></tr>
</table>

---

## NOT

Négation: les bits qui sont positionnés à 1 dans `a` sont positionnés à 0, et vice-versa

    NOT 0111
      = 1000

En programmation:  
`~` permet d'inverser.

---

## AND

Et logique: les bits positionnés à 1 dans `a` ET `b` sont positionnés à 1

        0101
    AND 0011
      = 0001

En programmation:  
`&` (and) permet de tester la valeur d'un bit ou, avec la négation, de supprimer des bits.

``` php
<?php
error_reporting(E_ALL & ~E_NOTICE);  ## Afficher toutes les erreurs SAUF les notices

if(error_reporting() & E_NOTICE) {
    echo "Reporting of Notices is on";
} else {
    echo "Reporting of Notices is off";
}
```

---

## OR

Ou logique: les bits positionnés à 1 dans `a` OU `b` sont positionnés à 1

       0101
    OR 0011
     = 0111

En programmation:  
`|` (or) permet d'ajouter

``` php
<?php
error_reporting(E_ERROR | E_RECOVERABLE_ERROR);  # Afficher les erreurs ET les erreurs recouvrables
```

---

### XOR

Ou exclusif: Les bits positionnés à 1 dans `a` OU `b` MAIS PAS LES DEUX sont positionnés à 1

        0101
    XOR 0011
      = 0110

En programmation:  
`^` (xor) permet de retirer un bit s'il est vrai, de l'ajouter s'il est faux (= toggle).

``` php
<?php
$hasOption3 = $opts & UAG_OPTION3;
if($hasOption3) {
   $opts = ($opts ^ UAG_OPTION3);  # Enleve UAG_OPTIONS3
} else {
   $opts = ($opts ^ UAG_OPTION3);  # Ajoute UAG_OPTIONS3
}
```

---

## Décalage à gauche

Le décalage à gauche décale tous les bits vers la gauche, ce qui revient à une multiplication par 2 pour un décalage de 1 (2^1), 4 pour un décalage de 2 (2^2), 8 pour un décalage de 3 (2^3), etc.

       00010111 (+23) LEFT-SHIFT
    =  00101110 (+46)

En programmation:  
`<<` (left shift) permet de multiplier par des puissances de 2 très rapidemment

``` php
<?php
function listOptions($opts) {
    $nb = 3;             # Nombre d'options possibles
    $n  = pow(2, $nb-1); # Valeur de la dernière option ($nb-1 puissance 2)

    // Parcours multiples de 2 (multiplication)
    $j  = 1;
    for($i = 1; $i <= $n; $i <<= 1) {
        echo ($opts & $i ? '1' : '.');
    }
    echo '<br>';
}
listOptions(UAG_OPTION1);                             # 1..
listOptions(UAG_OPTION1 | UAG_OPTION2);               # 11.
listOptions(UAG_OPTION1 | UAG_OPTION2 | UAG_OPTION3); # 111
```

---

## Décalage à droite

Le décalage à droite décale tous les bits vers la droite, ce qui revient à une division par 2 pour un décalage de 1 (2^1).

       00010111 (+23) RIGHT-SHIFT
    =  00001011 (+11)

En programmation:  
`>>` (right shift) permet de diviser par 2 très rapidemment

``` php
<?php
function listOptions($opts) {
    $nb = 3;

    // Parcours incrémental + division sur variable cible
    for($i = 1; $i <= $nb; $i++) {
        echo $i . ':' . ($opts & 1 ? 'x' : '.') . ' ';
        $opts >>=1 ;
    }
    echo '<br>';
}
listOptions(UAG_OPTION1);                             # 1..
listOptions(UAG_OPTION1 | UAG_OPTION2);               # 11.
listOptions(UAG_OPTION1 | UAG_OPTION2 | UAG_OPTION3); # 111
```
