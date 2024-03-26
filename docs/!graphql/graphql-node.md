---
title: Serveur GraphQL avec Node.js + MongoDB
category: Web, GraphQL
---

## Installation

* Créer un répertoire

  ```
  mkdir server
  cd server
  ```

* Installer les dépendences

  * <ins>express</ins>: un serveur Node.js

  * <ins>cors</ins>: outil pour autoriser les requêtes émises par un autre serveur (ce sera pour l'appli React)

  * <ins>nodemon</ins>: un outil qui redémarre  automatiquement le serveur quand des modifications sont apportées sur des fichiers

  * <ins>graphql</ins>: implémentation JavaScript de GraphQL

  * <ins>express-graphql</ins>: package permettant à Express de comprendre et interagir avec GraphQL

  ```
  npm init
  npm install express cors --save
  npm install nodemon --save-dev
  npm install graphql express-graphql --save
  ```

## Démarrer le serveur

* L'entrypoint du projet charge le schéma GraphQL (qu'on va créer dans la section ci-dessous) et démarre le serveur.

  <ins>app.js</ins>:

  ``` js
  const express         = require('express');
  const cors            = require('cors');
  const { graphqlHTTP } = require('express-graphql');
  const schema          = require('./schema/schema');

  const app = express();
  app.use(cors());
  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }));

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, function(){
    console.log('Server listening on port ' + PORT);
  });
  ```

* L'option `graphiql: true` nous permet d'avoir GraphiQL en front — sur localhost:4000/graphql.

## Créer le schéma GraphQL

* Pour l'instant, on va utiliser des données stockées en dur. Et pour filtrer les données, on va utiliser Lodash.

  ```
  npm install lodash --no-save
  ```

* Le schéma est chargé par app.js (crée ci-dessus).

  Quand on déclare un type objet (en créant une instance de GraphQLObjectType), on passe une fonction qui retourne un objet à la propriété `fields`.

  - Utiliser une fonction nous permet de référencer un type qui est déclaré après le type en cours.

  - L'objet retourné est l'ensemble des champs du type, où la clé est le nom du champs et la valeur les options, qui contiennent à minima le `type` du champ et peut également retourner une `description` et une fonction `resolve` personnalisée.

  <ins>schema/schema.js</ins>:

  ``` js
  const graphql = require('graphql');
  const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList
  } = graphql;

  const _ = require('lodash');

  //+------------------------------------
  //| Dummy data
  //+------------------------------------
  var books = [
      { id: '1', name: 'Name of the Wind',    genre: 'Fantasy', authorId: '1' },
      { id: '2', name: 'The Final Empire',    genre: 'Fantasy', authorId: '2' },
      { id: '3', name: 'The Long Earth',      genre: 'Sci-Fi',  authorId: '3' },
      { id: '4', name: 'The Hero of Ages',    genre: 'Fantasy', authorId: '2' },
      { id: '5', name: 'The Colour of Magic', genre: 'Fantasy', authorId: '3' },
      { id: '5', name: 'The Light Fantastic', genre: 'Fantasy', authorId: '3' }
  ];

  var authors = [
    { id: '1', name: 'Patrick Rothfuss',  age: 44 },
    { id: '2', name: 'Brandon Sanderson', age: 42 },
    { id: '3', name: 'Terry Pratchett',   age: 66 }
  ];

  //+------------------------------------
  //| Defining object types
  //+------------------------------------
  const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
      id    : { type: GraphQLID },
      name  : { type: GraphQLString },
      genre : { type: GraphQLString },

      // One-to-one relation
      author: {
        type: AuthorType,
        resolve(parent, args) {
          return _.find(authors, { id: parent.authorId });
        }
      }
    })
  });

  const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
      id   : { type: GraphQLID },
      name : { type: GraphQLString },
      age  : { type: GraphQLInt },

      // One-to-many relation
      books: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
          return _.filter(books, { authorId: parent.id });
        }
      }
    })
  });

  //+------------------------------------
  //| Defining query type
  //+------------------------------------
  const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {

      // books
      books: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
          return books;
        }
      },

      // authors
      authors: {
        type: new GraphQLList(AuthorType),
        resolve(parent, args) {
          return authors;
        }
      },

      // book/:id
      book: {
        type: BookType,
        args: {
          id: { type: GraphQLID }
        },
        resolve(parent, args) {
          return _.find(books, { id: args.id });
        }
      },

      // author/:id
      author: {
        type: AuthorType,
        args: {
          id: { type: GraphQLID }
        },
        resolve(parent, args) {
          return _.find(authors, { id: args.id });
        }
      }

    } // end fields
  });

  module.exports = new GraphQLSchema({
    query: RootQuery
  });
  ```

## Tester les requêtes

* Lancer le serveur

  ```
  nodemon app
  ```

* Aller sur localhost:4000/graphql et lancer des requêtes query.  
  GraphQL s'occupe automatiquement de ne retourner que les champs demandés.

  ```
  query {
    books {
      id,
      name,
      genre,
      author {
        name
        books {
          id,
          name
        }
      }
    }
  }
  ```

  ```
  query {
    book(id: "3") {
      id,
      name,
      genre,
      author {
        name
        books {
          id,
          name
        }
      }
    }
  }
  ```

  Note: un ID peut être passé sous forme d'entier (3) ou sous forme de chaîne de caractères ("3"). Une chaîne de caractères doit nécessairement être entourée de doubles-quotes et non de simples-quotes.

  Si on requête un ID qui n'existe pas, on obtient un objet null:

  ```
  {
    "data": {
      "book": null
    }
  }
  ```

---

## Ajouter une BDD MongoDB

* On va remplacer nos données statistiques par des lectures et écritures en BDD.

* Créer une base de données.  
  Par exemple sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

  * Créer un nouveau projet
  * Créer un cluster
  * Ajouter un utilisateur (Security > Database Access)
  * Whitelister 0.0.0.0/0 (Security > Network Access)
  * Copier l'adresse de la BDD (Data Storage > Clusters: Connect > Connect your application)  
    Remplacer &lt;password> avec le mot de passe et myFirstDatabase avec le nom de base de données souhaité.

* Installer mongoose  
  Mongoose est un ORM pour MongoDB sous Node.js

  ```
  npm install mongoose --save
  ```

* Ajouter la connection à la base de données dans l'entrypoint du projet

  <ins>app.js</ins>:

  ``` js
  const mongoose = require('mongoose');

  mongoose.connect('mongodb://...', { useUnifiedTopology: true, useNewUrlParser: true });
  mongoose.connection.once('open', () => {
    console.log('Connected to Database');
  });
  ```

## Créer les modèles Mongoose

* C'est le schéma des tables en base de données — MongoDB crée les tables à la volée quand on veut y accéder si elles n'existent pas.  

  <ins>models/book.js</ins>:

  ``` js
  const mongoose = require('mongoose');
  const Schema   = mongoose.Schema;

  const bookSchema = new Schema({
    name    : String,
    genre   : String,
    authorId: String
  });

  module.exports = mongoose.model('Book', bookSchema);
  ```

  <ins>models/author.js</ins>:

  ``` js
  const mongoose = require('mongoose');
  const Schema   = mongoose.Schema;

  const authorSchema = new Schema({
    name: String,
    age : Number
  });

  module.exports = mongoose.model('Author', authorSchema);
  ```

## Utiliser MongoDB

* Remplacer les données statiques dans le schéma GraphQL par des accès à la base de données MongoDB.

  ``` diff
  -const _ = require('lodash');

  -//+------------------------------------
  -//| Dummy data
  -//+------------------------------------
  -var books = [
  -...

  +const Book   = require('../models/book');
  +const Author = require('../models/author');
  ```

  ``` diff
  const BookType = new GraphQLObjectType({
    ...

      // One-to-one relation
      author: {
        type: AuthorType,
          resolve(parent, args) {
  +         return parent.authorId ? Author.findById(parent.authorId) : null;
          }
  ```

  ``` diff
  const AuthorType = new GraphQLObjectType({
    ...

      // One-to-many relation
      books: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
  +        return Book.find({ authorId: parent.id });
        }
  ```

  ``` diff
  const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {

      // books
      books: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
  +       return Book.find({});
        }
      },

      // authors
      authors: {
        type: new GraphQLList(AuthorType),
        resolve(parent, args) {
  +       return Author.find({});
        }
      },

      // book/:id
      book: {
        type: BookType,
        args: {
          id: { type: GraphQLID }
        },
        resolve(parent, args) {
  +       return Book.findById(args.id);
        }
      },

      // author/:id
      author: {
        type: AuthorType,
        args: {
          id: { type: GraphQLID }
        },
        resolve(parent, args) {
  +       return Author.findById(args.id);
        }
      }

    } // end fields
  });
  ```

* Pour l'instant la base de données est encore vide.

## Ajouter des mutations

* Les mutations permettent de modifier les données en base de données — ajouter, modifier, supprimer.

  Par défaut, aucun des paramètres des requêtes n'est obligatoire. Pour le rendre obligatoire, l'encapsuler par GraphQLNonNull.

  ``` diff
  const {
    ...
  + GraphQLNonNull
  } = graphql;
  ```

  ``` js
  //+------------------------------------
  //| Defining mutations
  //+------------------------------------
  const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {

      // addAuthor
      addAuthor: {
        type: AuthorType,
        args: {
          name: { type: GraphQLNonNull(GraphQLString) },
          age : { type: GraphQLInt }
        },
        resolve(parent, args) {

          // Create a new instance of Author
          let author = new Author({
            name: args.name,
            age : args.age
          });

          // Save it in db
          return author.save();
        }
      },

      // addBook
      addBook: {
        type: BookType,
        args: {
          name    : { type: GraphQLNonNull(GraphQLString) },
          genre   : { type: GraphQLString },
          authorId: { type: GraphQLID },
        },
        resolve(parent, args) {

          // Create a new instance of Book
          let book = new Book({
            name    : args.name,
            genre   : args.genre,
            authorId: args.authorId
          });

          // Save it in db
          return book.save();
        }
      }

    }
  });
  ```

  ``` diff
  module.exports = new GraphQLSchema({
    query: RootQuery,
  + mutation: Mutation
  });
  ```

## Tester les mutations

* Lancer le serveur

  ```
  nodemon app
  ```

* Aller sur localhost:4000/graphql et lancer des requêtes mutation.  
  Si un champ obligatoire n'est pas spécifié, une erreur est levée

  ```
  mutation {
    author0: addAuthor(name: "Patrick Rothfuss", age: 44) {
      id
      name
      age
    }
    author1: addAuthor(name: "Brandon Sanderson", age: 42) {
      id
      name
      age
    }
    author2: addAuthor(name: "Terry Pratchett", age: 66) {
      id
      name
      age
    }
  }
  ```
  ```
  mutation {
    addBook(
        name: "Name of the Wind",
        genre: "Fantasy",
        authorId: "608aebdf91898553fb1f1e1f") {
      id,
      name,
      genre,
      author {
        name
        books {
          id,
          name
        }
      }
    }
  }
  ```

## Validation personnalisée

* Pour valider les données, on peut implémenter sa logique

  - directement dans la mutation

    ``` js
    const isEmail = function(txt){
      return /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(txt);
    }

    const Mutation = new GraphQLObjectType({
      name: 'Mutation',
      fields: {

        // addAuthor
        addAuthor: {
          type: AuthorType,
          args: {
            name : { type: GraphQLNonNull(GraphQLString) },
            age  : { type: GraphQLInt },
            email: { type: GraphQLString }
          },
          resolve(parent, args) {

            if(args.email && !isEmail(args.email)) {
              throw new Error('Email is not in valid format');
            }

            // Create a new instance of Author (mongoose schema)
            let author = new Author({
              name : args.name,
              age  : args.age,
              email: args.email
            });

            // Save it in db
            return author.save();
          }
        ...
    ```

  - ou en créant un scalar personnalisé.  
    Cette approche a l'avantage de pouvoir indiquer dans le schéma le format attendu (dans la description du type) et d'être réutilisable.

    ``` js
    const {
      ...
      GraphQLScalarType,
      GraphQLError
    } = graphql;

    //+------------------------------------
    //| Defining custom scalars
    //+------------------------------------

    const checkEmail = function(str) {
      if(str && !/^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/.test(str)) {
        throw new GraphQLError("This value is not a valid email: ".concat(str));
      }
      return str;
    }

    const GraphQLEmail = new GraphQLScalarType({
      name: 'Email',
      description: 'The `Email` scalar type represents textual data validating /^[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\.[^@ \\t\\r\\n]+$/ (ie user@domain.com)',

      // invoked when serializing the result to send it back to a client.
      serialize: GraphQLString.serialize,

      // invoked to parse client input that was passed through variables.
      parseValue(inputValue) {
        return checkEmail(GraphQLString.parseValue(inputValue));
      },

      // invoked to parse client input that was passed inline in the query.
      parseLiteral(valueNode) {
        return checkEmail(GraphQLString.parseLiteral(valueNode));
      }
    });

    //+------------------------------------
    //| Defining object types
    //+------------------------------------

    const AuthorType = new GraphQLObjectType({
      name: "Author",
      fields: () => ({
        ...
        email: { type: GraphQLEmail },

    ...

    //+------------------------------------
    //| Defining mutations
    //+------------------------------------

    const Mutation = new GraphQLObjectType({
      name: 'Mutation',
      fields: {

        // addAuthor
        addAuthor: {
          type: AuthorType,
          args: {
            name : { type: GraphQLNonNull(GraphQLString) },
            age  : { type: GraphQLInt },
            email: { type: GraphQLEmail }
          },
          resolve(parent, args) {

            // Create a new instance of Author (mongoose schema)
            let author = new Author({
              name : args.name,
              age  : args.age,
              email: args.email
            });

            // Save it in db
            return author.save();
          }
        }
        ...
    ```

    [Exemple avec Date](https://www.graphql-tools.com/docs/scalars/#date-as-a-scalar)