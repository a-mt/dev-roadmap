---
title: Column
category: Web, CSS, Propriétés
---

Permet d'afficher un bloc de texte en colonnes

## column

* `column-count`  
  Définit le nombre de colonnes sur lequel afficher le texte [CSS3]

  ``` plain
  column-count: <number>
  ```

* `column-width`  
  Définit la largeur de chaque colonne [CSS3]

  ``` plain
  column-width: <length>
  ```

* `column`  
  Est un raccourci pour `column-count` et `column-width` [CSS3]

  ``` plain
  column: <column-width> || <column-count>
  ```

## column-rule

* `column-rule-width`  
  Définit la taille de la bordure [CSS3]

  ``` plain
  column-rule-width: <length> | medium | thin | thick
  ```

* `column-rule-style`  
  Définit le style de la bordure (trait, pointillés, etc) [CSS3]

  ``` plain
  column-rule-style: none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset
  ```

* `column-rule-color`  
  Définit la couleur de la bordure [CSS3]

  ``` plain
  column-rule-color: <color>
  ```

* `column-rule`  
  Raccourcis pour `column-rule-width`, `column-rule-style` et `column-style-color` [CSS3]

  ``` plain
  column-rule: <width> <style> <color>
  ```

## column-gap

Définit l'espace entre chaque colonne [CSS3]

``` plain
column-gap: <length>
```

## column-fill

Définit comment doit être répartit le contenu entre les colonnes [CSS3]  
`balance` par défaut

``` plain
column-fill: auto | balance
```

## column-span

Permet à un élément de s'étendre sur toutes les colonnes [CSS3]

``` plain
column-span: all | none
```

<ins>Exemple</ins>:

``` css
{
  column-count:3;
  column-rule: 2x solid black;
}
```

[JSFiddle column](https://jsfiddle.net/amt01/xju7ctzm/)
