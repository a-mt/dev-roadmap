---
title: Media & static
category: Python, Django
---

## Static vs media

* Il y a deux types de fichiers statiques:

  - **media**: ce sont des fichiers téléchargés par l'utilisateur via l'application en cours.  
    Par exemple: photo de profil, pdf de compte rendu, etc.

    ``` python
    # Media files (Upload, ...)

    MEDIA_ROOT = '/media'  # only relevant if default storage is FileSystemStorage
    MEDIA_URL = os.getenv('MEDIA_URL', 'http://localhost:8000/')
    ```

  - **static**: ce sont des fichiers packagés avec le code source par les développeurs.  
    Par exemple: des images, du js ou css.

    ``` python
    # Static files (CSS, JavaScript, Images)
    # https://docs.djangoproject.com/en/1.9/howto/static-files/

    STATICFILES_STORAGE = os.getenv(
      'STATICFILES_STORAGE',
      'django.contrib.staticfiles.storage.StaticFilesStorage'
    )
    STATIC_ROOT = ''
    STATIC_URL = '/static/'
    STATICFILES_DIRS = (
        os.path.join(PROJECT_PATH, 'static'),
    )
    ```

* Penser à créer les répertoires de static et media et
  assigner l'utilisateur sur lequel l'application Django s'exécute
  comme propriétaire de ces répertoires.

---

## static

### collectstatic

* `collectstatic` est une commande Django qui permet de rassembler tous les fichiers static  
  configurés dans `STATICFILES_DIRS` dans le répertoire `STATIC_ROOT`.

    ``` bash
    python manage.py collectstatic --no-input --link --settings=core.settings.dev
    ```

### serve

* En mode dev, on utilise le serveur de développement de django pour servir les fichiers media.

    ``` python
    from django.views import static
    from django.conf import settings

    urlpatterns += [
        re_path(r'^media/(?P<path>.*)$', static.serve, {'document_root': settings.MEDIA_ROOT}),
    ]
    ```

    Un autre exemple en ajoutant l'authentification DRF:

    ``` python
    urlpatterns = [
        path('avatars/<str:filename>', views.avatars),
        path('staticfiles/<path:path>', views.staticfiles),
    ]
    ```
    ``` python
    import os
    from rest_framework.decorators import api_view

    from django.conf import settings
    from django.views.static import serve

    AVATARS_PATH = os.path.abspath(
        os.path.join(settings.MEDIA_ROOT, 'avatars')
    )

    # Serve staticfiles without giving up on authentication using DRF
    @api_view()
    def avatars(request, filename):
        """
        GET /media/avatars/:filename
        """
        return serve(
            request,
            filename,
            document_root=AVATARS_PATH,
            show_indexes=False,
        )

    @api_view()
    def staticfiles(request, path):
        """
        GET /media/staticfiles/:path
        """
        return serve(
            request,
            path,
            document_root=f'{settings.MEDIA_ROOT}/staticfiles',
            show_indexes=False,
        )
    ```

### staticfiles_urlpatterns

* Pour les fichiers static:

    1. activer l'application `django.contrib.staticfiles`

        ``` python
        DJANGO_APPS = (
            ...
            "django.contrib.staticfiles",
        )
        ```

    2. utiliser `staticfiles_urlpatterns`

        ``` python
        from django.contrib.staticfiles.urls import staticfiles_urlpatterns

        ...
        urlpatterns += staticfiles_urlpatterns()
        ```

### nginx

* En production, on utilise généralement un serveur front tel que nginx pour servir tous les fichiers statiques du système.

  <details>
    <summary>
      <ins>proxy/run.sh</ins>  
    </summary>

    <pre lang="bash">
    #!/bin/sh

    # Fail the entire script if any command fails
    set -e

    # Substitute environment variable in default.conf.tpl and output the result in default.conf  
    envsubst < /etc/nginx/default.conf.tpl > /etc/nginx/conf.d/default.conf

    # Run nginx in the foreground
    nginx -g 'daemon off;'
    </pre>
  </details>

  <details>
    <summary>
      <ins>proxy/default.conf.tpl</ins>
    </summary>

    <pre>
    server {
        listen ${LISTEN_PORT};

        location /static {
            alias /vol/static;
        }
        location / {
            uwsgi_pass          ${APP_HOST}:${APP_PORT};
            include             /etc/nginx/uwsgi_params;
            client_max_body_size 10M;
        }
    }
    </pre>
  </details>

  <details>
    <summary>
      <ins>proxy/uwsgi_params</ins>
    </summary>

    <pre>
    uwsgi_param  QUERY_STRING       $query_string;
    uwsgi_param  REQUEST_METHOD     $request_method;
    uwsgi_param  CONTENT_TYPE       $content_type;
    uwsgi_param  CONTENT_LENGTH     $content_length;

    uwsgi_param  REQUEST_URI        $request_uri;
    uwsgi_param  PATH_INFO          $document_uri;
    uwsgi_param  DOCUMENT_ROOT      $document_root;
    uwsgi_param  SERVER_PROTOCOL    $server_protocol;
    uwsgi_param  REQUEST_SCHEME     $scheme;
    uwsgi_param  HTTPS              $https if_not_empty;

    uwsgi_param  REMOTE_ADDR        $remote_addr;
    uwsgi_param  REMOTE_PORT        $remote_port;
    uwsgi_param  SERVER_PORT        $server_port;
    uwsgi_param  SERVER_NAME        $server_name;
    </pre>
  </details>

  <details>
    <summary>
      <ins>proxy/Dockerfile</ins>
    </summary>

    <pre>
    FROM nginxinc/nginx-unprivileged:1-alpine

    COPY ./default.conf.tpl /etc.nginx/default.conf.tpl
    COPY ./uwsgi_params /etc/nginx/uwsgi_params
    COPY ./run.sh /run.sh

    ENV LISTEN_PORT=8000
    ENV APP_HOST=app
    ENV APP_PORT=9000

    USER root

    RUN mkdir -p /vol/static && \
        chmod 755 /vol/static && \
        touch /etc/nginx/conf.d/default.conf && \
        chown nginx: /etc/nginx/conf.d/default.conf && \
        chmod +x /run.sh

    VOLUME /vol/static
    USER nginx

    CMD ["/run.sh"]
    </pre>
  </details>

  <details>
    <summary>
      <ins>.env.sample</ins>
    </summary>

    <pre lang="bash">
    DB_NAME=dbname
    DB_USER=rootuser
    DB_PASS=changeme
    DJANGO_SECRET_KEY=changeme
    DJANGO_ALLOWED_HOSTS=127.0.0.1
    </pre>
  </details>

  <details>
    <summary>
      <ins>docker-compose.yml</ins>
    </summary>

    <pre lang="yml">
    app:
      build:
        context: .
      restart: always
      volumes:
        - static-data:/vol/web
      environment:
        - DB_HOST=db
        - DB_NAME=${DB_NAME}
        - DB_USER=${DB_USER}
        - DB_PASS=${DB_PASS}
        - SECRET_KEY=${DJANGO_SECRET_KEY}
        - ALLOWED_HOSTS=${DJANGO_ALLOWED_HOSTS}
      depends_on:
        - db

    db:
      image: postgres:13-alpine 
      restart: always
      volumes:
        - postgres-data:/var/lib/postgresql/data
      environment:
          - POSTGRES_DB=${DB_NAME}
          - POSTGRES_USER={DB_USER}
          - POSTGRES_PASSWORD=${DB_PASS}

    proxy:
      build:
        context: ./proxy
        restart: always
        depends_on:
          - app
        ports:
          - 80:8000
        volumes:
          - static-data:/vol/static

    volumes:
      postgres-data:
      static-data:
    </pre>
  </details>

---

## media

### upload_to

* Déclarer un [champ fichier](django-orm-model.md#file) permet de facilement uploader des fichiers, par défaut sur le disque.  
  Le fichier est sauvegardé à l'emplacement spécifié par `upload_to` — relatif à `MEDIA_ROOT`.

  ``` python
  from django.db import models

  class Post(models.Model):
      title   = models.CharField(max_length=155)
      content = models.TextField()
      slug    = models.SlugField(max_length=255)
      image   = models.ImageField(upload_to='images/', default='images/default.png')

      def __str__(self):
          return self.title
  ```

### Configuration du storage

* Le comportement par défaut consiste à uploader les fichiers media sur le disque dur (ce qui correspond à l'object storage `FileSystemStorage`).
  Mais on peut envoyer les fichiers à un autre emplacement, et notamment le cloud, en définissant `DEFAULT_FILE_STORAGE`.  
  Les champs fichiers, gérés par `upload_to`, seront automatiquement envoyés au bon endroit.

  <ins>Exemple: bucket Google Cloud</ins>

    ``` python
    import os
    from datetime import timedelta

    GS_PROJECT_ID = os.getenv('GS_PROJECT_ID', None)
    GS_LOCATION = os.getenv('GS_LOCATION', '')

    GS_PRIVATE_MEDIA_BUCKET_NAME = os.getenv('GS_PRIVATE_MEDIA_BUCKET_NAME', None)
    GS_PRIVATE_MEDIA_BUCKET_BOUND_HOSTNAME = os.getenv('GS_PRIVATE_MEDIA_BUCKET_BOUND_HOSTNAME', '')

    GS_PUBLIC_MEDIA_BUCKET_NAME = os.getenv('GS_PUBLIC_MEDIA_BUCKET_NAME', None)
    GS_PUBLIC_MEDIA_BUCKET_BOUND_HOSTNAME = os.getenv('GS_PUBLIC_MEDIA_BUCKET_BOUND_HOSTNAME', '')

    # Default is private
    GS_BUCKET_BOUND_HOSTNAME = GS_PRIVATE_MEDIA_BUCKET_BOUND_HOSTNAME
    GS_BUCKET_NAME = GS_PRIVATE_MEDIA_BUCKET_NAME

    GS_EXPIRATION = timedelta(300)  # 5m validity for private files
    GS_FILE_OVERWRITE = False
    GS_MAX_MEMORY_SIZE = 50 * 2 ** 20  # 50 MiB
    GS_BLOB_CHUNK_SIZE = 16 * 2 ** 20  # 16 MiB

    FILE_UPLOAD_TEMP_DIR = None  # Use the OS's default temporary directory (ie /tmp)

    if GS_PROJECT_ID:
        DEFAULT_FILE_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'
        MEDIA_URL = os.getenv('MEDIA_URL', None)
    else:
        DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'
    ```

    Exemple de variables d'environnement:

    ```
    GS_PROJECT_ID=myproject
    GOOGLE_APPLICATION_CREDENTIALS=/srv/env_vars/gcs-dev.json

    GS_PRIVATE_MEDIA_BUCKET_NAME=private-media-dev.example.com
    GS_PRIVATE_MEDIA_BUCKET_BOUND_HOSTNAME=https://private-media-dev.example.com

    GS_PUBLIC_MEDIA_BUCKET_NAME=media-dev.example.com
    GS_PUBLIC_MEDIA_BUCKET_BOUND_HOSTNAME=https://media-dev.example.com

    MEDIA_URL=https://media-dev.example.com/
    ```

### Sérialiseur

* Côté sérialiseur, utiliser un champ `rest_framework.fields.FileField`  
  permet de récupérer une instance de `UploadedFile`

  ``` python
  class PreUploadFileSerializer(serializers.Serializer):
      """
      Serializer to validate the first check of file upload:
      there is a file, it has a filename & it isn't empty
      """
      file = FileField()

      class JSONAPIMeta:
          resource_name = 'fileinput'
  ```
  ``` python
  # Validate file metadata (is present, has a name, isn't empty)
  serializer = PreUploadFileSerializer(
      data=data,
      context=self.get_serializer_context(),
  )
  serializer.is_valid(raise_exception=True)
  validated_file = data.get('file')
  ```

### max_length

* Pour éviter des problèmes avec l'OS, Django tronque le nom des fichiers à 255 caractères.  
  Pour pouvoir érifier le nom du fichier d'origine, écraser les handlers par défaut:

  <details>
    <summary>FILE_UPLOAD_HANDLERS</summary>

    <pre lang="python">
    FILE_UPLOAD_HANDLERS = [
        'core.uploadhandler.MemoryFileUploadHandler',
        'core.uploadhandler.TemporaryFileUploadHandler',
    ]
    </pre>

    <pre lang="python">
    from django.core.files.uploadhandler import (
        MemoryFileUploadHandler,
        TemporaryFileUploadHandler,
    )


    class KeepRawNameMixin:
        def new_file(self, field_name, file_name, *args, **kwargs):
            self.raw_name = file_name

            super().new_file(field_name, file_name, *args, **kwargs)

        def file_complete(self, file_size):
            file = super().file_complete(file_size)

            setattr(file, 'raw_name', self.raw_name)
            return file


    class MemoryFileUploadHandler(KeepRawNameMixin, MemoryFileUploadHandler):
        pass


    class TemporaryFileUploadHandler(KeepRawNameMixin, TemporaryFileUploadHandler):
        pass
    </pre>

    <pre lang="python">
    from rest_framework_json_api.serializers import (
        FileField as BaseFileField,
        ImageField as BaseImageField,
    )


    class RawNameMaxLengthMixin:
        def _check_raw_name_length(self, data):
            if self.max_length is None:
                return

            # Django will always truncate the filename to 255
            # So raise an error if the given filename is greater than that
            raw_name_length = len(getattr(data, 'raw_name', ''))
            if raw_name_length > self.max_length:
                self.fail('max_length', max_length=self.max_length, length=raw_name_length)


    class FileField(BaseFileField, RawNameMaxLengthMixin):
        def to_internal_value(self, data):
            data = super().to_internal_value(data)

            self._check_raw_name_length(data)
            return data


    class ImageField(BaseImageField, RawNameMaxLengthMixin):
        def to_internal_value(self, data):
            data = super().to_internal_value(data)

            self._check_raw_name_length(data)
            return data
    </pre>
  </details>

#### svg

* Pour accepter les SVG, il est nécessaire d'utiliser un champ personnalisé:

  <details>
    <summary>ImageOrSvgField</summary>

    <pre lang="python">
    class ImageOrSvgField(BaseImageField, RawNameMaxLengthMixin):
        def to_internal_value(self, data):

            # If that's a SVG, do not use Pillow
            if data.content_type == 'image/svg+xml':
                f = super(BaseImageField, self).to_internal_value(data)
                ext = 'svg'
            else:
                f = super().to_internal_value(data)
                ext = f.image.format.lower()

            self._check_raw_name_length(data)

            setattr(f, 'extension', ext)
            return f
    </pre>
  </details>

#### maxsize

* On peut facilement implémenter un validateur pour vérifier la taille maximale du fichier:

  <details>
    <summary>FileMaxsizeValidator</summary>

    <pre lang="python">
    class UserUploadAvatarSerializer(serializers.Serializer):
      """Serializer checking data to upload an avatar."""

      file = ImageOrSvgField(validators=[
          FileMaxsizeValidator(200 * 1024),  # 200 Kb
      ])

      class JSONAPIMeta:
          resource_name = 'user-avatar'
    </pre>

    <pre lang="python">
    from django.core.exceptions import ValidationError as DjangoValidationError
    from django.utils.deconstruct import deconstructible
    from django.utils.translation import gettext_lazy as _
    from django.template.defaultfilters import filesizeformat


    @deconstructible
    class FileMaxsizeValidator:
        """
        Validator to check if the file MIME type is allowed
        (is among the given list)
        """
        message = _('The maximum file size allowed is {maxsize}.')
        code = 'maxsize'

        def __init__(self, maxsize, message=None):
            self.maxsize = maxsize
            self.maxsize_fmt = filesizeformat(maxsize)
            if message:
                self.message = message

        def __call__(self, value):
            if value.size > self.maxsize:
                detail = self.message.format(
                    maxsize=self.maxsize_fmt,
                )
                raise DjangoValidationError(detail, code=self.code)

        def __eq__(self, other):
            return (
                isinstance(other, self.__class__)
                and self.maxsize == other.maxsize
                and self.message == other.message
                and self.code == other.code
            )
    </pre>
  </details>

* Si la taille du fichier dépasse la taille maximale autorisée par le serveur,  
  alors le fichier ne sera pas récupéré (le champ sera vide) — et on ne pourra vérifier sa taille avec des validations.

  ``` python
  # Maximum size, in bytes, of a request before it will be streamed to the
  # file system instead of into memory.
  # (set it to be lower than DATA_UPLOAD_MAX_MEMORY_SIZE to have some room for post data)
  FILE_UPLOAD_MAX_MEMORY_SIZE = 5242880  # 5 MB

  # Maximum size in bytes of request data (excluding file uploads) that will be
  # read before a SuspiciousOperation (RequestDataTooBig) is raised.
  DATA_UPLOAD_MAX_MEMORY_SIZE = 7864320  # 7.5 MB

  # Use the OS's default temporary directory (ie /tmp)
  FILE_UPLOAD_TEMP_DIR = None
  ```

#### mime

* On peut implémenter un validateur pour vérifier le type MIME du fichier:

  <details>
    <summary>FileMimeValidator</summary>

    <pre lang="python">
    # https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
    CONTENT_TYPES = {
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
        'application/vnd.ms-excel': 'xls',
        'text/plain': 'txt',
        'text/csv': 'csv',
    }
    ALLOWED_TYPES = EFX_CONTENT_TYPES.keys()


    class PreUploadFileSerializer(serializers.Serializer):
        """
        Serializer to validate the first check of file upload:
        there is a file, it has a filename & it isn't empty
        """
        file = FileField(validators=[
            FileMimeValidator(ALLOWED_TYPES),
        ])

        class JSONAPIMeta:
            resource_name = 'fileinput'
    </pre>
    <pre lang="python">
    from django.core.exceptions import ValidationError as DjangoValidationError
    from django.utils.deconstruct import deconstructible
    from django.utils.translation import gettext_lazy as _
    from django.core.files.uploadedfile import UploadedFile


    @deconstructible
    class FileMimeValidator:
        """
        Validator to check if the file MIME type is allowed
        (is among the given list)
        """
        message = _('This file format ({content_type}) is not accepted.')
        code = 'not_supported'

        def __init__(self, allowed_content_type=[], message=None):
            self.allowed_content_type = allowed_content_type
            if message:
                self.message = message

        def __call__(self, value):
            content_type = value.content_type if isinstance(value, UploadedFile) else ''

            if content_type not in self.allowed_content_type:
                detail = self.message.format(
                    content_type=content_type,
                )
                raise DjangoValidationError(detail, code=self.code)

        def __eq__(self, other):
            return (
                isinstance(other, self.__class__)
                and self.allowed_content_type == other.allowed_content_type
                and self.message == other.message
                and self.code == other.code
            )
    </pre>
  </details>

### Sauvegarde

* Créer ou mettre à jour un champ fichier se fait directement à partir d'un `UploadedFile`,  
  Django se servira d'`upload_to` et `storage` pour envoyer le fichier au bon endroit à la sauvegarde.

  ``` python
  fileinput = serializer.validated_data['fileinput']

  return FileReport.objects.create(
      created_by=self.request.user,
      fileinput=fileinput,
      fileinput_name=fileinput.name.strip(),
      fileinput_size=fileinput.size,
      fileinput_content_type=fileinput.content_type,
      name=serializer.validated_data.get('name', '') or _('Compte rendu'),
      date=serializer.validated_data.get('date', None),
      **kwargs,
  )
  ```

* On peut également définir un champ fichier à partir d'un path en passant par la méthode `save()` du champ

  ``` python
  with tempfile.NamedTemporaryFile() as f:
      write_filepath = f.name
      ...

      # save file (filename is passed to get_upload_to)
      if f:
          instance.file.save(filename, f, save=False)
      instance.save()
  ```

  ``` python
  # Might raise an error if not readable
  with open(filepath, 'rb') as f:
      filename = os.path.basename(filepath)

      # Saves it to the default storage, then saves the instance
      instance.avatar.save(filename, f, save=True)
  ```

### storage

* On peut utiliser plusieurs storages au sein de l'application en définissant la propriété `storage` du champ fichier.  
  S'il n'est pas spécifié, alors le storage par défaut est utilisé.

  <details>
    <summary>
      <ins>core/models/user.py</ins>
    </summary>

    <pre lang="python">
    from core.storages import public_storage


    def get_upload_avatar_to(instance, filename):
        return os.path.join('staticfiles', 'avatars', filename)


    class User(AbstractBaseUser):

        avatar = models.FileField(
            _('avatar'),
            upload_to=get_upload_avatar_to,
            storage=public_storage,
            blank=True,
            editable=False,
        )
    </pre>
  </details>

  <details>
    <summary>
      <ins>core/storages.py</ins>
    </summary>

    <pre lang="python">
    from django.conf import settings
    from django.core.files.storage import default_storage
    from storages.backends.gcloud import GoogleCloudStorage


    if isinstance(default_storage, GoogleCloudStorage):
        public_storage = GoogleCloudStorage(
            bucket_name=settings.GS_PUBLIC_MEDIA_BUCKET_NAME,
            custom_endpoint=settings.GS_PUBLIC_MEDIA_BUCKET_BOUND_HOSTNAME,
            default_acl='publicRead',
            # querystring_auth=False,
        )
    else:
        public_storage = default_storage
    </pre>
  </details>

### Fonctions du storage

* On retrouve sur l'object storage des fonctions qui permettent de manipuler les fichiers présents sur le storage:

    ``` python
    exists = default_storage.exists(filename)
    ```
    ``` python
    f = default_storage.open(filename, 'rb')
    content = f.read()
    f.close()
    ```
    ``` python
    default_storage.delete(filename)
    ```

    <details>
      <summary>
        <ins>test_environment.py</ins>
      </summary>

      <pre lang="python">
      from django.core.files.storage import default_storage

      class EnvironmentTest(TestCase):
          def test_storage(self):
              filename = f'test-{datetime.datetime.utcnow().isoformat()}'

              # Create file
              self.assertFalse(default_storage.exists(filename))

              f = default_storage.open(filename, 'w')
              f.write('hello world')
              f.close()

              # Read file
              # (files stored on Google Cloud get retrieved as bytes
              # so we do the same for files on the local storage)
              self.assertTrue(default_storage.exists(filename))

              f = default_storage.open(filename, 'rb')
              content = f.read()
              f.close()
              self.assertEqual(content, b'hello world')

              # Update file
              with default_storage.open(filename, 'w') as f:
                  f.write('update worked')

              with default_storage.open(filename, 'rb') as f:
                  content = f.read()

              self.assertEqual(content, b'update worked')

              # Delete file
              default_storage.delete(filename)
              self.assertFalse(default_storage.exists(filename))
      </pre>
    </details>

### PIL

* On peut utiliser FileField pour l'upload de fichiers quelconque, et ImageField pour les images.  
  L'utilisation de `ImageField` nécessite l'installation de pillow, qui correspond au package PIL en python.  
  Il est utilisé pour vérifier que les images sont valides et pour détecter leur type MIME.

    ```
    pip install pillow
    ```

* On peut également se servir de Pillow pour redimmensionner les images, et générer des thumbnails:

  <details>
    <summary>resize</summary>

    <pre lang="python">
    def resize(file, size=100):
        """
        :param BytesIO file
        :param integer size
        """
        from PIL import Image

        # Note: when Django calls image.verify, it closes the file descriptor
        # So we have to create a new instance
        image = Image.open(file)
        width, height = image.size

        if width > size:
            aspect_ratio = height / width
            new_width = size
            new_height = int(new_width * aspect_ratio)
        elif height > size:
            aspect_ratio = width / height
            new_height = size
            new_width = int(new_height * aspect_ratio)
        else:
            # keep as-is
            return image

        return image.resize(
            (new_width, new_height),
            resample=Image.LANCZOS,
        )
    </pre>
  </details>