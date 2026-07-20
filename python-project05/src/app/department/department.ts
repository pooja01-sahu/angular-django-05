import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepartmentService } from '../services/department.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class DepartmentComponent extends BaseComponent {

  protected override listUrl = '/departments'

  get title(): string {
    return this.isEditMode ? 'Edit Department' : 'Add Department';
  }

  constructor(private fb: FormBuilder,private departmentService: DepartmentService,router:Router,route: ActivatedRoute){
    super(router,route);
    this.form = this.buildForm();
  }

  protected override buildForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      college_ID: ['', Validators.required],
      collegeName: [''],
    })
  }

  protected override getService(): BaseService {
    return this.departmentService;
  }

  protected override getBody(): unknown {
    return {id: this.entityId ?? 0, ...this.form.value}
  }

  protected override populateForm(data: any): void {
    this.form.patchValue({
      name: data.name,
      code: data.code
    });
  }

}
