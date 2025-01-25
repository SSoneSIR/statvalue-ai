from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  # Root path for the 'api' app
]
