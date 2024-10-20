import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IEmployee } from 'src/app/interface/IEmployee';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss']
})
export class EmployeeRegisterComponent implements OnInit {
  @Input() formEmployee: FormGroup = this.fb.group({});
  @Output() isSubmiting: Boolean = false;
  public employee: IEmployee[] = [];

  constructor(
    private fb: FormBuilder,    
    private employeeService: EmployeeService
  ) { }

  async ngOnInit() {
    this.formEmployee = this.fb.group({
      'name' : new FormControl('', [Validators.required]),
      'email' : new FormControl('', [Validators.required, Validators.email, ]),
      'password' : new FormControl('', [Validators.required, Validators.min(6)]),
      'role' : new FormControl('', [Validators.required]),
      'employeeCod' : new FormControl('', [Validators.required]),      
    })
    await this.getEmployee()
  }

  public async getEmployee(){
    try {
      const employees: IEmployee[] = await this.employeeService.getEmployee().toPromise();
      this.employee = {...employees}
      console.log(this.employee)
    } catch (error) {
      console.log(error)
    }
  }

  public submitEmployee(){
    if (this.formEmployee.valid) {
        const employee = this.formEmployee.value;
        this.employeeService.registerEmployee(employee).subscribe(
          response => {
            console.log('Cliente registrado com sucesso', response);
          },
          error => {
            console.error('Erro ao registrar o cliente', error);
          }
        );
      }
  }

}
