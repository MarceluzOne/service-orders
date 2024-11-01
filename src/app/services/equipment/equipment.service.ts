import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private http: HttpClient
  ) { }

  public getEquipament(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/equipments/all`)
  }

  public registerEquipament(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/equipments/create`, data)
      .pipe(retry(3));
  }
}
