---
title: "SVG: Autres éléments"
category: Web, HTML, SVG
---

## g

La balise `g` (pour groupe) permet de grouper un ensemble de formes, un peu à la manière d'un `div` en HTML. Cette balise peut être utile 1. pour que le code soit plus compréhensible 2. pour appliquer des interractions utilisateur (comme `:hover`) 3. pour appliquer des transformations sur plusieurs formes (`transform`) 4. pour appliquer un même style (fill, stroke, etc) sur plusieurs éléments.

``` html
<style>
  g:hover * { fill: green; }
</style>
<g>
  <rect x="5" y="5" width="50" height="50" fill="white" />
  <rect x="20" y="20" width="50" height="50" fill="red" />
</g>
```

<svg width="100" height="100" style="background: black" id="hover-green">
    <style>
        #hover-green g:hover * { fill: green; }
    </style>
    <g>
      <rect x="5" y="5" width="50" height="50" fill="white" />
      <rect x="20" y="20" width="50" height="50" fill="red" />
    </g>
</svg>

---

## svg

Contrairement à HTML, un élément SVG peut inclure d'autres éléments SVG. Il est donc possible d'utiliser différents systèmes de coordonnées, en définissent les attributs `viewBox`, `width` et `height` de ce sous-document.

``` html
<svg width="100" height="100">
  <svg width="100" height="100" viewBox="0 0 50 50">
    <circle cx="25" cy="25" r="25" fill="blue" />
  </svg>
  <circle cx="25" cy="25" r="25" fill="red" />
</svg>
```

<svg width="100" height="100">
  <svg width="100" height="100" viewBox="0 0 50 50">
    <circle cx="25" cy="25" r="25" fill="blue" />
  </svg>
  <circle cx="25" cy="25" r="25" fill="red" />
</svg>

---

## image

La balise `image` permet d'insérer une image bitmap ou vectorielle dans le document SVG.

``` html
<image width="128" height="146" xlink:href="https://developer.mozilla.org/media/img/mdn-logo.png" />
```

<svg width="100" height="100" viewBox="0 0 128 146">
  <image width="128" height="146" xlink:href="https://developer.mozilla.org/media/img/mdn-logo.png" />
</svg>

---

## foreignObject

La balise `foreignObject` permet d'inclure des éléments d'un espace de noms XML différent à l'intérieur du SVG. Dans le contexte d'un navigateur, il s'agit généralement d'inclure du XHTML/HTML. Dans le cas d'un SVG intégré dans du HTML, le namespace XHTML peut être omis, mais il est obligatoire dans le contexte d'un document SVG.

``` html
<foreignObject x="20" y="20" width="160" height="160">
  <div xmlns="http://www.w3.org/1999/xhtml" style="font-size: 28px; overflow: auto; height: 100%;">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </div>
</foreignObject>
```

<svg width="100" height="100" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <polygon points="5,5 195,10 185,185 10,195" fill="skyblue" />

  <foreignObject x="20" y="20" width="160" height="160">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-size: 28px; overflow: auto; height: 100%;">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </div>
  </foreignObject>
</svg>

---

## a

La balise `a` permet d'ajouter des liens à l'intérieur du SVG, de la même manière qu'en HTML.

En SVG 1.1, l'adresse cible est désignée par l'attribut `xlink:href`, attention en l'utilisant à bien définir le namespace xlink pour que le SVG soit valide en dehors d'une page HTML. En SVG 2, cet attribut devient obsolète et est remplacé par `href`, il n'y a pas de namespace dans ce cas.

``` html
<svg width="140" height="30"
     xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink">
  <a
     xlink:href="https://developer.mozilla.org/en-US/docs/SVG"
     target="_blank">
    <rect height="30" width="120" y="0" x="0" rx="15"/>
    <text fill="white" text-anchor="middle" y="21" x="60">SVG on MDN</text>
  </a>
</svg>
```

<svg width="140" height="30" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <a xlink:href="https://developer.mozilla.org/en-US/docs/SVG" target="_blank">
    <rect height="30" width="120" y="0" x="0" rx="15"/>
    <text fill="white" text-anchor="middle" y="21" x="60">SVG on MDN</text>
  </a>
</svg>

---

## title

La balise `title` permet d'ajouter une infobulle - du texte qui est affiché quand la souris passe sur l'élément parent.

``` html
<rect x="5" y="5" width="25" height="50" fill="white">
  <title>Hello World</title>
</rect>
```

<svg width="100" height="100" style="background: black">
    <rect x="5" y="5" width="25" height="50" fill="white">
      <title>Hello World</title>
    </rect>
</svg>

## desc

La balise `desc` permet d'ajouter une description à tout élément composant le SVG.  
Cela permet d'améliorer l'accessibilité de l'image.

``` html
<svg width="100" height="100">
  <g>
    <title>Company sales by region</title>
    <desc>
      This is a bar chart which shows 
      company sales by region.
    </desc>
    <!-- Bar chart defined as vector data -->
  </g>
</svg>
```

## metadata

La balise `metadata` permet d'ajouter des données structurées au SVG, qui peuvent être utilisée par une application.  
Le contenu de l'élément `metadata` provient d'un autre namespace XML, tel que RDF, FOAF, etc.

``` html
<svg width="100" height="100">
  <metadata>
    <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
             xmlns:connect="http://www.w3.org/1999/08/29-svg-connections-in-RDF#">
      <rdf:Description about="#CableA">
        <connect:ends rdf:resource="#socket1"/>
        <connect:ends rdf:resource="#ComputerA"/>
      </rdf:Description>
      <rdf:Description about="#CableB">
        <connect:ends rdf:resource="#socket2"/>
        <connect:ends rdf:resource="#ComputerB"/>
      </rdf:Description>
      <rdf:Description about="#CableN">
        <connect:ends rdf:resource="#socket5"/>
        <connect:ends>Everything</connect:ends>
      </rdf:Description>
      <rdf:Description about="#Hub">
        <connect:ends rdf:resource="#socket1"/>
        <connect:ends rdf:resource="#socket2"/>
        <connect:ends rdf:resource="#socket3"/>
        <connect:ends rdf:resource="#socket4"/>
        <connect:ends rdf:resource="#socket5"/>
      </rdf:Description>
    </rdf:RDF>
  </metadata>
  <title id="mainTitle">Network</title>
  <desc>An example of a computer network based on a hub</desc>
  <!-- Network schema -->
</svg>
```

---

## style

Différents [attributs](#les-attributs) peuvent être ajoutés pour modifier la mise en forme: couleur du fond, de la bordure, épaisseur du trait, etc.

``` html
<rect x="10" y="10" width="50" height="50" fill="black" />
```

Ces attributs peuvent être définis via des règles CSS — alors que les attributs propres aux formes, tels que `x` et `y`, non.  
Consulter les specs pour la [liste complète des attributs](https://www.w3.org/TR/SVG/propidx.html).  
On peut définir le CSS

* en ligne

  ``` html
  <rect x="10" y="10" width="50" height="50" style="fill: black" />
  ```

* dans une balise `<style>` placée dans la section `<defs>` du SVG

  ``` xml
  <?xml version="1.0" standalone="no"?>
  <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" version="1.1">
    <defs>
      <style type="text/css"><![CDATA[
         #MyRect {
           stroke: black;
           fill: black;
         }
      ]]></style>
    </defs>
    <rect x="10" y="10" width="50" height="50" id="MyRect" />
  </svg>
  ```

* dans un fichier externe importé avec la syntaxe XML pour les stylesheets

  ``` xml
  <?xml version="1.0" standalone="no"?>
  <?xml-stylesheet type="text/css" href="style.css"?>

  <svg width="200" height="150" xmlns="http://www.w3.org/2000/svg" version="1.1">
    <rect height="10" width="10" id="MyRect"/>
  </svg>
  ```

* ou encore en dehors du fichier SVG, dans la page HTML qui inclut le SVG

---

## script

De la même manière qu'en HTML, il est possible d'utiliser les attributs `on...` pour détecter les événements et déclencher des actions et la balise `script` pour définir des fonctions JavaSript.

``` html
<svg width="100" height="100" viewBox="0 0 100 100"
     xmlns="http://www.w3.org/2000/svg">
  <script type="text/javascript">
    // <![CDATA[
    function change(evt) {
      var target = evt.target;
      var radius = target.getAttribute("r");

      if (radius == 15) {
        radius = 45;
      } else {
        radius = 15;
      }

      target.setAttribute("r",radius);
   }
   // ]]>
  </script>

  <circle cx="50" cy="50" r="45" fill="green"
          onclick="change(evt)" />
</svg>
```

<svg width="100" height="100" viewBox="0 0 100 100"
     xmlns="http://www.w3.org/2000/svg">
  <script type="text/javascript">
    // <![CDATA[
    function change(evt) {
      var target = evt.target;
      var radius = target.getAttribute("r");

      if (radius == 15) {
        radius = 45;
      } else {
        radius = 15;
      }

      target.setAttribute("r",radius);
   }
   // ]]>
  </script>
  <circle cx="50" cy="50" r="45" fill="green" onclick="change(evt)" />
</svg>

---

## switch

La balise `switch` affiche le premier élément enfant dont les attributs `requiredFeatures`, `requiredExtensions` et `systemLanguage` sont évalués à vrai. Les attributs non spécifiés valent vrai, ainsi un élément sans aucun attribut sera forcemment affiché si aucun élément n'a été affiché avant lui (revient à définir une valeur par défaut).

L'exemple suivant affiche un texte différent suivant les paramètres de langue du navigateur, ou affiche un emoji si la langue de l'utilisateur n'est pas dans la liste:

``` html
 <switch>
    <text systemLanguage="ar">مرحبا</text>
    <text systemLanguage="de,nl">Hallo!</text>
    <text systemLanguage="en">Hello!</text>
    <text systemLanguage="en-us">Howdy!</text>
    <text systemLanguage="en-gb">Wotcha!</text>
    <text systemLanguage="en-au">G'day!</text>
    <text systemLanguage="es">Hola!</text>
    <text systemLanguage="fr">Bonjour!</text>
    <text systemLanguage="ja">こんにちは</text>
    <text systemLanguage="ru">Привет!</text>
    <text>☺</text>
 </switch>
 ```

<svg width="100" viewBox="-10 -30 100 100" style="background: lightgrey">
   <switch>
      <text systemLanguage="ar">مرحبا</text>
      <text systemLanguage="de,nl">Hallo!</text>
      <text systemLanguage="en">Hello!</text>
      <text systemLanguage="en-us">Howdy!</text>
      <text systemLanguage="en-gb">Wotcha!</text>
      <text systemLanguage="en-au">G'day!</text>
      <text systemLanguage="es">Hola!</text>
      <text systemLanguage="fr">Bonjour!</text>
      <text systemLanguage="ja">こんにちは</text>
      <text systemLanguage="ru">Привет!</text>
      <text>☺</text>
   </switch>
</svg>