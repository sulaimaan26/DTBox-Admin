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
export class CommonDisplayDropdownResolver implements Resolve<boolean> {

  constructor(private commonDiplayService:CommonDiplayService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.commonDiplayService.getdropdown().pipe(
      catchError( err => {
        console.log(err)
        return of('No data')
      })
    )
  }
}
