import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public getClients(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/clients/all`)
      .pipe(
        retry(3)
      );
  }
  public deleteClient(cnpj: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(`${environment.apiUrl}/api/clients/cnpj/${cnpj}`, {headers, observe: 'response'})
      .pipe(
        catchError(error => {
          console.error('Erro ao deletar cliente:', error);
          return throwError(() => new Error('Erro ao deletar cliente.'));
        })
      );
  }
  
  public registerClient(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/clients`, data)
  }

  public updateClient(data: any, cnpj: string ): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.put(`${environment.apiUrl}/api/clients/cnpj/${cnpj}`, data, {headers})
      .pipe(
        retry(3)
      );
  }
}
