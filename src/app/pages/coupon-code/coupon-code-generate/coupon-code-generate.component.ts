import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CouponCodeService } from 'src/app/services/couponcode.service';
import { DateFormatterService } from 'src/app/services/dateformatter.service';
import { NotificationService } from 'src/app/services/NotificationService/notification-service.service';
import { ErrorResponse } from 'src/app/_model/response/ErrorResponse';

@Component({
  selector: 'app-coupon-code-generate',
  templateUrl: './coupon-code-generate.component.html',
  styleUrls: ['./coupon-code-generate.component.css'],
})
export class CouponCodeGenerateComponent implements OnInit {
  eventsForm?: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dateFormatterService: DateFormatterService,
    private couponCodeService: CouponCodeService
  ) {}

  ngOnInit(): void {
    this.eventsForm = this.formBuilder.group({
      CouponCodePrefix: ['', Validators.required],
      CouponCodeLength: ['', Validators.required],
      CouponCodeCount: ['', Validators.required],
      Description: [''],
      EndDate: ['', Validators.required],
      StartDate: ['', Validators.required],
    });
  }

  get f() {
    return this.eventsForm?.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.eventsForm.invalid) {
      return;
    }

    this.couponCodeService.create(this.eventsForm.value).subscribe(
      (res) => {
        this.notificationService.showSuccess(
          'Coupon Code Generated successfully!!',
          'Success'
        );
        this.router.navigate(['/admin/couponcode']);
      },
      (err: ErrorResponse) => {
        alert('Coupon code generate errror!!\n Data: \n' + JSON.stringify(err));
        return;
      }
    );
  }
}
