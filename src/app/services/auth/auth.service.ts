import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageKeys } from 'src/app/services/local-storage/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private jwtDecoder: JwtHelperService
  ) {}

  // Método para login
  public login(payload: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${environment.apiUrl}/auth/login`, payload, { headers }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.localStorage.set(StorageKeys.Token, response.token);
          this.decoderToken(response.token);
        } else {
          console.error('A resposta não contém um token válido.');
        }
      })
    );
  }

  public logout(){
    this.localStorage.remove(StorageKeys.Token);
    this.localStorage.remove(StorageKeys.Profile);
  }

  public decoderToken(token: any): void {
    if (token && typeof token === 'string') {
      try {
        const profile = this.jwtDecoder.decodeToken(token); // Decodifica o token
        this.localStorage.set(StorageKeys.Profile, profile); // Salva o perfil no localStorage
        console.log('Perfil decodificado:', profile);
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    } else {
      console.error('Token inválido fornecido para decodificação:', token);
    }
  }

  public getAuth(payload: any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const token = this.http.post(`${environment.apiUrl}/auth/login`, payload, { headers });
  }



  // Método para configurar os cabeçalhos de autenticação para outras requisições
  public   getAuthHeaders(): HttpHeaders {
    const token = this.localStorage.get('ostoken');
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }
}
