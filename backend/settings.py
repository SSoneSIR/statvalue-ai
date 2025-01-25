from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent

INSTALLED_APPS = [
    
    'corsheaders',                   #brower wont allow frontend to communnicate with backend,so corsheaders is needed.
    'rest_framework',
    'authentication',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',  # Required for admin
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',  # Required for admin
    'django.contrib.messages.middleware.MessageMiddleware',  # Required for admin
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # ... other middleware
]
ALLOWED_HOSTS = ['localhost', '127.0.0.1']
ROOT_URLCONF = 'backend.urls'

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Your React frontend URL
]

# If you want to allow credentials (cookies, authorization headers, etc.)
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True


SECRET_KEY = '2&h4_)hk*pc9uk024d8qpn-@=7$hzc20d4kzfa4ibe$=bej%nm'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],  # Add any custom template directories here
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
DATABASES={
    'default':{
        'ENGINE': 'djongo',
        'NAME': 'fyp_db',
    }
}
AUTH_USER_MODEL = 'authentication.User'
