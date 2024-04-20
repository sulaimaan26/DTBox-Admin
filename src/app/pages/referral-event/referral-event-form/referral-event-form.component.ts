import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DateFormatterService } from 'src/app/services/dateformatter.service';
import { NotificationService } from 'src/app/services/NotificationService/notification-service.service';
import { ReferralEventService } from 'src/app/services/referralevent.service';
import { IReferralEvent } from 'src/app/_model/ReferralEvent';
import { ErrorResponse } from 'src/app/_model/response/ErrorResponse';

@Component({
  selector: 'app-referral-event-form',
  templateUrl: './referral-event-form.component.html',
  styleUrls: ['./referral-event-form.component.css'],
})
export class ReferralEventFormComponent implements OnInit {
  referralEventForm?: FormGroup;
  submitted = false;
  isGenerating = false;
  isUpdate = false;
  referralEventData: IReferralEvent;

  constructor(
    private formBuilder: FormBuilder,
    private referralEventService: ReferralEventService,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dateFormatterService: DateFormatterService
  ) {}

  ngOnInit(): void {
    this.referralEventForm = this.formBuilder.group({
      EventId: ['', Validators.required],
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      TopScorerCount: ['', Validators.required],
      IsActive: [true],
      IsCompleted: [true],
    });

    this.activatedRoute.data.subscribe((data) => {
      console.log(data);

      if (data) {
        if (data.details) {
          this.referralEventData = data.details;
          this.isUpdate = true;
          this.referralEventData.StartDate =
            this.dateFormatterService.convertToLocalDateTime(
              this.referralEventData.StartDate
            );
          this.referralEventData.EndDate =
            this.dateFormatterService.convertToLocalDateTime(
              this.referralEventData.EndDate
            );
          this.referralEventForm.patchValue(this.referralEventData);
        }
      }
    });
  }

  get f() {
    return this.referralEventForm?.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.referralEventForm.invalid) {
      return;
    }

    let formValue = this.convertToUTC(this.referralEventForm.value)

    if (this.isUpdate) {
      this.referralEventService
        .update(this.referralEventData.id, formValue)
        .subscribe(
          (res) => {
            this.notificationService.showSuccess(
              'Campaign Create successfully!!',
              'Success'
            );
            this.router.navigate(['/admin/referralevent']);
          },
          (err: ErrorResponse) => {
            alert(
              'Campaign creation errror!!\n Data: \n' + JSON.stringify(err)
            );
            return;
          }
        );
    } else
      this.referralEventService.create(formValue).subscribe(
        (res) => {
          this.notificationService.showSuccess(
            'Referral Event created successfully!!',
            'Success'
          );
          this.router.navigate(['/admin/referralevent']);
        },
        (err: ErrorResponse) => {
          alert('Referral Event errror!!\n Data: \n' + JSON.stringify(err));
          return;
        }
      );
  }

  convertToUTC(formValue:IReferralEvent){
    formValue.StartDate = new Date(formValue.StartDate).toISOString();
    formValue.EndDate = new Date(formValue.EndDate).toISOString();
    return formValue
  }
  ngOnDestroy(): void {}
}
