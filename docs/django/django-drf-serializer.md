---
title: Serializer & validation
category: Python, Django, DRF
---

* Les sérialiseurs permettent de caster et valider les données en entrées et formatter les données en sortie.

## Sérialiseur d'une vue DRF

### serializer_class

* On peut définir le sérialiseur que la vue utilisera pour valider les données en entrée  
  avec l'attribut `serializer_class`

    <ins>api/serializers.py</ins>

    ``` python
    from rest_framework import serializers
    from geo.models import Region

    class RegionSerializer(serializers.ModelSerializer):
        class Meta:
            model  = Region
            fields = ('code', 'nom')
    ```

    <ins>api/views.py</ins>

    ``` python
    from geo.models import Region
    from geo.serializers import RegionSerializer
    from rest_framework import viewsets

    class RegionViewSet(viewsets.ModelViewSet):
        queryset = Region.objects.all()
        serializer_class = RegionSerializer
    ```

### get_serializer_class

* Pour utiliser un sérialiseur différent suivant l'action,  
  écraser la méthode `get_serializer_class`

    ``` python
    def get_serializer_class(self):
        if self.action == 'create':
            return PatientCreateSerializer

        if self.action == 'list':
            return PatientListSerializer

        if self.action == 'archive':
            return PatientArchiveSerializer

        return self.serializer_class
    ```

### get_serializer

* Dans tout les cas, DRF crée le serialiseur à partir de la classe déclarée et des données en entrées  
  en appelant la méthode `get_serializer`

    ``` python
    serializer = self.get_serializer(data=request.data)
    ```
    ``` python
    serializer = self.get_serializer(instance, data=request.data, partial=partial)
    ```
    ``` python
    serializer = self.get_serializer(qs, many=True)
    ```

---

## Utiliser un sérialiseur

### is_valid, validated_data

* On peut valider les données en entrées en appelant la méthode `is_valid()`  
  et récupérer les valeurs validées dans la propriété `validated_data`

    ``` diff
    from rest_framework import mixins, status
    from rest_framework.response import Response

    class PatientViewSet(
        mixins.CreateModelMixin,
        GenericViewSet,
    ):
        def create(self, request, *args, **kwargs):
            """
            Create a patient
            """
            serializer = self.get_serializer(data=request.data)
    +       serializer.is_valid(raise_exception=True)

            with transaction.atomic():
                instance = serializer.save()

    +           if medical_center := serializer.validated_data.get('medical_center', None):
                    PatientACL(
                        patient=instance,
                        group_medical=medical_center,
                        permission=PatientACL.PERMISSION_WRITE,
                        role=PatientACL.ROLE_REFERENT_CENTER,
                    ).save()

            return Response(
                PatientSerializer(instance=instance).data,
                status=status.HTTP_201_CREATED,
            )
    ```

### errors

* En cas d'erreur, on peut récupérer les erreurs détectées par le sérialiseur  
  dans la propriété `errors`

    ``` diff
    is_valid = serializer.is_valid(raise_exception=False)

    if not is_valid:

        # We received JSON data as an answer, but its format isn’t as expected
        log.update_extra(has_error=True, extra={
            'error': detail,
            'payload': content,
    +       'serializer': dict(serializer.errors),
        })
    ```

### ValidationError

* Si la méthode is_valid est appelée avec le paramètre `raise_exception`,  
  alors une erreur `rest_framework.serializers.ValidationError` est levée

    ``` python
    if errors:
        raise ValidationError(errors)
    ```

* Dans une vue, on peut ajouter des validations supplémentaires,  
  on lèvera alors une erreur `rest_framework.exceptions.ValidationError`.  
  Pour spécifier le type de l'erreur, on utilise `ErrorDetail`

    ``` python
    from rest_framework.exceptions import ErrorDetail, ValidationError

    ...
    raise ValidationError({
        'permission': ErrorDetail(_('Ownership can only be set on users'), code='invalid'),
    })
    ```

* Pour passer d'une `rest_framework.exceptions.ValidationError` à une `rest_framework.serializers.ValidationError`,
on peut se servir de `as_serializer_error`

    ``` python
    from rest_framework import exceptions
    from rest_framework.serializers import (
        as_serializer_error,
        ValidationError as SerializerValidationError,
    )

    def serializer_validation_error(obj, code=None):
        """
        Allows a view to raise a model validation error
        """

        # Error on base entity
        if isinstance(obj, str):
            return SerializerValidationError(detail=obj, code=code)

        # Error on a given field
        exc = exceptions.ValidationError(obj, code=code)

        return SerializerValidationError(
            detail=as_serializer_error(exc)
        )
    ```
    ``` python
    raise serializer_validation_error({
        'fileinput': _('This file doesn’t seem to be a valid DICOM file')
    })
    ```

* Pour récupérer une erreur de validation native à Django (erreur retournée par un validateur du modèle),  
  utiliser `get_error_detail`

    ``` diff
    from rest_framework_json_api.utils import format_value

    from rest_framework.exceptions import ValidationError
    from rest_framework.fields import SkipField, get_error_detail
    from django.core.exceptions import ValidationError as DjangoValidationError


    def validate(serializer, data):
        errors = OrderedDict()
        res = OrderedDict()

        for field_name, field in serializer.fields.items():
            dasherized_name = format_value(field_name, settings.JSON_API_FORMAT_FIELD_NAMES)
            primitive_value = data.get(dasherized_name, None)

            try:
                field.run_validation(primitive_value)

                # keep it as a JSON value (ie string instead of DateTime)
                # to have the same values when we retrieve the field from database
                res[field_name] = primitive_value

    +       except ValidationError as exc:
    +           errors[field_name] = exc.detail
    +       except DjangoValidationError as exc:
    +           errors[field_name] = get_error_detail(exc)
            except SkipField:
                continue

        if errors:
            raise ValidationError(errors)

        return res
    ```

### save

* Appeler la méthode `save()` du sérialiseur aura pour effet de créer ou mettre à jour une instance  
  — initialiser le sérialiseur avec l'instance en paramètre pour mettre à jour une instance existante.  
  `save` accepte également des paramètres supplémentaires, à assigner à l'instance en plus des paramètres validés. 

    ``` python
    # Check parameters
    serializer = self.get_serializer(instance, data=request.data, partial=partial)
    serializer.is_valid(raise_exception=True)

    # Additional checks
    if is_enabled := serializer.validated_data.get('is_enabled', False):
        ...

    # Update
    serializer.save(
        updated_by=self.request.user,
        is_active=is_enabled,
        **save_kwargs,
    )
    ```

### to_representation, data

* On peut récupérer les données formattées par sérialiseur  
  en appelant la méthode `to_representation()`

    ``` python
    data = AttrDict({
        'uuid': '8d6ba15e-b737-4b3c-8ff1-125f56270c68',
        'token': 'BYPASS',
        'decision': instance,
        'study': study,
        'nodules': study.get_nodules(),
    })

    # Serialize: success
    data = GenerateAIReportSerializer().to_representation(data)
    ```

* Ou récupérer les données formattées par le sérialiseur à partir des données qui étaient données en entrées  
  via la propriété `data`

    ``` python
    return Response(FileSerializer(instance=instance).data)
    ```

### initial_data, instance

* On peut récupérer les données initiales (avant cast) données au sérialiser  
  via la propriété `initial_data`

    ``` diff
    status = serializer.validated_data['status']

    # We received a valid JSON response, but the status isn’t “success”
    # Simply log the response
    if status != 'success':
        detail = 'json.validation'

        self.logger.warning(
            f'unexpected response data: {status}',
            extra={
                'request_uuid': self.request_uuid,
                'error_type': detail,
     +          'payload': serializer.initial_data,
            },
        )
    ```

* Et l'instance donnée au sérialiseur  
  via la propriété `instance`

    ``` python
    from rest_framework.exceptions import ValidationError

    def perform_update(self, serializer):

        # Check if updating the study is authorized at this point
        if serializer.instance.is_finalized:
            detail = _('This study has already been finalized')
            raise ValidationError(detail=detail)

        return super().perform_update(serializer)
    ```

---

## Créer un sérialiseur

### Serializer

* Pour créer un sérialiseur, créer une classe qui hérite de `rest_framework.serializers.Serializer` et déclarer des attributs héritant de `rest_framework.fields.Field`

    ``` python
    from rest_framework import serializers


    class UserAuthSerializer(serializers.Serializer):
        """Serializer checking data to authenticate an user."""

        username = serializers.CharField(required=True)
        password = serializers.CharField(required=True)
        cookie_reconnection = serializers.BooleanField(required=False, allow_null=True)

        class JSONAPIMeta:
            resource_name = 'login'
    ```

### Sérialiseur imbriqué

* Un sérialiseur peut avoir un champ qui renvoie à un autre sérialiseur (*nested serializer*), cela permet d'avoir des champs qui contiennent des valeurs complexes — objets ou tableaux.

    <ins>JSON</ins>:

    ``` json
    {
        "title": "Some title",
        "user": "Jeff",
        "tags": [
            {"name": "Tag 1"},
            {"name": "Tag 2"}
        ]
    }
    ```

    <ins>Python</ins>:

    ``` python
    class TagSerializer(serializers.Serializer):
        name = serializers.CharField(max_length=100)

    class RecipesSerializer(serializers.Serializer):
            title = serializers.CharField(max_length=100)
            user = serializers.CharField(max_length=100)
            tags = TagSerializer(many=True)
    ```

### ModelSerializer

* La classe `ModelSerializer` permet de créer un sérialiseur en utilisant directement les attributs définis sur le modèle.  
  Déclarer une sous-classe `Meta`, qui spécifie à minima

  - le modèle: attribut `model`
  - la liste des champs du modèle à utiliser: attribut `fields` ou `exclude`

#### fields

* Par exemple:
  - Tous les champs du modèle Customer:

    ``` python
    class CustomerFullSerializer(serializers.ModelSerializer):
        class Meta:
            model = Customer
            fields = '__all__'
    ```

  - Les champs donnés du modèle User:

    ``` python
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ["is_active", "id", "last_login"]
    ```

  - Tous les champs sauf ceux donnés  du modèle CustomerAddress:

    ``` python
    class CustomerAddressSerializer(serializers.ModelSerializer):
        class Meta:
            model = CustomerAddress
            exclude = ("customer",)
    ```

#### Field, source, SerializerMethodField

* Il est possible d'écraser des champs pour modifier le comportement par défaut

    ``` python
    class PatientSerializer(serializers.ModelSerializer):
        """
        Serializer to get/update a patient
        """
        created_by = relations.PrimaryKeyRelatedField(read_only=True)

        class JSONAPIMeta:
            resource_name = 'patient'

        class Meta:
            model = Patient
            exclude = (
                'firstname_sort',
                'lastname_sort',
                'last_studymedicalbloodtest',
            )
    ```

    La propriété `source` permet d'utiliser un champ du modèle sous un autre nom dans les données

    ``` python
    current_step_number = serializers.IntegerField(source='current_step_number_formatted', read_only=True)
    ```

    Et `format` de modifier le format d'une date

    ``` python
    class DicomStudySerializer(serializers.ModelSerializer):
        class Meta:
            model = DicomStudy
            fields = (
                'id',
                'StudyDate',
                'StudyTime',
            )
            extra_kwargs = {
                'StudyDate': {
                    'source': 'date',
                    'format': '%Y%m%d',
                    'help_text': 'YYYYMMDD',
                },
                'StudyTime': {
                    'source': 'time',
                    'format': '%H%M%S.000000',
                    'help_text': 'hhmmss.ffffff',
                },
            }
    ```

* On peut aussi ajouter des champs qui ne sont pas déclarés sur le modèle.

    ``` python
    class PatientCreateSerializer(PatientSerializer):
        """
        Serializer to create a patient
        """
        confirm = serializers.BooleanField(required=True, validators=[AcceptedValidator()])
    ```

    La vue devra retirer les champs validés qui ne font pas partie du modèle  
    (et qui ne sont pas en lecture-seule) avant d'appeler serializer.save 

    ``` python
    def perform_create(self, serializer):
        serializer.validated_data.pop('confirm', None)

        return serializer.save(
            created_by=self.request.user,
            doctor_referring=self.request.user,
        )
    ```

* Utiliser un champ `SerializerMethodField` permet de retourner une valeur calculée — en lecture seule.

    ``` python
    class PatientSerializer(serializers.ModelSerializer):
        permission = serializers.SerializerMethodField()

        def get_permission(self, obj) -> int:
            return getattr(obj, 'permission', None)
    ```

#### read_only_fields, extra_kwargs

* Plutôt qu'écraser le champ entièrement, et devoir redéfinir tous ses attributs,  
  on peut utiliser `read_only_fields` et `extra_kwargs`

    ``` python
    class PatientSerializer(serializers.ModelSerializer):

        class Meta:
            model = Patient
            fields = '__all__'

            read_only_fields = (
                'is_archived',
                'is_archived_reason',
                'is_archived_reason_specify',
            )
            extra_kwargs = {
                'birth_date': {
                    'required': True,
                    'allow_null': False,
                    'error_messages': {
                        'null': _('This field is required')
                    },
                },
            }
    ```

---

## Validation

### validators

* Si on utilise ModelSerializer, le `validators` du champ sera utilisé pour valider la valeur du champ s'il n'est pas vide.

    ``` python
    from django.core.exceptions import ValidationError

    def validate_file_extension(value):
        ext = 'dcm'
        if not value.name.endswith(f'.{ext}'):
            raise ValidationError(
                f'Invalid file: {value.name}! Only {ext} files are supported.'
            )

    class DicomImage(models.Model):
        dcm = models.FileField(
            max_length=1000,
            upload_to=get_upload_dicom_to,
            validators=[validate_file_extension],
            help_text='File Path',
            null=True,
        )
    ```

* De la même manière, on peut définir des `validators` sur les champs du sérialiseur

    ``` python
    from django.core.validators import RegexValidator

    digits_and_dots_only = RegexValidator(
        r'^\d+(\.\d+)*$', message='Digits and dots only!', code='invalid_uid'
    )

    class DicomImageSerializer(serializers.Serializer):
        """
        Serializer checking that
        the dicom file we've got contains DICOM attributes
        we would expect in an image instance
        """
        StudyInstanceUID = serializers.CharField(
            max_length=64,
            validators=[digits_and_dots_only],
            required=True,
            allow_null=False,
        )
    ```

* Django a un certain nombre de [validations natives](https://docs.djangoproject.com/en/4.1/ref/validators/#built-in-validators)

    ``` python
    from django.core.validators import (
        validate_email,
        URLValidator,
        MaxValueValidator,
        MinValueValidator,
    )
    from django.contrib.postgres.fields import ArrayField
    from django.contrib.postgres.validators import (
        ArrayMinLengthValidator,
        ArrayMaxLengthValidator,
    )

    email = serializers.CharField(
        required=True,
        max_length=254,
        validators=[validate_email],
    )
    url = models.CharField(
        _('URL on Doctolib'),
        max_length=255,
        blank=True,
        null=True,
        validators=[URLValidator()],
    )
    bits_allocated = models.PositiveIntegerField(
        validators=[MaxValueValidator(1024)],
        blank=True,
        null=True,
        help_text='Bits Allocated (0028,0100)',
    )
    pixel_spacing = ArrayField(
        models.FloatField(validators=[MinValueValidator(0)]),
        size=2,
        blank=True,
        null=True,
        help_text='Pixel Spacing (0028,0030)',
    )
    image_type = ArrayField(
        models.CharField(max_length=16),
        validators=[ArrayMinLengthValidator(2), ArrayMaxLengthValidator(10)],
        blank=True,
        null=True,
        help_text='Image Type (0008,0008)',
    )
    ```

### validate_FIELDNAME

* On peut également ajouter des validations sur un champ en créant une méthode `validate_FIELDNAME(value)`.  
  Notons que cette fonction sera appelée en dernier lieu, si les autres validations ont été validées.

    ``` python
    class PatientSerializer(serializers.ModelSerializer):
        """
        Serializer to get/update a patient
        """
        def validate_national_identification_number(self, value):
            # Serializer is not retrieving the value from run_validators
            # so we re-clean it
            if isinstance(value, str):
                return value.replace(' ', '').replace('-', '')

            return value
    ```

### is_valid

* Pour modifier la validation par défaut (par exemple effectuer des validations même si le champ est nul et accepte la valeur nulle),  
  ou ajouter des tests supplémentaires (comme effectuer des validations suivant la valeur d'un autre champ),  
  on peut écraser la méthode `is_valid(data)` du sérialiseur

    ``` python
    from rest_framework_json_api import serializers, relations
    from rest_framework.exceptions import ErrorDetail, ValidationError

    from django.utils.translation import ngettext

    from core.models.medical_center import MedicalCenter


    class MedicalCenterPrimaryKeyRelatedField(relations.PrimaryKeyRelatedField):
        model = MedicalCenter

        def get_queryset(self):
            return MedicalCenter.objects.all().only('id', 'name')

        def to_internal_value(self, data):
            """
            Accept both formats:
            - { "type": "medical-center", "id": 1 }
            - 1
            """
            if (
                isinstance(data, dict)
                and data.get('type', None) == 'medical-center'
            ):
                data = data.get('id', None)

            return super().to_internal_value(data)
    ```
    ``` python
    class SetMedicalCentersSerializer(serializers.ModelSerializer):
        """
        0 to N medical center
        """
        medical_centers = serializers.ManyRelatedField(
            child_relation=MedicalCenterPrimaryKeyRelatedField(),
            required=False,
            allow_empty=True,
        )

        def is_valid(self, raise_exception=False):
            _raise_exception = raise_exception

            res = super().is_valid(raise_exception=False)

            if self._errors:
                if medicalCenterErrors := self._errors.pop('medical_centers', None):
                    n = len(medicalCenterErrors)

                    if n > 1 or medicalCenterErrors[0].code == 'does_not_exist':
                        detail = ngettext(
                            '{n} choice is invalid.',
                            '{n} choices are invalid.', n).format(n=n)
                    else:
                        detail = str(medicalCenterErrors[0])

                    self._errors['medical_centers_errors'] = [
                        ErrorDetail(detail, code='invalid')
                    ]

                if _raise_exception:
                    raise ValidationError(self.errors)

            return res


    class SetRequiredMedicalCentersSerializer(SetMedicalCentersSerializer):
        """
        1 to N medical center
        """
        medical_centers = serializers.ManyRelatedField(
            child_relation=MedicalCenterPrimaryKeyRelatedField(),
            required=True,
            allow_empty=False,
        )
    ```
    ``` python
    class SetMedicalCenterSerializer(serializers.ModelSerializer):
        """
        0 to 1 medical center
        """
        medical_center = MedicalCenterPrimaryKeyRelatedField(
            required=False,
            allow_null=True,
        )

        def is_valid(self, raise_exception=False):
            _raise_exception = raise_exception

            res = super().is_valid(raise_exception=False)

            # Raise medical_center errors on medical_center_errors
            if self._errors:
                if medicalCenterErrors := self._errors.pop('medical_center', None):
                    self._errors['medical_center_errors'] = medicalCenterErrors

                if _raise_exception:
                    raise ValidationError(self.errors)
            return res


    class SetRequiredMedicalCenterSerializer(SetMedicalCenterSerializer):
        """
        Exactly 1 medical center
        """
        medical_center = MedicalCenterPrimaryKeyRelatedField(
            required=True,
            allow_null=False,
        )
    ```

### validate

* On peut également ajouter des validations qui dépendent de plusieurs attributs avec la méthode `validate`

    ``` python

    class PatientACLSerializer(serializers.ModelSerializer):
        def validate(self, data):
            """
            On calling is_valid: add additional parameters validation
            """

            # On create/update: check patient transfer
            if data.get('permission', None) == PatientACL.PERMISSION_EXECUTE:

                # Trying to set EXECUTE on group: rejected
                if data.get('object_type') != PatientACL.TYPE_USER:
                    raise ValidationError({
                        'permission': ErrorDetail(_('Ownership can only be set on users'), code='invalid'),
                    })

            return data
    ```

## Créer des validations

### Fonction

* Pour créer des validations personnalisées, on peut soit créer une fonction

    ``` python
    import re

    from django.utils.translation import gettext as _
    from django.core.exceptions import ValidationError as DjangoValidationError


    def validate_rpps_number(value):
        """
        Validate a RPPS number.
        Must be a 11-digit number.
        """
        regex = re.compile(r'^\d{11}$')
        if not regex.search(value):
            raise DjangoValidationError(_('{} isn’t a valid RPPS number (11 digits number)').format(value))
    ```

    ``` python
    class User(AbstractBaseUser):
        rpps_number = models.CharField(
            _('RPPS number'),
            max_length=11,
            null=True,
            unique=True,
            validators=[validate_rpps_number],
            error_messages={
                'unique': _('A user with that RPPS number already exists.'),
            },
            help_text='Répertoire partagé des professionnels de santé (RPPS)',
        )
    ```

### Classe

* Ou créer une classe qui implémente `__call__`

    ``` python
    import re
    from datetime import date

    from django.core.exceptions import ValidationError as DjangoValidationError
    from django.utils.deconstruct import deconstructible
    from django.utils.translation import gettext_lazy as _


    nin_re = re.compile(
        r'^(?P<gender>[1278])(?P<year_of_birth>\d{2})(?P<month_of_birth>0[1-9]|1[0-2]|20|3[0-9]|4[0-2]|[5-9][0-9])'
        r'(?P<department_of_origin>\d{2}|2[AB])(?P<commune_of_origin>\d{3})(?P<person_unique_number>\d{3})'
        r'(?P<control_key>\d{2})$')


    @deconstructible
    class NationalIdentificationNumberValidator:
        """
        Check that the given text is a valid french social security number
        Rules are shamelessly copied from
            django-localflavor.localflavor.fr.forms.FRNationalIdentificationNumber

        see https://www.service-public.fr/particuliers/vosdroits/F33078
        """
        message = _('Invalid French National Identification number.')
        code = 'invalid'

        def __init__(self, message=None):
            if message:
                self.message = message

        def __call__(self, value):

            # Check format is correct
            value = self.clean(value)
            match = nin_re.match(value)

            if not match:
                raise DjangoValidationError(self.message, code=self.code)

            # Extract all parts of social number
            gender = match.group('gender')
            year_of_birth = match.group('year_of_birth')
            month_of_birth = match.group('month_of_birth')
            department_of_origin = match.group('department_of_origin')
            commune_of_origin = match.group('commune_of_origin')
            person_unique_number = match.group('person_unique_number')
            control_key = int(match.group('control_key'))

            # Get current year
            current_year = int(str(date.today().year)[2:])

            commune_of_origin, department_of_origin = self._check_department_and_commune(
                commune_of_origin,
                current_year,
                department_of_origin,
                year_of_birth,
            )

            if person_unique_number == '000':
                raise DjangoValidationError(self.message, code=self.code)

            if control_key > 97:
                raise DjangoValidationError(self.message, code=self.code)

            control_number = int(
                gender
                + year_of_birth
                + month_of_birth
                + department_of_origin.replace('A', '0').replace('B', '0')
                + commune_of_origin
                + person_unique_number
            )
            if (97 - control_number % 97) != control_key:
                raise DjangoValidationError(self.message, code=self.code)

        def __eq__(self, other):
            return (
                isinstance(other, self.__class__)
                and self.message == other.message
                and self.code == other.code
            )

        def clean(self, value):
            return value.replace(' ', '').replace('-', '')

        def _check_department_and_commune(
            self,
            commune_of_origin,
            current_year,
            department_of_origin,
            year_of_birth,
        ):
            # Born in Corsisa
            if department_of_origin in ['20', '2A', '2B']:
                self._check_corsica(
                    commune_of_origin,
                    current_year,
                    department_of_origin,
                    year_of_birth,
                )
            # Born in a DOM-TOM (ie Guadeloupe)
            elif department_of_origin in ['97', '98']:
                self._check_overseas(
                    commune_of_origin,
                    current_year,
                    department_of_origin,
                    year_of_birth,
                )
            # Born in a foreign country
            elif department_of_origin == '99':
                self._check_foreign_countries(
                    commune_of_origin,
                    current_year,
                    department_of_origin,
                    year_of_birth,
                )
            return commune_of_origin, department_of_origin

        def _check_corsica(
            self,
            commune_of_origin,
            current_year,
            department_of_origin,
            year_of_birth,
        ):
            """
            Departments number 20, 2A and 2B represent Corsica
            """
            # For people born before 1976, Corsica number was 20
            if current_year < int(year_of_birth) < 76 and department_of_origin != '20':
                raise DjangoValidationError(self.message, code=self.code)

            # For people born from 1976, Corsica dep number is either 2A or 2B
            if (int(year_of_birth) > 75 and department_of_origin not in ['2A', '2B']):
                raise DjangoValidationError(self.message, code=self.code)

        def _check_overseas(
            self,
            commune_of_origin,
            current_year,
            department_of_origin,
            year_of_birth,
        ):
            """
            Overseas department numbers starts with 97 or 98 and are 3 digits long
            """
            overseas_department_of_origin = department_of_origin + commune_of_origin[:1]
            overseas_commune_of_origin = commune_of_origin[1:]

            if department_of_origin == '97' and int(overseas_department_of_origin) not in range(971, 978):
                raise DjangoValidationError(self.message, code=self.code)

            elif department_of_origin == '98' and int(overseas_department_of_origin) not in range(984, 989):
                raise DjangoValidationError(self.message, code=self.code)

            if int(overseas_commune_of_origin) < 1 or int(overseas_commune_of_origin) > 90:
                raise DjangoValidationError(self.message, code=self.code)

        def _check_foreign_countries(
            self,
            commune_of_origin,
            current_year,
            department_of_origin,
            year_of_birth,
        ):
            """
            The department_of_origin '99' is reserved for people born in a foreign country.
            In this case, commune_of_origin is the INSEE country code, must be [001-990]
            """
            if int(commune_of_origin) < 1 or int(commune_of_origin) > 990:
                raise DjangoValidationError(self.message, code=self.code)
    ```

    ``` python
    class Patient(models.Model):
        national_identification_number = EncryptedCharField(
            _('social security number'),
            validators=[NationalIdentificationNumberValidator()],
            max_length=15,
            blank=True,
            null=True,
        )
    ```
    ``` python
    def compute_nin(sex, year, month, dept, town, order):
        """
        see NationalIdentificationNumberValidator
        """
        _num = int(
            sex
            + year
            + month
            + dept.replace('2A', '19').replace('2B', '18')
            + town
            + order
        )
        key = 97 - (_num % 97)

        return '{sex}{year}{month}{dept}{town}{order}{key:02d}'.format(
            sex=sex,
            year=year,
            month=month,
            dept=dept,
            town=town,
            order=order,
            key=key,
        )
    ```
