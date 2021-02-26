import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NpnSliderModule } from 'npn-slider';

// other module
import { AuthenticationModule } from './modules/authentication/authentication.module';

import { ToastManagementComponent } from './shared/components/toast-management/toast-management.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth-interceptor';
import { BankModule } from './modules/bank/bank.module';
import { TestModule } from './modules/test/test.module';
import { HomeModule } from './modules/home/home.module';
import { ResultModule } from './modules/result/result.module';
import { combineReducers, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './modules/store/bank/bank.reducers';
import { BankEffects } from './modules/store/bank/bank.effects';
import { ViewResultComponent } from './modules/result/components/view-result/view-result.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { resultReducer } from './modules/store/result/result.reducers';

// const REDUCER = combineReducers({
//   featureA: reducer,
//   featureB: reducer
// }, {
// })
@NgModule({
  declarations: [AppComponent, ToastManagementComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AuthenticationModule,
    BankModule,
    TestModule,
    HomeModule,
    ResultModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot({ stores: reducer}),
    EffectsModule.forRoot([BankEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    ChartsModule,
    NpnSliderModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
