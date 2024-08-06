---
title: 6 - Déployer
category: Machine Learning, Processus
---

Une fois que le modèle est fini, ce qu'on en fait dépend du but pour lequel il a été développé:

1. <ins>Analyses ponctuelles: pipeline</ins>  
   On a développé un modèle pour analyser les données. Certains projets requièrent de répéter le processus à plusieurs reprises, lorsqu'on obtient de nouvelles données par exemple. Dans ce cas, automatiser l'apprentissage va permettre de gagner du temps: créer une *pipeline* pour automatiser le preprocessing et traitement des données.

    [Notebook: Pipelines](https://www.kaggle.com/alexisbcook/pipelines)

2. <ins>Business analysis: rapport & visualisations</ins>  
   Toujours dans la même veine, si l'analyse a été demandé par un client, alors il faut présenter les résultats: formuler les hypothèses et les résultats observés en language humain, illustrer avec des graphiques faciles à comprendre pour les non-tech.

3. <ins>Fonctionnalité: application</ins>  
   On a développé un modèle pour être utilisé dans le cadre d'une application.  
   Dans ce cas, on exporte le modèle et

   * soit on ajoute la fonctionnalité à une application Python (typiquement, on s'appuie le framework Flask ou Django).

   * soit on crée un webservice, qui pourra être requêté par des applications non Python (typiquement, unicorn pour gérer les requêtes HTTP et FastAPI pour créer une API rapidement).

   Exemples:  
   ① [Entraîner & exporter un modèle](https://github.com/a-mt/fcc-sms-text-classification/blob/deploy/fcc_sms_text_classification.ipynb)  
   ② [Créer un webservice avec FastAPI](https://github.com/a-mt/fcc-sms-text-classification/blob/deploy/FastAPI.ipynb)  
   ③ [Application Flask](https://github.com/yoke2/rps_tf2_flask_app)

* Déployer des applications de Machine Learning en ligne est un domaine d'expertise à part entière, le MLOps — particulièrement si l'application demande des resources importantes (GPU, requêtes fréquentes, etc).

  Pour aller plus loin:  
  [Running Deep Learning Algorithms as a Service](https://towardsdatascience.com/serving-deep-learning-algorithms-as-a-service-6aa610368fde)
