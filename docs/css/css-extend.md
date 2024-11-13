---
title: Frameworks & préprocesseurs
category: Web, CSS
---

## Frameworks

* Les *frameworks CSS* sont des feuilles de style prêtes à l'emploi qui permettent de facilement mettre en forme un site web grâce à l'utilisation de classes. La plupart des frameworks fournissent également des icônes et du javascript, qu'on peut utiliser pour créer des boutons et des popups par exemple.

  Les sont plus connus sont

  - [Tailwind](https://tailwindcss.com/)
  - [Bootstrap twitter](http://getbootstrap.com/)
  - [Foundation](https://foundation.zurb.com/)
  - [Materialize](http://materializecss.com/)
  - [Pure.css](https://purecss.io/)
  - [Base](http://getbase.org/)

## CSS reset

* Parce que différents navigateurs ont différents styles par défaut, il est d'usage courant de "remettre à zéro" (*reset*) le style en début de feuille de style. Ça permet de s'assurer que le style appliqué les éléments HTML sera le même sur tous les navigateurs.

  Les principales propriétés concernées sont `margin`, `padding`, `border`, `font-size` et `line-height`.  
  Les frameworks CSS s'occupent généralement des resets, ou uil existe des frameworks uniquement pour du reset:

  - [Normalize](http://necolas.github.io/normalize.css/)

## Préprocesseurs

* Les *préprocesseurs CSS* sont des moteurs qui ont été crées pour générer dynamiquement des fichier CSS, à partir d'un document écrit dans un langage proche du CSS mais avec des fonctionnalités supplémentaires. Par exemple en SCSS, on peut effectuer des déclaration CSS comme suit:

  - variables

    ``` scss
    @fontcolor: #333;
    p {
      color: @fontcolor;
    }
    ```

  - sélecteurs imbriqués

    ``` scss
    #header {
      p { }
    }
    ```

  - mixins

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

  - opérateurs

    ``` scss
    @margin: 16px;
    #h1 {
        bottom-margin: @margin + 6;
    }
    ```

* LESS et SASS sont les préprocesseurs CSS les plus connus.  
  La création des variables CSS a rendu l'usage des préprocesseurs moins répandu, bien qu'ils soient encore très répandu, particulièrement pour l'imbrication des sélecteurs.
