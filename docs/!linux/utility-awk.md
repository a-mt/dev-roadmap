---
title: Awk
category: Linux
---

Awk permet d'extraire et manipuler des données organisées par lignes et colonnes dans un fichier texte.  
Il contient tous les éléments d'un langage de programmation: conditions, opérations mathématiques, etc.  
Le nom "awk" vient du nom de ses inventeurs : Al **A**ho, Peter **W**einberger et Briand **K**ernighan. Crée en 1978.

## Données en entrée

Les données en entrées peuvent provenir

- d'un fichier

    ``` bash
    $ sudo awk 'BEGIN{FS=":"; OFS="\t"}{print $3, $1}' /etc/passwd | head -5
    0   root
    1   daemon
    2   bin
    3   sys
    4   sync
    ```

- de plusieurs fichiers

    ``` bash
    # awk '/WARNING/{print substr($1, 6), substr($2, 0, 5), substr($0, 33)}' /var/log/unattended-upgrades/*.log | tail -5 | tac
    08-23 10:44 Could not figure out development release: [Errno 2] No such file or directory: '/usr/share/distro-info/elementary.csv'
    08-23 09:55 Could not figure out development release: [Errno 2] No such file or directory: '/usr/share/distro-info/elementary.csv'
    08-22 07:51 Could not figure out development release: [Errno 2] No such file or directory: '/usr/share/distro-info/elementary.csv'
    08-22 07:35 Could not figure out development release: [Errno 2] No such file or directory: '/usr/share/distro-info/elementary.csv'
    08-21 11:50 Could not figure out development release: [Errno 2] No such file or directory: '/usr/share/distro-info/elementary.csv'
    ```

- de stdin

  ``` bash
  $ echo "A,B" | awk 'BEGIN{FS=","}{print $1}'
  A
  ```

- et sinon, awk démarre un prompt interractif (CTRL + D pour terminer)

## Syntaxe awk

* Par défaut, le premier argument de awk est le programme à exécuter.

    ``` bash
    $ awk 'BEGIN{FS=":"; OFS="\t"}{print $3, $1}' /etc/passwd
    ```

  On peut executer un programme awk à partir d'un fichier avec l'option -f.  

    ``` bash
    $ echo 'BEGIN{FS=":"; OFS="\t"}{print $3, $1}' > script

    $ awk -f script /etc/passwd
    ```

  L'avantage d'utiliser un fichier, c'est qu'on peut créer des commandes complexes plus lisibles, et d'inclure des boucles, conditions, etc, sans avoir à se soucier des retours à la ligne.

  ``` bash
  $ cat script
  BEGIN{
      FS=":";
      OFS="\t"
  }
  {
      print $3, $1
  }

  $ awk -f script /etc/passwd

  ```

* Le programme peut contenir plusieurs blocs, délimités par des accolades.  

  - Un bloc préfixé par "BEGIN" est exécuté au tout début, avant de lire les données en entrée.  
    On s'en sert généralement pour initialiser des variables

  - Un bloc préfixé par "END" est exécuté à la toute fin, lorsqu'on a parcouru toutes les lignes.  
    On s'en sert généralement pour afficher un total

  - Un bloc sans préfixe est exécuté séquentiellement, ligne par ligne de haut en bas, sur les données en entrée.

  - Un bloc préfixé de "/regex/" est éxécuté (séquentiellement) uniquement si la ligne matche la regex.  
    Il est possible d'appliquer des modificateurs sur cette regex — plus d'info sur les filtres ci-dessous.

  - Un bloc peut contenir plusieurs instructions, séparées par des points-virgule ;.

    ``` bash
    $ sudo awk 'BEGIN{FS=":"; OFS="\t"; count=0}{count += 1}/bash/{print count ":", $3, $1}END{print count " lignes"}' /etc/passwd
    1:  0   root
    45: 1000    aurelie
    49 lignes
    ```

    ``` bash
    $ cat <<'NOWDOC' > file
    A 1
    B 2
    C 3
    D 4
    NOWDOC

    $ awk 'BEGIN{total=0}{total+=$2}END{print "total: " total}' file
    total: 10
    ```


* Il est possible d'initialiser des variables en dehors du bloc BEGIN, avec l'option `-v`:

    ``` bash
    $ sudo awk -v FS=":" -v OFS="\t" -v count=0 '{count += 1}/bash/{print count ":", $3, $1}END{print count " lignes"}' /etc/passwd
    1:  0   root
    45: 1000    aurelie
    49 lignes
    ```

## Constantes

awk utilise des variables au cours de son execution:

- Les variables globales s'appliquent à l'ensemble du document et peuvent être modifiées dans un block BEGIN (ou avec -v) pour changer le comportement de awk.

  - `FS` (Field Separator)  
    Séparateur des champs en entrée.  
    Il s'agit d'une regex, échapper le caractère avec un backslash pour un caractère littéral.  
    Valeur par défaut: "[\t ]+" — une ou plusieurs tabulation ou espace

    ``` bash
    # "," pour séparateur
    $ echo "A,B,C" | awk 'BEGIN{FS=","}{print $1, $3}'
    A C

    # "+" ou "-" pour séparateur
    $ echo "A+B-C" | awk 'BEGIN{FS="[+-]"}{print $1, $3}'
    A C

    # ".." pour séparateur
    $ echo "A..B..C" | awk 'BEGIN{FS="\.\."}{print $1, $3}'
    A C
    ```

    Il est possible de spécifier FS en dehors du bloc BEGIN, avec l'option `-F`

    ``` bash
    $ echo "A,B,C" | awk -F',' '{print $1, $3}'
    A C
    ```

  - `OFS` (Output Field Separator)  
    Séparateur des champs en sortie. Par défaut: " "

      ``` bash
      $ echo "A B C" | awk 'BEGIN{OFS=","}{print $1, $3}'
      A,C
      ```

  - `RS` (Record Separator)  
    Séparateur des lignes en entrée. Par défaut: "\n"

      ``` bash
      $ echo "A B C / D E F" | awk 'BEGIN{RS=" / "}{print $1, $3}'
      A C
      D F
      ```

  - `ORS` (Output Record Separator)  
    Séparateur des lignes en sortie. Par défaut: "\n"

      ``` bash
      $ echo -e "A B C\nD E F" | awk 'BEGIN{ORS=".."}{print $1, $3}'
      A C..D F..
      ```

- Les variables contextuelles sont définies par awk à l'exécution de chaque bloc

  - `$0` contient la ligne en cours

    ``` bash
    $ sudo awk '/idVendor/{print substr($0, 58)}' /var/log/kern.log | tail
    usb 3-9: New USB device found, idVendor=27c6, idProduct=5335, bcdDevice= 1.00
    usb 2-2: New USB device found, idVendor=05e3, idProduct=0626, bcdDevice=62.13
    usb 3-8: New USB device found, idVendor=05e3, idProduct=0610, bcdDevice=62.13
    usb 3-8.1: New USB device found, idVendor=25a4, idProduct=9311, bcdDevice= 2.01
    usb 3-8.2: New USB device found, idVendor=046d, idProduct=c52b, bcdDevice=24.11
    usb 2-1: New USB device found, idVendor=05e3, idProduct=0626, bcdDevice=62.13
    usb 3-6: New USB device found, idVendor=05e3, idProduct=0610, bcdDevice=62.13
    usb 2-1: New USB device found, idVendor=05e3, idProduct=0626, bcdDevice=62.13
    usb 3-6.2: New USB device found, idVendor=1bcf, idProduct=0005, bcdDevice= 0.14
    usb 3-6.1: New USB device found, idVendor=0bda, idProduct=2171, bcdDevice= 1.a4
    ```

  - `$1` contient le 1er champ, `$2` le 2ème champ, etc.  
    `$NF` contient la valeur du dernier champ

    ``` bash
    $ echo "A B C" | awk '{print $1, $3, $NF}'
    A C C
    ```

  - `NF` (Number Field)  
    Nombre de champs de la ligne

    ``` bash
    $ echo -e "A A\nB B B" > file

    $ awk '{print NF, $1}' file
    2 A
    3 B
    ```

  - `FILENAME`  
    Nom du fichier en entrée (vaudra "-" pour stdin)

    ``` bash
    $ awk '{print FILENAME, $1}' file
    file A
    file B
    ```

  - `NR` (Number Record)  
    Numéro de ligne

    ``` bash
    $ awk '{print NR, $1}' file
    1 A
    2 B
    ```

  - `FNR` (File Number Record)  
    Numéro de ligne relativement au fichier en cours

    ``` bash
    $ echo -e "A B C\nD E F" > file_a
    $ echo -e "G H I\nJ K L" > file_b

    $ awk '{print NR, FILENAME ":" FNR, $0}' file_{a,b}
    1 file_a:1 A B C
    2 file_a:2 D E F
    3 file_b:1 G H I
    4 file_b:2 J K L
    ```

---

## Instructions awk

### Afficher du texte

#### print

* L'instruction `print` permet d'afficher du texte. On peut 

    - afficher une variable: `print varname`

        ``` bash
        $ echo -e 'A B\nC D' | awk '{print $1}'
        A
        C

        $ echo -e 'A B\nC D' | awk 'BEGIN{example = ""}{example = example $1}END{print example}'
        AC

        $ echo -e 'A B\nC D' | awk '{print NR}'
        1
        2
        ```

    - ou afficher une chaîne de caractères: `print "text"`

        ``` bash
        $ echo -e 'A B\nC D' | awk '{print "-> " $1}'
        -> A
        -> C
        ```

        Pour afficher une quote, utiliser "\x27" ou "'\''"

        ``` bash
        $ echo -e 'A B\nC D' | awk '{print "\x27" $1 "'\''"}'
        'A'
        'C'
        ```

        Pour afficher une double-quote, utiliser "\x22" ou "\""

        ``` bash
        $ echo -e 'A B\nC D' | awk '{print "\x22" $1 "\""}'
        "A"
        "C"
        ```

* Si aucun argument n'est donné à `print`, alors l'instruction affiche la ligne en cours ($0)

    ``` bash
    $ echo -e 'A B\nC D' | awk '{print}'
    A B
    C D
    ```

* Toutes les variables et chaînes de caractères sont concaténées, les espaces qui se situent entre eux sont ignorés.  
  Pour afficher un espace, mettre l'espace à l'intérieur de quotes, ou alors utiliser la virgule — qui sera remplacée par OFS.

  ``` bash
  # Espace ignoré
  $ echo -e 'A B\nC D' | awk '{print NR $1}'
  1A
  2C

  # Espace entre quotes
  $ echo -e 'A B\nC D' | awk '{print NR " " $1}'
  1 A
  2 C

  # Virgule avec OFS par défaut (= espace)
  $ echo -e 'A B\nC D' | awk '{print NR, $1}'
  1 A
  2 C

  # Virgule avec OFS = "-"
  $ echo -e 'A B\nC D' | awk -v OFS='-' '{print NR, $1}'
  1-A
  2-C
  ```

#### printf

* `printf` permet de formatter une chaîne de caractères — même principe que le [% Python](https://www.golinuxcloud.com/python-string-format/).  
  Contrairement à print, printf n'ajoute pas automatiquement de retour chariot à la fin.

    ``` bash
    $ echo -e "Aaaaaa Bbbb\nCc Dddddd" | awk '{printf("%-10s %03d\n", $1, NR)}'
    Aaaaaa     001
    Cc         002
    ```

### Manipuler du texte

#### length

* `length` retourne le nombre de carctères

    ``` bash
    $ echo "A/b/c" | awk '{print length($0)}'
    5
    ```

#### index

* `index` retourne la position (à partir de 1) de la première occurence d'un caractère donné.  
  0 si aucune occurence

    ``` bash
    $ echo "A/b/c" | awk '{print index($0, "/")}'
    2
    ```

#### tolower

* `tolower` change la casse en minuscules

    ``` bash
    $ echo "A/b/c" | awk '{print tolower($0)}'
    a/b/c
    ```

#### toupper

* `toupper` change la casse en majuscules

    ``` bash
    $ echo "A/b/c" | awk '{print toupper($0)}'
    A/B/C
    ```

#### substr

* `substr` tronque la chaîne de caractère

    ``` bash
    # Du caractère 2 et jusqu'à la fin
    $ echo "A/b/c" | awk '{print substr($0, 2)}'
    /b/c

    # Du caractère 0 à 2
    $ echo "A/b/c" | awk '{print substr($0, 0, 2)}'
    A/

    # Le dernier caractère
    $ echo "A/b/c" | awk '{print substr($0, length($0))}'
    c
    ```

#### match

* `match` permet de vérifier si une variable correspond à un motif donné.  
   À l'appel de cette fonction, deux variables contextuelles sont définies:

   - `RSTART`: position (à partir de 1) du match. Vaudra 0 si aucune occurence.  
     Cette valeur est également retournée par la fonction `match`

   - `RLENGTH`: longueur du match (greedy)

    ``` bash
    $ cat <<'NOWDOC' > script
    {
        # Contient une lettre minuscule?
        if(match($0, /[a-z]/)){

            # L'afficher
            print substr($0, RSTART, RLENGTH)
        }
    }
    NOWDOC
    $ echo "A/b/c" | awk -f script
    b
    ```

#### sub

* `sub` permet de remplacer un match par autre chose. Utilise un pointeur  
  Les backreferences ne sont pas supportées

    ``` bash
    $ echo "A/b/c" | awk '{sub(/\//, "-", $0); print $0}'
    A-b/c
    ```

* `gsub`, même principe que sub mais pour toutes les occurences. Utilise également un pointeur

    ``` bash
    $ echo "A/b/c" | awk '{gsub(/\//, "-", $0); print $0}'
    A-b-c
    ```

#### split

* `split` permet de séparer les caractères d'une chaîne de caractère, suivant un délimiteur donné, dans un tableau.  
  La second argument est le nom de la variable dans lequel le tableau sera crée — inutile de la déclarer au préalable.
  Et la fonction retourne la longueur du tableau créé.  

    ``` bash
    $ cat <<'NOWDOC' > script
    BEGIN{
        FS=","
    }
    {
        # Split $1 en nom prenom
        split($1, aName, / /);
        print "Prenom: " aName[1]
        print "Nom: " aName[2]

        # Affiche $2
        print "Adresse:" $2
    }
    NOWDOC

    $ echo "Bob Smith, 1 rue au Hasard" | awk -f script
    Prenom: Bob
    Nom: Smith
    Adresse: 1 rue au Hasard
    ```

### Manipuler des nombres

* `rand` permet de récupérer un nombre aléatoire (float) entre 0 et 1 — [0;1[

    ``` bash
    # Décimal entre 0 (inclus) et 1 (non inclus)
    $ echo -e "alice\nbob\ncharlie" | awk '{printf ("%10s %s\n", $1, rand())}'
         alice 0.669321
           bob 0.312382
       charlie 0.985882

    # Entier entre entre 0 (inclus) et 10 (inclus)
    $ echo -e "alice\nbob\ncharlie" | awk '{printf ("%10s %s\n", $1, int(rand()*11))}'
         alice 1
           bob 3
       charlie 8
    ```

* Autres fonctions utiles:

    ``` txt
    sqrt(a)           Racine carrée
    sin(a)            Sinus
    cos(a)            Cosinus
    log(a)            Logarithme népérien
    exp(a)            Exponentielle

    var+0             Parsefloat (récupérer les chiffres en début de texte)
    int(var)          Parseint (tronquer les décimales)
    ```

[Built-in Functions awk](https://www.gnu.org/software/gawk/manual/gawk.html#Built_002din)

---

## Filtres

* Il est possible de filtrer les lignes sur lesquelles un bloc d'instruction doit être appliqué.  
  Ce peut être un filtre sur
  
  - Les lignes qui matchent une regex (syntaxe POSIX BRE)

    ``` bash
    $ echo -e "1 alice\n---\n3 bob\n4\n5 david\n---\n7 <deleted>" > file

    $ awk '/^[[:digit:]]/{print}' file
    1 alice
    3 bob
    4
    5 david
    7 <deleted>
    ```

    Les lignes qui ne matchent pas une regex:

    ``` bash
    $ awk '!/^[[:digit:]]/{print}' file
    ---
    ---
    ```

  - Les lignes dont un champ donné matche une regex (POSIX BRE)

    ``` bash
    $ awk '$2~/^[[:alpha:]]/{print}' file
    1 alice
    3 bob
    5 david
    ```

    Les lignes dont un champ donné ne matche pas:

    ``` bash
    $ awk '$2!~/^[[:alpha:]]/{print}' file
    ---
    4
    ---
    7 <deleted>
    ```

  - Ou encore en fonction de la valeur d'une variable — et notamment des variables contextuelles  
    (numéro de ligne, nombre de champs, valeur d'un champ...)

    ``` bash
    # Les lignes qui ont 2 champs
    $ awk 'NF==2{print}' file
    1 alice
    3 bob
    5 david
    7 <deleted>
    ```

    Différents types de comparaison sont possibles pour tester la valeur d'une variable: ==, !=, <, <=, >, >=.  
    Example: `NF!=2`

    ``` bash
    # Les lignes qui n'ont pas deux champs
    $ awk 'NF!=2{print}' file
    ---
    4
    ---
    ```

    Il est également possible d'utiliser les opérateurs mathématiques.  
    Example: `NF%2==0` pour filtrer sur les lignes paires (lignes 2,4,6,etc)

* On peut utiliser des opérations logiques:

  - inverser un filtre: `!`

  - filtre 1 OU filtre 2: `||`

    ``` bash
    # La ligne 3 ou la ligne 5
    $ awk 'NR==3 || NR==5{print}' file
    3 bob
    5 david
    ```

  - filtre 1 ET filtre 2: `&&`

    ``` bash
    # À partir de la ligne 3, les lignes qui contiennent plus d'1 champ
    $ awk 'NR>=3 && NF>1{print}' file
    3 bob
    5 david
    7 <deleted>
    ```

  - les parenthèses sont admises pour modifier les priorités

    ``` bash
    # Toutes les lignes sauf la 3 et la 5
    $ awk '!(NR==3 || NR==5){print}' file
    ---
    4
    ---
    7 <deleted>
    ```

* Pour filtrer sur les lignes ENTRE deux filtres: `,`

  ``` bash
  # De la ligne 3 à la ligne 5
  $ awk 'NR==3, NR==5{print}' file
  3 bob
  4
  5 david
  ```

  EOF (End Of File) est un filtre désignant la dernière ligne du fichier.

  ``` bash
  # De la première ligne qui contient "---" à la fin du fichier
  $ awk '/---/, EOF{print}' file
  ---
  3 bob
  4
  5 david
  ---
  7 <deleted>
  ```

* Lorsque plusieurs blocs sont utilisés:  
  si une ligne matche plusieurs blocs, alors tous ces différents blocs sont exécutés — et pas seulement le premier

  ``` bash
  # Bloc1: sur toutes les lignes qui contiennent "---", passer open à 0 ou 1
  # Bloc2: afficher les lignes entre "---" open, et "---" non open
  $ awk -v open=0 '/---/{open=1-int(open)} open==1&&/---/, open==0&&/---/{print}' file
  ---
  3 bob
  4
  5 david
  ---
  ```

---

## Langage de programmation

### Commentaires

    # Commentaire

### If

    if(NF<2) {
        print "Un seul champ"
    } else if(NF==2) {
       printf "Deux champs"
    } else {
       print "Plus de deux champs"
    }

<!-- -->

    print NF<2 ? "Un" : "Plusieurs"

<ins>Regex</ins>:

| Opérateur | Opération        |
| ---       | ---              |
|     ~     | matche une regex |
|     !~    | ne matche pas    |
    
    open = 0
    if ($0~/^---/) {
      open = 1-open
    }

### For

    for(i=1; i<=3; i++) {
        print $i
    }

<!-- -->

    aName["prenom"]="Jean"
    aName["nom"]="Dupont"

    for(k in aName) {
        print k ": " aName[k]
    }

<details>
<summary>
<ins>Exemple</ins>: Transformer des données tabulaires en un tableau HTML
</summary>

<pre lang="bash">
# Données tabulaire
$ cat &lt;&lt;'NOWDOC' &gt; data
Gretchen Galloway   268 178 256 259 282 139 167
Isaac Steele    253 155 210 195 225 172 202
Wayne Myers 290 283 227 243 128 221 103
Lillith Lee 148 127 260 131 180 125 121
Molly Blackwell 299 143 202 267 222 159 227
Maia Arnold 204 198 294 158 254 205 253
Lev Reese   180 278 156 170 261 283 113
Carlos Guthrie  289 205 117 138 232 278 169
Sophia Buck 112 104 191 112 147 294 280
Vincent Mitchell    270 153 207 175 252 202 233
Buffy Harris    206 107 187 286 286 244 156
Reuben Miles    247 227 170 237 133 188 276
Brendan Fowler  265 166 145 278 170 237 291
Mason Hancock   217 231 271 187 284 179 262
Nigel Boone 236 282 196 143 290 284 129
Gretchen Foreman    276 228 186 223 156 257 161
Serena Goodman  189 145 137 155 211 183 133
Shoshana Velez  281 120 125 199 252 296 287
Eve Hughes  236 176 249 173 158 146 216
NOWDOC

# Script awk pour créer un tableau HTML
$ cat &lt;&lt;'NOWDOC' &gt; script
BEGIN{
    print '&lt;table&gt;';
    print '&lt;th&gt;Name&lt;/th&gt;';
    for(i=1; i&lt;=7; i++) {
        print '&lt;th&gt;Round ' i '&lt;/th&gt;'
    }
}
{
    print '&lt;tr&gt;';
    for(i=1; i&lt;=8; i++) {
        print '&lt;td&gt;' $i '&lt;/td&gt;';
        total[i] += $i
    }
    print '&lt;tr&gt;'
}
END {
    print '&lt;tr&gt;';
    print '&lt;td&gt;Total&lt;/td&gt;';
    for(i=2; i&lt;=8; i++) {
        print '&lt;td&gt;' int(total[i]/NR) '&lt;/td&gt;'
    }
    print '&lt;/tr&gt;';
    print '&lt;/table&gt;'
}
NOWDOC

# Appel au script awk sur les données
$ awk -F' ' -f script data | head -20
&lt;table&gt;
&lt;th&gt;Name&lt;/th&gt;
&lt;th&gt;Round 1&lt;/th&gt;
&lt;th&gt;Round 2&lt;/th&gt;
&lt;th&gt;Round 3&lt;/th&gt;
&lt;th&gt;Round 4&lt;/th&gt;
&lt;th&gt;Round 5&lt;/th&gt;
&lt;th&gt;Round 6&lt;/th&gt;
&lt;th&gt;Round 7&lt;/th&gt;
&lt;tr&gt;
&lt;td&gt;Gretchen&lt;/td&gt;
&lt;td&gt;Galloway&lt;/td&gt;
&lt;td&gt;268&lt;/td&gt;
&lt;td&gt;178&lt;/td&gt;
&lt;td&gt;256&lt;/td&gt;
&lt;td&gt;259&lt;/td&gt;
&lt;td&gt;282&lt;/td&gt;
&lt;td&gt;139&lt;/td&gt;
&lt;tr&gt;
&lt;tr&gt;
</pre>
</details>

### While

    i=0
    while(i++ < 10) {
         print i
    }

<!-- -->

    i=0
    do {
       print i
    } while(++i < 10);

### Break, continue

    break
    continue

### Variable

#### Incrémentation

Post-incrémentation (retourne la valeur en cours puis incrémente la variable)

    a++
    a--

Pré-incrémentation (incrémente la variable puis retourne la nouvelle valeur)

    ++a
    --a

#### Opérations mathématiques

| Opérateur | Opération      |
| ---       | ---            |
|     +     | plus           |
|     -     | moins          |
|     *     | multiplication |
|     /     | division       |
|     %     | modulo         |
|     ^     | puissance      |

    a  = a + 2
    a += 2

### Fonctions

    function pwr(a, b) {
      return exp(b*log(a))
    }
    pwr($1, $2)

---

## Multiligne

Par défaut, awk commence par la première ligne du document, exécute les différents blocs, avance d'une ligne, ré-exécute, etc.  
Il est également possible de récupérer la valeur de plusieurs lignes dans un bloc:

* `getline var` permet de récupérer la ligne suivante et la mettre dans la variable "var".  
  Retourne 1 si une ligne a été récupéré, 0 sinon — si on est à la fin du document

  ``` bash
  # Concaténer toutes les deux lignes
  $ echo -e "a\nb\nc\nd" | awk '{ getline nextRow; print $0, nextRow }'
  a b
  c d
  ```
  ``` bash
  # Supprimer les retours à la ligne à l'intérieur de quotes
  $ cat <<'NOWDOC' > script
  {
    # -- si le dernier champ commence par une quote
    if($NF~/^"[^"]+$/){

      # -- tant que la ligne ne finit pas par une quote
      while($0!~/"$/) {

        # -- récupérer la ligne suivante — s'arrêter si on est à la fin du document
        if(!getline nextRow) break;

        # --- ajouter la ligne à $0
        $0 = $0 nextRow;
      }
    }
    # -- afficher $0
    print $0
  }
  NOWDOC

  $ echo -e '"a\nb\nc"\nd' | awk -f script
  "abc"
  d
  ```
