---
title: Vérifier et caster le contenu
category: Web, PHP
---

## Vérifier le type d'une variable

Il existe différentes fonctions pour vérifier le type de données d'une variable.  
Ces fonctions retournent un booléen et peuvent donc être utilisées à l'intérieur d'un test `if`.

| Type de données      | Fonctions
|---                   |---
| Valeur nulle         | `is_null($var)`
| Entier               | `is_int($var)`, `is_integer($var)`, `is_long($var)`
| Réel                 | `is_double($var)`, `is_float($var)`, `is_real($var)`
| Booléen              | `is_bool($var)`
| Chaîne de caractères | `is_string($var)`
| Tableau              | `is_array($var)`
| Fonction             | `is_callable($var)`
| Objet                | `is_object($var)`
| Resource             | `is_resource($var)`

* `is_scalar($var)` vérifie si le type de données de la variable est scalaire.  
  C'est à dire un entier, réel, booléen ou une chaîne de caractère (!= array, object, resource, null).

* `gettype($var)` retourne le type de la variable.  
  Valeurs possibles: integer, double, boolean, string, array, object, resource

---

## Vérifier le contenu d'une variable

* `is_numeric($var)` vérifie si la valeur de la variable est un nombre.  
  Le contenu est vérifié et non le type.

  ``` php
  <?php
  is_numeric('-5.5')  # true
  is_numeric('NAN')   # false
  ```

* `empty($var)` vérifie si la valeur de la variable est vide.
  Équivaut à `$var == false`.

  ``` php
  <?php
  empty("")           # true
  empty(0)            # true
  empty(0.1)          # false
  ```

* On peut également utiliser les [expressions régulières](string-fct.md#Utiliser_des_expressions_régulières) pour vérifier si une chaîne de caractères contient un motif donné.

* Ou les [opérateurs d'égalité](operators.md#Égalité) / d'inégalité pour les nombres.

---

## Transtyper

Pour convertir le contenu d'une variable d'un type à l'autre, on peut utiliser des fonctions ou des éléments de syntaxe. Toutes les manières présentées ci-dessous retournent la valeur castée et ne modifient pas le contenu de la variable.

| Convertir en...      | Exemples
|---                   |---
| Entier               | `intval($var)`, `(int)$var`, `(integer)$var`, <code>0&verbar;$var</code>
| Réel                 | `floatval($var)`, `doubleval($var)`, `(float)$var`, `(double)$var`, `(real)$var`
| Booléen              | `boolval($var)`, `(bool)$var`, `(boolean)$var `, `!!$var`
| Chaîne de caractères | `strval($var)`, `(string)$var`, `"".$var`

La fonction `settype` convertit le contenu de la variable directement plutôt que de retourner la nouvelle valeur.

``` php
<?php
$newval = strval($var);  # Retourne la valeur castée

settype('string', $var); # Affecte directement la valeur castée
```

Types acceptés par `settype`:
- boolean, bool
- integer, int
- float
- string
- array
- object
- null

[php.net: Manipulation de types](http://php.net/manual/fr/language.types.type-juggling.php)

