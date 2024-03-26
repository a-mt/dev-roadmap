---
title: Bases > Applications
category: Python, Django
---

## Configurations

* La philosophie générale de Django est de construire une application avec des applications plus petites.  
  Pour créer une application:

  1. Créer le squelette de l'application

      ``` bash
      $ python manage.py startapp blog
      ```

  2. L'ajouter aux applications activées dans les configurations.  
     Une fois activé, Django ira chercher les modèles et locales situés dans ce répertoire

      ``` python
      INSTALLED_APPS = [
          ...,
          'blog'
      ]
      ```

      Pour plus de lisibilité, on peut séparer les applications suivant leur origine avant de les concaténer dans `INSTALLED_APPS`:

      ``` python
      DJANGO_APPS = (
          'django.contrib.auth',
          'django.contrib.contenttypes',
          'django.contrib.sessions',
          'django.contrib.messages',
          'django.contrib.staticfiles',
      )

      EXTERNAL_APPS = (
          'corsheaders',
          'rest_framework',
          'celery',
          'phonenumber_field',
      )

      PROJECT_APPS = (
          'core',
          'lib.patient',
          'lib.study',
          'lib.convocation',
          'lib.dicom',
          'lib.file',
          'lib.ai',
          'api',
          'api_admin',
      )

      INSTALLED_APPS = DJANGO_APPS + EXTERNAL_APPS + PROJECT_APPS
      ```

## AppConfig

* À la racine de chaque application, doit se trouver un fichier `apps.py` contenant une classe qui hérite de `django.apps.AppConfig`

  ``` python
  # www/lib/patient/app.py
  from django.apps import AppConfig


  class LibPatientConfig(AppConfig):
      """
      Handles everything about patients
      """
      name = 'lib.patient'
      label = 'patient'
  ```

* Jusqu'à Django 3.2, il fallait également définir une variable `default_app_config` dans le fichier `__init__.py` pointant vers la classe à charger.  
  Désormais, si apps.py existe et définit une seule classe, alors cette variable n'est pas nécessaire.

  ``` python
  # www/core/__init__.py

  # This will make sure the app is always imported when
  # Django starts so that shared_task will use this app.
  from .celery import application as celery_app  # noqa

  default_app_config = 'core.apps.CoreConfig'
  ```

## Checks

* Lorsqu'on lance une commande avec manage.py, des vérifications sont lancées
  pour détecter les problèmes courants et fournir des conseils pour les résoudre.

  ![](https://i.imgur.com/w0AAgKW.png)
  ![](https://i.imgur.com/FPgBp8K.png)

  [Documentation: System check framework](https://docs.djangoproject.com/en/4.1/topics/checks/)

* Il est possible d'ajouter des vérifications personnalisées dans l'AppConfig:

  ``` python
  from django.apps import AppConfig
  from django.core import checks
  from django.conf import settings


  class CoreConfig(AppConfig):
      name = 'core'
      label = 'core'

      def ready(self):
          super().ready()
          checks.register()(check_storage)


  def check_storage(app_configs=None, **kwargs):
      """
      Writes an INFO message upon launching runserver or test

      :see https://docs.djangoproject.com/en/4.1/topics/checks/
      """

      # msg, hint=None, obj=None, id=None
      return [
          checks.Info(
              f'Default file storage: <{settings.DEFAULT_FILE_STORAGE}>.',
              hint='May or may not store uploaded files over the network depending on this setting.',
              id='core.I001',
          )
      ]
  ```
