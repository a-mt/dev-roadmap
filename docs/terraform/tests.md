---
title: Tests
category: Terraform
---

* Les tests Terraform permettent de valider que les mises à jour de la configuration n'introduisent pas de changements majeurs qui cassent l'existant. Les tests s'exécutent sur des ressources éphèmères dédiées au test, ce qui évite tout risque pour l'infrastructure existante. Attention par contre: les tests créent une véritable infrastructure, qui peut coûter de l'argent

  Une fois que Terraform a entièrement exécuté chaque fichier de test, il tente de détruire l'infrastructure restante. S'il n'y parvient pas, alors la liste des ressources crées qui n'ont pas pu être détruites est affichée dans la console et il faut détruire manuellement ces ressources.  
  Il est recommandé de créer des comptes dédiés aux tests au sein des providers choisis, afin de régulièrement purge les ressources sans prendre de risques, et être sûr qu'aucune ressource n'est accidentellement laissée derrière

## tftest.hcl

* Les fichiers de test ont l'extension .tftest.hcl (ou .tftest.json)  
  et typiquement, on les place dans un répertoire "tests" — qui est le répertoire par défaut cherché par Terraform

  ``` bash
  $ tree .
  .
  ├── main.tf
  ├── outputs.tf
  ├── providers.tf
  ├── tests
  │   └── main.tftest.hcl
  └── variables.tf
  ```

## Commande

* La commande `terraform test` lit les fichiers de test Terraform et exécute une série de commandes Terraform plan ou apply conformément aux spécifications des fichiers de test, en validant que l'état est conforme à celui attendu

  ``` bash
  $ terraform test
  ```

  Pour limiter Terraform à un fichier de test spécifié:

  ``` bash
  $ terraform test -filter=tests/validations.tftest.hcl
  ```

* Par défaut, Terraform charge les fichiers de test présents dans

  - le répertoire en cours, ou un autre répertoire en utilisant l'option `-chdir`
  - ainsi que dans le répertoire "tests", ou un autre répertoire avec l'option `-test-directory`

  ``` bash
  $ terraform test -test-directory=mytests
  ```

## run

* Un fichier de test contient un ou plusieurs blocs `run`, chacun contenant une commande (plan ou apply) et des assertions

  ``` bash
  run "valid_default_provider" {
    command = plan

    assert {
      condition     = can(jsondecode(data.restful_resource.test_default.output))
      error_message = "Did not return JSON"
    }
    assert {
      condition     = jsondecode(data.restful_resource.test_default.output).tag == 8080
      error_message = "Tag did not match expected"
    }
  }
  ```

## variables

* On peut également utiliser un bloc `variables` pour spécifier/écraser les valeurs de variables.  
  Ces variables peuvent aussi être spécifiées dans le bloc run

  ``` bash
  variables {
    bucket_name = "test"
  }

  run "sets_correct_name" {
    variables {
      bucket_name = "my-bucket-name"
    }

    assert {
      condition     = aws_s3_bucket.my_bucket.bucket == "my-bucket-name"
      error_message = "incorrect bucket name"
    }
  }
  ```

## providers

* Les blocs `providers` permettent d'écraser les configurations des providers

  ``` bash
  # customised_providers.tftest.hcl
  provider "aws" {
    region = "us-east-1"
  }

  provider "aws" {
    alias  = "secondary"
    region = "eu-central-1"
  }
  ```

## expect_failures

* Plutôt que de vérifier une assertion, on peut vérifier qu'une erreur a été levée avec `expect_failures`

  ``` bash
  # main.tf
  variable "input" {
    type = number

    validation {
      condition = var.input % 2 == 0
      error_message = "must be even number"
    }
  }
  ```
  ``` bash
  # input_validation.tftest.hcl
  variables {
    input = 0
  }

  # The variable defined above is even, so we expect the validation to pass.
  run "zero" {
    command = plan
  }

  # This time we set the variable is odd, so we expect the validation to fail.
  run "one" {
    command = plan

    variables {
      input = 1
    }
    expect_failures = [
      var.input,
    ]
  }
  ```

## module

* Chaque bloc run peut charger des fichiers de configuration autres que le module root via un bloc `module`

  ``` bash
  run "verify" {
    # Load and count the objects created in the "execute" run block.
    module {
      source = "./testing/loader"
    }

    assert {
      condition = length(data.aws_s3_objects.objects.keys) == 2
      error_message = "created the wrong number of s3 objects"
    }
  }
  ```

## mock_providers

* Il est possible d'utiliser des `mock_provider` pour ne pas véritablement appeler le provider.  
  Du point de vue du plan ou apply, le faux provider crée bien des ressources réelles qui correspondent à la configuration.  

  ``` bash
  # mocked_providers.tftest.hcl
  provider "aws" {}

  mock_provider "aws" {
    alias = "fake"
  }

  run "use_real_provider" {
    providers = {
      aws = aws
    }
  }

  run "use_mocked_provider" {
    providers = {
      aws = aws.fake
    }
  }
  ```

  Le provider mocké génère des données pour tous les attributs référencés, sa valeur dépendra du type:

  - number: 0
  - boolean: false
  - string: chaîne de 8 caractères alphanumériques aléatoires
  - set, list, map: collection vide
  - object: objet contenant tous les sous-attributs en utilisant la même règle récursivement

### mock_resource, mock_data

* Le mock_provider peut spécifier les valeurs à retourner pour différentes ressources et data  
  grâce aux blocs `mock_resource` et `mock_data`

  ``` bash
  mock_provider "aws" {
    mock_resource "aws_s3_bucket" {
      defaults = {
        arn = "arn:aws:s3:::name"
      }
    }
    mock_resource "aws_dynamodb_table" {
      defaults = {
        arn = "aws:dynamodb:::my_table"
        replica = {
          arn = "aws:dynamodb:::my_replica"
        }
      }
    }
    mock_data "aws_s3_bucket" {
      defaults = {
        arn = "arn:aws:s3:::name"
      }
    }
  }
  ```

### tfmock.hcl

* On peut partager des données de mock entre différents tests:  
  stocker les blocs mock_data et mock_resource dans un fichier .tfmock.hcl (ou .tfmock.json)  
  et utiliser l'attribut `source` du bloc mock_provider pour charger les sous-blocs

  ``` bash
  # ./testing/aws/data.tfmock.hcl
  mock_resource "aws_s3_bucket" {
    defaults = {
      arn = "arn:aws:s3:::name"
    }
  }

  mock_data "aws_s3_bucket" {
    defaults = {
      arn = "arn:aws:s3:::name"
    }
  }
  ```
  ``` bash
  mock_provider "aws" {
    source = "./testing/aws"
  }
  ```

## override_data

* Plutôt que de mocker un provider, on peut écraser des modules, ressources ou data qui ont été déclarés dans les fichiers de configuration.
  Les attributs `outputs` et `values` sont optionels et Terraform générera des données s'ils ne sont pas spécifiés

  ``` bash
  override_data {
    target = module.credentials.data.aws_s3_object.data_bucket
    values = {
      body = "{\"username\":\"username\",\"password\":\"password\"}"
    }
  }

  run "test_file_override" {
    assert {
      condition     = jsondecode(local_file.credentials_json.content).username == "username"
      error_message = "incorrect username"
    }
  }
  ```
  ``` bash
  run "test_run_override" {
    # The value in this local override block takes precedence over the
    # alternate defined in the file.
    override_data {
      target = module.credentials.data.aws_s3_object.data_bucket
      values = {
        body = "{\"username\":\"a_different_username\",\"password\":\"password\"}"
      }
    }

    assert {
      condition     = jsondecode(local_file.credentials_json.content).username == "a_different_username"
      error_message = "incorrect username"
    }
  }
  ```

## override_module

  ``` bash
override_module {
  target = module.module1
  outputs = {
    var_default = "{\"id\": \"1\", \"tag\": 8080}"
    var_alt     = "{\"id\": \"2\", \"tag\": 8081}"
  }
}
```

## /testing

* Une pratique courante consiste à placer les fichiers importés explicitement dans les fichiers de tests (comme des mocks par exemple) dans un répertoire `testing`

  ```
  project/
  |-- main.tf
  |-- outputs.tf
  |-- terraform.tf
  |-- variables.tf
  |-- tests/
  |   |-- validations.tftest.hcl
  |   |-- outputs.tftest.hcl
  |-- testing/
      |-- setup/
          |-- main.tf
          |-- outputs.tf
          |-- terraform.tf
          |-- variables.tf
  ```

[Documentation: Tests](https://developer.hashicorp.com/terraform/language/tests)  
[Write Terraform Tests](https://developer.hashicorp.com/terraform/tutorials/configuration-language/test)

## Troubleshooting

Avec Terraform, on peut rencontrer 4 types d'erreurs:

- **erreurs de language**  
  Erreurs de syntaxe ou mauvais paramètres.  
  Pour les résoudre:

  ```
  terraform fmt
  terraform validate
  terraform version
  ```

- **erreurs d'état**  
  L'état réel de la ressource est différent de celui attendu dans le fichier de configuration

  ```
  terraform refresh
  terraform apply
  terrafrm --replace flag
  ```

- **erreurs internes**  
  Erreur au sein de la librairie terraform ou de l'API du provider

  ```
  TF_LOG
  Github Issue
  ```

### Logs

* Un log détaillé peut être activé en définissant la variable d'environnement `TF_LOG`.  
  Les valeurs possibles sont TRACE, DEBUG, INFO, WARN, ERROR, JSON (= trace au format json).  
  Les logs peuvent être activés séparemment entre `TF_LOG_CORE` et `TF_LOG_PROVIDER` — même valeurs que TF_LOG

  ```
  export TF_LOG=TRACE
  ```

* L'emplacement des logs est défini par `TF_LOG_PATH`

  ```
  export TF_LOG_PATH= ./terraform.log
  ```

  ![](https://i.imgur.com/kEfFQj6.png)

### Crash log

* Si Terraform crashe, les logs de la session et le message d'erreur seront sauvegardés dans `crash.log`

  ![](https://i.imgur.com/0kTyW5F.png)
