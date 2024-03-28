---
title: Fonctions transition
category: Web, CSS, Valeurs
---

## cubic-bezier

* <ins>Exemple</ins>:

  ``` css
  .block {
    transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
  }
  ```

* La fonction `cubic-bezier()` permet de définir un timing personnalisé pour une transition donnée.  

  ``` plain
  cubic-bezier(x1,y1,x2,y2)
  ```

  Les coordonnées indiquent les positions des poignées Bezier de début et de fin (entre 0 et 1).  
  La courbe créée correspond à l'accélération de l'animation au fil du temps:
  * plus la courbe est raide, plus l'animation est rapide
  * plus la courbe est plate, plus l'animation est lente
  * si la courbe fait des demi-tours, l'animation effectue des rebonds

  <ins>Quelques exemples</ins>:  
  [Courbes béziers](http://easings.net)

* Les mots clés `ease`, `linear`, `ease-in`, `ease-out`, `ease-in-out`  
  sont des raccourcis pour les courbes bézier usuelles.

  [Créer une courbe bézier](http://cubic-bezier.com)  
  [Courbes bézier usuelles](https://developer.mozilla.org//en-US/docs/Web/CSS/timing-function) 

## steps

* <ins>Exemple</ins>:

  ``` css
  .animate {
    animation: my-animation .8s steps(10) infinite;
  }
  ```

* La fonction steps permet d'afficher une animation par saccades,  
  ce qui peut permettre de simuler une animation GIF par exemple.

  ``` plain
  steps(<integer>, [start \| end])
  ```

  <ins>Quelques exemples</ins>:

  <table>
    <tbody>
      <tr valign="top">
        <td>
  <pre lang="css">/* Anime avec un sprite de 10 images */
  div {
    background-image: url("sprite-steps.png");
    height: 72px;
    width: 50px;
    animation: play .8s steps(10) infinite;
  }
  @keyframes play {
     from { background-position:    0px; }
       to { background-position: -500px; }
  }</pre>
        </td>
        <td>
  <style>
  .example-steps {
    background-image: url("{{ '!assets/img/sprite-steps.webp' | relative_url }}");
    height: 72px;
    width: 50px;
    animation: play .8s steps(10) infinite;
  }
  @keyframes play {
     from { background-position:    0px; }
       to { background-position: -500px; }
  }
  </style>
          <div class="example-steps"></div>
        </td>
      </tr>
      <tr valign="top">
        <td>
  <pre lang="css">/* Anime 5 caractères de largeur 1ch chacun */
  div {
    font-family: monospace;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;

    animation-name: typing;
    animation-iteration-count: infinite;
    animation-direction: reverse;

    animation-timing-function: steps(6,start);
    width: 6ch;
    animation-duration: 6s;
  }
  @keyframes typing {
      to { width: 0; }
  }</pre>
        </td>
        <td>
  <style>
  .exemple-typing {
      font-family: monospace;
      white-space: nowrap;
      overflow: hidden;
      display: inline-block;

      animation-name: typing;
      animation-iteration-count: infinite;
      animation-direction: reverse;

      animation-timing-function: steps(6,start);
      width: 6ch;
      animation-duration: 3s;
    }
    @keyframes typing {
      to { width: 0; }
    }
  </style>
          <div class="exemple-typing">Hello</div>
        </td>
      </tr>
    </tbody>
  </table>

  [Autres exemples d'animation avec steps](https://designmodo.com/demo/stepscss/index.html)

  <!--
  [JSfiddle background-image sprite animation](http://jsfiddle.net/simurai/CGmCe/light/)  
  [JSFiddle steps](https://jsfiddle.net/amt01/3e3o8y0q/)
  -->