import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TimeInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const start = performance.now();
    // cada vez que se envía una solicitud, este interceptor va a evaluar cuánto tardó
    return next.handle(request).pipe(
      tap(() => {
        const time = performance.now() - start + 'ms';
        console.log('Cuánto tardó este request? Tardó: ', time);
      })
    );
  }
}
