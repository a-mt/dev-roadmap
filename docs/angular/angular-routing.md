---
title: Routing
category: Web, JavaScript, Library, Angular
---

{% raw %}
Pour naviguer entre les différentes vues, on utilise le router Angular.

## Mettre en place le routeur

1. Créer un module app-routing qui importe le router et le lie à un objet Routes — il contiendra les spécifications des routes.

    <ins>app/app-routing.module.ts</ins>

    ``` ts
    import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';

    const routes: Routes = []

    @NgModule({
      imports: [
        RouterModule.forRoot(routes)
      ],
      exports: [
        RouterModule
      ]
    })
    export class AppRoutingModule { }
    export const routingComponents = [];
    ```

2. Inclure le module de routing dans le module racine  

   <ins>app/app.module.ts</ins>

    ``` diff
    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    +import { AppRoutingModule, routingComponents } from './app-routing.module';

    import { AppComponent } from './app.component';

    @NgModule({
      declarations: [
        AppComponent,
    +   routingComponents
      ],
      imports: [
        BrowserModule,
    +   AppRoutingModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```

3. Dans le fichier <ins>index.html</ins>, ajouter le tag base:

    ``` diff
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Routing demo</title>
    +   <base href="/">
    ```

4. Dans le composant racine, ajouter un tag `router-outlet`. Il sera remplacé par le composant correspondant à la route en cours.

   <ins>app/app.component.ts</ins>:

    ``` ts
    @Component({
      selector: 'app-root',
      template: `<h1>Hello World</h1>
                 <router-outlet></router-outlet>`
    })
    export class AppComponent {
    }
    ```

---

## Configurer les routes

### Composants

* On va utiliser ces composants:

  <ins>home.component.ts</ins>

  ``` ts
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-home',
    template: `<p>This is the home view</p>`,
  })
  export class HomeComponent {
  }
  ```

  <ins>employeeList.component.ts</ins>:

  ``` ts
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-employeeList',
    template: `<p>This is the employeeList view</p>
               <ul>
                 <li *ngFor="let employee of employees">
                   {{ employee.name }} ({{ employee.age }})
                 </li>
               </ul>`,
  })
  export class EmployeeListComponent {
    employees = [
      {"id": 1, "name": "Andrew", "age": 30},
      {"id": 2, "name": "Brandon", "age": 25},
      {"id": 3, "name": "Christina", "age": 26},
      {"id": 4, "name": "David", "age": 28},
      {"id": 5, "name": "Elena", "age": 24}
    ];
  }
  ```

  <ins>err404.component.ts</ins>

  ``` ts
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-err404',
    template: `<p>Page Not Found</p>`
  })
  export class Err404Component {
  }
  ```

### Configuration

* Spécifier la route et le composant associé parmi la liste des routes  
  <ins>app-routing.module.ts</ins>

  ``` ts
  import { HomeComponent } from './home.component';
  import { EmployeeListComponent } from './employeeList.component';
  import { Err404Component } from './err404.component';

  const routes: Routes = [
    { path: '',          component: HomeComponent },
    { path: 'employees', component: EmployeeListComponent },
    { path: '**',        component: Err404Component },
  ];

  ...

  export const routingComponents = [
    HomeComponent,
    EmployeeListComponent,
    Err404Component
  ];
  ```

### Navigation

* Ajouter une navigation au composant racine  
  <ins>app.component.ts</ins>

  ``` ts
  @Component({
    selector: 'app-root',
    template: `<h1>Hello World</h1>
               <nav>
                 <a routerLink="/"          routerLinkActive="active">Home</a>
                 <a routerLink="/employees" routerLinkActive="active">Employees</a>
               </nav>
               <router-outlet></router-outlet>`
  })
  export class AppComponent {
  }
  ```

* Si l'utilisateur entre manuellement une URL qui n'est pas reconnue, on lui affiche la page 404 configurée précédemment.

---

## Utiliser des paramètres

* Pour déclarer un paramètre dans le path, on utilise le deux-points:

  ``` ts
  import { EmployeeComponent } from './employee.component';

  const routes: Routes = [
    { path: '',              component: HomeComponent },
    { path: 'employees',     component: EmployeeListComponent },
    { path: 'employees/:id', component: EmployeeComponent },
    { path: '**',            component: Err404Component },
  ];

  export const routingComponents = [
    HomeComponent,
    EmployeeListComponent,
    EmployeeComponent,
    Err404Component
  ];
  ```

* Pour spécifier un lien avec des paramètres dans le path, on évalue un tableau:

  ``` ts
  `<!-- /employees/1 -->
   <a [routerLink]="['/employees', employee.id]">
     {{ employee.name }} ({{ employee.age }})
   </a>`
  ```

  Le dernier élément du tableau peut être un objet qui contient des paramètres optionnels:

  ``` ts
  `<!-- /employees/4;opt=OK -->
   <a [routerLink]="['/employees', employee.id, {opt: 'OK'}]">
     {{ employee.name }} ({{ employee.age }})
   </a>`
  ```

* Pour accéder aux paramètres de l'URL en cours, on utilise le service ActivatedRoute  
  <ins>app/employee.component.ts</ins>:

  ``` ts
  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute, ParamMap } from '@angular/router';

  @Component({
    selector: 'app-employee',
    template: `<p>You clicked {{ id }}</p>
               <p *ngIf="opt">{{ opt }}</p>`,
  })
  export class EmployeeComponent implements OnInit {
    public id;
    public opt;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.id  = parseInt(params.get('id'));
        this.opt = params.get('opt');
      });
    }
  }
  ```

---

## Navigation dans le controller

* Pour déclencher le changement de page à partir du controller, on utilise le service router.

  ``` ts
  import { Component } from '@angular/core';
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-employeeList',
    template: `<p>This is the employeeList view</p>
               <ul>
                 <li *ngFor="let employee of employees"
                      (click)="onSelect(employee)">
                   {{ employee.name }} ({{ employee.age }})
                 </li>
               </ul>`,
  })
  export class EmployeeListComponent {
    employees = [
      {"id": 1, "name": "Andrew", "age": 30},
      {"id": 2, "name": "Brandon", "age": 25},
      {"id": 3, "name": "Christina", "age": 26},
      {"id": 4, "name": "David", "age": 28},
      {"id": 5, "name": "Elena", "age": 24}
    ];

    constructor(private router: Router) { }

    onSelect(employee) {
      this.router.navigate(['/employees', employee.id]);
    }
  }
  ```

* navigate prend en paramètre un tableau, où le dernier élément peut être un objet contenant des paramètres optionnels — comme routerLink dans le template.

  ``` ts
  this.router.navigate(['/departments', {opt: "OK"}])
  ```

### Navigation relative

* Plutôt qu'un chemin absolu, on peut utiliser un chemin relatif à une route avec l'option relativeTo — qui prend pour valeur la route relative à laquelle le chemin doit être (utiliser le service ActivatedRoute pour la route en cours):

  ``` ts
  // Liste vers détail
  this.router.navigate(['/departments', department.id])
  this.router.navigate([department.id], {relativeTo: this.route})

  // Détail vers liste
  this.router.navigate(['/departments', {id: selectedId}])
  this.router.navigate(['../', {id: selectedId}], {relativeTo: this.route})
  ```

### Routes enfant

* Une route peut n'être accessible qu'à partir d'une autre route (avec relativeTo) en la déclarant comme route enfant. Ce peut être utile pour créer un sous-routing — par exemple pour associer une URL à différents onglets au sein d'une vue.

  ``` ts
  {
    path: 'departments/:id',
    component: DepartmentDetailComponent,
    children: [
      { path: 'overview', component: DepartmentOverviewComponent },
      { path: 'contact', component: DepartmentContactComponent }
    ]
  }
  ```

  ``` ts
  template: `<h3>You selected {{ departmentId }}
              <p>
                <button (click)="showOverview()">Overview/button>
                <button (click)="showContact()">Contact</button>
              </p>
              <router-outlet></router-outlet>`
  )}

  ...

    showOverview() {
      this.router.navigate(['overview'], { relativeTo: this.route })
    }
    showContact() {
      this.router.navigate(['contact'], { relativeTo: this.route })
    }
  ```

---

## Lazy routes

* Depuis Angular 8, il est possible d'utiliser des imports dynamiques.  
  Si l'application Angular est volumineuse, alors charger l'ensemble du bundle quand l'utilisateur visite la page pour la première fois peut nuire aux performances du site.  
  Avec les imports dynamiques, on ne charge le code du module que lorsque l'utilisateur navigue vers la route associée.

  ``` ts
  {
    path: '/user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  }
  ```

---

## Redirection

* Pour rediriger une route vers une autre, au lieu de spécifier un composant dans la déclaration, on spécifie la route cible avec redirectTo:

  ``` ts
  const routes: Routes = [
    { path: '', redirectTo: '/departments', pathMatch: 'full' }
  ];
  ```

  `pathMatch` peut prendre pour valeur
  * <ins>prefix</ins>:  
    matche toute url qui commence par le path donné

  * <ins>full</ins>:  
    matche uniquement si l'url est égale au path donné

{% endraw %}