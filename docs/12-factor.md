---
title: 12 factor App
category: Other
---

[Manifesto: The 12-factor App](https://12factor.net/fr/)

* Traditionnellement, pour mettre en place une application, il faut des semaines voire des mois pour obtenir un serveur qui hébergera l'application, serveur dont on sera dépendant pour les prochaines années. Si le serveur tombe en panne ou est, pour quelque raison ou une autre, arrêté alors que l'utilisateur est en train de faire quelque chose, tout ce qu'il a fait est perdu.

    Aujourd'hui, on s'attend à ce que les plateformes soient être opérationnelles 99.9% du temps, ce qui signifie qu'il n'y a pas de temps pour arrêter l'application — que ce soit corriger l'application, ajouter des ressources supplémentaires ou la faire passer à échelle suite à un afflux d'utilisateurs.

* Pour ce faire, 4 grands axes vont être suivis:

  1. **portabilité**  
      L'application doit s'affranchir de l'infrastructure sous-jacente. De cette manière, il est possible de l'héberger n'importe où. C'est ce qu'on appelle la portabilité: être capable d'exécuter la même application dans différents environnements sans avoir à modifier le code source de l'application.

  2. **déploiement continu**  
     L'application doit pouvoir être testée et déployée rapidement. Les environnements de dev, de test et de production doivent être le plus similaires possibles pour limiter les râtés.

  3. **mise à échelle**  
     On vit dans un monde à forte croissance, où les startups voient leurs utilisateurs passer de 0 à des millions en l'espace de quelques mois. Pour supporter cette augmentation, deux manières de procéder:

      - la mise à échelle **verticale**:  
        Ajouter des ressources supplémentaires aux serveurs

      - la mise à échelle **horizontale**:  
        Provisionner plus de serveurs pour exécuter plus d'instances de l'application

  4. **déploiement dans le cloud**  
     La plupart des plateformes du cloud peuvent approvisionner des serveurs et autres ressources (tel que de l'espace disque) en quelques minutes. Les applications doivent pouvoir être déployées sur ces plateformes cloud, et pour y parvenir l'application doit être développée en suivant certains principles.

* Le manifesto de l'*application à 12 facteurs* fournit un ensemble de bonnes pratiques pour construire des applications modernes dans le cloud, bonnes pratiques regroupées en 12 facteurs:

    1. Codebase
    2. Dependencies
    3. Config
    4. Backing Services
    5. Build, release, run
    6. Processes
    7. Port Binding
    8. Concurrency
    9. Disposability
    10. Dev/prod parity
    11. Logs
    12. Admin Proccesses

# 1. Codebase 

* Avoir une seule codebase

* Utiliser git pour permettre à tous les développeurs de travailler sur la même application en même temps et de collaborer efficacement.

# 2. Dependencies

* Déclarer les dépendences.

  * De nombreuses applications ont besoin que des dépendances soient installés avant d'exécuter l'application. L'application ne doit pas reposer sur l'existance implicite de paquets systèmes. Par exemple, pour python ces dépendances sont typiquement situées dans un fichier requirements.txt situé à la racine du projet.

  * Le numéro de version doit être spécifié après le nom du paquet. Sans le numéro de version, un développeur peut avoir installé une version donnée de flask pendant le développement et au moment déployer en production une version plus récente a été publiée: ainsi l'application ne tourne pas avec les mêmes versions dans tous les environnements, ce qui peut empêcher l'application de fonctionner comme prévu

    ``` bash
    $ pip install -r requirements.txt
    ```

    ``` bash
    # requirements.txt
    flask==2.0.0
    ```

* Isoler les dépendances

    * Les dépendances d'une application doivent être isolée du reste. Si on a besoin de faire tourner deux applications, qui nécessitent deux versions de dépendences différentes, il ne doit pas y avoir de conflits. Une meilleure pratique consiste à crée un environnement isolé pour l'application, qui inclut toutes les dépendances nécessaires.

    * Différentes langages de programmation proposent des approches différentes. Par exemple, python possède un concept d'environnement virtuel (venv), qui permet de créer un environnement isolé pour chaque application, avec ses propres versions de dépendances.

    * Pour ce qui est des outils système (comme curl), une approche plus universelle, le containerisation (notamment Docker) permet d'exécuter des applications dans un environnement autonome qui est isolé du système hôte. C'est un moyen plus efficace et plus fiable pour gérer les dépendances

      ``` docker
      FROM python:3.10-alpine

      WORKDIR /twelve-factor-app

      COPY requirements.txt /twelve-factor-app

      RUN pip install -r requirements.txt --no-cache-dir

      COPY src /twelve-factor-app

      CMD python app.py
      ```

# 8. Concurrency

* Jusqu'à présent, on a une application containerisée, qui exécute une instance d'un processus, capable de servir plusieurs utilisateurs. Mais que se passe-t-il lorsque davatange d'utilisateurs visitent notre site?

* On peut augmenter la capacité du serveur en lui ajoutant des ressources. Cette approche demande de démonter le serveur, et va coûter un temps d'arrêt. Au bout d'un certain temps, on va également atteindre une limite maximale sur les ressources qui peuvent être ajoutées au serveur.

  Une autre approche est d'ajouter de nouveaux serveurs, accessibles en quelques minutes.  
  On est en mesure de provisionner plus de serveurs et de faire tourner plusieurs instances de la même application. On peut ensuite mettre en place un load balancer, qui répartit la charge entre les différentes instances de l'application.

* Pour que cela fonctionne comme prévu, il faut construire l'application comme une application indépendante sans état — *first class citizen*.

# 6. Processes

* Les processus sont sans état et ne partagent rien.  

* Lorsqu'un utilisateur se connecte au site web, on stocke certaines informations de session le concernant, telles que l'endroit d'où il s'est connecté, la date d'expiration de sa connexion, etc. Ces informations de session sont nécessaires au serveur pour maintenir la connexion de l'utilisateur.

    Si ces informations sont stockées dans la mémoire du processus, ou plus généralement dans le système de fichier du serveur, lorsqu'une future requête de cet utilisateur est dirigée vers un autre processus, l'utilisateur peut être considéré comme déconnecté puisque les informations de session ne sont pas disponibles à cet endroit.

* Il existe des load balancers qui peuvent rediriger les utilisateurs vers le même processus à chaque fois. C'est ce qu'on appelle des *sticky sessions*. Cela reste cependant un problème si le processus est arrêté et qu'un nouveau est lancé. Les sticky sessions sont une violation des 12 facteurs

* À la place, tout doit être stocké dans un service de sauvegarde externe, comme une base de données ou un service de cache (ex Redis).
  Peu importe le processus vers lequel un utilisateur est dirigé, c'est comme si toutes les demandes étaient traitées par le même processus, car tous ont accès aux même données.

# 4. Backing Services

* Tout service doit être traité comme une ressource attachée: il soit hébergé localement ou dans un environnement de cloud, l'application doit pouvoir fonctionner sans qu'on ait à modifier le code. Par exemple le système de fichier: il doit être possible d'enregistrer les fichiers sur le disque ou de les envoyer sur un stockage S3 d'AWS en modifiant uniquement les variables d'environnement. Ou un service SMTP. Il ne doit rien avoir dans le code qui soit spécifique à un service hébergé localement, ou hébergé à distance d'ailleurs.

# 3. Config

* Chaque environnement (dev, staging et production) doit utiliser une instance de base de données différente — ce qui nécessite de modifier les valeurs de l'hôte et du port.

* Le codage en dur des valeurs est considéré comme une mauvaise pratique, car il peut entraîner des incohérence et des erreurs lors du déploiement dans différents environnemets.

* Une application 12-facteur stocke les configurations dans des variables d'environnement. Cela permet d'utiliser différentes configurations pour différents déploiements et différents environnement. De plus, il n'est pas nécessaire d'exposer au public des informations sensibles sur la configuration.

* Pour s'assurer que les configuration de l'environnement sont séparées du code de l'application principale, on peut définir un fichier .env et y stocker les configurations, les charger en tant que variables d'environnements, puis gérer les configurations de l'application à partir des variables d'environnement.

# 5. Build, release, run

* Imaginons que le dernier déploiement ait poussé une faute de frappe.  
  Pour revenir rapidement sur la version précédente, sans avoir à pusher un autre commit, attrendre qu'il soit buildé, puis envoyé sur le serveur, il faut avoir une séparation stricte entre les phases de build, release et run:

    1. **Build**  
       Le conversion du code du format textuel à un format exécutable est connu sous le nom de build. Différents outils sont disponibles suivant le langage de programmation utilisé, comme *python setup tools* pour python ou *maven* ou *gradle* pour java. On dispose génélrament d'un script de build qui invoque ces outils pour builder l'application. Il peut également s'agir d'une image Docker

    2. **Release**  
        Une fois buildé, l'exécutable et la configuration de l'environnement devient un objet de release. Chaque release doit avoir un identifiant unique, qui peut être un numéro ou un timestamp, de sorte qu'il soit facile de reconnaître quand la release a été crée

    3. **Run**  
       Dans la phase de run, l'objet de release est exécuté dans son environnement respectif.

* Tout modification du code, qu'elle qu'elle soit, entraine un nouveau processus de build/release/run, qui aboutiera à une nouvelle version déployée. En ayant une version distincte, on peut stocker des artefacts de construction dans un endroit désigné, ce qui permet de revenir facilement aux versions précédentes et de redéployer une version spécifique en cas de besoin. Cela améliore notre capacité globale à gérer et maintenir les applications.

# 7. Port Binding

* Un serveur web Python Flask écoute sur le port 5000 par défaut. Contrairement aux applications web traditionnelles, l'application 12-facteurs est complètement autonopme et ne dépend pas d'un port spécifique pour fonctionner.

* Ainsi, si on fait tourner plusieurs instances de l'application sur le même serveur, on doit pouvoir lier le port à d'autres ports serveur, tels que 5001 ou 5002. L'application exporte HTTP en tant que service, en se liant à un port spécifique et en écoutant les requête entrantes sur ce port. 

# 9. Disposability

* Les processus d'une application 12-facteurs sont jetables: ils peuvent être démarrés ou arrêtés à tout moment. Pour ce faire:

  - Les processus se doivent de minimiser le temps de démarrage, il ne faut donc pas compter sur des scripts de démarrage complexes pour provisioner l'application.

  - Ils doivent s'arrêter de manière élégante lorsqu'ils reçoivent un signal SIGTERM du gestionnaire de processus. L'application doit être capable de gérer le signal SIGTERM afin d'éviter toute perte de données ou de ressources inattendues pouvant survenir si le processus est arrêté de force par un signal SIGKILL.

    L'application peut traiter des demandes provenant de centaines d'utilisateurs à la fois. Un arrêt progressif donne à l'application suffisamment de temps pour cesser d'accepter de nouvelles demandes, tout en achevant le traitement de toutes les demandes existantes. Ainsi, les utilisateurs qui attendent une réponse de l'application ne sont pas affectés.

# 10. Dev/prod parity

* L'application est déployé sur 3 environnements:

  - **dev**  
    L'environnement de développement est l'endroit où l'application est développée par les développeurs, pour tester les changements pendant la phase de développement

  - **staging**  
    L'environnement de staging est l'endroit où l'application est déployée pour être testée, dans une configuration similaire à celle de la production

  - **prod**  
    L'environnement de production est celui où l'application fonctionne et est accessible à l'utilisateur final

* Entre le développement et la production, il peut y avoir des écarts:

  - Temporels. Traditionnellement, il faut des semaines voire des mois pour que les changements apportés par les développeurs soient mis en prodction. Le problème, c'est qu'il peut y avoir d'autres changements entre le moment où l'application est développée et le moment où elle passe en production, et qui peuvent affecter les fonctionnalités modifiées.

  - De personnels. Ce ne sont pas les mêmes personnes qui déploient les modifications (team ops) et celles apportent les modifications (team dev), ce qui rend difficile l'identification des problèmes causés par les nouvelles modifications

  - Outils. Des outils différents sont utilisés dans différents environnements, ce qui peut avoir des conséquences inattendues

* Pour résoudre ces problèmes:

  * L'application à 12-facteurs est conçue pour le déploiement continu, se qui réduit l'écart entre le développement et la production. Grâce à l'intégration continue et aux outils de livraison et déploiement continu, on réduit le temps nécessaire pour que les changements passent de l'environnement de dev à la prod — juste quelques heures voire minutes dans certains cas.

  * Le développeur qui écrit le code devrait également être impliqué dans le déploiement et le monitoring de l'environnement de production.

  * S'efforcer de conserver les mêmes outils autant de possible. Le développeur à 12-facteurs se doit notamment de résister à l'envie d'utiliser des services de sauvegarde différents entre le développement et la production. Et Docker facilite la mise en place d'environnements quasimment identiques de partout.

# 11. Logs

* L'application produit des logs, en commençant par le port sur lequel il tourne, et chaque requête qui arrive et gérée par le serveur et enregistrée sur une ligne séparée. Les logs enregistrent également toutes les erreurs de code, ce qui permet de résoudre les problèmes en cas de défaillance.

* Traditionnellement, les applications suivaient différentes approches pour stocker les logs. L'un d'entre elles consistait à écrire les logs dans un fichier local. Le problème de cette approche, c'est qu'un container peut être tué à tout instant et les logs seront perdus.

    Dans d'autres cas, les applications essaient de pousser les logs vers des systèmes de logs, comme fluentd. Bien que la gestion centralisée des logs soit encouragée, il est déconseillé de coupler des solutions de logs spécifiques à l'application — on ne veut pas que l'application soit liée à une solution unique

* Une application à 12-facteurs écrit les logs dans un format structuré à un seul endroit. Elle ne se préoccupe jamais ni du routage ni du stockage. Tous les logs sont écrits dans la sortie standard ou dans un fichier local dans un format json structuré qui peut ensuite être utilisé par un agent pour le transférer vers un endroit centralisé, à des fins de recherches ou d'analyse.

    La stack ELK et Splunk sont de bons exemples de solutions centralisées qui peuvent être envisagées.

# 12. Admin Proccesses

* On peut avoir des tâches d'administration — telle que la migration de base de données, la suppression des anciennes sessions, etc.

* Pour une application à 12-facteurs, les tâches administratives doivent être séparées des processus d'application. Plus précisemment, toutes les tâches administratives ponctuelles ou périodiques, telles que les sauvegardes de bases de données ou les redémarrage de serveurs, sont exécutées en tant que processus ou application distinct. Elles doivent cependant être exécutées avec une configuration identique à celle de l'application en cours, et être automatisées, scalable et reproductibles