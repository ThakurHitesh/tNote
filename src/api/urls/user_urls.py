from django.urls import path, include
from api.views import UserSignUpAPIView, UserLoginAPIView, UserProfileAPIView

urlpatterns = [
    path('signup/',UserSignUpAPIView.as_view(), name='user-signup'),
    path('login/',UserLoginAPIView.as_view(), name='user-login'),
    path('profile/', UserProfileAPIView.as_view(), name="user-profile"),
]