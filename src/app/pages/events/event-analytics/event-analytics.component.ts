import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventAnalyticsService } from 'src/app/services/eventanalytics.service';
import { NotificationService } from 'src/app/services/NotificationService/notification-service.service';
import { EventReport } from 'src/app/_model/eventanalytics';
import { TableColumn } from 'src/app/_model/TableColumn';

@Component({
  selector: 'app-event-analytics',
  templateUrl: './event-analytics.component.html',
  styleUrls: ['./event-analytics.component.css'],
})
export class EventAnalyticsComponent implements OnInit, OnDestroy {
  columns: TableColumn<Partial<EventReport>>[] = [];
  $subscription: Subscription;
  eventId: number;
  eventReport: EventReport[];
  $tableEditActive = new Subject<EventReport>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public eventAnalyticsService: EventAnalyticsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.columns = this.eventAnalyticsService.getColumn() as TableColumn<
      Partial<EventReport>
    >[];
    this.$subscription = this.activatedRoute.data.subscribe((data) => {
      if (data) {
        if (data.details) {
          this.eventId = data.details.id;
          this.getEventAnalytics();
        }
      }
    });
  }

  getEventAnalytics() {
    this.$subscription = this.eventAnalyticsService
      .getEventReport(this.eventId)
      .pipe(
        map((eventAnalytics) => {
          this.eventReport = eventAnalytics.report;
          return eventAnalytics;
        })
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  getModifiedReport(report: EventReport) {
    let payload = {
      EventId: this.eventId,
      UserId: report.id,
      IsPriceDistributed: report.IsPriceDistributed ?? false,
      Remarks: report.Remarks,
      DistributedDate: report.DistributedDate,
    };

    this.eventAnalyticsService.updateReport(payload).subscribe(
      (res) => {
        this.notificationService.showSuccess(
          'Report has been updated!',
          'Success'
        );
        report.isEdit = false;
        this.$tableEditActive.next(report);
      },
      (err) => {
        alert(err);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.$subscription) this.$subscription.unsubscribe();
  }
}
