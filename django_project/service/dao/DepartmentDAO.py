from .BaseDAO import BaseDAO
from service.models import Department, College


class DepartmentDAO(BaseDAO):

    def get_model(self):
        return Department

    def get_Unique(self):
        return ["name"]

    def populate(self, obj):
        try:
            college = College.objects.get(id=obj.college_ID)
            obj.collegeName = college.name
        except College.DoesNotExist:
            obj.collegeName = ""
        return obj
