import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CouponCodeService } from 'src/app/services/couponcode.service';
import { DateFormatterService } from 'src/app/services/dateformatter.service';
import { NotificationService } from 'src/app/services/NotificationService/notification-service.service';
import { VideoLevelService } from 'src/app/services/videolevel.service';
import { ICouponCode } from 'src/app/_model/couponcode';
import { EditableTable, TableColumn } from 'src/app/_model/TableColumn';

@Component({
  selector: 'app-coupon-code',
  templateUrl: './coupon-code.component.html',
  styleUrls: ['./coupon-code.component.css'],
})
export class CouponCodeComponent implements OnInit {
  ngOnInit(): void {}
}
