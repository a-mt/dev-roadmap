---
title: Formulaires
category: Web, JavaScript, Library, Angular
---

{% raw %}
## Rappels

On a vu jusqu'à présent différents manières de lier des données entre classe et template.

* Classe vers template  
  On peut utiliser l'interpolation, représentée par des doubles accolades. L'interpolation convertit la valeur en chaîne de caractères.

  ```
  src="{{ url }}"
  ```

  Ou on peut lier une propriété (property binding), représentée par des crochets. Dans ce cas, le type de la variable est conservé.

  ```
  [src]="url"
  ```

* Template vers classe  
  On peut écouter un événement, représenté par des parenthèses. Ça permet d'exécuter du code quand l'utilisateur interagit avec la vue, par exemple pour mettre à jour une variable.

  ```
  (change)="isChecked=$event.target.checked"
  ```

## ngModel

* Quand on crée un formulaire, on veut généralement que les variables de la classe et du template soient synchronisées. Lier la classe vers le template et le template vers la classe devient vite redondant.

  ``` ts
  <input type="checkbox" [checked]="isChecked" (change)="isChecked=$event.target.checked">
  ```

  Pour éviter ça, on peut utiliser la directive ngModel du module Form — ce qui permet de créer une liaison bidirectionnelle.

1. Importer FormsModule dans le module racine  
   <ins>app.module.ts</ins>

    ``` diff
    +import { FormsModule } from '@angular/forms';

    @NgModule({
      imports: [
        BrowserModule,
    +   FormsModule
      ]
    ```

2. Utiliser la directive ngModel, entourée de parenthèses dans des crochets (appelée la syntaxe "banana in a box").

    ``` ts
    <input type="checkbox" [(ngModel)]="isChecked">
    ```

   ngModel prend en charge tout un tas d'élément: input texte, checkbox, radio, textarea, select, etc.

## ngModelChange

* On peut utiliser la directive ngModelChange pour executer du code supplémentaire quand la valeur d'un champ surveillé par ngModel change.

  ``` ts
  @Component({
    selector: 'app-root',
    template: `<h1>Hello {{ username }}</h1>
               <input [(ngModel)]="username" (ngModelChange)="greet($event)">`
  })
  export class AppComponent {
    username = 'Bob';

    greet(value) {
      if(value == 'World') {
        alert('Hello World');
      }
    }
  }
  ```

* Une autre manière d'intercepter des changements de valeurs sur une variable (et pas forcemment une variable avec la directive ngModel) est d'utiliseur une variable privée avec getter et setter.

  ``` ts
  @Component({
    selector: 'app-root',
    template: `<h1>Hello {{ username }}</h1>
               <input [(ngModel)]="username">`
  })
  export class AppComponent {
    private _username = 'Bob';

    get username() {
      return this._username;
    }
    set username(value) {
      this._username = value;

      if(value == 'World') {
        alert('Hello World');
      }
    }
  }
  ```

## ngForm

* Quand on ajoute un tag `<form>` et que le module Form est activé, Angular ajoute automatiquement la directive ngForm sur ce tag, ce qui a pour effet de suivre l'état du formulaire — avec notamment les valeurs des éléments du formulaire et si elles sont valides ou non. Les éléments du formulaires doivent porter la directive `ngModel` et définir leur nom avec `name` pour être suivis par ngForm.

  On peut utiliser une référence pour récupérer l'objet créé par ngForm.

  ``` html
  <form #myForm="ngForm">
   <pre>{{ myForm.value | json }}</pre>
    <!--
    {
      "input1": "",
      "input2": "initialValue"
    }
    -->

    <input name="input1" ngModel>
    <input name="input2" ngModel="initialValue">
  </form>
  ```

## ngModelGroup

* La directive ngModelGroup permet de créer un sous-groupe d'éléments.

  ```
  <form #myForm="ngForm">
   <pre>{{ myForm.value | json }}</pre>
    <!--
    {
      "name": "",
      "address": {
        "street": "",
        "postalCode": "",
        "city": ""
      }
    }
    -->

    <div>
      <label for="name">Name</label>
      <input id="name" name="name" ngModel>
    </div>

    <div ngModelGroup="address">
      <div>
        <label for="street">Street</label>
        <input id="street" name="street" ngModel>
      </div>
      <div>
        <label for="postalCode">Postal Code</label>
        <input id="postalCode" name="postalCode" ngModel>
      </div>
      <div>
        <label for="city">City</label>
        <input id="city" name="city" ngModel>
      </div>
    </div>
  </form>
  ```

## Valeur initiale

* ngModel accepte pour valeur la valeur initiale du champ. On peut ainsi pré-remplir le formulaire. Et on peut utiliser la syntaxe banana-in-a-box pour synchroniser les valeurs des champs et celles d'un objet. Un cas d'utilisation typique est pour modifier des données déjà enregistrées.

  ```
  class User {
    constructor(
      public name: String,
      public email: String
    ) {}
  }

  @Component({
    selector: 'app-root',
    template: `<form #myForm="ngForm">
                <pre>{{ user | json }}</pre>

                <div>
                  <label for="name">Name</label>
                  <input id="name" name="name" type="text" [(ngModel)]="user.name">
                </div>
                <div>
                  <label for="email">Email</label>
                  <input id="email" name="email" type="email" [(ngModel)]="user.email">
                </div>

                </form>`
  })
  export class AppComponent {
    user = new User('Bob', 'bob@test.com');
  }
  ```

---

## ngSubmit

* L'événement ngSubmit est déclenché quand le formulaire est soumis et il appelle automatiquement event.preventDefault() avant d'appeler le callback.

  ``` ts
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-root',
    template: `<form #myForm="ngForm"
                     (ngSubmit)="handleSubmit(myForm)" novalidate>
                 <pre>{{ myForm.value | json }}</pre>

                 <input name="input1" required ngModel>
                 <input name="input2" required ngModel="initialValue">

                 <input type="submit">
               </form>`
  })
  export class AppComponent {
    handleSubmit(ref) {
      console.log(ref.form);

      /*
      controls: Object {
          input1: {
              errors: Object { required: true }
              pristine: true
              status: "INVALID"
              statusChanges: …
              touched: true
              value: ""
              valueChanges: …
          },
          input2: {
              errors: null
              pristine: false
              status: "VALID"
              statusChanges: …
              touched: true
              value: "bob"
              valueChanges: …
          }
      }
      errors: null
      pristine: false
      status: "INVALID"
      statusChanges: …
      touched: true
      value: Object { input1: "", input2: "bob" }
      valueChanges: …
      */
    }
  }
  ```

## Propriétés de validation

* Angular vérifie automatiquement si les champs du formulaire sont valides ou non.  
  À tout instant, Angular applique 3 classes sur chaque élément du formulaire, suivant son état.  
    On peut s'en servir pour appliquer du CSS.

  | État                                | Oui        | Non
  |---                                  |---         |---
  | Le champ a été visité (après blur). | ng-touched | ng-untouched
  | La valeur du champ a changé.        | ng-dirty   | ng-pristine
  | La valeur du champ est valide.      | ng-valid   | ng-invalid

* Pour chacune de ces classes (ng-propname), Angular fournit également des propriétés (propname) sur les éléments. On peut utiliser une référence pour récupérer l'objet crée par ngModel et accéder à ses propriétés (ou alors utiliser myForm.controls.myInput)

  ```
  <input name="myInput" required ngModel #myInput="ngModel">
  <div [hidden]="myInput.valid || myInput.untouched">
    <small>This field is required.</small>
  </div>
  ```

* On peut utiliser la propriété errors pour savoir quelle validation a échoué

  ```
  <input name="phone" pattern="^[0-9]{10}$" required ngModel #phone="ngModel">

  <div *ngIf="phone.invalid && phone.touched">
    <small *ngIf="phone.errors.required">Phone number is required.</small>
    <small *ngIf="phone.errors.pattern">Phone number must be 10 digits long.</small>
  </div>
  ```

* Le formulaire porte également les propriétés de validation (pristine, touched, valid, etc) — le formulaire est invalide si ou moins un des champ est invalide, etc.

   ```
   <form #myForm="ngForm" novalidate>

     <div>
       <label>Username</label>
       <input name="username" required ngModel #myInput="ngModel">
       <div [hidden]="myInput.valid || myInput.untouched">
         <small>This field is required.</small>
       </div>
     </div>

     <input type="submit" [disabled]="myForm.form.invalid">
   </form>
   ```

---

## Reactive Forms

* Quand on utilise ngModel et ngModelGroup, Angular crée en réalité des objets FormControl et FormGroup par défaut. Ça nous permet de créer un formulaire simple très rapidement. Par contre, si on veut

  - une validation dynamique (par exemple que le champ email ne soit obligatoire que si la checkbox "s'inscrire à la newsletter" est cochée)

  - ou des champs dynamiques (par exemple pour envoyer une invitation mail à x amis en ajoutant autant de champs email qu'on veut)

  alors on doit créer les contrôles du formulaire manuellement.

1. Importer ReactiveFormsModule dans le module racine  
   <ins>app.module.ts</ins>

    ``` diff
    +import { FormsModule, ReactiveFormsModule } from '@angular/forms';

    @NgModule({
      imports: [
        BrowserModule,
        FormsModule,
    +   ReactiveFormsModule
      ]
    ```

2. Créer une instance de FormGroup, qui servira à contenir les champs du formulaire, et le remplir avec des instances FormControl, qui s'occuperont de contrôler les champs.

    ```
    import { FormGroup, FormControl } from '@angular/forms';

    ...
    export class AppComponent {
      registrationForm = new FormGroup({
        username: new FormControl('Initial value'),
        email   : new FormControl(''),

        address: new FormGroup({
          street: new FormControl(''),
          postalCode: new FormControl(''),
          city: new FormControl('')
        })
      });
    }
    ```

    Ou, pour plus de lisibilité, on peut utiliser le service FormBuilder — qui crée les instances FormGroup et FormControl en utilisant les paramètres spécifiés.

    ```
    import { FormBuilder } from '@angular/forms';

    ...
    export class AppComponent {
      registrationForm = this.fb.group({
        username: ['Initial value'],
        email   : [''],

        address: this.fb.group({
          street: [''],
          postalCode: [''],
          city: ['']
        })
      });

      constructor(private fb: FormBuilder) {}
    }
    ```

3. Dans le template, lier les FormGroup et FormControl aux éléments du formulaire avec `formGroup`, `formGroupName` et `formControlNamed`.

    ```
    <form [formGroup]="registrationForm">
      <pre>{{ registrationForm.value | json }}</pre>
      <!--
      {
        "username": "Initial value",
        "email": "",
        "address": {
          "street": "",
          "postalCode": "",
          "city": ""
        }
      }
      --->

      <div>
        <label for="name">Name</label>
        <input id="name" type="text" formControlName="username">
      </div>

      <div>
        <label for="email">Email</label>
        <input id="email" type="email" formControlName="email">
      </div>

      <div formGroupName="address">
        <div>
          <label>Street</label>
          <input type="text" formControlName="street">
        </div>

        <div>
          <label>Postal Code</label>
          <input type="text" formControlName="postalCode">
        </div>

        <div>
          <label>City</label>
          <input type="text" formControlName="city">
        </div>
      </div>

     </form>
    ```

## Valeur initiale d'un FormControl

* Le premier paramètre du FormControl est sa valeur initiale mais cette méthode n'est pas pratique pour modifier des données récupérées en base de données.

* A cet usage, on peut utiliser la méthode `setValue`. Elle prend pour paramètre un objet qui correspond à la structure du FormGroup.

  ``` ts
  loadApiData() {
    this.registrationForm.setValue({
      username: 'Bob',
      email: 'bob@test.com',
      address: {
        street: '1 Street',
        postalCode: '123456',
        city: 'Gottham'
      }
    })
  }
  ```

* Avec setValue, il est nécessaire de passer toutes les valeurs du formulaires, sinon une erreur est levée — Must supply a value for form control with name: 'address'. Pour ne définir les valeurs que de quelques champs, on utilise la méthode `patchValue`.

  ``` ts
  loadApiData() {
    this.registrationForm.patchValue({
      username: 'Bob',
      email: 'bob@test.com'
    })
  }
  ```

## FormArray

* Outre FormGroup pour grouper des champs et FormControl pour contrôler un champ, on peut également utiliser FormArray pour stocker une liste de champs.

  ``` ts
  import { Component } from '@angular/core';
  import { FormBuilder, FormArray } from '@angular/forms';

  @Component({
    selector: 'app-root',
    template: `<form [formGroup]="registrationForm">

                <!-- Emails -->
                <label>Invite your friends</label>

                <div formArrayName="emails" *ngFor="let email of emails.controls; let i=index">
                  <input type="text" [formControlName]="i">
                </div>
                <div>
                  <button (click)="addEmail()">Add email</button>
                </div>

               </form>`
  })
  export class AppComponent {
    registrationForm = this.fb.group({
      emails: this.fb.array([''])
    });

    constructor(private fb: FormBuilder) {}

    get emails() {
      return this.registrationForm.get('emails') as FormArray;
    }
    addEmail() {
      this.emails.push(this.fb.control(''));
    }
  }
  ```

---

## Validateur

* Le deuxième paramètre du FormControl est une liste de validateurs.  
  S'il n'y a qu'un seul validateur, il n'est pas nécessaire de créer une liste, on peut aussi passer un validateur directement.

  ``` ts
  import { FormBuilder, Validators } from '@angular/forms';

  ...
  export class AppComponent {
    registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email   : [''],
    });

    constructor(private fb: FormBuilder) {}
  }
  ```

## Validation dynamique

* On peut modifier les validateurs appliqués sur un champ en fonction des valeurs des champs. Pour ce faire 1. souscrire à l'observable valueChanges sur le champ à surveiller, 2. modifier les valeurs du champ à modifier avec setValidators ou clearValidators.

  ``` ts
  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, Validators } from '@angular/forms';

  @Component({
    selector: 'app-root',
    template: `<form [formGroup]="registrationForm">

                <!-- Name -->
                <div>
                  <label for="name">Name</label>
                  <input id="name" type="text" formControlName="username">

                  <div *ngIf="$.username.invalid && $.username.touched">
                    <small *ngIf="$.username.errors?.required">Username is required</small>
                    <small *ngIf="$.username.errors?.minlength">Username must be at least 3 characters long</small>
                  </div>
                </div>

                <!-- Email -->
                <div>
                  <label for="email">Email</label>
                  <input id="email" type="email" formControlName="email">

                  <div *ngIf="$.email.invalid && $.subscribe.touched">
                    <small *ngIf="$.email.errors?.required">Email is required</small>
                  </div>
                </div>

                <!-- Subscribe to newsletter -->
                <div>
                  <label for="newsletter">Subscribe to newsletter</label>
                  <input id="newsletter" type="checkbox" formControlName="newsletter">
                </div>

               </form>`
  })
  export class AppComponent implements OnInit {
    registrationForm = this.fb.group({
      username  : ['', [Validators.required, Validators.minLength(3)]],
      email     : [''],
      newsletter: [false]
    });

    constructor(private fb: FormBuilder) {}

    /**
     * Returns the form controls
     * So that we can easily access the fields in the template (via $.fieldname)
     * @return object - {nom string: FormControl}
     */
    get $() {
      return this.registrationForm.controls;
    }

    ngOnInit() {

      // Subscribe to valueChanges on newsletter
      this.registrationForm
          .get('newsletter').valueChanges.subscribe(checked => {

            // Get email field
            const email = this.registrationForm.get('email');

            // Update validators list
            if(checked) {
              email.setValidators(Validators.required);
            } else {
              email.clearValidators();
            }

            // Check validity
            email.updateValueAndValidity();
          });
    }
  }
  ```

## Validateur personnalisé

* Angular fournit des validateurs courant tels que required ou minLength par exemple, mais on peut aussi implémenter des validateurs personnalisés.

1. Déclarar une fonction qui prend pour paramètre un objet AbstractControl — ce qui correspond à un FormControl ou à un FormGroup suivant l'objet sur lequel on ajoute la validateur (en l'occurence, ce sera un FormControl).

   La fonction doit retourner null si le champ est valide ou un objet si invalide, où la clé est le type d'erreur et la valeur est la valeur ayant échoué la validation.

    ``` ts
    import { AbstractControl } from '@angular/forms';

    export function forbiddenValueValidator
        (control: AbstractControl): {[key: string]: any} | null {

      const forbidden = /admin/.test(control.value);
      return forbidden ? {'forbiddenValue': control.value} : null;
    }
    ```

2. Spécifier cette fonction comme validateur.

    ```
    import { forbiddenValueValidator } from './shared/forbiddenValue.validator';

    ...
    username: ['', [
      Validators.required,
      Validators.minLength(3),
      forbiddenValueValidator
    ]]
    ```

3. Dans le template, tester le type de l'erreur pour afficher un message d'erreur approprié

    ```
    <div *ngIf="$.username.errors?.forbiddenValue">
      <small>Username "{{ $.username.errors.forbiddenValue }}" is not allowed</small>
    </div>
    ```

### Validateur personnalisé avec paramètre

* Pour un validateur prenant des paramètres, on écrit une fonction wrapper qui prend les paramètres voulus en entrée et retourne un validateur en sortie.

    ``` ts
    function forbiddenValueValidator(forbiddenValue: RegExp): ValidatorFn {
      return (control: AbstractControl): {[key: string]: any} | null => {

        const forbidden = forbiddenValue.test(control.value);
        return forbidden ? {'forbiddenValue': control.value} : null;
      }
    }
    ```

* Et on appele cette fonction dans la liste des validateurs.

    ``` ts
    import { forbiddenValueValidator } from './shared/forbiddenValue.validator';

    ...
    username: ['', [
      Validators.required,
      Validators.minLength(3),
      forbiddenValueValidator(/admin/i)
    ]]
    ```

## Validateur avec plusieurs champs

* Plutôt que d'ajouter un validateur sur un champ, on peut ajouter un validateur sur un groupe. C'est notamment utile si on veut comparer les valeurs de deux champs, comme password et confirmPassword.

1. Créer un validateur personnalisé pour comparer les deux champs.  
   L'objet AbstractControl correspondra ici à un FormGroup puisqu'on va ajouter le validateur sur un groupe.

    ```
    import { AbstractControl } from '@angular/forms';

    export function passwordValidator
      (control: AbstractControl): {[key: string]: any} | null {

        const password        = control.get('password');
        const confirmPassword = control.get('confirmPassword');

        if(password.pristine || confirmPassword.pristine) {
          return null;
        }
        return password
            && confirmPassword
            && password.value !== confirmPassword.value
             ? {'passwordMismatch': true} : null;
    }
    ```

2. Spécifier cette fonction comme validateur du groupe.  
   Le deuxième paramètre de FormGroup est un objet d'options, où `validator` spécifie un ou plusieurs validateurs sur le groupe.

    ```
    registrationForm = this.fb.group({
      username: ['Bob', Validators.required],
      password: [''],
      confirmPassword: ['']
    }, {
      validator: passwordValidator
    })
    ```

3. Utiliser les erreurs sur le groupe pour afficher un message d'erreur si nécessaire.

    ```
    <input type="password" formControlName="confirmPassword">

    <div *ngIf="registrationForm.errors?.mismatchPassword">
      <small>Passwords do not match</small>
    </div>
    ```

{% endraw %}