import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {}

  // Método para login
  public login(payload: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${environment.apiUrl}/auth/login`, payload, { headers });
  }

  // Método para armazenar o token no localStorage
  public storeToken(token: string): void {
    this.localStorage.set('ostoken', token); // Armazena o token no localStorage
  }

  // Método para recuperar o token do localStorage
  public getToken(): string | null {
    return this.localStorage.get('ostoken');
  }

  // Método para configurar os cabeçalhos de autenticação para outras requisições
  public getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }
}
