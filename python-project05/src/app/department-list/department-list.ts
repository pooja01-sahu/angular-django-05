import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from '../services/department.service';
import { BaseListComponent } from '../base/base-list.component';
import type { BaseService } from '../services/base.service';

@Component({
  selector: 'app-department-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './department-list.html',
  styleUrl: './department-list.css'
})
export class DepartmentListComponent extends BaseListComponent {

  protected override pageUrl = '/department';

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    router: Router,
    cdr: ChangeDetectorRef
  ) {
    super(router, cdr);
    this.form = this.buildForm();
  }

  protected override buildForm(): FormGroup {
    return this.fb.group({
      name: [''],
      code: [''],
      college: ['']
    });
  }

  protected override getService(): BaseService { return this.departmentService; }
}