---
title: Reconnexion par cookie
category: Python, Django, Auth
---

## Fonctionnement

* **Cookie de session**  
  Les données de session sont sauvegardées sur le serveur, typiquement soit dans des fichiers soit dans une BDD.
  Le client, lui, sauvegarde uniquement son ID de session dans les cookies.
  À chaque requête, les cookies sont envoyés dans les entêtes HTTP, et le serveur se sert de l'ID de session qu'il récupère dans les cookies pour récupérer les données de session et ainsi savoir quel utilisateur est connecté.

* **Durée d'une session**  
  Si la durée de vie du cookie est dépassé, ou si le client ferme son navigateur, alors le cookie de session est effacé par le navigateur.
  Le client n'enverra désormais plus d'ID de session et il est donc déconnecté.  
  Côté serveur, les anciennes sessions sont régulièrement supprimées, typiquement une fois par jour, pour éviter de polluer le serveur avec des données désormais inutilisables.

* **Cookie de reconnexion**  
  Si on veut que l'utilisateur puisse rester connecté pour un temps plus long qu'une session (la CNIL recommande que les cookies ait une durée de vie de maximum 13 mois), alors on utilise un cookie de reconnexion. Un cookie de reconnexion contient l'identifiant de l'utilisateur, et sera utilisé par le serveur pour re-créer une session avec un utilisateur authentifié s'il n'y a pas déjà de session active mais qu'un cookie de reconnexion est présent

  Afin qu'un utilisateur ne puisse pas se connecter en tant que n'importe quel utilisateur simplement en modifiant l'identifiant stocké dans son cookie de reconnexion, on stocke également un cookie contenant l'HMAC de l'identifiant — le cookie de reconnexion n'est valide que si son HMAC est égal au HMAC sauvegardé dans les cookies, par exemple (en PHP):

  ``` python
  // Reconnexion par cookie
  define('COOKIE_KEY','*R}@ox.i{Pu&`n\sOb5-7Ga(X$mTu^#U?C;;r~89p2Kn4O?YA"kfUm+g5:@D\qyIN3tccRy');

  if(isset($_COOKIE['idClient'])
    && $_COOKIE['cookiePass'] == md5(COOKIE_KEY . $_COOKIE['idClient'])) {
    ...
  }
  ```

## Activer l'authentification

1. Créer le middleware session.

    <details>
      <summary><ins>core/middleware/session.py</ins></summary>

      <pre lang="python">
      import time

      from django.conf import settings
      from django.utils.http import http_date
      from django.utils.cache import patch_vary_headers
      from django.core.exceptions import SuspiciousOperation
      from django.contrib.sessions.middleware import (
          SessionMiddleware as DjangoSessionMiddleware,
      )
      from django.contrib.sessions.backends.base import UpdateError
      from django.contrib.auth import SESSION_KEY, BACKEND_SESSION_KEY, HASH_SESSION_KEY


      class SessionMiddleware(DjangoSessionMiddleware):
          """
          Ensures that session is not saved by views which set skip_session_save_every_request to True
          """

          def process_request(self, request):
              session_key = request.COOKIES.get(settings.SESSION_COOKIE_NAME)
              request.session = self.SessionStore(session_key)

              # SESSION_COOKIE_NAME was present in the database?
              try:
                  _ = request.session[SESSION_KEY]
                  _ = request.session[BACKEND_SESSION_KEY]
              except KeyError:

                  # If not: try cookie reconnection
                  session_userid = request.COOKIES.get(settings.SESSION_COOKIE_RECONNECT)
                  session_userhmac = request.COOKIES.get(settings.SESSION_COOKIE_RECONNECT_HMAC)

                  if session_userid:
                      backend_path = 'core.auth.CookieReconnectionModelBackend'
                      request.session[SESSION_KEY] = session_userid
                      request.session[BACKEND_SESSION_KEY] = backend_path
                      request.session[HASH_SESSION_KEY] = session_userhmac

          def process_response(self, request, response):
              """
              If request.session was modified, or if the configuration is to save the
              session every time, save the changes and set a session cookie or delete
              the session cookie if the session has been emptied.
              """
              try:
                  accessed = request.session.accessed
                  modified = request.session.modified
                  empty = request.session.is_empty()
              except AttributeError:
                  pass
              else:
                  # First check if we need to delete this cookie.
                  # The session should be deleted only if the session is entirely empty
                  if settings.SESSION_COOKIE_NAME in request.COOKIES and empty:
                      response.delete_cookie(
                          settings.SESSION_COOKIE_NAME,
                          path=settings.SESSION_COOKIE_PATH,
                          domain=settings.SESSION_COOKIE_DOMAIN,
                      )
                  else:
                      if accessed:
                          patch_vary_headers(response, ('Cookie',))
                      skip_save_every_request = getattr(
                          request, 'skip_session_save_every_request', False
                      )
                      if (
                          modified
                          or settings.SESSION_SAVE_EVERY_REQUEST
                          and not skip_save_every_request
                      ) and not empty:
                          if request.session.get_expire_at_browser_close():
                              max_age = None
                              expires = None
                          else:
                              max_age = request.session.get_expiry_age()
                              expires_time = time.time() + max_age
                              expires = http_date(expires_time)
                          # Save the session data and refresh the client cookie.
                          # Skip session save for 500 responses, refs #3881.
                          if response.status_code != 500:
                              try:
                                  request.session.save()
                              except UpdateError:
                                  raise SuspiciousOperation(
                                      "The request's session was deleted before the "
                                      'request completed. The user may have logged '
                                      'out in a concurrent request, for example.'
                                  )
                              response.set_cookie(
                                  settings.SESSION_COOKIE_NAME,
                                  request.session.session_key,
                                  max_age=max_age,
                                  expires=expires,
                                  domain=settings.SESSION_COOKIE_DOMAIN,
                                  path=settings.SESSION_COOKIE_PATH,
                                  secure=settings.SESSION_COOKIE_SECURE or None,
                                  httponly=settings.SESSION_COOKIE_HTTPONLY or None,
                              )
              return response
      </pre>
    </details>

2. Créer le backend d'authentification par cookie.  
   Ce backend est placé en session par le middleware de session si on détecte qu'il n'y a pas de session valide mais qu'il y a un cookie de reconnexion.
   Le backend utilise la logique du backend Model pour récupèrer l'utilisateur mais remplace la méthode get_session_auth_hash par get_cookie_reconnection_auth_hash, ce qui nous permet de vérifier si le hash du cookie de reconnexion (également placé en session par le middleware de session) est valide.

    <details>
      <summary><ins>core/auth.py</ins></summary>

      <pre lang="python">
      from django.contrib.auth.backends import ModelBackend


      class CookieReconnectionModelBackend(ModelBackend):
          def get_user(self, user_id):
              if user := super().get_user(user_id):
                  setattr(user, 'get_session_auth_hash', user.get_cookie_reconnection_auth_hash)

              return user
      </pre>
    </details>

3. Ajouter la méthode `get_cookie_reconnection_auth_hash` au modèle User, pour générer le hash du cookie de reconnexion.

    ``` python
    from django.core.signing import Signer
    from django.utils.crypto import salted_hmac

    def get_cookie_reconnection_auth_hash(self):
        """
        Hash used to authorize cookie reconnection
        Cookie reconnection is only allowed for
        as long as the user doesn't change his/her password

        return :string
        """
        key_salt = Signer().signature(self.pk)

        return salted_hmac(key_salt, self.password).hexdigest()
    ```

4. Dans les configurations

    - Remplacer le middleware de session de Django par le nôtre

      ``` diff
      MIDDLEWARE = [
      -    'django.contrib.sessions.middleware.SessionMiddleware',
      +    'core.middleware.session.SessionMiddleware',
      ]
      ```

    - Définir les configurations du cookie de reconnexion

      ``` python

      COOKIE_PREFIX = os.getenv('COOKIE_PREFIX', 'efx_')

      # Session

      SESSION_COOKIE_RECONNECT = f'{COOKIE_PREFIX}userid'
      SESSION_COOKIE_RECONNECT_HMAC = f'{COOKIE_PREFIX}userhmac'
      SESSION_COOKIE_RECONNECT_AGE = 60 * 60 * 24 * 7 * 52  # 364 days
      ```

## Authentification

1. Ajouter la logique du cookie de reconnection à l'authentification

    ``` python
    def login(self, request, **kwargs):
        ...

        if serializer.validated_data.get('cookie_reconnection', None):
            user_reconnect = user
        else:
            user_reconnect = None

        # Return the user data
        response = Response(UserSerializer(instance=user).data)
        self.add_cookie_reconnect(request, response, user_reconnect)

        return response

    def add_cookie_reconnect(self, request, response, user=None):
        """
        Add/remove reconnection cookies
        """

        # Delete the automatic reconnection
        if not user:
            if settings.SESSION_COOKIE_RECONNECT in request.COOKIES:
                response.delete_cookie(
                    settings.SESSION_COOKIE_RECONNECT,
                    path=settings.SESSION_COOKIE_PATH,
                    domain=settings.SESSION_COOKIE_DOMAIN,
                )

            if settings.SESSION_COOKIE_RECONNECT_HMAC in request.COOKIES:
                response.delete_cookie(
                    settings.SESSION_COOKIE_RECONNECT_HMAC,
                    path=settings.SESSION_COOKIE_PATH,
                    domain=settings.SESSION_COOKIE_DOMAIN,
                )

        # Add automatic reconnection
        else:
            max_age = settings.SESSION_COOKIE_RECONNECT_AGE
            expires_time = time.time() + max_age
            expires = http_date(expires_time)

            response.set_cookie(
                settings.SESSION_COOKIE_RECONNECT,
                user.pk,
                max_age=max_age,
                expires=expires,
                domain=settings.SESSION_COOKIE_DOMAIN,
                path=settings.SESSION_COOKIE_PATH,
                secure=settings.SESSION_COOKIE_SECURE or None,
                httponly=True,
            )

            # Add hmac of value
            response.set_cookie(
                settings.SESSION_COOKIE_RECONNECT_HMAC,
                user.get_cookie_reconnection_auth_hash(),
                max_age=max_age,
                expires=expires,
                domain=settings.SESSION_COOKIE_DOMAIN,
                path=settings.SESSION_COOKIE_PATH,
                secure=settings.SESSION_COOKIE_SECURE or None,
                httponly=True,
            )
    ```
