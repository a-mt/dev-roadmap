---
title: Répétition
category: Terraform
---

Un bloc resource permet de créer une seule ressource, comme un fichier,  
mais aussi plusieurs avec les meta-arguments `count` et `for_each`

## count

* `count = N` permet de créer N instances

  ``` bash
  resource "aws_instance" "example" {
    count = var.environment == "prod" && var.high_availability ? 2 : 1
  ```

  ``` bash
  # create 4 similar EC2 instances
  resource "aws_instance" "server" {
    count = 4

    ami           = "ami-a1b2c3d4"
    instance_type = "t2.micro"

    tags = {
      Name = "Server ${count.index}"
    }
  }
  ```

* La fonction `length` permet de récupérer la longueur d'une liste (ou d'une chaîne de caractères) mais si cette longueur change, donc qu'on ajoute ou supprime un élément de la liste, alors l'ensemble des ressources doivent être recréés / remplacés. Utiliser un count n'est donc pas idéal pour une liste susceptible de changer

  ``` bash
  variable "filename" {
    default = [
      "/root/pets.txt",
      "/root/dogs.txt",
      "/root/cats.txt"
    ]
  }
  ressource "local_file" "pet" {
    filename = var.filename[count.index]
    count = length(var.filename)
  }
  ```

  <!--![](https://i.imgur.com/W9WTRbY.png)-->
  ![](https://i.imgur.com/lqjIkjJ.png)

* Le `count` peut être utilisé pour contrôler la création d'une ressource en fonction d'une condition

  ``` bash
  resource "aws_db_instance" "example" {
    count = var.create_db ? 1 : 0
  }
  ```

## for_each

* `for_each` permet de boucler sur une map ou un set.  
  Lorsqu'on utilise une map ou un set, les éléments qui existaient déjà ne sont pas modifiés

  ``` bash
  variable "filename" {
    type = set(string)
    default = [
      "/root/pets.txt",
      "/root/dogs.txt",
      "/root/cats.txt"
    ]
  }
  resource "local_file" "pet" {
    filename = each.value
    for_each = var.filename
  }
  ```
  ![](https://i.imgur.com/fiW52QM.png)

* La fonction `toset` permet de convertir une liste en set

  ``` bash
  variable "filename" {
    type = list(string)
    default = [
      "/root/pets.txt",
      "/root/dogs.txt",
      "/root/cats.txt"
    ]
  }
  resource "local_file" "pet" {
    filename = each.value
    for_each = toset(var.filename)
  }
  ```

* Pour un map, on peut récupérer la clé avec `key`

  ``` bash
  resource "azurerm_resource_group" "rg" {
    for_each = tomap({
      a_group       = "eastus"
      another_group = "westus2"
    })
    name     = each.key
    location = each.value
  }
  ```

---

## Bloc dynamic

* Le bloc `dynamic` permet non pas de créer de multiples ressources mais de répéter un bloc à l'intérieur d'une ressource

  <ins>Exemple sans</ins>:

  ``` bash
  resource "aws_security_group" "example" {
    name = "example-security-group"

    ingress {
      from_port   = 80
      to_port     = 80
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
      from_port   = 22
      to_port     = 22
      protocol    = "udp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }
  ```

  <ins>Exemple avec</ins>:

  ``` bash
  variable "ingress_rules" {
    type = list(object({
      from_port   = number
      to_port     = number
      protocol    = string
      cidr_blocks = list(string)
    }))
    default = [
      {
        from_port   = 80
        to_port     = 80
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
      },
      {
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
      }
    ]
  }

  resource "aws_security_group" "example" {
    name = "example-security-group"

    dynamic "ingress" {
      for_each = var.ingress_rules

      content {
        from_port   = ingress.value["from_port"]
        to_port     = ingress.value["to_port"]
        protocol    = ingress.value["protocol"]
        cidr_blocks = ingress.value["cidr_blocks"]
      }
    }
  }
  ```
