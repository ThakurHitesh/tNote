from django.urls import path, include
from .user_urls import urlpatterns as user_urls
from .todo_urls import urlpatterns as todo_urls

urlpatterns = [
    path('user/', include(user_urls)),
    path('todo/', include(todo_urls)),
]