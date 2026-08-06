from service.dao.AppointmentDAO import AppointmentDao
from service.service.BaseService import BaseService


class AppointmentService(BaseService):

    def get_dao(self):
        return AppointmentDao()