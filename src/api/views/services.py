from rest_framework import status
from rest_framework.response import Response
from api.constants import CONST_ERROR_MESSAGE_TEMPLATE, CONST_INVALID_SERIALZER_CODE, CONST_ERROR_RESPONSE_CODE

def response(response, response_status):
    if 200 <= response_status <=207:
        response = {
            'success':True,
            'response':response
        }
    return Response(response, status=response_status, headers={'Content-Type': 'application/json',})

def error_response(template, template_data={}, response_status = status.HTTP_400_BAD_REQUEST, error_code=CONST_ERROR_RESPONSE_CODE):
    error = {
        'error_code' : error_code,
        'message' : CONST_ERROR_MESSAGE_TEMPLATE[template].format(**template_data)
    }

    response = {
        'success':False,
        'error':error
    }
    return Response(response, status=response_status)

def error_in_valid_serializer_response(serializer, error_code=CONST_INVALID_SERIALZER_CODE):
    error_detail = serializer.errors
    
    error = {
        "error_code" : error_code,
        "error_detail" : error_detail
    }

    response = {
        "success" : False,
        "error" : error
    }
    return Response(response, status.HTTP_400_BAD_REQUEST)

def get_request_data(request, method_type):
    if method_type == "GET":
        request_data = {}
        for key in request.GET:
            request_data[key] = request.GET[key]
    else:
        try:
            request_data = request.data
        except:
            request_data = {}
    return request_data