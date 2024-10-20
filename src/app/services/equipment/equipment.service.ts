import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retry } from 'rxjs';

const apiUrl = 'http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private http: HttpClient
  ) { }

  public getEquipament() {
    return this.http.get(`${apiUrl}/api/equipments`)
      .pipe(
        retry(3)
      );
  }
  public registerEquipament(data: any): Observable<any> {
    return this.http.post(`${apiUrl}/api/equipments`, data)
      .pipe(retry(3));
  }

}
