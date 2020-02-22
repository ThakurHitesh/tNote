from django.conf import settings
from django.utils import timezone
import pytz

def now():
    return timezone.make_aware(timezone.datetime.now(), pytz.timezone(settings.TIME_ZONE))