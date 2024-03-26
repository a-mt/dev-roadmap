---
title: Introduction
category: Terraform
---

Terraform est un utilitaire d'IaC (*Infrastructure as Code*) pour le provisionnement:  
il permet de créer des ressources de manière programmatique.  

## Pourquoi faire

La meilleure manière de comprendre son utilité est de prendre un exemple:  
Si on veut provisionner un registry Docker sur Google Cloud Platform (GCP), on a 3 manières de s'y prendre

  - <ins>Google Console</ins>:  
    Passer par l'interface web de GCP  
    [CI/CD > Artifact Registry > Repositories](https://console.cloud.google.com/artifacts) > Create repository

    ![](https://i.imgur.com/m0MDxuWm.png)
    ![](https://i.imgur.com/PS92rX4m.png)

    L'inconvénient de cette méthode, c'est qu'il faut se souvenir où se trouve chaque élément,  
    et quelles informations et options doivent être choisies

  - <ins>Google Shell</ins>:  
    Passer par l'utilitaire en ligne de commande de GCP, gcloud

    ``` bash
    gcloud artifacts repositories create testing-tf-registry \
     --repository-format=docker \
     --location=us-west1 \
     --description="Docker repository"
    ```

    L'inconvénient de cette méthode, c'est qu'il n'y a pas de gestion d'état: si on veut créer un ensemble de ressources à la volée, en cas d'erreur ou en cas d'ajout d'instructions, il faudrait ajouter des vérifications pour savoir quelles commandes doivent être lancées ou non et ainsi perdre en lisibilité

  - <ins>Terraform</ins>:  
    Passer par des fichiers de configurations et la ligne de commande — terraform

    ``` tf
    resource "google_artifact_registry_repository" "testing_tf_registry" {
      location      = "us-west1"
      repository_id = "testing-tf-registry"
      description   = "Docker repository"
      format        = "DOCKER"
    }
    ```

    Déclarer dans des fichiers de configurations les ressources qui doivent exister et laisser Terraform comparer l'état qu'il connaît avec les déclarations qui existent au moment de (re)lancer le provisionnement pour 1. déterminer quelles actions doivent être lancées (ajout, modification, supression) et 2. les effectuer

    Une ressource est un objet pouvant être géré via une API — ce peut être un fichier, une VM, un service tel que dynamodb, un utilisateur ou groupe iam, un rôle, politiques réseau, etc. Il existe littéralement des centaines de ressources pouvant être provisionnées dans la plupart des infrastructures sur le cloud et on-premise à l'aide de Terraform.

    Terraform s'occupe d'effectuer les actions pour passer de l'état actuel à l'état souhaité sans qu'on ait a se préocupper de la manière d'y parvenir.

## Pourquoi Terraform

* Configurer manuellement son infrastructure permet de tester rapidement de nouvelles offres cloud.  
  Le problème c'est que

  1. l'erreur est humaine, on peut mal configurer un service par inattention, particulièrement si on le fait souvent
  2. il est difficile d'avoir une vision d'ensemble de l'infrastructure et de s'assurer que son état est bien celui attendu
  3. pour ce qui est des configurations, il est difficile de transférer ses connaissances aux autres membres de l'équipe

  Utiliser des outils de provisionnement permet de s'affranchir de ces inconvénients.  

* Il existe différents outils de provisionnement.  
  Les plus populaires sont Terraform et CloudFormation. 

  ![](https://i.imgur.com/mzncnH2l.png)
 
* CloudFormation est destiné à AWS.  
  Terraform quant à lui un outil indépendant de toute plateforme, qui utilise des plugins lui permettant de supporter les APIs de différents fournisseurs

  ![](https://i.imgur.com/4RSwjlG.png)

## Installer

* Vérifier si terraform est installé:

  ``` bash
  $ terraform --version
  Terraform v1.7.4
  on linux_amd64

  $ terraform -help
  ```

* Pour Linux: vérifier la [liste des distributions supportées](https://www.hashicorp.com/official-packaging-guide?ajs_aid=b55b19b1-c3c9-47fa-ac93-6a1d93be9e0d&product_intent=terraform)  
  Et pour vérifier la distribution en cours:

  ``` bash
  $ lsb_release -a
  LSB Version:  core-11.1.0ubuntu2-noarch:security-11.1.0ubuntu2-noarch
  Distributor ID: Elementary
  Description:  elementary OS 6.1 Jólnir
  Release:  6.1
  Codename: jolnir

  # Get distribution name
  $ lsb_release -cs
  jolnir

  # Elementary 6 is based on Ubuntu 20.04
  # https://blog.elementary.io/elementary-os-6-1-available-now/
  $ DISTRO=focal
  ```

* [Installer terraform](https://developer.hashicorp.com/terraform/install)  
  À partir de APT:

  ``` bash
  # Add hashicorp repo to APT
  $ sudo su
  $ wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg

  # Install terraform
  $ echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $DISTRO main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
  $ sudo apt update && sudo apt install terraform
  ```

  Ou à partir d'un [zip](releases.hashicorp.com/terraform):

  ``` bash
  $ wget https://releases.hashicorp.com/terraform/0.13.0/terraform_0.13.0_linux_amd64.zip
  $ unzip terraform_*.zip

  $ mv terraform /usr/local/bin
  $ terraform version
  Terraform v0.13.0
  ```

## tfenv

* [tfenv](https://github.com/tfutils/tfenv) est un version manager pour Terraform. Il permet de passer d'une version de Terraform à l'autre, ce qui peut être utile quand différents projets utilisent différentes versions de Terraform ou pour tester différentes fonctionnalités sous différentes versions

* Installer tvenv

  ``` bash
  # Clone in .tfenv
  $ git clone --depth=1 https://github.com/tfutils/tfenv.git ~/.tfenv

  # Activate the "use-gpgv" option (= using GnuPG tools for PGP signature verification)
  $ echo 'trust-tfenv: yes' > ~/.tfenv/use-gpgv
  ```

* Installer différentes versions de Terraform

  ``` bash
  $ tfenv install latest
  ```
  ``` bash
  $ tfenv install 1.4.4
  ```

* Afficher la version en cours

  ``` bash
  $ cat .tfenv/version
  1.5.0-alpha20230405
  ```
  ``` bash
  $ terraform version
  Terraform v1.5.0-alpha20230405
  on linux_amd64
  ```

## HashiCorp

* HashiCorp est une entreprise spécialisée dans la gestion d'outils open-source utilisés pour soutenir le développement et déploiement de services sur une grande échelle. Terraform est un outil crée par HashiCorp

* HCP (*HashiCorp Cloud Platform*) est une plateforme sui permet d'accéder aux différents produits HashiCorp.

  ![](https://i.imgur.com/mkrVVvc.png)
