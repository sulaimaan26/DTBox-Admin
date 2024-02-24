import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CommonDiplayService } from '../../services/commondisplay.service';
import { catchError } from 'rxjs/operators';
import { EventService } from 'src/app/services/events.service';
import { BannerService } from 'src/app/services/banner.service';

@Injectable({
  providedIn: 'root',
})
export class BannerDropdownResolver implements Resolve<boolean> {
  constructor(private bannerService: BannerService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.bannerService.getdropdown().pipe(
      catchError((err) => {
        console.log(err);
        return of('No data');
      })
    );
  }
}
