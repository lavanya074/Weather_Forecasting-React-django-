from django.urls import path
from . import views

urlpatterns = [
    path('', views.weather_view, name='weather_view'),
    path('api/weather/', views.weather_api, name='weather_api'),  # React JSON endpoint
]
