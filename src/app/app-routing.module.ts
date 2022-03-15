import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {InfoPageComponent} from "./auth/info-page/info-page.component";
import {ActivateAccountComponent} from "./auth/activate-account/activate-account.component";
import {
  SendEmailResetPasswordComponent
} from "./auth/reset-password/send-email-reset-password/send-email-reset-password.component";
import {
  UpdatePasswordComponent
} from "./auth/reset-password/update-password/update-password.component";

const routes: Routes = [

  {path: '', component: LoginComponent},
  {path: 'logout', redirectTo:'', pathMatch: 'full'},
  {path: 'index', redirectTo:'', pathMatch:'full'},
  {path: 'register', component: RegisterComponent, pathMatch:'full'},
  {path: 'info-page', component:InfoPageComponent},
  {path: 'activate-account/:uuid', component:ActivateAccountComponent},
  {path: 'reset-password', component: SendEmailResetPasswordComponent},
  {path: 'update-password/:token', component: UpdatePasswordComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot((routes))
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
