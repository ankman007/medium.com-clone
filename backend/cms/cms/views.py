from rest_framework.response import Response
from rest_framework.views import APIView

class ApiOverview(APIView):
    def get(self, request):
        api_urls = {
            'API Overview': '/',
            'User Registration': 'api/user/register/',
            'User Login': 'api/user/login/',
            'User Profile': 'api/user/profile/',
            'Change Password': 'api/user/change-password/',
            'Send Password Reset Email': 'api/user/reset-password-email/',
            'Reset Password': 'api/user/reset-password/<uid>/<token>/',
            'Logout': 'api/user/logout/',
            'List Articles': '/articles/',
            'Create Article': '/articles/create/',
            'Article Details': '/articles/<int:id>/',
            'Update Article': '/articles/<int:id>/update/',
            'Delete Article': '/articles/<int:id>/delete/',
        }
        return Response(api_urls)
