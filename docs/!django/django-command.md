---
title: Command
category: Python, Django
---

## Créer une Commande

* Pour créer une commande personnalisée, créer une classe héritant de `BaseCommmand` à l'intérieur du répertoire <ins>management/commands</ins> de n'importe quel module activé dans `INSTALLED_APPS`

  ``` python
  # core/management/commands/ma_commande.py
  from django.core.management.base import BaseCommand

  class Command(BaseCommand):
      help = 'Description of what my command does.'

      def handle(self, *args, **options):
        pass
  ```

* Pour l'appeler, simplement utiliser le nom du fichier:

  ``` bash
  python manage.py ma_commande
  ```

## Help

* On peut afficher l'aide d'une commande en passant l'option `--help`

  ```
  python manage.py ma_commande --help
  ```

* Ou on peut la déclencher à l'intérieur de la commande:

  ``` python
    def handle(self, *args, **options):
      self.print_help('manage.py', 'ma_commande')
  ```

## Entrées & sorties

* On peut écrire dans la console avec stderr et stdout

  ``` python
  self.stdout.write('')
  self.stdout.write('.', ending='')

  self.stderr.write(f"Please create the user '{email}'")

  self.stdout.write(f"'{user.email}' (#{user.id}) is waiting validation.")
  ```

* Pour ajouter de la couleur, utiliser un style
  (voir django.utils.termcolors)

  ``` python
  self.stdout.write(msg, self.style.WARNING, ending='')
  ```

  Notons qu'avec cette approche, il est possible de forcer l'utilisation des couleurs ou au contraire les désactiver, à partir de paramètres:

  ```
  --no-color
  --force-color
  ```

<details>
  <summary>
    <ins>www/core/management/commands/populate_medical_center.py</ins>
  </summary>
  <br>

  <pre lang="python">
  from django.core.management.base import BaseCommand

  from core.models.medical_center import MedicalCenter

  class Command(BaseCommand):
      """
      Usage: python manage.py populate_medical_center
      """
      help = 'Populate the database with init data for Medical Centers.'

      def handle(self, *args, **options):
          MedicalCenter.objects.all().delete()

          self.medical_center(
              name='CHU Nice',
              address_name='CHU DE NICE – Hôpital Pasteur 1',
              address_name_comp=(
                  'Service de Pneumologie – Oncologie Thoracique '
                  'et Soins Intensifs Respiratoires'
              ),
              address_text='30 Voie Romaine, 06000 Nice',
              finess='060785003',
              phone='04 92 03 77 67',
          )
          self.medical_center(
              name='Centre de radiologie Nice',
              address_text='Vallon de La Lauvette, 06300 Nice',
          )
          self.stdout.write('')

      def medical_center(self, **kwargs):
          MedicalCenter(**kwargs).save()

          self.stdout.write('.', ending='')
  </pre>
</details>

## Paramètres

* On peut accepter des paramètres en les déclarant dans `add_arguments`

  ``` python
   # Usage: python manage.py ma_commande [--email user@domaine.fr]

  def add_arguments(self, parser):
      parser.add_argument(
          '--email',
          type=str,
          default='jacques-boutros@dacapo.fr',
          help='Run for the given email',
      )

  def handle(self, *args, **options):
      email = options['email']
      if not email:
          return
  ```

  ``` python
   # Usage: python manage.py ma_commande [--ids 1 2 3]

  def add_arguments(self, parser):
      parser.add_argument(
          '--ids',
          nargs='+',
          type=int,
          default=None,
          help='Run only for the given IDs',
      )

  def handle(self, *args, **options):
      ids = options['ids']
  ```

  ``` python
   # Usage: python manage.py ma_commande --ids 1 2 3

  def add_arguments(self, parser):
      parser.add_argument(
          '--ids',
          nargs='+',
          type=int,
          help='Run only for the given IDs',
          required=True
      )
  ```

<details>
  <summary>
    <ins>www/core/management/commands/testset_user_unvalidate.py</ins>
  </summary>
  <br>

  <pre lang="python">
  from django.core.management.base import BaseCommand

  from core.models.user import User


  class Command(BaseCommand):
      help = 'Mark a user account as waiting validation'

      def add_arguments(self, parser):
          parser.add_argument(
              '--email',
              type=str,
              default='jacques-boutros@dacapo.fr',
              help='Run for the given email',
          )

      def handle(self, *args, **options):
          email = options['email']
          if not email:
              return

          try:
              user = User.objects.get(email=email)
          except User.DoesNotExist:
              self.stderr.write(f"Please create the user '{email}'")
              return

          self._update(user)

      def _update(self, user):
          user.is_active = False
          user.is_waiting_validation = True
          user.save(update_fields=[
              'is_active',
              'is_waiting_validation',
          ])

          self.stdout.write(f"'{user.email}' (#{user.id}) is waiting validation.")
  </pre>
</details>

## Progress bar

* On peut ajouter une progressbar avec tqdm

  ``` python
  from tqdm import tqdm

  # ...
  for record in tqdm(qs, desc='Update study'):
  ```

<details>
  <summary>
    <ins>www/lib/study/management/commands/resave_study.py</ins>
  </summary>
  <br>
  
  <pre lang="python">
  from tqdm import tqdm

  from django.core.management.base import BaseCommand

  from lib.study.models import Study


  class Command(BaseCommand):
      help = 'Resave all studies to process pre/post save hooks again'

      def add_arguments(self, parser):
          parser.add_argument(
              '--ids',
              nargs='+',
              type=int,
              default=None,
              help='Run only for the given IDs',
          )

      def handle(self, *args, **options):
          if ids := options['ids']:
              qs = Study.objects.filter(id__in=ids)
          else:
              qs = Study.objects.all()

          for record in tqdm(qs, desc='Update study'):
              record.save()
  </pre>
</details>

## Écraser une commande

* Il est possible d'écraser une commande native à Django en créant une commande de même nom

<details>
  <summary>
    <ins>www/core/management/commands/makemessages.py</ins>
  </summary>
  <br>

  <pre lang="python">
  from django.core.management.commands import makemessages


  class Command(makemessages.Command):
      msgmerge_options = ['-q', '--previous', '--no-fuzzy-matching']
  </pre>
</details>

## assertStatus

* `assertStatus` permet de vérifier que le statut d'une requête effectuée est valide (< 400).
  Sinon, la commande échoue avec le message d'erreur indiqué

  ``` diff
  import json

  from django.urls import reverse
  from rest_framework.test import APIClient


  class Command(BaseCommand):
      help = 'Set an AI decision'

      def handle(self, *args, **options):
          ...

          self.client = APIClient(enforce_csrf_checks=False)

          user = self.get_user(email_admin)
          self.authenticate(user)

    def authenticate(self, user):
        """
        Authenticate user
        """
        self.client.force_authenticate(user=user)

        response = self.client.get(
            reverse('api:user-auth-is-authenticated'),
        )
  +     self.assertStatus(response, 204, 'Could not authenticate')
        self.stdout.write('.', ending='')
  ```
