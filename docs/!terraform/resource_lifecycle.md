---
title: Lifecycle
category: Terraform
---

## Lifecycle

### create_before_destroy

* Lorsque des attributs qui ne peuvent pas être modifiés via l'API changent, Terraform doit supprimer l'objet existant et en recréer un nouveau. Par défaut, Terraform supprimera en premier la ressource existante avant d'en créer une nouvelle.  
  Si on veut l'inverse (que la nouvelle ressource soit créé en premier avant de supprimer l'ancienne), alors il faut ajouter une règle de cycle de vie dans un sous-bloc `lifecycle` et mettre à vrai la propriété `create_before_destroy`

  ``` bash
  resource "local_file" "pet" {
    filename = "/root/pets.txt"
    content = "We love pets!"
    file_permission = "0700"

    lifecycle {
      create_before_destroy = true
    }
  }
  ```

  ![](https://i.imgur.com/TgVu2vB.png)

  On peut remarquer qu'en l'occurence utiliser la règle create_before_destroy pour la création de fichier est une très mauvaise idée puisqu'on crée le fichier avec le nouveau contenu, et qu'on le supprime directement après — puisqu'il ne peut y avoir qu'un seul fichier à un path donné

### prevent_destroy

* La règle `prevent_destroy` d'empêche la suppression d'une ressource par Terraform.  
  Typiquement, on met cette option sur les bases de données (comme mysql ou postgres) pour éviter de perdre accidentellement des données. La suppression n'est bloquée que tant que la propriété reste dans la configuration: la ressource peut toujours être détruite avec la commande destroy ou en supprimant complètement le bloc du fichier de configuration

  ```
  lifecycle {
    prevent_destroy = true
  }
  ```

  ![](https://i.imgur.com/bAvMesR.png)

### ignore_changes

* `ignore_changes` indique à terraform de ne pas mettre à jour la ressource même si les attributs spécifiés ont changé.  
  Par exemple, pour ignorer les modifications de tags:

  ``` bash
  resource "aws_instance" "webserver" {
    ami = "ami-0edab43b6fa892279"
    instance_type = "t2.micro"
    tags = {
      Name = "ProjectA-Webserver"
    }
    lifecycle  {
      ignore_changes = [
        tags
      ]
    }
  }
  ```

  ![](https://i.imgur.com/S8NO6Vt.png)
  ![](https://i.imgur.com/cAFtFZf.png)

* On peut également utiliser le mot-clé `all` pour que, quel que soit l'attribut modifié, la ressource ne soit jamais modifiée

  ```
  lifecycle {
    ignore_changes = all
  }
  ```

### Bloc removed + destroy

* Pour indiquer qu'une ressource n'est plus gérée par Terraform mais qu'on ne veut pas supprimer la ressource existante, supprimer le bloc resource et le remplacer par un bloc `removed` dans lequel on place la règle de cycle de vie `destroy = false`

  ``` bash
  # resource "local_file" "file" {
  #   filename = "${path.module}/destination"
  #   source   = "${path.module}/source"
  # }

  removed {
    from = local_file.file
    lifecycle {
      destroy = false
    }
  }
  ```

### replace_triggered_by

* `replace_triggered_by` indique à Terraform de remplacer la ressource lorsque des attributs donnés (qui peuvent appartenir à la ressource en cours ou à une autre) sont modifiés

  ``` bash
  resource "aws_appautoscaling_target" "ecs_target" {
    # ...
    lifecycle {
      replace_triggered_by = [
        # Replace `aws_appautoscaling_target` each time this instance of
        # the `aws_ecs_service` is replaced.
        aws_ecs_service.svc.id
      ]
    }
  }
  ```

## Timeouts

* Il est possible pour certains types de resources de spécifier un bloc `timeouts`,  
  qui définit le délai à attendre avant de considérer qu'une opération (create, update ou delete) a échoué

  ``` bash
  resource "aws_db_instance" "example" {
    # ...

    timeouts {
      create = "60m"
      delete = "2h"
    }
  }
  ```
