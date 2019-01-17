---
title: Opérateurs
category: Web, PHP
---

## Assignation

Le caractère égal `=` permet d'affecter une valeur a une variable.  
À ne pas confondre avec le test d'égalité, le double (ou triple) égal `==`.

``` php
<?php
$var = "value";
```

## Concaténation

Le caractère point `.` permet de concaténer deux chaînes de caractères.

``` php
<?php
echo $var . $var2;
```

Une autre alternative est de placer les variables entre doubles quotes.

``` php
<?php
echo "$var $var2";
```

``` php
<?php
echo "${var} ${var2}";
```

---

## Arithmétique

| Symbole | Opération
|---      |---
| `+`     | Addition
| `-`     | Soustraction
| `*`     | Multiplication
| `/`     | Division
| `%`     | Modulo
| `**`    | Puissance (depuis PHP 5.6)

### Appliquer l'opérateur

Tous les opérateurs peuvent être utilisés
* de manière traditionnelle (retourne le résultat)

  ``` php
  <?php
  $a = 1;
  $b = 2;

  $c = $a + $b;

  echo $c;
  # Affiche "3"
  ```

* ou appliqué au égal (modifie directement la valeur de la variable)

  ``` php
  <?php
  $a = 1;
  $b = 2;

  $a += $b;

  echo $a;
  # Affiche "3"
  ```

Notez que cela s'applique pour tous les types d'opérateurs, pas uniquement les opérateurs arithmétiques (`$var .= "!"`, `$opts &= 1`).

### Incrémenter / décrémenter

Pour incrémenter ou décrémenter une variable de 1, il existe des raccourcis:

<table>
  <tr>
    <th></th>
    <th>Incrémente</th>
    <th>Décrémente</th>
  </tr>
  <tr>
    <td>Renvoie l'ancienne valeur</td>
    <td><code>$var++</code>
<pre lang="php">&lt;?php
$i = 1;
echo $i++; # 1
echo $i;   # 2</pre></td>
    <td><code>$var--</code>
<pre lang="php">&lt;?php
$i = 1;
echo $i--; # 1
echo $i;   # 0</pre></td>
  </tr>
  <tr>
    <td>Renvoie la nouvelle valeur</td>
    <td><code>++$var</code>
<pre lang="php">&lt;?php
$i = 1;
echo ++$i; # 2
echo $i;   # 2</pre></td>
    <td><code>--$var</code>
<pre lang="php">&lt;?php
$i = 1;
echo --$i; # 0
echo $i;   # 0</pre></td>
  </tr>
</table>

---

## Sur les bits (bitwise)

| Symbole | Opération | Description
|---      |---        |---
| <code>&verbar;</code>     | or        | Cumule les bits positionnés à 1 dans la variable de gauche ou de droite (ou les deux).<br> <code>1&verbar;1==1</code>, <code>1&verbar;0==1</code>, <code>0&verbar;1==1</code>, <code>0&verbar;0==0</code>
| `^`     | xor | Les bits positionnés à 1 dans la variable de gauche ou de droite mais pas les deux retournent 1.<br> <code>1^1==0</code>, <code>1^0==1</code>, <code>0^1==1</code>, <code>0^0=0</code>
| `&`     | and | Les bits positionnés dans le variable de gauche et de droite retournent 1.<br> <code>1&1==1</code>, <code>1&0==0</code>, <code>0&1==0</code>, <code>0&0==0</code>
| `~`     | not | Les bits positionnés à 1 retournent 0 et inversement.<br> <code>~1==0</code>, <code>~0==1</code>
| `<<`    | left shift | Décale les bits vers la gauche.<br> <code>1<<1==0b10</code>
| `>>`    | right shift | Décale les bits vers la droite.<br> <code>0b10>>1==1</code>

Les operations sur les bits sont très utiles pour gérer des listes d'options (multiples de 2).

<ins>Exemples</ins>:

``` php
<?php
// Afficher les erreurs et les erreurs recouvrables
error_reporting(E_ERROR | E_RECOVERABLE_ERROR);

// Afficher toutes les erreurs sauf de type notice
error_reporting(E_ALL ^ E_NOTICE);

// Vérifie si les erreurs notice sont activées
echo (error_reporting() & E_NOTICE > 0) ? 'Y' : 'N';
```

[Opérations sur les bits](../bitwise-operations.md)

---

## Égalité

Les opérations d'égalité renvoient un booléen `true` ou `false` si l'égalité est vérifiée ou non.

| Symbole    | Opération             | Exemple
|---         |---                    |---
| `==`       | Équivalent            | `$a == $b`
| `!=`, `<>` | Non équivalent        | `$a != $b`
| `!`        | Inverse               | `!$a`
| `===`      | Strictement égal      | `$a === $b`
| `!==`      | Strictement différent | `$a !== $b`

Les opérateurs stricts vérifient si la valeur et le type de la variable sont identique, tandis que les tests non stricts ne vérifient que la valeur.

<ins>Équivalent à vrai ou faux</ins>:

En PHP les valeurs équivalentes à faux sont
* `false`
* `0`, `0.0`, `"0"`
* `""`
* `array()`
* `null`

Tout ce qui n'est pas faux et vrai.

``` php
<?php
$var = "abc";
echo ($var == true ? 'Y' : 'N')   # Y
echo ($var === true ? 'Y' : 'N')  # N
```

<ins>Comparaison numérique</ins>:

Attention, dans le cas d'une comparaison non stricte de chaînes de caractères dont la valeur est numérique:

- les chaînes sont comparées en tant que nombre

	``` php
	<?php
	"+010" == "10.0"  # true
	"0b10" < "3"      # true
	```

- les caractères vides en début de chaîne sont ignorés (espace, \n, \r, \t, ...)

	``` php
	<?php
	"1" == "\n1"      # true
	"1" == "1\n"      # false
	"a" == "\na"      # false
	```

Si une chaîne est comparée à un nombre, la chaîne est également convertie en nombre  
(comme si on appliquait `floatval($str)`)

``` php
<?php
"1" == "1text"    # false
 1  == "1text"    # true
 1  == "text1"    # false
 0  == "text1"    # true
```

---

## Inégalité

| Symbole | Opération
|---      |---
| `<`     | Inférieur
| `<=`    | Inférieur ou égal
| `>`     | Supérieur
| `>=`    | Supérieur ou égal

En cas de comparaison de tableaux, c'est la longueur du tableau qui est comparée

``` php
<?php
(['a','b','c'] < ['a','b','c','d'])  # true
```

## Spaceship

L'opérateur Shaceship `<=>` a été ajouté en PHP 7.  
Il retourne
* -1,  si la variable à gauche est inférieure à la variable à droite
* 0, si elle est égale
* 1, si elle est supérieure

``` php
<?php
echo 1 <=> 1; # 0
echo 1 <=> 2; # -1
echo 2 <=> 1; # 1
```

---

## Sur les booléens (logique)

Les opérateurs booléens permettent de tester si plusieurs booléens sont vrais.

``` php
<?php
if($action == "sayHello" && $name != "") {
  echo "Hello " . $name;
}
```

``` php
<?php
if($age >= 18 || $hasParentalAuthorization) {
  echo "x";
}
```

<ins>Prioritaires sur le égal</ins>:

| Symbole   | Opération | Exemple | Description
|---        |---        |---      |---
| `&&`      | et        | `$a && $b` | Si la première condition est fausse, la deuxième ne sera pas évaluée.
| <code>&verbar;&verbar; | ou | <code>$a &verbar;&verbar; $b</code> | Si la première condition est vraie, la deuxième ne sera pas évaluée.

<ins>Non prioritaires sur le égal</ins>:

| Symbole   | Opération   | Exemple
|---        |---          |---
| `and`     | et          | `$name = getName() and sayHello($name);`
| `or`      | ou          | `$dir = opendir('/usr/local/upload') or die(error_get_last());`
| `xor`     | ou exclusif | `$a xor $b`

<ins>Système de priorités</ins>:

Les opérateurs ont des priorités.  
`1+5*3` vaut `16` et non `18` car la multiplication (`5*3`) est prioritaire sur l'addition (`1+5`).

On retrouve également des priorités sur les opérateurs booléens. Notamment:
* le "ou" est prioritaire au "et"
* le ou <code>&verbar;&verbar;</code> est prioritaire à l'assignation `=`
* l'assignation `=` est prioritaire au ou `or`

Les priorités des opérations peuvent être modifiées en groupant des expressions entre parenthèses `( ... )`.

``` php
<?php
if($a && $b || $c) {
  // ...
}

# équivaut à

if($a && ($b || $c)) {
  // ...
}
```

Il est conseillé de toujours utiliser les parenthèses lorsqu'il y a plusieurs opérateurs dans une expression - quand bien même le comportement par défaut est celui recherché - afin de rendre le code plus explicite.  
[php.net: La priorité des opérateurs](http://php.net/manual/fr/language.operators.precedence.php)

---



[php.net: Les opérateurs](http://php.net/manual/fr/language.operators.php)