---
title: SimpleXMLElement
category: Web, PHP, XLM
---

Transforme un document XML en un objet que l'on peut lire et modifier.

## Créer un objet

### simplexml_load_string, __construct

Construit un objet `SimpleXMLElement` à partir d'une chaîne de caractères.

``` php
<?php
$str = <<<XML
<?xml version='1.0'?> 
<document>
 <title>Forty What?</title>
 <from>Joe</from>
 <to>Jane</to>
 <body>
  I know that's the answer -- but what's the question?
 </body>
</document>
XML;

$xml = simplexml_load_string($str);
print_r($xml);
/* 
SimpleXMLElement Object (
  [title] => Forty What?
  [from] => Joe
  [to] => Jane
  [body] => I know that's the answer -- but what's the question? )
*/
```

``` php
<?php
$xml = new SimpleXMLElement($str);
```

Lève une erreur (warning) pour chaque erreur trouvée dans les données XML.  
Utiliser `libxml_use_internal_errors()` pour supprimer les erreurs XML et `libxml_get_errors()` pour les parcourir. 

### simplexml_load_file

Construit un objet `SimpleXMLElement` à partir d'un fichier XML.

``` php
<?php
$xml = simplexml_load_file('test.xml');
```

### simplexml_import_dom

Construit un objet `SimpleXMLElement` à partir d'un objet DOM.

``` php
<?php
$dom = new DOMDocument;
$dom->loadXML('<books><book><title>blah</title></book></books>');
if (!$dom) {
    echo 'Erreur durant l\'analyse du document';
    exit;
}

$xml = simplexml_import_dom($dom);
```

---

## Accéder au contenu

### getName

Retourne le nom de l'élément.

``` php
<?php
$str = '<root><ns:example ns:type="product" xmlns:ns="http://uri">Content&lt;/ns:example></root>';

$xml = new SimpleXMLElement($str);
echo $xml->getName(); # root
```

### __get

On peut récupérer un enfant spécifique de l'élément en utilisant la flèche `->`.  
Si on essaie d'accéder à un enfant qui n'existe pas, un `SimpleXMLElement` vide est retourné.

``` php
<?php
$str = '<root>
<a>Content A</a>
<b type="B">Content B</b>
<ns:c xmlns:ns="http://uri" ns:type="C">Content C</ns:c>
</root>';

$xml = new SimpleXMLElement($str);
print_r($xml->a);    # SimpleXMLElement Object ( [0] => Content A )
print_r($xml->test); # SimpleXMLElement Object ( ) 
```

Pour récupérer le texte que l'élément contient, il suffit de le caster en chaîne de caractères.

``` php
<?php
$txt = (string)$xml->a; # Content A
```

Si l'enfant est préfixé d'un namespace, il est nécessaire d'utiliser `children` pour le récupérer.

### count

Retourne le nombre d'enfants de l'élément.

``` php
<?php
$xml->count(); # 2
```

### children

Retourne la liste des enfants de l'élément du namespace donné.

``` php
<?php
print_r($xml->children());
#  SimpleXMLElement Object ( [a] => Content A [b] => Content B )

print_r($xml->children('http://uri'));
#  SimpleXMLElement Object ( [c] => Content C ) 
```

### getNamespaces

Retourne les espaces de nom de l'élément.

``` php
<?php
print_r($xml->getNamespaces());                            # Array ( )
print_r($xml->children('http://uri')->c->getNamespaces()); # Array ( [ns] => http://uri )
```

Peut également retourner tous les espaces de nom utilisés par les enfants de l'élément.

``` php
<?php
print_r($xml->getNamespaces(true));                        # Array ( [ns] => http://uri )
```

### attributes

Récupère les attributs de l'élément du namespace donné.

``` php
<?php
print_r($xml->children()->b->attributes());
#  SimpleXMLElement Object ( [@attributes] => Array ( [type] => B ) )

print_r($xml->children('http://uri')->c->attributes());
# SimpleXMLElement Object ( )

print_r($xml->children('http://uri')->c->attributes('http://uri'));
# SimpleXMLElement Object ( [@attributes] => Array ( [type] => C ) )
```

Pour récupérer le texte que l'attribut contient, il suffit de le caster en chaîne de caractères.

``` php
<?php
echo (string)$xml->b->attributes()->type; # B
```

### xpath

Cherche dans l'élément les enfants qui correspondent au xpath donné.

``` php
<?php
print_r($xml->xpath('child::*[@type="B"]'));
/* Array (
  [0] => SimpleXMLElement Object (
    [@attributes] => Array ( [type] => B )
    [0] => Content B ) )
*/
```

### registerXPathNamespace

Crée un contexte préfixe/ns pour la prochaine requête XPath, autorisant l'accès aux noeuds dans cet espace de nom.

``` php
<?php
$xml->registerXPathNamespace('ns', 'http://uri');

print_r($xml->xpath('child::*[@ns:type="C"]'));
/* Array (
  [0] => SimpleXMLElement Object (
    [0] => Content C ) )
*/ 
```

---

## Ajouter du contenu

### addChild

Ajoute un enfant à l'élément.

``` php
<?php
$xml->addChild('d', 'Content D');
```

### addAttribute

Ajoute un attribut à l'élément.

``` php
<?php
$xml->d->addAttribute('type', 'D');
```

---

## Exporter

### asXML

Retourne le XML correspond à l'élément et ses enfants.  
`saveXML` est un alias de `asXML`.

``` php
<?php
echo $xml->asXML();

/*
<?xml version="1.0"?>
<root>
<a>Content A</a>
<b type="B">Content B</b>
<ns:c xmlns:ns="http://uri" ns:type="C">Content C</ns:c>
<d type="D">Content D</d></root>
*/
```

