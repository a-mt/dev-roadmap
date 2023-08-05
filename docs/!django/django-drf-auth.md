---
title: Auth
category: Python, Django, DRF
---

* Django Rest Framework peut utiliser différents types d'authentification, par exemple une authentification par session, qui s'appuie sur la logique native de Django, ou une authentification par token, qui vérifie les entêtes HTTP. L'authentification est effectuée avant la vérification des permissions.

* La liste d'authentification par défaut se définit dans les configurations.  
  DRF boucle sur les authentifications tant qu'il n'a pas récupéré un utilisateur ou qu'une exception `APIException` est levée.

    ``` python

    REST_FRAMEWORK = {
        ...
        'DEFAULT_AUTHENTICATION_CLASSES': (
            'rest_framework.authentication.SessionAuthentication',
        ),
    }
    ```

* On peut écraser les classes par défaut en définissant la propriété `authentication_classes`

    ``` python
    class FileViewSet(
        GenericViewSet,
    ):
        authentication_classes = (SessionAuthentication, TokenAuthentication)
        permission_classes = (IsToken | IsSuperUser,)
    ```

* Pour créer une authentification personnalisée, hériter de `rest_framework.authentication.BaseAuthentication`

  <details>
    <summary><ins>auth.py</ins></summary>

    <pre lang="python">
    from core.permissions import IsAuthenticatedWith2F, IsAuthenticated
    from core.utils.hmac.epoch import check_signature
    from ipaddress import ip_address, ip_network

    from django.conf import settings
    from django.contrib.auth.models import AnonymousUser
    from django.core.signing import SignatureExpired
    from django.utils.translation import gettext_lazy as _

    from rest_framework.authentication import TokenAuthentication
    from rest_framework.exceptions import AuthenticationFailed


    # ---------------------------------------------------------
    # PERMISSION
    # ---------------------------------------------------------

    class IsSuperUser(IsAuthenticatedWith2F):
        __default_code = 'is_superuser'
        __default_message = _('Only super-admins are allowed here.')

        def has_permission(self, request, view):
            if not super().has_permission(request, view):
                return False

            if not getattr(request.user, 'is_superuser', None):
                self.code = self.__default_code
                self.message = self.__default_message
                return False

            return True


    class IsToken(IsAuthenticated):
        def has_permission(self, request, view):
            self.code = None
            self.message = None

            if not request.user:
                return False

            if not getattr(request.user, 'is_token', False):
                return False

            # Check X-Signature
            try:
                check_signature(
                    request.headers.get('X-Signature', None),
                    settings.TOKEN_AUTH_TOKEN,
                    settings.TOKEN_SIGNATURE_TIMEOUT,
                )

            except Exception as e:

                if isinstance(e, SignatureExpired):
                    self.code = 'signature_expired'
                else:
                    self.code = 'bad_signature'

                return False

            # Check IP
            if settings.TOKEN_IP_WHITELIST:
                remote_addr = ip_address(
                    request.headers['X-Forwarded-For'] if 'HTTP_X_FORWARDED_FOR' in request.META else
                    request.META['REMOTE_ADDR']
                )
                for subnet in settings.TOKEN_IP_WHITELIST:
                    if remote_addr in ip_network(subnet, False):
                        return True

            self.code = 'bad_subnet'
            return False


    # ---------------------------------------------------------
    # USER
    # ---------------------------------------------------------

    class TokenUser(AnonymousUser):
        is_token = True


    # ---------------------------------------------------------
    # AUTH
    # ---------------------------------------------------------

    class TokenAuthentication(TokenAuthentication):
        """
        Simple token based authentication.

        Clients should authenticate by passing the token key in the "Authorization"
        HTTP header, prepended with the string "Token ".  For example:

            Authorization: Token 401f7ac837da42b97f613d789819ff93537bee6a
        """
        def authenticate(self, request):
            if settings.DEBUG:
                import ipaddress

                # When testing with swagger locally: allow 192.168.x.x
                if ipaddress.ip_address(request.META.get('REMOTE_ADDR')).is_private:
                    return self.authenticate_credentials(settings.TOKEN_AUTH_TOKEN)

            return super().authenticate(request)

        def authenticate_credentials(self, key):
            if key != settings.TOKEN_AUTH_TOKEN:
                raise AuthenticationFailed(_('Invalid token.'))

            return (TokenUser(), key)
    </pre>
  </details>
  <details>
    <summary><ins>core/utils/hmac/epoch.py</ins></summary>

    <pre lang="python">
    from base64 import b64encode, b64decode
    import time
    import hashlib
    import hmac

    from django.core.signing import BadSignature, SignatureExpired


    def check_signature(signature, token, timeout=600):
        """
        :raise BadSignature
        :param string signature
        :param string token
        """
        if signature:
            try:
                decoded = b64decode(signature).decode().split('@')

                if len(decoded) == 2:
                    decoded_epoch = decoded[0]
                    decoded_digest = decoded[1]

                    # Check epoch
                    check_epoch = int(time.time())
                    if (check_epoch - int(decoded_epoch)) > timeout:
                        raise SignatureExpired()

                    # Check digest
                    check_digest = hmac.new(
                        token.encode(),
                        decoded_epoch.encode(),
                        hashlib.sha256,
                    ).hexdigest()

                    if check_digest == decoded_digest:
                        return True

            except BadSignature as e:
                raise e
            except Exception:
                pass

        raise BadSignature()


    def create_signature(token):
        """
        :param string token
        :return string
        """

        # Create epoch
        epoch = str(int(time.time()))

        # Create digest
        digest = hmac.new(
            token.encode(),
            epoch.encode(),
            hashlib.sha256,
        ).hexdigest()

        return b64encode(f'{epoch}@{digest}'.encode())
    </pre>
  </details>
