---
title: Lifecycle hooks
category: Web, JavaScript, Library, Angular
---

{% raw %}
Il est possible de définir des méthodes sur les composant qui seront appelées à divers moments du cycle de vie. À chacune de ces méthodes est associée une interface que le composant doit spécifier (avec implements) pour qu'Angular appelle la méthode.

## onChanges

* ngOnChanges est appelée quand une propriété du composant change.

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

## onInit

* ngOnInit est appelée avoir initialisé les propriétés du composant.  
  C'est l'endroit idéal pour appeler des services — pour récupérer les informations de routing ou appeler une API notamment.

  ``` ts
  import { Component, OnInit } from '@angular/core';
  import { DbService } from './db.service';

  @Component({
    selector: 'app-root',
    template: `<ul>
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
      this.dbService.getEmployees().subscribe(data => {
        this.employees = data;
      }, err => {
        console.error('Something went wrong', err);
      });
    }
  }
  ```

## afterViewInit

* ngAfterViewInit est appelée après que le contenu du composant ait été ajouté au DOM. C'est l'endroit idéal pour effectuer des actions sur des références ajoutées dans le template.

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

## onDestroy

* ngOnDestroy est appelée juste avant que le composant soit supprimé. C'est l'endroit idéal pour nettoyer des listeners, timeout, interval, etc.

---

## doCheck

* ngDoCheck permet de détecter des changements que ngOnChanges ne détecte pas et de déclencher une action.
  Par exemple, si le parent passe un objet en propriété et qu'une des propriétés de cet objet change, Angular ne détectera pas de changement puisqu'on passe toujours le même objet.

  ``` ts
  ngDoCheck() {
    if (this.hero.name !== this.oldHeroName) {
      this.oldHeroName = this.hero.name;
    }
  }
  ```

## afterContentInit

* ngAfterContentInit est appelée une fois après le premier ngDoCheck.

## afterContentChecked

* ngAfterContentChecked est appelée après ngAfterContentInit puis après chaque ngDoCheck.

## afterViewChecked

* ngAfterViewChecked est appelée après chaque ngAfterContentChecked, une fois que le contenu de la vue a été ajouté au DOM.

{% endraw %}