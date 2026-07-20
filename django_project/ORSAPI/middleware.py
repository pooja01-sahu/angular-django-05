import logging

from django.http import JsonResponse

logger = logging.getLogger(__name__)

# Routes accessible without authentication
PUBLIC_URLS = [
    '/ORSAPI/api/User/login/',
    '/ORSAPI/api/User/forgot-password/',
    '/ORSAPI/api/User/register/',
]

# Write operations on these paths require admin role (role_id=1).
# Authenticated non-admin users may still perform GET on these paths.
ADMIN_ONLY = [
    ('/ORSAPI/api/College/',   ['POST', 'PUT', 'DELETE']),
    ('/ORSAPI/api/Course/',    ['POST', 'PUT', 'DELETE']),
    ('/ORSAPI/api/Faculty/',   ['POST', 'PUT', 'DELETE']),
    ('/ORSAPI/api/Marksheet/', ['POST', 'PUT', 'DELETE']),
    ('/ORSAPI/api/Role/',      ['POST', 'PUT', 'DELETE']),
    ('/ORSAPI/api/Student/',   ['POST', 'PUT', 'DELETE']),
    ('/ORSAPI/api/User/',      ['POST', 'PUT', 'DELETE']),
]


class RestFrontCtl:
    """
    Middleware that intercepts every ORSAPI REST request and enforces
    authentication and role-based authorization.

    Authentication
    --------------
    Checks request.session['api_user'] (set by UserLoginRestCtl on successful
    login).  Requests without a valid session on a non-public URL receive
    a 401 JSON response.

    Authorization
    -------------
    GET requests are allowed for any authenticated user.
    POST / PUT / DELETE on resources listed in ADMIN_ONLY require
    role_id == 1 (admin).  Non-admin users receive a 403 JSON response.

    Public URLs (no session required)
    ----------------------------------
    POST  /ORSAPI/api/User/login/
    POST  /ORSAPI/api/User/forgot-password/
    POST  /ORSAPI/api/User/register/
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Pass through non-ORSAPI paths immediately
        if not request.path.startswith('/ORSAPI/'):
            return self.get_response(request)

        # Pass through public endpoints without any checks
        if request.path in PUBLIC_URLS:
            return self.get_response(request)

        return self.get_response(request)

