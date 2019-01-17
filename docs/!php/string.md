---
title: Chaînes de caractères
category: Web, PHP
---

## Créer une chaîne de caractère

### Simples quotes

Les caractères délimités par des simples quotes `'` ne sont pas interprétés.

``` php
<?php
$var = 'Prix: 0.20$';
```

Caractères à échapper: `'`.  
Pour que la chaîne contienne une quote, l'échapper par un antislash `\`.

### Doubles quotes

Les caractères délimités par des doubles quotes `"` sont interprétés : les variables et séquences d'échappement telles que `\n` et `\t` sont remplacés par leur valeur.

``` php
<?php
$val = 0.20;
$var = "Prix: $val\$";
```

Caractères à échapper: `"`, `$`, séquences d'échappement.  
Comme pour les simples quotes, échapper les caractères par un antislash `\` pour éviter qu'ils soient interprétés.

### Heredoc

Même principe que les double quotes: les variables et séquences d'échappement sont remplacés par leur valeur, cependant il n'est pas nécessaire n'échapper les double quotes.

``` php
<?php
$var = <<<HEREDOC
text\n
HEREDOC;
```

 ``` php
 <?php
$var = <<<"HEREDOC"
text\n
HEREDOC;
```

Il est possible de mettre n'importe quel mot-clé à la place de "HEREDOC", pourvu qu'il soit identique au début et à la fin. Le premier "HEREDOC" doit être **directement suivit d'un retour à la ligne**. Le dernier "HEREDOC" doit être **seul sur la ligne** et directement suivit d'un point-virgule (pas de tabulation/espace ni avant ni après !):

``` php
<?php
if(true) {
    $var = <<<"HEREDOC"
text\n
HEREDOC;
# Le HEREDOC fermant ne peut pas être indenté
}
```

Caractères à échapper: `$`, séquences d'échappement

### Nowdoc

Même principe que les simple quotes, à la différence près qu'il n'est pas nécessaire d'échapper les simples quotes.  
Le "NOWDOC" ouvrant est entouré de simples quotes, là où pour du heredoc on met des doubles quotes ou rien.

``` php
<?php
$var = <<<'NOWDOC'
text
NOWDOC;
```

Le format nowdoc obéit aux mêmes règles que heredoc, on peut utiliser n'importe quel mot-clé et il faut que les "NOWDOC" soient seuls sur la ligne.

[php.net: Les chaînes de caractères](http://php.net/manual/fr/language.types.string.php)

---

## Insérer un caractère spécial

### Séquence d'échappement

Lorsqu'une chaîne de caractères est entourée de doubles quotes `"`, PHP interprète certaines séquences d'échappement en caractères spéciaux:

``` php
<?php
$var = "Hello\n";
```

<table>
<thead>
  <tr>
    <th>Séq.</th>
    <th>Caractère</th>
    <th>Code octal</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><code>\n</code></td>
    <td>Fin&nbsp;de&nbsp;ligne</td>
    <td>10</td>
    <td>(Line&nbsp;Feed)<br>Fin de ligne Linux</td>
  </tr>
  <tr>
    <td><code>\r</code></td>
    <td>Retour&nbsp;chariot</td>
    <td>13</td>
    <td>(Carriage&nbsp;Return)<br><code>\r\n</code> (mnénotech.: <code>return</code>) marque les fins de lignes Windows</td>
  </tr>
  <tr>
    <td><code>\t</code>
    <td>Tabulation</td>
    <td>9</td>
    <td></td>
  </tr>
  <tr>
    <td><code>\v</code></td>
    <td>Tabulation verticale</td>
    <td>11</td>
    <td>Correspond au retour à la ligne à l'intérieur d'une cellule Excel</td>
  </tr>
  <tr>
    <td><code>\f</code></td>
    <td>Saut de page</td>
    <td>12</td>
    <td></td>
  </tr>
  <tr valign="top">
    <td><code>\e</code></td>
    <td>Échappement&nbsp;CLI</td>
    <td>27</td>
    <td>Ce caractère est invisible dans un navigateur.
Lorsqu'un script PHP est exécuté dans un shell (Linux), ce caractère peut modifier l'affichage graphique, le mouvement du curseur ou même les touches du clavier.

<pre lang="php">&lt;?php
echo "\e[1;31mDu texte\e\m"
# "Du texte" s'affiche en rouge dans la console
</pre>

Plus d'info: [ANSI Escape sequences](http://ascii-table.com/ansi-escape-sequences.php)
</td>
  </tr>
  <tr valign="top">
    <td><code>\41</code></td>
    <td>Caractère ASCII au code octal 41</td>
    <td>41</td>
    <td>(<code>"\41"</code> = <code>"!"</code>)<br>Lis trois chiffres au maximum.</td>
  </tr>
  <tr>
    <td><code>\x21</code></td>
    <td>Caractère ASCII au code hexadécimal 21</td>
    <td>41</td>
    <td>(<code>"\x21"</code> = <code>"!"</code>)</td>
  </tr>
</tbody>
</table>

`\0` tout comme `\x0` correspond au caractère NUL.  
`\x1a` permet d'ajouter un délimiteur invisible dans le texte.  
[Liste des caractères invisibles](http://condor.depaul.edu/sjost/lsp121/documents/ascii-npr.htm).

### Code HTML

Il est également possible d'afficher des caractères spéciaux en HTML:

``` php
<?php
$var = "Homepage &bull; Monsite";
```

| Séq.     | Caractère | Code octal
|---       |---        |---
| `&#33;`  | Caractère ASCII au code décimal 33 | 41
| `&#x21;` | Caractère ASCII au code hexadécimal 21 | 41
| `&excl;` | Caractère ASCII au code HTML excl | 41

Ces caractères sont interprétés par le navigateur et non par PHP, ainsi `&#33;` s'affichera tel que dans un shell tandis qu'un navigateur affichera `!`. Pour afficher `&#33;` tel que dans un navigateur, écrire `&amp;#33;`.

### Code ASCII

Il existe diverses fonctions qui permettent de créer un caractère dont on connaît le code ASCII, décimal, hexadécimal, octal et binaire, ou inversement.

``` php
<?php
$var = "Hello" . chr(10);
```

* `chr` convertit un code décimal en caractère

  ``` php
  <?php
  echo chr(33); # Affiche "!"
  ```

* `ord` retourne le code décimal d'un caractère

  ``` php
  <?php
  echo ord("!"); # Affiche 33
  ```

Pour passer par un code autre que le code décimal, utiliser les éléments de syntaxe ou fonctions de conversion de nombres.

| Code        | code &rarr; car. | car. &rarr; code
|---          |---               |---
| Décimal     | `chr(33)`,<br> `pack("C", 33)` | `ord("!")`
| Binaire     | `chr(0b100001)`,<br> `chr(bindec("100001"))` | `sprintf("%b", ord("!"))`,<br> `decbin(ord("!"))`
| Octal       | `chr(041)`,<br> `chr(octdec("41"))`  | `sprintf("%o", ord("!"))`,<br> `decoct(ord("!"))`
| Hexadécimal | `chr(0x21)`,<br> `chr(hexdec("21"))`,<br> `hex2bin("21")` | `sprintf("%x", ord("!"))`,<br> `dechex(ord("!"))`,<br> `bin2hex("!")`

Ou de manière plus générale, on peut utiliser la fonction `base_convert` pour passer d'une base à l'autre. Par exemple pour passer du code octal (base 8) au code décimal (base 10):

``` php
<?php
base_convert($var, 8, 10);
```
