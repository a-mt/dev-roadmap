---
title: ElasticSearch
category: Web
---

# Index

<table>
<tr>
  <td>Créer un index</td>
  <td>PUT</td>
  <td><code>/customer?pretty</code></td>
</tr>
<tr>
  <td>Supprimer un index</td>
  <td>DELETE</td>
  <td><code>/customer?pretty</code></td>
</tr>
</table>

# Entrée

<table>
<tr>
  <td>Créer une entrée</td>
  <td>PUT</td>
  <td><code>/customer/external?pretty -d { "name": "John Doe" }</code></td>
</tr>
<tr>
  <td>Remplacer une entrée</td>
  <td>PUT</td>
  <td><code>/customer/external/1?pretty -d { "name": "Joe Doe" }</code></td>
</tr>
<tr>
  <td>Modifier une entrée</td>
  <td>POST</td>
  <td><code>/customer/external/1/_update?pretty -d { "doc": { age": "20" } }</td>
</tr>
<tr>
  <td colspan="2"></td>
  <td>Ajouter 5 ans<br><code>... { "script": "ctx._source.age += 5" }</code></td>
</tr>
<tr>
  <td colspan="2"></td>
  <td>Mettre à jour le libellé de la catégorie 371<br><pre lang="json">... {
  "script":
    "for (int i = 0; i < ctx._source.categories.size(); i++){
      if(ctx._source.categories[i]._id == _id) {
        ctx._source.categories[i].libelle = \"macategory\";
      }
    }",
  "params" : { "_id" : 371 }
};</pre></td>
</tr>
<tr>
  <td colspan="2"></td>
  <td>Supprimer la catégorie 371<br><pre lang="json">... {
  "script":
    "for (int i = 0; i < ctx._source.categories.size(); i++){
      if(ctx._source.categories[i]._id == _id) {
        ctx._source.categories.remove(i); i--;
      }
    }",
  "params" : { "_id" : 371 }
};</pre></td>
</tr>
<tr>
  <td>Supprimer une entrée</td>
  <td>DELETE</td>
  <td><code>/customer/external/1?pretty</code></td>
</tr>
</table>

# Select

<table>
<tr>
  <td>Afficher une entrée</td>
  <td>GET</td>
  <td><code>/customer/external/1?pretty</code></td>
</tr>
<tr>
  <td>Chercher UNE entrée</td>
  <td>GET</td>
  <td><code>/customer/external/_search?pretty -d { "query": { "match": { "name": "Doe" } } }</code></td>
</tr>
<tr>
  <td colspan="2"></td>
  <td>Sélectionner les champs retournées : <br>
  SELECT id, prix_ttc, categories<br>
    FROM product<br>
    INNER JOIN categories ON categories.id = "371"
    <pre lang="json">... {
  "_source": {
    "include": [ "prix_ttc", "categories.*" ]
  },
  "query": { "nested": {
    "path": "categories",
    "query": {
       "match": { "categories._id": "371" }
    }
  }}
};</pre>
</tr>
<tr>
  <td>Chercher DES entrées</td>
  <td>GET</td>
  <td><code>/customer/external/_search?pretty -d { "query": { "match_all": {}}, "from":1, "size":1 }</code></td>
</tr>
<tr>
  <td colspan="2"></td>
  <td>Tous les produits et leurs champs associés <pre lang="json">... {
  "query": {"match_all":{}},
  "filter":{
    "has_parent":{"query":{"match_all":{}},"type":"product"}
  }
}</pre>
  </td>
</tr>
<tr>
  <td colspan="2"></td>
  <td>SELECT *
    FROM product<br>
    INNER JOIN product_attribute ON (id=2 AND value="25")<br>
    INNER JOIN product_attribute ON (id=1 AND value="8")
    <pre lang="json">... {
  "query":{"match_all":{}},
  "filter":{"and": [
    {"has_child":{
      "type":"product_attribute",
      "query":{"query_string":{"query":"_attribute:2 AND value:25"}}
    }},
    {"has_child":{
      "type":"product_attribute",
      "query":{"query_string":{"query":"_attribute:1 AND value:8"}}
    }}
  ]}
}</pre>
  </td>
</tr>
</table>
