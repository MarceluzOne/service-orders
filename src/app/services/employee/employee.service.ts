import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, retry } from 'rxjs';

const apiUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  public registerEmployee(data: any): Observable<any> {
    return this.http.post(`${apiUrl}/api/employees/create`, data)
      ;
  }
  public getEmployee(): Observable<any> {
    return this.http.get(`${apiUrl}/api/employees/all`)
      ;
  }

  public updateEmployee(data: any, cnpj: string ): Observable<any> {
    return this.http.post(`${apiUrl}/api/clients/create/${cnpj}`, data)
      .pipe(
        retry(3)
      );
  }
}

