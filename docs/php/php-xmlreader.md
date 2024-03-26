---
title: XMLReader
category: Web, PHP
---

Permet de parcourir les noeuds d'un document XML.

## Créer un objet

### __construct

Crée un objet `XMLReader`.  
Pouvoir lire du XML, il faut ensuite appeler la méthode `open` ou `xml`

``` php
<?php
$xmlReader = new XMLReader();
```

### xml

Définit le contenu XML du reader.  
Si le XML est invalide, une erreur est levée (warning).

``` php
<?php
$xmlReader->xml($xml);
```

### open

Récupère le contenu XML du fichier donné.

``` php
<?php
if (!$xmlReader->open("data.xml")) {
    die("Failed to open 'data.xml'");
}
```

---

## Lire le contenu

### read

Déplace le pointeur interne au prochain noeud du document.  
Retourne `false` si on est à la fin du document, sinon `true`.

Les propriétés de l'élément en cours sont accessibles via le reader.

``` txt
&lt;root>
  &lt;ns:example ns:type="product" xmlns:ns="http://uri">Content&lt;/ns:example>
&lt;/root>
```

| Propriété        | Description                            | Exemple
|---               |---                                     |---
| `depth`          | Niveau de l'élément. La racine est à 0 | 1
| `hasAttributes`  | Indique si l'élément a des attributs   | true
| `attributeCount` | Nombre d'attributs de l'élément        | 2
| `nodeType`       | [Type de noeud](http://php.net/manual/fr/class.xmlreader.php) | 1
| `name`           | Nom de l'élément                       | ns:example
| `localName`      | Nom de l'élément sans namespace        | example
| `prefix`         | Namespace                              | ns
| `namespaceURI`   | URI du namespace                       | http://uri
| `value`          | Valeur pour un noeud de type texte (nodeType 3)     | &nbsp;
| `hasValue`       | Indique si le noeud contient du texte (nodeType 3)  | false
| `baseURI`        | Base URI du document                   | /home4/phptest/public_html/
| `isDefault`      | Vrai si le noeud en cours est un attribut par défaut de la DTD | false
| `isEmptyElement` | Vrai s'il s'agit d'un noeud vide                               | false

``` php
<?php
$xml = '<root>
<ns:example ns:type="product" xmlns:ns="http://uri">Content</ns:example>
</root>';

$reader = new XMLReader();
$reader->xml($xml);

while($reader->read()) {
  echo "\n"
        . $reader->depth
        . ': ' . $reader->name
        . ' (' . $reader->nodeType . ')'
        . ' ';

  if ($reader->nodeType == XMLReader::ELEMENT && $reader->name == 'ns:example') {
    echo $reader->getAttribute('ns:type');

  } else if($reader->hasValue) {
    echo '"' . $reader->value . '"';
  }
}

$reader->close();

/*
0: root (1) 
1: #text (14) "
"
1: ns:example (1) product
2: #text (3) "Content"
1: ns:example (15) 
1: #text (14) "
"
0: root (15) 
*/
```

### readInnerXml

Retourne le contenu XML de l'élément en cours.

``` php
<?php
while($reader->read()) {
  if ($reader->nodeType == XMLReader::ELEMENT) {
    echo "\n" . $reader->name . ': "' . $reader->readInnerXml() . '"';
  }
}

/*
root: "
<ns:example xmlns:ns="http://uri" ns:type="product">Content</ns:example>
"
ns:example: "Content"
*/
```

### readOuterXml

Retourne le XML de l'élément en cours, balises de l'élément comprises.

``` php
<?php
while($reader->read()) {
  if ($reader->nodeType == XMLReader::ELEMENT) {
    echo "\n" . $reader->readOuterXml();
  }
}

/*
<root>
<ns:example xmlns:ns="http://uri" ns:type="product">Content</ns:example>
</root>
<ns:example xmlns:ns="http://uri" ns:type="product">Content</ns:example>
*/
```

### readString

Retourne le contenu texte de l'élément en cours.

``` php
<?php
while($reader->read()) {
  if ($reader->nodeType == XMLReader::ELEMENT) {
    echo "\n" . $reader->name . ': "' . $reader->readString() . '"';
  }
}

/*
root: "
Content
"
ns:example: "Content"
*/
```

### next

Déplace le pointeur interne au prochain noeud du document en ignorant les sous-éléments de l'élément en cours.

``` php
<?php
$xml = '<root>
<item>Content A</item>
<item>Content B</item>
<item>Content B</item>
<item>Content B</item>
</root>';

$reader = new XMLReader();
$reader->xml($xml);
$reader->read(); # root
$reader->read(); # \n

while($reader->next()) {
  echo "\n"
        . $reader->depth
        . ': ' . $reader->name
        . ' (' . $reader->nodeType . ')'
        . ' ';

  if($reader->hasValue) {
    echo '"' . $reader->value . '"';
  }
}

$reader->close();

/*
1: item (1) 
1: #text (14) "
"
1: item (1) 
1: #text (14) "
"
1: item (1) 
1: #text (14) "
"
1: item (1) 
1: #text (14) "
"
0: root (15) 
*/
```

Peut prendre en paramètre le nom du noeud sur lequel se placer.

``` php
<?php
while($reader->next('item')) {
 // ...
}

/*
1: item (1) 
1: item (1) 
1: item (1) 
1: item (1) 
*/
```

### getAttribute

Récupère la valeur d'un attribut de l'élément en cours.

``` php
<?php
while($reader->read()) {
  if ($reader->nodeType == XMLReader::ELEMENT && $reader->name == 'ns:example') {
    echo $reader->getAttribute('ns:type');
  }
}

# product
```

### moveToFirstAttribute, moveToNextAttribute, moveToAttribute

* `moveToFirstAttribute()` déplace le pointeur interne sur le premier attribut de l'élément en cours.
* `moveToNextAttribute()` déplace le pointeur interne sur le prochaine attribut de l'élément en cours.
* `moveToAttribute("monattr")` déplace le pointeur interne sur l'attribut donné

``` php
<?php
$xml = '<root>
<ns:example ns:type="product" xmlns:ns="http://uri">Content</ns:example>
</root>';

$reader = new XMLReader();
$reader->xml($xml);

while($reader->read()) {
  if($reader->nodeType == XMLReader::END_ELEMENT){
    continue;
  }

  echo "\n"
        . $reader->depth
        . ': ' . $reader->name
        . ' (' . $reader->nodeType . ')'
        . ' ';

  if ($reader->hasAttributes) {
    while($reader->moveToNextAttribute()) {
      echo "\n    " . $reader->name . ' (' . $reader->nodeType . '): ' . $reader->value;
    }
  }
  if($reader->hasValue) {
    echo '"' . $reader->value . '"';
  }
}

$reader->close();

/*
0: root (1) 
1: #text (14) "
"
1: ns:example (1) 
    xmlns:ns (2): http://uri
    ns:type (2): product"product"
2: #text (3) "Content"
1: #text (14) "
"
*/
```