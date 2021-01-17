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

@NgModule({
  declarations: [AppComponent, ToastManagementComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule, AuthenticationModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}