from rest_framework.response import Response
from rest_framework.views import APIView

class ApiOverview(APIView):
    def get(self, request):
        api_urls = {
            'API Overview': '/',
            'User Registration': 'user/register/',
            'User Login': 'user/login/',
            'User Profile': 'user/profile/',
            'Change Password': 'user/change-password/',
            'Send Password Reset Email': 'user/reset-password-email/',
            'Reset Password': 'user/reset-password/<uid>/<token>/',
            'Logout': 'user/logout/',
            'List Articles': '/articles/',
            'Create Article': '/articles/create/',
            'Article Details': '/articles/<int:id>/',
            'Update Article': '/articles/<int:id>/update/',
            'Delete Article': '/articles/<int:id>/delete/',
        }
        return Response(api_urls)
