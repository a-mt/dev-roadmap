---
title: Transformations
category: Web, CSS, Propriétés
---

Les transformations servent à modifier la forme et la position d'un élément HTML : étirer, faire tourner, etc.
Les transformations ne changent pas le flow document normal, c'est à dire que les éléments autour ignorent les transformations.  
On utilise généralement les transformations avec la propriété `transition` afin de créer des animations simples.  
[Exemples transformations 2D & 3D](https://jsfiddle.net/amt01/6enswd6e/)

## transform

``` plain
transform: <transform-function>
(CSS3)
Définit la ou les transformations à appliquer
```

``` plain
transform-origin: (<length> | <percentage> | left | center | right | top | bottom){1,2}
(CSS3)
Définit l'origine du repère pour les opérations de transformation
Par défaut se situe
    - au milieu (50% 50%) pour les éléments HTML
    - en haut à gauche (top left) pour les éléments SVG
```

``` plain
transform-box: border-box | fill-box | view-box
(CSS3)
Définit la boîte de référence utilisée par transform et transform-origin
Uniquement pour les éléments SVG
- border-box : bordure incluse
- fill-box   : contenu uniquement
- view-box   : utilise la viewBox la plus proche
```

[Exemples transform-origin](https://developer.mozilla.org/fr/docs/Web/CSS/transform-origin#Exemples)  
[Animation transform-origin](https://codepen.io/sdras/full/dVwaZG/)

``` plain
transform-style: flat | preserve-3d
(CSS3)
Définit si les enfants de l'élément doivent être considérés comme étant en 3d ou non
```

<ins>transform-function 2D</ins> :

<table>
  <thead>
    <tr>
      <th>Fonction</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>translate(X, Y)</code></td>
      <td>Déplace l’élément horizontalement et verticalement</td>
    </tr>
    <tr>
      <td><code>translateX(&lt;length&gt; | &lt;percentage&gt;)</code></td>
      <td>Déplace l’élément horizontalement</td>
    </tr>
    <tr>
      <td><code>translateY(&lt;length&gt; | &lt;percentage&gt;)</code></td>
      <td>Déplace l’élément verticalement</td>
    </tr>
    <tr>
      <td colspan="2"></td>
    </tr>
    <tr>
      <td><code>scale(X, Y)</code></td>
      <td>Redimensionne l’élément en largeur et en hauteur</td>
    </tr>
    <tr>
      <td><code>scaleX(&lt;number&gt;)</code></td>
      <td>Redimensionne l’élément en largeur</td>
    </tr>
    <tr>
      <td><code>scaleY(&lt;number&gt;)</code></td>
      <td>Redimensionne l’élément en hauteur</td>
    </tr>
    <tr>
      <td colspan="2"></td>
    </tr>
    <tr>
      <td><code>rotate(&lt;angle&gt;)</code></td>
      <td>Fait tourner l’élément autour d’un point fixe</td>
    </tr>
    <tr>
      <td colspan="2"></td>
    </tr>
    <tr>
      <td><code>skew(&lt;angle&gt;,&lt;angle&gt;)</code></td>
      <td>Étire l’élément sur la largeur et sur la hauteur</td>
    </tr>
    <tr>
      <td><code>skewX(&lt;angle&gt;)</code></td>
      <td>Étire l’élément sur la largeur</td>
    </tr>
    <tr>
      <td><code>skewY(&lt;angle&gt;)</code></td>
      <td>Étire l’élément sur la hauteur</td>
    </tr>
    <tr>
      <td colspan="2"></td>
    </tr>
    <tr>
      <td><code>matrix(a1,a2,b1,b2,tx,ty)</code></td>
      <td>Définit une matrice de transformation 2D<br>
Les transformations rotate, skew, etc sont des
<a href="https://jsfiddle.net/amt01/nwhx4kmo/">raccourcis pour les matrices de transformation</a> usuellement utilisées.<br>
<br>
Outils pour créer sa matrice :
<a href="http://peterned.home.xs4all.nl/matrices">Via drag & drop</a>
ou <a href="http://jsfiddle.net/nK2u7/103/">via slider</a><br>
<a href="http://meyerweb.com/eric/tools/matrix/">Convertir des transformations en matrice</a>
</td>
    </tr>
  </tbody>
</table>

Le pourcentage réfère à l'objet lui-même et non à son parent : `translateX(100%)` déplace l'élément à côté de l'endroit où il était (= déplacement de 100% de sa largeur)

``` scss
{
  transition: all 2s ease;
  &:hover {
    transform: rotateY(360deg);
  }
}
```

<ins>transform-function 3D</ins> :

Les transformations 3D héritent des transformations 2D et ajoutent un troisième axe : Z, qui permet de déplacer les éléments dans l'espace, comme des cartes postales ou des facettes de cube. 
[Exemples de transformations 3D](http://css3.bradshawenterprises.com/transforms/)

<table>
  <thead>
    <tr>
      <th>Fonction</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>perspective(&lt;length&gt;)</code></td>
      <td>Pour utiliser une transformation 3D, il faut spécifier la perspective. Elle définit la distance de vision par rapport à l'élément : plus la distance donnée est petite, plus l'objet est déformé. Elle se définit

<ul>
<li>soit via la propriété CSS <code>perpective: 500px</code></li>
<li>soit via la fonction de transformation <code>transform: perspective(500px)</code></li>
</ul>
</td>
    </tr>
    <tr>
      <td colspan="2"></td>
    </tr>
    <tr>
      <td><code>translate3d(X, Y, Z)</code></td>
      <td>Même principe que translate mais avec l’axe Z en plus</td>
    </tr>
    <tr>
      <td><code>translateZ(&lt;length&gt;)</code></td>
      <td>Déplace l’élément vers l’avant ou l’arrière</td>
    </tr>
    <tr>
      <td colspan="2"></td>
    </tr>
    <tr>
      <td><code>scale3d(X, Y, Z)</code></td>
      <td>Même principe que scale mais avec l’axe Z en plus</td>
    </tr>
    <tr>
      <td><code>scaleZ(&lt;number&gt;)</code></td>
      <td>Modifie la coordonnée en Z de chaque point de l’élément</td>
    </tr>
    <tr>
      <td colspan="2"></td>
    </tr>
    <tr>
      <td><code>rotate3d(X, Y, Z, &lt;angle&gt;)</code></td>
      <td>Fait tourner l’élément autour d’un axe</td>
    </tr>
    <tr>
      <td><code>rotateZ(&lt;angle&gt;)</code></td>
      <td>Déplace l’élément autour de l’axe Z</td>
    </tr>
    <tr>
      <td colspan="2"></td>
    </tr>
    <tr>
      <td><pre>matrix3d(a1,a2,a3,a4, b1,b2,b3,b4,
c1,c2,c3,c4, tx,ty,tz,d4)</pre></td>
      <td>Définit une matrice de transformation 3D<br> Même principe que matrix mais avec l'axe Z</td>
    </tr>
  </tbody>
</table>

``` css
{
  transform: rotate3d(0,1,0,60deg);
}
```

<ins>Multiples transformations</ins> :

Pour appliquer plusieurs transformations, les lister séparées par un espace.  
Les transformations ont un ordre, chaque transformation est calculée par dessus la somme des transformations précédentes. [Exemple ordre transformations](https://jsfiddle.net/amt01/23nm563L/)

``` css
{
  transform: scale(2,1) rotate(60deg);
}
```

## perspective

``` plain
perspective: <length>
(CSS3)
Définit la perspective (distance de vision par rapport à l'élément)
```

``` plain
perspective-origin: <length> | <percentage> | left | center | right | top | bottom
(CSS3)
Définit la position du point de fuite
Par défaut se situe au milieu (50% 50%)
```

## backface-visibility

``` plain
backface-visiblity: visible | hidden
(CSS3)
Définit si la face arrière de l'élément est visible ou non
```

[Exemple backface-visiblity avec cube](http://webkit.org/blog-files/3d-transforms/morphing-cubes.html)
