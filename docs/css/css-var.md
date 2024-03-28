---
title: Variables
category: Web > CSS
---

Utiliser des variables (aussi appelées propriétés personnalisées *CSS custom properties* en anglais) évite d'avoir à copier/coller des valeurs partout dans le CSS et simplifie le développement, ce qui les rend très populaires.

## Définir

* Pour définir une variable:

  ``` css
  :root {
    --logo-color: blue;
  }
  header {
    --logo-color: red;
  }
  ```

* On peut également lire et modifier la valeur d'une variable CSS en JS:

  ``` js
  function readCssVar(element, varName){
    const elementStyles = getComputedStyle(element);
    return elementStyles.getPropertyValue(`--${varName}`).trim();
  }

  function writeCssVar(element, varName, value){
    return element.style.setProperty(`--${varName}`, value);
  }
  ```

## Utiliser

* Pour utiliser une variable:

  ``` css
  header {
    color: val(--logo-color);

    /* 10px is used because --box-margin is not defined. */
    margin: var(--box-margin, 10px);

    /* The --content-padding variable is used if --box-padding is not defined. */
    padding: var(--box-padding, var(--content-padding));
  }
  ```

## Vérifier le support

* En CSS:

  ``` css
  @supports (--a: 0) {
    body {
      color: --nomVar;
    }
  }
  ```

* En JS:

  ``` js
  const isSupported = window.CSS &&
      window.CSS.supports && window.CSS.supports('--a', 0);
```

## Variables CSS vs préprocesseur

* Quand on utilise une préprocesseur, on peut également définir des variables. Cependant

  - on ne peut pas changer les valeurs des variables dynamiquement
  - elles ne peuvent pas être lues ou modifiés à partir de JavaScript
  - elles ne dépendent pas du DOM

<!--
[It's Time To Start Using CSS Custom Properties](https://www.smashingmagazine.com/2017/04/start-using-css-custom-properties/)
-->