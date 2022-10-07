import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {CommonDiplayService} from "../../services/commondisplay.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsResolver implements Resolve<boolean> {

  constructor(private customerService:CommonDiplayService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.customerService.get(route.params?.customerid).pipe(
      catchError( err => {
        console.log(err)
        return of('No data')
      })
    )
  }
}
