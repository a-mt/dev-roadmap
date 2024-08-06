---
title: Fonctions gradient
category: Web, CSS, Valeurs
---

<style>
  table {
    table-layout: fixed;
    width: 100%;
  }
  table th:first-child,
  table td:first-child {
    width: 100%;
  }
  table th:last-child,
  table td:last-child {
    width: 200px;
  }
  table pre {
    margin-bottom: 1px !important;
  }
  table div {
    width: 150px;
    height: 42px;
    margin-bottom: 1px;
  }
</style>

## linear-gradient

* <ins>Exemple</ins>:

  ``` css
  div {
    background: linear-gradient(to right,red,orange,yellow,green,blue,indigo,violet);
  }
  ```

  <div style="width:100%; height: 50px; margin-bottom: 1em; background: linear-gradient(to right,red,orange,yellow,green,blue,indigo,violet);"></div>

* Un gradient linéaire (*linear-gradient*) commence à partir d'un bord de l'élément cible et finit au bord opposé.  

  <pre>
  linear-gradient( &lt;direction&gt;, &lt;colors&gt; )
  linear-gradient( &lt;colors&gt; )

  &lt;direction&gt; = &lt;angle&gt; | to [top | bottom | left | right]{1,2}
  &lt;angle&gt; = [-180..180]deg
  &lt;colors&gt; = (&lt;color&gt; [ &lt;length&gt; | &lt;percentage&gt; ]?)[, idem]{1,n}
  </pre>

  - On peut ajouter autant de couleurs qu'on veut, séparées par des virgules.
  - Indiquer la direction du dégradé avec le premier argument
  - Décider où une couleur va commencer en utilisant soit un pourcentage soit une valeur en pixels

  <ins>Quelques exemples</ins>:

  <table>
    <thead>
      <tr>
        <th>Exemple</th>
        <th>Rendu</th>
      </tr>
    </thead>
    <tbody>
      <tr valign="top">
        <td>
          <pre>(white, black)</pre>
          <pre>(to bottom, white, black)</pre>
          <pre>(180deg, white, black)</pre>
          <pre>(-180deg, white, black)</pre>
          <pre>(red,yellow,green,blue)</pre>
        </td>
        <td>
          <div style="background: linear-gradient(white, black);"></div>
          <div style="background: linear-gradient(to bottom, white, black);"></div>
          <div style="background: linear-gradient(180deg, white, black);"></div>
          <div style="background: linear-gradient(-180deg, white, black);"></div>
          <div style="background: linear-gradient(red,yellow,green,blue);"></div>
        </td>
      </tr>
      <tr valign="top">
        <td>
          <pre>(to top, white, black)</pre>
          <pre>(0deg, white, black)</pre>
        </td>
        <td>
          <div style="background: linear-gradient(to top, white, black);"></div>
          <div style="background: linear-gradient(0deg, white, black);"></div>
        </td>
      </tr>
      <tr valign="top">
        <td>
          <pre>(to right, white, black)</pre>
          <pre>(90deg, white, black)</pre>
        </td>
        <td>
          <div style="background: linear-gradient(to right, white, black);"></div>
          <div style="background: linear-gradient(90deg, white, black);"></div>
        </td>
      </tr>
      <tr valign="top">
        <td>
          <pre>(to left, white, black)</pre>
          <pre>(-90deg, white, black)</pre>
        </td>
        <td>
          <div style="background: linear-gradient(to left, white, black);"></div>
          <div style="background: linear-gradient(-90deg, white, black);"></div>
        </td>
      </tr>
      <tr valign="top">
        <td>
          <pre>(to top right, white, black)</pre>
          <pre>(45deg, white, black)</pre>
        </td>
        <td>
          <div style="background: linear-gradient(to top right, white, black);"></div>
          <div style="background: linear-gradient(45deg, white, black);"></div>
        </td>
      </tr>
      <tr valign="top">
        <td>
          <pre>(to top left, white, black)</pre>
          <pre>(-45deg, white, black)</pre>
        </td>
        <td>
          <div style="background: linear-gradient(to top left, white, black);"></div>
          <div style="background: linear-gradient(-45deg, white, black);"></div>
        </td>
      </tr>
      <tr valign="top">
        <td>
          <pre>(to bottom right, white, black)</pre>
          <pre>(135deg, white, black)</pre>
        </td>
        <td>
          <div style="background: linear-gradient(to bottom right, white, black);"></div>
          <div style="background: linear-gradient(135deg, white, black);"></div>
        </td>
      </tr>
      <tr valign="top">
        <td>
          <pre>(to bottom left, white, black)</pre>
          <pre>(-135deg, white, black)</pre>
        </td>
        <td>
          <div style="background: linear-gradient(to bottom left, white, black);"></div>
          <div style="background: linear-gradient(-135deg, white, black);"></div>
        </td>
      </tr>
      <tr valign="top">
        <td>
          <pre>(black,white 10px)</pre>
          <pre>(black,white 10px,black)</pre>
          <pre>(to right,red,yellow 70%,red)</pre>
          <pre>(to right,red,yellow 15px,red)</pre>
        </td>
        <td>
          <div style="background: linear-gradient(black,white 10px);"></div>
          <div style="background: linear-gradient(black,white 10px,black);"></div>
          <div style="background: linear-gradient(to right,red,yellow 70%,red);"></div>
          <div style="background: linear-gradient(to right,red,yellow 15px,red);"></div>
        </td>
      </tr>
    </tbody>
  </table>

<!--
![](https://gistcdn.githack.com/a-mt/e8516eba3ea182740ef712d960a46ecd/raw/36de75a84ac4933ed3c3d9c40676a47017c29518/linear-gradient.svg)
-->

---

## repeating-linear-gradient

* <ins>Exemple</ins>:

  ``` css
  div {
    background: repeating-linear-gradient(135deg, black, black .25em, white 0, white .75em);
  }
  ```

  <div style="width:100%; height: 50px; margin-bottom: 1em; background: repeating-linear-gradient(135deg, black, black .25em, white 0, white .75em);"></div>

* Le gradient linéaire avec répétition (*repeating-linear-gradient*) fonctionne de la même manière qu'un dégradé linéaire mais répère les couleurs définies indéfiniment sur la largeur. Ça permet notamment de créer des motifs.  
  La définition du dégradé est la même qu'un linear-gradient

  <ins>Quelques exemples</ins>:

  <table>
    <thead>
      <tr>
        <th>Exemple</th>
        <th>Rendu</th>
      </tr>
    </thead>
    <tbody>
      <tr valign="top">
        <td>
          <pre>(135deg, black, black .25em, white 0, white .75em)</pre>
          <pre>(45deg,black,white 10px)</pre>
        </td>
        <td>
          <div style="background: repeating-linear-gradient(135deg, black, black .25em, white 0, white .75em)"></div>
          <div style="background: repeating-linear-gradient(45deg,black,white 10px);"></div>
        </td>
      </tr>
      <tr valign="top">
        <td>
          <pre>(135deg,black,white,black,white,black) + background-size 10px</pre>
          <pre>(135deg,black,white,black,white,black) + background-size 20px</pre>
        </td>
        <td>
          <div style="background: linear-gradient(135deg,black,white,black,white,black); background-size:10px 10px"></div>
          <div style="background: linear-gradient(135deg,black,white,black,white,black); background-size:20px 20px"></div>
        </td>
      </tr>
      <tr valign="top">
        <td>
          <pre>(45deg,black,white) + background-size 10px</pre>
          <pre>(45deg,black,white) + background-size 20px</pre>
        </td>
        <td>
          <div style="background: linear-gradient(45deg,black,white); background-size:10px 10px;"></div>
          <div style="background: linear-gradient(45deg,black,white); background-size:20px 20px;"></div>
        </td>
      </tr>
    </tbody>
  </table>

<!--
![](https://gistcdn.githack.com/a-mt/ae5ee414ed9ee0ddeb66d71615319575/raw/ad6bd644d364b4635452bad47d95a2dcd8171f45/repeating-linear-gradient.svg)
-->

---

## radial-gradient

* <ins>Exemple</ins>:

  ``` css
  div {
    background: radial-gradient(red,orange,yellow,green,blue,indigo,violet); 
  }
  ```

  <div style="width:100%; height: 50px; margin-bottom: 1em; background: radial-gradient(red,orange,yellow,green,blue,indigo,violet);"></div>

* Un gradient radial (*radial-gradient*) commence à partir d'un point et s'étend jusqu'aux bords.

  - Plutôt que de contrôler la taille, on peut contrôler jusqu'où le dégradé s'étend: s'arrêter lorsque le cercle touche un côté ou un coin

    - farthest-side: s'arrêter lorsque le cercle touche le bord le plus éloigné du centre
    - closest-side: ...le bord le plus proche du centre
    - farthest-corner: ...le coin le plus éloigné du centre
    - closest-corner: ...le coin le plus proche du centre

  <pre>
  radial-gradient( &lt;colors&gt;  )
  radial-gradient( at &lt;position&gt;, &lt;colors&gt;  )
  radial-gradient( [ circle | &lt;length&gt; ] [ at &lt;position&gt; ]?, &lt;colors&gt; )
  radial-gradient( [ ellipse | [ &lt;length&gt; | &lt;percentage&gt; ]{2} ] [ at &lt;position&gt; ]?, &lt;colors&gt; )
  radial-gradient( [ circle | ellipse ]? &lt;extent-keyword&gt; [ at &lt;position&gt; ]?, &lt;colors&gt; )

  &lt;position&gt; = at [ left | center | right | top | bottom | &lt;percentage&gt; | &lt;length&gt; ]{1,2}
  &lt;extent-keyword&gt; = [ closest-corner | closest-side | farthest-corner | farthest-side ]
  </pre>

  <ins>Quelques exemples</ins>:

  <table>
    <thead>
      <tr>
        <th>Exemple</th>
        <th>Rendu</th>
      </tr>
    </thead>
    <tbody>
      <tr valign="top">
        <td>
          <pre>(white, black)</pre>
          <pre>(ellipse,white,black)</pre>
          <pre>(circle,white,black)</pre>
          <br>
          <pre>(10px, white, black)</pre>
          <pre>(20px 10px, white, black)</pre>
          <pre>(ellipse 25% 25%, white, black)</pre>
        </td>
        <td>
          <div style="background: radial-gradient(white, black);"></div>
          <div style="background: radial-gradient(ellipse,white,black);"></div>
          <div style="background: radial-gradient(circle,white,black);"></div>
          <br>
          <div style="background: radial-gradient(10px, white, black);"></div>
          <div style="background: radial-gradient(20px 10px, white, black);"></div>
          <div style="background: radial-gradient(ellipse 25% 25%, white, black);"></div>
        </td>
      </tr>
      <tr valign="top">
        <td>
          <pre>(black, white, black)</pre>
          <pre>(black, white 25px, black)</pre>
          <pre>(black, white 25%, black)</pre>
        </td>
        <td>
          <div style="background: radial-gradient(black, white, black);"></div>
          <div style="background: radial-gradient(black, white 25px, black);"></div>
          <div style="background: radial-gradient(black, white 25%, black);"></div>
        </td>
      </tr>
      <tr valign="top">
        <td>
          <pre>(farthest-side, white, black)</pre>
          <pre>(farthest-side at 30% 50%, white, black)</pre>
          <br>
          <pre>(closest-side, white, black)</pre>
          <pre>(closest-side at 30% 50%, white, black)</pre>
          <br>
          <pre>(farthest-corner, white, black)</pre>
          <pre>(farthest-corner at 30% 50%, white, black)</pre>
          <br>
          <pre>(closest-corner, white, black)</pre>
          <pre>(closest-corner at 30% 50%, white, black)</pre>
        </td>
        <td>
          <div style="background: radial-gradient(farthest-side, white, black);"></div>
          <div style="background: radial-gradient(farthest-side at 30% 50%, white, black);"></div>
          <br>
          <div style="background: radial-gradient(closest-side, white, black);"></div>  
          <div style="background: radial-gradient(closest-side at 30% 50%, white, black);"></div>
          <br>
          <div style="background: radial-gradient(farthest-corner, white, black);"></div>  
          <div style="background: radial-gradient(farthest-corner at 30% 50%, white, black);"></div>
          <br>
          <div style="background: radial-gradient(closest-corner, white, black);"></div>
          <div style="background: radial-gradient(closest-corner at 30% 50%, white, black);"></div>
        </td>
      </tr>
      <tr valign="top">
        <td>
          <pre>(ellipse farthest-side at 50% 0, white, black 25%, white 75%, black)</pre>
          <pre>(ellipse farthest-side at 0 50%, white, black 25%, white 75%, black)</pre>
          <br>
          <pre>(circle closest-side at 20% 50%, white, white 25%, black 50%, white 75%, black)</pre>
          <pre>(circle closest-side at 20%, white, white 25%, black 50%, white 75%, black)</pre>
        </td>
        <td>
          <div style="background: radial-gradient(ellipse farthest-side at 50% 0, white, black 25%, white 75%, black);"></div>
          <div style="background: radial-gradient(ellipse farthest-side at 0 50%, white, black 25%, white 75%, black);"></div>
          <br>
          <div style="background: radial-gradient(circle closest-side at 20% 50%, white, white 25%, black 50%, white 75%, black);"></div>
          <div style="background: radial-gradient(circle closest-side at 20%, white, white 25%, black 50%, white 75%, black);"></div>
        </td>
      </tr>
    </tbody>
  </table>

<!--
![](https://gistcdn.githack.com/a-mt/04ff059e100c4d08155cfa96d1d40110/raw/8b0cf57bf0bd76a2facd627995b5c454bc5955aa/radial-gradient.svg)
-->

## repeating-radial-gradient

* <ins>Exemple</ins>:

  ``` css
  div.repeating-gradient {
    background: repeating-radial-gradient(black 10px, #009966, purple 50px);
  }
  div.background-size {
    background: radial-gradient(black 1px, #009966, purple 10px);
    background-size: 10px 10px;
  }
  ```

  <div style="width:100%; height: 50px; margin-bottom: 1em; background: repeating-radial-gradient(black 10px, #009966, purple 50px);"></div>
  <div style="width:100%; height: 50px; margin-bottom: 1em; background: radial-gradient(black 1px, #009966, purple 10px); background-size:10px 10px;"></div>

* Un *gradial radial avec répétition* (repeating-radal-gradient) se répéte infiniment, toujours à partir du point d'origine — tandis qu'utiliser radial-gradient avec background-size aura pour effet de répéter la même forme à partir de différents points d'origine.  
  La définition est identique à radial-gradient

<!--
![](https://gistcdn.githack.com/a-mt/e6f8e4b864a74095a95e5865836e46e9/raw/b658fa28fba84a9fbe27b6d966a76cb3bf89e6f8/repeating-radial-gradient.svg)
-->

## Liens utiles

- [JSFiddle gradients](https://jsfiddle.net/amt01/p2koxpkq/)
- [Snippets de boutons avec gradient](http://web.archive.org/web/20171031230753/http://demo.themezilla.com/blox/zilla-shortcodes/)
- [Éditeur de gradient](http://www.colorzilla.com/gradient-editor/)
- [Gallerie de motifs via gradients](http://lea.verou.me/css3patterns/)
