import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { ValidationError } from '../_model/ValidationMessaage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          if (!request.url.includes('/user/login')) {
            // auto logout if 401 response returned from api
            this.authenticationService.logout();
            location.reload();
          }
        }

        if (err.error.message) {
          return throwError(err.error.message);
        } else if (err.error.errors) {
          let error = err.error as ValidationError;
          return throwError(error.errors[0].message);
        }

        return throwError(err);
      })
    );
    // .pipe(finalize(()=>{
    //   console.log('a');
    //   this.loaderService.isLoading.next(false);
    // }));
  }
}
