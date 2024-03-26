---
title: Modules
category: Terraform
---

## Modules

* Au fur et à mesure que le projet grandit, naviguer les fichiers de configuration et comprendre ce qu'ils font devient de plus en plus difficile. Pour adresser ce problème, on peut séparer les configurations en fichiers et modules logiques. Les modules permettent de regrouper des configurations terraform en abstractions réutilisables.

  ```
  .
  ├── README.md
  ├── main.tf
  ├── variables.tf
  ├── outputs.tf
  ├── resources.tf
  ├── provider.tf
  ├── terraform.tfvars
  ├── modules/
  │   ├── module1/
  │   │   ├── README.md
  │   │   ├── variables.tf
  │   │   ├── main.tf
  │   │   ├── outputs.tf
  ```

* Un module terraform est un ensemble de fichiers de configuration dans un répertoire. Dans ce sens, toute configuration terraform fait partie d'un module. Quand tous les fichiers sont dans un seul et unique répertoire, le contenu de ce répertoire est considéré comme le module `root`

  ```
  .
  ├── LICENSE
  ├── README.md
  ├── main.tf
  ├── variables.tf
  ├── outputs.tf
  ```

## Bloc module

* Le bloc `module` indique à Terraform de charger et traiter les fichiers de configuration d'un module. 

  ``` bash
  module "module1_example1" {
    source = "./modules/module1"
    var1 = var.var1
  }
  ```

  Comme pour toute autre ressource, si l'ordre a de l'importance, on peut utiliser les dépendances

  ``` bash
  module "module1_example1" {
    source = "./modules/module1"
    var1 = var.var1
    depends_on = [null_resource.example]
  }
  module "module1_example2" {
    source = "./modules/module1"
    depends_on = [module.module1_example1]
  }
  ```

* Des variables permettent de récupérer l'emplacement actuel:

  - du module en cours

    ```
    path.module  # modules/module1
    ```

  - du module root

    ```
    path.root  # .
    ```

* Les modules importés de répertoires présents dans le module racine sont appelés modules enfant.

### Variables en entrée

* Pour passer des variables en entrée au module, on spécifie des arguments. Le module n'hérite pas des variables du parent, il est complètement isolé, un peu comme une fonction pure: toute variable doit être passée explicitement

  <ins>module1 (enfant)</ins>:

  ``` bash
  # Execute "echo $var" dans le module module1
  $ cat modules/module1/main.tf
  resource "null_resource" "example-child" {
    provisioner "local-exec" {
      command = "echo ${var.var1}"
    }
  }

  # Définit la variable var1 dans module1
  $ cat modules/module1/variables.tf
  variable "var1" {
    type = string
    default = "hello child!"
  }
  ```

  <ins>root (parent)</ins>:

  ``` bash
  $ cat main.tf

  # Execute "echo $var" dans le module root
  # = hello world!
  resource "null_resource" "example" {
    provisioner "local-exec" {
      command = "echo ${var.var1}"
    }
  }
  # var1 de l'enfant = valeur passée par le parent (hello world!)
  module "module1_example1" {
    source = "./modules/module1"
    var1 = var.var1
  }
  # var1 de l'enfant = sa valeur par défaut (hello child!)
  module "module1_example2" {
    source = "./modules/module1"
  }

  # Définit la variable var1 dans le module root
  $ cat variables.tf
  variable "var1" {
    type = string
    default = "hello parent!"
  }
  ```

  <ins>Exécution</ins>:

  ``` bash
  $ terraform apply
  ...
  module.module1_example1.null_resource.example-child (local-exec): hello world!
  null_resource.example (local-exec): hello world!
  module.module1_example2.null_resource.example-child (local-exec): hello child!
  ```

## Variables en sortie

* Lorsqu'on travaille avec des modules, les variables en sortie permettent de transmettre des informations d'un module à l'autre.  
  Seules les variables en sortie (output) du module root sont affichées dans la console et peuvent être récupérées avec la commande output.
  
  <ins>module1</ins>:

  ``` bash
  # Retourne la variable var1 sous le nom example_child
  $ cat modules/module1/main.tf
  output "example_child" {
    value = var.var1
  }

  # Définit la variable var1 dans module1
  $ cat modules/module1/variables.tf
  variable "var1" {
    type = string
    default = "hello child!"
  }
  ```

  <ins>root</ins>:

  ``` bash
  $ cat main.tf

  # Retourne les variables retournées par les modules
  output "example1" {
    value = module.module1_example1.example_child
  }
  output "example2" {
    value = module.module1_example2.example_child
  }

  # Charge le module module1
  module "module1_example1" {
    source = "./modules/module1"
    var1 = var.var1
  }
  module "module1_example2" {
    source = "./modules/module1"
  }

  # Définit la variable var1 dans le module root
  $ cat variables.tf
  variable "var1" {
    type = string
    default = "hello parent!"
  }
  ```

  <ins>Exécution</ins>:

  ``` bash
  $ terraform apply
  ...
  Apply complete! Resources: 0 added, 0 changed, 0 destroyed.

  Outputs:

  example1 = "hello world!"
  example2 = "hello child!"
  ```

  ![](https://i.imgur.com/6zP38PM.png)

## Providers

* Le module enfant récupère automatiquement les configurations de provider du parent

  ``` bash
  # main.tf
  provider "aws" {
    region = "us-west-1"
  }

  module "child" {
    source = "./child"
  }
  ```
  ``` bash
  # child/main.tf
  resource "aws_s3_bucket" "example" {
    bucket = "provider-inherit-example"
  }
  ```

* On peut limiter les providers auxquels le module a accès en définissant la propriété `providers`. Lorsque l'argument providers est spécifié, il est nécessaire d'énumerer tous les providers auxquels le module a accès

  ``` bash
  # An example child module is instantiated with the alternate configuration,
  # so any AWS resources it defines will use the us-west-2 region.
  module "example" {
    source    = "./example"
    providers = {
      aws = aws.usw2
    }
  }
  ```

* Les configurations de providers supplémentaires (ceux dont l'argument alias est défini) ne sont jamais hérités automatiquement par les modules enfants et doivent donc toujours être transmis explicitement via la propriété providers. Du côté du module enfant, il faut spécifier quel alias correspond à quel provider avec la propriété `configuration_aliases`

  <ins>root (parent)</ins>:

  ``` bash
  # root module
  #+-----------------------------------
  #| To start our own dumb webservers:
  #|   while true; do echo -e "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\"id\": \"$RANDOM\", \"tag\": 8080}" | nc -l 8080 -N; done &
  #|   while true; do echo -e "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\"id\": \"$RANDOM\", \"tag\": 8081}" | nc -l 8081 -N; done &
  #|
  #| To add a delay before it responds:
  #|   while true; do echo -e "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\"id\": \"$RANDOM\", \"tag\": 8082}" | nc -l 8082 -N -i2; done &
  #|
  #| To check it's working:
  #|   curl localhost:8080
  #|   curl localhost:8081
  #|
  #| To stop the webservers:
  #|   jobs
  #|   kill %NUM
  #+-----------------------------------
  terraform {
    required_providers {
      restapi = {
        source  = "Mastercard/restapi"
        version = "1.18.2"
      }
    }
  }
  # Our dumb webserver at port 8080 (response has tag 8080)
  provider "restful" {
    base_url = "http://localhost:8080"
  }
  # Our dumb webserver at port 8081 (response has tag 8081)
  provider "restful" {
    alias = "alt"
    base_url = "http://localhost:8081"
  }

  # Module takes default providers + our aliased restful.alt
  module "module1" {
    source = "./modules/module1"

    providers = {
      restful.alt = restful.alt
    }
  }
  # Print out the module outputs
  output "test" {
    value = <<-EOT
      ${module.module1.var_default}
      ${module.module1.var_alt}
    EOT
  }
  ```

  <ins>module1 (enfant)</ins>:

  ``` bash
  # module1 module
  terraform {
    required_providers {
      restful = {
        source = "magodo/restful"
        configuration_aliases = [ restful.alt ]
      }
    }
  }

  # Request default provider + returns its response in test_default
  data "restful_resource" "test_default" {
    id       = "/posts/1"
  }
  output "var_default" {
    value    = data.restful_resource.test_default.output
  }

  # Request alt provider + returns its response in test_alt
  data "restful_resource" "test_alt" {
    provider = restful.alt
    id       = "/posts/2"
  }
  output "var_alt" {
    value    = data.restful_resource.test_alt.output
  }
  ```

  <ins>Execution</ins>:

  ``` bash
  $ terraform apply -auto-approve
  ...
  Outputs:

  test = <<EOT
  {"id": "23080", "tag": 8080}

  {"id": "16843", "tag": 8081}


  EOT
  ```

## Remote

* Les modules peuvent être chargés à partir du système de fichiers local ou d'une source distante.  
  Comme pour Docker, on utilise un registry pour stocker des modules en dehors du système de fichier.  
  Pour récupérer un module stocké dans un registry (qui peut être local ou hébergé à distance), ajouter le nom de domaine / organisation du registry en préfixe

  ``` bash
  module "s3-webapp" {
    # app.terraform.io/<ORGANIZATION-NAME>/terraform/<NAME>/<PROVIDER>
    source  = "app.terraform.io/hashicorp-learn/s3-webapp/aws"
    name   = var.name
    region = var.region
    prefix = var.prefix
    version = "1.0.0"
  }
  ```
  ``` bash
  module "my-demo" {
    source = "github.com/user-aws1565/example>ref=main"
  }
  ```

  [Module sources](https://developer.hashicorp.com/terraform/language/modules/sources)

## get

* terraform init télécharge et met en cache tous les modules référencés dans la configuration

* On peut vouloir télécharger des modules sans pour autant initialiser l'état — donc sans utiliser terraform init.  
  `terraform get` permet de télécharger et mettre à jour les modules: c'est une version lightweight du init puisqu'on ne met à jour que les modules

  ``` bash
  $ terraform get
  ```

## Modules publics

* Le [registry public de Terraform](https://registry.terraform.io/) permet de récupérer des modules.  
  Seuls les modules officiels et vérifiés seront affichés

  ![](https://i.imgur.com/PC1k6Lp.png)

* Quand on importe un module, si une organisation est spécifiée mais pas le nom de domaine,  
  alors terraform ira chercher sur registry.terraform.io

  ``` bash
  module "consul" {
    source  = "hashicorp/consul/aws"
    version = "0.1.0"
  }
  ```

* Quand on utilise un module externe, une bonne pratique est  
  le verrouiller sa version pour éviter des changements inattendus.

* Pour publier un module sur le registry public,  
  il faut respecter certaines conventions:

  - Le nom du module suit le format `terraform-<PROVIDER>-<NAME>`
  - Il est publié dans un repository de même nom que le module (par exemple sur Github)
  - Il est taggé en suivant un versionnement sémantique (semver.org).  
    Un nouveau tag publie une nouvelle version. Ce tag peut être préfixé d'un `v`

  ![](https://i.imgur.com/3jUDc0x.png)
