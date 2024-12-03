import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageKeys } from 'src/app/services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getCustomerToken());

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private jwtDecoder: JwtHelperService
  ) {}

  public login(payload: any): Observable<any> {
    this.localStorage.clean()
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${environment.apiUrl}/auth/login`, payload, { headers }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.localStorage.set(StorageKeys.Token, response.token);
          this.decoderToken(response.token);
          this.updateAdminStatus(); 
        } else {
          console.error('A resposta não contém um token válido.');
        }
      })
    );
  }

  public logout() {
    this.localStorage.remove(StorageKeys.Token);
    this.localStorage.remove(StorageKeys.Profile);
    this.isAdmin.next(false);
  }

  public getCustomerToken(): boolean {
    const profile = this.localStorage.get(StorageKeys.Profile);
    if (profile && profile.roles && profile.roles.includes('ROLE_ADM')) {
      return true;
    }
    return false;
  }

  private updateAdminStatus(): void {
    this.isAdmin.next(this.getCustomerToken());
  }

  public decoderToken(token: any): void {
    if (token && typeof token === 'string') {
      try {
        const profile = this.jwtDecoder.decodeToken(token);
        this.localStorage.set(StorageKeys.Profile, profile); 
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    } else {
      console.error('Token inválido fornecido para decodificação:', token);
    }
    
  }

  public getAuthHeaders(): HttpHeaders {
    const token = this.localStorage.get(StorageKeys.Token);
    console.log(token)
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }
}
