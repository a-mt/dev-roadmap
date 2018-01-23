---
title: CSS
category: Web
---

CSS (Cascading Style Sheets) est le langage utilisé pour formatter les documents HTML ou XML, il définit la manière dont les éléments doivent être affichés.

[A Look Back at the History of CSS](https://css-tricks.com/look-back-history-css/)  
[A free visual guide to CSS](http://cssreference.io/)  
[50 Cheatsheets, References and Guides for CSS](https://speckyboy.com/css-cheatsheets-resources-guides/)

---

## Inclure du CSS

[Inclure du CSS](css-include.md)
- ajouter du CSS
- media queries
- inclure du CSS pour IE
- @charset
- @import

---

## Structure

Lorsque les règles CSS ne sont pas placées directement sur un élément HTML (inline style), on utilise un **sélecteur** pour désigner les éléments cible. À ce sélecteur sera donné un ensemble de **propriétés et valeurs**, dans un bloc délimité par des accolades `{}`.
CSS n'est pas sensible à l'indentation, espaces et retours chariots, ils ne sont utilisés que pour rendre le code plus lisible.

Les éléments héritent du style de leur parent (d'où le *Cascading* Style Sheets). Par exemple, dans l'exemple suivant tous les éléments placés dans le tag `<html>` utiliseront la police `Times` (à moins de redéfinir la propriété) :

``` css
html {
  margin-left: 2cm;
  font-family: "Times New Roman", serif;
}

h1 {
  font-size: 24px;
  font-family: Georgia, sans-serif;
}
```

---

## Commentaires

Les commentaires sont délimités par `/* */`

---

## Navigateurs

Chaque navigateur à son propre moteur de rendu (Rendering Engine), parseur, politique de rendu et style par défaut. Cela veut dire que tous les navigateurs ne supportent pas tous toutes les propriétés CSS, ou ne les appliquent de la même manière, particulièrement pour les anciens navigateurs.

Un effort de standardisation a été fournit et les moteurs actuels respectent pour la plupart les standard du web (W3C). Les navigateurs considérés comme modernes sont
- Safari 4+
- Firefox 4+
- Opera 10+
- Chrome 10+
- IE 9+

Les principaux Rending Engine sont
- Trident (IE<10)
- Edge (IE10)
- Presto (Opera)
- Gecko (Firefox)
- WebKit (Safari)
- Blink (Chrome, Opera)

Le site [caniuse](https://caniuse.com/) permet de vérifier quels navigateurs supportent une propriété CSS donnée.

### Préfixes navigateurs

Les préfixes (vendor prefixes) permettent au navigateur de supporter des fonctionnalités CSS non standardisée ou encore en cours de développement. Une fois le code stabilisé, le préfixe est supprimé.

``` css
.box {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```

| Prefixe  | Moteur    |
|---       |---        |
| -ms      | Microsoft |
| -moz-    | Mozilla   |
| -o-      | Opera     |
| -khtml-  | Konqueror |
| -webkit- | WebKit    |

### CSS reset

Parce que différents navigateurs ont différents styles par défaut, il est d'usage courant de "remettre à zéro" le style en début de feuille de style. Cela permet de s'assurer que le style appliqué les éléments HTML sera le même sur tous les navigateurs.

Les propriétés concernées sont `margin`, `padding`, `border`, `font-size` et `line-height`.  
Les CSS reset les plus utilisés sont listés sur [cssreset](https://cssreset.com/).

---

## Versions CSS

Les spécifications CSS sont écrites par le W3C (World Wide Web Consortium), un organisme de standardisation à but non lucratif. Le CSS est un langage en constante évolution, de nouvelles fonctionnalités sont fréquemment ajoutées. Cependant, il appartient aux navigateurs de choisir de les implémenter ou non, et toutes les fonctionnalités ne sont pas supportées uniformément - notamment les plus récentes.

| Version | Année | Description                                    |
|---      |---    |---                                             |
| 1.0     | 1996  | Première version standardisée                  |
| 2.0     | 1998  | Maintes fois révisé depuis sa publication      |
| 2.1     | 2004  | Le plus utilisé et le mieux implémenté         |
| 3       | 2001+ | CSS est désormais publié en specs modularisées |

Parce que CSS3 a divisé la définition du langage CSS en modules, les modules peuvent évoluer indépendamment.  
La plupart des modules sont de niveau 3, ils reprennent les éléments de CSS 2.1.  
Il existe quelques modules sont de niveau 4 (de nouveaux sélecteurs, valeurs de background, border & images).  
D'autres modules, définissant des fonctionnalités entièrement nouvelles (comme flexbox), ont été désignés comme niveau 1.  
Des "Snapshots" (qui listent les modules considérés comme stables, implémentés et prêts à être utilisés) sont publiés de temps de temps.

[Liste de specs des modules CSS3](https://www.w3.org/TR/css3-roadmap)  
[Stade courant des évolutions](https://www.w3.org/Style/CSS/current-work.en.html)  
[Liste des modules CSS](https://www.w3.org/Style/CSS/specs.en.html)

[Snapshot 2010](http://www.w3.org/TR/2011/NOTE-css-2010-20110512)  
[Snapshot 2017](https://www.w3.org/TR/css-2017/)

---

## Sélecteurs

[Sélecteurs](css-selecteurs.md)
- sélecteurs
- spécificité des sélecteurs
- pseudo-classes
- pseudo-éléments

---

## Types CSS

[Formats des différents types CSS](css-types.md)
- chaîne de caractère (&lt;string&gt;)
- couleur (&lt;color&gt;)
- angle (&lt;angle&gt;)
- durée (&lt;time&gt;)
- taille absolue (&lt;absolute-size&gt;)
- taille relative (&lt;relative-size&gt;)
- pourcentage (&lt;percentage&gt;)
- nombre (&lt;number&gt;)
- longueur (&lt;length&gt;)
- résolution (&lt;resolution&gt;)
- image (&lt;image&gt;)
- url (&lt;uri&gt;)
- gradient (&lt;gradient&gt;)

---

## Propriétés

[Propriétés](css-proprietes.md)
- raccourcis
- types CSS
- propriétés générales (all, content)
- fonctions globales (calc, attr)
- box model
- autres bordures (outline, box-shadow)
- bloc
- texte (color, text)
- police d'écriture (font)
- orientation (direction)
- table
- ilage
- liste (counter, @counter-style)
- layout (position, float, column, flex, grid)
- transitions
- transformations
- animations
- interractions utilisateur (pointer-events, resize)
- viewport
- page
- formes (clip-path, shape)
- blend modes

---

## At-rules

[At-rules](css-atrules.md)
- @media
- @supports
- @namespace
- @page
- @viewport

---

## Propriétés personnalisés

L'un des principaux avantages des préprocesseurs CSS est qu'ils permettent d'utiliser des variables. Cela évite de devoir copier/coller des valeurs et simplifie le développement et le refactoring, ce qui les rends très populaires. Cependant

- on ne peut pas changer les variables dynamiquement
- elles ne peuvent pas être lues ou modifiés à partir de JavaScript
- elles ne dépendent pas du DOM

C'est la raison pour laquelle les propriétés personnalisées (CSS custom properties) ont été crées.

``` plain
--<string>: <value>
(CSS3)
Définit une propriété personnalisée
```

``` plain
val(<string>[, <fallback>])
(CSS3)
Récupére la valeur d'une propriété personnalisée
```

``` css
:root{
  --main-color: #4d4e53;
  --main-bg: rgb(255, 255, 255);
  --logo-border-color: rebeccapurple;

  --header-height: 68px;
  --content-padding: 10px 20px;

  --base-line-height: 1.428571429;
  --transition-duration: .35s;
  --external-link: "external link";
  --margin-top: calc(2vh + 20px);

  /* Valid CSS custom properties can be reused later in, say, JavaScript. */
  --foo: if(x > 5) this.width = 10;
}
.box {
  color: var(--main-color);

  /* 10px is used because --box-margin is not defined. */
  margin: var(--box-margin, 10px);

  /* The --content-padding variable is used if --box-padding is not defined. */
  padding: var(--box-padding, var(--content-padding));
}
```

``` js
function readCssVar(element, varName){
  const elementStyles = getComputedStyle(element);
  return elementStyles.getPropertyValue(`--${varName}`).trim();
}

function writeCssVar(element, varName, value){
  return element.style.setProperty(`--${varName}`, value);
}
```

<ins>Tester la prise en charge des propriétés personnalisées</ins> :

``` css
@supports (--a: 0) {
  body {
    color: --nomVar;
  }
}
```

``` js
const isSupported = window.CSS &&
    window.CSS.supports && window.CSS.supports('--a', 0);
```

[It's Time To Start Using CSS Custom Properties](https://www.smashingmagazine.com/2017/04/start-using-css-custom-properties/)

---

## Frameworks

Les frameworks sont des feuilles de style prêtes à l'emploi qui permettent de facilement mettre en forme un site web grâce à l'utilisation de classes. La plupart des frameworks fournissent également des icônes et du javascript, que l'on peut utiliser créer des boutons et des popups par exemple.

Les frameworks sont plus connus sont

- [Bootstrap twitter](http://getbootstrap.com/)
- [Materialize](http://materializecss.com/)
- [Foundation](https://foundation.zurb.com/)
- [Pure.css](https://purecss.io/)
- [Base](http://getbase.org/)
- [Normalize](http://necolas.github.io/normalize.css/)

---

## Préprocesseurs

Les préprocesseurs ont été crées pour ajouter des fonctionnalités à CSS.  
LESS et SASS sont les préprocesseurs CSS les plus connus.

Quelques fonctionnalités :
- les variables

  ``` scss
  @fontcolor: #333;
  p {
    color: @fontcolor;
  }
  ```

- l'imbrication des sélecteurs

  ``` scss
  #header {
      p { }
  }
  ```

- les mixins

  ``` scss
  .rounded-corners(@radius: 5px) {
    border-radius: @radius;
    -webkit-border-radius: @radius;
    -moz-border-radius: @radius;
  }
  #header {
    .rounded-corners(10px);
  }
  ```

- les opérateurs

  ``` scss
  @margin: 16px;
  #h1 {
      bottom-margin: @margin + 6;
  }
  ```
