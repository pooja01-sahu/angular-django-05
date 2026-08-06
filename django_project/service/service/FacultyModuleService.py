from service.dao.FacultymoduleDAO import FacultyModuleDao
from service.service.BaseService import BaseService


class FacultyModuleService(BaseService):

    def get_dao(self):
        return FacultyModuleDao()
