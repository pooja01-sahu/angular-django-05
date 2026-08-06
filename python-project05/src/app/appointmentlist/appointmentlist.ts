import { ChangeDetectorRef, Component } from '@angular/core';
import { BaseListComponent } from '../base/base-list.component';
import { AppointmentService } from '../services/appointment.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BaseService } from '../services/base.service';

@Component({
  selector: 'app-appointmentlist',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointmentlist.html',
  styleUrl: './appointmentlist.css',
})
export class Appointmentlist extends BaseListComponent{

   protected override pageUrl = '/appointment';

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    router: Router,
    cdr: ChangeDetectorRef
  ) {
    super(router, cdr);
    this.form = this.buildForm();
  }

  protected override buildForm(): FormGroup {
    return this.fb.group({
      patientName:  [''],
      userName:     [''],
      mobileNumber: [''],
      status:       ['']
    });
  }

  protected override getService(): BaseService { return this.appointmentService; }
}


