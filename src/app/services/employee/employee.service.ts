import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public getEmployees(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/employees/all`);
  }

  public registerEmployee(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register`, data);
  }

  public updateEmployee(data: any, email: string ): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    console.log(headers)
    return this.http.put(`${environment.apiUrl}/api/employees/email/${email}`, data, {headers})
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

