---
title: React
category: Web, JavaScript, Library
---

{% raw %}

## Qu'est ce que c'est

React.js est une librairie open-source développée par Facebook ayant pour but est de permettre le développement d'applications front-end plus rapide et plus facile à maintenir.

* Le HTML peut être crée et modifié facilement grâce à l'utilisation de [JSX](jsx.md). Les navigateurs ne supportent pas nativement JSX, il faut utiliser Babel — cf article sur JSX.

    ``` js
    const JSX = (<div>
        <h1>This is a block of JSX</h1>
        <p>Here is a subtitle</p>
    </div>);
    console.log(JSX);
    ```

* React repose sur la définition de composants, où chaque composant s'occupe du HTML et JS d'un bloc discret de la page: bouton, barre de recherche, carousel, etc — un peu sur le même principe que le CSS modulaire. Les composants définis peuvent ensuite être réutilisés pour constituer d'autres composants.

* Le [DOM](!jsapi/js-dom.md) est une représentation orientée objet du document HTML chargé, que l'on peut lire et écrire pour modifier la page. La lecture et écriture dans le DOM sont lentes, particulièrement quand on fait beaucoup — d'où l'existance de `requestAnimationFrame`.

  Au lieu de modifier le DOM directement, React crée une copie JavaScript du DOM (un objet) au chargement de la page. Tous les accès se font via ce DOM virtuel, et React se charge de mettre à jour le DOM à intervalle régulier là où c'est nécessaire lorsque que des modifications ont été apportées. Cela permet de minimiser les accès aux DOM et augmente la réactivité des pages.

  Video: [Rerendering a React application](https://egghead.io/lessons/react-rerender-a-react-application)

* L'ajout de HTML, CSS ou JS est toujours géré via le JSX, via des changements d'état du composant. Ce paradigme représente un changement radical par rapport à l'approche plus traditionnelle — où l'on modifie le HTML, applique du style ou des événéments JS en modifiant directement les éléments du DOM. Dans cette approche, il peut devenir difficile de suivre les changements (quels événéments on été appliqués, quel style a été modifié, etc), ce qui rend l'interface utilisateur difficile à maintenir.

[Exemple CodePen React](https://codepen.io/a-mt/pen/JjYKmPd?editors=0010)

---

## B.A.-BA

### Inclure la librairie

Inclure [React.js](https://reactjs.org/) dans la page:

``` html
<!-- Note: when deploying, replace "development.js" with "production.min.js". -->
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
```

### Déclarer un composant

Il y a deux manières de déclarer un composant

1. <ins>Stateless</ins>: avec une fonction JavaScript.  
   Définir un composant de cette manière crée un composant sans état: il peut recevoir des données et les restituer mais ne peut pas gérer les changements de données.
   Le nom de la fonction doit être en UpperCamelCase et retourner soit du JSX soit `null`.

    ``` js
    const HelloWorld = function() {
        return (
            <div className='customClass'>Hello World</div>
        );
    };
    ReactDOM.render(<HelloWorld />, document.body);
    ```

2. <ins>Statefull</ins>: avec une classe qui hérite de `React.Component`.  
   Définir un composant de cette manière donne accès à toutes les fonctionnalités de React (comme les lifecycle hooks, la propriété state).
   Le nom de la classe doit être en UpperCamelCase et la méthode `render()` doit retourner soit du JSX soit `null`.

    ``` js
    class HelloWorld extends React.Component {
        render() {
            return <div className='customClass'>
                Hello World
            </div>;
        }
    });
    ReactDOM.render(<HelloWorld />, document.body);
    ```

    Version ES5, on peut utiliser `React.createClass`:

    ``` js
    var HelloWorld = React.createClass({
        render: function() {
            return <div className='customClass'>
                Hello World
            </div>;
        }
    });
    ReactDOM.render(<HelloWorld />, document.body);
    ```

### Imbriquer des composants

Lorsque React trouve une balise HTML faisant référence à un autre composant (ex `<MonComposant>`), alors ce composant est crée et la balise est remplacée par le contenu retourné par la méthode `render` de ce composant.

<ins>Exemple<ins>:

``` js
const ChildComponent = () => {
  return (
    <div className="child">
      <p>I am the child</p>
    </div>
  );
};

class ParentComponent extends React.Component {
  render() {
    return (
      <div className="parent">
        <h1>I am the parent</h1>
        <ChildComponent />
      </div>
    );
  }
};

ReactDOM.render(<ParentComponent />, document.body);
```

HTML généré:

``` html
<div class="parent">
  <h1>I am the parent</h1>
  <div class="child">
    <p>I am the child</p>
  </div>
</div>
```

### Afficher un composant dans la page

Pour ajouter un composant React à la page, il fautt appeler `ReactDOM.render`.

* 1er paramètre: du JSX.  
  En l'occurence, on veut juste afficher le contenu du composant `MyComponent`.
* 2ème paramètre: un élément DOM.  
  Le HTML généré viendra remplacer le innerHTML de cet élément.

``` js
ReactDOM.render(<MyComponent />, document.body);
```

---

## Caveat

### Afficher une liste d'éléments

Lorsqu'on crée un liste d'élément du même type (que ce soit une balise HTML normale ou un composant), alors il est nécessaire de définir l'attribut `key` avec une valeur unique pour chacun. React utilise ces clés pour savoir lorsque que des éléments sont ajoutés, modifiés ou supprimés et mettre à jour le DOM en conséquence.

``` js
var list = [
  {id: 1, value: "Item A"},
  {id: 2, value: "Item B"},
  {id: 3, value: "Item C"}
];

return <ul>
  {list.map((item) =>
    <li key={item.id}>{item.value}</li>
  }
</ul>;
```

Video: [Use the key prop](https://egghead.io/lessons/react-use-the-key-prop-when-rendering-a-list-with-react)

### Définir le CSS d'un élément

Pour définir le style en ligne d'un élément, il faut définir un objet JS. Encore une fois, cela permet à React de minimiser les accés aux DOM.

* <ins>Attributs en lowerCamelCase</ins>  
  Les clés de l'objet doivent correspondre aux propriétés JavaScript de l'attribut [`style`](https://www.w3schools.com/jsref/dom_obj_style.asp), c'est à dire en utilisant la syntaxe lowerCamelCase: `fontSize` et non `font-size`.

  ``` js
  <div style={{color: "yellow", fontSize: 16}}>Mellow Yellow</div>
  ```

* <ins>Unité des valeurs</ins>  
  Les unités des propriétés numériques de longueur (comme la hauteur, la largeur ou la taille de la police) peuvent être omises, et sera par défaut en `px`. Pour une unité différente, il faut expliciter l'unité utilisée.

  ```
  {fontSize : 16} // ou "16px"
  {fontSize : "4em"}
  ```

### Ajouter un composant sous condition

Si un composant ne doit s'afficher que sous certaines conditions, on peut

1. soit ajouter un test côté parent

   ```
   render() {
     return <div>
       {this.props.b ? <MonComposant /> : null}
     </div>;
   }
   ```

2. soit retourner `null` côté enfant

   ```
   render() {
     if(this.props.b) {
       return null;
     }
     return <div>Hello</div>;
   }
   ```

### Afficher du HTML stocké

* Par défaut, les caractères spéciaux des variables affichées sont échappés:

  ```
  var txt = '<Hello>!';

  return <div>{txt}</div>;
  ```

  HTML généré:

  ```
  <div>&lt;Hello&gt;!</div>

* Si vous voulez afficher du HTML non échappé, alors il faut utiliser la propriété `dangerouslySetInnerHTML`:

  ```
  var txt = '<strong>Hello</strong> !';

  return <div dangerouslySetInnerHTML={{__html: txt}} />;
  ```

  HTML généré:

  ```
  <div><strong>Hello</strong>!</div>
  ```

---

## Propriétés

### Définir des propriétés

On peut passer des propriétés aux composants

1. <ins>Côté parent</ins>: Définir les valeurs des propriétés comme si c'était des attributs HTML

    ```
    var maVariable = "Item C";

    ReactDOM.render(<div>

      {/* Chaîne de caractère */}
      <MyComponent key="1" mytext="Item A" />

      {/* Valeur numérique */}
      <MyComponent key="2" mytext={10} />

      {/* Date */}
      <MyComponent key="3" mytext={Date()} />

      {/* Valeur dynamique */}
      <MyComponent key="4" mytext={maVariable + '!'} />

    </div>, document.body);
    ```

2. <ins>Côté composant</ins>: Les valeurs des propriétés sont accessibles via `this.props`

    ```
    class MyComponent extends React.Component {
      render() {
        return <p>{this.props.mytext}</p>;
      }
    }
    ```

    Pour un composant stateless, c'est à dire si vous utilisez une fonction pour définir un composant et non pas une classe: les propriétés sont passées en paramètres.

      ```
      const MyComponent = (props) => <p>{this.props.mytext}</p>;
      ```

### Définir du contenu JSX

On peut également passer du contenu JSX aux composants.

1. <ins>Côté parent</ins>: Définir du contenu JSX à l'intérieur du composant

    ``` js
    ReactDOM.render(<div>
      	<MyComponent key="1">Item A</MyComponent>
      	<MyComponent key="2">Item B</MyComponent>
    </div>, document.body);
    ```

2. <ins>Côté composant</ins>: Le contenu passé par le parent est disponible via la propriété `this.props.children`

    ```
    class MyComponent extends React.Component {
      render() {
        return <p>{this.props.children}</p>;
      }
    }
    ```

### Valeur par défaut

* On peut définir la valeur par défaut des propriétés d'un composant. La valeur par défaut sera assignée à la propriété si le parent ne définit pas l'attribut. Si le parent définit l'attribut mais ne définit pas la valeur, alors elle sera la propriété sera `null`.

  ``` js
  MyComponent.defaultProps = {
    myText: "Text"
  };
  ```

  [JSFiddle defaultProps](https://jsfiddle.net/amt01/6d8wh91g/)

* En JavaScript, lorsqu'un attribut est définit plusieurs fois sur un composant, alors la dernière définition est retenue. On peut se servir de ce comportement pour définir des propriétés par défaut.

  ``` js
  var props = {
    className: 'container',
    children: 'Hello World'
  };
  var element = <div className="my-class" {...props} />;
  ```

  HTML généré:

  ```
  <div class="container">Hello World</div>
  ```

* C'est particulièrement utile si vos propriétés sont elles-mêmes des objets, comme dans le cas de style:

  ``` js
  function Box({style, size, className = '' ...rest}) {
    var sizeClassName = size ? `box--${size}` : '';

    return <div
        className={`box ${className} ${sizeClassName}`}
        style={{ paddingLeft: 20, ...style }}
        {...rest}
      />;
  }

  function Element() {
    return <div>
        <Box size="small" style={{ backgroundColor: 'lightblue' }}>
          Small box
        </Box>
      </div>;
  }
  ```

### Validation des propriétés

* Il est possible d'exiger qu'une propriété soit définie et/ou qu'elle soit d'un type donné en utilisant `propTypes`. 

  Si la propriété passée est invalide, une erreur est affichée dans la console (quand on utilise `react.development.js` et non `react.production.js`).

  ``` js
  MyComponent.propTypes = {
    mytext: PropTypes.string,            // string non obligatoire
    mytext2: PropTypes.string.isRequired // string obligatoire
    myprop: PropTypes.any.isRequired     // n'importe quel type mais obligatoire
  };
  ```

  Pour plus d'infos sur les tests définis, voir [facebook/prop-types](https://github.com/facebook/prop-types).

* On peut également utiliser une logique personnalisée, en définissant une fonction:

  ``` js
  MyComponent.propTypes = {
    mytext: function(props, propName, componentName) {
      if(typeof props[propName] !== 'string') {
        return new Error(`Hey, you should pass a string for ${propName} in ${componentName} but you passed a ${typeof props[propName]}!`);
      }
    }
  }
  // Warning: Failed prop type:
  // Hey, you should pass a string for mytext in MyComponent but you passed a boolean!
  ```

* `propTypes` peut être déclarée comme variable statique à l'intérieur de la classe:

  ```
  class MyComponent extends React.Component {
    static propTypes = {
      mytext: PropTypes.string.isRequired
    }
    render() {
      // ...
    }
  }
  ```

* Depuis React v15.5.0, les PropTypes sont dans un package à importer indépendemment de React:

  ```
  https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.6.1/prop-types.js
  ```


---

## État

### Définir l'état d'un composant

L'état d'un composant est stocké dans `this.state`. Toutes les données pouvant changer au cours du temps doivent être stockées dans cette variable.

``` js
class Checkbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    };
  }
  // ...
}
```

Version ES5:

``` js
var Checkbox = React.createClass({
  getInitialState: function() {
    return {
      checked: false
    };
  }
  // ...
});
```

ES6 Syntaxic sugar: On peut déclarer `state` en dehors du constructeur:

``` js
class Checkbox extends React.Component {
  state = {checked: false}

  render() {
    var {checked} = this.state
  }
}
```

### Changer l'état d'un composant

* Lorsqu'une ou des données doivent changer, on appelle `setState` pour modifier la valeur de `state`. Les mises à jour d'état via cette méthode sont asynchrones, React peut regrouper plusieurs mises à jour ensemble afin d'améliorer les performances.

  ``` js
  class Checkbox extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        checked: false
      };
    }
    handleCheck() {
      this.setState({
        checked: !this.state.checked
      });
    }
    render() {
      return <div>
        <input type="checkbox"
               onChange={this.handleChange.bind(this)}
               defaultChecked={this.state.checked} />

        <p>The checkbox is {this.state.checked ? "checked": "unchecked"}</p>
      </div>;
    }
  }
  ```
  
  Parce que les mises à jour de l'état sont asynchrones, `this.state` peut ne pas être à jour avec le dernier appel à `setState`. Pour garantir qu'on accède bien à la dernière valeur de l'état:
  
  ``` js
  this.setState((state, props) => ({
    counter: state.counter + props.increment
  }));
  ```

* Lorsque l'état d'un composant change, React appelle alors `render()` puis met à jour le DOM si nécessaire. Une bonne pratique est de chercher à modulariser les composants au maximum, afin de limiter la gestion de l'état à un domaine spécifique de l'application.

### Conserver this

Pour conserver `this` dans un callback — pour que `handleCheck()` soit capable d'appeller `this.setState()` dans notre exemple — on peut soit

1. Lier `this` à la méthode en utilisant `maMethode.bind(this)`.  
    On peut le faire dans la méthode `render` à chaque fois qu'on veut définir un callback mais une pratique courante est de le faire directement dans le constructeur. Comme ça, on le fait qu'une seule fois.

    ``` js
    constructor(props) {
      // ...
      this.handleCheck = this.handleCheck.bind(this);
    }
    render() {
      // ...
          <input type="checkbox"
                 onChange={this.handleChange}
                 defaultChecked={this.state.checked} />
    }
    ```

2. Utiliser une fonction flèche. Une fonction flèche lie automiquement `this` à partir du contexte dans lequel est elle définie.

    ``` js
    setMessage = () => {
      this.setState({
        message: 'Goodbye!'
      });
    }
    ```

### Événements

* On peut attacher des événements aux éléments directement en les définissant en attribut.  
React utilise la délégation d'événement: il n'y a qu'un seul événement ajouté pour le document entier pour chaque type d'événement et React gère l'appel aux événements que vous définissez pour les différents éléments. Cela évite des `addEventListener` / `removeEventListener` intempestifs et améliore les performances de la page.

  Notons que les fonctions récupèrent un événement qui est l'événement délégué. Pour accéder à l'événement  déclenché sur l'élément, utiliser `e.nativeEvent`.

* Il existe tout un tas d'événements, mais les plus couramment utilisés sont:

  * <ins>onClick</ins>  
    Est appelé lorsqu'on clique sur l'élément

    ```
    <button onClick={() => this.setState({eventCount: this.state.eventCount+1})} />
    ```

  * <ins>onMouseOver</ins>  
    Est appelé lorsque la souris passe sur l'élément

  * <ins>onFocus</ins>  
    Est appelé lorsque l'élément gagne le focus

  * <ins>onBlur</ins>  
    Est appelé lorsque l'élément perd le focus

  * <ins>onChange</ins>  
    Est appelé lorsque la valeur (attribut `value`) de l'élément change.

    ``` js
    state = {
      error: this.getErrorMessage('')
    }
    handleChange = (event) => {
      var value = event.target.value;

      this.setState({
        error: this.getErrorMessage(value)
      });
    }
    getErrorMessage(value) {
      if(value.length <= 3) {
        return "Value must be at least 3 characters long";
      }
      return null;
    }
    render() {
      return <form>
          <div>
            <label>Name:</label>
            <input onChange={this.handleChange} type="text" name="username">
            {error ? <small style={{color: 'red'}}>{error}</small> : null}
          </div>
          <button disabled={!!this.state.error} type="submit">Submit</button>
        </form>
    }
    ```

    ```
    <select
      multiple size={availableOptions.length} 
      onChange={event => console.log(event.target.selectedOptions)}>

        {availableOptions.map(val =>
          <option key={val} value={val} />
        )}
    </select>
    ```

    ```
    <input type="checkbox"
           onChange={event => console.log(event.target.checked)}
    ```

  * <ins>onSubmit</ins>  
    Est appelé lorsqu'un formulaire est envoyé.

    ```
    handleSubmit = event => {
      event.preventDefault();
      console.log(event.target.elements.username.value);
    }
    render() {
      return <form onSubmit={this.handleSubmit}>
          <label>Name:</label>
          <input type="text" name="username">
          <button type="submit">Submit</button>
        </form>
    }
    ```

### value vs defaultValue

Si vous définissez l'attribut `value` d'un champ, alors l'utilisateur ne pourra pas éditer le contenu du champ — parce que React observe ce champ et s'assure que sa valeur dans le DOM est bien égale à celle dans le DOM virtuel. Pour définir la valeur d'un champ et permettre à l'utilisateur d'éditer le champ, deux possibilités:

* Observer les changements de valeur avec `onChange`

  ```
  state = {
    inputValue: "Valeur par défaut"
  }
  render() {
    return <div>
        <input value={this.state.inputValue}
               onChange(event => this.setState({inputValue: event.target.value}))
      </div>
  }
  ```

* Définir la valeur initiale du champ avec `defaultValue`  
  `defaultValue` définit la valeur du champ au moment de la création de l'élément, tandis que les mises à jour suivantes ne contrôlent pas la valeur du champ.

  ```
  <input defaultDefault="Valeur par défaut" />
  ```

  De même, pour les champs de type `checkbox` ou `radio`, on peut utiliser `defaultChecked` à la place de `checked`

  ```
  <input type="checkbox" defaultChecked={true} />
  ```

Video: [Controlling Form Values](https://egghead.io/lessons/react-controlling-form-values-with-react)

---

## Lifecycle

Il est possible de définir des méthodes sur les composants, qui seront appelées à divers moments du cycle de vie.  
Les méthodes sont parfois dépréciées, supprimées ou renommées: en cas de doute, vérifier la [documentation](https://reactjs.org/docs/react-component.html#the-component-lifecycle).

### componentDidMount

Est appelé juste après le premier appel à la méthode `render()`, après que le DOM ait été construit.

#### Effectuer des appels API

On peut notamment s'en servir pour y effectuer des `fetch` — récupérer les données qu'on va par la suite afficher.

``` js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      activeUsers: null
    };
  }
  componentDidMount() {
    setTimeout( () => { // simulating an API callback
      this.setState({
        activeUsers: 1273,
        loaded: true
      });
    }, 2500);
  }
  render() {
    if(!this.state.loaded) {
      return <div>Loading data...</div>;
    }
    return <div>Active Users: {this.state.activeUsers}</div>;
  }
};
```

#### Ajouter des événements sur window/document

On peut aussi s'en servir pour ajouter des événements JavaScript.

React permet nativement d'ajouter des événements JS sur des éléments, en les passant en attribut. Cependant, si vous voulez ajouter un événément aux objets `document` ou `window`, alors vous devez le faire directement.

Pareil si vous voulez utiliser un `setTimeout` ou `setInterval`.

``` js
constructor(props) {
  this.state = {
    shouldSave: false
  };
  this.handleLeavePage = this.handleLeavePage.bind(this);
}

componentDidMount() {
  window.addEventListener('beforeunload', this.handleLeavePage);
}

componentWillUnmount() {
  window.removeEventListener('beforeunload', this.handleLeavePage);
}

// Prompt the user that there are unsaved changes
// When he leaves the page
handleLeavePage(e) {
  var e = e || window.event;

  if(!this.state.shouldSave) {
    return null;
  }
  const confirmationMessage = 'Some message';
  e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
  return confirmationMessage;              // Gecko, WebKit, Chrome <34
}
```

#### Appeler à une librairie sur un élément

On peut encore s'en servir pour appeler une librairie, par exemple pour ajouter CodeMirror.

Définir l'attribut `ref` sur un élément dans le JSX permet de récupérer le DOMElement de cet élément. La valeur de `ref` doit être une fonction, et cette fonction sera appelée dès que le DOM de l'élément est construit (juste avant que `componentDidMount` ne soit appelé). Le DOMElement est passé en entrée à la fonction.

``` js
class MyComponent extends React.Component {
  componentDidMount() {
    console.log(this.rootNode);
  }
  render() {
    return <div ref={node => this.rootNode = node}>
        Hello World
      </div>;
  }
}
```

### shouldComponentUpdate

Est appelé quand l'état ou les propriétés du composant changent. La méthode doit retourner une valeur booléenne pour indiquer à React si la méthode `render` doit être appelée ou non. C'est un moyen utile pour optimiser les performances.

``` js
shouldComponentUpdate(nextProps, nextState) {
  if(!this.codeMirror) {
    return true;
  }

  // La propriété "value" a changé:
  // mettre à jour le contenu de CodeMirror
  if(nextProps.value !== undefined
      && nextProps.value !== this.value
      && this._normalizeLineEndings(this.codeMirror.getValue())
          !== this._normalizeLineEndings(nextProps.value)) {

        this.value = nextProps.value;
        this.codeMirror.setValue(nextProps.value);
  }

  // La propriété "options" a changé:
  // mettre à jour les options de CodeMirror
  if(typeof nextProps.options === 'object') {
    for(let optionName in nextProps.options) {
      if(!nextProps.options.hasOwnProperty(optionName)) {
        continue;
      }
      var oldValue = this.codeMirror.getOption(optionName),
          newValue = nextProps.options[optionName];

      // L'option a changé, mettre à jour CodeMirror
      if(oldValue !== newValue && JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        this.codeMirror.setOption(optionName, newValue);
      }
    }
  }

  // Ne pas appeler render()
  return false;
}
```

[Exemple CodeMirror React](https://codepen.io/a-mt/pen/EXLerR?editors=0010)

### componentDidUpdate

Est appelée après que le DOM du composant ait été mis à jour. Cette méthode n'est pas appelée au premier `render()`. On peut notamment l'utiliser pour appeler une librairie sur le HTML généré.

``` js
/**
 * Preview has been updated : highlight code samples
 */
componentDidUpdate() {
  Highlight.highlightAll();
}
```

### componentWillUnmount

Est appelé juste avant que le composant ne soit retiré du DOM — quand on supprime l'élément ou quand on ferme la fenêtre.

Peut notamment être utilisé pour retirer des événements ajoutés dans `componentDidMount` ou stopper des timers / intervalles démarrés.

Video: [Stop Memory Leaks with componentWillUnmount](https://egghead.io/lessons/react-stop-memory-leaks-with-componentwillunmount-lifecycle-method-in-react)

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

---

## React côté serveur

React est une librairie JavaScript, on peut donc s'en servir côté serveur, avec Node. On utilise alors [`ReactDOMServer`](https://fr.reactjs.org/docs/react-dom-server.html).

``` js
ReactDOMServer.renderToString(<App />);
```

---

## Pour aller plus loin

* [React Component Patterns](https://kentcdodds.com/blog/learn-react-fundamentals-and-advanced-patterns)

* React-router  
  [Exemple React-router](https://codepen.io/a-mt/pen/LjLbmR?editors=1010)

{% endraw %}
