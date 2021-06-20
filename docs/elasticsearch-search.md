---
title: API Search
category: Web, ElasticSearch
---

## Vocabulaire

* <ins>vrai et faux positifs</ins>  
  Quand on effectue une recherche sur un ensemble de documents,

  * certains des documents retournés correspondent à ce qu'on désire: ce sont des *vrais positifs*
  * certains des documents retournés ne sont pas ce qu'on cherche: ce sont des *faux positifs*
  * certains documents ont été incorrectement exclus par le moteur de recherche: ce sont des *faux négatifs*
  * et certains documents ont été correctement rejetés: ce sont des *vrais négatifs*.


* <ins>précision/rappel</ins> (*precision/recall* en anglais)  

  * La *précision*: parmis les document retourné combien sont réellement pertinent.

    ```
    precision = # vrais positifs/(# vrais positifs + # faux positifs)
    ```

  * Le *rappel*: parmis les documents réellement pertinents combien ont été retournés par le moteur de recherche.

    ```
    rappel = # vrais positifs/(# vrais positifs + # faux négatifs)
    ```

  * La précision et le rappel sont inversement proportionnels:
    * si on privilégie la précision: ElasticSearch s'assure que tous les documents retournés correspondent parfaitement à la requête, même si ça signifie renvoyer moins de documents voire aucun

    * si on privilégie le rappel: ElasticSearch donne beaucoup de résultats de recherche, même si les documents  ne sont que vaguement liés à la requête

    * en augmentant la précision, on diminue le rappel, et vice-versa. Suivant le facteur privilégié, les résultats de recherche (dits *hits*) seront différents.

* <ins>score</ins>  
  Pour chaque hit, le score de pertinence est calculé.  
  Pour ce faire, ElasticSearch utilise

  * la fréquence du terme (TF)  
    C'est le nombre de fois qu'un terme apparaît dans un document donné. Plus la fréquence est élevé, plus le document est pertinent — il a un score plus élevé.

  * la fréquence inverse des documents (IDF)  
    C'est le nombre de documents dans lesquels un terme est présent. Plus le terme apparaît dans un nombre important de documents, moins il est important: ainsi "le" ou "la" pèserons moins lourd dans le calcul de pertinence puisqu'ils sont présents dans pratiquement tous les documents.

  * Pour calculer le score des documents, ElasticSearch calcule pour chaque terme de la recherche la fréquence du terme (TF) divisé par la fréquence inverse du terme (IDF). La somme (TF/IDF) est le score du document. Plus le score est élevé, plus le document est pertinent.

* <ins>ordre</ins> (*ranking* en anglais)  
  Le score de pertinence d'un document (∑ TF/IDF) détermine l'ordre des résultats de recherche: plus le score est élevé, plus le document sera vers le haut.

---

## _search

* La méthode _search permet d'effectuer une recherche.  
  Si aucun critère de recherche n'est spécifié, alors ElasticSearch retourne 10 documents au hasard.

  ```
  GET kibana_sample_data_ecommerce/_search
  ```

  ``` json
  {
    "took" : 2,
    "timed_out" : false,
    "_shards" : {
      "total" : 1,
      "successful" : 1,
      "skipped" : 0,
      "failed" : 0
    },
    "hits" : {
      "total" : {
        "value" : 4675,
        "relation" : "eq"
      },
      "max_score" : 1.0,
      "hits" : [
        {
          "_index" : "kibana_sample_data_ecommerce",
          "_type" : "_doc",
          "_id" : "MJNUk3kBp4_TO7Oqa3mP",
          "_score" : 1.0,
          "_source" : {
            "currency" : "EUR",
            "customer_first_name" : "Eddie",
            "customer_full_name" : "Eddie Underwood",
            "customer_gender" : "MALE",
            "customer_id" : 38,
            "day_of_week" : "Monday",
            "day_of_week_i" : 0,
            "order_date" : "2021-05-31T09:28:48+00:00",
            "order_id" : 584677,
            "products" : [
              {
                "base_price" : 11.99,
                "discount_percentage" : 0,
                "quantity" : 1,
                "manufacturer" : "Elitelligence",
                "tax_amount" : 0,
                "product_id" : 6283,
                "category" : "Men's Clothing",
                "sku" : "ZO0549605496",
                "taxless_price" : 11.99,
                "unit_discount_amount" : 0,
                "min_price" : 6.35,
                "_id" : "sold_product_584677_6283",
                "discount_amount" : 0,
                "created_on" : "2016-12-26T09:28:48+00:00",
                "product_name" : "Basic T-shirt - dark blue/white",
                "price" : 11.99,
                "taxful_price" : 11.99,
                "base_unit_price" : 11.99
              }
            ],
            "type" : "order",
            "geoip" : {
              "country_iso_code" : "EG",
              "location" : {
                "lon" : 31.3,
                "lat" : 30.1
              },
              "region_name" : "Cairo Governorate",
              "continent_name" : "Africa",
              "city_name" : "Cairo"
            }
          }
        },
        ...
      ]
    }
  }
  ```

### track_total_hits

* Par défaut, ElasticSearch limite la recherche à 10 000 documents — pour améliorer la vitesse de réponse sur les grands ensembles de données: la valeur de la propriété hits.total dans le résultat indique s'il s'agit d'un nombre exact (relation: "eq") ou si ElasticSearch a limité la recherche ("gte").

  ```
  "hits" : {
    "total" : {
      "value" : 10000,
      "relation" : "gte"
    },
  ```

* Pour récupérer le nombre exact de résultats, spécifier la propriété `track_total_hits` dans le body de la requête.

  ```
  GET myindexname/_search
  {
    "track_total_hits": true
  }
  ```
  ```
  "hits" : {
    "total" : {
      "value" : 200853,
      "relation" : "eq"
    },
  ```

### _source

* La propriété `_source` permet de contrôler les champs retournés par la recherche.

  ```
  GET kibana_sample_data_ecommerce/_search
  {
    "_source": {
      "includes": [
        "customer_id",
        "customer_full_name",
        "customer_gender",
        "order_id",
        "order_date",
        "taxful_total_price",
        "total_unique_products"
      ]
    }
  }
  ```

### size

* La propriété `size` permet de limiter le nombre de documents retournés dans hits.hits

  ```
  GET myindexname/_search
  {
    "size": 5
  }
  ```

### from

* La propriété `from` permet de contrôler l'offset à partir duquel on récupère les résultats de recherche — c'est notamment utile pour paginer le résultat.

  ```
  GET kibana_sample_data_ecommerce/_search
  {
    "from": 10,
    "size": 10,
    "_source": {
      "includes": [
        "customer_full_name",
        "order_date"
      ]
    }
  }
  ```

---

## _search query

La propriété `query` permet de spécifier des critères de recherche.

### term

* `term` permet de récupérer tous les documents où la valeur d'un champ est exactement égale à celle spécifiée.

  ```
  GET kibana_sample_data_ecommerce/_search
  {
    "query": {
      "term": {
        "geoip.country_iso_code": "FR"
      }
    }
  }
  ```

### terms

* `terms` permet de récupérer tous les documents où la valeur d'un champ est inclue dans une liste de valeurs données.

  ```
  GET kibana_sample_data_ecommerce/_search
  {
    "query": {
      "terms": {
        "geoip.country_iso_code": ["FR", "GB"]
      }
    }
  }
  ```

### range

* `range` permet de récupérer tous les documents où la valeur d'un champ est comprise entre deux bornes.  
  Par exemple, pour filtrer les documents crées entre le 2015-06-20 et 2015-09-22:

  ```
  GET myindexname/_search
  {
    "query": {
      "created_at": {
        "range":  {
          "gte": "2015-06-20",
          "lte": "2015-09-22"
        }
      }
    }
  }
  ```

### exists

* `exists` permet de récupérer tous les documents qui contiennent un champ donné:

  ```
  GET myindexname/_search
  {
    "query": {
      "exists": {
        "field": "geoip"
      }
    }
  }
  ```

### match

* **or**  
  `match` permet de récuperer tous les documents qui contiennent un texte donné.

  ```
  GET news_headlines/_search
  {
    "query": {
      "match": {
        "headline": {
          "query": "Khloe Kardashian Kendall Jenner"
        }
      }
    }
  }
  ```

  Par défaut, une recherche match utilise une logique "OR": ElasticSearch considère qu'un document correspond à partir du moment qu'il contient au moins un des termes recherchés. On obtient ainsi un grand nombre de résultats (augmente le rappel) mais certains documents sont peu liés à la requête (diminue la précision).

* **and**  
  Pour augmenter la précision, on peut utiliser une logique "AND" — ce qui aura pour effet de réduire le nombre de résultats et diminuer le rappel.

  ```
  GET news_headlines/_search
  {
    "query": {
      "match": {
        "headline": {
          "query": "Khloe Kardashian Kendall Jenner",
          "operator": "and"
        }
      }
    }
  }
  ```

* **minimum_should_match**  
  Un bon compromis entre les deux est d'utiliser minimum_should_match: on spécifie le nombre minimum de termes qu'un document doit contenir pour être inclut dans les résultats de la recherche.


  ```
  GET news_headlines/_search
  {
    "query": {
      "match": {
        "headline": {
          "query": "Khloe Kardashian Kendall Jenner",
          "minimum_should_match": 3
        }
      }
    }
  }
  ```

### match_phrase

* Si l'ordre et la proximité des termes recherchés sont importants (par exemple si on cherche le titre d'une chanson à partir des paroles), alors on utilise `match_phrase`.

  ```
  GET index_name/_search
  {
    "query": {
      "match_phrase": {
        "field_name": "Enter your search terms"
      }
    }
  }
  ```

### multi_match

* Pour pouvoir offrir plus de variété et une meilleure expérience utilisateur, on peut effectuer la recherche sur plusieurs champs avec `multi_match` — par exemple effectuer la recherche sur le titre du produit, le nom de la marque et la gamme de prix ("nom produit nom marque pas cher").

  ```
  GET myindexname/_search
  {
    "query": {
      "multi_match": {
        "query": "Enter search terms here",
        "fields": [
          "field_name1",
          "field_name2",
          "field_name3"
        ]
      }
    }
  }
  ```

* On peut choisir de privilégier un champ par rapport à un autre en ajoutant du boosting: on ajoute ^k après le nom du champ (où k est un nombre supérieur à 1). Le boosting ne modifie pas le nombre de documents retournés mais leur classement.

  ```
  GET myindexname/_search
  {
    "query": {
      "multi_match": {
        "query": "Enter search terms here",
        "fields": [
          "field_name1^2",
          "field_name2",
          "field_name3"
        ]
      }
    }
  }
  ```

* **phrase**  
  Si l'ordre des termes est important, on ajoute l'option `"type": "phrase"`.

  ```
  GET myindexname/_search
  {
    "query": {
      "multi_match": {
        "query": "Enter search terms here",
        "fields": [
          "field_name1^2",
          "field_name2",
          "field_name3"
        ],
        "type": "phrase"
      }
    }
  }
  ```

### bool

* `bool` permet d'exécuter une ou plusieurs requêtes et les combiner en utilisant une logique booléenne. Une requête bool peut contenir 4 clauses:

  * **must**: ensemble de requêtes auxquelles un document doit définitivement correspondre pour être inclut dans les résultats de recherche.

  * **must_not**: ensemble de requêtes auxquelles un document doit *ne pas* correspondre pour être inclut dans les résultats de recherche. Autrement dit, cela permet d'exclure des documents.

  * **should**: ensemble de requêtes permettant d'élever le score des documents retournés. Un document ne doit pas nécessairement correspondre aux requêtes spécifiées par *should*, mais les documents qui correspondent ont un score plus élevé — ils sont considérés comme plus pertinents.

  * **filter**: très similaire à *must* à quelques différences près: 1. les requêtes de *filter* ne contribuent au score de pertinence des documents 2. la recherche se fait sur des valeurs exactes (nombre, intervalle, mot-clé): si la recherche contient une faute d'ortographe, aucun document ne sera retourné. Le résultat des filtres est mis en cache.

  Par exemple: récupérer l'ensemble des articles dans la catégorie POLITICS à propos de Michelle Obama et publiés après 2016. Les documents contenant également Barack Obama seront considérés comme plus pertinents.


  ```
  GET news_headlines/_search
  {
    "query": {
      "bool": {

        "must": [
          {
            "match_phrase": {
              "headline": "Michelle Obama"
            }
          },
          {
            "match": {
              "category": "POLITICS"
            }
          }
        ],

        "should": [
          {
            "match_phrase": {
              "headline": "Barack Obama"
            }
          }
        ],

        "filter": {
          "range": {
            "date": {
              "gte": "2014-03-25",
              "lte": "2016-03-25"
            }
          }
        }

      }
    }
  }
  ```

### nested

* `nested` permet d'executer une requête sur un champ de type `nested`: les sous-requêtes doivent matcher un même objet imbriqué.

  ```
  GET usergroups/_search
  {
    "query": {
      "nested": {
        "path": "user",

        "query": {
          "bool": {
            "must": [
              { "match": { "user.first": "Alice" }},
              { "match": { "user.last":  "White" }}
            ]
          }
        }
      }
    }
  }
  ```

  Dans cet exemple, le document usergroups doit contenir un user ayant la propriété `first` égale à Alice et `last` égale à White. Et non un user avec Alice et un autre avec White.

### has_child, has_parent

* `has_child` et `has_parent` permet d'effectuer une recherche en fonction des relations (champs de type `join`) d'un document.

  Par exemple, pour récuperer tous les produits qui ont un enfant associé avec la relation `type`:

  ```
  GET products/_search
  {
    "query": {
      "has_child": {
        "type": "product_variant",
        "query": {
          "match_all": {}
        }
      }
    }
  }
  ```

  Pour récupérer tous les produits qui ont un parent associé qui a pour id 1:

  ```
  GET products/_search
  {
    "query": {
      "has_parent": {
        "parent_type": "product",
        "query": {
          "term": {
            "id": "1"
          }
        }
      }
    }
  }
  ```

---

## _search aggs

La propriété `aggregations` (ou la version raccourcie `aggs`) permet d'effectuer des aggrégats sur les résultats de la recherche.

### cardinality

* `cardinality` retourne le nombre total de valeurs différentes.

  ```
  GET kibana_sample_data_ecommerce/_search
  {
    "size": 0,
    "aggs": {
      "unique_customers": {
        "cardinality": {
          "field": "customer_id"
        }
      }
    }
  }
  ```

  Note: Ici on limite le nombre de documents retournés dans hits.hits à 0 (parce qu'on ne s'intéresse qu'au résultat de l'aggrégation).

  ```
  ...
  "aggregations" : {
    "unique_customers" : {
      "value" : 46
    }
  ```


### stats

* Les aggrégations métriques effectuent des aggrégations sur les valeurs numériques:  
  on retrouve entre autres `min`, `max`, `avg`, `sum`.

  ```
  GET kibana_sample_data_ecommerce/_search
  {
    "size": 0,
    "aggs": {
      "fr_avg_unit_price": {
        "avg": {
          "field": "products.base_unit_price"
        }
      }
    }
  }
  ```

  ```
  ...
  "aggregations" : {
    "avg_unit_price" : {
      "value" : 34.77499349410132
    }
  }
  ```

* `stats` retourne les aggrégations métriques les plus couramment utilisées:

  ```
  ...
  "aggregations" : {
    "avg_unit_price" : {
      "count" : 10087,
      "min" : 5.98828125,
      "max" : 540.0,
      "avg" : 34.77499349410132,
      "sum" : 350775.359375
    }
  }
  ```

#### script

* Plutôt que de spécifier un champ, on peut spécifier un script:

  ```
  GET kibana_sample_data_ecommerce/_search
  {
    "size": 0,
    "aggs": {
      "avg_tax": {
        "avg": {
          "script": {
            "source": "doc['taxful_total_price'].value - doc['taxless_total_price'].value"
          }
        }
      }
    }
  }
  ```

  ```
  ...
  "aggregations" : {
    "avg_tax" : {
      "value" : 0.0
    }
  ```

### Buckets

#### date_histogram

* `date_histogram` permet d'aggréger plusieurs sous-ensembles de documents (appelés *buckets*) en fonction d'un intervalle de temps. Ce peut être

  * un intervalle fixe: par exemple, toutes les deux heures

    ```
    GET myindexname/_search
    {
      "size": 0,
      "aggs": {
        "transactions_by2h": {
          "date_histogram": {
            "field": "InvoiceDate",
            "fixed_interval": "2h"
          }
        }
      }
    }
    ```

  * ou un intervalle calendaire: par exemple, tous les mois

    ```
    GET myindexname/_search
    {
      "size": 0,
      "aggs": {
        "transactions_bymonth": {
          "date_histogram": {
            "field": "InvoiceDate",
            "calendar_interval": "1M"
          }
        }
      }
    }
    ```

  [calendar_intervals](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-datehistogram-aggregation.html#calendar_intervals)

* Chaque bucket retourné par l'aggrégation date_histogram contient 3 champs:
  - `key_as_string`: la date
  - `key`: la date sous forme de timestamp
  - `doc_count`: le nombre de documents dans le sous-ensemble

  Par défaut, les buckets sont ordonnés par ordre ascendant de date.  
  Pour modifier l'ordre, on peut utiliser l'option `order`. 

  ```
  GET kibana_sample_data_ecommerce/_search
  {
    "size": 0,
    "aggs": {
      "order_bymonth": {
        "date_histogram": {
          "field": "order_date",
          "calendar_interval": "1M",
          "order": {
            "_key": "desc"
          }
        }
      }
    }
  }
  ```

  ```
  ...
  "aggregations" : {
    "order_bymonth" : {
      "buckets" : [
        {
          "key_as_string" : "2021-06-01T00:00:00.000Z",
          "key" : 1622505600000,
          "doc_count" : 771
        },
        {
          "key_as_string" : "2021-05-01T00:00:00.000Z",
          "key" : 1619827200000,
          "doc_count" : 3904
        }
      ]
    }
  }
  ```

#### histogram

* `histogram` permet d'aggréger plusieurs buckets en fonction d'un intervalle numérique.

  ```
  GET kibana_sample_data_ecommerce/_search
  {
    "size": 0,
    "aggs": {
      "order_byrange": {
        "histogram": {
          "field": "taxful_total_price",
          "interval": 25
        }
      }
    }
  }
  ```

  ```
  ...
  "aggregations" : {
    "order_byrange" : {
      "buckets" : [
        {
          "key" : 0.0,
          "doc_count" : 142
        },
        {
          "key" : 25.0,
          "doc_count" : 1491
        },
        {
          "key" : 50.0,
          "doc_count" : 1111
        },
        {
          "key" : 75.0,
          "doc_count" : 925
        },
        {
          "key" : 100.0,
          "doc_count" : 461
        },
        {
          "key" : 125.0,
          "doc_count" : 263
        },
        {
          "key" : 150.0,
          "doc_count" : 134
        },
  ```

#### range

* `range` permet d'aggréger plusieurs buckets en fonction d'intervalles spécifiés.  
  Note: pour chaque intervalle, la borne inférieure est inclue et la borne supérieure exclue.

  ```
  GET kibana_sample_data_ecommerce/_search
  {
    "size": 0,
    "aggs": {
      "order_byrange": {
        "range": {
          "field": "taxful_total_price",
          "ranges": [
            { "to": 25 },
            { "from": 25, "to": 100 },
            { "from": 100, "to": 200 },
            { "from": 200 }
          ]
        }
      }
    }
  }
  ```

  ```
  ...
  "aggregations" : {
    "order_byrange" : {
      "buckets" : [
        {
          "key" : "*-25.0",
          "to" : 25.0,
          "doc_count" : 142
        },
        {
          "key" : "25.0-100.0",
          "from" : 25.0,
          "to" : 100.0,
          "doc_count" : 3527
        },
        {
          "key" : "100.0-200.0",
          "from" : 100.0,
          "to" : 200.0,
          "doc_count" : 929
        },
        {
          "key" : "200.0-*",
          "from" : 200.0,
          "doc_count" : 77
        }
      ]
    }
  }
  ```

* L'ordre des aggrégats retournés respecte l'ordre des intervalle en entrée, on ne peut pas ré-ordonner le résultat.

### terms

* `terms` permet de récupérer la liste des valeurs d'un champ donné.  
  Par exemple, pour récupérer la liste des valeurs `day_of_week` avec le nombre de documents associés dans le résultat de la recherche:

  ```
  GET kibana_sample_data_ecommerce/_search
  {
    "size": 0,
    "aggs": {
      "categories": {
        "terms": {
          "field": "day_of_week",
          "size": 7
        }
      }
    }
  }
  ```

  ```
    ...
    "aggregations" : {
      "categories" : {
        "doc_count_error_upper_bound" : 0,
        "sum_other_doc_count" : 0,
        "buckets" : [
          {
            "key" : "Thursday",
            "doc_count" : 775
          },
          {
            "key" : "Friday",
            "doc_count" : 770
          },
          {
            "key" : "Saturday",
            "doc_count" : 736
          },
          {
            "key" : "Sunday",
            "doc_count" : 614
          },
          {
            "key" : "Tuesday",
            "doc_count" : 609
          },
          {
            "key" : "Wednesday",
            "doc_count" : 592
          },
          {
            "key" : "Monday",
            "doc_count" : 579
          }
        ]
      }
    }
  }
  ```

* Par défaut, les résultats sont ordonnés par ordre descendant. Pour les récupérer dans l'ordre ascendant, spécifier l'option `order`

  ```
  "terms": {
    "field": "customer_id",
    "size": 5,
    "order": {
      "_count": "asc"
    }
  ```

#### Aggrégats par buckets

* Il est possible d'effectuer des aggrégats au sein des sous-ensembles crées:

  ```
  GET kibana_sample_data_ecommerce/_search
  {
    "size": 0,
    "aggs": {
      "order_perweek": {
        "date_histogram": {
          "field": "order_date",
          "calendar_interval": "1w"
        },
        "aggs": {
          "order_avg": {
            "avg": {
              "field": "taxful_total_price"
            }
          }
        }
      }
    }
  }
  ```

  ```
  ...
  "aggregations" : {
    "order_perday" : {
      "buckets" : [
        {
          "key_as_string" : "2021-05-03T00:00:00.000Z",
          "key" : 1620000000000,
          "doc_count" : 582,
          "order_avg" : {
            "value" : 71.22944856099656
          }
        },
        {
          "key_as_string" : "2021-05-10T00:00:00.000Z",
          "key" : 1620604800000,
          "doc_count" : 1048,
          "order_avg" : {
            "value" : 75.80973804270039
          }
        },
        {
          "key_as_string" : "2021-05-17T00:00:00.000Z",
          "key" : 1621209600000,
          "doc_count" : 1048,
          "order_avg" : {
            "value" : 74.62636420562977
          }
        },
        {
          "key_as_string" : "2021-05-24T00:00:00.000Z",
          "key" : 1621814400000,
          "doc_count" : 1073,
          "order_avg" : {
            "value" : 75.74771376980429
          }
        },
        {
          "key_as_string" : "2021-05-31T00:00:00.000Z",
          "key" : 1622419200000,
          "doc_count" : 924,
          "order_avg" : {
            "value" : 76.29248681006493
          }
        }
      ]
    }
  }
  ```

* Et on peut ordonner les résultats sur la valeur de ces aggrégats.

  ```
  GET kibana_sample_data_ecommerce/_search
  {
    "size": 0,
    "aggs": {
      "order_perweek": {
        "date_histogram": {
          "field": "order_date",
          "calendar_interval": "1w",
          "order": {
            "order_avg": "desc"
          }
        },
        "aggs": {
          "order_avg": {
            "avg": {
              "field": "taxful_total_price"
            }
          }
        }
      }
    }
  }
  ```

  ```
  ...
  "aggregations" : {
    "order_perweek" : {
      "buckets" : [
        {
          "key_as_string" : "2021-05-31T00:00:00.000Z",
          "key" : 1622419200000,
          "doc_count" : 924,
          "order_avg" : {
            "value" : 76.29248681006493
          }
        },
        {
          "key_as_string" : "2021-05-10T00:00:00.000Z",
          "key" : 1620604800000,
          "doc_count" : 1048,
          "order_avg" : {
            "value" : 75.80973804270039
          }
        },
  ```