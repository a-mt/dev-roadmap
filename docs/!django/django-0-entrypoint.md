---
title: Bases > Entrypoint
category: Python, Django
---

## Créer un projet

### Avec Docker

1. Créer les fichiers Docker et requirements.txt à la racine du projet

    <details>
      <summary>
        <ins>requirements.txt</ins>
      </summary>

      <pre lang="txt">
      Django==3.2
      </pre>
    </details>

    <details>
      <summary>
        <ins>Dockerfile</ins>
      </summary>

      <pre lang="dockerfile">
      FROM python:3.11.4-slim-bullseye

      ENV PYTHONUNBUFFERED=1

      # install system dependencies
      RUN apt update \
        && apt install -y gettext wget \
        # cleanup apt cache
        && apt-get clean \
        && rm -rf /var/lib/apt/lists/*

      # install app dependencies
      ENV APPDIR='/srv'
      ENV DJANGODIR='/srv/www'

      WORKDIR $APPDIR

      RUN pip3 install --upgrade pip
      COPY requirements.txt ./requirements.txt
      RUN pip install -r requirements.txt

      # setup server dependencies
      WORKDIR $DJANGODIR

      EXPOSE 8000
      HEALTHCHECK --interval=60s --timeout=10s --retries=3 CMD curl --fail http://localhost:8000/healthcheck/api || exit 1

      CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
      </pre>
    </details>

    <details>
      <summary>
        <ins>docker-compose.yml</ins>
      </summary>

      <pre lang="yml">
      version: '3'

      services:
        api:
          image: test_api
          build:
            context: .
            dockerfile: Dockerfile
          restart: unless-stopped
          ports:
            - "8000:8000"
          platform: linux/amd64
          volumes:
            - ./www:/srv/www:delegated
          healthcheck:
            disable: true
          tty: true
          command: >
            tail -f /dev/null
      </pre>
    </details>

2. Créer le répertoire www

    ``` bash
    $ mkdir www
    ```

3. Lancer le container

    ``` bash
    $ docker-compose up
    [+] Running 2/0
     ⠿ Network test_default  Created                                                                                0.0s
     ⠿ Container test-api-1  Created                                                                                0.0s
    Attaching to test-api-1
    ```

3. À l'intérieur du container, initialiser la structure du projet

    ``` bash
    $ docker exec -it test-api-1 bash
    django-admin startproject core .
    ```

4. Stopper le container (ctrl+c)

    ``` bash
    $ docker-compose up
    [+] Running 2/0
     ⠿ Network test_default  Created                                                                                0.0s
     ⠿ Container test-api-1  Created                                                                                0.0s
    Attaching to test-api-1
    ^CGracefully stopping... (press Ctrl+C again to force)
    Aborting on container exit...
    [+] Running 1/1
     ⠿ Container test-api-1  Stopped                                                                               10.3s
    canceled
    ```

5. Modifier le propriétaire du squelette crée

    ``` bash
    $ sudo chown -R $USER: www
    ```

6. Modifier le fichier <ins>docker-compose.yml</ins> et retirer ces deux lignes:

    ``` yml
    tty: true
    command: >
      tail -f /dev/null
    ```

7. Lancer le serveur de dev — c'est la commande par défaut définit dans le fichier Dockerfile:

    ``` bash
    $ docker-compose up
    ```

8. Aller sur http://localhost:8000

### Sans Docker

1. Pré-requis: python

    ``` bash
    $ python --version
    ```

2. Installer le package `django`

    ``` bash
    $ mkdir test
    $ cd test

    $ python -m venv env
    $ source env/bin/activate

    $ pip install django
    ```

3. Créer le squelette du projet avec la commande `django-admin`

    ``` bash
    $ mkdir www
    $ cd www
    $ django-admin startproject core .
    ```

4. Lancer le serveur de dev:

    ``` bash
    $ python manage.py runserver
    ```

5. Aller sur http://localhost:8000

---

## Lancer le serveur

### Commandes Django

* Le fichier manage.py permet de lancer des commandes Django.  
  On peut lancer un serveur de test, mais aussi des migrations, des tests, etc.  
  Pour voir la liste des commandes pouvant être lancées avec manage.py:

  ``` bash
  # python manage.py

  Type 'manage.py help <subcommand>' for help on a specific subcommand.

  Available subcommands:

  [auth]
      changepassword
      createsuperuser

  [contenttypes]
      remove_stale_contenttypes

  [django]
      check
      compilemessages
      createcachetable
      dbshell
      diffsettings
  ...
  ```

* À l'intérieur du fichier manage.py est définit l'emplacement du fichier de configuration par défaut.  
  Pour utiliser un fichier différent que celui par défaut:

  ``` bash
  $ python manage.py command --settings=settings_api
  ```

### Commande runserver

* En dev on utilise le serveur de test packagé avec django:  
  Ce serveur rechargera les sources automatiquement à chaque modification de fichier

  ``` bash
  $ python manage.py runserver
  ```

---

## Configurations

* À l'intérieur du fichier `manage.py` est définit la valeur par défaut de la variable d'environnement `DJANGO_SETTINGS_MODULE`.  
  Cette variable définit l'emplacement du fichier de configuration de l'application.  
  Dans l'exemple si-dessous, Django ira chercher les paramètres dans core.settings, c'est à dire le fichier `core/settings.py` ou `core/settings/__init__.py`

  <ins>manage.py</ins>:

    ``` python
    #!/usr/bin/env python
    """Django's command-line utility for administrative tasks."""
    import os
    import sys

    def main():
        """Run administrative tasks."""
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
        try:
            from django.core.management import execute_from_command_line
        except ImportError as exc:
            raise ImportError(
                "Couldn't import Django. Are you sure it's installed and "
                'available on your PYTHONPATH environment variable? Did you '
                'forget to activate a virtual environment?'
            ) from exc
        execute_from_command_line(sys.argv)


    if __name__ == '__main__':
        main()
    ```

## Daemon

* Dans les configurations, on trouve la variable `WSGI_APPLICATION`, qui définit l'entrypoint de l'application.  
  Le path spécifié est relatif au répertoire courant au moment de lancer la commande.  
  Ici, on indique à Django d'utiliser la variable `application` située dans le fichier `wsgi.py`

  ``` python
  WSGI_APPLICATION = 'wsgi.application'
  ```

* Cette application doit implémenter l'interface de Django.  
  On utilise le plus souvent wsgi

  <ins>wsgi.py</ins>:

  ``` python
  """
  WSGI config for core project.

  It exposes the WSGI callable as a module-level variable named ``application``.

  For more information on this file, see
  https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/
  """

  import os

  from django.core.wsgi import get_wsgi_application

  os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

  application = get_wsgi_application()
  ```

## Lancer un serveur de Prod

* En prod, on n'utilisera pas le serveur de test (runserver) mais un serveur capable de gérer de multiples requêtes en parallèle, tel que gunicorn.  
  Dans ce cas, on ne passe pas par manage.py, on spécifie directement l'emplacement de l'application à lancer, tel que `wsgi.application`.  
  C'est la raison pour laquelle l'emplacement par défaut des configurations (la variable `DJANGO_SETTINGS_MODULE`) est également définie dans le fichier wsgi.py

  ``` bash
  gunicorn
    --bind :8000
    --workers=5 --worker-class=sync
    --log-level=info
    --log-file=-
    --forwarded-allow-ips=*
    --pid=/var/run/gunicorn.pid
    wsgi:application
  ```

---

## Structure

* La structure initiale d'un projet Django + application blog crée à partir de django-admin ressemble à ça:

  ```
  └── www
      ├── blog
      │   ├── __init__.py
      │   ├── admin.py
      │   ├── apps.py
      │   ├── migrations
      │   │   └── __init__.py
      │   ├── models.py
      │   ├── templates
      │   │   └── .gitkeep
      │   ├── tests.py
      │   └── views.py
      ├── core
      │   ├── __init__.py
      │   ├── settings.py
      │   ├── urls.py
      │   └── wsgi.py
      └── manage.py
  ```

  - `manage.py`: fichier utilisé pour lancer des commandes Django
  - `core`
    - `settings.py`: configurations du projet
    - `wsgi.py`: entrypoint de du projet
    - `urls.py`: liste des endpoints de niveau 1
  - `blog`
    - `apps.py`: configurations de l'application blog
    - `admin.py`: configure l'interface admin de l'application blog
    - `migrations`: migrations de l'applications blog
    - `models.py`: modèles de l'applications blog
    - `tests.py`: tests de l'applications blog
    - `views.py`: vues de l'applications blog
