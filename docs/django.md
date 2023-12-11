---
title: Django
category: Python
---

[basics-entrypoint]: !django/django-0-entrypoint.md
[basics-applications]: !django/django-0-applications.md
[basics-urls]: !django/django-0-urls.md
[basics-templates]: !django/django-0-template.md
[basics-views]: !django/django-0-view.md

[orm-model]: !django/django-orm-model.md
[orm-migration]: !django/django-orm-migration.md
[orm-fixture]: !django/django-fixture.md
[orm-queryset]: !django/django-orm-queryset.md
[orm-query]: !django/django-orm-query.md
[orm-manager]: !django/django-orm-manager.md
[orm-hooks]: !django/django-orm-hooks.md

[gettext]: !django/django-gettext.md
[formats]: !django/django-formats.md
[command]: !django/django-command.md
[swagger]: !django/django-swagger.md
[auth]: !django/django-auth.md
[auth-2fa]: !django/django-auth-2fa.md
[auth-reconnect]: !django/django-auth-reconnect.md
[media]: !django/django-media.md

[drf-url]: !django/django-drf-url.md
[drf-permission]: !django/django-drf-permission.md
[drf-auth]: !django/django-drf-auth.md
[drf-parser]: !django/django-drf-parser.md
[drf-query]: !django/django-drf-query.md
[drf-serializer]: !drf-serializer/django-drf-serializer.md

[celery]: !django/django-celery.md
[sentry]: !django/django-sentry.md

[test-factory]: !django/django-test-factory.md
[test-model]: !django/django-test-model.md
[test-api-drf]: !django/django-test-drf.md

* Les bases
  * [Entrypoint][basics-entrypoint]
  * [Applications][basics-applications]
  * [URLs][basics-urls]
  * [Templates][basics-templates]
  * [Views][basics-views]
* ORM
  * [Déclarer un modèle][orm-model]
  * [Créer et lancer des migrations][orm-migration]
  * [Queryset][orm-queryset]
  * [Query][orm-query]
  * [Manager][orm-manager]
  * [Hooks][orm-hooks]
  * [Fixtures][orm-fixture]
  * Multi-héritage
  * Polymorphisme
* Divers
  * [Traductions][gettext]
  * [Formats][formats]
  * [Commandes][command]
  * [Swagger][swagger]
  * [Auth][auth]
  * [Media & static][media]
* Django Rest Framework (DRF)
  * [Vues & URLs][drf-url]
  * [Permission][drf-permission]
  * [Auth][drf-auth], [2FA][auth-2fa], [Reconnexion par cookie][auth-reconnect]
  * [Parser & renderer][drf-parser]
  * [Queryset & filter][drf-query]
  * [Serializer & validation][drf-serializer]
* Services
  * [Celery][celery]
  * [Sentry][sentry]
  * Emails
  * SMS
  * Postgres
  * Mongo
* Tests unitaires
  * [Factories][test-factory]
  * [Models][test-model]
  * [API DRF][test-api-drf]

---

* Forms
* Gateways
* Préparer un déploiement — healthchecks, ALLOWED_HOSTS, COOKIES...
