import { Injectable } from "@angular/core";
import { ServiceLocator } from "./service-locator";
import { ORSAPI } from "./orsapi.config";
import { BaseService } from "./base.service";


export interface Appointment{
    id: number;
    patientName: string;
    department: number;
    appointmentDate: string;
    appointmentTime: string;
    reason?: string;
    mobileNumber: string;
    status:string
}

@Injectable({providedIn: 'root'})
export class AppointmentService extends BaseService {
    constructor(serviceLocator: ServiceLocator){
        super(serviceLocator);
        this.url = ORSAPI.APPOINTMENT_API;
        this.supportsPreload = true
    }
}