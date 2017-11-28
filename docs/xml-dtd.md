---
title: DTD
category: Web, XML
---

DTD est l'abbréviation de *Document Type Definition*.  
Une DTD est un ensemble de règles qui définissant
- les balises autorisées dans un document XML, leur contenu

    ``` xml
    <!ELEMENT Carnet (Utilisateur|Entrées) >
    ```

- les attributs associés à une balise, ainsi que leur type

    ``` xml
    <!ATTLIST Société idname CDATA #IMPLIED
                      siret CDATA #REQUIRED >
    ```

- les entités autorisées (macros)

    ``` xml
    <!ENTITY Email "moi@societe.fr" >
    ```

## Inclure une DTD

Une DTD peut écrite
- directement dans le prologue

  ``` txt
  <!DOCTYPE Carnet [
      Règles de déclarations des éléments,
      attributs, entités
  ]>
  ```
  <ins>Carnet.xml</ins> :

  ``` xml
  <!DOCTYPE Carnet [
      <!ELEMENT carnet (ami*)>
      <!ELEMENT ami (prenom, nom, adresse*, mobile*)>
      <!ELEMENT prenom (#PCDATA)>
      <!ELEMENT nom (#PCDATA)>
      <!ELEMENT adresse (rue, ville)>
      <!ELEMENT rue (#PCDATA)>
      <!ELEMENT ville (#PCDATA)>
      <!ELEMENT mobile EMPTY>

      <!ATTLIST prenom genre (M.|Mme) #REQUIRED>
      <!ATTLIST rue numero CDATA #REQUIRED>
      <!ATTLIST ville codepostal CDATA #REQUIRED>
      <!ATTLIST mobile telephone CDATA #REQUIRED>
      <!ATTLIST adresse numero CDATA #IMPLIED>
  ]>
  ```

- ou dans un fichier externe référencé dans le prologue (plus courant)

  ``` txt
  <!DOCTYPE Carnet PUBLIC fpi adresse >
  ```

  <ins>Carnet.xml</ins> :

  ``` xml
  <!DOCTYPE Carnet
      PUBLIC "-//Exselt/DTD Carnet/en" "Carnet.dtd" >
  ```

  <ins>Carnet.dtd</ins> :

  ``` xml
  <!ELEMENT carnet (ami*)>
  <!ELEMENT ami (prenom, nom, adresse*, mobile*)>
  <!ELEMENT prenom (#PCDATA)>
  <!ELEMENT nom (#PCDATA)>
  <!ELEMENT adresse (rue, ville)>
  <!ELEMENT rue (#PCDATA)>
  <!ELEMENT ville (#PCDATA)>
  <!ELEMENT mobile EMPTY>

  <!ATTLIST prenom genre (M.|Mme) #REQUIRED>
  <!ATTLIST rue numero CDATA #REQUIRED>
  <!ATTLIST ville codepostal CDATA #REQUIRED>
  <!ATTLIST mobile telephone CDATA #REQUIRED>
  <!ATTLIST adresse numero CDATA #IMPLIED>
  ```

## Valider un document avec DTD

    xmllint --dtdvalid Bookcatalogue.dtd
BookCatalogue.xml

---

## Définition d'éléments

Définit le nom de l'élément et ce que l'élément peut contenir (éléments fils, contenu texte seulement, contenu mixte)

<table>
  <tr>
    <td>Éléments fils</td>
    <td><pre lang="xml"><!ELEMENT Carnet (personne|société)+></pre></td>
  </tr>
  <tr>
    <td>Élément vide</td>
    <td><pre lang="xml"><!ELEMENT Rôle EMPTY></pre></td>
  </tr>
  <tr>
    <td>Contenu libre</td>
    <td><pre lang="xml"><!ELEMENT Complément ANY></pre></td>
  </tr>
  <tr>
    <td>Données (texte)</td>
    <td><pre lang="xml"><!ELEMENT Nom (#PCDATA)></pre></td>
  </tr>
  <tr>
    <td>Contenu mixte</td>
    <td><pre lang="xml"><!ELEMENT Paragraphe (#PCDATA|gras|ital)*></pre></td>
  </tr>
</table>

### Expression de composition des éléments fils

Pour décrire les contenus mixtes/fils d'un élément, on définit une expression de composition des éléments fils.  
Les expressions sont délimitées par des parenthèses.  
Des opérateurs en définissent la composition

<table>
  <tr>
    <td>Séquence</td>
    <td><code>,</code></td>
    <td><pre lang="xml">(Nom, Prénom, Adresse, Email)</pre></td>
  </tr>
  <tr>
    <td>Alternative</td>
    <td><code>|</code></td>
    <td><pre lang="xml">(Personne | Société)</pre></td>
  </tr>
  <tr>
    <td>De 0 à n occurences</td>
    <td><code>*</code></td>
    <td><pre lang="xml">(Adresse, LigneAdresse*)</pre></td>
  </tr>
  <tr>
    <td>Au moins 1 occurence</td>
    <td><code>+</code></td>
    <td><pre lang="xml">(Adresse, LigneAdresse*)+</pre></td>
  </tr>
  <tr>
    <td>0 ou 1 occurence</td>
    <td><code>?</code></td>
    <td><pre lang="xml">(Nom, Prénom?, Email?)</pre></td>
  </tr>
</table>

---

## Définition d'attributs

Définit le nom de l'élément et ses attributs.

``` xml
<!ATTLIST Société xml:lang NMTOKEN #IMPLIED
                  idname   ID      #IMPLIED
                  type     (SA|SARL|EURL) 'SA' >
```

Un attribut se définit comme suit
- nom de l'attribut
- type de l'attribut ou valeurs énumérées
- indicateur d'occurence ou valeur par défaut

### Types d'attributs

<table>
  <tr>
    <th align="left">CDATA</th>
    <td>Chaîne de caractère littérale</td>
    <td><pre lang="xml"><!ATTLIST soc name CDATA #IMPLIED></pre></td>
  </tr>
  <tr>
    <th align="left">ID,<br>IDREF</th>
    <td>Renvois à l'intérieur des documents</td>
    <td><pre lang="xml"><!ATTLIST soc idname ID #REQUIRED></pre></td>
  </tr>
  <tr>
    <th align="left">(a | b)</th>
    <td>L'ensemble des valeurs possibles de l'attribut est défini</td>
    <td><pre lang="xml"><!ATTLIST personne fonction (ing|com|tech|admin) "ing"></pre></td>
  </tr>
  <tr>
    <th align="left">ENTITY,<br>ENTITIES</th>
    <td>Référence à une ou plusieurs entités externes non XML</td>
    <td><pre lang="xml"><!ATTLIST personne photo ENTITY #IMPLIED></pre></td>
  </tr>
  <tr>
    <th align="left">NMTOKEN,<br>NMTOKENS</th>
    <td>1 ou plus noms symboliques</td>
    <td><pre lang="xml"><!ATTLIST personne compet NMTOKEN default "xml"></pre></td>
  </tr>
  <tr>
    <th align="left">NOTATION</th>
    <td>(OBSOLÈTE) Indique que le contenu de l'élément doit être passé à l'application identifiée par la notation</td>
    <td><pre lang="xml"><!NOTATION vcard system "/usr/bin/ns">
<!ELEMENT vcard-buffer any>
<!ATTLIST vcard-buffer vc NOTATION (vcard) #IMPLIED></pre></td>
  </tr>
</table>

### Indicateur d'occurence

<table>
  <tr>
    <th align="left">#REQUIRED</th>
    <td>L'attribut est obligatoire</td>
    <td><pre lang="xml"><!ATTLIST soc idname ID #REQUIRED></pre></td>
  </tr>
  <tr>
    <th align="left">#IMPLIED</th>
    <td>L'attribut est optionnel</td>
    <td><pre lang="xml"><!ATTLIST soc name CDATA #IMPLIED></pre></td>
  </tr>
  <tr>
    <th align="left">#FIXED&nbsp;"valeur"</th>
    <td>La valeur de l'attribut est fixée</td>
    <td><pre lang="xml"><!ATTLIST soc pays CDATA #FIXED "France"></pre></td>
  </tr>
  <tr>
    <th align="left">"valeur"</th>
    <td>Valeur par défaut</td>
    <td><pre lang="xml"><!ATTLIST personne fonction (ing|tech|admin) "ing"></pre></td>
  </tr>
</table>

---

## Définition d'entités

### Entités internes

Les entités internes référencent des objet qui peuvent être réutilisés dans le document XML (servent de remplacement).
Il existe 3 types d'entités internes :

* Entités de caractères  
  Elles remplacent des caractères spéciaux  
  XML 1.0 définit nativement les entités de caractères suivantes: `&lt;` `&gt;` `&quot;` `&apos;` `&amp;`,  
  qui remplacent `<` `>` `"` `'` `&` respectivement.

* Entités générales internes  
  Elles remplacent des expressions

  ``` xml
  <!ENTITY mail "@domaine.com">
  ```

  ``` xml
  <bal>sbonhome&mail;</bal>
  ```

* Entités paramètre  
  Elles remplacent des paramètres

  ``` xml
  <!ENTITY % idt "(nom,prenom,age?)">
  ```

  ``` xml
  <!ELEMENT personne (%idt,bal,soc)>
  ```

### Entités externes

Les entités externes référencent des documents externes.
Il existe 2 types d'entités externes :

* Entités XML externes  
  Elles référencent des documents XML externes

  ``` xml
  <!ENTITY moncv SYSTEM "/home/bonhomme/cv.xml">
  ```

* Entités générales externes  
  Elles référencent des documents non XML (binaires)

  ``` xml
  <!ENTITY maphoto SYSTEM "/home/bonhomme/photo.jpg" NDATA
jpeg>
  ```

#### Référence document

Un document peut être référencé soit
* par une URL

    ``` xml
    <!ENTITY maphoto SYSTEM "/home/bonhomme/photo.jpg>
    ```
* par une FPI (Formal Public Identifier), méthode rare et obsolète  
    La FPI est toujours suivie d'une URL (fallback)

    ``` xml
    <!ENTITY rec-XML PUBLIC
                     "-//W3C//DOCUMENT Recommandation open - The recommandation for XML 1.0//EN"
                     "http://www.w3.org/TR/1998/REC-xml-19980210.xml">
    ```

    [Format d'une FPI](http://tdg.docbook.org/tdg/4.5/ch02.html#d0e3984)

---

## Exemple complet

<ins>Modèle de données</ins>:

- Une présentation est représentée par un élément racine **document** qui contient
    * une en-tête **header** contenant les déclarations de modèles disponibles pour les diapositives.  
        Chaque déclaration de modèle fait l'objet d'un élément vide **declare** qui porte un attribut ***name***, globalement unique au sein d'un document

    * une suite de diapositives **slide**
        les diapositives portent un attribut ***model***, qui détermine quel modèle elle utilise (parmi ceux déclarés dans l'entête)

<!-- -->

- Chaque diapositive est constitué :
    * d'un titre **title** sur un seul paragraphe;
    * d'un corps **body** qui content une séquence d’éléments **bloc**

<!-- -->

- Chaque bloc peut contenir, au choix :
    - une image **img***, avec un attribute ***src*** (nom du fichier image)
    - une liste **ul**, composée d'une suite d'items **li**

<!-- -->

- Un item li peut contenir :
    * un paragraphe **p** suivi éventuellement
    * d'une liste **ul** (de niveau inférieur)

<!-- -->

- Chaque paragraphe peut être composé :
    * de contenu textuel, éventuellement agrémenté de balises de mise en forme :
    * gras **b**
    * italique **i**
    * couleur **color**, avec un attribut ***rgb*** contenant le code couleur

<ins>Document.xml</ins> :

``` xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE document SYSTEM "Presentation.dtd">

<document>
<header>
  <declare name="titre"/>
  <declare name="standard"/>
  <declare name="illustration"/>
</header>
<slide model="titre">
  <title><p>Exemple DTD</p></title>
</slide>
<slide model="standard">
  <title><p>Travail à réaliser</p></title>
  <body>
  <bloc>
    <ul>
    <li>
      <p>Réaliser une DTD</p>
      <ul>
        <li><p>Valider une instance</p></li>
      </ul>
    </li>
    <li>
      <p>Modifier un document ODP</p>
      <ul>
        <li><p>Mettre un titre en rouge</p></li>
        <li><p>Mettre tous les titres en vert</p></li>
      </ul>
    </li>
    </ul>
  </bloc>
  </body>
</slide>
<slide model="illustration">
  <title><p>Validation</p></title>
  <body>
  <bloc>
    <img src="screenshot"/>
  </bloc>
  <bloc>
    <ul>
      <li><p>Xmllite</p></li>
    </ul>
  </bloc>
  </body>
</slide>
</document>
```

<ins>Presentation.dtd</ins> :

``` xml
<!-- / -->
<!ELEMENT  document (header, slide*)>

<!-- /document/header -->
<!ELEMENT  header   (declare)*>
<!ELEMENT  declare  EMPTY>
<!ATTLIST  declare  name ID #REQUIRED>

<!-- /document/slide -->
<!ELEMENT  slide    (title?, body?)>
<!ATTLIST  slide    model IDREF #REQUIRED>
<!ELEMENT  title    (p)>
<!ELEMENT  body     (bloc)*>

<!-- /document/slide/body -->
<!ELEMENT  bloc     (ul | img)>

<!ELEMENT  ul       (li)*>
<!ELEMENT  li       (p, ul?)>
<!ELEMENT  p        (#PCDATA | b | i | color)*>

<!ELEMENT  img      EMPTY>
<!ATTLIST  img      src CDATA #REQUIRED>

<!-- /document/body/body/bloc/p -->
<!ELEMENT  b        (#PCDATA | i | color)*>
<!ELEMENT  i        (#PCDATA | b | color)*>
<!ELEMENT  color    (#PCDATA | b | i)*>
<!ATTLIST  color    rgb CDATA #REQUIRED>
```
