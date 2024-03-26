---
title: XPath
category: Web, XML
---

XPath est un langage de localisation. Il permet d'écrire des "chemin d'accès" pour se déplacer dans la structure d'un document XML (des sélecteurs). Il propose un ensemble de fonctions prédéfinies pour gérer les expressions booléennes, les nombres et les chaînes de caractères.

XPath est né d'un effort d'homogénéisation de la syntaxe et de la sémantique de fonctions communes à XSLT et XPointer.

<ins>Exemple d'utilisation de XPath</ins> (match, select):

``` xml
<xsl:template match="modele">
<li>
    Modèle : <xsl:value-of select="@name"/>
</li>
</xsl:template>
```

Ressources :
* [Specs XPath 1.0](https://www.w3.org/TR/xpath/#corelib)

---

## Chemins de localisation

Une expression Xpath est composé d'une séquences d'étapes qui sélectionnent un ensemble de noeuds. Les étapes sont assemblées de gauche à droite et séparées par des slash (`/`)

- chemin absolu (démarre à la racine du document)

      /document/body/diapositive/title

- chemin relatif au noeud courant

      title

---

## Étapes

Une étape d'un chemin de localisation est constituée d'un *axe* (optionnel), d'un *test de noeud* et de 0 ou N *prédicats*.

    axe::test[predicat]

---

## Axe

L'axe sélectionne les noeuds candidats en fonction de leur relation aux noeuds du contexte (par exemple les enfants des noeuds sélectionnés).

Valeurs possibles :

    child | parent | ancestor | descendant | following-sibling |
    preceding-sibling | following | preceding | attribute | namespace |
    descendant_or_self | ancestor_or_self

<ins>Axe horizontal</ins> :

<table>
  <tr>
    <th align="left">attribute</th>
    <td>Sélectionne des attributs</td>
  </tr>
  <tr>
    <th align="left">following</th>
    <td>Sélectionne tous les noeuds suivants (hors descendants et ancêtres)</td>
  </tr>
  <tr>
    <th align="left">preceding</th>
    <td>Sélectionne tous les noeuds précédants (hors ancêtres)</td>
  </tr>
  <tr>
    <th align="left">following-sibling</th>
    <td>Sélectionne les noeuds suivants qui ont le même parent que le noeud courant</td>
  </tr>
  <tr>
    <th align="left">preceding-sibling</th>
    <td>Sélectionne tous les noeuds précédents qui ont le même parent que le noeud courant</td>
  </tr>
  <tr>
    <th align="left">namespace</th>
    <td>Déclarations de namespace dans le noeud courant</td>
  </tr>
</table>

<ins>Axe vertical</ins> :

<table>
  <tr>
    <th align="left">ancestor</th>
    <td>Sélectionne tous les ancêtres du noeud courant</td>
  </tr>
  <tr>
    <th align="left">ancestor-or-self</th>
    <td>Sélectionne tous les ancêtres du noeud courant en plus du noeud courant</td>
  </tr>
  <tr>
    <th align="left">descendant</th>
    <td>Sélectionne tous les noeuds contenus dans le noeud courant</td>
  </tr>
  <tr>
    <th align="left">descendant-or-self</th>
    <td>Sélectionne tous les contenus dans le noeud courant en plus du noeud courant</td>
  </tr>
  <tr>
    <th align="left">child</th>
    <td>Sélectionne tous les enfants du noeud courant (niveau + 1).</td>
  </tr>
  <tr>
    <th align="left">parent</th>
    <td>Sélectionne le parent du noeud courant (vide pour la racine)</td>
  </tr>
  <tr>
    <th align="left">self</th>
    <td>Sélectionne le noeud courant</td>
  </tr>
</table>

<ins>Comparaisons</ins> :

![Schéma différents axes](https://i.imgur.com/v53a8U7.png)

<ins>Exemples</ins> :

``` xml
<!-- Sélectionne tous les attributs du noeud courant -->
attribute::*
```

``` xml
<!-- Sélectionne l'attribut name du noeud courant -->
attribute::name
```

``` xml
<!-- Sélectionne le prochain chapitre -->
following-sibling::chapter[position()=1]
```

---

## abréviations

<table>
  <tr>
    <th>Version longue</th>
    <th>abréviation</th>
  </tr>
  <tr>
    <td><code>child::para</code></td>
    <td><code>para</code></td>
  </tr>
  <tr>
    <td><code>attribute::grade</code></td>
    <td><code>@grade</code></td>
  </tr>
  <tr>
    <td><code>attribute::*</code></td>
    <td><code>@*</code></td>
  </tr>
  <tr>
    <td><code>/descendant-or-self::node()</code></td>
    <td><code>//</code></td>
  </tr>
  <tr>
    <td><code>self::node()</code></td>
    <td><code>.</code></td>
  </tr>
  <tr>
    <td><code>parent::node()</code></td>
    <td><code>..</code></td>
  </tr>
  <tr>
    <td><code>child::para[position() = 1]</code></td>
    <td><code>para[1]</code></td>
  </tr>
</table>

``` xml
<!-- Sélectionne tous les attributs href
dans les descendants du noeud courant -->
.//@href
```

---

## Test

Le test de noeud sélectionne les noeuds en fonction de leur type (texte, PI, element, etc) ou nom.

Valeurs possibles :

    * | text() | node() |
    <nodename> | <nsname>:* |
    comment() | processing-instruction()

<table>
  <tr>
    <th align="left">node()</th>
    <td>Sélectionne les noeuds (sauf les attributs et déclarations de namespace)<br><em>element, text, PI, comment</em></td>
  </tr>
  <tr>
    <th align="left">*</th>
    <td>Sélectionne les éléments et PI<br><em>element, PI</em></td>
  </tr>
  <tr>
    <th align="left">text()</th>
    <td>Sélectionne les noeuds texte<br><em>text</em></td>
  </tr>
  <tr>
    <th align="left">comment()</th>
    <td>Sélectionne les commentaire<br><em>comment</em></td>
  </tr>
  <tr>
    <th align="left">processing-instruction()</th>
    <td>Sélectionne les PI<br><em>PI</em></td>
  </tr>
  <tr>
    <th align="left">nodename</th>
    <td>Sélectionne les éléments <code>nodename</code></td>
  </tr>
  <tr>
    <th align="left">nsname:*</th>
    <td>Sélectionne les éléments du namespace <code>nsname</code></td>
  </tr>
</table>

<ins>Exemples</ins> :

``` xml
<!-- Sélectionne les éléments de <diapo> -->
diapo::*
```

``` xml
<!-- Sélectionne les PI qui incluent des feuilles de style -->
processing-instruction('xml-stylesheet')
```

---

## Prédicats

Les prédicats filtrent le résultat des noeuds trouvés.  
Ils peuvent tester des booléens, des nombres, des chaînes de caractères, des ensembles de noeuds. Pour ce faire des opérations et des fonctions sont disponibles.

### Booléens

<ins>Opérateurs</ins>: `and`, `or`, `=`, `<`, `>`, `<=`, `>=`  
<ins>Fonctions</ins>:

<table>
  <tr>
    <th align="left">boolean(object)</th>
    <td>Convertit ses arguments en booléens</td>
  </tr>
  <tr>
    <th align="left">not(boolean)</th>
    <td>Retourne le booléen inverse</td>
  </tr>
  <tr>
    <th align="left">true()</th>
    <td>Retourne true</td>
  </tr>
  <tr>
    <th align="left">false()</th>
    <td>Retourne false</td>
  </tr>
  <tr>
    <th align="left">lang(string)</th>
    <td>Retourne true or false selon la langue du noeud contextuel</td>
  </tr>
</table>

``` xml
<!-- Sélectionner les noeuds <chapitre>
qui ont au moins un enfant <titre>
dont le contenu est égal à "Introduction" -->
chapitre[titre="Introduction"]
```

``` xml
<!-- Sélectionner les noeuds <para>
dont l'attribut type
a pour valeur "warning" -->
para[@type="warning"]
```

``` xml
<!-- Sélectionner l'attribut name
des ingredients qui utilisent 1/2 cup -->
//ingredient[@amount='0.5' and @unit='cup']/@name 
```

### Nombres

<ins>Opérateurs</ins>: `+`, `-`, `DIV`, `MOD`  
<ins>Fonctions</ins>:

<table>
  <tr>
    <th align="left">number(object)</th>
    <td>Convertit ses arguments en nombre</td>
  </tr>
  <tr>
    <th align="left">sum(nodes)</th>
    <td>Retourne la somme de la conversion de tous les noeuds passés en argument</td>
  </tr>
  <tr>
    <th align="left">floor(number)</th>
    <td>Retourne le plus grand nombre entier inférieur à l'argument</td>
  </tr>
  <tr>
    <th align="left">ceiling(number)</th>
    <td>Retourne le plus petit nombre entier supérieur à l'argument</td>
  </tr>
  <tr>
    <th align="left">round(number)</th>
    <td>Retourne le nombre entier le plus proche de l'argument</td>
  </tr>
</table>

### Chaînes de caractères

<ins>Fonctions</ins>:

<table>
  <tr>
    <th align="left">string(object)</th>
    <td>Convertit ses arguments en chaîne de caractère</td>
  </tr>
  <tr>
    <th align="left">concat(string, string*)</th>
    <td>Retourne la concaténation des arguments</td>
  </tr>
  <tr>
    <th align="left">contains(string, needle)</th>
    <td>Indique si string contient needle</td>
  </tr>
  <tr>
    <th align="left">substring-before(string, needle)</th>
    <td>Retourne la sous-chaîne de string qui précède la 1ère occurence de needle</td>
  </tr>
  <tr>
    <th align="left">substring-after(string, needle)</th>
    <td>Retourne la sous-chaîne de string qui suit la 1ère occurence de needle</td>
  </tr>
  <tr>
    <th align="left">substring(string, offset, length)</th>
    <td>Retourne la sous-chaîne de string qui commence à offset et sur une longueur de length</td>
  </tr>
  <tr>
    <th align="left">string-length(string)</th>
    <td>Retourne le nombre de caractère de la chaîne</td>
  </tr>
  <tr>
    <th align="left">normalize-space(string)</th>
    <td>Retourne la chaîne après avoir normalisé les espaces (tirm, fusion multiple espaces)</td>
  </tr>
  <tr>
    <th align="left">translate(string, search, replace)</th>
    <td>Retourne string dans la lequelle toutes les occurences des caractères de search sont remplacés par les caractères de replace (positions correspondantesà</td>
  </tr>
</table>

### Ensemble de noeuds

<table>
  <tr>
    <th align="left">last()</th>
    <td>Retourne la longueur de la dimension actuelle</td>
  </tr>
  <tr>
    <th align="left">position()</th>
    <td>Retourne la position actuelle</td>
  </tr>
  <tr>
    <th align="left">count(nodes)</th>
    <td>Retourne le nombre de noeuds de l'ensemble</td>
  </tr>
  <tr>
    <th align="left">id(string)</th>
    <td>Sélectionne les éléments par leur identifiant</td>
  </tr>
  <tr>
    <th align="left">local-name(nodes)</th>
    <td>Retourne la partie locale du nom du 1er noeud de l'ensemble</td>
  </tr>
  <tr>
    <th align="left">namespace-uri(nodes)</th>
    <td>Retourne l'URI du namespace du 1er noeud de l'ensemble</td>
  </tr>
  <tr>
    <th align="left">name(nodes)</th>
    <td>Retourne le nom expansé du 1er noeud de l'ensemble</td>
  </tr>
</table>

``` xml
<!-- Sélectionne le 5ème enfant <para> de l'élément qui a comme identifiant "foo" -->
id("foo")/child::para[position()=5]
```

``` xml
<!-- Sélectionne les 5 premières sections -->
child::section[position()<6]
```

---

## Union

XPath permet de faire l'union entre deux expressions par l'opérateur `|`

    @*|node()

---

## XPath 2.0

XPath 2.0
- utilise les types de XML Schema (types 1.0 = node-set, boolean, number, string).  
  Les node-sets sont remplacés par les sequences
- ajoute de nouveaux opérateurs
  * cast, trat, assert, instance of
  * for, if, some, every, intersect, except
- de nouvelles (nombreuses !) [fonctions](https://www.w3.org/TR/xpath-functions/)
  * regex, replace, tokenize, date formats, etc


