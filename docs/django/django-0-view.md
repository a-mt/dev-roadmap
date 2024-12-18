---
title: View
category: Python, Django
---

* Une vue est une fonction qui prend en entrée une requête web et retourne une réponse web. Autrement dit, c'est dans les vues que se trouvent la logique "controlleur" de l'application.

## Réponse

### HttpResponse

* `HttpResponse` permet de retourner une simple réponse texte

    ``` python
    from django.http import HttpResponse

    def index(request):
        return HttpResponse('<h1>Hello World</h1>')
    ```

### render

* `render` permet de retourner une réponse texte calculée à partir d'un template

    ``` python
    from django.shortcuts import render

    def index(request):
        return render(request, 'index.html')
    ```

    ``` python
        return render(request, 'index.html', {
            'var': 'Hello World'
        })
    ```

### HttpResponseRedirect

* `HttpResponseRedirect` permet de rediriger vers une autre URL

    ``` python
    def redirect_to_year(request, year=2005, foo='bar'):
        """
        Redirige /blog/2005/ vers /archive/2005/
        """
        year = 2006
        url = reverse("news-year-archive", args=(year,))

        return HttpResponseRedirect(url)
    ```

    ``` python
    urlpatterns = [
        path("blog/<int:year>/", views.year_archive, {"foo": "bar"}),
    ]
    ```

### FileResponse, StreamingHttpResponse

* `FileResponse` permet de retourner un fichier.  
  Pour retourner un fichier qui n'est pas encore entièrement généré, utiliser `StreamingHttpResponse` à la place

    ``` python
    from django.http import Http404, FileResponse, HttpResponse, StreamingHttpResponse

    class ...
        def download_zip(self, request, *args, **kwargs):
            ...

            # Debug: stream text
            output_format = self.request.GET.get('output', '')
            if output_format == 'text':

                response = StreamingHttpResponse(
                    self.stream_text_generator(path),
                    content_type='text/plaintext',
                )
                response['Content-Disposition'] = 'attachment; filename={}.txt'.format(
                    _('Scanner')
                )
                return response

            # Debug: .zip saved on disk
            elif output_format == 'cached':
                return self.zip_cached(
                    in_path=path,
                    generate=self.request.GET.get('generate', ''),
                )

            # Debug: zip
            elif output_format == 'sync':
                response = HttpResponse(
                    self.zip_generator(path),
                    content_type='application/zip',
                )
                response['Content-Disposition'] = 'attachment; filename={}.zip'.format(
                    _('Scanner')
                )
                return response

            # Stream zip
            else:
                response = StreamingHttpResponse(
                    self.stream_zip_generator(path),
                    content_type='application/zip',
                )
                response['Content-Disposition'] = 'attachment; filename={}.zip'.format(
                    _('Scanner')
                )
                return response

        def stream_text_generator(self, path, n=0):
            """
            Generates a text files on the fly
            (won't hold the entire file in memory but flush it to the client bit by bit)
            """
            iterator = Path(path).rglob('*.dcm')
            try:
                for dcm in iterator:
                    if not dcm.is_file():
                        continue

                    name = dcm.relative_to(path)

                    # Yield chunks
                    yield str(name) + '\n'

            except PermissionError:
                pass

        def zip_cached(self, in_path, generate=False):
            """
            Retrieve the .zip file saved on disk

            :param string in_path   — Directory of scanner
            :param boolean generate — Whether or not we should generate the .zip file when it doesn't exist
            """
            full_path = f'{in_path}.zip'
            exists = os.path.isfile(full_path)

            if not exists:
                if generate:
                    from shutil import make_archive
                    make_archive(in_path, 'zip', in_path)
                else:
                    raise ValidationError(_('.zip does not exist on disk'))

            return FileResponse(open(full_path, 'rb'), as_attachment=True)

        def zip_generator(self, path):
            """
            Generates a zip file in memory then returns it
            """
            import zipfile
            from io import BytesIO

            buffer = BytesIO()
            with zipfile.ZipFile(buffer, 'w', compression=zipfile.ZIP_DEFLATED) as archive:
                iterator = Path(path).rglob('*.dcm')
                try:
                    for dcm in iterator:
                        if not dcm.is_file():
                            continue

                        name = dcm.relative_to(path)
                        archive.write(dcm, name)

                except PermissionError:
                    pass

            return buffer.getvalue()

        def stream_zip_generator(self, path):
        """
        Generates a zip on the fly
        (won't hold the entire file in memory but flush it to the client bit by bit)

        see https://pypi.org/project/zipstream-new/
        """
        import zipstream

        with zipstream.ZipFile(mode='w', compression=zipstream.ZIP_DEFLATED) as zf:
            # zf.writestr('example.xml', b'content')

            # Add all .dcm files present in path
            iterator = Path(path).rglob('*.dcm')
            try:
                for dcm in iterator:
                    if not dcm.is_file():
                        continue

                    name = dcm.relative_to(path)
                    zf.write(dcm, name)

                    # Yield chunks (zipstream-new >= 1.1.8)
                    yield from zf.flush()

            except PermissionError:
                pass

            # Yield chunks + close
            yield from zf
    ```

### Http404

* `Http404` retourne une erreur 404

    ``` python
    from django.http import Http404

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
        ...
    ```

### HttpResponseBadRequest

* `HttpResponseBadRequest` retourne une erreur 400

    ``` python
    from rest_framework.decorators import list_route

    class UserViewSet(ModelViewSet):

        @list_route(methods=['post'])
        def upload_file(self, request):

            form = UploadFileForm(request.POST, request.FILES)
            if form.is_valid():
                ...

            return HttpResponseBadRequest()
    ```

### JsonResponse

* `JsonResponse` permet de retourner une réponse JSON

    ``` python
    try:
        res = api.sign_state(userdoc)
        return JsonResponse({
            "signatures": res["elements"],
            "signataires": userdoc["signataires"],
        })
    except Exception as e:
        return JsonResponse({
            "error": "Impossible de déterminer l'identifiant du document",
        }, status=400)
    ```

### DRF

* Si on utilise Django rest Framework: `Response` pour retourner une réponse texte ou JSON, ou lever une exception rest_framework

    ``` python
    from rest_framework.response import Response
    from rest_framework.exceptions import ValidationError
    from rest_framework import serializers, status
    ```
    ``` python
    return Response(
        UserSerializer(instance=request.user).data
    )
    ```
    ``` python
    return Response(status=status.HTTP_204_NO_CONTENT)
    ```
    ``` python
    return Response('ok')
    ```

    ``` python
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    ```

    ``` python
    raise ValidationError(
        detail=_('This study has already been finalized')
    )
    ```

---

## Requête

[HTTPRequest](https://docs.djangoproject.com/en/4.0/ref/request-response/#django.http.HttpRequest.META)


### method

* `method` retourne le type de méthode utilisé (POST/GET)

    ``` python
    request.method
    ```

### scheme

* `scheme` contient le schéma de la requête (HTTP/HTTPS)

    ``` python
    request.scheme
    ```

* `is_secure()` retourne vrai si la requête est une requêtes HTTPS

    ``` python
    request.is_secure()
    ```

### path_info

* `path_info` contient la partie path de l'URL

    ``` python
    if request.path_info.startswith('/favicon.ico') or request.path_info.startswith(
        settings.STATIC_URL
    ):
        return response
    ```

### POST

* `POST` contient les données POST

    ``` python
    form = ExportForm(request.POST)
    ```

* Sous Django Rest Framework, `data` contient les données POST et FILES parsées

    ``` python
    # Check parameters
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    ```

### GET

* `GET` contient les données GET

    ``` python
    identifier = request.GET.get('created_before_id', None)
    ```

    ``` python
    if request.GET.get("next"):
        return HttpResponseRedirect(request.GET.get("next"))
    ```

* Sous Django Rest Framework, `query_params` contient les données GET parsées

    ``` python
    # Search medical centers
    search = request.query_params.get('search', '').strip().lower()
    ```

### user

* `user` permet d'accéder aux données de l'utilisateur en cours.  
  Notons qu'il s'agit d'un LazyObject: on effectue une requête en BDD uniquement lorsqu'on essaie d'accéder à une des propriétés de l'objet

    ``` python
    is_admin = request.user and getattr(request.user, 'is_staff', False)
    ```

### COOKIES

* `COOKIES` permet d'accéder aux cookies

    ``` python
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
    ```

  Pour modifier les cookies, il est nécessaire d'ajouter une instruction dans la réponse,
  ce qu'on fait généralement via un middleware

    ``` python
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
    ```

### session

* `session` permet d'accéder aux données en session et de les modifier

    ``` python
    if user.is_authenticated:
        session_device_id = request.session.get(settings.DEVICE_ID_SESSION_KEY)
        cookie_device_id = request.COOKIES.get(settings.DEVICE_ID_COOKIE_NAME, None)
    ```

    ``` python
    # Running tests?
    if getattr(request, '_dont_enforce_csrf_checks', False):
        request.session[settings.DEVICE_ID_SESSION_KEY] = 'BYPASS'
        request.COOKIES[settings.DEVICE_ID_COOKIE_NAME] = 'BYPASS'

        setattr(request._request, 'deviceid_cookie_needs_reset', True)
        return
    ```

### headers

* `headers` est un objet insensible à la casse, permettant d'accéder aux entêtes HTTP commençant par X,
    ainsi que Content-Length et Content-Type.

    ``` python
    check_signature(
        request.headers.get('X-Signature', None),
        settings.AUTH_TOKEN,
        settings.SIGNATURE_TIMEOUT,
    )
    ```
    ``` python
    request.headers.get('X-CSRFToken')
    ```

### META

* `META` contient toutes les entêtes HTTP

    ``` python
    from ipaddress import ip_address, ip_network

    if settings.IP_WHITELIST:
        remote_addr = ip_address(
            request.headers['X-Forwarded-For'] if 'HTTP_X_FORWARDED_FOR' in request.META else
            request.META['REMOTE_ADDR']
        )
        for subnet in settings.IP_WHITELIST:
            if remote_addr in ip_network(subnet, False):
                return True
    ```
    ``` python
    # When testing with swagger locally: allow 192.168.x.x
    if ipaddress.ip_address(request.META.get('REMOTE_ADDR')).is_private:
        return self.authenticate_credentials(settings.AUTH_TOKEN)
    ```
    ``` python
    # Prevent HttpResponseNotModified
    request.META.pop('HTTP_IF_MODIFIED_SINCE', None)
    ```

---

## Décorateurs

* On peut utiliser des décorateurs pour restreindre l'accès aux vues en fonction de la requête.  
  Si les conditions ne sont pas remplies, une erreur `django.http.HttpResponseNotAllowed` est levée.

    ``` python
    from django.views.decorators.http import require_http_methods

    @require_http_methods(["GET", "POST"])
    def my_view(request):
        # I can assume now that only GET or POST requests make it this far
        pass
    ```
    ``` python
    from django.views.decorators.http import require_POST

    @require_POST
    def my_view(request, *args, **kwargs):
        pass
    ```

    ``` python
    from django.contrib.auth.decorators import login_required
    from django_otp.decorators import otp_required

    @login_required
    @otp_required(if_configured=not (settings.ENFORCE_TFA))
    def my_view(request):
        pass
    ```

* Ou on peut utiliser des décorateurs personnalisés

    ``` python
    from core.decorators.auth import admin_required

    @login_required
    @admin_required
    def admin_export(request):
        ...
    ```

    ``` python
    from functools import wraps
    from django.core.exceptions import PermissionDenied

    def admin_required(view_func):
        """
        Ensure that the logged-in user is an admin.
        """
        @wraps(view_func)
        def _view(request, *args, **kwargs):
            # Checks if the user is an admin
            # this decorator ignores the anonymous users
            user = request.user
            if not user or (user.is_staff and user.is_superuser):
                return view_func(request, *args, **kwargs)
            raise PermissionDenied

        return _view
    ```
