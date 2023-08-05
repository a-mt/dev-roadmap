---
title: Auth
category: Python, Django
---

## Activer l'authentification

L'authentification consiste à récupérer l'utilisateur associé à une requête.  
Pour récupérer l'utilisateur en BDD à partir de sa session:

* Ajouter `django.contrib.auth` dans les applications activées.  
   Va notamment ajouter le modèle User et ses locales

    ``` python
    INSTALLED_APPS = [
        'django.contrib.auth',
        ...
    ]
    ```

* Activer les middlewares Session et Authentication:  
   Vont ajouter request.session et request.user respectivement avant que la vue ne soit appelée

    ``` python
    MIDDLEWARE = [
        ...
        # SessionMiddleware manages sessions spanning multiple requests
        'django.contrib.sessions.middleware.SessionMiddleware',
        # AuthenticationMiddleware associates a user with session and requests
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        ...
    ]
    ```

* Définir les configurations de session

    ``` python
    COOKIE_PREFIX = os.getenv('COOKIE_PREFIX', 'myproject_')

    # Session

    SESSION_SAVE_EVERY_REQUEST = True
    SESSION_COOKIE_AGE = 60 * 60 * 2  # 2H
    SESSION_COOKIE_NAME = f'{COOKIE_PREFIX}sessionid'
    ```

Pour comprendre comment ça marche:
* Le middleware de session

  1. Récupère l'ID de session dans les cookies envoyés par l'utilisateur

        ``` python
        session_key = request.COOKIES.get(settings.SESSION_COOKIE_NAME)
        ```

  2. Crée request.session à partir de l'ID de session.  
     À ce stade, les données de session ne sont pas encore chargées,  
     son contenu n'est réellement chargé que lorsqu'on essaie d'accéder à des attributs de request.session  
     (techniquement, lorsqu'on essaie d'accéder à sa propriété `_session`, les méthodes magiques getitem / setitem l'utilisent)

        ``` python
        request.session = self.SessionStore(session_key)
        ```

  3. Lorsqu'on essaie d'accéder aux données en session: charge les données de session.  
     Avec le backend par défaut (db), les données sont sauvegardées et récupérées dans la table django_session.  
     Le backend utilisé est définit par `SESSION_ENGINE`

        ``` python
        SESSION_ENGINE = 'django.contrib.sessions.backends.db'
        ```

* Le middleware d'authentification

  1. Place request.user en session.  
     Il s'agit d'un LazyObject, l'utilisateur ne va être réellement être chargé que lorsqu'on essaie d'accéder à un de ses attributs.

        ``` python
        request.user = SimpleLazyObject(lambda: get_user(request))
        ```
 
  2. Lorsqu'on essaie d'accéder aux données de l'utilisateur:  
     récupère l'ID utilisateur et backend en session, puis appelle le backend d'authentification avec l'ID utilisateur.

        ``` python
        def get_user(request):
            """
            Return the user model instance associated with the given request session.
            If no user is retrieved, return an instance of `AnonymousUser`.
            """
            from .models import AnonymousUser
            user = None
            try:
                user_id = _get_user_session_key(request)
                backend_path = request.session[BACKEND_SESSION_KEY]
            except KeyError:
                pass
            else:
                if backend_path in settings.AUTHENTICATION_BACKENDS:
                    backend = load_backend(backend_path)
                    user = backend.get_user(user_id)
        ```

        Notons que Django vérifie ensuite si l'utilisateur a le droit de s'authentifier:
        si le hash sauvegardé en session est différent du hash retourné par `user.get_session_auth_hash()`,
        alors l'utilisateur est deconnecté — cela permet de déconnecter toutes les sessions de l'utilisateur
        lorsqu'il met à jour son mot de passe.

        ``` python
        if hasattr(user, 'get_session_auth_hash'):
            session_hash = request.session.get(HASH_SESSION_KEY)
            session_hash_verified = session_hash and constant_time_compare(
                session_hash,
                user.get_session_auth_hash()
            )
        ```

     Reste à élucider: le backend d'authentification et la création de la session.

---

## Backend d'authentification

Pour essayer de récupérer un utilisateur:

* Appeler `django.contrib.auth.authenticate()`

  ``` diff
      # Data is valid?
      serializer = self.get_serializer(data=request.data)
      serializer.is_valid(raise_exception=True)

      # User exists?
      # Note: selects the appropriate AUTHENTICATION_BACKENDS and calls its authenticate()
  +   user = auth.authenticate(
          request,
          email=serializer.validated_data.get('email'),
          password=serializer.validated_data.get('password'),
      )
      if user is None:
          raise serializers.ValidationError(_('Your email or password is invalid.'))
  ```

Pour comprendre comment ça marche:

1. Lorsqu'on appelle cette fonction, Django va boucler sur la liste des "backends d'authentification" pour essayer de récupérer l'utilisateur.  
   Il continue de boucler sur les backends suivants tant qu'il a pas récupéré un utilisateur ou une exception `PermissionDenied`.

    ``` python
    def authenticate(request=None, **credentials):
        """
        If the given credentials are valid, return a User object.
        """
        for backend, backend_path in _get_backends(return_tuples=True):
            backend_signature = inspect.signature(backend.authenticate)
            try:
                backend_signature.bind(request, **credentials)
            except TypeError:
                # This backend doesn't accept these credentials as arguments. Try the next one.
                continue
            try:
                user = backend.authenticate(request, **credentials)
            except PermissionDenied:
                # This backend says to stop in our tracks - this user should not be allowed in at all.
                break
            if user is None:
                continue
            # Annotate the user object with the path of the backend.
            user.backend = backend_path
            return user
      ```

2. Par défaut, le seul backend d'authentification activé est Model

    ``` python
    AUTHENTICATION_BACKENDS = [
        # username/password authentication
       'django.contrib.auth.backends.ModelBackend',  
    ]
    ```

3. Le backend Model récupère le modèle User spécifié par `AUTH_USER_MODEL`  
   Par défaut, il s'agit du modèle User de l'application `django.contrib.auth`

    ``` python
    AUTH_USER_MODEL = 'auth.User'
    ```

4. Il effectue une recherche d'utilisateur à partir du nom d'utilisateur.  
   Le champ à utiliser est spécifié par la propriété `USERNAME_FIELD` du modèle.  
   Par défaut, il s'agit de `username`

    ``` python
    class AbstractUser(AbstractBaseUser, PermissionsMixin):
        USERNAME_FIELD = 'username'
    ```

5. Une fois l'utilisateur récupéré, les mots de passe sont comparés — en appelant `user.check_password(password)`.  
   Si les mots de passe ne correspondent pas, alors le backend retourne `None` et Django continue sur le backend suivant s'il y en a.

---

## Mise en session

Pour mettre un utilisateur en session:

* Appeler `django.contrib.auth.login()`  
  A pour effet d'ajouter le backend et l'ID de l'utilisateur dans session

    ``` diff
        if user.is_waiting_validation:
            raise serializer_validation_error(
                {
                    'email': _('The admin hasn’t validated your account yet.'),
                },
                code='is_waiting_validation'
            )

        # Set session
        request.user = user
    +   auth.login(request, user)

        # Require 2nd factor authentication?
        response = self._send_2nd_factor_otp(request, user)

        # Return user data
        return response or Response(UserSerializer(instance=user).data)
    ```

Pour comprendre comment ça marche:

1. Le middleware de session vérifie si request.session existe et est toujours valide dans la méthode `process_response`.

    ``` python
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
            return response
    ```

2. Si la session a été modifiée, il la sauvegarde et met l'ID de session dans le cookie de session retourné à l'utilisateur.

    ``` python
    try:
        request.session.save()
    except UpdateError:
        raise SessionInterrupted(
            "The request's session was deleted before the "
            "request completed. The user may have logged "
            "out in a concurrent request, for example."
        )
    response.set_cookie(
        settings.SESSION_COOKIE_NAME,
        request.session.session_key, max_age=max_age,
        expires=expires, domain=settings.SESSION_COOKIE_DOMAIN,
        path=settings.SESSION_COOKIE_PATH,
        secure=settings.SESSION_COOKIE_SECURE or None,
        httponly=settings.SESSION_COOKIE_HTTPONLY or None,
        samesite=settings.SESSION_COOKIE_SAMESITE,
    )
    ```

3. La boucle est ainsi bouclée: à la prochaine requête, la session sera récupérée à partir de l'ID de session dans les cookies.

## Types d'authentification

* **Basic**  
  Un nom d'utilisateur et mot de passe doit être envoyé avec chaque requête pour s'authentifier.

  ```
  Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
  ```

  `QWxhZGRpbjpvcGVuIHNlc2FtZQ==` est la représentation en Base64 de l'utilisateur et mot de passe (`Aladdin:open sesame`)

* **Token**  
  Un token doit être envoyé avec chaque requête pour s'authentifier.

  ```
  Authorization: Bearer TOKEN
  ```

* **JWT (JSON Web Token)** 
  Similaire à l'authentification par token, mais fonctionne en utilisant un refresh token et un access token. Le refresh token est un token qui permet d'obtenir un access token pour un temps limité, et l'access token permet à l'utilisateur de s'authentifier. Ce dernier token est une chaîne de caractère encodée qui contient les informations dont le serveur a besoin pour vérifier l'identité d'un utilisateur.  
  Il s'agit d'un type d'authentification avancé, qui nécessite des packages externes pour fonctionner.

  ![](https://i.imgur.com/LXuGYAB.png)
  ![](https://i.imgur.com/qbhuuQR.png)

* **Session**  
  L'utilisateur s'identifie une fois avec un nom d'utilisateur et mot de passe pour obtenir un cookie de session. Le cookie de session permet de s'authentifier. C'est le type d'authentification le plus courant pour les sites web.
