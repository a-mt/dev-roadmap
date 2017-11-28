---
title: XML Schema
category: Web, XML
---

Les *XML Schemas* sont un ensemble de règles qui permettent de vérifier la validité d'un document. Plus souples que les DTD, ils permettent d'effectuer des validations qui ne sont pas supportées par les DTD.

Les schémas s'écrivent en XML.  
Ils ne permettent pas de définir des entités.  
L'extension des fichiers XML Schemas est `.xsd`.

## Problème avec les DTD

Les DTD posent quelques problèmes (liste non exhaustive):

* aucune contrainte sur les données (si les données texte sont autorisées, toutes données sont autorisées)
* ne supporte pas les regex (tests des attributs et valeurs)
* ne supporte pas les namespaces
* support très limité pour la modularité: difficile d'écrire, de gérer et de lire des DTD volumineuses
* les déclarations de contenu et d'attribut ne peuvent pas dépendre des attributs ou du contexte de l'élément
* mécanisme d'attribut ID trop simple (aucune exigence, pas d'unicité)
* valeur par défaut uniquement pour les attributs, pas pour les éléments
* pas de documentation possible (commentaires insuffisants)
* pas de vérification sur le nombre d'occurrence des tags

Problèmes que les XML schémas permettent de résoudre

---

## Inclure un schéma

Un document XML peut référencer un schéma avec l'attribut `schemaLocation`.

<ins>business_card.xml</ins> :

``` xml
<card xmlns="http://businesscard.org"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://businesscard.org business_card.xsd">
  <name>John Doe</name>
  <title>CEO, Widget Inc.</title>
  <email>john.doe@widget.com</email>
  <phone>(202) 456-1414</phone>
  <logo url="widget.gif"/>
</card>
```

<ins>business_card.xsd</ins>

``` xml
<schema xmlns="http://www.w3.org/2001/XMLSchema"
        xmlns:b="http://businesscard.org"
        targetNamespace="http://businesscard.org">

  <element name="card" type="b:card_type"/>
  <element name="name" type="string"/>
  <element name="title" type="string"/>
  <element name="email" type="string"/>
  <element name="phone" type="string"/>
  <element name="logo" type="b:logo_type"/>

  <complexType name="card_type">
    <sequence>
      <element ref="b:name"/>
      <element ref="b:title"/>
      <element ref="b:email"/>
      <element ref="b:phone" minOccurs="0"/>
      <element ref="b:logo" minOccurs="0"/>
    </sequence>
  </complexType>

  <complexType name="logo_type">
    <attribute name="url" type="anyURI"/>
  </complexType>
</schema>
```

## Utiliser plusieurs schémas

Pour inclure plusieurs schéma, on associe une uri au schéma : `xmlns:uri="url"`.  
Puis on préfixe le noms des balises appartenant au schéma par l'uri choisie.  
Procéder ainsi évite les conflits de noms lors de l'utilisation de plusieurs DTD/schemas dans un même document.

``` xml
<?xml version="1.0">
<lettre xmlns="urn:letter"
        xmlns:addr="http://www.exemple.com/adresse"
        ... >
  <expediteur>
  <name>Bob Dupont</name>
  <addr:adresse siege-soc="yes">
    <addr:ligne>5, rue du moulin</addr:ligne>
    <addr:cp>38000</addr:cp>
    <addr:ville>Grenoble</addr:ville>
  </addr:adresse>
  </expediteur>
</lettre>
```

## Valider un document avec schéma

    xmllint --schema Bookcatalogue.dtd BookCatalogue.xml

---

## Définition d'éléments

La définition d'un élément associe un nom d'élément à un type, simple (pour les éléments qui contiennent du texte) ou complexe (pour les éléments composites).  
Un élément peut être construit

* par référence à un type nommé (prédéfinit ou non)

  ``` xml
  <element name="adresse" type="ns:type-adresse"/>
  ```

  ``` xml
  <element name="fiche" type="string"/>
  ```

* par utilisation d'un type anonyme, contenu dans la balise

  ``` xml
  <element name="adresse">
    <complexType>
      <sequence>
        <element name="nom" type="string"/>
        <element name="voie" type="string"/>
        <element name="codepostal" type="string"/>
        <element name="ville" type="string"/>
      </sequence>
    </complexType>
  </element>
  ```

En utilisant les types anonymes, on peut imbriquer les définitions.  
<ins>Exemples</ins>:

``` xml
<!-- Types imbriqués -->
<element name="carnet">
  <complexType>
    <sequence maxOccurs="unbounded">
      <element name="adresse">
        <complexType>
          <all>
            <element name="nom" type="string"/>
          </all>
        </complexType>
      </element>
    </sequence>
  </complexType>
</element>
```

``` xml
<!-- Types nommés -->
<element name="carnet" type="ca:CarnetType" />

<complexType name="CarnetType">
  <sequence maxOccurs="unbounded">
    <element name="adresse" type="ca:AdresseType"/>
  </sequence>
</complexType>

<complexType name="AdresseType">
  <all>
    <element name="nom" type="string"/>
  </all>
</complexType>
```

Un type complexe peut contenir des éléments qui référencent d'autres éléments avec `ref`

``` xml
<!-- Type référence un élément -->
<element name="adresse" type="ca:AdresseType" />
<element name="carnet" type="ca:CarnetType" />

<complexType name="CarnetType">
  <sequence maxOccurs="unbounded">
    <element ref="ca:adresse"/>
  </sequence>
</complexType>

<complexType name="AdresseType">
  <all>
    <element name="nom" type="string"/>
  </all>
</complexType>
```

---

## Définition de types simples

On peut utiliser un type simple
* prédéfinit (namespace de XML schema)

  <table>
    <tr><td>
      <strong>string</strong>
      <br>dérivés: normalizedString, token,
        language, Name, NCName, ID, IDREF, ENTITY...
    </td></tr>
    <tr><td>
      <strong>decimal</strong>
      <br>dérivés: integer, nonPositiveInteger,
        negativeInteger, long, int, short, byte,
        nonNegativeInteger, positiveInteger, unsignedLong,
        unsignedInt, unsignedShort, unsignedByte
    </td></tr>
    <tr><td>
      <strong>float</strong>,
      <strong>double</strong>
    </td></tr>
    <tr><td>
      <strong>boolean</strong>
    </td></tr>
    <tr><td>
      <strong>duration</strong>
      <br>dérivés: dateTime, date, time, gMonth, gYear, gYearMonth, gDay, gMonthDay
    </td></tr>
    <tr><td>
      <strong>base64Binary</strong>,
      <strong>hexBinary</strong>
    </td></tr>
    <tr><td>
      <strong>qname</strong>,
      <strong>anyURI</strong>,
      <strong>NOTATION</strong>
    </td></tr>
  </table>

  <ins>Quelques exemples de valeurs</ins>:
  - boolean      : true, false, 1, 0
  - decimal      : 3.1415
  - float        : 6.02214199E23
  - double       : 42E970
  - dateTime     : 2004-09-26T16:29:00-05:00
  - time         : 16:29:00-05:00
  - date         : 2004-09-26
  - hexBinary    : 48656c6c6f0a
  - base64Binary : SGVsbG8K
  - anyURI       : http://www brics dk/ixwt/
  - QName        : rcp:recipe, recipe

* ou construit  
  Par *restriction*, en utilisant les facettes (pattern, enumeration, length, maxlength, precision, etc)

    <ins>Exemples</ins> :

    ``` xml
    <simpleType name="année">
      <restriction base="integer">
        <minInclusive value="1900"/>
        <maxInclusive value="2100"/>
      </restriction>
    </simpleType>
    ```

    ``` xml
    <simpleType name="numTel">
      <restriction base="string">
        <pattern value="([0-9]{2} ){4}[0-9]{2}"/>
        <pattern value="+[0-9]{2} [0-9]+"/>
      </restiction>
    </simpleType>
    ```

    ``` xml
    <simpleType name="couleur">
      <restriction base="string">
        <enumeration value="bleu"/>
        <enumeration value="rouge"/>
        <enumeration value="vert"/>
        <enumeration value="jaune"/>
      </restiction>
    </simpleType>
    ```

---

## Définition de types complexes

Un élément `complexType` contient le constructeur de type: `sequence`, `all` ou `choice` et les définitions d'attributs.
Le constructeur contient les définitions des sous-éléments.

### Sequence

Liste ordonnées d'éléments  
Attributs :
* `minOccurs`: entier non négatif (par défaut 1)
* `maxOccurs`: entier non négatif ou `unbounded` (par défaut 1)

``` xml
<complexType name="groupe">
  <sequence minOccurs="2" maxOccurs="10">
    <element name="nom" type="text"/>
    <element name="prenom" type="text"/>
  </sequence>
</complexType>
```

### Choice

Alternative entre plusieurs éléments  
Attributs :
* `minOccurs`: entier non négatif (par défaut 1)
* `maxOccurs`: entier non négatif ou `unbounded` (par défaut 1)

``` xml
<complexType name="type-société">
  <choice>
    <element name="eurl" type="text"/>
    <element name="sarl" type="text"/>
    <element name="sa" type="text"/>
  </choice>
</complexType>
```

### All

Groupe non ordonné  
Ne peut contenir que des définitions de sous éléments  
Attributs :
* `minOccurs`: 0 ou 1 (par défaut 1)
* `maxOccurs`: toujours 1

``` xml
<complexType name="caracteristiques">
  <all>
    <element name="longueur" type="integer"/>
    <element name="largeur" type="integer"/>
    <element name="hauteur" type="integer"/>
  </all>
</complexType>
```

### Texte

Un élément complexe avec l'attribut `mixed="true"` admet à la fois du texte et des éléments

``` xml
<complexType name="order_type" mixed="true">
  <choice>
    <element ref="n:address"/>
    <sequence>
      <element ref="n:email"  minOccurs="0" maxOccurs="unbounded"/>
      <element ref="n:phone"/>
    </sequence>
  </choice>
  <attribute ref=”n:id" use="required"/>
</complexType>
```

### Any

Avec un élément `any`, le type accepte n'importe quel élément non spécifié par le schéma comme enfant.

``` xml
<element name="person">
  <complexType>
    <sequence>
      <element name="firstname" type="string"/>
      <element name="lastname" type="string"/>
      <any minOccurs="0"/>
    </sequence>
  </complexType>
</element>
```

### Héritage

Les types complexes peuvent également être construits à partir d'autres types:  
Par *extension*, en ajoutant des attributs/éléments à un type existant

``` xml
<complexType name="fullpersoninfo">
  <complexContent>
    <extension base="personinfo">
      <sequence>
        <element name="address" type="string"/>
        <element name="city" type="string"/>
        <element name="country" type="string"/>
      </sequence>
    </extension>
  </complexContent>
</complexType>
```

---

## Déclaration d'attributs

Pour déclarer un attribut, on crée un élément `attribute` (fils de `complexType`).  
Les attributs de cet élément sont:

<table>
  <tr>
    <th>type</th>
    <td>Référence un simpleType</td>
  </tr>
  <tr>
    <th>use</th>
    <td><code>required</code>, <code>optional</code> ou <code>prohibited</code></td>
  </tr>
  <tr>
    <th>default</th>
    <td>Valeur par défaut (peut être surchargée)</td>
  </tr>
  <tr>
    <th>fixed</th>
    <td>Valeur implicite (attribut prohibited)</td>
  </tr>
</table>

Tout comme un élément normal, un attribut peut être construit  
par référence à un type simple

  ``` xml
  <complexType name="type-adresse">
    <attribute name="numindex" type="integer" use="required"/>
  </complexType>
  ```

ou avec un type simple anonyme

  ``` xml
  <complexType name="type-adresse">
    ...
    <attribute name="typeaddr" use="optional" default="personnelle">
      <simpleType>
        <restriction base="string">
          <enumeration value="personnelle"/>
          <enumeration value="professionnelle"/>
        </restriction>
      </simpleType>
    </attribute>
  </complexType>
  ```

### Anyattribute

Avec un élément `anyattribute`, le type accepte n'importe quel attribut - non spécifié par le schéma.

``` xml
<element name="person">
  <complexType>
    <sequence>
      <element name="firstname" type="string"/>
      <element name="lastname" type="string"/>
    </sequence>
    <anyAttribute/>
  </complexType>
</element> 
```

---

## Schemas et namespaces

### Dans le schéma

1. L'attribut `targetNamespace` définit le namespace des objets décrits par le schéma (qui sera utilisé par l'instance XML)

2. On déclare les namespaces utilisés par le schéma : `xmlns:uri="url"`

   - Le namespace des types de XMLSchema (ex: element, simpleType, string...)

      <pre lang="xml">&lt;schema xmlns:xsd="http://www.w3.org/1999/XMLSchema"</pre>
      <pre lang="xml">&lt;xsd:simpleType name="fiche" type="xsd:string"/&gt;</pre>

   - Le namespace des types déclarés dans le schéma (ex: fiche, carnet)

     <pre lang="xml">&lt;schema xmlns:ca="urn:carnet"</pre>
     <pre lang="xml">&lt;xsd:element type="ca:fiche"/&gt;</pre>

   On ne peut utiliser qu'un seul namespace par défaut (namespace sans uri assignée)

  <ins>Exemples</ins>:

  ``` xml
  <schema xmlns="http://www.w3.org/1999/XMLSchema"
          targetnamespace="urn:carnet"
          xmlns:ca="urn:carnet">
    <simpleType name="fiche" type="string"/>
    <element name="carnet">
      <complexType>
        <sequence maxOccurs="unbounded">
          <element type="ca:fiche"/>
        </sequence>
      </complexType>
    </element>
  </schema>
  ```

  ``` xml
  <xsd:schema xmlns:xsd="http://www.w3.org/1999/XMLSchema"
              targetnamespace="urn:carnet"
              xmlns="urn:carnet">
    <xsd:simpleType name="fiche" type="xsd:string"/>
    <xsd:element name="carnet">
      <xsd:complexType>
        <xsd:sequence maxOccurs="unbounded">
          <xsd:element type="fiche"/>
        </xsd:sequence>
      </xsd:complexType>
    </xsd:element>
  </xsd:schema>
  ```

### Dans l'instance XML

1. On déclare le namespace des objets, tel que le définit le `targetNamespace` du schéma

2. On inclut le namespace de `XMLSchema-instance`

3. On utilise l'attribut `schemaLocation` ou `noNamespaceSchemaLocation` pour inclure le schéma en associant
  - le namespace (uri) de XMLSchema-instance (= 2.)
  - avec la ressource (url) schéma (= 1.)

<ins>Exemple</ins>:

``` xml
<carnet xmlns="urn:carnet"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="urn:carnet carnet.xsd">
  <fiche>
    ...
  </fiche>
</carnet>
```

---

## Annotations

Les éléments peuvent être annotés pour ajouter une documentation. Les annotations peuvent être structurées, contrairement aux simples commentaires &lt;-- ... --&gt;

``` xml
<xsd:element name="author">
  <xsd:annotation>
    <xsd:documentation xmlns:xhtml="http://www.w3.org/1999/xhtml">
       the author of the recipe, 
       see <xhtml:a href="authors.xml">this list</xhtml:a> of authors
    </xsd:documentation>
    <xsd:appinfo xmlns:fp="http://foodprocessor.org">
       <fp:process type="117"/>
    </xsd:appinfo>
  </xsd:annotation>
  ...
</xsd:element>
```

---

## Modularisation des schémas

Un schéma .xsd peut inclure d'autres schémas .xsd, afin d'en importer les composantes.  
Deux méthodes sont disponibles: `include` et `import`.

### Include

Avec `include`, tous les objets appartiennent au namespace du schéma incluant.

``` xml
<include schemaLocation="carnet.xsd"/>
```

<ins>biblio.xsd</ins> :

``` xml
<?xml version="1.0"?>
<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema"
            targetNamespace="http://www.publishing.org"
            xmlns="http://www.publishing.org"
            elementFormDefault="qualified">

  <xsd:include schemaLocation="isbn.xsd"/>

  <xsd:element name="BookCatalogue">
    <xsd:complexType>
      <xsd:sequence>
        <xsd:element name="Book" minOccurs="1" maxOccurs="unbounded">
          <xsd:complexType>
            <xsd:sequence>
              <xsd:element name="Title" type="xsd:string"/>
              <xsd:element name="Author" type="xsd:string"/>
              <xsd:element name="Date" type="xsd:string"/>
              <xsd:element name="ISBN" type="ISBN-type"/>
              <xsd:element name="Publisher" type="xsd:string"/>
            </xsd:sequence>
          </xsd:complexType>
        </xsd:element>
      </xsd:sequence>
    </xsd:complexType>
  </xsd:element>
</xsd:schema>
```

<ins>isbn.xsd</ins> :

``` xml
<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <xsd:simpleType name="ISBN-type">
    <xsd:restriction base="xsd:string">
      <!-- ISBN definition for English-speaking Countries -->
      <xsd:pattern value="0-[0-1][0-9]-\d{6}-[0-9x]">
        <xsd:annotation>
          <xsd:documentation>
            group/country ID = 0 (hyphen after the 1st digit)
            Publisher ID = 00...19 (hyphen after the 3rd digit)
            Block size = 1,000,000 (requires 6 digits)
            check digit is 0-9 or 'x'
          </xsd:documentation>
        </xsd:annotation>
      </xsd:pattern>
      <!-- ISBN definition for French-speaking Countries -->
      <xsd:pattern value="2-\d([0-9]|-){7}\d-[0-9x]">
        <xsd:annotation>
          <xsd:documentation>
            group/country ID = 2 (hyphen after the 1st digit)
            Country = France, Belgium, Canada, Switzerland
            check digit is 0-9 or 'x'
          </xsd:documentation>
        </xsd:annotation>
      </xsd:pattern>
      ...
```

### Import

`import` permet d'importer un schéma en conservant son namespace (et doit être déclaré dans l'instance XML)

<ins>annuaire.xsd</ins> :

``` xml
<xsd:schema xmlns:xsd="http://www.w3.org/1999/XMLSchema"
            targetnamespace="urn:annuaire"
            xmlns:ca="urn:carnet"
            xmlns="urn:annuaire">

<xsd:import schemaLocation="carnet.xsd"
            namespace="urn:carnet"/>

<xsd:element name="annuaire">
  <xsd:complexType>
    <xsd:sequence maxOccurs="unbounded">
      <xsd:element type="ca:carnet"/>
      ...
```

<ins>annuaire.xml</ins> :

``` xml
<annuaire xmlns="urn:annuaire"
          xmlns:ca="urn:carnet"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="urn:annuaire annuaire.xsd">
  <ca:carnet>
    ...
  </ca:carnet>
</annuaire>
```

---

## Exemple complet

<ins>recipes.xsd</ins> :

``` xml
<schema xmlns="http://www.w3.org/2001/XMLSchema"
        xmlns:r="http://recipes.org"
        targetNamespace="http://recipes.org"
        elementFormDefault="qualified">

  <element name="collection">
    <complexType>
      <sequence>
        <element name="description" type="r:anycontent"/>
        <element ref="r:recipe" minOccurs="0" maxOccurs="unbounded"/> 
      </sequence>
    </complexType>
  </element>

  <complexType name="anycontent" mixed="true">
    <sequence>
      <any minOccurs="0" maxOccurs="unbounded" 
           processContents="skip" namespace="##other"/>
    </sequence>
  </complexType>

  <element name="recipe">
    <complexType>
      <sequence>
        <element name="title" type="string"/>
        <element ref="r:ingredient" minOccurs="0" maxOccurs="unbounded"/>
        <element ref="r:preparation"/>
        <element name="comment" minOccurs="0" type="string"/>
        <element name="nutrition">
          <complexType>
            <attribute name="protein" type="r:nonNegativeDecimal" use="required"/>
            <attribute name="carbohydrates" type="r:nonNegativeDecimal" use="required"/>
            <attribute name="fat" type="r:nonNegativeDecimal" use="required"/>
            <attribute name="calories" type="r:nonNegativeDecimal" use="required"/>
            <attribute name="alcohol" type="r:nonNegativeDecimal" use="optional"/>
          </complexType>
        </element>
      </sequence>
    </complexType>
  </element>

  <element name="preparation">
    <complexType>
      <sequence>
        <element name="step" type="string" minOccurs="0" maxOccurs="unbounded"/>
      </sequence>
    </complexType>
  </element>

  <element name="ingredient">
    <complexType>
      <sequence>
        <element ref="r:ingredient" minOccurs="0" maxOccurs="unbounded"/>
        <element ref="r:preparation" minOccurs="0"/>
      </sequence>
      <attribute name="name" use="required"/>
      <attribute name="amount" use="optional">
        <simpleType>
          <union>
            <simpleType>
              <restriction base="string">
                <enumeration value="*"/>
              </restriction>
            </simpleType>
            <simpleType>
              <restriction base="r:nonNegativeDecimal"/>
            </simpleType>
          </union>
        </simpleType>
      </attribute>
      <attribute name="unit" use="optional"/>
    </complexType>
  </element>

  <simpleType name="nonNegativeDecimal">
    <restriction base="decimal">
      <minInclusive value="0"/>
    </restriction>
  </simpleType>

</schema>
```

<ins>recipes.xml</ins> :

``` xml
<collection xmlns="http://recipes.org"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://recipes.org recipes.xsd">
  ...
</collection>
```

Source :
- [http://cs.au.dk/~amoeller/XML/overview.html](http://cs.au.dk/~amoeller/XML/overview.html)
