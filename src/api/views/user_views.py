from rest_framework.views import APIView
from rest_framework import status
from api.models import User
from django.shortcuts import get_object_or_404
from api.serializers import UserWriteSerializer, UserReadSerializer, UserLoginSerializer
from .services import response, error_response, error_in_valid_serializer_response, get_request_data
from api.constants import CONST_ERROR_INVALID_PASSWORD, CONST_ERROR_INVALID_USERNAME

class UserProfileAPIView(APIView):
    read_serializer_class = UserReadSerializer
    update_serializer_class = UserWriteSerializer
    model = User

    def get_context(self, request):
        return {
            "user": request.user.id if not request.user.is_anonymous else None
        }
    
    def get_serializer_class(self, *args, **kwargs):
        if self.request.method == 'GET':
            serializer_class = self.read_serializer_class
        if self.request.method == 'PUT':
            serializer_class = self.update_serializer_class
        return serializer_class(*args, **kwargs)

    def get(self, request):
        context = self.get_context(request)
        queryset = get_object_or_404(self.model.objects.filter(id=context["user"]))
        data = self.get_serializer_class(queryset).data
        return response(data, status.HTTP_200_OK)
    
    def put(self, request):
        request_data = get_request_data(request, 'put')
        context = self.get_context(request)
        instance = get_object_or_404(self.model.objects.filter(id=context["user"]))
        serializer = self.get_serializer_class(instance, data = request_data, partial=True)
        if serializer.is_valid():
            user = serializer.save()
            data = UserReadSerializer(user).data
            data['auth-token'] = user.get_auth_token()
            return response(data, status.HTTP_201_CREATED)
        else:
            error_in_valid_serializer_response(serializer)

class UserSignUpAPIView(APIView):
    read_serializer_class = UserReadSerializer
    write_serializer_class = UserWriteSerializer
    model = User

    def post(self, request):
        request_data = get_request_data(request, 'post')
        serializer = self.write_serializer_class(data = request_data)
        if serializer.is_valid():
                user = serializer.save()
                data = self.read_serializer_class(user).data
                return response(data, status.HTTP_201_CREATED)
        else:
            return error_in_valid_serializer_response(serializer)

class UserLoginAPIView(APIView):
    serializer_class = UserLoginSerializer
    model = User

    def post(self, request):
        request_data = get_request_data(request, 'post')
        serializer = self.serializer_class(data=request_data)
        if serializer.is_valid():
            user = self.model.objects.filter(username=request_data['username'])
            if user.exists():
                user = user[0]
                if user.check_password(request_data['password']):
                    data = UserReadSerializer(user).data
                    data['auth-token'] = user.get_auth_token()
                    return response(data, status.HTTP_200_OK)
                else:
                    return error_response(CONST_ERROR_INVALID_PASSWORD)
            else:
                return error_response(CONST_ERROR_INVALID_USERNAME)
        else:
            return error_in_valid_serializer_response(serializer)


    