import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CouponCodeService } from 'src/app/services/couponcode.service';
import { DateFormatterService } from 'src/app/services/dateformatter.service';
import { NotificationService } from 'src/app/services/NotificationService/notification-service.service';
import { ICouponCode } from 'src/app/_model/couponcode';
import { TableColumn, EditableTable } from 'src/app/_model/TableColumn';

@Component({
  selector: 'app-coupon-code-dashboard',
  templateUrl: './coupon-code-dashboard.component.html',
  styleUrls: ['./coupon-code-dashboard.component.css'],
})
export class CouponCodeDashboardComponent implements OnInit {
  couponCodeList: ICouponCode[];
  columns: TableColumn<Partial<ICouponCode>>[] = [];
  $tableEditActive = new Subject<any>();
  tableRow: ICouponCode = {
    CouponCode: '',
    Description: '',
    EndDate: '',
    IsActive: true,
    StartDate: '',
  };
  $updateTable = new Subject<EditableTable[]>();
  tempTableRow: ICouponCode;
  $subscription;

  constructor(
    private couponCodeService: CouponCodeService,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dateFormatterService: DateFormatterService
  ) {
    this.$subscription = this.activatedRoute.queryParams.subscribe(() => {
      this.tempTableRow = { ...this.tableRow };

      this.columns = this.couponCodeService.getColumn();
      this.couponCodeService
        .getAll()
        .pipe(map((coupon) => coupon.map((e) => this.convertDateFields(e))))
        .subscribe((res) => {
          this.couponCodeList = res;
        });
    });
  }

  ngOnInit(): void {}

  convertDateFields(couponCode: ICouponCode) {
    couponCode.StartDate = this.dateFormatterService.convertDate(
      couponCode.StartDate
    );
    couponCode.EndDate = this.dateFormatterService.convertDate(
      couponCode.EndDate
    );
    return couponCode;
  }

  getModifiedCouponCode($event) {
    let changedVideoLevel = { ...$event } as ICouponCode;
    let id = changedVideoLevel.id;

    this.$subscription = this.couponCodeService
      .patch(id, changedVideoLevel)
      .pipe(
        map((coupon: ICouponCode[]) =>
          coupon.map((e) => this.convertDateFields(e))
        )
      )
      .subscribe(
        (res) => {
          this.$updateTable.next(res);
          this.notificationService.showSuccess(
            'Updated Successfully',
            'Success'
          );
          this.$tableEditActive.next(true);
        },
        (err) => {
          this.notificationService.showError(err, 'Failed');
        }
      );
  }

  addRow() {
    this.router.navigate(['/admin/couponcode/create'])
  }
}
