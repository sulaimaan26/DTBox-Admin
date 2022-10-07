import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../../services/NotificationService/notification-service.service";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-alert-popup',
  templateUrl: './alert-popup.component.html',
  styleUrls: ['./alert-popup.component.css']
})
export class AlertPopupComponent implements OnInit {
  private subscription: Subscription;
  message = "It seems that you don't have company. You are redirecting to company page";

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {  }


  private openDialog(): void {
    // let dialogRef = this.dialog.open(AlertPopupComponent, {
    //
    // });
  }

  ngOnDestroy() {
   // this.subscription.unsubscribe();
  }

}
