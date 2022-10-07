import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Observable, Subject} from "rxjs";
import {NavigationStart, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AlertPopupComponent} from "../../component/alert-popup/alert-popup.component";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private subject = new Subject<any>();
  private userInputSubject = new Subject<any>();
  private keepAfterRouteChange = false;



  constructor(
    private toastr:ToastrService,
    private router: Router,
    public dialog: MatDialog
  ) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert message
          this.clear();
        }
      }
    });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: 'success', text: message });
    this.dialog.open(AlertPopupComponent, {

    });
  }

  error(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: 'error', text: message });
    this.dialog.open(AlertPopupComponent, {

    });

    this.userInputSubject.subscribe((r)=>{
      console.log(r)
    })
  }

  clear() {
    // clear by calling subject.next() without parameters
    this.subject.next();
  }

  showSuccess(message, title){
    this.toastr.success(message, title)
  }

  showError(message, title){
    this.toastr.error(message, title)
  }

  showWarning(message, title){
    this.toastr.warning(message, title)
  }

  showPopup(){

  }

}
