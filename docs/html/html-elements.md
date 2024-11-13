---
title: Éléments HTML
category: Web, HTML
---

## DOCTYPE

La DTD (*Document Type Definition*) est la première instruction de tout fichier HTML. Elle indique la version HTML utilisée.

<table>
  <thead>
    <tr>
      <th>Version</th>
      <th>DTD</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HTML5</td>
      <td><pre lang="html">&lt;!DOCTYPE html&gt;</pre></td>
    </tr>
    <tr>
      <td>HTML4.01 Strict</td>
      <td><pre lang="html">&lt;!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
    "http://www.w3.org/TR/html4/strict.dtd"&gt;</pre></td>
    </tr>
    <tr>
      <td>HTML4.01 Transitional</td>
      <td><pre lang="html">&lt;!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd"&gt;</pre></td>
    </tr>
    <tr>
      <td>HTML4.01 Frameset</td>
      <td><pre lang="html">&lt;!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN"
    "http://www.w3.org/TR/html4/frameset.dtd"&gt;</pre></td>
    </tr>
    <tr>
      <td>XHTML1.0 Strict</td>
      <td><pre lang="html">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"&gt;</pre></td>
    </tr>
    <tr>
      <td>XHTML1.0 Transitional</td>
      <td><pre lang="html">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"&gt;</pre></td>
    </tr>
    <tr>
      <td>XHTML1.0 Frameset</td>
      <td><pre lang="html">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd"&gt;</pre></td>
    </tr>
    <tr>
      <td>XHTML1.1</td>
      <td><pre lang="html">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
    "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"&gt;</pre></td>
    </tr>
  </tbody>
</table>

---

## html

La balise `html` est la balise racine d'un document HTML, elle englobe toutes les autres balises.

``` html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Le titre de l'onglet</title>
  </head>
  <body>
     <!-- Contenu de la page -->
     <h1>Mon titre</h1>
     <p>Mon paragraphe</p>
  </body>
</html>
```

### head

L'élément `<head>` contient les metadatas de la page  
[A free guide to HTML5 <head> elements](https://htmlhead.dev/)

### body

La balise `<body>` contient le contenu à proprement parler de la page.

---

## Metadata

### title

Définit le titre de la page. Ce titre est affiché par le navigateur en titre d'onglet et en titre de fenêtre quand l'onglet est actif.
Il est également affiché par les moteurs de recherche (Google, Yahoo, etc) et c'est le titre par défaut quand on ajoute la page dans ses bookmarks.

La balise `<title>` est unique par page.

``` html
<!DOCTYPE html>
<html>
<head>
  <title>HTML Reference</title>
</head>
...
```

### meta

Définit diverses metadata.  

* Elles sont souvent utilisées pour donner des informations aux moteurs de recherche ou réseaux sociaux (Tweeter, Facebook). 

  ``` html
  <meta name="description" content="Free Web tutorials">
  <meta name="keywords" content="HTML,CSS,XML,JavaScript">
  <meta name="author" content="John Doe">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ```

* La meta `viewport` permet de définir le comportement de la page par rapport à la taille de l'écran.  
[What is the viewport](https://www.w3schools.com/css/css_rwd_viewport.asp)

  ``` html
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  ```

* Les metas `http-equiv` permettent de définir des entêtes HTTP:

  ``` html
  <!-- Rafraichir la page toutes les 30 secondes -->
  <meta http-equiv="refresh" content="30">
  ```

* L'encodage du document peut être déclaré par l'entête http-equiv "Content-Type":

  ``` html
  <!-- HTML4 -->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  ```

  Ou en HTML5, il existe une manière simplifiée de déclarer l'encodage du document:

  ``` html
  <!-- HTML5 -->
  <meta charset="UTF-8">
  ```

### base

Définit l'URL de base ainsi que la cible par défaut pour les liens de la page.  
Si non spécifiée, l'URL de base de la page est l'URL en cours.

``` html
<head>
  <base href="https://www.w3schools.com/images/" target="_blank">
</head>
<body>
  <img src="stickman.gif" width="24" height="39" alt="Stickman">
</body> 
```

### style

Permet d'ajouter du code CSS dans la page (embedded style).

``` html
<style>
  h1 { color:red; }
  p { color:blue; }
</style>
```

### link

Permet de charger des ressources externes, comme des feuilles de style (CSS situé dans un fichier externe et non dans une balise style) ou une favicon (icône affichée par le navigateur devant le titre de l'onglet).

``` html
<link rel="icon" href="favicon.ico">
<link rel="stylesheet" type="text/css" href="theme.css">
<link rel="stylesheet" type="text/css" href="print.css" media="print">
```

* Les ressources inclues peuvent être limités à un type de media donné, par exemple `media="print"` cible les imprimantes, ce qui permet notamment d'inclure une feuille de style d'impression.

* En HTML5, il n'est pas nécessaire de préciser le type pour une feuille de style (`type="text/css"`) — ce qui était auparavant obligatoire

* L'attribut `rel` spécifie le type de ressource à charger.  
  [Valeurs de l'attribut rel](https://www.w3schools.com/tags/att_link_rel.asp)

  `rel="prefetch"` permet de charger des pages avant que l'utilisateur ne les demande. Il est souvent possible de "deviner" la prochaine page que l'utilisateur voudra afficher: par exemple si l'utilisateur consulte la 2ème page d'une liste d'articles, il est très probable qu'il veuille afficher la 3ème après. On peut également précharger des images.  
  Pré-charger les ressources permet de les afficher plus rapidement lorsque l'utilisateur les demande. Bien évidemment, il ne faut pas non surcharger le navigateur en requêtant trop de pages, ce qui le ralentirait.

  ``` html
  <link rel="prefetch" href="http://www.example.com/">
  ```

### script

Permet d'ajouter un script dans la page, notamment du code JavaScript ou WebGL (embedded style).  

``` html
<script type="text/javascript">
  window.onload = function(){
    alert("Hello World");
  };
</script>
```

* En HTML5, le type par défaut est JavaScript, il n'est donc pas obligatoire de spécifier `type="text/javascript"` — ce qui était auparavant obligatoire.  
  L'attribut type est uniquement nécessaire pour déclarer des bouts de texte qu'on pourra charger dans une variable JS ultérieurement (grâce à l'id) — comme pour du WebGL ou des templates.

  ``` html
  <script type="text/template" id="articlestpl">
      {{#articles}}                       # For each articles
          <div class="article">
              <h1>{{title}}</h1>          # Display the title attribute
              <p>{{description}}</p>
          </div>
      {{/articles}}
  </script>
  ```

  ``` html
  <script id="shader-fs" type="x-shader/x-fragment">
    #ifdef GL_ES
    precision highp float;
    #endif

    void main(void) {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  </script>
  ```

* La balise script peut aussi importer des scripts externes, avec l'attribut `src`.

  ``` html
  <script type="text/javascript" src="myscripts.js"></script>
  ```

* L'attribut `defer="true"` indique au navigateur de n'importer le script qu'une fois la page totalement chargée.  
  L'attribut `async` permet de charger le script de manière asynchrone pendant le chargement de la page: les scripts suivants peuvent être chargés sans attendre que celui-ci n'ai fini d'être chargé

  ``` html
  <!-- Google Analytics -->
  <script>
    window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
    ga('create', 'UA-XXXXX-Y', 'auto');
    ga('send', 'pageview');
  </script>
  <script async src='https://www.google-analytics.com/analytics.js'></script>
  <!-- End Google Analytics -->
  ```

* Le navigateur lit le code HTML de haut en bas: en plaçant les scripts en haut de la page, la page mettra plus de temps à s'afficher, il est donc préférable de placer les scripts à la fin du code HTML ou d'utiliser l'attribut `defer`.

### noscript

Permet d'ajouter du contenu pour les clients qui ne prennent pas en charge le JavaScript (ou qui l'ont désactivé).  
À l'intérieur de la balise `<body>`, noscript peut contenir tout type de contenu.  
À l'intérieur de la balise `<head>`, noscript ne peut contenir que des balises `<link>`, `<style>` ou `<meta>`.

``` html
<noscript>Your browser does not support JavaScript!</noscript> 
```

### template

Depuis HTML5, la balise `<template>` permet de définir un template qui ne sera pas affiché dans la page, mais qui peut être récupéré en JavaScript.

``` html
<template id="tpl-example">
  <ul class="myClass">
    <li>{{name.first}} {{name.last}}</li>
    <li>{{age}}</li>
  </ul>
</template>
```

```
var html = document.getElementById("tpl-example").innerHTML;
```

Avant HTML5, on utilisait des balises `script`:

``` html
<script type="text/template" id="tpl-example">
  ...
</script>
```

Voir [JSFiddle template](https://jsfiddle.net/amt01/wgtzahh2/).  
Note: [mustacheJS](https://github.com/janl/mustache.js/) est une librairie JS qui permet de manipuler les templates plus facilement — avec la prise en charge des conditions, boucles, etc

---

## Élements blocs

### Headings: h1 à h6

Les balises de `<h1>` à `<h6>` sont des balises titre qui servent à hiérarchiser le contenu.  
Il ne doit y avoir qu'une balise `<h1>` par page (le titre principal), qui peut être suivie de balises `<h2>` (sections), suivies de balises `<h3>` (sous-sections), et ainsi de suite.
Il est important de respecter l'ordre numérique des titres, de sorte qu'un robot puisque construire une table des matières qui ait du sens.

``` html
<body>
  <h1>My website</h1>
  <h2>Heading</h2>
    <p>Paragraph about heading</p>

    <h3>Subheading</h3>
    <p>Paragraph about subheading</p>

  <h2>Heading #2</h2>
  <p>Paragraph about heading #2</p>
</body>
```

### p

Les éléments `<p>` délimitent un paragraphe.

``` html
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor id velit id lacinia. Duis interdum
augue vel mi facilisis, at convallis ligula pretium. Mauris nisi lorem, rutrum sed ante in, interdum faucibus
ligula.</p>

<p>Morbi libero mi, sodales sed venenatis at, suscipit id tortor. Fusce elementum orci dapibus est aliquet
pulvinar. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam
non interdum urna. Suspendisse potenti.</p>
```

### pre

Les éléments `<pre>` (*preformatted text*) délimitent un paragraphe préformatté.  
Particulièrement utilisés pour ajouter des lignes de code.

``` html
<pre lang="c">
#include "ruby/ruby.h"

static int
clone_method_i(st_data_t key, st_data_t value, st_data_t data)
{
    clone_method((VALUE)data, (ID)key, (const rb_method_entry_t *)value);
    return ST_CONTINUE;
}
</pre>
```

### div

Les éléments `<div>` délimitent une division.  
Ils sont utilisés pour grouper des éléments dans un bloc, ce qui permet notamment de leur donner le même style CSS.

``` html
<div class="summary">
  <h2>Sommaire</h2>
  <ol>
    <li>Heading
      <ol>
        <li>Subheading</li>
      </ol>
    </li>
    <li>Heading #2</li>
  </ol>
</div>
```

### hr

Un `<hr>` (*horizontal rule*) est un séparateur qui permet de délimiter deux thèmes différents.

``` html
 <h1>HTML</h1>
<p>HTML is a language for describing web pages.....</p>

<hr>

<h1>CSS</h1>
<p>CSS defines how to display HTML elements.....</p> 
```

### blockquote

Une `<blockquote>` délimite une citation.  
Les `<blockquote>` peuvent être imbriqués, par exemple pour afficher un historique email.

```  html
<p>Here is a quote from WWF's website:</p>

<blockquote cite="http://www.worldwildlife.org/who/index.html">
For 50 years, WWF has been protecting the future of nature. The world's leading conservation organization,
WWF works in 100 countries and is supported by 1.2 million members in the United States and close to 5
million globally.
</blockquote>
```

### address

Délimite les informations de contact d'une personne, d'un groupe ou d'une organisation: adresse, email, etc.  
Par exemple pour l'auteur d'un article ou pour une entreprise:

``` html
<address>
  Vous pouvez contacter l'auteur à l'adresse
  <a href="http://www.undomaine.com/contact">www.undomaine.com</a>.<br>
  Si vous relevez des bugs, merci de contacter
  <a href="mailto:webmaster@somedomain.com">le webmaster</a>.<br>
  Vous pouvez aussi venir nous voir :<br>
  Mozilla Foundation<br>
  1981 Landings Drive<br>
  Building K<br>
  Mountain View, CA 94043-0801<br>
  USA
</address>
```

### details, summary

L'élément `<details>` permet d'ajouter du contenu additionnel que l'utilisateur peut afficher ou masquer.  
L'élément `<summary>` permet d'ajouter un titre qui sera toujours visible pour afficher ou masquer le contenu qui suit.

``` html
<details>
  <summary>System Requirements</summary>
  <p>Requires a computer running an operating system. The computer
  must have some memory and ideally some kind of long-term storage.
  An input device as well as some form of output device is
  recommended.</p>
</details>
```

### progress

Permet d'afficher une barre de progrès

``` html
<progress value="22" max="100"></progress> 
```

---

## Éléments en ligne

### br

Un `<br>` (*break*) permet d'ajouter un retour à la ligne entre deux éléments ou à l'intérieur d'un bloc de texte.

``` html
<img src="img1.png">
<br>
<img src="img2.png">
```

### wbr

Un `<wbr>` (*word break opportunity*) spécifie un droit où un retour à la ligne peut être ajouté à l'intérieur d'un mot.

``` html
<p>http://voici<wbr>.une<wbr>.très<wbr>.très<wbr>.longue<wbr>.URL<wbr>.com/</p>
```

### span

Les éléments `<span>` délimitent des éléments en ligne. Ils permettent d'appliquer du CSS sur une portion de texte spécifique.

``` html
<ol>
  <li>
    <span>Heading</span>
    <ol>
      <li><span>Subheading</span></li>
    </ol>
  </li>
  <li>
    <span>Heading #2</span>
  </li>
</ol>
```

### a

Les éléments `<a>` (*ancre*) définissent des liens (hypertexte ou autre)

#### Target

Ce peut être

  * un lien vers une autre page (lien hypertexte)

    ``` html
    <a href="http://google.com">Lien vers Google</a>

    <a href="/mapage.html">Lien relatif à la racine du site en cours</a>
    <!-- http//monsite.com/path/index.html => http//monsite.com/mapage.html  -->

    <a href="mapage.html">Lien relatif à la page en cours</a>
    <!-- http//monsite.com/path/index.html => http//monsite.com/path/mapage.html  -->
    ```

  * un lien vers un élément dans la page en cours (id)  
    NB Cliquer sur un lien `#` n'aura d'effet que si l'URL choisie est différente de celle en cours (cliquer deux fois sur `#` ne marchera donc pas)

    ``` html
    <a href="#mon-titre">Lien vers l'élément d'id "mon-titre"</a>

    <a href="#">Lien vers le haut de page</a>
    ```

  * un lien vers une autre application (un protocole autre que http)

    ``` html
    <a href="mailto://contact@monsite.com">Contacter</a>

    <a href="mailto:someone@example.com
          ?cc=someoneelse@example.com
          &bcc=andsomeoneelse@example.com
          &subject=Summer%20Party
          &body=You%20are%20invited%20to%20a%20big%20summer%20party!" target="_top">Send mail!</a>

    <a href="javascript:alert('Hello World!');">Execute JavaScript</a>
    ```

#### Contenu

Un lien ne contient pas forcemment du texte, on peut y mettre n'importe quel élément.

``` html
<a href="http://google.com">
  <img src="http://placehold.it/50x50">
</a>
```

#### Attribut: target

On peut préciser où le lien doit être ouvert:
* `target="_self"`: la page en cours (par défaut)
* `target="_blank"`: un nouvel onglet
* `target="_parent"`: la page parente (lorsqu'on a ouvert une page avec `window.open`)
* `target="_top"`: la page de plus haut niveau (généralement identique à _parent)
* `target=framename`: la frame "framename"

``` html
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">
<HTML>
<HEAD>
<BODY>
  <ul>
    <li><a target="frame" href="1565926811_main.html">Main Page</a></li>
    <li><a target="frame" href="1565926811_toc.html">Table of content</a></li>
    <li><a target="frame" href="1565926811_copyright.html">Copyright</a></li>
    <li><a target="frame" href="1565926811_phpckbk-pref.html">Preface</a></li>
  </ul>
  <IFRAME name="frame" src=""></IFRAME>
</BODY>
</HTML>
```

#### Attribut: rel

Définit la relation entre la page courante et le lien. Les moteurs de recherche utilisent cet attribut pour avoir plus d'informations sur le lien et vont l'indexer ou non en conséquence.

| Valeur             | Description
|---                 |---
| `rel="bookmark"`   | Lien permanent pour les bookmarks
| `rel="external"`   | Lien vers un document externe, qui ne fait pas partie du même site
| `rel="nofollow"`   | Lien vers un document non approuvé. <br>Utilisé pour spécifier que les moteurs de recherche ne doivent pas suivre ce lien
| `rel="noreferrer"` | Le navigateur n'enverra pas l'entête HTTP Referrer si l'utilisateur suit ce lien
|                    |
| `rel="alternate"`  | Lien vers une version alternative du document (page à imprimer, traduction, mirroir)
| `rel="author"`     | Lien vers la page de l'auteur
| `rel="next"`       | Lien vers la page suivante
| `rel="prev"`       | Lien vers la page précédente
| `rel="help"`       | Lien vers la page d'aide
| `rel="license"`    | Lien vers la license (informations de copyright)
| `rel="search"`     | Lien vers la page de recherche
| `rel="tag"`        | Lien vers la définition d'un mot

### i

En HTML4, `<i>` (*italic*) était une balise de formattage — mettre en italique.  
En HTML5, cette balise a un nouveau sens: `<i>` représente une "voix alternative" — par exemple pour mettre en exergue les termes techniques, phrases idiomatiques dans une autre langue, translitération, etc

``` html
<p><i>I hope this works</i>, he thought.</p>
```

### b

En HTML4, `<b>` (*bold*) était une balise de formattage — mettre en gra.  
En HTML5, `<b>` représente un texte mis en avant — des mots clés, le nom d'un produit, un sous-titre...

``` html
<p><b>The event takes place this upcoming Saturday, and over 3,000 people have already registered</b></p>
```

### em

`<em>` (*emphasis*) indique une emphase.

``` html
<p>Make sure to sign up <em>before</em> the day of the event, September 16, 2013</p>
```

### strong

Indique un texte important.

``` html
<p>Make sure to sign up <em>before</em> the day of the event, <strong>September 16, 2013</strong></p>
```

### small

Indique un texte de moindre importance.

```
<p><small>Copyright 1999-2050 by Refsnes Data</small></p>
```

### u

En HTML4, `<u>` (*underline*) était une balise de formattage — souligner.  
En HTML5, `<u>` indique un texte *différent* du texte normal — comme un mot mal orthographié par exemple.

``` html
<p>This paragraph includes a <u class="spelling">wrnogly</u> spelled word.</p>
```

### s

En HTML4, `<s>` (*strike*) était une balise de formattage — barrer.  
En HTML5, `<s>` indique un texte qui n'est pas ou plus vrai.

``` html
<s>Today's Special: Salmon</s> SOLD OUT<br>
```

### del

`<del>` (*delete*) indique un texte supprimé ou remplacé

``` html
<p><del>This text has been deleted</del>,
here is the rest of the paragraph.</p>
```

### ins

`<ins>` (*insert*) indique un texte inséré. C'est l'inverse de la balise `<del>`.

``` html
This text has been <del>deleted</del><ins>inserted</ins>
```

### mark

Indique du texte surligné — par exemple pour un résultat de recherche.

``` html
My<mark>SQL</mark> <mark>SQL</mark> (Structure Query La...
```

### cite

Indique une référence — comme un nom d'auteur, de livre, de film, de produit, etc.

``` html
<p>More information can be found in <cite>[ISO-0000]</cite>.</p>
```

### q

`<q>` (*quote*) délimite une citation à l'intérieur d'une phrase.  
Il s'agit d'un élément en ligne, contrairement au `<blockquote>` qui est un élément en bloc.

``` html
<p>WWF's goal is to <q>build a future where people live in harmony with nature</q>. We hope they succeed.</p>
```

### code

Délimite un morceau de code informatique à l'intérieur d'une phrase.

``` html
Un <code>&lt;label&gt;</code> définit l'intitulé d'un élément de formulaire.
```

### var

Délimite une variable à l'intérieur d'une phrase.

``` html
<p>A simple equation: <var>x</var> = <var>y</var> + 2 </p>
```

### kbd

`<kbd>` (*keyboard*) délimite une entrée clavier à l'intérieur d'une phrase

``` html
<kbd>Ctrl</kbd> + <kbd>s</kbd> permet de déclencher la sauvegarde du document pour la plupart des logiciels.
```

### samp

`<samp>` (*sample*) délimite le résultat d'un programme informatique

``` html
<p>It wasn't the most helpful of error messages as it simply said: <samp>An error has occurred</samp>.</p>
```

### output

Délimite le résultat d'un calcul.

``` html
<form oninput="x.value=parseInt(a.value)+parseInt(b.value)">
  <input type="number" id="a" value="0" size="2">
  +<input type="number" id="b" value="0" size="2">
  =<output name="x" for="a b">0</output>
</form>
```

### dfn

`dfn` (*define*) délimite un terme définit.

``` html
<p>
  L'élément HTML de définition <dfn>&lt;dfn&gt;</dfn> est 
  utilisé afin d'indiquer le terme en cours de 
  définition dans la phrase.
</p>
```

### ruby, rt, rp

La balise `<ruby>` délimite un texte qui contient des annotations textuelles, placées au-dessus ou à côté de caractères logographiques (comme des caractères chinois ou kanji japonais), pour indiquer la prononciation des caractères susceptibles de ne pas être connus du lecteur.

Une balise `<ruby>` contient des balises `<rt>`, qui définissent la prononciation de caractères, et/ou `<rp>`, qui permettent d'afficher des parenthèses autour des éléments `<rt>` pour les navigateurs qui ne les supportent pas.

``` html
<ruby>
  漢 <rp>(</rp><rt>Kan</rt><rp>)</rp>
  字 <rp>(</rp><rt>ji</rt><rp>)</rp>
</ruby>
```

### sup

`<sup>` (*superscript*) délimite un exposant

``` html
<p>
  Voici la fonction exponentielle :
  e<sup>x</sup>.
</p>
```

### sub

`<sub>` (*subscript*) délimite un indice

``` html
<p>
  Selon les calculs effectués par Nakamura, Johnson et
  Mason<sub>1</sub>, cela causera l'annulation complète
  des deux particules.
</p>
```

### abbr

Délimite une abréviation ou un acronyme.

``` html
The <abbr title="World Health Organization">WHO</abbr> was founded in 1948. 
```

### time

Délimite une date et/ou une heure. Le contenu doit respecter le format `YYYY-MM-DD`, `HH:ii` ou `YYYY-MM-DD HH:ii` ou alors utiliser l'attribut `datetime`.

``` html
<p>We open at <time>10:00</time> every morning.</p>

<p>I have a date on <time datetime="2008-02-14 20:00">Valentines day</time>.</p> 
```

### meter

Affiche une gauge

``` html
<meter value="2" min="0" max="10">2 out of 10</meter>
```

![](https://i.imgur.com/o1oSdv3.png)

Accepte les attributs `low` et `high` pour indiquer les seuils au-dessous/dessus desquels la gauge est affichée en orange.

### bdo

Spécifie la direction du texte

``` html
<bdo dir="rtl">This text will go right-to-left</bdo> 
```

### bdi

Isole une partie de texte pouvant être formattée dans une direction différente que celle du texte qui l'entoure. 

Cet élément est utile lorsqu'on intègre du texte dont on ignore la directivité (qui provient d'une base de données par exemple), au sein d'un autre texte dont la direction est connue.

``` html
<ul>
  <li>User <bdi>hrefs</bdi>: 60 points</li>
  <li>User <bdi>jdoe</bdi>: 80 points</li>
  <li>User <bdi>إيان</bdi>: 90 points</li>
</ul>
```

---

## Landmarks

Les landmarks sont des éléments introduits en HTML5 qui permettent d'ajouter un sens sémantique à certaines divisions: main, section, article, aside, footer, header, nav. Ainsi `<div class="header"></div>` peut être remplacé par `<header></header>`.

Les landmarks permettent de naviguer plus facilement pour les utilisateurs avec un lecteur d'écran, et c'est une bonne pratique de les utiliser. Pour utiliser des landmarks HTML5 dans un navigateur qui ne supporte pas HTML5, il suffit (sauf pour IE&lt;10) d'ajouter du CSS:

``` css
main, section, article, aside, footer, header, nav {
  display: block;
}
```

Pour IE < 10, il est nécessaire de créer les éléments en JavaScript :

``` html
<!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
<![endif]-->
```

### main

Contient le contenu principal du site. Il n'y en a qu'un par page.  
Les éléments répétés sur les différentes pages (navigation, bannière...) sont placés en dehors

``` html
<header>
  <nav>...</nav>
</header>
<main>
  <article>...</article>
  <aside>...</aside>
</main>
<footer>
  <p>&copy; 2017.</p>
</footer>
```

### header

Contient les informations et/ou le menu de navigation de la page

``` html
<header>
  <img src="logo.png" alt="My Society logo">
  <h1>Titre principal</h1>
  <nav>...</nav>
</header>
```

On peut également placer des header dans différentes sections.

``` html
<article>
  <header>
    <h2>La planète Terre</h2>
    <p>Publié le 4 octobre 2017 par Jeanne Smith</p>
  </header>
  <p>Nous vivons sur une planète bleue et verte</p>
  <p><a href="https://example.com/the-planet-earth/">Poursuivre la lecture…</a></p>
</article>
```

### article

Délimite les éléments qui ont du sens par eux-même, qu'on pourrait mettre dans un feed RSS: article d'un blog, posts d'un forum, commentaires, etc.

``` html
<article class="film_review">
  <header>
    <h2>Jurassic Park</h2>
  </header>
  <section class="main_review">
    <p>Dinos were great!</p>
  </section>

  <section class="user_reviews">
    <article class="user_review">
      <p>Way too scary for me.</p>
      <footer><p>Posted on <time datetime="2015-05-16 19:00">May 16</time> by Lisa. </p></footer>
    </article>
    <article class="user_review">
      <p>I agree, dinos are my favorite.</p>
      <footer><p>Posted on <time datetime="2015-05-17 19:00">May 17</time> by Tom.</p></footer>
    </article>
  </section>

  <footer><p>Posted on <time datetime="2015-05-15 19:00">May 15</time> by Staff.</p></footer>
</article>
```

### section

Groupe les éléments qui ont le même thème. Par exemple:

* si l'article est un livre, chaque chapitre est une section

  ``` html
  <article class="book">
    <section class="chapter">...</section>
    <section class="chapter">...</section>
  </section>
  ```

* si l'article est un post d'un blog, la liste des articles est une section

  ``` html
  <section class="list">
    <article class="post">...</article>
    <article class="post">...</article>
  </section>
  ```

### aside

Contient des informations indirectement liées au contenu:  
glossaire, biographie, articles similaires, informations complémentaires, etc

``` html
<p>My family and I visited The Epcot center this summer.</p>
<aside>
  <h4>Epcot Center</h4>
  <p>The Epcot Center is a theme park in Disney World, Florida.</p>
</aside>
```

### footer

Placé dans la balise `<body>`, le `<footer>` contient les informations de copyright, plan du site, et tout autre information et liens qu'on trouve en bas de page.

``` html
<footer>&copy; 2018</footer>
```

On peut également trouver des footers dans différentes sections.

``` html
<article class="film_review">
  <header>
    <h2>Jurassic Park</h2>
  </header>
  <section class="main_review">
    ...
  </section>
  <footer>
    <p>Posted on <time datetime="2015-05-15 19:00">May 15</time> by Staff.</p>
  </footer>
</article>
```

### nav

Contient les liens de navigation de la page.  
Note: inutile de mettre un élément nav dans le footer, il se suffit par lui-même

``` html
<nav class="menu">
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
```

### search

Contient la barre de recherche

``` html
 <search>
  <form>
    <input name="fsrch" id="fsrch" placeholder="Search W3Schools">
  </form>
</search>
```

### hgroup

Un `<hgroup>` permet d'indiquer qu'un heading et paragraphe sont liés — un sous-titre par exemple

``` html
 <hgroup>
  <h2>Norway</h2>
  <p>The land with the midnight sun.</p>
</hgroup>
```

---

## Listes

### ol, li

La balise `<ol>` (*ordered list*) permet de créer une liste ordonnée d'item `<li>` (*list item*) — autrement dit, une liste numérotée

``` html
<ol>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ol>
```

### ul, li

La balise `<ul>` (*unordered list*) permet de créer une liste non ordonnée d'item `<li>` — autrement dit, une liste à puces

``` html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```

### dl, dt, dd

La balise `<dl>` (*definition list*) permet de créer une liste de définitions.  
Elle contient des balises `<dt>` (*definition term*) et `<dd>` (*definition description*).

``` html
 <dl>
  <dt>Coffee</dt>
  <dd>Black hot drink</dd>
  <dt>Milk</dt>
  <dd>White cold drink</dd>
</dl> 
```

---

## Tableaux

### table, tr, th, td

La balise `<table>` permet de créer des tableaux.  
Chaque ligne est déllimitée par une balise `<tr>` (*table row*).  
Chaque ligne contient des balises `<td>` (*table data*) et/ou `<th>` (*table header*) pour créer des cellules.

``` html
<table>
  <tr>
    <td>Cell A.1</td>
    <td>Cell B.1</td>
  </tr>
  <tr>
    <td>Cell A.2</td>
    <td>Cell B.2</td>
  </tr>
</table> 
```

L'attribut `colspan` permet d'étendre une cellule sur plusieurs colonnes.  
L'attribut `rowspan` permet d'étendre une cellule sur plusieurs lignes.  
[JsFiddle colspan, rowspan](https://jsfiddle.net/amt01/j1pmw0y4/)

### thead, tbody, tfoot

Un tableau peut contenir des éléments
* `<thead>`, qui contient les lignes d'entêtes
* `<tbody>`, qui contient les lignes de données (le contenu)
* et `<tfoot>`, qui contient les lignes de fin (pour ajouter une somme des données par exemple).

Si le tableau ne contient que des données (`<tbody>`), alors cette balise peut être omise.  
L'ordre HTML entre `<thead>`, `<tbody>` et `<tfoot>` n'a pas d'importance — l'entête sera affichée au début et le footer à la fin.

``` html
<table>
  <thead>
  <tr>
     <th>Month</th>
     <th>Savings</th>
  </tr>
  </thead>
  <tfoot>
  <tr>
      <td>Sum</td>
      <td>$180</td>
  </tr>
  </tfoot>
  <tbody>
  <tr>
     <td>January</td>
     <td>$100</td>
  </tr>
  <tr>
      <td>February</td>
      <td>$80</td>
  </tr>
  </tbody>
</table> 
```

### caption

Permet d'ajouter un titre à un tableau.  
La propriété CSS `caption-side` peut définir l'emplacement du titre — au-dessus ou au-dessous

``` html
<table>
  <caption>Monthly savings</caption>
  <tr>
    <th>Month</th>
    <th>Savings</th>
  </tr>
  <tr>
    <td>January</td>
    <td>$100</td>
  </tr>
</table>
```

### colgroup, col

La balise `<colgroup>` contient une suite de balises `<col>` qui permettent de définir la couleur de fond d'un ensemble de colonnes.

``` html
<table>
  <colgroup>
    <col span="2" style="background-color: lavender">
    <col style="background-color: #A59ED5">
  </colgroup>
  <tr>
    <th>ISBN</th>
    <th>Title</th>
    <th>Price</th>
  </tr>
  <tr>
    <td>3476896</td>
    <td>My first HTML</td>
    <td>$53</td>
  </tr>
</table>
```

---

## Medias

### img

Permet d'insérer des images.  
L'attribut `alt` définit un texte alternatif qui est affiché si l'image ne peut pas être chargée.  
Il est aussi utilisé par les moteurs de recherche et lecteurs d'écran.

``` html
<img src="image.png" alt="Mon chien dans le parc">
```

#### Attribut: width, hight

Les attributs `width` et `height` permettent de définir les dimensions de l'image affichée.

``` html
<img ... width="100px" height="auto">
```

#### Attribut: srcset

L'attribut `src` pointe vers une URL, qui est l'emplacement de l'image à charger.

Avec l'attribut `srcset`, il est possible de donner le choix au navigateur entre plusieurs images en fonction de la densité en pixels de l'écran.
Les anciens moniteurs ont une densité en pixel de 1, mais comme les résolutions n'ont cessé d'augmenter le pixel d'un écran n'est plus égal au pixel CSS: les images retina par exemple ont une densité de 2; et les appareils mobiles ont une densité encore supérieure, 3 ou même 4 (Samsung Galaxy S8+).
On peut ainsi choisir de servir une image différente, d'une résolution supérieure pour ces appareils. Si le srcset est spécifié, et supporté par le navigateur, alors l'attribut `src` est ignoré.

``` html
<img srcset="image_1x.jpg 1x,
             image_2x.jpg 2x"
 src="image_1x.jpg"/>
```

L'attribut `srcset` accepte également des dimensions `w`, un équivalent du pixel CSS.

``` html
<img
 srcset="image-sm.jpg 600w,
         image-md.jpg 900w,
         image-lg.jpg 1440w"
 src="image_1x.jpg"/>
```

#### Attribut: sizes

Compte tenu que les images sont chargées avant le CSS, on spécifie avec l'attribut `sizes` la taille du container de l'image — pour que le navigateur puisse choisir l'image qui convient le mieux.

``` html
<img
 srcset="image-sm.jpg 600w,
         image-md.jpg 900w,
         image-lg.jpg 1440w"
 sizes="50vw"
 src="image_1x.jpg"/>
```

Des media queries peuvent également être utilisées

``` html
<img
 srcset="image-sm.jpg 600w,
         image-md.jpg 900w,
         image-lg.jpg 1440w"
 size="(max-width: 600px) 100vw, 50vw"
 src="image_1x.jpg" />
```

### picture

Définit un container pour plusieurs images. Peut contenir des éléments `<img>` ou `<source>`

``` html
<picture>
 <source srcset="image.webp" type="image/webp" >
 <img src="image.jpg" type="image/jpeg" alt="image description">
</picture>
```

### source

L'élément `<source>` permet de spécifier de multiples ressources pour les éléments media comme `<video>`, `<audio>` ou `<picture>`.
Ça permet au navigateur de choisir parmi une liste la ressource en fonction des types / codecs supportés ou encore de media queries.

``` html
<picture>
  <source media="(min-width: 900px)" srcset="image-lg.webp" type="image/webp">
  <source media="(min-width: 600px)" srcset="image-md.webp" type="image/webp">
  <source srcset="image-sm.webp" type="image/webp">
  <img src="image-lg.jpg" type="image/jpeg" alt="image description">
</picture>
```

Tout comme `<img>`, `<source>` accepte les attributs `src`, `srcset`, `sizes`.

### object, param

Permet d'importer un media à l'intérieur d'une page, comme par exemple des PDF, SVG, SWF, etc.  
[Liste des types MIME media](https://www.iana.org/assignments/media-types/media-types.xhtml)

``` html
<object data="helloworld.swf" type="application/vnd.adobe.flash-movie" width="400" height="400"></object> 
```

Des paramètres peuvent être passés au media via les balises `<param>`.

``` html
<object data="horse.wav">
  <param name="autoplay" value="true">
</object> 
```

### audio

Permet d'inclure un lecteur audio pour lire des fichiers audio mp3, wav ou ogg.  
Le fichier à lire peut être donné via l'attribut `src` ou via une liste d'élements `<source>`.

``` html
<audio src="sound.mp3"></audio>
```
``` html
<audio>
  <source src="horse.ogg" type="audio/ogg">
  <source src="horse.mp3" type="audio/mpeg">
  Your browser does not support the audio tag.
</audio> 
```

Si l'attribut `controls` est spécifié, le navigateur affichera et gerera les contrôles du lecteur audio (play/pause, etc).  
Autrement, ils peuvent également être gérés manuellement en JavaScript.

``` html
<audio controls src="sound.mp3"></audio>
```
``` html
<audio id="player" src="sound.mp3"></audio>
<div>
    <button onclick="document.getElementById('player').play()">Play</button>
    <button onclick="document.getElementById('player').pause()">Pause</button>
    <button onclick="document.getElementById('player').volume+=0.1">Volume Up</button>
    <button onclick="document.getElementById('player').volume-=0.1">Volume Down</button>
</div> 
```

Autres attributs
* `autoplay`: l'audio doit commencer à jouer dès qu'il est chargé
* `loop`: l'audio doit redémarrer au début quand il arrive à la fin
* `muted`: l'audio est en silencieux
* `preload`: l'audio doit être chargé pendant le chargement de la page

### video

Permet d'inclure un lecteur vidéo pour lire des fichiers mp4, webm ou ogg.  
Pour les navigateurs ne supportant pas HTML5, un fallback Flash peut être ajouté.

``` html
<video width="640" height="360" controls>
    <source src="__VIDEO__.MP4" type="video/mp4">
    <source src="__VIDEO__.OGV" type="video/ogg">

    <!-- Fallback Flash -->
    <object width="640" height="360" type="application/x-shockwave-flash" data="__FLASH__.SWF">
        <param name="movie" value="__FLASH__.SWF" />
        <param name="flashvars" value="controlbar=over&amp;image=__POSTER__.JPG&amp;file=__VIDEO__.MP4">
        <img src="__VIDEO__.JPG" width="640" height="360" alt="__TITLE__"
             title="No video playback capabilities, please download the video below">
    </object>
</video>
```

L'attribut `poster` permet d'afficher une vignette en attendant que la vidéo ait chargé.  
Pour le reste, `<video>` accepte les mêmes attributs que `<audio>`.

[Evenements HTML5 video player](https://codepen.io/a-mt/pen/XaRZyX)

### track

Permet d'ajouter des sous-titres pour une vidéo ou un élément audio.

``` html
<video width="320" height="240" controls>
  <source src="forrest_gump.mp4" type="video/mp4">
  <source src="forrest_gump.ogg" type="video/ogg">
  <track src="subtitles_en.vtt" kind="subtitles" srclang="en" label="English">
  <track src="subtitles_no.vtt" kind="subtitles" srclang="no" label="Norwegian">
</video>
```

L'attribut `kind` accepte pour valeur `captions`, `chapters`, `descriptions`, `metadata` ou `subtitles`.

### figure, figcation

Un élément `<figcaption>` permet de spécifier le titre d'un media (audio, vidéo ou image) et/ou formatter l'affichage — ajouter des bordures, padding, etc. Le figcaption doit être placé dans un élément `<figure>`, qui englobe également le media avec.

``` html
<figure>
  <img src="img_pulpit.jpg" alt="The Pulpit Rock" width="304" height="228">
  <figcaption>Fig1. - A view of the pulpit rock in Norway.</figcaption>
</figure> 
```

### map, area

Définit des éléments cliquable sur une image.  
Pour faire le lien entre les deux éléments: l'attribut `usemap` de l'img fait référence à l'attribut `name` de la map.

``` html
<img src="planets.gif" width="145" height="126" alt="Planets" usemap="#planetmap">

<map name="planetmap">
  <area shape="rect" coords="0,0,82,126" href="sun.htm" alt="Sun">
  <area shape="circle" coords="90,58,3" href="mercur.htm" alt="Mercury">
  <area shape="circle" coords="124,58,8" href="venus.htm" alt="Venus">
</map> 
```

### embed

Permet d'inclure un plugin à l'intérieur de la page.  
Note: la plupart des navigateurs ont déprécié voire retiré la prise en charge des plugins.

``` html
<embed type="video/quicktime" src="film.mov" width="640" height="480">
```

### svg

Container pour les SVG (*Scalable Vector Graphics*).

``` html
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
</svg>
```

Un svg peut aussi être importé à partir d'un fichier .svg via une balise img. Lorsque le svg est inclut dans la page de cette manière, on ne peut pas interragir avec le contenu (il n'y a pas de hover) ou modifier les valeurs des propriétés avec du CSS

``` html
<img src="img.svg" height="100" width="100">
```

Pour conserver les interractions (hover), on peut importer un svg à partir d'un fichier via une balise object

``` html
<object data="your.svg" type="image/svg+xml"></object>
```

### canvas

Container utilisé pour dessiner des images via du JavaScript. Utilisé pour créer des mini-jeux HTML5.

``` html
<canvas id="myCanvas" width="200" height="100"></canvas> 
```

Pour créer une ligne dans un canvas, en JavaScript: 

``` js
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.moveTo(0,0);
ctx.lineTo(200,100);
ctx.stroke(); 
```

[Exemple roguelike avec canvas](https://codepen.io/a-mt/project/full/XExnwj/)

### mathml

MathML est un language basé sur XML qui permet l'affichage de formules mathématiques. Il ne fait pas partie intégrante du langage HTML, mais peut être inclut dans une page comme si c'était le cas.  
Peu utilisé puisque très verbeux par rapport à d'autres alternatives, comme le Latex

``` html
<math>
  <mrow>
    <mi>x</mi>
    <mo>=</mo>
    <mfrac>
      <mrow>
        <mrow>
          <mo>-</mo>
          <mi>b</mi>
        </mrow>
        <mo>&PlusMinus;</mo>
        <msqrt>
          <mrow>
            <msup>
              <mi>b</mi>
              <mn>2</mn>
            </msup>
            <mo>-</mo>
            <mrow>
              <mn>4</mn>
              <mo>&InvisibleTimes;</mo>
              <mi>a</mi>
              <mo>&InvisibleTimes;</mo>
              <mi>c</mi>
            </mrow>
          </mrow>
        </msqrt>
      </mrow>
      <mrow>
        <mn>2</mn>
        <mo>&InvisibleTimes;</mo>
        <mi>a</mi>
      </mrow>
    </mfrac>
  </mrow>
</math>
```

Équivalent en Latex:

``` latex
x = \frac {-b \pm \sqrt{b^2 - 4ac}}{2a}
```

Rendu:

![](https://i.imgur.com/jOyKrQKt.png)

### iframe

Permet d'inclure une page à l'intérieur de la page en cours. Par exemple pour inclure Google Maps.

``` html
<iframe id="Example2"
    name="Example2"
    title="Example2"
    width="400"
    height="300"
    src="https://maps.google.com/maps?f=q
      &amp;source=s_q
      &amp;hl=es-419
      &amp;geocode=
      &amp;q=buenos+aires
      &amp;sll=37.0625,-95.677068
      &amp;sspn=38.638819,80.859375
      &amp;t=h
      &amp;ie=UTF8
      &amp;hq=
      &amp;hnear=Buenos+Aires,+Argentina
      &amp;z=11
      &amp;ll=-34.603723,-58.381593
      &amp;output=embed">
</iframe>
```

* L'attribut `srcodic` permet de définir le contenu de l'iframe

  ``` html
  <iframe srcdoc="<p>Hello world!</p>" src="demo_iframe_srcdoc.html"></iframe>
  ```

* L'attribut `allowfullscreen` autorise l'iframe à passer en plein écran
  (en utilisant `requestFullscreen()`)

* L'attribut `allowpaymentrequest` autorise l'iframe à appeler l'API Payment Request

* L'attribut `sandbox` permet d'appliquer des restrictions sur le contenu pouvant appraître dans l'iframe

  ``` html
  <!-- Appliquer toutes les restrictions -->
  <iframe src="demo_iframe_sandbox.htm" sandbox></iframe>
  ```

  ``` html
  <!-- Autoriser les scripts, autoriser le contenu de même origine que le parent -->
  <iframe src="demo_iframe_sandbox_origin.htm" sandbox="allow-same-origin allow-scripts"></iframe> 
  ```

  | Valeur                   | Description
  |---                       |---
  | `allow-forms`            | Autorise les formulaires (faux par défaut)
  | `allow-modals`           | Peut ouvrir des modales
  | `allow-orientation-lock` | Peut désactiver le verouillage de l'orientation de l'écran
  | `allow-pointer-lock`     | Peut utliser l'API Pointer Lock
  | `allow-popup`            | Peut ouvrir des fenêtes (avec `window.open`, `target="_blank"` ou `showModalDialog`)
  | `allow-popups-to-escape-sandbox` | Permet d'ouvrir de nouvelles fenêtres en dehors de l'iframe
  | `allow-presentation`     |  Permet à l'iframede démarrer une présentation
  | `allow-same-origin`      | Permet au contenu d'être considéré comme étant de la même origine que le contexte parent
  | `allow-scripts`         | Peut exécuter des scripts
  | `allow-top-navigation`  | Peut charger du contenu depuis le contexte de navigation de plus haut niveau
  | `allow-top-navigation-by-user-activation` | Peut charger u contenu depuis le contexte de navigation de plus haut niveau si l'action provient de l'utilisateur

---

## Formulaires

### form

Un élément `<form>` permet de créer un formulaire, contenant des champs que l'utillisateur doit remplir. Une fois le formulaire soumis (avec un bouton submit), les données sont envoyées au serveur, qui peut alors les récupérer, les enregistrer, etc.

* `method` définit la méthode HTTP utilisée pour envoyer les données au serveur  
  - GET (par défaut): paramètres visibles dans l'url, du style `?param1=value&param2=value2`
  - POST: paramètres visibles uniquement dans la partie POST de la requête HTTP

  ``` html
  <form method="post">
  ```

* L'attribut `action` définit l'url où envoyer le formulaire (url en cours si non précisé).

  ``` html
  <form action="/action_page.php" method="get">
    First name: <input type="text" name="fname"><br>
    Last name: <input type="text" name="lname"><br>
    <input type="submit" value="Submit">
  </form> 
  ```

* L'attribut `enctype` spécifie la manière dont les données doivent être encodées avant d'être envoyées au serveur: urlencoded (par défaut) ou multipart — pour pouvoir envoyer des fichiers (POST uniquement).

  ``` html
  <form action="/submit_file.php" method="post" enctype="multipart/form-data">
    Fichier: <input type="file" name="myfile"><br>
    <input type="submit" value="Submit">
  </form>
  ```

* L'attribut `autocomplete` spécifie si l'autocomplete est activé pour les champs du formulaire (suggestions de remplissage du champs avec les valeurs précedemment rentrées par l'utilisateur, qui sont enregistrées dans le cache du navigateur client).

  ``` html
  <form autocomplete="off">
  ```

### input

Un élément `<input>` permet de créer un champs.  
Les attributs suivants sont acceptés sur tout type d'input:
* `autocomplete`: accepter l'autocomplete ou non
* `autofocus`: l'input prend automatiquement le focus une fois la page chargée
* `disabled`: désactive l'input (le rend inutilisable et non cliquable)
* `readonly`: lecture seule, la valeur de l'input ne peut pas être modifiée (lue et copiée uniquement)
* `required`: rend le champs obligatoire (le formulaire ne peut pas être soumis si le champs est vide)
* `pattern`: spécifie une regexp que la valeur doit valider (le formulaire ne peut pas être soumis si la valeur n'est pas correcte)
* `maxlength`: définit la longueur maximale de la valeur
* `size`: définit la taille de l'input (largeur affichée)
* `placeholder`: valeur affichée (en couleur claire) lorsque l'input est vide
* `list`: associe un `<datalist>` à l'input
* `type`: définit le type de l'input
* `value`: définit la valeur initiale de l'input
* `name`: définit le nom du paramètre (récupéré par le serveur)

#### Attribut: type

Il existe différents type de champs:

<table>
  <thead>
    <tr>
      <th>Type</th>
      <th>Description</th>
      <th>Attributs extra</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>text</code></td>
      <td>Champs texte</td>
      <td> </td>
    </tr>
    <tr>
      <td><code>password</code></td>
      <td>Champs texte caché (mot de passe)</td>
      <td> </td>
    </tr>
    <tr>
      <td><code>hidden</code></td>
      <td>Champs invisible pour l’utilisateur</td>
      <td> </td>
    </tr>
    <tr>
      <td><code>checkbox</code></td>
      <td>Case à cocher</td>
      <td>checked</td>
    </tr>
    <tr>
      <td><code>radio</code></td>
      <td>Case à sélectionner parmis plusieurs choix (un seul choix possible)</td>
      <td>checked</td>
    </tr>
    <tr>
      <td><code>file</code></td>
      <td>Envoi de fichier</td>
      <td>accept, multiple</td>
    </tr>
    <tr>
      <td><code>submit</code></td>
      <td>Envoi du formulaire</td>
      <td> </td>
    </tr>
    <tr>
      <td colspan="3"></td>
    </tr>
    <tr>
      <td><code>button</code></td>
      <td>S’affiche comme un input submit mais ne provoque pas l’envoi du formulaire</td>
      <td> </td>
    </tr>
    <tr>
      <td><code>color</code></td>
      <td>Champs couleur</td>
      <td> </td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>Champs texte qui doit contenir un email valide</td>
      <td>multiple</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>Champs texte qui doit contenir une url valide</td>
      <td> </td>
    </tr>
    <tr>
      <td><code>search</code></td>
      <td>Champs texte utilisé pour rechercher du contenu</td>
      <td> </td>
    </tr>
    <tr>
      <td><code>image</code></td>
      <td>Envoi de fichier image (avec prévisualisation)</td>
      <td>alt, src, height, width</td>
    </tr>
    <tr>
      <td><code>reset</code></td>
      <td>Efface les champs du formulaire (remet à la valeur initiale)</td>
      <td> </td>
    </tr>
    <tr>
      <td colspan="3"></td>
    </tr>
    <tr>
      <td><code>number</code></td>
      <td>Champs numérique</td>
      <td>min, max, step</td>
    </tr>
    <tr>
      <td><code>range</code></td>
      <td>Champs numérique (entier) entre deux bornes</td>
      <td>min, max</td>
    </tr>
    <tr>
      <td><code>date</code></td>
      <td>Champs date (jj/mm/aaaa)</td>
      <td>min, max</td>
    </tr>
    <tr>
      <td><code>time</code></td>
      <td>Champs time (hh:ii)</td>
      <td>min, max</td>
    </tr>
    <tr>
      <td><code>datetime-local</code></td>
      <td>Champs date + time (jj/mm/aaaa, hh:ii)</td>
      <td>min, max</td>
    </tr>
    <tr>
      <td><code>week</code></td>
      <td>Champs semaine (Week W, aaaa)</td>
      <td>min, max</td>
    </tr>
    <tr>
      <td><code>month</code></td>
      <td>Champs mois (B, aaaa)</td>
      <td>min, max</td>
    </tr>
  </tbody>
</table>

![](https://i.imgur.com/rWAkWJM.png)

[JSFiddle input type](https://jsfiddle.net/amt01/2qLrhhnm/)

#### Attribut: pattern

Avant HTML5, JavaScript devait être utilisé pour valider les valeurs d'un formulaire.  
L'attribut `pattern` rend la validation native pour les navigateurs qui supportent HTML5.

Pour valider une adresse email:

``` html
<input type="email"
   required pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
   title="email">
```

Pour valider un mot de passe fort:

``` html
<input type="password"
    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required
    title="at least eight symbols containing at least one number, one lower, and one upper letter">
```

Pour déclencher la validation HTML5 en JavaScript:

``` js
// Validation HTML5
if(!this.checkValidity()) {
  $('*[name]', this).each(function(){
    if(!this.validity.valid) {

      this.reportValidity();
      $(this).focus();

      return false; // break
    }
  });
  return false;
}
```

### datalist

L'élément `<datalist>` permet de créer une liste de données pour compléter automatiquement un champs de saisie. L'attribut `list` lie un `<input>` et un `<datalist>`.

``` html
<input name="frameworks" list="frameworks" />

<datalist id="frameworks">
    <option value="MooTools">
    <option value="Moobile">
    <option value="Dojo Toolkit">
    <option value="jQuery">
    <option value="YUI">
</datalist>
```

### button

Un `<button>` est un élément cliquable qui permet de déclencher une action au sein de la page: supprimer un élément, ouvrir une popup, etc.

``` html
<button class="delete">Supprimer</button>
```

* Contrairement à un `<input type="submit" />`, un `<button>` peut contenir tout type de contenu — notamment des icônes.

* Un élément button peut avoir un `type="submit"` (par défaut) ou `type="button"`.  
  Un clic sur un élément button de type "submit" provoque l'envoi du formulaire dans lequel il se trouve, contrairement au type "button".

* L'attribut `disabled` est accepté.

### select, optgroup, option

L'élément `<select>` permet de créer une liste déroulante d'`<option>`.  
Les `<option>` peuvent, ou non, faire partie d'un groupe `<optgroup>`.

``` html
<select name="car">
  <optgroup label="Swedish Cars">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
  </optgroup>
  <optgroup label="German Cars">
    <option value="mercedes">Mercedes</option>
    <option value="audi">Audi</option>
  </optgroup>
</select>
```

Un `<option>` peut également avoir pour attribut `disabled` et/ou `selected`.

### textarea

Un `<textarea>` permet de créer un champs texte multiligne.  
L'attribut `rows` spécifie le nombre de ligne visible et `cols` le nombre de caractères visibles horizontalement.  
Accepte également `autofocus`, `disabled`, `maxlength`, `placeholder`, `readonly` et `required`.

``` html
<textarea name="mytext">Lorem ipsum dolor sit amet</textarea>
```

### label

Définit un label pour un champs de formulaire (`<input>`, `<textarea>`, `<select>`, etc).  
On lie le label au champs grâce à l'attribut `for` — cliquer sur le label donne alors le focus au champs correspondant.

``` html
<label for="myinput">Mon input
<input id="myinput">
```

### fieldset, legend

Un `<fieldset>` permet de regrouper des éléments qui vont ensemble, par exemple un ensemble de champs `radio` ou une sous-division du formulaire.
L'élément `<legend>` permet d'ajouter un titre au `<fieldset>`.

``` html
<fieldset>
  <legend>Personalia:</legend>
  <label for="name">Name:</label>
  <input id="name" type="text"><br>

  <label for="email">Email:</label>
  <input id="email" type="email"><br>

  <label for="birth">Date of birth:</label>
  <input id="birth" type="date">
</fieldset>
```

---

## Modale

### dialog

Permet d'ajouter une modale.

``` html
<dialog>
  <h2>Dialog Title</h2>
  <p>Dialog content and other stuff will go here</p>
</dialog>
```

Par défaut la modale est fermée, donc invisible, à moins d'y appliquer l'attribut `open`.

``` html
<dialog open>
```

L'attribut `open` peut être ajouté/supprimé en JavaScript en appelant les méthodes `show()` et `close()` disponible pour tout élément HTMLDialogElement.

``` js
const dialog = document.getElementById("dialog");

document.getElementById("open").addEventListener("click", () => {  
  dialog.show();
});
document.getElementById("close").addEventListener("click", () => {  
  dialog.close();
});
```
