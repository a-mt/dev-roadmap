---
title: Les bases de XML
category: Web, XML
---

Le XML (eXtensible Markup Language) est un langage de balisage générique. Les données sont encapsulées dans des balises, qui permettent de structurer de manière logique le contenu. Les balises ne véhiculent a priori pas d'information de présentation mais de sémentique.

Il est utilisé avec d'autres langages
- dédiés à la présentation: CSS, XSL
- dédiés aux traitements: XSLT, Xquery, APIs

Le XML est extensible (on dit que c'est un *méta-langage*). Il permet de définir différents espaces de noms (c'est à dire des environnements qui apportent leur propre structure), parmis les plus connus: XHTML, XSLT, RSS et SVG.

<ins>Format d'un document XML</ins> :

``` xml
<?xml version='1.0' encoding='UTF-8' standalone='no' ?>
<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>
```

---

## En-tête

### Prologue

Un document XML commence par un prologue qui indique
- la version XML
- l'encodage (ISO-8859-1, UTF-8 (par défaut) ou UTF-16)
- s'il fail appel à des ressources externes ou non (standalone)

``` xml
<?xml version='1.0' encoding='UTF-8' standalone='no' ?>
```

### Doctype

Le prologue est éventuellement suivit d'un doctype

```
<!DOCTYPE carnet PUBLIC "-//xxx/Yyy/en" "http://www..." [ .... ]>
```

### Feuille de style

Le document peut éventuellement inclure un feuille de style CSS ou XSL.

``` xml
<?xml-stylesheet type="text/xsl" href="style.xsl"?>
```

``` xml
<?xml-stylesheet type="text/css" href="style.css"?>
```

---

## Commentaires

Des commentaires peuvent être ajoutée entre `<!--` et `-->`.  
Un commentaire peut s'étendre sur plusieurs lignes.  
Il ne doivent pas contenir la séquence `--`

    <!-- Commentaire -->

---

## Éléments

Un document XML est un hiérarchie d'éléments délimités par des balises ouvrantes et fermantes. Chaque élément peut contenir des éléments fils et/ou du contenu texte ou rien (vides).

``` xml
<chapitre>...</chapitre>
```

L'imbrication et l'ordre des éléments reflètent la structure logique

``` xml
<ol xml:lang="fr">
  <li>Des balises décrivent la structure</li>
  <li>Structure arborescente</li>
</ol>
```

Un élément vide peut être écrit soit avec des balises vides, soit avec une balise auto-fermante

``` xml
<interligne></interligne>
```

``` xml
<interligne/>
```

### Attributs

Les éléments peuvent avoir des attributes (zéro, un ou plusieurs), qui ajoutent des précisions à la sémantique des éléments. Exemples: language, statut, identifiant, etc.

``` xml
<chapitre version="provisoire" date="16/06/03">...</chapitre>
```

Les balises <ins>ouvrantes</ins> portent les attributs.  
Un élément ne peut pas porter plusieurs attributs de même nom.  
Les attributs d'un même élément n'ont pas d'ordre.

### Noms XML

Les noms des balises et des attributs sont sensibles à la casse.  
Ils ne contiennent que des caractères alphanumériques ou `.` `-` `_` `:` et peuvent pas commencer par un nombre ou un signe de ponctuation.

Une bonne pratique est d'éviter les caractères accentués et les opérateurs, virgules, point-virgules, mais ce n'est pas obligatoire.

- Valides: `gras`, `énorme`, `_note`, `:couleur`, `Titre1`, `m.gras-2`, `большой`, `きなカラ`
- Invalides: `2gras`, `.chapitre`, `texte gras`

### Racine

Tout document XML a un élément racine, c'est à dire un élément qui contient l'intégralité du document.

``` xml
<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>
```

---

## Caractères

À l'intérieur des balises certains caractères peuvent être ambigus: `<` `>` `"` `'` `&`.

### Entités caractères

Pour cette raison, XML 1.0 définit des *entités* de caractères utilisables dans le document qui ne nécessitent aucune déclaration: `&lt;` `&gt;` `&quot;` `&apos;` `&amp;` (respectivement).

### Références caractères

On peut également utiliser des *références* de caractères, en utilisant le code décimal ou hexadécimal du caractère: `&#945;` `&#x3b1;`.

### CDATA

Des blocs de texte entiers peuvent être échappés dans un section *CDATA*.  
Exemple: `<![CDATA[<greeting>Hello!</greeting>]]>`. `<greeting>` et `</greeting>` sont considérées comme du contenu, pas comme des balises.

---

## Instructions de traitements (PI)

Les intructions de traitements sont des instructions additionnelles à la structure physique du XML:
- code de traitement embarqué

    ``` xml
    <?php  for(i=...) { faire_traitement(); } ?>
    ```

- emplacement de la sélection courante

    ``` xml
    <?FM select start ?>
    ```