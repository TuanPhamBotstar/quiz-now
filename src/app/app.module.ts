import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// other module
import { AuthenticationModule } from './modules/authentication/authentication.module';

import { ToastManagementComponent } from './shared/components/toast-management/toast-management.component';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth-interceptor';
import { BankModule } from './modules/bank/bank.module';
import { TestModule } from './modules/test/test.module';
import { HomeModule } from './modules/home/home.module';
import {ResultModule} from './modules/result/result.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {reducer} from './modules/store/bank/bank.reducers';
import { BankEffects } from './modules/store/bank/bank.effects';
import { ViewResultComponent } from './modules/result/components/view-result/view-result.component';

@NgModule({
  declarations: [AppComponent, ToastManagementComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule, AuthenticationModule, BankModule, TestModule, HomeModule, ResultModule, StoreModule.forRoot({banks: reducer }), EffectsModule.forRoot([BankEffects])],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
