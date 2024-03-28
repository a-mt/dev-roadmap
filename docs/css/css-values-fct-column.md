---
title: Fonctions colonnes
category: Web, CSS, Valeurs
---

## minmax

* <ins>Exemple</ins>:

  ``` css
  {
    grid-template-columns: minmax(60px, 1fr) 100px 1fr;
  }
  ```

* Définit la taille minimale et maximale d'une colonne.

  ``` plain
  minmax(
    <length> | <percentage> | auto,   // min
    <length> | <percentage> | auto,   // max
  )
  ```

  [Codepen Expending grid areas](https://codepen.io/a-mt/pen/wppEyb)

## repeat

* <ins>Exemple</ins>:

  ``` css
  {
    grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
  }
  ```

* Permet de répéter la même colonne plusieurs fois: `repeat(3, 1fr)` est équivalent à `1fr 1fr 1fr`.

  ``` plain
  repeat(<number> | auto-fit, value)
  ```

  `1fr` indique au navigateur de distribuer l'espace entre les colonnes afin que chaque colonne obtienne une fraction égale de cet espace. Cela veut dire que le contenu sera écrasé sur des petites fenêtres. Spécifier une largeur minimale évite que les colonnes deviennent trop petites. Par défaut, les colonnes ne reviendrons pas à la ligne, cela provoquera un overflow. Pour éviter cela, on peut utiliser `auto-fit`.

  [Codepen Auto Fit And Minmax](https://codepen.io/kevinpowell/pen/0da463770f21e55ebc1e8ddfb923cfae)
