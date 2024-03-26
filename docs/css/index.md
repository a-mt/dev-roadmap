---
title: CSS
category: Web
---

* [Les bases de CSS](css-intro.md)
* [Les sélecteurs](css-selecteurs.md)
* [Les valeurs](css-values.md)
* [Les propriétés](css-proprietes.md)
* [Les at-rules](css-atrules.md)
* [Les conventions de nommage (OOCSS, BEM, SMACSS)](css-nommage.md)

---

* Les *frameworks CSS* sont des feuilles de style prêtes à l'emploi qui permettent de facilement mettre en forme un site web grâce à l'utilisation de classes. La plupart des frameworks fournissent également des icônes et du javascript, que l'on peut utiliser créer des boutons et des popups par exemple.

    Le sont plus connus sont

    - [Bootstrap twitter](http://getbootstrap.com/)
    - [Materialize](http://materializecss.com/)
    - [Foundation](https://foundation.zurb.com/)
    - [Pure.css](https://purecss.io/)
    - [Base](http://getbase.org/)
    - [Normalize](http://necolas.github.io/normalize.css/)

---

* Les *préprocesseurs CSS* sont des logiciels qui ont été crées pour générer dynamiquement des fichier CSS, à partir d'un document écrit dans un langage proche du CSS mais avec des fonctionnalités supplémentaires. Par exemple:

    - les variables

      ``` scss
      @fontcolor: #333;
      p {
        color: @fontcolor;
      }
      ```

    - l'imbrication des sélecteurs

      ``` scss
      #header {
          p { }
      }
      ```

    - les mixins

      ``` scss
      .rounded-corners(@radius: 5px) {
        border-radius: @radius;
        -webkit-border-radius: @radius;
        -moz-border-radius: @radius;
      }
      #header {
        .rounded-corners(10px);
      }
      ```

    - les opérateurs

      ``` scss
      @margin: 16px;
      #h1 {
          bottom-margin: @margin + 6;
      }
      ```

  LESS et SASS sont les préprocesseurs CSS les plus connus.  
  La création des propriétés personnalisées CSS a rendu l'usage des préprocesseurs moins utile.