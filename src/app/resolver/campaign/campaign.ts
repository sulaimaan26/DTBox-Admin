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

@Injectable({
  providedIn: 'root'
})
export class CampaignDetailsResolver implements Resolve<boolean> {

  constructor(private campaignService:CampaignService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.campaignService.get(route.params?.campaignid).pipe(
      catchError( err => {
        return of('No data')
      })
    )
  }
}
