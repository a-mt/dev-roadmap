---
title: Workspaces
category: Terraform
---

Un workspace est un environnement virtuel, qui permet de gérer différentes instances d'état à partir d'un même ensemble de fichiers de configuration — et permet notamment de séparer les environnement de dev, test et production tout en maintenant une codebase cohérente et facilement maintenable.  
Il n'y a initialement qu'un seul workspace, nommé "default"

## Créer

``` bash
$ terraform workspace new prod

Created and switched to workspace "prod"!

You're now on a new, empty workspace. Workspaces isolate their state,
so if you run "terraform plan" Terraform will not see any existing state
for this configuration.
```

## Lister

``` bash
$ terraform workspace list
  default
* prod

$ terraform workspace show
prod
```

## Changer

Pour changer de workspace actif:

``` bash
$ terraform workspace select default

Switched to workspace "default".
```

Le fichier d'état du workspace "ProjectA" est `terraform.tfstate.d/ProjectA`

## Supprimer

``` bash
$ terraform workspace delete development
```

## Variable

Dans les fichiers de configuration, on peut récupérer le nom du workspace en cours via `terraform.workspace`

``` bash
resource "aws_instance" "ec2" {
  ami           = "ami-073998ba87e205747"
  instance_type = lookup(var.my-var, terraform.workspace) 
}

variable "my-var" {
  type = map(string)

  default = {
    default    = "t2.small"
    dev        = "t2.nano"
    staging    = "t2.small"
    production = "t2.micro"
  }
}
```
``` bash
resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "Serveur-${terraform.workspace}"
  }
}
```
``` bash
module "network" {
  source = "./modules/network"
  environment = terraform.workspace
}
```

Dans une pipeline CI/CD, on peut sélectionner le workspace en fonction de la branche en cours: un commit sur la branche "develop" déclenche des actions Terraform dans le Workspace dev, tandis qu'un merge sur la branche "master" cible le Workspace prod.