---
title: DevOps
category: Web
---

## Philosophie DevOps

* Traditionellement, dans le développement informatique on a 

  - d'un côté l'équipe de développement,  
    qui a pour objectif de faire évoluer l'application en ajoutant de nouvelles fonctionnalités ou en corrigeant des bugs le plus rapidement possible

  - de l'autre l'équipe d'exploitation (aka opérations),  
    chargée des responsabilités contradictoires de maintien de la stabilité et de contrôle du changement.

  Cette séparation des tâches entraîne un conflit d'intérêts préjudiciable et ralentit les boucles de rétroaction. Inciter les différentes équipes à n'optimiser que leur propre domaine d'intérêt crée au final un résultat global moins optimal.

* Une des grosses avancées en exploitation ces dernières années est la réalisation que les systèmes peuvent et doivent être traités comme du code: créer automatiquement des systèmes à partir des spécifications et les gérer de manière programmatique.

  Dans les premiers temps, le DevOps désignait les personnes qui utilisent Chef, Puppet ou CFEngine, qui sont des outils de provisionnement permettant à l'équipe d'exploitation de configurer les systèmes.  
  L'idée du DevOps s'est ensuite étendue: les spécifications des sytèmes sont enregistrées et versionnées, les applications buildées et testées dans cet environnement, avant d'être déployées dans un système réel également créé automatiquement.

  Aujourd'hui, le DevOps est une véritable philosophie, qui vise à lever les barrières entre l'équipe de développement et l'équipe d'exploitation, fluidifier les communications entre les deux équipes et mettre en place des outils d'automatisation qui permettent de développer, tester et livrer des applications plus rapidement et avec plus de fiabilité.

### Anti Patterns

* Une best practice ou pattern désigne une pratique considérée comme optimale pour implémenter une méthode.  
  Un anti-pattern est en quelque sorte un contre-exemple, un piège à éviter.  
  Les anti-patterns découlent généralement de ce qui est au départ une bonne idée, et qui se transforme au fur et à mesure en une idée contre-productive qui va à l'encontre de ce qu'elle est censée améliorer.

* <ins>Dev/Ops</ins>:  
  Le premier anti-pattern qu'on retrouve souvent en entreprise est la séparation entre les équipes de développement et les équipes d'ops. C'est ce que le DevOps cherche à éliminer.

* <ins>Dev/DevOps/Ops</ins>:  
  Une entreprise peut décider de mettre en place une équipe DevOps, en charge de l'implémentation des processus de livraison et de déploiement continus. Cette équipe est transverse à l'entreprise et est sollicitée par les deux équipes, Dev et Ops, pour mettre en place des outils d'automatisation.  
  La création de cette équipe transverse génère un troisième silo, car elle va être confrontée à 1. des développeurs qui la sollicitent, mais ne comprenant pas les fondamentaux du DevOps; 2. des ops qui veulent garder la main sur la mise en production, garder leurs outils, et ne voient généralement pas d'un bon oeil la création de cette équipe.

  Si cette équipe n'est là que temporairement, pour éduquer les développeurs et les ops afin de les rendre autonomes sur le déploiement et la livraison continue, alors c'est un bon pattern

* <ins>NoOps</ins>:  
  Ce mouvement part du principe que la plateforme Cloud, et donc le Cloud Provider, prend en charge toutes les opérations pour le maintien en condition opérationnelle de l'application — sauvegarde, plan de reprise d'activité, scalabilité, résilience, etc.  
  Mais le métier de développeur et d'ops sont bien deux métiers totalement différents. Les développeurs ne mesurent pas la complexité d'une application, et savent rarement comment rétablir une infrastructure qui ne fonctionne pas. Une équipe constituée uniquement de développeurs finira souvent par avoir besoin d'un ops, au fur et à mesure de la montée en complexité de l'application.

  Ce pattern est généralement utilisé dans des startups où la priorité numéro 1 est de sortir un produit correspondant aux besoins des utilisateurs, remettant à plus tard les questions ops.

* <ins>Ops dans l'équipe de dev</ins>:  
  L'organisation ne veut pas conserver une équipe d'exploitation distincte, de sorte que les équipes de développement assument la responsabilité de l'infrastructure, de la gestion des environnements, de la surveillance, etc.  
  L'organisation montre un manque d'appréciation de l'importance et des compétences requises pour des opérations informatiques efficaces. En particulier, la valeur des opérations est diminuée parce qu'elle est traitée comme une gêne pour les développeurs — les opérations sont gérées par un seul responsable d'équipe qui a également d'autres priorités.

### Best Practices

* <ins>Collaboration Dev et Ops</ins>:  
  La clé de la réussite du DevOps dans une entreprise est la communication entre les Dev et Ops.

  - On peut par exemple demander aux ops de participer aux <ins>daily mettings</ins> des développeurs, pour qu'ils soient au courant des nouvelles fonctionnalités implémentées dans le sprint en cours.
    Les ops pourrons aussi, pendant ces daily meetings, faire remonter des informations aux dev et ajouter dans les user stories des évolutions qui rendent l'application plus facile à exploiter. Par exemple, demander à ce que tous les logs soient écrits au format JSON pour les rendre plus facile à importer dans la stack ELK

  - Qu'un <ins>dashboard</ins> qui relaie l'état de l'application (en production et sur les autres environnement) soit également suivi par les développeurs, pour qu'ils soient sensibilisés à l'impact d'une mise en production sur l'état de l'application.

  - Que les ops soient sensibilisés aux techniques de TDD (Test Driven Development) et BDD (Behavior Driven Development): les <ins>rapports de non-régression</ins> de bugs en production permettent de rassurer l'équipe d'ops sur la qualité du produit qu'ils vont mettre en production

  - Mettre en place une collaboration axée sur les <ins>containers</ins>: une des promesses des containers est de ppouvoir s'exécuter fe la même manière sur n'importe quel environnement disposant d'un runtime capable d'exécuter des containers. Les développeurs se chargent de créer l'image, pour que l'application puisse tourner correctement; les ops opèrent cette image avec toutes les contraintes liées au maintien en condition opérationnelle.

* <ins>Dev et équipe Cloud</ins>:  
  Pour les entreprises qui disposent d'un département IT traditionnel et qui ne peuvent pas ou ne veulent pas changer rapidement, ou pour les entreprise qui exécutent toutes leurs applications dans le cloud public (AWS, Azure, etc):

  Un petit groupe de développeur implémente les pratiques standard comme le TDD, le CI, le développement itératif, le coaching, etc, et assure la majeure partie de la communication avec l'équipe Cloud. Ils agissent alors comme une source d'expertise sur les fonctionnalités opérationnelles, les métriques, la surveillance, le provisionnement des serveurs, etc.

* <ins>DevOps externe</ins>:  
  Pour les entreprises, en particulier les plus petites, qui n'ont pas les finances, l'expérience ou le personnel nécessaires pour prendre la direction des aspects opérationnels de l'application qu'elles produisent:

  L'équipe de développement peut faire appel à un fournisseur de services comme Google, Amazon ou Azure, pour les aider à créer des environnements de test et à automatiser leur infrastructure et leur surveillance.
  Ça peut être un moyen utile et pragmatique d'en apprendre davantage sur l'automatisation, la surveillance et la gestion de la configuration, puis de passer à un modèle de type "Dev et équipe Cloud" ou même de type "Collaboration entre Dev et Ops" au fur et à mesure que le personnel s'accroît et se concentre sur les opérations.

* <ins>DevOps temporaire</ins>:  
  Une équipe DevOps est mise en place temporairement pour rapprocher les Dev et Ops (idéalement vers un modèle de type Collaboration entre Dev et Ops), et éventuellement se rendre obsolète.  
  Si suffisamment de personnes commencent à voir l'intérêt de rapprocher les équipes Dev et Ops, alors l'équipe DevOps a une réelle chance d'atteindre son objectif.
  La responsabilité à long terme des déploiements et des diagnostics de production ne devrait pas être confiée à l'équipe temporaire, autrement elle risque de devenir un silo DevOps.

## Site Reliability Engineer (SRE)

* Le Site Reliability Engineer (SRE) est responsable du maintien du niveau de service:

  - Un **Service Level Indicator** (SLI)  
    Est un indicateur de la performance du service.  
    Ce peut être le uptime, la performance, le débit, la latence, le taux d'erreur, la durabilité, etc.

  - Un **Service Level Objective** (SLO)  
    Est un objectif qu'un fournisseur cherche à atteindre pour un indicateur (SLI) donné.  
    Par exemple un uptime d'au moins 99.99% sur une période de 3 mois.  
    On trouve souvent comme objectif:
    - 99.95%
    - 99.99%
    - 99.999999999% (couramment appelé Nine nines)
    - 99.99999999999% (couramment appelé Nine elevents)

  - Un **Service Level Agreement** (SLA)  
    Est un accord passé entre un fournisseur et son client: le fournisseur s'engage à atteindre des objectifs (SLO) sur une certaine période, pour un service dont bénéficie le client à un moment donné. Le non-respect de ce SLA aboutit généralement à un dédommagement financier.  
    Un SLA contient des SLO, qui sont les valeurs cibles des SLI.

* Le SRE suit au quotidien 4 métriques, dits "Golden Signals":

  - la <ins>latence</ins>: le temps qu'il faut pour recevoir une réponse après avoir envoyé une requête
  - le <ins>traffic</ins>: une mesure du nombre de requêtes qui circulent sur le réseau — requêtes HTTP, messages dans une queue
  - les <ins>erreurs</ins>: renseignent sur les erreurs de configuration de l'infrastructure, les bugs dans le code, et les pannes (crash de la BDD, du réseau)
  - la <ins>saturation</ins>: définit la charge sur le réseau et les ressources du serveur. Chaque ressource a une limite au-delà de laquelle les performances se dégradent ou deviennent indisponibles

* Une équipe DevOps cherche à créer le meilleur produit possible le plus rapidement possible — créer des logiciels, les tester et les affiner, en s'efforçant d'améliorer continuellement les produits avant et après leur lancement. De par la nature du DevOps, les ingénieurs DevOps portent plusieurs casquettes: un ingénieur DevOps est généralement formé en Ops tout en étant attaché à résoudre les problèmes dans le processus de développement, mais une équipe complète comprendra également des ingénieurs DevOps spécialisés dans le développement.

* Un ingénieur "fiabilité du site" (*Site Reliability Engineer* en glais, SRE) se concentre sur le maintien des l'applications en état de marche. On peut considérer que le SRE joue le rôle de gardien: il veille à ce que toutes les applications et tous les serveurs fonctionnent, et se concentrent sur la livraison d'un produit fonctionnel.

  Les approches DevOps et SRE se sont développées simultanément et se sont concentrées sur des problèmes similaires, toutes deux se ressemblent plus qu'elles ne différent et utilisent des outils similaires pour résoudre les problèmes.

  Les approches DevOps et SRE sont toutes deux nées de la volonté d'améliorer l'expérience client, en construisant un système informatique efficace. Toutes deux mettent l'accent sur l'automatisation, la collaboration entre les équipes et une approche holistique du processus de développement et de déploiement.
  Pour créer un système robuste et exempt de bugs, il faut examiner les faiblesses du système et donner la priorité à l'amélioration continue pour y remédier.

  On peut considérer que le SRE penche avant tout du côté Monitoring (8), le DevOps du côté Release (5) et le Dev du côté Code (2) — avec les overlaps entre les différentes spécialités.

  ![](https://i.imgur.com/R0rZ3ZX.jpeg)

---

## Terminologie

* **Provisionnement**  
  Le provisionnement est le fait de rendre un serveur prêt à fonctionner, ce qui implique d'installer le matériel, le système d'exploitation, les services systèmes et la connectivité réseau. Lorsqu'on lance un service et qu'on le configure, on le *provisionne*

* **Déploiement**  
  Le déploiement est l'action de livrer une application (ou une nouvelle version de cette application) pour être exécutée sur un serveur provisionné.

* **Orchestration**  
  L'orchestration est l'action de coordonner plusieurs systèmes ou services. L'orchestration est un terme courant lorsqu'on travaille avec des microservices, containers et kubernetes.

* **Gestion des configurations**  
  Contrôler les changements de configuration système après le provisionnement initial, la maintenance et la mise à niveau des applications et des dépendances des applications

* **Impératif** ou **procédural**  
  Une approche où un ensemble de commandes sont spécifiées pour atteindre un état désiré — par exemple utiliser la commande "touch myfile" pour créer un fichier est impératif

* **Déclaratif** ou **fonctionnel**  
  Une approche où l'état désiré est spécifié et les commandes à exécuter pour atteindre cet état est laissé au soin d'un outil d'automatisation — par exemple "le fichier myfile doit exister" est déclaratif

* **Idempotence**  
  Désigne la capacité d'exécuter un même processus plusieurs fois, et de n'effectuer que les changements nécessaires — par exemple si un fichier doit exister et qu'il existe déjà, alors on ne le recrée pas.

* **Self-service**  
  Désigne le fait d'ajouter de nouvelles ressources (serveurs, applications, etc) à la volée, en fonction du besoin des utilisateurs, au lieu de les préparer à l'avance

* **Intégration continue** (*continuous integration*, CI)  
  Désigne le fait de construire et tester automatiquement l'application

* **Livraison continue** (*continuous delivery*)  
  Consiste à déployer chaque modification dans un environnement similaire à celui de production et à effectuer des tests d'intégration et d'acceptation automatisés

* **Déploiement continu** (*continuous deployment*, CD)  
  Consiste à déployer automatiquement en production

* **Assurance qualité** (*quality assurance*, QA)  
  Consiste à effectuer différents types de tests pour s'assurer de la qualité de l'aplication:  
  tests unitaires, code hygiene, tests d'intégration, d'acceptance, d'infrastructure, de performance, de sécurité

* **GitOps**  
  Quand on utilise de l'IaC (*Infrastructure as Code*) et qu'on utilise un repo git pour introduire un processus formel de review et d'acceptation des changements au code de l'infrastructure — lorsque le code est accepté, un déploiement est automatiquement déclenché

  ![](https://i.imgur.com/E3U6Ra6.png)

## Toolbox DevOps

1. **Versionnement**  
   Converser un historique clair des modifications de code effectuées  
   <ins>Git</ins>:
   ```
   git checkout -b feature/new-user-interface
   ```

2. **Provisionnement**  
   Créer et gérer l'infrastructure avec la même précision et suivi que le code de l'application  
   <ins>Terraform</ins>:
   ```
   resource "aws_instance" "web" {
     ami = "ami-a1b2c3d4"
       instance_type = "t2.micro"
   }
   ```

3. **Containerisation**  
   Créer des containers léger et portables garantissant la reproductibilité des environnements de développement, éliminant le problème du "ça marche sur ma machine"  
   <ins>Docker</ins>:  
   ```
   FROM node:14

   WORKDIR /app
   COPY . .
   RUN npm install

   CMD ["npm", "start"]
   ```

4. **Orchestration**  
   Gérer et mettre à échelle les applications containerisées  
   <ins>Kubernetes</ins>:  
   ```
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: web-app
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: web
     template:
       metadata:
         labels:
           app: web
       spec:
         containers:
         - name: web
           image: web-app:latest
   ```

5. **CI/CD**  
   Automatiser les processus de test et de déploiement  
   <ins>GitHub Actions</ins>
   ```
   name: Node.js CI
   on: [push]
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
       - uses: actions/checkout@v2
       - name: Use Node.js
         uses: actions/setup-node@v1
         with:
           node-version: '14'
       - run: npm install
       - run: npm test
   ```

6. **Monitoring**  
   Mettre en oeuvre une surveillance des performances et de l'état de santé des machines  
   <ins>Grafana et Prometheus</ins>

7. **Logging**  
   Garder une traces des événements qui se sont produits, peut être à différents fins allant de l'audit au troubleshooting

   <ins>Sentry, ELK stack</ins>

![[](https://xmind.app/m/yJ2FFi/)](https://imgur.com/YlnVP4F)

Magenta: les plus courants, en maîtriser au moins un,  
Rouge: moins courant, en connaître le fonctionnement  
Jaune: peu rencontrés, connaître de nom

## Infrastructure as Code

L'IaC (*Infrastructure as Code*) consiste à utiliser des outils pour créer des ressources de manière programmatique.  

Les outils d'IaC peuvent être classifiés en 3 groupes principaux:

- <ins>gestion de configuration</ins>.  
  Ex: ansible, chef, puppet, salt stack

  Ils ont généralement utilisés pour installer et gérer des logiciels sur des ressources d'infrastructure existantes — des serveurs, BDD, dispositifs de mise en réseau, etc.

  Les outils de gestion de la configuration maintiennent une structure de code cohérente et standard, ce qui facilite la gestion et la mise à jour en cas de besoin.

- <ins>templating de serveur</ins>  
  Ex: docker, packer, vagrant

  Ils sont utilisés pour créer une image de VM ou de container. Les images contiennent tous les logiciels et dépendances nécessaires, et éliminent la nécessité d'installer les serveurs après leur déploiement.

  Les outils de templating de serveur favorisent également une infrastracture prédictible et immuable: lorsqu'une VM ou qu'un container est déployé, si des modifications doivent être effectuées, au lieu de mettre à jour l'instance en cours d'exécution, on met à jour l'image et on déploie une nouvelle instance à partir de la nouvelle image

- <ins>outils de provisionnement</ins>  
  Ex: terraform, cloudformation  
  Alors que cloudformation est destiné à AWS, terraform est indépendant de toute platforme et utilise des plugins

  Ils sont utilisés pour provisionner des composants d'infrastructure à l'aide de fichiers de configuration — ce peut être des des VM, des BDD, des VPC, des sous-réseaux, des groupes de sécurité, des solutions de stockage, et à peu près n'importe quel service — en fonction du fournisseur choisit