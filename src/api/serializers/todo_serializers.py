from rest_framework.serializers import ModelSerializer
from api.models import Todo

class TodoSerializer(ModelSerializer):
    """
    serialzer for todo model
    """
    class Meta:
        model = Todo
        fields = ['id', 'user', 'notes', 'status', 'created_at', 'modified_at']
    
    def create(self, validated_data):
        todo = Todo(**validated_data)
        todo.save()
        return todo
    
    def update(self, instance, validated_data):
        if validated_data.get("status"):
            instance.status = validated_data["status"]
        if validated_data.get("notes"):
            instance.notes = validated_data["notes"]
        instance.save()
        print(instance.__dict__)
        return instance