---
title: Swagger
category: Python, Django, Docs
---

* Swagger est un package permettant de documenter une API. Concrètement, il parse le code pour en extraire les informations (commentaires, type-hinting et annotations), et la documentation ainsi générée peut ensuite être visualisée via un endpoint ou être exportée pour postman.

## Ajouter swagger

* Installer les packages coreapi et swagger (yasg)  
  Ici pour une API JSON Django Rest Framework:

    ```
    pip install coreapi
    pip install drf-yasg-json-api
    ```

* Activer l'application dans les configurations

    ``` python
    INSTALLED_APPS = [
        ...
        'drf_yasg',
    ]
    ```

    Et définir les configurations de swagger:

    ``` python
    SWAGGER_SETTINGS = {
        'DEFAULT_AUTO_SCHEMA_CLASS': 'drf_yasg_json_api.inspectors.SwaggerAutoSchema',

        'DEFAULT_FIELD_INSPECTORS': [
            'drf_yasg_json_api.inspectors.NamesFormatFilter',
            'drf_yasg.inspectors.RecursiveFieldInspector',
            'drf_yasg_json_api.inspectors.XPropertiesFilter',
            'drf_yasg.inspectors.ReferencingSerializerInspector',
            'drf_yasg_json_api.inspectors.IntegerIDFieldInspector',
            'drf_yasg.inspectors.ChoiceFieldInspector',
            'drf_yasg.inspectors.FileFieldInspector',
            'drf_yasg.inspectors.DictFieldInspector',
            'drf_yasg.inspectors.JSONFieldInspector',
            'drf_yasg.inspectors.HiddenFieldInspector',
            'drf_yasg_json_api.inspectors.ManyRelatedFieldInspector',
            'drf_yasg_json_api.inspectors.IntegerPrimaryKeyRelatedFieldInspector',
            'drf_yasg.inspectors.RelatedFieldInspector',
            'drf_yasg.inspectors.SerializerMethodFieldInspector',
            'drf_yasg.inspectors.SimpleFieldInspector',
            'drf_yasg.inspectors.StringDefaultFieldInspector',
        ],
        'DEFAULT_FILTER_INSPECTORS': [
            'drf_yasg_json_api.inspectors.DjangoFilterInspector',
            'drf_yasg.inspectors.CoreAPICompatInspector',
        ],
        'DEFAULT_PAGINATOR_INSPECTORS': [
            'drf_yasg_json_api.inspectors.DjangoRestResponsePagination',
            'drf_yasg.inspectors.DjangoRestResponsePagination',
            'drf_yasg.inspectors.CoreAPICompatInspector',
        ],
    }
    ```

* Créer un endpoint à partir de `get_schema_view`.  
  Et les endpoints login et logout pour pouvoir se connecter / se déconnecter à partir de swagger
  et facilement tester les endpoints interractivement sans passer par les devtools.

    ``` python
    try:
        if not settings.SWAGGER_SETTINGS:
            raise AttributeError

        from rest_framework import permissions
        from drf_yasg.views import get_schema_view
        from drf_yasg import openapi
        from django.contrib.auth import views as auth_views

        schema_view = get_schema_view(
            openapi.Info(
                title='API MyProject',
                default_version='v1',
            ),
            public=True,
            permission_classes=[permissions.AllowAny],
            # patterns=schema_urlpatterns,
        )
        urlpatterns += [
            path('swagger/', schema_view.with_ui('swagger', cache_timeout=0)),
            path('accounts/login/', auth_views.LoginView.as_view(), name='login'),
            path('accounts/logout/', auth_views.LogoutView.as_view(), name='logout'),
        ]

    except AttributeError:
        pass
    ```

* Le schéma de l'API sera ainsi disponible sur  
  `http://localhost:8000/swagger/`

  Ou pour l'importer sur Postman: File > Import > Link:  
  `http://localhost:8000/swagger/?format=openapi`

* Swagger génère la documentation dynamiquement à chaque fois qu'on accède à sa vue, il n'y a pas de mise en cache, simplement rafraichir la page pour avoir la documentation mise à jour.

## API View

* Toutes les URLs connues par le router, associée à un vue API, seront ajoutées à swagger:

    * Fonction avec décorateur @api_view

        ``` python
        from rest_framework.decorators import api_view

        @api_view()
        def avatars(request, filename):
            pass
        ```

    * Méthodes get/post/delete/put/patch dans une classe ViewSet

        ``` python
        from rest_framework import mixins, viewsets

        class FileViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
            queryset = File.objects.all()
            serializer_class = FileSerializer
            pagination_class = None

            def get_queryset(self):
                qs = super().get_queryset()

                return (
                    qs
                    .order_by('is_params', '-pk')
                    .distinct('is_params')
                )
        ```

    * Méthodes personnalisées (décorateur @action) dans une classe ViewSet

        ``` python
        from rest_framework import viewsets
        from rest_framework.decorators import action

        class AuthViewSet(viewsets.GenericViewSet):
            serializer_class = UserAuthSerializer
            permission_classes = (AllowAny,)

            @action(detail=False, methods=['GET'], url_path='is-authenticated')
            def is_authenticated(self, request, **kwargs):
                pass
        ```

## Exclure

* On peut forcer swagger à ne pas afficher un endpoint en définissant manuellement le schema à `None`:

    ``` python
    from rest_framework.decorators import api_view, schema

    @api_view()
    @schema(None)
    def avatars(request, filename):
        pass
    ```

* Ou restreindre swagger à un sous-ensemble d'endpoints avec la propriété `patterns`:

    ``` python
    schema_view = get_schema_view(
        ...
        patterns=urlpatterns,
    )
    ```

## Response

* Si une vue utilise un sérialiseur différent en entrée et en sortie,  
  annoter la vue pour définir le sérialiseur en sortie

    ``` diff
    from drf_yasg.utils import swagger_auto_schema

    class UserSettingsViewSet(GenericViewSet):
        """
        View to update user data
        """
        serializer_class = UserSettingsSerializer
        lookup_url_kwarg = None
        lookup_field = None

        def get_serializer_class(self):
            if self.action == 'password':
                return UserPasswordSerializer

            return self.serializer_class

    +   @swagger_auto_schema(responses={
    +       200: UserSettingsSerializer,
    +   })
        @action(methods=['PUT'], url_path='password')
        def password(self, request, **kwargs):
            """
            Update the user password (My Settings > Password)
            """
            pass
    ```

* Si ce n'est pas un sérialiseur, on peut simplement passer une chaîne de caractère

    ``` python
    @swagger_auto_schema(
        responses={
            200: 'application/octet-stream (.zip)',
        },
    )
    @action(
        detail=True,
        methods=['GET'],
        url_path=r'download-scanner',
    )
    def download_scanner(self, request, *args, **kwargs):
        pass
    ```

* Et si plusieurs statuts sont possibles, on peut définir types de réponses:

    ``` python
    @swagger_auto_schema(responses={
        200: PatientACLSerializer,
        204: 'ack transfer',
    })
    def create(self, request, *args, **kwargs):
        pass
    ```

## Docstring

* Swagger affichera la docstring de la méthode si elle existe, sinon celle de la vue

    ``` python
    class UserNotificationViewSet(
        mixins.ListModelMixin,
        GenericViewSet,
    ):
        """
        View to retrieve the current user's notifications
        """
        queryset = UserNotification.objects.all()
        serializer_class = UserNotificationSerializer
        pagination_class = CursorPagination

        def get_serializer_class(self):
            if self.action == 'did_read':
                return NotificationIdsSerializer

            return self.serializer_class

        @swagger_auto_schema(responses={
            204: 'ack',
        })
        @action(methods=['POST'], url_path='did-read')
        def did_read(self, request, **kwargs):
            """
            Mark given notifications as read
            Doesn't check if the given ids are actual notifications or not
            """
            pass
        ```

* On peut ajouter un commentaire affiché directement sur la ligne du endpoint  
  en ajoutant une ligne au début de la docstring suivie d'une ligne vide

    ``` python
    @swagger_auto_schema(responses={
        200: FileSerializer,
    })
    @action(
        methods=['POST'],
        url_path='upload-report',
        parser_classes=(parsers.MultiPartParser,),
    )
    def upload_report(self, request, *args, **kwargs):
        """
        multipart/form-data

        Endpoint for files not associated to any study but to a given patient.
        Takes in a .pdf and creates a FileReport instance
        """
        pass
    ```

    ![](https://i.imgur.com/Y1GbDrb.png)

## Données en entrées

* Pour afficher les données en entrées, swagger récupère directement la classe du sérialiseur et en extrait les attributs

    ``` python
    class StudyEventViewSet(AbstractStudyViewSet):
        queryset = StudyEvent.objects.all()
        serializer_class = StudyEventSerializer

        def get_serializer_class(self):
            if self.action == 'create':
                return StudyEventCreateSerializer

            return self.serializer_class
    ```

* On peut indiquer à swagger qu'il n'y a pas de sérialiseur en entrée avec `no_body`

    ``` python
    from drf_yasg.utils import no_body, swagger_auto_schema

    @swagger_auto_schema(request_body=no_body, responses={
        200: StudyEventSerializer,
    })
    @action(detail=True, methods=['POST'], url_path='finalize')
    def finalize(self, request, *args, **kwargs):
        pass
    ```

* Et si la classe n'a pas de sérialiseur, pour éviter une erreur définir `resource_name` directement sur la classe

    ``` python
    class TaskProgressViewSet(GenericViewSet):
        permission_classes = (AllowAny,)
        resource_name = 'task'
        renderer_classes = (JSONRenderer,)

        def get_serializer(self, *args, **kwargs):
            return None

        @swagger_auto_schema(responses={
            200: ProgressDataSerializer,
        })
        @action(methods=['GET'], url_path=r'(?P<task_id>[\w-]+)')
        def get(self, request, task_id):
            pass
    ```

## Paramètres en entrées — Formulaire

* Par défaut, swagger affichera un formulaire permettant d'entrer les paramètres en entrées sur les routes de listes (`detail=False`)

  ![](https://i.imgur.com/X224l5q.png)

* Pour l'ajouter sur d'autres endpoints, annoter la vue avec `query_serializer`:

    ``` python
    @swagger_auto_schema(
        query_serializer=SearchUserSerializer,
        responses={
            200: UserSerializer,
        },
    )
    @action(methods=['GET'], url_path='prospects')
    def prospects(self, request, **kwargs):
        """
        List/search users to add
        """
        # Search users
        search = request.query_params.get('search', '').strip().upper()
    ```

## Tags

* Swagger groupe automatiquement les endpoints ensemble, mais il possible de définir manuellement le groupe auquel un endpoint appartient en définissant `tags`

    ``` diff
    @swagger_auto_schema(
    +   tags=['file'],
        responses={
            200: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet (.xlsx)',
        },
    )
    @action(methods=['GET'], url_path=r'(?P<study_id>[\w-]+)/(?P<file_id>[\w-]+)')
    def download(self, request, study_id, file_id, **kwargs):
    ```

## Swagger fake view

* Pour éviter que swagger évalue le queryset au moment où il génère la documentation (ce qui peut poser problème notamment si on essaie d'accéder à request.user), retourner un queryset vide si l'attribut `swagger_fake_view` existe sur la vue.

    ``` python
    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return super().get_queryset().none()

        # Limit to accessible patients
        qs = self.request.user.annotate_patient_permission(
            super().get_queryset(),
            'patient__patientacl',
        )
        return qs
    ```

## Sérialiseur

* Les sérialiseurs sont utilisés pour valider le format des données. Ils sont également utilisés par swagger pour afficher les données en entrée et en sortie. On peut les annoter pour rectifier les infos détectée par swagger

### Champs

* Champ simple

    ``` python
    class NotificationAllSerializer(serializers.Serializer):
        """
        Takes a single id
        Does not check if it actually is a valid notification id
        """
        last_known_id = serializers.IntegerField(min_value=1)

        class JSONAPIMeta:
            resource_name = 'user-notification-all'
    ```

* Liste de champs simples

    ``` python
    class NotificationIdsSerializer(serializers.Serializer):
        """
        Takes a list of ids
        Does not check if they actually are valid notifications id
        """
        ids = serializers.ListField(
            child=serializers.IntegerField(min_value=1),
        )

        class JSONAPIMeta:
            resource_name = 'user-notification-ids'
    ```

* Foreign key

    ``` python
    updated_by = relations.PrimaryKeyRelatedField(read_only=True)
    ```

* Objet

    ``` python
    class DicomImageSerializer(serializers.ModelSerializer):
        metadata = DicomImageMetadataSerializer()
    ```

* Liste d'objets

    ``` python
    class DicomSeriesSerializer(serializers.ModelSerializer):
        instances = relations.ManyRelatedField(
            source='image_set',
            child_relation=DicomImageSerializer(),
        )
    ```

* Champ calculé  
  Pour que swagger sache le type retourné par le champ, utiliser le type-hinting

    ``` python
    class FileSerializer(serializers.ModelSerializer):
        """
        Serializer sending back infos for a list of files.
        """
        view_path = serializers.SerializerMethodField()
        extra = serializers.SerializerMethodField()
        n_users = serializers.SerializerMethodField()

        def get_view_path(self, instance) -> str:
            return None

        def get_extra(self, instance) -> dict:
            return {}

        def get_n_users(self, instance) -> int:
            return getattr(instance, 'n_users', None)

    ```

### read_only

* Si un champ est `read_only` alors ce champ est affiché en sortie et non en entrée

    ``` python
    class FileSerializer(serializers.ModelSerializer):
        study = relations.PrimaryKeyRelatedField(read_only=True)
        study_is_finalized = serializers.BooleanField(
            read_only=True,
            source='study.is_finalized',
        )
    ```

* Pour les attributs crées à partir du modèle, le champ sera automatiquement marqué read_only s'il a été définit `editable=False` dans le modèle.

    ``` python
    has_blood_test_date = models.BooleanField(
        default=False,
        editable=False,
    )
    ```

* On peut venir ré-écraser cette valeur avec `extra_kwargs`

    ``` python
    class StudyMedicalBloodTestSerializer(serializers.ModelSerializer):
        model = StudyMedicalBloodTest
        fields = (
            'blood_test_date',
            'blood_test_status_no',
            'blood_test_status',
        )
        extra_kwargs = {
            'blood_test_date': {
                'read_only': False,
                'required': True,
                'allow_null': True,
            },
            'blood_test_status_no': {
                'read_only': False,
                'required': False,
            },
        }
    ```

### help_text

* `help_text` permet d'ajouter un commentaire destiné aux dev

    ``` python
    from rest_framework_json_api import serializers


    class StatsDashboardSerializer(serializers.Serializer):
        count_patient = serializers.IntegerField(required=True, help_text='Total patient')
        count_patient_to_finalize = serializers.IntegerField(required=True, help_text='Being tracked')
        count_patient_excluded = serializers.IntegerField(required=True, help_text='Discontinued')

        class JSONAPIMeta:
            resource_name = 'stats-dashboard'
    ```

* Pour les attributs crées à partir du modèle, cette valeur est récupérée à partir de la propriété de même nom

    ``` python
    convocation_date = models.DateField(
        _('date'),
        null=True,
        help_text='Date is set = patient was convoked',
    )
    ```

* Et on peut l'écraser dans le sérialiser avec `extra_args`

    ``` python
    class DicomStudySerializer(serializers.ModelSerializer):
        class Meta:
            model = DicomStudy
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

### Autres indications

* `required`: l'attribut doit obligatoirement être définit  
  `allow_null`: la valeur peut être `None`  
  `allow_blank`: la valeur peut être vide  
  `choices`: liste des valeurs acceptées  
  `max_length`: longueur maximale du champ  
  `min_length`: longueur mininmale du champ

    ``` python
    patient = PatientPrimaryKeyRelatedField(
        required=True,
        allow_null=False,
    )
    name = serializers.CharField(
        required=False,
        allow_blank=True,
    )
    date = serializers.DateField(
        required=False,
        allow_null=True,
    )
    object_type = serializers.ChoiceField(
        choices=PatientACL.TYPE_CHOICES,
    )
    StudyInstanceUID = serializers.CharField(
        max_length=64,
        validators=[digits_and_dots_only],
        required=True,
        allow_null=False,
    )
    to_property = serializers.ChoiceField(
        required=True,
        allow_blank=False,
        choices=[
            ('nonInclusionScannerFilereport', 'inclusion: last scanner'),
            ('paraclinicalCpetFilereport', 'paraclinical: CPET report'),
        ]
    )
    ```
