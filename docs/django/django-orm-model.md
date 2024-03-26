---
title: Model
category: Python, Django, ORM
---

## Déclarer un modèle

* Django dispose d'un ORM (*Object Relational Mapper*).  
  Un ORM sert de couche d'abstraction entre les données python et la base de données.

  L'ORM permettra
  1. de même à jour le schéma de la base de données à partir des migrations
  2. de valider les données des formulaires avec des validateurs
  3. de transformer les requêtes orientées-objet en requêtes SQL avec des querysets
  4. on peut également factoriser des requêtes (ou parties de requêtes) fréquemment utilisées avec un manager personnalisé
  5. et ajouter de la logique à certains moments du cycle de vie d'une instance avec des hooks

* Pour déclarer un modèle on créer une classe qui hérite de `django.db.models.Model`.  
  Pour déclarer des champs dans la table, on ajoute des propriétés qui héritent de `django.db.models.fields.Field`.  
  Les options du modèle peuvent être déclarées dans une sous-classe `Meta`.

  <ins>core/models/search.py</ins>:

  ``` python
  from django.db import models

  class Search(models.Model):
      """
      Allows to search users with their infos
      """
      text = models.CharField(
          'text',
          max_length=255,
      )
      weight = models.PositiveSmallIntegerField(
          'weight',
          default=1,
      )
      class Meta:
          verbose_name = _('search')
          verbose_name_plural = _('searches')
  ```

* Note: les propriétés qui n'héritent pas de Field ne feront pas partie de la table,
  on peut s'en servir pour ajouter de la logique dans le modèle.

  ``` python
  class Drug(models.Model):
      CARDIOLOGICAL_VIDAL_IDS = {391}

      vidal_id = models.PositiveIntegerField(
        help_text='The ID of this drug in the Vidal database',
      )
      name = models.CharField(
        max_length=255,
        help_text='The name of this drug',
      )
      vidal_categories = models.ManyToManyField(
        VidalDrugCategory,
        blank=True,
      )

      @property
      def pretty_name_with_dosage(self):
          """
          BECLOMETASONE CHIESI 400 µg susp p inhal par nébuliseur -> Beclometasone Chiesi 400 µg
          BECLOMETASONE CHIESI 800 µg/2 ml susp p inhal par nébuliseur -> Beclometasone Chiesi 800 µg/2 ml
          ABILIFY 1 mg/ml sol buv -> Abilify 1 mg/ml
          :return string
          """
          result = []
          parts = self.name.split()
          expects_unit = False

          for part in parts:
              if not part:
                  continue

              if part.isupper():
                  result.append(part.capitalize())
              elif part[-1].isnumeric():
                  result.append(part)
                  expects_unit = True
              elif expects_unit:
                  result.append(part)
                  break
              else:
                  break
          if result:
              return " ".join(result)

          # Fallback to name
          return self.name

      @property
      def is_cardiological(self):
          return not self.CARDIOLOGICAL_VIDAL_IDS.isdisjoint(self.vidal_categories_ids_set)

    class Meta:
        unique_together = ('vidal_id', 'name')

    def __str__(self):
        return f'[#{self.id}] {self.name}'
  ```

## Clé primaire par défaut

* Par défaut, Django donne à chaque modèle une clé primaire auto-incrémentée nommée "id".  
  Le type de champ par défaut utilisé pour les clés primaires est définit dans les configurations.

  ``` python
  # Default primary key field type
  # https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

  DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
  ```

* Il est possible de modifier le comportement par défaut en définissant la propriété `id` du modèle.

  ``` python
  id = models.UUIDField(default=uuid.uuid4, primary_key=True)
  ```

---

## Options des champs

### verbose_name

- `verbose_name` est le premier paramètre de la classe Field: il s'agit du label qui sera affiché dans les formulaires

  ``` python
  email = models.EmailField(
      _('email address'),
  )
  ```

  Si non spécifié, il vaudra par défaut la version "humanisée" du nom du champ — soit "email" pour l'exemple précédent)

  ``` python
  self.verbose_name = self.name.replace('_', ' ')
  ```

### help_text

- `help_text` permet de spécifier un texte d'aide supplémentaire à afficher dans les formulaires.  
  Si le modèle n'est pas utilisé dans un formulaire, ce champ est utile pour documenter

  ``` python
  clinical_weight = models.PositiveSmallIntegerField(
      _('poids'),
      null=True,
      validators=[MinmaxValidator(30, 200)],
      help_text='kg',
  )
  clinical_bmi = models.DecimalField(
      _('Indice de Masse Corporelle (IMC)'),
      null=True,
      editable=False,
      max_digits=3,
      decimal_places=1,
      validators=[MinmaxValidator(10, 60)],
      help_text='Body Mass Index (BMI)',
  )
  ```

### null

- `null=True` se rapporte au stockage dans la base de données: on autorise les valeurs NULL

  ``` python
  is_enabled = models.BooleanField(
      null=True,
  )
  ```

### blank

- `blank=True` se rapporte à la validation dans les formulaires: on permet la saisie de valeurs vides.  
  Quand un champ possède `blank=False`, le champ doit être obligatoirement rempli

  ``` python
  specify = models.CharField(
    _('specify'),
    max_length=140,
    blank=True,
  )
  ```

  Un champ textuel avec null=True implique qu’il y a deux valeurs possibles signifiant « pas de données »: NULL et ''; dans la plupart des cas, on va donc déclarer un CharField avec blank et non null. Une exception: lorsqu'on valide les choix possibles pour ce champ avec `choices` — on saut qu'on n'enregistrera jamais ''

### choices

- `choices` liste les valeurs autorisées pour un champ. Cette option prend en paramètre un itérable de tuples binaires: le premier élément est la valeur réelle enregistrée en BDD, et le second est la valeur visible par l'utilisateur.

  ``` python
  class PermissionChoicesMixin:
      PERMISSION_READ = 4
      PERMISSION_WRITE = 2
      PERMISSION_EXECUTE = 1

      PERMISSION_CHOICES = (
          (PERMISSION_READ, _('read')),
          (PERMISSION_WRITE, _('write')),
          (PERMISSION_EXECUTE, _('share')),
      )

  permission = models.PositiveSmallIntegerField(
      _('has the right to'),
      choices=PermissionChoicesMixin.PERMISSION_CHOICES,
  )
  ```

  ``` python
  class CharacteristicsChoicesMixin:
      CHARACTERISTICS_CALCIFIED_PARTIALLY = 'ca-part'
      CHARACTERISTICS_CALCIFIED_TOTALLY = 'ca-full'
      CHARACTERISTICS_FAT = 'fat'

      CHARACTERISTICS_CHOICES = (
          (CHARACTERISTICS_CALCIFIED_PARTIALLY, _('calcifié partiellement')),
          (CHARACTERISTICS_CALCIFIED_TOTALLY, _('calcifié totalement')),
          (CHARACTERISTICS_FAT, _('contenu graisseux')),
      )

  characteristics = models.CharField(
    _('characteristics'),
      choices=CharacteristicsChoicesMixin.CHARACTERISTICS_CHOICES,
      max_length=8,
      null=True,
  )
  ```

### unique

- `unique` ajoute une contrainte d'unicité

  ``` python
  authorization_url = models.URLField(
    _('authorization URL'),
    unique=True,
  )
  ```

  On peut ajouter une constrainte d'unicité sur plusieurs champs dans les options du modèle

  ``` python
  class DicomSeries(DicomEntity):

    namespace = models.ForeignKey(
        'patient.Patient',
        on_delete=models.DO_NOTHING,
        related_name='study_set+',
    )
    uid = models.CharField(
        max_length=64,
        validators=[digits_and_dots_only],
        help_text='Series Instance UID (0020,000E)',
    )

    class Meta:
        unique_together = (
            ('namespace_id', 'uid'),
        )
  ```

### error_messages

- `error_messages` permet de définir un message personnalisé pour différents types d'erreurs de validation

  ``` python
  email = models.EmailField(
      _('email address'),
      unique=True,
      error_messages={
        'unique': _('A user with this email address already exists.'),
      },
  )
  ```

### validators

- `validators` permet d'ajouter des validations personnalisées

  ``` python
  from django.core.validators import RegexValidator

  digits_and_dots_only = RegexValidator(
      r'^\d+(\.\d+)*$', message='Digits and dots only!', code='invalid_uid'
  )
  uid = models.CharField(
      max_length=64,
      validators=[digits_and_dots_only],
      help_text='SOP Instance UID (0008,0018)',
  )
  ```

### editable

* `editable` permet d'indiquer un champ comme non éditable. Un champ non éditable n'est pas affiché dans un formulaire et n'est pas validé — il s'agit d'un champ dont la valeur est populée directement par le serveur

  ``` python
  created_by = models.ForeignKey(
      'core.user',
      null=True,
      on_delete=models.SET_NULL,
      editable=False,
      related_name='file_created_by+',
  )
  ```

### auto_now

- `auto_now` assigne la date du jour au champ à chaque enregistrement de l’objet

  ``` python
  updated_at = models.DateTimeField(
      auto_now=True,
  )
  ```

### auto_now_add

- `auto_now_add` assigne la date du jour au champ au premier enregistrement de l’objet

  ``` python
  created_at = models.DateTimeField(
      auto_now_add=True,
  )
  ```

### default

- `default` assigne une valeur par défaut si le champ est laissé vide

  ``` python
  import datetime

  from django.utils import timezone

  date_join = models.DateTimeField(
    _('date joined'),
    default=timezone.now,
  )
  date_consultation = models.DateField(
    _('consultation date'),
    default=datetime.date.today,
    blank=True,
    null=True,
  )
  ```

### primary_key

* Définit la clé primaire du modèle.  
  Implique `null=False` et `unique=True`.  
  Une seule clé primaire est autorisée par modèle

  ``` python
  id = models.UUIDField(default=uuid.uuid4, primary_key=True)
  ```

* Si aucune clé primaire n'est spécifiée alors Django définit un champ `id` comme clé primaire

  ``` python
  id = models.BigAutoField(primary_key=True)
  ```

### db_column

* `db_column` permet de spécifier le nom du champ en BDD, qui sera par défaut identique au nom de l'attribut.  
  Cette option peut être utile s'il s'agit d'un mot-clé réservé en SQL ou si le nom est trop long — par défaut sous Postgres on est limité à 63 caractères.

  ``` python
  treatment_vaccine_pneumococcus_non_performed_reason_other_specify = models.CharField(
      _("précisez"),
      max_length=140,
      blank=True,
      db_column="treatment_vaccine_pneumococcus_non_performed_reason_other_spec",
  )
  ```

### db_index

* `db_index=True` permet d'ajouter un index sur un champ

  ``` python
  is_eligible = models.BooleanField(
    _('is eligible'),
    db_index=True,
    null=True,
  )
  ```

  On peut également ajouter un index sur un ou plusieurs champs dans les options du modèle

  ``` python
  class DicomSeries(DicomEntity):

    uid = models.CharField(
        max_length=64,
        validators=[digits_and_dots_only],
        help_text='Series Instance UID (0020,000E)',
    )
    date = models.DateField(
        blank=True,
        null=True,
        help_text='Series Date (0008,0021)'
    )
    time = models.TimeField(
        blank=True,
        null=True,
        help_text='Series Time (0008,0031)'
    )

    class Meta:
        indexes = [
            models.Index(fields=['uid']),
            models.Index(fields=['date', 'time']),
        ]
  ```

---

## Champs simples

Outre les options, le type de champ utilisé va permettre de convertir les valeurs de la BDD en valeurs Python et inversemment

### Date

* **DateField**  
  Champ utilisé pour les datetime.date

  ``` python
  previous_date = models.DateField(
      _('Scanner date'),
      validators=[PastDateValidator()],
      blank=True,
      null=True,
  )
  ```

* **DateTimeField**  
  Champ utilisé pour les datetime.datetime

  ``` python
  created_at = models.DateTimeField(
      auto_now_add=True,
  )
  updated_at = models.DateTimeField(
      auto_now=True,
  )
  ```

* **TimeField**  
  Champ utilisé pour les datetime.time

  ``` python
  time = models.TimeField(
      blank=True,
      null=True,
  )
  ```

* **DurationField**  
  Champ utilisé pour les datetime.timedelta

  ``` python
  import datetime
  from django.db import models

  qs = qs.annotate(
      days_since_check_date=models.ExpressionWrapper(
          datetime.date.today() - models.F('consultation_on'), output_field=models.fields.DurationField()
      )
  )
  ```

### Text

* **CharField**  
  Champ texte de 255 caractères maximum.

  La longueur maximale doit obligatoirement être spécifiée:
  1. elle se rapporte au stockage dans la base de données — en BDD, il s'agit d'un VARCHAR(MAX),
  2. mais elle se rapporte aussi à la validation des formulaires — ajoute automatiquement MaxLengthValidator

  ``` python
  address = models.CharField(
      _('full address'),
      max_length=255,
  )
  ```

  ``` python
  specify = models.CharField(
    _('specify'),
    max_length=140,
    blank=True,
  )
  ```

* **TextField**  
  Champ de texte long.  
  En BDD, il s'agit d'un TEXT: tandis qu'un VARCHAR est stocké en ligne avec la table, un TEXT est stocké en dehors de la table — qui ne contient qu'une référence vers l'emplacement en mémoire du texte

  ``` python
  comment = models.TextField(
      _('comment'),
      max_length=2048,
      blank=True,
  )
  ```

* **SlugField**  
  Champ qui hérite de CharField, et ajoute une validation vérifiant qu'il s'agit d'un slug: /^[-a-zA-Z0-9_]+\Z/

  ``` python
  code = models.SlugField(
      _('code'),
      max_length=8,
      blank=True,
      null=True,
  )
  ```

* **URLField**  
  Champ qui hérite de CharField, et ajoute une validation vérifiant qu'il s'agit d'une URL

  ``` python
  authorization_url = models.URLField(
    _('authorization URL'),
    unique=True,
  )
  ```

* **EmailField**  
  Champ qui hérite de CharField, et ajoute une validation vérifiant qu'il s'agit d'une addresse email

  ``` python
  email = models.EmailField(
      _('email address'),
      unique=True,
      error_messages={
        'unique': _('A user with this email address already exists.'),
      },
  )
  ```

### Boolean

* **BooleanField**  
  Champ booléen

  ``` python
  # Checkbox
  has_convocation_date = models.BooleanField(
      default=False,
  )
  # Radio oui/non/null
  is_enabled = models.BooleanField(
      null=True,
  )
  ````

### Integer

* **IntegerField**  
  Champ entier entre -2147483648 et 2147483647 (entier signé sur 4 octets) — `[2^(8*4)]/2`

  ``` python
  number_of_frames = models.IntegerField(
      validators=[
          MinValueValidator(MIN_VALUE),
          MaxValueValidator(MAX_VALUE),
      ],
      blank=True,
      null=True,
  )
  ```

* **PositiveIntegerField**  
  Champ entier entre 0 et 2147483647 (entier signé sur 4 octets)

  ``` python
  columns = models.PositiveIntegerField(
      validators=[MaxValueValidator(MAX_VALUE)],
      blank=True,
      null=True,
      help_text='Columns (0028,0011)',
  )
  ```

* **SmallIntegerField**  
  Champ entier entre -32768 et 32767 (entier signé sur 2 octets)

  ``` python
  ics_value = models.SmallIntegerField(
      _("dose CSI: total (µg/jour)"),
      null=True,
      editable=False,
  )
  ```

* **PositiveSmallIntegerField**  
  Champ entier entre 0 et 32767 (entier signé sur 2 octets)

  ``` python
  permission = models.PositiveSmallIntegerField(
      _('has the right to'),
      choices=PermissionChoicesMixin.PERMISSION_CHOICES,
  )
  ```

* **BigIntegerField**  
  Champ entier entre -9223372036854775808 et 9223372036854775807 (entier signé sur 8 octets)

  ``` python
  dicom_namespace_id = models.BigIntegerField(
      help_text='Patient ID',
      editable=False,
  )
  ```

* **AutoField**  
  Champ entier auto-incrémenté

  ``` python
  # 4 octets
  id = models.AutoField(primary_key=True)

  # 2 octets
  id = models.SmallAutoField(primary_key=True)

  # 8 octets
  id = models.BigAutoField(primary_key=True)
  ```

### Float

* **FloatField**  
  Champ utilisé pour les float

  ``` python
  slice_location = models.FloatField(
      blank=True,
      null=True,
      help_text='Slice Location (0020,1041)',
  )
  ```

* **DecimalField**  
  Champ utilisé pour les decimal.Decimal

  `decimal_places` définit le nombre de décimales enregistrées et `max_digits` le nombre maximum de chiffres autorisés. L'exemple suivant permet d'enregistrer des nombres allant jusqu'à 99.999:

  ``` python
  large_diameter = models.DecimalField(
      null=True,
      max_digits=5,
      decimal_places=3,
      validators=[MinValueValidator(0)],
      help_text='mm',
  )
  ```

* Au niveau matériel, les nombres à virgule flottante (floats) sont représentés en fractions de nombres binaires — autrement dit, en base 2.  
  Par exemple, le nombre décimal 0.125 représentés en fractions de nombres décimaux sera 1/10 + 2/100 + 5/1000. Et le nombre binaire 0.001 en fractions de nombres binaires sera 0/2 + 0/4 + 1/8.

  Si on cherche à changer de base, la plupart des fractions n'aurons pas de représentation exacte.  
  Par exemple, si on convertit 1/3 en base 10, on peut écrire 0.333 mais ce n'est pas exactement la même valeur — il s'agit en réalité du nombre périodique 0.333...  De la même manière 1/10 (0.1) ne peut pas être convertit en base 2 de manière exacte — 1/10 est le nombre périodique 0.0001100110011001100110011001100110011001100110011... Et en se limitant à une quantité finie de bits, on ne peut obtenir qu'une approximation.

  Sur la majorité des machines aujourd'hui, les nombres à virgule flottante sont approximés par une fraction binaire avec les 53 premiers bits comme numérateur et une puissance de deux au dénominateur — il s'agit du standard IEEE-754 double précision: dans le cas de 1/10, la fraction binaire est 3602879701896397 / 2 ** 55, qui est proche mais ne vaut pas exactement 1/10.

  Python affiche une approximation décimale de la valeur stockée en binaire, il est donc facile d'oublier que la valeur stockée est une approximation de la fraction décimale d'origine. Mais le problème devient apparent quand on essaie d'effectuer des opérations avec des nombres en virgules flottantes:

  ``` python
  >>> 0.1+0.2
  0.30000000000000004
  ```

  On peut y remédier en utilisant le package `decimal`:

  ``` python
  >>> from decimal import Decimal as D
  >>> D('0.1')+D('0.2')
  Decimal('0.3')
  ```

  Référence: [Arithmétique en nombres à virgule flottante](https://docs.python.org/fr/3/tutorial/floatingpoint.html)

## Champs spéciaux

### UUID

* **UUIDField**  
  Champ utilisé pour les uuid

  ``` python
  import uuid

  request_uuid = models.UUIDField(
      default=uuid.uuid4,
      unique=True,
  )
  ```

### IP

* **GenericIPAddressField**  
  Champ utilisé pour les adresses IPv4 ou IPv6  
  Les addresses IPv6 sont normalisées — par exemple 2001:0::0:01 devient 2001::1

  ``` python
  ip = models.GenericIPAddressField(
      blank=True,
      null=True,
  )
  ```

### Array

* **ArrayField** (spécifique à postgres)  
  Champ utilisé pour enregistrer une liste de champs

  ``` python
  from django.contrib.postgres.fields import ArrayField

  image_position_patient = ArrayField(
      models.FloatField(),
      size=3,
      blank=True,
      null=True,
      help_text='Image Position (Patient) (0020,0032)',
  )
  window_center = ArrayField(
      models.FloatField(blank=True, null=True),
      validators=[ArrayMinLengthValidator(1), ArrayMaxLengthValidator(10)],
      blank=True,
      null=True,
      help_text='>Window Center (0028,1050)',
  )
  ```

### JSON

* **JSONField**  
  Dictionnaire ou liste de dictionnaires  
  Spécifier l'`encoder` permet de gérer les valeurs python qui ne sont pas prises en charge par JSON — par exemple un DateTime

  ``` python
  from django.core.serializers.json import DjangoJSONEncoder

  extra = models.JSONField(
      encoder=DjangoJSONEncoder,
      default=dict,
      help_text='Any additional data',
  )
  paraclinical_other_list = models.JSONField(
      encoder=DjangoJSONEncoder,
      default=list,
      help_text='Date + comment',
  )
  ```

### File

* **FileField**  
  Champ permettant d'enregistrer un fichier  

  Le fichier est sauvegardé sur le disque quand on sauvegarde l'entité avec `save`.  
  Il est envoyé à  l'emplacement spécifié par `upload_to` — relatif à MEDIA_ROOT.  
  Cet emplacement (relatif) est enregistré en BDD

  ``` python
  # file will be uploaded to MEDIA_ROOT/uploads
  upload = models.FileField(upload_to='uploads/')
  ```
  ``` python
  # file will be saved to MEDIA_ROOT/uploads/2015/01/30
  upload = models.FileField(upload_to='uploads/%Y/%m/%d/')
  ```
  ``` python
  # file will be saved to MEDIA_ROOT/reports/...
  def get_upload_to(instance, filename):
      uuid = str(instance.uuid)

      filename = uuid
      if ext := instance.get_fileinput_content_type_display():
          filename += f'.{ext}'

      return f'reports/{instance.patient_id}/{uuid[:4]}/{filename}'

  fileinput = models.FileField(
    upload_to=get_upload_to
  )
  ```

  Lorsqu'on accède à ce champ, on obtient une instance de `FieldFile`. Le chemin relatif du fichier est accessible dans la propriété `name` et on a également des propriétés et méthodes permettant entre autres de lire le fichier ou vérifier sa taille sur le disque.

### Binary

* **BinaryField**  
  Champ contenant des données binaires brutes

  ``` python
  hmac = models.BinaryField(unique=True)
  ```

---

## Relations

### Relation 1-n

* **ForeignKey**  
  Champ utilisé pour déclarer une relation 1-n

  ``` python
  class Search(models.Model):

    source = models.ForeignKey(
        'user',
        on_delete=models.CASCADE,
        related_name='searches',
    )
  ```

### Relation n-n

* **ManyToManyField**  
  Champ utilisé pour déclarer une relation n-n

  ``` python
  class User(AbstractBaseUser):

    medical_centers = models.ManyToManyField(
        MedicalCenter,
        related_name='users',
    )
  ```

### 1-1

* **OneToOneField**  
  Champ utilisé pour déclarer une relation 1-1 (revient une à ForeignKey avec une contrainte d'unicité):

  ``` python
  class AIDecision(models.Model):

    studyradiological = models.OneToOneField(
        'study.StudyRadiological',
        on_delete=models.CASCADE,
        related_name='%(model_name)s_studyradiological+',
        blank=True,
        null=True,
        editable=False,
        help_text='Designates a radiological study',
    )
    ```

## Options des relations

### on_delete

L'attribut `on_delete` définit ce que la relation devient quand on supprime l'entité qu'elle référence

- **CASCADE**: supprimer   
  Exemple: si un patient est supprimé, supprimer les PatientACL qui le référençent

  ``` python
  class PatientACL(models.Model):

      patient = models.ForeignKey(
          'patient',
          on_delete=models.CASCADE,
          related_name='acls',
      # ...
  ```

* **PROTECT**: empêcher la suppression  
  Exemple: si on essaie de supprimer un patient mais qu'une Convocation le référence encore, empêcher sa suppression

  ``` python
  class Convocation(models.Model):

    patient = models.ForeignKey(
        'patient.Patient',
        on_delete=models.PROTECT,
        related_name='convocations',
    )
  ```

* **SET_NULL**: assigner la valeur null  
  Exemple: si on supprime un utilisateur, marquer comme NULL le créateur de Patient. Compte tenu l'attribut peut être null, il faut également autoriser cette valeur avec `null=True`

  ``` python
  class Patient(models.Model);

    created_by = models.ForeignKey(
        'user',
        null=True,
        on_delete=models.SET_NULL,
        editable=False,
        related_name='medicalcenter_created_by+',
    )
  ```

* **DO_NOTHING**: ne rien faire  
  Si vous êtes sûr et certain qu'il n'est pas nécessaire que Django effectue des vérifications avant de supprimer une entité — vous gérez vous l'état des relations en amont

  ``` python
  class Log(models.Model);

    user = models.ForeignKey(
        'user',
        on_delete=models.DO_NOTHING,
        related_name='logs',
  ```

* **SET_DEFAULT**: assigner la valeur par défaut  
  Exemple: si on supprime un utilisateur, définir le référent du Patient comme étant l'admin (ADMIN_USER_ID)

  ``` python
  ADMIN_USER_ID = 1

  class Patient(models.Model):

      referent = models.ForeignKey(
        'user',
        default=ADMIN_USER_ID,
        on_delete=models.SET_DEFAULT,
      # ...
  ```

* **SET**: assigner une valeur retournée par un callback  
  Exemple: si on supprime un centre médical, mettre le centre médical du Patient comme étant l'entité "deleted"

  ``` python
  def get_deleted_user_instance():
      return MedicalCenter.objects.get(name='deleted')

  class Patient(models.Model):

      medical_center = models.ForeignKey(
        'medical_center',
        on_delete=models.SET(get_deleted_medical_center),
        related_name='patients',
      )
  ```

### to

Il y a différentes manière de déclarer le modèle cible:

1. passer directement passer la classe

  ``` python
  from lib.patient.models import Patient

  class AIDecision(models.Model):

    patient = models.ForeignKey(
        Patient,
        on_delete=models.PROTECT,
        editable=False,
    )
  ```

2. passer son nom — ce qui évite ainsi d'importer la classe et d'avoir un import circulaire

  ``` python
  class PatientACL(models.Model):

      patient = models.ForeignKey(
          'patient',
          on_delete=models.CASCADE,
          blank=True,
          null=True,
      )
  ```

  Si le modèle est dans un module différent, alors il faut préfixer le nom du modèle par le label du module dans lequel il se situe

    ``` python
    class AIDecision(models.Model):

      patient = models.ForeignKey(
          'patient.Patient',
          on_delete=models.PROTECT,
          editable=False,
      )
    ```
    ``` python
    from django.apps import AppConfig


    class LibPatientConfig(AppConfig):
        """
        Handles everything about patients
        """
        name = 'lib.patient'
        label = 'patient'
    ```

### reverse

* <ins>OneToOneField</ins>
  Quand on définit un champ OneToOneField sur un modèle,  
  le modèle référencé aura également accès au modèle inverse via MODELNAME

  ``` python
  class AIDecision(models.Model):
    studyradiological = models.OneToOneField(
        'study.StudyRadiological',
        on_delete=models.CASCADE,
    )

  instance = AIDecision.objects.all().first()
  print(instance)                                        # AIDecision object (1)
  print(instance.studyradiological)                      # StudyRadiological object (1)
  print(instance.studyradiological.aidecision)           # AIDecision object (1)
  ```

* <ins>ForeignField</ins>  
  Quand on définit un champ ForeignField sur un modèle,  
  le modèle référencé aura accès à un queryset permettant d'accéder au modèle inverse via MODELNAME_set

  ``` python
  class AIDecision(models.Model):
    updated_by = models.ForeignKey(
        'core.User',
        on_delete=models.SET_NULL,
    )

  instance = AIDecision.objects.all().first()
  print(instance)                                        # AIDecision object (1)
  print(instance.updated_by)                             # User object (1)
  print(instance.updated_by.aidecision_set.all())        # list

  '''
  SELECT *
  FROM aidecision
  LIMIT 1;

  SELECT *
  FROM user
  WHERE id = 1;

  SELECT *
  FROM aidecision
  WHERE updated_by_id = 1;
  '''
  ```

* <ins>ManyToManyField</ins>  
  Pour une relation ManyToManyField, le fonctionnement de l'API est similaire à celui d'une relation OneToManyField:  
  le modèle qui définit le champ utilise le nom d'attribut de ce champ, et le modèle inverse utilise MODELNAME_set

  ``` python
  class User(models.Model):
    medical_centers = models.ManyToManyField(
        MedicalCenter,
    )

  user = User.objects.all().first()
  medical_center = MedicalCenter.objects.all().first()

  print(user.medical_centers.all())
  print(medical_center.user_set.all())
  ```

### related_name

* **related_name** permet de modifier le nom avec lequel le modèle référencé a accès au modèle inverse.  
  Il est indispensable de le définir lorsqu'un modèle contient différentes relations référençant le même modèle

  ``` python
  class UserNotification(models.Model):
      """
      Sending notifications to users
      """
      created_at = models.DateTimeField(auto_now_add=True)

      from_user = models.ForeignKey(
          'user',
          on_delete=models.CASCADE,
          help_text='Who triggered the notif.',
          related_name='notifications_from',
      )
      to_user = models.ForeignKey(
          'user',
          on_delete=models.CASCADE,
          help_text='Who receives the notif.',
          related_name='notifications_to',
      )
  ```

* On peut utiliser la variable "modelname" dans ce champ:  
  elle sera remplacé par le nom du modèle en cours — le modèle qui déclare la relation.  
  Ça permet notamment de pouvoir hériter du modèle sans avoir à redéfinir cette propriété

  ``` python
  class AIDecision(models.Model):
    studyradiological = models.OneToOneField(
        'study.StudyRadiological',
        on_delete=models.CASCADE,
        related_name='%(model_name)s_study',  # aidecision_studyradiological
    )

  instance = AIDecision.objects.all().first()
  print(instance)                                                      # AIDecision object (1)
  print(instance.studyradiological)                                    # StudyRadiological object (1)
  print(instance.studyradiological.aidecision_studystudyradiological)  # AIDecision object (1)
  ```

### through

* **through** permet d'accéder au modèle Many-to-many créé automatiquement par Django:

  ``` python
  class User(models.Model):
    medical_centers = models.ManyToManyField(
        MedicalCenter,
        related_name='users',
    )

  qs = (
      User.medical_centers.through.objects
      .filter(medicalcenter_id=medical_center_id)
      .distinct('user_id')
      .values_list('user_id', flat=True)
  )

  '''
  SELECT DISTINCT ON (user_id) user_id
  FROM core_user_medical_centers
  WHERE medicalcenter_id = 1;
  '''
  ```

Pour aller plus loin: [limit_choices_to](https://docs.djangoproject.com/fr/4.1/ref/models/fields/#django.db.models.ForeignKey.limit_choices_to)
