---
title: Celery
category: Python, Django
---

## Pourquoi faire

* Celery est un processus python qui s'occupe des tâches asynchrones.  
  On peut le faire tourner sur le même serveur que l'application web, pour déclencher des tâches qui seront exécutées en arrière-plan, non bloquantes pour l'utilisateur. Ou on peut configurer plusieurs workers pour faire tourner celery, ce qui permet d'alléger la charge du serveur web. 

* La liste des tâches asynchrones déclenchées est détenue par un broker, c'est à dire une application qui sert de liaison entre deux applications — on utilise souvent RabbitMQ ou Redis.  
  Redis est une BDD NoSQL qui garde les données en RAM, avec sauvegarde sur le disque.  
  Chaque fois qu'on veut déclencher une tâche asynchrone, la tâche est envoyée à Redis, et lorsque se charge de travail est suffisamment faible, Celery prend la prochaine tâche dans la queue et la supprime de Redis.

* Notons que Celery prefetch une liste de tâches à exécuter (par défaut, 4) et garde cette liste en mémoire.  
  Si on veut vider la liste des tâches à exécuter, il y a d'une part la liste détenue par Redis à vider et d'autre part la liste détenue par chaque worker.

## Installer celery

1. Installer le package celery et au moins un broker

    <ins>requirements.txt</ins>:

    ```
    celery[redis]~=5.2
    ```

2. Configurer le broker + celery

    <ins>docker-compose.yml</ins>:

    ``` yml
      # Tasks broker + celery
      redis:
        image: redis:6.0.10
        restart: unless-stopped
        expose:
          - "6379"
        healthcheck:
          test: ["CMD", "redis-cli", "ping"]
          interval: 1s
          timeout: 3s
          retries: 30

      celery:
        image: api:latest
        restart: unless-stopped
        command: >
          celery -A core worker
          --concurrency=1
          --max-tasks-per-child 10
          --max-memory-per-child 15000
          --time-limit 3600
          -l info
          -Q celery
        env_file:
          - ./back.env
        depends_on:
          db:
            condition: service_healthy
          redis:
            condition: service_healthy
        healthcheck:
          disable: true
    ```

    <ins>dev.env</ins>:

    ```
    REDIS_HOST=redis
    REDIS_PORT=6379
    ```

    <ins>settings/defaults.py</ins>:

    ``` python
    import sys

    # Celery configuration
    # see https://docs.celeryq.dev/en/stable/userguide/configuration.html

    CELERY_BROKER_URL = f"redis://{os.getenv('REDIS_HOST', '')}:{os.getenv('REDIS_PORT', '')}/0"
    CELERY_RESULT_BACKEND = f"redis://{os.getenv('REDIS_HOST', '')}:{os.getenv('REDIS_PORT', '')}/0"
    CELERY_RESULT_EXPIRES = 30  # keep the result in redis for how many seconds (1 day by default)
    CELERY_MAX_CACHED_RESULTS = 100  # cache task meta in celery.backends (100 by default)

    CELERY_BROKER_CONNECTION_RETRY_ON_STARTUP = True
    CELERY_DEFAULT_RATE_LIMIT = '10/s'
    CELERY_ENABLE_UTC = False
    CELERY_TIMEZONE = TIME_ZONE
    CELERY_TASK_RESULT_EXPIRES = CELERY_RESULT_EXPIRES
    CELERY_TASK_EAGER_PROPAGATES = True
    CELERYD_PREFETCH_MULTIPLIER = 4  # workers retrieve tasks from the broker in batch (4 by default)

    if 'celery' in sys.argv[0]:
        DEBUG = False
    ```

    <ins>settings/tests.py</ins>:

    ``` python
    CELERY_BROKER_URL = 'memory://'
    BROKER_BACKEND = 'memory'
    CELERY_TASK_ALWAYS_EAGER = True
    CELERY_TASK_EAGER_PROPAGATES = True
    ```

3. Lier celery à Django

    <ins>core/__init__.py</ins>:

    ``` python
    # This will make sure the app is always imported when
    # Django starts so that shared_task will use this app.
    from .celery import application as celery_app  # noqa

    default_app_config = 'core.apps.CoreConfig'
    ```

    <ins>core/celery.py</ins>:

    ``` python
    import os
    from celery import Celery
    from django.conf import settings

    # Set the default Django settings module for the 'celery' program.
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

    application = Celery('core')

    # Using a string here means the worker doesn't have to serialize
    # the configuration object to child processes.
    # - namespace='CELERY' means all celery-related configuration keys
    #   should have a `CELERY_` prefix.
    application.config_from_object('django.conf:settings', namespace='CELERY')

    # Load task modules from all registered Django app configs.
    application.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
    ```

4. Créer une tâche celery

    ``` python
    from celery import shared_task
    from celery.utils.log import get_task_logger
    from core.storages import public_storage


    def delete_public_file_delay(filepath, seconds=0, minutes=0, hours=0, days=0):
        delay = seconds + (minutes * 60) + (hours * 60**2) + (days * 24 * 60**2)
        delete_public_file.apply_async((filepath,), countdown=delay)


    @shared_task
    def delete_public_file(filepath):
        task_logger = get_task_logger('core')
        task_logger.info(f'[+] Delete file {filepath}')
        try:
            public_storage.delete(filepath)
        except Exception as e:
            task_logger.error(e)

        task_logger.info('\t... done')
    ```

---

## Stamped headers

* À partir de celery 5.3, il est possible d'ajouter des entêtes personnalisées aux meta des tâches, ces entêtes peuvent ensuite être utilisées pour annuler un ensemble de tâches.

    ``` python
    def perform_create(self, instance):
        file_id = instance.id

        import_file_task.apply_async(
            kwargs=dict(
                dcm_path=path,
                dicom_namespace_id=instance.patient_id,
                dicom_study_uid=instance.dicom_study_uid,
                file_id=file_id,
            ),
            countdown=60,
            file_id=file_id,
            stamped_headers=['file_id'],
        )

    def perform_destroy(self, instance):

        # ---
        # REVOKE CELERY TASKS
        # If the user deletes a scanner that is still uploading (#!$@*&!)

        # All worker nodes keeps a memory of revoked task ids, either in-memory or persistent on disk.
        # Revoking tasks works by sending a broadcast message to all the workers.
        # The worker will log the following message:
        # “Discarding revoked task: api.views.file.import_file_task[UUID] (revoked by header: {'file_id': ID})”
        # The task queue (maintained by redis) won’t change.

        celery_app = import_file_task.app

        # Available starting celery@5.3
        celery_app.control.revoke_by_stamped_headers({'file_id': instance.id})

    @shared_task(queue=settings.CELERY_LOWPRIO_QUEUE)
    def import_file_task(
        dcm_path,
        dicom_namespace_id,
        dicom_study_uid,
        file_id,
    ):
        pass
    ```

---

## Commandes utiles

### Celery

* Lister les tâches connues de Celery

    ``` bash
    celery -A core inspect registered
    ```

* Lancer une tâche:

    ``` bash
    celery -A core call core.healthchecks.views.sentry_trigger_error_task
    ```

    Supprimer les résultats expirés. Tourne tous les jours à 4h du mat' si on installé celery beat.

    ``` bash
    celery -A core call celery.backend_cleanup
    ```

* Lister les tâches planifiées:

    ``` python
    celery -A core inspect scheduled
    ```

* Vider la queue:

    ``` python
    celery -A core purge
    ```

## Redis

* Supprimer toutes les BDD:

  ``` bash
  docker exec -it efx_redis_1 bash
  $ redis-cli -p 6379 ping
  PONG
  $ redis-cli FLUSHALL
  OK
  ```

* Supprimer la queue "celery":

  ``` bash
  $ redis-cli

  # Check if the queue exists
  > KEYS celery
  1) "celery"

  # Delete it
  > DEL celery
  (integer) 1

  # Check it doesn't exist
  > KEYS celery
  (empty array)
  ```

* Afficher les stats de redis:

  ``` bash
  $ redis-cli INFO | grep -e expired_keys -e used_memory_human
  used_memory_human:1.15M
  expired_keys:16
  ```

* Afficher le contenu de la BDD:

  ``` bash
  $ redis-cli

  # find all keys
  > KEYS *
  1) "_kombu.binding.celeryev"
  4) "_kombu.binding.celery"
  5) "_kombu.binding.celery.pidbox"
  6) "celery-task-meta-00a95ca3-8636-4b04-a2ad-65418f293e5b"

  # filter keys
  > KEYS "_kombu.*"
  1) "_kombu.binding.celeryev"
  3) "_kombu.binding.celery"
  4) "_kombu.binding.celery.pidbox"

  # get value
  > GET celery-task-meta-00a95ca3-8636-4b04-a2ad-65418f293e5b
  "{\"status\": \"SUCCESS\", \"result\": null, \"traceback\": null, \"children\": [], \"date_done\": \"2023-06-01T14:09:58.607890\", \"task_id\": \"00a95ca3-8636-4b04-a2ad-65418f293e5b\"}"

  # get length of list
  > LLEN celery
  (integer) 5

  # get 0th item of list
  > LINDEX celery 0
  "{\"body\": \"W1s0XSwge30sIHsiY2FsbGJhY2tzIjogbnVsbCwgImVycmJhY2tzIjogbnVsbCwgImNoYWluIjogbnVsbCwgImNob3JkIjogbnVsbH1d\", \"content-encoding\": \"utf-8\", \"content-type\": \"application/json\", \"headers\": {\"lang\": \"py\", \"task\": \"core.api_admin.views.tasks.delete_storage_file.delete_public_file\", \"id\": \"12f21103-8866-49c1-9af5-d37f2697e358\", \"shadow\": null, \"eta\": null, \"expires\": null, \"group\": null, \"group_index\": null, \"retries\": 0, \"timelimit\": [null, null], \"root_id\": \"12f21103-8866-49c1-9af5-d37f2697e358\", \"parent_id\": null, \"argsrepr\": \"(4,)\", \"kwargsrepr\": \"{}\", \"origin\": \"gen36@9b5d697da07c\", \"ignore_result\": false}, \"properties\": {\"correlation_id\": \"12f21103-8866-49c1-9af5-d37f2697e358\", \"reply_to\": \"bdd0cb2a-414c-38d1-ba33-cc58250ad0cf\", \"delivery_mode\": 2, \"delivery_info\": {\"exchange\": \"\", \"routing_key\": \"celery\"}, \"priority\": 0, \"body_encoding\": \"base64\", \"delivery_tag\": \"b7dee92c-b5c3-474c-bc85-d4118770d185\"}}"

  # get all items of list
  > LRANGE celery 0 -1
  1) "{\"body\": ..."
  2) "{\"body\": ..."
  3) "{\"body\": ..."
  4) "{\"body\": ..."
  5) "{\"body\": ..."

  # drop the currently selected database
  > FLUSHDB

  # drop all databases
  > FLUSHALL
  ```

  ``` bash
  # format as JSON
  $ apt update
  $ apt install -y jq
  $ redis-cli LRANGE celery 0 -1 | jq '.' | more
  {
    "body": "W1s0XSwge30sIHsiY2FsbGJhY2tzIjogbnVsbCwgImVycmJhY2tzIjogbnVsbCwgImNoYWluIjogbnVsbCwgImNob3JkIjogbnVsbH1d",
    "content-encoding": "utf-8",
    "content-type": "application/json",
    "headers": {
      "lang": "py",
      "task": "core.api_admin.views.tasks.delete_storage_file.delete_public_file",
  ```

* [Cheatsheet](http://lzone.de/cheat-sheet/Redis)
