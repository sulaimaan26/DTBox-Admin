import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {catchError} from "rxjs/operators";
import {CommonDiplayService} from "../../services/commondisplay.service";

@Injectable({
  providedIn: 'root'
})
export class CustomerAllResolver implements Resolve<boolean> {

  constructor(private customerService:CommonDiplayService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.customerService.getAll().pipe(
      catchError( err => {
        console.log(err)
        return of('No data')
      })
    )
  }
}
