from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from api.serializers import TodoSerializer
from api.models import Todo
from rest_framework import permissions, status
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from.services import response, error_in_valid_serializer_response, error_response, get_request_data

class TodoAPIView(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes =(permissions.IsAuthenticated,)
    serializer_class = TodoSerializer
    
    model = Todo

    def get_context(self, request):
        return {
            "user" : request.user.id if not request.user.is_anonymous else None
            }

    def get_queryset(self, pk, context):
        queryset = self.model.objects.filter(user_id=context["user"]) 
        if pk:
            queryset = queryset.filter(id=pk)
        return queryset

    def get(self, request, pk=None):
        context = self.get_context(request)
        queryset = self.get_queryset(pk, context)
        data = self.serializer_class(queryset, many=True).data
        return response(data, status.HTTP_200_OK)

    def post(self, request):
        context = self.get_context(request)
        request_data = get_request_data(request, 'post')
        request_data["user"] = context["user"]
        serializer = self.serializer_class(data=request_data)
        if serializer.is_valid():
            todo = serializer.save()
            data = self.serializer_class(todo).data
            return response(data, status.HTTP_201_CREATED)
        else:
            return error_in_valid_serializer_response(serializer)
    
    def put(self, request, pk):
        context = self.get_context(request)
        request_data = get_request_data(request, 'put')
        instance = get_object_or_404(self.model.objects.filter(id=pk))
        serializer = self.serializer_class(instance, data=request_data, partial=True)
        if serializer.is_valid():
            todo = serializer.save()
            data = self.serializer_class(todo).data
            return response(data, status.HTTP_201_CREATED)
        else:
            error_in_valid_serializer_response(serializer)

    def delete(self, request, pk):
        context = self.get_context(request)
        request_data = get_request_data(request, 'delete')
        instance = get_object_or_404(self.model.objects.filter(id=pk))
        instance.delete()
        return response({}, status.HTTP_200_OK)