import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';

const apiUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<any> {
    return this.http.get(`${apiUrl}/api/employees/all`);
  }

  public registerEmployee(data: any): Observable<any> {
    return this.http.post(`${apiUrl}/api/employees/create`, data)
      ;
  }


  public updateEmployee(data: any, cnpj: string ): Observable<any> {
    return this.http.post(`${apiUrl}/api/clients/create/${cnpj}`, data)
      .pipe(
        retry(3)
      );
  }
  public deleteEmployee(id: string) {
    return this.http.delete(`${apiUrl}/api/employees/employeeCod/${id}`, { observe: 'response' })
      .pipe(
        catchError(error => {
          console.error('Erro ao deletar funcionário:', error);
          return throwError(() => new Error('Erro ao deletar funcionário.'));
        })
      );
  }
}

