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
import { SettingsService } from 'src/app/services/settings.service';
import { ISettings } from 'src/app/_model/settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsResolver implements Resolve<ISettings[]> {
  constructor(private eventService: SettingsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.eventService.getAllSettings().pipe(
      catchError((err) => {
        console.error(err);
        return of('No data');
      })
    );
  }
}
