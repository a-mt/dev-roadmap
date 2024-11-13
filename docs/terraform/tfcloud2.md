---
title: Fonctionnalités TfCloud de base
category: Terraform, Terraform Cloud
---

## Private Registry

* Tout ce qui est publié sur [Terraform Registry](https://registry.terraform.io) est public.  
  Terraform Cloud permet de publier des modules privés à l'intérieur du Terraform Cloud Private Registry.  
  Tous les utilisateurs de l'organisations peuvent voir les modules du registry privé

* On peut importer un module d'un registry privé via HOSTNAME/NAMESPACE/NAME/PROVIDER:

  ``` bash
  module "vpc" {
    source  = "app.terraform.io/example_corp/vpc/aws"
    version = "0.9.3"
  }
  ```

  ![](https://i.imgur.com/8Tn6cF8.png)

---

## API Tokens

Terraform Cloud supporte 3 types de tokens API: user, team et organization.  
Le type de token utilisé donne accès à différentes permissions.

- **organization**: settings > security: API tokens  
  Token à l'échelle de l'organisation.  
  Permet de créer et configurer les workspaces et teams.

  Chaque organisation ne peut avoir qu'un token valide à un instant T et  
  seuls les propriétaires de l'organisation peuvent générer ou annuler ce token

  ![](https://i.imgur.com/ad50Njm.png)

* **team**: settings > organization settings : teams  
  Tokens à l'échelles des équipes.  
  Permet d'accéder aux workspaces auxquels l'équipe a accès et d'effectuer des actions dessus.

  Chaque équipe ne peut avoir qu'un token valide à un instant T et  
  tout membre de l'équipe peut générer ou annuler ce token

  ![](https://i.imgur.com/xSNUemD.png)

* **user**: user settings > tokens  
  Token à l'échelle des utilisateurs.  
  Hérite des permissions auxquelles l'utilisateur est associé.

  Ce peut être pour un utilisateur réel ou un service account.  
  Utiliser terraform login obtient un user token

  ![](https://i.imgur.com/rgqFCtk.png)

[Access Levels](https://developer.hashicorp.com/terraform/cloud-docs/users-teams-organizations/api-tokens#access-levels)

## Permissions

* **Organization-level**  
  Gérer les permissions de certaines ressources ou configurations à l'échelle de l'organisation.  
  Certaines actions ne sont accessibles qu'aux propriétaires (1 à n personnes) de l'organisation

  ![](https://i.imgur.com/Rylpi12.png)

* **Workspace-level**  
  Gérer les permissions pour un workspace spécifique

  ![](https://i.imgur.com/ITc4qxK.png)

## Estimation des coûts

* Une estimation des coûts associés au plan est disponible et sera affiché dans le détail du plan

  ![](https://i.imgur.com/8LVDhg8.png)

* Ce calcul ne concerne que certaines ressource d'AWS, azure ou GCP

  ![](https://i.imgur.com/Kpn4Ens.png)

* Cette fonctionnalité n'est disponible que pour  
  la version payante de Terraform Cloud — dans le plan "Teams & Governance"

  ![](https://i.imgur.com/SPF1f6hl.png)

### Sentinel Policy

* On peut définir une politique Sentinel pour s'assurer que le coûts des ressources reste en dessous d'un tarif donné. Les vérifications seront effectuées au lancement d'un run

  ![](https://i.imgur.com/gVbpFHj.png)

* Settings > Policy sets > create a new policy set  
  Policies > [Create a new policy](https://developer.hashicorp.com/sentinel/docs/terraform)

  [Exemples](https://github.com/kodekloud-terraform-demo-user/terraform-guides)

## Run Environment

* Un *run environment* est une VM ou container crée pour l'exécution du code terraform.  
  Il s'agit d'une machine Linux d'architecture x86_64, et qui est à usage unique

* Terraform Cloud injecte les variables d'environnement suivantes:

  | Variable | Description
  |--- |---
  | `TFC_RUN_ID` | Un identifiant unique pour le run en cours
  | `TFC_WORKSPACE_NAME` | Le nom du workspace
  | `TFC_WORKSPACE_SLUG` | Le slug de la configuration utilisée — c'est à dire organization/workspace
  | `TFC_CONFIGURATION_VERSION_GIT_BRANCH` | Le nom de la branche utilisée
  | `TFC_CONFIGURATION_VERSION_GIT_COMMIT_SHA` | Le sha du commit
  | `TFC_CONFIGURATION_VERSION_GIT_TAG` | Le tag du commit

* On peut y accéder dans les fichiers de configuration en définissant une variable de même nom

  ``` bash
  variable "TFC_RUN_ID" {}
  ```

  <!--![](https://i.imgur.com/Gf6YoDJ.png)-->

## Settings

On peut choisir dans les paramètres

* La version Terraform utilisée par les run environment
* De partager l'état d'un workspace avec d'autres workspaces
* D'auto-approuver les runs ou demander une confirmation

![](https://i.imgur.com/bEIbIck.png)

## Agents

* Agents est une fonctionnalité payante du plan "Business", qui permet à Terraform Cloud de communiquer avec une infrastructure isolée, privée ou on-premise — comme vSphere, Nutanix ou OpenStack.

* Pour faire tourner un agent, il faut:
  - un système Linux x86_64, ou Docker pour le faire tourner dans un container
  - Terraform >= 0.12
  - au moins 4GB d'espace disque disponible (pour les copies temporaires) et 2GB de RAM

* L'architecture de l'agent est basé sur le pull, aucune connectivité entrante n'est nécessaire pour communiquer avec Terraform Cloud. Les requêtes sortantes sur le port 443 (https) doivent être autorisées vers
  - app.terraform.io
  - registry.terraform.io
  - releases.hashicorp.com
  - archivist.terraform.io
