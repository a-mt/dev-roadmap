---
title: XSL
category: Web, XML
---

XSL (*eXtensible Stylesheet Language*) est un langage de style complet pour réordonner, dupliquer, changer la structure des éléments et construire des pages complexes (avec colonnes, tables des matières, etc). Il permet une présentation des données xml en (x)html ou en pdf (via xslfo).

Les feuilles de transformation XSLT sont des documents xml, régis par un schéma.  
On leur donne l'extension `.xslt` ou `.xsl`.

---

## Appliquer une feuille de style

### En shell

    xsltproc feuille.xsl document.xml > resultat.xml

### Dans le navigateur

En ajoutant la référence à la feuille de style à l'entête du fichier xml

``` xml
<?xml-stylesheet type="text/xsl" href="feuille.xsl"?>
```

---

## Transformation XML par XSL

Lors de la transformation XML par XSL, le document XML est parcouru dans l'ordre.
A chaque noeud XML (élément) rencontré, le système vérifie si un template dans le fichier XSL peut s'appliquer
- si non: il continue
- s'il en trouve un: il applique la règle contenu dans le template et poursuit le parcours après la fin de la balise
  (pas de parcours de la descendance d'un noeud traité)
- s'il en trouve plusieurs: il applique le template le plus spécifique

Les noeuds texte non traités sont copiés dans le résultat

<ins>document.xml</ins> :

``` xml
<?xml version="1.0"?>
<?xml:stylesheet type="text/xsl" href="style.xsl"?>
<biblio>
  <book lang="fr">
    <title>XML</title>
    <auteur>Jean Martin</auteur>
  </book>
  <book lang="en">
    <title>XML in action</title>
    <author>John Smith</author>
  </book>
  <paper>
    <title>XML software</title>
    <date>05/02/2002</date>
  </paper>
</biblio>
```

<ins>style.xsl</ins> :

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

<ins>Résultat de la transformation</ins> :

``` txt
<p>a book</p>
<p>a book in english </p>
<p>a title</p>
05/02/2002
```

---

## Structure du document XSL

### Prologue

Tout comme tout document XML, une feuille de style XSL commence par un prologue

``` xml
<?xml version="1.0"?>
```

### Namespaces

Suivit de la déclaration des espaces de nommages

``` xml
<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:fo="http://www.w3.org/1999/XSL/Format">
```

### Templates

Après l'entête, se situe des *templates* XSL, qui correspondent à un ou des noeuds de l'arbre source.  
Les templates contiennent des instructions XSL, des balises et du contenu à produire dans le document cible.  
On peut cibler les noeuds sélectionnés avec [XPath](xml-xpath.md) (syntaxe de sélection XML).


``` xml
<xsl:stylesheet version='1.0' xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <!-- S'applique la 1ere <section> -->
  <xsl:template match="section[1]">
    <p>Titre : <xsl:value-of select="title"/></p>
    <xsl:apply-templates select="authors"/>
  </xsl:template>

  <!-- S'applique à tous les <authors> -->
  <xsl:template match="authors">
    <p><xsl:value-of select="."/></p>
  </xsl:template>
</xsl:stylesheet>
```

À l'intérieur d'un template, le noeud courant est le noeud de l'arbre reconnu par l'attribut `match`.  
Les commandes XSL contenues dans le template peuvent également utiliser des expressions Xpath pour sélectionner des noeuds XML. Les expressions Xpath peuvent être absolues (racine de l'arbre source) ou relatives au noeud courant, mais la portée du noeud courant est le template pour lequel il est définit.

---

## Afficher une valeur

### value-of

Permet de récupérer le contenu des feuilles texte d'un sous-arbre

<ins>style.xsl</ins>  :

``` xml
<xsl:template match="compte">
  <p><xsl:value-of select="client"/></p>
  <p><xsl:value-of select="solde"/></p>
</xsl:template>
```

<ins>document.xml</ins> :

``` xml
<compte devise="euro">
  <numero>123456KL</numero>
  <client>
    <nom>Dupont</nom>
    <prenom>Michel</prenom>
  </client>
  <solde>1683.25</solde>
</compte>
```

<ins>Résultat</ins> :

``` txt
<p>DupontMichel</p>
<p>1683.25</p>
```

Les accolades (`{...}`) est l'équivalent de `<xsl:value-of select="..."/>`

### text

Permet d'écrire explicitement un noeud texte  
Isole le texte, pour ne pas reproduire les retours chariots

<table>
  <tr>
    <th>Avec text</th>
    <th>Écrit directement</th>
  </tr>
  <tr>
    <td><pre lang="xml">&lt;xsl:template match="client"&gt;
  &lt;x&gt;
    &lt;xsl:text&gt;Client : &lt;/xsl:text&gt;
    &lt;xsl:value-of select="name"/&gt;
  &lt;/x&gt;
&lt;/xsl:template&gt;</pre></td>
    <td><pre lang="xml">&lt;xsl:template match="client"&gt;
  &lt;x&gt;Client :
    &lt;xsl:value-of select="name"/&gt;
  &lt;/x&gt;
&lt;/xsl:template&gt;</pre></td>
  </tr>
  <tr>
    <td><pre>Client: Dupont</pre></td>
    <td><pre>Client:
    Dupont</pre></td>
  </tr>
</table>

Par défaut, le texte est échappé

``` xml
<xsl:text>coût &lt; 100€ </xsl:text>
```

``` xml
<xsl:text disable-output-escaping="yes">coût &lt; 100€ </xsl:text>
```

### number

Permet de formatter des nombres et de numéroter des éléments.

``` xml
<xsl:template match="chapter">
  <xsl:variable name="chapNum">
    <xsl:number count="chapter" format="1" level="any"/>
  </xsl:variable>
  <xsl:value-of select="$chapNum"/>
</xsl:template>
```

<ins>Attributs</ins> :

<table>
  <tr>
    <th align="left">count</th>
    <td>Expression XPath qui spécifie les éléments à compter</td>
  </tr>
  <tr>
    <th align="left">level</th>
    <td>
      Définit les niveaux de l'arborescence à prendre en compte dans la numérotation<br><br>

      <table>
        <tr>
          <th align="left">single</th>
          <td>compte les éléments sur un niveau uniquement</td>
        </tr>
        <tr>
          <th align="left">multiple</th>
          <td>compte les éléments sur plusieurs niveaux</td>
        </tr>
        <tr>
          <th align="left">any</th>
          <td>compte tous les éléments qui matchent <code>count</code></td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <th align="left">from</th>
    <td>Expression XPath qui définit quand commmencer le comptage</td>
  </tr>
  <tr>
    <th align="left">value</th>
    <td>Expression XPath ou valeur littérale. Doit retourner un nombre.</td>
  </tr>
  <tr>
    <th align="left">format</th>
    <td>
      Définit le format du nombre généré<br><br>

      <table>
        <tr><th align="left">format="1"</th><td>1 2 3 4 5 6 7 8 9 10 11</td></tr>
        <tr><th align="left">format="01"</th><td>01 02 03 04 ... 09 10 11 ... 99 100 101</td></tr>
        <tr><th align="left">format="a"</th><td>a b c d e f ... x y z aa ab ac</td></tr>
        <tr><th align="left">format="A"</th><td>A B C D E F ... X Y Z AA AB AC</td></tr>
        <tr><th align="left">format="i"</th><td>i ii iii iv v vi vii viii ix x</td></tr>
        <tr><th align="left">format="I"</th><td>I II III IV V VI VII VIII IX X</td></tr>
      </table>

      Peut être agrémenté de tout autre caractère :
      <code>format="1. "</code>,
      <code>format="1) "</code>
    </td>
  </tr>
  <tr>
    <th align="left">lang</th>
    <td>Définit le langage dont l'alphabet doit être utilisé</td>
  </tr>
  <tr>
    <th align="left">letter-value</th>
    <td><code>alphabetic</code> (par défaut) ou <code>traditional</code>. Spécifie si la numérotation dans le langage choisit est alphabétique (ex nombres romains) ou traditionnelle (valeurs numériques)</td>
  </tr>
  <tr>
    <th align="left">grouping-separator</th>
    <td>Définit quel caractère doit être utilisé pour séparer les groupes de chiffres (<code>,</code> par défaut)</td>
  </tr>
  <tr>
    <th align="left">grouping-size</th>
    <td>Spécifie combien de chiffres sont dans un groupe (3 par défaut)</td>
  </tr>
</table>

#### level

<ins>document.xml</ins> :

``` xml
<items>
   <item>
       <item>Alice</item>
       <item>Bob</item>
       <item>Carole</item>
   </item>
   <item>
       <item>Dave</item>
       <item>Erin</item>
       <item>Frank</item>
   </item>
   <item>
       <item>Gena</item>
       <item>Heather</item>
       <item>Isabel</item>
   </item>
</items>
```

<ins>table.xsl</ins> :

``` xml
<xsl:template match="item">
   <xsl:for-each select="item">
      <xsl:element name="item">
          <!-- single -->
          <xsl:number format="1. " level="single" />
          <xsl:value-of select="."/>
          <!-- multiple -->
          <xsl:number format="1. " level="multiple" />
          <xsl:value-of select="."/>
          <!-- any -->
          <xsl:number format="1. " level="any" />
          <xsl:value-of select="."/>
          <!-- position() -->
          <xsl:number format="1. " value="position()" />
          <xsl:value-of select="."/>
      </xsl:element>
   </xsl:for-each>
</xsl:template>
```

<ins>Resultat</ins> :

``` txt
Single     Multiple     Any         position()

1. Alice   1.1. Alice   2. Alice    1. Alice
2. Bob     1.2. Bob     3. Bob      2. Bob
3. Carole  1.3. Carole  4. Carole   3. Carole

1. Dave    2.1. Dave    6. Dave     1. Dave
2. Erin    2.2. Erin    7. Erin     2. Erin
3. Frank   2.3. Frank   8. Frank    3. Frank

1. Gena    3.1. Gena    10. Gena    1. Gena
2. Heather 3.2. Heather 11. Heather 2. Heather
3. Isabel  3.3. Isabel  12. Isabel  3. Isabel

```

#### from

``` xml
<xsl:template match="item">
   <xsl:for-each select="item">
      <xsl:element name="item">
          <xsl:number format="1. " level="single" from="*[position()>1]" />
          <xsl:value-of select="."/>
      </xsl:element>
   </xsl:for-each>
</xsl:template>
```

``` txt
. Alice
. Bob
. Carole
1. Dave
2. Erin
3. Frank
1. Gena
2. Heather
3. Isabel
```

#### value

``` xml
<xsl:template match="item">
   <xsl:variable name="parent" select="count(preceding-sibling::*)"/>
   <xsl:for-each select="item">
      <xsl:element name="item">
          <xsl:number format="1. " level="any" value="1 + count(preceding::*) - $parent" />
          <xsl:value-of select="."/>
      </xsl:element>
   </xsl:for-each>
</xsl:template>
```

``` txt
1. Alice
2. Bob
3. Carole
4. Dave
5. Erin
6. Frank
7. Gena
8. Heather
9. Isabel
```

#### grouping-separator

``` xml
<xsl:number value="250000" grouping-separator="."/>
```

``` txt
250.000
```

---

## Appliquer des templates

### apply-templates

Permet d'appliquer les templates à la descendance d'un noeud auquel est appliqué un template (la descendance d'un noeud auquel est appliqué un template n'est pas traitée par défaut).

Si la cible de `apply-templates` n'est pas précisée, la commande s'applique sur tous les fils du noeud courant. Sinon, on peut sélectionner les noeuds cibles avec XPath.

``` xml
<xsl:apply-templates select="//para"/>
```

``` xml
<xsl:apply-templates select="para[@class='title']"/>
```

<ins>style.xsl</ins> :

``` xml
<xsl:template match="compte">
  <p>
    Propriétaire du compte :
    <xsl:apply-templates select="client"/>
  </p>
  </xsl:template>
  <xsl:template match="client">
    <b><xsl:value-of select="nom"/></b>,
    <xsl:value-of select="prénom"/>
</xsl:template>
```

<ins>document.xml</ins> :

``` xml
<compte devise="euro">
  <numero>123456KL</numero>
  <client>
    <nom>Dupont</nom>
    <prenom>Michel</prenom>
  </client>
  <solde>1683.25</solde>
</compte>
```

<ins>Résultat</ins> :

``` txt
<p>
Propriétaire du compte :
<b>Dupont</b>,
Michel
</p>
```

#### modes

Placer un attribut `mode` sur `apply-templates` applique le `template` avec ce même attribut. Cela permet de regrouper des templates pour définir des traitements particuliers.

``` xml
<xsl:template match="chapter">
  <div class="sommaire">
    <ul>
      <xsl:apply-templates select= "section" mode="sommaire"/>
    </ul>
  </div>
  <xsl:apply-templates select="section"/>
</xsl:template>

<xsl:template match="section" mode="sommaire"/>
  <li><xsl:value-of select="title"/></li>
</xsl:template>

<xsl:template match="section">
  <div class="section"><xsl:apply-templates/></div>
</xsl:template>
```

### call-template

Permet de regrouper dans un template des règles de production utilisées fréquemment

``` xml
<xsl:template match='member'>
  <xsl:call-template name="info "/>
  ...
</xsl:template>

<xsl:template match='guest'>
   <xsl:call-template name="info "/>
   ...
</xsl:template>

<xsl:template name='info'>
  Prénom : <xsl:value-of select="firstname"/>
  Nom : <xsl:value-of select="lastname"/>
</xsl:template>
```

---

## Insérer des éléments

## comment

Permet d'insérer un commentaire `<!-- ... -->`

``` xml
<xsl:comment> ... </xsl:comment>
```

### attribute

Permet de générer explicitement un attribut pour l'élément en cours de production
* Doit figurer avant la génération du contenu de l'élément
* L'attribut `name` spécifie le nom de l'attribut
* Le contenu spécifie le valeur de l'attribut

``` xml
<xsl:template match="link">
  <a>
    <xsl:attribute name="title">
      <xsl:value-of select= "linktitle"/>
    </xsl:attribute>
    <xsl:apply-templates/>
  </a>
</xsl:template>
```

### attribute-set

Permet de définir un groupe d'attribus
* Contient une liste de `attribute`
* Peut être inclus par `element` et `copy` avec l'attribut `use-attribute-sets`

``` xml
<xsl:attribute-set name="link-spec">
  ...
</xsl:attribute-set>
```

### element

Permet de générer explicitement un élément
* Possibilité de calculer le nom de l'élément
* Possibilité de calculer le namespace (uri)
* Possibilité d'utiliser des groupes d'attributs prédéfinis

``` xml
<xsl:template match="link[@dest='spec']">
  <xsl:element name="a" use-attribute-sets= "link-spec">
    <xsl:apply-templates/>
  </xsl:element>
</xsl:template>
```

L'attribut `use-attribute-sets` permet de référencer les
groupes d'attributs à produire, séparés par des espaces

### copy

<ins>Copier le noeud courant</ins> :

Permet de copier un noeud de l'arbre source
* Ne copie pas les attributs
* Ne copie pas la descendance
* Possibilité d'utiliser des groupes d'attributs prédéfinis

``` xml
<xsl:template match="@*|node()">
  <xsl:copy>
    <xsl:apply-templates select="@*|node()"/>
  </xsl:copy>
</xsl:template>
```

L'attribut `use-attribute-sets` permet de référencer les
groupes d'attributs à produire, séparés par des espaces

<ins>Copier un attribut</ins> :

Permet de copier un attribut de l'arbre source
* Doit figurer avant la génération du contenu de l'élément
* Utilisation de XPath pour sélectionner les attributs à copier

``` xml
<xsl:template match="link">
  <a>
    <xsl:copy select="./@href"/>
    <xsl:apply-templates/>
  </a>
</xsl:template>
```

### copy-of

Permet de copier un sous-arbre de l'arbre source
* L'attribut `select` spécifie le sous-arbre à copier par une expression XPath
* Les attributs, namespaces et descendance sont copiés

``` xml
<xsl:template match="div[@class= 'menu']">
  <xsl:copy-of select= ". "/>
</xsl:template>
```

---

## Inclure un document

La fonction `document()` permet d'inclure un document xml tiers.

``` xml
<xsl:copy-of select="document('labels.xml')">
```

On peut aussi appliquer les templates sur un document tiers :

``` xml
<xsl:variable name='gurl'>
  http://www.google.fr/search?q=<xsl:value-of select="$keyword"/>
</xsl:variable>
<xsl:apply-templates select="document($gurl)//table[2]">
```

---

## Boucles et conditions

### for-each

Permet de boucler sur les noeuds d'un ensemble de noeuds

``` xml
<xsl:template match="addressbook">
  <xsl:for-each select="contact/name">
    <xsl:value-of select="firstname"/>
    <xsl:text> <xsl:text>
    <xsl:value-of select="lastname"/>
  </xsl:for-each>
</xsl:template>
```

### if

Permet de traiter une condition  
Il est parfois préférables d'utiliser deux templates

``` xml
<xsl:template match="a">
  <xsl:copy>
    <xsl:attribute name="href">...</xsl:attribute>
    <xsl:if test="not(start-with(@href,'http://example.fr')">
      <xsl:text>(lien externe)</xsl:text>
    </xsl:if>
    <xsl:apply-templates>
  </xsl:copy>
</xsl:template>
```

### choose

Conditions multiples

``` xml
<xsl:choose>
  <xsl:when test="condition 1">
    ...
  </xsl:when>
  <xsl:when test="condition 2">
    ...
  </xsl:when>
  <xsl:otherwise>
    ...
  </xsl:otherwise>
</xsl:choose>
```

### sort

Permet de spécifier l'ordre d'application d'une instruction sur un ensemble de noeuds  
S'applique sur `apply-templates` et `for-each`

``` xml
<xsl:for-each select="catalog/cd">
  <xsl:sort select="artist"/>
  <tr>
    <td><xsl:value-of select="title"/></td>
    <td><xsl:value-of select="artist"/></td>
  </tr>
</xsl:for-each>
```

<ins>Attributs</ins> :

<table>
  <tr>
    <th align="left">select</th>
    <td>Critère de tri</td>
  </tr>
  <tr>
    <th align="left">lang</th>
    <td>Pour les tris alphabétiques</td>
  </tr>
  <tr>
    <th align="left">data-type</th>
    <td><code>text</code> ou <code>number</code></td>
  </tr>
  <tr>
    <th align="left">order</th>
    <td><code>ascending</code> ou <code>descending</code></td>
  </tr>
  <tr>
    <th align="left">case-order</th>
    <td><code>upper-first</code> ou <code>lower-first</code></td>
  </tr>
</table>

---

## Variables et paramètres

### variable

Permet de définir une variable (non modifiable).  
La valeur de la variable peut être le résultat d'une expression XPath ou un texte littéral

``` xml
<xsl:variable name="position" select="count(active)"/>
```

``` xml
<xsl:variable name="date">27/07/1969</xsl:variable>
```

Les variables ainsi définies peuvent ensuite être utilisées dans des expressions XPath.  
On obtient leur valeur avec `$` :

``` xml
<xsl:apply-templates select="item[$position]"/>
```

``` xml
<xsl:value-of select="$date"/>
```

Une variable déclarée dans un template est une variable locale, dont la portée est limitée au template.

### param

La valeur d'une variable reste constante, tandis que la valeur d'un paramètre est une valeur par défaut, qui peut être modifiée avec `with-param` lors de l'appel à `call-template` ou `apply-templates`.

``` xml
<xsl:param name="COLOR" select="'black'"/>

<xsl:template match="item">
  <font color="{$COLOR}">
    <xsl:apply-templates/>
  </font>
</xsl:template>

  ...
  <xsl:apply-templates select="item">
    <xsl:with-param name="COLOR" select="'blue'"/>
  </xsl:apply-templates>
  ...
```

---

## Options de sortie

### output

L'élément `output` permet de paramétrer les options de sortie de la feuille de style

<ins>Attributs</ins> :

<table>
  <tr>
    <th align="left">method</th>
    <td><code>xml</code>, <code>text</code> ou <code>html</code></td>
  </tr>
  <tr>
    <th align="left">version</th>
    <td>nmtoken</td>
  </tr>
  <tr>
    <th align="left">encoding</th>
    <td>string</td>
  </tr>
  <tr>
    <th align="left">omit-xml-declaration</th>
    <td><code>yes</code> ou <code>no</code></td>
  </tr>
  <tr>
    <th align="left">standalone</th>
    <td><code>yes</code> ou <code>no</code></td>
  </tr>
  <tr>
    <th align="left">doctype-public</th>
    <td>string</td>
  </tr>
  <tr>
    <th align="left">doctype-systel</th>
    <td>string</td>
  </tr>
  <tr>
    <th align="left">cdata-section-elements</th>
    <td>qnames</td>
  </tr>
  <tr>
    <th align="left">indent</th>
    <td><code>yes</code> ou <code>no</code></td>
  </tr>
  <tr>
    <th align="left">media-type</th>
    <td>string</td>
  </tr>
</table>

---

## Clés

### key

L'élément `key` permet de créer un tableau associatif valeur/noeud. L'attribut `match` définit les noeuds concernés et l'attribut `use` permet de définir la valeur (la clé du tableau).

``` xml
<xsl:key name="mykeys" match="footnote[@id]" use="@id"/>
```

On peut récupérer le noeud associé à une valeur donnée avec la fonction `key(name, value)`

Cette fonction est souvent utilisée avec `generate-id(node)`, qui génère un id unique pour un noeud donné (ou le noeud courant si omis)

<ins>document.xml</ins> :

``` xml
<body>
   <p>Lorem ipsum dolor sit amet <ref footnote="1" /></p>

   <footnotes>
     <footnote id="1">Ma référence</footnote>
   </footnotes>
</body>
```

<ins>style.xsl</ins> :

``` xml
<xsl:output method="html" /> 

<!-- Keep body and p as is -->
<xsl:template match="body|p">
  <xsl:copy>
    <xsl:apply-templates />
  </xsl:copy>
</xsl:template>

<!-- Key map of footnotes -->
<xsl:key name="mykeys" match="footnote[@id]" use="@id"/>

<!-- Replace <ref footnote="id"> with link to footnote -->
<xsl:template match="ref[@footnote]">
  <a href="#{generate-id(key('mykeys', @footnote))}">
    <xsl:for-each select="key('mykeys', @footnote)">
      <sup>(<xsl:number/>)</sup>
    </xsl:for-each>
  </a>
</xsl:template>

<!-- Footnotes list -->
<xsl:template match="footnotes">
  <ul>
    <xsl:for-each select="footnote">
      <li>
        <a name="{generate-id()}">
          <xsl:number format="1. " />
          <xsl:value-of select="."/>
        </a>
      </li>
    </xsl:for-each>
  </ul>
</xsl:template>
```

<ins>Résultat</ins> :

``` html
<body>
   <p>Lorem ipsum dolor sit amet <a href="#id0xffffffffffc12300"><sup>(1)</sup></a></p>

   <ul><li><a name="id0xffffffffffc12300">1. Ma référence</a></li></ul>
</body>
```

---

## Modularisation des XSLT

Une feuille de style .xsl peut inclure d'autres feuilles de style .xsl.  
Deux méthodes sont disponibles: `include` et `import`.

### Include

`include` permet d'inclure le contenu d'une autre feuille de style .xsl.  
Une feuille inclue a la même précédence que la feuille parente. Si les deux feuilles de style définissent un même template, le template le plus en bas de la page est appliqué.

<ins>main.xsl</ins> :

``` xml
<?xml version='1.0'?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xml" omit-xml-declaration="yes"/>

<xsl:template match="/">
  <xsl:for-each select="COLLECTION/BOOK">
    <xsl:apply-templates select="TITLE"/>
    <xsl:apply-templates select="AUTHOR"/>
    <xsl:apply-templates select="PUBLISHER"/>
  </xsl:for-each>
</xsl:template>

<!-- Le template suivant est overridé.
Il pourrait overrider doc.xsl s'il était placé en-dessous de include -->
<xsl:template match="TITLE">Title: <xsl:value-of select="."/></xsl:template>

<xsl:include href="doc.xsl" />
</xsl:stylesheet>
```

<ins>doc.xsl</ins> :

``` xml
<?xml version='1.0'?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="TITLE">Title - <xsl:value-of select="."/></xsl:template>
  <xsl:template match="AUTHOR">Author - <xsl:value-of select="."/></xsl:template>
  <xsl:template match="PUBLISHER">Publisher - <xsl:value-of select="."/></xsl:template>
</xsl:stylesheet>
```

### Import

`import` permet d'importer des templates. 
Pour appliquer les templates importés, il faut les appeler explicitement à l'intérieur d'un template de la feuille de style avec `apply-imports`.

<ins>main.xsl</ins> :

``` xml
<?xml version='1.0'?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:import href="doc.xsl"/>

<xsl:template match="example">
  <div style="border: solid red">
    <xsl:apply-imports/>
  </div>
</xsl:template>
</xsl:stylesheet>
```

<ins>doc.xsl</ins> :

``` xml
<?xml version='1.0'?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="example">
    <pre><xsl:apply-templates/></pre>
  </xsl:template>
</xsl:stylesheet>
```

<ins>Résultat</ins> :

``` txt
<div style="border: solid red"><pre>...</pre></div>
```

---

## Messages

### message

Permet de produire des messages au cours de la transformation, soit
* sur la console (transformation batch)
* dans un fichier de log (processus sur serveur http)
* dans un popup (processus dans navigateur)

``` xml
<xsl:template match="section">
  <xsl:message>
    <xsl:text>Traitement de la section</xsl:text>
    <xsl:value-of select="title"/>
  </xsl:message>
  ...
</xsl:template>
```

---

## Namespaces

Si le document source utilise plusieurs namespaces, ils doivent tous être déclarés dans la feuille de style et utilisé dnas les balises produits et les XPath.

``` xml
<xsl:stylesheet version="1.0"
                xmlns:xsl='http://www.w3.org/1999/XSL/Transform'
                xmlns:fo="http://www.w3.org/1999/XSL/Format"
                xmlns:html= "http://www.w3.org/1999/xhtml">
...
<xsl:template match="html:body">
  <fo:flow>
  ...
  </fo:flow>
</xsl:template>
</xsl:stylesheet>
```
