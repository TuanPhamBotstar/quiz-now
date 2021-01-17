import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthenticationRoutingModule } from './authentication-routing.module';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LandingPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthenticationRoutingModule,
  ],
  exports: [LoginComponent, RegisterComponent, LandingPageComponent, AuthenticationRoutingModule],
})
export class AuthenticationModule {}
