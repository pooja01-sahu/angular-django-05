from service.dao.BaseDAO import BaseDAO
from service.models import Faculty, FacultyModule


class FacultyModuleDao(BaseDAO):

    def get_model(self):
        return FacultyModule

    def get_Unique(self):
        return ['facultyName']

    def populate(self, obj):
        return obj