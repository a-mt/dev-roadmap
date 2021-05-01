---
title: Fondamentaux
category: Web, GraphQL
---

## Qu'est-ce que c'est

* GraphQL est une spécification écrite par Facebook, décrivant une nouvelle norme d'API.  
  Autrement dit, il s'agit d'un document décrivant en détail comment un serveur doit accepter des requêtes et à quoi doit ressembler les réponses.  
  La spécification est disponible ici: [facebook.github.io/graphql](https://facebook.github.io/graphql/).

* Jusqu'à présent, la norme d'API la plus utilisée est REST.  
  Avec REST, on a différents endpoints (urls) qui permettent d'accéder à différentes données, généralement retournées au format json. Par exemple: 

  * `/users` pour accéder à la liste des utilisateurs
  * `/users/<id>` pour accéder aux détails d'un utilisateur
  * `/users/<id>/posts` pour accéder aux posts d'un utilisateur.

* Avec GraphQL, il n'y a qu'un seul endpoint. Le front-end envoit une requête POST contenant dans le body la liste des informations demandées. Le serveur répond en respectant le format demandé:

  ![](https://i.imgur.com/w9fKcyR.png)

* Avec REST, le format des données est fixe. Avec GraphQL, le format des données est flexible. Grâce à cette flexibilité, les modifications côté front peuvent être effectuées sans travail supplémentaire côté back, ce qui permet d'accélérer le développement de nouvelles fonctionnalités et d'expérimentations.

* GraphQL est utilisé en production par GitHub, Twitter, Yelp et Spotify entre autres.

* Il existe des librairies GraphQL pour la plupart des technologies pour s'occuper du gros du travail

  - des librairies back-end pour créer rapidement un serveur GraphQL

  - des librairies front-end pour s'occuper des tâches bas niveau (requêtage, parsing, mise en cache, validation des données, etc). Il existe actuellement deux clients GraphQL principaux: [Apollo Client](https://github.com/apollographql/apollo-client) et [Relay](https://facebook.github.io/relay/) .

---

## Schema

* Le schéma, spécifié par le serveur, définit les capacités de l'API et le format des données. Il est souvent considéré comme un contrat entre le serveur et le client.

* Le schéma contient une liste de types.  
  * Certains de ces types définissent le format d'objets (entités), comme `Person` ou `Post`

  * D'autres sont des types spéciaux qui spécifient les requêtes acceptées par le serveur et leur format. Ce sont les types `Query`, `Mutation` et `Subscription`.

  ```
  type Person {
    id: ID!
    name: String!
    age: Int
  }

  type Query {
    allPersons(last: Int): [Person!]!
  }
  type Mutation {
    createPerson(name: String!, age: Int): Person!
  }
  type Subscription {
    newPerson: Person!
  }
  ```

## Schema Definition Language (SDL)

### Type pré-défini

* GraphQL a 5 types pré-définis: String, Int, Float, Boolean, et ID.

### Type objet

* Les types objet sont des structures composées d'un ensemble de champs typés.   
  Un point d'exclamation (!) après le type indique que le champ est obligatoire.

  ```
  type Person {
    id: ID!
    name: String!
    age: Int
  }
  ```

  Il est possible de définir des relations one-to-one ou one-to-many entre des types objet.

    ```
    type Post {
      id: ID!
      title: String!
      author: Person!
    }

    type Person {
      id: ID!
      name: String!
      age: Int
      posts: [Post!]!
    }
    ```

  `[Post!]!` indique qu'on retourne forcemment une liste (et non null) même si la liste ne contient aucun élément, et que tous les éléments de la liste sont non nuls.

### Type enum

* Les types enums permettent de limiter un champ à un ensemble de valeurs.

  ```
  enum PetCategory {
    CAT
    DOG
    RABBIT
  }
  type Pet {
    id: ID!
    name: String!
    weight: Float
    category: PetCategory!
  }
  ```

### Interface

* Une interface spécifie un ensemble de champs que tout type implémentant cet interface doit posséder.

  ```
  interface PK {
    id: ID!
  }

  type User implements PK {
    id: ID!
    name: String!
    age: Int!
  }
  ```

### Union

* Une union permet de définir un type pouvant correspondre à plusieurs types. Par exemple, on peut définir un type Person, qui peut être Adult ou Child. À une requête demandant la liste des personnes, le serveur répondra par une liste contenant des objets Adult et/ou Child.

  ```
  type Adult {
    name: String!
    work: String!
  }
  type Child {
    name: String!
    school: String!
  }
  union Person = Adult | Child
  ```

### Fragment

* Un fragment ne définit pas un nouveau type mais permet de nommer un ensemble de champs. En front, une requête pourra ainsi utiliser le nom du fragment (préfixé de ...) pour récupérer l'ensemble des champs listés par le fragment, plutôt que d'avoir à listers tous les champs.

  ```
  type User {
    name: String!
    age: Int!
    email: String!
    street: String!
    zipcode: String!
    city: String!
  }
  fragment addressDetails on User {
    name
    street
    zipcode
    city
  }
  ```

### Scalar

* Scalar permet de créer un type scalaire personnalisé. Il appartient au serveur GraphQL de définir comment ce type doit être serialisé, déserialisé et validé.

  ```
  """
  The `Email` scalar type represents textual data validating /^[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+$/ (ie user@domain.com)
  """
  scalar Email

  type User {
    id: ID!
    email: Email
  }
  ```

### Type Query

* Un requête query demande au serveur de retourner des données. Le type `query` liste toutes les requêtes query acceptées par le serveur.

  Chaque méthode peut prendre zéro ou plusieurs arguments. Chaque argument doit avoir un nom et un type. Si l'argument est obligatoire, alors le type est suffixé par un point d'exclamation. Le type retourné par la méthode doit également être spécifié.

  ```
  type Query {
    totalPets(status: PetStatus): Int!
    allPets(
      category: PetCategory
      status: PetStatus
    ): [Pet!]!
    petById(id: ID!): Pet!
    totalCustomers: Int!
    allCustomers: [Customer!]!
    me: Customer
  }
  ```

* Il est possible de spécifier des valeurs par défaut pour les arguments.

  ```
  type Query {
    allUsers(olderThan: Int = -1): [User!]!
  }
  ```

### Type Mutation

* Une requête mutation demande au serveur de modifier les données — insérer, modifier ou supprimer. Une mutation suit la même structure syntaxique que query.

  ```
  type Mutation {
    createPerson(name: String!, age: Int!): Person!
    updatePerson(id: ID!, name: String!, age: Int!): Person!
    deletePerson(id: ID!): Person!
    createPost(title: String!): Post!
    updatePost(id: ID!, title: String!): Post!
    deletePost(id: ID!): Post!
  }
  ```

### Type Subscription

* Une requête subscription permet au client de s'abonner à un événement. Il établit et maintient une connexion permanente avec le serveur et quand l'événement souscrit est déclenché, alors le serveur envoie les données correspondantes au client.

  Contrairement aux requêtes query et mutation, qui suivent un cycle typique requête-réponse, les souscriptions représentent un flux de données envoyé au client.

  ```
  type Subscription {
    newPerson: Person!
    updatedPerson: Person!
    deletedPerson: Person!
    newPost: Post!
    updatedPost: Post!
    deletedPost: Post!
  }
  ```

### Input

* Un type input est un type permettant de passer un objet en argument d'une query ou mutation.  
  Par exemple, on peut remplacer la définition suivante, où on utilise des arguments en ligne:

  ```
  type Mutation {
    createPost(title: String, body: String, mediaUrls: [String]): Post
  }
  ```

  Par la définition suivante, où on utilise un argument objet:

  ```
  input PostAndMediaInput {
    title String
    body: String
    mediaUrls: [String]
  }

  type Mutation {
    createPost(post: PostAndMediaInput): Post
  }
  ```

### Descriptions

* Tout peut être accompagné d'une description située sur la ligne précédente.

  ```
  """
  A simple GraphQL schema which is well described.
  """
  type Query {
    """
    Translates a string from a given language into a different language.
    """
    translate(
      "The original language that `text` is provided in."
      fromLanguage: Language

      "The translated language to be returned."
      toLanguage: Language

      "The text to be translated."
      text: String
    ): String
  }

  """
  The set of languages supported by `translate`.
  """
  enum Language {
    "English"
    EN

    "French"
    FR

    "Chinese"
    CH
  }
  ```

### Directive

* Les directives permettent de donner des indications supplémentaires sur le comportement de l'API.

1. Définir une directive  
   Une directive peut prendre zéro ou plusieurs arguments — avec la même syntaxe que le type query.

    ```
    directive @notEmpty on ARGUMENT_DEFINITION | INPUT_FIELD_DEFINITION

    directive @range(min : Int = 0, max : Int = 2147483647) on ARGUMENT_DEFINITION | INPUT_FIELD_DEFINITION

    directive @date(format: String!) on FIELD_DEFINITION
    ```

2. Ajouter la directive aux endroits appropriés.

    ```
    type Mutation {
      createPerson(name: String! @notEmpty, age: Int @range(max: 200)): Person!
    }
    ```

    ```
    scalar Date

    type Query {
      today: Date @date(format: "mmmm d, yyyy")
    }
    ```

* La définition de la directive qui indique ce sur quoi peut porter la directive (avec `on`).

  - Une directive peut porter sur le système de typage, autrement dit on peut l'utiliser dans le schéma de l'API: elle donne des indications au client.  
    Dans notre exemple, @notEmpty et @range peuvent porter sur les arguments et inputs, et @date sur les champs, au sein du système de typage dans les deux cas.

  - Ou elle peut porter sur l'execution, autrement dit on peut l'utiliser dans les requêtes: elle donne des indications au serveur.  
    Voir @skip et @include dans la section Query.

  [Format d'une directive](http://spec.graphql.org/June2018/#sec-Type-System.Directives)

<!--
https://www.apollographql.com/blog/reusable-graphql-schema-directives-131fb3a177d1/

https://www.graphql-tools.com/docs/schema-directives/
-->

* Nativement, GraphQL définit 3 directives: @deprecated qui est une directive du système de typage, @skip et @include qui sont des directives executives.

### @deprecated

* Définition:

  ```
  directive @deprecated(
    reason: String = "No longer supported"
  ) on FIELD_DEFINITION | ENUM_VALUE
  ```

  Cette directive indique qu'un champ est déprécié.

    ```
    type Invoice {
      id: ID
      number: Int!
      client: String!
      clientName: String! @deprecated(reason: "Field `client` replaces `clientName`.")
    }
    ```
---

## Query

### Requête query

* Les requêtes, envoyées par le client, demandent au serveur d'effectuer une action.  
  Une requête `query` demande au serveur de retourner des données.

  ```
  query {
    allPets {
      name
      weight
    }
  }
  ```

  Le mot-clé `query` peut être omis: si on ne spécifie pas quel type de requête est demandé (query, mutation ou subscription), alors le serveur effectue une requête query. On peut donc simplement écrire:

  ```
  {
    allPets {
      name
      weight
    }
  }
  ```

  Pour tester la requête: [pet-library.moonhighway.com](https://pet-library.moonhighway.com)

* En cas de succès, le serveur renvoit un objet JSON contenant les données demandés dans la propriété `data`. Le format de la réponse respecte le format de la requête.

  ```
  {
    "data": {
      "allPets": [
        {
          "name": "Biscuit",
          "weight": 10.2
        },
        {
          "name": "Jungle",
          "weight": 9.7
        }
      ]
    }
  }
  ```

* Si la requête échoue (partiellement ou complètement), la propriété `errors` est ajoutée à la réponse.

  ```
  {
    "data": { ... },
    "errors": [ ... ]
  }
  ```

### Nesting

* Un des avantages de GraphQL est qu'on peut demander des champs imbriqués (champs des relations).

  ```
  query {
    allPets {
      name
      weight
      inCareOf {
        username
        name
        currentPets {
          name
          weight
        }
      }
    }
  }
  ```

  ```
  {
    "data": {
      "allPets": [
        {
          "name": "Benji",
          "weight": 10.9,
          "inCareOf": {
            "username": "ypd",
            "name": "Yamla Pagla Diwana",
            "currentPets": [
              {
                "name": "Benji",
                "weight": 10.9
              }
            ]
          }
        },
        {
          "name": "Beebee",
          "weight": 13.3,
          "inCareOf": {
            "username": "janasathya",
            "name": "janagaraj murugesan",
            "currentPets": [
              {
                "name": "Beebee",
                "weight": 13.3
              },
              {
                "name": "Pillow",
                "weight": 8.3
              },
              {
                "name": "Pip",
                "weight": 3.7
              }
            ]
          }
        },
        ...
      ]
    }
  }
  ```

### Paramètres

* On peut passer des paramètres après le nom de la méthode entre parenthèses:

  ```
  query {
    petById(id: "C-1") {
      id
      name
      weight
    }
  }
  ```
  ```
  {
    "data": {
      "petById": {
        "id": "C-1",
        "name": "Biscuit",
        "weight": 10.2
      }
    }
  }
  ```

### Multiples requêtes

* Il est possible de requêter plusieurs méthodes en même temps.

  ```
  query {
    allPets {
      id
      name
      weight
    }
    totalPets
  }
  ```

  ```
  {
    "data": {
      "allPets": [
        {
          "id": "C-1",
          "name": "Biscuit",
          "weight": 10.2
        },
        {
          "id": "C-2",
          "name": "Jungle",
          "weight": 9.7
        },
        ...
      ],
      "totalPets": 25
    }
  }
  ```

### Résultat nommé

* Quand on demande plusieurs méthodes en même temps, la réponse est formée avec le nom de méthode pour clé. Si on appelle la même méthode plusieurs fois, alors il va y avoir un conflit — GraphQL retourne une erreur.

  ```
  query {
    petById(id: "C-1") {
      id
      name
      weight
    }
    petById(id: "C-2") {
      id
      name
      weight
    }
  }
  ```

  ```
  "errors": [
      {
        "message": "Fields \"petById\" conflict because they have differing arguments. Use different aliases on the fields to fetch both if this was intentional.",
  ```

* Pour régler ce problème, il faut définir des alias, c'est à dire nommer explicitement le résultat:

  ```
  query {
    first: petById(id: "C-1") {
      id
      name
      weight
    }
    second: petById(id: "C-2") {
      id
      name
      weight
    }
  }
  ```

  ```
  {
    "data": {
      "first": {
        "id": "C-1",
        "name": "Biscuit",
        "weight": 10.2
      },
      "second": {
        "id": "C-2",
        "name": "Jungle",
        "weight": 9.7
      }
    }
  }
  ```

### Union

* Si on veut récupérer les champs d'une union et qu'un type dispose de champs que l'autre n'a pas, alors on utilise `... on <TypeName>` pour cibler un type et non l'autre:

  ```
  query {
    allPersons {
      name
      ... on Child {
        school
      }
      ... on Adult {
         work
      }
    }
  }
  ```

* Le champ `__typename` est un champ spécial qui permet de récupérer le type de l'objet.

  ```
  {
    search(text: "an") {
      __typename
      name
    }
  }
  ```

  ```
  {
    "data": {
      "search": [
        {
          "__typename": "Human",
          "name": "Han Solo"
        },
        {
          "__typename": "Human",
          "name": "Leia Organa"
        },
        {
          "__typename": "Starship",
          "name": "TIE Advanced x1"
        }
      ]
    }
  }
  ```

### Fragment

* Si le serveur définit un fragment alors on peut utiliser la syntaxe suivante pour récupérer l'ensemble des champs listés par le fragment:

  ```
  query {
    allUsers {
      ... addressDetails
    }
  }
  ```

  Ce qui revient à:

  ```
  query {
    allUsers {
      name
      street
      zipcode
      city
    }
  }
  ```

### Opération nommée

* Après le mot-clé `query`, on peut donner un nom à la requête (avec `mutation` et `subscription` aussi). Ça ne change strictement rien au résultat retourné par le serveur, ça aide juste à debugger — on peut facilement identifier les requêtes qui passent sur le réseau et les requêtes dans les logs si elles sont nommées.

  ```
  query ProductTitleAndDescription {
    product(id: "1") {
      title
      description
    }
  }
  ```

  fait la même chose que

  ```
  query {
    product(id: "1") {
      title
      description
    }
  }
  ```

  Par convention, le nom que la requête est écrit en PascalCase et décrit le résultat retourné.

### Variables

* On veut généralement que les valeurs des arguments soient dynamiques: on veut pouvoir sélectionner un élément côté front-end et lancer une requête en conséquence. Plutôt que d'avoir à interpoler les arguments dans la requête (avec un replace par exemple), on peut indiquer à GraphQL que certaines valeurs sont dynamiques et envoyer ces valeurs dans un dictionnaire séparé de la requête. Ces valeurs dynamiques sont appelées des variables.

  <ins>Avec des valeurs fixes</ins>:

  ```
  query {
    book(id: "608aec3691898553fb1f1e23") {
      id
      name
    }
  }
  ```

  <ins>Avec des variables</ins>:

  ```
  query ($id: ID!) {
    book(id: $id) {
      id
      name
    }
  }
  ```

  ![](https://i.imgur.com/6k5lrDJ.png)

* Il est possible de donner une valeur par défaut à une variable, qui sera utilisée si cette variable n'est pas définie dans le dictionnaire.

  ```
  query repositorySearch($name: String="react", $owner: String="facebook") {
    repository(name: $name, owner: $owner) {
      name
      owner {
        id
      }
    }
  }
  ```

#### @skip

* La définition de @skip est comme suit:

  ```
  directive @skip(if: Boolean!) on FIELD | FRAGMENT_SPREAD | INLINE_FRAGMENT
  ```

  Cette directive indique qu'un champ ne doit pas être retourné par le serveur si la variable donnée (booléenne) vaut vrai. Dans la requête suivante, le serveur ne doit retourner `experimentalField` que si $someTest est vraie.

  ```
  query myQuery($someTest: Boolean) {
    experimentalField @skip(if: $someTest)
  }
  ```

#### @include

* La définition d'@include est comme suit:

  ```
  directive @include(if: Boolean!) on FIELD | FRAGMENT_SPREAD | INLINE_FRAGMENT
  ```

  Cette directive fait l'inverse de @skip: elle indique qu'un champ ne doit être retourné par le serveur que si la variable donnée (booléenne) vaut vrai. 

  ```
  query myQuery($someTest: Boolean) {
    experimentalField @include(if: $someTest)
  }
  ```

---

## Mutation

* Une requête `mutation` demande au serveur de modifier des données. Les paramètres seront utilisés par le  serveur pour modifier les données en base de données. Et comme pour une requête query, on peut également spécifier les champs à retourner.

  ```
  mutation {
    createPerson(name: "Bob", age: 36) {
      id
      name
      age
    }
  }
  ```

  ```
  {
    "data": {
      "createPerson": {
        "id": "1",
        "name": "Bob",
        "age": 36,
      }
    }
  }
  ```

---

## Subscription

* Une requête `subscription` permet d'être avertit en temps réel des modifications de données côté serveur.

  ```
  subscription {
    newPerson {
      name
      age
    }
  }
  ```

  ```
  {
    "newPerson": {
      "name": "Jane",
      "age": 23
    }
  }
  ```

---

## Introspection

* GraphQL permet aux clients de demander au serveur des informations sur son schéma — ce que GraphQL appelle l'introspection.

  Par exemple, pour demander au serveur la liste des types définis:

  ```
  query {
    __schema {
      types {
        name
      }
    }
  }
  ```

  ```
  {
    "data": {
      "__schema": {
        "types": [
          {
            "name": "Query"
          },
          {
            "name": "Author"
          },
          {
            "name": "Post"
          },
          ...
  ```

  [Plus d'informations dans les specs](http://spec.graphql.org/June2018/#sec-Introspection)

## GraphiQL

* Un outil qu'on utilise habituellement quand on crée une API GraphQL est GraphiQL (lire "graphical").  
  GraphiQL est une application front-end qui permet d'envoyer des requêtes sur un serveur GraphQL.  
  L'onglet Docs permet d'explorer le schéma de l'API.

  Ça permet de debugger et d'essayer des requêtes sur un serveur GraphQL sans avoir à envoyer des requêtes via curl par exemple.

  ![](https://i.imgur.com/Cqc2Cij.png?1)

## GraphQL Playground

* [GraphQL Playground](https://github.com/graphcool/graphql-playground) est un IDE dans le navigateur qui permet de travailler interactivement avec une API GraphQL — il permet d'envoyer des requêtes GraphQL à l'endpoint de votre choix.

  Il comporte un éditeur pour les requêtes GraphQL (très similaire à GraphiQL), équipé d'autocomplétion et validation des données, et permet d'explorer le schéma de l'API. Il permet également d'afficher l'historique des requêtes effectuées et de travailler avec plusieurs API GraphQL côte-à-côte.
