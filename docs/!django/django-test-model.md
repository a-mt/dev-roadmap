---
title: Model
category: Python, Django, Tests
---

## TestCase

* Pour implémenter des tests unitaires simples, on crée une classe héritant de `django.test.TestCase`.  
  Cette classe doit être située dans un répertoire `tests`, le nom du fichier doit être préfixé de `test_` et les méthodes également préfixée de `test_` pour qu'elles soient considérées comme des tests unitaires.

  <ins>lib/patient/tests/models/test_patient.py

    ``` python
    from django.test import TestCase

    from lib.patient.models import Patient
    from lib.patient.factories.patient import PatientFactory


    class PatientTest(TestCase):
        def test_national_identification_number_fmt(self):
            """
            Tests that the national_identification_number is correctly formatted
            """
            patient = PatientFactory(
                firstname='Alice',
                lastname='A',
                gender=Patient.GENDER_FEMALE,
                birth_date='2000-12-31',
                national_identification_number=None,
            )
            self.assertIsNone(patient.national_identification_number)
            self.assertIsNone(patient.national_identification_number_fmt)

            patient.national_identification_number = '200123818500114'
            self.assertEqual(patient.national_identification_number_fmt, '2 00 12 38 185 001 14')
    ```

## Assertions

* À l'intérieur des différentes méthodes, on appelle des méthode assert pour vérifier que l'état de l'application est bien celui attendu.

<details>
<summary>Liste des fonctions assert</summary>

<pre lang="txt">
assertFalse(self, expr, msg=None)
assertTrue(self, expr, msg=None)
assertRaises(self, expected_exception, *args, **kwargs)
assertWarns(self, expected_warning, *args, **kwargs)
assertLogs(self, logger=None, level=None)
assertNoLogs(self, logger=None, level=None)
assertEqual(self, first, second, msg=None)
assertNotEqual(self, first, second, msg=None)
assertAlmostEqual(self, first, second, places=None, msg=None
assertNotAlmostEqual(self, first, second, places=None, msg=None
assertSequenceEqual(self, seq1, seq2, msg=None, seq_type=None)
assertListEqual(self, list1, list2, msg=None)
assertTupleEqual(self, tuple1, tuple2, msg=None)
assertSetEqual(self, set1, set2, msg=None)
assertIn(self, member, container, msg=None)
assertNotIn(self, member, container, msg=None)
assertIs(self, expr1, expr2, msg=None)
assertIsNot(self, expr1, expr2, msg=None)
assertDictEqual(self, d1, d2, msg=None)
assertDictContainsSubset(self, subset, dictionary, msg=None)
assertCountEqual(self, first, second, msg=None)
assertMultiLineEqual(self, first, second, msg=None)
assertLess(self, a, b, msg=None)
assertLessEqual(self, a, b, msg=None)
assertGreater(self, a, b, msg=None)
assertGreaterEqual(self, a, b, msg=None)
assertIsNone(self, obj, msg=None)
assertIsNotNone(self, obj, msg=None)
assertIsInstance(self, obj, cls, msg=None)
assertNotIsInstance(self, obj, cls, msg=None)
assertRaisesRegex(self, expected_exception, expected_regex
assertWarnsRegex(self, expected_warning, expected_regex
assertRegex(self, text, expected_regex, msg=None)
assertNotRegex(self, text, unexpected_regex, msg=None)
</pre>
</details>

### assertFalse

* Vérifie qu'une valeur est `False`

    ``` python
    self.assertFalse(Search.objects.search('Dupont').exists())
    ```

### assertTrue

* Vérifie qu'une valeur est `True`

    ``` python
    self.assertTrue(Search.objects.search('Charlene dupont').exists())
    ```

### assertNone

* Vérifie qu'une valeur est `None`

    ``` python
    self.assertIsNone(data['clinical-height'])
    ```

### assertIsNotNone

* Vérifie qu'une valeur n'est pas `None`

    ``` python
    self.assertIsNotNone(attributes.get('token', None))
    ```

### assertEqual

* Vérifie qu'une valeur est égale à une autre

    ``` python
    self.assertEqual(error['code'], 'accepted')
    ```
    ``` python
    self.assertEqual(Search.objects.search('"St Dupon"').count(), 1)
    ```

### assertNotEqual

* Vérifie qu'une valeur n'est pas égale à une autre

    ``` python
    self.assertNotEqual(attr, '')
    ```

### assertIn

* Vérifie qu'une valeur en contient une autre (`a in b`)

    ``` python
    self.assertIn('unexpected UUID', str(log.msg))
    ```

### assertNotIn

* Vérifie qu'une valeur n'en contient pas une autre

    ``` python
    self.assertNotIn('predicted-cpt', payload['data']['attributes'])
    ```
    ``` python
    self.assertNotIn(self.profile.id, obj_id_list)
    ```

### assertContains

* Est spécifique à Django pour vérifier l'état d'une réponse

    ``` python
    response = self.client.get(self.url)

    self.assertContains(response, 't3st')
    ```

* Permet d'évaluer davantage que `assertIn`

    ``` txt
    SimpleTestCase.assertContains(response, text, count=None, status_code=200, msg_prefix='', html=False)
    ```

### assertNotContains

* Inverse d'assertContains

    ``` python
    self.assertNotContains(response, 'Thomas DUPONT')
    ```

### assertListEqual

* Vérifie que deux listes sont égales

    ``` python
    self.assertListEqual([x.email for x in cached_objects.admins], [admin1.email, admin2.email])
    ```

### assertGreater

* Vérifie qu'une valeur est supérieure à la valeur donnée

    ``` python
    self.assertGreater(patient.get_age(record.date), 99)
    ```

### assertLess

* Vérifie qu'une valeur est inférieur à la valeur donnée

    ``` python
    self.assertLess(patient.get_age(record.date), 20)
    ```

### assertIs

* Vérifie que deux objets sont la même instance

    ``` python
    self.assertIs(self.patient.record, self.record)
    ```

### assertIsInstance

* Vérifie qu'un objet est une instance d'une classe donnée

    ``` python
    self.assertIsInstance(self.record.antecedents_ptr, RecordAntecedents)
    ```

### assertRaises

* Vérifie qu'une exception est levée

    ``` python
    # Ensure PhoneDevice no longer exists
    with self.assertRaises(PhoneDevice.DoesNotExist):
        phone_device.refresh_from_db()
    ```

### assertLogs

* Vérifie que des logs sont ajoutés

    ``` python
    with self.assertLogs('foo', level='INFO') as cm:
        logging.getLogger('foo').info('first message')
        logging.getLogger('foo.bar').error('second message')

    self.assertEqual(cm.output, [
        'INFO:foo:first message',
        'ERROR:foo.bar:second message',
    ])
    ```

### assertRedirects

* Vérifie qu'une réponse donnée est une redirection vers un autre endpoint

    ``` python
    url = reverse('admin:doctors-team-edit', args=[6])

    # 2FA enabled
    self.assertRedirects(self.client.get(url), reverse('settings-security'), fetch_redirect_response=False)
    ```

---

## setUp: Définitions répétitives

* La méthode `setUp` est appelé avant chaque méthode `test_*`, elle permet de définir des variables dont on se sert dans les tests unitaires sans avoir à les re-définir à chaque fois.

    ``` python
    class PatientACLApiTest(APITestCase):
        """
        Test patient ACL logic
        """
        def setUp(self):
            """
            Is called before each test.
            Creates objects used in the tests.
            """

            # Create medical centers
            self.medical_center = MedicalCenterFactory(
                name='CHU Nice',
            )

        def test_create_medical_center_acl(self):
            """
            Test ACL logic on medical centers
            """
            medical_center = self.medical_center
    ```

* On a également `tearDown`, appelé après chaque test

    ``` python
    def setUp(self):
        "Hook method for setting up the test fixture before exercising it."
        pass

    def tearDown(self):
        "Hook method for deconstructing the test fixture after testing it."
        pass
    ```

## skip: Désactiver des tests

* Toutes les méthodes présentes commençant par `test_` dans une classe TestCase sont considérées comme de tests unitaires distincts, on peut donc temporairement désactiver des tests unitaires en renommant des méthodes — par exemple `skip_test_...`.

* Une autre manière de désactiver des tests unitaires est d'utiliser le décorateur `unittest.skip`

    ``` python
    # flake8: noqa E501
    import unittest
    from django.test import TestCase


    @unittest.skip('FONCT-25 Update stage detection logic')
    class Sprint1Test(TestCase):
    ```

## override_settings: Modifier les configurations

On peut temporairement modifier les configurations de l'application avec `django.test.override_settings`

  - soit à l'échelle d'une classe

    ``` python
    from rest_framework.test import APITestCase

    from django.test import override_settings

    @override_settings(IS_2FA_ENABLED=True)
    class UserAuth2FApiTest(APITestCase):
    ```

  - d'une méthode

    ``` python
    from django.test import TestCase, override_settings

    class UserModelTest(TestCase):

        @override_settings(IS_NOMINATIM_ENABLED=True)
        def test_trigger_compute_longitude_latitude(self):
    ```

  - ou encore d'un bloc

    ``` python
    from django.test import TestCase, override_settings

    class GetAIReportModelTest(TestCase):

        def test_launch_get_ai_report(self):
            ...

            with override_settings(
                IS_LUNGSCREENAI_ENABLED=True,
                LUNGSCREENAI_MAX_ATTEMPTS_RECOVER=5,
                LUNGSCREENAI_MAX_ATTEMPTS_MISSING=2,
                LUNGSCREENAI_URL='http://localhost:8000/api/lungscreenai/dummy',
            ):
    ```

## mute_signals: Désactiver des hooks

* On peut empêcher le déclenchement des hooks de cycle de vie des modèles crées via une factory graĉe à `factory.django.mute_signals`

    ``` python
    import factory

    from . import models
    from . import signals

    @factory.django.mute_signals(signals.pre_save, signals.post_save)
    class FooFactory(factory.django.DjangoModelFactory):
        class Meta:
            model = models.Foo
    ```

    ``` python
    def make_chain():
        with factory.django.mute_signals(signals.pre_save, signals.post_save):
            # pre_save/post_save won't be called here.
            return SomeFactory(), SomeOtherFactory()
    ```

## freeze_time: Modifier le temps

* Il est possible de définir le temps qui sera retourné par un appel à `time.time()` avec `django.test.utils.freeze_time`

    ``` python
    from django.test.utils import freeze_time


    class ApiLungScreenAITest(APITestCase):

        def test_api_permission(self):

            # Auth with valid token, but expired signature (created an hour ago): unauthorized
            with freeze_time(time.time() - 3601):
                signature = create_signature(settings.LUNGSCREENAI_AUTH_TOKEN)

            self.client.credentials(HTTP_AUTHORIZATION=f'Token {settings.LUNGSCREENAI_AUTH_TOKEN}')
            response = self.client.get(url, HTTP_X_SIGNATURE=signature)
            self.assertEqual(response.status_code, 401)
    ```

## mail.outbox

* Lors du lancement de tests unitaires, les mails ne sont pas envoyés au serveur SMTP mais à un container `django.core.mail`, dont on peut se servir pour vérifier le déclenchement d'envoi par mail

    ``` python
    from django.core import mail

    class UserAuth2FApiTest(APITestCase):
        def test_login(self):
            self.assertEqual(len(mail.outbox), 0)

            ...

            # Did send a mail
            self.assertEqual(len(mail.outbox), 1)
            mail_txt = mail.outbox[0].body

            # Has an OTP in it
            device = devices[0]
            challenge_otp1 = device.challenge_otp
            self.assertNotEqual(mail_txt.find(f'code: {challenge_otp1}'), -1)
    ```

    ``` python
            # Reset mail outbox
                mail.outbox = []

            ...

            # Didn't send a mail but sms
            self.assertEqual(len(mail.outbox), 1)
            self.assertEqual(mail.outbox[0].subject, 'Fake SMS to +33789123456')
            self.assertEqual(mail.outbox[0].to, [user.email])
    ```

## requests_mock

* Permet de vérifier si un appel externe a été effectué.  
  Peut être ajouté via

  - un décorateur sur la classe:

    ``` python
    import requests_mock

    @requests_mock.Mocker(real_http=True)
    class MedicalImagesUploadTest(APITestCase):

        def test_medical_images_upload_file_creation_with_tasks_applied(self, m):
            orthanc_matcher = m.register_uri(requests_mock.ANY, settings.ORTHANC_API_ROOT_URL)

            self.load_orthanc_data(m)

            self.assertTrue(orthanc_matcher.called)
            self.assertEqual(orthanc_matcher.call_count, 5)
    ```

  - un décorateur sur la méthode

    ``` python
    class DrugApiTest(APITestCase):

        @requests_mock.Mocker()
        def test_creation_with_new_drug(self, m):
            m.register_uri(requests_mock.ANY, requests_mock.ANY, real_http=True)
            self.assertFalse(m.called)

            response = self.client.post(
                reverse("jsonapi:drug-list"),
                payload,
                content_type="application/vnd.api+json",
            )
            self.assertEqual(response.status_code, 201)

            self.assertTrue(m.called)
            self.assertEqual(m.call_count, 1)
    ```

  - un bloc

    ``` python
    class QuestionnaireTaskTest(APITestCase):
        def test_create_patient_questionnaires(self):

            # Note: requests_mock should be imported after requests for it to work
            import requests_mock

            with requests_mock.Mocker(real_http=False) as m:
                m.register_uri(requests_mock.ANY, requests_mock.ANY)
                self.assertFalse(m.called)

                # The task creates an URI
                create_patient_questionnaires.delay()
                history = m.request_history

                # API was called
                self.assertTrue(m.called)
                self.assertEqual(len(history), 1)
                self.assertEqual(history[0].method, "PUT")

                # Mail was sent
                self.assertEqual(len(mail.outbox), 1)
    ```

* Si `real_http=False`, alors la requête vers l'extérieur n'est pas effectuée.  
  On peut également définir le contenu de la réponse 

    ``` python
        @override_settings(IS_NOMINATIM_ENABLED=True)
        def test_trigger_compute_longitude_latitude(self):
            import requests_mock

            text = json.dumps([{
                'lat': '0.1',
                'lon': '0.2',
            }])
            user = UserFactory()
            self.assertIsNone(user.address_latitude)

            # Address is filled in: nominatim is called
            with requests_mock.Mocker(real_http=False) as m:
                m.register_uri(requests_mock.ANY, requests_mock.ANY, text=text)

                user.address_text = '20 rue Saint-André, 06100 Nice'
                user.save()
                user.refresh_from_db()
                self.assertTrue(m.called)
                self.assertIsNotNone(user.address_latitude)
    ```