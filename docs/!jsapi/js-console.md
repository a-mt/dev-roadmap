---
title: DevTools
category: Web, JavaScript, API
---

Les DevTools JavaScript est une fonctionnalité intégrée dans les navigateurs modernes qui permet aux développeurs de
- voir le journal des erreurs et des avertissements
- exécuter des commandes JavaScript
- parcourir le DOM et modifier le code HTML directement dans le navigateur
- inspecter et analyser l'activité du réseau

Pour ouvrir la console
- sous Opera: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd>
- sous Chrome: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>J</kbd>
- sous Firefox: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>K</kbd>

La console peut être affiché au sein de la page ou en une fenere séparée.

<pre><img src="https://i.imgur.com/5X97iD2.png"></pre>

---

## Inspecteur

L'inspecteur permet de debugger et modifier le code HTML/CSS de la page.

### HTML

- Les éléments peuvent être déplacés dans le DOM via drag & drop
- Modifiés via un clic droit > Modifier comme HTML  
  Attention, en modifiant le noeud, les événements JavaScript qui étaient dessus sont perdus.

  ![](https://i.imgur.com/ulEZD94.png)

- On peut également utiliser le double-clic pour modifier une valeur et non le noeud entier.

  ![](https://i.imgur.com/Ddl8JLK.png)

- Ou supprimer un noeud via un clic > Supprimer le noeud

### CSS

Lorsqu'on sélectionne un noeud du DOM, le CSS qui s'y applique est affiché dans le panel à droite, onglet "Règles".

- On peut modifier le CSS: cliquer sur le sélecteur, la propriété ou la valeur à modifier

  <pre><img src="https://i.imgur.com/a8uxDPZ.png"></pre>

- Ajouter de nouvelles propriétés: cliquer dans le bloc de l'élément

  <pre><img src="https://i.imgur.com/i0lEOl3.png"></pre>

- Ajouter des nouvelles règles: cliquer sur le bouton "+"

  <pre><img src="https://i.imgur.com/r8Vz9u8.png"></pre>

- Choisir l'état de l'élément sélectionné (:hover, :focus, etc) pour pouvoir visualiser ou modifier le CSS appliqué à cet état: cliquer sur le bouton à côté du plus et cocher l'état voulu

  <pre><img src="https://i.imgur.com/nJn8i5I.png"></pre>

---

## Console

La console permet d'exécuter du JavaScript et de vérifier les valeurs retournées.

* Le code est exécuté lorsqu'on presse Entrée.  
  Utiliser Shift + Enter pour ajouter un retour chariot et non exécuter le code

* Les flèches haut/bas permettent de naviguer dans l'historique des commandes
* La tabulation (ou flèche droite) permet d'autocompléter la commande

* L'objet `console` permet d'afficher des messages dans la console  
  [Console API Reference](https://developers.google.com/web/tools/chrome-devtools/console/api)

### console.log

* Permet d'afficher un message simple.

  <pre><img src="https://i.imgur.com/CoxskHD.png"></pre>

  On peut interpoler des variables  
  `%o` pour un objet, `%s` pour une chaîne de caractères, `%d` pour un entier

  <pre><img src="https://i.imgur.com/vOrtMjN.png"></pre>

  Ou même personnaliser le style du message

  <pre>
    <img src="https://i.imgur.com/LsseEaM.png">
    <img src="https://i.imgur.com/nyw82hd.png">
  </pre>

### console.warn

* Permet d'afficher un avertissement — fond jaune

  <pre><img src="https://i.imgur.com/6P8MjdE.png"></pre>

* Outre l'intérêt purement visuel, on peut filtrer le type de messages affichés dans la console pour ne voir que les informations qui nous intéressent

  <pre><img src="https://i.imgur.com/yD9cvQV.png"></pre>

### console.error

* Permet d'afficher une erreur — fond rouge

  <pre><img src="https://i.imgur.com/y03Yabm.png"></pre>

### console.info

* Permet d'afficher une info

  <pre><img src="https://i.imgur.com/sezvRqQ.png"></pre>

### console.assert

* Permet de tester une assertion.  
  Affiche une erreur dans la console uniquement si l'assertion est fausse

  <pre><img src="https://i.imgur.com/7GkJofR.png"></pre>

### console.dir

* Permet de visualiser des éléments du DOM.  
  `console.log` se contente d'ajouter un lien vers l'inspecteur, ce qui ne permet pas de connaître la valeur du noeud au moment de l'appel à `console.log` mais la valeur une fois le script finit (lorsqu'on accède aux DevTools)

  <pre><img src="https://i.imgur.com/rbTlNfU.png"></pre>

### console.group

* `groupCollapsed` et `groupEnd` permettent de grouper un ensemble de messages.  
  Les messages peuvent être masqués ou affichés (en cliquant sur la flèche sur la gauche)

  <pre><img src="https://i.imgur.com/6W4SchA.png"></pre>

### console.count

* Permet de compter le nombre de fois que la console est appelée avec un message donné

  <pre><img src="https://i.imgur.com/xe89aV8.png"></pre>

### console.time

* `time` et `timeEnd` permettent de minuter le temps que prend une action donnée

  <pre><img src="https://i.imgur.com/4echgeM.png"></pre>

### console.table

* Permet de visualiser un tableau sous forme de table

  <pre><img src="https://i.imgur.com/X8ZIOxS.png"></pre>

### console.trace

* Permet d'afficher la call stack en cours

  <pre><img src="https://i.imgur.com/LowBkFg.png"></pre>

---

## Debugger

Plutôt qu'utiliser `console`, on peut utiliser le debugger pour connaître la valeur des variables à un moment donné

* Choisir le fichier que vous voulez débugger dans le panel de gauche

* Si le contenu du fichier est minifié, cliquer sur le bouton `{}` (formatter et indenter la source) en bas à gauche

  ![](https://i.imgur.com/Xop9yw2.png)

* Ajouter un breakpoint sur la ligne

  ![](https://i.imgur.com/1wWOVaB.gif)

* Lorsque cette ligne sera exécutée, l'éxecution du script sera stoppée. On peut alors vérifier la valeur des variables (au survol).

  ![](https://i.imgur.com/4ahSOsp.png)

* Une fois le script en pause, on peut
  - play: reprendre l'exécution du script
  - step over: exécuter la ligne, pauser sur la suivnte
  - step in: entrer dans l'appel de fonction
  - step out: exécuter le script jusqu'à ce que la fonction en cours se termine

   ![](https://i.imgur.com/Awy2wLV.png)

---

## Network

L'onglet réseau affiche les ressources chargées et leur temps de chargement

* La partie translucide de la barre indique la latence de la requête — combien de temps s'est écoulé entre l'envoi de la requête et le début du transfert.  
  La partie solide indique quand le navigteur a démarré et terminé le téléchargement de la ressource.  
  Le point final est le moment où toutes les données ont été reçues

  ![](https://i.imgur.com/WTuYUZL.png)

* En cliquant sur l'URL, on peut obtenir plus d'informations sur la requête, telles que les entêtes HTTP envoyées et reçues

  ![](https://i.imgur.com/Fby6p7r.png)

* Pour voir le temps de chargement des ressources lorsqu'elles ne sont pas en cache, recharger la page sans utiliser le cache: <kbd>Shift</kbd> + <kbd>F5</kbd>, utiliser le mode incognito ou désactiver le cache dans les paramètres de DevTools (s'applique tant que les DevTools sont ouverts)

  ![](https://i.imgur.com/mksmRCV.png)