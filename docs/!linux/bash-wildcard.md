---
title: Wildcard
category: Linux, Shell, Bash
---

* Les caractères globaux (ou *globs* ou *wildcards*) sont des caractères symboliques qui ont une signification particulière pour le shell. Grâce aux globs, on peut spécifier des noms de fichiers qui suivent un modif donné: au lieu de manipuler un seul fichier à la fois, ont peut facilement exécuter des commandes qui affecteront de nombreux fichiers.

* Les wildcards sont interprétées directement par le shell et non par la commande appelée: si on lance `ls *.html`, la commande executée sera en vérité `ls file1.html file2.html`. On peut donc utiliser des wildcards avec toutes les commandes qui acceptent un ou des fichiers (ls, cat, cp, etc).

* Conséquence: attention à échapper les globs pour les commandes qui veulent prendre des regex en paramètre.
  - `.*` (wildcard) = le caractère `"."` suivit de n'importe quels caractères
  - `'.*'` (regex) = n'importe quels caractères

### * : tout caractère, 0 à n fois

* L'astérisque (`*`) est utilisé pour représenter zéro à n caractères quelconques dans un nom de fichier.  
  Par exemple `D*` correspond à n'importe quel fichier du répertoire en cours qui commence par D (suivi de 0 à n caractères).

  ```
  $ ls -d D*
  Desktop  Documents  Downloads

  $ ls -d /etc/*.conf
  /etc/adduser.conf    /etc/ca-certificates.conf  /etc/fuse.conf
  ```

### ? : tout caractère, 1 fois

* Le point d'interrogation (`?`) est utilisé pour représenter exactement 1 caractère quelconque.  
  Par exemple `*.???` correspond à tout fichier avec une extension à 3 lettres.

  ```
  $ ls -1 /etc/*.???
  /etc/brlapi.key
  /etc/issue.net
  /etc/locale.gen
  /etc/odbc.ini
  /etc/odbcinst.ini
  /etc/vdpau_wrapper.cfg
  ```

### []: 1 caractère parmis un ensemble

* Les crochets (`[]`) sont utilisées pour représenter un seul caractère parmis un ensemble de caractères possibles.  
  Par exemple `[dD]*` correspond à tout fichier qui commence par "d" ou "D"

  On peut également représenter un intervalle de caractère avec le tiret `-`  
  Par exemple `[a-z]*` correspond à tout fichier qui commence par une lettre minuscule

* Le point d'exclamation (`!`) est utilisé conjointement avec les crochets pour annuler une plage.  
  Par exemple, `[!a]*` affichera tout fichier qui ne commence pas par la lettre a.

  ```
  [ab]       a ou b
  [!ab]      Ni a ni b
  [^ab]      Idem
  [a-z]      Plage ASCII entre a et z
  [a-zA-Z]   Plage ASCII entre a et z ou A et Z
  ```

`man ascii` pour voir la table ASCII

### Quantificateurs

  ```
  @(a|b)     a ou b, exactement 1 fois (les expressions peuvent contenir des wildcards)
  *(a|b)     a ou b, de 0 à n fois
  ?(a|b)     a ou b, de 0 à 1 fois
  +(a|b)     a ou b, au moins 1 fois
  !(a|b)     Ni a ni b
  ```

``` bash
$ CI_REGISTRY_IMAGE=registry.example.com:5000/projectname
$ echo ${CI_REGISTRY_IMAGE/:*([0-9])/}
registry.example.com/projectname
```
