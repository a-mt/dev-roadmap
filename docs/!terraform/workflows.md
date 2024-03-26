---
title: Workflows
category: Terraform
---

## Types de Workflows

* De manière générale, un workflow Terraform suit 3 étapes: write, plan, apply.  
  La manière d'implémenter ces 3 étapes varie suivant l'équipe

  * **Individual practictioner**  
    C'est le workflow le plus simple, il n'y a qu'une personne qui utilise Terraform.  
    Tout est exécuté sur la machine locale, il y a une boucle de retro-action courte entre l'écriture du code et l'exécution des commandes de test. Après une provision réussie, le code est commité et pushé vers un repo distant

  * **Team**  
    Il y a plusieurs personnes dans l'équipe qui utilisent Terraform, sans Terraform Cloud.  
    Chacun travaille dans une branche séparée, et les conflits éventuels sont résolus au moment du merge. Une fois les changements validés et mergés, une pipeline CI/CD est déclenchée et exécute terraform apply

  * **Terraform Cloud**  
    Il y a plusieurs personnes dans l'équipe qui utilisent Terraform, configuré avec Terraform Cloud.  
    Chacun travaille commite son code dans une branche séparée et lorsqu'un pull request est crée vers la branche principale, Terraform Cloud génère un plan. L'équipe peut vérifier ce plan, ajouter des commentaires, et éventuellement confirmer le merge request, ce qui déclenche l'exécution du apply dans Terraform Cloud

    Une grosse partie du CI/CD passe par Terraform Cloud: il stocke et sécurise les données sensibles (ex les identifiants d'authentification du cloud provider, les adresses IP) et garde un historique des exécutions, ce qui facilite les rollbacks et audits

  <!--
  ![](https://i.imgur.com/O2Pb1JG.png)
  ![](https://i.imgur.com/Kj7ic09.png)
  ![](https://i.imgur.com/0hJcXug.png)
  -->

## Terraform Cloud Run Worfklow

* Pour mettre en place un workflow avec Terraform Cloud, on commence par créer un workspace.  
  À la création du workspace, choisir un des 3 types de workflows supportés:
  
  ![](https://i.imgur.com/75y7ecN.png)

* **Version Control System (VCS)** — aka User Interface (UI) driven  
  Terraform Cloud est integré à une branche du système de versionnement via des webhooks, Github actions par exemple. Lorsqu'un pull request est crée, un plan est généré; et lorsqu'un merge est crée, un apply est lancé.  
  Différents VCS sont supportés, il suffit de choisir le provider (Github, Gitlab, etc) à la création du workspace

  ![](https://i.imgur.com/b6Ux9l5l.png)

* **Command Line Interface (CLI)**  
  Les runs sont déclenchés par l'utilisateur localement via la ligne de commande — terraform apply et terraform plan

* **Application Programming Interface (API)**  
  Un outil tiers déclenche les runs via l'API Terraform Cloud:  
  à chaque nouvelle version de configuration, une archive .tar.gz est créé et envoyée à Terraform Cloud

<!--
![](https://i.imgur.com/EfoZgut.png)
-->

## Mettre en place un workflow Terraform Cloud

### Provider

* Préparer le projet sur le provider choisit — project, service account, JSON key

  ``` bash
  $ cat key.json | tr -s '\n' ' '
  { "type": "service_account", "project_id": "test-terraform-cloud", "private_key_id": "...
  ```

### Terraform Cloud

* Créer un workspace
* Définir les valeurs des variables utilisées dans les fichiers de configuration Terraform — authentification du provider, etc

  ![](https://i.imgur.com/TvuL9Gwl.png)

### Fichiers de configuration

* Placer les fichiers de configurations Terraform dans le répertoire /infra

  ```
  $ lstree infra
  infra
  ├── assets
  │   └── index.html
  ├── main.tf
  ├── outputs.tf
  ├── provider.tf
  ├── terraform.tf
  └── variables.tf
  ```

  <details>
    <summary>Exemple</summary>

    <pre lang="bash">
    # infra/provider.tf
    provider "google" {
      credentials = var.gcp_credentials
      project = var.gcp_project
      region = var.gcp_region
    }
    </pre>
    <pre lang="bash">
    # infra/variables.tf
    variable "gcp_credentials" {
      type = string
      description = "GCP: Credentials (JSON key content without newlines)"
    }
    variable "gcp_project" {
      type = string
      description = "GCP: Project name"
    }
    variable "gcp_region" {
      type = string
      description = "GCP: Default region to manage resources"
    }
    variable "gcp_bucket_location" {
      type = string
      description = "GCP: Location of the bucket"
    }
    </pre>
    <pre lang="bash">
    # infra/main.tf

    # Create a bucket
    # see https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/storage_bucket
    resource "google_storage_bucket" "website" {
      name = "${var.gcp_project}-static-website"  # has to be globally unique
      location = var.gcp_bucket_location
    }

    # Upload index.html to the bucket
    resource "google_storage_bucket_object" "static_site_index" {
      name = "index.html"           # name in the bucket
      source = "assets/index.html"  # local path
      bucket = google_storage_bucket.website.name
    }

    # Make index.html publicly accessible
    resource "google_storage_object_access_control" "public_index_rule" {
      object = google_storage_bucket_object.static_site_index.name
      bucket = google_storage_bucket.website.name
      role = "READER"
      entity = "allUsers"
    }
    </pre>
    <pre lang="bash">
    # infra/outputs.tf

    # https://cloud.google.com/storage/docs/collaboration#browser
    output "gcp_index_url" {
      value       = "http://storage.googleapis.com/${google_storage_bucket.website.name}/${google_storage_bucket_object.static_site_index.name}"
      description = "Public URL to view index.html"
    }
    output "gcp_index_download_link" {
      value       = google_storage_bucket_object.static_site_index.media_link
      description = "Public URL to download index.html"
    }
    </pre>
  </details>

### Option 1: CLI

#### Configurer

- Mettre à jour `infra/terraform.tf` avec le nom de l'organisation et du workspace sur Terraform Cloud

  ``` bash
  terraform {
    cloud {
      hostname     = "app.terraform.io"
      organization = "my-organization-name"

      workspaces {
        name = "my-workspace-name"
      }
    }
  }
  ```

- S'identifier sur Terraform Cloud

  ``` bash
  $ terraform login
  ```

#### Lancer

- Utiliser la ligne de commande

  ``` bash
  $ cd infra
  $ terraform init
  $ terraform plan
  $ terraform apply
  ```

### Option 2: VCS (Github)

#### Configurer

* Créer un repo sur Github

* Stocker le token d'authentification Terraform Cloud dans un secret:  
  Settings du workspace > Secrets and variables: Actons > New repository secret

* Configurer un runner pour exécuter les pipelines Github:  
  Settings du workspace > Actions > Runners > New self-hosted runner  
  Les instructions pour installer un runner et le connecter au workspace seront indiquées

* Mettre à jour `infra/terraform.tf` avec un bloc Cloud vide

  ``` bash
  terraform {
    cloud {
    }
  }
  ```

* Créer un fichier de configuration Github pour déclencher une pipeline Terraform  
  par exemple au pull request et au push sur la branche "prod": [.github/workflows/terraform.yml](https://github.com/a-mt/gcp-bucket-terraform-cloud/blob/dev/.github/workflows/terraform.yml)

* Dans le fichier:  
  Créer des variables d'environnements qui définissent le nom de l'organisation et du workspace

  ```
  TF_CLOUD_HOSTNAME: "app.terraform.io"
  TF_CLOUD_ORGANIZATION: "my-organization-name"
  TF_WORKSPACE: "my-workspace-name"
  ```

  Créer une variable d'environnement qui définit le token d'authentification Terraform Cloud   
  (avec pour valeur le secret précédemment crée)

  {% raw %}
  <pre>
  TF_TOKEN_app_terraform_io: "${{ secrets.TF_API_TOKEN }}"
  TF_IN_AUTOMATION: 1
  </pre>
  {% endraw %}

#### Lancer

* Commiter sur une nouvelle branche

* Créer un merge request. Le workflow Github se déclenche et execute un plan sur Terraform Cloud.  
  Le statut du workflow (en cours / succès / erreur) est indiqué à l'intérieur du Merge Request.  
  On peut vérifier le détail du plan qui va être executé dans la pipeline Github ou sur Terraform Cloud

  ![](https://i.imgur.com/0a46Szx.png)
  ![](https://i.imgur.com/tQClPo0.png)
  ![](https://i.imgur.com/oXPFqRr.png)

* Merger / accepter le request request pour déclencher un apply sur Terraform Cloud

  ![](https://i.imgur.com/Qik16p6.png)
  ![](https://i.imgur.com/iXmPMxI.png)

[Automate Terraform with GitHub Actions](https://developer.hashicorp.com/terraform/tutorials/automation/github-actions)
