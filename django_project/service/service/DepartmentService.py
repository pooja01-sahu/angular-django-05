from service.dao.DepartmentDAO import DepartmentDAO
from .BaseService import BaseService


class DepartmentService(BaseService):

    def get_dao(self):
        return DepartmentDAO()