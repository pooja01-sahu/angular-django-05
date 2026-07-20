from rest_framework.response import Response
from rest_framework.views import APIView

from ORSAPI.rest.BaseRestCtl import BaseRestCtl
from service.Serializers import DepartmentSerializers
from service.models import Department, College
from service.service.DepartmentService import DepartmentService
from service.utility.DataValidator import DataValidator


class DepartmentRestCtl(BaseRestCtl):

    def get_model(self):
        return Department

    def get_service(self):
        return DepartmentService()

    def get_serializer_class(self):
        return DepartmentSerializers

    def input_validation(self, data):
        errors = {}

        name = data.get("name", "")
        code = data.get("code", "")

        if DataValidator.isNull(name):
            errors["name"] = "Name cannot be null"
        elif not DataValidator.isMaxLength(name, 100):
            errors["name"] = "Name cannot exceed 100 characters"

        if DataValidator.isNull(code):
            errors["code"] = "code cannot be null"
        elif not DataValidator.isMaxLength(code, 500):
            errors["code"] = "code cannot exceed 500 characters"

        return errors

class DepartmentPreloadRestCtl(APIView):
    def get(self, _request):
        data = {
            "colleges": [
                {"id": c.get_key(), "value": c.get_value()}
                for c in College.objects.order_by("name")
            ],
        }
        return Response({"error": False, "message": "", "data": data})