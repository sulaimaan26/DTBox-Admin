import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { LocalstorageService } from '../services/localstorage/localstorage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private localStorageService: LocalstorageService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //this.loaderService.isLoading.next(true);

    // return next.handle(request).pipe(
    //   finalize(()=>{
    //     console.log('a');
    //     this.loaderService.isLoading.next(false);
    //   })
    // )

    // add authorization header with jwt token if available
    if (request.headers.get('skip')) {
      request = request.clone({
        headers: request.headers.delete('skip'),
      });
      return next.handle(request);
    }
    let currentUser = this.authenticationService.currentUserValue;

    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.access_token}`,
        },
      });
    }
    console.log(request);

    return next.handle(request).pipe(
      finalize(() => {
        //this.loaderService.isLoading.next(false);
      })
    );
  }
}
