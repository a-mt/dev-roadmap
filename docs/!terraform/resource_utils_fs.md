---
title: Filesystem
category: Terraform, Fonctions
---

## Path

``` bash
# abspath(path)
# Retourne le path absolu
> abspath(".")
"/home/aurelie/PROJECTS/terraform"

# pathexpand(path)
# Étend un path contenant des caractères interprétés, vers un path absolu
> pathexpand("~")
"/home/aurelie"

# dirname(path)
# Retourne le nom du répertoire
> dirname("/etc/nginx/options-ssl-nginx.conf")
"/etc/nginx"

# basename(path)
# Retourne le nom du fichier
> basename("/etc/nginx/options-ssl-nginx.conf")
"/home/aurelie"

# filexists(path)
# Vérifie si un fichier existe au path donné
> fileexists("main.tf")
true

# fileset(path, pattern)
# Récupère une liste de fichiers correspondant au glob
> fileset(".", "*.tf")
toset([
  "main.tf",
])
```

## file

Lit le contenu d'un fichier

``` bash
resource "aws_key_pair" "ssh_key" {
  key_name = "ssh_key"
  public_key = file("ssh_key.pub")
}
```

## filebase64

Lit le contenu du fichier et retourne son contenu encodé en base64

``` bash
> filebase64("main.tf")
"Cm91dHB1dCAiZmlsZWJhc2U2NCIgewogIHZhbHVlID0gZmlsZWJhc2U2NCgibWFpbi50ZiIpCn0="
```

## templatefile

Lit le contenu du fichier et remplace les variables par les valeurs données en arguments

``` bash
$ cat example.tftpl
Hello ${username}!
```
``` bash
> templatefile("example.tftpl", { username = "World" })
"Hello World!"

> templatefile("example.tftpl", {})
│ Invalid value for "vars" parameter: vars map does not contain key "username", referenced at example.tftpl:1,9-17.
```
