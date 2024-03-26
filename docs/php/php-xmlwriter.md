---
title: XMLWriter
category: Web, PHP, XML
---

Permet de générer un fichier XML.

## Créer un objet

### __construct

Crée un objet `XMLWriter`.  
Pouvoir générer du XML, il faut ensuite appeler la méthode `openMemory` ou `openUri`

``` php
<?php
$xmlWriter = new XMLWriter();
```

### openMemory

Garde le texte généré en mémoire.

``` php
<?php
// Crée un writer XML
$xmlWriter = new XMLWriter();
$xmlWriter->openMemory();
$xmlWriter->setIndent(true);

// Génére le contenu
$xmlWriter->startDocument('1.0', 'UTF-8');
$xmlWriter->startElement('root');
    $xmlWriter->startElement('element');
        $xmlWriter->writeAttribute('type', 'product');
        $xmlWriter->text('content');
    $xmlWriter->endElement();
$xmlWriter->endElement();

// Affiche le tout
header('Content-type: text/xml');

echo $xmlWriter->outputMemory();
# <root><element type="product">content</element></root>
```

### openUri

Écrit le texte généré dans un fichier.

``` php
<?php
// Crée un writer XML
$xmlWriter = new XMLWriter();
$xmlWriter->openUri('tmp.xml');
$xmlWriter->setIndent(true);

// Génére le contenu
$xmlWriter->startDocument('1.0', 'UTF-8');
$xmlWriter->startElement('root');
    $xmlWriter->startElement('element');
        $xmlWriter->writeAttribute('type', 'product');
        $xmlWriter->text('content');
    $xmlWriter->endElement();
$xmlWriter->endElement();
```

### setIndent, setIndentString

`setIndent` définit si le XML doit être indenté ou non (pour le rendre plus lisible).  
Faux par défaut.

``` php
<?php
$xmlWriter->setIndent(true);
```

`setIndentString` définit le ou les caractère(s) à utiliser pour indenter.  
Par défaut: un seul espace.

``` php
<?php
$xmlWriter->setIndentString("    ");
```

### outputMemory

`outputMemory` retourne le buffer courant.

``` php
<?php
$xml = $xmlWriter->outputMemory();
```

---

## Définir la version XML

``` txt
&lt;?xml version="1.0" encoding="UTF-8"?>
```

### startDocument

Ouvre la balise `<?xml`.  
Définit la version XML utilisée ainsi que l'encodage.

``` php
<?php
$xmlWriter->startDocument('1.0', 'UTF-8');

# <?xml version="1.0" encoding="UTF-8"?>
```

### endDocument

Ferme toutes les balises ouvertes.

``` php
<?php
$xmlWriter->endDocument();
```

---

## Écrire du texte

### text

Écrit du texte dans le dernier élément ouvert, que ce soit une balise, un attribut, la DTD, etc.

``` php
<?php
$xmlWriter->startElement('example');
  $xmlWriter->text('content');
$xmlWriter->endElement();

# <example>content</example>
```

``` php
<?php
$xmlWriter->startElement('example');
  $xmlWriter->startAttribute('type');
    $xmlWriter->text('content');
  $xmlWriter->endAttribute();
$xmlWriter->endElement();

# <example type="content"/>
```

Les `text` ajoutés à la suite sont concaténés.

``` php
<?php
$xmlWriter->startElement('image');
  $xmlWriter->text('http://exemple/img/');
  $xmlWriter->text('noimage.png');
$xmlWriter->endElement();

# <image>http://exemple/img/noimage.png</image>
```

Le contenu HTML est automatiquement échappé.

``` php
<?php
$xmlWriter->startElement('example');
  $xmlWriter->text('<b>content</b>');
$xmlWriter->endElement();

# <example>&lt;b&gt;content&lt;/b&gt;</example>
```

``` php
<?php
$xmlWriter->startElement('example');
  $xmlWriter->startCData();
    $xmlWriter->text('<b>content</b>');
  $xmlWriter->endCData();
$xmlWriter->endElement();

# <example><![CDATA[<b>content</b>]]></example>
```

Il existe des caractères invalides en XML, le XML généré sera invalide si ces caractères ne sont pas supprimés.

``` php
<?php
/*
 * Suppression des caractères UTF8 non valide en XML
 * ex : "<tag>\x08Contient un caractère invalide</tag>"
 *
 * @link http://www.w3.org/TR/REC-xml/#charsets
 * != #x9 | #xA | #xD | [#x20-#xD7FF] | [#xE000-#xFFFD] | [#x10000-#x10FFFF]
 */
function esc($str) {
    return preg_replace(
      '/[^\x{0009}\x{000a}\x{000d}\x{0020}-\x{D7FF}\x{E000}-\x{FFFD}]+/u', ' ', $str
    );
}
```

### writeRaw

Même principe que `text` sauf que le contenu HTML n'est pas échappé.

``` php
<?php
$xmlWriter->writeRaw('<example>content</example>');

# <example>content</example>
```

---

## Ajouter des balises

``` txt
&lt;example>content&lt;/example>
&lt;ns:example xmlns:ns="http://uri">content&lt;/ns:example>
```

### startElement

Ouvre une balise.

``` php
<?php
$xmlWriter->startElement('example');

# <example>
```

### startElementNS

Ouvre une balise avec un namespace.

``` php
<?php
$xmlWriter->startElementNS('ns', 'example', 'http://uri');

# <ns:example xmlns:ns="http://uri">
```

### endElement

Ferme la dernière balise ouverte (avec ou sans namespace).  
Si la balise ne contient pas de de texte, génère une balise auto-fermante.

``` php
<?php
$xmlWriter->endElement();

# <example />
```

### fullEndElement

Ferme la dernière balise ouverte (avec ou sans namespace).  
Ajoute une balise fermante quand bien même l'élément ne contient aucun texte.

``` php
<?php
$xmlWriter->fullEndElement();

# <example></example>
```

### writeElement

Ajoute une balise avec du texte à l'intérieur.

``` php
<?php
$xmlWriter->writeElement('example', 'content');

# <example>content</example>
```

Les ajouts rapides sont disponibles pour toutes les balises. Ils sont pratiques si la balise déclarée est simple - qu'elle ne contient que du texte et n'a pas de namespace. Revient à appeler consécutivement `startElement`, `text` et `endElement`.

``` php
<?php
$xmlWriter->writeElement('example', 'content');

# <example>content</example>
```

``` php
<?php
$xmlWriter->startElement('example');
$xmlWriter->text('content');
$xmlWriter->endElement();

# <example>content</example>
```

Si la chaîne de caractères donnée en entrée est vide, ajoute une balise ouvrante suivie d'une balise fermante.

``` php
<?php
$xmlWriter->writeElement('element', '');

# <element></element>
```

### writeElementNS

Ajoute une balise avec un namespace avec du texte à l'intérieur.  
Revient à appeler consécutivement `startElementNS`, `text` et `endElement`.

``` php
<?php
$xmlWriter->writeElementNS('ns', 'example', 'http://uri', 'content');

# <ns:example xmlns:ns="http://uri">content</ns:example>
```

``` php
<?php
$xmlWriter->startElementNS('ns', 'example', 'http://uri');
  $xmlWriter->text('content');
$xmlWriter->endElement();

# <ns:example xmlns:ns="http://uri">content</ns:example>
```

---

## Ajouter des attributs

``` txt
&lt;example type="product" />
&lt;example ns:type="product" xmlns:ns="http://uri" />
```

### startAttribute

Ajoute un attribut au dernier élément ouvert.

``` php
<?php
$xmlWriter->startAttribute('type');

# <element type="">
```

### startAttributeNs

Ajoute un attribut avec un namespace au dernier élément ouvert.

``` php
<?php
$xmlWriter->startAttributeNs('ns', 'type', 'http://uri');

# <element xmlns:ns="http://uri" ns:type="">
```

### endAttribut

Ferme l'attribut (avec ou sans namespace).  
Les opérations suivantes, comme `text`, ne s'appliqueront plus à l'attribut.

``` php
<?php
$xmlWriter->endAttribute();
```

### writeAttribute

Ajoute un attribut au dernier élément ouvert avec du texte à l'intérieur.  
Revient à appeler consécutivement `startAttribute`, `text` et `endAttribute`.

``` php
<?php
$xmlWriter->startElement('element');
  $xmlWriter->writeAttribute('type', 'product');
$xmlWriter->endElement();

# <element type="product"/>
````

``` php
<?php
$xmlWriter->startElement('element');
  $xmlWriter->startAttribute('type');
    $xmlWriter->text('product');
  $xmlWriter->endAttribute();
$xmlWriter->endElement();

# <element type="product"/>
```

### writeAttributeNs

Ajoute un attribut avec un namespace au dernier élément ouvert avec du texte à l'intérieur.  
Revient à appeler consécutivement `startAttributeNs`, `text` et `endAttribute`.

``` php
<?php
$xmlWriter->startElement('example');
  $xmlWriter->writeAttributeNs('ns', 'type', 'http://uri', 'product');
$xmlWriter->endElement();

# <example ns:type="product" xmlns:ns="http://uri"/>
```

``` php
<?php
$xmlWriter->startElement('example');
  $xmlWriter->startAttributeNs('ns', 'type', 'http://uri');
    $xmlWriter->text('product');
  $xmlWriter->endAttribute();
$xmlWriter->endElement();

# <example ns:type="product" xmlns:ns="http://uri"/>
```

Si le même namespace existe entre la balise et l'attribut, il ne sera définit qu'une seule fois.

``` php
<?php
$xmlWriter->startElementNS('ns', 'example', 'http://uri');
  $xmlWriter->writeAttributeNs('ns', 'type', 'http://uri', 'product');
$xmlWriter->endElement();

# <ns:example ns:type="product" xmlns:ns="http://uri"/>
```

Il est possible de préfixer l'attribut d'un namespace sans le définir sur l'élément (par exemple s'il est définit à la racine du document XML), en mettant l'url à `null`.

``` php
<?php
$xmlWriter->startElementNS('ns', 'example', null);
  $xmlWriter->writeAttributeNs('ns', 'type', null, 'product');
$xmlWriter->endElement();

# <ns:example ns:type="product"/>
```

---

## Ajouter du texte CData

``` txt
&lt;description>&lt;![CDATA[ ... ]]>&lt;/description>
```

### startCData

Ajoute un élément Character Data.

``` php
<?php
$xmlWriter->startCData();

# <![CDATA[
```

### endCData

Ferme l'élément Character Data.

``` php
<?php
$xmlWriter->endCData();

# <![CDATA[ ]]>
```

### writeCData

Ajoute un élément Character Data avec du texte à l'intérieur.  
Revient à appeler consécutivement `startCData`, `text` et `endCData`.

``` php
<?php
$xmlWriter->startElement('description');
  $xmlWriter->writeCData('<b>Contient du HTML</b>');
$xmlWriter->endElement();

# <description><![CDATA[<b>Contient du HTML</b>]]></description>
```

``` php
<?php
$xmlWriter->startElement('description');
  $xmlWriter->startCData();
    $xmlWriter->text('<b>Contient du HTML</b>');
  $xmlWriter->endCData();
$xmlWriter->endElement();

# <description><![CDATA[<b>Contient du HTML</b>]]></description>
```

---

## Ajouter des commentaires

``` txt
&lt;!-- commentaire -->
```

### startComment

Ouvre un commentaire.

``` php
<?php
$xmlWriter->startComment();

# <!--
```

### endComment

Ferme le commentaire.

``` php
<?php
$xmlWriter->endComment();

# <!-- -->
```

### writeComment

Ajoute un commentaire avec du texte à l'intérieur.  
Revient à appeler consécutivement `startComment`, `text` et `endComment`.

``` php
<?php
$xmlWriter->startElement('description');
  $xmlWriter->writeComment('mon commentaire');
$xmlWriter->endElement();

# <description><!--mon commentaire--></description>
```

``` php
<?php
$xmlWriter->startElement('description');
  $xmlWriter->startComment();
    $xmlWriter->text('mon commentaire');
  $xmlWriter->endComment();
$xmlWriter->endElement();

# <description><!--mon commentaire--></description>
```

---

## Ajouter une DTD

La DTD (Document Type Definition) est délimitée, à l'intérieur d'un document, par la balise `!DOCTYPE`.  
Elle permet d'indiquer le format XML, qui pourra être utilisé pour valider le document (avec `xmllint` notamment).
Elle permet également d'importer des ressources externes (CSS, XSL).  
Elle est toujours placée en haut du document.  
[Écriture d'une DTD](http://www.grappa.univ-lille3.fr/~torre/Enseignement/Cours/XML/dtd.php).

``` txt
&lt;!DOCTYPE cv [
...
]>
&lt;cv>
...
&lt;/cv>
```

``` txt
&lt;!DOCTYPE cv SYSTEM "cv.dtd">
&lt;cv>
...
&lt;/cv>
```

### startDTD

Ouvre la DTD.
Définit l'élément racine du document.

``` php
<?php
$xmlWriter->startDTD('example');

# <!DOCTYPE example
```

On peut également spécifier un ID et un emplacement, afin de définir une DTD externe.

``` php
<?php
$xmlWriter->startDTD('html',
  '-//W3C//DTD XHTML 1.0 Strict//EN',
  'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'
);

/*
<!DOCTYPE html
PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
       "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
*/
```

### endDTD

Ferme la DTD.

``` php
<?php
$xmlWriter->endDTD();

# <!DOCTYPE example>
```

### writeDTD

Ajoute une DTD.  
Revient à appeler consécutivement `startDTD` et `endDTD`.

``` php
<?php
$xmlWriter->writeDTD('example');

# <!DOCTYPE example>
```

``` php
<?php
$xmlWriter->startDTD('example');
$xmlWriter->endDTD();

# <!DOCTYPE example>
```

---

## Ajouter des éléments DTD

Les éléments à l'intérieur de la DTD définissent les balises autorisées à l'intérieur du document XML et leur contenu.

``` txt
&lt;!ELEMENT description (#PCDATA)>
```

<ins>Syntaxe des éléments DTD</ins>:

| Exemple                                    | Description                                                    
|---                                         |---
| `<!ELEMENT about (#PCDATA)>`               | `<about>` contient du texte
| `<!ELEMENT identite (prenom,nom)>`         | `<identite>` contient `<nom>` et `<prenom>`
| `<!ELEMENT adresses (adresse+)>`           | `<adresses>` contient 1 à n `<adresse>`
| `<!ELEMENT contact (telephone,portable?)>` | `<contact>` contient `<telephone>` et 0 ou 1 `<portable>`
| <code>&lt;!ELEMENT experience ((stage&verbar;emploi)*)&gt;</code> | `<experience>` contient 0 à n `<stage>` ou `<emploi>`
| `<!ELEMENT headers (%metadata)>`           | `<headers>` contient les balises définies par l'ENTITY metadata*
| `<!ELEMENT br EMPTY>`                      | `<br>` ne contient rien
| `<!ELEMENT article ANY>`                   | `<article>` peut contenir n'importe quoi

&ast; `<!ENTITY % metadata "date_creation,date_modification">`

### startDTDElement

Ouvre un élément de DTD !ELEMENT.

``` php
<?php
$xmlWriter->startDTDelement('about');

# <!ELEMENT about>
```

### endDTDElement

Ferme le dernier élément de DTD.

``` php
<?php
$xmlWriter->endDTDElement();
```

### writeDTDelement

Ajoute un élément de DTD et sa définition.  
Revient à appeler consécutivement `startDTDElement`, `text`, et `endDTDElement`.

``` php
<?php
$xmlWriter->startDTD('example');
  $xmlWriter->writeDTDelement('about', '(#PCDATA)');
$xmlWriter->endDTD();

# <!DOCTYPE example [ <!ELEMENT about (#PCDATA)> ]>
```

``` php
<?php
$xmlWriter->startDTD('example');
  $xmlWriter->startDTDElement('about');
    $xmlWriter->text('(#PCDATA)');
  $xmlWriter->endDTDElement();
$xmlWriter->endDTD();

# <!DOCTYPE example [ <!ELEMENT about (#PCDATA)> ]>
```

---

## Ajouter des liste d'attributs DTD

Les attributs à l'intérieur de la DTD définissent les attributs autorisés sur les éléments à l'intérieur du document XML.

``` txt
&lt;!ATTLIST identité prénom CDATA #REQUIRED
                   nom    CDATA #REQUIRED
                   surnom CDATA #IMPLIED>
```

<ins>Type de l'attribut</ins>:

<table>
  <thead>
    <th>Type</th>
    <th>Description</th>
    <th>Exemple DTD/XML</th>
  </thead>
  <tbody>
    <tr valign="top">
      <td>CDATA</td>
      <td>Texte libre</td>
      <td><pre>&lt;!ATTLIST element label CDATA #IMPLIED>
&lt;!-- &lt;element label="Le libellé"> --></pre></td>
    </tr>
    <tr valign="top">
      <td>(val1, val2)</td>
      <td>Énumeration : val1 ou val2</td>
      <td><pre>&lt;!ATTLIST element paiement (CB&verbar;Cheque) #IMPLIED>
&lt;!-- &lt;element paiement="CB"> --></pre></td>
    </tr>
    <tr valign="top">
      <td>NMTOKEN</td>
      <td>Nom<br> Peut contenir des lettres, chiffres, un point <code>.</code>, un tiret <code>-</code>, un underline <code>_</code> et un deux-points <code>:</code></td>
      <td><pre>&lt;!ATTLIST element type NMTOKEN #IMPLIED>
&lt;!-- &lt;element type="product"> --></pre></td>
    </tr>
    <tr valign="top">
      <td>NMTOKENS</td>
      <td>Liste des noms<br> Séparés par des espaces</td>
      <td><pre>&lt;!ATTLIST element types NMTOKENS #IMPLIED>
&lt;!-- &lt;element types="product parent"> --></pre></td>
    </tr>
    <tr valign="top">
      <td>ID</td>
      <td>Identifiant<br> Nom unique par document, ne peut pas être un nombre</td>
      <td><pre>&lt;!ATTLIST element id ID #IMPLIED>
&lt;!-- &lt;element id="item1"> --></pre></td>
    </tr>
    <tr valign="top">
      <td>IDREF</td>
      <td>Référence à un ID</td>
      <td><pre>&lt;!ATTLIST element for IDREF #IMPLED>
&lt;!-- &lt;element for="item1"> --></pre></td>
    </tr>
    <tr valign="top">
      <td>IDREFS</td>
      <td>Liste de références<br> Séparées par des espaces</td>
      <td><pre>&lt;!ATTLIST element parent IDREFS #IMPLED>
&lt;!-- &lt;element parent="item1 item2"> --></pre></td>
    </tr>
    <tr valign="top">
      <td>ENTITY</td>
      <td>Entité</td>
      <td><pre>&lt;!ATTLIST element image ENTITY #IMPLIED>
&lt;!ENTITY a SYSTEM "a.gif">
&lt;!-- &lt;element image="a"> --></pre></td>
    </tr>
    <tr valign="top">
      <td>ENTITIES</td>
      <td>Liste d'entités<br> Séparées par des espaces</td>
      <td><pre>&lt;!ATTLIST element images ENTITIES #IMPLIED>
&lt;!ENTITY a1 SYSTEM "a1.gif">
&lt;!ENTITY a2 SYSTEM "a2.gif">
&lt;!ENTITY a3 SYSTEM "a3.gif">
&lt;!-- &lt;element images="a1 a2 a3"> --></pre></td>
    </tr>
  </tbody>
</table>

<ins>Modes de l'attribut</ins>:

| Mode         | Description               |
|---           |---                        |
| "get"        | Valeur par défaut = "get" |
| #REQUIRED    | Obligatoire               |
| #IMPLIED     | Facultatif                |
| #FIXED 'val' | Valeur fixée à "val"      |

### startDTDAttlist

Ouvre une liste d'attributs !ATTLIST pour l'élément donné.

``` php
<?php
$xmlWriter->startDTDAttlist('element');

# <!ATTLIST element>
```

Si la balise contient plusieurs attributs, ceux-ci doivent être séparés d'un retour à la ligne.

``` php
<?php
$xmlWriter->startDTDAttlist('identité');
$xmlWriter->text('prénom CDATA #REQUIRED' . "\n");
$xmlWriter->text('nom    CDATA #REQUIRED' . "\n");
$xmlWriter->text('surnom CDATA #IMPLIED');
$xmlWriter->endDTDAttlist();

/*
<!ATTLIST identité prénom CDATA #REQUIRED
                   nom    CDATA #REQUIRED
                   surnom CDATA #IMPLIED>
*/
```

### endDTDAttlist

Ferme la liste d'attributs.

``` php
<?php
$xmlWriter->endDTDAttlist();
```

### writeDTDAttlist

Ajoute une liste d'attributs DTD avec du texte.  
Revient à appeler consécutivement `startDTDAttlist`, `text` et `endDTDAttlist`.

``` php
<?php
$xmlWriter->startDTD('example');
  $xmlWriter->writeDTDAttlist('element', 'type CDATA #REQUIRED');
$xmlWriter->endDTD();

# <!DOCTYPE example [ <!ATTLIST element type CDATA #REQUIRED> ]>
```

``` php
<?php
$xmlWriter->startDTD('example');
  $xmlWriter->startDTDAttlist('element');
    $xmlWriter->text('type CDATA #REQUIRED');
  $xmlWriter->endDTDAttlist();
$xmlWriter->endDTD();

# <!DOCTYPE example [ <!ATTLIST element type CDATA #REQUIRED> ]>
```

---

## Ajouter des entités DTD

Une entité sert à générer des raccourcis et évite de répéter des informations, de manière à pouvoir facilement les modifier. Une entité peut être définie
- générale  
  Certaines entités sont déjà définies en XML : `&lt;` (<), `&gt;` (>), `&amp;` (&), `&quot;` ("), et `&apos;` (').

  ``` txt
  &lt;!ENTITY lt "&#60;">
  ```

- externe, analysée  
  Si l'URI fournie est un fichier texte, le contenu est analysé.

  ``` txt
   &lt;!ENTITY piedpage SYSTEM "pp.xml">
   ```

- externe, non analysée.  
  Déclare un contenu non XML (images, sons...).  
  `NDATA` (Notation DATA) identifie une `NOTATION` déclarée dans le DTD, qui précise le type de l'entité.

  ``` txt
  &lt;!NOTATION jpeg SYSTEM "image/jpeg">
  &lt;!ENTITY maphoto SYSTEM "toto.jpg" NDATA jpeg>
  ```

- ou paramètre (c'est à dire utilisée par un élément)

  ``` txt
  &lt;!ENTITY % metadata "date_creation,date_modification">
  ```

Certains navigateurs remplacent les entités utilisées dans le document par leurs véritables valeurs lorsqu'on visualise le document XML. Ce n'est pas le cas de Firefox et ce pour des raisons de sécurité.

### startDTDEntity

Ouvre une entité.

* paramètre

  ``` php
  <?php
  $xmlWriter->startDTDEntity('currency', true);

  # <!ENTITY % currency
  ```

* générale

  ``` php
  <?php
  $xmlWriter->startDTDEntity('currency', false);

  # <!ENTITY currency
  ```

### endDTDEntity

Ferme la dernière entité.

``` php
<?php
$xmlWriter->endDTDEntity();
```

### writeDTDEntity

Ajoute une balise entité avec du texte à l'intérieur.  
Revient à appeler consécutivement `startDTDEntity`, `text` et `endDTDEntity`.

``` php
<?php
$xmlWriter->startDTD('example');
  $xmlWriter->writeDTDEntity('currency', '€', false);
$xmlWriter->endDTD();

# <!DOCTYPE example [ <!ENTITY currency "€"> ]>
```

``` php
<?php
$xmlWriter->startDTD('example');
  $xmlWriter->startDTDEntity('currency', false);
    $xmlWriter->text('€');
  $xmlWriter->endDTDEntity();
$xmlWriter->endDTD();

# <!DOCTYPE example [ <!ENTITY currency "€"> ]>
```

---

## Instructions de traitements

Permet de définir des ressources externes pour styler l'affichage ou valider le document.  
Les PI (Processing Instruction) sont placées en début de document avant les DTD.

### startPI

Ouvre une PI.

``` php
<?php
$xmlWriter->startPI('xml-stylesheet');

# <?xml-stylesheet
```

### endPI

Ferme la dernière PI.

``` php
<?php
$xmlWriter->endPI();
```

### writePI

Ajoute une PI avec du texte à l'intérieur.  
Revient à appeler consécutivement `startPI`, `text` et `endPI`.

``` php
<?php
$xmlWriter->writePI('xml-stylesheet', 'type="text/css" href="style.css"');

# <?xml-stylesheet type="text/css" href="style.css"?>
```

``` php
<?php
$xmlWriter->startPI('xml-stylesheet');
$xmlWriter->text('type="text/css" href="style.css"');
$xmlWriter->endPI();

# <?xml-stylesheet type="text/css" href="style.css"?>
```