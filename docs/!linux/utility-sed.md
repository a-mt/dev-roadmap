---
title: Sed
category: Linux
---

Sed (Stream EDitor) permet de manipuler des chaines de caractères: remplacer, ajouter, supprimer des caractères,
ou sur des lignes, filtrer, inverser. Créé en 1973 par Bell Labs.

---

## Données en entrée

Comme awk, les données en entrées de sed peuvent provenir

* d'un fichier

    ``` bash
    $ echo 'A-B-C' > file

    # Remplacer tous les tirets par des ..
    $ sed 's/-/../g' file
    A..B..C
    ```

* de plusieurs fichiers

    ``` bash
    # Remplacer http: par https:
    $ sed 's/http:/https:/g' *.html
    ```

* ou de stdin

    ``` bash
    # Remplacer tous les tirets par des ..
    $ echo 'A-B-C' | sed 's/-/../g'
    A..B..C
    ```

* Si stdin est vide, un prompt interractif est démarré (CTRL + D pour terminer)

---

## Syntaxe awk

* Par défaut, le premier argument de sed est le programme à exécuter.

    ``` bash
    $ echo -e "A-B-C\nD..E..F\nG-E-H" > file

    $ sed 's/-/../g' file
    A..B..C
    D..E..F
    G..E..H
    ````

* Le programme peut contenir plusieurs instructions, délimitées par des points-virgules,  
  et les espaces entre les instructions ou entre les filtres sont ignorés

    ``` bash
    # Supprimer les lignes qui contiennent un "."
    # et remplacer les "-" par ".." sur les lignes restantes
    $ sed '/\./d; s/-/../g' file
    A..B..C
    G..E..H
    ```

* Les instructions peuvent être regroupées dans des blocs, délimités par des accolades.

    ``` bash
    # Sur les lignes qui ne contiennent pas un "."
    # Replacer les "-" par ".."
    # et les lettres par "*"
    $ sed '/\./! {s/-/../g; s/[a-zA-Z]/*/g}' file
    *..*..*
    D..E..F
    *..*..*
    ```

* On peut executer un programme sed à partir d'un fichier avec l'option `-f`.  
  On peut ajouter des commentaires dans ce fichier avec le caractère `#` — commentaire allant jusqu'à la fin de la ligne.

    ``` bash
    $ cat <<'NOWDOC' > script
    # Comment
    /\.\./d
    s/-/|/g
    NOWDOC

    $ sed -f script file
    A|B|C
    G|E|H
    ```

    Ça permet de créer des commandes complexes plus lisibles.

    ``` bash
    # Sur les lignes 3 à 6 qui contiennent un "a"
    # Remplacer la ligne entière par "-"
    $ cat <<'NOWDOC' > script
    3,6 {
       /a/ {
           c -
       }
    }
    NOWDOC

    $ echo -e "1a\n2b\n3a\n4b\n5a\n6b\n7a\n8b" | sed -f script
    1a
    2b
    -
    4b
    -
    6b
    7a
    8b
    ```

## Options

### -i, inplace

* `-i` permet d'exécuter sed sur le contenu d'un fichier et écrire le résultat dans ce même fichier au lieu de l'afficher dans stdout

  ``` bash
  # Remplacer /assets/ par /static/assets/
  for file in `find dist -type f | egrep '(html|css|js|map)$'`;
      do sed -i 's/"\/assets/"\/static\/assets/g' $file;
  done
  ```

### -n, nooutput

* Par défaut, sed parcourt toutes les lignes et les affiche au fur et à mesure dans stdout, qu'une modification ait été effectuée sur cette ligne ou non.   
  `-n` permet de ne pas afficher les lignes dans stdout, et seules les lignes explicitement envoyées à stdout avec le flag `p` seront affichées

  ``` diff
  $ echo -e "A-B-C\nD..E..F\nG-E-H" > file

  -$ sed 's/-/../g' file
   A..B..C
  -D..E..F
   G..E..H

  +$ sed -n 's/-/../gp' file
   A..B..C
   G..E..H
  ```

### -e, expression

* `-e` permet de cumuler plusieurs instructions sed  
  La deuxième instruction est executée sur le résultat de la première

    ``` bash
    # Supprimer les lignes qui contiennent ".." et remplacer "-" par "|"
    $ sed -e '/\.\./d' -e 's/-/|/g' file
    A|B|C
    G|E|H
    ```

---

## Filtres

### Nème ligne

* Appliquer sed sur la Nème ligne: préfixer de `N`

    ``` diff
    $ echo -e "1a-1b-1c\n2a.2b.2c\n3a-3b-3c" > file

    # Remplacer les lettres par "*" sur la 1ère ligne
    +$ sed '1s/[a-z]/*/g' file
    +1*-1*-1*
     2a.2b.2c
     3a-3b-3c
    ```

* Appliquer sur la dernière ligne: préfixer de `$`

    ``` diff
    # sur la dernière ligne
    +$ sed '$s/[a-z]/*/g' file
     1a-1b-1c
     2a.2b.2c
    +3*-3*-3*
    ```

### Regex

* Appliquer sur les lignes qui contiennent un motif donné (POSIX BRE): préfixer de `/regex/`

    ``` diff
    # Sur les lignes qui contiennent "."
    +$ sed '/\./s/[a-z]/*/g' file
     1a-1b-1c
    +2*.2*.2*
     3a-3b-3c
    ```

### Not

* Inverser le filtre: ajouter `!` à la fin du filtre

    ``` diff
    # Sur les lignes qui ne contiennent pas "."
    $ sed '/\./!s/[a-z]/*/g' file
    1*-1*-1*
    2a.2b.2c
    3*-3*-3*
    ```

    ``` diff
    +$ sed '1!s/[a-z]/*/g' file
     1a-1b-1c
    +2*.2*.2*
    +3*-3*-3*
    ```

### De ... à

* Filtrer sur les lignes entre deux filtres: `,`

    ``` diff
    # À partir de la ligne contenant "." et jusqu'à la dernière ligne
    +$ sed '/\./,$s/[a-z]/*/g' file
     1a-1b-1c
    +2*.2*.2*
    +3*-3*-3*
    ```

### Toutes les N lignes

* Filtrer à partir de la ligne N avec un pas de M: `N~M`

    ``` diff
    # À partir de la 1ère ligne, toutes les 2 lignes (= lignes impaires)
    +$ echo -e "1\n2\n3\n4" | sed '1~2s/./-/'
    +-
     2
    +-
     4
    ```

    ``` diff
    # À partir de la 2ème ligne, toutes les 2 lignes (= lignes paires)
    +$ echo -e "1\n2\n3\n4" | sed '2~2s/./-/'
     1
    +-
     3
    +-
    ```

---

## Instructions simples

### Afficher

#### p, print

* `p` permet d'afficher la ligne

    ``` bash
    # Afficher la 3ème ligne
    $ echo -e "a\nb\nc" | sed '3p'
    a
    b
    c
    c
    ```

    On s'en sert généralement avec l'option `-n`, pour n'afficher que les lignes modifiées

    ``` bash
    # Afficher la 3ème ligne
    $ echo -e "a\nb\nc" | sed -n '3p'
    c
    ```

#### l, line characters

* `l` permet d'afficher les caractères spéciaux sous forme de code.  
  Utiliser `d` pour masquer la ligne sans les caractères spéciaux formattés

    ``` diff
     # Remplacer 1 par "a"
     $ echo -e "1\t2" | sed 's/1/a/'
     a   2

     # Remplacer 1 par "a" et afficher les caractères spéciaux
    +$ echo -e "1\t2" | sed 's/1/a/;l'
    +a\t2$
     a   2

     # Remplacer 1 par "a", afficher les caractères spéciaux et supprimer la ligne du contexte
     $ echo -e "1\t2" | sed 's/1/a/;l;d'
     a\t2$
    ```

#### q, quit

* `q` permet d'arrêter la commande sed dès que le bloc est exécuté

    ``` bash
    # Afficher toutes les lignes jusqu'à celle contenant /c/
    $ echo -e "a\nb\nc\n" | sed '/c/q'
    a
    b
    c
    ```

    ``` bash
    # Affiche le path du premier fichier trouvé
    gem contents jekyll-theme-primer | sed '1{s/[^/]*$//;q}'
    ```

### Transformer

#### s, substitute

* `s` permet de remplacer une occurence (regex) par une autre.

    ``` bash
    # Remplacer 2 "a" par "b"
    $ echo "aaa" | sed 's/a\{2\}/b/'
    ba

    # Remplacer N "a" par b
    $ echo "aaa" | sed 's/a\+/b/'
    b

    # Remplacer tous les "a" par "b"
    $ echo "aaa" | sed 's/a/b/g'
    bbb

    # Remplacer la 2ème occurence de "a" par "b"
    $ echo "aaa" | sed 's/a/b/2'
    aba
    ```

* Les backreferences sont possibles

  - `\1` désigne le 1er groupe capturant

    ``` bash
    # Permuter les lettres 2 par 2
    $ echo "abcd" | sed 's/\(.\)\(.\)/\2\1/g'
    badc
    ```

  - `&` désgine la chaîne matchée complète

    ``` bash
    $ echo "xaaax" | sed 's/a\+/(&)/'
    x(aaa)x
    ```

#### y, transliterate

* `y` permet de remplacer un caractère par un autre — même principe que tr.  
  Pas de regex ici, les caractères sont interprétés littéralement

  ``` bash
  $ echo -e "1a\n2b\n3a\n4b\n5a\n6b\n7a\n8b" | sed 'y/a/*/'
  1*
  2b
  3*
  4b
  5*
  6b
  7*
  8b
  ```

#### d, delete

* `d` permet de supprimer des lignes

    ``` bash
    $ echo -e "1\n2\n3" | sed '$d'
    1
    2
    ```

### Insérer

#### c, create

* `c` permet de remplacer des lignes

    ``` bash
    $ echo -e "1a\n2b\n3a\n4b" | sed '/a/ c ---'
    ---
    2b
    ---
    4b
    ```

#### i, insert

* `i` permet d'ajouter une ligne avant le match

    ``` bash
    $ echo -e "1a\n2b\n3a\n4b" | sed '/a/ i ---'
    ---
    1a
    2b
    ---
    3a
    4b
    ```

#### =, line number

* `=` permet d'afficher le numéro de ligne avant le match

    ``` bash
    $ echo -e "a\nb\nc" | sed '/[a-z]/ {s/$/!/; =}'
    1
    a!
    2
    b!
    3
    c!
    ```

#### a, append

* `a` permet d'ajouter une ligne après le match

    ``` bash
    $ echo -e "1a\n2b\n3a\n4b" | sed '/a/ a ---'
    1a
    ---
    2b
    3a
    ---
    4b
    ```

#### r, read

* `r` permet d'insérer le contenu d'un fichier après le match

    ``` bash
    $ echo '<<<' > join

    $ echo -e "1a\n2b\n3a\n4b" | sed '/a/ r join'
    1a
    <<<
    2b
    3a
    <<<
    4b
    ```

### Sauvegarder

#### w, write

* `w` permet d'écrire les lignes matchés dans un fichier

    ``` bash
    # Sur la 2ème ligne, ajouter un point à la fin de la ligne
    # Écrire le résultat dans result
    $ echo -e "a\nb" | sed '2 s/$/./w result'
    a
    b.

    $ cat result
    b.
    ```

    Attention à bien placer le `w` en dernier — juste avant le nom du fichier:

    ``` bash
    # Remplacer tous les caractères par un "-"
    # Écrire le résultat dans result
    $ echo -e "aa\nbb\ncc" | sed 's/./-/gw result1'
    --
    --
    --
    $ cat result1
    --
    --
    --
    ```
    ``` bash
    $ echo -e "aa\nbb\ncc" | sed 's/./-/wg result2'
    -a
    -b
    -c

    $ cat result2
    cat: result2: No such file or directory
    ```

[Sed often-used commands](https://www.gnu.org/software/sed/manual/html_node/Common-Commands.html)  
[Sed less frequently-used commands](https://www.gnu.org/software/sed/manual/html_node/Other-Commands.html)

---

## Instructions multi-lignes

### Buffer courant

#### n, next

* `n` permet de passer à la ligne suivante

    ``` bash
    $ cat <<'NOWDOC' > script
    /---/ {
        n
        d
    }
    NOWDOC

    # Supprimer les lignes qui suivent une ligne contenant /---/
    $ echo -e "---\nNom:\nSmith\n---\nNom:\nCarpenter" | sed -f script
    ---
    Smith
    ---
    Carpenter
    ```

#### N, next one

* `N` permet d'ajouter la ligne suivante au buffer (conserve le retour à la ligne)

    ``` bash
    $ cat <<'NOWDOC' > script
    # Concaténer les 2 lignes qui suivent une ligne contenant /---/
    /---/ {
        n
        N
        s/\n/ /
    }
    NOWDOC

    $ echo -e "---\nNom:\nSmith\n---\nNom:\nCarpenter" | sed -f script
    ---
    Nom: Smith
    ---
    Nom: Carpenter
    ```

    ``` bash
    $ cat <<'NOWDOC' > script
    # Inverser toutes les deux lignes
    {
        N
        s/\(.*\)\n\(.*\)/\2\n\1/
    }
    NOWDOC

    $ echo -e "1\n2\n3\n4\n5" | sed -f script
    2
    1
    4
    3
    ```

#### P, print one

* `P` permet d'afficher la première ligne dans le buffer (exemple avec D)

#### D, delete one

* `D` permet de supprimer la première ligne dans le buffer

    ``` bash
    $ cat <<'NOWDOC' > script
    # Supprimer les 2 dernières lignes
    {
        N            # Récupérer la prochaine ligne
        $! { P; D }  # C'est pas la dernière : afficher le buffer et le vider
        $d           # C'est la dernière : supprimer le buffer (qui contient deux lignes)
    }
    NOWDOC

    $ echo -e "1\n2\n3\n4\n5" | sed -f script
    1
    2
    3
    ```

### Branchements

#### :, label

* `: name` définit un branchement "name"

#### b, branch

* `b name` saute au branchement "name" (ou à la fin du script si "name" omis)

#### t, test and branch

* `t branch` saute au branchement "name" uniquement si des substitutions ont été effectuées

#### T, NOT test and branch

* `T branch` saute au branchement "name" uniquement si des substitutions n'ont pas été effectuées

    ``` bash
    $ cat <<'NOWDOC' > script
    # Supprimer les retours à ligne devant toutes les lignes
    # qui commençent par />/ après une ligne qui contient /Chemin/

    /Chemin/ {
        : while

        N
        /> / {
            s/\n>/ >/
            t while
        }
    }
    NOWDOC

    echo -e "Chemin\n> Sous-chemin\n> Sous-sous-chemin\nChemin" | sed -f script
    # Chemin > Sous-chemin > Sous-sous-chemin
    # Chemin
    ```

### Hold buffer

Le hold buffer est un buffer temporaire où on peut placer des données pour les sortir du buffer courant  
et venir les récupérer plus tard.

#### h, hold

* `h` copie le buffer courant dans le hold buffer (example avec g)

#### g, get

* `g` copie le hold buffer dans le buffer courant

    ``` bash
    $ cat <<'NOWDOC' > script
    # Sur les lignes qui contiennent "a":
    # Remplacer "a" par "-" et afficher un avant/après
    /a/ {
        # Sauvegarde la valeur avant modification dans le hold buffer
        h

        # Effectue une substitution et l'affiche
        s/^/<<< /
        p

        # Récupère la valeur dans le hold buffer
        g

        # Effectue une substitution et l'affiche
        s/a/-/
        s/^/>>> /
    }
    NOWDOC

    $ echo -e "a\nb" | sed -f script
    <<< a
    >>> -
    b
    ```

#### H, hold one

* `H` ajoute le buffer courant dans le hold buffer (example avec G)

#### G, get one

* `G` ajoute le hold buffer dans le buffer courant

    ``` bash
    $ cat <<'NOWDOC' > script
    # Ajouter les lignes qui matchent le filtre à la fin
    1~2{
        H  # Ajoute toutes les lignes paires au hold buffer
    }
    ${
        p
        G                 # Récupère le hold buffer
        s/^[^\n]*\n/---/  # Remplace la première ligne (= $) par "---"
    }
    NOWDOC

    $ echo -e "1\n2\n3\n4\n5\n6" | sed -f script
    1
    2
    3
    4
    5
    6
    ---
    1
    3
    5
    ```

#### x, exchange

* `x` échange le hold buffer avec le buffer courant

    ``` bash
    $ cat <<'NOWDOC' > script
    # Afficher un avant/après sur la même ligne
    {
        # Sauvegarde la valeur avant modification dans le hold buffer
        h

        # Effectue une susbtitution
        s/a/-/

        # Met la substitution après la valeur initiale dans le buffer
        x
        G

        # Remplace le retour à la ligne par " -> "
        s/\n/ -> /
    }
    NOWDOC

    $ echo -e "a\nb" | sed -f script
    a -> -
    b -> b
    ```

    ``` bash
    $ cat <<'NOWDOC' > script
    # Remplacer \_texte\_ par \<i>texte\</i>
    : while

    /_/ {
        # Récupère le contenu du hold buffer : vide, ON, OFF ?
        x

        # != ON (premier "_" -> <i>)
        /ON/ !{

            # Mettre le hold buffer à "ON"
            s/.*/ON/

            # Remplacer "_" par <i>
            x
            s/_/<i>/
        }

        # == ON (deuxième "_" -> </i>)
        /ON/ {

            # Mettre le hold buffer à "OFF"
            s/.*/OFF/

            # Remplacer "_" par </i>
            x
            s/_/<\/i>/
        }

        # Boucler tant qu'il reste des "_"
        b while
    }
    NOWDOC

    $ echo "Ceci est du _texte en italique_" | sed -f script
    Ceci est du <i>texte en italique</i>
    ```

## Mnemonics

``` txt
: (label)
= (print line number)
a (append text lines)
b (branch)
c (change to text lines)
D (delete first line)
d (delete)
e (evaluate)
F (File name)
G (appending Get)
g (get)
H (append Hold)
h (hold)
i (insert text lines)
L (fLow paragraphs)
l (list unambiguously)
N (append Next line)
n (next-line)
P (print first line)
p (print)
q (quit)
Q (silent Quit)
r (read file)
R (read line)
s (substitute)
T (test and branch if failed)
t (test and branch if successful)
v (version)
w (write file)
W (write first line)
x (eXchange)
y (transliterate)
z (Zap)
```