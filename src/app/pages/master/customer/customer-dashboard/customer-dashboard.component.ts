import {Component, InjectionToken, Injector, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDiplayService } from 'src/app/services/commondisplay.service';
import {ButtonControlService} from "../../../../services/buttonControl/button-control.service";
import {RouteData} from "../../../../_model/header";
import {pluck, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {allowedTableDropdown} from "../../../../_model/TableColumn";





@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  injectService
  dropdownOption:Observable<allowedTableDropdown>

  constructor(
    private route:ActivatedRoute,
    private buttonControlService:ButtonControlService,
    private injector:Injector
  ) {
  }

  ngOnInit(): void {
    console.log('Working')
    this.injectService = this.injector.get((this.route.snapshot.data as RouteData).requiredService)
    this.buttonControlService.updateCrumb(this.route.data)

    this.dropdownOption = this.route.data.pipe(pluck('dropdown'))
  }


}


