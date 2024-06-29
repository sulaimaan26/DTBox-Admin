import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DateFormatterService } from 'src/app/services/dateformatter.service';
import { NotificationService } from 'src/app/services/NotificationService/notification-service.service';
import { SalesReferralCodeService } from 'src/app/services/sales-referral-code.service';
import { ICustomer } from 'src/app/_model/customer';
import { ErrorResponse } from 'src/app/_model/response/ErrorResponse';
import {
  ISalesReferralCode,
  SalesDropdown,
} from 'src/app/_model/sales-referral-code';

@Component({
  selector: 'app-sales-code-update',
  templateUrl: './sales-code-update.component.html',
  styleUrls: ['./sales-code-update.component.css'],
})
export class SalesCodeUpdateComponent implements OnInit {
  salesCodeForm?: FormGroup;
  submitted = false;
  isGenerating = false;
  dropdown: SalesDropdown;
  codeInfo: ISalesReferralCode;
  customerList: ICustomer[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dateFormatterService: DateFormatterService,
    private salesReferralCodeService: SalesReferralCodeService
  ) {}

  ngOnInit(): void {
    this.salesCodeForm = this.formBuilder.group({
      UserId: ['', Validators.required],
      SalesReferralCode: [{ value: '', disabled: true }],
    });

    this.activatedRoute.data.subscribe((resolvedData) => {
      console.log(resolvedData);

      if (resolvedData && resolvedData.data) {
        this.codeInfo = resolvedData.data;
        this.salesCodeForm.patchValue(this.codeInfo);
      }

      if (resolvedData && resolvedData.dropdown) {
        this.dropdown = resolvedData.dropdown;
        this.customerList = this.dropdown.customer;
      }
    });
  }

  get f() {
    return this.salesCodeForm?.controls;
  }

  customSearchFn(term: string, item: ICustomer) {
    term = term.toLowerCase();
    return (
      item.UserName.toLowerCase().indexOf(term) > -1 ||
      item.PhoneNumber.includes(term) ||
      item.PublicUserId.toString().includes(term)
    );
  }

  onSubmit() {
    this.submitted = true;

    if (this.salesCodeForm.invalid) {
      return;
    }

    let changedUserId = this.f.UserId.value;

    if (
      this.codeInfo.UserId !== null &&
      this.codeInfo.UserId !== changedUserId
    ) {
      alert("You can't change the mapped sales person");
      return;
    }

    this.isGenerating = true;
    this.salesReferralCodeService
      .patch(this.codeInfo.id, this.salesCodeForm.value)
      .subscribe(
        (res) => {
          this.notificationService.showSuccess(
            'Sales Code Updated successfully!!',
            'Success'
          );
        },
        (err: ErrorResponse) => {
          this.isGenerating = false;
          alert('Update errror!!\n Data: \n' + JSON.stringify(err));
          return;
        }
      );
  }
}
