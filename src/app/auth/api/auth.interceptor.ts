import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const access_token = localStorage.getItem('access_token');

    if (access_token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${access_token}`),
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
