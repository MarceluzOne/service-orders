import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/employees/all`);
  }

  public registerEmployee(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register`, data);
  }

  public updateEmployee(data: any, cnpj: string ): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/clients/${cnpj}`, data)
      .pipe(
        retry(3)
      );
  }
  public deleteEmployee(id: string) {
    return this.http.delete(`${environment.apiUrl}/api/employees/employeeCod/${id}`, { observe: 'response' })
      .pipe(
        catchError(error => {
          console.error('Erro ao deletar funcionário:', error);
          return throwError(() => new Error('Erro ao deletar funcionário.'));
        })
      );
  }
}

