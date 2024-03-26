---
title: Hooks
category: Python, Django, ORM
---

Divers signaux sont déclenchés lors du cycle de vie d'une instance de modèle

## pre_save

* Le signal `pre_save` est déclenché avant que l'entité ne soit sauvegardée en BDD

  ``` python
  def is_save_update_partial(kwargs):
      x = kwargs.get('update_fields', None)

      # If we trigger save with update_fields we use a list — entity.save(update_fields=[...])
      # save gets triggered with a frozenset when the object is partially loaded (queryset with `only` clause)
      if x is None or isinstance(x, frozenset):
          return False
      return True
  ```

  ``` python
  from django.db.models.signals import pre_save
  from django.dispatch import receiver
  from core.signals import is_save_update_partial


  @receiver(pre_save, sender=User)
  def on_pre_save(sender, instance, **kwargs):
      if is_save_update_partial(kwargs):
          return

      instance._compute_auto_fields()
  ```

## post_save

* Le signal `post_save` est déclenché après que l'entité ait été sauvegardée en BDD

  ``` python
  from django.db.models.signals import post_save
  from django.dispatch import receiver
  from core.signals import is_save_update_partial


  @receiver(post_save, sender=User)
  def on_post_save(sender, instance, **kwargs):
      if is_save_update_partial(kwargs):
          return

      # Launch search update
      search.delay(instance.id)
  ```

## pre_delete

Le signal `pre_delete` est déclenché avant la suppression d'une entité

``` python
from django.db.models.signals import pre_delete


@receiver(pre_delete, sender=QuestionnaireRecord)
def update_questionnaire_log(sender, instance, **kwargs):
    """
    When questionnaire record gets deleted:
    Set error flag to DELETED to the related log
    """
    QuestionnaireLog.objects.filter(record_id=instance.id).update(
        record_id=None,
        error_reason=QuestionnaireLog.ERROR_DELETED,
    )
```

## m2m_changed

Le signal `m2m_changed` est déclenché lorsqu'on met à jour une relation ManyToMany

* Déclaration du modèle + hook

  ``` python
  from django.contrib.auth.models import AbstractBaseUser
  from django.core.serializers.json import DjangoJSONEncoder
  from django.db import models
  from django.db.models.signals import m2m_changed
  from django.dispatch import receiver

  from .medical_center import MedicalCenter


  class User(AbstractBaseUser):
      # ...

      medical_centers = models.ManyToManyField(
          MedicalCenter,
          related_name='users',
      )
      medical_centers_ids = models.JSONField(
          encoder=DjangoJSONEncoder,
          default=list,
          help_text='Denormalized IDs of associated medical centers',
          editable=False,
      )

      def set_medical_centers_ids(self, ids):
          """
          :param list ids
          """
          self.medical_centers_ids = ids

          setattr(self, 'needs_resave', True)

      def save_m2m(self):
          if getattr(self, 'needs_resave', False):
              self.save(update_fields=['medical_centers_ids'])

  @receiver(m2m_changed, sender=User.medical_centers.through)
  def update_medical_centers(sender, instance, action=None, pk_set=None, **kwargs):
      match action:
          case 'post_clear':
              instance.set_medical_centers_ids([])

          case 'post_add':
              ids = set(instance.medical_centers_ids)
              ids.update(pk_set)

              instance.set_medical_centers_ids(list(ids))

          case 'post_remove':
              ids = set(instance.medical_centers_ids)
              ids.difference_update(pk_set)

              instance.set_medical_centers_ids(list(ids))

  ```

* Déclenchement automatique d'un hook m2m_changed

  ``` python
  with transaction.atomic():
      user = User.objects.create_user(**user_data)

      if medical_centers and len(medical_centers):
          user.medical_centers.set(medical_centers)  # déclenche le hook m2m_changed
          user.save_m2m()
  ```

* Déclenchement manuel d'un hook m2m_changed

  ``` python
  from django.db import models
  from django.db.models.signals import pre_delete, m2m_changed
  from django.dispatch import receiver


  class MedicalCenter(models.Model):
      # ...


  @receiver(pre_delete, sender=MedicalCenter)
  def pre_delete_medical_center(sender, instance, **kwargs):
      users = instance.users.only('id', 'medical_centers_ids')

      for user in users:
          # déclenche le hook m2m_changed
          m2m_changed.send(
              sender=user.medical_centers.through,
              action='post_remove',
              instance=user,
              pk_set={instance.pk},
          )
          user.save_m2m()
  ```

## post_migrate

* `post_migrate` est lancé après chaque lancement de la commande `migrate`

  ``` python
  from django.db.models.signals import post_migrate
  from django.core.management.color import color_style


  @receiver(post_migrate)
  def rebuild_handler(sender, **kwargs):

      if sender.name != "colibri.admin.export":
        return

      style = color_style()
      export_migrations_applied = bool([
        migration[0]
        for migration in kwargs.get("plan")
        if migration[0].app_label == "export"
      ])
      if export_migrations_applied:
          sys.stdout.write("  Rebuilding all export node trees...")
          sys.stdout.flush()

          PIDInitialExportNode.objects.rebuild()
          PIDTrackingExportNode.objects.rebuild()
          ReeducationProgramExportNode.objects.rebuild()

          sys.stdout.write("\b\b\b:" + style.SUCCESS(" OK") + "\n")
  ```

## Hooks personnalisé

* On peut créer un signal personnalisé avec `ModelSignal`:

  <ins>core/signals/patient.py</ins>:

  ``` python
  from django.dispatch import Signal
  from django.db.models.signals import ModelSignal

  patient_death_updated = ModelSignal(
      use_caching=True,
  )
  ```

* Déclarer un receiver à partir de ce signal:

  <ins>core/models/patient.py</ins>:

  ``` python
  from core.signals.patient import patient_death_updated


  @receiver(patient_death_updated)
  def register_patient_death(sender, instance, was_alive, **kwargs):
      if instance.is_alive == was_alive:
          return

      update_patient_death.delay(instance.pk, instance.is_alive)
  ```

* Déclencher ce signal:

  <ins>core/views/patient.py</ins>:

  ``` python
  def update_death_information(self, serializer):
      was_alive = self.object.is_alive

      with transaction.atomic():
          ...

      signals.patient_death_updated.send(
          sender=PatientDeathView,
          instance=self.object,
          was_alive=was_alive,
      )
  ```
