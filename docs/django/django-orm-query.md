---
title: Query
category: Python, Django, ORM, Queryset
---

## WHERE

### all

* `all` permet de récupérer l'ensemble des objets d'une classe donnée

  ``` python
  qs = (
    Patient.objects.all()
  )
  print(list(qs))

  '''
  SELECT *
  FROM patient;
  '''
  ```

### filter

* `filter` permet de filtrer les objets d'une classe donnée sur un ou plusieurs critères

  ``` python
  qs = (
    Patient.objects.filter(is_archived=False)
  )
  '''
  SELECT *
  FROM patient
  WHERE NOT is_archived;
  '''
  ```

#### functions

* Il est possible d'appliquer des fonctions dans filter

  ``` python
  qs = Patient.objects.all()

  if '@' in search:
      qs = qs.filter(email__istartswith=search)
  else:
      qs = qs.filter(lastname__icontains=f' {search}')

  '''
  SELECT *
  FROM patient
  WHERE UPPER(email::text) LIKE UPPER('alice@yopmail.com%');
  '''
  ```

  ``` python
  from django.utils import timezone

  value = timezone.now()

  qs = Patient.objects.filter(created_at__lt=value)
  '''
  SELECT *
  FROM patient
  WHERE created_at < '2022-31-12T14:59:45.506525+00:00'::timestamptz;
  '''
  ```

  ``` python
  qs = Patient.objects.filter(id__in=[1, 2])
  '''
  SELECT *
  FROM patient
  WHERE id IN (1,  2);
  '''
  ```

  ``` python
  qs = Patient.objects.filter(created_by__isnull=True)
  '''
  SELECT *
  FROM patient
  WHERE created_by_id IS NULL;
  '''
  ```

  [Fonctions](https://www.w3schools.com/django/django_ref_field_lookups.php)

  | Python | SQL |
  |--- |---
  | `firstname__contains='li'` | `firstname::text LIKE '%li%'`
  | `firstname__icontains='li'` | `UPPER(firstname::text) LIKE UPPER('%li%')`
  | `firstname__endswith='ice'` | `firstname::text LIKE '%ice'`
  | `firstname__iendswith='ice'` | `UPPER(firstname::text) LIKE UPPER('%ice')`
  | `firstname__startswith='ali'` | `firstname::text LIKE 'ali%'`
  | `firstname__istartswith='ali'` | `UPPER(firstname::text) LIKE UPPER('ali%')`
  | `firstname__exact='alice'` | `firstname = 'alice'`
  | `firstname__iexact='alice'` | `UPPER(firstname::text) = UPPER('alice')`
  | `firstname__regex='^a.*e$'` | `firstname::text ~ '^a.*e$'`
  | `firstname__iregex='^a.*e$'` | `firstname::text ~* '^a.*e$'`
  | `firstname__isnull=True` | `firstname IS NULL`
  ||
  | `id__in=[1,10]` | `id IN (1,  10)`
  | `id__range=[1,10]` | `id BETWEEN 1 AND 10`
  | `id__gt=10` | `id > 10`
  | `id__gte=10` | `id >= 10`
  | `id__lt=10` | `id < 10`
  | `id__lte=10` | `id <= 10`
  ||
  | `created_at__time='23:59:58'` | `(created_at AT TIME ZONE 'Europe/Paris')::time = '23:59:58'::time`
  | `created_at__hour=23` | `EXTRACT('hour' FROM created_at AT TIME ZONE 'Europe/Paris') = 23`
  | `created_at__minute=59` | `EXTRACT('minute' FROM created_at AT TIME ZONE 'Europe/Paris') = 59`
  | `created_at__second=58` | `EXTRACT('second' FROM created_at AT TIME ZONE 'Europe/Paris') = 58`
  ||
  | `created_at__date='2022-12-31'` | `(created_at AT TIME ZONE 'Europe/Paris')::date = '2022-12-31'::date`
  | `created_at__day=31` | `EXTRACT('day' FROM created_at AT TIME ZONE 'Europe/Paris') = 31`
  | `created_at__month=12` | `EXTRACT('month' FROM created_at AT TIME ZONE 'Europe/Paris') = 12`
  | `created_at__quarter=4` | `EXTRACT('quarter' FROM created_at AT TIME ZONE 'Europe/Paris') = 4`
  | `created_at__week=52` | `EXTRACT('week' FROM created_at AT TIME ZONE 'Europe/Paris') = 52`
  | `created_at__week_day=7` | `EXTRACT('dow' FROM created_at AT TIME ZONE 'Europe/Paris') + 1 = 7`
  | `created_at__year=2022` | `created_at BETWEEN '2022-01-01T00:00:00+01:00'::timestamptz AND '2022-12-31T23:59:59.999999+01:00'::timestamptz`


#### logique ET, OU

* Si on définit plusieurs critères, une logique ET est appliquée

  ``` python
  qs = Patient.objects.filter(
      is_matching_criteria=True,
      current_step_waiting_creation=False,
  )
  '''
  SELECT *
  FROM patient
  WHERE (NOT current_step_waiting_creation AND is_matching_criteria);
  '''
  ```

* Pour appliquer une logique plus complexe, on peut utiliser des instances Q (comme query) avec les opérateurs unaires

  ``` python
  from django.db.models import Q

  qs = Patient.objects.filter(
      Q(is_matching_criteria=True) & (
          Q(current_step_waiting_creation=False) |
          Q(current_step_number__lt=3)
      )
  )
  '''
  SELECT *
  FROM patient
  WHERE (is_matching_criteria AND (NOT current_step_waiting_creation OR current_step_number < 3));
  '''
  ```

  ``` python
  import shlex

  from django.db.models import Q

  condition = Q()
  for x in shlex.split(search):
      term = name_normalize(x)

      condition |= Q(firstname_norm__startswith=term)
      condition |= Q(lastname_norm__startswith=term)

  qs = Patient.objects.filter(condition)
  '''
  SELECT *
  FROM patient
  WHERE (
    firstname_norm::text LIKE 'john%'
    OR lastname_norm::text LIKE 'john%'
    OR firstname_norm::text LIKE 'doe%'
    OR lastname_norm::text LIKE 'doe%'
  );
  '''
  ```

#### relation

* On peut filtrer sur une foreign key

  - en passant directement l'objet

    ``` python
    qs = Patient.objects.filter(
        created_by=self.request.user,
    )
    '''
    SELECT *
    FROM patient
    WHERE created_by_id = 1;
    '''
    ```

  - si l'objet passé est un LazyObject (une entité dont on n'a pas récupéré les attributs),  
    alors une requête supplémentaire sera effectuée en BDD pour récupérer les attributs de cet objet lorsqu'on essaie d'y accéder

    ``` python
    item = Patient.objects.all().first()

    qs = Patient.objects.filter(
        created_by=item.created_by,
    )
    '''
    # Get patient
    SELECT *
    FROM patient
    LIMIT 1;

    # Load patient.created_by
    SELECT *
    FROM user
    WHERE user.id = 1;

    # List patients associated to the same created_by
    SELECT *
    FROM patient
    WHERE created_by_id = 1;
    '''
    ```

  - ou on peut passer directement l'identifiant de la foreign key en suffixant le champ par `_id`,  
    ce qui évite de requêter l'entité en BDD si elle n'est pas chargée

    ``` python
    item = Patient.objects.all().first()

    qs = Patient.objects.filter(
        created_by_id=item.created_by_id,
    )
    '''
    # Get item
    SELECT *
    FROM patient
    LIMIT 1;

    # List patients
    SELECT *
    FROM patient
    WHERE created_by_id = 1;
    '''
    ```

* On peut également filtrer sur l'attribut d'une foreign key, dans ce cas un JOIN sera automatiquement ajouté

    ``` python
    qs = Patient.objects.filter(
        created_by__email='alice@yopmail.com',
    )
    '''
    SELECT patient.*
    FROM patient
    INNER JOIN user ON (patient.created_by_id = user.id)
    WHERE user.email = 'alice@yopmail.com';
    '''
    ```

#### subquery

* On peut filtrer un attribut sur une sous-requête — WHERE IN SELECT  
  Pour plus de performances, utiliser annotate pour effectuer un JOIN SELECT à la place

  ``` python
  ids = (
      PatientACL
      .objects
      .filter(user=self.request.user)
      .values_list('patient_id', flat=True)
  )
  qs = Patient.objects.filter(id__in=ids)
  '''
  SELECT *
  FROM patient
  WHERE id IN (
    SELECT patient_id
    FROM patientacl
    WHERE user_id = 1
  );
  '''
  ```

### exclude

`exclude` fonctionne sur le même principe que `filter` mais inverse les opérateurs.   
Par exemple, IN devient NOT IN.

``` python
qs = Patient.objects.exclude(id=1)

'''
SELECT *
FROM patient
WHERE NOT (id IN (1,  2));
'''
```

### none

`none` permet de créer un queryset qui ne retournera aucun résultat.  
Cela permet de continuer à chaîner des méthodes sur ce queryset, bien qu'on sache déjà qu'il n'y aura pas de résultat.

``` python
qs = Patient.objects.all()

if not has_access:
    qs = qs.none()

qs = qs.only('id', 'firstname')
'''
# (aucune requête effectuée)
'''
```

---

## JOIN

### select related

* Les foreign key sont déférées:  
  si on essaie d'accéder à un attribut qui n'a pas été récupéré, alors Django effectuera une requête en BDD à la volée pour récupérer sa valeur.

  ``` python
  # Récupère 2 patients crées par user 1
  qs = Patient.objects.all()

  for item in qs:
      print(item.created_by.lastname)

  '''
  SELECT *
  FROM patient;

  SELECT *
  FROM user
  WHERE id = 1;

  SELECT *
  FROM user
  WHERE id = 1;
  '''
  ```

  Charger des propriétés déférées nous fait perdre en performance, particulièrement dans le cas où on boucle sur une liste.

* `select_related` permet de récupérer les attributs d'une foreign key  
  en même temps que la requête principale — ajoute automatiquement un JOIN dans la requête — ce qui nous permet de gagner en rapidité.

  ``` python
  qs = Patient.objects.all().select_related('created_by')

  for item in qs:
      print(item.created_by.lastname)

  '''
  SELECT patient.*, user.*
  FROM patient
  LEFT OUTER JOIN user ON (patient.created_by_id = user.id);
  '''
  ```

### prefetch related

* `prefetch_related` permet de récupérer les attributs d'une foreign key  
  après avoir effectué la requête principale — sélectionne tous les objets dont la foreign key est présente dans le résultat.

  ``` python
  qs = Patient.objects.all().prefetch_related('created_by')

  for item in qs:
      print(item.created_by.lastname)

  '''
  SELECT *
  FROM patient;

  SELECT *
  FROM user
  WHERE id IN (1);
  '''
  ```

---

## SELECT

### only

* `only` permet d'effectuer une projection:  
  plutôt que de récupérer l'ensemble des attributs du modèle, on n'en récupère qu'une partie.

  ``` python
  qs = Patient.objects.all().only(
      'id',
      'firstname',
      'lastname',
  )
  for item in qs:
      print(item.lastname)
  '''
  SELECT id, firstname, lastname
  FROM patient;
  '''
  ```

* Les attributs de la classe non récupérés sont déférrés:  
  penser à sélectionner tous les attributs susceptibles d'être lus pour ne pas perdre en performances.

  ``` python
  qs = Patient.objects.all().only(
      'id',
      'firstname',
      'lastname',
  )
  for item in qs:
      print(item.email)

  '''
  SELECT id, firstname, lastname
  FROM patient;

  SELECT id, email
  FROM patient
  WHERE id = 1;

  SELECT id, email
  FROM patient
  WHERE id = 2;
  '''
  ```

* Pour effectuer une projection qui récupère tous les attributs d'une foreign key,  
  il suffit d'indiquer le nom de la foreign key:

  ``` python
  qs = Patient.objects.all().select_related('created_by').only(
      'id',
      'firstname',
      'lastname',
      'created_by',
  )
  for item in qs:
      print(item.created_by.lastname)

  '''
  SELECT
    patient.id, patient.created_by_id, patient.firstname, patient.lastname,
    user.*
  FROM patient
  LEFT OUTER JOIN user ON (patient.created_by_id = user.id);
  '''
  ```

  Pour récupérer une partie de ses attributs, on utilise le nom de la foreign key  
  suivit de 2 underscores et l'attribut de la foreign key:

  ``` python
  qs = Patient.objects.all().select_related('created_by').only(
      'id',
      'firstname',
      'lastname',
      'created_by__id',
      'created_by__firstname',
      'created_by__lastname',
  )
  for item in qs:
      print(item.created_by.lastname)

  '''
  SELECT
    patient.id, patient.created_by_id, patient.firstname, patient.lastname,
    user.id,  user.firstname, user.lastname
  FROM patient
  LEFT OUTER JOIN user ON (patient.created_by_id = user.id);
  '''
  ```

### distinct

* `distinct` permet d'appliquer un DISTINCT

  ``` python
  qs = (
      PatientACL
      .objects
      .filter(user=self.request.user)
      .distinct('patient_id')
  )
  '''
  SELECT DISTINCT ON (patient_id) patient_patientacl.*
  FROM patientacl
  WHERE user_id = 1;
  '''
  ```

---

## ORDER BY

### order by

* `order_by` permet de définir l'ordre sur lequel trier les objets

  ``` python
  qs = Patient.objects.all().order_by('updated_at')
  '''
  SELECT *
  FROM patient
  ORDER BY updated_at ASC;
  '''
  ```

  ``` python
  qs = Patient.objects.all().order_by('-permission')
  '''
  SELECT *
  FROM patient
  ORDER BY updated_at DESC;
  '''
  ```

* Si aucun ordre n'est spécifié, alors l'ordre définit dans la classe est appliqué par défaut

  ``` python
  class Patient(models.Model):
      # ...

      class Meta:
          ordering = ['-pk']
  ```

  ``` python
  qs = Patient.objects.all()
  '''
  SELECT *
  FROM patient
  ORDER BY id DESC;
  '''
  ```

* Il est possible d'effectuer des order_by plus complexes en utilisant des instances F (comme field)

  ``` python
  from django.db.models import F

  qs = Patient.objects.all().order_by(
    F('lastname_sort').asc(nulls_first=True),
    F('firstname_sort').asc(nulls_first=True),
  )

  '''
  SELECT *
  FROM patient
  ORDER BY
    lastname_sort ASC NULLS FIRST,
    firstname_sort ASC NULLS FIRST;
  ```

* On peut également utiliser une annotation

  ``` python
  qs = qs.annotate(
    date=Case(
      When(
        Q(starting_point=1) & ~Q(entry_date__isnull=True),
        then=Cast(F('entry_date') + Cast(F('days'), output_field=Integer()), output_field=DateField())
      ),
      When(
        Q(starting_point=2) & ~Q(exit_date__isnull=True),
        then=Cast(F('exit_date') + Cast(F('days'), output_field=Integer()), output_field=DateField())
      ),
    )
  ).order_by('date')
  ```

---

## LIMIT

### limit & offset

* Pour limiter le nombre de résultats, on utilise du array-slicing

  ``` python
  qs = Patient.objects.all()[:10]
  '''
  SELECT *
  FROM patient
  LIMIT 10;
  '''
  ```

* De même pour ajouter un offset

  ``` python
  qs = Patient.objects.all()[5:]
  '''
  SELECT *
  FROM patient
  OFFSET 5;
  '''
  ```

  Pour combiner limit et offset, penser à incrémenter la borne supérieure

  ``` python
  qs = Patient.objects.all()[5:15]
  '''
  SELECT *
  FROM patient
  LIMIT 10 OFFSET 5;
  '''
  ```

---

## SELECT AS

### annotate

* `annotate` permet de définir un attribut calculé  
  Utiliser un calcul d'agrégat aura pour résultat d'ajouter un GROUP BY  
  Utiliser un filtre sur un attribut calculé aura pour résultat d'ajouter un HAVING

  **Count**

  ``` python
  from django.db.models import Count, Sum

  qs = (
      Search
      .objects
      .all()
      .filter(text__contains='li')
      .annotate(
          search_score=Sum('weight'),
          search_matches=Count('weight'),
      )
      .order_by(
          '-search_matches',
          '-search_score',
      )
  )

  '''
  SELECT *, SUM(weight) AS search_score, COUNT(weight) AS search_matches
  FROM core_search
  WHERE text::text LIKE '%li%'
  GROUP BY id
  ORDER BY search_matches DESC, search_score DESC
  '''
  ```

  **FilteredRelation**

  ``` python
  from core.models.user import User
  from django.db.models import Count, FilteredRelation, Q
   
  qs = (
      User
      .objects
      .all()
      .annotate(
          matching_medical_centers=FilteredRelation(
              'medical_centers',
              condition=Q(medical_centers__id=1),
          ),
          n_matching_medical_centers=Count('matching_medical_centers'),
      )
      .filter(n_matching_medical_centers__gt=0)
      .only('id')
  )
  for item in qs:
      print(item.id, getattr(item, 'n_matching_medical_centers', None))

  '''
  SELECT core_user.id, COUNT(matching_medical_centers.id) AS n_matching_medical_centers
  FROM core_user
  LEFT OUTER JOIN core_user_medical_centers ON (core_user.id = core_user_medical_centers.user_id)
  LEFT OUTER JOIN core_medicalcenter matching_medical_centers ON (
    core_user_medical_centers.medicalcenter_id = matching_medical_centers.id
    AND (core_user_medical_centers.medicalcenter_id = 1)
  )
  GROUP BY core_user.id
  HAVING COUNT(matching_medical_centers.id) > 0
  '''
  ```

* On notera qu'annotate ajoute des GROUP BY, HAVING et JOIN automatiquement et qu'il n'est pas
  possibles d'écraser ce comportement

  > The logic of what exactly the GROUP BY clause contains is hard
    to describe in other words than "if it passes the test suite,
    then it is correct".  
    """
    # Some examples:
    #    SomeModel.objects.annotate(Count('somecol'))
    #    GROUP BY: all fields of the model
    #
    #    SomeModel.objects.values('name').annotate(Count('somecol'))
    #    GROUP BY: name
    #
    #    SomeModel.objects.annotate(Count('somecol')).values('name')
    #    GROUP BY: all cols of the model
    #
    #    SomeModel.objects.values('name', 'pk').annotate(Count('somecol')).values('pk')
    #    GROUP BY: name, pk
    #
    #    SomeModel.objects.values('name').annotate(Count('somecol')).values('pk')
    #    GROUP BY: name, pk
    #
    The GROUP BY is then collapsed such as:
    If the main model's primary key is in the query, group by that
    field, HAVING expressions, and expressions associated with tables
    that don't have a primary key included in the grouped columns.

---

## CUSTOM

### raw

* Pour des requêtes complexes, en dernier recours on peut utiliser une requête SQL directement

  ``` python
  table_user = User._meta.db_table
  table_patient = Patient._meta.db_table
  table_study = Study._meta.db_table
  table_file = File._meta.db_table

  qs = User.objects.raw(
      f"""
      SELECT
          u.id, u.username, u.created_at, u.email, u.firstname, u.lastname,
          COALESCE(MIN(p.count), 0) AS n_patients,
          COALESCE(MIN(s.count), 0) AS n_studies,
          COALESCE(MIN(s.count_finalized), 0) AS n_studies_finalized,
          COALESCE(MIN(f.count), 0) AS n_files
      FROM {table_user} AS u
      LEFT JOIN LATERAL (
          SELECT
              created_by_id AS pk,
              COUNT(*) AS count
          FROM {table_patient}
          WHERE created_by_id IS NOT NULL
          GROUP BY created_by_id
      ) p ON p.pk = u.id
      LEFT JOIN LATERAL (
          SELECT
              created_by_id AS pk,
              COUNT(*) AS count,
              COUNT(*) FILTER (WHERE study_data_id IS NOT NULL) AS count_finalized
          FROM {table_study}
          WHERE created_by_id IS NOT NULL
          GROUP BY created_by_id
      ) s ON s.pk = u.id
      LEFT JOIN LATERAL (
          SELECT
              created_by_id AS pk,
              COUNT(*) AS count
          FROM {table_file}
          WHERE created_by_id IS NOT NULL
          GROUP BY created_by_id
      ) f ON f.pk = u.id
      GROUP BY u.id;
      """
  )
  ```

* Tant que les noms en BDD correspondent aux noms des attributs, les instances du modèle seront créées correctement. Autrement, on peut faire correspondance entre les champs avec l'arguments `translations`

  ``` python
  Person.objects.raw(
    f"""
    SELECT
      first AS first_name,
      last AS last_name,
      bd AS birth_date,
      pk AS id
    FROM person
    """
  )
  ```
  ``` python
  name_map = {
    "first": "first_name",
    "last": "last_name",
    "bd": "birth_date",
    "pk": "id",
  }
  Person.objects.raw(
    "SELECT * FROM person",
    translations=name_map,
  )
  ```

  Et il est possible de sélectionner des champs qui ne sont pas définis dans le modèle,
  ils seront considérés comme des champs calculées (comme annotate)

* On peut passer ajouter des paramètres à échapper en second argument:

  ``` python
  Person.objects.raw(
    "SELECT * FROM person WHERE last = %s",
    [lname]
  )
  ```

  ``` python
  table_source = Study._meta.db_table
  table_target = StudyClinicalData._meta.db_table

  fields = ', '.join([
      f.column for f in StudyClinicalData._meta.concrete_fields
      if f.serialize and not f.is_relation
  ])
  qs = StudyClinicalData.objects.raw(
      f"""
      INSERT INTO {table_target} (
          created_at,
          study_id,
          patient_id,
          study_data_id,
          smoothing,
          {fields}
      )
      SELECT
          NOW(),
          id,
          patient_id,
          last_study_data_id,
          %s,
          {fields}
      FROM {table_source}
      WHERE {table_source}.id = {study_id}
      RETURNING {table_target}.id;
      """, [
          smoothing,
      ]
  )
  inserted = list(qs)
  n_inserted = len(inserted)
  ```

### cursor

* Une autre alternative est d'utiliser la BDD directement,
  sans passer par un manager — on ne va donc pas récupérer des instances de classe

  ``` python
  from django.db import connection

  with connection.cursor() as cursor:
    cursor.execute("SELECT foo FROM bar WHERE baz = %s", [self.baz])
    row = cursor.fetchone()

  return row
  ```

  ``` python
  cursor.execute("SELECT id, parent_id FROM test LIMIT 2")
  cursor.fetchall()
  # ((54360982, None), (54360880, None))
  ```
