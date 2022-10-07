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
export class CommonDisplayDetailsResolver implements Resolve<boolean> {

  constructor(private commonDiplayService:CommonDiplayService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.commonDiplayService.get(route.params?.commondisplayid).pipe(
      catchError( err => {
        console.log(err)
        return of('No data')
      })
    )
  }
}
