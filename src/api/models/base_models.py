from django.db import models
from .services import now
import uuid

from api.constants import CONST_NAME_LENGTH, CONST_DESC_LENGTH

class TimeStamp(models.Model):
    created_at = models.DateTimeField(default=now, db_index=True)
    deleted_at = models.DateTimeField(default=None, null=True, db_index=True)
    modified_at = models.DateTimeField(auto_now=True, db_index=True)
    is_deleted = models.BooleanField(default=False)
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)

    class Meta:
        abstract = True
        index_together = (('id', 'is_deleted', 'modified_at'),)
    
    def __str__(self):
        return self.id


class BaseName(TimeStamp):
    name = models.CharField(max_length=CONST_NAME_LENGTH)
    description = models.TextField(max_length=CONST_DESC_LENGTH, null=True, blank=True)

    class Meta:
        abstract = True


class BaseUniqueName(TimeStamp):
    name = models.CharField(max_length=CONST_NAME_LENGTH, unique=True)
    description = models.TextField(max_length=CONST_DESC_LENGTH, null=True, blank=True)

    class Meta:
        abstract = True