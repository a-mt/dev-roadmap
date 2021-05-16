---
title: Hooks
category: Web, JavaScript, Library, React
---

{% raw %}

## Qu'est-ce que React Hooks

* React Hooks est une nouvelle fonctionnalité, ajoutée partir de React 16.8, qui permet d'utiliser les fonctionnalités de React telles que l'état et les méthodes de cycle de vie au sein des composants fonctionnels.

* Les hooks ne fonctionnent qu'au sein des composants fonctionnels et non au sein des classes.

* React Hooks est à 100% rétro-compatible — l'utilisation des classes n'est pas déprécié.

<ins>Exemple de hook</ins>:

``` js
import React, { useState } from 'react';

const App = () => {
  const [age, setAge]   = useState(21);
  const [name, setName] = useState("Bob");

  return <div className="app">
      <p>Name: <input type="text" value={name}  onChange={(e) => setName(e.target.value)} /></p>
      <p>Age: <input type="text" value={age} onChange={(e) => setAge(e.target.value)} /></p>

      <p>State: age {age}, name {name}</p>
    </div>;
}
```

## Pourquoi utiliser des hooks

* Les hooks évitent toute confusion avec la valeur de `this`, puisqu'on ne s'en sert pas.

* Dans les classes, le code lié est dispersé dans différentes méthodes de cycle de vie (par exemple addEventListener dans componentDidMount et removeEventListener dans componentWillUnmount), tandis que du code sans aucun rapport se retrouve dans un même bloc de code. Avec les hooks, le code lié se trouve dans un seul et même bloc.

* On peut organiser la logique en unités isolées et réutilisables, sans avoir à utiliser des fonctionnalités avancées de React, ce qui rend le code plus simple à lire et maintenir.

---

## useState

* `useState` est un hook permettant d'utiliser un état dans un composant fonctionnel.

  <ins>Sans hook (état avec un composant classe)</ins>:

  ``` js
  class ClassCounter extends Component {
    state = { count: 0 }

    incrementCount = () => {
      this.setState({
        count: this.state.count+1
      });
    }
    render() {
      return <div>
        <button onClick={this.incrementCount}>
          Count {this.state.count}
        </button>
      </div>;
    }
  }
  ```

  <ins>Avec hook (état avec un composant fonctionnel)</ins>:

  ``` js
  import React, { useState } from 'react';

  function fctCounter() {

    // Prend en paramètre la valeur initiale de l'état
    // Retourne la valeur actuelle de l'état
    // et une méthode capable de mettre à jour l'état
    const [count, setCount] = useState(0);

    return <div>
      <button onClick={() => setCount(count+1)}>Count {count}</button>
    </div>;
  }
  ```

* Comme avec `setState`, la fonction mettant  jour l'état d'un composant fonctionnel est executée de manière asynchrone: la valeur de l'état entre l'appel et l'exécution de la fonction peut donc avoir changé. Pour éviter ce type de problème, plutôt que de passer une valeur en paramètre, on peut passer une fonction de callback:

  ```
  setCount(prevCount => prevCount+1)
  ```

* On peut utiliser un objet (ou tableau) comme état, mais React de fusionne pas automatiquement l'ancienne valeur avec la nouvelle, on doit le faire manuellement — ce qu'on peut facilement faire avec l'opérateur spread.

  ``` js
  const [name, setName] = useState({
    firstName : '',
    lastName  : ''
  })

  return <form>
    <input
      type="text"
      value={name.firstName}
      onChange={e => setName({...name, firstName: e.target.value})} />

    <input
      type="text"
      value={name.lastName}
      onChange={e => setName({...name, lastName: e.target.value})} />

    <h2>Your first name is "{name.firstName}"</h2>
    <h2>Your last name is "{name.lastName}"</h2>
  </form>
  ```

---

## useEffect

* Avec un composant classe, on peut utiliser des méthodes de cycle de vie pour récupérer des données via une API ou mettre en place un timer — c'est ce qu'on appelle des effets secondaires. `useEffect` est un hook qui permet d'effectuer des effets secondaires, de manière similaire à componentDidMount, componentDidUpdate et componentWillUnmount.

  <ins>Sans hook (effet avec un composant classe</ins>:

  ``` js
  class ClassEffect extends Component {
    state = { count: 0 }

    componentDidMount() {
      document.title = `Clicked ${this.state.count} times`;
    }
    componentDidUpdate(prevProps, prevState) {
      document.title = `Clicked ${this.state.count} times`;
    }
    render() {
      return <div>
        <button onClick={() => this.setState({ count: this.state.count+1 })}>
          Clicked {this.state.count} times
        </button>
      </div>;
    }
  }
  ```

  <ins>Avec hook (effet avec un composant fonctionnel</ins>:

  ``` js
  import React, { useState, useEffect } from 'react';

  function fctEffect() {
    const [count, setCount] = useState(0);

    // Prend en paramètre une fonction
    // Exécutée après chaque render du composant
    useEffect(() => {
      document.title = `You clicked ${count} times`;
    });

    return <div>
      <button onClick={() => setCount(count+1)}>
        Clicked {count} times
      </button>
    </div>;
  }
  ```

### Éxecuter conditionnellement

* Le callback est appelé après chaque render, ce qui peut créer un problème de performance. Pour l'éviter, on peut:

  <ins>Sans hook</ins>:  
  Comparer l'état précédant avec l'état actuel

  ``` js
  componentDidUpdate(prevProps, prevState) {
    if(prevState.count != this.state.count) {
      console.log('Update title');
      document.title = `Clicked ${this.state.count} times`;
    }
  }
  ```

  <ins>Avec hook</ins>:  
  Spécifier les dépendances du callback: React n'executera le callback que si la valeur d'au moins une dépendance a changé.

  ``` js
  useEffect(() => {
    console.log('Update title');
    document.title = `You clicked ${count} times`;
  }, [count]);
  ```

### Éxecuter une seule fois

* Pour n'executer le callback de useEffect une seule fois:

  <ins>Sans hook</ins>:  
  Utiliser componentDidMount

   ``` js
  componentDidMount() {
    window.addEventListener('mousemove', this.logMousePosition);
  }
  ```

  <ins>Avec hook</ins>:  
  Passer un tableau de dépendances vide

  ``` js
  useEffect(() => {
    window.addEventListener('mousemove', logMousePosition);
  }, []);
  ```

### Éxecuter au démontage

* Si on veut exécuter un effet secondaire lorsque le composant est retiré du DOM

  <ins>Sans hook</ins>:  
  Utiliser componentWillUnmount

  ``` js
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.logMousePosition);
  }
  ```

  <ins>Avec hook</ins>:  
  Le callback de useEffect peut retourner une fonction, qui sera executée lorsque le composant sera démonté.

  ``` js
  useEffect(() => {
    window.addEventListener('mousemove', logMousePosition);

    return () => {
      window.removeEventListener('mousemove', logMousePosition);
    };
  }, []);
  ```

### Multiples effets

* On peut (et il est conseillé) d'inclure plusieurs appels useEffect dans un même composant. Ça permet de regrouper ensemble le code qui est lié.

  ``` js
  function FriendStatusWithCounter(props) {

    // Update count
    const [count, setCount] = useState(0);

    useEffect(() => {
      document.title = `You clicked ${count} times`
    });

    // Update friend status
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {
      function handleStatusChange(status) {
        setIsOnline(status.isOnline);
      }
      ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

      return () => {
        ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
      };
    });
  }
  ```

---

## useContext

* `useContext` est un hook qui permet de simplifier l'accès au contexte. Les deux premières étapes: 1. créer un contexte, et 2. définir la valeur du contexte, restent les mêmes avec ou sans hook.

  <ins>Sans hook</ins>:

  ``` js
  // Créer le contexte
  const UserContext    = React.createContext(),
        ChannelContext = React.createContext();

  // Définir la valeur du contexte
  function App() {
    return <div>
      <UserContext.Provider value={'Bob'}>
        <ChannelContext.Provider value={'Codevolution'}>
          <ComponentC />
        </ChannelContext.Provider>
      </UserContext.Provider>
    </div>;
  }

  // Acccéder au contexte
  function ComponentC() {
    return <div>
      <UserContext.Consumer>{ user =>
        <ChannelContext.Consumer>{ channel =>
          <div>User: {user}, channel: {channel}</div>
        }</ChannelContext.Consumer>
      }</UserContext.Consumer>
    </div>;
  }
  ```

  <ins>Avec hook</ins>:

  ``` js
  import React, { useContext } from 'react';

  function ComponentC() {
    const user    = useContext(UserContext);
    const channel = useContext(ChannelContext);

    return <div>{user} — {channel}</div>
  }
  ```

---

## useReducer

* `useReducer` est un hook utilisé pour gérer l'état d'un composant fonctionnel. C'est une alternative à useState — useState est en fait construit en utilisant useReducer. Son fonctionnement est très similaire à Redux.

  <ins>Spécifications</ins>:

  ``` js
  /**
   * @param function reducer           - Fonction reducer (specs ci-dessous)
   * @param mixed    initialState      - Valeur initiale de l'état
   * @return array
                     mixed newState    - Valeur courante de l'état (retournée par la fonction reducer)
                     function dispatch - Fonction permettant de déclencher la mise à jour de l'état
   */
  [newState, dispatch] = useReducer(reducer, initialState)

  /**
   * @param mixed currentState         - Valeur courante de l'état
   * @param mixed action               - Stipule la mise à jour à effectuer
   * @return mixed newState            - Nouvelle valeur de l'état
   */
  newState = reducer(currentState, action)
  ```

  <ins>Exemple avec un scalaire</ins>:

  ``` js
  import React, { useReducer } from 'react';

  const initialState = 0;
  const reducer = (state, action) => {
    switch(action) {
      case 'increment': return state+1;
      case 'reset': return 0;
      default: return state;
    }
  };

  function Counter() {
    const [count, dispatch] = useReducer(reducer, initialState);

    return <div>
      <button onClick={() => dispatch('increment')}>You clicked {count} times</button>
      <button onClick={() => dispatch('reset')}>Reset</button>
    </div>;
  }
  ```

  <ins>Exemple avec un objet</ins>:

  ``` js
  const initialState = {
    firstCounter: 0,
  };
  const reducer = (state, action) => {
    switch(action.type) {
      case 'increment': return {firstCounter: state.firstCounter+action.value};
      case 'reset': return {firstCounter: 0};
      default: return state;
    }
  };

    function Counter() {
      const [count, dispatch] = useReducer(reducer, initialState);

      return <div>
        <button onClick={() => dispatch({type: 'increment', value: 1})}>You clicked {count.firstCounter} times</button>
        <button onClick={() => dispatch({type: 'increment', value: 5})}>Increment+5</button>
        <button onClick={() => dispatch({type: 'reset'})}>Reset</button>
      </div>;
    }
  ```

* Notons qu'on peut utiliser une même fonction reducer pour différents hooks useReducer — puisqu'il s'agit d'une fonction pure, elle ne stocke pas l'état courant.

### useReducer avec useContext

* On peut facilement partager l'état entre les composants aux différents niveaux de la hiérarchie avec useContext.


  ``` js
  export const CountContext = React.createContext;

  const initialState = 0;
  // ...

  function App() {
    const [count, dispatch] = useReducer(reducer, initialState);

    return <CountContext.Provider value={countState: count, countDispatch: dispatch}>
      <div>
        Count: {count}
        <Component />
      </div>
    </CountContext.Provider>;
  }
  ```

  ``` js
  import React, { useContext } from 'react';
  import { CountContext } from '../App';

  function Component() {
    const countContext = useContext(CountContext);

    return <div>
      <button onClick={() => countContext.countDispatch('increment')}>You clicked {countContext.countState} times</button>
      <button onClick={() => countContext.countDispatch('reset')}>Reset</button>
    </div>;
  }
  ```

---

## useCallback

* Les fonctions à l'intérieur d'un composant fonctionnel sont redéfinies à chaque nouveau render, et même si deux fonctions font exactement la même chose, elles ne sont pas pour autant égales.

  Par conséquent, si on passe en propriété une fonction définie dans le composant parent à un composant enfant, React considère que la propriété change à chaque fois et recharge le composant enfant à chaque fois, y compris quand on l'a encapsulé avec React.memo.

  ```
  export default React.memo(Button);
  ```

  useCallback est un hook renvoyant la version mémorisée d'une fonction de callback: la fonction n'est re-définie que si une de ses dépendances a changé. C'est utile pour passer des callbacks à des composants enfants qui reposent sur le test d'égalité pour éviter des render inutiles.

  ``` js
  import React, { useState, useCallback } from react';

  function ParentComponent() {
    const [age, setAge]       = useState(25);
    const [salary, setSalary] = useState(50000);

    const incrementAge = useCallback(() => {
      setAge(age+1);
    }, [age]);

    const incrementSalary = useCallback(() => {
      setSalary(salary+1000);
    }, [salary]);

    return <div>
      <p>Age: {age}, salary: {salary}</p>
      <Button handleClick={incrementAge}>Increment Age</Button>
      <Button handleClick={incrementSalary}>Increment Salary</Button>
    </div>;
  }
  ```

---

## useMemo

* `useMemo` est un hook qui sert également à améliorer les performances. Tandis que useCallback met en cache l'instance de la fonction fournie, useMemo invoque la fonction fournie et met en cache son résultat.

  ``` js
  import React, { useState, useMemo } from 'react';

  function Counter() {
    const [counterOne, setCounterOne] = useState(0);
    const [counterTwo, setCounterTwo] = useState(0);

    const incrementOne = () => { setCounterOne(counterOne+1); };
    const incrementTwo = () => { setCounterTwo(counterTwo+1); };

    const isEven = useMemo(() => {
      let i = 0;
      while(i < 2000000000) i++;
      return counterOne % 2 == 0;
    }, [counterOne]);

    return <div>
      <div>
        <button onClick={incrementOne}>{counterOne}</button>
        <span>{isEven ? ' Even' : ' Odd'}</span>
      </div>
      <div>
        <button onClick={incrementTwo}>{counterTwo}</button>
      </div>
    </div>;
  }
  ```

---

## useRef

* `useRef` permet d'accéder aux éléments du DOM.


  ``` js
  import  React, { useEffect, useRef } from 'react';

  function FocusInput() {

    // Créer la référence
    const inputRef = useRef(null);

    // Utiliser la référence
    useEffect(() => {
      inputRef.current.focus();
    }, []);

    // Attacher la référence (avec l'attribut ref)
    return <div>
      <input ref={inputRef} type="text" />
    </div>;
  }
  ```

* On peut également utiliser une référence pour stocker n'importe quelle valeur. La valeur persistera à travers les render, en ne causera pas de nouveau render lorsque sa valeur change.

  ``` js
  function HookTimer() {
    const [timer, setTimer] = useState(0);
    const intervalRef = useRef();

    useEffect(() => {
      intervalRef.current = setInterval(() => {
        setTimer(prevTimer => prevTimer+1);
      }, 1000);

      return () => {
        clearInterval(intervalRef.current);
      };
    }, []);

    return <div>
      Timer — {timer}
      <button onClick={() => clearInterval(intervalRef.current)}>Clear interval</button>
    </div>;
  }
  ```

{% endraw %}