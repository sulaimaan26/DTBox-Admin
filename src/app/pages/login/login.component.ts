import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { NotificationService } from 'src/app/services/NotificationService/notification-service.service';
import { UserService } from 'src/app/services/user/user.service';
import { CustomValidatorService } from 'src/app/services/validator/customvalidator.service';
import { UserAuth } from 'src/app/_model/user';

import { ValidationError } from 'src/app/_model/ValidationMessaage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform:FormGroup
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authservice:AuthenticationService,
    private customvalidator:CustomValidatorService,
    private routes:Router,
    private toastmsg:NotificationService,
    private localStorageService:LocalstorageService
  ) { }

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      email:
      [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
        ])
      ],
      password:['',Validators.required],
    })
  }

  get f() { return this.loginform.controls; }

  onSubmit(){
    this.submitted = true;

    if(this.loginform.invalid){
      return;
    }

    this.authservice.login(this.loginform.get("email").value,this.loginform.get("password").value).subscribe((res:UserAuth)=>{
      this.authservice.isLoggedIn.subscribe((stat)=>{

          if(stat){
            this.toastmsg.showSuccess("Login","Success")
            this.routes.navigate(['/'])
          }
      })



    },(err:ValidationError)=>{
      console.log(err);
      this.toastmsg.showError("Invalid Credentials!!!","Failed")
    })
  }

}
