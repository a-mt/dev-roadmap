---
title: Sentry
category: Python, Django
---

* Sentry est une application web qui permet de monitorer les erreurs déclenchées par une application web.

## Installer

1. Ajouter le package sentry

    ```
    sentry_sdk==1.19.1
    ```

2. Créer un projet sur Sentry et définir les variables d'environnement du projet

    ```
    SENTRY_ENVIRONMENT=staging
    SENTRY_DSN=https://xxx@sentry.myhost.com/port
    SENTRY_PROJECT=myproject-back
    SENTRY_TRACE_SAMPLE_RATE=1
    ```

3. Définir les configurations de Sentry

    ``` python
    # Sentry configuration

    COMMIT_SHA = os.getenv('COMMIT_SHA', 'latest')
    COMMIT_TAG = os.getenv('COMMIT_TAG', '') or COMMIT_SHA
    SENTRY_ENVIRONMENT = os.getenv('SENTRY_ENVIRONMENT', 'dev')
    SENTRY_DSN = os.getenv('SENTRY_DSN')
    SENTRY_PROJECT = os.getenv('SENTRY_PROJECT')
    SENTRY_TRACE_SAMPLE_RATE = float(os.getenv('SENTRY_TRACE_SAMPLE_RATE', 0))

    # Initialize sentry
    if SENTRY_DSN:
        import sentry_sdk
        from sentry_sdk.integrations.redis import RedisIntegration
        from sentry_sdk.integrations.celery import CeleryIntegration
        from sentry_sdk.integrations.django import DjangoIntegration

        sentry_sdk.init(
            dsn=SENTRY_DSN,
            ignore_errors=['imports.exceptions.ValidationError'],
            integrations=[CeleryIntegration(), DjangoIntegration(), RedisIntegration()],
            environment=SENTRY_ENVIRONMENT,
            release=f'{SENTRY_PROJECT}@{COMMIT_SHA}',
            traces_sample_rate=SENTRY_TRACE_SAMPLE_RATE,
            send_default_pii=True,
        )
    ```

    `ignore_errors` permet de ne pas envoyer à Sentry les exceptions qui sont des instances des classes données.

4. Ajouter des endpoints pour vérifier les envois à Sentry.  
   Notons qu'il peut y avoir un délai entre l'envoi vers Sentry et l'affichage sur Sentry — il y a un temps de traitement (a priori jusqu'à 1h).

    <ins>www/core/healthchecks/urls.py</ins>:

    ``` python
    from django.urls import path

    from . import views

    urlpatterns = [
       path("sentry", views.sentry_trigger_error),
       path("sentry-extra", views.sentry_trigger_error_with_extra),
       path("sentry-celery", views.sentry_trigger_error_in_celery_task),
       path("sentry-celery-ignored", views.sentry_trigger_validation_error_in_celery_task),
    ]
    ```

    <ins>core/checks/views.py</ins>:

    ``` python
    import logging

    from celery import shared_task
    from django.http import HttpResponse


    logger = logging.getLogger('core')


    def sentry_trigger_error(request):
        """
        Check that an uncaught error is send to sentry
        """
        return 1 / 0


    def sentry_trigger_error_with_extra(request):
        """
        Check that a logged error is send to sentry
        """
        try:
            return 1 / 0
        except Exception:
            logger.error(
                "Can't do division by zero",
                exc_info=True,
                extra={'data': {'number': 1, 'divider': 0}},
            )
        return HttpResponse('ok')


    def sentry_trigger_error_in_celery_task(request):
        """
        Check that an uncaught error in celery is send to sentry
        """
        sentry_trigger_error_task.delay()
        return HttpResponse('ok')


    @shared_task
    def sentry_trigger_error_task():
        return 1 / 0
    ```
