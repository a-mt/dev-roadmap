---
title: Les bases
category: Web, JavaScript, Library, Angular
---

{% raw %}
## Qu'est-ce que c'est

* Angular est un framework open-source développé par Google, qui permet de construire des applications front-end single page — le contenu de la page est rafraichit par manière asynchrone, sans avoir à recharger la page entière.

* La première version d'Angular, sortie en 2010, est écrite en JavaScript. On l'appelle couramment "AngularJs".  
  La deuxième version d'Angular, sortie en 2016, est écrite en TypeScript — qui est un superset de JavaScript ajoutant le typage des données. On appelle couramment la version 2 et les versions qui suivent "Angular" tout court.

* L'équipe de Google met à jour Angular deux fois par an. Mais les concepts d'Angular ne changent pas à chaque changement de version — c'est souvent des optimisations ou de nouvelles fonctionnalités.

  On peut utiliser [update.angular.io](https://update.angular.io/) pour vérifier les changements à apporter pour passer d'une application utilisant la version X d'Angular à la version Y.

---

## Installer

* Pour développer une application Angular, il faut nécessairement l'écrire en local et compiler le code TypeScript en JavaScript. Il n'y a donc pas de CDN disponible.

* Installer node

  ```
  node -v
  npm -v
  ```

* Installer Angular CLI

  ```
  npm install -g @angular/cli
  ng -v
  ```

* Créer une application

  ```
  ng new ng-app
  ng-app
  ```

* Lancer l'application

  ```
  ng serve
  ```

  Aller sur localhost:4200

---

## Architecture

* À la racine se trouvent des meta-fichiers qui contiennent les configurations du projet — configurations typescript, karma, npm, linters, etc.  
  Le projet à proprement parler se trouve dans le répertoire `src/`

* <ins>src/index.html</ins>:  
  Fichier HTML envoyé au client.  
  Contient le container HTML (`<app-root>`) dans lequel sera injecté le contenu de l'application.  
  Le serveur insère automatiquement les scripts nécessaires pour le fonctionnement de l'application.

  ``` html
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>NgApp</title>
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
  </head>
  <body>
    <app-root></app-root>
  </body>
  </html>
  ```

* <ins>src/main.ts</ins>:  
  Entrypoint de l'application.  
  Charge le module racine, `AppModule`.

* <ins>src/app/app.module.ts</ins>:  
  Module racine.  
  Un module sert à charger un composant et ses dépendances — d'autres composants, des services, un router, etc.

* <ins>src/app/app.component.ts</ins>:  
  Composant chargé par le module racine.  
  Par convention, on l'appelle `AppComponent` et il a pour tag `app-root`. Il s'agit du composant inclut dans le fichier HTML. Tous les autres composants seront des enfants de ce composant.

  Un composant se charge du contenu d'une vue et de sa logique.  
  Tout composant contient
  - une classe (écrite en TypeScript), qui contient les données et méthodes du composant.  
    Cette classe doit être exportée pour pouvoir être chargée par le module.

  - des meta-données, qui spécifient le contenu de la vue.  
    Les meta-données sont passées en paramètre à un décorateur (qui est une fonctionnalité de TypeScript): il s'agit d'une fonction qui s'attache à la classe située juste en-dessous. Le décorateur `@Component` indique à Angular que la classe exportée n'est pas une simple classe mais un composant.

  ``` ts
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent {
    title = 'ng-app';
  }
  ```

* <ins>src/app/app.component.spec.ts</ins>:  
  Contient les tests unitaires du composant.

---

## Meta-données d'un composant

Dans les meta-données d'un composant, on trouve le sélecteur, le template et le style du composant.

### Sélecteur

Le sélecteur spécifie quel HTML permet d'inclure le composant. Ce peut être

- un tag

  ``` js
  selector: 'app-child'  // <app-child>
  ```

- une classe

  ``` js
  selector: '.app-child' // <div class="app-child"></div>
  ```

- ou un attribut

  ``` js
  selector: '[app-child]' // <div app-child></div>
  ```

Quand Angular trouve un élément HTML qui correspond au sélecteur d'un composant, alors il remplace cet élément par le template de ce composant.

### Template

Le template spécifie le contenu de la vue. On peut utiliser

- un fichier .html

  ``` js
  templateUrl: './app.component.html',
  ```

- ou directement du HTML

  ``` js
  template: '<h1>Hello World</h1>'
  ```

### Style

Spécifie le style du composant. Il ne s'applique que sur le composant et ses descendants et non sur le reste de la page. On peut utiliser

* un ou des fichiers .css

  ``` js
  styleUrls: ['./app.component.css']
  ```

* ou directement du CSS

  ``` js
  styles: [`h1 { color: red; }`]
  ```

---

## Définir des données et méthodes

* Les propriétés et méthodes de la classe sont accessibles directement dans le template, on peut les interpoler par des accolades.

  ```
  @Component({
    selector: 'app-root',
    template: '<h1>Hello {{ username }}</h1>',
  })
  export class AppComponent {
    username = "Bob";
  }
  ```

  ```
    template: '<h1>{{ greet() }}</h1>',
  })
  export class AppComponent {
    username = "Bob";

    greet() {
      return `Hello ${this.username}`;
    }
  }
  ```

* Le contenu des accolades est parsé par le compilateur Angular. Il n'est pas possible d'y utiliser des assignements ou des templates litterals (lève un Parser Error), mais on peut utiliser la concaténation.

  ```
  @Component({
    selector: 'app-root',
    template: 'There {{ count==1 ? "is 1 item" : "are " + count + " items" }}',
  })
  export class AppComponent {
    count = 0;
  }
  ```

* Le template n'a pas directement accès aux variables globales (window, screen, etc), mais la classe oui.

  ```
  @Component({
    selector: 'app-root',
    template: '<h1>{{ siteUrl }}</h1>',
  })
  export class AppComponent {
    siteUrl = window.location.href;
  }
  ```

### Pipes

* On peut utiliser des filtres pour modifier les données avant qu'elles ne soient affichées — ça ne change pas la valeur de la variable, uniquement l'affichage.


  ```
  {{ "Hello WORLD" | lowercase }}    # hello world
  {{ "Hello WORLD" | uppercase }}    # HELLO WORLD
  {{ "Hello WORLD" | titlecase }}    # Hello World
  {{ "Hello World" | slice:3 }}      # lo World
  {{ "Hello World" | slice:3:5 }}    # lo
  ```

  ```
  {{ user | json }}                  # { "firstName": "Bruce", "lastName": "Wayne" }
  ```

  ```
  # number:'pad left.pad right-truncate right'

  {{ 5.678 | number:'3.4-5' }}       # 005.6870
  {{ 5.678 | number:'1.1-2' }}       # 5.69

  {{ 0.25 | percent }}               # 25%
  {{ 0.25 | currency:'EUR' }}        # €0.25
  {{ 0.25 | currency:'EUR':'code' }} # EUR0.25
  ```

  ```
  {{ date | date:'short' }}          # 12/3/17, 9:49 PM
  {{ date | date:'shortDate' }}      # 12/3/17
  {{ date | date:'shortTime' }}      # 9:49 PM
  ```

  [Liste des formats de date](https://www.angularjswiki.com/angular/angular-date-pipe-formatting-date-times-in-angular-with-examples/#list-of-all-predefined-date-formats-in-angular)

---

## Écouter des événements

* Pour exécuter du code Angular lorsqu'un événement est déclenché, on entoure le nom de l'événement entre parenthèses:

  ```
  @Component({
    selector: 'app-root',
    template: '<button (click)="increment()">You clicked {{ count }} times</button>',
  })
  export class AppComponent {
    count = 0;

    increment() {
      this.count += 1;
    }
  }
  ```

  Il n'est pas possible d'effectuer une assignation directement dans le template, même pour un événement: il faut appeller une méthode. La vue est automatiquement mise à jour quand on met à jour une propriété.

* On peut récupérer l'événement déclenché avec la variable spéciale `$event`

  ```
  @Component({
    selector: 'app-root',
    template: '<button (click)="handleClick($event)">Click</button>',
  })
  export class AppComponent {
    handleClick(e) {
      console.log(e);
    }
  }
  ```

---

## Définir des propriétés DOM

<!--
* Un attribut HTML n'est lu qu'une seule fois par le navigateur, pour initialiser l'état de l'élément. Une fois initialisé, modifier la valeur de l'attribut ne change pas l'état du composant: c'est la valeur de la propriété DOM qui contrôle l'état de l'élément. Par exemple, `input.setAttribute('value', 'mavaleur')` ne changera plus le texte dans l'input après qu'il ait été ajouté à la page, `input.value = 'mavaleur'` oui. Même principe pour disabled, checked, etc.
-->

* Pour définir la valeur d'une propriété DOM avec Angular, on utilise les crochets:

  ```
  @Component({
    selector: 'app-root',
    template: `<input [disabled]="isDisabled">
               <button (click)="toggle()">Toggle</button>`,
  })
  export class AppComponent {
    isDisabled = false;

    toggle() {
      this.isDisabled = !this.isDisabled;
    }
  }
  ```

  Les crochets sont un raccourci pour `bind-attrname`:

  ```
  <input bind-disabled="isDisabled">
  ```

* Utiliser l'interpolation ne marchera correctement qu'avec les propriétés qui prennent une chaîne de caractères pour valeur, puisque l'interpolation caste le résultat en string — on ne peut pas l'utiliser avec disabled, checked, etc.

  ```
  @Component({
    selector: 'app-root',
    template: `<input value="{{ value }}">
               <button (click)="randomValue()">Random</button>`,
  })
  export class AppComponent {
    value = '';

    constructor() {
      this.randomValue();
    }
    randomValue() {
      this.value = this._getRandomValue(10);
    }
    private _getRandomValue(k) {
      return Math.random().toString(16).substr(2, k);
    }
  }
  ```

* Si on définit à la fois une propriété calculée et une propriété statique, alors la propriété calculée écrase la statique. Dans l'exemple ci-dessous, Hello World est affiché en rouge.

  ```
  @Component({
    selector: 'app-root',
    template: `<h1 [class]="'red'" class="blue">Hello World</h1>`,
    styles: [`.blue { color: blue}
             .red  { color: red }`]
  })
  export class AppComponent {
  }
  ```

### Attribut class

* On peut appliquer une classe ou non suivant la valeur d'un booléen:

  ```
  @Component({
    selector: 'app-root',
    template: `<h1 [class.error]="hasError"
                   [class.promoted]="isPromoted">Hello World</h1>`,
    styles: [`.error { color: red }
              .promoted { font-style: italic }`]
  })
  export class AppComponent {
    hasError   = true;
    isPromoted = false;
  }
  ```

* On peut utiliser la propriété ngClass pour passer un objet, où la clé est une classe CSS et la valeur un booléen spécifiant si elle doit être ajoutée ou non.

  ```
  @Component({
    selector: 'app-root',
    template: `<h1 [ngClass]="classes">Hello World</h1>`,
    styles: [`.error { color: red }
              .promoted { font-style: italic }`]
  })
  export class AppComponent {
    hasError   = true;
    isPromoted = false;

    classes = {
      error   : this.hasError,
      promoted: this.isPromoted
    }
  }
  ```

### Attribut style

* On peut également définir des propriétés de style:

  ```
  @Component({
    selector: 'app-root',
    template: `<h1 [style.color]="hasError ? 'red' : 'blue'">Hello World</h1>`
  })
  export class AppComponent {
    hasError = true;
  }
  ```

* Et utiliser la propriété ngStyle pour passer un objet

  ```
  @Component({
    selector: 'app-root',
    template: `<h1 [ngStyle]="styles">Hello World</h1>`
  })
  export class AppComponent {
    styles = {
      color    : 'red',
      fontStyle: 'italic'
    };
  }
  ```

---

## Références

* On peut créer une référence sur un élément en utilisant un hash, ce qui permet d'avoir accès à un élément DOM.

  ```
  @Component({
    selector: 'app-root',
    template: `Username: <input #myInput value="Bob">
               <button (click)="submit(myInput.value)">Submit</button>`
  })
  export class AppComponent {
    submit(value) {
      alert('Hello ' + value);
    }
  }
  ```

* Pour accéder à une référence à partir d'une classe, on déclare une propriété de type ElementRef sur laquelle on applique le décorateur ViewChild. Le décorateur prend en paramètre le nom de la référence dans le template.

  Pour accéder à la référence injectée par le décorateur ViewChild, on utilise le lifecycle hook afterViewInit et l'élément DOM est disponible dans la propriété nativeElement.

  ``` ts
  import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

  @Component({
    selector: 'app-root',
    template: `Username: <input #myInput value="Bob">
               <button (click)="submit(myInput.value)">Submit</button>`
  })
  export class AppComponent implements AfterViewInit {
    @ViewChild('myInput') inputRef: ElementRef;

    submit(value) {
      alert('Hello ' + value);
    }
    ngAfterViewInit() {
      this.inputRef.nativeElement.focus();
    }
  }
  ```
  
---

## Directives structurelles

* Les directives structurelles permettent d'ajouter ou d'enlever des éléments du DOM.

### ngIf

* Est utilisée pour ajouter un élément sous condition.

  ```
  @Component({
    selector: 'app-root',
    template: `<h1 *ngIf="showElement">Hello World</h1>
               <button (click)="toggle()">Toggle</button>`
  })
  export class AppComponent {
    showElement = true;

    toggle() {
      this.showElement = !this.showElement;
    }
  }
  ```

* On peut également cibler une référence vers un élément `<ng-template>`.  
  Le contenu du template remplace l'élément portant le ngIf.

  ```
  @Component({
    selector: 'app-root',
    template: `<div *ngIf="showElement; then thenBlock; else elseBlock"></div>

               <ng-template #thenBlock>
                 <h1>Hello World</h1>
               </ng-template>

               <ng-template #elseBlock>
                 <p>The content is hidden</p>
               </ng-template>

               <button (click)="toggle()">Toggle</button>`
  })
  export class AppComponent {
    showElement = true;

    toggle() {
      this.showElement = !this.showElement;
    }
  }
  ```

### ngSwitch

* Est utilisé pour ajouter un élément en utilisant une instruction switch.

  ```
  @Component({
    selector: 'app-root',
    template: `<div [ngSwitch]="color">
                 <p *ngSwitchCase="'r'">Red</p>
                 <p *ngSwitchCase="'g'">Green</p>
                 <p *ngSwitchDefault>Blue</p>
               </div>`
  })
  export class AppComponent {
    color = 'b';
  }
  ```

### ngFor

* Est utilisé pour boucler sur une liste.

  ```
  @Component({
    selector: 'app-root',
    template: `<div *ngFor="let color of colors">
                 <p>{{ color }}</p>
               </div>`
  })
  export class AppComponent {
    colors = ['red', 'green', 'blue'];
  }
  ```

* On peut accéder à l'index en cours (à partir de 0) ainsi qu'aux variables `first`, `last`, `even` et `odd`:

  ``` ts
  @Component({
    selector: 'app-root',
    template: `<div *ngFor="let color of colors; index as i;
                                                 first as isFirst;
                                                 last as isLast;
                                                 even as isEven;
                                                 odd as isOdd">
                 <p [class.isFirst]="isFirst"
                    [class.isLast]="isLast"
                    [class.isEven]="isEven"
                    [class.isOdd]="isOdd">
                    {{ i }} {{ color }}</p>
               </div>`
  })
  export class AppComponent {
    colors = ['red', 'green', 'blue'];
  }
  ```

{% endraw %}