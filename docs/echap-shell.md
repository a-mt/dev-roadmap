---
title: Règles d'échappement dans un shell Linux
category: Linux
---

| Méthode d'échappement | Caractères échappés                                                      | Exemple                |
| ---          | ---                                                                               | ---                    |
| (rien)            | Aucun                                                                        | `echo s/old/new/`      |
| double-quote | Espaces                                                                           | `echo "s/-/ - /"`      |
| backslash    | Le caractère spécial qui suit. <br>Caractères spéciaux du shell : `'` `$` `"`     | `echo "s/\$var/$var/"` |
| quote        | Espaces + caractères spéciaux. <br>Pas possible d'échapper une quote entre quotes | `echo 's/!$//'`        |
