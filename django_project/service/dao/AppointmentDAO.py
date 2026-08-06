from service.dao.BaseDAO import BaseDAO
from service.models import Appointment, Department


class AppointmentDao(BaseDAO):

    def get_model(self):
        return Appointment

    def get_Unique(self):
        return ["patientName"]

    def populate(self, obj):
        try:
            department = Department.objects.get(id=obj.department_ID)
            obj.departmentName = department.name
        except Department.DoesNotExist:
            obj.departmentName = ""

        return obj
