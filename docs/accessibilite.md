---
title: Accessibilité
category: Other
---

L'accessibilité (*accessibility* ou a11y) désigne l'ensemble des techniques et bonnes pratiques qui permettent de rendre un site web accessible à tous, donc en prenant en compte les personnes qui ont un handicap, celles qui utilisent d'anciens navigateurs ou ordinateurs, ont une connexion internet lente ou encore des contraintes de sécurités (pas de javascript par exemple).  
Toute personne devrait être capable d'accéder et d'utiliser le site, même si l'expérience est moins agréable.

| Type de handicap | Exemple                                             | Techniques |
|---               |---                                                  |---         |
| Visuel           | Mauvaise vision, daltonisme, cécité totale          | Contraste, couleurs utilisées                             |
| Auditif          | Problèmes d'audition, surdité totale                | Sous-titres ou transcriptions des contenus multimédias    |
| Moteur           | Mouvements limités, incapacité d'utiliser la souris | Tabulation clavier, quick links, messages de confirmation |
| Cognitif         | Difficultés de concentration, de mémorisation, de compréhension (visuelle, linguistique ou mathématique) | Design, ergonomie, contenu |

Un site accessible est un site facile à percevoir (à lire), à utiliser, à comprendre et compatible avec les technologies actuelles et futures.

[Comment une personne aveugle utilise le web (vidéo)](https://www.youtube.com/watch?v=ymDf1CNMKzY&t=13m11s)

---

## Ressources

- Évaluer l'accessibilité d'un site web : 
  - [Tota11y](http://khan.github.io/tota11y/) (script js)
  - [Wave](http://wave.webaim.org/) (site web)
  - [Accessibilité Developer Tools](https://chrome.google.com/webstore/detail/accessibility-developer-t/fpkknkljclfencbdbgkenhalefipecmb) (plugin Chrome)
  - [Pa11y Dashboard](https://github.com/pa11y/pa11y-dashboard) (logiciel)

- Tester un lecteur d'écran
  - [NVDA](https://www.nvaccess.org/) est un lecteur d'écran gratuit sous Windows
  - [VoiceOver](https://help.apple.com/voiceover/info/guide/10.12/#/) pour Mac

---

## Recommendations WCAG

Les [WCAG 2.0](https://www.w3.org/Translations/WCAG20-fr/) (*Web Content Accessibilité Guidelines 2.0*) est un ensemble de recommendations destinées à améliorer l'accessibilité des sites web.

Les 12 principales recommandations sont :

1. Proposer des équivalents textuels à tout contenu non textuel
1. Proposer des sous-titres ou des versions de remplacement pour tous les contenus multimédia
1. Faire en sorte de rendre les fonctionnalités facilement accessibles au clavier (raccourcis)
1. Rendre les contenus adaptables (proposer une version audio des contenus, possibilité de modifier la taille de la police...)
1. Jouer sur les contrastes pour permettre de bien distinguer les différents contenus (visuels et audios) du site
1. Laisser le temps à l'internaute de lire ou utiliser le contenu qui lui est présenté
1. Ne pas utiliser de contenu susceptible de provoquer des crises convulsives
1. Aider l'utilisateur à naviguer dans les pages et contenus et à se localiser sur le site (moteur de recherche, menu, fil d'ariane)
1. Rendre les contenus textuels lisibles et compréhensibles
1. Faire en sorte que les contenus apparaissent et fonctionnent de manière prévisible
1. Aider l'internaute à éviter et à corriger les erreurs
1. Optimiser le site afin qu’il soit compatible avec les technologies actuelles et futures

---

## WAI-ARIA

Le WAI-ARIA (*Web Accessibility Initiative – Accessible Rich Internet Applications*) est une spécification du W3C qui décrit comment améliorer l'accessibilité du web pour le contenu dynamique (Ajax, JavaScript, HTML) - par exemple: identifier une liste de lien comme menu de navigation et indiquer si son état est plié ou déplié.
WAI-ARIA définit plusieurs attributs: `tabindex`, `role` et les arias (`aria-...`).

---

## Bonnes pratiques HTML

### Produire du code valide

Le premier point est de s'assurer de produire du code HTML valide. Pour le vérifier, on peut utiliser le [validateur W3C](http://validator.w3.org/nu/).  
Il est possible de créer des sites sans en tenir compte, mais cela faussera l'interprétation des technologies d’assistance telles que les lecteurs d'écran.

### Attribut lang

Sert à définir les [languages](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) de la page
- bon pour le SEO
- aide les navigateurs à identifier la bonne langue et le bon dictionnaire
- aide les technologies d'assistance à choisir la bonne voix ou le bon jeu de caractères

``` html
<html lang="en">
    ...
</html>
```

``` html
<p>There is a certain <i lang="fr" class="idiomatic">je ne sais quoi</i> in the air.</p>
```

[Effet de l'attribut lang (vidéo)](https://www.youtube.com/watch?v=0uzxu9dQnuU)

### Attribut alt

L'attribut `alt` doit décrire succintement le contenu de l'image.
* bon pour le SEO
* lu par les lecteurs d'écran

La description doit être utile, par exemple l'attribut `alt` du logo devrait être le nom de l'entreprise et non "logo".  
La description ne doit contenir aucun retour à la ligne.

Si l'image ne fait pas partie du contenu (elle est décorative), laisser l'attribut `alt` vide.  
Si l'image fait partie du contenu mais qu'aucun équivalent textuel n'est disponible, l'attribut doit être omis.

``` html
<img src="bobby.jpg" alt="My dog Bobby playing fetch in the park">
```

``` html
<img src="decorative_image.jpg" alt="" />
```

### Buttons

Utiliser des éléments `<button>` plutôt que `<a>` lorsqu'il s'agit d'actions à effectuer et non des liens vers d'autres page
* les lecteurs d'écrans les détectent comme des boutons
* au clavier, la touche Entrée déclenche le clic (événement js)
* un bouton qui ne peut pas être utilisé est identifié comme tel (attribut `disabled`)

``` html
<button class="btn" disabled>Button</button>
```

Ne pas utiliser de `<div>` pour simuler un bouton, ou lui donner un `tabindex` pour qu'il soit accessible. [CodePen button vs div](https://codepen.io/matuzo/full/xgwxNw/)

[Effet de l'élément button (vidéo)](https://www.youtube.com/watch?v=CZGqnp06DnI&index=4&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)

### Ancres

Utiliser des éléments `<a>` pour tous les liens plutôt que des événements javascript.

Les utilisateurs de lecterus d'écran ont différentes options. Cela inclut sauter sur des éléments de répère: sauter au contenu principal ou obtenir un résumé de page à partir des en-têtes. Une autre option consiste à entendre uniquement les liens disponibles sur une page.

Avoir une liste de liens "cliquez ici" ou "lisez plus" n'est pas utile. Au lieu de ça, vous devriez utiliser un texte bref mais description dans les balises `<a>` pour donner du sens.

![](https://i.imgur.com/crhpdkX.png)

Indiquer les liens qui pointent vers des documents en téléchargement, avec le format et le poids du document en question dans le lien. Par exemple: « Nom du document (PDF, 135ko) ».

### Headings

Utiliser les balises headings, de `<h1>` à `<h6>`, pour nommer les sections du site
* permettent de comprendre la structure du site et les relations entre chaque section
* les lecteurs d'écran permettent de naviguer entre les headings avec des raccourcis clavier

Visuellement, la page comporte des titres, mis en valeur et reconnaissables grâce à une mise en forme différente du reste du texte (en gras, dans une taille de police plus grande). Une personne aveugle ne voit pas ces mises en forme graphiques, il faut donc que les balises HTML indiquent qu'il s'agit d'un titre et quel est son ordre.

``` html
<body>
    <h1>My website</h1>
    <h2>Heading</h2>
        <h3>Subheading</h3>
    <h2>Heading</h2>
</body>
```

### Landmarks

Remplacer les `<div>` par des éléments plus significatifs, les landmarks HTML5, quand c'est possible: `<main>`, `<footer>`, `<article>`, `<aside>`, `<nav>`, `<section>`
* permettent de comprendre le contenu
* de naviguer
* l'élément `<main>` done la possibilité à certains lecteurs d'écran d'aller directement au contenu de la page

``` html

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Titre de ma page | Mon site</title>
  </head>
  <body>
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
  </body>
</html>
```

<table>
  <tr><th align="left">main</th><td>Contient le contenu principal du site. Il n'y en a qu'un par page. Il ne contient pas les éléments qui sont répétés sur les différentes pages (navigation, bannière...)</td></tr>
  <tr><th align="left">article</th><td>Délimite les éléments qui ont du sens par eux-mêmes, que l'on pourrait mettre dans un feed RSS : article d'un blog, posts d'un forum, etc.</td></tr>
  <tr><th align="left">section</th><td>Groupe les éléments qui ont le même thème.
<ul>
<li>si un livre est un <code>article</code>, chaque chapitre est une <code>section</code></li>
<li>si chaque article d'un blog est un <code>article</code>, la liste des articles est une <code>section</code></li>
</ul></td></tr>
  <tr><th align="left">header</th><td>Contient les informations ou la navigation de la page</td></tr>
  <tr><th align="left">nav</th><td>Contient les liens de navigation de la page.<br>
Inutile de mettre un élément <code>nav</code> dans le <code>footer</code>, il se suffit par lui-même</td></tr>
  <tr><th align="left">aside</th><td>Contient des informations indirectement liées au contenu: glossaire, biographie, articles similaires, etc</td></tr>
  <tr><th align="left">footer</th><td>Contient les informations de copyright, plan du site, et tout autre information et liens que l'on trouve en bas de page</td></tr>
</table>

[Effet des landmarks (vidéo)](https://www.youtube.com/watch?v=IhWMou12_Vk&feature=youtu.be)

### Navigation

Fournir des informations sur l'emplacement actuel: fil d'ariane, lien actif surligné dans la navigation, plan du site...  
Utiliser les balises `<link rel="index | next | prev | contents">` pour spécifier la relation de la page en cours avec les autres pages.

### Mots difficiles

Donner la signification des mots inhabituels et la prononciation des mots difficiles.

``` html
<!-- Providing meaning inline -->  
<abbr title="Austin Rocks">Au5t1N r0xx0rz</abbr>
```

``` html
<!-- Using a definition list -->  
<p>That was a <a href="#d-humblebrag">humble brag</a></p>   

<dl>  
  <dt id="d-humblebrag">Humble Brag</dt>
  <dd>Subtly letting others now about how fantastic your life is while undercutting 
  it with a bit of self-effacing humor or "woe is me" gloss.</dd>
</dl>
```

### Instructions et erreurs

Fournir des instructions pour les éléments de formulaire lorsqu'il y a des formats à respecter.

![](https://i.imgur.com/RnOrNuY.png)

S'il y a des erreurs, elles doivent être écrites en language simple et compréhensible (pas de codes d'erreur).

![](https://i.imgur.com/JIfIPSi.png)

### Label

Un `label` définit l'intitulé d'un élément de formulaire.  
L'attribut `for` du label permet de l'associer son élément. Un clic sur le label donne le focus sur l'élément.  
Mettre un élément label à tous les éléments de formulaire.

``` html
<form>
  <label for="name">Name:</label>
  <input type="text" id="name" name="name">
</form>
```

### Fieldset

Utiliser les `<fieldset>` pour grouper les éléments de formulaire qui vont ensemble, par exemple des boutons radio.

``` html
<form>
  <fieldset>
    <legend>T-Shirt size</legend>
    <input type="radio" id="s" name="shirtsize" />
    <label for="s">S</label>  
    <input type="radio" id="m" name="shirtsize" />
    <label for="m">M</label>  
    <input type="radio" id="l" name="shirtsize" />
    <label for="l">L</label>   
  </fieldset>
</form>
```

### Attribut tabindex

Certains éléments reçoivent le focus quand l'utilisateur utilise la touche tabulation: les liens et les éléments d'un formulaire. L'ordre dans lequel les éléments reçoivent le focus est le même que dans le code HTML.
Il est possible de modifier ce comportement par défaut avec l'attribut `tabindex`.  La valeur de l'attribut (entier positif, négatif ou nul) détermine le comportement.

* une valeur `tabindex` négative (typiquement -1) indique qu'un élément est focalisable mais n'est pas accessible au clavier. Cette méthode est généralement utilisée pour mettre hors d'atteinte des éléments non visibles (popup).

* une valeur nulle permet de donner le focus à des éléments autres que les éléments par défaut (comme des div, span, p...). Cela active également la pseudo-classes CSS `:focus`.

  ``` html
  <div tabindex="0">I need keyboard focus!</div>
  ```

* une valeur positive permet de spécifier l'ordre des éléments, qui remplace l'ordre par défaut (HTML).  
  Définir un `tabindex="1"` mettra le focus du clavier sur cet élément en premier. Ensuite, on parcourt la séquence des valeurs tabindex spécifiées (2, 3, etc), avant de passer aux éléments par défaut et `tabindex="0"`.

  ``` html
  <div tabindex="1">I get keyboard focus, and I get it first!</div>
  <div tabindex="2">I get keyboard focus, and I get it second!</div>
  ```

S'assurer que tous les éléments cliquables à la souris (menus, liens, etc) soient également activables au clavier: `tab` pour se déplacer d'élément en élément, `shift + tab` pour revenir en arrière, `Enter` pour actionner un lien. Pour modifier un choix dans un formulaire (un bouton radio par exemple), utiliser les flèches gauche et droite du clavier.

### Attribut role

Les attributs role définissent quel est le type d'élément et à quoi il sert.

``` html
<header role="banner">
  <h1>My personal blog</h1>
</header>
```

``` html
<div role="alert">
  Please upgrade to the latest version of your browser for the best experience.
</div>
```

``` html
<aside role="complementary">
  <h3>Related Articles</h3>
  ...
</aside>
```

``` html
<footer role="contentinfo">
  This website was built by Georgie.
</footer>
```

Quelques roles définits par WAI-ARIA :

| Role          | Description |
|---            |---          |
| banner        | Titre de la page et logo |
| main          | Le contenu principal du site |
| article       | Un contenu qui a du sens en lui-même, comme un article de blog |
| complementary | Contenu séparé du contenu principal |
| contentinfo   | Contenu en relation avec le contenu: notes de base de page, droits d'auteurs, liens vers la déclaration de confidentialité, liens vers les préférences, etc |
| navigation    | Liens qui permettent de naviguer dans le document et/ou des documents connexes |
| search        | Formulaire de recherche du site |

### Attributs aria

Les attributs aria sont préfixés par `aria-`. Ils définissent l'état ou les propriétés d'un élément.

* `aria-checked` sert à montrer l'état d'un élément personnalisé tel qu'une checkbox ou un bouton radio
* `aria-label` donne un titre a un élément. Utilisé quand le label d'un élément n'est pas visible
* `aria-labelledby` indique le label de l'élément (ID du label)
* `aria-hidden` sert à cacher du contenu pour les technologies d'assistence. À utiliser si le contenu ne sert qu'à la présentation.
* [Liste complète des états et propriétés](https://www.w3.org/TR/wai-aria/states_and_properties#state_prop_def)

![](https://i.imgur.com/gZDNCGI.png)

``` html
<span class="icon icon-key" aria-hidden="true"></span>
```

``` html
<span role="checkbox" aria-checked="true" tabindex="0" id="simulatedcheckbox"></span>
```

``` html
<div role="navigation" aria-label="Primary">  
  <ul><li>...a list of links here ...</li></ul> 
</div>  
<div role="navigation" aria-label="Secondary">  
  <ul><li>...a list of links here ...</li> </ul>
</div>  
```

``` html
<h2 id="limg">Paragliding</h2>
<p id="dimg">A long description of our paragliding trip ...</p>
<img src="takeoff.png"
     alt="Getting ready to take off"
     aria-labelledby="limg"
     aria-describedby="dimg">
```

``` html
<input type="image"
       src="thumb.gif"
       alt="Effectiveness"
       role="slider"
       aria-valuemin="0"
       aria-valuemax="100"
       aria-valuenow="42"
       aria-valuetext="42 percent"
       aria-labelledby="leffective">
```

``` html
<form action="">
  <fieldset>
    <legend>Login form</legend>
    <div>
      <label for="username">Your username</label>
      <input type="text" id="username" aria-describedby="username-tip" required />
      <div role="tooltip" id="username-tip">Your username is your email address</div>
    </div>
    <div>
      <label for="password">Your password</label>
      <input type="text" id="password" aria-describedby="password-tip" required />
      <div role="tooltip" id="password-tip">Was emailed to you when you signed up</div>
    </div>
  </fieldset>
</form>
```

[Plus d'exemples sur les ARIA](http://heydonworks.com/practical_aria_examples/)

### Audio

Utiliser une balise `audio` pour le contenu sonore. Avec l'attribut `controls`, les boutons lecture, pause, etc, et les fonctionnalité du clavier sont prises en charge par le navigateur.

``` html
<audio id="meowClip" controls>
  <source src="audio/meow.mp3" type="audio/mpeg" />
  <source src="audio/meow.ogg" type="audio/ogg" />
</audio>
```

Le contenu audio nécessite également une alternative de texte pour être accessible aux sourds ou malentendants. Cela peut être fait avec du texte à proximité sur la page ou un lien vers une transcription.

### Video

Il doit être possible d'activer et désactiver les sous-titres depuis le lecteur vidéo.

``` html
<video id="video" controls preload="metadata">
   <source src="video/sintel-short.mp4" type="video/mp4">
   <source src="video/sintel-short.webm" type="video/webm">
   <track label="English" kind="subtitles" srclang="en" src="captions/vtt/sintel-en.vtt" default>
   <track label="Deutsch" kind="subtitles" srclang="de" src="captions/vtt/sintel-de.vtt">
   <track label="Español" kind="subtitles" srclang="es" src="captions/vtt/sintel-es.vtt">
</video>
```

### Figure et figcaption

`figure` et `figcaption` contiennent une représentatio visuelle (une image, un diagramme ou un graphique) avec sa légende.

La légende peut être utilisée pour noter brièvement les tendances ou les conclusions du graphique pour les utilisateurs ayant une déficience visuelle. 
Ou pour proposer une version table des données du graphique aux utilisateurs de lecteurs d'écran.

``` html
<figure>
  <img src="roundhouseDestruction.jpeg" alt="Photo of Camper Cat executing a roundhouse kick">
  <br>
  <figcaption>
    Master Camper Cat demonstrates proper form of a roundhouse kick.
  </figcaption>
</figure>
```

### Time

L'élément `time` contient une date ou une heure.  
Le format de la date est YYYY-MM-DD, cela permet d'éviter toute confusion (format américain, format français...). Un élément time peut contenir n'importe quel texte s'il utilise l'attribut `datetime`.

``` html
<p>Master Camper Cat officiated the cage match between Goro and Scorpion
<time datetime="2013-02-13">last Wednesday</time>, which ended in a draw.</p>
```

[Formats acceptés par time](https://www.alsacreations.com/article/lire/1386-html5-element-time.html)

### Attribut acceskey

L'attribut `accesskey` permet de spécifier une touche de raccourci pour activer ou mettre en évidence un élément. 
Cela peut rendre la navigation plus rapide pour les utilisateurs qui se servent du clavier.

``` html
<button accesskey="b">Important Button</button>
```

Les lettres de a à z sont généralement utilisées pour les raccourcis logiciels, l'accesskey risque donc de désactiver des raccourcis du système. Les raccourcis recommandés sont :

* Touche `0` : Liste des touches clavier utilisées. Cette liste peut se trouver en tête de la politique d'accessibilité du site, ou dans un document spécifique.
* Touche `1` : Page d'accueil
* Touche `2` : Page d'actualité du site
* Touche `3` : Carte du site
* Touche `4` : Formulaire de recherche
* Touche `5` : FAQ, glossaire, index thématiques
* Touche `6` : Page d'aide à la navigation dans le site
* Touche `7` : Contact par email
* Touche `8` : Copyright, conditions d'utilisation, licence...
* Touche `9` : Livre d'or, feedback...

La combinaison de touches à utiliser pour un accesskey dépend du navigateur et de l'OS utilisé. Généralement `alt + [accesskey]` ou `ctrl + [accesskey]`. [Liste des combinaisons acceskey](https://openweb.eu.org/articles/accesskey_essai_non_transforme/).

### Élements customisés

Remplacer tous les éléments personnalisés par des éléments natifs quand c'est possible (calendrier, slider etc)

``` html
<label for="input1">Enter a date:</label>
<input type="date" id="input1" name="input1">
```

Si ce n'est pas possible, s'assurer que l'élément est navigable avec le clavier (tabindex et événéments js).

![](https://cdn-images-1.medium.com/max/800/1*YAjDNcLeY8j-Px7hnMYRKA.gif)

[Exemple widget étoiles](https://medium.com/dailyjs/angular-and-accessibility-8ae1f601803a#3d8c)

---

## Bonnes pratiques CSS

### Contraste

Le contraste est la différence de luminosité entre les couleurs claires et les couleurs sombres. Plus le contraste est élevé, plus il est facile de les distinguer.
Si le contraste n'est pas assez élevé
1. certaines personnes ne pourront pas lire le contenu
2. les personnes ne pourront pas accéder au site avec leur téléphone, dehors, pendant la journée

Les directives WCAG recommendent un rapport de contraste d'au moins 4.5:1 pour du texte inférieur à 24px (ou 19px si gras).  
Un ratio 3:1 est suffisant pour les tailles supérieures.  
Les rapports de contraste vont de 1:1 (même couleur) à 21:1 (noir et blanc).

<ins>Ressources</ins> :
- [Contraste minimum](http://jxnblk.com/grays/) en fonction de la taille du texte
- [WCAG Contrast Checker](https://addons.mozilla.org/fr/firefox/addon/wcag-contrast-checker/) (plugin Firefox)
- [Contrast ratio](http://leaverou.github.io/contrast-ratio/#blue-on-red) (site web)
- [Accessible Color Spaces](http://kevingutowski.github.io/color.html) (site web)

### High contrast mode

Sous Windows, on mode activer un mode pour élever le contraste. Les utilisateurs peuvent préfinir leurs propres couleurs à utiliser.

![](https://i.imgur.com/4LbcpwI.png)

S'assurer que les input et boutons restent visibles quand ce mode est activé.

![](https://i.imgur.com/B6Oha8g.jpg)

Les media queries peuvent être utilisées pour détecter si le mode contraste est activé.

``` css
/* High contrast mode active */
@media (-ms-high-contrast:active) {
}

/* High contrast mode with specific black on white theme */
@media (-ms-high-contrast:black-on-white) {
}

/* High contrast mode with specific white on black theme */
@media (-ms-high-contrast:white-on-black) {
}
```

<ins>Ressources</ins>
- [High Contrast](https://chrome.google.com/webstore/detail/high-contrast/djcfdncoelnlbldjfhinnjlhdjlikmph?hl=en-US) (plugin Chrome)

### Couleurs

La couleur ne doit pas être utilisée comme seule façon de transmettre des informations importantes, car les utilisateurs de lecteurs d'écran ne la verront pas.
Par ailleurs, les couleurs de premier plan et de fond ont besoin d'un constrate suffisant pour que les utilisateurs facilement puissent les distinguer, plus encore pour les daltoniens.

Il existe différentes formes de daltonisme. Cela peut aler d'une sensibilité réduite à une certaine longueur d'onde de la lumière, à l'incapacité de voir la couleur du tout. La forme la plus commune est une sensiblité réduite pour détecter les verts.
Les couleurs proches, c'est à dire voisines sur la route des couleurs (comme le vert et le jaune), doivent être évitées lors de la transmission d'informations importantes.

![](https://i.imgur.com/BLWAgMU.png)

<ins>Ressources</ins> :
* [I want to see like the colour blind](https://chrome.google.com/webstore/detail/i-want-to-see-like-the-co/jebeedfnielkcjlcokhiobodkjjpbjia?hl=en-GB) (plugin Chrome)
* [Colorblinding](https://chrome.google.com/webstore/detail/colorblinding/dgbgleaofjainknadoffbjkclicbbgaa?hl=en) (plugin Chrome)

### Masquer des éléments

#### Afficher uniquement pour les lecteurs d'écran

Il est possible de masquer visuellement le contenu destiné uniquement aux lecteurs d'écran. Par exemple, pour proposer une version textuelle d'un graphique.

``` css
.sr-only {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  top: auto;
  overflow: hidden;
}
```

On peut également masquer un élément et ne le rendre visible qu'au focus, ce qui aura pour effet de ne l'afficher que pour les gens qui utilisent la touche tabulation pour naviguer. [Voir CodePen](https://codepen.io/matuzo/pen/RZBNjP#content)

``` css
.skip-link:not(:focus) {
  white-space: nowrap;
  width: 1px;
  height: 1px;
  overflow: hidden;
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  margin: -1px;
}
```

#### Masquer pour tous

`display: none` ou `visibility: hidden` masque le contenu pour tout le monde, y compris les utilisateurs de lecteurs d'écran

#### Masquer uniquement pour les lecteurs d'écran

Les valeurs nulles pour les tailles, telles que `width: 0px` ou `height: 0px` supprime cet élément du flux du document, ce qui signifie que les lecteurs d'écran l'ignoreront

### Taille

Le texte doit être suffisamment grand pour pouvoir être lu sur un smartphone et augmenter avec la taille de l'écran pour rester lisible à distance sur de grands écrans comme les téléviseurs.

La plupart des sites web utilisent une taille de texte entre 15 et 18px. Certains sites adoptent un texte plus volumineux, 20px ou plus. Pour tester si la taille est suffisante, ajouter un filtre blur : la taille du texte doit être suffisemment grande pour distinguer le texte et la hiérarchie.

``` css
body { filter: blur(4px) !important; }
```

<ins>Ressources</ins> :
- [NoCoffee](https://chrome.google.com/webstore/detail/nocoffee/jjeeggmbnhckmgdhmgdckeigabjfbddl?hl=en&gl=US) (plugin Chrome)

### Police

Toutes les polices ne fonctionnent pas correctement lorsqu'elles sont mises à l'échelle, certaines peuvent paraître mal designées lorsqu'elles sont grandes. Les polices système comme Georgia et Arial par exemple, ont été conçues pour être lisibles à 14px.

Il est important de choisir une police qui peut être agrandie sans problème. Par exemple
* Pour les polices serif: Equity, Franziska, Leitura News, Merriweather, Miller, PT Serif, Tisa.
* Pour les polices sans-serif: Atlas Grotesk, Futura, Lato, Maison Neue, Real Text, Roboto, Suisse Int'l.

### Kerning

Le *kerning* est l'espacement entre deux caractères. La plupart des polices modernes ont des tables de kerning. Le kerning est ainsi automatiquement corrigé, en fonction de la forme des lettres, pour générer une apparence plus uniforme. Cela augmente la lisibilité du texte.

Ce comportement peut être contrôlé avec la propriété CSS `text-rendering`. Puisque l'évaluation du kerning demande des calculs, on a le choix entre un chargement rapide et une police optimisée.

``` css
/* Prioriser la rapidité, ne pas traiter le kerning */
text-rendering: optimizeSpeed
```

![](https://i.imgur.com/orXMlrl.gif)

``` css
/* Utiliser le kerning optimal, au détriment de la rapidité */
text-rendering: optimizeLegibility
```

![](https://i.imgur.com/aD9cwhC.gif)

### Longueur de texte

Idéalement, une ligne contient entre 55 et 75 caractères, quelle que soit la taille de police choisie. Les longues lignes de texte peuvent être pénibles à lire, les utilisateurs doivent garder en tête l'emplacement de la ligne qu'ils sont en train de lire pour chercher le début de la suivante. Il faut donc limiter la longueur.

``` css
p {
  /* Maximum width of 65characters */
  max-width: 65ch;
}
```

### Line height

Le line-height (espacement entre les lignes) des navigateurs est généralement par défaut à `1.2`. D'après le [Web Content Accessibility Guidelines](https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-visual-presentation), il devrait être d'au moins `1.5`. Cela rend le texte plus lisible est plus plaisant à regarder.

``` css
line-height: 1.5;
```

### Alignement

Ne jamais utiliser l'alignement justifié, cela modifie l'espacement entre les mots d'une ligne pour que le texte remplisse la largeur. Bien que cela puisse être visuellement plaisant, en pratique c'est plus difficile à lire.

![](https://i.imgur.com/GQmcnE3.png)

### Content

La propriété CSS `content` peut être utilisée pour ajouter du contenu dans la page. Certains lecteurs d'écran reconnaissent et lisent le contenu généré, d'autres non. Il faut donc éviter d'ajouter du contenu qui ne sert pas qu'à présenter le contenu avec du CSS.

``` css
h2 {
  content: "DON'T DO THIS";
}
```

### Impression

Les pages doivent être accessibles et utilisables même lorsqu'elles sont imprimées. Pour ce faire, il suffit de peaufiner le style et masquer les éléments qui n'ont pas de sens sur le papier, comme la navigation ou les annonces.

``` css
@media print {
  .header {
    position: static;
  }

  nav {
    display: none;
  }
}
```

``` css
@media print {
  a[href^="http"]:not([href*="mywebsite.com"])::after {
    content: " (" attr(href) ")";
  }
}
```

``` css
abbr[title]:after {
    content: " (" attr(title) ")";
}
```

[CSS techniques for print](https://uxdesign.cc/i-totally-forgot-about-print-style-sheets-f1e6604cfd6)

### Fallbacks

Certaines propriétés/valeurs CSS ne sont pas supportées par tous les navigateurs. Pour fournir un fallback, simplement définir des propriétés que le navigateur comprendra, puis les écraser avec la valeur réelle souhaitée. Les navigateurs qui ne comprennent pas la valeur souhaitée l'ignoreront, les autres écraseront l'ancienne valeur.

``` css
div {
  width: 50vw;
  width: 50vmax; /* Doesn't work in IE and older versions of Edge */
}
```

### Ordre

Certaines propriétés CSS peuvent changer l'ordre dans lequel les éléments sont affichés, par exemple `order` et `flex-direction`. Il est important d'ordonner les éléments dans le code HTML de sorte que ce soit logique même sans style.

### Focus

Beaucoup d'utilisateurs utilisent le clavier pour naviguer, en utilisant la touche tabulation. Pour savoir quel élément est actuellement sélectionné, un outline est affiché (un contour en pointillé, bleu ou orange).
Il est important de ne pas supprimer l'outline (`outline: none`) - même si c'est pas joli ! - sinon les utilisateurs qui utilisent le clavier ne pourront pas utiliser le site.

La pseudo-classe `:focus` permet de sélectionner l'élément  qui a le focus.

``` css
a:focus {
  background-color: #000000;
  color: #FFFFFF; 
}
```

La pseudo-classe `:focus-within` permet de sélectionner l'élément qui a un enfant avec le focus. [Voir CodePen](https://s.codepen.io/matuzo/debug/MvPddP)


``` css
form:focus-within {
  box-shadow: 0 0 4px 6px rgba(80,88,156,0.2);
}
```

---

## Bonnes pratiques JS

### Animations

Pour chaque élément en mouvement (une vidéo qui se lance toute seule, une galerie d’images qui tourne sur elle-même, un texte qui défile, une animation...), doit pouvoir être arrêté et relancé. Un simple bouton lecteur/pause fait l'affaire, mais ce mécanisme doit être accessible au clavier.

Une lumière clignotante ne devrait pas apparaître plus de trois fois par seconde. Ou le flash devrait être en dessous des seuils qui risquent de provoquer des crises épileptiques (general flash et red flash).

<ins>Ressources</ins> :
- [Photosensitive Epilepsy Analysis Tool](http://trace.umd.edu/peat)

### Popup

La page doit pouvoir être navigable avec le clavier (`Tab`, `Shift + Tab`, `Entrée`). Lorsqu'on ouvre une popup, il faut lui donner le focus pour que la navigation puisse être continuée dans le bon ordre.

``` html
// Add tabindex="0"
<div class="modal" id="modal2" tabindex="0">
  ...
</div>
```

Lorsqu'on quitte la popup (`Esc`), le focus est perdu. Idéalement, le focus doit être replacé à l'endroit où il était avant d'ouvrir la popup. Pour ce faire, il faut sauvegarder l'endroit où le focus était au moment d'ouvrir la popup.


``` js
// Variable for storing the last focused element
var lastFocusedElement;

// Use the focus() method to set focus
function showModal() {
  ...

  // Store the last focused element
  lastFocusedElement = document.activeElement;

  var modal = document.getElementById('modal2');
  modal.focus();

  ...
}

function removeModal() {
  ...

  // Return the focus to the last focused element
  lastFocusedElement.focus();

  ...
}
```

[CodePen popup sans focus](https://codepen.io/matuzo/full/YNyPMj/), [CodePen popup avec focus](https://codepen.io/matuzo/full/pRNVJN/).

Il est conseillé de s'assurer que le focus reste dans la popup tant qu'elle est ouverte.  
[CodePen popup avec keyboard trap](https://codepen.io/matuzo/full/GrNdvK/)

### Changement de contenu

Si du contenu est généré dynamiquement et inséré dans le DOM, seuls les utilisateurs qui voient l'écran le sauront.
En ajoutant un `role` "status" ou "alert" à un élément, les lecteurs d'écran vont lire cet élément dès que le texte qu'il contient change.

``` html
<div class="message" role="status">Changes saved!</div>
```

Un "alert" va interrompre le lecteur d'écran s'il est en train de lire autre chose.  
"status" va attendre que le lecteur d'écran ait finit de lire.

L'aria `aria-live` a le même effet, `aria-live="polite"` est l'équivalent de `role="status"` et `aria-live="assertive"` de `role="alert"`. On peut utiliser les deux attributs, role et aria-live pour un meilleur support du navigateur.

``` html
<div role="alert" aria-live="assertive"></div>
```

Éviter des créer des messages qui disparaissent automatiquement - ils peuvent disparaître trop rapidement.

[Voir effet role="status" (vidéo)](https://www.youtube.com/watch?v=YPOpIHUtkPo&feature=youtu.be)

[Exemple de composants accessibles](https://inclusive-components.design/) (onglets, slider, tooltips, etc)
