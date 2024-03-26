---
title: Variables
category: Terraform
---

## Variables en entrée

### Déclarer une variable

* Avoir des valeurs en dur (comme un numéro de port) à plusieurs endroits peut conduire à faire des mises à jour à un endroit et d'oublier de le répercuter ailleurs. Pour rendre le code plus DRY et plus configurable, terraform permet de définir des variables.
  Une bonne pratique consiste à définir des variables pour tout élément susceptible de changer — comme la taille des instances ou les régions.

* Les variables se définissent avec un bloc `variable`

  ``` bash
  variable "region" {}
  variable "zone" {}
  variable "project" {}
  variable "creds" {}
  ```

* On peut optionnellement y définir les propriétés

  - **type**, pour valider les données en entrées

    ``` bash
    variable "region" {
      type = string
    }
    ```

  - **description**, pour expliquer l'objectif de la variable

    ``` bash
    variable "gcp_serviceaccount_email" {
      description = "email of your service account"
    }
    ```

  - **default**, pour la valeur par défaut

    ``` bash
    variable "filename" {
      default = "/root/pets.txt"
    }
    variable "content" {
      default = "We love pets!"
    }
    ```

  - **validation**, pour ajouter des règles de validation supplémentaires en plus du type

    ``` bash
    variable "server_port" {
      description = "The port that the server wll use to handle HTTP requests"
      default = 8080
      type = number

      validation = {
        condition = var.server_port > 0 && var.server_port < 65536
        error_message = "The port number must be netween 1-65535"
      }
    }
    ```

  - **sensitive**, pour ne pas afficher la valeur de la variable dans la console   
    Note: Bien qu'elles ne soient pas affichées dans la console, les variables seront visibles en clair dans le fichier d'état

      ``` bash
      variable "db_password" {
        description = "Database administrator password"
        type        = string
        sensitive   = true
      }
      ```

  - **nullable**, pour indiquer que la variable peut prendre la valeur `null`.  
    null n'indique pas l'absence de données mais qu'on utilise la valeur par défaut de la propriété, qui suivant le provider peut être définie ou non

      ``` bash
      variable "example" {
        type     = string
        nullable = false
      }
      ```

### Récupérer une valeur

* Dans une ressource, on récupére la valeur d'une variable avec le mot-clé `var`:

  ``` bash
  resource "local_file" "pet" {
    filename = var.filename
    content = var.content
  }
  ```
  ``` bash
  resource "local_file" "hello" {
      filename = "/root/hello.txt"
      content = "Hello ${var.username}"
  }
  ```

### Types

* Terraform supporte des types de données simples et composés

  | Type   | Example
  |---     |---
  | any    | n'importe quelle valeur
  | string | `"/root/pets.txt"`
  | number | `1`
  | bool   | `true`, `false`
  | list   | `["cat", "dog"]`
  | map    | `{ "pet1" = "cat" }`
  | object | `{ name = "medor" }`
  | tuple  | `["cat", 7, true]`
  | set    | `["Mr", "Mrs", "Sir"]`

#### Map

* Une map est un ensemble de clé-valeur non ordonnée, qui par défaut peut contenir n'importe quel type de données (any)

  ``` bash
  variable file-content {
    type = map
    default = {
      "statement1" = "We love pets!"
      "statement2" = "We love animals!"
    }
  }
  ```
  ``` bash
  resource local_file my-pet {
    filename = "/root/pets.txt"
    content = var.file-content["statement2"]
  }
  ```

* On peut spécifier entre parenthèses le type autorisé:

  ``` bash
  variable "tags" {
    description = "Tags to set on the bucket."
    type        = map(string)
    default     = {}
  }
  ```
  ``` bash
  variable "pet_count" {
    default = {
      "dogs" = 3
      "cats" = 1
      "goldfish" = 2
    }
    type = map(number)
  }
  ```

#### List

* Une liste est un ensemble ordonnée de valeurs,  
  qui par défaut peut contenir n'importe quel type de données (any)

  ``` bash
  variable "prefix" {
    default = ["Mr", "Mrs", "Sir"]
    type = list
  }
  ```
  ``` bash
  resource "random_pet" "my-pet" {
    prefix = var.prefix[0]
  }
  ```

* On peut spécifier le type de données contenues, entre parenthèses.  
  Si le type de données ne correspond pas à celui attendu, une erreur sera levée

  ``` bash
  variable "prefix" {
    default = [ 1,2,3 ]
    typ = list(number)
  }
  ```

  ![](https://i.imgur.com/yOvGnT4m.png)

#### Tuple

* Un list utilise des éléments de même type, tel que string ou number.  
  Un tuple peut contenir différents types de données

  ``` bash
  variable kitty {
    type = tuple([string, number, bool])
    default = ["cat", 7, true]
  }
  ```

#### Set

* Un set, contrairement à la list, ne peut pas contenir d'élément dupliqués

  ``` bash
  variable "prefix" {
    default = ["Mr", "Mrs", "Sir"]
    type = set(string)
  }
  ```

#### Object

* Un object permet de créer une structure de données complexes qui combine différents types de variables

  ``` bash
  variable "medor" {
    type = object({
      name = string
      color = string
      age = number
      food = list(string)
      favorite_pet = bool
    })
    default = {
      name = "medor"
      color = "brown"
      age = 7
      food = ["fish", "chicken", "turkey"]
      favorite_pet = true
    }
  }
  ```

* Par défaut, si un attribut de l'objet n'a pas été défini, alors Terraform lève une erreur.  
  À la place, on peut indiquer à Terraform d'insérer une valeur par défaut pour l'attribut manquant grâce à `optional`

  ``` bash
  variable "with_optional_attribute" {
    type = object({
      a = string                # a required attribute
      b = optional(string)      # an optional attribute
      c = optional(number, 127) # an optional attribute with default value
    })
  }
  ```
  ``` bash
  variable "buckets" {
    type = list(object({
      name    = string
      enabled = optional(bool, true)
      website = optional(object({
        index_document = optional(string, "index.html")
        error_document = optional(string, "error.html")
        routing_rules  = optional(string)
      }), {})
    }))
  }
  ```

### Définir la valeur d'une variable

* Il existe différentes manières de définir la valeur d'une variable:

  * <ins>bloc variable</ins>  
    Le bloc variable permet de définir la valeur par défaut de la variable

    ``` bash
    variable "content" {
      default = "We love pets!"
    }
    ```

  * <ins>mode interractif</ins>  
    Un prompt au lancement de terraform invite à entrer les valeurs manquantes des variables qui n'ont aucune valeur définie

    ![](https://i.imgur.com/MvGBPiH.png)

  * <ins>options en ligne de commande</ins>  
     L'option -var permet de spécifier les valeurs des variables en ligne de commande

    ``` bash
    terraform apply -var "filename=/root/pets.txt" -var "content=hello"
    ```

  * <ins>variables d'environnement TF_VAR_name</ins>  
    Les variables d'environnement préfixées de TF_VAR_ permettent de définir les valeurs des variables terraform

    ``` bash
    export TF_VAR_filename="/root/pets.txt"
    terraform apply
    ```

  * <ins>terraform.tfvars, NAME.auto.fvar</ins>   
    Le fichier terraform.tfvars (présent dans le répertoire en cours) permet de définir un ensemble de variable.  
    Tout fichier se terminant par .auto.tfvars sera également lu.  
    Il est également possible d'utiliser des fichiers .tfvars.json

    ``` bash
    $ cat terraform.tfvars
    gcp_serviceaccount_key_path = "testing-416815-45b971068d51.json"
    gcp_serviceaccount_email = "terraform@testing-416815.iam.gserviceaccount.com"

    gcp_project_id = "testing-416815"
    gcp_region = "us-west1"

    $ terraform apply
    ```

    On peut utiliser un fichier avec un autre nom via l'option -var-file

    ```
    terraform apply -var-file variables.tfvars
    ```

* Si la valeur d'une variable est définie à plusieurs endroit, terraform utilise l'ordre de priorité suivant:

  1. (le plus prioritaire) les options en ligne de commande, -var ou -var-file
  2. tout fichier se terminant par .auto.tfvars (par ordre alphabétique)
  3. le fichier terraform.tfvars
  4. les variables d'environnement

  ![](https://i.imgur.com/OhByQpi.png)

---

## Variables en sortie

### Bloc output

* Il est possible de stocker des valeurs en sortie.  
  Les valeurs sont affichées à l'écran au moment de la création des ressources. Ces valeurs seront également enregistrées par terraform et peuvent être récupérées à tout moment après le provisionnement.

  Une bonne pratique est d'utiliser des outputs pour exposer les informations clés des ressources, comme les adresses IP publiques ou les identifiants des ressources.

  ``` bash
  # Create a registry
  resource "google_artifact_registry_repository" "testing_tf_registry" {
    location      = var.gcp_region
    repository_id = "testing-tf-registry"
    description   = "Docker repository"
    format        = "DOCKER"
  }

  # Keep the registry name for later
  # To retrieve it later: terraform output -raw repository
  output "repository" {
    value = "${var.gcp_project_id}/${google_artifact_registry_repository.testing_tf_registry.name}"
  }
  ```

  ![](https://i.imgur.com/eMRckif.png)

* Les variables en sortie sont affichées dans la console à moins d'être déclarée `sensitive`.  
  Et au même titre que les variables en entrée, on peut ajouter une description pour expliquer à quoi correspond la valeur de la variable en sortie

  ``` bash
  output "ip" {
      value = libvirt_domain.domain-ubuntu.*.network_interface.0.addresses
      description = "The public IP address of the server instance."
      sensitive   = true

  }
  ```

### Commande output

* La commande output permet d'afficher les variables en sortie qui ont été enregistrées par terraform.

  ``` bash
  $ terraform output
  pet-name = "Mrs.gibbon"
  ```

  On peut afficher la valeur d'une variable spécifique en ajoutant le nom de la variable en argument

  ``` bash
  $ terraform output pet-name
  "Mrs.gibbon"
  ```

* On peut également utiliser les options -json ou -raw pour changer le format du résultat

  ![](https://i.imgur.com/pAVmumL.png)

---

## Variables locales

* Des variables locales peuvent être déclarées dans un bloc `locals`  
  Leurs valeurs peuvent être récupérées par les ressources avec le mot-clé `local`

  ``` bash
  locals {
    server_name = "server-${var.environment}-${local.base_size + local.factor}"
  }
  ```

  ``` bash
  locals {
    # Ids for multiple sets of EC2 instances, merged together
    instance_ids = concat(aws_instance.blue.*.id, aws_instance.green.*.id)
  }

  locals {
    # Common tags to be assigned to all resources
    common_tags = {
      Service = local.service_name
      Owner   = local.owner
    }
  }
  ```

* On utilise souvent des variables locales lorsqu'on a besoin de  
  faire appel à des fonctions (comme format, replace ou split) pour créer des valeurs.

  ``` bash
  resource "aws_instance" "example" {
    name = format("instance-%s-%d", var.environment, local.total_size)
  }
  ```

---

## Cheatsheet

![](https://i.imgur.com/EXY5BcY.png)
