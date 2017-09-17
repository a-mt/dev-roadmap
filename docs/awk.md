---
title: Awk
category: Linux
---

Awk permet d'extraire et manipuler des données organisées par lignes et colonnes dans un fichier texte.  
C'est un outil qui contient tous les éléments d'un langage de programmation (conditions, opérations mathématiques, etc)  
Nommé d'après ses inventeurs : Al **A**ho, Peter **W**einberger et Briand **K**ernighan. Crée en 1978.

---

Convention :
Le résultat d'une commande est indiqué après les `#`.
Pour indiquer les caractères d'espace, de tabulation et les retours chariots, des caractères de remplacement sont utilisés :

| Caractère spécial | Caractère affiché |
|---                |---                |
| Tabulation        | &#x2E3A;          |
| Espace            | &#xB7;            |
| Retour chariot    | &#xAC;            |

---

## Execution

### Source de données

Les données en entrées peuvent provenir d'un ou des fichiers ou de stdin (pipeline).  
Ici `..` remplace les commandes à éxécuter

    awk .. file              Executer awk sur le contenu du fichier "file"
    awk .. file file2        Executer awk sur le contenu des fichiers "file" et "file2" (concaténés)
    awk ..                   Executer awk sur stdin
                             Si stdin est vide, démarre un prompt interractif (CTRL + D pour terminer)

Par exemple : `echo "A,B" | awk 'BEGIN{FS=","}{print $1}' # A`

### Commandes à executer

Les commandes awk sont executées ligne par ligne de haut en bas sur les données en entrée.  
Ici, on part du principe que la source de données est stdin

    awk '{cmd}'              Executer une commande sur chaque ligne
    awk '{cmd; cmd2}'        Executer deux commandes sur chaque ligne
    awk '{cmd} {cmd2}'       Idem

<!-- -->

    awk 'BEGIN{cmd}'         Executer une commande avant de lire les données en entrées
                             (Pour définir des variables par exemple)
    awk 'END{cmd}'           Executer une commande en fin de processus
                             (Pour afficher des totaux par exemple)
<!-- -->

    awk -f script file       Executer les commandes contenues dans le fichier "script"

### Configuration

On peut déclarer des variables dans un block `BEGIN` ou via les options de la commande awk

Avec les options :

    awk -v var=value         Définir une variable

    awk -F"..."              Spécifier le délimiteur à utiliser (caractère de séparation des données en entrée)
    awk -F"+-"               Utiliser "+-" comme délimiteur
    awk -F"[+-]"             Utiliser "+" ou "-" comme délimiteur

Avec un block `BEGIN` :

    awk 'BEGIN{var=value}'   Définir une variable

    awk 'BEGIN{FS="..."}'    Spécifier le délimiteur à utiliser
    awk 'BEGIN{FS="+-"}'     Utiliser "+-" comme délimiteur
    awk 'BEGIN{FS="[+-]"}'   Utiliser "+" ou "-" comme délimiteur

Le séparateur par défaut est `"[\t ]+"` (une ou plusieurs tabulation ou espace)

### Exemples

Afficher la 2ème colonne de chaque ligne :

`echo -e 'A:1 \n
B:2 \n
C:3 \n
D:4' | awk 'BEGIN{FS=":"}{print $2}' # 1¬2¬3¬4`

Afficher le total de la 2ème colonne :

`echo -e 'A:1 \n
B:2 \n
C:3 \n
D:4' | awk 'BEGIN{FS=":"; total=0}{total+=$2}END{print total}' # 10`

Changer le délimiteur pour éviter que les colonnes vides décalent la numérotation des colonnes :

`echo -e "1\t \t3" | awk '{print " 1:"$1 " 2:"$2 " 3:"$3}'               #  1:1 2:3 3: `  
`echo -e "1\t \t3" | awk 'BEGIN{FS="\t"}{print " 1:"$1 " 2:"$2 " 3:"$3}' # 1:1 2:  3:3`

---

## Print / printf

La commande `print` peut afficher la valeur de champs, de variables ou des chaînes de caractères.  
La commande `printf` est quasimment identique à `print`, à la différence près que `print` affiche un retour chariot à la fin et `printf` non.

`echo -e "A\tB" | awk '{print}'  # A⸺B`

    print $0       # A⸺B    Afficher la ligne en cours. Idem que print sans argument
    print $2       # B        Afficher la valeur du 2ème champ
    print $2 $1    # BA       Afficher les colonnes 2 et 1. Les espaces sont ignorés
    print $2" "$1  # B·A      Mettre entre quotes pour garder les espaces
    print $2,$1    # B·A      "," est remplacé par la valeur de la variable OFS (valeur par défaut : espace)

`echo -e "1\n2\n3" | awk 'BEGIN{sum=0}{sum+=$1; print sum}END{print "total:" sum}' # 1¬3¬6¬total:6`

    print "total"  # total    Afficher la chaîne de caractères "total"
    print total    # 6        Afficher la valeur de la variable total

<!-- -->

    print "\x27"   # '        Afficher une quote
    print "'\''"   # '        Idem
    print "\x22"   # "        Afficher une double-quote
    print "\""     # "        Idem

### Formatter un nombre

`echo -e "1.1A \n 1.2B \n 2C" | awk '{print $1+0}' # 1.1¬1.2¬2`

    print var+0          # 1.1     Convertir en nombre (entier ou réel)
                                   Récupérer les chiffrees en début de texte

    print int(var)       # 1       Convertir en entier
                                   Tronquer les décimales

    printf("%d\n", var)  # 1       Convertir en entier
    printf("%.2f", var)  # 1.10    Arrondir sur 2 décimales
    printf("%03d", var)  # 001     Afficher le nombre sur 3 chiffres (compléter par des 0 à gauche)

### Formatter du texte

 `echo -e "1.1A\n1.2B\n2C" | awk '{ printf("%4s,\n", $1) }' # 1.1A,¬1.2B,¬  2C,`
 
    printf("%4s", var)   #   2C,   Afficher sur 4 caractères, aligner à droite
    printf("%-4s", var)  # 2C  ,   Afficher sur 4 caractères, aligner à gauche

---

## Variables magiques

awk définit des variables au cours de son execution, certaines qui s'appliquent à l'ensemble du document, d'autres à la ligne en cours.
Les variables qui s'appliquent à l'ensemble du document (les délimiteurs) peuvent être modifiée dans un block `BEGIN` pour changer le comportement de awk

    FS             Délimiteur de champs en entrée (Field Separator, défaut " ")
    OFS            Délimiteur de champs en sortie (Output Field Separator, défaut " ")
    RS             Délimiteur de ligne en entrée (Record Separator, défaut "\n")
    ORS            Délimiteur de lignes en sortie (Output Record Separator, défaut "\n")

    NF             Nombre de champs de la ligne (Number Field)
    FILENAME       Nom du fichier en entrée (ou "-" pour stdin)
    NR             Numéro de ligne (Number Record)
    FNR            Numéro de ligne relativement au fichier en cours (File Number Record)

### Exemples

Modifier OFS :

`echo -e "A\tB" | awk '{print $2, $1}' # B·A`  
`echo -e "A\tB" | awk 'BEGIN{OFS="-"}{print $2, $1}' # B-A`

Afficher le nombre de champs :

`echo -e "A A\nB B B" | awk '{printf("%d%s\n", NF, $1)}' # 2A¬3B`

Afficher le numéro de ligne et nom de fichier :

`echo "A" > tmp1`  
`echo -e "A\nB" > tmp2`  
`awk '{print NR, "(" FILENAME ", " FNR "):", $0}' tmp1 tmp2`  
`# 1 (tmp1, 1): A¬`  
`# 2 (tmp2, 1): A¬`  
`# 3 (tmp2, 2): B`

---

## Filtres

Il est possible de filtrer les lignes sur lesquelles appliquer awk :
- les lignes qui matchent une regex (syntaxe POSIX BRE)
- les lignes dont un champs donné matche une regex (POSIX BRE)
- en fonction de la valeur d'une variable (notamment les variables magiques : numéro de ligne, nombre de champs, valeur d'un champ...)

On peut également inverser un filtre avec `!`

### Regex ligne

`echo -e "ABC\nAB\nBC" | awk '/C/{print NR, $0}' # 1·ABC¬3·BC`

    /up/        Les lignes qui contiennent /up/
    !/up/       Les lignes qui NE contiennent PAS /up/

### Regex champ

    $4~/up/     Dont le 4ème champs contient "up"
    $4!~/up/    Dont le 4ème champs ne contient pas "up"

### Test variable

Tous les types de comparaison sont possibles (==, !=, <, <=, >, >=) pour tester la valeur d'une variable : `NF==2`  
Il est également possible d'utiliser les opérateurs mathématiques : `NF%2==0`

`echo -e "A B C\nA B\nB C" | awk 'NR%2!=0{print NR, $0}' # 1·A·B·C¬3·B·C`

    NF==2        Les lignes qui contiennent 2 champs
    NR>=2        À partir de la 2ème ligne
    NR%2==0      Les lignes pairs (lignes 2,4,6,etc)

<!-- -->

    $2=="up"     Les lignes dont la VALEUR du 2ème champs vaut "up"
    $NF=="up"    Les lignes dont la VALEUR du dernier champs vaut "up"

### Utiliser plusieurs filtres

Il est possbile de combiner plusieurs filtres,
- filtrer sur les lignes qui matchent un premier filtre OU un deuxième : `||`
- filtrer sur les lignes qui matchent un premier filtre ET un deuxième : `&&`
- filtrer non pas sur les lignes qui correspondent à un filtre donné mais qui se situent ENTRE deux filtres : `,`
  (par exemple pour filtrer de la ligne x à la ligne y, ou pour récupérer l'ensemble des lignes situées entre deux délimiteurs de ligne.)  
  EOF permet de matcher jusqu'à la fin du fichier (End Of File). 

Les parenthèses sont admises pour modifier les priorités : `!(NR==3 || NR==5)`

#### ET

À partir de la ligne 3, les lignes qui ont plus d'un champs :

`echo -e "1\n2\n3\n4 a\n5 b\n6\n7" | awk 'NR>=3 && NF>1{print}' # 4·a¬5·b`

#### OU

Soit la ligne 3, soit la ligne 5 :

`echo -e "1\n2\n3\n4\n5\n6\n7" | awk 'NR==3 || NR==5{print}' # 3¬5`

#### DE... À

De la ligne 3 à la ligne 5 :

`echo -e "1\n2\n3\n4\n5\n6\n7" | awk 'NR==3, NR==5{print}' # 3¬4¬5`

À partir de la ligne qui contient "---" jusqu'à la fin :

`echo -e "1\n---\n3\n4\n5\n---\n7" | awk '/---/,EOF{print} # ---¬3¬4¬5¬---¬7'`

#### Combiner

De la ligne qui contient "---" et où open==0, à la ligne qui contient "---" et où open==1 :

`echo -e "1\n---\n3\n4\n5\n---\n7" | awk 'BEGIN{open=0} /---/,open==1&&/---/{open=1; print} # ---¬3¬4¬5¬---'`

Tous les blocks admettent des filtres. Si une ligne matche les deux conditions, elle sera affichée 2 fois :

`echo -e "AB\nBC\nAC" | awk '/A/{print "A:", $0} /B/{print "B:", $0}' # A:·AB¬B:·AB¬B:·BC¬A:·AC`

---

## Langage de programmation

Pour rappel, awk peut executer les commandes qui se situent dans un fichier : `awk -f script file`.
Cela permet de créer plus facilement des commandes plus complexes et d'inclure des boucles, conditions, etc, sans avoir à se soucier des retours à la ligne.
La syntaxe awk est la suivante :

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

#### Exemple

Transformer des données séparées par tabulation et retours à la ligne en un tableau HTML  
Données (fichier scores.txt) :

    Gretchen Galloway	268	178	256	259	282	139	167
    Isaac Steele	253	155	210	195	225	172	202
    Wayne Myers	290	283	227	243	128	221	103
    Lillith Lee	148	127	260	131	180	125	121
    Molly Blackwell	299	143	202	267	222	159	227
    Maia Arnold	204	198	294	158	254	205	253
    Lev Reese	180	278	156	170	261	283	113
    Carlos Guthrie	289	205	117	138	232	278	169
    Sophia Buck	112	104	191	112	147	294	280
    Vincent Mitchell	270	153	207	175	252	202	233
    Buffy Harris	206	107	187	286	286	244	156
    Reuben Miles	247	227	170	237	133	188	276
    Brendan Fowler	265	166	145	278	170	237	291
    Mason Hancock	217	231	271	187	284	179	262
    Nigel Boone	236	282	196	143	290	284	129
    Gretchen Foreman	276	228	186	223	156	257	161
    Serena Goodman	189	145	137	155	211	183	133
    Shoshana Velez	281	120	125	199	252	296	287
    Eve Hughes	236	176	249	173	158	146	216

Awk :

    # Contenu du fichier "script" :
    BEGIN{
        print "<table>";
        print "<th>Name</th>";
        for(i=1; i<=7; i++) {
            print "<th>Round " i "</th>"
        }
    }
    {
        print "<tr>";
        for(i=1; i<=8; i++) {
            print "<td>" $i "</td>";
            total[i] += $i
        }
        print "<tr>"
    }
    END {
        print "<tr>";
        print "<td>Total</td>";
        for(i=2; i<=8; i++) {
            print "<td>" int(total[i]/NR) "</td>"
        }
        print "</tr>";
        print "</table>"
    }

`awk -F"\t" -f script scores.txt `

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

### Expressions

#### Regex

| Opérateur | Opération        |
| ---       | ---              |
|     ~     | matche une regex |
|     !~    | ne matche pas    |
    
    open = 0
    if ($0~/^---/) {
      open = 1-open
    }

#### Incrémentation

Post-incrémentation (retourne la valeur en cours puis incrémente la variable)

    a++
    a--

Pré-incrémentation (incrémente la variable puis retourne la nouvelle valeur)

    ++a
    --a

#### Maths

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


### Fonctions prédéfinies

#### Maths

    rand()             Nombre aléatoire (float) entre 0 et 1 ([0;1[)
    int(rand()*6)+1    Nombre aléatoire (entier) entre 1 et 6 ([1;6])
    
<!-- -->

     sqrt(a)           Racine carré
     sin(a)            Sinus
     cos(a)            Cosinus
     log(a)            Logarithme népérien
     exp(a)            Exponentielle

#### Chaine de caractères

`echo "A/b/c" | awk '{print length($0)}' # 5`

     length(a)         # 5         Nombre de caractères
     index(a, "/")     # 2         Position de la première occurence de "/" (à partir de 1. 0 si aucune occurence)
     tolower(a)        # a/b/c     En minuscules
     toupper(a)        # A/B/C     En majuscules
     
     substr(a, 2)     # /b/c       Caractères jusqu'à la fin, à partir du 2ème
     substr(a, 0, 2)  # A/         2 caractères, à partir du début

#### Regex

Pour des besoins plus complexes que simplement vérifier si le texte matche une regex, awk dispose de fonctions.
 
`echo "A/b/c" | awk '{if(match($0, /[a-z]/)){ print substr($0, RSTART, RLENGTH) }}' # b`

     match($0, /A/)        # 1     Position de la première occurence de /A/ (à partir de 1. 0 si aucune occurence)
                                   Deux variables sont settées :
                                   - RSTART : position du match (valeur également retournée par la fonction)
                                   - RLENGTH : longueur du match (greedy)

     sub(/\//, "-", $0)    # 1     Remplace la première occurence de /\// (= "/") par "-" dans $0 (pointeur)
                                   Retourne le nombre de remplacements effectués (0 ou 1)

     gsub(/\//, "-", $0)   # 2     Remplace la première occurence de /\// (= "/") par "-" dans $0 (pointeur)
                                   Retourne le nombre de remplacements effectués (de 0 à n)

     split($0, var, /\//)  # 3     Sépare tous les caractères délimités par /\// dans la variable var
                                   Retourne la longueur du tableau crée
                                   Il est inutile de déclarer la variable var au préalable

##### Exemples

Remplacer des caractères :

`echo "A/b/c" | awk '{sub(/\//, "-", $0); print $0}' # A-b/c`  
`echo "A/b/c" | awk '{gsub(/\//, "-", $0); print $0}' # A-b-c` 

Utiliser split :

    # Contenu du fichier "script" :
    {
        # Split nom prenom
        split($1, aName, / /);
        print "Prenom: " aName[1]
        print "Nom: " aName[2]

        # Adresse
        print "Adresse:" $2
    }

<!-- -->

    echo "Bob Smith, 1 rue au Hasard" | awk -F, -f script
    # Prenom: Bob
    # Nom: Smith
    # Adresse: 1 rue au hasard

---

## Multiligne

awk commence au début du document et execute les commandes ligne par ligne en avançant d'une ligne à fin de chaque commande.
Mais il est également possible d'avancer d'une ligne (ou de plusieurs) à l'intérieur d'une commande.

    getline var       Récupérer la ligne suivante et la mettre dans la variable var
                      Retourne 1 si une ligne a été récupéré, 0 sinon (fin du document)

### Exemples

Concaténer toutes les deux lignes :

`echo -e "a\nb\nc\nd" | awk '{ getline nextRow; print $0, nextRow } # a·b¬c·d'`

Supprimer les retours à la ligne à l'intérieur de quotes :

    # Contenu du fichier "script" :
    {
      if($NF~/^"[^"]+$/){
        while($0!~/"$/) {
          if(!getline nextRow) break;
          $0 = $0 nextRow;
        }
      }
      print $0
    }

<!-- -->

    echo -e '"a\nb\nc"\nd' | awk -f script # "abc"¬d
