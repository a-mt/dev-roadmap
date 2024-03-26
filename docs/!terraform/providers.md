---
title: Provider
category: Terraform
---

## Types de provider

* Terraform supporte plus de 100 [fournisseurs](https://registry.terraform.io/browse/providers).  
  On distingue 3 catégories de fournisseurs:

  - **officiel**:  
    les plugins sont détenus et maintenus par Hashicorp.  
    C'est le cas des principaux providers de cloud, tels que GCP et Azure

  - **vérifié**:  
    les plugins sont détenus et maintenus par des sociétés tierces  
    qui suivent un processus de partenariat avec Hashicorp

  - **communauté**:  
    les plugins sont publiés et maintenus par des contributeurs invididuels.  
    Les providers sont développés en Go, en utilisant le Terraform Plugin SDK

* Les types de ressources autorisées et leurs arguments dépendent du fournisseur.  
  Se référer à la [documentation](https://registry.terraform.io/providers/hashicorp/local/latest/docs)

* N'importe qui peut développer et distribuer ses propres fournisseurs.  
  Les fournisseurs tiers doivent être installés manuellement, terraform init ne les télécharge pas automatiquement.

  Pour créer ses propres fournisseurs:  
  [Writing Custom Terraform Providers](https://www.hashicorp.com/blog/writing-custom-terraform-providers)  
  [Plugin Development](https://developer.hashicorp.com/terraform/plugin)  
  [Call APIs with Custom Framework Providers](https://developer.hashicorp.com/terraform/tutorials/providers-plugin-framework)

## Plusieurs providers dans les configs

* Par défaut, les ressources utilisent une configuration de fournisseur
  déduite du préfixe dans le nom du type de ressource.  
  Par exemple: "local_file" utilise le provider "local"

* Plusieurs providers peuvent être utilisés dans un même fichier.  
  Par exemple: le fournisseur "local" permet d'opérer sur la machine en cours, tandis que le fournisseur "random" permet de créer des ressources aléatoires

  ``` bash
  resource "local_file" "pet" {
    filename = "/root/pets.txt"
    content = "We love pets!"
  }

  resource "random_pet" "my-pet" {
    prefix = "Mrs"
    separator = "."
    length = "1"
  }
  ```

## Local-only

* Tandis que la plupart des ressources correspondent à un objet d'infrastructure géré via une API, il existe certains types de ressources qui existent uniquement au sein même de Terraform, qui les enregistre dans l'état pour une utilisation future.  
  Par exemple, il existe des types de ressources locales pour générer des clés privées, émettre des certificats TLS auto-générés ou encore générer des identifiants aléatoires.

  ``` bash
  # RSA key of size 4096 bits
  resource "tls_private_key" "rsa-4096-example" {
    algorithm = "RSA"
    rsa_bits  = 4096
  }
  ```

## Configurations du provider

* Les configurations d'un provider se définissent à l'aide d'un bloc provider.  
  Un même provider peut être définit plusieurs fois, avec des configurations différentes

  - La première configuration est la configuration par défaut pour ce provider

    ``` bash
    provider "google" {
        credentials = file(var.gcp_svc_key)
        project = var.gcp_project
        region = var.gcp_region
    }
    resource "google_artifact_registry_repository" "testing_tf_registry" {
      location      = "us-west1"
      repository_id = "testing-tf-registry"
      description   = "Docker repository"
      format        = "DOCKER"
    }
    ```

  - Pour utiliser une configuration alternative, il faut définir un alias avec `alias = ALIAS_NAME`  
    et spécifier la propriété `provider = PROVIDER_NAME.ALIAS_NAME` pour la ressource.  
    Les configurations alternatives sont généralement utilisées lorsqu'il est nécessaire de déployer des ressources dans plusieurs régions

    ``` bash
    # default provider configuration: for resources that begin with `aws_`
    provider "aws" {
      region = "us-east-1"
    }
    # additional provider configuration: resources can reference this as `aws.west`
    provider "aws" {
      alias  = "west"
      region = "us-west-2"
    }
    resource "aws_instance" "foo" {
      provider = aws.west

      # ...
    }
    ```

    On peut aussi s'en servir pour déployer des ressources en utilisant différents comptes utilisateur

    ``` bash
    provider "aws" {
      region = "ap-southeast-1"
    }
    provider "aws" {
      alias = "user2"
      region = "user-east-2"
      profile = "user2"
    }

    ```

* La documentation d'un provider liste les arguments attendus

## Contraintes de version

* Par défaut, terraform installe la dernière version du plugin du provider (latest).  
  Les fonctionnalités d'un plugin fournisseur peuvent considérablement changer d'une version à l'autre, il est donc préférable de spécifier la version utilisée

  ![](https://i.imgur.com/OqC37ia.png)

* Pour s'assurer qu'init installera une version spécifique du plugin fournisseur:  
  le bloc `terraform` permet de configurer les paramètres relatifs à terraform lui-même — dont la version des providers.  

  ``` bash
  terraform {
    required_providers {
      # Utiliser la version 3.1.0 du provider random
      random = {
        source  = "hashicorp/random"
        version = "3.1.0"
      }
      # Utiliser la dernière version du provider AWS qui est plus grande de 2.0.0
      aws = {
        source  = "hashicorp/aws"
        version = ">= 2.0.0"
      }
    }
    # Binaire terraform plus récent que 1.1.x
    required_version = ">= 1.1"
  }
  ```
  ``` bash
  terraform {
    required_providers {
      libvirt = {
        source = "dmacvicar/libvirt"
        version = "0.6.14"
      }
    }
  }
  provider "libvirt" {
    uri = "qemu:///system"
  }
  ````

* Spécifier la version du provider (et donc avoir un bloc dans required_providers) est obligatoire pour les providers qui ne sont pas publiés par Terraform — par exemple Digital Ocean, puisqu'il s'agit d'un plugin "verified" et non "official"

* On notera que par défaut Terraform cherchera dans le registry puplic app.terraform.io,  
  spécifier le path complet du provider pour utiliser un autre registry

  ``` bash
  terraform {
    required_providers {
      # Provider venant d'un registry perso
      mycloud = {
        source  = "terraform.example.com/examplecorp/ourcloud"
        version = ">= 1.0"
      }
    }
  }
  ```

### Opérateurs

* Pour sélectionner la version à installer, on peut utiliser différents opérateurs de comparaison:

  ```
  version = "1.4.0"
  version = "!= 2.0.0"
  version = "< 1.4.0"
  version = "> 1.1.0"
  version = "~> 1.2"

  # ~>1.2   = dernière version entre 1.2 et 1.9
  # ~>1.2.0 = dernière version entre 1.2.0 et 1.2.9
  ```

* On peut également combiner les opérateurs:

  ```
  version = "> 1.2.0, < 2.0.0, != 1.4.0"
  ```

## Commande providers

* Pour voir la liste de tous les providers utilisés:

  ``` bash
  $ terraform providers
  ```

* Pour copier un provider et ses configurations à partir d'un autre répertoire:

  ``` bash
  $ terraform providers mirror /root/terraform/new_local_file
  ```

  ![](https://i.imgur.com/PcVWYyd.png)

## Bloc terraform

* Les différents paramètres possibles pour le bloc terraform sont:

  - `required_version`  
    Définit la version de Terraform attendue

    ``` bash
    terraform {
      # Binaire terraform plus récent que 1.1.x
      required_version = ">= 1.1"
    }
    ```

  - `required_providers`  
    Définit les configurations des providers

    ``` bash
    terraform {
      required_providers {
        random = {
          source  = "hashicorp/random"
          version = "3.1.0"
        }
      }
    }
    ```

  - `provider_meta`  
    Pour chaque provider, le bloc terraform peut avoir un bloc `provider_meta` imbriqué — si le provider définit un schema pour. Ça permet au provider de recevoir des informations spécifiques au module

    ``` bash
    terraform {
      provider_meta "my-provider" {
        hello = "world"
      }
    }
    ```

  - `experiment`  
    Terraform introduit parfois de nouvelles fonctionnalités expérimentales, pour que la communauté puisse l'essayer et donner son avis avant de l'intégrer définitivement à Terraform. On peut activer une fonctionnalité expérimentale à l'intérieur d'un bloc terraform:

    ``` bash
    terraform {
      experiments = [example]
    }
    ```
