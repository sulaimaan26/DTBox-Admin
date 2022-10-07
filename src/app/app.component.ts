import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ResolveEnd, ResolveStart, Router} from "@angular/router";
import {merge, Observable, of} from "rxjs";
import {filter, map, mapTo, tap} from "rxjs/operators";
import {ButtonControlService} from "./services/buttonControl/button-control.service";
import {OpenDialogService} from "./services/OpenDialog/open-dialog.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  isLoading$: Observable<boolean>
  private _showLoaderEvents: Observable<boolean>
  private _hideLoaderEvents: Observable<boolean>

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private buttonControlService:ButtonControlService,
    private openDialogService:OpenDialogService,
    private dialog:MatDialog
  ) {
  }

  ngOnInit(): void {



    this.buttonControlService.updateCrumb(this.route.data)


  this._showLoaderEvents = this.router.events.pipe(filter(e => e instanceof ResolveStart),
      tap(d=>console.log(d)),
      mapTo(true))
    this._hideLoaderEvents = this.router.events.pipe(filter(e => e instanceof ResolveEnd),
      tap(d=>console.log(d)),
      mapTo(false))

    this.isLoading$ = merge(this._showLoaderEvents,this._hideLoaderEvents)

    this.isLoading$.subscribe((d)=>{
      console.log(d)
    })
  }


}
