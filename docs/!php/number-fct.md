---
title: Nombres - Fonctions
category: Web, PHP
---

Toutes les variables passées aux fonctions mathématiques qui ne sont pas des entiers / réels sont castées en réel.

``` php
<?php
round('-2.4', 2);  # -2.4
round('text', 2);  # 0
```

## Arrondis

### round

Arrondit à l'entier le plus proche (2.4 &rarr; 2, 2.6 &rarr; 3)

``` php
<?php
$val = round($n);
```

Il est possible de préciser le nombre de décimales à garder.  
Par exemple, pour arrondir à deux décimales (2.555 &rarr; 2.56):

``` php
$val = round($n, 2);
```

Par défaut, `round` arrondit à l'entier supérieur (2.5 &rarr; 3).  
Il est possible de modifier ce comportement avec le flag `PHP_ROUND_HALF_UP`.

``` php
<?php
$val = round($n, 0, PHP_ROUND_HALF_UP);
```

### ceil

Arrondit à l'entier supérieur (2.4 &rarr; 3).  
(ceiling = plafond)

``` php
<?php
$val = ceil($n);
```


### floor

Arrondit à l'entier inférieur (2.6 &rarr; 2)  
(floor = sol)

``` php
<?php
$val = floor($n);
```


---

## Aléatoire

### mt_rand

Génère un nombre aléatoire entre 0 et `mt_getrandmax()`.  
"mt" vient du nom de l'algorithme utilisé: Mersenne Twister

``` php
<?php
$val = mt_rand();
```

Pour générer un nombre aléatoire compris entre deux bornes (inclues), préciser le min et max:

``` php
<?php
$val = mt_rand(5, 15);
```

### mt_getrandmax

Retourne la plus grande valeur aléatoire possible.  
2^31 pour un ordinateur 32 bits (2 147 483 647)

``` php
<?php
$val = mt_getrandmax();
```

---

## Fonctions mathématiques avancées

### bcadd

Les opérations arithmétiques peuvent laisser des erreurs d'arrondi, même pour les chiffres ayant peu de chiffres après la virgule ([explication](http://floating-point-gui.de/basic/)). Si la précision est importante, il est nécessaire d'utiliser les [fonctions mathématiques de précision bc](http://php.net/manual/fr/ref.bc.php). Sinon, un `round` peut faire l'affaire (si une erreur d'arrondi de 0.1 est exceptable).

Par exemple, pour additionner deux réels avec une précision de 2 chiffres après la virgule:

``` php
<?php
$a = 36;
$b = -35.99;
echo ($a + $b);           # 0.009999999999998
echo round($a + $b, 2);   # 0.01
echo bcadd($a, $b, 2);    # 0.01
```

De la même manière les grands nombres peuvent poser problème, ce que résout encore une fois les fonctions `bc`:

``` php
<?php
$a = '1234567812345678';
$b = '8765432187654321';
echo $a + $b;             # 1.0E+16
echo bcadd($a, $b);       # "9999999999999999"
```

### abs, log, etc

| Fonction        | Description
|---              |---
| `abs($n)`       | Valeur absolue (-4.5 &rarr; 4.5)
| `log($n)`       | Logarithme népérien
| `exp($n)`       | Exponentielle
| `pow($n, $p)`   | Puissance
| `sin($n)`       | Sinus
| `cos($n)`       | Cosinus
| `tan($n)`       | Tangente
| `deg2rad($n)`   | Convertit un degré en radian
| `rad2deg($n)`   | Convertit un radian en degré
| `hypot($a, $b)` | Calcule la longueur de l'hypoténuse de deux côtés

---

## Affichage

Pour formater l'affichage d'un nombre, on peut utiliser `sprintf` ou `number_format`.

* `number_format` formate un nombre donné (et un seul).  
  Il permet de spécifier le séparateur à utiliser pour les décimales et pour les milliers. Il est obligatoire de spécifier le séparateur des milliers si le séparateur des décimales est spécifié.

* `sprintf` formate une chaîne de caractères et des arguments (et peut donc en prendre plusieurs).  
  Il n'est pas possible de modifier le séparateur.

Par exemple, pour formater un nombre avec deux chiffres après la virgule:

``` php
<?php
echo number_format(20.3, 2);           # 20.20
echo number_format(20.6, 2, ',', '.'); # 20,60

echo sprintf("%0.2f", 20.3);           # 20.30
echo sprintf("%.2f - %.2f", 20.3, 0);  # 20.30 - 0.00
```