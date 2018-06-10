---
title: "Méthodes: Dates"
category: Web, JavaScript, ES5
---

## Créer une date

Pour créer une date, plusieurs formats différents sont acceptés en entrées.

<table>
  <thead>
    <tr>
      <th>En entrée</th>
      <th>Exemple</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top">(rien)</td>
      <td><pre lang="js">new Date() // date actuelle</pre></td>
    </tr>
    <tr>
      <td valign="top">Timestamp en millisecondes<br>(depuis 01/01/1970)</td>
      <td><pre lang="js">new Date(1518353958425)</pre></td>
    </tr>
    <tr>
      <td valign="top">Date ISO</td>
      <td><pre lang="js">new Date("2018-02-11T12:59:18.425Z")</pre></td>
    </tr>
    <tr>
      <td valign="top">Date format long<br>(dépend des navigateurs)</td>
      <td>
        <pre lang="js">new Date("Sunday February 11 2018 13:59:18")</pre>
        <pre lang="js">new Date("Sun Feb 11 2018 13:59:18 GMT+0100 (CET)")</pre>
      </td>
    </tr>
    <tr>
      <td valign="top">Date format court<br>(dépend des navigateurs)</td>
      <td><pre lang="js">new Date("02/11/2018 13:59:18")</pre></td>
    </tr>
    <tr>
      <td valign="top">Valeur par valeur<br>Attention la numérotation des mois commence par 0.</td>
      <td><pre lang="js">new Date(2018, 1, 11, 13, 59, 18, 425)</pre></td>
    </tr>
    <tr>
      <td valign="top">Valeur par valeur, UTC</td>
      <td><pre lang="js">new Date(Date.UTC(2018, 1, 11, 13, 56, 18))</pre></td>
    </tr>
  </tbody>
</table>

Pour les dates crées à partir de chaîne de caractères, les virgules sont ignorées et la casse des mots n'a pas d'importance. Le mois et le jour de la semaine peuvent être écrits au format court (`Sun`) ou long (`Sunday`)

---

## Afficher une date (jour + heure)

``` js
var date = new Date(Date.UTC(2018, 1, 11, 13, 56, 18));
```

<table>
  <thead>
    <tr>
      <th>Sortie</th>
      <th>Exemple</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top">Timestamp (en millisecondes)</td>
      <td><pre lang="js">+date // 1518357378000</pre></td>
    </tr>
    <tr>
      <td valign="top">Format ISO (= format JSON)</td>
      <td><pre lang="js">date.toISOString() // 2018-02-11T13:56:18.000Z</pre></td>
    </tr>
    <tr>
      <td valign="top">Format long</td>
      <td><pre lang="js">date.toString() // Sun Feb 11 2018 14:56:18 GMT+0100 (CET)</pre></td>
    </tr>
    <tr>
      <td valign="top">Format selon la locale du navigateur</td>
      <td><pre lang="js">date.toLocaleString() // 11/02/2018 à 14:56</pre></td>
    </tr>
    <tr>
      <td valign="top">Format UTC</td>
      <td><pre lang="js">date.toUTCString() // Sun, 11 Feb 2018 13:56:18 GMT</pre></td>
    </tr>
    <tr>
      <td valign="top">Valeur par valeur</td>
      <td><pre lang="js">date.getFullYear()
+ "-" + ("0" + (date.getMonth() + 1)).slice(0,2)
+ "-" + date.getDate()
+ " "
+ date.getHours()
+ ":" + date.getMinutes()
+ ":" + date.getSeconds()
// 2018-02-11 14:56:18</pre></td>
    </tr>
    <tr>
      <td valign="top">Valeur par valeur, UTC</td>
      <td><pre lang="js">date.getUTCFullYear()
+ "-" + ("0" + (date.getUTCMonth() + 1)).slice(0,2)
+ "-" + date.getUTCDate()
+ " "
+ date.getUTCHours()
+ ":" + date.getUTCMinutes()
+ ":" + date.getUTCSeconds()
// 2018-02-11 13:56:18</pre></td>
    </tr>
  </tbody>
</table>

## Afficher le jour

``` js
date.toDateString() // "Sun Feb 11 2018"
```

``` js
date.toLocaleDateString() // "11/02/2018"
```

## Afficher l'heure

``` js
date.toTimeString() // "14:56:18 GMT+0100 (CET)"
```

``` js
date.toLocaleTimeString() // "14:56:18"
```

---

## Modifier une date

Pour modifier une date, utiliser les setters disponibles (ce sont les mêmes que les getters mais avec `set` au lieu de `get`):
`setFullYear()`, `setMonth()`, etc.

---

## Utiliser une locale

Les méthodes qui permettent de récupérer une date selon une locale peuvent prendre la locale à utiliser en argument, au format BCP 47. Sinon la locale du navigateur est utilisée. Des options peuvent également être passées pour contrôler le format de la date.

``` js
console.log(date.toLocaleDateString());                // 11/02/2018
console.log(date.toLocaleDateString(["zh", "en-US"])); // 2018/2/11
console.log(date.toLocaleDateString([], { day: "numeric", month: "short", year: "numeric" })); // 11 févr. 2018
```

| Option          | Valeur possible
|---              |---
| `localeMatcher` | "lookup", "best fit"
| `timeZone`      | "UTC" (ou le fuseau horaire du navigateur de la locale par défaut)
| `hour12`        | true, false
| `formatMatcher` | "basic", "best fit"
| `weekday`       | "narrow", "short", "long"
| `era`           | "narrow", "short", "long"
| `year`          | "numeric", "2-digit"
| `month`         | "numeric", "2-digit", "narrow", "short", "long"
| `day`           | "numeric", "2-digit"
| `hour`          | "numeric", "2-digit"
| `minute`        | "numeric", "2-digit"
| `second`        | "numeric", "2-digit"
| `timeZoneName`  | "short", "long"
