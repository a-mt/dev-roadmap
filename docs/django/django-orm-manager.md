---
title: Manager
category: Python, Django, ORM
---

## Manager

Il est possible d'écraser le manager par défaut en re-définissant la propriété `objects` du modèle.  

1. Créer un manager personnalisé: une classe héritant de `django.db.models.Manager`

    ``` python
    class DicomEntityManager(models.Manager):
        def create_from_header(self, header) -> tuple:
            """
            Get or create an instance using the provided header.

            :param DicomHeader header - Header instance to query this entity's information from
            :return Tuple[DicomEntity, bool] - dicom_entity, created
            """
            uid = header.get_entity_uid(self.model)
            try:
                existing = self.get(
                    uid=uid,
                    namespace_id=header.namespace_id,
                )
            except ObjectDoesNotExist:
                new_instance = self.model()
                new_instance.namespace_id = header.namespace_id
                new_instance.save(header=header)
                return new_instance, True
            else:
                return existing, False
    ```

2. Déclarer le manager du modèle dans la propriété `objects` du modèle:

    ``` python
    class DicomEntity(models.Model):
        # ...

        objects = DicomEntityManager()

        class Meta:
            base_manager_name = 'objects'
    ```

3. Récupérer le manager de la classe à partir de la propriété `objects`

    ``` python
    instance = DicomEntity.objects.create_from_header(header)
    ```

## Manager QuerySet

On peut également ajouter des fonctions au queryset du manager,
en créant la classe Manager à partir d'un QuerySet:

1. Créer un queryset personnalisé: une classe héritant de `django.db.models.QuerySet`

    ``` python
    from django.db import models

    class AIDecisionQuerySet(models.QuerySet):
        association_lookup_name = None

        def select_send_related(self):
            qs = self

            return (
                qs.select_related(
                    'patient',
                    'studyradiological',
                    'studyradiological__nodule_data1',
                    'studyradiological__nodule_data2',
                ).only(
                    'id',
                    'created_at',
                    'updated_at',
                    'status',
                    'is_enabled',
                    'patient_id',
                    'patient__gender',
                    'studyradiological',
                    'dicom_study_uid',
                    'dicom_series_uid',
                )
            )
    ```

2. Créer un manager à partir de ce queryset

    ``` python
    class AIDecisionManager(models.Manager.from_queryset(AIDecisionQuerySet)):
        use_in_migrations = True
    ```

3. Déclarer le manager de la classe

    ``` python
    class AIDecision(
        AIDecisionStatusChoicesMixin,
        models.Model,
    ):
        # ...

        objects = AIDecisionManager()

        class Meta:
            base_manager_name = 'objects'
    ```

4. Utiliser une méthode du queryset personnalisé, de la même manière que si c'était une méthode du queryset natif

    ``` python
    qs = AIDecision.objects.all().select_send_related()
    ```
