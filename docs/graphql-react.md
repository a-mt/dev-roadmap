---
title: Client GraphQL avec React.js + Apollo
category: Web, GraphQL
---

## Installation

* Créer une application front-end React  
  Ce sera une application séparée qui accède à l'API créé précédemment (sous Node.js). On aura donc deux répertoires racine: server et client.

  ```
  npm install -g create-react-app
  create-react-app client
  cd client
  ```

* [Installer Apollo](https://www.apollographql.com/docs/)

  ```
  npm install @apollo/client graphql --save
  ```

## Définir un provider

* Dans l'entrypoint de l'application, définir les configurations d'Apollo et encapsuler les composants enfants par le provider.

  <ins>src/App.js</ins>:

  ``` jsx
  import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
  } from '@apollo/client';

  // Components
  import BookList from './components/BookList';
  import BookAdd from './components/BookAdd';

  // Apollo client setup
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
  });

  function App() {
    return (
      <div className="App">
        <ApolloProvider client={client}>
           <BookList />
           <BookAdd />
        </ApolloProvider>
      </div>
    );
  }

  export default App;
  ```

## Composant BookList

* Créer un composant pour requêter et afficher une liste des livres.  
  Cliquer sur un livre affiche les détails du livre.

  <ins>src/components/BookList.js</ins>:

  ``` jsx
  import { Component } from 'react';
  import { gql } from '@apollo/client';
  import { graphql } from '@apollo/client/react/hoc';

  // Components
  import BookDetail from './BookDetail';

  export const QUERY_BOOKS = gql`
  {
    books {
      name
      id
    }
  }
  `;

  class BookList extends Component {
    state = { selected: null };

    render() {
      const { loading, error, books } = this.props.data;

      // Check state
      if(loading) {
        return <div>Loading book list...</div>;
      }
      if(error) {
        console.error(error);
        return <div>Something went wrong</div>;
      }

      // Display content
      return <div style={{display: 'flex'}}>

         {/* Book list */}
         <ul style={{width: '50%'}}>{books.map(book =>
             <li key={book.id} onClick={e => { this.setState({selected: book.id}) }}>
              {book.name}
            </li>
            )}
         </ul>

         {/* Book detail on click */}
         {this.state.selected && <BookDetail bookId={this.state.selected} />}
      </div>;
    }
  }

  export default graphql(QUERY_BOOKS)(BookList);
  ```

  <details>
  <summary>Autres syntaxes</summary>

  * [Higher Order Component](https://www.apollographql.com/docs/react/api/react/hoc/#installation)

    ``` js
    import { graphql } from '@apollo/client/react/hoc';

    class BookList extends Component {
      render() {
        const { loading, error, books } = this.props.data;
        ...
      }
    }

    export default graphql(QUERY_BOOKS)(BookList);
    ```

  * [Components](https://www.apollographql.com/docs/react/api/react/components/)

    ``` jsx
    import { Query } from '@apollo/client/react/components';

    class BookList extends Component {
      render() {
        return <Query query={QUERY_BOOKS}>{({loading, error, data}) => {
          console.log(data.books);
          ...

        }}</Query>
      }
    }

    export default BookList;
    ```

  * [Hooks](https://www.apollographql.com/docs/react/api/react/hooks/) (format recommandé)

    ``` js
    import { useQuery } from '@apollo/client';

    function BookList() {
      const { loading, error, data } = useQuery(QUERY_BOOKS);

      console.log(data.books);
      ...
    }

    export default BookList;
    ```

  * Utiliser directement le client injecté par le provider

    ``` jsx
    import { ApolloConsumer } from '@apollo/client';
    ...

    <ApolloConsumer>{client => {
      client.query({ query: QUERY_BOOKS }).then(data => {
        console.log(data);
      });
    }}</ApolloConsumer>;
    ```

    ``` js
    import { getApolloContext } from '@apollo/client';

    class BookList extends Component {
      static contextType = getApolloContext()

      componentDidMount() {
        this.context.client.query({ query: QUERY_BOOKS }).then(data => {
          console.log(data);
        });
      }
    ```
  </details>

## Composant BookDetail

* Créer un composant pour requêter un afficher un livre en particulier (le composant attend la propriété "id").

  ``` jsx
  import { Component } from 'react';
  import { gql } from '@apollo/client';
  import { graphql } from '@apollo/client/react/hoc';

  const QUERY_BOOK = gql`
    query($id: ID) {
      book(id: $id) {
        id,
        name,
        genre,
        author {
          id
          name
          age
          books {
            id
            name
          }
        }
      }
    }
  `;

  class BookDetail extends Component {
    render() {
      const data = this.props.data;

      if(data.loading) {
        return <div>Loading book details...</div>;
      }
      if(data.error) {
        console.error(data.error);
        return <div>Something went wrong</div>;
      }
      const book = data.book;

      return <div>
        <h2>Title: {book.name || "--"}</h2>
        <p>Genre: {book.genre || "--"}</p>

        {book.author
          ? <div>
              <p>Author: {book.author.name}</p>
              <p>All books by this author:</p>
              <ul>
                {book.author.books.map(book => (
                  <li key={book.id}>{book.name}</li>
                ))}
              </ul>
            </div>
          : <div><p>Author: --</p></div>}
      </div>;
    }
  }

  export default graphql(QUERY_BOOK, {
    options: (props) => ({
      variables: {
        id: props.bookId
      }
    })
  })(BookDetail);
  ```

## Composant BookAdd

* Créer un composant qui déclenche une mutation.  
  Quand un livre est ajouté, Apollo déclenche une nouvelle requête pour récupérer la liste des livres dans le composant BookList et mettre à jour la vue — grâce à `refetchQueries`.

  ``` jsx
  import { Component } from 'react';
  import { gql } from '@apollo/client';
  import { graphql } from '@apollo/client/react/hoc';
  import { compose } from 'recompose'
  import { QUERY_BOOKS } from './BookList';

  const QUERY_AUTHORS = gql`
    {
      authors {
        name
        id
      }
    }
  `;
  const MUTATION_ADDBOOK = gql`
    mutation($name: String!, $genre: String, $authorId: ID) {
      addBook(name: $name, genre: $genre, authorId: $authorId) {
        name,
        id
      }
    }
  `;

  class BookAdd extends Component {
    constructor(props) {
      super(props);

      this.state = {
        name    : '',
        genre   : '',
        authorId: ''
      };
      this.submitForm = this.submitForm.bind(this);
    }
    submitForm(e) {
       e.preventDefault();

       // Call the query MUTATION_ADDBOOK
       this.props.addBook({
          variables: {
            name    : this.state.name,
            genre   : this.state.genre,
            authorId: this.state.authorId
          },
          refetchQueries: [{
            query: QUERY_BOOKS
          }]
       });
    }

    render() {
      const authors = this.props.authors;

      return <form onSubmit={this.submitForm}>
        <div>
          <label>Book name</label>
          <input type="text" onChange={e => this.setState({ name: e.target.value })} />
        </div>

        <div>
          <label>Genre</label>
          <input type="text" onChange={e => this.setState({ genre: e.target.value })} />
        </div>

        <div>
          <label>Author</label>
          {authors.loading
            ? <div>Loading authors...</div>
            : <select onChange={e => this.setState({ authorId: e.target.value })}>
                <option>-- Select author --</option>
                {authors.authors.map(author =>
                  <option key={author.id} value={author.id}>{author.name}</option>
                )}
              </select>}
        </div>

        <button type="submit">Add</button>
      </form>;
    }
  }

  export default compose(
    graphql(QUERY_AUTHORS, {name: "authors"}),
    graphql(MUTATION_ADDBOOK, {name: "addBook"})
  )(BookAdd);
  ```

## Tester

* Lancer l'application

  ```
  npm run start
  ```

* Aller sur localhost:3000
