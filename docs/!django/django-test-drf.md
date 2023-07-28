---
title: DRF
category: Python, Django, Tests
---

### APITestCase

* Pour implémenter des tests unitaires DRF, même principe que les tests unitaires normaux mais avec une classe héritant de `rest_framework.test.rest_framework`.

    ``` python
    from rest_framework.test import rest_framework


    class UserSettingsApiTest(APITestCase):
        def test_depiscann(self):
            user = UserFactory()

            # ---
            # Not logged in: fails
            response = self.client.get(
                reverse('api:user-settings-account'),
            )
            self.assertEqual(response.status_code, 401)

            # ---
            # Logged in: success
            self.client.force_authenticate(user=user)

            response = self.client.get(
                reverse('api:user-settings-account'),
            )
            self.assertEqual(response.status_code, 200)

            # Returns the right payload
            response_payload = json.loads(response.content)
            self.assertEqual(response_payload['data']['type'], 'user')

    ```

## force_authenticate

* Pour forcer l'authentification d'un utilisateur sans passer par l'étape de login:

    ``` python
    user = UserFactory()

    self.client.force_authenticate(user=user)
    ```

## logout

* Pour retirer l'authentification en cours:

    ``` python
    self.client.logout()
    ```

## credentials

* Pour s'identifier via HTTP Token:

    ``` python
    # Auth with valid token and signature: success
    signature = create_signature(settings.LUNGSCREENAI_AUTH_TOKEN)

    self.client.credentials(HTTP_AUTHORIZATION=f'Token {settings.LUNGSCREENAI_AUTH_TOKEN}')
    response = self.client.get(url, HTTP_X_SIGNATURE=signature)
    self.assertEqual(response.status_code, 200)
    ```

## cookies

* On peut accéder aux cookies retournés par la réponse via `response.cookies`.  

    ``` python
    response = self.client.post(
        reverse('api:user-auth-login'),
        json.dumps(payload),
        content_type='application/vnd.api+json',
        HTTP_X_CSRFTOKEN=csrftoken,
    )
    self.assertEqual(response.status_code, 401)

    # Sets deviceid cookie
    deviceid_cookie = response.cookies.get(settings.DEVICE_ID_COOKIE_NAME, None)
    self.assertIsNotNone(deviceid_cookie)
    ```

* Ces cookies sont également directement ajoutés à `self.client.cookies` et seront automatiquement envoyés dans les requêtes suivantes

    ``` python
    self.client.cookies[settings.CSRF_COOKIE_NAME]
    ```

## Entêtes HTTP

* Il est possible de passer des entêtes HTTP supplémentaires directement au client lorsqu'on envoit une requête

    ``` python
    self.client.credentials(HTTP_AUTHORIZATION=f'Token {settings.LUNGSCREENAI_AUTH_TOKEN}')
    response = self.client.get(url, HTTP_X_SIGNATURE=signature)
    self.assertEqual(response.status_code, 200)
    ```

## csrf_checks

* Par défaut le client créée par APITestCase définit l'attribut `_dont_enforce_csrf_checks`
  sur les requêtes crées, ce qui a pour effet de désactiver la vérification des token CSRF.

* On peut désactiver ce comportement dans les tests unitaires,
    en écrasant `enforce_csrf_checks` sur le handler du client.

    ``` python
    class StudyRadiologicalApiTest(APITestCase):

        def test_finalize(self):
            user = UserFactory()

            self.client.force_authenticate(user=user)

            self.client.handler.enforce_csrf_checks = True
    ```

    Ou on peut écraser les arguments par défaut de `client_class` — ce qui impactera toutes les méthodes à l'intérieur de la classe

    ``` python
    import functools

    from rest_framework.test import APITestCase, APIClient


    class UserAuth2FApiTest(APITestCase):
        """
        Test authentication logic without any bypass
        """
        client_class = functools.partial(APIClient, enforce_csrf_checks=True)

        def test_login(self):
            ...
    ```

* Une fois les tests CSRF réactivés, il sera nécessaire d'ajouter l'entête HTTP `HTTP_X_CSRFTOKEN` sur les requêtes autres que GET.
    On peut récupérer la valeur du token CSRF dans les cookies du client.

    ``` python
    class StudyRadiologicalApiTest(APITestCase):

        def test_finalize(self):
            user = UserFactory()

            self.client.force_authenticate(user=user)

            # ---
            # Retrieve csrf token
            self.client.handler.enforce_csrf_checks = True

            response = self.client.get(
                reverse('api:user-auth-is-authenticated'),
            )
            self.assertEqual(response.status_code, 204)

            ...

            response = self.client.post(
                reverse('api:study-mcm-list'),
                json.dumps(payload),
                content_type='application/vnd.api+json',
                HTTP_X_CSRFTOKEN=self.client.cookies[settings.CSRF_COOKIE_NAME].value,
            )
    ```

* On peut vérifier dans une vue si l'attribut `_dont_enforce_csrf_checks` est présent, ce qui est un bon moyen de savoir
si on est à l'intérieur de tests unitaires ou non

    ``` python
    if getattr(request, '_dont_enforce_csrf_checks', False):
    ```

## json

* `json.dumps` permet de transformer une dictionnaire Python en JSON

    ``` python
    import json

    class PatientACLApiTest(APITestCase):
        def test_create_medical_center_acl(self):
            payload = {
                'data': {
                    'type': 'patient',
                    'attributes': {
                        'firstname': 'Alice',
                        'lastname': 'A',
                        'gender': Patient.GENDER_FEMALE,
                        'birth-date': '2000-12-31',
                        'address-text': 'mon addresse, ville',
                        'phone': '+33789123456',
                        'email': 'alice@yopmail.com',
                        'confirm': True,
                        'medical-center': medical_center.pk,
                        'doctor-attending-fullname': 'MON MÉDECIN',
                    },
                }
            }
            response = self.client.post(
                reverse('api:patient-list'),
                json.dumps(payload),
                content_type='application/vnd.api+json',
            )
            self.assertEqual(response.status_code, 201)
    ```

* Et `json.loads` de transformer du JSON en dictionnaire Python

    ``` python
            # Returns the right payload
            response_payload = json.loads(response.content)
            self.assertEqual(response_payload['data']['type'], 'patient')
            self.assertIsNotNone(response_payload['data']['id'])
            self.assertEqual(
                response_payload['data']['relationships']['medical-center']['data']['id'],
                str(medical_center.pk),
            )
    ```

## urlencode

* Pour passer des paramètres directement dans l'URL, et s'ils risquent de contenir des caractères réservés, les encoder avec `django.utils.http.urlencode`

    ``` python
    from django.utils.http import urlencode


    class PatientACLProspectApiTest(APITestCase):

        def test_search(self):
            ...
            q = urlencode({
                'patient': patient_id,
                'search': 'Nice',
            })
            response = self.client.get(
                reverse('api:patient-acl-prospect-list') + f'?{q}',
            )
    ```

## SimpleUploadedFile

* Pour uploader un fichier, utiliser directement `SimpleUploadedFile`

    ``` python
    from base64 import b64decode

    from django.core.files.uploadedfile import SimpleUploadedFile

    class FileApiTest(APITestCase):

        def test_upload_report(self):

            content = b64decode('JVBERi0xLjIgCjkgMCBvYmoKPDwKPj4Kc3RyZWFtCkJULyA5IFRmKCApJyBFVAplbmRzdHJlYW0KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCA1IDAgUgovQ29udGVudHMgOSAwIFIKPj4KZW5kb2JqCjUgMCBvYmoKPDwKL0tpZHMgWzQgMCBSIF0KL0NvdW50IDEKL1R5cGUgL1BhZ2VzCi9NZWRpYUJveCBbIDAgMCA5OSA5IF0KPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1BhZ2VzIDUgMCBSCi9UeXBlIC9DYXRhbG9nCj4+CmVuZG9iagp0cmFpbGVyCjw8Ci9Sb290IDMgMCBSCj4+CiUlRU9G')  # noqa
            payload = {
                'fileinput': SimpleUploadedFile('file.pdf', content, content_type='application/pdf'),
                'patient': patient.pk,
            }
            response = self.client.post(
                reverse('api:file-upload-report'),
                payload,
            )
            self.assertEqual(response.status_code, 201)
    ```

## post

* Permet d'appeler une méthode en POST — pour créer une entité

    ``` python
    response = self.client.post(
        reverse('api:file-upload-report'),
        payload,
    )
    ```

## get

* Permet d'appeler une méthode en GET — pour récupérer une liste d'entités:

    ``` python
    response = self.client.get(
        reverse('api:file-list'),
    )
    ```

* Ou le détail d'une entité:

    ``` python
    response = self.client.get(
        reverse('api:file-detail', args=(pk,)),
    )
    ```

## put

* Permet d'appeler une méthode en PUT — pour modifier une entité:

    ``` python
    response = self.client.put(
        reverse('api:file-detail', args=(pk,)),
        json.dumps(payload),
        content_type='application/vnd.api+json',
    )
    ```

## delete

* Permet d'appeler une méthode en DELETE — pour supprimer une entité:

    ``` python
    response = self.client.delete(
        reverse('api:file-detail', args=(pk,)),
    )
    ```

### response.status_code

* Le code HTTP retourné par la requête est disponible dans l'attribut `status_code` de la réponse

    <ins>400 Bad Request</ins>:

    ``` python
    response = self.client.post(
        reverse('api:file-upload-report'),
        payload,
    )
    self.assertEqual(response.status_code, 400)

    # Returns the right payload
    response_payload = json.loads(response.content)
    self.assertEqual(len(response_payload['errors']), 2)

    for error in response_payload['errors']:
        match error['source']['pointer']:
            case '/data/relationships/patient':
                self.assertEqual(error['code'], 'required')

            case '/data/attributes/fileinput':
                self.assertEqual(error['code'], 'empty')

            case _:
                self.assertIsNone(error['source']['pointer'])
    ```

    <ins>401 Unauthentified</ins>:

    ``` python
    response = self.client.get(
        reverse('api:file-list'),
    )
    self.assertEqual(response.status_code, 401)
    ```

    <ins>403 Forbidden</ins>:

    ``` python
    response = self.client.put(
        reverse('api:patient-detail', args=(pk,)),
        json.dumps(payload),
        content_type='application/vnd.api+json',
    )
    self.assertEqual(response.status_code, 403)
    ```

    <ins>404 Not Found</ins>:

    ``` python
    response = self.client.get(
        reverse('api:patient-detail', args=(patient_id,)),
    )
    self.assertEqual(response.status_code, 404)
    ```

    <ins>200 Success</ins>:

    ``` python
    response = self.client.get(
        reverse('api:file-list') + f'?patient={patient_id}',
    )
    response_payload = json.loads(response.content)
    self.assertEqual(response.status_code, 200)

    # Returns the right payload
    response_payload = json.loads(response.content)
    self.assertEqual(len(response_payload['data']), 0)
    ```

    <ins>201 Created</ins>:

    ``` python
    response = self.client.post(
        reverse('api:file-upload-scanner'),
        payload,
    )
    self.assertEqual(response.status_code, 201)

    # Returns the right payload
    response_payload = json.loads(response.content)
    self.assertEqual(response_payload['data']['type'], 'file-preview')
    self.assertEqual(response_payload['data']['attributes']['object-type'], 'file-scanner')
    ```

    <ins>204 No content</ins>:

    ``` python
    response = self.client.get(
        reverse('api:user-auth-is-authenticated'),
    )
    self.assertEqual(response.status_code, 204)
    ```

## refresh_from_db

* `refresh_from_db` permet de recharger les valeurs d'un modèle à partir de la BDD

    ``` python
    class StudyApiTest(APITestCase):

        def test_medical_study(self):
            patient = PatientFactory()

            ...

            # Finalize medical study: success
            response = self.client.post(
                reverse('api:study-medical-finalize', args=(study_id,)),
            )
            self.assertEqual(response.status_code, 200)

            # Db state is correct
            patient.refresh_from_db()
            self.assertEqual(patient.last_step, patient.STEP_INITIAL_MEDICAL)
            self.assertEqual(patient.current_step_expected, patient.STEP_INITIAL_RADIOLOGICAL)
            self.assertEqual(patient.current_step_waiting_creation, True)
    ```