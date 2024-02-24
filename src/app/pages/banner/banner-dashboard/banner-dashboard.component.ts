import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { BannerService } from 'src/app/services/banner.service';
import { CouponCodeService } from 'src/app/services/couponcode.service';
import { DateFormatterService } from 'src/app/services/dateformatter.service';
import { NotificationService } from 'src/app/services/NotificationService/notification-service.service';
import { IBanner } from 'src/app/_model/banner';
import { EditableTable, TableColumn } from 'src/app/_model/TableColumn';

@Component({
  selector: 'app-banner-dashboard',
  templateUrl: './banner-dashboard.component.html',
  styleUrls: ['./banner-dashboard.component.css'],
})
export class BannerDashboardComponent implements OnInit {
  bannerList: IBanner[];
  columns: TableColumn<Partial<IBanner>>[] = [];
  $tableEditActive = new Subject<any>();
  $updateTable = new Subject<EditableTable[]>();
  tempTableRow: IBanner;
  $subscription;

  constructor(
    private bannerService: BannerService,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dateFormatterService: DateFormatterService
  ) {}

  ngOnInit(): void {
    this.$subscription = this.activatedRoute.queryParams.subscribe(() => {
      // this.tempTableRow = { ...this.tableRow };

      this.columns = this.bannerService.getColumn();
      this.bannerService.getAll().subscribe((res) => {
        console.log(res);

        this.bannerList = res;
      });
    });
  }

  addRow() {
    this.router.navigate(['/admin/banner/create/']);
  }

  onRowClicked($event) {
    this.router.navigate(['/admin/banner/update/' + $event.id]);
  }
}
