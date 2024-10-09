import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

const apiUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient
  ) { }

  public getEmployee(): Observable<any> {
    return this.http.get(`${apiUrl}/api/employees/all`)
      .pipe(
        retry(3)
      );
  }
  
  public registerEmployee(data: any): Observable<any> {
    return this.http.post(`${apiUrl}/api/employees/create`, data)
      ;
  }

  //não tem no momento
  public updateEmployee(data: any, cnpj: string ): Observable<any> {
    return this.http.post(`${apiUrl}/api/employees//${cnpj}`, data)
      .pipe(
        retry(3)
      );
  }

  public removeEmployee(data: any): Observable<any> {
    return this.http.delete(`${apiUrl}/api/employees/delet`, data)
      ;
  }
}
