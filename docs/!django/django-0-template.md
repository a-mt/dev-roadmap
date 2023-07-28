---
title: Template
category: Python, Django
---
{% raw %}
## Configurations

* Activer le backend par défaut de Django pour les templates:

  ``` python
  TEMPLATES = [
      {
          'BACKEND': 'django.template.backends.django.DjangoTemplates',
          'DIRS': [],
          'APP_DIRS': True,
          'OPTIONS': {
              'context_processors': [],
          },
      },
  ]
  ```

* Si `APP_DIRS` est vrai, Django cherchera les templates dans un répertoire `templates` à l'intérieur des applications actives.  
  On peut ne pas utiliser un emplacement standard en spécifiant `DIRS` à la place

  ``` python
  'DIRS': [
    BASE_DIR,
    'html',
  ],
  ```

## Créer un template

* Créer un fichier statique (un .html ou .txt par exemple) dans le répertoire `templates` d'une application active.

  <ins>templates/home.html</ins>

  ``` html
  <p>Hello World</p>
  ```

* Le language de templating de Django, appelé DTL (*Django Template Language*),
  est similaire à Twig mais ce n'est exactement la même syntaxe.  
  [Documentation templates](https://docs.djangoproject.com/en/4.1/topics/templates/)

## Afficher un template

### Via le Router

* Pour servir un template directement depuis le router:

  <ins>settings.py</ins>

  ``` python
  TEMPLATES = [
      # ...
      'DIRS': [BASE_DIR, 'templates'],
      'APP_DIRS': True,
  ```

  <ins>urls.py</ins>

  ``` python
  from django.urls import path
  from django.views.generic import TemplateView

  urlpatterns = [
      path('home/', TemplateView.as_view(template_name='home.html')),
  ]
  ```

### Via une View

* En utilisant une vue:

  <ins>views.py</ins>

  ``` python
  from django.shortcuts import render

  def home(request):
      return render(request, 'home.html', {
        'variable': 'value',
      })
  ```

  <ins>urls.py</ins>

  ``` python
  from django.urls import path
  from . import views

  urlpatterns = [
      path('', views.home, name='homepage'),
  ]
  ```

## Récupérer le contenu d'un template

* Pour récupérer le contenu texte d'un template, on peut utiliser `render_to_string`:

  <ins>www/core/two_factors/gateways/email.py</ins>:

  ``` diff
  from django.conf import settings
  from django.core.mail.message import EmailMessage
  from django.utils.translation import gettext as _

  +from django.template.loader import render_to_string


  class Email:
      """
      Sends the token to maildev.
      """
      @staticmethod
      def send_sms(recipient, token):

          email = EmailMessage()
          email.subject = _('Fake SMS to {recipient}').format(recipient=recipient)

  +       email.body = render_to_string(
              'core/twilio/sms_message.txt',
              {'token': token}
          )
          email.from_email = settings.EMAIL_SENDER
          email.to = [settings.EMAIL_SENDER]
          email.send()
  ```

---

## DTL

### Afficher une variable

* Afficher une variable

  ```
  <h1>{{ var }}</h1>
  ```

### Appliquer des Filtres

* Pour appliquer des filtres:

   ```
   {% if value | divisibleby: 3 %}
   ```
   ```
   {{ value | add: 1 }}
   ```
   ```
   {{ name | lower }}
   ```

   ```
   {{ profile.profile_name | default:_("Profil par défaut") }}
   ```

### Échappement HTML

* Le contenu HTML des variables est automatiquement echappé, pour le désactiver:

  ```
  {{ myhtml | safe }}
  ```
  ```
  {% autoescape off %}
    {{ myhtml }}
  {% endautoescape %}
  ```

### Assigner une Variable

* Assigner une variable:

  ```
  {% with object.patient_account as patient %}
    <strong>{{ patient.id }}</strong>
  {% endwith %}
  ```

### Commentaires

* Ajouter des commentaires

  ```
  {% comment %}
    Mon commentaire
  {% endcomment %}
  ```
  ```
  {% comment "Optional note" %}
    <p>Commented out text with {{ create_date|date:"c" }}</p>
  {% endcomment %}
  ```
  ```
  {# hidden submit button to enable [enter] key #}
  ```

### Conditions

* Afficher du contenu sous condition

  ```
  {% if treasure.name == '' %}
      Unknown
  {% endif %}

  {% if var1 or var2 %}
      Lorem ipsum
  {% endif %}
  ```

### Boucles

* Pour boucler sur une liste:

  ```
  {% for treasure in treasures %}
      <p>{{ treasure.name }}</p>
  {% endfor %}
  ```

  ```
  {% for athlete in athlete_list %}
      <li>{{ athlete.name }}</li>
  {% empty %}
      <li>Sorry, no athletes in this list.</li>
  {% endfor %}
  ```

#### Variables spéciales

* Il existe des variables spéciales dans une boucle:

  | Variable | Description
  |--- |---
  | forloop.counter | Nombre d'itérations jusqu'à présent, à partir de 1
  | forloop.counter0 | Nombre d'itérations jusqu'à présent, à partir de 0
  | forloop.first | L'itération en cours est la première de liste
  | forloop.last | L'itération en cours est la dernière de liste

  ```
  {% for item in line %}
    {% if forloop.first %}
      <td class="patient" style="width: 1.5in">{{ item|upper }}</td>
    {% else %}
      <td class="{% if item %}colored{% endif %}">&nbsp;</td>
    {% endif %}
  {% endfor %}
  ```

#### Cycles

* Pour une variable cyclique avec une boucle:

  ```
  {% for item in items %}
      <p class="{% cycle 'odd' 'even' %}">{{ item }}</p>
  {% endfor %}
  ```

  ```
  {% cycle 'odd' 'even' as odd_even %}

  {% for item in items %}
    <p class="{% cycle odd_even %}">{{ item }}</p>
  {% for %}
  {% resetcycle odd_even %}
  ```

### Liens

#### Endpoint

* Créer un lien vers une route

  ```
  <a href="{% url 'profile' user.username %}">
  ```

### Fichier statique

* Créer un lien vers un fichier statique — <ins>my_app/static/style.css</ins> dans notre exemple

  1. Charger la liste des fichiers statiques avec `load staticfiles`
  2. Récupérer le lien du fichier statique avec `static NAME`

  ```
  {% load staticfiles %}
  <link href="{% static 'style.css' %}" rel="stylesheet">
  ```

### Traductions

* Utiliser gettext

  ```
  {% load i18n %}
  {% trans "Erreur 403" %}

  {% blocktrans %}Pour obtenir des <strong>statistiques descriptives et comparatives</strong> pour l'ensemble de l'équipe{% endblocktrans %}

  {% blocktrans trimmed %}
      Your OTP token is {{ token }}
  {% endblocktrans %}

  {% blocktrans with patient_id=object.pk %}
    Êtes-vous certain de vouloir supprimer le patient ID {{ patient_id }} ?
  {% endblocktrans %}

  {% blocktrans with name=account.get_full_name pk=account.pk %}
    Utilisateur <strong>{{ name }}</strong> (#{{ pk }})
  {% endblocktrans %}
  ```

  [Built-in template tags and filters](https://docs.djangoproject.com/en/4.1/ref/templates/builtins/#built-in-template-tags-and-filters)

### Héritage

* Un template peut hériter d'un autre template

  1. Définir des blocs dans le parent, l'enfant pourra écraser son contenu (ou laisser le contenu par défaut).

      ```
      </header>

      <main>
      {% block content %}{% endblock content %}
      </main>

      <footer>
      ```

  2. Hériter du template avec extends et redéfinir les blocs voulus

      ```
      {% extends 'base.html' %}
 
      {% block content %}
      {{ post.title }}
      {% endblock content %}
      ```

<details>
  <summary>
    <ins>core/templates/core/emails/base.html</ins>
  </summary>
  <br>

  <pre lang="twig">
    {% load static %}
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width"/>
        <title>MON PROJET</title>

        <style type="text/css">
          body {
            height: 100% !important;
            margin: 0;
            padding: 0;
            width: 100% !important;
            background-color: #f2f4f7;
          }
          table{
            border-collapse: collapse;
          }
          img, a img {
            border: 0;
            outline: none;
            text-decoration: none;
          }
          h1, h2, h3, h4, h5, h6{
            margin: 0;
            padding: 0;
            font-weight: normal;
          }
          p {
            margin: 1em 0;
            line-height: 1.46;
          }

          #main {
            font-family: Verdana, Geneva, sans-serif;
            color: #4c4c4c;
          }
          #main > tbody > tr > td {
            padding-bottom: 25px;
          }
          #header {
            padding-top: 35px;
          }
          #article table td {
            padding: 25px;
            border-radius: 3px;
            background-color: #FFF;
          }
          #article h3 {
            font-size: 24px;
            color: #2F3133;
          }
        </style>
        {% block css %}{% endblock %}
        <!--
          Outlook Conditional CSS

          These two style blocks target Outlook 2007 & 2010 specifically, forcing
          columns into a single vertical stack as on mobile clients. This is
          primarily done to avoid the 'page break bug' and is optional.

          More information here:
          http://templates.mailchimp.com/development/css/outlook-conditional-css
        -->
        <!--[if mso 12]>
          <style type="text/css">
            .flexibleContainer{display:block !important; width:100% !important;}
          </style>
        <![endif]-->
        <!--[if mso 14]>
          <style type="text/css">
            .flexibleContainer{display:block !important; width:100% !important;}
          </style>
        <![endif]-->
      </head>
      <body>
        <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="main">
          <!-- HEADER -->
          <tr>
            <td align="center" valign="top" id="header">
              <table border="0" cellpadding="0" cellspacing="0" width="600">
                <tbody>
                  <tr>
                    <td align="center" valign="top">
                      <table align="left" border="0" cellpadding="0" cellspacing="0" width="200">
                        <tr>
                          <td align="left" valign="top">
                            <!--logo-->
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <!-- CONTENT -->
          <tr>
            <td align="center" valign="top" id="article">
              <table border="0" cellpadding="0" cellspacing="0" width="650">
                <tbody>
                  <tr>
                    <td align="left" valign="top">
                      {% block content %}{% endblock %}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <!-- FOOTER -->
          {% block footer_tr %}{% endblock %}
        </table>
      </body>
      <br><br>
    </html>

  </pre>
</details>

<details>
  <summary>
    <ins>core/emails/admin/new_admin.html</ins>
  </summary>
  <br>

  <pre lang="twig">
    {% extends "core/emails/base.html" %}
    {% load i18n %}

    {% block content %}
        <h3>{{ subject }}</h3>

        <p>Nous vous informons qu'un utilisateur vient de faire une demande de création de compte <b>administrateur</b>:</p>
        <ul>
            <li><b>{{ user_fullname }}</b></li>
            <li>{{ user_email }}</li>
        </ul>

        <p>
            Vous pouvez vous rendre sur cette page pour valider ou refuser son compte:
            <a href="{{ link }}">{{ link }}</a>
        </p>

        <p>
            Merci,
            L'équipe {{ site_name }}
        </p>
    {% endblock %}
  </pre>
</details>

<details>
  <summary>
    <ins>core/emails/admin/new_admin.txt</ins>
  </summary>
  <br>

  <pre lang="twig">
    {% load i18n %}
    {% autoescape off %}

        Nous vous informons qu'un utilisateur vient de faire une demande de création de compte administrateur:

            Nom et prénom: {{ user_fullname }}
            Email: {{ user_email }}

        Vous pouvez vous rendre sur cette page pour valider ou refuser son compte: {{ link }}

        Merci,
        L'équipe {{ site_name }}
    {% endautoescape %}
  </pre>
</details>

### Inclusions

* À l'inverse, il est possible d'inclure d'autres fichiers

  ```
  <main>
    {% include "core/partials/messages.html" %}
    {% block content %}{% endblock %}
  </main>
  ```

  <ins>core/partials/messages.html</ins>:

  ```
  <div class="co-messages">
    {% if messages %}
      {% for message in messages %}
        <div class="alert alert-{{ message.tags }}">
          <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
          <p>{{ message|safe }}</p>
        </div>
      {% endfor %}
    {% endif %}
  </div>
  ```

* Il est possible de définir des variables au passage grâce à `with`:

  ```
  {% include "core/partials/bootstrap3/form.html" with layout="horizontal" label_size="col-xs-2" %}
  ```

---

## Tags personnalisés

* Il est possible de définir ses propres filtres et tags dans le répertoire `templatetags` d'une application active.

  <ins>blog/templatetags/has_content.py</ins>

  ``` python
  from django import template

  register = template.Library()

  @register.filter
  def has_content(obj):
      if isinstance(obj, dict):
          for item in obj:
              if obj[item]:
                  return True
      else:
          return True if obj else False
      return False
  ```

### Avec load

* Quelques points d'attention:

  1. Il est nécessaire de rédémarrer Django à chaque modification de tags.

  2. Le nom du fichier correspond au nom du filtre.

  3. Un template ne peut charger que les filtres de l'application en cours.  
     Autrement, pour rendre un filtre disponible à toutes les applications du projet, il faut l'ajouter dans les configurations: TEMPLATES > OPTIONS > libraries

      ``` python
      TEMPLATES = [
          {
              'BACKEND': 'django.template.backends.django.DjangoTemplates',
              'DIRS': [],
              'APP_DIRS': True,
              'OPTIONS': {
                  'context_processors': [
                    ...
                  ],
                  'libraries': {
                      'has_content': 'core.templatetags.has_content',
                  }
              },
          },
      ]
      ```

* Pour pouvoir utiliser le filtre personnalisé, le charger avec `load`:

  ```
  {% load has_content %}
  {% with has_weight=data.weight|has_content %}
  ```

  Note: on peut charger plusieurs modules dans une instruction load

  ```
  {% load i18n static bootstrap3 %}
  ```

  [Custom template tags and filters¶](https://docs.djangoproject.com/en/3.2/howto/custom-template-tags/)

### Sans load

* Des tags et filtres peuvent être ajoutés à Django, sans qu'ils nécessitent de `load`, en l'ajoutant dans les configurations: TEMPLATES > OPTIONS > builtins

      ``` python
      TEMPLATES = [
          {
              'BACKEND': 'django.template.backends.django.DjangoTemplates',
              'DIRS': [],
              'APP_DIRS': True,
              'OPTIONS': {
                  'context_processors': [
                    ...
                  ],
                  'builtins': [
                      'core.templatetags.has_content',
                  ],
              },
          },
      ]
      ```
{% endraw %}