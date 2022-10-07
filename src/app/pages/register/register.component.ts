import { HttpErrorResponse } from '@angular/common/http';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/NotificationService/notification-service.service';
import { UserService } from 'src/app/services/user/user.service';
import { CustomValidatorService } from 'src/app/services/validator/customvalidator.service';
//import { CreateUserResponse } from 'src/app/_model/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm?:FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userservices: UserService,
    private notification: NotificationService,
    private route: Router,
    private customValidator:CustomValidatorService
  ) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      username: [
        '',
        Validators.compose(
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          this.customValidator.nameValidator,
        ])

    ],
      emailid: ['',
      Validators.compose(
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
        ]
      )

      ],
      password: [
        '',
        Validators.compose(
          [
          Validators.required,
            Validators.minLength(6)
          ]
        )
      ]
    });


  }

  get f() { return this.registerForm?.controls; }

  onSubmit(){
    console.log(this.f.contactnumber);
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('username', this.registerForm.get('username').value);
    formData.append('email', this.registerForm.get('emailid').value);
    formData.append('password', this.registerForm.get('password').value);

    this.userservices.createCustomer(formData).subscribe((res:any)=>{
      this.route.navigate(["/login"]);
      this.notification.showSuccess(res._msg,"Success");

    },(err:HttpErrorResponse)=>{
      this.notification.showError(err,"Failed");
    })

  }

}
