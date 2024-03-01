import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { BannerService } from 'src/app/services/banner.service';
import { CampaignService } from 'src/app/services/campaign.service';
import { DateFormatterService } from 'src/app/services/dateformatter.service';
import { NotificationService } from 'src/app/services/NotificationService/notification-service.service';
import { IBanner } from 'src/app/_model/banner';
import { ICampaign } from 'src/app/_model/campaign';
import { ErrorResponse } from 'src/app/_model/response/ErrorResponse';
import { EditableTable, TableColumn } from 'src/app/_model/TableColumn';

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.css'],
})
export class CampaignFormComponent implements OnInit, OnDestroy {
  campaignForm?: FormGroup;
  submitted = false;
  isGenerating = false;
  isUpdate = false;
  campaignButtonType = ['copy','copy and share','share','booster','ok'];
  campaignData: ICampaign;

  constructor(
    private formBuilder: FormBuilder,
    private campaignService: CampaignService,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dateFormatterService: DateFormatterService
  ) {}

  ngOnInit(): void {
    this.campaignForm = this.formBuilder.group({
      CampaignId: ['', Validators.required],
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Footer: [''],
      BoosterValue: [1, Validators.required],
      ButtonText: ['copy', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      IsActive: [true],
      InstantBooster: [true],
    });

    this.activatedRoute.data.subscribe((data) => {
      console.log(data);

      if (data) {
        if (data.details) {
          this.campaignData = data.details;
          this.isUpdate = true;
          this.campaignData.StartDate = this.dateFormatterService.convertDate(
            this.campaignData.StartDate
          );
          this.campaignData.EndDate = this.dateFormatterService.convertDate(
            this.campaignData.EndDate
          );
          this.campaignForm.patchValue(this.campaignData);
        }
      }
    });
  }

  get f() {
    return this.campaignForm?.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.campaignForm.invalid) {
      console.log(this.campaignForm);

      return;
    }
    if (this.isUpdate) {
      this.campaignService
        .update(this.campaignData.id, this.campaignForm.value)
        .subscribe(
          (res) => {
            this.notificationService.showSuccess(
              'Campaign Create successfully!!',
              'Success'
            );
            this.router.navigate(['/admin/campaign']);
          },
          (err: ErrorResponse) => {
            alert(
              'Campaign creation errror!!\n Data: \n' + JSON.stringify(err)
            );
            return;
          }
        );
    } else
      this.campaignService.create(this.campaignForm.value).subscribe(
        (res) => {
          this.notificationService.showSuccess(
            'Campaign Create successfully!!',
            'Success'
          );
          this.router.navigate(['/admin/campaign']);
        },
        (err: ErrorResponse) => {
          alert(
            'Campaign creation errror!!\n Data: \n' + JSON.stringify(err)
          );
          return;
        }
      );
  }
  ngOnDestroy(): void {}
}
