import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Função para obter a lista de equipamentos
  public getEquipament(): Observable<any> {
    const headers = this.authService.getAuthHeaders(); 
    return this.http.get(`${environment.apiUrl}/api/equipments/all`, { headers });
  }

  // Função para registrar um novo equipamento
  public registerEquipament(data: any): Observable<any> {
    const headers = this.authService.getAuthHeaders(); 
    return this.http.post(`${environment.apiUrl}/api/equipments`, data, { headers });
  }

  // Função para obter todas as ordens de serviço
  public getAllServiceOrders(): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get(`${environment.apiUrl}/api/service-orders/all`, { headers });
  }

  

}
