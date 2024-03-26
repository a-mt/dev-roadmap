---
title: Terraform Cloud
category: Terraform
---

* Terraform Cloud est une application web qui fournit aux développeurs un espace de stockage cloud gratuit pour gérer l'état Terraform. L'execution des plan et apply se passent également directement dans le runtime Terraform Cloud — à distance, et contrôlé via la ligne de commande `terraform`.

  Cette version est destinée aux petites entreprises comprenant jusqu'à 5 personnes.
  Il existe des [variantes payantes](https://www.hashicorp.com/products/terraform/pricing) pour les plus grandes équipes — notamment la version Terraform Enterprise pour une installation auto-hebergée

  ![](https://i.imgur.com/MhpJunQ.png)

## Se connecter

* [S'inscrire à Terraform Cloud](https://app.terraform.io)

* Un token est nécessaire pour se connecter, on peut le créer en amont ou suivre le lien donné par Terraform pendant le login en ligne de commande. Pour créer un token en amont: Account settings > tokens > Create an API token

  ![](https://i.imgur.com/jxd0Nih.png)

* Se connecter à Terraform Cloud

  ``` bash
  $ terraform login
  Terraform will request an API token for app.terraform.io using your browser.

  If login is successful, Terraform will store the token in plain text in
  the following file for use by subsequent commands:
      /home/aurelie/.terraform.d/credentials.tfrc.json

  Do you want to proceed?
    Only 'yes' will be accepted to confirm.

    Enter a value: yes

  ‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒

  Terraform must now open a web browser to the tokens page for app.terraform.io.

  If a browser does not open this automatically, open the following URL to proceed:
      https://app.terraform.io/app/settings/tokens?source=terraform-login

  ‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒

  Generate a token using your browser, and copy-paste it into this prompt.

  Terraform will store the token in plain text in the following file
  for use by subsequent commands:
      /home/aurelie/.terraform.d/credentials.tfrc.json

  Token for app.terraform.io:
    Enter a value: 

  Retrieved token for user a-mt
  ```

* Les informations d'authentification sont stockées dans `~/.terraform.d/credentials.tfrc.json`

## Configurer le Backend

* Créer une organisation:  
  Account settings > Organizations > Create new organization

* Configurer le backend "remote" dans les fichiers de configuration:

  <!--Pour associer le workspace local "dev" à "test-dev":

  ``` bash
  terraform {
    backend "remote" {
      hostname      = "app.terraform.io"
      organization  = "<YOUR-ORG-NAME>"

      workspaces {
        prefix = "test-"
      }
    }
  }
  ```-->

  ``` bash
  terraform {
    cloud {
      hostname      = "app.terraform.io"
      organization  = "<YOUR-ORG-NAME>"

      workspaces {
        tags = []
      }
    }
  }
  ```

* Installer le plugin du backend remote

  ``` bash
  $ terraform init
  ```

  <!--
  Note: si Terraform a déjà un fichier d'état en local, il proposera l'envoi du fichier vers Terraform Cloud.  
  On peut ainsi très facilement passer du backend local au backend remote

  ![](https://i.imgur.com/ulTRg9o.png)
-->

* Créer un workspace

  ``` bash
  $ terraform workspace new test-dev
  Created and switched to workspace "test-dev"!

  You're now on a new, empty workspace. Workspaces isolate their state,
  so if you run "terraform plan" Terraform will not see any existing state
  for this configuration.
  ```

* Vérifier que le workspace a été crée sur Terraform Cloud

  ![](https://i.imgur.com/tK6iIHr.png)

## Stocker les variables sur Terraform Cloud

* Déclarer les variables dans les fichiers de configuration Terraform

  ``` bash
  variable "MY_SECRET_VALUE" {
    type      = string
    sensitive = true
  }
  output "data" {
    value = "${nonsensitive(var.MY_SECRET_VALUE)}-${uuid()}"
  }
  ```

* Créer les variables sur Terraform Cloud

  - Aller dans le workspace crée
  - Worspace variable: Add variable

  ![](https://i.imgur.com/EsJqZck.png)

* Terraform Cloud Run Environment est responsable de l'execution de l'opération. Pour cette raison, l'authentification vers le provider doit être configuré dans les variables d'environnement de Terraform Cloud — on ne peut pas juste utiliser les identifiants locaux

  ```
  AWS_ACCESS_KEY_ID
  AWS_SECRET_ACCESS_KEY
  ```

## Lancer un run

* Lancer Terraform

  ``` bash
  $ terraform apply
  Running apply in the remote backend. Output will stream here. Pressing Ctrl-C
  will cancel the remote apply if it's still pending. If the apply started it
  will stop streaming the logs, but will not stop the apply running remotely.

  Preparing the remote apply...

  To view this run in a browser, visit:
  https://app.terraform.io/app/a-mt/test-dev/runs/run-Cq7xQdszdTUNkPYZ

  Waiting for the plan to start...

  Terraform v1.7.4
  on linux_amd64
  Initializing plugins and modules...

  Changes to Outputs:
    + data = (known after apply)

  You can apply this plan to save these new output values to the Terraform
  state, without changing any real infrastructure.

  Do you want to perform these actions in workspace "test-dev"?
    Terraform will perform the actions described above.
    Only 'yes' will be accepted to approve.

    Enter a value: yes


  Apply complete! Resources: 0 added, 0 changed, 0 destroyed.

  Outputs:

  data = "hello-e1d85eeb-8b4d-6a69-026b-9d8aef98bc54"
  ```

  S'il manque des variables, une erreur sera affichée

  ``` bash
  │ Warning: Value for undeclared variable
  │ 
  │ The root module does not declare a variable named "MY_SECRET_VALUE" but a
  │ value was found in file
  │ "/home/tfc-agent/.tfc-agent/component/terraform/runs/run-24bVxrqiUXwFrmWB/terraform.tfvars".
  │ If you meant to use this value, add a "variable" block to the
  │ configuration.
  │ 
  │ To silence these warnings, use TF_VAR_... environment variables to provide
  │ certain "global" settings to all configurations in your organization. To
  │ reduce the verbosity of these warnings, use the -compact-warnings option.
  ╵
  ╷
  │ Error: No value for required variable
  │ 
  │   on main.tf line 12:
  │   12: variable "MY_SECRET_VALUE2" {
  │ 
  │ The root module input variable "MY_SECRET_VALUE2" is not set, and has no
  │ default value. Use a -var or -var-file command line argument to provide a
  │ value for this variable.
  ╵
  Operation failed: failed running terraform plan (exit 1)
  ```

* On peut vérifier qu'il n'existe pas de fichier d'état en local

  ``` bash
  $ ls -a1
  .
  ..
  main.tf
  .terraform
  ```

* La liste des exécutions (*runs* en anglais) et leur détail est visible sur Terraform Cloud

  ![](https://i.imgur.com/GPP5CTp.ong)
  ![](https://i.imgur.com/eaxcZxH.png)

## Se déconnecter

``` bash
$ terraform logout
Removing the stored credentials for app.terraform.io from the following file:
    /home/aurelie/.terraform.d/credentials.tfrc.json

Success! Terraform has removed the stored API token for app.terraform.io.
```

## .terraformignore

* Quand on execute un plan ou apply à distance,  une archive du répertoire de configuration est uploadée sur Terraform Cloud.
* On peut définir les chemins à ne pas uploader via le fichier `.terraformignore` (placé à la la racine du répertoire de configuration).
* Si le fichier n'est pas présent, Terraform exclut par défaut .git et .terraform

## .terraformrc

* Créer un fichier `~/.terraformrc` ou terraform.rc permet de configurer les paramètres CLI de Terraform.  
  On peut ainsi stocker le token d'identification directement dans ce fichier et il ne sera plus nécessaire d'utiliser la commande login pour s'identifier

  ```
  plugin_cache_dir   = "$HOME/.terraform.d/plugin-cache"
  disable_checkpoint = true

  credentials "app.terraform.io" {
    token = "xxxxxx.atlasv1.zzzzzzzzzzzzz"
  }
  ```

  [Configuration File Syntax](https://developer.hashicorp.com/terraform/cli/config/config-file)

* L'emplacement de ce fichier peut être modifié via la variable d'environnement `TF_CLI_CONFIG_FILE`  
  Ce fichier de configuration devrait avoir l'extension .tfrc

  ```
  TF_CLI_CONFIG_FILE=~/.terraform.d/config.tfrc
  ```

## TF_TOKEN_app_terraform_io

* Une autre alternative pour stocker les infos d'authentification est de définir  
  la variable d'environnement `TF_TOKEN_${sanitized_hostname}`

  ``` bash
  $ terraform logout
  $ export TF_TOKEN_app_terraform_io=leVjDfQOHL9Rxw.atlasv1...

  $ terraform plan
  ```
