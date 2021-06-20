---
title: CRUD
category: Web, ElasticSearch
---

## API Index

* Créer un index

  ``` txt
  PUT /myindexname
  ```

* Supprimer un index

  ``` txt
  DELETE /myindexname
  ```

* Lister les index existants

  ``` txt
  GET /_aliases
  ```

---

## API Document

### Create

Pour créer un document, on peut utiliser PUT ou POST:

* avec POST, ElasticSearch auto-génère un ID pour le document

  ```
  POST myindexname/_doc
  {
    "first_name" : "John",
    "last_name": "Doe"
  }
  ```

* avec PUT, on peut assigner un ID manuellement

  ```
  PUT myindexname/_doc/1
  {
    "first_name" : "John",
    "last_name": "Doe"
  }
  ```

* Si on indexe un document avec PUT, ElasticSearch va soit créer, soit écraser le document avec l'ID spécifié s'il existe déjà — le champ `_version` est incrémenté.
  Pour éviter d'écraser un document existant avec la méthode PUT, on peut utiliser la méthode _create: si le document existe déjà, une erreur sera levée:

  ```
  PUT myindexname/_create/1
  {
    "first_name" : "John",
    "last_name": "Doe"
  }
  ```

### Read

* Pour récupérer le contenu d'un document dont on connaît l'ID:

  ```
  GET myindexname/_doc/1
  ```

* Pour récupérer plusieurs documents:

  ``` txt
  GET /myindexname/_mget
  {
    "ids" : ["1", "2"]
  }
  ```

  ou

  ``` txt
  GET /_mget
  {
    "docs": [
      {
        "_index": "myindexname",
        "_id": "1"
      },
      {
        "_index": "myindexname",
        "_id": "2"
      }
    ]
  }
  ```

### Update

* Pour remplacer un document par un autre:  

  ```
  POST myindexname/_doc/1
  {
    "first_name": "Alice",
    "last_name": "Doe"
  }
  ```

* Pour mettre à jour les champs spécifiés (et garder la valeur actuelle pour les champs non spécifiés), on utilise la méthode _update avec "doc" pour contexte:

  ```
  POST myindexname/_update/1
  {
    "doc": {
      "first_name": "Alice",
      "age": 20
    }
  }
  ```

#### script

* Il est possible d'utiliser un langage de programmation pour mettre à jour les champs du document — par exemple, pour incrémenter une valeur, calculer la somme de deux champs, concaténer des champs, etc.

  ```
  POST myindexname/_update/1
  {
    "script": "ctx._source.age += 5"
  }
  ```

* Il est également possible de définir des paramètres qui seront utilisables dans la partie script:

  ```
  -- Mettre à jour le libellé de la catégorie 371
  {
    "script":
      "for (int i = 0; i < ctx._source.categories.size(); i++){
        if(ctx._source.categories[i]._id == _id) {
          ctx._source.categories[i].libelle = \"macategory\";
        }
      }",
    "params" : { "_id" : 371 }
  };
  ```

  ```
  -- Supprimer la catégorie 371
  {
    "script":
      "for (int i = 0; i < ctx._source.categories.size(); i++){
        if(ctx._source.categories[i]._id == _id) {
          ctx._source.categories.remove(i); i--;
        }
      }",
    "params" : { "_id" : 371 }
  };
  ```

[How to write scripts](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting-using.html)

### Delete

* Pour supprimer un document:

  ```
  DELETE myindexname/_doc/1
  ```

---

## Mapping

* Les documents insérés n'ont pas de schéma: on peut définir n'importe quel champ avec n'importe quel type de donnée. ElasticSearch essaie cependant de déterminer le type des données, ce qui déterminera le type d'opérations qu'il est possible d'effectuer dessus — on peut par exemple effectuer la somme de deux champs numériques mais pas de champs texte.

  Le type des champs est enregistré dans le *mapping* de l'index, qui est populé automatiquement par ElasticSearch quand on ajoute de nouveaux champs. Il est possible de vérifier le mapping d'un index avec la requête *_mapping*:

  ```
  GET kibana_sample_data_ecommerce/_mapping
  ```

  <details>
  <summary>Exemple réponse</summary>
  <pre lang="json">
  {
    "kibana_sample_data_ecommerce" : {
      "mappings" : {
        "properties" : {
          "category" : {
            "type" : "text",
            "fields" : {
              "keyword" : {
                "type" : "keyword"
              }
            }
          },
          "currency" : {
            "type" : "keyword"
          },
          "customer_birth_date" : {
            "type" : "date"
          },
          "customer_first_name" : {
            "type" : "text",
            "fields" : {
              "keyword" : {
                "type" : "keyword",
                "ignore_above" : 256
              }
            }
          },
          "customer_full_name" : {
            "type" : "text",
            "fields" : {
              "keyword" : {
                "type" : "keyword",
                "ignore_above" : 256
              }
            }
          },
          "customer_gender" : {
            "type" : "keyword"
          },
          "customer_id" : {
            "type" : "keyword"
          },
          "customer_last_name" : {
            "type" : "text",
            "fields" : {
              "keyword" : {
                "type" : "keyword",
                "ignore_above" : 256
              }
            }
          },
          "customer_phone" : {
            "type" : "keyword"
          },
          "day_of_week" : {
            "type" : "keyword"
          },
          "day_of_week_i" : {
            "type" : "integer"
          },
          "email" : {
            "type" : "keyword"
          },
          "event" : {
            "properties" : {
              "dataset" : {
                "type" : "keyword"
              }
            }
          },
          "geoip" : {
            "properties" : {
              "city_name" : {
                "type" : "keyword"
              },
              "continent_name" : {
                "type" : "keyword"
              },
              "country_iso_code" : {
                "type" : "keyword"
              },
              "location" : {
                "type" : "geo_point"
              },
              "region_name" : {
                "type" : "keyword"
              }
            }
          },
          "manufacturer" : {
            "type" : "text",
            "fields" : {
              "keyword" : {
                "type" : "keyword"
              }
            }
          },
          "order_date" : {
            "type" : "date"
          },
          "order_id" : {
            "type" : "keyword"
          },
          "products" : {
            "properties" : {
              "_id" : {
                "type" : "text",
                "fields" : {
                  "keyword" : {
                    "type" : "keyword",
                    "ignore_above" : 256
                  }
                }
              },
              "base_price" : {
                "type" : "half_float"
              },
              "base_unit_price" : {
                "type" : "half_float"
              },
              "category" : {
                "type" : "text",
                "fields" : {
                  "keyword" : {
                    "type" : "keyword"
                  }
                }
              },
              "created_on" : {
                "type" : "date"
              },
              "discount_amount" : {
                "type" : "half_float"
              },
              "discount_percentage" : {
                "type" : "half_float"
              },
              "manufacturer" : {
                "type" : "text",
                "fields" : {
                  "keyword" : {
                    "type" : "keyword"
                  }
                }
              },
              "min_price" : {
                "type" : "half_float"
              },
              "price" : {
                "type" : "half_float"
              },
              "product_id" : {
                "type" : "long"
              },
              "product_name" : {
                "type" : "text",
                "fields" : {
                  "keyword" : {
                    "type" : "keyword"
                  }
                },
                "analyzer" : "english"
              },
              "quantity" : {
                "type" : "integer"
              },
              "sku" : {
                "type" : "keyword"
              },
              "tax_amount" : {
                "type" : "half_float"
              },
              "taxful_price" : {
                "type" : "half_float"
              },
              "taxless_price" : {
                "type" : "half_float"
              },
              "unit_discount_amount" : {
                "type" : "half_float"
              }
            }
          },
          "sku" : {
            "type" : "keyword"
          },
          "taxful_total_price" : {
            "type" : "half_float"
          },
          "taxless_total_price" : {
            "type" : "half_float"
          },
          "total_quantity" : {
            "type" : "integer"
          },
          "total_unique_products" : {
            "type" : "integer"
          },
          "type" : {
            "type" : "keyword"
          },
          "user" : {
            "type" : "keyword"
          }
        }
      }
    }
  }
  <pre>
  </details>

* Il est également possible de définir explicitement le mapping d'un index, par exemple pour définir le format des dates.

  [Explicit mapping](https://www.elastic.co/guide/en/elasticsearch/reference/current/explicit-mapping.html)

### Type nested

* Par défaut, les sous-objets d'un document sont aplatis en listes de valeurs. Par exemple le document suivant:

    ```
    PUT usergroups/_doc/1
    {
      "group" : "fans",
      "user" : [
        {
          "first" : "John",
          "last" :  "Smith"
        },
        {
          "first" : "Alice",
          "last" :  "White"
        }
      ]
    }
    ```

  sera enregistré comme suit:

  ```
  {
    "group" :        "fans",
    "user.first" : [ "alice", "john" ],
    "user.last" :  [ "smith", "white" ]
  }
  ```

  L'association entre "alice" et "white" est donc perdue: on ne pourra pas rechercher les documents ayant un utilisateur dont on connaît le nom et le prénom.

* Utiliser le type `nested` permet de maintenir l'indépendance de chaque objet — et on pourra utiliser une recherche `nested` sur ce champ.

  ```
  PUT usergroups
  {
    "mappings": {
      "properties": {
        "user": {
          "type": "nested"
        }
      }
    }
  }
  ```

[Data type nested](https://www.elastic.co/guide/en/elasticsearch/reference/current/nested.html)

### Type join

* Le type `join` crée une relation parent/enfant entre des documents du même index.

  Par exemple, on peut vouloir insérer des produits où un produit sera le produit principal (1kg) et les autres produits sont des variantes de ce même produit (500g, 250g). La recherche doit pouvoir retourner ces 3 produits distinctement, et la fiche produit affiche le produit sélectionné avec ses variantes.

  1. Définir le mapping

      ```
      PUT products
      {
        "mappings": {
          "properties": {
            "id": {
              "type": "keyword"
            },
            "type": {
              "type": "join",
              "relations": {
                "product": "product_variant"
              }
            }
          }
        }
      }
      ```

  2. Créer les documents parent. Par exemple, ici on crée des documents avec le contexte `product`.

      ```
      PUT products/_doc/1?refresh
      {
        "id": "1",
        "label": "Blanquette de poulet 1kg",
        "type": {
          "name": "product"
        }
      }

      PUT products/_doc/2?refresh
      {
        "id": "2",
        "label": "Radis",
        "type": {
          "name": "product"
        }
      }
      ```

  3. Créer les documents enfants. Ici on crée des documents avec le contexte `product_variant` et qui ont pour parent un document crée précédemment.

      ```
      PUT products/_doc/3?routing=1&refresh
      {
        "my_id": "3",
        "label": "Blanquette de poulet 500g",
        "type": {
          "name": "product_variant",
          "parent": "1"
        }
      }

      PUT products/_doc/4?routing=1&refresh
      {
        "my_id": "4",
        "label": "Blanquette de poulet 250g",
        "type": {
          "name": "product_variant",
          "parent": "1"
        }
      }
      ```

[Data type join](https://www.elastic.co/guide/en/elasticsearch/reference/current/parent-join.html)