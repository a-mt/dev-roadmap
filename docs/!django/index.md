---
title: Django
category: Python
---

[basics-entrypoint]: django-0-entrypoint.md
[basics-applications]: django-0-applications.md
[basics-urls]: django-0-urls.md
[basics-templates]: django-0-template.md
[basics-views]: django-0-view.md

[orm-model]: django-orm-model.md
[orm-migration]: django-orm-migration.md
[orm-fixture]: django-fixture.md
[orm-queryset]: django-orm-queryset.md
[orm-query]: django-orm-query.md
[orm-manager]: django-orm-manager.md
[orm-hooks]: django-orm-hooks.md

[gettext]: django-gettext.md
[formats]: django-formats.md
[command]: django-command.md
[swagger]: django-swagger.md
[auth]: django-auth.md
[auth-2fa]: django-auth-2fa.md
[auth-reconnect]: django-auth-reconnect.md
[media]: django-media.md

[drf-url]: django-drf-url.md
[drf-permission]: django-drf-permission.md
[drf-auth]: django-drf-auth.md
[drf-parser]: django-drf-parser.md
[drf-query]: django-drf-query.md
[drf-serializer]: !drf-serializer/django-drf-serializer.md

[celery]: django-celery.md
[sentry]: django-sentry.md

[test-factory]: django-test-factory.md
[test-model]: django-test-model.md
[test-api-drf]: django-test-drf.md

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
