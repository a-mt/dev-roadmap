---
title: Autres
category: Terraform, Fonctions
---

## Dates

Unités duration acceptées:
"ns", "us" (or "µs"), "ms", "s", "m", and "h"

``` bash
# formatdate(format, date)
# Formatter date avec le motif donné
> formatdate("DD MMM YYYY hh:mm:ss", "2024-12-31T23:59:59Z")
"31 Dec 2024 23:59:59"

# timestamp()
# Date au moment de l'exécution du bloc en cours
> timestamp()
"2024-03-18T14:54:56Z"

# plantimestamp()
# Date au moment du lancement de la commande terraform
> plantimestamp()
"2024-03-18T14:54:56Z"

# timeadd(date, duration)
# Ajouter une durée donné à la date
> timeadd("2017-11-22T00:00:00Z", "10m")
"2017-11-22T00:10:00Z"

# timecmp(date_ref, date_compare)
# Vérifie si date_ref est plus récent que date_compare
> timecmp("2017-11-22T00:00:00Z", "2017-11-22T00:00:00Z")
0
> timecmp("2017-11-22T00:00:00Z", "2017-11-22T01:00:00Z")
-1
> timecmp("2017-11-22T01:00:00Z", "2017-11-22T00:00:00Z")
1
```

## Logique

* `tobool` convertit une chaîne de caractères en booléen

  ``` bash
  # tobool(value)
  # Convertit une valeur en booléen
  > tobool("0")
  false
  > tobool("false")
  false

  > tobool("1")
  true
  > tobool("true")
  true

  > tobool("A")
  │ Invalid value for "v" parameter: cannot convert "A" to bool; only the strings "true" or "false" are allowed.
  ```

* `can` vérifie si une erreur lève une erreur

  ``` bash
  # can(expression)
  # Transforme les erreurs en booléens
  > parseint("123", 10)
  123
  > parseint("NOP", 10)
  │ Invalid value for "number" parameter: cannot parse "NOP" as a base 10 integer.

  > can(parseint("123", 10))
  true
  > can(parseint("NOP", 10))
  false
  ```

* `try` évalue les expressions en argument et retourne la première qui ne lève pas d'erreur

  ``` bash
  > try(
    parseint("NOP", 10),
    parseint("123", 10)
  )
  123
  ```

## Sensitive

* `sensitive` et `nonsensitive` permettent de marquer une variable comme étant une donnée sensible ou non

  ``` bash
  > local.myvar
  "mysecretvalue"

  > sensitive(local.myvar)
  <sensitive>
  ```
  ``` bash
  > local.mysensitivevar
  <sensitive>

  > nonsensitive(local.mysensitivevar)
  "mysecretvalue"
  ```

## IP network

``` bash
# cidrhost(prefix, hostnum)
# Calcule une adresse IP à partir de l'adresse du réseau au format CIDR et du numéro d'hôte
> cidrhost("127.0.0.1/8", 256)
"127.0.1.0"

# cidrnetmask(prefix)
# Calcule le masque réseau à partir de l'adresse du réseau au format CIDR
> cidrnetmask("172.16.2.140/24")
"255.255.255.0"

# cidrsubnet(prefix, newbits, netnum)
# Calcule l'adresse d'un sous-réseau à partir de l'adresse du réseau, la taille et le numéro du sous-réseau
> cidrsubnet("10.0.0.0/8", 8, 1)
"10.1.0.0/16"

# cidrsubnets(prefix, newbits...)
# Permet de générer la liste des sous-réseaux
> cidrsubnets("10.0.0.0/8", 1, 2, 3)
tolist([
  "10.0.0.0/9",
  "10.128.0.0/10",
  "10.192.0.0/11",
])
```

## Util

Pour afficher la signature de toutes les fonctions supportées par Terraform:

```
$ terraform metadata functions -json
```

[Documentation: metadata](https://developer.hashicorp.com/terraform/internals/functions-meta)