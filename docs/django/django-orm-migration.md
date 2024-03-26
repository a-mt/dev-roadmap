---
title: Migration
category: Python, Django, ORM
---

## Créer des migrations

* Une migration est un script permettant de mettre à jour le schéma de la BDD.  
  Il est nécessaire de créer des migrations (et les lancer) pour créer les tables associées aux modèles.

* Pour créer la ou les migrations permettant de réfleter les changements de modèle, on utilise la commande suivante:

  ``` bash
  $ python manage.py makemigrations
  ```

  On obtiendra ce type de fichier:

<details>
  <summary>
    <ins>www/core/migrations/0001_initial.py</ins>
  </summary>
  <br>

  <pre lang="python">
  from django.db import migrations, models


  class Migration(migrations.Migration):

      initial = True

      dependencies = [
      ]

      operations = [
        migrations.CreateModel(
            name='Search',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=255, verbose_name='text')),
                ('weight', models.PositiveSmallIntegerField(default=1, verbose_name='weight')),
            ],
            options={
                'ordering': ['-pk'],
                'base_manager_name': 'objects',
            },
            managers=[
                ('objects', core.models.search.Manager()),
            ],
        ),
      ]
  </pre>
</details>

<details>
  <summary>
    <ins>www/core/migrations/0002_auto_20230209_1642.py</ins>
  </summary>
  <br>

  <pre lang="python">
  from django.conf import settings
  from django.db import migrations, models
  import django.db.models.deletion


  class Migration(migrations.Migration):

      dependencies = [
          ('core', '0001_initial'),
          ('auth', '0012_alter_user_first_name_max_length'),
      ]

      operations = [
        migrations.AddField(
            model_name='search',
            name='source',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='searches', to=settings.AUTH_USER_MODEL),
        ),
      ]
  </pre>
</details>

* Notons que pour qu'un modèle soit connu de Django, et donc pris en compte dans les migrations, il faut

  1. que l'application dans laquelle le modèle se trouve soit activée dans les configurations

      ``` python
      # Looks for models and locales of installed apps
      INSTALLED_APPS = (
          ...
          'lib.study',
      )
      ```

  2. que la classe (qui hérite de Model) soit présente dans `APPNAME.models` — ou importée à partir de ce fichier, ou encore importée par récursion

      <ins>core/models/__init__.py</ins>:

      ``` python
      # flake8: noqa
      from .search import Search
      ```

  3. et enfin, le répertoire `migrations` de l'application doit exister.  
     S'il n'existe pas déjà, alors passer le label de l'application en paramètre de `makemigrations` pour créer le répertoire et la migration initiale

      ``` bash
      $ python manage.py makemigrations study
      ```

## Vérifier les migrations

* Lister les migrations et leur statut (appliquée ou non)

  ``` bash
  $ python manage.py showmigrations
  ```

* Vérifier s'il y a des migrations à lancer

  ``` bash
  $ python manage.py migrate --check
  ```

* Afficher les requêtes SQL d'une migration

  ``` bash
  $ python manage.py sqlmigrate core 0001_initial
  ```

## Appliquer les migrations

* Pour lancer les migrations:

  ``` bash
  $ python manage.py migrate
  ```

  Notons que la liste des migrations appliquées sont sauvegardées en BDD, dans la table `django_migrations`.  
  Seules les migrations dont le nom n'est pas déjà présent dans cette table seront lancées

---

## Syntaxe d'une migration

* On peut très bien éditer (ou créer manuellement) une migration  
  pour personnaliser le processus de mise à jour de la BDD.

### CreateModel

* **CreateModel**  
  Permet de créer une table

  ``` python
  migrations.CreateModel(
      name='Study',
      fields=[
          ('id', models.AutoField(primary_key=True, serialize=False)),
          ('created_at', models.DateTimeField(auto_now_add=True, db_index=True)),
      ],
      options={
          'ordering': ['created_at', 'pk'],
          'base_manager_name': 'objects',
      },
  ),
  ```
  ``` python
  migrations.CreateModel(
      name='StudyMedicalBloodTest',
      fields=[
          ('blood_test_id', models.AutoField(primary_key=True, serialize=False)),
      ],
      options={
          'abstract': False,
      },
      bases=(lib.study.choices.study_medical.BloodTestStatusMixin, models.Model),
  ),
  ```

### AlterModelOptions

* **AlterModelOptions**   
  Permet de modifier les options d'un modèle  
  Notons que certaines options n'aurons aucune incidences sur la BDD, uniquement sur le comportement de Django

  ``` python
  migrations.AlterModelOptions(
      name='study',
      options={
        'base_manager_name': 'objects',
        'ordering': ['created_at', 'pk'],
      },
  ),
  ```

### AddField

* **AddField**  
  Permet d'ajouter un champ

  ``` python
  migrations.AddField(
      model_name='studymcm',
      name='context_other_comment',
      field=models.TextField(blank=True, max_length=2048, verbose_name='comments'),
  ),
  ```

### RenameField

* **RenameField**  
  Permet de renommer un champ

  ``` python
  migrations.RenameField(
      model_name='studymcm',
      old_name='date',
      new_name='mcm_date',
  ),
  ```

### AlterField

* **AlterField**  
  Permet de modifier un champ

  ```python
  migrations.AlterField(
      model_name='study',
      name='id',
      field=models.AutoField(primary_key=True, serialize=False),
  ),
  ```

### RemoveField

* **RemoveField**  
  Permet de supprimer un champ

  ``` python
  migrations.RemoveField(
      model_name='studyradiologicalnodule',
      name='density_is_mixed',
  ),
  ```

### RunSQL

* **RunSQL**  
  Permet de lancer une requête SQL tel-que

  ``` python
  migrations.RunSQL(
      r'''
      UPDATE study_studymedical
      SET
          studymedicalinclusion_ptr_id = study_ptr_id,
          studymedicalclinicaldata_ptr_id = study_ptr_id;
      '''
  ),
  ```
  ``` python
  migrations.RunSQL(
      r"""
      WITH objects AS (
          -- OCS list
          SELECT treatment_id, json_agg(data) as data_list
          FROM (
              -- OCS item: prednisolone
              (
                  SELECT json_build_object(
                      'vidal_id', 2912,
                      'quantity', treatment_drugs_ocs_prednisolone_quantity,
                      'duration', treatment_drugs_ocs_prednisolone_duration
                  ) as data, treatment_id
                  FROM asthma_initial_asthmainitialrecordtreatment as a
                  WHERE treatment_drugs_ocs_prednisolone='t'
              )
              UNION ALL
              -- OCS item: prednisone
              (
                  SELECT json_build_object(
                      'vidal_id', 2913,
                      'quantity', treatment_drugs_ocs_prednisone_quantity,
                      'duration', treatment_drugs_ocs_prednisone_duration
                  ) as data, treatment_id
                  FROM asthma_initial_asthmainitialrecordtreatment as a
                  WHERE treatment_drugs_ocs_prednisone='t'
              )
          ) x
          GROUP BY x.treatment_id
      )
      UPDATE asthma_initial_asthmainitialrecordtreatment t
          SET treatment_drugs_ocs_list = x.data_list
          FROM objects x
          WHERE t.treatment_id = x.treatment_id
      RETURNING t.treatment_id;
      """
  ),
  ```

### RunPython

* **RunPython**  
  Permet de lancer du code python pendant la migration

  ``` python
  import django.core.serializers.json
  from django.db import migrations, models
  from django.core.management import call_command
  
  
  def resave_study(apps, schema_editor):
      # management command, that can be launched with `python manage.py resave_study`
      call_command('resave_study')
  
  
  class Migration(migrations.Migration):
  
      dependencies = [
          ('study', '0011_auto_20221220_1809'),
      ]
  
      operations = [
          migrations.RunPython(resave_study, migrations.RunPython.noop),
      ]
  ```

  ``` python
  from django.db import migrations, models
  
  def resave_study(apps, schema_editor):
      queryset = (
          apps
          .get_model('study', 'Study')
          .objects
          .all()
          .order_by('patient_id', 'polymorphic_ctype', 'id')
      )
      patient_id = None
      increment = {}
  
      for record in queryset:
          if record.patient_id != patient_id:
              increment = {}
              patient_id = record.patient_id
  
          pid = record.polymorphic_ctype_id
          rel_step_number = increment.get(pid, 0) + 1
          increment[pid] = rel_step_number
  
          record.rel_step_number = rel_step_number
          record.save(update_fields=[
              'rel_step_number',
          ])
  
  
  class Migration(migrations.Migration):
  
      dependencies = [
          ('study', '0008_study_rel_step_number'),
      ]
  
      operations = [
          migrations.RunPython(resave_study, migrations.RunPython.noop),
      ]
  ```
