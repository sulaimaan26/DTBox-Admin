import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { DateFormatterService } from 'src/app/services/dateformatter.service';
import { NotificationService } from 'src/app/services/NotificationService/notification-service.service';
import { ReferralEventService } from 'src/app/services/referralevent.service';
import { IReferralEvent } from 'src/app/_model/ReferralEvent';
import { EditableTable, TableColumn } from 'src/app/_model/TableColumn';

@Component({
  selector: 'app-referral-event-dashboard',
  templateUrl: './referral-event-dashboard.component.html',
  styleUrls: ['./referral-event-dashboard.component.css'],
})
export class ReferralEventDashboardComponent implements OnInit {
  tableData: IReferralEvent[];
  columns: TableColumn<Partial<IReferralEvent>>[] = [];
  $tableEditActive = new Subject<any>();
  $updateTable = new Subject<EditableTable[]>();
  tempTableRow: IReferralEvent;
  $subscription;

  constructor(
    private referralEventService: ReferralEventService,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dateFormatterService: DateFormatterService
  ) {}

  ngOnInit(): void {
    this.$subscription = this.activatedRoute.queryParams.subscribe(() => {
      // this.tempTableRow = { ...this.tableRow };

      this.columns = this.referralEventService.getColumn();
      this.referralEventService.getAll().subscribe((res) => {
        console.log(res);

        this.tableData = res;
      });
    });
  }

  addRow() {
    this.router.navigate(['/admin/referralevent/create/']);
  }

  onRowClicked($event) {
    this.router.navigate(['/admin/referralevent/update/' + $event.id]);
  }
}
