---
title: Vérifications
category: Terraform
---

## Pre et post conditions

* Une présomption (*assumption*) est une condition présumée être vraie pour des données récupérées — en entrée.  
  Par exemple, on peut partir du principe que toutes les VM qu'on utilise ont une architecture en 64 bits et non 32.

  Une garantie (*warranty*) est une condition présumée être vraie pour des données produites — en sortie.  
  Par exemple, on peut partir du principe qu'il existe un serveur DHCP qui assignera automatiquement une adresse IP à la machine

* Les blocs `precondition` et `postcondition` permettent de vérifier que les présomptions et garanties sont vraies,  
  et lever un message d'erreur si ce n'est pas le cas. On peut ajouter autant de blocs precondition et postcondition qu'on le souhaite

  <!--
  ``` bash
  resource "aws_instance" "app" {
    count = var.aws_instance_count

    instance_type = var.aws_instance_type
    ami           = var.aws_ami_id

    subnet_id              = var.aws_private_subnet_ids[count.index % length(var.aws_private_subnet_ids)]
    vpc_security_group_ids = [module.app_security_group.security_group_id]

    lifecycle {
      precondition {
        condition     = var.aws_instance_count % length(var.aws_private_subnet_ids) == 0
        error_message = "The number of instances (${var.aws_instance_count}) must be evenly divisible by the number of private subnets (${length(var.aws_private_subnet_ids)})."
      }

      precondition {
        condition     = data.aws_ec2_instance_type.app.ebs_optimized_support != "unsupported"
        error_message = "The EC2 instance type (${var.aws_instance_type}) must support EBS optimization."      
      }
    }
  }
  ```
-->
  ``` bash
  data "aws_vpc" "app" {
    id = var.aws_vpc_id

    lifecycle {
      precondition {
        condition = cidrnetmask(var.cidr_block) == "255.255.0.0"
        error_message = "Expecting a /16 for this VPC!"
      }
      postcondition {
        condition     = self.enable_dns_support == true
        error_message = "The selected VPC must have DNS support enabled."      
      }
    }
  }
  ```

## Bloc check

* Un bloc `check` permet d'effectuer des vérifications arbitraires.  
  Si la vérification échoue, le plan / apply continue mais un warning est affiché dans la console

  <!--
  - Les blocs `validation` des variables vérifient la validité des valeurs des variables au moment de l'exécution. On ne peut ici faire référence qu'aux variables. Lorsque la condition échoue, le plan ou apply échoue

    Les blocs `precondition` et `postcondition` sont évalués avant ou après la création et mise à jour des ressources. On peut ici faire réference aux autres blocs data, resource et autres variable. Lorsque la condition échoue, le plan ou apply échoue

    Les blocs `checks` permettent de vérifier une condition arbitraire. Lorsque la condition échoue, un warning est affiché dans la console, sans bloquer le plan ou apply
  -->

  Des blocs `data` peuvent également être déclarés à l'intérieur du check, et ils auront un scope limité au check. Là où en temps habituel, si la ressource du data ne pas être résolue alors la commande échoue; ici, seul le check échoue

* On se sert principalement des checks pour

  - <ins>la détection d'un drift</ins>.  
    Par exemple, si Terraform gère un groupe et des règles de sécurité, il ne se préoccupe pas des règles autres que celles définies — uniquement celles qu'il gère. Ainsi, si on ouvre le port 22 en dehors de Terraform pour résoudre un problème et qu'on oublie de supprimer la règle, du point de vue de Terraform il n'y a aucun changement à effectuer. Ajouter un check permet de détecter ce changement

    ``` bash
    $ cat checks.tf

    locals {
      allowed_ports = ["80", "443"]
    }

    check "allowed_ports_only" {
      data "azurerm_network_security_group" "nsg" {
        name                = azurerm_network_security_group.allow_web.name
        resource_group_name = azurerm_resource_group.example.name
      }

      assert {
        condition     = setunion([
            for rule in data.azurerm_network_security_group.nsg.security_rule :
            rule.destination_port_range if rule.direction == "Inbound" && rule.access == "Allowed"
        ], local.allowed_ports) == toset(local.allowed_ports)

        error_message = join(" ", [
          data.azurerm_network_security_group.nsg.name,
          "includes port rules that are not in the list:",
          join(",", local.allowed_ports)
        ])
      }
    }
    ```

    ![](https://i.imgur.com/VeAPU1N.png)

  - <ins>des health checks</ins>.  
    Par exemple, si le certificat doit être renouvellé manuellement, on peut utiliser un check pour vérifier s'il arrive bientôt à expiration.

    [Autres examples](https://unfriendlygrinch.info/posts/terraform-check-block/#checks)

* Exporter le plan au format JSON permet de vérifier avec un script si des checks échouent

  ![](https://i.imgur.com/AT4j3C8.png)
