import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FacultymService } from '../services/facultym.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mfaculty',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mfaculty.html',
  styleUrl: './mfaculty.css',
})
export class FacultymComponent extends BaseComponent {
  protected override listUrl = './facultyms';
  override get title(): string {return this.isEditMode? 'Edit Facultym' : 'Add Facultym'}

  constructor(private fb: FormBuilder,private facultymService: FacultymService,router:Router,route: ActivatedRoute){
    super(router,route)
    this.form = this.buildForm();
  }

  protected override buildForm(): FormGroup {
    return this.fb.group({
      facultyName: ['',Validators.required],
      subject: [''],
      qualification: ['',Validators.required],
      experience: [''],
    })
  }

  protected override populateForm(a: any): void {
    this.form.patchValue({
      facultyName: a.facultyName,
      subject: a.subject,
      qualification: a.qualification,
      experience: a.experience
    })
  }

  protected override getBody(): FacultymComponent {
     const v = this.form.value;
     return {id: this.entityId ?? 0, ...v}
  }

  protected override getService(): BaseService {
    return this.facultymService;
  }
}
