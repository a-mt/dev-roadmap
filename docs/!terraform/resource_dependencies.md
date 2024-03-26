---
title: Dépendances
category: Terraform
---

## Dépendances implicites: référence entres ressources

* On peut utiliser les attributs d'une resource comme entrée d'une autre resource avec `TYPE.NAME.ATTRIBUTE`,   
  par exemple: `time_static.time_update.id`

  Quand terraform planifie la création des ressources, il construit un graphe qui lui permet de connaître les dépendances entre les différentes ressources et utiliser le bon ordre pour les créer. Ce type de dépendance est appelé une dépendance implicite.

  ``` bash
  resource "time_static" "time_update" {
  }
  resource "local_file" "time" {
      filename = "/root/time.txt"
      content = "Time stamp of this file is ${time_static.time_update.id}"
  }
  ```

## Dépendances explicites: depends_on

* La dépendance explicite n'est nécessaire que lorsqu'une ressource ne dépend qu'indirectement d'une autre ressource

  ``` bash
  output "instance_ip_addr" {
    value       = aws_instance.server.private_ip
    description = "The instance IP addres of the main server instance."

    depends_on = [
      # Security group rule must be created before this IP address could
      # actually be used, otherwise the services will be unreachable.
      aws_security_group_rule.local_access,
    ]
  }
  ```

* Les *arguments* sont gérés par le provider / l'API et spécifient la configuration d'un objet d'infrastructure.  
  Les *meta-arguments* quant à eux ne sont pas spécifiques à une ressource ou à un provider, et peuvent être utilisés dans n'importe quel bloc ressource — puisqu'il s'agit de fonctions gérées directement par Terraform et qui modifient le comportement d'une ressource. La liste des meta-arguments est: depends_on, provisioner, provider, count et for_each

## Commande graph

* La commande graph permet de créer une représentation visuelle des dépendances entre les ressources

  ``` bash
  $ terraform graph
  ```

  ![](https://i.imgur.com/crHL2b5.png)

* Pour donner plus de sens à cette sortie,  
  on peut passer par un logiciel de visualisation de graphes tel que graphvis

  ``` bash
  $ apt update
  $ apt install graphviz -y
  $ terraform graph | dot -Tsvg > graph.svg
  ```

  ![](https://i.imgur.com/TedmOWF.png)
  ![](https://i.imgur.com/AKIAjyC.ong)

---

## Bloc data

* L'infrastructure peut être provisionnée à l'aide d'outils autre que terraform — tels que puppet, cloudformation, saltstack, ansible, des scripts ad hoc ou même manuellement.
  Bien que terraform ne gère pas cette ressource, il est possible de récupérer ses attributs via un bloc `data`.  
  Par exemple, pour récupérer un bucket crée en amont sur AWS:

  ``` bash
  data "aws_s3_bucket" "selected" {
    bucket = "bucket.test.com"
  }

  resource "aws_cloudfront_distribution" "test" {
    origin {
      domain_name = data.aws_s3_bucket.selected.bucket_domain_name
      origin_id   = "s3-selected-bucket"
    }
  }
  ```

* Différents types de data donnent accès à différentes ressources.  
  On peut par exemple récupérer le résultat d'un programme externe via le type "external".  
  Ou récupérer des données d'un vault Terraform avec ["vault_generic_secret"](https://registry.terraform.io/providers/hashicorp/vault/latest/docs/data-sources/generic_secret)

  ``` bash
  data "external" "cars_count" {
    program = ["python", "${path.module}/get_cool_data.py"]

    query = {
      thing_to_count = "cars"
    }
  }

  output "cars_count" {
    value = "${data.external.cars_count.result.cars}"
  }
  ```

### filter

* Le sous-bloc `filter` permet d'ajouter des filtres supplémentaires.    
  Par exemple: récupérer toutes les images AMI (*Amazon Machine Image*) dont le nom commence par "myami-" et de type de virtualisation "hvm"

  ``` bash
  data "aws_ami" "example" {
    executable_users = ["self"]
    most_recent      = true
    name_regex       = "^myami-\\d{3}"
    owners           = ["self"]

    filter {
      name   = "name"
      values = ["myami-*"]
    }

    filter {
      name   = "virtualization-type"
      values = ["hvm"]
    }
  }
  ```

### most_recent

* Suivant le type de data, on doit retourner soit une seule ressource soit une liste de ressources.  
  Pour un type qui ne devrait retourner qu'une ressource, si plusieurs ressources matchent les attributs spécifiés, alors la commande terraform échoue. On peut éviter ce type de scénario avec la propriété `most_recent`, qui retourne la ressource la plus récente

  ``` bash
  data "aws_ami" "latest_ami" {
    most_recent = true
    owners      = ["123456789"]
  }
  ```
