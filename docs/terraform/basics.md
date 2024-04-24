---
title: Les bases
category: Terraform
---

## Syntaxe HCL

* L'extension des fichiers de configuration Terraform est le .tf (ou .tf.json),  
  et le language de déclaration utilisé est le HCL (*Hashicorp Configuration Language*)

### Blocs

* Un fichier .tf contient un ensemble de blocs dont le format général est comme suit:

  ```
  <block> <parameters> {
    key1 = value1
    key2 = value2
  }
  ```

  <ins>Exemple</ins>:  
  Pour créer un fichier sur le système de fichier local:

  ```
  resource "local_file" "pet" {
    filename = "/root/pets.txt"
    content = "We love pets!"
  }
  ```

  "local_file" affiche le contenu du fichier dans la console, tandis que le type "local_sensitive_file" le garde masqué

### Identifiants

* Tous les identifiants (types de blocs, noms, variables, etc) peuvent contenir des lettres, chiffres, underscore (`_`) et traits d'union (`-`). Pour éviter toute ambiguïté avec les nombres littéraux, le premier caractère d'un identifiant ne peut pas être un chiffre

### Commentaires

* Une bonne pratique est commenter le code pour expliquer le "pourquoi" derrière certaines configurations complexes, et ainsi permettre aux développeurs qui arrivent sur le projet de facilement comprendre ce qu'on fait

* On peut ajouter des commentaires de 3 manières:

  - Commentaire sur une ligne: `# ...` ou `\\ ...`
  - Commentaire sur plusieurs lignes: `/* ... */`

### Encodages

* Les fichiers de configuration Terraform doivent toujours être en UTF-8.  
  Les fins de lignes peuvent être de style Unix (LF) ou Windows (CR LF).

### Conventions

* Indenter avec deux espaces  
* Quand des arguments en une seule ligne apparaissent sur des lignes consécutives, on aligne le signe égal

  ```
  ami           = "abc123"
  instance_type = "t2.micro"
  ```

### Syntaxe JSON alternative

* Terraform supporte une syntaxe alternative compatible JSON.  
  Ces fichiers ont l'extension .tf.json

* Typiquement, on utilise cette syntaxe quand on génère des Terraform  avec un programme —  
  ça permet de tirer parti des packages JSON existants pour générer les fichiers de configuration.

  ``` json
  {
    "resource": {
      "aws_instance": {
        "example": {
          "instance_type": "t2.micro",
          "ami": "ami-abc123"
        }
      }
    }
  }
  ```

---

## Commandes

### init

* Après avoir écrit un fichier de configuration terraform, la première chose à faire est d'initialiser le répertoire

  ``` bash
  $ terraform init
  Initializing the backend...

  Initializing provider plugins...
  - Finding latest version of hashicorp/local...
  - Installing hashicorp/local v2.4.0...
  - Installed hashicorp/local v2.4.0 (signed by HashiCorp)

  Terraform has created a lock file .terraform.lock.hcl to record the provider
  selections it made above. Include this file in your version control repository
  so that Terraform can guarantee to make the same selections by default when
  you run "terraform init" in the future.

  Terraform has been successfully initialized!

  You may now begin working with Terraform. Try running "terraform plan" to see
  any changes that are required for your infrastructure. All Terraform commands
  should now work.

  If you ever set or change modules or backend configuration for Terraform,
  rerun this command to reinitialize your working directory. If you forget, other
  commands will detect it and remind you to do so if necessary.
  ```

* Un peu sur le même principe que `npm init`, `terraform init` va télécharger  
  et installer les plugins nécessaires — Terraform le détermine en fonction des ressources déclarées dans les fichiers de configuration

- La liste des plugins installés est sauvegardée dans le fichier `.terraform.lock.hcl`  
  Le fichier lock des dépendances utilise la même syntaxe que le language principal de Terraform, mais il n'est pas en lui-même un fichier de configuration de Terraform, il est nommé avec le suffixe .hcl au lieu de .tf pour indiquer cette différence

- Les plugins sont enregistrés dans le répertoire `.terraform`. On y retrouvera  
  1/ le nom du registry, qui est registry.terraform.io par défaut,  
  2/ le nom de l'organisation à l'origine du plugin, par exemple hashicorp,  
  3/ le nom du plugin, par exemple google 

  ``` bash
  $ tree .terraform
  .terraform
  └── providers
      └── registry.terraform.io
          └── hashicorp
              └── google
                  └── 5.19.0
                      └── linux_amd64
                          └── terraform-provider-google_v5.19.0_x5
  ```

- La commande init peut être exécutée autant de fois que nécessaire sans avoir d'impact sur l'infrastructure déployée.  
  Si on modifie ou si on change les dépendances, il faut relancer `terraform init` pour appliquer les modifications.

- Pour mettre à jour les plugins à la dernière version disponible:

  ``` bash
  $ terraform init -upgrade
  ```

### validate

* On peut vérifier que la syntaxe utilisée dans les fichiers de configuration est correcte avec validate

  ``` bash
  $ terraform validate
  # output
  Success! The configuration is valid.
  ```

  ![](https://i.imgur.com/UvtVQtL.png)

### plan

* La commande plan indique à terraform d'analyser la configuration et de la comparer avec l'état actuel de l'infrastructure. Les changements qui seront effectués par terraform sont affichés à l'écran, sans que les modifications l'infrastructure ne soient effectuées

  ``` bash
  $ terraform plan

  Terraform used the selected providers to generate the following execution plan. Resource actions are indicated
  with the following symbols:
    + create

  Terraform will perform the following actions:

    # local_file.games will be created
    + resource "local_file" "games" {
        + content              = "FIFA 21"
        + content_base64sha256 = (known after apply)
        + content_base64sha512 = (known after apply)
        + content_md5          = (known after apply)
        + content_sha1         = (known after apply)
        + content_sha256       = (known after apply)
        + content_sha512       = (known after apply)
        + directory_permission = "0777"
        + file_permission      = "0777"
        + filename             = "/root/favorite-games"
        + id                   = (known after apply)
      }

  Plan: 1 to add, 0 to change, 0 to destroy.

  ────────────────────────────────────────────────────────────────────────────────────────────────────────────────

  Note: You didn't use the -out option to save this plan, so Terraform can't guarantee to take exactly these
  actions if you run "terraform apply" now.
  ```

### apply

* Dans la plupart des cas, on exécute la commande apply directement, puisqu'elle affiche le plan avant de demander confirmation pour effectuer les changements — taper "yes" pour valider.

  ``` bash
  $ terraform apply

  Terraform used the selected providers to generate the following execution plan. Resource actions are indicated
  with the following symbols:
    + create

  Terraform will perform the following actions:

    # local_file.games will be created
    + resource "local_file" "games" {
        + content              = "FIFA 21"
        + content_base64sha256 = (known after apply)
        + content_base64sha512 = (known after apply)
        + content_md5          = (known after apply)
        + content_sha1         = (known after apply)
        + content_sha256       = (known after apply)
        + content_sha512       = (known after apply)
        + directory_permission = "0777"
        + file_permission      = "0777"
        + filename             = "/root/favorite-games"
        + id                   = (known after apply)
      }

  Plan: 1 to add, 0 to change, 0 to destroy.

  Do you want to perform these actions?
    Terraform will perform the actions described above.
    Only 'yes' will be accepted to approve.

    Enter a value: yes

  local_file.games: Creating...
  local_file.games: Creation complete after 0s [id=f68b901eb16aff12e9458bdb656a7df8d3425d4c]

  Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
  ```

* Lancer Terraform va

  * <ins>Créer</ins> les ressources qui existent dans la configuration mais qui ne sont pas associées à un réel objet d'infrastructure
  * <ins>Supprimer</ins> les ressources qui ont été créées par terraform mais qui n'existent plus dans la configuration
  * <ins>Mettre à jour</ins> les ressources existantes dont les arguments ont changé
  * <ins>Supprimer et recréer</ins> les ressources dont les arguments ont changé mais qui ne peuvent pas être mises à jour via l'API

  ![](https://i.imgur.com/HO2gbzO.png)

* Utiliser l'option `-auto-approve` pour ne pas avoir à taper le yes

  ```
  terraform apply -auto-approve
  ```

* On peut sauvegarder un plan dans un fichier, pour ensuite effectuer les modifications du plan avec apply.  
  Notons que dans ce cas Terraform ne demande pas de confirmation — utiliser terrafow show pour inspecter le plan en amont

  ``` bash
  # Create a deployment plan
  terraform plan -out tfplan

  # Deploy the configuration
  terraform apply tfplan
  ```

### state list

* Pour lister les ressources qui ont été deployées:

  ```bash
  $ terraform state list
  local_file.pet
  ```

### state show

* Pour afficher le détail d'une ressource déployée:

  ``` bash
  $ terraform state show local_file.pet
  # local_file.pet:
  resource "local_file" "pet" {
      content              = "We love pets!"
      content_base64sha256 = "zUA5Ip/IeKlmTQIptlp90JdMGAd8YLStDXhpGq0Bp0c="
      content_base64sha512 = "tduqTz5S8Wa3O9Ab5+g0GcGL6kMjMh61vjFcMm5KkOO5TgViAC/kBOdvYHl9qky2K99+u80z0CfCs2ExsHbjGg=="
      content_md5          = "f510a471c5dc0bcd4759ad9dc81a516f"
      content_sha1         = "cba595b7d9f94ba1107a46f3f731912d95fb3d2c"
      content_sha256       = "cd4039229fc878a9664d0229b65a7dd0974c18077c60b4ad0d78691aad01a747"
      content_sha512       = "b5dbaa4f3e52f166b73bd01be7e83419c18bea4323321eb5be315c326e4a90e3b94e0562002fe404e76f60797daa4cb62bdf7ebbcd33d027c2b36131b076e31a"
      directory_permission = "0777"
      file_permission      = "0777"
      filename             = "pets.txt"
      id                   = "cba595b7d9f94ba1107a46f3f731912d95fb3d2c"
  }
  ```

### destroy

* Pour supprimer les ressources gérées par terraform:

  ``` bash
  $ terraform destroy
  local_sensitive_file.games: Refreshing state... [id=f68b901eb16aff12e9458bdb656a7df8d3425d4c]

  Terraform used the selected providers to generate the following execution plan. Resource actions are indicated
  with the following symbols:
    - destroy

  Terraform will perform the following actions:

    # local_sensitive_file.games will be destroyed
    - resource "local_sensitive_file" "games" {
        - content              = (sensitive value) -> null
        - content_base64sha256 = "0QatlfVl9H412mXNB5/Y9evwrDIxEW4ooJpmph2eoUY=" -> null
        - content_base64sha512 = "F0zLI9RS+tFB53xwISp1R3wvRQ/Sw4hsxwysWamsAk/cNyHr/X/pmmykTTCuvkRvr+3y+5c7Sc/J/ObRRX1mIg==" -> null
        - content_md5          = "44a271e06ddd134cdbeab299288422f3" -> null
        - content_sha1         = "f68b901eb16aff12e9458bdb656a7df8d3425d4c" -> null
        - content_sha256       = "d106ad95f565f47e35da65cd079fd8f5ebf0ac3231116e28a09a66a61d9ea146" -> null
        - content_sha512       = "174ccb23d452fad141e77c70212a75477c2f450fd2c3886cc70cac59a9ac024fdc3721ebfd7fe99a6ca44d30aebe446fafedf2fb973b49cfc9fce6d1457d6622" -> null
        - directory_permission = "0700" -> null
        - file_permission      = "0700" -> null
        - filename             = "/root/favorite-games" -> null
        - id                   = "f68b901eb16aff12e9458bdb656a7df8d3425d4c" -> null
      }

  Plan: 0 to add, 0 to change, 1 to destroy.

  Do you really want to destroy all resources?
    Terraform will destroy all your managed infrastructure, as shown above.
    There is no undo. Only 'yes' will be accepted to confirm.

    Enter a value: yes

  local_sensitive_file.games: Destroying... [id=f68b901eb16aff12e9458bdb656a7df8d3425d4c]
  local_sensitive_file.games: Destruction complete after 0s

  Destroy complete! Resources: 1 destroyed.
  ```

  Pour supprimer une ressource en particulier:

  ``` bash
  terraform destroy -target aws_instance.ec2
  ````

  ![](https://i.imgur.com/14k6EVj.png)

* Pour récupérer le plan en mode destroy:

  ```
  $ terraform plan -destroy
  ```

### fmt

* La commande fmt met en forme le code dans les fichiers de configurations — ce qui permet d'améliorer leur lisibilité. La liste des fichiers modifiés sont affichés à l'écran

  ``` bash
  $ terraform fmt
  ```

  ![](https://i.imgur.com/JJYVy7a.png)

* Par défaut, seul le répertoire en cours est traité. Ajouter l'option -recursive pour traiter les sous-répertoires

  ``` bash
  $ terraform fmt
  main.tf
  $ terraform fmt -recursive
  modules/module1/main.tf
  ```

* -check permet de vérifier le formattage des fichiers sans les mettre à jour. Particulièrement utile dans une pipeline Terraform

  ``` bash
  $ terraform fmt -check -recursive
  modules/module1/main.tf
  ```

### console

* La commande console permet de démarrer une console interactive pour tester des expressions

  ``` bash
  $ terraform console
  Acquiring state lock. This may take a few moments...

  > abs(-12.2)
  12.2
  > exit
  ```

### Recap

``` bash
# Installer les plugins
$ terraform init

# Vérifier ce que terraform va faire
$ terraform plan

# Créer les resources
$ terraform apply

# Supprimer les ressources
$ terraform destroy
```

---

## Conventions de fichiers

* Terraform prend en compte tous les fichiers d'extension .tf dans le répertoire en cours.  
  Une pratique courante est d'avoir 

  - <ins>main.tf</ins>  
    Le fichier de configuration principal: il contient les définitions de toutes les ressources à provisionner.  
    On y ajoute autant de blocs qu'on veut

    ``` bash
    # Create a Docker repository  
    resource "google_artifact_registry_repository" "testing_tf_registry" {
      location      = var.gcp_region
      repository_id = "testing-tf-registry"
      description   = "Docker repository"
      format        = "DOCKER"
    }
    # Add IAM policy giving read rights to the service account
    resource "google_artifact_registry_repository_iam_member" "testing_tf_registry" {
      location      = var.gcp_region
      repository    = google_artifact_registry_repository.testing_tf_registry.name

      member        = "serviceAccount:${var.gcp_serviceaccount_email}"
      role          = "roles/artifactregistry.reader"
    }
    ```

  - <ins>variables.tf</ins>  
    Le fichier de configuration des variables en entrée: il définit les variables utilisées dans les autres fichiers de configuration

    ``` bash
    # Create terraform.tfvars to set the values
    variable "gcp_serviceaccount_key_path" {
      type = string
      description = "path to the JSON key of the service account"
    }
    variable "gcp_serviceaccount_email" {
      type = string
      description = "email of the service account"
    }
    variable "gcp_region" {
      type = string
      default = "us-west1"
    }
    ```

  - <ins>outputs.tf</ins>  
    Le fichier de configuration des variables en sortie: il définit les variables qui seront retournées en sortie

    ``` bash
    output "instance_ip_addr" {
      value       = aws_instance.server.private_ip
      description = "The instance IP addres of the main server instance."
    }
    ```

  - <ins>terraform.tfvars</ins>  
    Un fichier de variables: il stocke les valeurs des variables définies.  
    Contrairement aux autres fichiers, ce fichier n'est pas versionné puisqu'il contient des informations sensibles

    ``` js
    gcp_serviceaccount_key_path = "testing-416815-45b971068d51.json"
    gcp_serviceaccount_email = "terraform@testing-416815.iam.gserviceaccount.com"
    gcp_region = "us-west1"
    ```

  - <ins>providers.tf</ins>  
    Un fichier de configuration des fournisseurs: il définit les identifiants qui permettent d'appeller l'API des différents fournisseurs

    ``` bash
    provider "google" {
      credentials = file(var.gcp_svc_key)
      project = var.gcp_project
      region = var.gcp_region
    }
    ```

  - <ins>terraform.tf</ins>  
    Le bloc terraform permet de configurer Terraform lui-même. S'il existe, on le place dans un fichier terraform.tf

    ``` bash
    terraform {
      required_version = ">= 1.1.0"
    }
    ```

  - Le fichier <ins>.gitignore</ins>, pour ignorer pour les fichiers Terraform qui ne doivent pas être versionnés:

    ```
    # Local .terraform directories
    **/.terraform/*

    # .tfstate files
    *.tfstate
    *.tfstate.*

    # Crash log files
    crash.log

    # Exclude all .tfvars files, which are likely to contain sentitive data, such as
    # password, private keys, and other secrets. These should not be part of version
    # control as they are data points which are potentially sensitive and subject
    # to change depending on the environment.
    #
    *.tfvars

    # Ignore override files as they are usually used to override resources locally and so
    # are not checked in
    override.tf
    override.tf.json
    *_override.tf
    *_override.tf.json

    # Include override files you do wish to add to version control using negated pattern
    #
    # !example_override.tf

    # Include tfplan files to ignore the plan output of command: terraform plan -out=tfplan
    # example: *tfplan*

    # Ignore CLI configuration files
    .terraformrc
    terraform.rc
    ```