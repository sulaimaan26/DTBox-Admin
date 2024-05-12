import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  notificationForm: FormGroup;
  submitted = false;
  $subscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<NotificationComponent>,
    private formBuilder: FormBuilder,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.notificationForm = this.formBuilder.group({
      userId: [''],
      title: ['', Validators.required],
      body: ['', Validators.required],
      allUser: [true],
    });

    this.f.allUser.valueChanges.subscribe((value) => {
      if (value) {
        // this.notificationForm.patchValue({ userId: '' });
        this.f.userId.clearValidators();
      } else {
        this.f.userId.setValidators([Validators.required, this.ValidateUserID]);
      }
      this.f.userId.updateValueAndValidity();
    });
  }

  get f() {
    return this.notificationForm.controls;
  }

  ValidateUserID(control: AbstractControl) {
    const pattern = /^\d+(?:,\d+)*$/;
    return pattern.test(control.value) ? null : { errors: 'Invalid UserId' };
  }

  onSubmit() {
    console.log('adssd');

    this.submitted = true;

    if (this.notificationForm.invalid) {
      return;
    }

    let userIdList = this.f.userId.value.split(',');
    if (userIdList && userIdList.length > 0)
      userIdList = userIdList.map((userId) => parseInt(userId));

    this.notificationForm.patchValue({ userId: userIdList });

    this.settingsService
      .sendNotification(this.notificationForm.value)
      .subscribe(
        (res) => {
          alert(`Notication send Response: ${JSON.stringify(res)}`);
        },
        (err) => {
          alert('Something Went Wrong!!!');
          console.error(err);
        }
      );
  }

  ngOnDestroy(): void {
    if (this.$subscription) this.$subscription.unsubscribe();
  }
}
