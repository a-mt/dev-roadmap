---
title: Raccourcis édition de texte
category: Other
---

Raccourcis clavier et actions souris usuels pour éditer du texte : sélection de texte, copier, couper, coller... Les actions souris listées sont celles supportées par Linux, les autres systèmes d'exploitation ne les supporte pas forcemment toutes (notamment le clic molette, n'existe pas sous Windows).

---

Conventions : Ci-dessous la liste des touches du clavier, leur nom (en anglais) et leur abbréviation dans ce document, si différente du nom.

| Apparence clavier    | Nom de la touche | Abbréviation |
|---                   |---            |---          |
| <kbd> &#8670; </kbd> | PageUp        | PgUp        |
| <kbd> &#8671; </kbd> | PageDown      | PgDn        |
| <kbd> &#8598; </kbd> | Home          |             |
| <kbd>Fin</kbd>       | End           |             |
|||
| <kbd>Suppr</kbd>     | Delete        | Del         |
| <kbd>Inser</kbd>     | Insert        | Ins         |
| <kbd> &larr; </kbd>  | Backspace     | Back        |
|||
| <kbd>Ctrl</kbd>      | Control       | Ctrl        |
| <kbd>Alt</kbd>       | Alt           |             |
| <kbd> &#8679; </kbd> | Shift         | Shft        |
|||
| <kbd> &ltrif; </kbd> | Left          |             |
| <kbd> &rtrif; </kbd> | Right (Rght)  |             |
| <kbd> &utrif; </kbd> | Up            |             |
| <kbd> &dtrif; </kbd> | Down          |             |

---

## Déplacement du curseur

<pre>
<kbd>Left</kbd>                 Caractère précédent
<kbd>Ctrl</kbd> + <kbd>Left</kbd>         Mot précédent
<kbd>Home</kbd>                 Début de la ligne
<kbd>PgUp</kbd>                 Début de la page

<kbd>Right</kbd>                Caractère suivant
<kbd>Ctrl</kbd> + <kbd>Rght</kbd>         Mot suivant
<kbd>End</kbd>                  Fin de la ligne
<kbd>PgDn</kbd>                 Fin de la page
</pre>

---

## Sélection de texte

### Avec la souris

<pre>
<i>Double click</i>          Sélectionner le mot cliqué
<i>Triple click</i>          Sélectionner la ligne cliquée
<i>Click</i> + <i>Move</i>          Sélectionner de l'endroit cliqué jusqu'à l'endroit relâché
<kbd>Shft</kbd> + <i>Click</i>         Sélectionner du curseur jusqu'à l'endroit cliqué
</pre>

### Avec le clavier

<pre>
<kbd>Shft</kbd> + <kbd>Left</kbd>         Sélectionner le caractère avant le curseur
<kbd>Ctrl</kbd> + <kbd>Shft</kbd> + <kbd>Left</kbd> Sélectionner le mot avant le curseur
<kbd>Shft</kbd> + <kbd>Up</kbd>           Sélectionner la ligne avant le curseur

<kbd>Shft</kbd> + <kbd>Rght</kbd>         Sélectionner le caractère après le curseur
<kbd>Ctrl</kbd> + <kbd>Shft</kbd> + <kbd>Rght</kbd> Sélectionner le mot après le curseur
<kbd>Shft</kbd> + <kbd>Dwn</kbd>          Sélectionner la ligne après le curseur
</pre>

<pre>
<kbd>Shft</kbd> + <kbd>Home</kbd>         Sélectionner du curseur au début de la ligne en cours
<kbd>Ctrl</kbd> + <kbd>Shft</kbd> + <kbd>Home</kbd> Sélectionner du curseur au début de la page

<kbd>Shft</kbd> + <kbd>End</kbd>          Sélectionner du curseur à la fin de la ligne en cours
<kbd>Ctrl</kbd> + <kbd>Shft</kbd> + <kbd>End</kbd>  Sélectionner du curseur à la fin de la page
</pre>

<pre>
<kbd>Ctrl</kbd> + <kbd>a</kbd>            Sélectionner tout le document
</pre>

---

## Suppression

### De la sélection

<pre>
<kbd>Del</kbd>                  Supprimer les caractères sélectionnés
<kbd>Back</kbd>                 Idem
</pre>

### Interractive

<pre>
<kbd>Del</kbd>                  Supprimer le caractère après le curseur
<kbd>Ctrl</kbd> + <kbd>Del</kbd>          Supprimer le mot après le curseur

<kbd>Back</kbd>                 Supprimer le caractère avant le curseur
<kbd>Ctrl</kbd> + <kbd>Back</kbd>         Supprimer le mot avant le curseur
</pre>

---

## Copier / couper / coller

### Avec la souris

<pre>
<i>Middle click</i>          Coller la sélection à l'endroit cliqué
<i>Drag & drop</i>           Déplacer la sélection à l'endroit relaché
</pre>

### Avec le clavier

<pre>
<kbd>Ctrl</kbd> + <kbd>c</kbd>            Copier la sélection dans le presse-papier
<kbd>Ctrl</kbd> + <kbd>Ins</kbd>          Idem

<kbd>Ctrl</kbd> + <kbd>v</kbd>            Coller le presse-papier à l'endroit du curseur
<kbd>Shft</kbd> + <kbd>Ins</kbd>          Item

<kbd>Ctrl</kbd> + <kbd>x</kbd>            Couper la sélection dans le presse-papier
<kbd>Maj</kbd> + <kbd>Ins</kbd>           Coller la sélection à l'endroit du curseur (simule lun clic du milieu)
</pre>

---

## Annuler / répéter

<pre>
<kbd>Ctrl</kbd> + <kbd>z</kbd>            Annuler
<kbd>Ctrl</kbd> + <kbd>y</kbd>            Répéter
</pre>
