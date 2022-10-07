import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {CommonDiplayService} from "../../services/commondisplay.service";
import {catchError} from "rxjs/operators";
import {numberSeries} from "../../_model/numberseries";

@Injectable({
  providedIn: 'root'
})
export class CustomerDropdownResolver implements Resolve<boolean> {

  constructor(private customerService:CommonDiplayService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.customerService.getdropdown().pipe(
      catchError( err =>{
        return of('No data')
      })
    )
  }
}
