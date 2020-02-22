from django.urls import path, include
from api.views import TodoAPIView

urlpatterns = [
    path('user-todo/',TodoAPIView.as_view(), name='user-todo'),
    path('user-todo/<slug:pk>/',TodoAPIView.as_view(), name='user-todo'),
]

