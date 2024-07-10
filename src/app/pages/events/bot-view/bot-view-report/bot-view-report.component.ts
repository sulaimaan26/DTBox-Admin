import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BotViewService } from 'src/app/services/bot-view.service';
import { NotificationService } from 'src/app/services/NotificationService/notification-service.service';
import { IBotViewReport } from 'src/app/_model/bot-view';
import { TableColumn } from 'src/app/_model/TableColumn';

@Component({
  selector: 'app-bot-view-report',
  templateUrl: './bot-view-report.component.html',
  styleUrls: ['./bot-view-report.component.css'],
})
export class BotViewReportComponent implements OnInit {
  columns: TableColumn<Partial<IBotViewReport>>[] = [];
  $subscription: Subscription;
  @Input() eventId: number;
  eventReport: IBotViewReport[];
  $tableEditActive = new Subject<any>();
  totalViews = 0;
  totalUsers = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private botViewService: BotViewService
  ) {}

  ngOnInit(): void {
    this.columns = this.botViewService.getReportColumn();

    this.$subscription = this.botViewService
      .getBotViewReport(this.eventId)
      .pipe(tap((e) => this.setMetaData(e)))
      .subscribe(
        (res) => {
          this.eventReport = res;
        },
        (err) => {
          this.notificationService.showError('Error', JSON.stringify(err));
        }
      );
  }

  setMetaData(botViewReport: IBotViewReport[]) {
    this.totalViews = botViewReport.reduce((f, s) => {
      return f + s.Views;
    }, 0);
    let filteredObj = botViewReport.filter(
      (obj1, i, arr) => arr.findIndex((obj2) => obj2.id === obj1.id) === i
    );
    if (filteredObj.length > 0) {
      this.totalUsers = filteredObj.length;
    }
  }

  ngOnDestroy(): void {
    if (this.$subscription) this.$subscription.unsubscribe();
  }
}
