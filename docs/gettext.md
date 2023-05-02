---
title: Gettext
category: Other
---

{% raw %}
## Extension

Il y a deux types de fichiers:
* `.po`, sont des fichiers textes (portable object)  
* `.mo`, sont des fichiers `.po` compilés (machine object)

Pour compiler un fichier `.po` en `.mo`:

``` shell
/usr/bin/msgfmt -v -o fr-FR.mo fr-FR.po
```

---

## Traduction simple

* `fr-FR.po`

  ```
  msgid "My text"
  msgstr "Mon texte"
  ```

* `example.php`

  ``` php
  $str = gettext("My text"); // Mon texte
  ```

* `example.html.twig`  
  Pour utiliser les traductions avec Twig, il est nécessaire d'installer l'[extension Twig i18n](https://twig-extensions.readthedocs.io/en/latest/i18n.html).

  ``` twig
  {% trans "My test" %}
  ```

  ou

  ``` twig
  {% trans %}My test{% endtrans %}
  ```

---

## Multi-ligne

Les chaînes de caractère d'un fichier `.po` doivent respecter la syntaxte C d'une chaîne de caractères.  
Chaque ligne doit commencer et finir par un guillemet.

```
msgid ""
"Here is an example of how one might continue a very long string\n"
"for the common case the string represents multi-line output.\n"
```

---

## Pluralisation

* `fr-FR.po`

  ```
  msgid "%count% day"
  msgid_plural "%count% days"
  msgstr[0] "%count% jour"
  msgstr[1] "%count% jours"
  ```

* `example.php`

  ``` php
  $str = ngettext("%d day", "%count% days", 3); // %dcount jours
  ```

* `example.html.twig`

  ```
  {% set n = 3 %}

  {% trans %}
    {{ count }} day
  {% plural n %}
    {{ count }} days
  {% endtrans %}
  ```

  va exécuter `ngettext("%count% day", "%count% days", 3);`

### Comment ça marche

Pour gérer la pluralisation d'une chaîne de caractère, il faut

1. Définir l'entête `Plural-Forms` dans le fichier `.po`.  
   Elle ressemble à ça:

   ```
   Plural-Forms: nplurals=2; plural=n == 1 ? 0 : 1;
   ```

   `nplurals` précise combien de formes de pluriel existe pour cette langue.  
   La chaîne de caractère qui suit est une expression utilisant la syntaxe C. Les espaces sont autorisés, mais les retours à la ligne non. Cette expression sera evaluée à chaque fois qu'une fonction de traduction pluralisée est appelée (`ngettext`, `dngettext` ou `dcngettext`). La valeur numérique passée à ces fonctions est substituée à la variable `n` dans l'expression.

   <ins>Exemples</ins>

   * français: `Plural-Forms: nplurals=2; plural=n > 1;`  
     Utiliser *entrée 0* pour 0 et 1, utiliser *entrée 1* sinon (= utiliser le singulier pour 0)

   * anglais: `Plural-Forms: nplurals=2; plural=n != 1;`  
     Utiliser *entrée 0* pour 1, utiliser *entrée 1* sinon (= utiliser le pluriel pour 0)

   * letton: `Plural-Forms: nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n != 0 ? 1 : 2);`  
     Utiliser *entrée 0* si (n % 10 == 1 && n % 100 != 11), utiliser *entrée 2* pour 0, utiliser *entrée 1* sinon

   [Liste d'expressions plurielles pour la plupart des langues.](http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html?id=l10n/pluralforms)

2. Définir les différentes entrées `msgstr`  
   Définir chaque entrée pour chaque forme plurielle avec une nouvelle entrée `msgstr`.

   <ins>Exemples</ins>

   * français

         msgid "%count% day"
         msgid_plural "%count% days"
         msgstr[0] "%count% jour"
         msgstr[1] "%count% jours"

   * croate

         msgid "%count% Comment"
         msgid_plural "%count% Comments"
         msgstr[0] "%count% Komentarz"
         msgstr[1] "%count% Komentarze"
         msgstr[2] "%count% Komentarzy"

3. Pourquoi `msgid_plural` existe  
   Un `msgid` n'est pas une "clé", c'est une phrase réelle qui est utilisée si aucune traduction appropriée n'est trouvée.  
   Donc quand, dans votre code, vous demandez la traduction suivante:

   ``` php
   ngettext("One file removed", "%count% files removed", $file_count);
   ```

   Ces deux chaînes de caractères seront utilisées
   * pour extraire les messages du code source
   * comme chaîne par défaut lorsqu'aucune traduction n'existe
   * comme guide pour les traducteurs du fichiers `.po`, pour montrer comment ils sont définis dans le programme source.

---

## Placeholders

On a utiliser des placeholders dans les exemples précédents (`%count%`).  
Les placeholders ne sont pas gérés par le système de localisation, on doit utiliser des fonctions PHP pour les remplacer.

### printf

Il est courant d'utiliser `printf`/`sprintf`:

``` php
$str = sprintf(gettext('Your color is %s.'), $color) ;
```

``` php
$str = sprintf(ngettext("%d day", "%d days", $n), number_format($n)) ;
```

Pour la liste complète des spécificateurs, voir la [doc de sprintf](https://www.php.net/manual/fr/function.sprintf.php).  
C'est généralement une bonne idée d'ordonner les arguments s'il y a plus d'un placeholder:

``` php
printf(
   ngettext('The %2$s contains %1$d monkey', 'The %2$s contains %1$d monkeys', $num),
   number_format($num), $location
);
```

Avec Twig, on n'utilise pas de Placeholders qui dépendent de la position mais du nom:  
`%variable_name%` plutôt qu'un spécificateur tel que `%d` — en utilisant `str_replace`.

### str_replace

``` php
$str = str_replace(gettext('Your color is %color%.'), ['%color%'], [$color]) ;
```

``` php
$str = str_replace(
  ngettext("%count% day", "%count% days", $n),
  ['%count%'],
  [number_format($n)]
);
```

---

## Contexte

Le contexte sert à désambiguïser des messages utilisant la même chaîne *non traduite*.

* `fr-FR.po`  
  Pour ajouter un contexte dans le fichier `.po`, on ajoute un libellé avec `msgctxt`.  
  Notons qu'un label vide et une ligne `msgctxt` abse,te ne signifient pas la même chose.

   ```
   msgctxt "verb"
   msgid "post"
   msgstr "publier"

   msgctxt "noun"
   msgid "post"
   msgstr "publication"
   ```

   ```
   msgctxt "sidebar"
   msgid "%count% person"
   msgid_plural "%count% people"
   msgstr[0] "%count% personne"
   msgstr[1] "%count% gens"
   ```

* `example.php`  
  Les fonctions `pgettext` et `npgettext` ne sont pas implémentées nativement, il est nécessaire de les définir:

  ``` php
  // Source: https://github.com/oscarotero/Gettext/blob/master/src/GettextTranslator.php

  function pgettext($context, $str) {
    $cstr  = $context . "\x04" . $str;
    $trans = gettext($cstr);

    return $trans == $cstr ? $str : $trans;
  }

  function npgettext($context, $str, $str_plural, $count) {
    $cstr  = $context . "\x04" . $str;
    $trans = ngettext($cstr, $str_plural, $count);

    return $trans == $cstr ? $str : $trans;
  }
  ```

  ``` php
  $str = pgettext('verb', 'post'); // publier
  $str = pgettext('noun', 'post'); // publication
  ```

  ``` php
  $people = str_replace(
      npgettext('sidebar', '%count% person', '%count% people', 3),
      ['%count%'], [number_format($count)]
  ); // 3 gens
  ```

* `example.html.twig`  
  Le bloc `context` n'est pas implémenté nativement dans l'extension Twig i18n.  
  Support context: [a-mt/Twig-extensions](https://github.com/a-mt/Twig-extensions/commit/3372431c2127562273e1aaa06179a36960119457)

  ``` twig
  {% trans %}
    post
  {% context %}
    noun
  {% endtrans %}
  ```

  ``` twig
  {% set count = 3 %}

  {% trans %}
    {{ count }} person
  {% plural count %}
    {{ count }} people
  {% context %}
     sidebar
  {% endtrans %}
  ```

---

## Commentaires

On peut ajouter des commentaires dans le fichier `.po`, devant la ligne `msgid`, en commençant la ligne par `##`. Le format est le suivant:

```
white-space
#  translator-comments
#. extracted-comments
#: reference…
#, flag…
#| msgid previous-untranslated-string
msgid untranslated-string
msgstr translated-string
```

Par exemple, pour ajouter une référence vers le fichier d'où a été extraite la traduction:

```
#: lib/error.c:116
msgid "Unknown system error"
msgstr "Error desconegut del sistema"
```

{% endraw %}