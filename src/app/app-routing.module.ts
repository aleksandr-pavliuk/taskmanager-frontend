import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";

const routes: Routes = [

  {path: '', component: LoginComponent},
  {path: 'logout', redirectTo:'', pathMatch: 'full'},
  {path: 'index', redirectTo:'', pathMatch:'full'},
  {path: 'register', component: RegisterComponent, pathMatch:'full'},
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
