import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/emploee/emploee.service';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss']
})
export class EmployeeRegisterComponent implements OnInit {
  @Input() formEmployee: FormGroup = this.fb.group({});
  @Output() isSubmiting: Boolean = false

  constructor(
    private fb: FormBuilder,    
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.formEmployee = this.fb.group({
      'name' : new FormControl('', [Validators.required]),
      'email' : new FormControl('', [Validators.required, Validators.email, ]),
      'password' : new FormControl('', [Validators.required, Validators.min(6)]),
      'role' : new FormControl('', [Validators.required]),
      'employeeCod' : new FormControl('', [Validators.required]),      
    })
  }
  public submitEmployee(){

    console.log(this.formEmployee.value)
    // this.isSubmiting = true
    // if (this.formEmployee.valid) {
    //   const employeeData = this.formEmployee.value;
    //   this.employeeService.registerEmployee(employeeData).subscribe(
    //     response => {
    //       console.log('Cliente registrado com sucesso', response);
    //     },
    //     error => {
    //       console.error('Erro ao registrar o cliente', error);
    //     }
    //   );
    // }
  }

}
