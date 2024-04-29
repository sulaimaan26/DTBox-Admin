import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {CommonDiplayService} from "../../services/commondisplay.service";
import {catchError} from "rxjs/operators";
import { EventService } from 'src/app/services/events.service';
import { BannerService } from 'src/app/services/banner.service';
import { CampaignService } from 'src/app/services/campaign.service';
import { ReferralEventService } from 'src/app/services/referralevent.service';

@Injectable({
  providedIn: 'root'
})
export class ReferralEventDetailsResolver implements Resolve<boolean> {

  constructor(private referralEventService:ReferralEventService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.referralEventService.get(route.params?.referraleventid).pipe(
      catchError( err => {
        return of('No data')
      })
    )
  }
}
