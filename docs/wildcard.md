Les wildcards permettent de cibler un ensemble de fichier :
par exemple, `ls *.html` liste tous les fichiers html du répertoire en cours.

Les wildcards sont interprétées directement par le shell et non par la commande appelée : la commande executée par le shell est en vérité `ls file1.html file2.html`. On peut donc utiliser des wildcards avec toutes les commandes qui acceptent un ou des fichiers (ls, cat, cp, etc).

---

Attention à échapper les caractères des wildcards pour les commandes qui veulent prendre des regex en paramètre.
- `.*` (wildcard) = le caractère `"."` suivit de n'importe quels caractères
- `'.*'` (regex) = n'importe quels caractères

---

## Classes de caractère

    *          Tout caractère, de 0 à n fois
    ?          Tout caractère, 1 fois (classe universelle)

<!-- -->

    {abc,def}  abc ou def

<!-- -->

    [ab]       a ou b
    [!ab]      Ni a ni b
    [^ab]      Idem
    [a-z]      Plage ASCII entre a et z
    [a-zA-Z]   Plage ASCII entre a et z ou A et Z

`man ascii` pour voir la table ASCII

## Quantificateurs

    @(a|b)     a ou b, exactement 1 fois (les expressions peuvent contenir des wildcards)
    *(a|b)     a ou b, de 0 à n fois
    ?(a|b)     a ou b, de 0 à 1 fois
    +(a|b)     a ou b, au moins 1 fois
    !(a|b)     Ni a ni b
