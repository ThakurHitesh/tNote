from .base_models import TimeStamp
from api.constants import CONST_DESC_LENGTH, CONST_CHOICES_TODO_STATUS, CONST_CHOICES_TODO_STATUS_PENDING, CONST_CHOICES_TODO_STATUS_LENGTH
from django.db import models

class Todo(TimeStamp):
    """
    model to store todo
    """
    notes = models.TextField(max_length=CONST_DESC_LENGTH, unique=True)
    user = models.ForeignKey("User", on_delete = models.CASCADE)
    status = models.CharField(choices=CONST_CHOICES_TODO_STATUS, default=CONST_CHOICES_TODO_STATUS_PENDING,
                max_length=CONST_CHOICES_TODO_STATUS_LENGTH)

    def __str__(self):
        return self.notes
    