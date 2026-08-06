import { ChangeDetectorRef, Component } from '@angular/core';
import { BaseListComponent } from '../base/base-list.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FacultymService } from '../services/facultym.service';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mfacultylist',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mfacultylist.html',
  styleUrl: './mfacultylist.css',
})
export class FacultymlistComponent extends BaseListComponent {

  protected override pageUrl = '/facultym'

  constructor(private fb: FormBuilder, private facultymService: FacultymService, router: Router, cdr: ChangeDetectorRef) {
    super(router, cdr);
    this.form = this.buildForm();
  }

  protected override buildForm(): FormGroup {
    return this.fb.group({
      facultyName: [''],
      subject: [''],
      qualification: [''],
      experience: [''],
    })
  }

  protected override getService(): BaseService {
    return this.facultymService
  }
}
