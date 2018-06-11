---
title: Layout
category: Web, CSS, Propriétés
---

## position

La propriété `position` permet de déplacer l'élément dans la page.  
[Comparaison position relative, absolute, fixed](https://jsfiddle.net/amt01/cck6mx93/)

| Position | Description |
|---       |---          |
| relative | Déplace l'élément par rapport à sa position initiale |
| absolute | Place l'élément par rappport à un parent en position relative - ou à la page si aucun.<br> L'élément est sorti du flow, les autres éléments agissent comme s'il n'existait pas |
| fixed    | Place l'élément par rapport au viewport - sa position reste donc toujours la même, même lorsqu'on scrolle.<br> L'élément est sorti du flow, les autres éléments agissent comme s'il n'existait pas |
| static   | Comportement par défaut |

``` plain
position: static | relative | absolute | fixed
(CSS2)
Définit la façon dont l'élément est positionné dans le document
```

``` plain
top: <length> | <percentage> | auto
(CSS2)
Placer ou déplacer à partir du haut
```

``` plain
bottom: <length> | <percentage> | auto
(CSS2)
Placer ou déplacer à partir du bas
```

``` plain
left: <length> | <percentage> | auto
(CSS2)
Placer ou déplacer à partir de la gauche
```

``` plain
right: <length> | <percentage> | auto
(CSS2)
Placer ou déplacer à partir de la droite
```

``` plain
z-index: <number>
(CSS2)
Définit la priorité entre deux positionnés en CSS s'ils se chevauchent (!= static)
Priorité par ordre croissant: 2 prioritaire à 1
```

``` css
{
  position: absolute;
  top: 15px;
  left: 5px;
  z-index: 1;
}
```

## float

Un `float` décale un élément vers la droite ou vers la gauche jusqu'à ce qu'il touche le bord de son conteneur ou un autre élément flottant.
Les éléments situés avant le float ne sont pas affectés. Les éléments situé après le float s'adaptent à la position du ou des éléments flottant(s).
Pour que les éléments qui suivent reprennent leur comportement par défaut, utiliser `clear`.  
[Exemple float & clear](https://jsfiddle.net/amt01/k2okfe2w/)

``` plain
float: left | right | none
(CSS1)
Définit un float vers la gauche ou vers la droite
```

``` plain
clear: left | right | both
(CSS1)
Stoppe les effets du float
```

``` scss
{
  li {
    float: left;
    list-style-type: none;
  }
  &::after {
    content: "";
    display: table;
    clear: right;
  }
}
```

Si un élément flottant est plus grand en hauteur que l'élément qui le contient, son contenu va déborder du parent.
Pour parer ce problème, il faut rajouter un élément vide avec `clear` à la suite du float
(soit en ajoutant un élément vide dans le HTML soit en utilisant la propriété `content`).
[Exemple clearfix avec "content"](http://www.w3schools.com/cssref/tryit.asp?filename=trycss_float_clear_overflow)

## column

Permet d'afficher un bloc de texte en colonnes  
[Exemples column](https://jsfiddle.net/amt01/xju7ctzm/)

``` plain
column-count: <number>
(CSS3)
Définit le nombre de colonnes sur lequel afficher le texte
```

``` plain
column-width: <length>
(CSS3)
Définit la largeur de chaque colonne
```

``` plain
column: <column-width> || <column-count>
(CSS3)
Raccourcis permettant de définir le nombre de colonnes et leur largeur
```

``` plain
column-gap: <length>
(CSS3)
Définit l'espace entre chaque colonne
```

``` plain
column-rule: <width> <style> <color>
(CSS3)
Raccourcis permettant de définir une bordure entre chaque colonne
```

``` plain
column-rule-width: <length> | medium | thin | thick
(CSS3)
Définit la taille de la bordure
```

``` plain
column-rule-style: none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset
(CSS3)
Définit le style de la bordure (trait, pointillés, etc)
```

``` plain
column-rule-color: <color>
(CSS3)
Définit la couleur de la bordure
```

``` plain
column-fill: auto | balance
(CSS3)
Définit comment doit être répartit le contenu entre les colonnes
balance par défaut
```

``` plain
column-span: all | none
(CSS3)
Permet à un élément de s'étendre sur toutes les colonnes
```

``` css
{
  column-count:3;
  column-rule: 2x solid black;
}
```

## flex & align

Les flex-boxs permettent de disposer les éléments d'une page, un peu comme les float,
mais de telle sorte qu'ils aient toujours le même comportement quelle que soit la taille de l'écran.
Permet d'obtenir un layout responsive facilement.  
[Exemples flexbox](https://jsfiddle.net/amt01/8hcbz999/)

<ins>Propriétés du container</ins>:

``` plain
display: flex
(CSS3)
Rend tous les enfants de l'éléments courant "flexibles"
```

``` plain
flex-flow: <direction> <wrap>
(CSS3)
Raccourcis permettant de définir la direction et si les retours à la ligne sont autorisés
```

``` plain
flex-direction: row | row-reverse | column | column-reverse
(CSS3)
Définit si les enfants doivent être affichés en ligne ou en colonne
```

``` plain
flex-wrap: nowrap | wrap | wrap-reverse
(CSS3)
Définit s'il faut retourner à la ligne ou non si les enfants ne rentrent pas dans l'élément
```

``` plain
justify-content: flex-start | flex-end | center | space-between | space-around
(CSS3)
Définit l'alignement des enfants à l'intérieur de l'élément (début, fin, centre, etc)
```

``` plain
align-items: stretch | flex-start | flex-end | center | baseline
(CSS3)
Définit l'alignement des enfants sur l'axe secondaire
(= vertical si les enfants sont affichés en colonne et inversemment)
```

``` plain
align-content: stretch | flex-start | flex-end | center | space-between | space-around
(CSS3)
Définit le comportement des lignes sur l'axe secondaire lorsqu'il y en a plusieurs
```

``` css
{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
  align-content: space-around;
}
```

<ins>Propriétés des enfants</ins>:

``` plain
flex: <grow> <shrink> <basis>
(CSS3)
Raccourcis permettant de définir si l'élément peut s'étirer ou se rétrécir
```

``` plain
flex-basis: <length>
(CSS3)
Définit la taille de l'enfant avant d'etre traitée par flex-grow / flex-shrink
Largeur si flex-direction: row, hauteur sinon
```

``` plain
flex-grow: <number>
(CSS3)
Définit le facteur d'agrandissement de l'élément pour remplir le conteneur
0 par défaut
```

``` plain
flex-shrink: <number>
(CSS3)
Définit le facteur de rétrécissement de l'élément pour rentrer dans le conteneur
1 par défaut (<1 : agrandir, >1 : rétrécir)
```

``` plain
order: <number>
(CSS3)
Modifie l'ordre HTML des enfants
```

``` plain
align-self: stretch | flex-start | flex-end | center | baseline
(CSS3)
Override align-items au niveau de l'enfant
```

``` css
{
  flex-basis: 4em;
  flex-grow: 1;
}
```

## grid

Tandis qu'une flexbox est unidimensionnelle (les éléments sont disposés en ligne ou en colonne),
un grid crée une grille en deux dimensions (les éléments sont disposés librement sur une ligne et colonne).
Cela permet de créer des layouts plus complexes, comme par exemple une mosaïque.

![](https://i.imgur.com/apQV5Wx.png)

[Exemples grid](https://jsfiddle.net/amt01/Lutfdkgg/)

<ins>Propriétés du container</ins>:

``` plain
display: grid
(CSS3)
Définit l'élément courant comme une grille
```

``` plain
grid-auto-flow: row | column | dense
(CSS3)
Définit le comportement par défaut des éléments lorsqu'aucun template n'est définit
- row (par défaut) en ligne
- column en colonne
- dense essaie de placer les éléments pour qu'il n'y ait aucun espace vide
```

[Exemple grid-auto-flow dense](https://codepen.io/stacy/pen/eBVBZE)

``` plain
grid-template-columns: [<length> | <percent> | <fraction> | minmax() | repeat()]+
(CSS3)
Définit le nombre de colonnes et leur taille
```

``` plain
grid-column-gap: <length> | <percent>
(CSS3)
Définit les marges entre deux colonnes
```

``` plain
grid-auto-rows: <length> | <percent> | <fraction> | minmax()
(CSS3)
Définit la taille des lignes qui ont été créées automatiquement
```

``` plain
grid-template-rows: [<length> | <percent> | <fraction> | minmax() | repeat()]+
(CSS3)
Définit le nombre de lignes et leur taille
S'il n'y a pas d'éléments pour remplir les lignes, des espaces vides sont crées 
```

``` plain
grid-row-gap: <length> | <percent>
(CSS3)
Définit les marges entre deux lignes
```

``` plain
grid-auto-columns: <length> | <percent> | <fraction> | minmax()
(CSS3)
Définit la taille des colonnes qui ont été créées automatiquement
```

``` plain
grid-gap: [<length> | <percent>]{1,2}
(CSS3)
Définit les marges entre deux lignes et deux colonnes
Identiques si une seule valeur définie
```

``` plain
align-items: start | end | strech | center
(CSS3)
Définit l'alignement des éléments sur une ligne
Par défaut, un élément s'étire en hauteur pour remplir la ligne (stretch)
```

``` plain
justify-items: start | end | strech | center |
               space-around | space-beteen | space-evenly
(CSS3)
Définit l'alignement des éléments sur une colonne
Par défaut, un élément s'étire en largeur pour remplir la colonne (stretch)
```

``` plain
grid-template-areas: <string>+
(CSS3)
Définit quelles zones doivent être placées pour chaque ligne/colonne
Utiliser "." pour laisser une colonne vide
```

``` plain
grid-template: (<grid-template-areas> <grid-template-rows>)+ / <grid-template-columns>
(CSS3)
Raccourcis permettant de définir les colonnes, lignes et zones d'une grille
```

[Exemple grid-template](https://jsfiddle.net/amt01/peg5apx4/)

``` plain
grid: <grid-template> |
      <grid-template-rows> / <grid-auto-columns> |
      <grid-auto-rows> / <grid-tempalte-columns>
(CSS3)
Raccourcis permettant de définir toutes les propriétés liées aux grilles CSS
```

``` css
{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
```

<ins>Propriétés des enfants</ins>:

Par défaut, une grid place automatiquement les éléments en colonne et en ligne, dans l'ordre. Plutôt que de définir des colonnes et des lignes, on peut définir des emplacements sur lesquels on pourra par la suite placer les éléments.

![](https://i.imgur.com/rCCHzUe.png)

``` plain
grid-column-start: <number>
(CSS3)
Définit sur quelle colonne doit être placé l'élément
```

``` plain
grid-column-end: <number>
(CSS3)
Définit sur quelle colonne finit l'élément (non inclus)
```

``` plain
grid-column: <number>/<number> | span <number>
(CSS3)
Raccourcis permettant de définir sur quelle colonne commence et 
finit l'élément
Ou avec la syntaxe span, définit la taille de l'élément et non sa position
```

``` plain
grid-row-start: <number>
(CSS3)
Définit sur quelle ligne doit être placé l'élément
```

``` plain
grid-row-end: <number>
(CSS3)
Définit sur quelle ligne finit l'élément
```

``` plain
grid-row: <number>/<number> | span <number>
(CSS3)
Raccourcis permettant de positionner l'élément
Définit sur quelle ligne commence et finit l'élément
```

``` plain
align-self: start | end | strech | center
(CSS3)
Définit l'alignement de l'élément sur une ligne
Override align-items pour un élément en particulier
```

``` plain
justify-self: start | end | strech | center
(CSS3)
Définit l'alignement de l'élément sur une colonne
```

``` plain
grid-area: <string>
(CSS3)
Définit un nom de zone
```

``` css
{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  &:first-child {
    grid-column: 1/3; /* de 1 à 3 */
  }
  &:nth-child(2) {
    grid-column: span 3; /* de n à n+3 (où n est la position par défaut de l'élément) */
  }
}
```

[CSS Grid Guide](https://cssgrid.cc/css-grid-guide.html)  
[A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid)  
[Responsive grid areas (codepen)](https://codepen.io/a-mt/pen/wppEyb)  

### minmax()

Définit la taille minimale et la taille maximale de l'élément.

``` plain
minmax(
  <length> | <percentage> | auto,   // min
  <length> | <percentage> | auto,   // max
)
```

### repeat()

Permet de répéter la même valeur plusieurs fois: `repeat(3, 1fr)` est équivalent à `1fr 1fr 1fr`.  
`repeat(auto-fit, minmax(150px, 1fr))` va créer automatiquement de nouvelles colonnes tant qu'il y a de la place pour.  

``` plain
repeat(<number> | auto-fit, value)
```

[Create A Dynamic Layout With CSS Grid Using Auto Fit And Minmax (codepen)](https://codepen.io/kevinpowell/pen/0da463770f21e55ebc1e8ddfb923cfae)
