---
title: DOM
category: Web, JavaScript
---

## Qu'est ce que le DOM

Quand un document structuré est chargé, XML ou HTML, le navigateur crée le DOM (Document Object Model), une représentation orientée objet de la page. [Exemple de page HTML](https://mdn.github.io/learning-area/javascript/apis/document-manipulation/dom-example.html):

``` html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Simple DOM example</title>
  </head>
  <body>
      <section>
        <img src="dinosaur.png" alt="A red Tyrannosaurus Rex: A two legged dinosaur standing upright like a human, with small arms, and a large head with lots of sharp teeth.">
        <p>Here we will add a link to the <a href="https://www.mozilla.org/">Mozilla homepage</a></p>
      </section>
  </body>
</html>
```

Et son DOM associé:

![](https://i.imgur.com/29D9bxY.png)

---

## Terminologie

Chaque balises et contenu texte du document est un noeud dans le DOM. Il existe différents termes pour décrire le type de noeud et sa position dans l'arbre du DOM par rapport à un autre. Il est utile de connaitre ces termes, puisqu'ils sont souvent utilisés dans les documentations.

<table>
    <thead
        <tr>
            <th>Terme</th>
            <th>Terme anglais</th>
            <th>Rôle</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Element</td>
            <td>Element</td>
            <td>N'importe quel élément, tel qu'il existe dans le DOM</td>
        </tr>
        <tr>
            <td>Texte</td>
            <td>Text</td>
            <td>Noeud constitué par une chaîne de caractère</td>
        </tr>
        <tr>
            <td>Racine</td>
            <td>Root</td>
            <td>La racine est le noeud de plus haut niveau dans le DOM. Dans le cas d'un document HTML, la racine est l'élément <code>&lt;html&gt;</code> (d'autres langages de balisage tels que SVG et XML auront es racines différentes).</td>
        </tr>
        <tr>
            <td>Enfant</td>
            <td>Child</td>
            <td>Un enfant est un noeud situé à l'intérieur d'un autre noeud, niveau+1.<br> <code>&lt;body&gt;</code> est l'enfant de <code>&lt;html&gt;</code>
            </td>
        </tr>
        <tr>
            <td>Descendant</td>
            <td>Descendent</td>
            <td>Un descendant est noeud situé à l'intérieur d'un autre noeud, niveau+n.<br> <code>&lt;section&gt;</code> est un descendant de <code>&lt;html&gt;</code> mais pas son enfant</td>
        </tr>
        <tr>
            <td>Parent</td>
            <td>Parent</td>
            <td>Le parent d'un noeud est le noeud qui le contient, niveau-1.<br> <code>&lt;body&gt;</code> est le parent de <code>&lt;section&gt;</code>
            </td>
        </tr>
        <tr>
            <td>Ancêtre</td>
            <td>Ancestor</td>
            <td>Un ancêtre d'un noeud est le noeud qui le contient, niveau-n.<br> <code>&lt;html&gt;</code> est un ancêtre de <code>&lt;section&gt;</code>
            </td>
        </tr>
        <tr>
            <td>Frère</td>
            <td>Sibling</td>
            <td>Un frère d'un noeud est un noeud qui a le même parent.<br> <code>&lt;img&gt;</code> est le frère de <code>&lt;p&gt;</code>.</td>
        </tr>
    </tbody>
</table>

---

## API DOM

Le contenu de la page est stocké dans le DOM et on peut y accéder/le manipuler via JavaScript grâce à une API - l'API DOM. L'API DOM définit un ensemble de méthodes et propriétés sur les éléments du DOM, selon le type de l'élement. Cela peut permettre par exemple de lire ou modifier du contenu.

Le noeud de plus haut niveau de la page, la racine, est contenue dans l'objet global `document`.
On utilise cet objet pour pouvoir accéder à tout élément dans la page.
Par exemple, pour changer le contenu de l'élément ayant l'id "paragraph":

``` js
document.getElementById("paragraph").textContent = "Bonjour tout le monde";
```

ou

``` js
document.getElementById("paragraph").innerHTML = "<strong>Bonjour</strong> tout le monde";
```

Notez que le DOM est crée est fur et à mesure du chargement de la page. Il est conseillé de n'y accéder qu'une fois la page complètement chargée, et ce afin que le DOM soit entier.

``` js
window.onload = function(){
  // Accéder au DOM une fois la page chargée
}
```

---

### Sélectionner des éléments

Il existe différentes méthodes pour sélectionner un élément:

<table>

<tr><th align="left">document.getElementById(id)</th></tr>
<tr><td>Récupère l'élément avec l'id donné.<br>
Retourne un HTMLElement ou null.<br><br>
<pre lang="js">var element = document.getElementById("myid");</pre>
</td></tr>

<tr><th align="left">element.getElementsByTagName(name)</th></tr>
<tr><td>Récupère la liste d'éléments du tag donné.<br>
Retourne un HTMLCollection (un objet array-like).<br>
Peut être appelé sur `document` ou sur un HTMLElement.<br><br>
<pre lang="js">var elements = element.getElementsByTagName("p");

for(var i=0; i<elements.length; i++) {
    console.log(elements[i].textContent);
}</pre>
</td></tr>

<tr><th align="left">element.getElementsByClassName(className) &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th></tr>
<tr><td>Récupère la liste d'éléments avec la classe donnée.<br>
Retourne un HTMLCollection.<br>
Peut être appelé sur `document` ou sur un HTMLElement.<br><br>
<pre lang="js">var elements = element.getElementsByClassName("myclass");

for(var i=0; i<elements.length; i++) {
    console.log(elements[i].textContent);
}</pre>
</td></tr>

<tr><th align="left">element.querySelector(selector)</th></tr>
<tr><td>Récupère le premier élément qui correspond au sélecteur donné (sélecteur CSS).<br>
Retourne un HTMLElement ou null.<br>
Peut être appelé sur `document` ou sur un HTMLElement.<br><br>
<pre lang="js">element.querySelector("p.myclass");</pre>
</td></tr>

<tr><th align="left">element.querySelectorAll(selector)</th></tr>
<tr><td>Récupère la liste d'éléments qui correspondent au sélecteur donné (sélecteur CSS).<br>
Retourne un HTMLCollection.<br>
Peut être appelé sur `document` ou sur un HTMLElement.<br><br>
<pre lang="js">var elements = element.querySelectorAll("p.myclass");

for(var i=0; i<elements.length; i++) {
    console.log(elements[i].textContent);
}</pre></td></tr>

</table>

L'accès au DOM est très lent par rapport aux autres instructions JavaScript.  
Si vous prévoyez d'accéder à un même élément à de multiples reprises, mieux vaut le sélectionner une seule fois en l'assignant à une variable locale, puis utiliser l'élément en mémoire pour effectuer des modifications.

``` js
var element = document.getElementById("myid"),
    url     = element.getAttribute('data-url');

element.setAttribute('src', url);
element.removeAttribute('data-url');
```

---

### Modifier des éléments

Il existe différentes propriétés et méthodes pour accéder et modifier les valeurs d'un HTMLElement.

#### Le contenu

On peut définit le texte d'un élément avec la propriété `textContent` (le HTML est échappé)

``` js
element.textContent = "Mon texte"
```

Ou directement le HTML avec la propriété `innerHTML`.

``` js
element.innerHTML   = "Mon <strong>HTML</strong>"
```

#### Les attributs

On peut récupérer la valeur d'un attribut, en définir de nouveaux ou changer leur valeur, ou encore en supprimer.

``` js
// Récupérer la valeur
element.getAttribute('id')
```

``` js
// Définit la valeur
element.setAttribute('id', 1)
```

``` js
// Supprimer l'attribut
element.removeAttribute('id')
```

##### Le style

Plutôt que d'utiliser les méthodes `getAttribute`, etc, on peut récupérer/définir les styles d'un élément - individuellement - avec la propriété `style`:

``` js
element.style.left = '12px';
```

Les propriétés CSS composées s'écrivent avec la norme camelCase en JavaScript.  
Par exemple `font-family` devient `fontFamily`.

``` js
element.style.lineHeight = '30px';
```

##### La classe

De même, on peut utiliser la propriété `classList` pour récupérer la liste des classes de l'élément (objet DOMTokenList) et ainsi vérifier la présence d'une classe, ajouter, supprimer ou remplacer une classe.

``` js
element.classList.contains('myclass')
element.classList.add('newclass')
element.classList.remove('oldclass')
element.classList.replace('oldclass', 'newclass')
```

La valeur de l'attribut `class` (chaîne de caractères) peut être récupérée avec la propriété `className`. C'est un raccourci pour `getAttribute("class")`.

``` js
element.className
```

##### Les metadonnées

HTML5 permet d'associer des données à un élément HTML à l'aide des attributs data-*.  
La propriété `dataset` permet de récupérer et modifier ces valeurs

``` js
// Définir une métadonnée
element.dataset.prop = "test";
```

``` js
// Récupérer une métadonnée
console.log(element.dataset.prop);
```

Ce qui revient à

``` js
console.log(element.getAttribute("data-prop"));
```

[Exemple dataset](https://jsfiddle.net/amt01/kxsxgpdg/)

---

### Ajouter des éléments

#### Créer un élément

Pour créer un élément, on utilise la méthode `createElement(tagName)`.
Une fois l'élément créé, on peut modifier ses attributs et son contenu avant de l'ajouter au DOM - moment où il devient visible à l'écran. Par exemple, pour ajouter un nouveau paragraphe à `<body>`:

``` js
var element = document.createElement('p');     // crée un paragraphe
element.textContent = "Bonjour tout le monde"; // change le contenu du paragraphe
document.body.appendChild(element);            // ajoute l'élément nouvellement créé au DOM
```

#### Changer de parent

Pour changer le parent d'un élément, on urilise la méthode `appendChild(element)` sur le parent désiré.
Cela permet d'ajouter un élément nouvellement crée au DOM ou bien de déplacer un élément pré-existant dans la page.

``` js
var element   = document.getElementById("myid"),
    newParent = document.getElementById("footer");

newParent.appendChild(element);
```

---

### Anciens navigateurs

Les méthodes de l'API DOM présentées ci-dessous sont les méthodes les plus couramment implémentées. Cependant, tous les navigateurs ne supportent pas tous les mêmes méthodes et notamment les anciens navigateurs.

Pour le support d'anciens navigateurs, on utilise souvent des librairies. De cette manière, on n'a plus besoin de savoir si tel ou tel navigateur implémente telle ou telle méthode, mais uniquement à utiliser les fonctions de la librairie.
La plus connue est sans aucun doute JQuery.
