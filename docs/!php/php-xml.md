---
title: Fichiers XML
category: Web, PHP
---

## Afficher du XML

Pour afficher du XML dans un navigateur, il suffit d'ajouter dans les entêtes le type MIME text/xml.

``` php
<?php
header('Content-Type: text/xml');
print '<?xml version="1.0"?>' . "\n";
print "<shows>\n";

$shows = array(
  array('name'    => 'Simpsons',
       'channel'  => 'FOX',
       'start'    => '8:00 PM',
       'duration' => '30'),
  array('name'    => 'Law & Order', 
       'channel'  => 'NBC',
       'start'    => '8:00 PM',
       'duration' => '60')
);

foreach ($shows as $show) {
    echo "  <show>\n";
    foreach($show as $tag => $data) {
        echo "    <$tag>" . htmlspecialchars($data) . "</$tag>\n";
    }
    echo "  </show>\n";
}
echo "</shows>\n";
```

---

## Classes

* [XMLReader](xmlreader.md): Permet de parcourir les noeuds d'un document XML.  
  Le contenu doit être encodé en UTF-8.

* [XMLWriter](xmlwriter.md): Permet de générer un fichier XML.

* [SimpleXML](simplexml.md): Transforme un document XML en un objet que l'on peut lire et modifier.

* [DOMDocument](dom.md): Permet de lire et modifier du XML ou HTML en POO.
