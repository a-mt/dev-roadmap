---
title: Sur les maps
category: Terraform, Fonctions
---

tomap, zipmap, merge, transpose, matchkeys, keys, values, lookup

``` bash
# tomap(...)
# Convertit un objet en map
> tomap({key1 = "value1", key2 = "value2"})
tomap({
  "key1" = "value1"
  "key2" = "value2"
})

# zipmap(keys, values)
# Crée une map à partir d'une liste de clés et valeurs
> zipmap(["key1", "key2"], ["value1", "value2"])
{
  "key1" = "value1"
  "key2" = "value2"
}

# merge(...)
# Merge des map entres elles
> merge({key1 = "default1", key2 = "default2"}, {key1 = "value1", key3 = "value3"})
{
  "key1" = "value1"
  "key2" = "default2"
  "key3" = "value3"
}

# transpose(map)
# Transpose une map de listes et échange les clés et valeurs
> transpose({key1 = ["value1a", "value1b"], key2 = ["value2"]})
tomap({
  "value1a" = tolist([
    "key1",
  ])
  "value1b" = tolist([
    "key1",
  ])
  "value2" = tolist([
    "key2",
  ])
})

# matchkeys(keys, values, matchvalues)
# Retourne l'ensemble des clés dont l'index correspond aux valeurs du sous-ensemble donné
> matchkeys(
  ["key1", "key2", "key3"],
  ["value1", "value2", "value3"],
  ["value1", "value2"]
}
tolist([
  "key1",
  "key2",
])

# keys(map)
# Retourne la liste des clés
> keys({key1 = "value1", key2 = "value2"})
tolist([
  "key1",
  "key2",
])

# values(map)
# Retourne la liste des valeurs
> values({key1 = "value1", key2 = "value2"})
[
  "value1",
  "value2",
]

# lookup(map, key, default)
# Retourne la valeur de la clé donnée ou la valeur par défaut
> lookup(tomap({
  prod    = "t2.large"
  staging = "t2.medium"
  dev     = "t2.small"
}), "prod", "t2.micro")
```
