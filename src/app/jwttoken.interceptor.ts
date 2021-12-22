import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwttokenInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const re = /login/;
    if (request.url.search(re) === -1) {
      let user: any = localStorage.getItem('token');
      // console.log(JSON.parse(user)?.jwt)
      let tokens;
      tokens = JSON.parse(user)?.jwt;
      // console.log("tokens in interceptor" + tokens)
      // console.log("this is coming from interceptor")
      request = request.clone({
        setHeaders: {
          token: tokens
        }
      })
    }
    return next.handle(request);
  }
}
