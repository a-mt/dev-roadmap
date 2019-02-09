---
title: Agrégats
category: Web, BDD, MongoDB
---

Le framework d'agrégation est un ensemble d'outils d'analyse au sein de MongoDB qui permettent d'effectuer des analyses et rapports des documents d'une ou plusieurs collections de MongoDB.

Les agrégations se font sur un principe de pipeline: on prend les données d'une collection MongoDB, puis on effectue des opérations dessus à travers plusieurs étapes. Chaque étape prend en entrée ce que l'étape précédente retourne. Toutes les entrées et sorties sont un flux de documents.

La pipeline d'agrégation est un tableau contenant des étapes, chaque étape utilisant un [opérateur d'agrégation](https://docs.mongodb.com/manual/meta/aggregation-quick-reference/).

---

## $match

Pour récupérer tous les documents qui matchent une requête (même principe que find, même syntaxe), on utilise `$match`:

``` js
db.companies.aggregate([{ $match: { founded_year: 2004 } })
```

---

## $project

De même que pour une recherche, on peut effectuer une projection, c'est à dire sélectionner les champs à récupérer, avec `$project`.

``` js
db.companies.aggregate([
    { $match: { founded_year: 2004 }},
    { $project : {
        _id: 0,
        name: 1,
        founded_year: 1
    } }
])
```

On peut sélectionner un champs sous un autre nom (même principe que `AS` avec MySQL):

``` js
db.companies.aggregate([
    { $match: { "funding_rounds.investments.financial_org.permalink": "greylock" }},
    { $project: {
        _id: 0,
        name: 1,
        funders: "$funding_rounds.investments.financial_org.permalink"
    }}
])
```

``` js
db.companies.aggregate([
    { $match: { "funding_rounds.investments.financial_org.permalink": "greylock" }},
    { $project: {
        company: 0, 
        name: 1,
        founded: {
            year: "$founded_year",
            month: "$founded_month",
            day: "$founded_day"
        }
    } }
])
```


### $filter

Permet de sélectionner un sous-ensemble des éléments d'un tableau en fonction d'un certain nombre de critères de filtrage. Utiliser `$$` dans la condition pour désigner la variable définie dans l'expression.

``` js
db.companies.aggregate([
    { $match: {"funding_rounds.investments.financial_org.permalink": "greylock"} },
    { $project : {
        _id: 0,
        name: 1,
        rounds: {
            $filter: {
                input: "$funding_rounds",
                as: "round",
                cond: { $gte:[ "$$round.raised_amount", 1000000 ] }
            }
        }
    }}
])
```

### $arrayElemAt

Permet de récupérer un élément dans un sous-tableau en se basant sur son index.

``` js
db.companies.aggregate([
    { $project : {
        _id: 0,
        name: 1,
        first_round: { $arrayElemAt: [ "$funding_rounds", 0 ] },
        last_round: { $arrayElemAt: [ "$funding_rounds", -1 ] }
    } }
])
```

### $slice

Permet de récupérer un sous-ensemble de tableau, x éléments à partir d'un index donné.

``` js
db.companies.aggregate([
    { $project : {
        _id: 0,
        name: 1,
        early_rounds: { $slice: [ "$funding_rounds", 0, 3 ] }
    } }
])
```

### $size

Retourne le nombre d'élément d'un tableau.

``` js
db.companies.aggregate([
    { $project : {
        _id: 0,
        name: 1,
        total_rounds: { $size: "$funding_rounds" }
    } }
])
```

### $sum

Retourne la somme.

``` js
db.companies.aggregate([
    { $project : {
        _id: 0,
        name: 1,
        num_rounds: { $sum: 1 },
        total_raised: { $sum: "$funding_rounds.raised_amount" }
    } }
])
```

### $max

Retourne la valeur maximale.

``` js
db.companies.aggregate([
    { $project : {
        _id: 0,
        name: 1,
        largest_round: { $max: "$funding_rounds.raised_amount" }
    } }
])
```

### $min

Retourne la valeur minimale.

### $avg

Retourne la valeur moyenne.

---

## $limit

Permet de limiter le nombre de résultats récupérés.

``` js
db.companies.aggregate([
    { $match: { founded_year: 2004 } },
    { $limit: 5 },
    { $project : {
        _id: 0,
        name: 1,
        founded_year: 1
    } }
])
```

---

## $sort

Permet de trier les résultats

``` js
db.companies.aggregate([
    { $match: { founded_year: 2004 } },
    { $sort: { name: 1 } },
    { $limit: 5 },
    { $project : {
        _id: 0,
        name: 1,
        founded_year: 1 
    } }
])
```

On peut trier sur les champs d'un sous-objet

``` js
$sort: { "funding_rounds.founded_year": 1 }
```

---

## $unwind

Permet d'éclater un document en plusieurs documents, en se basant sur les valeurs d'un tableau.  
Par exemple pour remplacer

``` json
{ "name": "a", "key": ["elem1", "elem2", "elem3"] }
```

par

``` json
{ "name": "a", "key": "elem1" }
{ "name": "a", "key": "elem2" }
{ "name": "a", "key": "elem3" }
```

``` js
db.companies.aggregate([
    { $match: { "funding_rounds.investments.financial_org.permalink": "greylock" }},
    { $unwind: "$funding_rounds" },
    { $unwind: "$funding_rounds.investments" },
    { $match: { "$funding_rounds.investments.financial_org.permalink": "greylock" }},
    { $project : {
        _id: 0,
        name: 1,
        fundingOrganization: "$funding_rounds.investments.financial_org.permalink",
        amount: "$funding_rounds.raised_amount",
        year: "$funding_rounds.funded_year"
    }}
])
```

---

## $group

Permet d'agréger les valeurs de plusieurs documents pour effectuer une opération d'agrégation dessus, comme le calcul d'une moyenne par exemple.
Similaire au `GROUP` MySQL.

``` js
// Calcule la moyenne du nombre d'employés
// Groupé par année de création de l'entreprise
db.companies.aggregate([
    { $group: {
        _id: { founded_year: "$founded_year" },
        average_number_of_employees: { $avg: "$number_of_employees" }
    },
    { $sort: { average_number_of_employees: -1 } }
])
```

``` js
// Calcule le nombre de fois où un employé
// À été associé à une entreprise
db.companies.aggregate([
    { $match: { "relationships.person": { $ne: null } } },
    { $project: { relationships: 1, _id: 0 } },
    { $unwind: "$relationships" },
    { $group: {
        _id: "$relationships.person",
        count: { $sum: 1 }
    } },
    { $sort: { count: -1 } }
])
```

Le groupe est effectué sur le champ `_id`.
* On peut grouper les documents sur le champ `founded_year` en utilisant

  ```
  { _id: "founded_year" }
  ```

  Le nom du groupe sera alors `_id`.
* Pour nommer le groupe `founded_year`, utiliser

  ```
  { _id: { founded_year: "$founded_year" }}
  ```

* On peut grouper sur plusieurs champs

  ```
  { _id: { founded_year: "$founded_year", category_code: "$category_code" }}
  ```

* Ou même un sous-champ

  ```
  { _id: { ipo_year: "$ipo.pub_year" } }
  ```

### $push

`$push` est uniquement disponible à l'intérieur de `$group`.  
Il permet de créer un tableau pour chaque groupe, contenant les champs sélectionnés des documents du groupe.

``` js
db.sales.aggregate([
   { $group: {
       _id: {
          day: { $dayOfYear: "$date"},
          year: { $year: "$date" }
       },
       itemsSold: {
          $push: { item: "$item", quantity: "$quantity" }
       }
   }}
])
```

<ins>input</ins>:

``` js
{ "_id" : 1, "item" : "abc", "price" : 10, "quantity" : 2, "date" : ISODate("2014-01-01T08:00:00Z") }
{ "_id" : 2, "item" : "jkl", "price" : 20, "quantity" : 1, "date" : ISODate("2014-02-03T09:00:00Z") }
{ "_id" : 3, "item" : "xyz", "price" : 5, "quantity" : 5, "date" : ISODate("2014-02-03T09:05:00Z") }
{ "_id" : 4, "item" : "abc", "price" : 10, "quantity" : 10, "date" : ISODate("2014-02-15T08:00:00Z") }
{ "_id" : 5, "item" : "xyz", "price" : 5, "quantity" : 10, "date" : ISODate("2014-02-15T09:05:00Z") }
{ "_id" : 6, "item" : "xyz", "price" : 5, "quantity" : 5, "date" : ISODate("2014-02-15T12:05:10Z") }
{ "_id" : 7, "item" : "xyz", "price" : 5, "quantity" : 10, "date" : ISODate("2014-02-15T14:12:12Z") }
```

<ins>output</ins>:

``` js
{
   "_id" : { "day" : 46, "year" : 2014 },
   "itemsSold" : [
      { "item" : "abc", "quantity" : 10 },
      { "item" : "xyz", "quantity" : 10 },
      { "item" : "xyz", "quantity" : 5 },
      { "item" : "xyz", "quantity" : 10 }
   ]
}
{
   "_id" : { "day" : 34, "year" : 2014 },
   "itemsSold" : [
      { "item" : "jkl", "quantity" : 1 },
      { "item" : "xyz", "quantity" : 5 }
   ]
}
{
   "_id" : { "day" : 1, "year" : 2014 },
   "itemsSold" : [ { "item" : "abc", "quantity" : 2 } ]
}
```