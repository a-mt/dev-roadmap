---
title: HTML
category: Web
---

HTML (HyperText Markup Langage) est le langage de balisage utilisé pour créer des pages web. Il
- définit la structure de la page. Il va par exemple indiquer au navigateur quel texte doit être considéré comme un paragraphe et quel autre est un titre.
- peut inclure des objets extredevnes: images, sons, vidéos, etc
- peut également inclure des liens hypertextes, qui redirigent l'utilisateur vers une autre page

Pour ce faire on utilise des **balises** qui indiquent le type de l'élément et éventuellement des **attributs** qui indiquent ses propriétés.

``` html
<h1>Le titre</h1>
<p>Le paragraphe</p>
<img src="image.png">
```

La plupart des éléments HTML ont une balise ouvrante (`<h1>`) et une balise fermante (`</h1>`).  
D'autres utilisent une balise unique, dite orpheline, comme `<img src="image.png">` ou `<br>`.  
Les balises ouvrantes ou les balises orphelines peuvent contenir des attributs, qui sont parfois même obligatoires, les balises fermantes non.

HTML est un langage sémantique, il donne du sens au contenu. Il ne faut pas utiliser les différentes balises pour modifier l'affichage du contenu (marquer un texte comme titre pour l'afficher en gros par exemple) - utiliser le langage CSS.

[Validateur HTML](https://validator.w3.org/)  
[Cheatsheet](https://medium.com/level-up-web/the-mega-html5-cheatsheet-e8c479b1c521)

---

## Créer un document HTML

Pour créer une page statique HTML, il suffit de créer un document `.html`.  
Celui-ci peut être édité avec n'importe quel éditeur de texte classique, un éditeur de texte de développement permetta d'ajouter des fonctionnalités supplémentaires comme la coloration syntaxique ou l'autocomplétion.
Pour visualiser le résultat, il suffit d'ouvrir le fichier avec un navigateur (Firefox, Chrome, etc).

<ins>Structure d'un document</ins> :

Un document complet, bien formatté, contient
* un prologue (DTD) qui définit la version HTML utilisée: `<!DOCTYPE html>` pour html5
* une balise `<html>` qui englobe le contenu
* une entête `<head>` qui contient les metadonnées (pour définir l'encodage, le titre de la page, inclure du CSS, etc)
* le corps du document `<body>` qui contient le contenu affiché à l'écran

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

HTML est insensible à la casse et aux espaces / retours chariots (hormis la DTD).  
C'est une bonne pratique d'écrire en minuscule et d'indenter le code, pour plus de lisibilité.  
Des commentaires peuvent également être ajoutés, qui ne seront pas affichés par le navigateur :

``` html
<!-- Mon commentaire -->
```

---

## Versions

HTML est une des trois inventions à la base du World Wide Web, avec le Hypertext Transfer Protocol (HTTP) et les adresses web (URL). C'est un langage qui a fortemment évolué depuis son invention. Chaque nouvelle version du langage introduit de nouvelles fonctionnalités et change parfois totalement la syntaxe ou les enjeux du langage.

* HTML1  
  Le langage HTML est issu du projet SGML (Standard Generalized Markup Language, initié en 1979 par IBM et publié comme norme en 1986, la norme ISO 8879:1986). 
  HTML a été mis au point par Tim Berners-Lee, alors chercheur au CERN, à partir de 1989.
  Celui-ci annonça officiellement la création du web sur Usenet en août 1991.

* HTML2  
  Directement suite à cela, Tim Berners-Lee continua à améliorer le langage.
  Une fois les améliorations jugées suffisantes et suffisamment nombreuses, il a partagé publiquement la nouvelle "version" de son langage, le HTML2, en 1994.

* HTML3  
  Après la brêve apparition d'un HTML 3.0, qui ne vit jamais officiellement le jour, le HTML 3.2 devint le standard officiel le 14 janvier 1997. Les apports les plus marquants du HTML 3.2 étaient la standardisation des tableaux ainsi que d'un grand nombre d'éléments de présentation.

* HTML4  
  Le 18 décembre 1997, le HTML 4.0 a été publié. La version 4.0 du langage HTML standardise notamment les feuilles de style, apporte quelques modifications aux tables et aux formulaires. La version HTML 4.01, apparue le 24 décembre 1999 apporte quelques modifications mineures au HTML 4.0 et ajoute 3 variantes: Transitional, Strict et Frameset.  
  La version strict est celle recommandée par le W3C.  
  La version transitional permet l'utilisation de balises classées comme deprecated.  
  La version frameset permet l'utilisation de cadres (frames): éléménts frameset, frame, noframe.

* XHTML1  
  Afin de tirer notamment parti des atouts du XML, tout en conservant la compatibilité avec le HTML, le W3C a défini en 2000 un format XHTML1.0, qui reformule simplement HTML 4 en application de XML 1.0. Les 3 variantes HTML 4.01 existent également en XHTML 1.0.

  XHTML1.1 enrichit XHTML1.0 avec l'élément ruby permettant d'ajouter des annotations aux textes écrits dans les langues idéographiques (japonais, hébreu, chinois…).
  XHTML Basic 1.1 est un sous-ensemble simplifié, destiné à l'adaptation des contenus aux clients légers (mobiles)

* HTML5  
  En mars 2007, le W3C relance le développement de HTML, c'est le point de départ d'une nouvelle spécification HTML5.
  HTML5 simplifie notamment l'insertion de contenus audio et vidéo et améliore la sémantique (la distinction des différents contenus est meilleure que jamais).

  En janvier 2011, des divergences entre le WHATWG et le W3C conduisent à la création du HTML Living Standard. Le HTML Living Standard a pour but d'inclure le HTML5, et de le développer en permanence. On peut considérer que le W3C prend des snapshots de WHATWG à des moments donnés pour en créer des spécifications fixes:  
  HTML5 a été finalisé en octobre 2014.  
  HTML5.1 a été finalisé en novembre 2016.  
  HTML5.2 est en version de travail.  
  HTML5 a son équivalent en XHTML nommé XHTML5.

[HTML4.01, XHTML1.0 et HTML5 : quel doctype choisir](https://www.alsacreations.com/article/lire/560-dtd-doctype-html-xhtml-comment-choisir.html)

### XHTML vs HTML

Conçu initialement comme un langage simplifié par rapport au SGML, le HTML doit une part de son succès à sa tolérance syntaxique, qui en facilite à première vue l'usage : ainsi, par exemple, toutes les balises ne sont pas nécessairement fermées, l'écriture du code est indifférente à la casse, les valeurs d'attributs peuvent dans certains cas ne pas être entourées de guillemets, etc. Cependant, cette facilité apparente a son revers : le code HTML ne se prête pas aux traitements automatisés qui sont en revanche l'un des atouts des formats XML.

* En XHTML, une barre de fraction `/` est obligatoire à la fin des balises isolées, comme `<br />`, `<hr />`.  
  Il ne faut pas en mettre en HTML. Pour la compatibilité, il est conseillé de mettre un espace avant la barre de fraction.

* En XHTML, il faut toujours mettre les valeurs des attributs entre guillemets : `<input type="text" />`.  
  En HTML on peut parfois s'en passer.

* En XHTML, un attribut doit obligatoirement avoir une valeur : `<input type="text" readonly="readonly" />`.  
  En HTML, ce n'est pas requis : `<input type="text" readonly>`

* En HTML, on peut aussi bien écrire `<html>` que `<HTML>` ou `<hTmL>`.  
  XHTML lui est sensible à la casse, tout doit être en minuscules.

* En XHTML, si une balise est ouverte, il faut la refermer. Pas de `<em>` sans `</em>`.  
  En HTML on peut parfois s'en passer.

D'autre part, HTML ne peut être étendu et gagner en nouvelles fonctionnalités qu'au prix du développement et de l'intégration de nouvelles spécifications. À l'inverse, le XML est par nature un méta-format permettant de créer à volonté de nouveaux éléments.

---

## Compatibilité navigateur

Il est important de comprendre que le langage HTML est un standard, c'est-à-dire qu'il s'agit de recommandations publiées par un consortium international : le World Wide Web Consortium (W3C).

1. Aussi étoffées les spécifications soient-elles, il existe toujours une marge d'interprétation de la part des navigateurs, ce qui explique qu'une même page web puisse s'afficher différemment d'un navigateur Internet à l'autre. 

2. Il arrive parfois que certains éditeurs de logiciels ajoutent des instructions HTML propriétaires, c'est-à-dire ne faisant pas partie des spécifications du W3C.

3. Toutes les recommendations W3C ne sont pas toujours implémentées par les navigateurs, soit parce qu'elles viennent de sortir et n'ont pas encore été développées par les éditeurs de logiciel, soit parce qu'elles ne le seront jamais.

4. Une recommendation peut très bien être dépréciée par une nouvelle recommendation, il faut donc se tenir au courant des nouveautés et des changements apportés.

5. Les anciens navigateurs qui n'ont pas été mis à jour ne supportent pas les nouveautés HTML. C'est particulièrement problématique pour les logiciels qui ne se mettent pas automatiquement à jour, comme Internet Explorer < 10, pour lesquels il faudra apporter des alternatives HTML4 (si nécessaire).

---

## Entités

Le HTML possède des caractères réservés. Les signes `<` et `>` servent à créer des balises.  
Pour ajouter ces caractères à l'intérieur du texte, il faut utiliser des entités HTML - une suite de caractères précédés de `&` et suivit de `;`. Elles servent à remplacer un caractère.

Entités les plus utiles :

| Entité   | Caractère |
|---       |---        |
| `&lt;`   | `<`       |
| `&gt;`   | `>`       |
| `&amp;`  | `&`       |
| `&quot;` | `"`       |
| `&apos;` | `'`       |
| `&nbsp;` | ` `       |

On peut également afficher n'importe quel caractère en connaissant son code Unicode, décimal ou héxadécimal:  
`&bull;` (entité), `&#8226;` (décimal) ou `&#x2022;` (hexadécimal) affichent tous "&bull;".

[Amp-what.com](http://www.amp-what.com) permet de trouver le code d'un caractère.

---

## Espaces et retours chariots

HTML est insensible aux espaces et retours chariots.

<table>
<tr>
<th>HTML</th>
<td><pre lang="html"><p>Mon        paragraphe
est écrit
sur plusieurs lignes         avec des espaces
multiples</p></pre></td>
</tr>
<tr>
<th>Rendu</th>
<td><pre>Mon paragraphe est écrit sur plusieurs lignes avec des espaces multiples</pre></td>
</tr>
</table>

Pour afficher plusieurs espaces à la suite en HTML, il faut utiliser une entité: l'espace insécable `&nbsp;`.  
Pour ajouter un retour à la ligne, il faut utiliser une balise: `<br>`.

<table>
<tr>
<th>HTML</th>
<td><pre lang="html"><p>Mon&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;paragraphe<br>
est écrit<br>
sur plusieurs lignes &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;avec des espaces<br>
multiples</p></pre></td>
</tr>
<tr>
<th>Rendu</th>
<td><pre>Mon        paragraphe
est écrit
sur plusieurs lignes         avec des espaces
multiples</pre></td>
</tr>
</table>

Mais si les espaces et retours chariots d'un élément texte doivent être gardés tel que, un autre élément peut être utilisé: `<pre>` (preformatted text). Ou la propriété CSS `white-space: pre;` sur n'importe quel élément.

<table>
<tr>
<th>HTML</th>
<td><pre lang="html">&lt;pre>Mon        paragraphe
est écrit
sur plusieurs lignes         avec des espaces
multiples&lt;/pre></pre></td>
</tr>
<tr>
<th>Rendu</th>
<td><pre>Mon        paragraphe
est écrit
sur plusieurs lignes         avec des espaces
multiples</pre></td>
</tr>
</table>

---

## Attributs

Les attributs des éléments HTML peuvent ou non prendre des valeurs.  
En XHTML, les attributs sans valeurs sont interdits.

``` html
<input type="text" required>              <!-- HTML -->
<input type="text" required="required" /> <!-- XHTML -->
```

Les valeurs d'attributs peuvent être entourées de doubles ou simples quotes. Les doubles quotes sont les plus utilisées, les simples quotes ne sont généralement utilisées que lorsque la valeur contient des doubles quotes.

``` html
<p title='John "ShotGun" Nelson'></p>
<p title="John 'ShotGun' Nelson"></p>
```

Les quotes peuvent autrement être remplacées par des entitées.

``` html
<p title="John &quot;ShotGun&quot; Nelson"></p> <!-- John "ShotGun" Nelson -->
<p title='John &apos;ShotGun&apos; Nelson'></p> <!-- John 'ShotGun' Nelson -->
```

L'ordre des attributs n'a pas d'importance.  
Différents éléments acceptent différents attributs.  
Quelques attributs peuvent se placer sur tout type d'éléments: `id`, `class`, `title`, `style`, `tabindex`, `lang` et `dir`.

<table>
  <thead>
    <tr>
      <th>Attribut</th>
      <th>Description&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
      <th>Exemple</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th align="left">id</th>
      <td>Définit l'identifiant de l'élément. Un identifiant est unique par page. <br />Il peut être utilisé en CSS ou JS (sélecteur) ou comme cible pour un lien (<code>&lt;a href="#id"&gt;</code>).</td>
        <td><pre lang="html">&lt;div id="main"&gt;</pre></td>
    </tr>
    <tr>
      <th align="left">class</th>
      <td>Définit la classe de l'élément. <br />Elle peut être utilisée en CSS ou JS (sélecteur)</td>
      <td><pre lang="html">&lt;button class="btn-primary"&gt;</pre></td>
    </tr>
    <tr>
      <th align="left">title</th>
      <td>Ajoute un titre à l'élément. <br />Il est affiché en tooltip au passage de la souris sur l'élément</td>
      <td><pre lang="html">&lt;span title="Fermer"&gt;&times;&lt;/span&gt;</pre></td>
    </tr>
    <tr>
      <th align="left">style</th>
      <td>Permet d'ajouter du style CSS en ligne</td>
      <td><pre lang="html">&lt;table style="table-layout: fixed; width: 100%"&gt;</pre></td>
    </tr>
    <tr>
      <th align="left">tabindex</th>
      <td>Définit l’ordre de tabulation de l’élément.
      <br><a href="accessibilite#attribut-tabindex">Cf accessibilite</a></td>
      <td><pre lang="html">&lt;input type="text" tabindex="1"&gt;</pre></td>
    </tr>
    <tr>
      <th align="left">lang</th>
      <td>Définit la langue dans laquelle est écrite l’élément (`en`), suivit éventuellement du dialecte (`en-US`).
      <br><a href="accessibilite#attribut-lang">Cf accessibilite</a></td>
      <td><pre lang="html">&lt;html lang="en"&gt;</pre></td>
    </tr>
    <tr>
      <th align="left">dir</th>
      <td>Définit la direction du texte: de gauche à droite (ltr) ou de droite à gauche (rtl)</td>
      <td><pre lang="html"><p dir="ltr"><bdi>Student</bdi>: How do you write "What's your name?" in Arabic?</p>
<p dir="rtl"><bdi>Teacher</bdi>: ما اسمك؟</p></pre></td>
    </tr>
  </tbody>
</table>

Et depuis HTML5:

<table>
  <thead>
    <tr>
      <th>Attribut</th>
      <th>Description&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
      <th>Exemple</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th align="left">contenteditable</th>
      <td>Définit si le contenu de l’élément peut être édité</td>
      <td><pre lang="html">&lt;div contenteditable&gt;</pre></td>
    </tr>
    <tr>
      <th align="left">draggable</th>
      <td>Définit si l’élément peut être glissé (drag &amp; drop)</td>
      <td><pre lang="html">&lt;div draggable&gt;</pre></td>
    </tr>
    <tr>
      <th align="left">hidden</th>
      <td>Permet de cacher un élément (comme <code>display: none</code>)</td>
      <td><pre lang="html">&lt;main hidden&gt;</pre></td>
    </tr>
    <tr>
      <th align="left">spellcheck</th>
      <td>Définit si le correcteur orthographique doit être affiché ou non</td>
      <td><pre lang="html">&lt;textarea spellcheck&gt;</pre></td>
    </tr>
    <tr>
      <th align="left">data-*</th>
      <td>Permet de définir des attributs personnalisés</td>
      <td><pre lang="html">&lt;div data-tooltip="Une tooltip JS"&gt;</pre></td>
    </tr>
  </tbody>
</table>

[Global attributes](https://www.w3schools.com/tags/ref_standardattributes.asp)

---

## Éléments

[Élements HTML](html-elements.md)

---

## Event handlers

Les events handlers sont des attributs, commençant par "on", auxquels on peut rattacher une fonction qui sera appellée lorsqu'un événement particulier se produit sur un élément.

On peut ajouter l'attribut en HTML

``` html
<form onsubmit="console.log(this); return false">
```

Ou en JavaScript

``` js
function handleSubmit(e) {
    console.log(this);
}
document.getElementById("form").addEventListener("submit", handleSubmit);
```

[List of event handlers](https://www.w3schools.com/tags/ref_eventattributes.asp)

---

## HTML5 & Cie

HTML5 peut désigner le language HTML version 5 mais aussi un ensemble plus large de technologies et d'API, fonctionnalités du navigateur que l'on peut appeler via JavaScript.

* Web Sockets
* SSE
* WebRTC
* App cache
* Évènements online et offline
* sessionStorage et localStorage
* IndexedDB
* API File
* Contrôles audio et vidéo
* API Camera
* Track et WebVTT
* Canvas
* WebGL
* SVG
* Web Workers
* XMLHttpRequest
* API Historique
* Drag & drop
* Gestion du focus
* Gestion de protocoles web
* requestAnimationFrame
* API Fullscreen
* Événements tactiles
* Geolocalisation
* Orientation de l'appareil
* API Verouillage de la souris
* Évenements formulaire

[HTML5 & Cie](https://developer.mozilla.org/fr/docs/Web/Guide/HTML/HTML5)
