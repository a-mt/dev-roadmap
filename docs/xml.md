---
title: XML
category: Web
---

## Document XML

* [Les bases de XML](xml-intro.md)

---

## Valider un document

Un document XML est bien formé si
- il respecte les règles syntaxiques XML (éléments, attributs, commentaires, PI, entités)
- il contient une racine unique
- tout élément ouvert est fermé

Mais des contrôles supplémentaires peuvent être ajoutés sur la *validité* du document
- quelles balises sont présentes dans un document
- quels attributs sont admis dans ces balises
- quelles balises peuvent contenir du texte
- quels sont les sous-éléments possibles dans un élément donné

Pour effectuer des contrôles de validité, il est nécessaire de définir la structure du XML. Parmi les syntaxes possibles pour définir des structures XML les plus connues sont
- [DTD](xml-dtd.md), syntaxe historique, aujourd'hui on utilise plutôt XSD
- [XML Schema (XSD)](xml-schema.md), le plus répandu (plus souple, syntaxe en XML)

---

## CSS

CSS (*Cascading Style Sheet*) est un langage de style qui permet de mettre en forme les documents (X)HTML et XML.

Le CSS doit être inséré au début du document:

``` xml
<?xml-stylesheet type="text/css" href="monStyle.css"?>
```

Exemple règles css contenus dans <ins>monStyle.css</ins> :

``` css
BookCatalogue { display: block; margin: 5%; font-size: 12pt }
Book { display: list-item; list-style: square; }
Title { display: block; font-size: large; }
Author { display: block;text-indent: 2em; }
ISBN { display: block;text-indent: 2em; font-weight: bold }
Date, Publisher { display: none }
```

---

## XSL

XSL (*eXtensible Stylesheet Language*) est un langage de style complet pour réordonner, dupliquer, changer la structure des éléments. Cela permet de construire des pages complexes (colonnes, tables des matières, etc) ou même de convertir un document xml en (x)html ou en pdf (via xslfo).

Le XSL doit être inséré au début du document:

``` xml
<?xml-stylesheet type="text/xsl" href="monStyle.xsl"?>
```

Exemple règles css contenus dans <ins>monStyle.xsl</ins> :

``` xml
<xsl:stylesheet version='1.0'
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <!-- règle de production pour <book> -->
  <xsl:template match="book">
    <p>a book</p>
  </xsl:template>
  <!-- règle de production pour <book lang="en"> -->
  <xsl:template match="book[lang='en']">
    <p>a book in english </p>
  </xsl:template>
  <!-- règle de production pour pour <title> -->
  <xsl:template match="title">
    <p>a title</p>
  </xsl:template>
</xsl:stylesheet>
```

[Syntaxe XSL](xml-xsl.md)

---

## XPath

XPath est un langage de localisation. Il permet d’écrire des “chemin d’accès” pour se déplacer dans la structure d’un document XML (des sélecteurs). Il propose un ensemble de fonctions prédéfinies pour gérer les expressions booléennes, les nombres et les chaînes de caractères.

On utilise XPath avec XSL mais pas que: les requêtes XPath peuvent souvent être implémentées par les langages de programmation qui permettent de manipuler du XML. Par exemple en PHP:

``` php
$xml  = simplexml_load_file('test.xml');
$node = $xml->xpath('child::*[@type="B"]');
```

[Syntaxe XPath](xml-xpath)
