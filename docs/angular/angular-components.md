---
title: Composants enfants
category: Web, JavaScript, Library, Angular
---

{% raw %}
## Créer un composant

* Pour créer un composant, on peut utiliser Angular CLI:  

  ```
  # g pour generate
  # c pour componant
  # child est le nom du composant
  # -it pour inline template
  # -is pour inline style

  ng g c child -it -is
  ```

* Ou pour le faire manuellement  
  Créer <ins>app/child/child.component.ts</ins>:

  ```
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-child',
    template: `<p>child works!</p>`,
  })
  export class ChildComponent {}
  ```

  Et charger le composant dans le module, <ins>app/app.module.ts</ins>:

  ``` diff
  +import { ChildComponent } from './child/child.component';

  @NgModule({
    declarations: [
      AppComponent,
  +   ChildComponent
    ],
    ...
  ```

---

## Imbriquer des composants

* Les composants peuvent inclure d'autres composants (pourvu que le module charge des composants) en ajoutant un élément correspondant au sélecteur du composant souhaité — généralement, un tag.

  ```
  @Component({
    selector: 'app-root',
    template: `<h1>Hello World</h1>
               <app-child></app-child>`
  })
  export class AppComponent {
  }
  ```

---

## Passer des propriétés

* Un parent peut passer des propriétés à un composant inclut:

  <ins>app.component</ins>:

  ```
  @Component({
    selector: 'app-root',
    template: `<h1>Hello {{ username }}</h1>
               <app-child [parentData]="username"></app-child>`
  })
  export class AppComponent {
    username = "Bob";
  }
  ```

* Le composant inclut doit déclarer cette propriété en entrée avec le décorateur de propriété `@Input`:

  <ins>child.component</ins>:

  ```
  import { Component, Input } from '@angular/core';

  @Component({
    selector: 'app-child',
    template: `<p>{{ parentData }}!</p>`,
  })
  export class ChildComponent {
    @Input() public parentData;
  }
  ```

  On peut spécifier un alias pour utiliser un nom de propriété différent dans le composant enfant:

  ```
  @Component({
    selector: 'app-child',
    template: `<p>{{ value }}!</p>`,
  })
  export class ChildComponent {
    @Input('parentData') public value;
  }
  ```

### Intercepter des données

* Si on veut intercepter les données passées par le parent (pour executer du code supplémentaire), alors on applique le décorateur @Input sur un setter.

  ```
  @Component({
    selector: 'app-child',
    template: `<p>{{ value }}!</p>`,
  })
  export class ChildComponent {
    private _value: string;

    get value(): string {
      return this._value;
    }
    set value(val: string) {
      this._value = val;
      // Trigger the action you want
    }
  }
  ```

* Une autre alternative est d'utiliser le lifecycle hook ngOnChanges.

  ``` ts
  import { Component, OnChanges, SimpleChanges } from '@angular/core';

  @Component({
    selector: 'app-child',
    template: `<p>{{ value }}!</p>`,
  })
  export class ChildComponent {
    @Input('parentData') public value;

    ngOnChanges(changes: SimpleChanges) {
      console.log(changes);
      // value: Object { previousValue: undefined, currentValue: "Bob", firstChange: true }
    }
  }
  ```

---

## Événements personnalisés

* Un composant peut faire remonter des données aux composants parents en émettant un événement personnalisé

1. Dans le composant enfant:  
   Déclarer une propriété qui est une instance de `EventEmitter` et avec le décorateur `@Output`. Appeler la méthode `emit` sur cet objet pour déclencher un événement.

    <ins>child.component</ins>:

    ```
    import { Component, Output, EventEmitter } from '@angular/core';

    @Component({
      selector: 'app-child',
      template: `<button (click)="handleClick()">Click</button>`,
    })
    export class ChildComponent {
      @Output() public clickEvent = new EventEmitter();

      handleClick() {
        this.clickEvent.emit('My message');
      }
    }
    ```

2. Dans le composant parent:  
   Écouter l'événement personnalisé.  
   Les données envoyées avec l'événement peuvent être récupérées avec $event.

    <ins>app.component</ins>:

    ```
    @Component({
      selector: 'app-root',
      template: `<h1>Hello World</h1>
                 <app-child (clickEvent)="log($event)"></app-child>`
    })
    export class AppComponent {
      log(data) {
        alert(data);
      }
    }
    ```

---

## Référence sur un composant

* Le composant parent peut accéder à toutes les propriétés et méthodes publiques d'un composant enfant en utilisant une référence.

  <ins>child.component.ts</ins>:
  ```
  @Component({
    selector: 'app-child',
    template: `<p>Child says: {{ username }}</p>`,
  })
  export class ChildComponent {
    username = "Bob"
  }
  ```

  <ins>app.component.ts</ins>:
  ```
  @Component({
    selector: 'app-root',
    template: `<app-child #child></app-child>
               <p>Parent says: {{ child.username }}</p>`
  })
  export class AppComponent  {
  }
  ```

* Le composant parent peut également modifier les valeurs des propriétés publiques.

  ``` ts
  import { Component, ViewChild, AfterViewInit } from '@angular/core';
  import { ChildComponent } from './child.component';

  @Component({
    selector: 'app-root',
    template: `<app-child #child></app-child>
               <p>Parent says: {{ child.username }}</p>`
  })
  export class AppComponent implements AfterViewInit {
    @ViewChild('child') child: ChildComponent

    ngAfterViewInit() {
      this.child.username = 'Alice';
    }
  }
  ```

{% endraw %}