import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/NotificationService/notification-service.service';
import { SettingsService } from 'src/app/services/settings.service';
import { ISettings } from 'src/app/_model/settings';
import { NotificationComponent } from './notification/notification.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  settingsList: ISettings[];
  $subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private settingsService: SettingsService,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.$subscription = this.activatedRoute.data.subscribe((data) => {
      if (data && data.settings) this.settingsList = data.settings;
    });
  }

  openDialog(): void {
    this.dialog.open(NotificationComponent, {
      width: '450px',
    });
  }

  onSubmit() {
    this.$subscription = this.settingsService
      .saveAllSettings(this.settingsList)
      .subscribe((res) => {
        this.settingsList = res;
        this.notificationService.showSuccess(
          'Settings updated succsessfully!!!',
          'Success'
        );
      });
  }

  ngOnDestroy(): void {
    if (this.$subscription) this.$subscription.unsubscribe();
  }
}
