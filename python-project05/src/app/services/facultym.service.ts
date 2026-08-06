import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { ServiceLocator } from "./service-locator";
import { ORSAPI } from "./orsapi.config";

export interface Facultym {
    id: number;
    facultyName: string;
    subject: string;
    qualification: string;
    experience: number;
}

@Injectable({providedIn: 'root'})
export class FacultymService extends BaseService {

    constructor(serviceLocator: ServiceLocator){
        super(serviceLocator)
        this.url = ORSAPI.Facultym_API
        this.supportsPreload = true
    }

}