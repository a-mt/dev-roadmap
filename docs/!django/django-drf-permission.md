---
title: Permissions
category: Python, Django, DRF
---

## Créer une classe Permission

* Les permissions déterminent si l'accès à une vue doit être accordé ou refusé.  
  Il y a deux types de permissions:

    - **permission**    
      Les contrôles de permission sont exécutés en amont, avant que le code de la vue ne soit exécuté.

        ``` python
        from rest_framework.permissions import BasePermission

        class CanCreateMedicalCenter(BasePermission):
            """
            Is allowed to create a medical center?
            """
            message = _('Not allowed to create a medical center')

            def has_permission(self, request, view):
                return getattr(request.user, 'is_superuser', False)
        ```

    - **object_permission**  
      Les contrôles sont effectués lorsqu'on essaie de récupérer l'objet en cours (avec `get_object`) —
      notamment appelé dans la fonction retrieve.

        | Action         | queryset | permission_classes
        |---             |---       |---
        | list           | global   | global
        | create         | no       | global
        | retrieve       | global   | object-level
        | update         | global   | object-level
        | partial_update | global   | object-level
        | destroy        | global   | object-level

        ``` python
        class CanUpdateFile(BasePermission):
            """
            Is allowed to update this file?
            """
            message = _('Not allowed to update patient’s files')

            def has_object_permission(self, request, view, obj):

                # Super-admins are allowed to do everything
                if getattr(request.user, 'is_superuser', False):
                    return True

                # Assumes that the queryset was annotated and added the `permission` attribute
                permission = getattr(obj, 'permission', None)

                return permission and permission <= PermissionChoicesMixin.PERMISSION_WRITE
        ```

## Appliquer une Permission

### Default permission classes

* Les permissions par défaut, qui seront exécutées sur toutes les vues sur lesquelles les permissions ne sont pas définies,
  se définissent dans les configurations:

    ``` python
    REST_FRAMEWORK = {
        ...
        'DEFAULT_PERMISSION_CLASSES': ('rest_framework.permissions.IsAuthenticated',),
    }
    ```

### Class property

* On peut écraser les permissions par défaut en définissant la propriété `permission_classes` d'une classe

    ``` python
    from rest_framework.permissions import AllowAny

    class MedicalCenterViewSet(
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        GenericViewSet,
    ):
        permission_classes = (AllowAny, )
    ```

### Function attribute

* Ou la propriété de même nom dans le décorateur `@action` d'une méthode

    ``` python
    from rest_framework.permissions import AllowAny

    class UserAuthViewSet(UserAuthMixin, GenericViewSet):

        @action(methods=['GET'], url_path='is-authenticated', permission_classes=(AllowAny,))
        def is_authenticated(self, request, **kwargs):
            pass
    ```

* Ou encore le décorateur `permission_classes` sur une fonction

    ``` python
    from rest_framework.decorators import api_view, permission_classes
    from rest_framework.permissions import IsAuthenticated

    @api_view()
    @permission_classes([IsAuthenticated])
    def schema_view(request):
        pass
    ```

### Runtime permissions

* Définir `permission_classes` nécessite de re-définir l'ensemble des classes.  
  Si on veut en ajouter en gardant les valeurs par défaut, on peut

  - ajouter des permissions directement dans `get_permissions`

    ``` python
    class FileViewSet(
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.UpdateModelMixin,
        FileUploadMixin,
        GenericViewSet,
    ):
        def get_permissions(self):
            plist = super().get_permissions()

            if self.action == 'update':
                return plist + [permissions.CanUpdateFile()]

            if self.action == 'destroy':
                return plist + [permissions.CanDeleteFile()]

            if self.action == 'upload_scanner_files':
                return plist + [permissions.CanUploadToScanner()]

            return plist
    ```

  - ou écraser `check_permissions` / `check_object_permissions` pour ajouter des vérifications
    — et lever une erreur PermissionDenied si elles ne sont pas vérifiées

    ``` python
    from rest_framework.exceptions import PermissionDenied

    class PatientACLViewSet(
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.CreateModelMixin,
        mixins.UpdateModelMixin,
        mixins.DestroyModelMixin,
        GenericViewSet,
    ):
        def check_patient_execute_permission(self, request, patient_id):
            """
            Upon creation: check if we have the required
            permissions on the patient in the validated data

            :throw PermissionDenied
            """

            # Admins are always allowed to update patient data
            if getattr(request.user, 'is_staff', False):
                return

            # Check if we have the EXECUTE permission
            permission = request.user.get_patient_permission(patient_id, user_only=True)

            if permission != PatientACL.PERMISSION_EXECUTE:
                detail = _('Not allowed to share this patient')

                raise PermissionDenied(detail=detail)

        def check_object_permissions(self, request, obj):
            """
            Upon update and delete: check if we have the required
            permissions on the patient in the instance

            :throw PermissionDenied
            """
            super().check_object_permissions(request, obj)

            if self.action != 'retrieve':
                self.check_patient_execute_permission(request, obj.patient_id)
    ```

## Opérateurs logique

* Il est possible d'appliquer des opérations logiques sur les permissions.

    ``` python
    permission_classes = (IsTokenAuth | IsSuperUser,)
    ```
