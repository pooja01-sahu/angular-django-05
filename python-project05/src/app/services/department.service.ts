import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { ServiceLocator } from "./service-locator";
import { ORSAPI } from "./orsapi.config";

export interface Department {
    id: number;
    name: string;
    code?: string;
    collegeId?: number;
    [key: string]: unknown
}

@Injectable({providedIn: 'root'})
export class DepartmentService extends BaseService{

    constructor(servicelocator: ServiceLocator){
        super(servicelocator);
        this.url = ORSAPI.DEPARTMENT_API;
        this.supportsPreload = true;
    }
}