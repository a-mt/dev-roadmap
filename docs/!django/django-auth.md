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

---

## Créer un utilisateur

* La commande Django `createsuperuser` permet de créer un utilisateur admin à partir du terminal.

    ``` bash
    python manage.py createsuperuser
    ```

* Pour pouvoir l'utiliser, le manager du modèle User doit implémenter les méthodes `create_user` et `create_superuser`

    <details>
      <summary>
        <ins>www/core/models/user.py</ins>
      </summary>
      <br>

      <pre lang="python">
      from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
      from django.core.validators import validate_email
      from django.db import models
      from django.utils.translation import gettext_lazy as _


      # +---------------------------------------------------------
      # | MANAGER & QUERYSET
      # +---------------------------------------------------------

      class UserManager(BaseUserManager):
          """
          Define the create_user and create_superuser methods
          To be able to use `python manage.py createsuperuser`
          """
          use_in_migrations = True

          def get_by_natural_key(self, key):
              return self.get(email=key)

          def _create_user(self, email, password, **extra_fields):
              if not email:
                  raise ValueError('The given email must be set')

              user = self.model(email=email, **extra_fields)
              user.set_password(password)
              user.save(using=self._db)

              return user

          def create_user(self, **user_data):
              user_data.setdefault('is_superuser', False)

              return self._create_user(**user_data)

          def create_superuser(self, **user_data):
              user_data.setdefault('is_superuser', True)
              user_data.setdefault('is_staff', True)

              if user_data.get('is_superuser') is not True:
                  raise ValueError('Superuser must have is_superuser=True.')

              return self._create_user(**user_data)


      # +---------------------------------------------------------
      # | MODEL
      # +---------------------------------------------------------

      class User(AbstractBaseUser, PermissionsMixin):
          r"""
          Model used to check user authentication / permissions
          Required fields: email, password

          Authentication Fields:
              - email: Char
                  254 chars max
                  Encoded in database (= 256 bytes in db with AES padding)

              - password: Char
                  128 chars max + validates all checks defined in AUTH_PASSWORD_VALIDATORS

              - created_at: DateTime
              - updated_at: DateTime
              - last_login: DateTime
              - is_active: Boolean
              - is_staff: Boolean
              - is_superuser: Boolean

          Permissions Fields:
              - is_superuser: Boolean
                  this user has all permissions without explicitly assigning them

              - user_permissions: Permission*
                  specific permissions for this user

              - groups: Group*
                  a user will get all permissions granted to each of their groups

              Usage: u.has_perm("<app_label>.<permission__codename>")
          """
          created_at = models.DateTimeField(auto_now_add=True, db_index=True)
          updated_at = models.DateTimeField(auto_now=True)

          # Authentication fields
          email = models.CharField(
              _('email address'),
              max_length=254,
              unique=True,
              validators=[validate_email],
              help_text='Required. 254 characters or fewer. Used to authenticate and send emails.',
              error_messages={
                  'unique': _('A user with that email already exists.'),
              },
          )
          is_active = models.BooleanField(
              _('active'),
              default=True,
              help_text=(
                  'Designates whether this user should be treated as active. '
                  'Unselect this instead of deleting accounts.'
              ),
          )
          is_waiting_validation = models.BooleanField(
              default=False,
              help_text='Designates whether this user is waiting an administrator validation',
          )
          is_staff = models.BooleanField(
              _('staff status'),
              default=False,
              help_text='Designates whether the user can log into the admin site.',
          )
          is_superuser = models.BooleanField(
              _('superuser status'),
              default=False,
              help_text='Designates that this user has all permissions without explicitly assigning them.',
          )

          # User account
          firstname = models.CharField(
              _('first name'),
              max_length=256,
              blank=True,
              null=True,
          )
          lastname = models.CharField(
              _('last name'),
              max_length=256,
              blank=True,
              null=True,
          )
          USERNAME_FIELD = 'email'

          objects = UserManager()

          class Meta:
              base_manager_name = 'objects'
              ordering = ['-pk']
      </pre>
    </details>

* On peut créer une commande personnalisée pour créer des utilisateurs non admin à partir du terminal:

    <details>
      <summary>
        <ins>core/management/commands/createuser.py</ins>
      </summary>

      <pre lang="python">
      import getpass
      import sys

      from django.db import DEFAULT_DB_ALIAS
      from django.core.management.base import CommandError
      from django.contrib.auth.management.commands.createsuperuser import Command as BaseCommand
      from django.contrib.auth.password_validation import validate_password
      from django.core.exceptions import ValidationError as DjangoValidationError

      PASSWORD_FIELD = 'password'


      class Command(BaseCommand):
          """
          Pretty much the same thing as createsuperuser
          but with our logic to create a regular user

          Usage: python manage.py createuser
          """

          help = 'Create a regular user'

          def add_arguments(self, parser):
              """
              We're not handling arguments to specify the fields values,
              just use this command interactively
              """
              parser.add_argument(
                  '--database',
                  default=DEFAULT_DB_ALIAS,
                  help='Specifies the database to use. Default is "default".',
              )

          def handle(self, *args, **options):
              database = options['database']

              user_data = {
                  PASSWORD_FIELD: None,
              }
              # Same as user_data but without many to many fields and with
              # foreign keys as fake model instances instead of raw IDs.
              fake_user_data = {}

              try:
                  # Set fields
                  self._set_username(database, user_data, fake_user_data)

                  for field_name in [
                      'is_superuser',
                      'email',
                  ]:
                      self._set_field(field_name, user_data, fake_user_data)

                  self._set_password(user_data, fake_user_data)

                  # Create user
                  self.UserModel._default_manager.db_manager(database).create_user(**user_data)
                  if options['verbosity'] >= 1:
                      self.stdout.write('User created successfully.')

              except KeyboardInterrupt:
                  self.stderr.write('\nOperation cancelled.')
                  sys.exit(1)

              except DjangoValidationError as e:
                  raise CommandError('; '.join(e.messages))

          def _set_username(self, database, user_data, fake_user_data):
              """
              :param database
              :param dict[pointer] user_data
              :param dict[pointer] fake_user_data
              """
              default_username = ''
              verbose_field_name = self.username_field.verbose_name
              username = None

              # Prompt for username.
              while username is None:
                  message = self._get_input_message(self.username_field, default_username)
                  username = self.get_input_data(self.username_field, message, default_username)
                  if username:
                      error_msg = self._validate_username(username, verbose_field_name, database)
                      if error_msg:
                          self.stderr.write(error_msg)

                          username = None
                          continue

              user_data[self.UserModel.USERNAME_FIELD] = username
              fake_user_data[self.UserModel.USERNAME_FIELD] = (
                  self.username_field.remote_field.model(username)
                  if self.username_field.remote_field else username
              )

          def _set_field(self, field_name, user_data, fake_user_data):
              """
              :param string field_name
              :param dict[pointer] user_data
              :param dict[pointer] fake_user_data
              """
              field = self.UserModel._meta.get_field(field_name)
              input_value = None

              # Get input data
              while input_value is None:
                  message = self._get_input_message(field)
                  input_value = self.get_input_data(field, message)

                  if field.many_to_many and input_value:
                      if not input_value.strip():
                          input_value = None
                          self.stderr.write('Error: This field cannot be blank.')
                          continue

                      input_value = [pk.strip() for pk in input_value.split(',')]

              # Set value / relationship
              if type(input_value) == str:
                  input_value = None if input_value == '' else input_value.strip()

              user_data[field_name] = input_value
              if not field.many_to_many:
                  fake_user_data[field_name] = input_value

              # Wrap any foreign keys in fake model instances.
              if field.many_to_one:
                  fake_user_data[field_name] = field.remote_field.model(input_value)

          def _set_password(self, user_data, fake_user_data):
              """
              :param dict[pointer] user_data
              :param dict[pointer] fake_user_data
              """
              password = ''

              # Prompt for a password if the model has one.
              while password is None:
                  input_password = getpass.getpass()
                  input_password2 = getpass.getpass('Password (again): ')

                  if input_password != input_password2:
                      self.stderr.write("Error: Your passwords didn't match.")
                      # Don't validate passwords that don't match.
                      continue

                  if input_password.strip() == '':
                      self.stderr.write("Error: Blank passwords aren't allowed.")
                      # Don't validate blank passwords.
                      continue

                  try:
                      validate_password(input_password, self.UserModel(**fake_user_data))
                  except DjangoValidationError as e:
                      self.stderr.write('\n'.join(e.messages))

                      response = input('Bypass password validation and create user anyway? [y/N]: ')
                      if response.lower() != 'y':
                          continue

              user_data[PASSWORD_FIELD] = password
      </pre>
    </details>

* La validation des mots de passe s'appuie sur la liste des validateurs définie dans les configurations

  ``` python
  # Password validation
  # https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

  AUTH_PASSWORD_VALIDATORS = [
      {
          'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
      },
      {
          'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
      },
      {
          'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
      },
      {
          'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
      },
  ]
  ```