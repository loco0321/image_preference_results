from django.conf import settings
from pyrebase import pyrebase


def get_firebase():
    return pyrebase.initialize_app(settings.FIREBASE_CONFIG)
