---
title: DOM
category: Web, PHP, XLM
---

Permet de lire et modifier du XML ou HTML en POO.

## Créer un objet DOMDocument

### __construct

Crée un objet `DOMDocument`.  
Il faut ensuite appeler la méthode
* `load` ou `loadXML` pour charger du XML
* `loadHTMLFile` ou `loadHTML` pour charger du HTML

``` php
<?php
$dom = new DomDocument();
```

On peut également créer un objet `DOMDocument` à partir d'un objet `SimpleXMLElement`

``` php
<?php
$dom = dom_import_simplexml($node);
```

### load

Charge le contenu d'un fichier XML.

``` php
<?php
$dom->load('fichier.xml');
```

Si le XML est mal formé, une erreur est levée et le contenu en erreur n'est pas chargé.  
On peut modifier ce comportement en passant des options.  
Toutes les fonctions de chargement DOM acceptent les mêmes paramètres (`loadXML`, `loadHTMLFile`, `loadHTML`).

``` php
<?php
$dom->load($file, LIBXML_NOWARNING | LIBXML_NOERROR);
```

### loadXML

Définit le contenu XML du DOMDocument.

``` php
<?php
$dom->loadXML($xml);
```

### loadHTMLFile

Charge le contenu d'un fichier HTML.

``` php
<?php
$dom->loadHTMLFile('fichier.html');
```

### loadHTML

Définit le contenu HTML du DOMDocument.

``` php
<?php
$dom->loadHTML($html);
```

---

## Exporter

``` php
<?php
$xml = new DOMDocument();
$xml->preserveWhiteSpace = false;
$xml->formatOutput = true;
$xml->loadXML($xml);
echo $xml->saveXML();
```

### save

Sauvegarde le XML du DOMDocument dans un fichier.

``` php
<?php
$dom->save('file.xml');
```

### saveXML

Retourne le XML du DOMDocument.

``` php
<?php
$xml = $dom->saveXML();
```

### saveHTMLFile

Sauvegarde le HTML du DOMDocument dans un fichier.

``` php
<?php
$dom->saveHTMLFile('file.html');
```

### saveHTML

Retourne le HTML du DOMDocument.

``` php
<?php
$xml = $dom->saveHTML();
```

---

## Valider

### validate

Valide un document en se basant sur sa DTD.  
Lève des warning si des erreurs sont trouvées.

``` php
<?php
function validateXML($dom) {
  $error_handler = function($type, $message, $file, $line) use (&$errors) {
    $errors[] = preg_replace("/^.+: */", "", $message);
  };
  set_error_handler($error_handler);

  $ok = $dom->validate();
  restore_error_handler();

  return [$ok, $errors];
}

// Check document
$str = "";
$dom = new DOMDocument($str);

list($ok, $errors) = validateXML($dom);
print_r($errors);
# Array ( [0] => no DTD found! )
```

---

## Accéder au contenu

Les méthodes/propriétés suivantes sont disponibles sur `DOMDocument` et les sur les `DOMNode`.

### hasChildNodes, childNodes

`hasChildNodes` vérifie si l'élément a des noeuds enfants.  
`childNodes` est une propriété qui retourne les enfants de l'élément, sous forme d'objet `DOMNodeList` (itérable).  
Un `DOMNodeList` est une liste d'élément qui héritent de `DOMNode`.

``` php
<?php
$str = '<root>
<a>Content A</a>
<b type="B">Content B</b>
<ns:c xmlns:ns="http://uri" ns:type="C">Content C</ns:c>
</root>';

$dom = new DOMDocument();
$dom->loadHTML($str, LIBXML_NOWARNING | LIBXML_NOERROR);

function printNode($node, $prefix = "") {
  echo $prefix
      . $node->nodeName
      . ' (' . get_class($node) . " " . $node->nodeType . ')';

  if($node->nodeType == XML_TEXT_NODE) {
    echo ' "' . $node->nodeValue . '"';
  }
  echo "\n";

  if ($node->hasChildNodes()) {
    foreach ($node->childNodes as $child) {
      printNode($child, $prefix . "  ");
    }
  }
}

printNode($dom);
/*
#document (DOMDocument 13)
  html (DOMDocumentType 10)
  html (DOMElement 1)
    body (DOMElement 1)
      root (DOMElement 1)
        #text (DOMText 3) "
"
        a (DOMElement 1)
          #text (DOMText 3) "Content A"
        #text (DOMText 3) "
"
        b (DOMElement 1)
          #text (DOMText 3) "Content B"
        #text (DOMText 3) "
"
        c (DOMElement 1)
          #text (DOMText 3) "Content C"
        #text (DOMText 3) "
"
*/
```

### firstChild, lastChild

Propriétés contenant respectivement le premier et le dernier enfant.  
Comprend les noeuds texte.

``` php
<?php
$doctype = $dom->firstChild;
```

``` php
<?php
$html = $dom->lastChild;
```

``` php
<?php
function getTags($html) {
  try {
    $tags = [];

    $doc = new DomDocument();
    $doc->loadHTML('<?xml encoding="utf-8" ?><body>'.$html.'</body>', LIBXML_NOWARNING | LIBXML_NOERROR);
    $body = $doc->documentElement->firstChild;
    
    if ($body->hasChildNodes()) {
      foreach ($body->childNodes as $child) {
        $tags[] = $doc->saveHtml($child);
      }
    }
    return $tags;

  } catch(Exception $e) {
    return [$html];
  }
}
$html  = '<div class="test">Lorem <i>sdf</i> <div>ipsum</div></div>';
$html .= ' dolor';
$html .= '<p>sit amet</p>';

var_dump(getTags($html));
/*
array(3) {
  [0]=>
  string(58) "<div class="test">Lorem <i>sdf</i> <div>ipsum</div>
</div>"
  [1]=>
  string(6) " dolor"
  [2]=>
  string(15) "<p>sit amet</p>"
}
*/
```

### parentNode

Propriété contenant l'élément parent

``` php
<?php
$parentNode = $node->parentNode;
```

### previousSibling, nextSibling

Propriétés contenant respectivement l'élément de même niveau précédent et suivant.

``` php
<?php
$prev = $node->previousSibling;
```

``` php
<?php
$next = $node->nextSibling;
```

### hasAttributes, attributes

`hasAttributes` vérifie si l'élément a des attributs.  
`attributes` est une propriété qui retourne les attributs de l'élément, sous forme d'objet `DOMNamedNodeMap` (itérable).  
Un `DOMNamedNodeMap` est une liste d'élément `DOMAttr` (hérite de `DOMNode`).

``` php
<?php
function printNode($node, $prefix = "") {
  echo $prefix
        . $node->nodeName
        . ' (' . get_class($node) . " " . $node->nodeType . ')'
        . ($node->nodeType == XML_TEXT_NODE ? ' "' . $node->nodeValue . '"' : '')
        . "\n";

  if ($node->hasAttributes()) {
    foreach ($node->attributes as $attr) {
      printNode($attr, $prefix . ">");
    }
  }
  if ($node->hasChildNodes()) {
    foreach ($node->childNodes as $child) {
      printNode($child, $prefix . "  ");
    }
  }
}

/*
#document (DOMDocument 13)
  html (DOMDocumentType 10)
  html (DOMElement 1)
    body (DOMElement 1)
      root (DOMElement 1)
        #text (DOMText 3) "
"
        a (DOMElement 1)
          #text (DOMText 3) "Content A"
        #text (DOMText 3) "
"
        b (DOMElement 1)
        >type (DOMAttr 2)
        >  #text (DOMText 3) "B"
          #text (DOMText 3) "Content B"
        #text (DOMText 3) "
"
        c (DOMElement 1)
        >xmlns:ns (DOMAttr 2)
        >  #text (DOMText 3) "http://uri"
        >ns:type (DOMAttr 2)
        >  #text (DOMText 3) "C"
          #text (DOMText 3) "Content C"
        #text (DOMText 3) "
"
*/
```

---

## Chercher un noeud

### getElementsByTagName

Retourne la liste des éléments qui correspondent à la balise donnée.  
Retourne un `DOMNodeList`.

``` php
<?php
$children = $dom->getElementsByTagName("div");
```

### getElementById

Récupère l'élément ayant l'id donné.  
Retourne un `DOMNode`.

``` php
<?php
$node = $dom->getElementById("main");
```

### DOMXPath

Un objet `DOMXPath` permet d'effectuer une recherche xpath sur un objet `DOMDocument`.  
Retourne un `DOMNodeList`.

``` php
<?php
$xpath   = new DOMXPath($dom);
$results = $xpath->query("//*[@class='" . $classname . "']");
```

``` php
<?php
$node  = $xpath->query('/html/body/root/*[last()]')->item(0);
```

Il est possible de spécifier un élément `DOMNode` pour contexte.  
Pour que cela fonctionne, le xpath utilisé doit être relatif (`.//` et non `//`).

``` php
<?php
$xpath   = new DOMXPath($dom);
$node    = $xpath->getElementById("section2");
$results = $xpath->query(".//*[@class='" . $classname . "']", $node);
```

---

## DOMNodeList

Un `DOMNodeList` est un objet itérable de `DOMNode`.

### count

Retourne le nombre d'éléments de la liste.

``` php
<?php
echo $children->count();
```

### item

Retourne le ième élément.

``` php
<?php
$child = $children->item(0);
```

## DOMNamedNodeMap

Un `DOMNamedNodeMap` est un objet itérable de `DOMAttr`.  
Il dispose des mêmes méthodes `DOMNodeList`.

### getNamedItem

Retourne un attribut spécifié par son nom.

``` php
<?php
$attr = $attrs->getNamedItem('type');
```

---

## DOMNode

Un `DOMNode` est un noeud du DOM, ce peut notamment être un élément, un attribut ou texte.

### nodeName

Propriété contenant le nom du noeud.

``` php
<?php
$str = '<root>
<a>Content A</a>
<b type="B">Content B</b>
<ns:c xmlns:ns="http://uri" ns:type="C">Content C</ns:c>
</root>';

$dom = new DOMDocument();
$dom->loadHTML($str, LIBXML_NOWARNING | LIBXML_NOERROR);

$xpath = new DOMXPath($dom);
$node  = $xpath->query('/html/body/root/*[last()]')->item(0);

echo $node->nodeName; # c
```

### getNodePath

Retourne le chemin du noeud.

``` php
<?php
echo $node->getNodePath();                              # /html/body/root/c
echo $node->getAttributeNode('ns:type')->getNodePath(); # /html/body/root/c/@ns:type
```

### nodeType

Propriété contenant le type du noeud.  
[Liste des types de noeud](http://php.net/manual/fr/dom.constants.php)

``` php
<?php
echo ($node->nodeType == XML_ELEMENT_NODE ? 'Y' : 'N'); # Y
```

On peut également tester la classe pour vérifier le type de noeud.

``` php
<?php
echo ($node instanceof DOMElement ? 'Y' : 'N'); # Y
```

### nodeValue

Propriété contenant la valeur du noeud.  
On peut également utiliser [`textContent`](https://stackoverflow.com/questions/12380919/php-dom-textcontent-vs-nodevalue#answer-24730245).

``` php
<?php
echo $node->nodeValue; # Content C
```

### hasAttribute, getAttributeNode, getAttribute

* `hasAttribute` vérifie si un attribut donné existe

  ``` php
  <?php
  echo $node->hasAttribute('ns:type') ? 'Y' : 'N'; # Y
  ```

* `getAttributeNode` retourne un `DOMAttr`

  ``` php
  <?php
  $attr = $node->getAttributeNode('ns:type');
  ```

* `getAttribute` retourne la valeur d'un attribut

  ``` php
  <?php
  $type = $node->getAttribute('ns:type'); # C
  ```

---

## Créer des noeuds

### createElement

Crée un élément.

``` php
<?php
$node = $dom->createElement("div");
```

### createTextNode

Crée un noeud texte.

``` php
<?php
$textNode = $dom->createTextNode("Lorem ipsum");
```

### cloneNode

Clone un noeud.

``` php
<?php
$newNode = $node->cloneNode();
```

### createAttribute

Crée un noeud attribut.

``` php
<?php
$attr = $dom->createAttribute('name');
$attr->value = 'attributevalue';
```

---

## Modifier le contenu

### setAttribute, setAttributeNode

`setAttribute` ajoute/modifier la valeur d'un attribut.  
Même principe pour `setAttributeNode` mais prend en entrée un `DOMAttr`.

``` php
<?php
$node->setAttribute("type", "product");
```

``` php
<?php
$node->setAttributeNode($attr);
```

### removeAttribute, removeAttributeNode

Efface un attribut.

``` php
<?php
$node->removeAttribute("type");
```

``` php
<?php
$node->removeAttributeNode($attr);
```

### appendChild

Ajoute un noeud enfant, à la fin de la liste des enfants.

``` php
<?php
$node->appendChild($newNode);
```

### insertBefore

Ajoute un noeud enfant avant le noeud donné.

``` php
<?php
$node->parentNode->insertBefore($newNode, $node);
```

### removeChild

Supprime un noeud enfant.

``` php
<?php
$node->parentNode->removeChild($node);
```

### replaceChild

Remplace un noeud enfant par un autre.

``` php
<?php
$node->parentNode->replaceChild($newNode, $node);
```

