import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastMessageModule } from 'src/app/component/toast-message/toast-message.module';
import { ValidationmsgModule } from 'src/app/component/validationmsg/validationmsg.module';


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    ToastMessageModule,
    ValidationmsgModule
  ]
})
export class RegisterModule { }
