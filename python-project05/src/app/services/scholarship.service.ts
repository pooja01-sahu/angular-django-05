import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { ServiceLocator } from "./service-locator";
import { ORSAPI } from "./orsapi.config";

export interface Scholaship{
    id: number;
    scholarshipName: string;
    amount: number;
    eligibility:boolean;
    lastDate: string;
}

@Injectable({providedIn: 'root'})
export class ScholarshipService extends BaseService{

    constructor(serviceLocater: ServiceLocator){
        super(serviceLocater)
        this.url = ORSAPI.SCHOLARSHIP_API
    }
}