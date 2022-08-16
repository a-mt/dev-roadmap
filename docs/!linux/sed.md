---
title: Sed
category: Linux
---

Sed (Stream EDitor) permet de manipuler des chaines de caractères : remplacer, ajouter, supprimer des caractères,
ou sur des lignes, filtrer, inverser. Crée en 1973 par Bell Labs.

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

Les données en entrées peuvent provenir d'un ou des fichiers ou de stdin (pipeline) - exactement pareil que awk.  
Ici `..` remplace les commandes à executer

    sed .. file          Executer sed sur le contenu du fichier "file"
    sed .. file file2    Executer sed sur le contenu des fichiers "file" et "file2" (concaténés)
    sed ..               Executer sed sur stdin
                         Si stdin est vide, démarre un prompt interractif (CTRL + D pour terminer)

Par exemple : `echo "abc" | sed 's/a/A/' # Abc`

### Commandes à executer

    sed -e cmd -e cmd2 file    Executer deux commandes
                               La deuxième commande est executée sur le résultat de la première
    sed -f script file         Executer les commandes contenues dans le fichier "script"

### Options

    sed -i .. file       Executer sed sur le contenu du fichier "file" et écrire le résultat dans ce même fichier
    sed -n ..            Executer sed sans afficher le résultat
                         Généralement utilisé avec le flag p pour n'afficher que les lignes ayant subit des changements

#### Exemple

`echo -e "a\nb\nc" | sed '3p'    # a¬b¬c¬c`  
`echo -e "a\nb\nc" | sed -n '3p' #¬c`

Sed ignore les espaces :


`echo -e "a\nb\nc" | sed '3 p'    # a¬b¬c¬c` 

---

## Substitutions

`echo "aaa" | sed 's/a/b/' # baa`

    s/old/new/          Remplacer la première occurence de /old/ par "new"
                        Regex POSIX BRE, ERE possible en échappant les caractères
                        N'importe quel délimiteur peut être utilisé

    s/old//             Supprimer la première occurence de /old/
                        = Remplacer par rien

    s/old/new/g          Remplacer toutes les occurences de /old/ par "new"
    s/old/new/2          Remplacer la 2ème occurence de /old/ par "new"

Backreferences possibles dans la chaîne de substitution :

    \1                   1er groupe capturant
    &                    Chaîne matchée complète

### Exemples

`echo "aaa" | sed 's/a\{2\}/b/' # ab`  
`echo "aaa" | sed 's/a\+/b/' # b`  
`echo "aaa" | sed 's/a/b/g' # bbb`  
`echo "aaa" | sed 's/a/b/2' # aba`
`echo "aaa" | sed 's/a\+/(&)/' # (aaa)`  
`echo "abcd" | sed 's/\(.\)\(.\)/\2\1/g' # badc`

## Transformations

`echo "a-b-c-d" | sed 'y/abc/ABC/' # A-B-C-d`

    y/abc/ABC/          Remplace caractère par caractère
                        Pas de Regex, les caractères sont interprétés littéralement
                        Pas possible d'utiliser les filtres avec cette commande

---

## Filtres

Il est possible de n'appliquer sed que sur certaines lignes

`echo -e "1\n2\n3\n4" | sed '2s/./-/' # 1¬-¬3¬4`

    2                   Sur la 2ème ligne
    $                   Sur la dernière ligne
    /word/              Sur les lignes contenant /word/ (POSIX BRE)

D'inverser le filtre

`echo -e "1\n2\n3\n4" | sed '2!s/./-/' # -¬2¬-¬-`

    !                   Inverser le filtrer (placé après le filtre inversé)

Filtrer de... à

`echo -e "1\n2\n3\n4" | sed '3,$s/./-/' # 1¬2¬-¬-`

     ,                   Filtrer sur les lignes ENTRE deux filtres (match inclus)

Incrément (extension GNU)

`echo -e "1\n2\n3\n4" | sed '1~2s/./-/' # -¬2¬-¬4`

    1~2                  À partir de la ligne 1, toutes les 2 lignes (= lignes impaires)
    2~2                  À partir de la ligne 2, toutes les 2 lignes (= lignes paires)

---

## Commandes utiles avec les filtres

`echo -e "1\n2\n3" | sed '2q' # 1¬2`

    p                   Afficher (print)
    d                   Supprimer (delete)
    q                   Arrêter (quit)

### Exemples

Afficher la 3ème ligne :

`echo -e "1\n2\n3" | sed -n '3p' # 3`

Supprimer la dernière ligne

`echo -e "1\n2\n3" | sed '$d' # 1¬2`

Afficher toutes les lignes jusqu'à celle contenant /c/

`echo -e "a\nb\nc\n" | sed '/c/q'̀ # a¬b¬c`

---

## Insertion de texte

`echo -e "a\nb" | sed 'a text' # a¬text¬b¬text`

    a text              Ajouter une ligne contenant "text" après le match
    i text              Ajouter une ligne contenant "text" avant le match

`echo -e "a\nb\nc\nd" | sed '/b/,/c/ c ...' # a¬...¬d`

    c text              Remplacer le match par "text"

---

## I/O fichier

    r file              Ajouter le contenu de "file" après le match
    w file              Ecrire les lignes matchées dans "file"

### Exemples

    echo text > file
    echo -e "a\nb" | sed 'r file' # a¬text¬b¬text

<!-- -->

    echo -e "a\nb" | sed '2 s/$/./w file' # a¬b.
    cat file                              # b.

Attention à bien placer les modifieurs AVANT :

    echo -e "aa\nbb\ncc" | sed 's/./-/gw file' # --¬--¬--
    cat file                                   # --¬--¬--

<!-- -->

    echo -e "aa\nbb\ncc" | sed 's/./-/wg file' # -a¬-b¬-c
    cat "g file"                               # -a¬-b¬-c

---

## Blocs

Sed peut exécuter des blocs contenant plusieurs commandes ou d'autres blocs, ce qui va permettre des actions plus complexe
(multiples filtres, saut de ligne, utilisation du buffer, etc).

### Exemple

Remplacer les lignes de 3 à 6 qui contiennent /a/ par "-" :

    # Contenu du fichier "script" :
    3,6 {
       /a/ {
           c -
       }
    }

<!-- -->

    echo -e "1a\n2b\n3a\n4b\n5a\n6b\n7a\n8b" | sed -f script # 1a¬2b¬-¬4b¬-¬6b¬7a¬8b

---

## Commentaires

    # Comment        Commentaire jusqu'à la fin de la ligne

----

## Caractères spéciaux

`echo -e "1\t2" | sed 's/1/a/;l;d' # a\t2$`

    l        Afficher le code des caractères spéciaux (ex: "\t" à la place de la tabulation)

---

## Numéro de ligne

`echo -e "a\nb\nc" | sed '=' # 1¬a¬2¬b¬3¬c`

    =        Affiche le numéro de la ligne avant la ligne

---

## Multi-ligne

### Passer à la suivante

    n        Passer à la ligne suivante

#### Exemple

Supprimer les lignes qui suivent une ligne contenant /---/ :

    # Contenu du fichier "script" :
    /---/ {
        n
        d
    }

<!-- -->

    echo -e "---\nNom:\nSmith\n---\nNom:\nCarpenter" | sed -f script # ---¬Smith¬---Carpenter

### Ajouter la suivante

    N        Ajoute la ligne suivante au buffer (converse le retour à la ligne)

#### Exemple

Concaténer les lignes contenant "a" avec la ligne qui suit 

    # Contenu du fichier "script" :
    /a/ {
        N
        s/\n//
    }

<!-- -->

    echo -e "a\nb\na\nc" | sed -f script # ab¬ac

Inverser toutes les deux lignes :

    # Contenu du fichier "script":
    {
        N
        s/\(.*\)\n\(.*\)/\2\n\1/
    }

<!-- -->

    echo -e "1\n2\n3\n4\n5" | sed -f script # 2¬1¬4¬3¬5

### Afficher le buffer

    P         Afficher la première ligne dans le buffer
    D         Supprimer la première ligne dans le buffer

#### Exemple

Supprimer les 2 dernières lignes

    # Contenu du fichier "script":
    {
        N            # Récupérer la prochaine ligne
        $! { P; D }  # C'est pas la dernière : afficher le buffer et le vider
        $d           # C'est la dernière : supprimer le buffer (qui contient deux lignes)
    }

<!-- -->

    echo -e "1\n2\n3\n4\n5" | sed -f script # 1¬2¬3

---

## Branchements

    : name        Définit un branchement "name"
    b name        Saute au branchement "name" (ou à la fin du script du "name" omis)
    t name        Saute au branchement "name" uniquement si des substitutions ont été effectuées
    T name        Saute au branchement "name" uniquement si des substitutions N'ONT PAS été effectuées

### Exemple

Supprimer les retours à ligne devant toutes les lignes qui commençent par />/ après une ligne qui contient /Chemin/ :

    # Contenu du fichier "script":
    /Chemin/ {
        : while

        N
        /> / {
            s/\n>/ >/
            t while
        }
    }

<!-- -->

    echo -e "Chemin\n> Sous-chemin\n> Sous-sous-chemin\nChemin" | sed -f script
    # Chemin > Sous-chemin > Sous-sous-chemin
    # Chemin

---

## Hold buffer

Le hold buffer est un buffer temporaire où l'on peut placer des données pour les sortir du buffer courant
et venir les récupérer plus tard.

    h        Copie le buffer dans le hold buffer
    g        Copie le hold buffer dans le buffer

    H        Ajoute le buffer dans le hold buffer
    G        Ajoute le hold buffer dans le buffer

    x        Echange le hold buffer avec le buffer

### Exemples

Afficher un avant/après :

    # Contenu du fichier "script":
    {
        # Sauvegarde la valeur avant modification dans le hold buffer
        h

        # Effectue une substitution et l'affiche
        s/^/before: /
        p

        # Récupère la valeur dans le hold buffer
        g

        # Effectue une substitution et l'affiche
        s/a/-/
        s/^/after : /

        # Affiche "---" après
        a ---
    }

<!-- -->

    echo -e "a\nb" | sed -f script
    # before: a
    # after : -
    # ---
    # before: b
    # after : b
    # ---

Ajouter les lignes qui matchent le filtre à la fin :

    # Contenu du fichier "script":
    1~2{
        H  # Ajoute toutes les lignes pairs au hold buffer
    }
    ${
        p
        G                 # Récupère le hold buffer
        s/^[^\n]*\n/---/  # Remplace la première ligne (= $) par "---"
    }

<!-- -->

    echo -e "1\n2\n3\n4\n5\n6" | sed -f script
    # 1
    # 2
    # 3
    # 4
    # ---
    # 1
    # 3

Afficher un avant/après sur la même ligne :

    # Contenu du fichier "script":
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

<!-- -->

    echo -e "a\nb" | sed -f script
    # a -> -
    # b -> b

Remplacer \_texte\_ par \<i>texte\</i>

    # Contenu du fichier "script":
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

<!-- -->

    echo "Ceci est du _texte en italique_" | sed -f script
    # Ceci est du <i>texte en italique</i>
