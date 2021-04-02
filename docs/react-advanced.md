---
title: React: Fonctionnalités avancées
category: Web, JavaScript, Library, React
---

## Contexte

* Le contexte permet de faire passer des données à travers l'arbre des composants ancêtres/enfants sans avoir à passer des propriétés manuellement à chaque niveau. Il y a deux manières de procéder: avec provider et consumer, ou  this.context.

### Provider et consumer

1. Créer le contexte

    ``` js
    const UserContext = React.createContext("Bob");
    ```

2. Définir le provider.

    ``` js
    class App extends Component {
      render() {
        return <div className="App">
          <UserContext.Provider>
            <Child />
          <UserContext.Provider>
        </div>
      }
    }
    ```

    On peut surcharger la valeur par défaut:

    ```
    <UserContext.Provider value="Alice">
    ```

3. Consommer la valeur du contexte.  
   Le consumer permet de récupérer les valeurs du provider associé parmis les ancêtres du composant.

    ``` js
    class Child extends Component {
      render() {
        return <SubChild />;
      }
    }
    class SubChild extends Component {
      render() {
        return <SubSubChild />;
      }
    }
    class SubSubChild extends Component {
      render() {
        return <UserContext.Consumer>
            {(username) => <div>Hello {username}</div>}
          </UserContext.Consumer>;
      }
    }
    ```

   On peut ainsi consommer différents contextes:
   
    ``` js
    function Content() {
      return (
        <ThemeContext.Consumer>{theme => {
          <UserContext.Consumer>{user => {

            <ProfilePage user={user} theme={theme} />

          }}</UserContext>
        }}</ThemeContext.Consumer>
      );
    }
    ```

### this.context

Cette approche ne fonctionne que pour les composants en classe, et il ne peut y avoir qu'un seul contexte.

1. Créer le contexte

    ``` js
    const UserContext  = React.createContext({ username: "Bob" });
    ```

2. Définir le type de contexte de la classe

    ``` js
    Child.contextType = UserContext;
    ```

    ou

    ``` js
    class Child extends Component {
      static contextType = UserContext
    }
    ```

3. Lire `this.context`

    ``` js
    class Child extends Component {
      render() {
        return <div>{this.context.username}</div>
      }
    }
    ```

---


## PureComponent

* Lorsqu'on change les propriétés ou l'état d'un composant, React ne vérifie pas vraiment si la valeur a changé ou non et déclenche un nouveau `render`. Mais ce n'est pas forcemment nécessaire. Pour y rémédier on 1. utiliser shouldComponentUpdate, 2. utiliser un PureComponent, 3. utiliser React.memo

* PureComponent compare les valeurs de l'état avant/après et ne déclenche `render` que s'il y a des modifications. React effectue une comparaison superficielle, il ne détectera donc aucun changement si un sous-objet à changé — si les éléments d'un tableau ont changé par exemple.

  ``` js
  import React, {Component, PureComponent} from 'react';

  class App extends PureComponent {}
  ```

## Memoize

* Pour les composants stateless: avec `React.memo`, un nouveau `render` ne sera déclénché que si les propriétés du composant ont changé.

  ``` js
  class App extends Component {
    state = { val: 1 }

    componentDidMount() {
      setInterval(() => {
        this.setState({val: 1});
      }, 1000);
    }

    render() {
      return <div className="App">
        <FunctionalComp val={this.state.val} />
      </div>;
    }
  }

  const FunctionalComp = React.memo((props) = {
    console.log('render functional comp');

    return <span>{props.val}</span>
  });
  ```

---

## Refs

### createRef

* On peut déclarer une référence avec `React.createRef` et la lier à un composant avec l'attribut `ref`.  
   `obj.current` correspond à l'élément DOM construit.

    ``` js
    class App extends Component {
      constructor(props) {
        super(props);
        this.inputRef = React.createRef();
      }
      componentDidMount() {
        this.inputRef.current.focus();
      }
      render() {
        return <div>
          <input ref={this.inputRef} type="text" />
        </div>;
      }
    }
    ```

### Ref callback

* On peut utiliser un callback avec l'attribut `ref` pour assigner une variable.  
   `obj` est un composant React — on peut appeler les méthodes React dessus, comme setState.

    ``` js
    class App extends Component {
      constructor(props) {
        super(props);
        this.inputRef = null;
      }
      componentDidMount() {
        this.inputRef.focus();
      }
      render() {
        return <div>
          <input ref={node => this.inputRef = node} type="text" />
        </div>;
      }
    }
    ```

    Pour un composant stateless:

    ``` js
    const FuncCustomComp() => {
      let inputRef = null;

      const onClick = () => {
        inputRef.focus();
      };

      return <div>
        <input type="text" ref={input => {inputRef = input}} />
        <input type="submit" onClick={onClick} />
      </div>;
    }
    ```

### Ref forwarding

* Pour un composant stateless, on peut peut passer automatiquement une référence d'un enfant à un parent:

  ``` js
  class App extends Component {
    constructor(props) {
      super(props);
      this.inputRef = React.createRef();
    }
    clickHandler() {
      this.inputRef.current.focus();
    }

    render() {
      return <div>
        <Child ref={this.inputRef} />
        <button onClick={this.clickHandler}>Focus Input</button>
      </div>;
    }
  }

  const Child = React.forwardRef((props, ref) => {
    return (
      <div><input type="text" ref={ref} /></div>
    );
  });
  ```

---

## Fragments

* En JSX, il doit toujours y avoir un élément racine. Si on veut éviter d'avoir à ajouter un div pour englober plusieurs enfants, on peut utiliser un composant Fragment — dans le HTML généré, il n'y aura pas de parent.

  ``` js
  import React, {Component, Fragment} from 'react';

  const Example = () => {
    return {
      <Fragment>
        <div>Hi</div>
        <div>Hello</div>
      </Fragment>
    }
  }
  ```

  ``` js
  const Example = () => {
    return {
      <>
        <div>Hi</div>
        <div>Hello</div>
      </>
    }
  }
  ```

---

## Portal

* Il est possible d'insérer un composant React dans un autre endroit du DOM que son parent avec `ReactDOM.createPortal`.
  Un cas d'utilisation typique est lorsque le composant parent a un style `overflow: hidden` ou `position: relative` mais qu'on veut avoir un enfant qui sorte du parent — par exemple pour afficher un message, une tooltip, etc.

  Note: Un événement déclenché depuis l'intérieur d'un Portal se propagera à ses ancêtres React, même si ces éléments ne sont pas ses ancêtres dans le DOM.
  
  ``` js
  class App extends Component {
    render() {
      return <div id="app">
        <h1>Hello, world!</h1>
        <Message />
      </div>;
    }
  }

  // Message sera inséré dans #root-portal
  // Quel que soit son composant parent
  const Message = () => {
    return ReactDOM.createPortal(
      <div id="message">Message</div>,
      document.getElementById('root-portal'));
  }

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
  ```

  Génère:

  ```
  <body>
      <div id="root">
          <div id="app"><h1>Hello, world!</h1></div>
      </div>
      <div id="root-portal">
          <div id="message">Message</div>
      </div>
  </body>
  ```

[JSFiddle portal](https://jsfiddle.net/amt01/uLf7jktd/)

---

## Lazy loading

* Au lieu de charger tout les composants en même temps, on charger des composants après que le parent ne soit monté avec `React.lazy`.

  ``` js
  class App extends Component {
    render() {
      return <div className="App">
          <React.Suspense fallback={<div>Loading...</div>}>
            <MyComp />
          </React.Suspense>
        </div>;
    }
  }

  const MyComp = React.lazy(() => {
      return <div>I just loaded</div>;
  });
  ```

---

## Error Boundary

* Si une erreur se produit pendant l'execution de `render`, alors non seulement le composant en cours ne sera pas affiché mais également tous ses ancêtres — typiquement, on se retrouve avec une page entièrement vide. Pour éviter ça, n'importe quel ancêtre peut attraper les erreurs et afficher un message de fallback à la place.

* La méthode statique `getDerivedStateFromError` est appelée lorsqu'une erreur est déclenchée dans le constructeur ou dans la méthode `render` d'un enfant. Ce mécanisme n'attrape pas les erreurs qui se produisent à l'intérieur d'événements comme `onClick` — il faut gérer ce type d'erreur avec un try...catch classique.

  La méthode `componentdidCatch` quant à elle est appelée lorsqu'une erreur a été attrapée. On peut s'en servir pour logger l'erreur sur un serveur par exemple.

  ``` js
  function Hero({name}) {
    if(name) {
      throw new Error('Not a hero!')
    }
    return <div>{name}</div>;
  }

  class ErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError(error) {
      return {
        hasError: true
      };
    }
    componentdidCatch(error, info) {
      console.error(error);
      console.log(info);
    }
    render() {
      if(this.state.hasError) {
        return <div>Somethig went wrong</div>;
      }
      return this.props.children;
    }
  }

  class App extends Component {
    render() {
      return (
        <div className="App">
          <ErrorBoundary>
            <Hero name="Batman" />
            <Hero name="Superman" />
            <Hero name="Joker" />
          </ErrorBoundary>
        </div>
      );
    }
  }
  ```

* Pour le mode développement: l'erreur React est affichée à l'écran (cliquer le bouton X en haut à droite pour fermer le message d'erreur et afficher l'application générée) et est également écrite dans la console. Ce n'est pas le cas en mode production.

---

## Patterns

### Higher Order Component (HOC)

* Un HOC est un pattern dans lequel une fonction prend un composant en argument en renvoie un nouveau composant. Typiquement, c'est utilisé pour ajouter des données ou des fonctionnalités à un composant — même principe qu'une mixin.

  ``` js
  const withCounter = (WrappedComponent, incrementNumber=1) => {
    class WithCounter extends Component {
      state = { count: 0 }

      incrementCount = () => {
        this.setState(state => ({
          count: state.count+incrementNumber
        }));
      }
      render() {
        return <WrappedComponent
                  count={this.state.count}
                  incrementCount={this.incrementCount}
                  {... this.props} />
      }
    }
    return WithCounter;
  }

  class HoverCounter extends Component {
    render() {
      return <h2 onMouseOver={this.props.incrementCount}>
        Hovered {this.props.count} times
      </h2>
    }
  }
  export default withCounter(HoverCounter);
  ```

### Render props

* Une autre approche, permettant elle aussi de partager des fonctionnalités entre différents composants, est d'utiliser une propriété `render` dont la valeur est une fonction.

  ``` js
  class Counter extends Component {
    state = { count: 0 }

    incrementCount = () => {
      this.setState(state => ({
        count: state.count+1
      }));
    }
    render() {
      return {this.props.render(this.state.count, this.incrementCount)};
    }
  }

  class App extends Component {
    render() {
      return <div className="app>
        <Counter render={(count, incrementCount) =>
          <button onClick={incrementCount}>Cicked {count} times</button>
        } />
      </div>;
    }
  }
  ```

* Ou on peut faire la même chose en passant la fonction comme enfant plutôt que propriété.

  ``` js
  class Counter extends Component {
    // ...
    render() {
      return {this.props.children(this.state.count, this.incrementCount)};
    }
  }

  class App extends Component {
    render() {
      return <div className="app">
        <Counter>
          {(count, incrementCount) =>
              <button onClick={incrementCount}>Cicked {count} times</button>}
        </Counter>
      </div>;
    }
  }
  ```