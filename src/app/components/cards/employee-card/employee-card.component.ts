import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent implements OnInit {
  public employees: any = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    //this.getEmployees();
    this.employees = [
      {
          "id": 9,
          "name": "Marcelo Arruda",
          "email": "arruda16.marcelo@gmail.com",
          "role": "NORMAL",
          "registrationDate": "2024-11-04T15:14:50.991633",
          "employeeCod": "func01"
      },
      {
          "id": 10,
          "name": "João Thailan",
          "email": "Thailan@teste.com",
          "role": "ADM",
          "registrationDate": "2024-11-05T11:01:31.799283",
          "employeeCod": "adm01"
      }
  ]
  }

  public async getEmployees() {
    try {
      const employee = await this.employeeService.getEmployees().toPromise();
      this.employees = employee;
    } catch (error) {
      this.employees = []
      console.error(error)
    }
  }

  public confirmDelete(cod: string) {
    if (confirm('Tem certeza que deseja deletar este funcionário?')) {
      this.deleteEmployee(cod);
    }
  }
  private deleteEmployee(cod: string) {
    this.employeeService.deleteEmployee(cod).subscribe({
      next: () => {
        console.log('Cliente deletado com sucesso');
        this.employees = this.employees.filter((employee: any) => employee.employeeCod !== cod);
        alert('Funcionário deletado com sucesso!')
      },
      error: (error) => console.error('Erro ao deletar funcionário:', error),
    });

  }
}
