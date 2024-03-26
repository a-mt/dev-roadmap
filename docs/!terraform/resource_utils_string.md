---
title: Sur les chaînes de caractères
category: Terraform, Fonctions
---

## Créer

``` bash
# tostring(value)
# Convertit une valeur en chaîne de caractères
> tostring(1.2)
"1.2"

# uuid()
# Génère un identifiant unique universel (UUID)
> uuid()
"5c69a78e-9075-c04a-8b3d-1f88db7898f8"
```

## Trim

chomp, trimspace, trim, trimprefix, trimsuffix

``` bash
# chomp(string)
# Supprime les retours chariots en fin de ligne
> chomp("hello\r\n")
"hello"
> chomp("hello\n\n")
"hello"

# trimspace(string)
# Supprime les espaces au début et à la fin
> trimspace("  hello\n\n")
"hello"

# trim(string)
# Supprime des caractères donnés au début et à la fin
> trim("?!hello?!", "!?")
"hello"

# trimprefix(string, prefix)
# Supprime des caractères donnés au début
> trimprefix("?!hello?!", "!?")
"hello?!"

# trimsuffix(string, suffix)
# Supprime des caractères donnés à la fin
> trimsuffix("?!hello?!", "!?")
"?!hello"
```

## Contains

endswith, startswith, strcontains

``` bash
# endswith(string, suffix)
# Vérifie si la chaîne de caractères se termine par un suffixe donné
> endswith("hello world", "world")
true

# startswith(string, prefixe)
# Vérifie si la chaîne de caractères commence par un préfixe donné
> startswith("hello world", "hello")
true

# strcontains(string, pattern)
# Vérifie si la chaîne de caractères contient par un texte donné
> strcontains("hello world", "wor")
true
```

## Join & split

join, split

``` bash
# join(delimiter, list)
# Joint les éléments d'une liste en une chaîne, séparés par un délimiteur
> join(", ", ["foo", "bar", "baz"])
"foo, bar, baz"

# split(delimiter, string)
# Divise une chaîne en une liste de chaînes, séparées par un délimiteur
> split(",", "foo,bar,baz")
tolist([
  "foo",
  "bar",
  "baz",
])
```

## Format

lower, upper, title, strrev, replace, format, formatlist, indent

``` bash
# lower(string)
# Convertit en minuscules
> lower("HELLO")
"hello"

# upper(string)
# Convertit en majuscules
> upper("hello")
"HELLO"

# title(string)
# Capitalise
> title("hello world")
"Hello World"

# strrev(string)
# Inverse les caractères
> strrev("hello")
"olleh"

# replace(string, search, replace)
# Remplace une sous-chaîne par une autre
> replace("hello world", "/w.*d/", "everybody")
"hello everybody"
```
``` bash
# format(format, ...)
# Formate une chaîne de caractères selon un format spécifié
> format("Hello, %s!", "Terraform")
"Hello, Terraform!"

# formatlist(format, ...)
# Idem mais accepte des listes dans les paramètres et produit une liste de chaîne de caractères
> formatlist("%s, %s!", "Salutations", ["Valentina", "Ander", "Olivia", "Sam"])
tolist([
  "Salutations, Valentina!",
  "Salutations, Ander!",
  "Salutations, Olivia!",
  "Salutations, Sam!",
])
tolist([
  "Salutations, Valentina!",
  "Salutations, Ander!",
  "Salutations, Olivia!",
  "Salutations, Sam!",
])

# indent(number, string)
# Ajoute des espaces au début des lignes, sauf la première
> "  ${indent(2, join(",\n", ["foo", "bar", "baz"]))}"
<<EOT
  foo,
  bar,
  baz
EOT
```

## Substr

substr, regex, regexall

``` bash
# substr(string, offset, length)
# Renvoit une sous-chaîne commençant à l'indice spécifié et de la longueur donnée (ou -1)
> substr("🤔🤷", 0, 1)
🤔
> substr("hello world", -5, -1)
"world"

# regex(pattern, string)
# Renvoie une sous-chaîne matchant une regex (format RE2) donnée
> regex("(?i)terraform[0-9]+", "Terraform123")
"Terraform123"
> regex("terraform[0-9]+", "Terraform123")
│ Call to function "regex" failed: pattern did not match any part of the given string.

# regexall(pattern, string)
# Renvoie une liste de sous-chaînes matchant une regex (format RE2) donnée
> regexall("[a-z]+", "1234abcd5678efgh9")
tolist([
  "abcd",
  "efgh",
])
```

## Coalesce

``` bash
# coalesce(...)
# Retourne le premier élément non vide ou null
> coalesce(null, "", "default")
default
```

## Encodages

### Base64 & URL

base64encode, base64decode, textencodebase64, textdecodebase64, urlencode

``` bash
# base64encode(string)
# Encode une chaîne en Base64 — UTF-8
> base64encode("Hello World")
SGVsbG8gV29ybGQ=

# base64decode(string)
# Décode une chaîne encodée en Base64 — UTF-8
> base64decode("SGVsbG8gV29ybGQ=")
Hello World

# base64encode(string)
# Encode une chaîne en Base64 — avec le charset spécifié
> textencodebase64("Hello World", "UTF-16LE")
SABlAGwAbABvACAAVwBvAHIAbABkAA==

# base64decode(string)
# Décode une chaîne encodée en Base64 — avec le charset spécifié
> textdecodebase64("SABlAGwAbABvACAAVwBvAHIAbABkAA==", "UTF-16LE")
Hello World

# urlencode(string)
# Encode les caractères d'une URL
> "http://example.com/search?q=${urlencode("terraform urlencode")}"
http://example.com/search?q=terraform+urlencode
```

### JSON & YAML

jsonencode, jsondecode, yamlencode, yamldecode

``` bash
# jsonencode(any)
# Encode des valeurs en JSON
> jsonencode({hello = "world"})
"{\"hello\":\"world\"}"

# jsonencode(string)
# Decode du JSON en valeurs
> jsondecode("{\"hello\": \"world\"}")
{
  "hello" = "world"
}

# yamlencode(any)
# Encode des valeurs en YAML
> yamlencode({hello = "world"})
<<EOT
"hello": "world"

EOT

# yamldecode(string)
# Decode du YAML en valeurs
> yamldecode("hello: world")
{
  "hello" = "world"
}
```

### Hash

md5, sha256, bcrypt

``` bash
# md5(string)
# Calcule le hash MD5
> md5("hello world")
5eb63bbbe01eeed093cb22bb8f5acdc3

# sha256(string)
# Calcule le hachage SHA256 d'une chaîne
> sha256("hello world")
b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9

> bcrypt("hello world")
$2a$10$8je5abZCpjrnsL4ZvmOek.FwSP3MMxS7.riJO.AM2gUARUWKuTxpO
```

