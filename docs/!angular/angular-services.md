---
title: Services
category: Web, JavaScript, Library, Angular
---

{% raw %}
Un service est simplement une classe où la logique de l'application est factorisée. Si plusieurs composants veulent pouvoir accéder aux mêmes données, effectuer le même type de calculs, se connecter à une base de données, etc, alors plutôt que de dupliquer du code, on utilise un service.

Un composant n'a pas à s'occuper d'instancier les services qu'il veut utiliser, ils sont injectés par le module: le composant reçoit directement une instance de classe en paramètre.

## Créer un service

* Utiliser Angular CLI

    ```
    # g pour generate
    # s pour service
    # db est le nom du service

    ng g s db
    ```

   Ou pour le faire manuellement, créer <ins>app/db.service.ts</ins>:

    ```
    import { Injectable } from '@angular/core';

    @Injectable({
      providedIn: 'root'
    })
    export class DbService {
    }
    ```

* La meta-donnée `providedIn` auto-enregistre le service dans le module root. Une autre possibilité est d'enregistrer le service manuellement au niveau du module:

  ``` diff
  +import DbService from './db.service';

  @NgModule({
    ...
  + providers: [DbService]
  })
  ```

* Ajouter sa logique dans le service.

    ```
    export class DbService {
      public getEmployees() {
        return [
          {"id": 1, "name": "Andrew", "age": 30},
          {"id": 2, "name": "Brandon", "age": 25},
          {"id": 3, "name": "Christina", "age": 26},
          {"id": 4, "name": "David", "age": 28},
          {"id": 5, "name": "Elena", "age": 24}
        ];
      }
    }
    ```

---

## Utiliser un service

* Pour utiliser un service enregistré, le composant doit

  1. Spécifier un paramètre de constructeur avec pour type la classe du service. Le service sera automatiquement passé au composant.

  2. Appeler le service dans le lifecycle hook `ngOnInit`.

  ``` ts
  import { Component, OnInit } from '@angular/core';
  import { DbService } from './db.service';

  @Component({
    selector: 'app-root',
    template: `<h1>Hello World</h1>
               <ul>
                 <li *ngFor="let employee of employees">
                   {{ employee.name }} ({{ employee.age }})
                 </li>
               </ul>`
  })
  export class AppComponent implements OnInit {
    employees = [];

    constructor(private dbService: DbService) {
    }

    ngOnInit() {
      this.employees = this.dbService.getEmployees();
    }
  }
  ```

* Dans l'exemple ci-dessus, on a utilisé un raccourci TypeScript: le compilateur TypeScript génère automatiquement une propriété pour chaque paramètre du constructeur et y attribue la valeur du paramètre:

  ```
  class Example {
    constructor(private test: string) {}
  }
  ```

  revient à

  ```
  class Example {
    private test;

    constructor(private test: string) {
      this.test = test;
    }
  }
  ```

---

## HTTP et Observable

Si on vaut remplacer les données statiques par un appel HTTP

1. Importer HttpClientModule dans le module

    ``` diff
    +import { HttpClientModule } from '@angular/common/http';

    @NgModule({
      ...
      imports: [
        BrowserModule,
    +   HttpClientModule
      ]
    })
    ```

2. Injecter HttpClient dans le service et utiliser la méthode get pour requêter un fichier distant. Pour caster le résultat, la fonction get prend un type générique en paramètre (spécifié entre chevrons):

    ``` ts
    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';

    interface Employee {
      id: number,
      name: string,
      age: number
    }

    @Injectable({
      providedIn: 'root'
    })
    export class DbService {
      constructor(private http: HttpClient) {}

      public getEmployees() {
        return this.http.get<Employee[]>("/assets/employees.json");
      }
    }
    ```

3. Au niveau du composant, la méthode getEmployees() retourne désormais un objet Observable. Ajouter un listener avec subscribe pour récupérer la liste des employés quand le fichier est reçu.

    ``` ts
    ngOnInit() {
      this.dbService.getEmployees().subscribe(data => {
        this.employees = data;
      });
    }
    ```

### Gérer les erreurs

* Pour gérer les erreurs, au niveau de la requête get, on peut utiliser catcherror et throwError

  ``` ts
  import { catchError } from 'rxjs/operators';
  import { throwError } from 'rxjs';

  ...
    public getEmployees() {
      return this.http
                 .get<Employee[]>("/assets/employees2.json")
                 .pipe(catchError(err => {
                   return throwError(err.message || 'Server error');
                 }));
    }
  }
  ```

* Au niveau du listener, subscribe accepte un deuxième argument, qui est le callback executé en cas d'erreur

  ``` ts
  ngOnInit() {
    this.dbService.getEmployees().subscribe(data => {
      this.employees = data;
    }, err => {
      console.error('Something went wrong', err);
    });
  }
  ```

---

## Subject

* Un service peut également être utilisé pour permettre à des composants de communiquer entre eux sans qu'ils soient forcemment liés hiérarchiquement. Pour ce faire, on s'appuie sur un objet Subject.

1. Créer un service avec une propriété de type Subject  
   Le subject est un observer: il permet de diffuser des notifications.

   A partir de cet observer, on crée un obversable: les composants pourrons ainsi ajouter un listener et recevoir les notifications du subject associé.  
  Par convention, les propriétés de type Observable sont suffixées d'un dollar.

    <ins>interact.service.ts</ins>:

    ``` ts
    import { Injectable } from '@angular/core';
    import { Subject } from 'rxjs';

    @Injectable({
      providedIn: 'root'
    })
    export class InteractService {
      private _source = new Subject<string>();
      public message$ = this._source.asObservable();

      sendMessage(value: string) {
        this._source.next(value);
      }
    }
    ```

2. Injecter le service dans le composant souhaitant envoyer des notifications et se servir de la méthode sendMessage() qu'on a crée dans le service.

    <ins>app.component.ts</ins>:

    ``` ts
    import { Component } from '@angular/core';
    import { InteractService } from './interact.service';

    @Component({
      selector: 'app-root',
      template: `<button (click)="greet()">Send message</button>
                 <app-child></app-child>`
    })
    export class AppComponent {
      constructor(private interactService: InteractService) {}

      greet() {
        this.interactService.sendMessage('Hello World');
      }
    }
    ```

3. Injecter le service dans les composants souhaitant recevoir des notifications et y ajouter un listener.

    <ins>child.component.ts</ins>:

    ``` ts
    import { Component, OnInit } from '@angular/core';
    import { InteractService } from './interact.service';

    @Component({
      selector: 'app-child',
      template: `<p>Child says: {{ message }}</p>`,
    })
    export class ChildComponent implements OnInit {
      message: string;

      constructor(private interactService: InteractService) {}

      ngOnInit() {
        this.interactService.message$.subscribe(message => {
          this.message = message;
        })
      }
    }
    ```

{% endraw %}