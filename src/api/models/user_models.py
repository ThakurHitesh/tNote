from django.contrib.auth.models import AbstractUser
from .base_models import *
from api.constants import CONST_FIRST_NAME_LENGTH, CONST_LAST_NAME_LENGTH
from rest_framework_jwt.settings import api_settings

class User(AbstractUser, TimeStamp):
    """
    model to store user data
    """
    first_name = models.CharField(max_length=CONST_FIRST_NAME_LENGTH)
    last_name = models.CharField(max_length=CONST_LAST_NAME_LENGTH)
    email = models.EmailField(null=True, default=None, max_length=254, verbose_name='email address')

    def get_auth_token(self):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(self)
        payload["password"] = self.password
        token = jwt_encode_handler(payload)
        return "JWT "+token