import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EmployeeService } from 'src/app/services/emploee/emploee.service';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss']
})
export class EmployeeRegisterComponent implements OnInit {
  @Input() formEmployee =this.fb.group({});
  @Output() isSubmiting: Boolean = false

  constructor(
    private fb: FormBuilder,    
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
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
