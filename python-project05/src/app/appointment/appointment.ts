import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../services/appointment.service';
import { DepartmentService } from '../services/department.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointment.html',
  styleUrl: './appointment.css',
})
export class AppointmentComponent extends BaseComponent {

  protected override listUrl = '/appointments'
  override get title(): string {return this.isEditMode ? 'Edit Appointment' : 'Add Appointment'}

  doctors: any[] = [];
  private readonly cdr2 = inject(ChangeDetectorRef);

  constructor(
   private fb: FormBuilder,
   private appointmentService: AppointmentService,
   private departmentService: DepartmentService,
   router: Router,
   route: ActivatedRoute
  ){
    super(router,route);
    this.form = this.buildForm();
  }

  protected override buildForm(): FormGroup {
    return this.fb.group({
      patientName: ['',Validators.required],
      department_ID:['', Validators.required],
      departmentName: [''],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      reason: [''],
      mobileNumber: ['', Validators.required],
      status: ['Pending']
    });
  }

  protected override populateForm(a: any): void {
    this.form.patchValue({
      patientName: a.patientName,
      department_ID: a.department_ID,
      departmentName: a.departmentName,
      appointmentDate: a.appointmentDate,
      appointmentTime: a.appointmentTime,
      reason: a.reason ?? '',
      mobileNumber: a.mobileNumber,
      status: a.status ?? 'pending'
    });
  }

  onDepartmentChange(event: Event): void {
    const id = +(event.target as HTMLSelectElement).value;
    const dept = this.preloadData?.departments?.find((d:any) => d.id === id);
    this.form.patchValue({ departmentName: dept?.value ?? ''});
  }

  protected override getBody(): AppointmentComponent {
    const v = this.form.value;
    return { id: this.entityId ?? 0, ...v}
  }

  protected override getService() {
    return this.appointmentService;
  }
  
  }
