import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScholarshipService } from '../services/scholarship.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../services/base.service';

@Component({
  selector: 'app-scholarship',
  imports: [],
  templateUrl: './scholarship.html',
  styleUrl: './scholarship.css',
})
export class ScholarshipComponent extends BaseComponent {

  protected override listUrl = '/scholarships'

  get title(): string{
    return this.isEditMode ? 'Edit Department' : 'Add Department';
  }

  constructor(private fb: FormBuilder, private scholarshipService: ScholarshipService,router: Router,route:ActivatedRoute){
    super(router,route),
    this.form =  this.buildForm();
  }

  protected override buildForm(): FormGroup {
    return this.fb.group({
      scholarshipName: ['',Validators.required],
      amount: [''],
      eligibility: [''],
      lastDate: ['',Validators.required]
    })
   }

   protected override getService(): BaseService {
     return this.scholarshipService
   }

   protected override getBody(): unknown {
     return {id: this.entityId ?? 0, ...this.form.value}
   }

   protected override populateForm(data: any): void {
     this.form.patchValue({
      scholarshipName: data.scholarshipName,
      amount: data.amount,
      eligibility: data.eligibility,
      lastdate: data.lastDate
     })
   }
}
