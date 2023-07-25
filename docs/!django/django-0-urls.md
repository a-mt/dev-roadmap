---
title: Bases > URLs
category: Python, Django
---

## Settings

* L'emplacement du fichier contenant les URLs racines est spécifié dans la variable `ROOT_URLCONF` dans les configurations.  
  Ici, il s'agira du fichier urls.py, dans le même répertoire que manage.py

    ``` python
    ROOT_URLCONF = 'urls'
    ```

## URLs

* Le fichier urls doit définir une variable `urlpatterns` qui est une liste d'endpoint.  
  À l'intérieur de cette liste on peut spécifier

  - un endpoint en passant en paramètres de la fonction `path` l'URL et la vue associée.  
    On peut créer une vue d'une classe qui hérite de `django.views.generic.base.View` avec la méthode de classe `as_view`
    Et on peut créer une vue à partir d'un template en utilisant la classe `TemplateView`  

  - un sous-ensemble d'endpoint avec en paramètre l'URL et un `include` d'un autre fichier urls

  - un endpoint en passant en paramètres de la fonction `re_path` le motif de URL et la vue associée.  
    Note: `url` est un alias de re_path, `path` accepte une version simplifiée de paramètres dans l'URL.  
    Il est possible d'ajouter des types personnalisés: [Path converters & Registering custom path converters¶](https://docs.djangoproject.com/en/dev/topics/http/urls/#path-converters)

    <ins>urls.py</ins>:

    ``` python
    """core URL Configuration

    The `urlpatterns` list routes URLs to views. For more information please see:
        https://docs.djangoproject.com/en/3.2/topics/http/urls/
    Examples:
    Function views
        1. Add an import:  from my_app import views
        2. Add a URL to urlpatterns:  path('', views.home, name='home')
    Class-based views
        1. Add an import:  from other_app.views import Home
        2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
    Including another URLconf
        1. Import the include() function: from django.urls import include, path
        2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
    """
    from django.apps import apps
    from django.conf import settings
    from django.contrib.auth import views as auth_views
    from django.urls import include, path, re_path
    from django.views.generic import TemplateView
    from core import views

    # namespace is the prefix of the routes name (ie api:user-auth-user)
    # include gives the path of the url file + project app to load (should be included in INSTALLED_APPS)

    urlpatterns = [
        path('about/', views.about, name='about'),
        path('accounts/login/', auth_views.LoginView.as_view(), name='login'),
        path('accounts/logout/', auth_views.LogoutView.as_view(), name='logout'),
        path('home/', TemplateView.as_view(template_name='home.html'), name='home'),

        path('healthcheck/', include('core.healthchecks.urls'), namespace='healthcheck'),

        path('posts/', views.posts, name='posts-index'),
        path('posts/<int:record_id>', views.posts, name='posts-detail'),
        re_path(
          r'(?P<uidb64>[0-9A-Za-z]+)/(?P<token>.+)/',
          views.password_reset_confirm,
          name='password-reset-confirm',
        ),

        path(
            "<page_slug>-<page_id>/",
            include(
                [
                    path("history/", views.history),
                    path("edit/", views.edit),
                    path("discuss/", views.discuss),
                    path("permissions/", views.permissions),
                ]
            ),
        ),
    ]
    # Include only if application is listed in INSTALLED_APPS
    if apps.is_installed('api'):
        urlpatterns.append(
          path('api/', include(('api.urls', 'api'), namespace='api')),
        )
    ```

## Namespace

* Les endpoints définis auront un nom associé.  
  Ils sont précédés de l'espace nom suivit de ':'. Par exemple 'admin:index' désigne l'espace de nom 'admin' et l'URL nommée 'index'.

* On peut créer une URL à partir de son nom avec la fonction `django.urls.reverse`

  ``` python
  from django.urls import reverse

  reverse('api:file-list')

  reverse('api:file-detail', args=(scanner_id))
  ```

## Django-extensions

* Pour lister les endpoints que Django connaît (et leur nom)

  1. Installer le package django-extensions

      ``` bash
      $ pip install django-extensions
      ```

  2. L'ajouter à liste des applications activées (variable `INSTALLED_APPS` dans les configurations)

      ``` python
      try:
          # flake8: noqa
          import django_extensions
          INSTALLED_APPS += (
              'django_extensions',
          )
      except ModuleNotFoundError:
          pass
      ```

  3. Utiliser la commande Django `show_urls`

      ``` bash
      $ python manage.py show_urls
      ```