---
title: Queryset
category: Python, Django, ORM
---

## QuerySet

* Un objet `QuerySet` est utilisé pour construire les requêtes SQL d'un modèle avec l'ORM.  
  On crée un queryset en accédant à la propriété `objects` d'un modèle (ce qui correspond à une instance de `Manager`).

  Différentes méthodes d'un queryset peuvent être chainées à la suite,  
  elle n'exécutent pas réellement la requête, mais configurent la requête à exécuter lorsque le queryset sera évalué, c'est à dire lorsqu'on essaiera de récupérer le résultat — par exemple si on itère sur le queryset avec un `for` ou si on le convertit en `list`

  ``` python
  qs = Patient.objects.all()
  print(type(qs))       # <class 'lib.patient.models.patient.PatientQuerySet'>

  qs = qs.filter(is_archived=False)
  print(type(qs))       # <class 'lib.patient.models.patient.PatientQuerySet'>

  patient = qs.first()
  print(type(patient))  # <class 'lib.patient.models.patient.Patient'>

  '''
  SELECT * FROM patient LIMIT 1;
  '''
  ```

  [QuerySet API reference](https://docs.djangoproject.com/en/dev/ref/models/querysets/)

### Cache

* La première fois qu'un querySet est évalué (et donc qu'une requête en BDD est effectuée),  
  Django enregistre les résultats dans le cache du QuerySet.  
  Les prochaines évaluations réutilisent les résultats mis en cache

  - Exemple 1. créer deux querysets:

      ``` python
      print([e.firstname for e in Patient.objects.all()])
      print([e.lastname for e in Patient.objects.all()])

      '''
      SELECT * FROM patient;
      SELECT * FROM patient;
      '''
      ```

  - Exemple 2. réutiliser le même queryset:

      ``` python
      qs = Patient.objects.all()

      print([e.firstname for e in qs])
      print([e.lastname for e in qs])

      '''
      SELECT * FROM patient;
      '''
      ```

* Limiter le queryset avec du array-slicing ne crée pas de cache

  ``` python
  qs = Entry.objects.all()

  print(qs[5])                   # requête & jète le résultat
  print([entry for entry in qs]) # requête & cache le résultat
  print(qs[5])                   # utilise le cache
  ```

* On peut vider le cache manuellement:

  ``` python
  qs._result_cache = None
  ```

### Async

* Itérer sur un queryset (avec un `for`) résulte en une requête bloquante en BDD,  
  car Django charge les résultats à l'itération. Pour résoudre ce problème, on peut utiliser la méthode async

  ``` python
  async for entry in Authors.objects.filter(name__startswith="A"):
      ...
  ```

* Les méthodes telles que `get()` et `first()` forcent l'exécution du queryset et sont bloquantes.  
  De manière générale, les méthodes qui retournent un queryset sont non bloquantes,  
  tandis que les méthodes qui retournent un résultat sont bloquantes en BDD.

---

## Récupérer le résultat

Une fois la requête construite, il y a différentes manières de récupérer le résultat:

### cast

* Caster le résultat en liste ou boucler desus

    ``` python
    qs = Patient.objects.all()

    print([entry for entry in qs])
    print(list(qs))
    '''
    SELECT * FROM patient;
    '''
    ```

### exists

* `exist` retourne un booléen permettant de vérifier s'il existe une valeur correspondant au filtre  
  Notons qu'il déclenche l'execution qu queryset — on effectue une requête en BDD immédiatement

  ``` python
  qs = Patient.objects.filter(pk=patient_id)
  res = qs.exists()

  print(type(res))
  ```

### count

* `count` permet de récupérer le nombre de valeurs correspondant au filtre

  ``` python
  qs = Patient.objects.filter(created_by_id=user_id)
  res = qs.count()

  print(type(res))
  ```

### get

* `get` permet de récupérer une instance  
  S'il n'y a aucun résultat, une erreur est levée; de même que s'il y a plusieurs résultats

  ``` python
  from django.core import exceptions

  try:
    qs = (
      Patient
      .objects
      .all()
      .select_related('created_by')
    )
    instance = qs.get(pk=patient_id)

    print(type(instance))

  except exceptions.ObjectDoesNotExist:
    print(f'Patient #{patient_id} does not exist')

  except exceptions.MultipleObjectsReturned:
    print(f'More than one Patient match this criteria!')

  '''
   SELECT patient.*, user.*
   FROM patient
   LEFT OUTER JOIN user ON (patient.created_by_id = user.id)
   WHERE patient.id = 7701;
   '''
  ```

### first

* `first` permet de récupérer une instance  
  S'il n'y a aucun résultat, la fonction retourne None; s'il y en a plusieurs, seule la première entité est récupérée

  ``` python
  qs = (
    Patient
    .objects
    .all()
    .select_related('created_by')
  )
  instance = qs.filter(pk=patient_id).first()

  print(type(instance))

  if instance is None:
    print(f'Patient #{patient_id} does not exist')

  '''
  SELECT patient.*, user.*
  FROM patient
  LEFT OUTER JOIN user ON (patient.created_by_id = user.id)
  WHERE patient.id = 7701
  ORDER BY patient.id DESC
  LIMIT 1;
  '''
  ```

### last

* Même principe que `first` mais retourne la dernière entité s'il y a plusieurs résultats

  ``` python
  qs = (
    Patient
    .objects
    .all()
    .select_related('created_by')
  )
  instance = qs.filter(pk=patient_id).last()

  print(type(instance))

  if instance is None:
    print(f'Patient #{patient_id} does not exist')

  '''
  SELECT patient.*, user.*
  FROM patient
  LEFT OUTER JOIN user ON (patient.created_by_id = user.id)
  WHERE patient.id = 7701
  ORDER BY patient.id ASC
  LIMIT 1;
  '''
  ```

### values

* `values` permet de récupérer les résultats sous forme de dictionnaires et non d'instances de classe

  ``` python
  qs = Patient.objects.all()

  print(list(qs.values())[:2])
  # [{'id': 1100, 'created_at': datetime.datetime(2023... ]
  ```

  ``` python
  qs = Patient.objects.all()

  print(list(qs.values('id'))[:2])
  # [{'id': 1100}, {'id': 1099}]
  ```

### values list

* `values_list` permet de récupérer les résultats sous forme de listes et non d'instances de classe

  ``` python
  qs = Patient.objects.all()

  print(list(qs.values_list())[:2])
  # [(1100, datetime.datetime... ]
  ```

  ``` python
  qs = Patient.objects.all()

  print(list(qs.values_list('id'))[:2])
  # [(1100,), (1099,)]
  ```

* Si on ne récupère qu'un seul attribut, on peut utiliser l'option `flat` pour récupérer une liste de valeur au lieu d'une liste de listes

  ``` python
  qs = Patient.objects.all()

  print(list(qs.values_list('id', flat=True))[:2])
  # [1100, 1099]
  ```

---

## Exécuter une action

### create

* `create` permet de créer une instance

  ``` python
  instance = Patient.objects.create(
      created_by=self.request.user,
      **kwargs,
  )
  ```

### bulk create

* `bulk_create` permet de créer des instances en masse

  ``` python
  acl_list = [
      PatientACL(
          patient=instance,
          user=self.request.user,
          permission=PatientACL.PERMISSION_EXECUTE,
          role=PatientACL.ROLE_REFERENT_DOCTOR,
      )
  ]
  if medical_center:
      acl_list.append(
          PatientACL(
              patient=instance,
              group=medical_center,
              permission=PatientACL.PERMISSION_WRITE,
              role=PatientACL.ROLE_REFERENT_CENTER,
          )
      )
  PatientACL.objects.bulk_create(acl_list, ignore_conflicts=True)
  ```

### delete

* `delete` permet de supprimer des instances

  ``` python
  Patient.objects.filter(created_by=user).delete()
  ```

### update

* `update` permet de mettre à jour des instances

  ``` python
  Patient.objects.filter(id=patient_id).update(
      medical_center_id=new_medical_center_id,
  )
  """
  UPDATE patient
  SET medical_center_id = 1
  WHERE id = 1
  """
  ```

  ``` python
  from django.db.models import F

  qs = (
      FileScanner.objects.filter(
          dicom_namespace_id=dicom_namespace_id,
      )
  )
  if success:
      n_updated = qs.update(n_dicom_image=F('n_dicom_image')+1)
  else:
      n_updated = qs.update(n_dicom_invalid=F('n_dicom_invalid')+1)

  """
  UPDATE filescanner
  SET n_dicom_image = n_dicom_image+1
  WHERE dicom_namespace_id = 1
  """
  ```

### update or create

* `update_or_create` permet de créer ou mettre à jour (upsert) des instances

  ``` python
  PatientACL.objects.update_or_create(
      patient_id=instance.id,
      role=PatientACL.ROLE_REFERENT_CENTER,
      defaults=dict(
          group_id=new_medical_center_id,
          permission=PatientACL.PERMISSION_WRITE,
      )
  )
  """
  # --- PatientACL non existant:
  SELECT *
  FROM patientacl
  WHERE (patient_id = 1 AND role = 2)
  LIMIT 21 FOR UPDATE

  INSERT INTO patientacl (created_at,  patient_id,  user_id,  group_id,  permission,  role)
  VALUES ('2023-04-17T18:02:25.890551+00:00'::timestamptz,  1,  NULL,  1,  2,  2)
  RETURNING id

  # --- PatientACL existant:
  SELECT *
  FROM patientacl
  WHERE (patient_id = 1 AND role = 2)
  LIMIT 21 FOR UPDATE

  UPDATE patient_patientacl
  SET
    created_at = '2023-04-17T18:02:25.890551+00:00'::timestamptz,
    patient_id = 1,
    user_id = NULL,
    group_id = 1,
    permission = 2,
    user_id = NULL,
    role = 2
  WHERE.id = 2201
  """
  ```

---

## Actions meta

### transaction

* `transaction` permet d'exécuter plusieurs requêtes au sein d'une transaction:
  si une requête échoue, toutes les requêtes dans la transaction seront rollback

  ``` python
  from django.db import transaction

  with transaction.atomic():
  ```

### aggregation

* Appeler `get_aggregation` sur la query du queryset permet d'exécuter une aggrégation globale

  ``` python
  from django.db.models import Count, Q

  qs = Patient.objects.filter(is_archived=False)

  query = qs.query

  query.add_annotation(
      Count('*'),
      alias='count',
      is_summary=True,
  )
  query.add_annotation(
      Count('id', filter=Q(is_matching_criteria=False)),
      alias='count_excluded',
      is_summary=True,
  )
  query.add_annotation(
      Count('id', filter=(
          Q(is_matching_criteria=True) & (
              Q(current_step_waiting_creation=False) |
              Q(current_step_number__lt=3)
          )
      )),
      alias='count_to_finalize',
      is_summary=True,
  )

  res = query.get_aggregation(qs.db, [
      'count',
      'count_excluded',
      'count_to_finalize',
  ])
  print(res)
  # {'count': 1100, 'count_excluded': 0, 'count_to_finalize': 1100}

  """
  SELECT
    COUNT(*) AS count,
    COUNT(id) FILTER (WHERE NOT is_matching_criteria) AS count_excluded,
    COUNT(id) FILTER (WHERE (
      is_matching_criteria
      AND (
        NOT current_step_waiting_creation
        OR current_step_number < 3
      )
    )) AS count_to_finalize
    FROM patient
    WHERE NOT is_archived
  """
  ```
