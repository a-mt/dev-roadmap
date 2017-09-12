Les commandes du shell Linux, comme grep, sed, ou awk, acceptent des regex POSIX
(POSIX est ni plus ni moins que le nom des normes qui s'appliquent aux commandes et logiciels des plateformes UNIX).

Il existe deux familles :
- les regex POSIX BRE (Basic Regex Expression), qui ne comprennent que le strict minimum des regex,
- et les regex POSIX ERE (Extended Regex Expression), une extension des BRE, qui ajoute le support des groupes, backreferencs et quantificateurs

| Type de Regex | Commandes                                                               |
| ---           | ---                                                                     |
| BRE           | grep, vi, sed, csplit, dbx, dbxtool, more, ed, expr, lex, pg, nl, rdist |
| ERE           | egrep, awk, nawk                                                        |

`grep` utilise par défaut les regex BRE, il est possible d'utiliser les caractères ERE pourvu qu'ils soient précédés d'un backslash (\\) : `ls | grep 'filea\|fileb'`

---

Il ne faut pas confondre les regex POSIX et les [wildcards](wildcard). Afin d'empêcher que le shell interprète un caractère de regex en wildcard, il est nécessaire entourer les regex de quotes. :  `ls | grep '^file'`.

---

## POSIX Basic Regex Expression (BRE)

    ^a         Commence par a
    a$         Finit par a
    \          Caractère d'échappement

### Classes

    .          Tout caractère
    [ab]       a ou b
    [^ab]      Ni a ni b
    [a-z]      Plage ASCII entre a et z

    \w         Alphanumérique ou _ ([a-zA-Z0-9])
    \W         PAS un alphanumérique ni _ ([^a-zA-Z0-9])

    \s         Caractère d'espace ([ \t\r\n\v\f])
    \S         PAS un caractère d'espace

Il est évidemment possible d'utiliser les [classes POSIX](regex#classe-posix)

### Quantificateurs

    *          0 à n fois

### Assertions

    \b         Délimiteur de mot ([^a-zA-Z0-9_] en début ou fin de mot)
    \B         PAS un délimiteur de mot ([a-zA-Z0-9_])

    \<         Délimiteur en DEBUT de mot
    \>         Délimiteur en FIN de mot

---

## POSIX Extended Regex Expression

### Groupes et backreferences

    a|b        a ou b
    (ab)       a suivit de b, dans un groupe capturant (9 groupes au maximum)
    (-|_)a\1   a entouré de - ou _

    filea|b    filea ou b
    file(a|b)  filea ou fileb

### Quantificateurs

    ?          0 ou 1 fois
    +          Au moins 1 fois

    {2}        2 fois
    {2,4}      Entre 2 et 4 fois
    {2,}       Au moins 2 fois
    {,2}       Entre 0 et 2 fois
