import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor( 
    private http: HttpClient
  ) { }

  public getClients(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/clients`)
      .pipe(
        retry(3)
      );
  }

  public get(){
    return this.http.get(`${environment.apiUrl}/api/clients`)
      .pipe(
        retry(3),
        map((response) => {
          return response;
        })
      );
  }
}
