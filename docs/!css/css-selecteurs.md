---
title: Sélecteurs CSS
category: Web > CSS
---

Les sélecteurs CSS permettent de cibler sur quels éléments appliquer les règles CSS.

- Les classes et ID doivent décrire le contenu (ex: `header`) et non le style (ex: `bigText`).
- Chaque ID est unique par page, ne contient ni espace ni caractère spécial, et est sensible à la casse

``` html
<p id="myid" class="myclass">Lorem ipsum...</p>
```

## Les sélecteurs

### De base

<table>
<tr>
  <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
  <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;</td>
  <td></td>
</tr>
<tr>
  <th align="left">p</th>
  <td>Les tags &lt;p&gt;</td>
  <td>[CSS1]</td>
</tr>
<tr>
  <th align="left">.myclass</th>
  <td>Les élements ayant la classe "myclass"</td>
  <td>[CSS1]</td>
</tr>
<tr>
  <th align="left">#myid</th>
  <td>L'élément ayant l'id "myid"</td>
  <td>[CSS1]</td>
</tr>
<tr><td colspan="3"></td></tr>

<tr>
  <th align="left">*</th>
  <td>Tous les éléments</td>
  <td>[CSS2]</td>
</tr>
<tr>
  <th align="left">h1, h2</th>
  <td>Les tags &lt;h1&gt; et &lt;h2&gt;</td>
  <td>[CSS1]</td>
</tr>
</table>

Les sélecteurs peuvent être combinés pour affiner la sélection.  
Par exemple: `p.myclass` pour cibler les tags `<p>` qui ont la classe `myclass`.

### De précédence

<table>
<tr>
  <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
  <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;</td>
  <td></td>
</tr>
<tr>
  <th align="left">div p</th>
  <td>Les tags &lt;p&gt; contenus dans un tag &lt;div&gt;</td>
  <td>[CSS1]</td>
</tr>
<tr>
  <th align="left">div > p</th>
  <td>Les tags &lt;p&gt; dont le parent direct est un &lt;div&gt;</td>
  <td>[CSS2]</td>
</tr>
<tr>
  <th align="left">div + p</th>
  <td>Les tags &lt;p&gt; dont l'élément précédent est un &lt;div&gt; (Adjacent Sibling)</td>
  <td>[CSS2]</td>
</tr>
<tr>
  <th align="left">div ~ p</th>
  <td>Les tags &lt;p&gt; qui sont précédés d'un &lt;div&gt; - pas forcemment immédiatement (Sibling)</td>
  <td>[CSS3]</td>
</tr>
</table>

### D'attribut

<table>
<tr>
  <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
  <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;</td>
  <td></td>
</tr>
<tr>
  <th align="left">input[readonly]</th>
  <td>Les input qui ont un attribut "readonly"</td>
  <td>[CSS2]</td>
</tr>
<tr>
  <th align="left">input[type=password]</th>
  <td>Les input qui ont un attribut "type" qui vaut "password"</td>
  <td>[CSS2]</td>
</tr>
<tr>
  <th align="left">div[data-config~=on]</th>
  <td>Les divs dont l'attribut "data-config" est une liste de valeurs séparées par un espace, dont l'un des mots vaut exactement "on"</td>
  <td>[CSS2]</td>
</tr>
<tr>
  <th align="left">span[class|=btn]</th>
  <td>Les spans dont l'attribut "class" est une liste de valeurs séparées par un tiret, dont l'un des mots vaut exactement "btn"</td>
  <td>[CSS2]</td>
</tr>
<tr><td colspan="3"></td></tr>

<tr>
  <th align="left">a[src^=https]</th>
  <td>Les liens dont l'attribut "src" commence par "https"</td>
  <td>[CSS3]</td>
</tr>
<tr>
  <th align="left">a[src$=.pdf]</th>
  <td>Les liens dont l'attribut "src" finit par ".pdf"</td>
  <td>[CSS3]</td>
</tr>
<tr>
  <th align="left">a[src*=w3schools]</th>
  <td>Les liens dont l'attribut "src" contient "w3schools"</td>
  <td>[CSS3]</td>
</tr>
</table>

---

## Spécificité des sélecteurs

Si deux sélecteurs ciblent le même élément, les déclarations se cumulent.

``` css
p {
  font-family: Arial;
}
p.myclass {
  color: gray;
}
```

### Score

Mais si une même propriété est définie deux fois, alors le sélecteur le plus spécifique l'emporte.  
Un ID a une spécificité de 100, une classe 10, un tag 1 — plus le score est élevé, plus il est spécifique.  

| Sélecteur  | ID    | Classe | Tag   | Score total |
|---         |---    |---     |---    |---    |
| body       | 0     | 0      | 1     | 1     |
| .quote     | 0     | 1*10   | 0     | 10    |
| #content   | 1*100 | 0      | 0     | 100   |
| div p      | 0     | 0      | 2     | 2     |
| #sidebar p | 1*100 | 0      | 1     | 101   |

``` css
p {
  color: black;
}
#myid {
  color: red;  /* l'emporte */
}
p.myclass {
  color: gray;
}
```

### Ordre d'inclusion

Si les deux sélecteurs ont le même score, alors la dernière règle déclarée l'emporte.

* 1/ Le style inclut en ligne (inline style) l'emporte sur
* 2/ Le style de la balise `<style>` (embedded style), qui l'emporte sur
* 3/ Le style dans un fichier stylesheet (external style). 

### !important

On peut passer outre la spécificité / l'ordre d'inclusion en utilisant la flag `!important`: une propriété notée importante remplace les autres déclarations de cette propriété sur l'élément. Ainsi, on peut écraser un style en ligne dans un fichier externe en utilisant `!important`.

``` css
p { color: lightgrey !important; }
```

---

## Pseudo-classes

Les pseudo-classes permettent de cibler un élément dans un état particulier. Elles s'ajoutent au sélecteur.

``` css
/* CSS des liens lorsque la souris passe dessus */
a:hover { color: red; }
```

### Sur les liens

<table>
<tr>
  <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
  <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;</td>
  <td></td>
</tr>
<tr>
  <th align="left">a:link</th>
  <td>Les liens non visités</td>
  <td>[CSS1]</td>
</tr>
<tr>
  <th align="left">a:visited</th>
  <td>Les liens visités</td>
  <td>[CSS1]</td>
</tr>
<tr>
  <th align="left">a:hover</th>
  <td>Le lien sous la souris</td>
  <td>[CSS1]</td>
</tr>
<tr>
  <th align="left">a:active</th>
  <td>Le lien actif (= état au moment du clic)</td>
  <td>[CSS1]</td>
</tr>
<tr>
  <th align="left">a:focus</th>
  <td>Le lien ayant le focus (= état après le clic, avant que l'utilisateur clique ailleurs)</td>
  <td>[CSS2]</td>
</tr>
<tr>
  <th align="left">div:target</th>
  <td>Div est la cible de l'adresse en cours (http://localhost#myid) <a href="https://jsfiddle.net/amt01/bwkktyrL/">Exemple :target</a></td>
  <td>[CSS3]</td>
</tr>
</table>

### Sur les input

<table>
<tr>
  <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
  <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;</td>
  <td></td>
</tr>
<tr>
  <th align="left">input:focus</th>
  <td>Input ayant le focus</td>
  <td>[CSS2]</td>
</tr>
<tr>
  <th align="left">input:checked</th>
  <td>Input coché (radio ou checkbox)</td>
  <td>[CSS3]</td>
</tr>
<tr>
  <th align="left">input:default + label</th>
  <td>Label de l'input par défaut <a href="https://jsfiddle.net/amt01/1zstv255/">Exemple :default</a></td>
  <td>[CSS3]</td>
</tr>
<tr><td colspan="3"></td></tr>

<tr>
  <th align="left">input:disabled</th>
  <td>Input désactivé (= ayant l'attribut "disabled")</td>
  <td>[CSS3]</td>
</tr>
<tr>
  <th align="left">input:enabled</th>
  <td>Input activé (= n'étant pas désactivé)</td>
  <td>[CSS3]</td>
</tr>
<tr>
  <th align="left">input:read-only</th>
  <td>Input non éditable (= ayant l'attribut "readonly")</td>
  <td>[CSS3]</td>
</tr>
<tr>
  <th align="left">input:read-write</th>
  <td>Input éditable (= n'étant pas en read-only)</td>
  <td>[CSS3]</td>
</tr>
<tr>
  <th align="left">input:required</th>
  <td>Input obligatoire (= ayant l'attribut "required")</td>
  <td>[CSS3]</td>
</tr>
<tr>
  <th align="left">input:optional</th>
  <td>Input optionnel (= dont la valeur n'est pas obligatoire)</td>
  <td>[CSS3]</td>
</tr>
<tr>
  <th align="left">input:indeterminate</th>
  <td>Input dont l'état est indéterminé (= checkbox ayant l'attribut "indeterminate")</td>
  <td>[CSS4]</td>
</tr>
<tr><td colspan="3"></td></tr>

<tr>
  <th align="left">input:invalid</th>
  <td>Input invalide (= qui ne passe pas la validation HTML5, ex required, pattern, min, max)</td>
  <td>[CSS3]</td>
</tr>
<tr>
  <th align="left">input:valid</th>
  <td>Input valide</td>
  <td>[CSS3]</td>
</tr>
<tr>
  <th align="left">input:out-of-range</th>
  <td>Input hors plage (= input de type number dont la valeur ne respecte pas min ou max)</td>
  <td>[CSS3]</td>
</tr>
<tr>
  <th align="left">input:in-range</th>
  <td>Input dans la plage</td>
  <td>[CSS3]</td>
</tr>
</table>

### Sur tout type d'élément

<table>
<tr>
  <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
  <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;</td>
  <td></td>
</tr>
<tr>
  <th align="left">:not(p)</th>
  <td>Tout élément qui n'est pas un &lt;p&gt; (marche avec tous les sélecteurs)</td>
  <td>[CSS3]</td>
</tr>
<tr>
  <th align="left">:lang(en)</th>
  <td>Element dont l'attribut "lang" commence par "en"</td>
  <td>[CSS2]</td>
</tr>
<tr>
  <th align="left">p:empty</th>
  <td>&lt;p&gt; n'ayant aucun enfant (TextNode y compris donc pas même un retour à la ligne !)</td>
  <td>[CSS3]</td>
</tr>
<tr>
  <th align="left">:root</th>
  <td>Element racine de la page (= tag &lt;html&gt; pour une page HTML)</td>
  <td>[CSS3]</td>
</tr>
<tr>
  <th align="left">:dir(rtl)</th>
  <td>Element dont la direction du texte est de droite à gauche</td>
  <td>[CSS4]</td>
</tr>
<tr>
  <th align="left">:fullscreen</th>
  <td>Element affiché en plein écran</td>
  <td>[CSS3]</td>
</tr>
</table>

### Sur tout type d'élément, selon sa position

<table>
<tr>
  <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
  <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;</td>
  <td></td>
</tr>
<tr>
  <th align="left">p:first-child</th>
  <td>&lt;p&gt; étant le premier enfant de son parent</td>
  <td>[CSS2]</td>
</tr>
<tr>
  <th align="left">p:last-child</th>
  <td>&lt;p&gt; étant le dernier enfant de son parent</td>
  <td>[CSS3]</td>
</tr>
<tr>
  <th align="left">p:only-child</th>
  <td>&lt;p&gt; étant le seul enfant de son parent</td>
  <td>[CSS3]</td>
</tr>
<tr>
  <th align="left">span:first-of-type</th>
  <td>&lt;span&gt; qui est le premier &lt;span&gt; de son parent</td>
  <td>[CSS3]</td>
</tr>
<tr>
  <th align="left">span:last-of-type</th>
  <td>&lt;span&gt; qui est le dernier &lt;span&gt; de son parent</td>
  <td>[CSS3]</td>
</tr>
<tr>
  <th align="left">span:only-of-type</th>
  <td>&lt;span&gt; qui est le seul &lt;span&gt; de son parent</td>
  <td>[CSS3]</td>
</tr>
<tr><td colspan="3"></td></tr>

<tr>
  <th align="left">li:nth-child(2)</th>
  <td><sup>(1)</sup> Le 2ème &lt;li&gt;</td>
  <td>[CSS3]</td>
</tr>
<tr>
  <th align="left">li:nth-last-child(2)</th>
  <td><sup>(1)</sup> Le 2ème &lt;li&gt; à partir de la fin (= avant-dernier)</td>
  <td>[CSS3]</td>
</tr>
<tr>
  <th align="left">div:nth-of-type(2)</th>
  <td><sup>(1)</sup> Le 2ème élément de type &lt;div&gt; de son parent</td>
  <td>[CSS3]</td>
</tr>
<tr>
  <th align="left">div:nth-last-of-type(2)</th>
  <td><sup>(1)</sup> Le 2ème &lt;div&gt; de son parent à partir de la fin</td>
  <td>[CSS3]</td>
</tr>
</table>

<sup>(1)</sup> accepte des valeurs non numériques :

<table>
<tr>
  <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
  <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;</td>
</tr>
<tr>
  <th align="left">li:nth-child(2)</th>
  <td>Le 2ème élément</td>
</tr>
<tr>
  <th align="left">li:nth-child(even)</th>
  <td>Les éléments pairs (2ème,4ème,...)</td>
</tr>
<tr>
  <th align="left">li:nth-child(odd)</th>
  <td>Les éléments impairs (1er,3ème,...)</td>
</tr>
<tr>
  <th align="left">li:nth-child(3n)</th>
  <td>Les éléments multiples de 3 (3ème,6ème,...)</td>
</tr>
<tr>
  <th align="left">li:nth-child(3n+1)</th>
  <td>Les éléments dont la position modulo 3 vaut 1 (1er,4ème,7ème,...)</td>
</tr>
</table>

---

## Pseudo-éléments

Les pseudo-éléments permettent de cibler une portion d'élément.

``` css
p::first-letter { font-size:2em; line-height:1em; }
```

<table>
<tr>
  <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
  <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;</td>
</tr>
<tr>
  <th align="left">p::first-letter</th>
  <td>Première lettre du &lt;p&gt;</td>
  <td>[CSS1]</td>
</tr>
<tr>
  <th align="left">p::first-line</th>
  <td>Première ligne du &lt;p&gt;</td>
  <td>[CSS1]</td>
</tr>
<tr>
  <th align="left">p::selection</th>
  <td>Portion de texte sélectionnée par l'utilisateur à l'intérieur du &lt;p&gt;. <a href="https://developer.mozilla.org/fr/docs/Web/CSS/::selection#Propri%C3%A9t%C3%A9s_autoris%C3%A9es">Propriétés autorisées</a></td>
  <td>[CSS3]</td>
</tr>
<tr>
  <th align="left">::placeholder</th>
  <td>Placeholder d'un input. <a href="https://developer.mozilla.org/fr/docs/Web/CSS/::placeholder">Propriétés autorisées</a></td>
  <td>[CSS4]</td>
</tr>
<tr><td colspan="3"></td></tr>

<tr>
  <th align="left">div::before</th>
  <td>Début du div <sup>(1)</sup></td>
  <td>[CSS2]</td>
</tr>
<tr>
  <th align="left">div::after</th>
  <td>Fin du div <sup>(1)</sup></td>
  <td>[CSS2]</td>
</tr>

<tr><td colspan="3"></td></tr>
<tr>
  <th align="left">::cue</th>
  <td>Sous-titres des vidéos</td>
  <td>[CSS3]</td>
</tr>
</table>

<sup>(1)</sup> Before et after permettent d'insérer du texte au début ou à la fin d'un élément - on peut s'en servir pour ajouter du texte, des icônes, ajouter un clear float, un calque en position absolue, etc.

``` css
nav li:not(:first-child)::before {
  content: " / ";
  color: grey;
}
```

---

## CSS level 4

Les spécifications stipulent également des sélecteurs niveau 4.  
En revanche, la plupart sont peu voire pas du tout supportés.

[Intriguing CSS Level 4 Selectors](https://webdesign.tutsplus.com/tutorials/intriguing-css-level-4-selectors--cms-29499)  
[Les nouveautés de CSS4](https://blog.groupe-sii.com/les-nouveautes-de-css-level-4/)

