---
title: Fonctions globales
category: Web, CSS, Valeurs
---

## url

La fonction `url` permet d'inclure une image avec
* une URL absolue

  ``` css
  url("http://monsite.com/images/monimage.png")
  ```

* une URL relative à l'emplacement du fichier CSS en cours

  ``` css
  url("../images/monimage.png")
  ```

* ou une image encodée en base64

  ``` css
  url(data:image/png;base64,iVBORw0KGg=...)
  ```

  [Générer le code base64 d'une image](http://b64.io/)

## calc()

* <ins>Exemple</ins>:

  ``` css
  p {
    width: calc(100% - 80px);
  }
  ```

* La fonction `calc` permet de calculer une valeur numérique en effectuant un calcul arithmétique  
  entre deux valeurs numériques (de type &lt;number&gt;, &lt;dimension&gt; ou &lt;percentage&gt;).  
  Pour la multiplication et la division, la valeur à droite doit être de type &lt;number&gt;

* Les opérateurs autorisés sont:

  | Opérateur | Opération      |
  |---        |---             |
  | +         | Addition       |
  | -         | Soustraction   |
  | *         | Multiplication |
  | /         | Division       |

  Toujours entourer les opérateurs d'espaces.  

* La fonction calc peut être utilisée à tout emplacement prenant  
  une valeur de type `length`, `frequency`, `angle`, `time`, `number`, ou `integer`.

## attr

* <ins>Exemple</ins>:

  ``` css
  a:after {
    content: " (" attr(href) ")";
  }
  ```

* La fonction `attr` permet de récupérer la valeur d'un attribut.  
  Officiellement, cette fonction ne peut être utilisée que sur la propriété `content`.  
  Le support est expérimental sur les autres propriétés.

  ``` plain
  attr(<attr-name> <unit>)

  où <unit> = string | integer | color | url |
              integer | number | length | angle | time | frequency |
              em | ex | px | rem | vw | vh | vmin | vmax |
              mm | q | cm | in | pt | pc |
              deg | grad | rad | ms | s | Hz | kHz | %
  ```

[JSFiddle attr()](https://jsfiddle.net/amt01/nd6uxt4e/)
