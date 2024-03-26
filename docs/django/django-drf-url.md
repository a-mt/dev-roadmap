---
title: Vues & URLs
category: Python, Django, DRF
---

## Vue

### APIView

* Les vues DRF utilisent la classe `rest_framework.views.APIView`, une sous-classe de `django.views.generic.View`.

  - Les requêtes transmises aux vues sont des instances de `rest_framework.request.Request`  
    et non `django.http.HttpRequest` — qui ajoute de la logique par dessus la requête Django.

  - Un certain nombre d'attributs peuvent être définis sur la classe pour contrôler les entrées et sorties — authentification, permissions, format des données, etc.

    ``` python
    from rest_framework.schemas import DefaultSchema
    from rest_framework.settings import api_settings

    from django.views.generic import View


    class APIView(View):

        # The following policies may be set at either globally, or per-view.
        renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES
        parser_classes = api_settings.DEFAULT_PARSER_CLASSES
        authentication_classes = api_settings.DEFAULT_AUTHENTICATION_CLASSES
        throttle_classes = api_settings.DEFAULT_THROTTLE_CLASSES
        permission_classes = api_settings.DEFAULT_PERMISSION_CLASSES
        content_negotiation_class = api_settings.DEFAULT_CONTENT_NEGOTIATION_CLASS
        metadata_class = api_settings.DEFAULT_METADATA_CLASS
        versioning_class = api_settings.DEFAULT_VERSIONING_CLASS

        # Allow dependency injection of other settings to make testing easier.
        settings = api_settings

        schema = DefaultSchema()
    ```

* On peut facilement ajouter les routes CRUD en utilisant GenericViewSet et des mixins

    ``` python
    from rest_framework import mixins
    from rest_framework.viewsets import GenericViewSet

    class PatientViewSet(
        mixins.CreateModelMixin,
        mixins.RetrieveModelMixin,
        mixins.UpdateModelMixin,
        mixins.ListModelMixin,
        mixins.DestroyModelMixin,
        GenericViewSet,
    ):
        """
        View to list/create/update/delete patients
        """
        queryset = Patient.objects.all()
        serializer_class = PatientSerializer
    ```

    Ou alors ModelViewSet, qui ajoute directement toutes les méthodes CRUD

    ``` python
    from rest_framework import viewsets

    class RestaurantViewSet(viewsets.ModelViewSet):
        queryset = Restaurant.objects.all()
        serializer_class = RestaurantSerializer
    ```

* On peut ajouter d'autres endpoints grâce au décorateur `@action`  
  La propriété `detail` permet de spécifier si on attend une primary key dans l'URL ou non — détail ou liste.

    ``` python
    from rest_framework.decorators import action

    class ProtocolInformationViewSet(ReadOnlyModelViewSet):

        @action(detail=True, methods=['PUT'])
        def subscribe(self, request, pk=None):
            pass
    ```

    Par défaut, l'endpoint utilise le nom de la méthode dans l'URL, on peut spécifier une URL différente:

    ``` python
    class RecordViewSet(GenericViewSet):

        @action(detail=True, methods=['PUT'], url_path='post-save')
        def post_save(self, request, pk):
            pass
    ```

    Et on peut ajouter des paramètres dans l'URL:

    ``` python
    class DownloadFileViewSet(GenericViewSet):

        @action(detail=True, methods=['GET'], url_path=r'(?P<study_id>[\w-]+)/(?P<file_id>[\w-]+)')
        def download(self, request, study_id, file_id, **kwargs):
            pass
    ```

### api_view

* Le décorateur `api_view` permet de créer une vue DRF à partir d'une fonction

    ``` python
    from rest_framework.decorators import api_view

    @api_view()
    def avatars(request, filename):
        pass
    ```

---

## Router

* Pour créer les endpoints associés à un ViewSet, on se sert de SimpleRouter ou DefaultRouter.  
  `routers.DefaultRouter()` est similaire à `routers.SimpleRouter()`,  
   mais ajoute en plus une vue racine par défaut, qui renvoie la liste des hyperliens de toutes les vues.

    ``` python
    from rest_framework import routers

    router = routers.DefaultRouter()
    router.register(r'restaurant', views.RestaurantViewSet, basename='restaurant')

    urlpatterns = router.urls
    ```

    Dans cet exemple, les URLs suivantes seront ajoutées:

    ```
    GET /restaurant/ — liste des restaurants
    POST /restaurant/ — créer un nouveau restaurant
    GET /restaurant/:id — récupérer un restaurant
    PATCH /restaurant/:id — mettre à jour un restaurant
    DELETE /restaurant/:id — supprimer un restaurant
    ```

* Le paramètre `trailing_slash` permet de contrôler si on veut un slash final dans l'URL ou non

    ``` python
    router = routers.DefaultRouter(trailing_slash=False)
    ```

    <details>
      <summary><ins>core/router.py</ins></summary>

      <pre lang="python">
      from django.http import Http404
      from django.urls import path

      from rest_framework import routers


      def noindex(request):
          raise Http404


      class SimpleRouter(routers.SimpleRouter):
          root_view_name = 'api-noindex'
          include_root_view = True

          def __init__(self, *args, **kwargs):
              kwargs.setdefault('trailing_slash', False)

              super().__init__(*args, **kwargs)

          def get_urls(self):
              urls = super().get_urls()

              if self.include_root_view:
                  root_url = path(r'', noindex, name=self.root_view_name)
                  urls.append(root_url)

              return urls
      </pre>
    </details>
