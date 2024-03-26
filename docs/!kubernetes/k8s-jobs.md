---
title: Job & crontab
category: Workflow, Containers, Kubernetes
---

## restartPolicy

* Par défaut, Kubernetes redémarre les containers lorsqu'ils s'arrêtent, et ce jusqu'à ce que le seuil de redémarrages est atteint. On peut changement ce comportement avec la propriété restartPolicy — always (par défaut), never, onFailure.

  ``` yaml
  apiVersion: v1
  kind: Pod
  metadata:
    name: math-pod
  spec:
    containers:
    - name: math-add
      image: ubuntu
      command: ['expr', '3', '+', '2']
    restartPolicy: Always
  ```

## Jobs

* Les applications et base de données sont destinées à tourner pendant de longues périodes de temps, jusqu'à ce qu'elles soient arrêtées manuellement. Mais on peut vouloir exécuter d'autres type de tâches (comme du traitement par batch, de l'analyse ou création de rapports), qui doivent s'exécuter une fois et se terminer. Pour ce faire, on utilise des jobs

  ![](https://i.imgur.com/tgsyAW8l.png)

* Là ou un replicaset est utilisé pour s'assurer qu'un nombre donné de pods tourne à tout instant, un job est utilisé pour s'assurer qu'une tâche est exécutée avec succès x fois. Ce nombre est à spécifier dans la propriété completions

  ![](https://i.imgur.com/YnVejdhl.png)

* Par défaut, les pods sont crées les uns après les autres — le second pod n'est crée que lorsque le premier s'est terminé avec succès. Au lieu de crée les pods séquentiellement, on peut les créer en parallèle: en spécifiant un "parallelism" de 3, k8s créera 3 pods en même temps. Si un pod échoue, k8s est assez intelligent pour recréer un pod à la fois jusqu'à obtenir le total de pods à compléter. 

  ``` yaml
  apiVersion: batch/v1
  kind: Job
  metadata:
    name: math-add-job
  spec:
    completions: 3
    parallelism: 3
    template:
      spec:
        containers:
          - name: math-add
            image: ubuntu
            command: ['expr', '3', '+', '2']
        restartPolicy: Never
  ```

* Avec "activeDeadlineSeconds", si le job n'est pas complété au bout de X secondes, le job échoue et le pod est terminé.  
  "backoffLimit" spécifie le nombre d'essais avant de considérer qu'un job a échoué. Vaut 6 par défaut.  
  Il y a un délai de 10s avant le second essai, et ce délai augmente exponentiellement (donc 10s, 20s, 40s, etc) jusqu'à un maximum de 6 minutes.

  ``` yaml
  spec:
    completions: 1
    backoffLimit: 25 # This is so the job does not quit before it succeeds.
    activeDeadlineSeconds: 20
    template:
      ...
  ```

## Cronjobs

* Un cronjob est un job qui peut être planifié, même principe que la crontab sous Linux

  ``` yaml
  apiVersion: batch/v1
  kind: CronJob
  metadata:
    name: throw-dice-cron-job
  spec:
    schedule: "30 21 * * *"
    jobTemplate:
      spec:
        completions: 3
        parallelism: 3
        backoffLimit: 25 # This is so the job does not quit before it succeeds.
        template:
          spec:
            containers:
            - name: throw-dice
              image: kodekloud/throw-dice
            restartPolicy: Never
  ```
