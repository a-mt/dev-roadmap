---
title: PHPDoc
category: Web, PHP
---

La PHPDoc est un commentaire commencé par deux astérisques `/**` - inspiré de la JavaDoc.  
La PHPDoc documente les classes et fonctions et est généralement utilisée par les IDE (ex : eclipse) pour afficher des aides.
Elle n'impacte pas le fonctionnement du script mais permet d'indiquer au développeur les restreintes et le comportement attendu des différentes classes, fonctions et variables.  
[Référence PHPDoc](https://docs.phpdoc.org/references/phpdoc/index.html)

---

## Classes

Indique les informations utiles à savoir sur la classe, tel que son package, licence, etc.

``` php
<?php
/**
 * @category   Zend
 * @package    Zend
 * @copyright  Copyright (c) 2005-2011 Zend Technologies USA Inc. (http://www.zend.com)
 * @license    http://framework.zend.com/license/new-bsd     New BSD License
*/
class Zend_Exception extends Exception {
}
```

| Exemple            | Description
|---                 |---
| `@package Exemple` | Nom du namespace
| `@copyright ...`   | Copyright
| `@licence MIT`     | Licence
| `@version 1.0`     | Version

---

## Méthodes

Indique les paramètres d'entrée et de sortie, leur type et leur usage.  
Indique également si la fonction peut lancer des exceptions et de quel type.

``` php
<?php
/**
* Décrit brièvement ce que fait la fonction
*
* @param string $key
* @return null
*/
public function test($key) {
  // ...
}
```

| Exemple                                 | Description
|---                                      |---
| `@param string $mavar`                  | Type du paramètre en entrée*
| `@param string[optional] $var - (null)` | Paramètre optionnel, précise la valeur par défaut
| `@param string[pointer] $var`           | Paramètre en entrée sortie
| <code>@param string[pointer&verbar;optional] $var - (null)</code> | Paramètre en entrée sortie optionnel
| `@todo message`                         | Indique un todo
| `@fixme message`                        | Indique un bug connu
| `@deprecated message`                   | Marque la fonction comme dépréciée
| `@link http://google.fr`                | Cf une URL
| `@throws Exception`                     | Indique que la fonction peut lancer une exception de la classe indiquée
| `@return null`                          | Type du paramètre en sortie

&ast; Peut être  
      &emsp;un type scalaire: `string`, `integer`, `boolean`, `array`, `resource`, `callable`  
      &emsp;un nom de classe: `MyClassName`  
      &emsp;plusieurs types: `string|integer`, `mixed`

---

## Propriétés

Indique le type de la variable et éventuellement son usage.

``` php
<?php
/**
 * Un commentaire
 *
 * @var string
 */
protected $var;
```

---

## Variables

Les variables utilisées à l'intérieur d'une fonction peuvent également être commentée avec la PHPDoc, pour bénéficier de l'autocomplete de l'IDE. Dans ce cas là, on ne met qu'un seul astérisque `*`.

``` php
<?php
$var = $this->getVar();
/* @var $var Exemple */
```
