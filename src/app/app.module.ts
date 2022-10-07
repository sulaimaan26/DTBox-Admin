import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/JwtInterceptor';
import { RouterModule } from '@angular/router';
import { AlertPopupComponent } from './component/alert-popup/alert-popup.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { APP_BASE_HREF } from '@angular/common';
import { environment } from 'src/environments/environment';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {AutocompleteOffDirective} from "./_directive/autoComplete/autocomplete-off.directive";

@NgModule({
    declarations: [
        AppComponent,
        AlertPopupComponent,
        AutocompleteOffDirective
    ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    MatProgressBarModule
  ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        {provide: APP_BASE_HREF, useValue: environment.basehref}
    ],
    exports: [ ],
    bootstrap: [AppComponent]
})
export class AppModule { }
