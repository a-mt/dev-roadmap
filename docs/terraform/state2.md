---
title: État - partie 2
category: Terraform
---

## Backend

Le backend détermine l'endroit où l'état est stocké. Par exemple le backend local (par défaut) stocke l'état sur le disque dans un fichier JSON. D'[autres backend](https://developer.hashicorp.com/terraform/language/settings/backends/local) permettent de stocker l'état à d'autres emplacement sous d'autres formats, par exemple dans un bucket AWS S3, HashiCorp Consul, Azure Blob Storage, Google Cloud Storage, Alibaba Cloud OSS, etc.

Terraform distingue deux types de backends:

- <ins>standard</ins>: ne fait que stocker le fichier d'état
- <ins>enhanced</ins>: stocke le fichier d'état et éxécute les opérations terraform — dispose de son propre runtime

### Local

* Par défaut les données d'état sont stockées dans un fichier local, terraform.tfstate,  
  et utilise le backend "local" dans le répertoire en cours. Pour modifier le path du fichier:

  ``` bash
  terraform {
    backend "local" {
      path = "relative/path/to/terraform.tfstate"
    }
  }
  ```

### Remote

* Lorsqu'on travaille en équipe avec Terraform, avoir un fichier local en complique les choses puisque chaque utilisateur doit s'assurer qu'il dispose toujours du dernier état avant d'exécuter Terraform et s'assurer que personne d'autre ne l'utilise en même temps.

* Avec le backend "remote", l'état peut être stocké à distance dans Terraform Cloud

  ``` bash
  terraform {
    backend "remote" {
      hostname = "app.terraform.io"
      organization = "my-company"

      workspaces {
        prefix = "test-"
      }
    }
  }
  ```

* Certains backends supportent des workspaces nommés (dont remote), ce qui permet d'associer plusieurs états à une seule configuration — comme l'état en dev, staging et prod.  
  Les données stockées dans le backend appartiennent à un workspace.  

* Le bloc workspaces a deux paramètres possibles — un seul pouvant être défini à la fois:

  - **name**: associe la configuration actuelle avec un workspace unique
  - **prefix**: fait correspondre le workspace local "NAME" au workspace distant "${PREFIX}${NAME}"  
    Dans notre exemple, le workspace "dev" local sera associé au workspace distant "test-dev"

  ![](https://i.imgur.com/aMnr7vg.png)

* Lorsqu'on stocke l'état à distance, l'état est conservé en mémoire pendant la durée d'utilisation de Terraform.  
  Quant à l'état stocké à distance, il peut être chiffré ou non suivant le backend utilisé.

### Bloc cloud

* Terraform 1.1 introduit le block `cloud` comme alternative au `backend "remote"`.  
  Si la configuration inclut un bloc cloud, elle ne peut pas inclure de bloc backend

* Les paramètres hostname et organization ne changent pas, mais workspaces n'a plus exactement le même fonctionnement.  
  Il y a désormais deux arguments possibles:

  - **name**: (comme avant) associe la configuration actuelle avec un workspace unique  
  - **tags**: fait correspondre le workspace local au workspace distant de même nom et qui a les tags spécifiés.  
    Dans notre exemple le workspace local "dev" sera associé au workspace distant "dev" qui a les tags "cloud:aws" et "security"

  ``` bash
  terraform {
    cloud {
      hostname = "app.terraform.io"
      organization = "my-company"

      workspaces {
        tags = ["cloud:aws", "security"]
      }
    }
  }
  ```

  ![](https://i.imgur.com/uFqM5le.png)

### s3

* Utiliser un bucket S3 est un autre approche populaire.  
  Le chiffrement au repos peut être activé avec l'option `encrypt` et les locks avec `dynamodb_table` — la table dynamodb doit être créée au préalable

  ``` bash
  terraform {
   backend "s3" {
     bucket = "bucket_name"
     key    = "s3-backend.tfstate"
     region = "eu-central-1"
     access_key = "AKIA56LJEQNM"
     secret_key = "0V9cw4CVON2w1"

     # dynamodb table is used for state file locking
     dynamodb_table = "s3-dynamodb-lock"
   }
  }
  ```

  ![](https://u.imgur.com/Eep2fJp.png)

### -backend-config

* Si les informations du backend sont dynamiques ou sensibles et ne peuvent pas être spécifiées dans le fichier de configuration, on peut spécifier les paramètres du backend dans un fichier séparé et le charger au moment du init avec l'option `-backend-config=file`

  ``` bash
  # terraform.tf
  terraform {
    required_version = "~> 0.12.0"

    backend "remote" {}
  }
  ```
  ``` bash
  # backend.hcl
  hostname = "app.terraform.io"
  organization = "company"

  workspaces { name = "workspace" }
  ```
  ``` bash
  $ terraform init -backend-config=backend.hcl
  ```

  ![](https://i.imgur.com/TlVd2mT.png)

## TF_WORKSPACE

* Une autre alternative est d'utiliser un boc `cloud` vide et  
  spécifier les différents paramètres via des variables d'environnement:

  ``` bash
  # terraform.tf
  terraform {
    cloud {
    }
  }
  ```
  ``` bash
  TF_CLOUD_HOSTNAME: "app.terraform.io"
  TF_CLOUD_ORGANIZATION: "a-mt"
  TF_WORKSPACE: "test-terraform-cloud"
  ```

## Lock

* Si cette fonctionnalité est supportée par le backend:  
  lorsqu'on lance un plan ou apply terraform, on obtient un lock en écriture sur le fichier d'état, ce qui permet d'éviter que deux personnes ne modifient l'infrastructure en même temps et ne corrompent l'état.

  La manière de s'y prendre pour activer cette option (dans les configurations du backend) sera indiqué dans la documentation.  
  Par exemple: [AWS S3: DynamoDB State Locking](https://developer.hashicorp.com/terraform/language/settings/backends/s3#dynamodb-state-locking)

  ![](https://i.imgur.com/n0hLxK0.png)

### lock.hcl

* Le backend local supporte les locks:  

  - <ins>lock de l'état</ins>  
    Lorsqu'on lance un terraform apply, le fichier de lock `.terraform.tfstate.lock.hcl` est créé

  - <ins>lock des mises à jour de dépendances</ins>  
    Lorsqu'on lance un terraform init, le fichier de lock `.terraform.lock.hcl` est créé

* Si le déverrouillage automatique échoue, Terraform affiche l'identifiant du lock (lockID) et on peut supprimer ce lock avec la commande `force-unlock`. Le déverrouillage manuel ne doit être utilisé que pour supprimer votre propre lock, lorsque la suppression automatique a échoué; l'identifiant agit comme un nonce qui garantit la suppression du bon lock

  ``` bash
  $ terraform force-unlock 9141a539b-ff25-76ed-92d-547an37b24d -force
  ```

* Pour la plupart des commandes, on peut désactiver le lock avec le flag `-lock` — mais ce n'est pas recommendé

## state push/pull

* Lorsqu'on utilise un backend autre que local, l'état n'est pas écrit sur le disque. Comme des valeurs sensibles se trouvent dans le fichier d'état, utiliser un backend distant permet de ne jamais persister ces valeurs sur le disque.  
  Par contre, si l'écriture sur le backend échoue alors, pour éviter toute perte de données, Terraform écrira cet état sur le disque.
  Dans ce cas, l'utilisateur doit pusher manuellement l'état vers le backend distant une fois l'erreur résolue

* Pour envoyer l'état local à distance:

  ```
  terraform state push
  ```

  Cette manipulation est dangereuse et devrait être évitée si possible puisqu'on écrase l'état distant.   
  Pour éviter les erreurs, Terraform effectue quelques vérifications:

  - le "lineage" est un ID unique assigné à l'état lorsqu'il est crée. Si le lineage est différent, il est très probable qu'on cherche à modifier un état différent et Terraform empêchera le push

  - le serial: chaque état a un numéro de série qui est incrémenté au fur et à mesure. Si l'état de destination a un numéro de serial plus élevé, alors des changements ont eu lieu depuis l'état que vous aviez et Terraform empêchera le push

  Ces protections peuvent être bypassées avec l'option `-force`

* Pour récupérer l'état distant en local:

  ```
  terraform state pull
  ```

## data.terraform_remote_state

Un bloc data de type "terraform_remote_state" permet de récupérer les variables en sortie d'un objet d'infrastructure décrit dans un fichier tfstate distant. Il n'est pas nécessaire ici d'acquérir un lock puisqu'on est en lecture uniquement

``` bash
data "terraform_remote_state" "vpc" {
  backend = "remote"

  config = {
    organization = "hashicorp"
    workspaces = {
      name = "vpc-prod"
    }
  }
}

# Terraform >= 0.12
resource "aws_instance" "foo" {
  # ...
  subnet_id = data.terraform_remote_state.vpc.outputs.subnet_id
}
```
``` bash
# cross-referencing stacks
data "terraform_remote_state" "networking" {
  backend = "local"

  config = {
    path = "${path.module}/networking/terraform.tfstate"
  }
}
```
