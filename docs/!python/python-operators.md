---
title: Opérateurs
category: Web, Python
---

## Assignation

Le caractère égal `=` permet d'affecter une valeur a une variable.

``` python
var = "value"
```

## Concaténation

La caractère plus `+` permet de concaténer deux chaîne de caractères.

``` python
print("Hello" + " World")
```

## Arithmétique

| Symbole | Opération        | Exemple
|---      |---               |---
| `+`     | Addition         | `1 + 2 = 3`
| `-`     | Soustraction     | `3 - 2 = 1`
| `*`     | Multiplication   | `2 * 3 = 6`
| `/`     | Division         | `5 / 2 = 2.5`
| `//`    | Division entière | `5 // 2 = 2`
| `%`     | Modulo           | `5 % 2 = 1`
| `**`    | Exposant         | `2**3 = 8`

Tous les opérateurs arithmétiques et bitwise peuvent être appliqués au égal:

``` python
a  = 1
a  = a + 1
a += 1
```

Python n'a pas d'opérateurs `--`/`++`.

## Sur les bits (bitwise)


| Symbole | Opération | Description
|---      |---        |---
| <code>&verbar;</code>     | or        | Cumule les bits positionnés à 1 dans la variable de gauche ou de droite (ou les deux).<br> <code>1&verbar;1==1</code>, <code>1&verbar;0==1</code>, <code>0&verbar;1==1</code>, <code>0&verbar;0==0</code>
| `^`     | xor | Les bits positionnés à 1 dans la variable de gauche ou de droite mais pas les deux retournent 1.<br> <code>1^1==0</code>, <code>1^0==1</code>, <code>0^1==1</code>, <code>0^0=0</code>
| `&`     | and | Les bits positionnés dans le variable de gauche et de droite retournent 1.<br> <code>1&1==1</code>, <code>1&0==0</code>, <code>0&1==0</code>, <code>0&0==0</code>
| `~`     | not | Les bits positionnés à 1 retournent 0 et inversement.<br> <a href="https://stackoverflow.com/questions/7278779/bit-wise-operation-unary-invert">How does ~ work in python</a>
| `<<`    | left shift | Décale les bits vers la gauche.<br> <code>1<<1==0b10</code>
| `>>`    | right shift | Décale les bits vers la droite.<br> <code>0b10>>1==1</code>

## Égalité

Les opérations d’égalité renvoient un booléen `True` ou `False`.

| Symbole    | Opération             | Exemple
|---         |---                    |---
| `==`       | Identique             | `a == b`
| `!=`       | Non identique         | `a != b`
| `is`       | Égal (strict)         | `a is b`
| `is not`   | Non égal (strict)     | `a is not b`

``` python
1==True   # True
1==1.0    # True

1 is True # False
1 is 1.0  # False
```

## Inégalité

| Symbole | Opération
|---      |---
| `<`     | Inférieur
| `<=`    | Inférieur ou égal
| `>`     | Supérieur
| `>=`    | Supérieur ou égal

Il est possible de chaîner les opérateurs:

``` python
# Revient à (a < b and b < c)
if a < b < c:
  print('OK')
```

## Sur les booléens (logique)

| Symbole    | Opération  | Exemple
|---         |---         |---
| `and`      | et         | `a and b`
| `or`       | ou         | `a or b`
| `not`      | inverse    | `not a`

Les priorités des opérations peuvent être modifiées en groupant des expressions entre parenthèses `( ... )`.