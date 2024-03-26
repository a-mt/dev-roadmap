---
title: État
category: Terraform
---

## Fichiers

### tfstate

* Lorsqu'on lance `terraform apply`, Terraform crée un fichier terraform.tfstate dans lequel tous les détails relatifs à l'infrastructure créée par terraform sont enregistrés — la liste des ressources et leurs attributs (au format JSON).

  ![](https://i.imgur.com/5BPts8K.png)

* Par défaut quand on lance la commande plan ou apply, terraform rafraichit le fichier d'état. Ce fichier est ensuite utilisé comme unique source de vérité, et si une différence est détectée entre le fichier d'état et les fichiers de configuration, alors terraform supprimera / créera les différentes ressources pour correspondre à l'état spécifié dans les configs.  
  Par exemple, si on crée une ressource à partir du fichier de configuration terraform, puis qu'on supprime le bloc du fichier de configuration et qu'on relance un apply, alors terraform supprimera la ressource qui avait été créée. Terraform sait qu'une ressource avait été crée parce qu'elle est présente dans le fichier d'état

* Pour éviter tout problème, sauvegarder régulièrement le fichier d'état — particulièrement avant d'effectuer des modifications majeures

### tfstate.backup

* Toutes les commandes terraform qui modifient le fichier d'état créent un backup, qui copie de fichier d'état dans `terraform.tfstate.backup`

### Considérations

* Le fichier d'état est une fonctionnalité non optionnelle de terraform mais qui stocke des informations potentiellement sensibles en texte brut (json) — comme par exemple l'adresse IP attribuée à la VM, la paire de clés SSH utilisée, et éventuellement les mots de passe initiaux pour une base de données.  
  Toujours stocker le fichier d'état dans un espace sécurisé: dans un système backend distant tel que Amazon S3, Google Cloud Storage, Terraform Cloud, etc.

  ![](https://i.imgur.com/lPEWjOq.png)

## Drift

* Quand on utilise de l'IaC, comme terraform, il y a 3 états d'infrastructure:

  - **l'état désiré** (tf-dsl-state), qui est l'état décrit par les fichiers de configuration.  
    Note: DSL = *Domain-Specific Language*

  - **l'état réel** (actual-state), qui est le résultat de l'utilisation de terraform pour déployer l'infrastructure et éventuellement des actions en dehors de terraform qui peuvent avoir modifié les ressources

  - **l'état connu** (tf-state-file), qui est l'état enregistré dans le fichier tfstate, un artefact généré par le déploiement via terraform et qui fait correspondre les ressources spécifiées dans les fichiers de configuration aux ressources de l'infrastructure réellement créées.  
    Ce fichier est généralement stocké dans un store central, comme AWS S3, accessible à tous les utilisateurs terraform pour que tout le monde ait même — et qui peut être verrouillé pour empêcher les changements simultanés et éviter que l'état ne soit corrompu.

* Un drift se produit lorsqu'on apporte des modifications à un ou plusieurs des "états" en ne respectant pas la séquence d'étapes prescrites. Par exemple:

  - effectuer des modifications manuellement, directement sur le provideur ou dans le fichier tfstate
  - les actions d'un acteur malveillant
  - des effets secondaires d'APIs, SKI ou CLIs, comme activer l'option "Delete on termination" sur une base de données

* Un drift de la configuration qui passe inaperçu peut entraîner une perte de données ou des temps d'arrêt inattendus

## apply

### -refresh=false

* Dans le monde réel, terraform peut gérer des centaines voire des milliers de ressources, réparties entre différents providers, souvent dans le cloud. Récupérer les détails des différentes ressources auprès des différents fournisseurs peut être long.

  En utilisant l'option `-refresh=false`, terraform ne synchronisera pas le fichier ftstate avec les objets distants avant de planifier les changements de configuration.
  Ainsi, les équipes peuvent exécuter leurs "plan" et "apply" sans attendre un rafraîchissement préemptif de l'état. Par contre, si des changements en dehors de Terraform se produisent, alors Terraform ne saura pas que la configuration a drifté

  <!--![](https://i.imgur.com/xCah0ZH.png)-->

  ``` bash
  $ terraform apply -auto-approve -refresh=false
  ```

* L'avantage, c'est que le lancement est plus rapide.  
  L'inconvénient, c'est qu'on ne prend pas en compte les changements qui auraient pu se produire en dehors de terraform.  
  Par exemple si on supprime des instances en dehors de Terrraform et qu'on lance un apply avec ou sans -refresh=false:

  ![](https://i.imgur.com/ClacajQ.png)

### -refresh-only

* L'option `-refresh-only` permet de synchroniser le fichier d'état avec les objets distants sans planifier de changements. Par exemple, si on a supprimé des ressources sur le provider, lancer un refresh-only supprimera ces ressources du fichier terraform.tfstate

  - Si le changement était intentionnel,  
    c'est l'occasion de mettre à jour les fichiers de configurations pour qu'ils correspondent à l'état réel en production et transférer toute la configuration de l'infrastructure dans le code.  
  
  - Si le changement n'était pas intentionnel,  
    alors il suffit de lancer un apply, qui identifiera le fait que des ressources présentes dans les fichiers de configuration ne sont pas dans le fichier d'état: un "yes" et elles sont de retour

  ``` bash
  # terraform refresh  # ancienne version, dépréciée
  $ terraform apply -refresh-only
  ```

  ![](https://i.imgur.com/jxKdYGY.png)
  ![](https://i.imgur.com/9yR2Vke.png)

### -replace=NAME

* L'option `-replace=NAME` marque une ressource pour suppression suivit de création, le tout dans une opération atomique: ainsi il n'est pas nécessaire de supprimer la ressource du fichier de config, appliquer, remettre la ressource, appliquer.  
  Ça évite les risques liés à des race conditions dans un environnement hautement collaboratif — que différentes personnes qui travaillent sur l'infrastructure en même temps se marchent sur les pieds

  ``` bash
  $ terraform apply -auto-approve -refresh=false -replace="aws_subnet.us-east-1a"
  ```

  ![](https://i.imgur.com/cWV3dBT.png)

## taint / untaint

* Parfois, Terraform détecte qu'un objet est dans un état incomplet ou dégradé. Par exemple, si la création d'un objet complexe échoue et que cet objet existe en partie dans le système distant mais qu'une des étapes de provisionnement a par la suite échoué, alors Terrraform doit se souvenir que l'objet existe mais qu'il n'est peut-être pas entièrement fonctionnel.
  Terraform représente cette situation en marquant l'état de l'objet comme "tainted".

* Si un objet a l'état *tainted*, le plan suivant forcera le remplacement de cet objet,  
  de la même manière qui si on avait spécifié un `-replace=NAME`

* Si Terraform a marqué un objet comme *tainted* mais qu'on considère qu'il fonctionne correctement (qu'il n'est pas nécessaire de le remplacer), alors on peut utiliser la commande `untaint`

  ``` bash
  $ terraform untaint aws_instance.my_vm_2

  Resource instance aws_instance.my_vm_2 has been successfully untainted.
  ```

* Inversemment, on peut forcer Terraform à marquer un objet comme *tainted* avec la commande `taint`.  
  Cette approche est dépréciée en faveur de l'option -replace.

  ``` bash
  $ terraform taint aws_instance.my_vm_1

  Resource instance aws_instance.my_vm_1 has been marked as tainted.
  ```

## show

* La commande show permet d'afficher le contenu du fichier d'état

  ``` bash
  $ terraform show

  # local_file.time:
  resource "local_file" "time" {
      content              = "Time stamp of this file is 2023-09-21T00:44:15Z"
      content_base64sha256 = "VTIn4FiSf4daeorktVgYnpt10jfNHLxmRzJp4CM4KIw="
      content_base64sha512 = "+/H2LIrHRt8i7/8s7lOLZ+ixxzsTmZH2ElZ26eNZSFos3YuRUhxH1p+pwx3LU6EGm+6R5X96kPTqsxTCge7Fsw=="
      content_md5          = "67648bfa5f5a4b37ed84259645bcce23"
      content_sha1         = "50bdc63c0dfdee0f6c07ebd9e6019dd6d4cf729f"
      content_sha256       = "553227e058927f875a7a8ae4b558189e9b75d237cd1cbc66473269e02338288c"
      content_sha512       = "fbf1f62c8ac746df22efff2cee538b67e8b1c73b139991f6125676e9e359485a2cdd8b91521c47d69fa9c31dcb53a1069bee91e57f7a90f4eab314c281eec5b3"
      directory_permission = "0777"
      file_permission      = "0777"
      filename             = "/root/time.txt"
      id                   = "50bdc63c0dfdee0f6c07ebd9e6019dd6d4cf729f"
  }

  # time_static.time_update:
  resource "time_static" "time_update" {
      day     = 21
      hour    = 0
      id      = "2023-09-21T00:44:15Z"
      minute  = 44
      month   = 9
      rfc3339 = "2023-09-21T00:44:15Z"
      second  = 15
      unix    = 1695257055
      year    = 2023
  }
  ```

  L'option -json pour l'afficher en JSON

  ```
  terraform show -json
  ```

  ![](https://i.imgur.com/AXWUzST.png)

---

## Move

### state mv

* Si on renomme simplement une ressource ou qu'on déplace un module et qu'on lance Terraform, Terraform supprimera l'ancienne ressource et en créera une nouvelle. Utiliser `terraform state mv` permet de modifier la référence et d'éviter d'avoir à créer/supprimer la ressource. Ça permet de

  - renommer une ressource existante

    ``` bash
    $ terraform state mv packet_device.worker packet_device.helper
    ```

  - déplacer une ressource vers un module

    ``` bash
    $ terraform state mv packet_device.worker module.worker.packet_device.worker
    ```

  - déplacer un module vers un autre module

    ``` bash
    $ terraform state mv module.app module.parent.module.app
    ```

  ![](https://i.imgur.com/XQslR9E.png)

### Bloc moved

* Une autre manière de s'y prendre, introduite à partir de Terraform 1.1., est d'utiliser un bloc `moved`. Cette approche est recommendée et a l'avantage de ne pas modifier le fichier d'état

  <!--Si une ressource est déplacée (par exemple si on déplace une ressource du module root vers un module enfant), on peut informer Terraform du changement d'adresse de cette ressource via un bloc `moved` — ce qui évite que Terraform ne détruise l'ancienne ressource pour en recréer une nouvelle-->

  ``` bash
  moved {
    from = module.security_group.aws_security_group.sg_8080
    to   = module.web_security_group.aws_security_group.this[0]
  }
  ```

---

## Import

### Commande import

* En cas de corruption, de perte du fichier d'état, ou si on a crée les ressources en dehors de terraform:
  on peut utiliser la commande import pour ajouter une ressource dans le fichier tfstate à partir des configurations présentes dans le fichier .tf

  ``` bash
  resource "aws_instance" "myec2" {
    ami                     = "ami-071791cf2912e097a6"
    key_name                = "MyKey"
    vpc_security_groups_ids = ["sg-05cddba0e97a497fd"]
    subnet_id               = "subnet-3460b452"
    instance_type           = "t2.micro"

    tags = {
      Name = "FirstMachine"
    }
  }
  ```
  ```
  $ terraform init
  $ terraform plan
  ...
  Plan: 1 to add, 0 to change, 0 to destroy

  $ terraform import aws_instance.myec2 i-05df654af02dad993
  aws_instance.myec2: Importing from ID "i-05df654af02dad993"...
  aws_instance.myec2: Import prepared!
  aws_instance.myec2: Refreshing state [id=i-05df654af02dad993]

  Import successful!

  $
  ```

  Cette commande ne peut importer qu'une ressource à la fois

  [Command: import](https://developer.hashicorp.com/terraform/cli/commands/import)

### Bloc import

Une autre alternative est de

1. définir un bloc `import`

    ``` bash
    import {
      to = aws_instance.example
      id = "i-abcd1234"
    }

    resource "aws_instance" "example" {
      name = "renderer"
    }
    ```

2. générer la configuration.  
   Terraform peut générer le code des ressources définie dans les blocs d'import,  
   il estimera quelle est la valeur appropriée pour chaque argument de ressource.

    ``` bash
    $ terraform plan -generate-config-out=generated_resources.tf
    ```

3. vérifier la configuration générée  
   et mettre à jour les fichiers de configuration de manière appropriée

* Pour importer de multiples objets de même type:

  ``` bash
  locals {
    buckets = [
      { 
        group = "one"
        key   = "bucket1"
        id    = "one_1"
      },
      {
        group = "one"
        key   = "bucket2"
        id    = "one_2"
      },
      {
        group = "two"
        key   = "bucket1"
        id    = "two_1"
      },
      {
        group = "one"
        key   = "bucket2"
        id    = "two_2"
      },
    ]
  }

  import {
    for_each = local.buckets
    id = each.value.id
    to = module.group[each.value.group].aws_s3_bucket.this[each.value.key]
  }
  ```

[Bloc: import](https://developer.hashicorp.com/terraform/language/import)

## Résoudre un drift

Pour résumer, on peut résoudre un drift de 3 manières

- <ins>remplacer les ressources</ins>.   
  Quand une ressource est dégradée et ne peut pas être détecté par Terraform, on peut utiliser le flag `-replace`

- <ins>importer les ressources</ins>.  
  Quand on approuve un ajout manuel de ressources qu'il faut ajouter au fichier de configuration, on utilise la commande `import`

- <ins>refresh state</ins>  
  Quand une ressource a changé ou a été supprimée, on utilise le flag `-refresh-only` pour refléter ces changements dans le fichier d'état
