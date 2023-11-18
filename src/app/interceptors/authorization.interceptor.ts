import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor() {}

  // Function to intercept all HTTP requests
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Check if the access token is stored in localStorage
    if (localStorage.getItem("ACCESS_TOKEN")) {
      // Clone the request to add the Authorization header
      return next.handle(request.clone({
        setHeaders: {
          'Authorization': `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
        }
      }));
    }
    // If no token, forward the original request
    return next.handle(request);
  }
}
