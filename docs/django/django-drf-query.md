---  
title: Queryset & filterset
category: Python, Django, DRF
---

## Queryset

### get_queryset

* Définir l'attribut `queryset` permet de définir la manière dont les entités de la vue seront récupérées

    ``` python
    class FileViewSet(GenericViewSet):
        queryset = File.objects.all()
    ```

    Il est important de noter qu'en utilisant directement `self.queryset`, une fois évalué les résultats seront mis en cache pour toutes les requêtes suivantes. Pour éviter une memory leak, on utilise à la place `self.get_queryset()`, qui construit une nouvelle queryset à chaque requête à partir de l'attribut queryset. C'est cette méthode qui est utilisée dans les méthodes natives de DRF, `get_object` et `list` — pour récupérer le détail d'une entité et la liste des entités respectivement.

* Pour appliquer un queryset différent suivant la vue, écraser `get_queryset`

    ``` python
    class FileViewSet(GenericViewSet):
        queryset = File.objects.all()

        def get_queryset(self):
            if getattr(self, 'swagger_fake_view', False):
                return super().get_queryset().none()

            qs = super().get_queryset()

            if self.action == 'list':
                return (
                    qs
                    .non_polymorphic()
                    .order_by('-id')
                    .only(
                        'id',
                        'created_at',
                        'created_by_id',
                        'date',
                        'name',
                        'flag',
                        'patient_id',
                        'polymorphic_ctype',
                    )
                )

            return qs
    ```

---

## Filtres

### filter_backend

* On peut facilement ajouter des filtres au queryset suivant les paramètres GET en ajoutant l'attribut `filter_backends` sur la vue.  
  DRF bouclera sur cette liste pour ajouter des filtres sur le queryset.

  L'exemple suivant ajoute un filtre suivant le paramètre GET search — par exemple ?search=text:

    ``` python
    from rest_framework.filters import BaseFilterBackend, SearchFilter

    class SearchFilter(BaseFilterBackend):
        search_param = 'search'
        search_title = 'Search'
        search_description = 'A search term.'

        get_schema_fields = SearchFilter.get_schema_fields
        get_schema_operation_parameters = SearchFilter.get_schema_operation_parameters

        def filter_queryset(self, request, queryset, view):
            search = request.query_params.get(self.search_param, '').strip()

            if search:
                return (
                    SearchQuerySet
                    .add_inner_join(queryset, search)
                    .order_by('-search_matches', '-search_score', 'pk')
                )

            return queryset.order_by('pk')


    class SearchViewSet(
        mixins.ListModelMixin,
        GenericViewSet,
    ):
        filter_backends = (SearchFilter,)
    ```

### filterset_class

* Le backend Filterset de `django_filters.rest_framework.DjangoFilterBackend`  
  permet d'ajouter des filtres à partir des champs du modèle, grâce à l'attribut de classe `filterset_fields`

    ``` python
    from django_filters.rest_framework import DjangoFilterBackend

    class AsthmaInitialRecordViewSet(RecordViewSet):

        filter_backends = (DjangoFilterBackend,)
        filterset_fields = ("patient",)
    ```

* On peut également utiliser `filterset_class` pour plus de contrôle sur les filtres du Filterset

    ``` python
    from django_filters.rest_framework import (
        DjangoFilterBackend as FiltersetFilter,
        FilterSet,
    )
    from django_filters.filters import (
        CharFilter,
        NumberFilter,
        BooleanFilter,
    )


    class LogFilterSet(FilterSet):
        """
        Fields we can filter our list on
        """
        decision_id = NumberFilter(field_name='ai_decision_id')
        patient_id = NumberFilter(field_name='ai_decision__patient_id')
        study_id = NumberFilter(field_name='ai_decision__studyradiological_id')
        request_uuid = CharFilter()
        has_error = BooleanFilter(help_text='true | false')

        class Meta:
            model = AILog
            fields = (
                'id',
                'decision_id',
                'patient_id',
                'study_id',
            )


    class LogViewSet(
        mixins.ListModelMixin,
        GenericViewSet,
    ):
        queryset = Log.objects.filter()

        filter_backends = (FiltersetFilter,)
        filterset_class = LogFilterSet
    ```

### filter_queryset

* Le queryset et les filtres sont utilisé par `def list` et `def get_object`  
  — autrement dit, sur toutes les vues qui utilisent la logique native de DRF.

    ``` python
    queryset = self.filter_queryset(self.get_queryset())
    ```

* Pour appliquer des filtres différent suivant la liste, écraser la méthode `filter_queryset`

    ``` python
    def filter_queryset(self, queryset):

        # Only add filter backends (handling ?patient) on list
        if self.action == 'list':
            return super().filter_queryset(queryset)

        return queryset
    ```

    Ou alors définir la liste de backends dans une propriété calculée

    ``` python
    @property
    def filter_backends(self):
        if self.action == 'list':
            return (DjangoFilterBackend,)

        return []
    ```