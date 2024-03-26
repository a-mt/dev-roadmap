---
title: Formulaires
category: Web, JavaScript, API
---

## Récupérer les éléments d'un formulaire

Outre les requêtes habituelles pour récupérer un élément (comme `getElementById`), on peut récupérer un formulaire par son attribut `name` ou par son index avec la propriété `document.forms`.

``` html
<form name="formA">
    <input name="inputA" type="text">
</form>
```

``` js
var form = document.forms["formA"];
```

La liste des éléments d'un formulaire est accessible via la propriété `elements`.

``` js
var input = form.elements["inputA"];
```

---

## Événements

* `submit`  
  L'événement `submit` est déclenché lorsque l'utilisateur soumet le formulaire. Il est possible de l'intercepter en JavaScript et d'empêcher que le formulaire soit envoyé au serveur - par exemple pour l'envoyer via AJAX à la place.

  ``` js
  form.addEventListener('submit', function(e){
    e.preventDefault();
  });
  ```

  Il y a diverses manières d'envoyer un formulaire:

  * en cliquant sur un élément du formulaire qui est de type `submit` ou `image`.

    ``` html
    <input name="submitA" type="submit">
    ```

    ``` html
    <button name="submitB" type="submit">Envoyer 2</button>
    ```

    ``` html
    <input name="submitC" type="image" src="https://i.imgur.com/gT4us8p.gif">
    ```

  * en pressant sur la touche <kbd>Enter</kbd> en étant à l'intérieur d'un champs de type texte.

    ``` html
    <input name="textA" type="text">
    ```

  * en JavaScript, on appelant la méthode `submit()`

    ``` js
    form.submit();
    ```

* `reset`  
  L'événement `reset` est déclenché lorsque le formulaire est réinitialisé. Le *reset* du formulaire restaure les valeurs par défaut des éléments du formulaire mais pas leurs attributs, comme `disabled`. Écouter l'événement permet de décider l'état des éléments.

    ``` js
  form.addEventListener('reset', function(e){
    form.elements.btnA.disabled = false;
  });
  ```

  La réinitialisation du formulaire est déclenchée

  * quand on clique sur un élément de type `reset`

    ``` html
    <input type="reset">
    ```

  * quand on appelle la méthode `reset()`

    ``` js
    form.reset();
    ```

    Attention, si un élément du formulaire a pour `name` ou `id` *reset*, alors la méthode est écrasée.

---

## Récupérer le contenu

Pour récupérer le contenu des éléments du formulaire, il existe diverses propriétés selon le type de l'élément:

* Élement simple  
    La valeur d'un élément est contenue dans la propriété `value`.

    ``` js
    var input = form.elements["inputA"];

    console.log(input.value);
    ```

    On peut tester le type de l'élément avec la propriété `type`

    ``` js
    console.log(input.type);
    ```

* Select  
    Pour un élément `select`, outre `value`, on peut utiliser la propriété `selectedIndex` pour savoir quel élément est sélectionné (par exemple, si l'on veut récupérer le texte de l'option sélectionnée).   
    La propriété `options` contient la liste des options du `select`.

    ``` html
    <select name="selectA">
        <option value="optionA">Option A</option>
        <option value="optionB" selected>Option B</option>
        <option value="optionC" selected>Option C</option>
    </select>
    ```

    ``` js
    var select = form.elements["selectA"];

    console.log(select.value);
    console.log(select.options[select.selectedIndex].text);
    console.log(select.options[select.selectedIndex].value);
    ```

    Si aucun éléments n'est sélectionné, la valeur de `selectedIndex` vaut -1.

* Select multiple

    Dans le cas d'un `select` `multiple` (c'est à dire qui accepte plusieurs valeurs), il est nécessaire de boucler sur les `options` pour vérifier lesquelles sont sélectionnées. Attention, son type est `select-multiple` et non `select`.

    ``` html
    <select name="selectA" multiple>
        <option value="optionA">Option A</option>
        <option value="optionB" selected>Option B</option>
        <option value="optionC" selected>Option C</option>
    </select>
    ```

    ``` js
    var select = form.elements["selectA"];

    var values = [];
    for(var i = 0; i < select.options.length; i++) {
        var option = select.options[i];

        if(option.selected == true) {
            values.push(option.value);
        }
    }
    ```

* Radio  
    Si plusieurs éléments ont le même nom, par exemple dans le cas de boutons radio, alors la propriété retourne une liste d'éléments.

    ``` html
    <div>
        <input type="radio" name="radioA" value="y" id="radioA_y">
        <label for="radioA_y">Yes</label>
        <input type="radio" name="radioA" value="n" id="radioA_n">
        <label for="radioA_n">No</label>
    </div>
    ```

    ``` js
    var radioList = form.elements["radioA"];

    var value;
    for(var i = 0; i < radioList.length; i++) {
        var radio = radioList[i];

        if(radio.checked) {
            value = radio.value;
            break;
        }
    }
    ```

* Checked  
    Même principe de pour radio, sauf que plusieurs éléments peuvent être sélectionnés

    ``` html
    <div>
        <input type="checkbox" name="checkboxA" value="email" id="checkboxA_email">
        <label for="checkboxA_email">Email</label>
        <input type="checkbox" name="checkboxA" value="phone" id="checkboxA_phone">
        <label for="checkboxA_phone">Phone</label>
    </div>
    ```

    ``` js
    var checkboxList = form.elements["checkboxA"];

    var values = [];
    for(var i = 0; i < checkboxList.length; i++) {
        var checkbox = checkboxList[i];
      
      if(checkbox.checked) {
        values.push(checkbox.value);
      }
    }
    ```

---

## FormData

* Plutôt que de tester individuellement les éléments, on peut utiliser un objet `FormData` pour récupérer l'ensemble des valeurs du formulaire, les modifier ou en ajouter sans impacter le formulaire affiché.

  ``` js
  var formData = new FormData(form);
  ```

  On peut également créer un formData vide et y ajouter manuellement les valeurs qu'on veut par la suite, pour envoyer un formulaire par AJAX par exemple.

  ``` js
  var formData = new FormData();
  ```

* Pour lister les valeurs du formData, on peut itérer sur l'objet directement (cela revient à itérer sur `formData.entries()`):

  ``` js
  for(var [key, value] of formData) {
    console.log(key, value);
  }
  /*
  selectA optionB
  selectA optionC
  checkboxA email
  checkboxA phone
  */
  ```

  On peut également utiliser `keys()` pour itérer sur les clés et `getAll()` pour récupérer les valeurs d'une clé donnée.

  ``` js
  var keys = new Set(formData.keys()); // use Set to remove duplicates

  for(var key of keys) {
      console.log(key, formData.getAll(key));
  }
  /*
  selectA [ "optionB", "optionC" ]
  checkboxA [ "email", "phone" ]
  */
  ```

  Et utiliser `has()` pour vérifier si une clé donnée existe

  ``` js
  formData.has("selectA");
  ```

* On peut ajouter des valeurs au formData

  * du texte  
    Les nombres et booléens sont convertis en texte

    ``` js
    formData.append("username", "bob");
    formData.append("id", 123456);
    ```

  * des fichiers  
    Soit un élément fichier qui existe dans la page:

    ``` js
    formData.append("file", fileInputElement.files[0]);
    ```

    Soit un Blob crée dynamiquement:

    ``` js
    var content = '<tag>Content</tag>';
    var blob = new Blob([content], { type: "text/xml"});

    formData.append("file", blob);
    ```

* Modifier la valeur d'une clé

  ``` js
  formData.set("selectA", "testA");
  formData.set("selectA", "testB");
  formData.append("selectA", "testC");

  console.log(formData.getAll("selectA"));
  /*
  [ "testB", "testC" ]
  */
  ```

* Ou supprimer une clé du formData

  ``` js
  formData.delete("selectA");
  ```

* Le formData ainsi crée/édité, peut être envoyé via AJAX directement

  ``` js
  var request = new XMLHttpRequest();
  request.open("POST", "/submitForm.php");
  request.send(formData);
  ```

  ``` js
  fetch("/submitForm.php", {
    method: "POST",
    body: formData
  });
  ```

---

## Valider le formulaire

HTML5 ajoute la validation de formulaire. Il suffit d'ajouter les propriétés appropriées aux champs du formulaire et au moment de la soumission du formulaire le navigateur se chargera de vérifier les données. Si des champs sont invalides, un tooltip est affichée pour indiquer l'erreur.

* Parmis les attributs possibles:

  ``` html
  <input type="text" required minlength="10" maxlength="255">
  ```

  ``` html
  <input type="email">
  ```

  ``` html
  <input type="url">
  ```

  ``` html
  <input type="number" min="2" max="100" step="2">
  ```

  ``` html
  <input type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required
      title="at least eight symbols containing at least one number, one lower, and one upper letter">
  ```

  Si le `pattern` n'est pas valide, le contenu de `title` sera affiché dans la tooltip.

* Il est possible de vérifier le formulaire et de demander au navigateur d'afficher les tooltips via JavaScript.

  ``` js
  if(!form.checkValidity()) { // Vérifie si le formulaire est valide
    form.reportValidity();    // Afficher les tooltips
  }
  ```

* On peut également vérifier si un champ de formulaire est valide ou non avec la propriété `validity`. `validity.valid` permet de vérifier si le champs valide les contraintes qui lui sont assignées.

  ``` js
  if(!form.checkValidity()) {
    for(var i = 0; i < form.elements.length; i++) {
      var element = form.elements[i];

      if(!element.validity.valid) {
        element.reportValidity();
        element.focus();
        break;
      }
    }
  }
  ```

  Les autres sous-propriétés de `validity` permettent de vérifier quelle contrainte est en erreur.

  | Propriété         | Description
  |---                |---
  | `valueMissing`    | valeur manquante pour un champ `required`
  | `typeMismatch`    | valeur invalide pour un champs de type `email` ou `url`
  | `patternMismatch` | valeur qui ne valide pas le `pattern`
  | `tooLong`         | longueur supérieure à `maxLength`
  | `tooShort`        | longueur inférieure à `minLength`
  | `rangeUnderflow`  | valeur inférieure à `min`
  | `rangeOverflow`   | valeur supérieure à `max`
  | `stepMismatch`    | valeur qui n'est pas un multiple de `step`
  | `badInput`        | valeur ne pouvant pas être convertie par le navigateur (des lettres dans un champs de type `number` par exemple)

* Plutôt qu'utiliser `reportValidity()` pour afficher les erreurs, on peut récupérer le message d'erreur d'un élément du formulaire avec `validationMessage` pour l'afficher comme on le souhaite.

  ``` js
  console.log(input.validationMessage);
  ```

* La méthode `setCustomValidity(msg)` permet de définir un message d'erreur personnalisé à afficher à l'utilisateur.

  ``` js
  console.log(password.setCustomValidity("Les deux mots de passe ne sont pas identiques"));
  ```

  La propriété `validity.customError` permet de vérifier si un message d'erreur a été ajouté manuellement à l'élément.

  ``` js
  console.log(password.validity.customError); // true
  ```

* La propriété `willValidate` indique si le champ sera vérifié au moment de la soumission du formulaire. Elle vaut `false` lorsque l'élément est `disabled`.

  ``` js
  console.log(input.willValidate);
  ```

* En ajoutant l'attribut `novalidate` au formulaire, toutes les contraintes des éléments du formulaire seront ignorés, et le formulaire pourra être soumis sans effectuer aucune vérification.

  ``` html
  <form novalidate>
      <input type="text" required />
      <input type="submit" value="Submit" />
  </form>
  ```

  On peut également placer l'attribut `formnovalidate` sur les éléments du formulaire. Si l'utilisateur soumet le formulaire en utilisant un input/button ayant cet attribut, la validation sera désactivée.

  ``` html
  <form>
      <input type="text" required />
      <input type="submit" value="Validate" />
      <input type="submit" value="Do NOT Validate" formnovalidate />
  </form>
  ```

---

## CSS

Il existe des pseudo-classes pour cibler les éléments du formulaire selon leur état

* `:required` et `:optional` pour cibler les éléments qui ont l'attribut `required` ou non

* `:valid` et `:invalid` pour cibler les éléments qui valident leurs contraintes ou non
