# Custom middleware for API
from django.middleware.csrf import get_token


class EnsureCsrfCookieMiddleware:
    """Ensure CSRF cookie is always set for API requests."""
    
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Force CSRF cookie to be set
        get_token(request)
        response = self.get_response(request)
        return response
