from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('', TemplateView.as_view(template_name="page.tsx")),  # Serve React
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api/auth/', include('authentication.urls')),
]