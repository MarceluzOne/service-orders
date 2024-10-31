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
    console.log('Chamando getEmployee()');
    this.getEmployees();

  }

  public async getEmployees() {
    try {
      const employee = await this.employeeService.getEmployees().toPromise();
      this.employees = employee;
      console.log(' chamando no metodo')
      console.log(this.employees)
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
