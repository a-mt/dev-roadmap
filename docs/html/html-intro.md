---
title: Les bases de HTML
category: Web, HTML
---

HTML (HyperText Markup Langage) est le langage de balisage utilisé pour créer des pages web.
- Il définit la structure de la page.  
  Par exemple pour indiquer au navigateur qu'un texte doit être considéré comme un paragraphe et qu'un autre est un titre.
- on peut inclure des objets externes: images, sons, vidéos, etc
- on peut également inclure des liens hypertextes.  
  Quand un utilisateur clique sur un lien, il est redirigé vers une autre page

[Cheatsheet HTML](https://medium.com/level-up-web/the-mega-html5-cheatsheet-e8c479b1c521)

---

## Créer un document HTML

Pour créer une page statique HTML, il suffit de créer un fichier avec l'extension `.html`.  
Il peut être édité avec n'importe quel éditeur de texte classique, un IDE (*Integrated Development Editor*) permettra d'ajouter des fonctionnalités supplémentaires comme la coloration syntaxique ou l'autocomplétion.
Pour visualiser le résultat, il suffit d'ouvrir le fichier avec un navigateur — comme Firefox ou Chrome

---

## Structure

Un document complet, bien formatté, contient
* un prologue (DTD XML) qui définit la version HTML utilisée: `<!DOCTYPE html>` pour html5
* une balise `<html>` qui englobe le contenu
* une entête `<head>` qui contient les metadonnées — pour définir l'encodage, le titre de la page, inclure du CSS, etc
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

HTML est insensible à la casse, aux espaces et retours chariots (hormis la DTD).  
Une bonne pratique est d'écrire en minuscule et d'indenter le code — pour améliorer la lisibilité du code.

## Commentaires

Des commentaires peuvent être ajoutés en HTML, ils seront pas affichés par le navigateur :

``` html
<!-- Mon commentaire -->
```

---

## Balises

* Le rôle de chaque élément dans la page est indiqué par des *balises*.

  ``` html
  <h1>Le titre</h1>
  <p>Le paragraphe</p>
  <img src="image.png">
  ```

  La plupart des éléments HTML ont une balise *ouvrante* et une balise *fermante*: `<h1>...</h1>` par exemple.  
  Certains éléments n'ont pas de balise fermante, on dit que la balise est *orpheline*: `<img src="image.png">` ou `<br>` par exemple.

* Les navigateurs donnent un style par défaut aux différentes balises: `h1` est un titre de niveau 1, il est affiché en gros; `h2` est un titre de niveau 2, il est affiché en moins gros.
  Il ne faut cependant pas utiliser les différentes balises pour modifier l'affichage du contenu: HTML est un langage *sémantique*, il donne du sens au contenu. 

  La sémantique aide les robots (comme le crawler de Google ou un lecteur d'écran destiné aux personnes malvoyantes) à comprendre le contenu de la page. Pour modifier l'apparence du HTML, on utilise un autre langage: CSS.

---

## Attributs

Chaque balise peut éventuellement avoir des *attributs* pour ajouter des propriétés à l'élément.
Les balises ouvrantes peuvent contenir des attributs (et c'est parfois même obligatoire), tandis que les balises fermantes non.

Lorsqu'un élément a plusieurs attributs, l'ordre n'a pas d'importance.

### Attributs sans valeur

Les attributs des éléments HTML peuvent ou non prendre des valeurs.  
En XHTML, les attributs sans valeurs sont interdits.

``` html
<input type="text" required>              <!-- HTML -->
<input type="text" required="required" /> <!-- XHTML -->
```

### Quotes

Les valeurs d'attributs peuvent être entourées de doubles ou simples quotes. Les doubles quotes sont les plus utilisées, les simples quotes ne sont généralement utilisées que lorsque la valeur contient des doubles quotes.

``` html
<p title='John "ShotGun" Nelson'></p>
<p title="John 'ShotGun' Nelson"></p>
```

Ou on peut utiliser une entité pour ajouter une quote à l'intérieur de quotes.

``` html
<p title="John &quot;ShotGun&quot; Nelson"></p> <!-- John "ShotGun" Nelson -->
<p title='John &apos;ShotGun&apos; Nelson'></p> <!-- John 'ShotGun' Nelson -->
```

### Attributs globaux

Différents éléments acceptent différents attributs.  
Mais certains attributs sont *globaux*, c'est à dire qu'ils peuvent être placés sur n'importe quel élément:

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
      <td>Définit l'identifiant de l'élément. Un identifiant est unique par page. <br />Il peut être utilisé en CSS ou JS (sélecteur #ID) ou comme cible pour un lien (<code>&lt;a href="#id"&gt;</code>).</td>
        <td><pre lang="html">&lt;div id="main"&gt;</pre></td>
    </tr>
    <tr>
      <th align="left">class</th>
      <td>Définit la classe de l'élément. <br />Elle peut être utilisée en CSS ou JS (sélecteur .CLASS)</td>
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
      <td>Définit la langue dans laquelle le contenu de l’élément est écrit (`en`), ou éventuellement le dialecte (`en-US`).
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

Nouveaux attributs globaux depuis HTML5:

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
      <td>Permet de cacher un élément (même principe que <code>display: none</code>)</td>
      <td><pre lang="html">&lt;main hidden&gt;</pre></td>
    </tr>
    <tr>
      <th align="left">spellcheck</th>
      <td>Définit si le correcteur orthographique doit être affiché ou non</td>
      <td><pre lang="html">&lt;textarea spellcheck&gt;</pre></td>
    </tr>
    <tr>
      <th align="left">inputmode</th>
      <td>Définit le type de clavier à afficher sur smartphone</td>
      <td><pre lang="html">&lt;input type="text" inputmode="numeric"&gt;</pre></td>
    </tr>
    <tr>
      <th align="left">data-*</th>
      <td>Permet de définir des attributs personnalisés</td>
      <td><pre lang="html">&lt;div data-tooltip="Une tooltip JS"&gt;</pre></td>
    </tr>
  </tbody>
</table>

[Documentation: Global attributes](https://www.w3schools.com/tags/ref_standardattributes.asp)

### Event handlers

Un event handler est un attribut qui permet d'associer du code JavaScript à un événement se produisant sur l'élément.
Le JavaScript est le language qui permet de gérer les interractions avec la page (comme ouvrir une popup). Tous les events handlers commençent par "on".

Par exemple, pour empêcher la soumission d'un formulaire:

``` html
<form onsubmit="console.log(this); return false">
```

On peut obtenir le même résultat que précédemment avec du code JavaScript:

``` js
function handleSubmit(e) {
    console.log(this);
}
document.getElementById("form").addEventListener("submit", handleSubmit);
```

[Documentation: List of event handlers](https://www.w3schools.com/tags/ref_eventattributes.asp)

---

## Caractères spéciaux

Le HTML possède des caractères réservés. Les signes `<` et `>` par exemple servent à créer des balises.  
Pour ajouter des caractères spéciaux à l'intérieur du texte, il faut utiliser des *entités* HTML.  
Une entité HTML est une suite de caractères qui commence par `&` et finit `;` — à l'écran, le navigateur remplacera cette entité par le caractère auquel elle correspond. Les entités les couramment utilisées sont:

| Entité   | Caractère |
|---       |---        |
| `&lt;`   | `<`       |
| `&gt;`   | `>`       |
| `&amp;`  | `&`       |
| `&quot;` | `"`       |
| `&apos;` | `'`       |
| `&nbsp;` | ` `       |

Outre les entités HTML définies, on peut afficher n'importe quel caractère Unicode, dès lord qu'on connaît son code décimal ou hexadécimal: le caractère <code>&bull;</code> par exemple peut être affiché avec
* `&bull;` (entité)
* `&#8226;` (code décimal)
* ou `&#x2022;` (code hexadécimal)

Pour trouver le code Unicode d'un caractère: [amp-what.com](http://www.amp-what.com) ou [fileformat.info](https://www.fileformat.info/info/unicode/)

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

Pour afficher plusieurs espaces à la suite en HTML, il faut utiliser une entité: l'espace insécable `&nbsp;` (il existe d'autres espaces insécables, plus larges, comme `&emsp;`).  
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

Quand on a un bloc de texte qui des espaces et des retours chariots qui tous doivent être préservés, on peut utiliser l'élément `<pre>` (pour *preformatted text*) ou alors la propriété CSS `white-space: pre;` (sur n'importe quel élément).

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

## Versions HTML

HTML est une des trois inventions à la base du World Wide Web, avec le HTTP (*Hypertext Transfer Protocol*) et les URLs (*Uniform Resource Locator*, autrement dit des adresses web). C'est un langage qui a fortemment évolué depuis son invention. Chaque nouvelle version du langage introduit de nouvelles fonctionnalités et change parfois totalement la syntaxe ou les enjeux du langage.

* HTML1  
  Le langage HTML est issu du projet SGML (*Standard Generalized Markup Language*, initié en 1979 par IBM et publié comme norme en 1986 — dans la norme ISO 8879:1986). 
  HTML a été mis au point par Tim Berners-Lee, alors chercheur au CERN, et à partir de 1989, et qui annonce officiellement la création du "web" en août 1991 sur Usenet.

* HTML2  
  Directement suite à ça, Tim Berners-Lee continue d'améliorer le langage.
  Une fois les améliorations jugées suffisantes et suffisamment nombreuses, il partage publiquement la nouvelle "version" de son langage, le HTML2, en 1994.

* HTML3  
  Après la brêve apparition d'un HTML 3.0, qui ne vit jamais officiellement le jour, le HTML 3.2 devient le standard officiel le 14 janvier 1997. Les apports les plus marquants du HTML 3.2 sont la standardisation des tableaux et un grand nombre d'éléments de présentation.

* HTML4  
  Le 18 décembre 1997, le HTML 4.0 est publié. La version 4.0 du langage HTML standardise notamment les feuilles de style, apporte quelques modifications aux tables et aux formulaires. La version HTML 4.01, apparue le 24 décembre 1999 apporte quelques modifications mineures au HTML 4.0 et ajoute 3 variantes: Transitional, Strict et Frameset.  
  La version strict est celle recommandée par le W3C.  
  La version transitional permet l'utilisation de balises classées comme dépréciée.  
  La version frameset permet l'utilisation de cadres (frames): éléménts frameset, frame, noframe.

* XHTML1  
  Pour tirer parti des avantages du XML, tout en conservant la compatibilité avec le HTML, le W3C définit en 2000 un format XHTML1.0, qui reformule simplement HTML 4 en application de XML 1.0. Les 3 variantes HTML 4.01 (Transitional, Strict et Frameset) existent également en XHTML 1.0.

  XHTML1.1 enrichit XHTML1.0 avec l'élément ruby, qui permet d'ajouter des annotations aux textes écrits dans des langues idéographiques (japonais, hébreu, chinois…).
  XHTML Basic 1.1 est un sous-ensemble simplifié, destiné à l'adaptation des contenus aux clients légers (mobiles)

* HTML5  
  En mars 2007, le W3C relance le développement de HTML, et c'est le point de départ d'une nouvelle spécification HTML5.
  HTML5 simplifie notamment l'insertion de contenus audio et vidéo et améliore la sémantique: la distinction des différents contenus est meilleure que jamais. HTML5 a son équivalent en XHTML nommé XHTML5.

  En janvier 2011, des divergences entre le WHATWG et le W3C conduisent à la création du HTML Living Standard.  
  Le HTML Living Standard développe en permanence le HTML5, tandis que le W3C prend des snapshots de WHATWG à des moments donnés pour en créer des spécifications fixes:  
  HTML5 en octobre 2014  
  HTML5.1 en novembre 2016  
  HTML5.2 en décembre 2017

[HTML4.01, XHTML1.0 et HTML5 : quel doctype choisir](https://www.alsacreations.com/article/lire/560-dtd-doctype-html-xhtml-comment-choisir.html)

## XHTML vs HTML

Conçu initialement comme un langage simplifié par rapport au SGML, le HTML doit en partie son succès à sa tolérance syntaxique, qui en facilite l'usage pour un  débutant — par exemple, ce n'est pas grave si les balises ne sont pas toutes fermées, l'écriture du code est indifférente à la casse, les valeurs d'attributs peuvent dans certains cas ne pas être entourées de guillemets, etc. Cette facilité apparente a par contre son revers: le code HTML ne se prête pas très bien aux traitements automatisés, qui sont un des atouts des formats XML.

* En XHTML, une barre de fraction `/` est obligatoire à la fin des balises isolées, comme `<br />`, `<hr />`.  
  Ce n'est pas nécessaire en HTML. Note: pour la compatibilité, il est conseillé de mettre un espace avant la barre de fraction.

* En XHTML, il faut toujours mettre les valeurs des attributs entre guillemets : `<input type="text" />`.  
  En HTML on peut parfois s'en passer.

* En XHTML, un attribut doit obligatoirement avoir une valeur : `<input type="text" readonly="readonly" />`.  
  En HTML, ce n'est pas requis : `<input type="text" readonly>`

* En HTML, on peut aussi bien écrire `<html>` que `<HTML>` ou `<hTmL>`.  
  XHTML lui est sensible à la casse, tout doit être en minuscules.

* En XHTML, si une balise est ouverte, il faut la refermer: pas de `<em>` sans `</em>`.  
  En HTML on peut parfois s'en passer.

HTML ne peut être étendu et de nouvelles fonctionnalités ne peuvent être ajoutées qu'au prix du développement et de l'intégration de nouvelles spécifications W3C. À l'inverse, le XML est par nature un méta-format qui permet de créer à volonté de nouveaux éléments.

## Compatibilité navigateur

Il est important de comprendre que le langage HTML est un standard, donc des recommandations publiées par un consortium international: le W3C (*World Wide Web Consortium*).

1. Aussi étoffées les spécifications soient-elles, il existe toujours une marge d'interprétation de la part des navigateurs, ce qui explique qu'une même page web puisse s'afficher différemment d'un navigateur Internet à l'autre. 

2. Il arrive parfois que certains éditeurs de logiciels ajoutent des instructions HTML propriétaires, qui ne font pas partie des spécifications du W3C.

3. Toutes les recommendations W3C ne sont pas toujours implémentées par les navigateurs, soit parce qu'elles viennent de sortir et qu'elles n'ont pas encore été développées par les éditeurs de logiciel (pour l'instant), soit parce qu'elles ne le seront jamais.

4. Une recommendation peut très bien être dépréciée par une nouvelle recommendation, il faut donc se tenir au courant des nouveautés et des changements apportés.

5. Les anciens navigateurs qui n'ont pas été mis à jour ne supportent pas les nouveautés HTML. C'est particulièrement problématique pour les logiciels qui ne se mettent pas automatiquement à jour, comme Internet Explorer < 10, pour lesquels il faudra apporter des alternatives HTML4 (si on veut une compatibilité avec ces navigateurs).

---

## HTML5 & Cie

"HTML5" peut désigner le language HTML version 5 mais, en général, il désigne un ensemble plus large de technologies — et notamment les API JavaScript.

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
