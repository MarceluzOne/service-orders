import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  public getEquipament(): Observable<any> {
    const headers = this.authService.getAuthHeaders(); 
    return this.http.get(`${environment.apiUrl}/api/equipments/all`, { headers });
  }

  public registerEquipament(data: any): Observable<any> {
    const headers = this.authService.getAuthHeaders(); 
    return this.http.post(`${environment.apiUrl}/api/equipments`, data, { headers });
  }
}
