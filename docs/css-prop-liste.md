---
title: Liste
category: Web, CSS, Propriétés
---

## list

``` plain
list-style: <list-style-type> <list-style-position> <list-style-image>
(CSS1,2)
Raccourcis permettant de définir le style d'une liste
```

``` plain
list-style-type:  disc | circle | square | decimal | decimal-leading-zero |
                  lower-roman | upper-roman | lower-greek | lower-latin | upper-latin |
                  armenian | georgian | lower-alpha | upper-alpha | none
(CSS1)
Définit le style de puce à utiliser
```

``` plain
list-style-position: inside | outside
(CSS1)
Définit si les puces sont affichés à l'intérieur ou à l'extérieur des bordures du li
```

``` plain
list-style-image: <image> | none
(CSS2)
Définit l'image à utiliser comme puce
```

``` css
{
  list-style-type: none;
}
```

## counter

Les compteurs sont des variables que l'on incrémente en CSS à chaque fois qu'elles sont utilisées.  
Cela permet d'ajouter une numérotation dans la page en dehors des &lt;li&gt;.  
[Exemples counter](https://jsfiddle.net/amt01/h4p6rjaw/)

``` plain
counter-increment: <string>
(CSS3)
Incrémente la valeur du compteur <nomducompteur> à chaque qu'il s'applique à un élément
```

``` plain
counter(<string>)
(CSS3)
Retourne la valeur du compteur
```

``` plain
counter-reset: <string>
(CSS3)
Réinitialise le compteur à 0
```

``` plain
counters(<string>, <string>)
(CSS3)
Retourne la valeur du compteur, avec récursion sur les éléments imbriqués
Séparé par le délimiteur donné en 2ème arguemnt
```

``` scss
{
  counter-increment: moncounter;

  *:first-child {
    counter-reset: moncounter;
  }
  &::before {
    content: counters(nom, ".");
  }
}
```

## @counter-style

La règle `@counter-style` permet de définir des styles de compteurs personnalisés.  
[Exemples @counter-style](https://jsfiddle.net/amt01/xhtobcs4/)

``` plain
@counter-style <counter-style-name> {
  <system || symbols || additive-symbols ||
  prefix || suffix || pad || negative || 
  range || speak-as || fallback>
}
Définit un style de counter personnalisé
(CSS3)
```

``` plain
system: cyclic | numeric | alphabetic | symbolic |
        fixed <integer>? | additive | extends <counter-style-name>
(CSS3)
Définit l'algorithme à utiliser pour convertir l'index en symbole
```

``` plain
symbols: (<string> | <image>)+
(CSS3)
Définit la liste de symboles à utiliser, séparés par des espaces
```

``` plain
additive-symbols: (<integer> (<string> | <image>))+
(CSS3)
Définit la liste des symboles à utiliser et leur poids (pour un system de type additive)
```

``` plain
prefix: <string> | <image>
(CSS3)
Définit le préfixe à ajouter avant le symbole
```

``` plain
suffix: <string> | <image>
(CSS3)
Définit le suffixe à ajouter après le symbole
```

``` plain
negative: (<string> | <image>){1,2}
(CSS3)
Définit le préfixe & suffixe à utiliser pour les index négatifs (se cumule au préfixe et suffixe normal)
```

``` plain
range: (<integer> | infinite){2};
(CSS3)
Définit l'intervalle de valeurs pris en compte par le counter
Par défaut
    - pour cyclic, numeric et fixed : infinite infinite
    - pour alphabetic et symbolic : 1 infinite
    - pour additive : 0 infinite
```

``` plain
pad: <integer> (<string> | <image>)
(CSS3)
Définit la longueur de la numérotation et quel symbole utiliser pour compléter la chaîne (= str_pad)
Par exemple pour afficher tous les nombres sur 2 chiffres
```

``` plain
speak-as: <auto | bullets | numbers | words | spell-out>
(CSS3)
Définit la représentation sonore de la liste
```

``` plain
fallback: <counter-style-name>
(CSS3)
Définit le style de secours pour le system fixed
```

``` css
@counter-style circled-alpha {
  system: fixed;
  symbols: Ⓐ Ⓑ Ⓒ Ⓓ Ⓔ Ⓕ Ⓖ Ⓗ Ⓘ Ⓙ Ⓚ Ⓛ Ⓜ Ⓝ Ⓞ Ⓟ Ⓠ Ⓡ Ⓢ Ⓣ Ⓤ Ⓥ Ⓦ Ⓧ Ⓨ Ⓩ;
  suffix: " ";
}
ol {
  list-style: circled-alpha;
}
```

``` css
@counter-style alpha-modified {
  system: extends lower-alpha;
  prefix: "(";
  suffix: ") ";
}
ol {
  list-style: alpha-modified;
}
```

<ins>system</ins> :

| Valeur     | Description
|---         |---
| cyclic     | Reprend au début quand la fin de la liste est atteinte
| fixed      | Utilise le système de secours quand la fin de la liste est atteinte. On peut éventuellement définir la valeur du premier symbole (1 par défaut)
| symbolic   | À chaque boucle, le caractère affiché est doublé, triplé, etc.
| alphabetic | Utilise une numérotation alphanumérique (a, b, c, aa, ab, ac, ba, bb, bc)
| numeric    | Utilise une numérotation numérique (1, 10, 11, 100, 110, 110, 111)
| additive   | Utilise une numérotation additive ()
| extends    | Utilise une numérotation déjà définie. Permet de modifier rapidement un style de liste pré-existant

## symbols()

Il est également possible d'affecter un style de counter personnalisé en le créant à la volée, avec la fonction `symbols()`.  
NB Les listes de type `additive` et `extends` ne sont pas possible avec cette syntaxe.

``` plain
list-type: symbols([cyclic | numeric | alphabetic | symbolic | fixed] [ <string> | <image> ]+);
(CSS3)
Définit le style de counter personnalisé à utiliser en le créant à la volée
```

``` css
{
  list-style: symbols(cyclic "◉" "◌");
}
```
