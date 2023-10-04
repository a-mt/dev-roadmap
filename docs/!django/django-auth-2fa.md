---
title: 2-Factor Authentication (2FA)
category: Python, Django, Auth
---
{% raw %}

## Activer l'authentification

L'authentification à double facteur consiste à demander plusieurs méthodes de vérifications avant de considérer l'utilisateur comme authentifié. Typiquement: demander un mot de passe suivit d'un code envoyé par SMS ou email.

1. Créer le middleware auth.  
   Ce middleware servira à populer user.device_id à partir des cookies, s'il correspond à la valeur sauvegardée dans la session en cours

    <details>
      <summary><ins>core/middleware/auth.py</ins></summary>

      <pre lang="python">
      import functools
      import time

      from django.conf import settings
      from django.utils.functional import SimpleLazyObject
      from django.utils.http import http_date


      class Authentication2FAMiddleware:
          """
          Recycles django_otp.middleware.OTPMiddleware's logic

          Simply adds device_id on ``request.user``
          which will be ``None`` if the user didn't verify the device
          """
          def __init__(self, get_response=None):
              self.get_response = get_response

          def __call__(self, request):
              """
              If we don't render a template (probably a JSON Response):
              Code to be executed for each request before the view (and later middlewares) are called.
              """
              user = getattr(request, 'user', None)
              if user is not None:
                  request.user = SimpleLazyObject(
                      functools.partial(self._verify_device, request, user),
                  )

              response = self.get_response(request)
              return self.process_response(request, response)

          def _verify_device(self, request, user):
              """
              Sets OTP-related fields on an authenticated user.
              """
              user.device_id = getattr(user, '_force_device_id', None)

              if user.is_authenticated:
                  session_device_id = request.session.get(settings.DEVICE_ID_SESSION_KEY)
                  cookie_device_id = request.COOKIES.get(settings.DEVICE_ID_COOKIE_NAME, None)

                  if (
                      session_device_id
                      and cookie_device_id
                      and session_device_id == cookie_device_id
                  ):
                      user.device_id = session_device_id

              return user

          def _set_deviceid(self, request, response):
              cookie_name = settings.DEVICE_ID_COOKIE_NAME

              if cookie_name in request.COOKIES:
                  max_age = settings.DEVICE_ID_COOKIE_AGE
                  expires_time = time.time() + max_age
                  expires = http_date(expires_time)

                  response.set_cookie(
                      cookie_name,
                      request.COOKIES[cookie_name],
                      max_age=max_age,
                      expires=expires,
                      domain=settings.SESSION_COOKIE_DOMAIN,
                      path=settings.SESSION_COOKIE_PATH,
                      secure=settings.SESSION_COOKIE_SECURE or None,
                      httponly=True,
                  )
              else:
                  response.delete_cookie(
                      cookie_name,
                      path=settings.SESSION_COOKIE_PATH,
                      domain=settings.SESSION_COOKIE_DOMAIN,
                  )

          def process_response(self, request, response):
              if (
                  not getattr(request, 'deviceid_cookie_needs_reset', False)
                  or getattr(response, 'deviceid_cookie_set', False)
              ):
                  return response

              self._set_deviceid(request, response)
              response.deviceid_cookie_set = True
              return response
      </pre>
    </details>

2. Créer la permission IsAuthenticatedWith2F.  
   Cette permission permettra de vérifier si la requête en cours a un utilisateur authentifié, et qui a validé le second-facteur.

    <details>
      <summary><ins>core/permissions.py</ins></summary>

      <pre lang="python">
      from rest_framework.permissions import IsAuthenticated


      # ---------------------------------------------------------
      # AUTH
      # ---------------------------------------------------------

      class IsAuthenticatedWith2F(IsAuthenticated):
          __default_code = '2fa_required'
          __default_message = _('2nd-factor authentication required.')

          def has_permission(self, request, view):
              self.code = None
              self.message = None

              if not super().has_permission(request, view):
                  return False

              if not settings.IS_2FA_ENABLED:
                  return True

              if getattr(request.user, 'device_id', None) is None:
                  self.code = self.__default_code
                  self.message = self.__default_message
                  return False

              return True
      </pre>
    </details>

3. Créer l'exception NotAuthenticatedWith2F et un handler d'exceptions personnalisé

    <details>
      <summary><ins>core/exceptions.py</ins></summary>

      <pre lang="python">
      from rest_framework_json_api.exceptions import exception_handler as base_exception_handler
      from rest_framework import exceptions, status

      from django.utils.translation import gettext_lazy as _


      class NotAuthenticatedWith2F(exceptions.NotAuthenticated):
          """
          Mix between ValidationError and NotAuthenticated
          Should match code and message of IsAuthenticatedWith2F
          """
          default_code = '2fa_required'
          default_detail = _('2nd-factor authentication required.')

          def __init__(self, detail=None, code=None):
              if detail is None:
                  detail = self.default_detail
              if code is None:
                  code = self.default_code

              # For validation failures, we may collect many errors together,
              # so the details should always be coerced to a list if not already.
              if isinstance(detail, tuple):
                  detail = list(detail)
              elif not isinstance(detail, dict) and not isinstance(detail, list):
                  detail = [detail]

              self.detail = exceptions._get_error_details(detail, code)


      def exception_handler(exc, context):
          """
          Undo APIView.handle_exception's bullshit
          Note: Although the HTTP standard specifies "401 unauthorized",
          semantically this response means "unauthenticated"
          """
          if isinstance(exc, (exceptions.NotAuthenticated,
                              exceptions.AuthenticationFailed)):
              exc.status_code = status.HTTP_401_UNAUTHORIZED

          return base_exception_handler(exc, context)
      </pre>
    </details>

4. Définir les configurations

   - Ajouter le middleware de second-facteur

      ``` python
      MIDDLEWARE = [
          ...
          'django.contrib.auth.middleware.AuthenticationMiddleware',
          'core.middleware.auth.Authentication2FAMiddleware',
          ...
      ]
      ```

   - Définir IsAuthenticatedWith2F comme permission par défaut de Django Rest Framework et écraser le handler d'exceptions

      ``` python
      REST_FRAMEWORK = {
        'EXCEPTION_HANDLER': 'core.exceptions.exception_handler',
          ...
          'DEFAULT_PERMISSION_CLASSES': ('core.permissions.IsAuthenticatedWith2F',),
      }
      ```

   - Définir le cookie qui sera utilisé pour stocker l'ID de l'appareil.  
      L'utilisateur n'aura à utiliser une double-authentification que s'il ne s'est pas déjà connecté à partir de cet appareil — ou plus précisemment, de ce navigateur

      ``` python
      COOKIE_PREFIX = os.getenv('COOKIE_PREFIX', 'dacapo_')

      DEVICE_ID_COOKIE_NAME = f'{COOKIE_PREFIX}deviceid'
      DEVICE_ID_COOKIE_AGE = 60 * 60 * 24 * 7 * 52  # 364 days
      ```

   - Définir l'attribut qui sera sauvegardé dans la session.  
     La validité du cookie ne sera vérifié qu'au moment de la connexion de l'utilisateur, pour les authentifications suivantes, on n'a plus qu'à comparer la valeur en session (uniquement accessible au serveur) à la valeur du cookie (stocké par le client) pour vérifier si le second facteur est validé.

      ``` python
      DEVICE_ID_SESSION_KEY = 'otp_device_id'
      ```

   - Définir une constante permettant de désactiver l'authentification à deux facteurs au besoin

      ``` python
      from distutils.util import strtobool

      IS_2FA_ENABLED = bool(strtobool(os.getenv('IS_2FA_ENABLED', 'True')))
      ```

   - Définir les configurations de l'OTP (*One Time Password*) qui sera utilisé comme second facteur d'authentification

      ``` python
      OTP_THROTTLE_FACTOR = 1  # 1 sec (adding delay for each failed attempt — 1, 2, 4, 8...)
      OTP_VALIDITY = 60 * 10  # 10 min
      OTP_NUM_DIGITS = 4
      ```

## Authentification

1. Définir la liste des challenges acceptés

    <details>
      <summary><ins>core/choices/user_device.py</ins></summary>

      <pre lang="python">
      from django.utils.translation import gettext_lazy as _


      class ChallengeTypeChoicesMixin:
          CHALLENGE_EMAIL = 'email'

          CHALLENGE_CHOICES = (
              (CHALLENGE_EMAIL, _('email')),
          )
      </pre>
    </details>

2. Créer le modèle core.UserDevice pour stocker la liste des appareils qu'un utilisateur a ou est en train d'autoriser  
   (ici associé au modèle core.User, utilisé comme modèle pour l'authentification).  
   Est également stocké dans le modèle, séparé dans une mixin pour plus de lisibilité, la logique de génération et de validation d'un OTP.

    <details>
      <summary><ins>core/models/__init__.py</ins></summary>

      <pre lang="python">
      # flake8: noqa
      ...
      from .user_device import UserDevice
      </pre>
    </details>

    <details>
      <summary><ins>core/models/user_device.py</ins></summary>

      <pre lang="python">
      from django.db import models

      from .mixins.user_device.challenge import (  # noqa
          UserDeviceChallengeMixin,
          BadToken,
          TokenExpired,
          VerifyNotAllowed,
      )


      class UserDevice(
          UserDeviceChallengeMixin,
      ):
          """
          List of devices that the user has confirmed
          or is trying to confirm
          """
          created_at = models.DateTimeField(auto_now_add=True)
          updated_at = models.DateTimeField(auto_now=True)

          user = models.ForeignKey(
              'user',
              on_delete=models.CASCADE,
              related_name='devices',
          )
          name = models.CharField(
              max_length=64,
              help_text='This is a token generated on the fly.',
          )
          is_confirmed = models.BooleanField(
              default=True,
              help_text='Is this device ready for use?',
          )
      </pre>
    </details>

    <details>
      <summary><ins>core/mixins/user_device/challenge.py</ins></summary>

      <pre lang="python">
      from datetime import timedelta

      from django.db import models
      from django.conf import settings
      from django.utils import timezone
      from django.utils.translation import gettext as _
      from django.utils.translation import ngettext
      from django.utils import formats

      from core.utils.functions.random import random_number_token
      from core.choices.user_device import ChallengeTypeChoicesMixin
      from rest_framework.exceptions import ValidationError


      class BadToken(ValidationError):
          """
          Token does not match.
          """
          default_detail = _('Invalid OTP.')
          default_code = 'invalid'


      class TokenExpired(BadToken):
          """
          Token timestamp is older than required max_age.
          """
          default_detail = _('Expired OTP.')
          default_code = 'expired'


      class VerifyNotAllowed(BadToken):
          """
          Rejected due to required delay after failed attempt(s).
          """
          default_detail = _('Too many failed attempts.')
          default_code = 'not_allowed'


      class UserDeviceChallengeMixin(
          ChallengeTypeChoicesMixin,
          models.Model,
      ):
          challenge_otp = models.CharField(
              max_length=16,
              blank=True,
              null=True,
          )
          challenge_type = models.CharField(
              max_length=8,
              blank=True,
              null=True,
              choices=ChallengeTypeChoicesMixin.CHALLENGE_CHOICES,
          )
          challenge_valid_until = models.DateTimeField(
              null=True,
              blank=True,
              default=None,
              help_text='The timestamp of the moment of expiry of the saved otp.',
          )
          challenge_failure_timestamp = models.DateTimeField(
              null=True,
              blank=True,
              default=None,
              help_text='A timestamp of the last failed verification attempt. Null if last attempt succeeded.',
          )
          challenge_failure_count = models.PositiveIntegerField(
              default=0,
              help_text='Number of successive failed attempts.',
          )

          class Meta:
              abstract = True

          @property
          def throttle_factor(self):
              return settings.OTP_THROTTLE_FACTOR

          @property
          def challenge_otp_length(self):
              return settings.OTP_NUM_DIGITS or 6

          @property
          def challenge_otp_validity(self):
              return settings.OTP_VALIDITY or 600

          def generate_otp(self, challenge_type=None):
              """
              Generates a token of the specified length, then sets it on the model
              and sets the expiration of the token on the model.

              :param integer length      — Number of decimal digits in the generated token.
              :param integer valid_secs  — Amount of seconds the token should be valid.
              """
              self.challenge_type = challenge_type
              self.challenge_otp = random_number_token(self.challenge_otp_length)
              self.challenge_valid_until = timezone.now() + timedelta(seconds=self.challenge_otp_validity)

          def verify_otp(self, value):
              """
              Verifies an otp by content and expiry.
              On success, the otp is cleared

              :param string token — The OTP token provided by the user.
              :throw BadToken
              """
              self.verify_is_allowed()

              if self.challenge_otp is None:
                  raise BadToken()

              if self.challenge_otp != value:
                  self.throttle_increment()

                  raise BadToken()

              now = timezone.now()
              if now > self.challenge_valid_until:
                  self.throttle_increment()

                  raise TokenExpired()

              self.throttle_reset()
              self.challenge_otp = None
              self.challenge_valid_until = now  # set it as no longer valid

          def throttle_increment(self):
              """
              Call this method to increase throttling (normally when a verify attempt failed).
              """
              self.challenge_failure_timestamp = timezone.now()
              self.challenge_failure_count += 1

          def throttle_reset(self):
              """
              Call this method to reset throttling (normally when a verify attempt succeeded).
              """
              self.challenge_failure_timestamp = None
              self.challenge_failure_count = 0

          def verify_is_allowed(self):
              """
              :throw VerifyNotAllowed
              """
              if not (factor := self.throttle_factor):
                  return

              if not self.challenge_failure_count or self.challenge_failure_timestamp is None:
                  return

              now = timezone.now()
              delay = (now - self.challenge_failure_timestamp).total_seconds()

              # Required delays should be 1, 2, 4, 8 ...
              delay_required = factor * (2 ** (self.challenge_failure_count - 1))

              max_delay = 3*86400  # safeguard: 3 days max
              if delay_required > max_delay:
                  delay_required = max_delay

              if delay >= delay_required:
                  return

              # Feedback
              failure_msg = ngettext(
                  'You have failed {failure_count} time',
                  'You have failed {failure_count} times',
                  self.challenge_failure_count,
              ).format(
                  failure_count=self.challenge_failure_count
              )

              locked_until = formats.date_format(
                  timezone.localtime(
                      self.challenge_failure_timestamp + timedelta(seconds=delay_required+60)
                  ),
                  'TIME_FORMAT' if delay_required < 86400 else 'SHORT_DATETIME_FORMAT',
              )
              detail = _('{failure_msg}, please wait until {locked_until} before retrying').format(
                  failure_msg=failure_msg,
                  locked_until=locked_until,
              )
              raise VerifyNotAllowed(detail)
      </pre>
    </details>

3. Créer les sérialiseurs validant les paramètres en entrée

    <details>
      <summary><ins>api/serializers/user_auth.py</ins></summary>

      <pre lang="python">
      from django.core.validators import validate_email

      from rest_framework_json_api import serializers, relations

      from core.models.user import User
      from core.models.user_device import UserDevice
      from .medical_center import MedicalCenterSerializer
      from .mcm_center import MCMCenterSerializer


      class UserAuthSerializer(serializers.Serializer):
          """Serializer checking data to authenticate an user."""

          email = serializers.CharField(required=True, max_length=254, validators=[validate_email])
          password = serializers.CharField(required=True)

          class JSONAPIMeta:
              resource_name = 'user-login'


      class UserSerializer(serializers.ModelSerializer):
          """Serializer sending back infos about the current authenticated user."""

          class JSONAPIMeta:
              resource_name = 'user'

          class Meta:
              model = User
              fields = '__all__'


      class DeviceSerializer(serializers.ModelSerializer):

          # Force response to be of type "user-device", not "user-login"
          _poly_force_type_resolution = True

          class JSONAPIMeta:
              resource_name = 'user-device'

          class Meta:
              model = UserDevice
              fields = (
                  'is_confirmed',
                  'challenge_valid_until',
                  'challenge_failure_timestamp',
                  'challenge_failure_count',
              )


      class ChallengeOptionsSerializer(serializers.Serializer):
          """
          Serializer checking data to resend an OTP
          """
          challenge_type = serializers.ChoiceField(
              required=False,
              allow_null=True,
              choices=UserDevice.CHALLENGE_CHOICES,
          )

          class JSONAPIMeta:
              resource_name = 'user-otp-options'


      class ChallengeSerializer(serializers.Serializer):
          """
          Serializer checking data to validate an OTP
          """
          challenge_otp = serializers.CharField(
              required=True,
              allow_null=False,
              allow_blank=False,
          )

          class JSONAPIMeta:
              resource_name = 'user-otp'
      </pre>
    </details>

4. Ajouter des utilitaires pour récupérer/créer les UserDevice 

    <details>
      <summary><ins>core/utils/hmac/password.py</ins></summary>

      <pre lang="python">
      from django.conf import settings
      from django.contrib.auth.tokens import PasswordResetTokenGenerator
      from django.core.signing import BadSignature, SignatureExpired
      from django.utils.crypto import constant_time_compare
      from django.utils.http import base36_to_int


      class PasswordTokenGenerator(PasswordResetTokenGenerator):
          """
          Mix between PasswordResetTokenGenerator and TimestampSigner
          for better error handling
          """
          key_salt = 'core.PasswordTokenGenerator'
          _timeout = None

          def __init__(self, timeout=None):
              super().__init__()

              self._timeout = timeout

          def _get_timeout(self):
              return self._timeout or settings.PASSWORD_RESET_TIMEOUT

          def _set_timeout(self, timeout):
              self._timeout = timeout

          def check_token(self, user, token):
              """
              Check that a reset token is correct for a given user.
              """
              if not (user and token):
                  raise BadSignature()
              # Parse the token
              try:
                  ts_b36, _ = token.split('-')
              except ValueError:
                  raise BadSignature()

              try:
                  ts = base36_to_int(ts_b36)
              except ValueError:
                  raise BadSignature()

              # Check that the timestamp/uid has not been tampered with
              if not constant_time_compare(self._make_token_with_timestamp(user, ts), token):
                  raise BadSignature()

              # Check the timestamp is within limit.
              timeout = self._get_timeout()

              if timeout and (self._num_seconds(self._now()) - ts) > timeout:
                  raise SignatureExpired()

              return True
      </pre>
    </details>
    <details>
      <summary><ins>core/utils/hmac/device.py</ins></summary>

      <pre lang="python">
      from django.conf import settings

      from .password import PasswordTokenGenerator
      from core.models.user_device import UserDevice


      class DeviceIdTokenGenerator(PasswordTokenGenerator):
          """
          A same deviceid cookie may be used to log in to several user accounts
          We're not targeting a specific user here, just the device
          And checking that the user didn't tamper his deviceid cookie

          Note: We then check if this deviceid has been confirmed for the current user
          (saved in db in user.devices)
          """
          key_salt = 'core.DeviceIdTokenGenerator'

          def _get_timeout(self):
              return self._timeout or settings.DEVICE_ID_COOKIE_AGE

          def _make_hash_value(self, user, timestamp):
              return f'{timestamp}'


      user_deviceid_token_generator = DeviceIdTokenGenerator()


      def get_device_id(request, user):
          """
          :return string|None token
          """

          # Cookie exists?
          try:
              token = request.COOKIES[settings.DEVICE_ID_COOKIE_NAME]
          except KeyError:
              return None

          # Hasn't been tampered?
          try:
              if user_deviceid_token_generator.check_token(user, token):
                  return token
          except Exception:
              del request.COOKIES[settings.DEVICE_ID_COOKIE_NAME]

          return None


      def get_device(request, user):
          """
          :return Device device
          """

          # Get device cookie
          token = get_device_id(request, user)

          if token:
              match = UserDevice.objects.filter(
                  user_id=user.pk,
                  name=token,
              )[:1]
              if len(match):
                  return match[0]
          else:
              token = user_deviceid_token_generator.make_token(user)
              request.COOKIES[settings.DEVICE_ID_COOKIE_NAME] = token

              # rest_framework.Request is proxying WSGIRequest
              setattr(request._request, 'deviceid_cookie_needs_reset', True)

          device = UserDevice.objects.create(
              user_id=user.pk,
              name=token,
              is_confirmed=False,
          )
          return device
      </pre>
    </details>

5. Ajouter la logique de second-facteur à l'authentification.

    <details>
      <summary><ins>api/views/user_auth.py</ins></summary>

      <pre lang="python">
      from celery import shared_task
      from celery.utils.log import get_task_logger

      from django.conf import settings
      from django.contrib import auth
      from django.middleware.csrf import get_token
      from django.utils.translation import gettext as _
      from django.http import Http404

      from rest_framework.response import Response
      from rest_framework.permissions import AllowAny
      from rest_framework import serializers, status
      from drf_yasg.utils import swagger_auto_schema, no_body

      from api.serializers.user_auth import (
          UserSerializer,
          UserAuthSerializer,
          DeviceSerializer,
          ChallengeSerializer,
          ChallengeOptionsSerializer,
      )
      from core.decorators import action, csrf_protect_m
      from core.utils.hmac.device import get_device
      from core.utils.views import (
          serializer_validation_error,
          GenericViewSet,
      )
      from core.exceptions import NotAuthenticatedWith2F
      from core.models.user_device import UserDevice, VerifyNotAllowed, BadToken
      from core.permissions import IsAuthenticated, IsAuthenticatedWith2F

      task_logger = get_task_logger('core')


      class UserAuthViewSet(UserAuthMixin, GenericViewSet):
          """
          View for the authentication process
          """
          serializer_class = UserAuthSerializer

          def get_response_serializer(self, *args, **kwargs):
              return UserSerializer(*args, **kwargs)

          def get_serializer_class(self):
              if self.action == 'validate_otp':
                  return ChallengeSerializer

              if self.action == 'resend_otp':
                  return ChallengeOptionsSerializer

              return self.serializer_class

          # ---------------------------------------------------------
          # Authentication
          # ---------------------------------------------------------

          @swagger_auto_schema(responses={
              204: 'authenticated',
              401: 'not authenticated',
          })
          @action(methods=['GET'], url_path='is-authenticated', permission_classes=(AllowAny,))
          def is_authenticated(self, request, **kwargs):
              """
              Check if the user is logged in
              """

              # Add CSRF token if not already there
              get_token(request)

              self.check_additional_permissions((IsAuthenticatedWith2F(),))

              return Response(status=status.HTTP_204_NO_CONTENT)

          @swagger_auto_schema(responses={
              200: UserSerializer,
          })
          @action(methods=['GET'], url_path='user')
          def user(self, request, **kwargs):
              """
              Retrieve the current user data
              """
              return Response(UserSerializer(instance=request.user).data)

          @swagger_auto_schema(request_body=no_body, responses={
              204: 'ack',
          })
          @action(methods=['POST'], url_path='logout', permission_classes=(AllowAny,))
          def logout(self, request, **kwargs):
              """
              Logout
              """
              auth.logout(request)

              return Response(status=status.HTTP_204_NO_CONTENT)

          @swagger_auto_schema(responses={
              201: UserSerializer,
              401: 'OTP required to validate authentication',
          })
          @csrf_protect_m
          @action(methods=['POST'], url_path='login', permission_classes=(AllowAny,))
          def login(self, request, **kwargs):
              """
              Log in
              """

              # Data is valid?
              serializer = self.get_serializer(data=request.data)
              serializer.is_valid(raise_exception=True)

              # User exists?
              # Note: selects the appropriate AUTHENTICATION_BACKENDS and calls its authenticate()
              user = auth.authenticate(
                  request,
                  email=serializer.validated_data.get('email'),
                  password=serializer.validated_data.get('password'),
              )
              if user is None:
                  raise serializers.ValidationError(_('Your email or password is invalid.'))

              if user.is_waiting_validation:
                  raise serializer_validation_error(
                      {
                          'email': _('The admin hasn’t validated your account yet.'),
                      },
                      code='is_waiting_validation'
                  )

              # Set session
              request.user = user
              auth.login(request, user)

              # Require 2nd factor authentication?
              response = self._send_2nd_factor_otp(request, user)

              # Return user data
              return response or Response(UserSerializer(instance=user).data)

          # ---------------------------------------------------------
          # Authentication - 2nd factor
          # ---------------------------------------------------------

          def _send_2nd_factor_otp(self, request, user, challenge_type=None):
              """
              Generate and send an OTP
              if the current device isn't already confirmed
              """
              if not settings.IS_2FA_ENABLED:
                  return

              # Running tests?
              if getattr(request, '_dont_enforce_csrf_checks', False):
                  request.session[settings.DEVICE_ID_SESSION_KEY] = 'BYPASS'
                  request.COOKIES[settings.DEVICE_ID_COOKIE_NAME] = 'BYPASS'
                  setattr(request._request, 'deviceid_cookie_needs_reset', True)
                  return

              # The current device is confirmed for the current user?
              device = get_device(request, user)
              if device.is_confirmed:
                  request.session[settings.DEVICE_ID_SESSION_KEY] = device.name

                  # Set updated_at (we cleanup unused devices)
                  device.save()
                  return

              # Detect challenge type
              if challenge_type is None:
                  challenge_type = UserDevice.CHALLENGE_EMAIL

              detail = None
              try:
                  # Too many attempts to validate otp?
                  device.verify_is_allowed()

                  # Generate an OTP
                  device.generate_otp(challenge_type=challenge_type)
                  device.save()

                  ctx = {
                      'user_fullname': user.fullname,
                      'user_is_staff': user.is_staff,
                      'otp': device.challenge_otp,
                  }

                  # Send the OTP
                  if challenge_type == 'email':
                      send_otp_email.delay(user.id, user.email, ctx)

                  # Message
                  detail = _('A 4-digit authentication code has just been sent to you by {challenge_type}.').format(
                      challenge_type=device.get_challenge_type_display(),
                  )

              except VerifyNotAllowed as e:
                  detail = str(e)

              raise NotAuthenticatedWith2F(detail=detail)

          @swagger_auto_schema(responses={
              201: UserSerializer,
              401: 'OTP required to validate authentication',
          })
          @action(methods=['POST'], url_path='resend-otp', permission_classes=((IsAuthenticated,)))
          def resend_otp(self, request, **kwargs):
              """
              Send a new OTP
              """
              user = request.user

              # Is already authenticated with 2 factors: reject
              if IsAuthenticatedWith2F().has_permission(request, self):
                  return self.permission_denied(self.request)

              # Check GET parameter
              serializer = ChallengeOptionsSerializer(data=request.data)
              serializer.is_valid(raise_exception=True)
              challenge_type = serializer.validated_data.get('challenge_type', None)

              # Require 2nd factor authentication?
              response = self._send_2nd_factor_otp(request, user, challenge_type)

              # Return user data
              return response or Response(self.get_response_serializer(instance=user).data)

          @swagger_auto_schema(responses={
              201: UserSerializer,
              401: 'OTP required to validate authentication',
          })
          @action(methods=['POST'], url_path='validate-otp', permission_classes=((IsAuthenticated,)))
          def validate_otp(self, request, **kwargs):
              """
              Validate the 2nd factor challenge
              Checks if the given OTP matches the one we sent earlier
              """
              user = request.user

              # Is already authenticated with 2 factors: stop there
              if IsAuthenticatedWith2F().has_permission(request, self):
                  return Response(self.get_response_serializer(instance=user).data)

              # Check POST parameter
              serializer = ChallengeSerializer(data=request.data)
              serializer.is_valid(raise_exception=True)
              value = serializer.validated_data.get('challenge_otp')

              # The current device is confirmed for the current user?
              device = get_device(request, user)

              if device.is_confirmed:
                  request.session[settings.DEVICE_ID_SESSION_KEY] = device.name
                  device.save()
                  return

              # OTP is valid?
              try:
                  device.verify_otp(value)

              except BadToken as exc:
                  device.save()
                  raise exc

              device.is_confirmed = True
              device.save()

              request.session[settings.DEVICE_ID_SESSION_KEY] = device.name
              return Response(self.get_response_serializer(instance=user).data)

          @swagger_auto_schema(responses={
              200: DeviceSerializer,
              404: 'Current device is not recognized',
          })
          @action(methods=['GET'], url_path='device', permission_classes=((IsAuthenticated,)))
          def device(self, request, **kwargs):
              """
              Retrieve the current device data — moreso intended for debugging
              Might throw Http404 or DoesNotExist
              """
              try:
                  token = request.COOKIES[settings.DEVICE_ID_COOKIE_NAME]
              except KeyError:
                  raise Http404

              device = request.user.devices.get(name=token)
              return Response(DeviceSerializer(instance=device).data)


      @shared_task
      def send_otp_email(user_id, recipient, ctx):
          task_logger.info('[+] send_otp_email to user %s %s', user_id, recipient)

          from django.core.mail.message import EmailMultiAlternatives
          from core.utils.templates import get_content

          if ctx.get('user_is_staff', False):
              link = f'{settings.SITE_FRONT_URL}/admin'
          else:
              link = settings.SITE_FRONT_URL

          link += '/lost-password'
          site_name = settings.SITE_NAME
          subject = _('Authentication on {site_name}').format(site_name=site_name)

          context = {
              'site_name': site_name,
              'reset_password_link': link,
              'subject': subject,
              **ctx,
          }
          email = EmailMultiAlternatives()
          email.subject = subject
          email.body = get_content('core/emails/user/otp_email.txt', context).strip('\n')
          email.attach_alternative(get_content('core/emails/user/otp_email.html', context), 'text/html')
          email.from_email = settings.EMAIL_SENDER
          email.to = [recipient]
          email.send()

          task_logger.info('\t... done')
      </pre>
    </details>
    <details>
      <summary><ins>core/templates/core/emails/user/otp_email.html</ins></summary>

      <pre lang="html">
      {% extends "core/emails/base.html" %}
      {% load i18n %}

      {% block content %}
          <h3>{{ subject }}</h3>

          <p>Bonjour <b>{{ user_fullname }}</b>,</p>
          <p>
              Un tentative d'authentification sur {{ site_name }}
              nécessite une vérification supplémentaire car nous n'avons pas reconnu votre appareil.<br>
              Pour valider la connexion, entrez ce code: <b>{{ otp }}</b>
          </p>
          <p>
              Si vous n'avez pas tenté de vous connecter à votre compte, il se peut que votre mot de passe soit compromis.
              Visitez <a href="{{ reset_password_link }}">{{ reset_password_link }}</a> pour définir un nouveau mot de passe.
          </p>

          <p>
              Merci,<br>
              L'équipe {{ site_name }}
          </p>
      {% endblock %}
      </pre>
    </details>
{% endraw %}