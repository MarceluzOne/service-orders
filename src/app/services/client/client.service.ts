import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, retry } from 'rxjs';

const apiUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient
  ) { }

  public getClients(): Observable<any> {
    return this.http.get(`${apiUrl}/api/clients`)
      .pipe(
        retry(3)
      );
  }
  
  public registerClient(data: any): Observable<any> {
    return this.http.post(`${apiUrl}/api/clients`, data)
      .pipe(retry(3));
  }
}
