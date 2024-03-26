---
title: Gettext
category: Python, Django, i18n
---

## Déclarer du texte traduisible

* `gettext` permet de déclarer du texte traduisible

  ``` diff
  from rest_framework.viewsets import GenericViewSet
  from rest_framework.response import Response
  from rest_framework.exceptions import ValidationError

  +from django.utils.translation import gettext as _

  class FileViewSet(GenericViewSet):
      def retrieve(self, request, *args, **kwargs):

          instance = self.get_object()

          if study.is_finalized:
  +           detail = _('The study associated to this file has already been finalized')
              raise ValidationError(detail=detail)

          serializer = self.get_serializer(instance)
          return Response(serializer.data)
  ```

* `ngettext` permet de pluraliser du texte traduisible

  ``` diff
  +from django.utils.translation import ngettext

  # ...
  +detail = ngettext(
      '{n} choice is invalid.',
      '{n} choices are invalid.', n).format(n=n)
  ```

* `gettext_lazy` permet de déclarer du texte traduisible,
  qui sera évalué non pas au moment où on le déclare mais au moment où on le convertit en chaîne de caractère.
  On s'en sert typiquement lorsqu'une chaîne de caractère se trouve dans une propriété de classe.

  ``` diff
  from rest_framework.permissions import BasePermission

  +from django.utils.translation import gettext_lazy as _


  class CanCreateStudy(BasePermission):
      """
      Is allowed to update this patient's studies?
      """
  +   message = _('Not allowed to update this patient’s studies')
  ```

## Configurations

* Définir le language par défaut, la liste des languages supportés, et l'emplacement des fichiers de traduction:

  <ins>www/core/settings/defaults.py</ins>

  ``` python
  import os
  from pathlib import Path


  # Build paths inside the project like this: BASE_DIR / 'subdir'.
  PROJECT_PATH = Path(__file__).resolve().parent.parent

  BASE_DIR = os.path.abspath(os.path.join(PROJECT_PATH, '..'))  # www
  ```

  ``` python
  # Internationalization
  # https://docs.djangoproject.com/en/3.2/topics/i18n/

  LANGUAGE_CODE = 'fr'
  LANGUAGES = (
      ('fr', 'Français'),
      ('en', 'English'),
  )
  USE_I18N = True
  LOCALE_PATHS = (
      os.path.join(BASE_DIR, 'locale'),
  )
  ```

## Générer les traductions

### Pré-requis

* Pré-requis: [Gettext](gettext.md) est utilisé pour gérer les traductions,  
  il est donc nécessaire d'installer le package sur le système

  ``` bash
  # install system dependencies
  apt update \
    && apt install -y gettext \
    # Cleanup apt cache
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
  ```

### Génération .po

* Pour créer les fichiers .po dans le répertoire `LOCALE_PATHS`:

  - Créer/mettre à jour un fichier de traduction  
    Sortie: `locale/[lang]/LC_MESSAGES.django.po`

    ``` bash
    python manage.py makemessages -l fr
    ```

  - Alternative: mettre à jour tous les fichiers de traduction

    ``` bash
    python manage.py makemessages --all
    ```

* <ins>Les fichiers .po</ins> sont les fichiers de traductions:  
  éditer leur contenu pour modifier une traduction (il faut ensuite le compiler en .mo)

### Génération .mo

* Compiler les fichiers .po en .mo:

  - Compiler les fichiers  
    Sortie: `locale/[lang]/LC_MESSAGES.django.mo`

    ``` bash
    python manage.py compilemessages [-l fr]
    ```

* <ins>Les fichiers .mo</ins> sont les fichiers compilés utilisés par le serveur durant l'exécution.  
  Il faut redémarrer le serveur pour que les changements des fichiers .mo soient pris en compte

## Changer de language

* `activate` permet de changer le language utilisé

  <ins>www/core/tests/test_environment.py</ins>

  ``` python
  from django.utils.translation import (
      gettext as _,
      get_language,
      activate,
  )
  from django.conf import settings
  from django.test import TestCase


  class EnvironmentTest(TestCase):

      def test_language(self):
          self.assertEqual(get_language(), settings.LANGUAGE_CODE)

          activate('en')
          self.assertEqual(_('Test translation'), 'Test translation')

          activate('fr')
          self.assertEqual(_('Test translation'), 'Test traduction')
  ```
