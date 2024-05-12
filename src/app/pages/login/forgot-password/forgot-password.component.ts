import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { NotificationService } from 'src/app/services/NotificationService/notification-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  resetform: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authservice: AuthenticationService,
    private routes: Router,
    private toastmsg: NotificationService
  ) {}

  ngOnInit(): void {
    this.resetform = this.formBuilder.group({
      emailId: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ]),
      ],
      password: ['', Validators.required],
      secretKey: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.resetform.invalid) {
      return;
    }

    this.authservice.resetPassword(this.resetform.value).subscribe(
      (res) => {
        this.toastmsg.showSuccess('Reset', 'Success');
        this.routes.navigate(['/']);
      },
      (err) => {
        console.log(err);
        alert(JSON.stringify(err));
      }
    );
  }
}
