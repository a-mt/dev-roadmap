---
title: Règles d'échappement dans un shell Linux
category: Linux
---

Les doubles quotes ("), simples quotes (') et backslash (\) permettent d'indiquer au shell d'interpreter littéralement certains caractères. On peut les utiliser dans tous les cas, mais ils ne sont nécessaires que pour échapper les caractères qui ont un sens particulier en shell : `<` `>` `:` `"` `'` `/` `\` `|` `?` `!` `$` `*` et espace

| Méthode d'échappement | Caractères échappés                                                      | Exemple                |
| ---          | ---                                                                               | ---                    |
| (rien)       | Aucun                                                                             | `echo s/old/new/`      |
| double-quote | Espaces                                                                           | `echo "s/-/ - /"`      |
| quote        | Tout sauf `'`. <br>Pas possible d'échapper une quote entre quotes, même avec un backslash | `echo 's/!$//'`   |
| backslash    | Le caractère spécial qui suit                                                     | `echo "s/\$var/$var/"` |

[Les caractères spéciaux](https://abs.traduc.org/abs-fr/ch03.html)