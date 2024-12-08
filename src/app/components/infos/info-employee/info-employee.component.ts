import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-info-employee',
  templateUrl: './info-employee.component.html',
  styleUrls: ['./info-employee.component.scss']
})
export class InfoEmployeeComponent {
  public employeeForm: FormGroup = this.fb.group({})

  constructor(
    public dialogRef: MatDialogRef<InfoEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public employeeService: EmployeeService
  ) {this.employeeForm = this.fb.group({
      'name' : new FormControl(data.name, [Validators.required]),
      'email' : new FormControl(data.email, [Validators.required, Validators.email, ]),
      'password' : new FormControl(null, [Validators.min(6)]),
      'role' : new FormControl(data.role, [Validators.required]),
      'employeeCod' : new FormControl(data.employeeCod, [Validators.required, Validators.maxLength(10)]),      
  });}
  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public updateEmployee(){
    console.log(this.employeeForm.value)
    if(this.employeeForm.valid){
      console.log('passou')
      const payload = this.employeeForm.value
      this.employeeService.updateEmployee(payload, payload.email).subscribe({
        next: () => {
          this.toastr.success('Funcionário atualizado com sucesso')
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
  }
}
