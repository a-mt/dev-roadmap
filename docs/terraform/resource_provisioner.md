---
title: Provisioner
category: Terraform
---

## Bloc provisioner

* Le sous-bloc `provisioner` permet d'effectuer des actions supplémentaires après la création de la ressource  
  (et non la mise à jour).

* Les provisioners ne devraient être utilisés qu'en dernier recours, puisqu'ils effectuent des actions qui ne sont pas reflétées dans l'état terraform. Une alternative est d'utiliser les fonctionnalités du cloud provider comme des scripts cloudinit

### local-exec

- Le provisioner de type `local-exec` permet d'exécuter une action locale.  
  Les arguments possible sont:

  * **command** (obligatoire): spécifie la commande a exécuter

    ``` bash
    resource "aws_instance" "web" {
      # ...

      provisioner "local-exec" {
        command = "echo first"
      }

      provisioner "local-exec" {
        command = "echo second"
      }
    }
    ```

  * **interpreter**: définit le programme utilisé pour lancer la commande — ex bash, ruby, AWS CLI, powershell

    ``` bash
    resource "null_resource" "example2" {
      provisioner "local-exec" {
        command = "Get-Date > completed.txt"
        interpreter = ["PowerShell", "-Command"]
      }
    }
    ```

  * **environment**: définit les variables d'environnement accessibles à la commande lancée

    ``` bash
    resource "aws_instance" "web" {
      # ...

      provisioner "local-exec" {
        command = "echo $KEY $SECRET >> credentials.yml"

        environment = {
          KEY = "..."
          SECRET = "..."
        }
      }
    }
    ```

  * **working_dir**: définit le répertoire dans lequel exécuter la commande

### remote-exec

- `remote-exec` d'exécuter une action sur une ressource distante.  
  Seul un argument peut être spécifié, parmi les suivants:

  * **inline**: exécuter une liste de commande

    ``` bash
    resource "aws_instance" "web" {
      # ...

      provisioner "remote-exec" {
        inline = [
          "dnf -y install epel-release",
          "dnf -y install htop",
        ]
      }
    }
    ```

  * **script**: script en local qui sera copié vers la ressource distante et exécuté
  * **scripts**: liste de scripts locaux qui seront copiés vers la ressource distante et exécutés dans l'ordre

    ``` bash
    resource "aws_instance" "web" {
      # ...

      provsioner "remote-exec" {
        scripts = [
          "./setup-users.sh",
          "/home/andrew/Desktop/bootstrap"
        ]
      }
    }
    ```

### file

- `file` permet de copier des fichiers de la machine en cours (qui exécute terraform) vers la ressource créée. Les principaux arguments possibles sont:

  * **source**: le fichier ou répertoire local à envoyer vers la machine distante
  * **destination**: l'emplacement du fichier sur la machine distante

    ``` bash
    resource "aws_instance" "web" {
      # ...

      # Copy myapp.conf to /etc/myapp.conf
      provisioner "file" {
        source      = "conf/myapp.conf"
        destination = "/etc/myapp.conf"
      }

      # Copies the configs.d folder to /etc/configs.d
      provisioner "file" {
        source      = "conf/configs.d"
        destination = "/etc"
      }
    ```

  * **content**: une chaîne de caractères à envoyer dans un fichier distant

    ``` bash
    resource "aws_instance" "web" {
      # ...

      # Copies the string into /tmp/file.log
      provisioner "file" {
        content     = "ami used: ${self.ami}"
        destination = "/tmp/file.log"
      }
    ```

  * **connection**: moyen et authentification utilisés pour envoyer le(s) fichier(s)

    ``` bash
    # Copies the file as the root user using SSH
    provisioner "file" {
      source      = "conf/myapp.conf"
      destination = "/etc/myapp.conf"

      connection {
        type     = "ssh"
        user     = "root"
        password = var.root_password
        host     = var.host
      }
    }
    ```

### ...

* Quel que soit le type de provisioner utilisé, il est également possible de définir les arguments suivants:

  * **when = destroy**: pour exécuter le provisioner pendant la suppression de la ressource.  
    Par défaut, le provisioner s'exécute pendant la création de la ressource.  
    Note: Le provisioner ne s'exécutera pas à la suppression si create_before_destroy est vrai

    ``` bash
    resource "aws_instance" "web" {
      # ...

      provisioner "local-exec" {
        when    = destroy
        command = "echo 'Destroy-time provisioner'"
      }
    }
    ```

  * **on_failure = continue**: pour ignorer les erreurs de provisioner  
    Par défaut, si le provisioner échoue, alors la ressource est considérée comme en échec.  

    ``` bash
    resource "aws_instance" "web" {
      # ...

      provisioner "local-exec" {
        command    = "echo The server's IP address is ${self.private_ip}"
        on_failure = continue
      }
    }
    ```

    ``` bash
    provisioner "remote-exec" {
      on_failure = continue
      inline = [
        "sudo yum -y install nano"
      ]
    }
    ```

## Resource AWS: user_data

* **user_data** est un attribut natif à AWS qui permet d'exécuter un script au démarrage d'une instance EC2.  
  Si cet attribut est définit, on va généralement également définir **user_data_replace_on_change = true**, qui indique à AWS de mettre fin à l'instance originale et d'en lancer une nouvelle: autrement, Terraform met bien à jour l'instance, mais comme user_data ne s'exécute qu'au tout premier démarrage et que l'instance a déjà subi ce processus de démarrage, alors le nouveau script user_data n'est pas exécuté. Forcer la création d'une nouvelle instance pour que le nouveau script user_data soit effectivement exécuté

  ![](https://i.imgur.com/qLs1qqo.png)
  ![](https://i.imgur.com/r7Oaa8S.png)

## Terraform ou Ansible

* Pour lancer une tâche au démarrage, on peut utiliser un provisioner ou Ansible.  
  Pour lancer des tâches répétives, utiliser Ansible

  ![](https://i.imgur.com/J33RIpw.png)

## self

* Le mot-clé `self` permet de faire référence aux informations du bloc en cours (uniquement possible dans les blocs provisioner et connection)

  ``` bash
  resource "aws_instance" "web" {
    # ...

    provisioner "local-exec" {
      command = "echo The server's IP address is ${self.private_ip}"
    }
  }
  ```
