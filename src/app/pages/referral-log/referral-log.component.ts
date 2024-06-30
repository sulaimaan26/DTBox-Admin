import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ReferralLogService } from 'src/app/services/referral-log.service';
import { IReferralLog, ReferralLogRequest } from 'src/app/_model/referralog';
import { TableColumn, EditableTable } from 'src/app/_model/TableColumn';

@Component({
  selector: 'app-referral-log',
  templateUrl: './referral-log.component.html',
  styleUrls: ['./referral-log.component.css'],
})
export class ReferralLogComponent implements OnInit {
  @Input() referrerId: number;
  @Input() referrerCode: string;
  @Input() referrerName: string;
  referralLogForm: FormGroup;
  submitted = false;
  logList: IReferralLog[];
  columns: TableColumn<Partial<IReferralLog>>[] = [];
  $tableEditActive = new Subject<any>();
  $updateTable = new Subject<EditableTable[]>();
  tempTableRow: IReferralLog;
  $subscription;

  constructor(
    private formBuilder: FormBuilder,
    private readonly referralLogService: ReferralLogService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.referralLogForm = this.formBuilder.group({
      ReferralCode: [this.referrerCode, Validators.required],
      UTCStartDate: [''],
      UTCEndDate: [''],
      ReferrerId: [this.referrerId],
      IsSuccess: [true],
    });

    this.$subscription = this.activatedRoute.queryParams.subscribe(() => {
      this.columns = this.referralLogService.getColumn();
      this.referralLogService
        .getAll(this.referralLogForm.value)
        .subscribe((res) => {
          this.logList = res;
        });
    });
  }

  get f() {
    return this.referralLogForm?.controls;
  }

  onRowClicked($event) {}

  onSubmit() {
    this.submitted = true;
    if (this.referralLogForm.invalid) {
      return;
    }
    let formValue: ReferralLogRequest = this.referralLogForm.value;

    if (formValue.UTCStartDate && formValue.UTCEndDate) {
      formValue.UTCStartDate = new Date(formValue.UTCStartDate).toISOString();
      formValue.UTCEndDate = new Date(formValue.UTCEndDate).toISOString();
    }

    this.referralLogService.getAll(formValue).subscribe((res) => {
      this.logList = res;
      this.$updateTable.next(res);
      this.$tableEditActive.next(true);
    });
  }
}
