import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'reset-password',
    component:ResetPasswordComponent
  }
]

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ResetPasswordComponent],
  imports: [
    CommonModule,

    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AuthModule { }
