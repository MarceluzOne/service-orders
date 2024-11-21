import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent implements OnInit {
  public employees: any = [];

  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) { }

  async ngOnInit() {
    await this.getEmployees();
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
        this.toastr.success('Cliente deletado com sucesso')
        this.employees = this.employees.filter((employee: any) => employee.employeeCod !== cod);
      },
      error: (error) => {
        this.toastr.error('Erro ao deletar o cliente')
        console.error('Erro ao deletar funcionário:', error)
      }
    });

  }
}
