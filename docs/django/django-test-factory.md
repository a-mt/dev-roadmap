---
title: Factory
category: Python, Django, Tests
---

## Utiliser une factory

Une *factory* est une classe utilisée pour générer des instances de modèles contenant des données aléatoires. On se sert de ces classes dans les tests unitaires.

1. En pré-requis, installer factory_boy

    ``` bash
    pip install factory_boy
    ```

2. Créer une classe qui hérite de `DjangoModelFactory`  
   et déclarer le modèle source dans la sous-classe `Meta`

   <ins>core/factories/patient.py</ins>:

    ``` python
    import factory


    class PatientFactory(factory.django.DjangoModelFactory):
        class Meta:
            model = Patient

        created_by = factory.SubFactory('core.factories.user.UserFactory')
    ```

3. Créer une instance de cette classe:

    <ins>core/tests/models/test_patient</ins>:

    ``` python
    from django.test import TestCase
    from core.factories.user import UserFactory
    from core.factories.patient import PatientFactory


    class PatientModelTest(TestCase):
        def test_auto_computed(self):
            """
            Tests if auto fields are correct:
            n_studies, last_study
            """
            user = UserFactory()
            patient = PatientFactory(created_by=user)
            self.assertEqual(patient.n_studies, 0)
    ```

    Plutôt que de laisser la factory créer une valeur aléatoire, on peut passer une valeur différente en paramètre lorsqu'on crée l'instance.

---

## Attributs

### SubFactory

Permet de créer une instance à partir d'une autre factort

``` python
created_by = factory.SubFactory('core.factories.user.UserFactory')
```

### Faker.word

Permet de créer une chaîne de caractère contenant 1 mot.

``` python
firstname = factory.Faker('word')
```

### Faker.sentence

Permet de créer une chaîne de caractère contenant plusieurs mots.

``` python
name_specify = factory.Faker("sentence", nb_words=3)
```
``` python
allergies_sensitization_comments = factory.Faker("sentence")
```

### Faker.paragraph

Permet de créer une chaîne de caractère contenant un paragraphe

``` python
description = factory.Faker("paragraph")
```

### Faker.text

Permet de créer une chaîne de caractère contenant plusieurs paragraphes

``` python
cytologic_golde = factory.Faker("text", max_nb_chars=100)
cytologic_other = factory.Faker("text")
```

### Iterator

Permet de créer une chaîne de caractère parmis une liste de choix possibles.

``` python
gender = factory.Iterator(dict(Patient.GENDER_CHOICES).keys())
```
``` python
phone = factory.Iterator(['+33123456789'])
```

### Sequence

Permet de créer une valeur à partir d'un callback prenant une valeur auto-incrémentée en entrée.

``` python
username = factory.Sequence(lambda n: f'User{n}')
```

``` python
from random import randint


def random_rpps_number(nbr):
    """
    Function to format an correct RPPS number from a ``factory.Sequence`` number.
    """
    range_start = 10 ** (11 - 1)
    range_end = (10**11) - 1
    return str(randint(range_start, range_end))

rpps_number = factory.Sequence(random_rpps_number)
```

### Faker.uuid4

Permet de créer un uuid4

``` python
dicom_study_uid = factory.Faker('uuid4')
```

### Faker.sha1

Permet de créer un SHA

``` python
sha1sum = factory.Faker("sha1")
```

### Faker.mime_type

Permet de créer un type MIME

``` pythno
content_type = factory.Faker("mime_type")
```

### FileField

Permet de générer un fichier

``` python
from pathlib import Path

import factory.django

PREVIEW_FILE = Path(__file__).parent / "tests" / "resources" / "Fiche intiale BPCO - Phénotyper le patient.jpg"
VIDEO_FILE = Path(__file__).parent / "tests" / "resources" / "Fiche intiale BPCO - Phénotyper le patient.mp4"


file_obj = factory.django.FileField(filename="upload.doc")

preview = factory.django.ImageField(from_path=PREVIEW_FILE)
file_obj = factory.django.FileField(from_path=VIDEO_FILE)
```
    
### Faker.random_int

Permet de créer un nombre entier aléatoire

``` python
filesize = factory.Faker('random_int', min=10, max=100)
```

### Faker.date

Permet de créer une date aléatoire

``` python
mcm_date = factory.Faker('date')
```

### Faker.date_time_between

Permet de créer un dateTime entre deux bornes

``` python
import datetime

TZ = datetime.timezone.utc
TODAY = datetime.datetime.now(tz=TZ)
PAST_DATE = datetime.datetime(2020, 1, 1, tzinfo=TZ)


submitted_at = factory.Faker("date_time_between", start_date=PAST_DATE, end_date=TODAY, tzinfo=TZ)
```

### Faker.null_boolean

Permet de créer une valeur booléenne ou null

``` python
nodule = factory.Faker('null_boolean')
```

### Faker.boolean

Permet de créer une valeur booléenne

``` python
factory.Faker('boolean', chance_of_getting_true=20)
```

### PostGenerationMethodCall

Permet d'appeler une méthode du modèle pour récupérer la valeur de l'attribut

``` python
password = factory.PostGenerationMethodCall('set_password', 'test')
```

### SelfAttribute

Permet de référencer un autre attribut

``` python
profile = factory.SubFactory("profile.factories.PulmonologistProfileFactory")
consulting_physician_profile = factory.SelfAttribute("profile")
```

### LazyAttribute

Permet de créer une valeur non pas lorsque l'entité est crée, mais lorsqu'on essaie d'accéder à l'attribut

``` python
program_has_been_stopped = factory.LazyAttribute(lambda o: fake.boolean() if not o.final_evaluation_on else False)
```
``` python
name = factory.LazyAttribute(lambda o: f"Factory drug : {fake.sentence(nb_words=2)}")
```

### post_generation

Utiliser le décorateur `@factory.post_generation` pour créer une méthode qui sera appelée après la création de l'instance.

``` python
import factory

from core.models.user import User


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    email = factory.Sequence(lambda n: f'user{n}@dacapo.fr')
    password = factory.PostGenerationMethodCall('set_password', 'test')

    @factory.post_generation
    def post_generation(obj, create, extracted, **kwargs):

        if obj.is_staff:
            if obj.is_staff_privilege is None:
                obj.is_staff_privilege = User.STAFF_PRIVILEGE_ROOT
                obj.is_superuser = True
            else:
                obj.is_superuser = (obj.is_staff_privilege == User.STAFF_PRIVILEGE_ROOT)

        # will bypass 2 factor authentication when we use force_authenticate
        setattr(obj, '_force_device_id', 'BYPASS')
        setattr(obj, 'device_id', 'BYPASS')
```

---

## Fuzzy

L'utilisation de Fuzzy est dépréciée

``` python
import string
import pytz

import factory.fuzzy
from django.utils import timezone


vidal_id = factory.fuzzy.FuzzyChoice(dict(OCS.OCS_MOLECULE_CHOICES).keys())
efx_power = factory.fuzzy.FuzzyChoice([50, 80, 100, 140, 180, 200, 240, 280])
adeli_number = factory.fuzzy.FuzzyText(length=9, chars=string.digits)

quantity = factory.fuzzy.FuzzyDecimal(0, 1000, precision=2)
duration = factory.fuzzy.FuzzyInteger(1, 30)
inactivity_probability = factory.fuzzy.FuzzyFloat(0, 1)

start_date = factory.fuzzy.FuzzyDate(PAST_DATE, TODAY)
read_information_notice_at = factory.fuzzy.FuzzyDateTime(datetime.datetime(2008, 1, 1, tzinfo=pytz.UTC))
created_at = factory.fuzzy.FuzzyDateTime(timezone.make_aware(datetime.datetime(year=2005, month=1, day=1)))
```

---

## Attributs personnalisés

Il est possible d'ajouter une génération d'attribut personnalisée

1. Déclarer une classe qui hérite de `faker.providers.BaseProvider`

    <ins>core/utils/tests.py</ins>:

    ``` python
    import datetime
    import random

    from faker.providers import BaseProvider

    randgen = random.Random()
    randgen.state_set = False

    PAST_DATE = datetime.date(1950, 1, 1)


    class DateProvider(BaseProvider):
        """
        Date provider

        To add this provider to faker:
            factory.Faker.add_provider(DateProvider)

        To create a date using this provider:
            factory.Faker("date_between")
        """

        @classmethod
        def date_between(cls, start_date, end_date=None):
            if end_date is None:
                end_date = datetime.date.today()

            rand = randgen.randint(start_date.toordinal(), end_date.toordinal())
            return datetime.date.fromordinal(rand)

        @classmethod
        def past_date(cls):
            return cls.date_between(PAST_DATE)
    ```

2. Appeler `factory.Faker.add_provider` avec cette classe.  
   Les méthodes déclarées à l'intérieur de la classe pourrons être utilisées pour générer des valeurs d'attribut.

    <ins>core/factories/patient.py</ins>:

    ``` python
    import factory
    from core.utils.tests import DateProvider
    from core.models.patient import Patient

    factory.Faker.add_provider(DateProvider)


    class PatientFactory(factory.django.DjangoModelFactory):
        class Meta:
            model = Patient

        birth_date = factory.Faker('past_date')
    ```

<details>
<summary>Exemple 2: champs JSON</summary>

<pre lang="python">
import factory
import factory.fuzzy
from faker.providers import BaseProvider

from asthma.asthma_initial.models.ocs import OCS


class OCSFactory(factory.django.DjangoModelFactory):
    id = factory.Sequence(lambda x: x + 1000000)
    vidal_id = factory.fuzzy.FuzzyChoice(dict(OCS.OCS_MOLECULE_CHOICES).keys())
    quantity = factory.fuzzy.FuzzyDecimal(0, 1000, precision=2)
    duration = factory.fuzzy.FuzzyInteger(1, 30)

    class Meta:
        model = OCS


class OCSListProvider(BaseProvider):
    """
    OCS provider

    To add this provider to faker:
        factory.Faker.add_provider(OCSListProvider)

    To create a list of OCS using this provider:
        factory.Faker("ocs_list")
    """

    def ocs(self):
        obj = OCSFactory.build().__dict__
        obj.pop("_state")
        return obj

    def ocs_list(self, min=0, max=3):
        n = self.random_int(min=min, max=max)
        return [self.ocs() for i in range(n)]
</pre>

<pre lang="python">
from .ocs import OCSListProvider

factory.Faker.add_provider(OCSListProvider)

class AsthmaInitialTreatmentMixin:
    treatment_drugs_ocs_list = factory.Faker("ocs_list")
</pre>
</details>