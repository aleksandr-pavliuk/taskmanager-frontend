import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from './auth/login/login.component';
import {AppRoutingModule} from "./app-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RegisterComponent} from './auth/register/register.component';
import { MustMatchDirective } from './auth/directive/must-match.directive';
import { InfoPageComponent } from './auth/info-page/info-page.component';
import { ActivateAccountComponent } from './auth/activate-account/activate-account.component';
import { SendEmailResetPasswordComponent } from './auth/reset-password/send-email-reset-password/send-email-reset-password.component';
import { UpdatePasswordComponent } from './auth/reset-password/update-password/update-password.component';
import {RequestInterceptor} from "./auth/interceptor/request-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MustMatchDirective,
    InfoPageComponent,
    ActivateAccountComponent,
    SendEmailResetPasswordComponent,
    UpdatePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
