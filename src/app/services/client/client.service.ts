import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';

const apiUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient
  ) { }

  public getClients(): Observable<any> {
    return this.http.get(`${apiUrl}/api/clients/all`)
      .pipe(
        retry(3)
      );
  }
  public deleteClient(cnpj: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(`${apiUrl}/api/clients/cnpj/${cnpj}`, {headers, observe: 'response' })
      .pipe(
        catchError(error => {
          console.error('Erro ao deletar cliente:', error);
          return throwError(() => new Error('Erro ao deletar cliente.'));
        })
      );
  }
  
  public registerClient(data: any): Observable<any> {
    return this.http.post(`${apiUrl}/api/clients/create`, data)
  }

  public updateClient(data: any, cnpj: string ): Observable<any> {
    return this.http.post(`${apiUrl}/api/clients/create/${cnpj}`, data)
      .pipe(
        retry(3)
      );
  }
}
