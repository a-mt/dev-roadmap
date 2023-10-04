---
title: Regex
category: Other
---

Une regex, abrégé de *Regular Expression* (en français : *expression régulière* ou *expression rationnelle*) est une syntaxe qui permet de tester si le contenu d'une chaîne de caractères contient ou correspond à un pattern (motif).

Cela permet de
- valider des données: vérifier si le texte correspond au format d'un numéro de téléphone, email, mot de passe, url, ...
- chercher des données: mots dans une phrase, caractères interdits, extraire des sections, remplacer/formatter du texte

Les regex existent dans la plupart des langages mais la syntaxe et les fonctionnalités supportées varie d'un langage à l'autre.
La syntaxe décrite ci-dessous est commune à la plupart des langages (PHP, JavaScript, Python, etc).
Les commandes du shell quant à elles utilisent des regex POSIX, qui ne contiennent pas toutes les fonctionnalités décrites (notamment les fonctionnalités niveau avancé).

Certains langages nécesittent d'entourer la regex de délimiteurs, suivit ou non d'options : `/abc/i` 

---

Quelques exemples de méthodes qui utilsent des Regex :

* JavaScript

  | Code                                | Resultat
  |---                                  |---
  | `"je suis un exemple".match(/. /)`  | [ "e " ]
  | `"je suis un exemple".match(/. /g)` | [ "e ", "s ", "n " ]
  | `"helloWorld".match(/. /)`          | null
  | `"helloWorld".replace(/o/, "0")`    | "hell0World"
  | `"helloWorld".replace(/o/g, "0")`   | "hell0W0rld"

* PHP

  | Code                                                   | Resultat | Contenu de $match
  |---                                                     |---       |---
  | `preg_match('/. /', "je suis un exemple", $match)`     | true    | [ "e " ]
  | `preg_match_all('/. /', "je suis un exemple", $match)` | true  | [ "e ", "s ", "n " ]
  | `preg_match('/. /', "helloWorld", $match)`             | false | []
  | `preg_replace('/o/', '0', "helloWorld")`               | "hell0W0rld"
  | `preg_replace('/o/', '0', "helloWorld", 1)`            | "hell0World"

---

Tester les regex en live : https://regex101.com/ (syntaxe PHP)

---

## B.A.-BA

### Ancres

    ^a         Commence par a
    a$         Finit par a (ignore les retours chariots à la fin [\r\n])

<!-- -->

    ^lorem|ipsum$    Commence par lorem ou finit par ipsum
    ^(lorem|ipsum)$  Egal à lorem ou ipsum

Pour qu'un metacaractère ou un délimiteur (! ^ $ ( ) [ ] { } | ? + * . \\) soit lu littéralement, il faut le précéder d'un backslash (\\)

    \^         Contient le caractère ^

### Groupes

    ab         a suivit de b
    (ab)       a suivit de b, dans un groupe capturant (maximum 99 groupes capturants)
    (?:ab)     a suivit de b, dans un groupe non capturant (plus rapide)
    
    a|b        a ou b
    a|bc       a ou bc
    (a|b)c     ac ou bc

### Classes de caractère

    .          Classe universelle (tout caractère sauf le retour à la ligne \n)

    [ab]       a ou b (inutile d'échapper les métacaractères sauf ] et \)
    
    
    [^ab]      Ni a ni b (le ^ littéral est placé ailleurs qu'en début de classe de caractère)

    [a-z]      Plage ASCII de a à z (le - littéral est placé en début ou fin de classe de caractère)
    [a-zA-z]   Plage ASCII de a et à z et de A à Z

    [\\. !]    Contient \ . espace ou !
    (\\|\.|\!) Idem

### Quantificateurs 

    a?         0 ou 1 a
    a+         Au moins 1 a
    a*         0, 1 ou plusieurs a

    a?         0 ou 1 a, préférer 1 (opétateur gourmand par défaut)
    a??        0 ou 1 a, préférer 0 (opérateur rendu non gourmand)
    a?+        0 ou 1 a, préférer 1 (sans backtrack)

<!-- -->

    a{2}       2 a
    a{2,4}     Entre 2 et 4 a
    a{2,}      Au moins 2 a
    a{,4}      Entre 0 et 4 a

    ba{2}      b suivit de 2 a
    (ba){2}    2 fois ba
    (.*[a-z]){3} Contient 3 lettres minuscules (abcABC, aAbBcC, abABCc correspondent)

### Caractères spéciaux

    \          Caractère d'échappement
    
    \0         null
    \n         Saut de ligne (Line Feed)
    \r         Retour chariot (Carriage Return)
    \t         Tabulation (Horizontal Tab)
    \v         Tabulaltion vertical (Vertical Tab)
    \f         Saut de page (Form Feed)

    \077       Caractère ayant le code octal 77 (1 à 3 décimaux)
    \x3F       Caractère ayant le code hexadécimal 3F (2 hexadécimaux)
    \x{20AC}   Caractère ayant le code hexadécimal 20AC (> 2 hexadécimaux)
    \cC        Caractère de contrôle représenté par la lettre C

Liste caractères de contrôle : http://www.aivosto.com/vbtips/control-characters.html

---

## Classes

### Classe POSIX

Une classe POSIX est le raccourcis d'un ensemble de caractères, il faut quand même l'utiliser à l'intérieur de classe de caractères : `/[[:word:]]/`, `/[[:word:][:punct:]]/`

    [:alpha:]  Lettres de a à z ([a-zA-Z])
    [:lower:]  Lettres minuscules de a à z ([a-z])
    [:upper:]  Lettres majuscules de a à z ([A-Z])
    [:digit:]  Caractère décimal ([0-9])
    [:xdigit:] Caractère hexadécimal ([0-9A-Fa-f])

    [:alnum:]  Alphanumérique ([a-zA-Z0-9])
    [:word:]   Alphanumérique ou _ ([a-zA-Z0-9_])

    [:ascii:]  Caractère ASCII ([\000-\127)
    [:punct:]  Caractère de ponctuation ou symbole ([!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])
    [:space:]  Caractère d'espace ([  \t\r\n\v\f])
    [:blank:]  Caractère d'indentation ([ \t])

    [:cntrl:]  Caractère non imprimable ([\000-\037\177])
    [:print:]  Caractère imprimable ([[:alnum:][:punct:]])
    [:graph:]  Caractère visible ([[:alnum:][:punct:][:space:]])

Liste des caractères ASCII : http://www.ascii-code.com/

### Classe PCRE

Une classe PCRE se suffit à elle-même, les crochets sont inutiles : `\d{1,3}` = un nombre qui contient entre 1 et 3 chiffres

    \d         Chiffre décimal ([0-9])
    \D         PAS un chiffre ([^0-9])

    \s         Espace ([ \t\r\n\f])
    \S         PAS un espace ([^ \t\r\n\f])
    \h         Espace horizontal ([ \t])

    \w         Caractère alphanumérique ou _ ([a-zA-Z0-9_])
    \W         PAS un alphanumérique ou _ ([^a-zA-Z0-9_])

### Classe Unicode

Pas de crochets.

    \p{L}      N'importe quel caractère qui appartient à la classe Unicode L (Lettres)
    \P{L}      N'importe quel caractère qui N'appartient PAS à la classe Unicode L

Liste non exhaustive de classes Unicode :

    \p{L}          Lettre (lettres ASCII, lettres accentuées, grec, hébreux, etc)
    \p{Ll}         Lettre minuscule uniquement
    \p{Lu}         Lettre majuscule uniquement
    \p{Latin}      Lettre de l'alphabet latin

    \p{S}          Symbole
    \p{Sm}         Symbole mathématiques (Ex : +, <, =)
    \p{Sc}         Symbole d'une devise (Ex : €, $, ¥)
    \p{Sk}         Symbole diacritique (Ex : ^, `, ´)
    \p{So}         Symbole divers (Ex : ©, ♥)

    \p{N}          Nombre (Ex : 5, ½, ²)
    \p{P}          Ponctuation (Ex : #, !, %)

Certains languages supportent les intersections (Java, Ruby, Python) : `/[\p{Greek}&&[\p{Lu}]]/`  
Pour les autres utiliser une assertion :

    (?=\p{Lu})\p{Greek} Lettre grecque majuscule

Liste des classes Unicodes : http://www.unicode.org/reports/tr44/#General_Category_Values  
Liste des caractères Unicodes par classe : http://www.fileformat.info/info/unicode/category/index.htm  
Liste des alphabets disponibles : http://www.regular-expressions.info/unicode.html#script

---

## Niveau avancé

### Assertions

Les assertions ne consomment aucun caractère : `/(\bmot\b)/g` != `/((^|$|[ ,!.;:])mot(^|$|[ ,!.;:]))/g` (ex "mot mot")

    \b         Limite de mot (^ | $ | [ ,!.;:])
    \B         PAS une limite de mot

    \A         Début de chaîne (en mode multi-ligne, ^ correspond au début de ligne)
    \Z         Fin de chaîne (en mode multi-ligne, $ correspond à la fin de ligne)
    \z         Fin absolue de chaîne (n'ignore pas les retours chariots à la fin)

    \G         Début de chaîne ou fin de la correspondance précédente

### Backreference

#### Avec groupe capturant

Les captures imbriquées se comptent du global au local: `(a(bcd))` 1=abcd, 2=bcd

    ('|")a\1   a entouré de " " ou ' '
    $10        backreference supérieure à 9 (syntaxe Java, JS, Perl, PHP)
    \10        syntaxe Python
    ${10}      syntaxe C#

#### Avec backreference nommée

Les references nommés restent numérotées, on peut y accéder via son nom ET son numéro

    (?P<NAME>'|")a(?P=NAME)  a entouré de " " ou ' ' (syntaxe Python ou PHP)
    (?<NAME>'|")a(\k<NAME>)  idem (syntaxe .NET, Perl, Ruby ou PHP)

### Condition

Vérifie si un groupe capturant donné a été définit.
Attention un groupe vide est vrai : `(<?)` (vrai) != `(<)?` (faux).

    (<)?abcd(?(1)>)   abcd ou <abcd>
    (<)?abcd(?(1)>|e) <abcd> ou abcde

Il est possible de sélectionner le groupe capturant par position relative : `-1`, `+1`

    (<)?abcd(?(-1)>)

### Lookahead / lookbehind

Sont des assertions et ne consomment donc aucun caractère

    ab(?=cd)   ab suivit de cd
    ab(?!cd)   ab qui n'est PAS suivit de cd

    (?<=ab)cd  cd précédé de ab
    (?<!ab)cd  cd qui n'est PAS précédé de ab

<!-- -->

    ^(?!lorem)  Ne commence pas par lorem
    (?<!ispum)$ Ne finit pas par ipsum

    (?=(.*[a-z]){3})(?=(.*[0-9]){2}).{6,}       Au moins 6 caractères, dont moins 3 lettres et 2 chiffres (dans n'importe quel ordre)
    (?<=([[:punct:]])|)[a-z]+(?(1)|[[:punct:]]) Lettres soit précédées soit suivies d'un caractère de ponctuation

### Groupe atomique

    (?>a|b)        a ou b, dans un groupe atomique (empêche le backtrack)
    
Les groupes atomiques permettent principalement d'optimiser les performances du regex : `(?>compt|essay)er` = si le début commence de la chaîne par "compt" mais n'est pas suivit pas "er", ne pas essayer avec "essay"

### Q...E

    \Q*. !\E       Recherche littérale de *. !

### Commentaires

    a(?#comment)b  Commentaire (option x non activée)
    a #comment     Commentaire (option x activée)

### Récursion

    \*((?:[^*]|(?R))+)\*        Recursion du pattern entier (*foo *bar**)
    ^(\*((?:[^*]|(?1))+)\*)$    Recursion d'un groupe capturant

La récursion du groupe entier ne peut pas être ancrée (puisque la récursion ne matchera pas le début de la chaîne)  
Vérifier si un niveau de récursion a été atteint :

    (?(R)A)                     Vérifie si l'on est à l'intérieur d'une récursion
    (?(R1)A)                    Vérifie si l'on est dans une récursion du groupe capturant 1

---

## Options

    (?i)       Activer l'option i pour le reste de l'expression
    (?-i)      Désactiver l'option i pour le reste de l'expression
    (?x-im)    Activer l'option x et désactiver les options i et m
    (?i:bc)    Activer l'option i pour un groupe spécifique (bc)

### Quelques options utiles

    i      [case insentitive mode] Insensible à la casse
    s      [single line mode]      La classe universelle comprend le retour à la ligne
    m      [multi line mode]       ^ et $ correspondent au début et fin de ligne (délimitées par \n)
    x      [extended mode]         Les espaces non échappés et en dehors d'une classe de caractère sont ignorés
    g      [global mode]           Trouver toutes les correspondances du regex et non juste la première
    U      [ungreedy mode]         Les quantificateurs sont non gourmands
    A      [anchored mode]         La regex est ancrée de force (^...$)
    D      [dollar endonly mode]   Le $ n'ignore pas les retours à la ligne en fin de ligne
    u      [unicode mode]          Traiter l'expression régulière en Unicode
