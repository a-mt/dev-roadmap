---
title: Parser
category: Python, Django, DRF
---

## Parser

* Le parser lit les données POST et FILES en entrée,  
  les traite suivant le format des données déclaré (ex `application/json` ou `multipart/form-data`)  
  et popule `request.data` avec le résultat.  
  Par exemple, si les données en entrées est une chaîne de caractères JSON, alors request.data contiendra le JSON décodé.

### Default

* La liste par défaut des parsers se définit dans les configurations

    ``` python
    REST_FRAMEWORK = {
        "DEFAULT_PARSER_CLASSES": (
            "rest_framework_json_api.parsers.JSONParser",
            "rest_framework.parsers.FormParser",
            "rest_framework.parsers.MultiPartParser",
        ),
    }
    ```

### Class attribute

* On peut écraser la liste des parsers dans les attributs de classe

    ``` python
    from rest_framework import parsers, viewsets

    class AttachmentViewSet(viewsets.GenericViewSet):
        ...
        parser_classes = (parsers.MultiPartParser,)
    ```

### Method attribute

* Ou de méthode

    ``` python
    class FileViewSet(GenericViewSet):

        @swagger_auto_schema(responses={
            200: FileSerializer,
        })
        @action(
            methods=['POST'],
            url_path='upload-scanner',
            parser_classes=(parsers.MultiPartParser,),
        )
        def upload_scanner(self, request, *args, **kwargs):
            """
            multipart/form-data

            Endpoint to upload a scanner
            """
            pass
    ```

### Content-type

* Le client spécifie le format en entrée dans l'entête HTTP Content-Type

  ``` js
  hash.headers['Content-Type'] = 'application/json';
  ```

---

## Renderer

* Le renderer permet de formatter les données en sortie.

### Default

* La liste par défaut des renderers se définit dans les configurations

    ``` python
    REST_FRAMEWORK = {
        "DEFAULT_RENDERER_CLASSES": (
            "rest_framework_json_api.renderers.JSONRenderer",
            "rest_framework.renderers.BrowsableAPIRenderer",
        ),
    ```

### Class attribute

* La liste des renderers disponibles peut être définit comme attribut de la classe

    ``` python
    from rest_framework.renderers import JSONRenderer

    class DicomStudyViewSet(
        mixins.ListModelMixin,
        GenericViewSet,
    ):
        """
        application/json

        Retrieve a list of studies, in the (json) format expected by Ohif
        """
        renderer_classes = (JSONRenderer,)
        serializer_class = DicomStudyListSerializer
    ```

    ``` python
    from rest_framework import status, metadata
    from rest_framework.parsers import JSONParser
    from rest_framework.response import Response
    from rest_framework.renderers import JSONRenderer
    from rest_framework.pagination import PageNumberPagination
    from rest_framework.serializers import Serializer


    class RegularApiMixin:
        """
        Reset to DRF defaults.
        """

        parser_classes = (JSONParser,)
        renderer_classes = (JSONRenderer,)

        metadata_class = metadata.SimpleMetadata
        pagination_class = PageNumberPagination

        serializer_class = Serializer
        response_status = status.HTTP_204_NO_CONTENT
    ```

### Accept

* Le client peut requêter un format plutôt qu'un autre en précisant l'entête HTTP Accept

  ``` js
      adapter
        .ajax(url, 'GET', {
          headers: {
            Accept: 'application/json',
          },
        })
        .then((payload) => {
          ...
        });
  ```

  Des wildcards et des options peuvent être utilisés.
  Des format valides incluent:

  ```
  'application/json; indent=4'
  'application/json'
  'text/*'
  '*/*'
  ```

* Si le client envoie `Accept: */*` (qui est l'entête HTTP envoyée par défaut par les navigateurs),  
  alors le premier renderer de la liste matchera et sera utilisé.
