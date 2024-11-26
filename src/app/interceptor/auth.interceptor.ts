import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { StorageKeys } from 'src/app/services/local-storage/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private authService: AuthService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localStorage.get('ostoken');
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(cloned);
    }
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => { },
        (error: HttpErrorResponse) => {
          if (error.status == 403) {
            this.authService.logout();
            this.router.navigateByUrl('/');
          }
        }
      )
    )
  }
}
