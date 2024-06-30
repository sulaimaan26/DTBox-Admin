import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { NotificationService } from 'src/app/services/NotificationService/notification-service.service';
import { SalesReferralCodeService } from 'src/app/services/sales-referral-code.service';
import {
  ISalesCodeDashboard,
  ISalesReferralCode,
} from 'src/app/_model/sales-referral-code';
import { TableColumn, EditableTable } from 'src/app/_model/TableColumn';
import { AddSalesCodeDialogComponent } from '../add-sales-code-dialog/add-sales-code-dialog.component';

@Component({
  selector: 'app-sales-code-dashboard',
  templateUrl: './sales-code-dashboard.component.html',
  styleUrls: ['./sales-code-dashboard.component.css'],
})
export class SalesCodeDashboardComponent implements OnInit {
  codeList: ISalesCodeDashboard[];
  columns: TableColumn<Partial<ISalesCodeDashboard>>[] = [];
  $tableEditActive = new Subject<any>();
  $updateTable = new Subject<EditableTable[]>();
  tempTableRow: ISalesCodeDashboard;
  $subscription;

  constructor(
    private salesReferralCodeService: SalesReferralCodeService,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.$subscription = this.activatedRoute.queryParams.subscribe(() => {
      this.columns = this.salesReferralCodeService.getColumn();
      this.salesReferralCodeService.getAll().subscribe((res) => {
        this.codeList = res;
      });
    });
  }

  onRowClicked($event) {
    this.router.navigate(['/admin/salesreferralcode/update/' + $event.id]);
  }

  add() {
    const dialogRef = this.dialog.open(AddSalesCodeDialogComponent, {
      width: '250px',
      data: { count: 5 },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      this.salesReferralCodeService.getAll().subscribe((res) => {
        this.codeList = res;
        this.$updateTable.next(res);
        this.notificationService.showSuccess(
          'Generated Successfully',
          'Success'
        );
        this.$tableEditActive.next(true);
      });

      // this.$updateTable.next(true);
    });
  }
}
